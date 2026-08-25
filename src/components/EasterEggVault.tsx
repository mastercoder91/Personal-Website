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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141414]/90 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          className="relative w-full max-w-xl bg-[#141414] text-[#F5F2ED] border-4 border-[#E6A92A] p-6 sm:p-8 shadow-[12px_12px_0px_#D95D39] font-mono-retro"
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b-2 border-stone-700 pb-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#D95D39] text-[#F5F2ED] flex items-center justify-center border-2 border-[#E6A92A]">
                <Radio className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] text-[#E6A92A] font-bold tracking-widest uppercase">
                  ● SECRET STUDIO ARTIFACT
                </span>
                <h3 className="font-rozha text-2xl sm:text-3xl font-black text-[#F5F2ED] leading-none">
                  1984 NAGPUR BEAT MACHINE
                </h3>
              </div>
            </div>

            <button
              onClick={() => {
                audio.playClick(400);
                onClose();
              }}
              className="p-1.5 bg-[#2A2624] hover:bg-[#D95D39] border border-stone-600 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          <p className="text-xs text-stone-300 font-sans mb-6">
            You found the hidden audio workshop! Tap the pads or press keys <strong>[1] [2] [3] [4]</strong> on your keyboard to jam with vintage synthesized analog percussion.
          </p>

          {/* 4 Interactive Drum Pads */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => triggerPad('kick')}
              className={`p-6 border-2 border-stone-600 flex flex-col items-center justify-center transition-all ${
                activePad === 'kick'
                  ? 'bg-[#D95D39] border-[#F5F2ED] scale-95 shadow-inner'
                  : 'bg-[#2A2624] hover:bg-[#3D3734] shadow-[4px_4px_0px_#000]'
              }`}
            >
              <span className="text-[10px] text-[#E6A92A] font-bold">[KEY 1]</span>
              <span className="font-rozha text-xl text-white font-bold mt-1">ANALOG KICK</span>
              <span className="text-[9px] text-stone-400">808 Low-End Thump</span>
            </button>

            <button
              onClick={() => triggerPad('snare')}
              className={`p-6 border-2 border-stone-600 flex flex-col items-center justify-center transition-all ${
                activePad === 'snare'
                  ? 'bg-[#0E3D3C] border-[#F5F2ED] scale-95 shadow-inner'
                  : 'bg-[#2A2624] hover:bg-[#3D3734] shadow-[4px_4px_0px_#000]'
              }`}
            >
              <span className="text-[10px] text-[#E6A92A] font-bold">[KEY 2]</span>
              <span className="font-rozha text-xl text-white font-bold mt-1">RETRO SNARE</span>
              <span className="text-[9px] text-stone-400">Filtered Noise Crack</span>
            </button>

            <button
              onClick={() => triggerPad('hihat')}
              className={`p-6 border-2 border-stone-600 flex flex-col items-center justify-center transition-all ${
                activePad === 'hihat'
                  ? 'bg-[#E6A92A] text-black border-[#F5F2ED] scale-95 shadow-inner'
                  : 'bg-[#2A2624] hover:bg-[#3D3734] shadow-[4px_4px_0px_#000]'
              }`}
            >
              <span className="text-[10px] text-[#D95D39] font-bold">[KEY 3]</span>
              <span className="font-rozha text-xl text-white font-bold mt-1">8-BIT HI-HAT</span>
              <span className="text-[9px] text-stone-400">Square Metallic Tock</span>
            </button>

            <button
              onClick={() => triggerPad('synth')}
              className={`p-6 border-2 border-stone-600 flex flex-col items-center justify-center transition-all ${
                activePad === 'synth'
                  ? 'bg-[#8A252C] border-[#F5F2ED] scale-95 shadow-inner'
                  : 'bg-[#2A2624] hover:bg-[#3D3734] shadow-[4px_4px_0px_#000]'
              }`}
            >
              <span className="text-[10px] text-[#E6A92A] font-bold">[KEY 4 / SPACE]</span>
              <span className="font-rozha text-xl text-white font-bold mt-1">DISCO CHORD</span>
              <span className="text-[9px] text-stone-400">1984 Raga Synth Stab</span>
            </button>
          </div>

          {/* Bottom Terminal Status */}
          <div className="p-3 bg-black/60 border border-stone-700 flex items-center justify-between text-[11px] text-stone-400">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-[#E6A92A]" />
              <span>KONAMI CODE UNLOCKED: ↑ ↑ ↓ ↓ ← → ← → B A</span>
            </div>
            <span className="text-[#D95D39] font-bold">READY</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
