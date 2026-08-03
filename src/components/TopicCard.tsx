import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Topic } from '../types';
import { Sparkles } from 'lucide-react';

interface TopicCardProps {
  topic: Topic | null;
  isSpinning?: boolean;
}
export const TopicCard: React.FC<TopicCardProps> = ({
  topic,
  isSpinning = false,
}) => {

  if (!topic) {
    return (
      <div className="w-full max-w-3xl my-6 p-8 rounded-3xl bg-[#141414] border border-white/[0.1] text-center">
        <p className="text-[#AAAAAA] font-serif text-xl">
          Pull the lever or press <span className="text-[#C58A55] font-mono">[SPACE]</span> to draw your first thinking seed.
        </p>
      </div>
    );
  }



  return (
    <div className="w-full max-w-4xl mx-auto my-3 p-6 sm:p-8 rounded-3xl bg-[#141414] border border-white/[0.1] shadow-2xl relative overflow-hidden transition-all duration-300">
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#C58A55]/[0.03] rounded-full blur-3xl pointer-events-none" />

      {/* Header Row: Category + Action Buttons */}
      <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Thinking Seed Badge */}
          <span className="px-3 py-1 rounded-full flex items-center justify-center bg-[#C58A55]/20 border border-[#C58A55]/50 text-[#C58A55]">
            <Sparkles className="w-4 h-4" />
          </span>

          <span className="text-xs font-mono tracking-wider uppercase px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#AAAAAA]">
            {topic.category}
          </span>
        </div>


      </div>

      {/* Animated Seed/Topic Display with Framer Motion */}
      <div className="min-h-[100px] flex items-center my-2 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.h2
            key={topic.id}
            initial={{ opacity: 0, y: isSpinning ? 15 : -15, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: isSpinning ? -15 : 15, filter: 'blur(4px)' }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="font-serif text-[#F5F2EC] leading-[1.15] tracking-tight break-words w-full text-[2.2rem] sm:text-[4.2rem] lg:text-[4.1rem] font-normal"          >
            {topic.title}
          </motion.h2>
        </AnimatePresence>
      </div>

    </div>
  );
};
