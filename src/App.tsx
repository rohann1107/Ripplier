import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Header } from './components/Header';
import { CategoryFilter } from './components/CategoryFilter';
import { PullHandle } from './components/PullHandle';
import { TopicCard } from './components/TopicCard';
import { TimerPage } from './components/TimerPage';
import { SettingsModal } from './components/SettingsModal';
import { KeyboardShortcutsModal } from './components/KeyboardShortcutsModal';
import { Footer } from './components/Footer';

import { TOPICS } from './data/topics';
import type { Topic, Category, Difficulty, UserSettings } from './types';
import { audioEngine } from './utils/audioEngine';
import { Play, ArrowRight } from 'lucide-react';

export const App: React.FC = () => {
  // App View Screen: 'machine' or 'timer'
  const [currentView, setCurrentView] = useState<'machine' | 'timer'>('machine');

  // Filters
  const [category, setCategory] = useState<Category | 'All'>('All');
  const [difficulty, setDifficulty] = useState<Difficulty | 'All'>('All');

  // Topic Spin State
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  // Settings State
  const [settings, setSettings] = useState<UserSettings>({
    soundEnabled: true,
    volume: 0.6,
    timerDuration: 60,
    difficulty: 'All',
    category: 'All',
    topicMode: 'concept',
    reducedMotion: false,
    autoStartTimer: true,
  });

  // Modals State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

  const animFrameRef = useRef<number | null>(null);

  // Sync sound engine options
  useEffect(() => {
    audioEngine.setSoundEnabled(settings.soundEnabled);
    audioEngine.setVolume(settings.volume);
  }, [settings.soundEnabled, settings.volume]);

  // Filter topics based on Category Niche & Difficulty (always concept mode)
  const filteredTopics = useMemo(() => {
    return TOPICS.filter((t) => {
      const matchCategory = category === 'All' || t.category === category;
      const matchDifficulty = difficulty === 'All' || t.difficulty === difficulty;
      return matchCategory && matchDifficulty;
    });
  }, [category, difficulty]);

  // Initial topic selection
  useEffect(() => {
    if (filteredTopics.length > 0 && !selectedTopic) {
      const initial = filteredTopics[Math.floor(Math.random() * filteredTopics.length)];
      setSelectedTopic(initial);
    }
  }, [filteredTopics, selectedTopic]);

  // Handle Category Niche Selection
  const handleSelectCategory = (newCat: Category | 'All') => {
    setCategory(newCat);
    const pool = TOPICS.filter((t) => {
      const matchCat = newCat === 'All' || t.category === newCat;
      const matchDiff = difficulty === 'All' || t.difficulty === difficulty;
      return matchCat && matchDiff;
    });

    if (pool.length > 0) {
      const randomFromNiche = pool[Math.floor(Math.random() * pool.length)];
      setSelectedTopic(randomFromNiche);
    }
  };

  // Handle Difficulty Selection
  const handleSelectDifficulty = (newDiff: Difficulty | 'All') => {
    setDifficulty(newDiff);
    const pool = TOPICS.filter((t) => {
      const matchCat = category === 'All' || t.category === category;
      const matchDiff = newDiff === 'All' || t.difficulty === newDiff;
      return matchCat && matchDiff;
    });

    if (pool.length > 0) {
      const randomFromPool = pool[Math.floor(Math.random() * pool.length)];
      setSelectedTopic(randomFromPool);
    }
  };

  // Deceleration Spin Physics Loop strictly from current niche pool
  const handleStartSpin = useCallback(() => {
    if (isSpinning || filteredTopics.length === 0) return;

    setIsSpinning(true);
    const duration = 1100;
    const startTime = performance.now();
    let lastTickStep = -1;

    // Pick target topic upfront from current filtered pool
    const targetTopic = filteredTopics[Math.floor(Math.random() * filteredTopics.length)];

    const animateSpin = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1.0, elapsed / duration);

      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const totalTicks = 12;
      const currentTickStep = Math.floor(easedProgress * totalTicks);

      if (currentTickStep !== lastTickStep && currentTickStep < totalTicks) {
        lastTickStep = currentTickStep;
        audioEngine.playTickSound(1.0 - progress * 0.7);

        if (progress < 0.85) {
          const rand = filteredTopics[Math.floor(Math.random() * filteredTopics.length)];
          setSelectedTopic(rand);
        }
      }

      if (progress < 1.0) {
        animFrameRef.current = requestAnimationFrame(animateSpin);
      } else {
        setSelectedTopic(targetTopic);
        setIsSpinning(false);
        audioEngine.playLandingSound();
      }
    };

    animFrameRef.current = requestAnimationFrame(animateSpin);
  }, [isSpinning, filteredTopics]);

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) return;

      if (e.key === 'Escape') {
        setIsSettingsOpen(false);
        setIsShortcutsOpen(false);
        if (currentView === 'timer') setCurrentView('machine');
        return;
      }

      if ((e.key === ' ' || e.key === 'ArrowDown') && currentView === 'machine') {
        e.preventDefault();
        handleStartSpin();
      } else if (e.key.toLowerCase() === 'm') {
        setSettings((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }));
      } else if (e.key.toLowerCase() === 's') {
        setIsSettingsOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleStartSpin, currentView]);

  const updateSettings = (newSt: Partial<UserSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSt }));
  };

  // Standalone Full Screen Timer View
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
        {/* Header */}
        <Header
          soundEnabled={settings.soundEnabled}
          onToggleSound={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenShortcuts={() => setIsShortcutsOpen(true)}
        />

        <main className="w-full max-w-5xl mx-auto px-4 py-3 flex flex-col items-center">
          {/* Category Niche & Difficulty Filters */}
          <CategoryFilter
            selectedCategory={category}
            onSelectCategory={handleSelectCategory}
            selectedDifficulty={difficulty}
            onSelectDifficulty={handleSelectDifficulty}
          />

          {/* Action Buttons Row */}
          <div className="flex items-center justify-center gap-4 my-3 flex-wrap">
            <button
              onClick={handleStartSpin}
              disabled={isSpinning || filteredTopics.length === 0}
              className={`px-8 py-3 rounded-full text-xs font-mono uppercase tracking-widest font-bold transition-all flex items-center gap-2 border cursor-pointer ${isSpinning
                  ? 'bg-[#111111] border-white/[0.05] text-[#666666] cursor-not-allowed'
                  : 'bg-[#C58A55] border-[#C58A55] text-[#090909] shadow-glow-gold hover:opacity-90'
                }`}
            >
              <Play className="w-4 h-4 fill-current" />
              {isSpinning ? 'SPINNING...' : 'SPIN SEED!'}
            </button>

            {selectedTopic && !isSpinning && (
              <button
                onClick={() => {
                  audioEngine.playClickSound();
                  setCurrentView('timer');
                }}
                className="px-8 py-3 rounded-full bg-[#181818] border border-[#7CC8F3]/50 text-[#7CC8F3] hover:bg-[#7CC8F3] hover:text-[#090909] transition-all text-xs font-mono uppercase tracking-wider font-bold cursor-pointer shadow-glow-cyan flex items-center gap-2"
              >
                Start Timer →
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Main Stage: Topic Card with Lever BESIDE it */}
          <div className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 my-2">
            {/* Left: Clean Topic Card */}
            <div className="flex-1 w-full min-w-0">
              <TopicCard
                topic={selectedTopic}
                isSpinning={isSpinning}
                onSpinAgain={handleStartSpin}
              />
            </div>

            {/* Right: Mechanical Slot Lever Positioned BESIDE Topic Card */}
            <div className="flex items-center justify-center p-2 bg-[#111111]/80 rounded-3xl border border-white/[0.08] shadow-xl">
              <PullHandle
                onSpin={handleStartSpin}
                isSpinning={isSpinning}
                disabled={filteredTopics.length === 0}
              />
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={updateSettings}
      />

      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />
    </div>
  );
};

export default App;
