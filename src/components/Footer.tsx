import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full max-w-6xl mx-auto px-4 py-8 mt-16 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#666666]">
      <div>
        <span>RIPPLE v0.1 — Premium Spontaneous Speaking Engine</span>
      </div>
      <div className="flex items-center gap-6">
        <span>Made By Ranchoo</span>
        <span>•</span>
        <span></span>
      </div>
    </footer>
  );
};
