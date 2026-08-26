import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Tv, 
  Sparkles, 
  Radio, 
  Feather, 
  Terminal, 
  Zap, 
  Layers, 
  FileText, 
  Video, 
  Flame, 
  ChevronDown, 
  X, 
  Check, 
  SlidersHorizontal 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { audio } from '../utils/audio';
import { ScreenEffectMode } from '../types';

export interface ScreenModeOption {
  id: ScreenEffectMode;
  label: string;
  shortName: string;
  year: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
  tag: string;
  description: string;
}

export const SCREEN_MODES: ScreenModeOption[] = [
  {
    id: 'clean',
    label: 'Digital Studio (Clean)',
    shortName: 'CLEAN',
    year: '2099',
    icon: Sparkles,
    accent: '#141414',
    tag: 'STUDIO',
    description: 'Crisp vector typography on warm cotton canvas.',
  },
  {
    id: 'crt',
    label: '1984 Color CRT',
    shortName: 'CRT 84',
    year: '1984',
    icon: Tv,
    accent: '#164E4D',
    tag: 'TRINITRON',
    description: 'Cathode ray scanlines, phosphor bloom & barrel vignette.',
  },
  {
    id: 'riso',
    label: 'Risograph Halftone',
    shortName: 'RISO',
    year: '1986',
    icon: Flame,
    accent: '#D95D39',
    tag: 'PRINT INK',
    description: 'Tactile newsprint grain with double-pass halftone dots.',
  },
  {
    id: 'amber',
    label: 'Amber Terminal 1982',
    shortName: 'AMBER',
    year: '1982',
    icon: Terminal,
    accent: '#D97706',
    tag: 'MAINFRAME',
    description: 'Warm monochrome amber phosphor CRT with scanline decay.',
  },
  {
    id: 'cyber',
    label: 'Cyber Green VT100',
    shortName: 'CYBER',
    year: '1979',
    icon: Zap,
    accent: '#15803D',
    tag: 'PHOSPHOR',
    description: 'Classic green phosphor matrix terminal with emerald scanlines.',
  },
  {
    id: 'blueprint',
    label: 'Technical Blueprint',
    shortName: 'BLUEPRINT',
    year: '1950',
    icon: Layers,
    accent: '#1E40AF',
    tag: 'CYANOTYPE',
    description: 'Prussian indigo drafting sheet with white architectural grid.',
  },
  {
    id: 'sepia',
    label: '1970s Aged Gazette',
    shortName: 'SEPIA',
    year: '1972',
    icon: FileText,
    accent: '#78350F',
    tag: 'ARCHIVAL',
    description: 'Aged newsprint paper patina, sepia tone & weathered ink.',
  },
  {
    id: 'vhs',
    label: 'VHS Analog Tape',
    shortName: 'VHS TAPE',
    year: '1988',
    icon: Video,
    accent: '#7C3AED',
    tag: 'MAGNETIC',
    description: 'Analog cassette tracking jitter, chroma aberration & scan bar.',
  },
];

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
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [activeToast, setActiveToast] = useState<string | null>(null);

  const activeModeConfig = SCREEN_MODES.find((m) => m.id === screenMode) || SCREEN_MODES[0];
  const ActiveIcon = activeModeConfig.icon;

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

  const showToastForMode = (mode: ScreenModeOption) => {
    setActiveToast(`${mode.label.toUpperCase()} (${mode.year})`);
    setTimeout(() => {
      setActiveToast((curr) => (curr?.includes(mode.year) ? null : curr));
    }, 2200);
  };

  const scrollToSection = (id: string) => {
    audio.playClick(580);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cycleScreenMode = () => {
    const currentIndex = SCREEN_MODES.findIndex((m) => m.id === screenMode);
    const nextIndex = (currentIndex + 1) % SCREEN_MODES.length;
    const nextMode = SCREEN_MODES[nextIndex];
    audio.playClick(600 + nextIndex * 35);
    onScreenModeChange(nextMode.id);
    showToastForMode(nextMode);
  };

  const selectMode = (mode: ScreenModeOption) => {
    audio.playClick(650);
    onScreenModeChange(mode.id);
    showToastForMode(mode);
    setIsPaletteOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#F5F2ED]/95 backdrop-blur-md border-b-2 border-[#141414]">
        {/* Top micro-meta banner */}
        <div className="bg-[#141414] text-[#F5F2ED] px-2.5 sm:px-4 py-0.5 sm:py-1.5 text-[8px] sm:text-[11px] font-mono-retro flex items-center justify-between gap-1.5 sm:gap-2 border-b border-[#141414] overflow-hidden">
          <div className="flex items-center space-x-1.5 sm:space-x-3 truncate">
            <span className="inline-block w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full bg-[#E6A92A] animate-pulse shrink-0"></span>
            <span className="tracking-[0.1em] sm:tracking-[0.25em] uppercase font-bold text-[#E6A92A] truncate">
              VOL. 67 — 2099 / FOLIO
            </span>
            <span className="hidden md:inline text-stone-500">|</span>
            <span className="hidden md:inline font-hindi text-stone-300 tracking-wider">
              नागपुर · भारत संग्रह NO. B-4881
            </span>
          </div>

          <div className="flex items-center space-x-1.5 sm:space-x-4 shrink-0">
            <span className="text-stone-300 hidden lg:inline">
              NAGPUR (IST): <strong className="text-[#F5F2ED]">{nagpurTime}</strong>
            </span>
            <div className="flex items-center space-x-1">
              <span className="text-[#141414] font-hindi font-bold bg-[#E6A92A] px-1 sm:px-2 py-0.5 text-[7px] sm:text-[10px] tracking-wider uppercase">
                नागपुर
              </span>
              <span className="text-[#F5F2ED] font-mono-retro font-bold bg-[#D95D39] px-1 sm:px-2 py-0.5 text-[7px] sm:text-[10px] tracking-wider uppercase border border-[#141414]">
                IN
              </span>
            </div>
          </div>
        </div>

        {/* Main Publication Navigation Bar */}
        <div className="max-w-7xl mx-auto px-2.5 sm:px-6 py-2 sm:py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => {
                audio.playClick(440);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              data-cursor="TOP"
              className="group flex items-center space-x-2 sm:space-x-2.5 text-left"
            >
              <div className="w-7 h-7 sm:w-9 sm:h-9 bg-[#D95D39] text-[#F5F2ED] flex items-center justify-center font-hindi font-bold text-base sm:text-xl border-2 border-[#141414] shadow-[2px_2px_0px_#141414] sm:shadow-[3px_3px_0px_#141414] group-hover:rotate-12 transition-transform shrink-0">
                आ
              </div>
              <div>
                <div className="flex items-baseline space-x-1.5">
                  <span className="font-rozha text-base sm:text-2xl font-black tracking-tight text-[#141414] group-hover:text-[#D95D39] transition-colors leading-none">
                    AARAV
                  </span>
                  <span className="font-hindi text-[10px] sm:text-sm font-bold text-[#D95D39] opacity-85 leading-none">
                    आरव
                  </span>
                </div>
                <div className="text-[7px] sm:text-[9px] font-mono-retro uppercase tracking-[0.1em] sm:tracking-[0.2em] text-stone-600 font-bold mt-0.5 flex items-center space-x-1">
                  <span>CREATIVE CATALYST</span>
                  <span className="text-[#D95D39] hidden sm:inline">·</span>
                  <span className="font-hindi font-normal text-[#D95D39] hidden sm:inline text-[9px]">सृजनशील</span>
                </div>
              </div>
            </button>
          </div>

          {/* Section Jump Links (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-1 font-mono-retro text-xs font-bold text-[#141414]">
            <button
              onClick={() => scrollToSection('manifesto')}
              className="px-3 py-1.5 border border-transparent hover:border-[#141414] hover:bg-[#E6A92A]/20 hover:text-[#D95D39] transition-all flex flex-col items-center leading-none py-1"
              data-cursor="ABOUT"
            >
              <span>01. MANIFESTO</span>
              <span className="text-[8px] font-hindi text-[#D95D39] font-normal mt-0.5">विचारधारा</span>
            </button>
            <button
              onClick={() => scrollToSection('stamps')}
              className="px-3 py-1.5 border border-transparent hover:border-[#141414] hover:bg-[#E6A92A]/20 hover:text-[#D95D39] transition-all flex flex-col items-center leading-none py-1"
              data-cursor="SOCIALS"
            >
              <span>02. STAMPS</span>
              <span className="text-[8px] font-hindi text-[#D95D39] font-normal mt-0.5">डाक टिकट</span>
            </button>
            <button
              onClick={() => scrollToSection('turntable')}
              className="px-3 py-1.5 border border-transparent hover:border-[#141414] hover:bg-[#E6A92A]/20 hover:text-[#D95D39] transition-all flex flex-col items-center leading-none py-1"
              data-cursor="VINYL"
            >
              <span>03. SOUND DECK</span>
              <span className="text-[8px] font-hindi text-[#D95D39] font-normal mt-0.5">ध्वनि तरंग</span>
            </button>
            <button
              onClick={() => scrollToSection('curiosities')}
              className="px-3 py-1.5 border border-transparent hover:border-[#141414] hover:bg-[#E6A92A]/20 hover:text-[#D95D39] transition-all flex flex-col items-center leading-none py-1"
              data-cursor="CURRENTLY"
            >
              <span>04. CABINET</span>
              <span className="text-[8px] font-hindi text-[#D95D39] font-normal mt-0.5">जिज्ञासा</span>
            </button>
            <button
              onClick={() => scrollToSection('guestbook')}
              className="px-3 py-1.5 border border-transparent hover:border-[#141414] hover:bg-[#E6A92A]/20 hover:text-[#D95D39] transition-all flex flex-col items-center leading-none py-1"
              data-cursor="SIGN"
            >
              <span>05. GUESTBOOK</span>
              <span className="text-[8px] font-hindi text-[#D95D39] font-normal mt-0.5">मुहर व हस्ताक्षर</span>
            </button>
          </nav>

          {/* Tactile Interactive Controls */}
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            {/* Screen Mode Quick Switch & Dropdown Button Group */}
            <div className="flex items-center border-2 border-[#141414] shadow-[2px_2px_0px_#141414] sm:shadow-[3px_3px_0px_#141414] bg-[#FFFFFF]">
              <button
                onClick={cycleScreenMode}
                data-cursor="CYCLE MODE"
                title={`Current: ${activeModeConfig.label} (${activeModeConfig.year}) - Click to cycle modes`}
                className="flex items-center space-x-1 sm:space-x-1.5 px-2 sm:px-2.5 py-1.5 text-xs font-mono-retro font-bold transition-all hover:bg-stone-100"
                style={{
                  backgroundColor: screenMode === 'clean' ? '#FFFFFF' : activeModeConfig.accent,
                  color: screenMode === 'clean' ? '#141414' : '#F5F2ED',
                }}
              >
                <ActiveIcon className="w-3.5 h-3.5" />
                <span className="uppercase text-[9px] sm:text-[10px] tracking-wider font-bold">
                  {activeModeConfig.shortName}
                </span>
              </button>

              <button
                onClick={() => {
                  audio.playClick(500);
                  setIsPaletteOpen(!isPaletteOpen);
                }}
                data-cursor="SCREEN PALETTE"
                title="Open 8 Screen Modes Specimen Palette"
                className="px-1.5 py-1.5 border-l border-[#141414] hover:bg-[#E6A92A] hover:text-[#141414] text-stone-700 transition-colors"
              >
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isPaletteOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

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

        {/* Mobile Horizontal Quick-Jump Pill Strip */}
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

      {/* Screen Modes Specimen Palette Modal / Popover */}
      <AnimatePresence>
        {isPaletteOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-3 sm:px-4 bg-[#141414]/70 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="relative w-full max-w-2xl bg-[#FFFFFF] text-[#141414] border-4 border-[#141414] p-4 sm:p-6 shadow-[8px_8px_0px_#141414] font-mono-retro my-4"
            >
              {/* Palette Header */}
              <div className="flex items-center justify-between border-b-2 border-[#141414] pb-3 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 bg-[#D95D39] text-[#F5F2ED] border border-[#141414]">
                    <SlidersHorizontal className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-rozha text-xl sm:text-2xl font-bold text-[#141414] leading-tight">
                      OPTICAL SCREEN MODES
                    </h3>
                    <p className="text-[10px] text-stone-600 font-bold uppercase tracking-wider">
                      SELECT 1 OF 8 RETRO VISUAL SHADERS & PRINT SPECIMENS
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    audio.playClick(400);
                    setIsPaletteOpen(false);
                  }}
                  className="p-1 bg-[#F5F2ED] hover:bg-[#D95D39] hover:text-[#F5F2ED] border border-[#141414] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 8 Screen Modes Specimen Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SCREEN_MODES.map((mode) => {
                  const Icon = mode.icon;
                  const isCurrent = screenMode === mode.id;

                  return (
                    <button
                      key={mode.id}
                      onClick={() => selectMode(mode)}
                      data-cursor="ENGAGE"
                      className={`p-3 border-2 border-[#141414] text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                        isCurrent
                          ? 'bg-[#F5F2ED] ring-2 ring-[#D95D39] shadow-[4px_4px_0px_#141414]'
                          : 'bg-[#FFFFFF] hover:bg-stone-50 shadow-[2px_2px_0px_#141414]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div
                            className="p-1.5 border border-[#141414] text-[#F5F2ED]"
                            style={{ backgroundColor: mode.accent }}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs font-bold font-rozha block leading-tight text-[#141414]">
                              {mode.label}
                            </span>
                            <span className="text-[9px] font-mono-retro text-stone-500 font-bold">
                              ERA: {mode.year} · {mode.tag}
                            </span>
                          </div>
                        </div>

                        {isCurrent && (
                          <span className="px-1.5 py-0.5 bg-[#D95D39] text-[#F5F2ED] text-[9px] font-bold uppercase flex items-center space-x-1">
                            <Check className="w-3 h-3" />
                            <span>ACTIVE</span>
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-stone-700 font-sans leading-snug">
                        {mode.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 pt-3 border-t border-stone-300 flex items-center justify-between text-[10px] text-stone-500">
                <span>PRESS [ESC] OR CLICK OUTSIDE TO CLOSE</span>
                <span className="text-[#D95D39] font-bold">TIP: TAP MODE PILL TO QUICK-CYCLE</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating HUD Toast Notification when Mode Changes */}
      <AnimatePresence>
        {activeToast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-[#141414] text-[#F5F2ED] border-2 border-[#E6A92A] px-4 py-2 shadow-[4px_4px_0px_#D95D39] font-mono-retro text-xs flex items-center space-x-2 select-none pointer-events-none"
          >
            <span className="w-2 h-2 rounded-full bg-[#E6A92A] animate-ping" />
            <span>OPTICAL SHADER: <strong>{activeToast}</strong></span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

