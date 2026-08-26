import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Compass, BookOpen, Cpu, Sparkles, Feather, Terminal, Palette, Radio } from 'lucide-react';
import { audio } from '../utils/audio';

export const AboutEditorial: React.FC = () => {
  const [activePillar, setActivePillar] = useState<number>(0);

  const pillars = [
    {
      title: "Systems Engineering",
      hindiTitle: "तंत्रज्ञान वास्तुशिल्प",
      tag: "THE BACKBONE · मुख्य आधार",
      icon: Cpu,
      color: "#0E3D3C",
      detail: "Architecting resilient, deterministic backend systems, zero-copy buffers, low-latency APIs, and clean data contracts that never buckle under pressure."
    },
    {
      title: "Tactile Maximalism",
      hindiTitle: "स्पर्शनीय प्रचुरता",
      tag: "THE ETHOS · दर्शन",
      icon: Palette,
      color: "#D95D39",
      detail: "Rejecting generic SaaS minimalism. Bringing back the weight, density, texture, and emotional resonance of physical print, postage stamps, and vintage hi-fi gear."
    },
    {
      title: "Sound & Microtones",
      hindiTitle: "ध्वनि एवं सूक्ष्म स्वर",
      tag: "THE RHYTHM · लय एवं ताल",
      icon: Radio,
      color: "#E6A92A",
      detail: "Curating rare Indian disco pressings, classic ragas, Web Audio synthesizers, and the mechanical clatter of vintage buckling spring keyboards."
    },
    {
      title: "Editorial Typography",
      hindiTitle: "मुद्रण एवं लिपि शिल्प",
      tag: "THE CRAFT · कला",
      icon: Feather,
      color: "#8A252C",
      detail: "Obsessive font pairing, optical kerning, ink-trap preservation, and high-contrast serifs that give digital words genuine physical authority."
    }
  ];

  return (
    <section id="manifesto" className="py-8 sm:py-16 md:py-24 border-b-2 border-[#141414] bg-[#F5F2ED] relative">
      {/* Background Halftone grid */}
      <div className="absolute inset-0 bg-halftone opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 relative z-10">
        {/* Section Header with Issue stamp */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2.5 sm:gap-4 pb-3.5 sm:pb-6 border-b-2 border-[#141414]">
          <div>
            <div className="flex items-center space-x-1.5 sm:space-x-2 text-[9px] sm:text-xs font-mono-retro font-bold text-[#D95D39] uppercase tracking-wider sm:tracking-widest">
              <span>SECTION 01</span>
              <span>—</span>
              <span>THE PERSONAL MANIFESTO</span>
              <span className="font-hindi text-[9px] sm:text-xs text-[#141414] font-bold">
                (अध्याय ०१ : विचारधारा)
              </span>
            </div>
            <h2 className="font-rozha text-2xl sm:text-4xl md:text-6xl text-[#141414] font-black tracking-tight mt-0.5 sm:mt-1 flex flex-wrap items-baseline gap-1.5 sm:gap-2">
              <span>PROCLAMATION & ESSENCE</span>
              <span className="font-hindi text-lg sm:text-2xl md:text-3xl text-[#D95D39] font-bold">
                ॥ उद्घोषणा एवं तत्व ॥
              </span>
            </h2>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <span className="font-script text-base sm:text-2xl text-[#0E3D3C]">
              "Craft over commodity."
            </span>
            <div className="px-2 sm:px-3 py-0.5 sm:py-1 bg-[#141414] text-[#F5F2ED] text-[8px] sm:text-[10px] font-mono-retro font-bold uppercase border border-[#E6A92A]">
              DISPATCH #88
            </div>
          </div>
        </div>

        {/* Two-Column Editorial Layout (80s Magazine Style) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-12 mt-5 sm:mt-10 items-start">
          {/* Left Main Article Column with Drop Cap */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <div className="bg-[#FFFFFF] border-2 border-[#141414] p-3.5 sm:p-6 md:p-8 shadow-[3px_3px_0px_#141414] sm:shadow-[4px_4px_0px_#141414] relative">
              {/* Top Accent Stamp */}
              <div className="absolute -top-3 left-3 sm:left-6 bg-[#D95D39] text-[#F5F2ED] px-2 sm:px-3 py-0.5 text-[8px] sm:text-[10px] font-mono-retro font-bold uppercase tracking-wider border border-[#141414] flex items-center space-x-1 sm:space-x-1.5">
                <span>EDITORIAL ESSAY</span>
                <span>·</span>
                <span className="font-hindi font-normal">संपादकीय लेख</span>
              </div>

              <div className="prose max-w-none text-[#141414]">
                <p className="text-sm sm:text-lg leading-relaxed text-stone-800">
                  <span className="float-left font-rozha text-4xl sm:text-6xl md:text-7xl font-bold leading-none pr-2.5 pt-0.5 text-[#D95D39] select-none">
                    A
                  </span>
                  curious teenager with a strong interest in technology, Formula 1, music, and creative projects. 🏎️💻🎧
                </p>

                <p className="mt-3 sm:mt-4 text-xs sm:text-base leading-relaxed text-stone-700 font-sans">
                  I enjoy building things, experimenting with new ideas, discovering new sounds, and exploring whatever happens to capture my attention. I’m particularly interested in how technology can be used to turn ideas into something tangible and meaningful.
                </p>

                <p className="mt-3 sm:mt-4 text-xs sm:text-base leading-relaxed text-stone-700 font-sans">
                  Outside of development, I’m usually following F1, exploring music, learning something new, or going down an unnecessarily deep rabbit hole about a completely random ass topic.✌🏻✌🏻
                </p>

                <p className="mt-3 sm:mt-4 text-xs sm:text-base leading-relaxed text-stone-700 font-sans font-medium text-stone-900">
                  Currently focused on learning, creating, and figuring out what comes next with a little financial assistance from the family corporation™. 💀
                </p>
              </div>

              {/* Pull-Quote with Indian Editorial Framing */}
              <div className="my-3.5 sm:my-6 p-3 sm:p-5 bg-[#F5F2ED] border-l-4 border-[#0E3D3C] border-y border-r border-[#141414]/20 relative">
                <p className="font-display italic text-sm sm:text-xl font-bold text-[#0E3D3C] leading-snug">
                  “Just get your ass to build something cool ahh soul”
                </p>
                <p className="font-hindi text-xs sm:text-base text-stone-700 mt-1.5 sm:mt-2 font-medium">
                  "साहस से निर्माण करो, बारीकियों में सौंदर्य खोजो।"
                </p>
                <div className="mt-1 sm:mt-2 text-right flex items-center justify-end space-x-1">
                  <span className="font-script text-sm sm:text-lg text-[#D95D39]">— Aarav's Notebook</span>
                  <span className="font-hindi text-[10px] sm:text-xs text-stone-500 font-bold">(आरव की डायरी)</span>
                </div>
              </div>

              {/* Quick stats / credentials row */}
              <div className="grid grid-cols-3 gap-1 sm:gap-2 pt-2.5 sm:pt-4 border-t border-stone-200 text-center font-mono-retro">
                <div className="p-1 sm:p-2 bg-[#F5F2ED] border border-stone-300">
                  <div className="font-rozha text-[11px] min-[360px]:text-xs sm:text-base text-[#D95D39] font-bold leading-tight flex items-center justify-center min-h-[24px] sm:min-h-[32px]">
                    ig some months
                  </div>
                  <div className="text-[6px] min-[360px]:text-[7px] sm:text-[9px] uppercase text-stone-600 font-bold leading-tight">into dev journey ✌🏻</div>
                </div>
                <div className="p-1 sm:p-2 bg-[#F5F2ED] border border-stone-300">
                  <div className="font-rozha text-base sm:text-2xl text-[#0E3D3C] font-bold">100%</div>
                  <div className="text-[6px] min-[360px]:text-[7px] sm:text-[9px] uppercase text-stone-600 font-bold leading-tight">Independent Spirit</div>
                </div>
                <div className="p-1 sm:p-2 bg-[#F5F2ED] border border-stone-300">
                  <div className="font-rozha text-base sm:text-2xl text-[#E6A92A] font-bold">∞</div>
                  <div className="text-[6px] min-[360px]:text-[7px] sm:text-[9px] uppercase text-stone-600 font-bold leading-tight">Curiosity & Craft</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Four Pillars of Craft */}
          <div className="lg:col-span-5 space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                <span className="font-mono-retro text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest text-[#0E3D3C]">
                  THE CORE PILLARS
                </span>
                <span className="font-hindi text-[9px] sm:text-[10px] text-[#D95D39] font-bold">
                  (चार मुख्य स्तंभ)
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] font-mono-retro text-stone-500 font-bold">
                TAP TO INSPECT
              </span>
            </div>

            <div className="space-y-2.5 sm:space-y-3">
              {pillars.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                const isSelected = activePillar === idx;

                return (
                  <motion.button
                    key={idx}
                    onClick={() => {
                      audio.playClick(400 + idx * 70);
                      setActivePillar(idx);
                    }}
                    whileHover={{ x: 4 }}
                    data-cursor="INSPECT"
                    className={`w-full text-left p-3 sm:p-4 border-2 border-[#141414] shadow-[2px_2px_0px_#141414] sm:shadow-[4px_4px_0px_#141414] transition-all relative overflow-hidden ${
                      isSelected
                        ? 'bg-[#FFFFFF] ring-2 ring-[#D95D39]'
                        : 'bg-[#F5F2ED] hover:bg-[#FFFFFF]'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2.5 sm:space-x-3">
                        <div
                          className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-[#F5F2ED] border border-[#141414] shadow-sm shrink-0"
                          style={{ backgroundColor: pillar.color }}
                        >
                          <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <div>
                          <div className="text-[9px] sm:text-[10px] font-mono-retro font-bold text-stone-500 tracking-wider">
                            {pillar.tag}
                          </div>
                          <div className="flex items-baseline space-x-1.5 sm:space-x-2">
                            <h4 className="font-display font-bold text-sm sm:text-base text-[#141414]">
                              {pillar.title}
                            </h4>
                            <span className="font-hindi text-[11px] sm:text-xs font-bold text-[#D95D39]">
                              {pillar.hindiTitle}
                            </span>
                          </div>
                        </div>
                      </div>

                      <span className="font-mono-retro text-[10px] sm:text-xs font-bold text-stone-400">
                        0{idx + 1}
                      </span>
                    </div>

                    {isSelected && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-2.5 sm:mt-3 pt-2.5 sm:pt-3 border-t border-stone-200 text-xs text-stone-700 font-sans leading-relaxed"
                      >
                        {pillar.detail}
                      </motion.p>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Cultural Influence Callout Box */}
            <div className="p-3 sm:p-4 bg-[#0E3D3C] text-[#F5F2ED] border-2 border-[#141414] shadow-[3px_3px_0px_#141414] sm:shadow-[4px_4px_0px_#141414] relative">
              <div className="flex items-center space-x-1.5 sm:space-x-2 text-[#E6A92A] text-[11px] sm:text-xs font-mono-retro font-bold mb-1">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>CULTURAL INFLUENCE · सांस्कृतिक प्रभाव</span>
              </div>
              <p className="text-[11px] sm:text-xs text-stone-200 leading-relaxed">
                Drawing inspiration from NID Ahmedabad design journals, matchbox label art, hand-painted cinema billboards, and Indian railway signage.
              </p>
              <div className="mt-2 pt-2 border-t border-[#F5F2ED]/20 flex items-center justify-between text-[9px] sm:text-[10px] font-hindi text-[#E6A92A]">
                <span>सिनेमा पोस्टर एवं मुद्रण कला</span>
                <span>भारतीय रेलवे चिन्ह</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
