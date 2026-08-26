import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Disc, Sparkles, RotateCw, Volume2, Award, Music, Layers } from 'lucide-react';
import { audio } from '../utils/audio';

export const VinylSleeveCard: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDiscOut, setIsDiscOut] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mouse tilt mechanics with spring physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['14deg', '-14deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-14deg', '14deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isMobile) return;
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
    <div className="relative py-2 sm:py-8 flex flex-col items-center justify-center overflow-hidden w-full max-w-full">
      {/* Interaction prompt */}
      <div className="mb-2.5 sm:mb-4 inline-flex items-center space-x-1.5 sm:space-x-2 px-2 sm:px-3.5 py-0.5 sm:py-1.5 bg-[#FFFFFF] border border-[#141414] sm:border-2 shadow-[2px_2px_0px_#141414] text-[8px] min-[360px]:text-[9px] sm:text-xs font-mono-retro text-[#141414] font-bold uppercase tracking-wider sm:tracking-widest text-center max-w-full">
        <Sparkles className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#D95D39] shrink-0" />
        <span className="truncate sm:overflow-visible">
          TAP SLEEVE TO FLIP · TAP DISC TO SLIDE
        </span>
      </div>

      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-[230px] min-[360px]:w-[260px] min-[400px]:w-[290px] sm:w-[420px] md:w-[460px] h-[205px] min-[360px]:h-[225px] min-[400px]:h-[250px] sm:h-[440px] cursor-pointer select-none perspective-[1200px] mx-auto"
      >
        {/* Sliding Glossy Vinyl LP Disc (Pokes out from sleeve) */}
        <motion.div
          animate={{
            x: isDiscOut ? (isMobile ? 42 : 150) : (isMobile ? 16 : 55),
            rotate: isDiscOut ? 120 : 25,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          onClick={(e) => {
            e.stopPropagation();
            toggleDisc();
          }}
          data-cursor="PULL RECORD"
          className="absolute top-1 sm:top-6 right-0 w-[185px] min-[360px]:w-[205px] min-[400px]:w-[225px] sm:w-[380px] h-[185px] min-[360px]:h-[205px] min-[400px]:h-[225px] sm:h-[380px] rounded-full bg-[#111111] shadow-[0_10px_25px_rgba(0,0,0,0.5)] border-2 sm:border-4 border-[#222222] flex items-center justify-center z-10"
          style={{
            backgroundImage: `repeating-radial-gradient(circle at center, #111 0, #111 2px, #1a1a1a 3px, #111 4px)`,
          }}
        >
          {/* Vinyl Grooves highlights */}
          <div className="absolute inset-1.5 sm:inset-4 rounded-full border border-white/5 pointer-events-none" />
          <div className="absolute inset-4 sm:inset-12 rounded-full border border-white/5 pointer-events-none" />
          <div className="absolute inset-7 sm:inset-20 rounded-full border border-white/5 pointer-events-none" />

          {/* Record Center Label */}
          <div className="w-14 min-[360px]:w-16 min-[400px]:w-18 sm:w-36 h-14 min-[360px]:h-16 min-[400px]:h-18 sm:h-36 rounded-full bg-[#D95D39] text-[#F5F2ED] border-2 sm:border-4 border-[#E6A92A] flex flex-col items-center justify-center text-center p-0.5 sm:p-2 shadow-inner relative">
            {/* Center spindle hole */}
            <div className="w-2.5 h-2.5 sm:w-4 sm:h-4 rounded-full bg-[#111] border sm:border-2 border-[#E6A92A] z-20 absolute" />
            
            <span className="text-[5px] sm:text-[7px] font-mono-retro font-bold uppercase tracking-widest text-[#F5F2ED]/80 mt-0.5 sm:mt-1">
              HMV STEREO
            </span>
            <span className="font-rozha text-[8px] min-[360px]:text-[9px] sm:text-sm font-bold text-[#F5F2ED] leading-tight">
              AARAV '88
            </span>
            <span className="text-[5px] sm:text-[7px] font-mono-retro text-[#E6A92A] font-semibold mt-0.5 sm:mt-3">
              33⅓ RPM
            </span>
          </div>
        </motion.div>

        {/* Outer 3D Tilting Record Jacket */}
        <motion.div
          style={{
            rotateX: isMobile ? '0deg' : rotateX,
            rotateY: isMobile ? '0deg' : rotateY,
            transformStyle: 'preserve-3d',
          }}
          onClick={toggleFlip}
          data-cursor="FLIP SLEEVE"
          className="relative w-[185px] min-[360px]:w-[205px] min-[400px]:w-[225px] sm:w-[380px] h-[185px] min-[360px]:h-[205px] min-[400px]:h-[225px] sm:h-[380px] z-20 rounded-none shadow-[4px_8px_18px_rgba(20,20,20,0.25)] sm:shadow-[8px_14px_30px_rgba(20,20,20,0.3)] transition-shadow duration-300"
        >
          {/* Front Jacket Cover */}
          <div
            className={`absolute inset-0 border-2 sm:border-4 border-[#141414] p-2 min-[360px]:p-2.5 sm:p-5 flex flex-col justify-between overflow-hidden transition-opacity duration-300 ${
              isFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
            style={{
              backgroundColor: '#F5F2ED',
              backgroundImage: `radial-gradient(#0E3D3C 0.75px, transparent 0.75px), radial-gradient(#D95D39 0.75px, #F5F2ED 0.75px)`,
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 10px 10px',
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
                <span className="px-1 sm:px-2 py-0.2 sm:py-0.5 bg-[#0E3D3C] text-[#F5F2ED] text-[6px] sm:text-[9px] font-mono-retro font-bold uppercase tracking-wider sm:tracking-widest">
                  HMV STEREO ECLP-1984
                </span>
                <h3 className="font-rozha text-xs min-[360px]:text-sm sm:text-3xl text-[#141414] font-black leading-none mt-0.5 sm:mt-1.5">
                  THE ESSENTIAL AARAV
                </h3>
                <p className="font-script text-[9px] min-[360px]:text-[10px] sm:text-base text-[#D95D39]">
                  Vol. I: Ragas, Systems & Silicon
                </p>
              </div>

              {/* Gold Foil Seal */}
              <div className="w-6 h-6 min-[360px]:w-7 min-[360px]:h-7 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#ECC880] via-[#E6A92A] to-[#C99738] border sm:border-2 border-[#141414] shadow-sm sm:shadow-md flex flex-col items-center justify-center text-center p-0.5 sm:p-1 rotate-12 shrink-0">
                <Award className="w-2 h-2 sm:w-3.5 sm:h-3.5 text-[#141414]" />
                <span className="text-[4px] sm:text-[6px] font-mono-retro font-bold text-[#141414] leading-none uppercase">
                  GOLD
                </span>
              </div>
            </div>

            {/* Center Art Graphic / Indian Architectural Motif */}
            <div className="my-auto text-center flex flex-col items-center justify-center z-10">
              <div className="w-9 h-9 min-[360px]:w-10 min-[360px]:h-10 sm:w-24 sm:h-24 border sm:border-2 md:border-4 border-[#D95D39] bg-[#FFFFFF] flex items-center justify-center p-0.5 sm:p-2 shadow-inner relative group">
                <div className="w-7 h-7 min-[360px]:w-8 min-[360px]:h-8 sm:w-20 sm:h-20 border border-dashed border-[#0E3D3C] flex items-center justify-center">
                  <span className="font-rozha text-xs min-[360px]:text-sm sm:text-4xl text-[#D95D39]">
                    ॐ
                  </span>
                </div>
                <div className="absolute -bottom-1 sm:-bottom-2 px-1 sm:px-2 py-0 bg-[#E6A92A] text-[#141414] text-[4.5px] sm:text-[8px] font-mono-retro font-bold uppercase border border-[#141414]">
                  HI-FI
                </div>
              </div>
            </div>

            {/* Bottom Liner metadata */}
            <div className="flex items-end justify-between border-t border-[#141414]/30 pt-1 sm:pt-2 z-10">
              <div className="text-[5.5px] min-[360px]:text-[6.5px] sm:text-[9px] font-mono-retro text-stone-700 leading-tight">
                <span>NAGPUR, INDIA</span>
                <br />
                <span className="text-[#0E3D3C] font-bold">5 BADGES</span>
              </div>
              <div className="text-right">
                <span className="text-[5.5px] min-[360px]:text-[6.5px] sm:text-[9px] font-mono-retro font-bold text-[#D95D39] flex items-center space-x-0.5 sm:space-x-1">
                  <RotateCw className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                  <span>TAP TO FLIP</span>
                </span>
              </div>
            </div>
          </div>

          {/* Back Liner Notes Sleeve */}
          <div
            className={`absolute inset-0 border-2 sm:border-4 border-[#141414] bg-[#FFFFFF] p-2 min-[360px]:p-2.5 sm:p-5 flex flex-col justify-between transition-opacity duration-300 ${
              isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div>
              <div className="flex justify-between items-center border-b sm:border-b-2 border-[#141414] pb-0.5 sm:pb-1.5 mb-1 sm:mb-2">
                <span className="font-mono-retro text-[6px] min-[360px]:text-[7px] sm:text-[9px] font-bold uppercase text-[#0E3D3C]">
                  LINER NOTES
                </span>
                <span className="font-mono-retro text-[6px] min-[360px]:text-[7px] sm:text-[9px] text-[#D95D39] font-bold">
                  ARV-88-LP
                </span>
              </div>

              <h4 className="font-display font-bold text-[8px] min-[360px]:text-[9px] sm:text-sm text-[#141414] leading-tight sm:leading-snug line-clamp-1 sm:line-clamp-none">
                "Codecraft, typography, and analog soul."
              </h4>

              <div className="mt-1 sm:mt-2.5 space-y-0.5 sm:space-y-1.5 text-[6px] min-[360px]:text-[7px] sm:text-[10px] font-mono-retro text-stone-700">
                <div className="flex justify-between border-b border-stone-200 py-0.2 sm:py-0.5">
                  <span className="truncate pr-1">TRACK 01: Core Systems</span>
                  <span className="font-bold text-[#0E3D3C] shrink-0">4:20</span>
                </div>
                <div className="flex justify-between border-b border-stone-200 py-0.2 sm:py-0.5">
                  <span className="truncate pr-1">TRACK 02: High-Density UI</span>
                  <span className="font-bold text-[#D95D39] shrink-0">3:45</span>
                </div>
                <div className="flex justify-between border-b border-stone-200 py-0.2 sm:py-0.5">
                  <span className="truncate pr-1">TRACK 03: 35mm Grain</span>
                  <span className="font-bold text-[#E6A92A] shrink-0">5:12</span>
                </div>
                <div className="flex justify-between py-0.2 sm:py-0.5">
                  <span className="truncate pr-1">TRACK 04: Masala Chai</span>
                  <span className="font-bold text-[#141414] shrink-0">∞</span>
                </div>
              </div>
            </div>

            <div className="bg-[#F5F2ED] p-1 sm:p-2.5 border border-stone-300 text-[5.5px] min-[360px]:text-[6.5px] sm:text-[9px] font-mono-retro text-stone-600">
              <p className="line-clamp-1 sm:line-clamp-none">
                Analog circuitry, vacuum tubes, and modern TypeScript.
              </p>
              <div className="mt-0.5 sm:mt-2 flex items-center justify-between text-[#D95D39] font-bold">
                <span>PRESS FLIP</span>
                <span>(33⅓ RPM)</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

