import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { audioEngine } from '../utils/audioEngine';

interface PullHandleProps {
  onSpin: (velocityRatio?: number) => void;
  isSpinning: boolean;
  disabled?: boolean;
}

export const PullHandle: React.FC<PullHandleProps> = ({ onSpin, isSpinning, disabled = false }) => {
  const [isPulling, setIsPulling] = useState(false);
  const dragY = useMotionValue(0);
  const maxPullY = 110; // Max drag distance

  // Shaft expansion & knob glow transforms
  const shaftHeight = useTransform(dragY, [0, maxPullY], [70, 145]);
  const knobGlow = useTransform(
    dragY,
    [0, maxPullY],
    ['rgba(197, 138, 85, 0.25)', 'rgba(197, 138, 85, 0.95)']
  );

  const lastSoundTime = useRef(0);

  const handleDrag = (_: unknown, info: { offset: { y: number } }) => {
    const currentY = Math.max(0, Math.min(maxPullY, info.offset.y));
    dragY.set(currentY);
    const ratio = currentY / maxPullY;

    const now = Date.now();
    if (now - lastSoundTime.current > 70 && ratio > 0.1) {
      audioEngine.playPullSound(ratio);
      lastSoundTime.current = now;
    }
  };

  const handleDragEnd = (_: unknown, info: { offset: { y: number } }) => {
    setIsPulling(false);
    const pulledY = Math.max(0, Math.min(maxPullY, info.offset.y));

    if (pulledY > 15 && !isSpinning && !disabled) {
      audioEngine.playReleaseSound();
      onSpin(0.85);
    }
    dragY.set(0);
  };

  const triggerDirectSpin = () => {
    if (isSpinning || disabled) return;
    setIsPulling(true);
    audioEngine.playPullSound(0.85);

    // Animate downward pull
    dragY.set(maxPullY);
    setTimeout(() => {
      audioEngine.playReleaseSound();
      dragY.set(0);
      setIsPulling(false);
      onSpin(0.9);
    }, 200);
  };

  return (
    <div className="flex flex-col items-center justify-center select-none px-3 py-2">
      <span className="text-[10px] font-mono uppercase tracking-widest text-[#C58A55] mb-2 text-center flex items-center gap-1">
        PULL LEVER ↓
      </span>

      {/* Side Vertical Slot Machine Lever */}
      <div className="relative flex flex-col items-center justify-start h-48 w-16 py-1">
        <motion.div
          drag={isSpinning || disabled ? false : 'y'}
          dragConstraints={{ top: 0, bottom: maxPullY }}
          dragElastic={0.15}
          dragSnapToOrigin={true}
          style={{ y: dragY }}
          onDragStart={() => setIsPulling(true)}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onClick={triggerDirectSpin}
          className="relative flex flex-col items-center cursor-grab active:cursor-grabbing focus:outline-none z-20"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              triggerDirectSpin();
            }
          }}
          aria-label="Pull lever to spin topic"
        >
          {/* Top Spherical Knob (Matching user reference image) */}
          <motion.div
            style={{ boxShadow: knobGlow }}
            className={`w-12 h-12 rounded-full lever-knob border-2 border-white/20 flex flex-col items-center justify-center transition-transform ${
              isPulling ? 'scale-110 ring-4 ring-[#C58A55]/50' : 'hover:scale-105'
            }`}
          >
            {/* Grip Texture Lines */}
            <div className="flex flex-col items-center gap-0.5">
              <div className="w-4 h-0.5 bg-[#090909]/70 rounded-full" />
              <div className="w-4 h-0.5 bg-[#090909]/70 rounded-full" />
              <div className="w-4 h-0.5 bg-[#090909]/70 rounded-full" />
            </div>
          </motion.div>

          {/* Metal Shaft Bar */}
          <motion.div
            style={{ height: shaftHeight }}
            className="w-2.5 lever-shaft rounded-b-full transition-all -mt-1"
          />

          {/* Bottom Pivot Base Node */}
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#333] to-[#090909] border border-white/20 shadow-md -mt-1 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#C58A55]" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
