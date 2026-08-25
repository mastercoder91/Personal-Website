import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Radio, Volume2, Sparkles, Music, Terminal, Zap } from 'lucide-react';
import { audio } from '../utils/audio';

interface EasterEggVaultProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EasterEggVault: React.FC<EasterEggVaultProps> = ({ isOpen, onClose }) => {
  const [activePad, setActivePad] = useState<string | null>(null);

  const triggerPad = (type: 'kick' | 'snare' | 'hihat' | 'synth') => {
    setActivePad(type);
    audio.playDrumPad(type);
    setTimeout(() => setActivePad(null), 150);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === '1') triggerPad('kick');
      else if (e.key === '2') triggerPad('snare');
      else if (e.key === '3') triggerPad('hihat');
      else if (e.key === '4' || e.key === ' ') triggerPad('synth');
      else if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#141414]/90 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          className="relative w-full max-w-xl bg-[#141414] text-[#F5F2ED] border-2 sm:border-4 border-[#E6A92A] p-4 sm:p-8 shadow-[6px_6px_0px_#D95D39] sm:shadow-[12px_12px_0px_#D95D39] font-mono-retro my-auto"
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b-2 border-stone-700 pb-3 sm:pb-4 mb-4 sm:mb-6">
            <div className="flex items-center space-x-2.5 sm:space-x-3">
              <div className="w-8 sm:w-10 h-8 sm:h-10 bg-[#D95D39] text-[#F5F2ED] flex items-center justify-center border-2 border-[#E6A92A] shrink-0">
                <Radio className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
              </div>
              <div>
                <span className="text-[9px] sm:text-[10px] text-[#E6A92A] font-bold tracking-widest uppercase">
                  ● SECRET STUDIO ARTIFACT · गुप्त ध्वनि कार्यशाला
                </span>
                <h3 className="font-rozha text-xl sm:text-3xl font-black text-[#F5F2ED] leading-tight">
                  1984 NAGPUR BEAT MACHINE
                </h3>
                <span className="font-hindi text-xs sm:text-sm text-[#E6A92A] font-bold block">
                  ॥ १९८४ नागपुर ताल एवं स्वर यंत्र ॥
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                audio.playClick(400);
                onClose();
              }}
              className="p-1 sm:p-1.5 bg-[#2A2624] hover:bg-[#D95D39] border border-stone-600 transition-colors shrink-0"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </button>
          </div>

          <p className="text-xs text-stone-300 font-sans mb-4 sm:mb-6 leading-relaxed">
            You found the hidden audio workshop! Tap the pads or press keys <strong>[1] [2] [3] [4]</strong> on your keyboard to jam with vintage synthesized analog percussion.
          </p>

          {/* 4 Interactive Drum Pads */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-4 mb-4 sm:mb-6">
            <button
              onClick={() => triggerPad('kick')}
              className={`p-3.5 sm:p-6 border-2 border-stone-600 flex flex-col items-center justify-center transition-all ${
                activePad === 'kick'
                  ? 'bg-[#D95D39] border-[#F5F2ED] scale-95 shadow-inner'
                  : 'bg-[#2A2624] hover:bg-[#3D3734] shadow-[2px_2px_0px_#000] sm:shadow-[4px_4px_0px_#000]'
              }`}
            >
              <span className="text-[9px] sm:text-[10px] text-[#E6A92A] font-bold">[1] KICK</span>
              <span className="font-rozha text-base sm:text-xl text-white font-bold mt-0.5 sm:mt-1">ANALOG KICK</span>
              <span className="font-hindi text-xs text-[#F5F2ED] font-bold mt-0.5">धम (ताल)</span>
              <span className="text-[8px] sm:text-[9px] text-stone-400">808 Low-End</span>
            </button>

            <button
              onClick={() => triggerPad('snare')}
              className={`p-3.5 sm:p-6 border-2 border-stone-600 flex flex-col items-center justify-center transition-all ${
                activePad === 'snare'
                  ? 'bg-[#0E3D3C] border-[#F5F2ED] scale-95 shadow-inner'
                  : 'bg-[#2A2624] hover:bg-[#3D3734] shadow-[2px_2px_0px_#000] sm:shadow-[4px_4px_0px_#000]'
              }`}
            >
              <span className="text-[9px] sm:text-[10px] text-[#E6A92A] font-bold">[2] SNARE</span>
              <span className="font-rozha text-base sm:text-xl text-white font-bold mt-0.5 sm:mt-1">RETRO SNARE</span>
              <span className="font-hindi text-xs text-[#F5F2ED] font-bold mt-0.5">छन (झांझ)</span>
              <span className="text-[8px] sm:text-[9px] text-stone-400">Noise Crack</span>
            </button>

            <button
              onClick={() => triggerPad('hihat')}
              className={`p-3.5 sm:p-6 border-2 border-stone-600 flex flex-col items-center justify-center transition-all ${
                activePad === 'hihat'
                  ? 'bg-[#E6A92A] text-black border-[#F5F2ED] scale-95 shadow-inner'
                  : 'bg-[#2A2624] hover:bg-[#3D3734] shadow-[2px_2px_0px_#000] sm:shadow-[4px_4px_0px_#000]'
              }`}
            >
              <span className="text-[9px] sm:text-[10px] text-[#D95D39] font-bold">[3] HI-HAT</span>
              <span className="font-rozha text-base sm:text-xl text-white font-bold mt-0.5 sm:mt-1">8-BIT HAT</span>
              <span className="font-hindi text-xs text-[#F5F2ED] font-bold mt-0.5">टंकार</span>
              <span className="text-[8px] sm:text-[9px] text-stone-400">Metallic Tock</span>
            </button>

            <button
              onClick={() => triggerPad('synth')}
              className={`p-3.5 sm:p-6 border-2 border-stone-600 flex flex-col items-center justify-center transition-all ${
                activePad === 'synth'
                  ? 'bg-[#8A252C] border-[#F5F2ED] scale-95 shadow-inner'
                  : 'bg-[#2A2624] hover:bg-[#3D3734] shadow-[2px_2px_0px_#000] sm:shadow-[4px_4px_0px_#000]'
              }`}
            >
              <span className="text-[9px] sm:text-[10px] text-[#E6A92A] font-bold">[4] CHORD</span>
              <span className="font-rozha text-base sm:text-xl text-white font-bold mt-0.5 sm:mt-1">DISCO CHORD</span>
              <span className="font-hindi text-xs text-[#F5F2ED] font-bold mt-0.5">राग स्वर</span>
              <span className="text-[8px] sm:text-[9px] text-stone-400">Synth Stab</span>
            </button>
          </div>

          {/* Bottom Terminal Status */}
          <div className="p-2.5 sm:p-3 bg-black/60 border border-stone-700 flex items-center justify-between text-[9px] sm:text-[11px] text-stone-400">
            <div className="flex items-center space-x-1.5 sm:space-x-2 truncate mr-2">
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E6A92A] shrink-0" />
              <span className="truncate">KONAMI: ↑ ↑ ↓ ↓ ← → ← → B A</span>
            </div>
            <span className="text-[#D95D39] font-bold shrink-0">ONLINE</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
