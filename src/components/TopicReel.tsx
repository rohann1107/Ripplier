import React, { useEffect, useRef, useState } from 'react';
import type { Topic } from '../types';
import { audioEngine } from '../utils/audioEngine';
import confetti from 'canvas-confetti';

interface TopicReelProps {
  topics: Topic[];
  selectedTopic?: Topic | null;
  isSpinning: boolean;
  spinVelocityRatio: number;
  onLandingComplete: (topic: Topic) => void;
}

const ITEM_HEIGHT = 100; // Height of each topic tile in reel in px

export const TopicReel: React.FC<TopicReelProps> = ({
  topics,
  selectedTopic: _selectedTopic,
  isSpinning,
  spinVelocityRatio,
  onLandingComplete,
}) => {
  const [offsetY, setOffsetY] = useState(0);
  const [bounce, setBounce] = useState(false);
  const animFrameId = useRef<number | null>(null);
  const lastTickIndex = useRef(0);

  // When spinning starts, launch physics deceleration loop
  useEffect(() => {
    if (!isSpinning || topics.length === 0) return;

    // Pick random target topic index
    const targetIdx = Math.floor(Math.random() * topics.length);
    const targetTopic = topics[targetIdx];

    // Calculate total spin distance (spins around full topic list multiple times)
    const baseRounds = 3 + Math.floor(spinVelocityRatio * 4);
    const totalItemsToCross = baseRounds * topics.length + targetIdx;
    const targetOffsetY = totalItemsToCross * ITEM_HEIGHT;

    let currentY = offsetY;
    let velocity = 20 + spinVelocityRatio * 28; // Initial velocity (px per frame)
    const friction = 0.965; // Deceleration rate per frame

    let lastTime = performance.now();

    const spinStep = (now: number) => {
      const dt = Math.min(32, now - lastTime) / 16.66;
      lastTime = now;

      // Apply friction physics
      velocity *= Math.pow(friction, dt);
      currentY += velocity * dt;

      // Play tick sound when passing each topic item height boundary
      const currentTickIdx = Math.floor(currentY / ITEM_HEIGHT);
      if (currentTickIdx !== lastTickIndex.current) {
        const velRatio = Math.min(1.0, velocity / 35);
        audioEngine.playTickSound(velRatio);
        lastTickIndex.current = currentTickIdx;
      }

      // Check if speed has decelerated sufficiently near target
      if (velocity < 0.6 || currentY >= targetOffsetY) {
        // Snap to exact target position
        setOffsetY(targetOffsetY);
        audioEngine.playLandingSound();

        // Trigger subtle landing celebration micro-bounce
        setBounce(true);
        setTimeout(() => setBounce(false), 500);

        // Optional subtle confetti
        confetti({
          particleCount: 25,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#C58A55', '#7CC8F3', '#F5F2EC'],
          disableForReducedMotion: true,
        });

        // Notify parent
        onLandingComplete(targetTopic);
      } else {
        setOffsetY(currentY);
        animFrameId.current = requestAnimationFrame(spinStep);
      }
    };

    animFrameId.current = requestAnimationFrame(spinStep);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isSpinning]);

  if (topics.length === 0) {
    return (
      <div className="w-full max-w-2xl h-56 rounded-2xl bg-[#111111] border border-white/[0.08] flex items-center justify-center text-[#666666] font-mono text-sm">
        No topics match current category / difficulty filter.
      </div>
    );
  }

  // Generate continuous loop list for smooth infinite reel rendering
  const displayItems = [];
  const totalDisplaySlots = 140;
  for (let i = 0; i < totalDisplaySlots; i++) {
    displayItems.push(topics[i % topics.length]);
  }

  // Index currently centered in window
  const centerItemIndex = Math.round(offsetY / ITEM_HEIGHT);

  return (
    <div className="relative w-full max-w-3xl my-6">
      {/* 3D Cylindrical Drum Reel Frame Outer Shell */}
      <div
        className={`relative h-80 rounded-3xl bg-[#111111] border transition-all duration-300 overflow-hidden perspective-1000 ${
          bounce ? 'ring-2 ring-[#C58A55]/60 shadow-glow-gold scale-[1.01]' : 'border-white/[0.1]'
        }`}
      >
        {/* Top & Bottom Depth Shadows (Physical Cylinder 3D Shading) */}
        <div className="absolute top-0 left-0 right-0 h-28 reel-shadow-top z-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-28 reel-shadow-bottom z-20 pointer-events-none" />

        {/* Center Alignment Window Bracket */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[100px] border-y-2 border-[#C58A55]/50 bg-[#C58A55]/[0.04] z-10 pointer-events-none flex items-center justify-between px-4">
          <div className="w-2.5 h-6 rounded-r bg-[#C58A55] shadow-glow-gold" />
          <div className="w-2.5 h-6 rounded-l bg-[#C58A55] shadow-glow-gold" />
        </div>

        {/* Vertical Reel Strip with 3D Drum Item Scaling */}
        <div
          className="w-full transition-transform ease-linear"
          style={{
            transform: `translate3d(0, ${-offsetY + 100}px, 0)`,
            willChange: 'transform',
          }}
        >
          {displayItems.map((topic, idx) => {
            // Distance from current center item slot (0 = center, 1 = top/bottom, 2+ = far)
            const distanceFromCenter = Math.abs(idx - centerItemIndex);

            // Dynamic Font & Scale Math: Center item is huge (1.15 scale), adjacent items are smaller (0.75 scale)
            let scale = 0.65;
            let opacity = 0.2;
            let rotateX = 0;

            if (distanceFromCenter === 0) {
              scale = 1.15;
              opacity = 1.0;
              rotateX = 0;
            } else if (distanceFromCenter === 1) {
              scale = 0.8;
              opacity = 0.45;
              rotateX = idx < centerItemIndex ? 25 : -25; // 3D cylinder curve
            } else if (distanceFromCenter === 2) {
              scale = 0.65;
              opacity = 0.2;
              rotateX = idx < centerItemIndex ? 45 : -45;
            }

            const isCurrentlyCenter = distanceFromCenter === 0 && !isSpinning;

            return (
              <div
                key={`${topic.id}-${idx}`}
                style={{
                  height: `${ITEM_HEIGHT}px`,
                  transform: `scale(${scale}) rotateX(${rotateX}deg)`,
                  opacity: opacity,
                  transition: 'transform 0.15s ease-out, opacity 0.15s ease-out',
                }}
                className="flex flex-col items-center justify-center px-6 text-center select-none"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.06] text-[#C58A55]">
                    {topic.category}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#AAAAAA]">
                    • {topic.difficulty}
                  </span>
                </div>

                {/* Font size is large text-3xl/4xl when centered */}
                <h2
                  className={`font-serif leading-tight transition-all duration-200 line-clamp-1 ${
                    isCurrentlyCenter
                      ? 'text-3xl sm:text-4xl text-[#F5F2EC] font-semibold drop-shadow-[0_0_15px_rgba(197,138,85,0.4)]'
                      : 'text-xl text-[#AAAAAA]'
                  }`}
                >
                  {topic.title}
                </h2>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
