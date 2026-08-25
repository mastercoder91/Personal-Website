import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Tv, Sparkles, Radio, HelpCircle, Compass, Feather } from 'lucide-react';
import { audio } from '../utils/audio';
import { ScreenEffectMode } from '../types';

interface NavigationTickerProps {
  screenMode: ScreenEffectMode;
  onScreenModeChange: (mode: ScreenEffectMode) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenEasterEgg: () => void;
  onOpenGuestbook: () => void;
}

export const NavigationTicker: React.FC<NavigationTickerProps> = ({
  screenMode,
  onScreenModeChange,
  isMuted,
  onToggleMute,
  onOpenEasterEgg,
  onOpenGuestbook,
}) => {
  const [nagpurTime, setNagpurTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setNagpurTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    audio.playClick(580);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cycleScreenMode = () => {
    audio.playClick(640);
    if (screenMode === 'clean') onScreenModeChange('crt');
    else if (screenMode === 'crt') onScreenModeChange('riso');
    else onScreenModeChange('clean');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F5F2ED]/95 backdrop-blur-md border-b-2 sm:border-b-4 border-[#141414]">
      {/* Top micro-meta banner */}
      <div className="bg-[#141414] text-[#F5F2ED] px-3 sm:px-4 py-1 sm:py-1.5 text-[9px] sm:text-[11px] font-mono-retro flex items-center justify-between gap-2 border-b border-[#141414] overflow-hidden">
        <div className="flex items-center space-x-2 sm:space-x-3 truncate">
          <span className="inline-block w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#E6A92A] animate-pulse shrink-0"></span>
          <span className="tracking-[0.15em] sm:tracking-[0.25em] uppercase font-bold text-[#E6A92A] truncate">
            VOL. 67 — 2099 / FOLIO
          </span>
          <span className="hidden md:inline text-stone-500">|</span>
          <span className="hidden md:inline text-stone-300 tracking-wider">
            ARCHIVE NO. B-4881 / 1984
          </span>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4 shrink-0">
          <span className="text-stone-300 hidden lg:inline">
            NAGPUR (IST): <strong className="text-[#F5F2ED]">{nagpurTime}</strong>
          </span>
          <span className="text-[#141414] font-bold bg-[#E6A92A] px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase">
            NAGPUR, IN
          </span>
        </div>
      </div>

      {/* Main Publication Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={() => {
              audio.playClick(440);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            data-cursor="TOP"
            className="group flex items-center space-x-2 sm:space-x-2.5 text-left"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#D95D39] text-[#F5F2ED] flex items-center justify-center font-rozha font-bold text-lg sm:text-xl border-2 border-[#141414] shadow-[2px_2px_0px_#141414] sm:shadow-[3px_3px_0px_#141414] group-hover:rotate-12 transition-transform shrink-0">
              आ
            </div>
            <div>
              <div className="font-rozha text-lg sm:text-2xl font-black tracking-tight text-[#141414] group-hover:text-[#D95D39] transition-colors leading-none">
                AARAV
              </div>
              <div className="text-[8px] sm:text-[9px] font-mono-retro uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#D95D39] font-bold mt-0.5">
                CREATIVE CATALYST
              </div>
            </div>
          </button>
        </div>

        {/* Section Jump Links (Desktop) */}
        <nav className="hidden lg:flex items-center space-x-1 font-mono-retro text-xs font-bold text-[#141414]">
          <button
            onClick={() => scrollToSection('manifesto')}
            className="px-3 py-1.5 border border-transparent hover:border-[#141414] hover:bg-[#E6A92A]/20 hover:text-[#D95D39] transition-all"
            data-cursor="ABOUT"
          >
            01. MANIFESTO
          </button>
          <button
            onClick={() => scrollToSection('stamps')}
            className="px-3 py-1.5 border border-transparent hover:border-[#141414] hover:bg-[#E6A92A]/20 hover:text-[#D95D39] transition-all"
            data-cursor="SOCIALS"
          >
            02. STAMPS
          </button>
          <button
            onClick={() => scrollToSection('turntable')}
            className="px-3 py-1.5 border border-transparent hover:border-[#141414] hover:bg-[#E6A92A]/20 hover:text-[#D95D39] transition-all"
            data-cursor="VINYL"
          >
            03. SOUND DECK
          </button>
          <button
            onClick={() => scrollToSection('curiosities')}
            className="px-3 py-1.5 border border-transparent hover:border-[#141414] hover:bg-[#E6A92A]/20 hover:text-[#D95D39] transition-all"
            data-cursor="CURRENTLY"
          >
            04. CABINET
          </button>
          <button
            onClick={() => scrollToSection('guestbook')}
            className="px-3 py-1.5 border border-transparent hover:border-[#141414] hover:bg-[#E6A92A]/20 hover:text-[#D95D39] transition-all"
            data-cursor="SIGN"
          >
            05. GUESTBOOK
          </button>
        </nav>

        {/* Tactile Interactive Controls */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          {/* CRT / Scanline Mode Toggle Switch */}
          <button
            onClick={cycleScreenMode}
            data-cursor="SCREEN MODE"
            title="Toggle Visual Modes (Crisp / 1984 CRT / Risograph Print)"
            className={`flex items-center space-x-1 sm:space-x-1.5 px-2 sm:px-2.5 py-1.5 rounded-none text-xs font-mono-retro font-bold border-2 border-[#141414] shadow-[2px_2px_0px_#141414] sm:shadow-[3px_3px_0px_#141414] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all ${
              screenMode === 'crt'
                ? 'bg-[#164E4D] text-[#F5F2ED]'
                : screenMode === 'riso'
                ? 'bg-[#D95D39] text-[#F5F2ED]'
                : 'bg-[#FFFFFF] text-[#141414] hover:bg-[#F5F2ED]'
            }`}
          >
            <Tv className="w-3.5 h-3.5" />
            <span className="uppercase text-[9px] sm:text-[10px] tracking-wider">
              {screenMode === 'clean' ? 'DIGITAL' : screenMode === 'crt' ? 'CRT' : 'RISO'}
            </span>
          </button>

          {/* Master Sound FX & Synth Toggle */}
          <button
            onClick={() => {
              audio.playClick(500);
              onToggleMute();
            }}
            data-cursor="AUDIO FX"
            title={isMuted ? "Unmute Retro Sounds" : "Mute Retro Sounds"}
            className={`p-1.5 sm:p-2 rounded-none border-2 border-[#141414] shadow-[2px_2px_0px_#141414] sm:shadow-[3px_3px_0px_#141414] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all ${
              !isMuted ? 'bg-[#E6A92A] text-[#141414]' : 'bg-[#E5E0D5] text-stone-500'
            }`}
          >
            {!isMuted ? <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          </button>

          {/* Quick Guestbook Stamp Button */}
          <button
            onClick={() => {
              audio.playClick(600);
              onOpenGuestbook();
            }}
            data-cursor="STAMP SEAL"
            className="hidden sm:flex items-center space-x-1.5 bg-[#D95D39] text-[#F5F2ED] px-3 py-1.5 rounded-none text-xs font-mono-retro font-bold border-2 border-[#141414] shadow-[3px_3px_0px_#141414] hover:bg-[#C04C2A] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
          >
            <Feather className="w-3.5 h-3.5" />
            <span>SIGN</span>
          </button>

          {/* Secret Easter Egg Knob */}
          <button
            onClick={() => {
              audio.playClick(800);
              onOpenEasterEgg();
            }}
            data-cursor="SECRET DECK"
            title="Secret 1984 Tape Deck & Beat Studio (or type Konami Code)"
            className="p-1.5 sm:p-2 bg-[#0E3D3C] text-[#E6A92A] rounded-none border-2 border-[#141414] shadow-[2px_2px_0px_#141414] sm:shadow-[3px_3px_0px_#141414] hover:bg-[#164E4D] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
          >
            <Radio className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin-slow-paused hover:animate-spin" />
          </button>
        </div>
      </div>

      {/* Mobile Horizontal Quick-Jump Pill Strip (Visible on mobile & tablet < lg) */}
      <div className="lg:hidden bg-[#F5F2ED] border-t border-[#141414]/20 px-3 py-1.5 overflow-x-auto flex items-center space-x-2 text-[10px] font-mono-retro font-bold text-[#141414] no-scrollbar">
        <button
          onClick={() => scrollToSection('manifesto')}
          className="whitespace-nowrap px-2.5 py-1 bg-[#FFFFFF] border border-[#141414] shadow-[1px_1px_0px_#141414] active:bg-[#E6A92A]/30"
        >
          01. MANIFESTO
        </button>
        <button
          onClick={() => scrollToSection('stamps')}
          className="whitespace-nowrap px-2.5 py-1 bg-[#FFFFFF] border border-[#141414] shadow-[1px_1px_0px_#141414] active:bg-[#E6A92A]/30"
        >
          02. STAMPS
        </button>
        <button
          onClick={() => scrollToSection('turntable')}
          className="whitespace-nowrap px-2.5 py-1 bg-[#FFFFFF] border border-[#141414] shadow-[1px_1px_0px_#141414] active:bg-[#E6A92A]/30"
        >
          03. SOUND
        </button>
        <button
          onClick={() => scrollToSection('curiosities')}
          className="whitespace-nowrap px-2.5 py-1 bg-[#FFFFFF] border border-[#141414] shadow-[1px_1px_0px_#141414] active:bg-[#E6A92A]/30"
        >
          04. CABINET
        </button>
        <button
          onClick={() => scrollToSection('guestbook')}
          className="whitespace-nowrap px-2.5 py-1 bg-[#D95D39] text-[#F5F2ED] border border-[#141414] shadow-[1px_1px_0px_#141414] active:bg-[#C04C2A]"
        >
          05. GUESTBOOK
        </button>
      </div>
    </header>
  );
};
