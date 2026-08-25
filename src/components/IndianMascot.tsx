import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { audio } from '../utils/audio';
import { 
  Sparkles, 
  Volume2, 
  Disc3, 
  MessageSquare, 
  Minimize2, 
  Maximize2, 
  Radio, 
  Coffee, 
  Music, 
  Heart,
  HelpCircle,
  X
} from 'lucide-react';

export type MascotMood = 'namaste' | 'chai' | 'boogie' | 'craft' | 'jalebi' | 'idle';

interface IndianMascotProps {
  onOpenGuestbook?: () => void;
  onOpenEasterEgg?: () => void;
}

export function IndianMascot({ onOpenGuestbook, onOpenEasterEgg }: IndianMascotProps) {
  const [mood, setMood] = useState<MascotMood>('idle');
  const [isMinimized, setIsMinimized] = useState(true);
  const [showBubble, setShowBubble] = useState(true);
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);

  const dialogues = [
    {
      en: "Namaste! Welcome to Aarav's 1984 Analog Workshop.",
      hi: "नमस्ते! आरव की एनालॉग कार्यशाला में आपका स्वागत है।",
      action: "namaste" as MascotMood
    },
    {
      en: "Have a cup of hot Cutting Chai before coding!",
      hi: "कोडिंग से पहले ज़रा गरम मसाला चाय की चुस्की लें!",
      action: "chai" as MascotMood
    },
    {
      en: "Spinning that 33⅓ RPM Charanjit Singh disco record!",
      hi: "टर्नटेबल पर विंटेज डिस्को राग बज रहा है!",
      action: "boogie" as MascotMood
    },
    {
      en: "Secret hint: Try the Konami code ↑ ↑ ↓ ↓ ← → ← → B A on your keyboard!",
      hi: "गुप्त संकेत: कीबोर्ड पर कोनामी कोड दबाएं!",
      action: "craft" as MascotMood
    },
    {
      en: "Fresh crispy Jalebi fresh from Nagpur Sarafa Bazar!",
      hi: "नागपुर की गरमा-गरम कुरकुरी जलेबी का आनंद!",
      action: "jalebi" as MascotMood
    },
    {
      en: "Don't forget to stamp your wax imprint in the guestbook!",
      hi: "आगंतुक पंजिका में अपनी मुहर अवश्य लगाएं!",
      action: "namaste" as MascotMood
    }
  ];

  // Auto dialogue cycle
  useEffect(() => {
    const timer = setInterval(() => {
      setDialogueIndex((prev) => (prev + 1) % dialogues.length);
    }, 9000);
    return () => clearInterval(timer);
  }, [dialogues.length]);

  // Periodic natural eye blink
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 180);
    }, 3800);
    return () => clearInterval(blinkInterval);
  }, []);

  // Mascot Click handler (cycles moods & plays audio)
  const handleMascotClick = () => {
    audio.playMascotChime();
    setClickCount((prev) => prev + 1);
    
    // Cycle mood
    const moods: MascotMood[] = ['namaste', 'chai', 'boogie', 'craft', 'jalebi'];
    const nextMood = moods[(clickCount + 1) % moods.length];
    setMood(nextMood);
    setShowBubble(true);

    if (nextMood === 'chai') {
      audio.playChaiSip();
    } else if (nextMood === 'boogie') {
      audio.playTablaTap();
    }
  };

  const handleSelectMood = (newMood: MascotMood) => {
    setMood(newMood);
    if (newMood === 'chai') audio.playChaiSip();
    else if (newMood === 'boogie') audio.playTablaTap();
    else audio.playMascotChime();
  };

  const currentDialogue = dialogues[dialogueIndex];

  return (
    <aside 
      id="site-mascot-container"
      aria-label="Site mascot Chhote Ustad"
      className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-40 select-none print:hidden pointer-events-auto"
    >
      <AnimatePresence mode="wait">
        {isMinimized ? (
          /* Minimized Vintage Stamp Badge */
          <motion.button
            key="minimized-mascot"
            id="expand-mascot-btn"
            initial={{ scale: 0.7, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.7, opacity: 0, y: 20 }}
            whileHover={{ scale: 1.08, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              audio.playStampThud();
              setIsMinimized(false);
              setShowBubble(true);
            }}
            className="flex items-center space-x-2 bg-[#D95D39] text-[#F5F2ED] px-3 py-2 border-2 border-[#141414] shadow-[4px_4px_0px_#141414] cursor-pointer group"
            title="Open Chhote Ustad (छोटे उस्ताद)"
          >
            {/* Mascot Mini Portrait Icon */}
            <div className="w-7 h-7 rounded-full bg-[#E6A92A] border border-[#141414] flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
              <span className="text-base">👳🏽‍♂️</span>
            </div>
            <div className="text-left font-mono-retro">
              <div className="text-[10px] font-bold tracking-wider uppercase leading-none">
                CHHOTE USTAD
              </div>
              <div className="text-[9px] font-hindi text-[#E6A92A] font-bold leading-tight">
                छोटे उस्ताद · नमस्ते
              </div>
            </div>
            <Maximize2 className="w-3.5 h-3.5 ml-1 opacity-75 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        ) : (
          /* Full Mascot Container */
          <motion.div
            key="full-mascot"
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 30 }}
            className="relative flex flex-col items-end"
          >
            {/* Speech Dialogue Bubble */}
            <AnimatePresence>
              {showBubble && (
                <motion.div
                  key={`dialogue-${dialogueIndex}`}
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.9 }}
                  className="mb-2 max-w-[260px] sm:max-w-[300px] bg-[#FFFFFF] border-2 border-[#141414] p-3 shadow-[4px_4px_0px_#141414] relative text-left"
                >
                  {/* Decorative Stamp Header */}
                  <div className="flex items-center justify-between border-b border-[#141414]/20 pb-1 mb-1.5 text-[9px] font-mono-retro font-bold text-[#D95D39]">
                    <span className="flex items-center space-x-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>USTAD DISPATCH</span>
                    </span>
                    <button
                      onClick={() => setShowBubble(false)}
                      className="text-stone-400 hover:text-[#141414] transition-colors p-0.5"
                      title="Dismiss bubble"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Speech Text */}
                  <p className="text-[11px] sm:text-xs font-sans text-[#141414] font-semibold leading-snug">
                    {currentDialogue.en}
                  </p>
                  <p className="text-[10px] sm:text-[11px] font-hindi text-[#0E3D3C] font-bold mt-1 leading-tight">
                    {currentDialogue.hi}
                  </p>

                  {/* Quick Action Buttons inside Speech */}
                  <div className="mt-2 pt-1.5 border-t border-stone-200 flex flex-wrap gap-1">
                    {onOpenGuestbook && (
                      <button
                        onClick={() => {
                          audio.playClick(600);
                          onOpenGuestbook();
                        }}
                        className="px-2 py-0.5 bg-[#0E3D3C] text-[#F5F2ED] text-[9px] font-mono-retro font-bold uppercase border border-[#141414] hover:bg-[#164E4D] transition-colors"
                      >
                        Stamp Note ✍️
                      </button>
                    )}
                    {onOpenEasterEgg && (
                      <button
                        onClick={() => {
                          audio.playClick(750);
                          onOpenEasterEgg();
                        }}
                        className="px-2 py-0.5 bg-[#E6A92A] text-[#141414] text-[9px] font-mono-retro font-bold uppercase border border-[#141414] hover:bg-[#D4981E] transition-colors"
                      >
                        Beat Synth ⚡
                      </button>
                    )}
                  </div>

                  {/* Speech Bubble Arrow pointing down to mascot */}
                  <div className="absolute -bottom-2 right-10 w-3 h-3 bg-[#FFFFFF] border-r-2 border-b-2 border-[#141414] transform rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mascot Character Stage Card */}
            <div className="bg-[#F5F2ED] border-2 border-[#141414] p-2.5 sm:p-3 shadow-[5px_5px_0px_#141414] relative flex flex-col items-center">
              {/* Header Bar with Control icons */}
              <div className="w-full flex items-center justify-between border-b border-[#141414]/20 pb-1.5 mb-2">
                <div className="flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-[#D95D39] animate-pulse" />
                  <span className="font-mono-retro text-[9px] font-bold text-[#141414] uppercase">
                    CHHOTE USTAD
                  </span>
                  <span className="font-hindi text-[9px] text-stone-500 font-bold">
                    छोटे उस्ताद
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => {
                      audio.playClick(400);
                      setShowBubble(!showBubble);
                    }}
                    className="p-1 hover:bg-stone-200 text-stone-700 transition-colors"
                    title="Toggle dialogue"
                  >
                    <MessageSquare className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => {
                      audio.playClick(300);
                      setIsMinimized(true);
                    }}
                    className="p-1 hover:bg-stone-200 text-stone-700 transition-colors"
                    title="Minimize mascot"
                  >
                    <Minimize2 className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Character Illustration SVG with interactive animation triggers */}
              <div 
                id="interactive-mascot-avatar"
                onClick={handleMascotClick}
                className="cursor-pointer relative group flex items-center justify-center p-1"
                title="Click me to change animation & hear sound!"
              >
                {/* Floating Props / Particle Animations based on mood */}
                <AnimatePresence>
                  {mood === 'namaste' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.5 }}
                      animate={{ opacity: 1, y: -25, scale: 1 }}
                      exit={{ opacity: 0, y: -40, scale: 0.5 }}
                      className="absolute -top-3 pointer-events-none flex space-x-2 text-xs"
                    >
                      <span className="animate-bounce text-base">🌸</span>
                      <span className="animate-bounce delay-100 text-base">✨</span>
                      <span className="animate-bounce delay-200 text-base">🌼</span>
                    </motion.div>
                  )}

                  {mood === 'chai' && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: -20 }}
                      exit={{ opacity: 0 }}
                      className="absolute -top-4 right-1 pointer-events-none text-xs flex flex-col items-center"
                    >
                      <span className="text-[10px] font-mono-retro font-bold text-[#D95D39] animate-pulse">
                        ♨ KADAK CHAI
                      </span>
                      <span className="text-base">☕</span>
                    </motion.div>
                  )}

                  {mood === 'boogie' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1.1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="absolute -top-4 pointer-events-none flex space-x-2 text-[#D95D39] font-bold"
                    >
                      <span className="animate-bounce text-sm">🎵</span>
                      <span className="animate-bounce delay-150 text-sm">🎶</span>
                      <span className="animate-bounce delay-300 text-sm">🕺</span>
                    </motion.div>
                  )}

                  {mood === 'jalebi' && (
                    <motion.div
                      initial={{ opacity: 0, y: 0 }}
                      animate={{ opacity: 1, y: -18 }}
                      exit={{ opacity: 0 }}
                      className="absolute -top-4 pointer-events-none flex items-center space-x-1"
                    >
                      <span className="text-[10px] font-hindi text-[#E6A92A] font-bold">स्वादिष्ट जलेबी</span>
                      <span className="text-base">🥨</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Animated Character Body SVG */}
                <motion.div
                  animate={
                    mood === 'boogie'
                      ? { y: [0, -8, 0, -6, 0], rotate: [-2, 3, -3, 2, -2] }
                      : mood === 'namaste'
                      ? { y: [0, 4, 0], scale: [1, 1.03, 1] }
                      : mood === 'chai'
                      ? { y: [0, -3, 0], rotate: [0, 2, 0] }
                      : { y: [0, -4, 0] }
                  }
                  transition={{
                    repeat: Infinity,
                    duration: mood === 'boogie' ? 0.7 : 2.5,
                    ease: 'easeInOut'
                  }}
                  className="w-24 h-28 sm:w-28 sm:h-32 relative"
                >
                  <svg
                    viewBox="0 0 140 160"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full filter drop-shadow-[2px_3px_0px_#141414]"
                  >
                    {/* Shadow Ground */}
                    <ellipse cx="70" cy="152" rx="38" ry="6" fill="#141414" fillOpacity="0.25" />

                    {/* Royal Dupatta / Angavastram Drape over Shoulder */}
                    <path
                      d="M40 85 C30 95, 26 120, 24 142 C30 144, 38 140, 42 125 C45 110, 48 95, 52 88 Z"
                      fill="#8A252C"
                      stroke="#141414"
                      strokeWidth="2.5"
                    />
                    <path
                      d="M26 135 C32 137, 36 134, 40 128"
                      stroke="#E6A92A"
                      strokeWidth="2"
                    />

                    {/* Traditional Indian Kurta (Embroidered Saffron / Terracotta) */}
                    <path
                      d="M44 80 L32 105 L42 108 L46 145 C58 147, 82 147, 94 145 L98 108 L108 105 L96 80 Z"
                      fill="#D95D39"
                      stroke="#141414"
                      strokeWidth="3"
                    />

                    {/* Nehru Waistcoat / Bandhgala Vest (Deep Teal / Forest) */}
                    <path
                      d="M48 82 L42 110 L52 143 C62 145, 78 145, 88 143 L98 110 L92 82 C82 86, 58 86, 48 82 Z"
                      fill="#0E3D3C"
                      stroke="#141414"
                      strokeWidth="2.5"
                    />

                    {/* Golden Zari Buttons & Neck Trim */}
                    <path
                      d="M70 84 L70 138"
                      stroke="#E6A92A"
                      strokeWidth="2"
                      strokeDasharray="1 3"
                    />
                    <circle cx="70" cy="94" r="2.2" fill="#E6A92A" stroke="#141414" strokeWidth="1" />
                    <circle cx="70" cy="106" r="2.2" fill="#E6A92A" stroke="#141414" strokeWidth="1" />
                    <circle cx="70" cy="118" r="2.2" fill="#E6A92A" stroke="#141414" strokeWidth="1" />
                    <circle cx="70" cy="130" r="2.2" fill="#E6A92A" stroke="#141414" strokeWidth="1" />

                    {/* Gold Pocket Chain on Vest */}
                    <path
                      d="M58 112 C62 118, 66 118, 69 113"
                      fill="none"
                      stroke="#E6A92A"
                      strokeWidth="1.5"
                    />

                    {/* Hands / Arms based on Mood */}
                    {mood === 'namaste' ? (
                      /* Folded Namaste Hands */
                      <g className="animate-pulse">
                        <ellipse cx="64" cy="95" rx="5" ry="9" fill="#F3C398" stroke="#141414" strokeWidth="2" transform="rotate(-15 64 95)" />
                        <ellipse cx="76" cy="95" rx="5" ry="9" fill="#F3C398" stroke="#141414" strokeWidth="2" transform="rotate(15 76 95)" />
                        <circle cx="70" cy="96" r="3" fill="#E6A92A" />
                      </g>
                    ) : mood === 'chai' ? (
                      /* Holding Steaming Cutting Chai Glass */
                      <g>
                        {/* Right arm holding glass */}
                        <path d="M94 92 C102 98, 108 108, 96 118" fill="none" stroke="#D95D39" strokeWidth="6" strokeLinecap="round" />
                        <ellipse cx="94" cy="115" rx="4" ry="4" fill="#F3C398" stroke="#141414" strokeWidth="2" />
                        
                        {/* Cutting Chai Glass */}
                        <path d="M90 106 L98 106 L96 122 L92 122 Z" fill="#E6A92A" stroke="#141414" strokeWidth="2" />
                        <path d="M89 110 L99 110" stroke="#FFFFFF" strokeWidth="1.5" />
                        {/* Rising Steam */}
                        <path d="M92 102 C91 98, 94 96, 92 92" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" className="animate-pulse" />
                        <path d="M96 103 C97 99, 95 97, 97 93" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" className="animate-pulse" />
                      </g>
                    ) : mood === 'boogie' ? (
                      /* Dance Arms in the Air */
                      <g>
                        <path d="M42 90 C30 80, 28 65, 34 55" fill="none" stroke="#D95D39" strokeWidth="6" strokeLinecap="round" />
                        <circle cx="34" cy="54" r="5" fill="#F3C398" stroke="#141414" strokeWidth="2" />

                        <path d="M98 90 C110 80, 112 65, 106 55" fill="none" stroke="#D95D39" strokeWidth="6" strokeLinecap="round" />
                        <circle cx="106" cy="54" r="5" fill="#F3C398" stroke="#141414" strokeWidth="2" />
                      </g>
                    ) : (
                      /* Classic Friendly Welcoming Hand Pose */
                      <g>
                        <path d="M44 95 C36 105, 34 116, 40 125" fill="none" stroke="#D95D39" strokeWidth="6" strokeLinecap="round" />
                        <circle cx="40" cy="125" r="4.5" fill="#F3C398" stroke="#141414" strokeWidth="2" />

                        <path d="M96 95 C104 102, 108 112, 104 122" fill="none" stroke="#D95D39" strokeWidth="6" strokeLinecap="round" />
                        <circle cx="104" cy="122" r="4.5" fill="#F3C398" stroke="#141414" strokeWidth="2" />
                      </g>
                    )}

                    {/* Mascot Neck */}
                    <rect x="63" y="68" width="14" height="15" fill="#E2A676" stroke="#141414" strokeWidth="2.5" />

                    {/* Mascot Round Cute Face */}
                    <ellipse cx="70" cy="56" rx="23" ry="22" fill="#F3C398" stroke="#141414" strokeWidth="3" />

                    {/* Ears with Gold Kundan Earrings */}
                    <ellipse cx="47" cy="56" rx="4" ry="6" fill="#F3C398" stroke="#141414" strokeWidth="2" />
                    <circle cx="46" cy="61" r="2" fill="#E6A92A" stroke="#141414" strokeWidth="1" />

                    <ellipse cx="93" cy="56" rx="4" ry="6" fill="#F3C398" stroke="#141414" strokeWidth="2" />
                    <circle cx="94" cy="61" r="2" fill="#E6A92A" stroke="#141414" strokeWidth="1" />

                    {/* Rosy Cheeks */}
                    <circle cx="56" cy="62" r="4" fill="#D95D39" fillOpacity="0.3" />
                    <circle cx="84" cy="62" r="4" fill="#D95D39" fillOpacity="0.3" />

                    {/* Traditional Tilak / Chandan on Forehead */}
                    <path d="M70 40 L70 48" stroke="#D95D39" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="70" cy="49" r="1.5" fill="#E6A92A" />

                    {/* Expressive Eyes (Open or Blinking) */}
                    {isBlinking ? (
                      <g>
                        <path d="M57 54 Q62 58 66 54" stroke="#141414" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                        <path d="M74 54 Q78 58 83 54" stroke="#141414" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                      </g>
                    ) : (
                      <g>
                        {/* Eye Whites */}
                        <ellipse cx="61" cy="54" rx="4" ry="4.5" fill="#FFFFFF" stroke="#141414" strokeWidth="1.5" />
                        <circle cx="62" cy="54" r="2.2" fill="#141414" />
                        <circle cx="63" cy="53" r="0.8" fill="#FFFFFF" />

                        <ellipse cx="79" cy="54" rx="4" ry="4.5" fill="#FFFFFF" stroke="#141414" strokeWidth="1.5" />
                        <circle cx="80" cy="54" r="2.2" fill="#141414" />
                        <circle cx="81" cy="53" r="0.8" fill="#FFFFFF" />
                      </g>
                    )}

                    {/* Retro Round Spectacles (Gandhi / Satyajit Ray vintage brass frames) */}
                    <circle cx="61" cy="54" r="7.5" fill="none" stroke="#141414" strokeWidth="2" />
                    <circle cx="79" cy="54" r="7.5" fill="none" stroke="#141414" strokeWidth="2" />
                    <path d="M68.5 54 L71.5 54" stroke="#141414" strokeWidth="2" />
                    <path d="M53.5 53 L48 55" stroke="#141414" strokeWidth="1.5" />
                    <path d="M86.5 53 L92 55" stroke="#141414" strokeWidth="1.5" />

                    {/* Nose */}
                    <path d="M69 57 C71 59, 72 61, 69 63" fill="none" stroke="#141414" strokeWidth="1.8" strokeLinecap="round" />

                    {/* Charming Moustache & Joyful Smile */}
                    <path
                      d="M60 64 C64 62, 68 65, 70 64 C72 65, 76 62, 80 64 C82 66, 78 68, 70 67 C62 68, 58 66, 60 64 Z"
                      fill="#141414"
                    />
                    <path
                      d="M65 68 Q70 74 75 68"
                      stroke="#141414"
                      strokeWidth="2"
                      fill="#D95D39"
                      strokeLinecap="round"
                    />

                    {/* Retro Headphones (When in Boogie/Music mode) */}
                    {mood === 'boogie' && (
                      <g className="animate-pulse">
                        <path d="M44 54 C44 32, 96 32, 96 54" fill="none" stroke="#E6A92A" strokeWidth="4" strokeLinecap="round" />
                        <rect x="42" y="48" width="6" height="14" rx="2" fill="#141414" stroke="#E6A92A" strokeWidth="1.5" />
                        <rect x="92" y="48" width="6" height="14" rx="2" fill="#141414" stroke="#E6A92A" strokeWidth="1.5" />
                      </g>
                    )}

                    {/* Royal Indian Pagri / Turban / Safa */}
                    <g>
                      {/* Base Turban Wrap */}
                      <path
                        d="M44 42 C40 30, 52 16, 70 14 C88 16, 100 30, 96 42 C92 46, 48 46, 44 42 Z"
                        fill="#D95D39"
                        stroke="#141414"
                        strokeWidth="3"
                      />
                      {/* Overlapping Folds (पेच / पगड़ी की सिलवटें) */}
                      <path
                        d="M46 34 C58 24, 82 24, 94 34"
                        stroke="#E6A92A"
                        strokeWidth="2.5"
                        fill="none"
                      />
                      <path
                        d="M48 26 C60 18, 80 18, 92 26"
                        stroke="#F5F2ED"
                        strokeWidth="2"
                        fill="none"
                      />
                      {/* Turban Fan / Turra (तुरा / कलगी) at Top */}
                      <path
                        d="M64 15 C60 6, 70 2, 76 6 C78 10, 72 14, 68 15 Z"
                        fill="#E6A92A"
                        stroke="#141414"
                        strokeWidth="2"
                      />
                      {/* Peacock Feather / Gem Jewel Brooch (सरपेंच) */}
                      <circle cx="70" cy="28" r="4.5" fill="#0E3D3C" stroke="#141414" strokeWidth="1.5" />
                      <circle cx="70" cy="28" r="2" fill="#E6A92A" />
                      {/* Side Hanging Drape (शामला / पल्लू) */}
                      <path
                        d="M93 36 C98 42, 102 52, 100 64 C97 64, 95 58, 94 44 Z"
                        fill="#D95D39"
                        stroke="#141414"
                        strokeWidth="2"
                      />
                    </g>
                  </svg>
                </motion.div>
              </div>

              {/* Interactive Mood Selector Dock */}
              <div className="mt-1.5 pt-1.5 border-t border-[#141414]/20 w-full flex items-center justify-between gap-1">
                <button
                  id="mascot-mood-chai"
                  onClick={() => handleSelectMood('chai')}
                  className={`px-1.5 py-1 text-[9px] font-mono-retro font-bold uppercase border transition-all flex items-center space-x-1 ${
                    mood === 'chai'
                      ? 'bg-[#D95D39] text-[#F5F2ED] border-[#141414] shadow-[1px_1px_0px_#141414]'
                      : 'bg-[#FFFFFF] text-stone-700 border-stone-300 hover:bg-stone-100'
                  }`}
                  title="Cutting Chai Break"
                >
                  <Coffee className="w-2.5 h-2.5" />
                  <span className="hidden sm:inline">CHAI</span>
                </button>

                <button
                  id="mascot-mood-boogie"
                  onClick={() => handleSelectMood('boogie')}
                  className={`px-1.5 py-1 text-[9px] font-mono-retro font-bold uppercase border transition-all flex items-center space-x-1 ${
                    mood === 'boogie'
                      ? 'bg-[#E6A92A] text-[#141414] border-[#141414] shadow-[1px_1px_0px_#141414]'
                      : 'bg-[#FFFFFF] text-stone-700 border-stone-300 hover:bg-stone-100'
                  }`}
                  title="Disco Boogie Mode"
                >
                  <Music className="w-2.5 h-2.5" />
                  <span className="hidden sm:inline">BOOGIE</span>
                </button>

                <button
                  id="mascot-mood-namaste"
                  onClick={() => handleSelectMood('namaste')}
                  className={`px-1.5 py-1 text-[9px] font-mono-retro font-bold uppercase border transition-all flex items-center space-x-1 ${
                    mood === 'namaste'
                      ? 'bg-[#0E3D3C] text-[#F5F2ED] border-[#141414] shadow-[1px_1px_0px_#141414]'
                      : 'bg-[#FFFFFF] text-stone-700 border-stone-300 hover:bg-stone-100'
                  }`}
                  title="Namaste Greeting"
                >
                  <Heart className="w-2.5 h-2.5" />
                  <span className="hidden sm:inline">NAMASTE</span>
                </button>

                <button
                  id="mascot-mood-jalebi"
                  onClick={() => handleSelectMood('jalebi')}
                  className={`px-1.5 py-1 text-[9px] font-mono-retro font-bold uppercase border transition-all flex items-center space-x-1 ${
                    mood === 'jalebi'
                      ? 'bg-[#8A252C] text-[#F5F2ED] border-[#141414] shadow-[1px_1px_0px_#141414]'
                      : 'bg-[#FFFFFF] text-stone-700 border-stone-300 hover:bg-stone-100'
                  }`}
                  title="Nagpur Jalebi Treat"
                >
                  <Sparkles className="w-2.5 h-2.5" />
                  <span className="hidden sm:inline">JALEBI</span>
                </button>
              </div>

              {/* Bottom Proverb / Status Badge */}
              <div className="w-full text-center mt-1 text-[8px] font-mono-retro text-stone-500 font-bold">
                TAP MASCOT FOR SOUNDS & POSES
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}
