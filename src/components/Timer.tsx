import React, { useEffect, useState, useRef } from 'react';
import { Play, Pause, RotateCcw, ArrowRight, BookOpen, Mic } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface TimerProps {
  topicId: string;
  onFinished?: () => void;
}

export type TimerPhase = 'research' | 'speech';

export const Timer: React.FC<TimerProps> = ({ topicId, onFinished }) => {
  const [phase, setPhase] = useState<TimerPhase>('research');

  // Duration in seconds
  // Research presets: 5m (300s), 10m (600s), 15m (900s), 20m (1200s)
  // Speech presets: 1m (60s), 2m (120s), 3m (180s), 5m (300s), 10m (600s)
  const [researchDuration, setResearchDuration] = useState(300); // 5 min default
  const [speechDuration, setSpeechDuration] = useState(120); // 2 min default

  const [timeLeft, setTimeLeft] = useState(300);
  const [isRunning, setIsRunning] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Reset timer state whenever topic changes
  useEffect(() => {
    setPhase('research');
    setTimeLeft(researchDuration);
    setIsRunning(false);
  }, [topicId]);

  // Main timer countdown effect
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            audioEngine.playTimerEnd();

            // Automatic phase transition if research timer finishes
            if (phase === 'research') {
              setTimeout(() => {
                setPhase('speech');
                setTimeLeft(speechDuration);
              }, 1000);
            } else if (onFinished) {
              onFinished();
            }
            return 0;
          }
          audioEngine.playTimerTick();
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, timeLeft, phase, speechDuration, onFinished]);

  const toggleTimer = () => {
    audioEngine.playClickSound();
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    audioEngine.playClickSound();
    setIsRunning(false);
    setTimeLeft(phase === 'research' ? researchDuration : speechDuration);
  };

  const handleSelectResearchPreset = (secs: number) => {
    audioEngine.playClickSound();
    setResearchDuration(secs);
    if (phase === 'research') {
      setTimeLeft(secs);
      setIsRunning(false);
    }
  };

  const handleSelectSpeechPreset = (secs: number) => {
    audioEngine.playClickSound();
    setSpeechDuration(secs);
    if (phase === 'speech') {
      setTimeLeft(secs);
      setIsRunning(false);
    }
  };

  const switchPhase = (newPhase: TimerPhase) => {
    audioEngine.playClickSound();
    setIsRunning(false);
    setPhase(newPhase);
    setTimeLeft(newPhase === 'research' ? researchDuration : speechDuration);
  };

  // Format MM:SS
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const formattedTime = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  const currentDuration = phase === 'research' ? researchDuration : speechDuration;
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = currentDuration > 0 ? timeLeft / currentDuration : 0;
  const strokeDashoffset = circumference - progressRatio * circumference;

  return (
    <div className="w-full max-w-lg my-6 p-6 sm:p-8 rounded-3xl bg-[#111111] border border-white/[0.1] shadow-2xl flex flex-col items-center gap-6">
      {/* Phase Switcher Tabs (Research Time vs Speech Time) */}
      <div className="flex items-center gap-2 bg-[#090909] p-1.5 rounded-full border border-white/[0.08] w-full max-w-sm">
        <button
          onClick={() => switchPhase('research')}
          className={`flex-1 py-2 rounded-full text-xs font-mono tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
            phase === 'research'
              ? 'bg-[#C58A55] text-[#090909] font-bold shadow-glow-gold'
              : 'text-[#AAAAAA] hover:text-[#F5F2EC]'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" /> 1. RESEARCH TIME
        </button>

        <button
          onClick={() => switchPhase('speech')}
          className={`flex-1 py-2 rounded-full text-xs font-mono tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
            phase === 'speech'
              ? 'bg-[#7CC8F3] text-[#090909] font-bold shadow-glow-cyan'
              : 'text-[#AAAAAA] hover:text-[#F5F2EC]'
          }`}
        >
          <Mic className="w-3.5 h-3.5" /> 2. SPEECH TIME
        </button>
      </div>

      {/* Preset Duration Selector Bar */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-[11px] font-mono text-[#AAAAAA] uppercase tracking-widest">
          {phase === 'research' ? 'Select Research Preparation Time:' : 'Select Speech Time Limit:'}
        </span>

        <div className="flex items-center gap-1.5 flex-wrap justify-center bg-[#090909] p-1.5 rounded-2xl border border-white/[0.05]">
          {phase === 'research' ? (
            // Research Presets: 5m, 10m, 15m, 20m
            [
              { label: '5 min', secs: 300 },
              { label: '10 min', secs: 600 },
              { label: '15 min', secs: 900 },
              { label: '20 min', secs: 1200 },
            ].map((p) => (
              <button
                key={p.secs}
                onClick={() => handleSelectResearchPreset(p.secs)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer border ${
                  researchDuration === p.secs
                    ? 'bg-[#C58A55]/20 border-[#C58A55] text-[#C58A55] font-semibold'
                    : 'border-transparent text-[#AAAAAA] hover:text-[#F5F2EC]'
                }`}
              >
                {p.label}
              </button>
            ))
          ) : (
            // Speech Presets: 1m, 2m, 3m, 5m, 10m
            [
              { label: '1 min', secs: 60 },
              { label: '2 min', secs: 120 },
              { label: '3 min', secs: 180 },
              { label: '5 min', secs: 300 },
              { label: '10 min', secs: 600 },
            ].map((p) => (
              <button
                key={p.secs}
                onClick={() => handleSelectSpeechPreset(p.secs)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer border ${
                  speechDuration === p.secs
                    ? 'bg-[#7CC8F3]/20 border-[#7CC8F3] text-[#7CC8F3] font-semibold'
                    : 'border-transparent text-[#AAAAAA] hover:text-[#F5F2EC]'
                }`}
              >
                {p.label}
              </button>
            ))
          )}
        </div>
      </div>

      {/* SVG Radial Ring & Countdown Text */}
      <div className="relative w-48 h-48 flex items-center justify-center my-2">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r={radius}
            className="stroke-white/[0.06]"
            strokeWidth="7"
            fill="transparent"
          />
          <circle
            cx="96"
            cy="96"
            r={radius}
            className={`transition-all duration-1000 ${
              phase === 'research' ? 'stroke-[#C58A55]' : 'stroke-[#7CC8F3]'
            }`}
            strokeWidth="7"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Center Display */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="font-mono text-4xl font-semibold tracking-tight text-[#F5F2EC]">
            {formattedTime}
          </span>
          <span
            className={`text-[10px] font-mono uppercase tracking-widest mt-1.5 px-2.5 py-0.5 rounded-full ${
              phase === 'research'
                ? 'bg-[#C58A55]/15 text-[#C58A55]'
                : 'bg-[#7CC8F3]/15 text-[#7CC8F3]'
            }`}
          >
            {isRunning
              ? phase === 'research'
                ? 'RESEARCHING'
                : 'SPEAKING LIVE'
              : 'TIMER READY'}
          </span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center gap-3 w-full justify-center">
        <button
          onClick={resetTimer}
          className="p-3.5 rounded-full bg-[#181818] border border-white/[0.08] text-[#AAAAAA] hover:text-[#F5F2EC] hover:border-white/[0.2] transition-all cursor-pointer"
          title="Reset Timer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={toggleTimer}
          className={`px-8 py-3.5 rounded-full text-xs font-mono uppercase tracking-wider flex items-center gap-2 border transition-all cursor-pointer font-bold ${
            isRunning
              ? 'bg-[#181818] border-[#E05D5D]/40 text-[#E05D5D]'
              : phase === 'research'
              ? 'bg-[#C58A55] border-[#C58A55] text-[#090909] shadow-glow-gold'
              : 'bg-[#7CC8F3] border-[#7CC8F3] text-[#090909] shadow-glow-cyan'
          }`}
        >
          {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
          {isRunning ? 'PAUSE' : phase === 'research' ? 'START RESEARCH' : 'START SPEECH'}
        </button>

        {phase === 'research' && (
          <button
            onClick={() => switchPhase('speech')}
            className="px-5 py-3.5 rounded-full bg-[#181818] border border-white/[0.1] text-[#7CC8F3] hover:border-[#7CC8F3]/50 transition-all text-xs font-mono tracking-wider flex items-center gap-2 cursor-pointer"
            title="Proceed directly to Speech timer"
          >
            PROCEED <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
