import React from 'react';
import { motion } from 'framer-motion';
import type { Topic } from '../types';
import { Sparkles } from 'lucide-react';

interface TopicCardProps {
  topic: Topic | null;
  isSpinning?: boolean;
}

export const TopicCard: React.FC<TopicCardProps> = ({
  topic,
  isSpinning,
}) => {
  if (!topic) {
    return (
      <div className="w-full">
        <p className="text-m text-[#AAAAAA]">
          Pull the lever or press [SPACE] to draw your first thinking seed.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">

      {/* Header Row: Category + Action Buttons */}
      <div className="flex items-center justify-between gap-3 mb-3  flex-wrap">
        <div className="flex items-center gap-2  flex-wrap">

          {/* Thinking Seed Badge */}
          <span className="px-3 py-1 rounded-full flex items-center justify-center bg-[#C58A55]/20 border border-[#C58A55]/50 text-[#C58A55]">
            <Sparkles className="w-4 h-4" />
          </span>

          {/* Category */}
          <span className="text-xs font-mono tracking-wider uppercase px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#AAAAAA]">
            {topic.category}
          </span>

        </div>
      </div>

      {/* Animated Topic */}
      <div className="min-h-[100px] flex items-center my-2 mt-12 overflow-hidden relative">

        <motion.h2
          key={topic.id}
          initial={{ opacity: 0, y: 11 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.18,
            ease: "easeOut"
          }}
          className="
             font-serif
            text-[#F5F2EC]
            leading-[1.15]
            tracking-tight
            break-words
            w-full
            text-[3.5rem]
            sm:text-[4rem]
            lg:text-[6rem]
            font-normal text-left
          "
        >
          {topic.title}
        </motion.h2>

      </div>

    </div>
  );
};