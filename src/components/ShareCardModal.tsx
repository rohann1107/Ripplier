import React, { useState } from 'react';
import { X, Copy, Check, Sparkles, Share2 } from 'lucide-react';
import type { Topic } from '../types';
import { audioEngine } from '../utils/audioEngine';

interface ShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  topic: Topic | null;
}

export const ShareCardModal: React.FC<ShareCardModalProps> = ({
  isOpen,
  onClose,
  topic,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !topic) return null;

  const shareText = `⚡ Practicing spontaneous speaking on Antigravity:\n\n"${topic.title}"\n\nCategory: ${topic.category} | Level: ${topic.difficulty}\n\nTry it on Antigravity!`;

  const handleCopyText = () => {
    audioEngine.playClickSound();
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareTwitter = () => {
    audioEngine.playClickSound();
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090909]/85 backdrop-blur-md">
      <div className="w-full max-w-lg p-6 sm:p-8 rounded-2xl bg-[#141414] border border-white/[0.1] shadow-2xl relative space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
          <div className="flex items-center gap-2 text-lg font-serif text-[#F5F2EC]">
            <Sparkles className="w-5 h-5 text-[#C58A55]" />
            Share Speaking Challenge
          </div>
          <button
            onClick={() => {
              audioEngine.playClickSound();
              onClose();
            }}
            className="p-2 rounded-full bg-[#181818] border border-white/[0.08] text-[#AAAAAA] hover:text-[#F5F2EC] cursor-pointer transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Editorial Share Preview Card */}
        <div className="p-6 rounded-xl bg-gradient-to-br from-[#181818] to-[#0D0D0D] border border-[#C58A55]/30 shadow-glow-gold relative overflow-hidden space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono tracking-widest text-[#C58A55] uppercase">
              ANTIGRAVITY // TOPIC
            </span>
            <span className="text-[10px] font-mono text-[#666666] uppercase">
              {topic.category} • {topic.difficulty}
            </span>
          </div>

          <h3 className="font-serif text-2xl text-[#F5F2EC] leading-snug">
            "{topic.title}"
          </h3>

          <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-[#AAAAAA]">
            <span>60s Challenge</span>
            <span className="text-[#C58A55]">antigravity.app</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2.5">
          <button
            onClick={handleCopyText}
            className="w-full py-3 rounded-xl bg-[#181818] border border-white/[0.1] text-[#F5F2EC] hover:border-[#C58A55]/50 transition-all font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-[#78B26A]" /> : <Copy className="w-4 h-4" />}
            {copied ? 'COPIED TO CLIPBOARD' : 'COPY SHAREABLE TEXT'}
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleShareTwitter}
              className="py-2.5 rounded-xl bg-[#1D9BF0]/15 border border-[#1D9BF0]/40 text-[#1D9BF0] hover:bg-[#1D9BF0] hover:text-white transition-all font-mono text-xs uppercase flex items-center justify-center gap-2 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" /> X / Twitter
            </button>
            <button
              onClick={handleCopyText}
              className="py-2.5 rounded-xl bg-[#0A66C2]/15 border border-[#0A66C2]/40 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all font-mono text-xs uppercase flex items-center justify-center gap-2 cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" /> Copy Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
