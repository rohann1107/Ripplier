import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="gap-5 w-full max-w-6xl mx-auto px-4 py-8 mt-16 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#666666]">
      <div className="flex items-center gap-4">
        <span>•</span>
        <span>RIPPLIER — Ideas that keep rippling</span>
      </div>
      <div className="flex items-center gap-4">
        <span>•</span>
        <span>Made By Ranchoo ❤️</span>

      </div>
    </footer>
  );
};
