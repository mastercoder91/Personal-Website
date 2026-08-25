import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Compass, Disc, ArrowDown, Mail, Flame, Stamp, Radio, Award } from 'lucide-react';
import { audio } from '../utils/audio';

interface HeroSectionProps {
  onScrollToSection: (id: string) => void;
  onOpenGuestbook: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToSection, onOpenGuestbook }) => {
  const nameLetters = "AARAV".split("");

  return (
    <section className="relative pt-4 pb-12 sm:pt-6 sm:pb-16 md:py-16 overflow-hidden border-b-2 sm:border-b-4 border-[#141414] bg-[#F5F2ED]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 relative z-10">
        {/* Top Editorial Eyebrow & Badges Row (Bold Typography Theme) */}
        <div className="flex items-center justify-between gap-2 pb-3 sm:pb-4 border-b border-[#141414]/20">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                <span className="text-[9px] sm:text-[11px] font-mono-retro font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[#141414]/70 mb-0.5 truncate">
                  Vol. 67 — 2099 / Folio
                </span>
                <span className="text-[10px] sm:text-xs font-hindi text-[#D95D39] font-bold">
                  ॥ संस्करण ६७ ॥
                </span>
              </div>
              <div className="w-20 sm:w-32 h-[2px] bg-[#141414]/20" />
            </div>
            <span className="hidden sm:inline-block font-script text-lg sm:text-xl text-[#D95D39] -rotate-3">
              Nagpur & beyond —
            </span>
          </div>

          <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
            <div className="flex items-center border border-[#141414] shadow-[1px_1px_0px_#141414] sm:shadow-[2px_2px_0px_#141414]">
              <span className="text-[9px] sm:text-[11px] font-hindi font-bold bg-[#E6A92A] text-[#141414] px-1.5 sm:px-2 py-0.5 sm:py-1">
                नागपुर निवासी
              </span>
              <span className="text-[9px] sm:text-[11px] font-mono-retro font-bold tracking-[0.1em] uppercase bg-[#FFFFFF] text-[#141414] px-1.5 sm:px-2 py-0.5 sm:py-1 border-l border-[#141414]">
                NAGPUR, IN
              </span>
            </div>
            <span className="text-xs font-mono-retro text-stone-500 hidden md:inline">
              EDITION: NO. 88
            </span>
          </div>
        </div>

        {/* Central Massive Bold Typography Headline */}
        <div className="relative py-6 sm:py-10 md:py-12 flex flex-col justify-center items-center overflow-hidden">
          {/* Conic Sunburst Ray Watermark in Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] min-[360px]:w-[340px] sm:w-[540px] md:w-[720px] h-[280px] min-[360px]:h-[340px] sm:h-[540px] md:h-[720px] opacity-[0.06] pointer-events-none rounded-full bg-conic-sunburst" />

          {/* Hindi Shloka / Mantra Ribbon Above Headline */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="z-10 mb-2 sm:mb-3 flex items-center space-x-2 text-[#D95D39] font-hindi font-bold text-xs sm:text-sm md:text-base tracking-widest text-center"
          >
            <span className="text-[#E6A92A]">✦</span>
            <span>॥ कला · तंत्रज्ञान · संगीत · सृजनशीलता ॥</span>
            <span className="text-[#E6A92A]">✦</span>
          </motion.div>

          {/* Huge Serif Headline with Hard Mustard Shadow */}
          <div className="flex items-baseline justify-center select-none z-10 max-w-full relative">
            {/* Ambient Hindi Watermark behind Latin characters */}
            <div className="absolute -top-4 sm:-top-8 -right-4 sm:-right-8 font-hindi text-4xl sm:text-6xl md:text-8xl font-black text-[#141414]/[0.05] pointer-events-none select-none rotate-6">
              आरव
            </div>

            <h1 
              className="font-rozha text-[54px] min-[360px]:text-[66px] min-[410px]:text-[78px] min-[480px]:text-[96px] sm:text-[130px] md:text-[170px] lg:text-[200px] font-black tracking-[-0.04em] leading-[0.85] text-[#141414] flex"
              style={{
                textShadow: '4px 4px 0px #E6A92A',
                fontFamily: '"Rozha One", "Playfair Display", "Georgia", serif',
              }}
            >
              {nameLetters.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ y: 50, opacity: 0, rotate: index % 2 === 0 ? -10 : 10 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 240,
                    damping: 18,
                    delay: index * 0.07,
                  }}
                  whileHover={{
                    scale: 1.08,
                    color: index === 0 ? "#D95D39" : index === 2 ? "#0E3D3C" : "#E6A92A",
                    rotate: index % 2 === 0 ? 5 : -5,
                    transition: { duration: 0.15 },
                  }}
                  className="inline-block cursor-pointer"
                  onMouseEnter={() => audio.playClick(300 + index * 80)}
                >
                  {char}
                </motion.span>
              ))}
            </h1>
          </div>

          {/* Subtitle Badge: Dark Pill with Italic Uppercase and Hindi Callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="z-10 mt-3 sm:mt-5 px-3 sm:px-5 py-1 sm:py-1.5 bg-[#141414] text-[#F5F2ED] font-serif text-[11px] min-[360px]:text-xs sm:text-base md:text-lg font-medium tracking-[0.06em] sm:tracking-[0.1em] uppercase shadow-[2px_2px_0px_#D95D39] sm:shadow-[4px_4px_0px_#D95D39] border border-[#141414] text-center flex items-center justify-center space-x-2"
          >
            <span className="italic">Creative Catalyst • Digital Alchemist</span>
            <span className="text-[#E6A92A]">|</span>
            <span className="font-hindi text-[#E6A92A] not-italic text-xs sm:text-sm font-bold tracking-normal">
              शिल्पकार
            </span>
          </motion.div>
        </div>

        {/* 3-Card Showcase Grid from Theme */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mt-2 sm:mt-4 z-10">
          {/* Card 1: Angled Terracotta Personality Card */}
          <motion.div
            whileHover={{ rotate: 0, scale: 1.02 }}
            className="bg-[#D95D39] p-5 sm:p-6 text-[#F5F2ED] border-2 border-[#141414] shadow-[4px_4px_0px_#141414] sm:shadow-[8px_8px_0px_#141414] flex flex-col justify-between relative overflow-hidden sm:-rotate-1 sm:hover:rotate-0"
          >
            <div>
              <div className="flex items-center justify-between border-b border-[#F5F2ED]/40 pb-2 mb-3">
                <div className="flex items-center space-x-1.5">
                  <h3 className="text-[10px] sm:text-[11px] uppercase tracking-widest font-bold font-mono-retro">
                    01 / ETHOS & PERSPECTIVE
                  </h3>
                  <span className="font-hindi text-[10px] text-[#E6A92A] font-bold">
                    (विचारधारा)
                  </span>
                </div>
                <Sparkles className="w-4 h-4 text-[#E6A92A]" />
              </div>
              <p className="text-sm sm:text-[15px] leading-snug italic font-serif text-[#F5F2ED]">
                "Design explorer finding beauty in the intersection of retro aesthetics and future tech. I build software systems that feel good to use and better to look at."
              </p>
              <div className="mt-2 pt-2 border-t border-[#F5F2ED]/20">
                <p className="font-hindi text-xs text-[#F5F2ED]/90 leading-relaxed font-normal">
                  "कला और कोड का संगम — जहाँ पुरानी आत्मा और आधुनिक सोच का मिलन होता है।"
                </p>
              </div>
            </div>

            <div className="mt-5 sm:mt-6 pt-3 border-t border-[#F5F2ED]/20 flex items-center justify-between text-[10px] sm:text-[11px] font-mono-retro opacity-90 uppercase">
              <span className="flex items-center space-x-1">
                <span>Aarav Maturkar</span>
                <span className="font-hindi text-[#E6A92A]">· आरव</span>
              </span>
              <button
                onClick={() => onScrollToSection('manifesto')}
                className="hover:underline font-bold text-[#E6A92A] flex items-center space-x-1"
              >
                <span>Read Manifesto</span>
                <span>→</span>
              </button>
            </div>
          </motion.div>

          {/* Card 2: Interactive Social Postage Stamps Cluster */}
          <div className="bg-[#FFFFFF] border-2 border-[#141414] p-4 sm:p-5 shadow-[4px_4px_0px_#141414] sm:shadow-[8px_8px_0px_#141414] flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-stone-200 pb-2 mb-3">
              <div className="flex items-center space-x-1.5">
                <span className="text-[10px] sm:text-[11px] font-mono-retro font-bold uppercase tracking-widest text-[#141414]">
                  02 / POSTAL OUTPOSTS
                </span>
                <span className="font-hindi text-[10px] text-[#D95D39] font-bold">
                  (डाक टिकट)
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] font-mono-retro text-[#D95D39] font-bold">
                COMMEMORATIVE
              </span>
            </div>

            {/* 4 Mini Stamped Outposts */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 my-2">
              <button
                onClick={() => onScrollToSection('stamps')}
                className="bg-[#F5F2ED] border border-gray-400 p-2 flex flex-col items-center justify-between shadow-sm hover:rotate-0 transition-transform relative group"
              >
                <div className="w-full h-8 sm:h-10 bg-[#D95D39]/20 flex items-center justify-center font-bold text-xs sm:text-sm text-[#D95D39]">
                  𝕏
                </div>
                <div className="text-[9px] sm:text-[10px] uppercase font-mono-retro font-bold text-center border-t border-dotted border-gray-400 w-full pt-1 truncate">
                  @AaravMaturkar
                </div>
                <div className="absolute -right-1 -top-1 w-3 h-3 bg-[#E6A92A] rotate-45" />
              </button>

              <button
                onClick={() => onScrollToSection('stamps')}
                className="bg-[#F5F2ED] border border-gray-400 p-2 flex flex-col items-center justify-between shadow-sm hover:rotate-0 transition-transform relative group"
              >
                <div className="w-full h-8 sm:h-10 bg-[#0E3D3C]/20 flex items-center justify-center font-bold text-xs sm:text-sm text-[#0E3D3C]">
                  📸
                </div>
                <div className="text-[9px] sm:text-[10px] uppercase font-mono-retro font-bold text-center border-t border-dotted border-gray-400 w-full pt-1 truncate">
                  @aaravmaturkar
                </div>
              </button>

              <button
                onClick={() => onScrollToSection('stamps')}
                className="bg-[#F5F2ED] border border-gray-400 p-2 flex flex-col items-center justify-between shadow-sm hover:rotate-0 transition-transform relative group"
              >
                <div className="w-full h-8 sm:h-10 bg-[#141414]/15 flex items-center justify-center font-bold text-xs sm:text-sm text-[#141414]">
                  💻
                </div>
                <div className="text-[9px] sm:text-[10px] uppercase font-mono-retro font-bold text-center border-t border-dotted border-gray-400 w-full pt-1 truncate">
                  @mastercoder91
                </div>
              </button>

              <a
                href="mailto:codemaster923@gmail.com"
                className="bg-[#F5F2ED] border border-gray-400 p-2 flex flex-col items-center justify-between shadow-sm hover:rotate-0 transition-transform relative group text-left"
              >
                <div className="w-full h-8 sm:h-10 bg-[#D95D39]/15 flex items-center justify-center font-bold text-xs sm:text-sm text-[#D95D39]">
                  📧
                </div>
                <div className="text-[9px] sm:text-[10px] uppercase font-mono-retro font-bold text-center border-t border-dotted border-gray-400 w-full pt-1 truncate">
                  Direct Mail
                </div>
              </a>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => onScrollToSection('stamps')}
                className="text-[10px] sm:text-[11px] font-mono-retro font-bold text-[#D95D39] hover:underline uppercase"
              >
                View All 5 Stamps (५ डाक टिकट) →
              </button>
            </div>
          </div>

          {/* Card 3: Interactive Vinyl Record Deck Highlight */}
          <div className="bg-[#FFFFFF] border-2 border-[#141414] p-4 sm:p-5 shadow-[4px_4px_0px_#141414] sm:shadow-[8px_8px_0px_#141414] flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-stone-200 pb-2 mb-2">
              <div className="flex items-center space-x-1.5">
                <span className="text-[10px] sm:text-[11px] font-mono-retro font-bold uppercase tracking-widest text-[#141414]">
                  03 / SOUND ARCHIVE
                </span>
                <span className="font-hindi text-[10px] text-[#D95D39] font-bold">
                  (ध्वनि मंच)
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] font-mono-retro text-[#E6A92A] font-bold bg-[#141414] px-1.5 py-0.5">
                33⅓ RPM
              </span>
            </div>

            {/* Vinyl Disc Visual Center */}
            <div className="relative my-2 sm:my-3 flex items-center justify-center">
              <div className="w-28 sm:w-32 h-28 sm:h-32 bg-[#141414] rounded-full flex items-center justify-center border-4 border-[#E6A92A] shadow-md animate-spin-slow">
                <div className="w-24 sm:w-28 h-24 sm:h-28 rounded-full border border-[#F5F2ED]/20 flex items-center justify-center">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-[#D95D39] rounded-full border-2 border-[#141414] flex flex-col items-center justify-center text-center">
                    <span className="font-hindi text-[8px] text-[#F5F2ED] font-bold leading-none">राग</span>
                    <div className="w-1.5 h-1.5 bg-white rounded-full mt-0.5" />
                  </div>
                </div>
              </div>

              {/* Angled Now Playing Plate */}
              <div className="absolute -bottom-1 right-0 bg-[#F5F2ED] border-2 border-[#141414] p-1.5 sm:p-2 px-2.5 sm:px-3 rotate-2 shadow-md">
                <div className="text-[8px] sm:text-[9px] uppercase font-mono-retro font-black tracking-tighter text-[#141414] flex items-center space-x-1">
                  <span>FEATURED TRACK</span>
                  <span className="text-[#D95D39]">·</span>
                  <span className="font-hindi text-[#D95D39]">धुन</span>
                </div>
                <div className="text-[10px] sm:text-[11px] font-serif italic font-bold text-[#D95D39] truncate max-w-[130px] sm:max-w-[160px]">
                  Ananda Shankar — Jumpin'
                </div>
              </div>
            </div>

            <div className="pt-2 sm:pt-3 border-t border-stone-200 flex items-center justify-between">
              <button
                onClick={() => onScrollToSection('turntable')}
                className="w-full py-2 bg-[#141414] text-[#F5F2ED] font-mono-retro font-bold text-xs uppercase tracking-wider hover:bg-[#D95D39] transition-colors flex items-center justify-center space-x-2 shadow-[2px_2px_0px_#E6A92A]"
              >
                <Disc className="w-3.5 h-3.5" />
                <span>Launch Audio Deck · ध्वनि मंच</span>
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons Bar */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3 pt-4 sm:pt-6 border-t-2 border-[#141414]">
          <button
            onClick={() => onScrollToSection('stamps')}
            data-cursor="POSTAGE"
            className="w-full sm:w-auto px-4 sm:px-5 py-2.5 bg-[#D95D39] text-[#F5F2ED] font-mono-retro font-bold text-xs uppercase tracking-wider border-2 border-[#141414] shadow-[3px_3px_0px_#141414] hover:bg-[#C04C2A] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center justify-center space-x-2"
          >
            <span>COLLECTIBLE STAMPS · डाक टिकट</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onScrollToSection('turntable')}
            data-cursor="LISTEN"
            className="w-full sm:w-auto px-4 sm:px-4 py-2.5 bg-[#0E3D3C] text-[#F5F2ED] font-mono-retro font-bold text-xs uppercase tracking-wider border-2 border-[#141414] shadow-[3px_3px_0px_#141414] hover:bg-[#164E4D] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center justify-center space-x-2"
          >
            <Disc className="w-4 h-4 text-[#E6A92A]" />
            <span>CASSETTE SYNTH · संगीत मंच</span>
          </button>

          <a
            href="mailto:codemaster923@gmail.com"
            data-cursor="EMAIL"
            className="w-full sm:w-auto px-4 sm:px-4 py-2.5 bg-[#FFFFFF] text-[#141414] font-mono-retro font-bold text-xs uppercase tracking-wider border-2 border-[#141414] shadow-[3px_3px_0px_#141414] hover:bg-[#F5F2ED] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center justify-center space-x-1.5"
          >
            <Mail className="w-3.5 h-3.5 text-[#D95D39]" />
            <span>DISPATCH MAIL · पत्र भेजें</span>
          </a>
        </div>
      </div>
    </section>
  );
};
