import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Header } from './components/Header';
import { CategoryFilter } from './components/CategoryFilter';
import { PullHandle } from './components/PullHandle';
import { TopicCard } from './components/TopicCard';
import { TimerPage } from './components/TimerPage';
import { KeyboardShortcutsModal } from './components/KeyboardShortcutsModal';
import { Footer } from './components/Footer';

import { TOPICS } from './data/topics';
import type { Topic, Category, Difficulty, UserSettings } from './types';
import { audioEngine } from './utils/audioEngine';
import { Play, ArrowRight } from 'lucide-react';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'machine' | 'timer'>('machine');

  const [category, setCategory] = useState<Category | 'All'>('All');
  const [difficulty, setDifficulty] = useState<Difficulty | 'All'>('All');

  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

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
      const matchDifficulty = difficulty === 'All' || t.difficulty === difficulty;
      return matchCategory && matchDifficulty;
    });
  }, [category, difficulty]);

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
      const matchDiff = difficulty === 'All' || t.difficulty === difficulty;
      return matchCat && matchDiff;
    });

    if (pool.length > 0) {
      const randomFromNiche = pool[Math.floor(Math.random() * pool.length)];
      setSelectedTopic(randomFromNiche);
    }
  };

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

  // Smooth 2-second spin with tick sound on same pace
  const handleStartSpin = useCallback(() => {

    if (isSpinning || filteredTopics.length === 0) return;

    setIsSpinning(true);

    const target =
      filteredTopics[Math.floor(Math.random() * filteredTopics.length)];

    let delay = 45;          // VERY FAST START
    const maxDelay = 260;    // VERY SLOW END

    const spin = () => {

      const random =
        filteredTopics[Math.floor(Math.random() * filteredTopics.length)];

      setSelectedTopic(random);

      audioEngine.playTickSound(0.7);

      delay += 10;

      if (delay < maxDelay) {

        setTimeout(spin, delay);

      } else {

        // Dramatic pause before landing
        setTimeout(() => {

          setSelectedTopic(target);

          audioEngine.playLandingSound();

          setIsSpinning(false);

        }, 350);

      }

    };

    spin();

  }, [filteredTopics, isSpinning]);

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
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
            selectedDifficulty={difficulty}
            onSelectDifficulty={handleSelectDifficulty}
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

          <div className="flex items-center justify-center gap-3 sm:gap-4 my-3 flex-wrap w-full max-w-3xl">
            <button
              onClick={handleStartSpin}
              disabled={isSpinning || filteredTopics.length === 0}
              className={`flex-1 sm:flex-none px-8 py-3.5 rounded-full text-xs font-mono uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2 border cursor-pointer min-w-0 ${isSpinning
                ? 'bg-[#111111] border-white/[0.05] text-[#666666] cursor-not-allowed'
                : 'bg-[#C58A55] border-[#C58A55] text-[#090909] shadow-glow-gold hover:opacity-90'
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
                className="flex-1 sm:flex-none px-8 py-3.5 rounded-full bg-[#181818] border border-[#7CC8F3]/50 text-[#7CC8F3] hover:bg-[#7CC8F3] hover:text-[#090909] transition-all text-xs font-mono uppercase tracking-wider font-bold cursor-pointer shadow-glow-cyan flex items-center justify-center gap-2 min-w-0"
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
