import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Disc, 
  BookOpen, 
  Mail, 
  ExternalLink, 
  Copy, 
  Check, 
  Sparkles,
  X,
  Stamp,
  Award
} from 'lucide-react';
import { SOCIAL_STAMPS } from '../data/portfolioData';
import { SocialBadge } from '../types';
import { audio } from '../utils/audio';

export const SocialStamps: React.FC = () => {
  const [selectedStamp, setSelectedStamp] = useState<SocialBadge | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Github': return <Github className="w-6 h-6" />;
      case 'Twitter': return <Twitter className="w-6 h-6" />;
      case 'Linkedin': return <Linkedin className="w-6 h-6" />;
      case 'Instagram': return <Instagram className="w-6 h-6" />;
      case 'Disc': return <Disc className="w-6 h-6" />;
      case 'BookOpen': return <BookOpen className="w-6 h-6" />;
      case 'Mail': return <Mail className="w-6 h-6" />;
      default: return <Sparkles className="w-6 h-6" />;
    }
  };

  const handleCopy = (stamp: SocialBadge, e: React.MouseEvent) => {
    e.stopPropagation();
    audio.playStampThud();
    navigator.clipboard.writeText(stamp.handle || stamp.url);
    setCopiedId(stamp.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const openModal = (stamp: SocialBadge) => {
    audio.playStampThud();
    setSelectedStamp(stamp);
  };

  const closeModal = () => {
    audio.playClick(400);
    setSelectedStamp(null);
  };

  return (
    <section id="stamps" className="py-10 sm:py-16 md:py-24 border-b-2 sm:border-b-4 border-[#141414] bg-[#F5F2ED] relative">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 pb-4 sm:pb-6 border-b-2 sm:border-b-4 border-[#141414]">
          <div>
            <div className="flex items-center space-x-2 text-[10px] sm:text-xs font-mono-retro font-bold text-[#D95D39] uppercase tracking-widest">
              <span>SECTION 02</span>
              <span>—</span>
              <span>PHILATELIC DISPATCHES</span>
            </div>
            <h2 className="font-rozha text-3xl sm:text-5xl md:text-6xl text-[#141414] font-black tracking-tight mt-1">
              COLLECTIBLE SOCIAL STAMPS
            </h2>
          </div>

          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#FFFFFF] border-2 border-[#141414] shadow-[2px_2px_0px_#141414] sm:shadow-[3px_3px_0px_#141414] text-[10px] sm:text-xs font-mono-retro font-bold text-[#D95D39]">
              <Stamp className="w-3.5 h-3.5" />
              <span>5 OFFICIAL EDITIONS</span>
            </span>
          </div>
        </div>

        <p className="mt-3 sm:mt-4 text-stone-700 font-sans max-w-2xl text-xs sm:text-base leading-relaxed">
          Each social outpost rendered as a commemorative postage stamp. Tap to inspect details, copy handle, or launch direct dispatch.
        </p>

        {/* Stamps Grid */}
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mt-6 sm:mt-10">
          {SOCIAL_STAMPS.map((stamp, idx) => {
            const isCopied = copiedId === stamp.id;

            return (
              <motion.div
                key={stamp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                whileHover={{ 
                  y: -6, 
                  rotate: idx % 2 === 0 ? 1.5 : -1.5,
                  scale: 1.01
                }}
                onClick={() => openModal(stamp)}
                data-cursor="INSPECT STAMP"
                className="cursor-pointer group relative"
              >
                {/* Perforated Postage Stamp Outer Body */}
                <div 
                  className="p-4 sm:p-5 rounded-none border-2 border-[#141414] shadow-[4px_4px_0px_#141414] sm:shadow-[6px_6px_0px_#141414] transition-all relative overflow-hidden flex flex-col justify-between min-h-[270px] sm:min-h-[300px]"
                  style={{
                    backgroundColor: '#FFFFFF',
                    backgroundImage: `radial-gradient(circle at top left, transparent 6px, #FFFFFF 6px), 
                                      radial-gradient(circle at top right, transparent 6px, #FFFFFF 6px),
                                      radial-gradient(circle at bottom left, transparent 6px, #FFFFFF 6px),
                                      radial-gradient(circle at bottom right, transparent 6px, #FFFFFF 6px)`,
                  }}
                >
                  {/* Decorative Perforated Top and Bottom Notch Dents */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[radial-gradient(circle_at_center,_#141414_1px,_transparent_1.5px)] bg-[length:8px_4px]" />
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[radial-gradient(circle_at_center,_#141414_1px,_transparent_1.5px)] bg-[length:8px_4px]" />

                  {/* Stamp Top Bar: Denomination & Country */}
                  <div className="flex items-center justify-between border-b border-[#141414]/20 pb-2">
                    <span className="font-mono-retro text-[9px] sm:text-[10px] font-bold tracking-widest text-[#141414] uppercase">
                      INDIA POST
                    </span>
                    <span 
                      className="font-rozha text-xs sm:text-sm font-black px-1.5 py-0.5 border border-[#141414] text-[#F5F2ED]"
                      style={{ backgroundColor: stamp.color }}
                    >
                      {stamp.denomination}
                    </span>
                  </div>

                  {/* Stamp Center Illustrated Artwork Box */}
                  <div 
                    className="my-2.5 sm:my-3 p-3 sm:p-4 border-2 border-dashed border-[#141414]/30 flex flex-col items-center justify-center text-center relative overflow-hidden transition-transform group-hover:scale-[1.02]"
                    style={{ backgroundColor: `${stamp.color}15` }}
                  >
                    {/* Cancellation Postmark Overlay (Realistic angled ink stamp) */}
                    <div className="absolute top-1.5 right-1.5 border-2 border-black/35 rounded-full w-14 sm:w-16 h-14 sm:h-16 flex flex-col items-center justify-center text-black/35 -rotate-12 pointer-events-none select-none">
                      <span className="text-[5px] sm:text-[6px] font-mono-retro font-bold leading-tight">{stamp.postmarkCity}</span>
                      <span className="text-[5px] sm:text-[6px] font-mono-retro font-bold leading-tight">{stamp.postmarkDate}</span>
                      <div className="w-8 sm:w-10 h-[1px] bg-black/35 my-0.5" />
                      <span className="text-[4px] sm:text-[5px] font-mono-retro uppercase">PASSED</span>
                    </div>

                    <div 
                      className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center text-[#F5F2ED] shadow-md border-2 border-[#141414] mb-1.5 sm:mb-2"
                      style={{ backgroundColor: stamp.color }}
                    >
                      {getIcon(stamp.iconName)}
                    </div>

                    <h3 className="font-rozha text-lg sm:text-xl font-bold text-[#141414] leading-tight">
                      {stamp.name}
                    </h3>
                    <p className="font-mono-retro text-[10px] sm:text-xs text-stone-600 font-bold mt-0.5 truncate max-w-full">
                      {stamp.handle}
                    </p>
                  </div>

                  {/* Stamp Description / Category */}
                  <p className="text-[11px] sm:text-xs text-stone-700 font-sans line-clamp-2 leading-relaxed mb-2.5 sm:mb-3">
                    {stamp.description}
                  </p>

                  {/* Bottom Action Footer */}
                  <div className="pt-2 border-t border-[#141414]/20 flex items-center justify-between">
                    <button
                      onClick={(e) => handleCopy(stamp, e)}
                      data-cursor="COPY"
                      title="Copy handle"
                      className="flex items-center space-x-1 text-[9px] sm:text-[10px] font-mono-retro font-bold text-stone-700 hover:text-[#D95D39] transition-colors p-1"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-600">COPIED!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>COPY</span>
                        </>
                      )}
                    </button>

                    <a
                      href={stamp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      data-cursor="VISIT"
                      className="flex items-center space-x-1 px-2 sm:px-2.5 py-1 bg-[#141414] text-[#F5F2ED] text-[9px] sm:text-[10px] font-mono-retro font-bold hover:bg-[#D95D39] transition-colors shadow-sm"
                    >
                      <span>VISIT</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Philatelic Inspection Modal */}
        <AnimatePresence>
          {selectedStamp && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#141414]/80 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-lg bg-[#FFFFFF] border-2 sm:border-4 border-[#141414] p-4 sm:p-8 shadow-[6px_6px_0px_#141414] sm:shadow-[12px_12px_0px_#141414] bg-halftone max-h-[90vh] overflow-y-auto"
              >
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  data-cursor="CLOSE"
                  className="absolute top-3 sm:top-4 right-3 sm:right-4 p-1.5 sm:p-2 bg-[#141414] text-[#F5F2ED] hover:bg-[#D95D39] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center space-x-2 text-[10px] sm:text-xs font-mono-retro font-bold text-[#D95D39] mb-2 pr-8">
                  <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="truncate">PHILATELIC ARCHIVE EXAMINATION</span>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4 border-b-2 border-[#141414] pb-3 sm:pb-4">
                  <div 
                    className="w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center text-[#F5F2ED] border-2 border-[#141414] shadow-md shrink-0"
                    style={{ backgroundColor: selectedStamp.color }}
                  >
                    {getIcon(selectedStamp.iconName)}
                  </div>
                  <div>
                    <h3 className="font-rozha text-2xl sm:text-3xl font-black text-[#141414] leading-none">
                      {selectedStamp.name}
                    </h3>
                    <p className="font-mono-retro text-xs sm:text-sm font-bold text-stone-600 mt-1">
                      {selectedStamp.handle}
                    </p>
                    <span className="inline-block mt-1 text-[9px] sm:text-[10px] font-mono-retro font-bold px-1.5 sm:px-2 py-0.5 bg-[#E6A92A] text-[#141414] border border-[#141414]">
                      DENOMINATION: {selectedStamp.denomination}
                    </span>
                  </div>
                </div>

                {/* Philatelic Specs */}
                <div className="mt-3 sm:mt-4 space-y-2.5 sm:space-y-3 font-mono-retro text-xs text-stone-800">
                  <p className="text-xs sm:text-sm font-sans text-stone-700 leading-relaxed">
                    {selectedStamp.description}
                  </p>

                  <div className="p-2.5 sm:p-3 bg-[#F5F2ED] border border-stone-300 space-y-1 text-[11px] sm:text-xs">
                    <div className="flex justify-between">
                      <span className="text-stone-500">POSTMARK ORIGIN:</span>
                      <strong>{selectedStamp.postmarkCity}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">ISSUE DATE:</span>
                      <strong>{selectedStamp.postmarkDate}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">DESTINATION URL:</span>
                      <span className="text-[#0E3D3C] font-bold truncate max-w-[160px] sm:max-w-[200px]">{selectedStamp.url}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:space-x-3">
                  <a
                    href={selectedStamp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 sm:py-3 bg-[#D95D39] text-[#F5F2ED] font-mono-retro font-bold text-xs uppercase tracking-wider border-2 border-[#141414] shadow-[3px_3px_0px_#141414] sm:shadow-[4px_4px_0px_#141414] hover:bg-[#C04C2A] text-center flex items-center justify-center space-x-2"
                  >
                    <span>OPEN OFFICIAL DISPATCH</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={(e) => handleCopy(selectedStamp, e)}
                    className="px-4 py-2.5 sm:py-3 bg-[#FFFFFF] text-[#141414] font-mono-retro font-bold text-xs uppercase tracking-wider border-2 border-[#141414] shadow-[3px_3px_0px_#141414] sm:shadow-[4px_4px_0px_#141414] hover:bg-[#F5F2ED] flex items-center justify-center space-x-1.5"
                  >
                    {copiedId === selectedStamp.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedId === selectedStamp.id ? 'COPIED' : 'COPY'}</span>
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
