import React from 'react';
import { X, Command } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'SPACE / ↓', label: 'Pull lever & spin topic reel' },
    { key: 'R', label: 'Reset timer to default duration' },
    { key: 'M', label: 'Toggle mechanical audio mute' },
    { key: 'S', label: 'Open Settings configuration' },
    { key: 'ESC', label: 'Close open dialog modal' }, //
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090909]/85 backdrop-blur-md">
      <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl bg-[#141414] border border-white/[0.1] shadow-2xl relative space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
          <div className="flex items-center gap-2 text-lg font-serif text-[#F5F2EC]">
            <Command className="w-5 h-5 text-[#C58A55]" />
            Keyboard Navigation
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

        {/* Shortcuts list */}
        <div className="space-y-3">
          {shortcuts.map((sc, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 rounded-xl bg-[#111111] border border-white/[0.04]"
            >
              <span className="text-xs text-[#AAAAAA]">{sc.label}</span>
              <kbd className="px-2.5 py-1 rounded bg-[#181818] border border-white/[0.1] text-xs font-mono text-[#C58A55]">
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="pt-2 text-center">
          <span className="text-[11px] font-mono text-[#666666]">
            Press keys directly anywhere on the app stage.
          </span>
        </div>
      </div>
    </div>
  );
};
