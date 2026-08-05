import React, { useRef, useCallback, useState, useEffect } from 'react';
import { audioEngine } from '../utils/audioEngine';

interface PullHandleProps {
  onSpin: (velocityRatio?: number) => void;
  isSpinning: boolean;
  disabled?: boolean;
}

/* ─── constants ─── */
const MAX_ANGLE = 95;
const TRIGGER_THRESHOLD = 15;
const SPRING_STIFFNESS = 0.15;
const SPRING_DAMPING = 0.73;

// SVG coordinate system (viewBox 260 × 200)
const VB_W = 260;
const VB_H = 220;

// FIXED ORANGE PIVOT CENTER (at the bottom)
const PIVOT_CX = 86;
const PIVOT_CY = 175;

// WHITE HANDLE RESTING POSITION (at the top)
const HANDLE_CX = 90;
const HANDLE_CY = 20;

// MECHANICAL PARAMETERS
const ROD_LEN = 155;           // Increased by 40% for taller, more elegant geometry
const PIVOT_R = 12;            // Fixed Orange Pivot Radius (≈20px diameter)
const HANDLE_R = 20;         // Draggable White Handle Radius (≈33px diameter, ~1.6× size of pivot)

export const PullHandle: React.FC<PullHandleProps> = ({ onSpin, isSpinning, disabled = false }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const [angle, setAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isReturning, setIsReturning] = useState(false);

  const angleRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);
  const lastSoundTimeRef = useRef(0);
  const lastCrossedTickRef = useRef(-1);

  /* ──────────────── helpers ──────────────── */

  // Convert screen coordinates to local SVG space coordinates (handles zoom, scale, DPI and scroll)
  const getSVGCoords = useCallback((clientX: number, clientY: number): { x: number; y: number } => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const svg = svgRef.current;
    const point = svg.createSVGPoint();
    point.x = clientX;
    point.y = clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    const localPoint = point.matrixTransform(ctm.inverse());
    return { x: localPoint.x, y: localPoint.y };
  }, []);

  const angleFromCoords = useCallback((x: number, y: number): number => {
    const dx = x - PIVOT_CX;
    const dy = PIVOT_CY - y; // Up is positive Y in coordinate space
    let deg = Math.atan2(dx, dy) * (180 / Math.PI);
    if (deg < 0) deg = 0;   // ignore left dragging completely
    return Math.min(MAX_ANGLE, Math.max(0, deg));
  }, []);

  /* ──────────────── spring return ──────────────── */

  const springReturn = useCallback((from: number) => {
    setIsReturning(true);
    let pos = from;
    let vel = 0;

    const step = () => {
      vel = (vel + -SPRING_STIFFNESS * pos) * SPRING_DAMPING;
      pos += vel;
      if (Math.abs(pos) < 0.15 && Math.abs(vel) < 0.04) {
        setAngle(0);
        angleRef.current = 0;
        setIsReturning(false);
        lastCrossedTickRef.current = -1;
        return;
      }
      setAngle(pos);
      angleRef.current = pos;
      animFrameRef.current = requestAnimationFrame(step);
    };
    animFrameRef.current = requestAnimationFrame(step);
  }, []);

  /* ──────────────── pointer handlers (bound to SVG for robustness) ──────────────── */

  const onDown = useCallback((e: React.PointerEvent) => {
    if (isSpinning || disabled) return;
    if (!svgRef.current) return;

    // Get local coordinate within SVG
    const { x, y } = getSVGCoords(e.clientX, e.clientY);

    // Calculate current position of white handle center in SVG units
    const rad = (angleRef.current * Math.PI) / 180;
    const handleX = PIVOT_CX + ROD_LEN * Math.sin(rad);
    const handleY = PIVOT_CY - ROD_LEN * Math.cos(rad);

    // Hit-test: touch must start within 32 units of the white handle ball center
    const dx = x - handleX;
    const dy = y - handleY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 32) return;

    e.preventDefault();
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    setIsDragging(true);
    lastCrossedTickRef.current = -1;

    const a = angleFromCoords(x, y);
    setAngle(a);
    angleRef.current = a;
  }, [isSpinning, disabled, getSVGCoords, angleFromCoords]);

  const onMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging || isSpinning || disabled) return;
    e.preventDefault();
    const { x, y } = getSVGCoords(e.clientX, e.clientY);
    const a = angleFromCoords(x, y);
    setAngle(a);
    angleRef.current = a;

    // Ratchet click sounds every 22.5°
    const ti = Math.floor(a / 22.5);
    if (ti !== lastCrossedTickRef.current && ti >= 0) {
      audioEngine.playTickSound(0.4 + (ti / 4) * 0.4);
      lastCrossedTickRef.current = ti;
    }
    // Pull tension sound
    const ratio = a / MAX_ANGLE;
    const now = Date.now();
    if (ratio > 0.15 && now - lastSoundTimeRef.current > 140) {
      audioEngine.playPullSound(ratio);
      lastSoundTimeRef.current = now;
    }
  }, [isDragging, isSpinning, disabled, getSVGCoords, angleFromCoords]);

  const onUp = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    (e.currentTarget as Element).releasePointerCapture(e.pointerId);
    setIsDragging(false);

    // Read the current coordinates and calculate real release-time angle
    const { x, y } = getSVGCoords(e.clientX, e.clientY);
    const rel = angleFromCoords(x, y);

    setAngle(rel);
    angleRef.current = rel;

    if (rel > TRIGGER_THRESHOLD && !isSpinning && !disabled) {
      audioEngine.playReleaseSound();
      onSpin(Math.min(1.0, rel / MAX_ANGLE));
    }
    springReturn(rel);
  }, [isDragging, isSpinning, disabled, onSpin, springReturn, getSVGCoords, angleFromCoords]);

  /* ──────────────── tap / keyboard ──────────────── */

  const onTap = useCallback((e: React.MouseEvent) => {
    if (isSpinning || disabled || isDragging) return;
    if (!svgRef.current) return;

    // Get click coords relative to SVG space
    const { x, y } = getSVGCoords(e.clientX, e.clientY);

    // Calculate current position of white handle center in SVG units
    const rad = (angleRef.current * Math.PI) / 180;
    const handleX = PIVOT_CX + ROD_LEN * Math.sin(rad);
    const handleY = PIVOT_CY - ROD_LEN * Math.cos(rad);

    // Only trigger tap when clicking within 32 units of the white handle center
    const dx = x - handleX;
    const dy = y - handleY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 32) return;

    audioEngine.playPullSound(0.85);
    let a = 0;
    const target = MAX_ANGLE;
    const tick = () => {
      a += 10;
      const ti = Math.floor(a / 22.5);
      if (ti !== lastCrossedTickRef.current && ti >= 0) {
        audioEngine.playTickSound(0.4 + (ti / 4) * 0.4);
        lastCrossedTickRef.current = ti;
      }
      if (a >= target) {
        audioEngine.playReleaseSound();
        onSpin(0.9);
        springReturn(target);
        return;
      }
      setAngle(a);
      animFrameRef.current = requestAnimationFrame(tick);
    };
    animFrameRef.current = requestAnimationFrame(tick);
  }, [isSpinning, disabled, isDragging, onSpin, springReturn, getSVGCoords]);

  const onKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      // Tap simulation uses center/keyboard trigger
      audioEngine.playPullSound(0.85);
      let a = 0;
      const target = MAX_ANGLE;
      const tick = () => {
        a += 10;
        const ti = Math.floor(a / 22.5);
        if (ti !== lastCrossedTickRef.current && ti >= 0) {
          audioEngine.playTickSound(0.4 + (ti / 4) * 0.4);
          lastCrossedTickRef.current = ti;
        }
        if (a >= target) {
          audioEngine.playReleaseSound();
          onSpin(0.9);
          springReturn(target);
          return;
        }
        setAngle(a);
        animFrameRef.current = requestAnimationFrame(tick);
      };
      animFrameRef.current = requestAnimationFrame(tick);
    }
  }, [onSpin, springReturn]);

  useEffect(() => () => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
  }, []);

  /* ──────────────── derived values ──────────────── */

  const ratio = Math.max(0, Math.min(1, angle / MAX_ANGLE));

  // Guide arc sweeps clockwise from 0° (top) to 95° (right/down)
  const arcStartX = PIVOT_CX;
  const arcStartY = PIVOT_CY - ROD_LEN; // At (90, 40)
  const endRad = (95 * Math.PI) / 180;
  const arcEndX = PIVOT_CX + ROD_LEN * Math.sin(endRad);
  const arcEndY = PIVOT_CY - ROD_LEN * Math.cos(endRad);

  /* ──────────────── marker helpers ──────────────── */
  const tickAt = (deg: number, inner: number, outer: number) => {
    const rad = (deg * Math.PI) / 180;
    return {
      x1: PIVOT_CX + inner * Math.sin(rad),
      y1: PIVOT_CY - inner * Math.cos(rad),
      x2: PIVOT_CX + outer * Math.sin(rad),
      y2: PIVOT_CY - outer * Math.cos(rad),
    };
  };

  const orangeTick = tickAt(6, ROD_LEN + 2, ROD_LEN + 8);
  const grayTick1 = tickAt(48, ROD_LEN - 3, ROD_LEN + 3);
  const grayTick2 = tickAt(85, ROD_LEN - 3, ROD_LEN + 3);

  /* ──────────────── render ──────────────── */

  return (
    <div
      className="flex flex-col items-center justify-center select-none px-2 py-2 touch-none "
      style={{
        width: '220px',
        height: '260px'
      }}
    >
      {/* ── Title ── */}
      <span className="text-[10px] font-mono uppercase tracking-widest text-[#C58A55] mb-5 text-center">
        PULL LEVER
      </span>

      {/* ── SVG ── */}
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="w-full h-auto cursor-grab active:cursor-grabbing"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onClick={onTap}
        onKeyDown={onKey}
        tabIndex={0}
        role="slider"
        aria-label="Pull slot-machine lever to spin topic"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(ratio * 100)}
        style={{ outline: 'none' }}
      >
        <defs>
          {/* ── Rod metallic gradient (left-right shading) ── */}
          <linearGradient id="ph_rod" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#202020" />
            <stop offset="20%" stopColor="#484848" />
            <stop offset="40%" stopColor="#dcdcdc" />
            <stop offset="55%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#9e9e9e" />
            <stop offset="85%" stopColor="#3f3f3f" />
            <stop offset="100%" stopColor="#151515" />
          </linearGradient>

          {/* ── White handle chrome ball gradient ── */}
          <radialGradient id="ph_chrome" cx="35%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#efefef" />
            <stop offset="65%" stopColor="#c8c8c8" />
            <stop offset="90%" stopColor="#7a7a7a" />
            <stop offset="100%" stopColor="#333333" />
          </radialGradient>

          {/* ── Orange pivot ball gradient ── */}
          <radialGradient id="ph_orange" cx="35%" cy="30%" r="68%">
            <stop offset="0%" stopColor="#ffe4b3" />
            <stop offset="25%" stopColor="#ffb03a" />
            <stop offset="60%" stopColor="#e67e22" />
            <stop offset="85%" stopColor="#c58a55" />
            <stop offset="100%" stopColor="#5c3610" />
          </radialGradient>

          {/* ── White handle shadow (strengthens with pull) ── */}
          <filter id="ph_handleSh" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow
              dx={1 + ratio * 1.5}
              dy={2 + ratio * 3}
              stdDeviation={2 + ratio * 1.5}
              floodColor="#000"
              floodOpacity={0.5 + ratio * 0.25}
            />
          </filter>

          {/* ── Orange pivot shadow ── */}
          <filter id="ph_pivotSh" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="1" dy="2" stdDeviation="2.5" floodColor="#000" floodOpacity="0.45" />
          </filter>

          {/* ── Rod thin shadow ── */}
          <filter id="ph_rodSh" x="-35%" y="-5%" width="170%" height="110%">
            <feDropShadow dx="1" dy="1.5" stdDeviation="1.5" floodColor="#000" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* ───── Right-side guide arc (subtle mechanical guide) ───── */}
        <path
          d={`M ${arcStartX} ${arcStartY} A ${ROD_LEN} ${ROD_LEN} 0 0 1 ${arcEndX} ${arcEndY}`}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Guide-arc subtle glow while dragging */}
        {ratio > 0.01 && (
          <path
            d={`M ${arcStartX} ${arcStartY} A ${ROD_LEN} ${ROD_LEN} 0 0 1 ${arcEndX} ${arcEndY}`}
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="3"
            strokeLinecap="round"
            opacity={ratio * 0.8}
          />
        )}

        {/* ───── Markers ───── */}

        {/* Orange indicator near top-right of resting position */}
        <line
          x1={orangeTick.x1} y1={orangeTick.y1}
          x2={orangeTick.x2} y2={orangeTick.y2}
          stroke="#C58A55"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* Gray marker 1 (≈48°) */}
        <line
          x1={grayTick1.x1} y1={grayTick1.y1}
          x2={grayTick1.x2} y2={grayTick1.y2}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Gray marker 2 (≈85°) */}
        <line
          x1={grayTick2.x1} y1={grayTick2.y1}
          x2={grayTick2.x2} y2={grayTick2.y2}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* ───── Rotating group: Rod + Draggable White Handle ───── */}
        <g
          transform={`rotate(${angle}, ${PIVOT_CX}, ${PIVOT_CY})`}
          style={{ transition: isDragging || isReturning ? 'none' : 'transform 0.25s cubic-bezier(0.175,0.885,0.32,1.275)' }}
        >
          {/* Straight 3D Metallic Rod connecting center of both balls */}
          <line
            x1={PIVOT_CX} y1={PIVOT_CY}
            x2={HANDLE_CX} y2={HANDLE_CY}
            stroke="url(#ph_rod)"
            strokeWidth="6"
            strokeLinecap="round"
            filter="url(#ph_rodSh)"
          />

          {/* 3D Specular Highlight Line (off-center to simulate cylindrical light reflection) */}
          <line
            x1={PIVOT_CX - 1.2} y1={PIVOT_CY}
            x2={HANDLE_CX - 1.2} y2={HANDLE_CY}
            stroke="#ffffff"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.4"
            style={{ mixBlendMode: 'overlay' }}
          />

          {/* 3D Core Shadow Line (off-center to simulate cylindrical depth shadow) */}
          <line
            x1={PIVOT_CX + 1.6} y1={PIVOT_CY}
            x2={HANDLE_CX + 1.6} y2={HANDLE_CY}
            stroke="#000000"
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity="0.25"
          />

          {/* Active Rod Brightness Overlay (glows as you pull) */}
          <line
            x1={PIVOT_CX} y1={PIVOT_CY}
            x2={HANDLE_CX} y2={HANDLE_CY}
            stroke="#ffffff"
            strokeWidth="6"
            strokeLinecap="round"
            opacity={ratio * 0.22}
            style={{ mixBlendMode: 'overlay', transition: 'opacity 0.08s ease' }}
          />

          {/* Glossy White Chrome Handle Ball */}
          <circle
            cx={HANDLE_CX}
            cy={HANDLE_CY}
            r={HANDLE_R}
            fill="url(#ph_chrome)"
            filter="url(#ph_handleSh)"
          />

          {/* Subtle rim highlight for 3D metallic feel */}
          <circle
            cx={HANDLE_CX}
            cy={HANDLE_CY}
            r={HANDLE_R - 0.5}
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="0.8"
          />

          {/* Handle glow highlight while pulling */}
          <circle
            cx={HANDLE_CX}
            cy={HANDLE_CY}
            r={HANDLE_R}
            fill="#ffffff"
            opacity={ratio * 0.15}
            style={{ mixBlendMode: 'overlay' }}
          />
        </g>

        {/* ───── Fixed Orange Pivot Ball (centered at the bottom, NEVER moves) ───── */}
        <circle
          cx={PIVOT_CX}
          cy={PIVOT_CY}
          r={PIVOT_R}
          fill="url(#ph_orange)"
          filter="url(#ph_pivotSh)"
        />
      </svg>

      {/* ── Subtitle ── */}
      <div className="text-[10px] font-mono text-[#666666] mt-2 text-center">
        Drag and Pull
      </div>
    </div>
  );
};
