import React from 'react';
import {
  Volume2,
  VolumeX,
  Settings as SettingsIcon,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface HeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenSettings: () => void;
  onOpenShortcuts: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  soundEnabled,
  onToggleSound,
  onOpenSettings,
  onOpenShortcuts,
}) => {
  return (
    <header className="w-full max-w-6xl mx-auto px-4 py-6 flex items-center justify-between border-b border-white/[0.06]">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C58A55] to-[#7D522B] flex items-center justify-center shadow-glow-gold">
          <Sparkles className="w-4 h-4 text-[#090909]" />
        </div>

        <div>
          <h1 className="font-serif text-2xl tracking-wide text-[#F5F2EC] flex items-center gap-2">
            RIPPLE
            <span className="text-[10px] font-mono tracking-widest px-1.5 py-0.5 rounded bg-white/[0.08] text-[#C58A55] uppercase">
              0.1
            </span>
          </h1>

          <p className="text-xs text-[#AAAAAA] tracking-wider uppercase font-mono">
            Spontaneous Topic Machine
          </p>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={() => {
            audioEngine.playClickSound();
            onOpenShortcuts();
          }}
          className="p-2.5 rounded-full bg-[#181818] border border-white/[0.08] text-[#AAAAAA] hover:text-[#F5F2EC] hover:border-[#C58A55]/40 transition-all cursor-pointer"
          title="Keyboard Shortcuts (?)"
          aria-label="Keyboard Shortcuts"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        <button
          onClick={() => {
            audioEngine.playClickSound();
            onToggleSound();
          }}
          className={`p-2.5 rounded-full border transition-all cursor-pointer ${soundEnabled
              ? 'bg-[#181818] border-[#C58A55]/40 text-[#C58A55] shadow-glow-gold'
              : 'bg-[#181818] border-white/[0.08] text-[#666666]'
            }`}
          title={soundEnabled ? 'Mute Sound (M)' : 'Unmute Sound (M)'}
          aria-label="Toggle Sound"
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4" />
          ) : (
            <VolumeX className="w-4 h-4" />
          )}
        </button>

        <button
          onClick={() => {
            audioEngine.playClickSound();
            onOpenSettings();
          }}
          className="p-2.5 rounded-full bg-[#181818] border border-white/[0.08] text-[#AAAAAA] hover:text-[#F5F2EC] hover:border-[#C58A55]/40 transition-all cursor-pointer"
          title="Settings (S)"
          aria-label="Settings"
        >
          <SettingsIcon className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};

export default Header;
// export const Header: React.FC<HeaderProps> = ({
//   soundEnabled,
//   onToggleSound,
//   onOpenSettings,
//   onOpenShortcuts,
// }) => {
//   return (
//     <header className="w-full max-w-6xl mx-auto px-4 py-6 flex items-center justify-between border-b border-white/[0.06]">
//       {/* Brand logo & tagline */}
//       <div className="flex items-center gap-3">
//         <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C58A55] to-[#7D522B] flex items-center justify-center shadow-glow-gold">
//           <Sparkles className="w-4.5 h-4.5 text-[#090909]" />
//         </div>
//         <div>
//           <h1 className="font-serif text-2xl tracking-wide text-[#F5F2EC] flex items-center gap-2">
//             RIPPLE test
//             <span className="text-[10px] font-mono tracking-widest px-1.5 py-0.5 rounded bg-white/[0.08] text-[#C58A55] uppercase">
//               0.1
//             </span>
//           </h1>
//           <p className="text-xs text-[#AAAAAA] tracking-wider uppercase font-mono">
//             Spontaneous Topic Machine
//           </p>
//         </div>
//       </div>

//       {/* Action buttons */}
//       <div className="flex items-center gap-2 sm:gap-3">
//         <button
//           onClick={() => {
//             audioEngine.playClickSound();
//             onOpenShortcuts();
//           }}
//           className="p-2.5 rounded-full bg-[#181818] border border-white/[0.08] text-[#AAAAAA] hover:text-[#F5F2EC] hover:border-[#C58A55]/40 transition-all cursor-pointer"
//           title="Keyboard Shortcuts (?)"
//           aria-label="Keyboard Shortcuts"
//         >
//           <HelpCircle className="w-4 h-4" />
//         </button>

//         <button
//           onClick={() => {
//             audioEngine.playClickSound();
//             onToggleSound();
//           }}
//           className={`p-2.5 rounded-full border transition-all cursor-pointer flex items-center gap-1.5 ${soundEnabled
//               ? 'bg-[#181818] border-[#C58A55]/40 text-[#C58A55] shadow-glow-gold'
//               : 'bg-[#181818] border-white/[0.08] text-[#666666]'
//             }`}
//           title={soundEnabled ? 'Mute Mechanical Audio (M)' : 'Unmute Mechanical Audio (M)'}
//           aria-label="Toggle Sound"
//         >
//           {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
//         </button>

//         <button
//           onClick={() => {
//             audioEngine.playClickSound();
//             onOpenSettings();
//           }}
//           className="p-2.5 rounded-full bg-[#181818] border border-white/[0.08] text-[#AAAAAA] hover:text-[#F5F2EC] hover:border-[#C58A55]/40 transition-all cursor-pointer"
//           title="Settings (S)"
//           aria-label="Settings"
//         >
//           <SettingsIcon className="w-4 h-4" />
//         </button>
//       </div>
//     </header>
//   );
// };
