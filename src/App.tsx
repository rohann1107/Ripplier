import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Header } from './components/Header';
import { CategoryFilter } from './components/CategoryFilter';
import { PullHandle } from './components/PullHandle';
import { TopicCard } from './components/TopicCard';
import { TimerPage } from './components/TimerPage';
import { KeyboardShortcutsModal } from './components/KeyboardShortcutsModal';
import { Footer } from './components/Footer';

import { TOPICS } from './data/topics';
import type { Topic, Category, UserSettings } from './types';
import { audioEngine } from './utils/audioEngine';
import { Play, ArrowRight } from 'lucide-react';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'machine' | 'timer'>('machine');

  const [category, setCategory] = useState<Category | 'All'>('All');

  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const spinFrameRef = useRef<number | null>(null);
  const spinningRef = useRef(false);

  const [settings, setSettings] = useState<UserSettings>({
    soundEnabled: true,
    volume: 0.6,
    timerDuration: 60,
    difficulty: 'All',
    category: 'All',
    reducedMotion: false,
    autoStartTimer: true,
  });

  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    audioEngine.setSoundEnabled(settings.soundEnabled);
    audioEngine.setVolume(settings.volume);
  }, [settings.soundEnabled, settings.volume]);

  const filteredTopics = useMemo(() => {
    return TOPICS.filter((t) => {
      const matchCategory = category === 'All' || t.category === category;
      return matchCategory;
    });
  }, [category]);

  useEffect(() => {
    if (filteredTopics.length > 0 && !selectedTopic) {
      const initial = filteredTopics[Math.floor(Math.random() * filteredTopics.length)];
      setSelectedTopic(initial);
    }
  }, [filteredTopics, selectedTopic]);

  const handleSelectCategory = (newCat: Category | 'All') => {
    setCategory(newCat);
    const pool = TOPICS.filter((t) => {
      const matchCat = newCat === 'All' || t.category === newCat;
      return matchCat;
    });

    if (pool.length > 0) {
      const randomFromNiche = pool[Math.floor(Math.random() * pool.length)];
      setSelectedTopic(randomFromNiche);
    }
  };
  const handleStartSpin = useCallback((velocityRatio: number = 0.85) => {

    if (spinningRef.current || filteredTopics.length === 0) return;

    spinningRef.current = true;
    setIsSpinning(true);

    const target =
      filteredTopics[Math.floor(Math.random() * filteredTopics.length)];

    const getDurationAndSteps = (ratio: number) => {
      if (ratio <= 0.1) {
        // ratio 0.0 -> 0.1 maps to 500ms -> 800ms and 3 -> 6 steps
        const t = ratio / 0.1;
        return {
          duration: 500 + t * 300,
          steps: Math.round(3 + t * 3)
        };
      }
      if (ratio <= 0.3) {
        const t = (ratio - 0.1) / 0.2;
        return {
          duration: 800 + t * 500,
          steps: Math.round(6 + t * 4)
        };
      }
      if (ratio <= 0.5) {
        const t = (ratio - 0.3) / 0.2;
        return {
          duration: 1300 + t * 600,
          steps: Math.round(10 + t * 5)
        };
      }
      if (ratio <= 0.75) {
        const t = (ratio - 0.5) / 0.25;
        return {
          duration: 1900 + t * 800,
          steps: Math.round(15 + t * 7)
        };
      }
      const t = Math.min(1.0, (ratio - 0.75) / 0.25);
      return {
        duration: 2700 + t * 900,
        steps: Math.round(22 + t * 8)
      };
    };

    const { duration, steps } = getDurationAndSteps(velocityRatio);
    const start = performance.now();

    // Pre-calculate deceleration steps times
    const stepTimes: number[] = [];
    for (let i = 0; i < steps; i++) {
      // Deceleration curve: step times expand exponentially
      const t = duration * Math.pow(i / (steps - 1), 2.2);
      stepTimes.push(t);
    }

    let currentStep = 0;

    const animate = (time: number) => {
      const elapsed = time - start;

      while (currentStep < steps - 1 && elapsed >= stepTimes[currentStep + 1]) {
        currentStep++;
        const random = filteredTopics[Math.floor(Math.random() * filteredTopics.length)];
        setSelectedTopic({ ...random });

        const stepProgress = currentStep / (steps - 1);
        // Play click tick sound; volume & frequency scale down as it slows
        audioEngine.playTickSound((1 - stepProgress) * (0.3 + velocityRatio * 0.7));
      }

      if (elapsed < duration) {
        spinFrameRef.current = requestAnimationFrame(animate);
      } else {
        setSelectedTopic({ ...target });
        audioEngine.playLandingSound(velocityRatio);
        spinningRef.current = false;
        setIsSpinning(false);
      }
    };

    spinFrameRef.current =
      requestAnimationFrame(animate);

  }, [filteredTopics]);



  useEffect(() => {

    return () => {

      if (spinFrameRef.current) {
        cancelAnimationFrame(spinFrameRef.current);
      }

      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }

    };

  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) return;

      if (e.key === 'Escape') {
        setIsShortcutsOpen(false);
        if (currentView === 'timer') setCurrentView('machine');
        return;
      }

      if ((e.key === ' ' || e.key === 'ArrowDown') && currentView === 'machine') {
        e.preventDefault();
        handleStartSpin();
      } else if (e.key.toLowerCase() === 'm') {
        setSettings((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleStartSpin, currentView]);

  if (currentView === 'timer' && selectedTopic) {
    return (
      <TimerPage
        topic={selectedTopic}
        initialMode="research"
        onClose={() => setCurrentView('machine')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#090909] text-[#F5F2EC] flex flex-col justify-between ambient-glow">
      <div>
        <Header
          soundEnabled={settings.soundEnabled}
          onToggleSound={() => setSettings(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }))}
          onOpenShortcuts={() => setIsShortcutsOpen(true)}
        />

        <main className="w-full max-w-5xl mx-auto mt-5 px-4 py-3 flex flex-col items-center">
          <CategoryFilter
            selectedCategory={category}
            onSelectCategory={handleSelectCategory}
          />

          <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 my-4">
            <div className="flex-1 w-full min-w-0 ">
              <TopicCard
                topic={selectedTopic}
                isSpinning={isSpinning}
              />
            </div>

            <div className="hidden md:flex items-center justify-center p-2 bg-[#111111]/80 rounded-3xl border border-white/[0.08] shadow-xl">
              <PullHandle
                onSpin={handleStartSpin}
                isSpinning={isSpinning}
                disabled={filteredTopics.length === 0}
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 sm:gap-3 my-1 flex-wrap w-full max-w-3xl">
            <button
              onClick={() => handleStartSpin()}
              disabled={isSpinning || filteredTopics.length === 0}
              className={`flex-1 sm:flex-none px-6 py-3 rounded-full text-xs font-mono uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2 border cursor-pointer min-w-0 ${isSpinning
                ? 'bg-[#111111] border-white/[0.05] text-[#666666] cursor-not-allowed'
                : 'bg-[#C58A55] border-[#C58A55] text-[#090909] shadow-glow-gold hover:bg-[#D99C66] hover:shadow-[0_0_10px_rgba(236,174,118,0.5)]'
                }`}
            >
              <Play className="w-4 h-4 fill-current shrink-0" />
              {isSpinning ? 'SPINNING...' : 'SPIN SEED!'}
            </button>

            {selectedTopic && !isSpinning && (
              <button
                onClick={() => {
                  audioEngine.playClickSound();
                  setCurrentView('timer');
                }}
                className="flex-1 sm:flex-none px-6 py-3 rounded-full bg-[#181818] border border-[#7CC8F3]/50 text-[#7CC8F3] hover:bg-[#7CC8F3] hover:text-[#090909] transition-all text-xs font-mono uppercase tracking-wider font-bold cursor-pointer shadow-glow-cyan flex items-center justify-center gap-2 min-w-0"
              >
                Start Timer
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            )}
          </div>
        </main>
      </div>

      <Footer />

      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />
    </div>
  );
};

export default App;
