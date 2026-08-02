import React from 'react';
import { X, Volume2, Clock, Sliders } from 'lucide-react';
import type { UserSettings } from '../types';
import { audioEngine } from '../utils/audioEngine';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: UserSettings;
  onUpdateSettings: (newSettings: Partial<UserSettings>) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090909]/80 backdrop-blur-md">
      <div className="w-full max-w-lg p-6 sm:p-8 rounded-2xl bg-[#141414] border border-white/[0.1] shadow-2xl relative space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
          <div className="flex items-center gap-2 text-lg font-serif text-[#F5F2EC]">
            <Sliders className="w-5 h-5 text-[#C58A55]" />
            Machine Configuration
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

        {/* Form Controls */}
        <div className="space-y-5">
          {/* Sound & Volume */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono uppercase text-[#AAAAAA] flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-[#C58A55]" /> Mechanical Sound Synthesis
              </label>
              <input
                type="checkbox"
                checked={settings.soundEnabled}
                onChange={(e) => {
                  audioEngine.playClickSound();
                  onUpdateSettings({ soundEnabled: e.target.checked });
                }}
                className="w-4 h-4 accent-[#C58A55] cursor-pointer"
              />
            </div>

            {settings.soundEnabled && (
              <div className="flex items-center gap-3 pt-2">
                <span className="text-xs font-mono text-[#666666]">Volume:</span>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={settings.volume}
                  onChange={(e) => {
                    const vol = parseFloat(e.target.value);
                    onUpdateSettings({ volume: vol });
                    audioEngine.setVolume(vol);
                  }}
                  className="w-full accent-[#C58A55] cursor-pointer h-1.5 bg-[#181818] rounded-lg"
                />
                <span className="text-xs font-mono text-[#AAAAAA] w-8">
                  {Math.round(settings.volume * 100)}%
                </span>
              </div>
            )}
          </div>

          {/* Timer Default Duration */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase text-[#AAAAAA] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#7CC8F3]" /> Default Speaking Timer
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[30, 60, 90, 120].map((dur) => (
                <button
                  key={dur}
                  onClick={() => {
                    audioEngine.playClickSound();
                    onUpdateSettings({ timerDuration: dur });
                  }}
                  className={`py-2 rounded-lg text-xs font-mono transition-all border cursor-pointer ${
                    settings.timerDuration === dur
                      ? 'bg-[#C58A55] border-[#C58A55] text-[#090909] font-medium'
                      : 'bg-[#181818] border-white/[0.06] text-[#AAAAAA] hover:text-[#F5F2EC]'
                  }`}
                >
                  {dur}s
                </button>
              ))}
            </div>
          </div>

          {/* Auto Start Timer Toggle */}
          <div className="flex items-center justify-between pt-2 border-t border-white/[0.04]">
            <span className="text-xs font-mono text-[#AAAAAA]">Auto-Start Timer on Topic Landing</span>
            <input
              type="checkbox"
              checked={settings.autoStartTimer}
              onChange={(e) => {
                audioEngine.playClickSound();
                onUpdateSettings({ autoStartTimer: e.target.checked });
              }}
              className="w-4 h-4 accent-[#C58A55] cursor-pointer"
            />
          </div>

          {/* Reduced Motion Toggle */}
          <div className="flex items-center justify-between pt-2 border-t border-white/[0.04]">
            <span className="text-xs font-mono text-[#AAAAAA]">Reduced Motion (Disable Confetti)</span>
            <input
              type="checkbox"
              checked={settings.reducedMotion}
              onChange={(e) => {
                audioEngine.playClickSound();
                onUpdateSettings({ reducedMotion: e.target.checked });
              }}
              className="w-4 h-4 accent-[#C58A55] cursor-pointer"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/[0.06] flex justify-end">
          <button
            onClick={() => {
              audioEngine.playClickSound();
              onClose();
            }}
            className="px-6 py-2 rounded-full bg-[#C58A55] text-[#090909] text-xs font-mono uppercase tracking-wider font-semibold cursor-pointer shadow-glow-gold"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};
