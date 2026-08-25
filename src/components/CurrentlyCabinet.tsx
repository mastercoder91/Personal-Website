import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Hammer, 
  Book, 
  Radio, 
  Coffee, 
  Compass, 
  Sparkles, 
  Bookmark,
  Quote
} from 'lucide-react';
import { CURRENTLY_LIST } from '../data/portfolioData';
import { audio } from '../utils/audio';

export const CurrentlyCabinet: React.FC = () => {
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Hammer': return <Hammer className="w-5 h-5" />;
      case 'Book': return <Book className="w-5 h-5" />;
      case 'Radio': return <Radio className="w-5 h-5" />;
      case 'Coffee': return <Coffee className="w-5 h-5" />;
      case 'Compass': return <Compass className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section id="curiosities" className="py-8 sm:py-16 md:py-24 border-b-2 sm:border-b-4 border-[#141414] bg-[#F5F2ED] relative">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2.5 sm:gap-4 pb-3.5 sm:pb-6 border-b-2 sm:border-b-4 border-[#141414]">
          <div>
            <div className="flex items-center space-x-1.5 sm:space-x-2 text-[9px] sm:text-xs font-mono-retro font-bold text-[#D95D39] uppercase tracking-wider sm:tracking-widest">
              <span>SECTION 04</span>
              <span>—</span>
              <span>CURATED ARCHIVE & CURIOSITIES</span>
              <span className="font-hindi text-[9px] sm:text-xs text-[#141414] font-bold">
                (अध्याय ०४ : अभिरुचियां एवं अध्ययन)
              </span>
            </div>
            <h2 className="font-rozha text-2xl sm:text-5xl md:text-6xl text-[#141414] font-black tracking-tight mt-0.5 sm:mt-1 flex flex-wrap items-baseline gap-1.5 sm:gap-2">
              <span>THE CURRENT OBSESSIONS</span>
              <span className="font-hindi text-lg sm:text-2xl md:text-3xl text-[#D95D39] font-bold">
                ॥ वर्तमान जिज्ञासा एवं साधना ॥
              </span>
            </h2>
          </div>

          <div className="flex items-center space-x-2">
            <span className="font-script text-base sm:text-xl text-[#D95D39]">
              "Artifacts from the workbench."
            </span>
          </div>
        </div>

        {/* Curated Grid of 6 Tiles */}
        <div className="mt-5 sm:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6">
          {CURRENTLY_LIST.map((item, idx) => {
            const isSelected = activeItem === idx;

            return (
              <motion.div
                key={idx}
                whileHover={{ y: -4, rotate: idx % 2 === 0 ? 0.5 : -0.5 }}
                onClick={() => {
                  audio.playClick(420 + idx * 60);
                  setActiveItem(isSelected ? null : idx);
                }}
                data-cursor="EXAMINE"
                className={`p-3.5 sm:p-5 border-2 border-[#141414] shadow-[3px_3px_0px_#141414] sm:shadow-[4px_4px_0px_#141414] cursor-pointer transition-all relative overflow-hidden bg-[#FFFFFF] flex flex-col justify-between ${
                  isSelected ? 'ring-2 ring-[#D95D39]' : ''
                }`}
              >
                <div>
                  {/* Top Specimen Tag */}
                  <div className="flex items-center justify-between border-b border-[#141414]/20 pb-1.5 sm:pb-2 mb-2 sm:mb-3">
                    <div className="flex items-center space-x-1 sm:space-x-1.5">
                      <span
                        className="px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[9px] font-mono-retro font-bold text-[#F5F2ED] uppercase tracking-wider"
                        style={{ backgroundColor: item.accent }}
                      >
                        {item.category}
                      </span>
                      {item.hindiCategory && (
                        <span className="font-hindi text-[9px] sm:text-[10px] font-bold text-stone-700">
                          {item.hindiCategory}
                        </span>
                      )}
                    </div>
                    <span className="text-[8px] sm:text-[10px] font-mono-retro text-stone-500 font-bold">
                      ITEM NO. 0{idx + 1}
                    </span>
                  </div>

                  <div className="flex items-start space-x-2.5 sm:space-x-3 mb-2 sm:mb-3">
                    <div
                      className="p-1.5 sm:p-2 text-[#F5F2ED] shrink-0 border border-[#141414] shadow-[1.5px_1.5px_0px_#141414] sm:shadow-[2px_2px_0px_#141414]"
                      style={{ backgroundColor: item.accent }}
                    >
                      {getIcon(item.icon)}
                    </div>
                    <div>
                      <h4 className="font-rozha text-base sm:text-xl font-bold text-[#141414] leading-tight">
                        {item.title}
                      </h4>
                      {item.hindiTitle && (
                        <span className="font-hindi text-[11px] sm:text-xs text-[#D95D39] font-bold block mt-0.5">
                          {item.hindiTitle}
                        </span>
                      )}
                      <p className="text-[10px] sm:text-xs text-stone-600 font-mono-retro mt-0.5 font-bold">
                        {item.tag}
                      </p>
                    </div>
                  </div>

                  <p className="text-[11px] sm:text-xs text-stone-700 font-sans leading-relaxed mt-1 sm:mt-2">
                    {item.subtitle}
                  </p>
                </div>

                {item.quote && (
                  <div className="mt-2.5 sm:mt-4 pt-2 sm:pt-3 border-t border-stone-200">
                    <span className="font-script text-xs sm:text-base text-[#D95D39] block">
                      {item.quote}
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}

          {/* 6th Slot: Daily Proverb for Builders */}
          <motion.div
            whileHover={{ y: -4 }}
            className="p-3.5 sm:p-5 border-2 border-[#141414] shadow-[3px_3px_0px_#141414] sm:shadow-[4px_4px_0px_#141414] bg-[#FDFBF7] flex flex-col justify-between relative overflow-hidden"
          >
            {/* Top Tag */}
            <div>
              <div className="flex items-center justify-between border-b border-[#141414]/20 pb-1.5 sm:pb-2 mb-2 sm:mb-3">
                <div className="flex items-center space-x-1 sm:space-x-1.5">
                  <span className="px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[9px] font-mono-retro font-bold text-[#F5F2ED] bg-[#0E3D3C] uppercase tracking-wider">
                    DISPATCH
                  </span>
                  <span className="font-hindi text-[9px] sm:text-[10px] font-bold text-stone-700">
                    संदेश
                  </span>
                </div>
                <span className="text-[8px] sm:text-[10px] font-mono-retro text-stone-500 font-bold">
                  ITEM NO. 06
                </span>
              </div>

              <div className="flex items-center space-x-2 text-[#0E3D3C] font-mono-retro text-xs font-bold mb-2 sm:mb-3">
                <div className="p-1.5 sm:p-2 bg-[#0E3D3C] text-[#F5F2ED] border border-[#141414] shadow-[1.5px_1.5px_0px_#141414] sm:shadow-[2px_2px_0px_#141414]">
                  <Bookmark className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[#E6A92A]" />
                </div>
                <div>
                  <h4 className="font-rozha text-base sm:text-xl font-bold text-[#141414] leading-tight">
                    Daily Proverb
                  </h4>
                  <p className="text-[10px] sm:text-xs text-stone-600 font-mono-retro font-bold">
                    For Builders & Crafters · शिल्पकारों हेतु
                  </p>
                </div>
              </div>

              <div className="p-2.5 sm:p-4 bg-[#FFFFFF] border-2 border-[#141414] shadow-[2px_2px_0px_#141414] my-1.5 sm:my-2 relative">
                <Quote className="w-4 h-4 sm:w-6 sm:h-6 text-[#E6A92A]/40 absolute top-1.5 right-1.5 pointer-events-none" />
                <p className="font-display text-[11px] sm:text-sm font-bold text-[#141414] italic leading-relaxed">
                  “Just get your ass to build something cool ahh soul”
                </p>
                <p className="font-hindi text-[11px] sm:text-sm font-bold text-[#0E3D3C] mt-1.5 sm:mt-2">
                  "कर्म में निष्ठा, शिल्प में सौंदर्य और सृजन में आनंद।"
                </p>
              </div>
            </div>

            <div className="mt-2 sm:mt-3 pt-1.5 sm:pt-2 border-t border-stone-200 text-right flex items-center justify-end space-x-1.5 sm:space-x-2">
              <span className="font-script text-xs sm:text-base text-[#D95D39]">
                — From the Workbench
              </span>
              <span className="font-hindi text-[10px] sm:text-xs text-stone-500 font-bold">(कार्यशाला से)</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
