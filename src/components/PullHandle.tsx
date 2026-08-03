import React, { useRef, useCallback, useState, useEffect } from 'react';
import { audioEngine } from '../utils/audioEngine';

interface PullHandleProps {
  onSpin: (velocityRatio?: number) => void;
  isSpinning: boolean;
  disabled?: boolean;
}

export const PullHandle: React.FC<PullHandleProps> = ({ onSpin, isSpinning, disabled = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [angle, setAngle] = useState(0); 
  const [isDragging, setIsDragging] = useState(false);
  const [isReturning, setIsReturning] = useState(false);

  const angleRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);
  const lastSoundTimeRef = useRef(0);
  const pivotRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const MAX_ANGLE = 150; 
  const SPRING_STIFFNESS = 0.12; // Snappier spring return
  const SPRING_DAMPING = 0.75;  // More damping for clean mechanical land
  const TRIGGER_THRESHOLD = 30; 

  const getAngleFromPointer = useCallback((clientX: number, clientY: number): number => {
    const pivot = pivotRef.current;
    const dx = clientX - pivot.x;
    const dy = pivot.y - clientY; 
    let angleDeg = Math.atan2(dx, dy) * (180 / Math.PI);
    return Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, angleDeg));
  }, []);

  const updatePivotPosition = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    pivotRef.current = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height * 0.82, 
    };
  }, []);

  const startSpringReturn = useCallback((releaseAngle: number) => {
    setIsReturning(true);
    let currentAngle = releaseAngle;
    let velocity = 0;

    const animate = () => {
      const force = -SPRING_STIFFNESS * currentAngle;
      velocity = (velocity + force) * SPRING_DAMPING;
      currentAngle += velocity;

      // No repeating tick sound during return to avoid sound glitching
      if (Math.abs(currentAngle) < 0.5 && Math.abs(velocity) < 0.1) {
        setAngle(0);
        angleRef.current = 0;
        setIsReturning(false);
        return;
      }

      setAngle(currentAngle);
      angleRef.current = currentAngle;
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (isSpinning || disabled) return;
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePivotPosition();
    setIsDragging(true);

    const newAngle = getAngleFromPointer(e.clientX, e.clientY);
    setAngle(newAngle);
    angleRef.current = newAngle;
  }, [isSpinning, disabled, getAngleFromPointer, updatePivotPosition]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging || isSpinning || disabled) return;
    e.preventDefault();

    const newAngle = getAngleFromPointer(e.clientX, e.clientY);
    setAngle(newAngle);
    angleRef.current = newAngle;

    const ratio = Math.abs(newAngle) / MAX_ANGLE;
    const now = Date.now();
    // Throttle pull sound to avoid stutter/overlap
    if (ratio > 0.15 && now - lastSoundTimeRef.current > 120) {
      audioEngine.playPullSound(ratio); // Properly maps intensity via pitch change
      lastSoundTimeRef.current = now;
    }
  }, [isDragging, isSpinning, disabled, getAngleFromPointer]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    setIsDragging(false);

    const releaseAngle = angleRef.current;
    const absAngle = Math.abs(releaseAngle);

    if (absAngle > TRIGGER_THRESHOLD && !isSpinning && !disabled) {
      const velocityRatio = Math.min(1.0, absAngle / MAX_ANGLE);
      audioEngine.playReleaseSound();
      onSpin(velocityRatio);
    }

    startSpringReturn(releaseAngle);
  }, [isDragging, isSpinning, disabled, onSpin, startSpringReturn]);

  const handleClick = useCallback(() => {
    if (isSpinning || disabled || isDragging) return;
    audioEngine.playPullSound(0.85);

    let pullAngle = 0;
    const pullTarget = 100;
    const pullStep = () => {
      pullAngle += 12;
      if (pullAngle >= pullTarget) {
        audioEngine.playReleaseSound();
        onSpin(0.85);
        startSpringReturn(pullTarget);
        return;
      }
      setAngle(pullAngle);
      animFrameRef.current = requestAnimationFrame(pullStep);
    };
    animFrameRef.current = requestAnimationFrame(pullStep);
  }, [isSpinning, disabled, isDragging, onSpin, startSpringReturn]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }, [handleClick]);

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const pullRatio = Math.abs(angle) / MAX_ANGLE;
  const needleGlow = `rgba(197, 138, 85, ${0.2 + pullRatio * 0.8})`;

  const ticks = [];
  for (let i = -6; i <= 6; i++) {
    const tickAngle = (i / 6) * MAX_ANGLE;
    const isMajor = i % 3 === 0;
    ticks.push(
      <line
        key={i}
        x1="100"
        y1={isMajor ? "12" : "16"}
        x2="100"
        y2="24"
        stroke={Math.abs(angle) >= Math.abs(tickAngle) && Math.sign(angle) === Math.sign(tickAngle) && i !== 0 ? '#C58A55' : 'rgba(255,255,255,0.15)'}
        strokeWidth={isMajor ? "2" : "1"}
        transform={`rotate(${tickAngle}, 100, 164)`}
        style={{ transition: 'stroke 0.15s ease' }}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center select-none px-2 py-2 touch-none"
      style={{ width: '140px', height: '220px' }}
    >
      <span className="text-[10px] font-mono uppercase tracking-widest text-[#C58A55] mb-1 text-center flex items-center gap-1">
        PULL LEVER
      </span>

      <svg
        viewBox="0 0 200 200"
        className="w-full h-auto cursor-grab active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="slider"
        aria-label="Pull lever to spin topic"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pullRatio * 100)}
        style={{ outline: 'none' }}
      >
        <path
          d="M 20 164 A 80 80 0 0 1 180 164"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="28"
          strokeLinecap="round"
        />

        {pullRatio > 0.01 && (
          <path
            d="M 20 164 A 80 80 0 0 1 180 164"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="28"
            strokeLinecap="round"
            strokeDasharray={`${pullRatio * 251} 251`}
            style={{ transition: isDragging ? 'none' : 'stroke-dasharray 0.1s ease' }}
          />
        )}

        <defs>
          <linearGradient id="gaugeGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#C58A55" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#C58A55" stopOpacity="1" />
          </linearGradient>
          <radialGradient id="pivotGradient">
            <stop offset="0%" stopColor="#E3A369" />
            <stop offset="60%" stopColor="#C58A55" />
            <stop offset="100%" stopColor="#7D522B" />
          </radialGradient>
          <filter id="needleGlow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>
        </defs>

        {ticks}

        <g
          transform={`rotate(${angle}, 100, 164)`}
          style={{ transition: isDragging || isReturning ? 'none' : 'transform 0.3s ease-out' }}
        >
          <line
            x1="100"
            y1="40"
            x2="100"
            y2="155"
            stroke={needleGlow}
            strokeWidth="6"
            strokeLinecap="round"
            filter="url(#needleGlow)"
          />

          <line
            x1="100"
            y1="40"
            x2="100"
            y2="155"
            stroke="url(#pivotGradient)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          <polygon
            points="96,44 104,44 100,28"
            fill="#C58A55"
          />
        </g>

        <circle
          cx="100"
          cy="164"
          r="10"
          fill="url(#pivotGradient)"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="2"
        />
        <circle
          cx="100"
          cy="164"
          r="4"
          fill="#090909"
        />

        <circle
          cx="100"
          cy="164"
          r="14"
          fill="none"
          stroke={needleGlow}
          strokeWidth="1"
          style={{ transition: 'stroke 0.15s ease' }}
        />
      </svg>

      <div className="text-[10px] font-mono text-[#666666] mt-0.5 text-center">
        {isDragging
          ? pullRatio > 0.7 ? '⚡ MAX POWER' : pullRatio > 0.3 ? '↕ Drag to pull' : '↕ Pull harder'
          : 'Drag or tap'}
      </div>
    </div>
  );
};
