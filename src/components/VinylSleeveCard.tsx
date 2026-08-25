import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Disc, Sparkles, RotateCw, Volume2, Award, Music, Layers } from 'lucide-react';
import { audio } from '../utils/audio';

export const VinylSleeveCard: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDiscOut, setIsDiscOut] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tilt mechanics with spring physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['14deg', '-14deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-14deg', '14deg']);
  const sheenX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsDiscOut(false);
  };

  const toggleFlip = () => {
    audio.playStampThud();
    setIsFlipped(!isFlipped);
  };

  const toggleDisc = () => {
    audio.playVinylScratch();
    setIsDiscOut(!isDiscOut);
  };

  return (
    <div className="relative py-8 flex flex-col items-center justify-center">
      {/* Interaction prompt */}
      <div className="mb-4 flex items-center space-x-2 text-xs font-mono-retro text-[#141414] font-bold uppercase tracking-widest">
        <Sparkles className="w-3.5 h-3.5 text-[#D95D39]" />
        <span>3D INTERACTIVE RECORD SLEEVE — HOVER TO TILT · CLICK DISC TO SLIDE · CLICK SLEEVE TO FLIP</span>
      </div>

      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-[340px] sm:w-[420px] md:w-[460px] h-[360px] sm:h-[440px] cursor-pointer select-none perspective-[1200px]"
      >
        {/* Sliding Glossy Vinyl LP Disc (Pokes out from sleeve) */}
        <motion.div
          animate={{
            x: isDiscOut ? 160 : 60,
            rotate: isDiscOut ? 120 : 25,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          onClick={(e) => {
            e.stopPropagation();
            toggleDisc();
          }}
          data-cursor="PULL RECORD"
          className="absolute top-4 sm:top-6 right-0 w-[300px] sm:w-[380px] h-[300px] sm:h-[380px] rounded-full bg-[#111111] shadow-[0_15px_35px_rgba(0,0,0,0.5)] border-4 border-[#222222] flex items-center justify-center z-10"
          style={{
            backgroundImage: `repeating-radial-gradient(circle at center, #111 0, #111 2px, #1a1a1a 3px, #111 4px)`,
          }}
        >
          {/* Vinyl Grooves highlights */}
          <div className="absolute inset-4 rounded-full border border-white/5 pointer-events-none" />
          <div className="absolute inset-12 rounded-full border border-white/5 pointer-events-none" />
          <div className="absolute inset-20 rounded-full border border-white/5 pointer-events-none" />

          {/* Record Center Label */}
          <div className="w-28 sm:w-36 h-28 sm:h-36 rounded-full bg-[#D95D39] text-[#F5F2ED] border-4 border-[#E6A92A] flex flex-col items-center justify-center text-center p-2 shadow-inner relative">
            {/* Center spindle hole */}
            <div className="w-4 h-4 rounded-full bg-[#111] border-2 border-[#E6A92A] z-20 absolute" />
            
            <span className="text-[7px] font-mono-retro font-bold uppercase tracking-widest text-[#F5F2ED]/80 mt-1">
              HIS MASTER'S VOICE
            </span>
            <span className="font-rozha text-xs sm:text-sm font-bold text-[#F5F2ED]">
              AARAV '88
            </span>
            <span className="text-[7px] font-mono-retro text-[#E6A92A] font-semibold mt-4">
              SIDE A · 33⅓ RPM
            </span>
          </div>
        </motion.div>

        {/* Outer 3D Tilting Record Jacket */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          onClick={toggleFlip}
          data-cursor="FLIP SLEEVE"
          className="relative w-[300px] sm:w-[380px] h-[300px] sm:h-[380px] z-20 rounded-none shadow-[10px_20px_40px_rgba(20,20,20,0.3)] transition-shadow duration-300"
        >
          {/* Front Jacket Cover */}
          <div
            className={`absolute inset-0 border-4 border-[#141414] p-5 flex flex-col justify-between overflow-hidden transition-opacity duration-300 ${
              isFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
            style={{
              backgroundColor: '#F5F2ED',
              backgroundImage: `radial-gradient(#0E3D3C 0.75px, transparent 0.75px), radial-gradient(#D95D39 0.75px, #F5F2ED 0.75px)`,
              backgroundSize: '24px 24px',
              backgroundPosition: '0 0, 12px 12px',
            }}
          >
            {/* Specular Light Sheen Overlay */}
            <motion.div
              style={{
                background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%)`,
              }}
              className="absolute inset-0 pointer-events-none"
            />

            {/* Top Header of Album */}
            <div className="flex items-start justify-between z-10">
              <div>
                <span className="px-2 py-0.5 bg-[#0E3D3C] text-[#F5F2ED] text-[9px] font-mono-retro font-bold uppercase tracking-widest">
                  HMV STEREO ECLP-1984
                </span>
                <h3 className="font-rozha text-2xl sm:text-3xl text-[#141414] font-black leading-none mt-1.5">
                  THE ESSENTIAL AARAV
                </h3>
                <p className="font-script text-base text-[#D95D39]">
                  Vol. I: Ragas, Systems & Analog Silicon
                </p>
              </div>

              {/* Gold Foil Seal */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ECC880] via-[#E6A92A] to-[#C99738] border-2 border-[#141414] shadow-md flex flex-col items-center justify-center text-center p-1 rotate-12">
                <Award className="w-3.5 h-3.5 text-[#141414]" />
                <span className="text-[6px] font-mono-retro font-bold text-[#141414] leading-none uppercase">
                  GOLD FOIL
                </span>
              </div>
            </div>

            {/* Center Art Graphic / Indian Architectural Motif */}
            <div className="my-auto text-center flex flex-col items-center justify-center z-10">
              <div className="w-20 sm:w-24 h-20 sm:h-24 border-4 border-[#D95D39] bg-[#FFFFFF] flex items-center justify-center p-2 shadow-inner relative group">
                <div className="w-16 sm:w-20 h-16 sm:h-20 border-2 border-dashed border-[#0E3D3C] flex items-center justify-center">
                  <span className="font-rozha text-3xl sm:text-4xl text-[#D95D39]">
                    ॐ
                  </span>
                </div>
                <div className="absolute -bottom-2 px-2 py-0.5 bg-[#E6A92A] text-[#141414] text-[8px] font-mono-retro font-bold uppercase border border-[#141414]">
                  HIGH FIDELITY
                </div>
              </div>
            </div>

            {/* Bottom Liner metadata */}
            <div className="flex items-end justify-between border-t border-[#141414]/30 pt-2 z-10">
              <div className="text-[9px] font-mono-retro text-stone-700 leading-tight">
                <span>MANUFACTURED IN NAGPUR, INDIA</span>
                <br />
                <span className="text-[#0E3D3C] font-bold">FEATURING 5 COLLECTIBLE BADGES</span>
              </div>
              <div className="text-right">
                <span className="text-[9px] font-mono-retro font-bold text-[#D95D39] flex items-center space-x-1">
                  <RotateCw className="w-2.5 h-2.5" />
                  <span>CLICK TO FLIP</span>
                </span>
              </div>
            </div>
          </div>

          {/* Back Liner Notes Sleeve */}
          <div
            className={`absolute inset-0 border-4 border-[#141414] bg-[#FFFFFF] p-5 flex flex-col justify-between transition-opacity duration-300 ${
              isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div>
              <div className="flex justify-between items-center border-b-2 border-[#141414] pb-1.5 mb-2">
                <span className="font-mono-retro text-[9px] font-bold uppercase text-[#0E3D3C]">
                  LINER NOTES & SYSTEM METRICS
                </span>
                <span className="font-mono-retro text-[9px] text-[#D95D39] font-bold">
                  CAT: ARV-88-LP
                </span>
              </div>

              <h4 className="font-display font-bold text-sm text-[#141414]">
                "A bold convergence of codecraft, typography, and analog soul."
              </h4>

              <div className="mt-2.5 space-y-1.5 text-[10px] font-mono-retro text-stone-700">
                <div className="flex justify-between border-b border-stone-200 py-0.5">
                  <span>TRACK 01: Core Systems Architecture</span>
                  <span className="font-bold text-[#0E3D3C]">4:20</span>
                </div>
                <div className="flex justify-between border-b border-stone-200 py-0.5">
                  <span>TRACK 02: High-Density UI Maximalism</span>
                  <span className="font-bold text-[#D95D39]">3:45</span>
                </div>
                <div className="flex justify-between border-b border-stone-200 py-0.5">
                  <span>TRACK 03: 35mm Grain & Indian Editorial</span>
                  <span className="font-bold text-[#E6A92A]">5:12</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span>TRACK 04: Masala Chai & Midnight Commits</span>
                  <span className="font-bold text-[#141414]">∞</span>
                </div>
              </div>
            </div>

            <div className="bg-[#F5F2ED] p-2.5 border border-stone-300 text-[9px] font-mono-retro text-stone-600">
              <p>
                Recorded live on analog circuitry, vacuum tubes, and modern TypeScript engines. 
                All rights reserved by Aarav. Play on all turntables.
              </p>
              <div className="mt-2 flex items-center justify-between text-[#D95D39] font-bold">
                <span>PRESS FLIP TO RETURN</span>
                <span>(33⅓ RPM)</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
