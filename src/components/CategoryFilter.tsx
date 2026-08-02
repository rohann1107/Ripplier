import React, { useRef } from 'react';
import type { Category, Difficulty } from '../types';
import { CATEGORIES } from '../data/topics';
import { audioEngine } from '../utils/audioEngine';
import { ChevronLeft, ChevronRight, Layers } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (cat: Category | 'All') => void;
  selectedDifficulty: Difficulty | 'All';
  onSelectDifficulty: (diff: Difficulty | 'All') => void;
}

const DIFFICULTIES: (Difficulty | 'All')[] = ['All', 'Easy', 'Medium', 'Hard', 'Extreme'];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedDifficulty,
  onSelectDifficulty,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    audioEngine.playClickSound();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -220, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    audioEngine.playClickSound();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 220, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 my-3 flex flex-col gap-3">
      {/* Difficulty Selector Row */}
      <div className="flex items-center justify-center gap-1.5 flex-wrap">
        <span className="text-xs font-mono uppercase text-[#666666] mr-2">Level:</span>
        {DIFFICULTIES.map((diff) => {
          const active = selectedDifficulty === diff;
          return (
            <button
              key={diff}
              onClick={() => {
                audioEngine.playClickSound();
                onSelectDifficulty(diff);
              }}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer border ${
                active
                  ? 'bg-[#C58A55]/15 border-[#C58A55] text-[#C58A55] shadow-glow-gold'
                  : 'bg-[#181818] border-white/[0.08] text-[#AAAAAA] hover:text-[#F5F2EC] hover:border-white/[0.2]'
              }`}
            >
              {diff}
            </button>
          );
        })}
      </div>

      {/* Horizontal Scrollable Category Niche Bar with Controls */}
      <div className="relative w-full flex items-center gap-1 border-t border-b border-white/[0.06] py-2">
        {/* Scroll Left Button */}
        <button
          onClick={scrollLeft}
          className="p-1.5 rounded-full bg-[#181818] border border-white/[0.08] text-[#AAAAAA] hover:text-[#C58A55] transition-all cursor-pointer shrink-0 z-10"
          title="Scroll Left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="w-full overflow-x-auto py-1 no-scrollbar flex items-center justify-start gap-2 scroll-smooth cursor-grab active:cursor-grabbing"
        >
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  audioEngine.playClickSound();
                  onSelectCategory(cat as Category | 'All');
                }}
                className={`px-4 py-1.5 rounded-xl text-xs font-mono tracking-wide whitespace-nowrap transition-all cursor-pointer border ${
                  active
                    ? 'bg-[#C58A55] border-[#C58A55] text-[#090909] font-bold shadow-glow-gold scale-105'
                    : 'bg-[#111111] border-white/[0.06] text-[#AAAAAA] hover:text-[#F5F2EC] hover:border-white/[0.2]'
                }`}
              >
                {cat === 'All' ? '🌐 All Topics' : cat}
              </button>
            );
          })}
        </div>

        {/* Scroll Right Button */}
        <button
          onClick={scrollRight}
          className="p-1.5 rounded-full bg-[#181818] border border-white/[0.08] text-[#AAAAAA] hover:text-[#C58A55] transition-all cursor-pointer shrink-0 z-10"
          title="Scroll Right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Active Niche Indicator */}
      <div className="flex items-center justify-between px-2 text-[11px] font-mono text-[#AAAAAA]">
        <span className="flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-[#C58A55]" />
          Active Niche: <strong className="text-[#C58A55] font-normal">{selectedCategory}</strong>
        </span>
        <span>Drag or click arrows to explore niches</span>
      </div>
    </div>
  );
};
