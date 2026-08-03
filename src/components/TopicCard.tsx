import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Topic } from '../types';
import {
  Lightbulb,
  ListChecks,
  Sparkles
} from 'lucide-react';

interface TopicCardProps {
  topic: Topic | null;
  isSpinning?: boolean;
}
export const TopicCard: React.FC<TopicCardProps> = ({
  topic,
  isSpinning = false,
}) => {
  const [showDetails, setShowDetails] = useState(true);

  if (!topic) {
    return (
      <div className="w-full max-w-3xl my-6 p-8 rounded-3xl bg-[#141414] border border-white/[0.1] text-center">
        <p className="text-[#AAAAAA] font-serif text-xl">
          Pull the lever or press <span className="text-[#C58A55] font-mono">[SPACE]</span> to draw your first thinking seed.
        </p>
      </div>
    );
  }



  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy':
        return 'text-[#78B26A] bg-[#78B26A]/10 border-[#78B26A]/30';
      case 'Medium':
        return 'text-[#7CC8F3] bg-[#7CC8F3]/10 border-[#7CC8F3]/30';
      case 'Hard':
        return 'text-[#C58A55] bg-[#C58A55]/10 border-[#C58A55]/30';
      case 'Extreme':
        return 'text-[#E05D5D] bg-[#E05D5D]/10 border-[#E05D5D]/30';
      default:
        return 'text-[#AAAAAA] bg-white/5 border-white/10';
    }
  };

  return (
    <div className="w-full max-w-3xl my-4 p-6 sm:p-8 rounded-3xl bg-[#141414] border border-white/[0.1] shadow-2xl relative overflow-hidden transition-all duration-300">
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#C58A55]/[0.03] rounded-full blur-3xl pointer-events-none" />

      {/* Header Row: Category & Difficulty + Action Buttons */}
      <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Thinking Seed Badge */}
          <span className="px-3 py-1 rounded-full flex items-center justify-center bg-[#C58A55]/20 border border-[#C58A55]/50 text-[#C58A55]">
            <Sparkles className="w-4 h-4" />
          </span>

          <span className="text-xs font-mono tracking-wider uppercase px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#AAAAAA]">
            {topic.category}
          </span>

          <span
            className={`text-xs font-mono tracking-wider uppercase px-3 py-1 rounded-full border ${getDifficultyColor(
              topic.difficulty
            )}`}
          >
            {topic.difficulty}
          </span>
        </div>


      </div>

      {/* Animated Seed/Topic Display with Framer Motion */}
      <div className="min-h-[100px] flex items-center my-3 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.h2
            key={topic.id}
            initial={{ opacity: 0, y: isSpinning ? 15 : -15, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: isSpinning ? -15 : 15, filter: 'blur(4px)' }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="font-serif text-[#F5F2EC] leading-none tracking-tight break-words w-full text-[3rem] sm:text-[4.2rem] lg:text-[5rem] font-normal"          >
            {topic.title}
          </motion.h2>
        </AnimatePresence>
      </div>

      {/* Thought Prompt & Key Talking Points */}
      {topic.explanation && (
        <div className="mt-5 pt-5 border-t border-white/[0.06] flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-xs font-mono uppercase tracking-wider text-[#C58A55] flex items-center gap-1.5 hover:underline cursor-pointer"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              {showDetails ? 'Hide Thinking Angles' : 'Show Thinking Angles & Talking Points'}
            </button>
          </div>

          {showDetails && (
            <div className="space-y-3 bg-[#090909]/60 p-4 rounded-2xl border border-white/[0.05]">
              <p className="text-xs sm:text-sm text-[#AAAAAA] leading-relaxed break-words">
                <strong className="text-[#F5F2EC] font-normal">Core Concept: </strong>
                {topic.explanation}
              </p>

              {topic.keyPoints && topic.keyPoints.length > 0 && (
                <div className="mt-3 pt-3 border-t border-white/[0.04]">
                  <span className="text-[11px] font-mono text-[#666666] uppercase block mb-1.5 flex items-center gap-1">
                    <ListChecks className="w-3.5 h-3.5 text-[#C58A55]" /> Key angles to explore:
                  </span>
                  <ul className="list-disc list-inside text-xs text-[#AAAAAA] space-y-1 pl-1">
                    {topic.keyPoints.map((point, idx) => (
                      <li key={idx} className="break-words">{point}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Tags */}
      {topic.tags && topic.tags.length > 0 && (
        <div className="flex items-center gap-2.5 mt-5 flex-wrap">
          {topic.tags.map((tag) => (
            <span key={tag} className="text-[11px] font-mono text-[#666666]">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
