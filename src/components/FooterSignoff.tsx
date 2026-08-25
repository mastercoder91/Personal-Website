import React from 'react';
import { ArrowUp, Heart, Sparkles, Radio, Mail, Stamp } from 'lucide-react';
import { audio } from '../utils/audio';

interface FooterSignoffProps {
  onOpenEasterEgg: () => void;
  onOpenGuestbook: () => void;
}

export const FooterSignoff: React.FC<FooterSignoffProps> = ({ onOpenEasterEgg, onOpenGuestbook }) => {
  const scrollToTop = () => {
    audio.playClick(650);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#141414] text-[#F5F2ED] border-t-4 border-[#141414] pt-14 pb-12 relative overflow-hidden">
      {/* Halftone texture overlay */}
      <div className="absolute inset-0 bg-halftone opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b-2 border-stone-800 pb-12">
          {/* Col 1: Big Publication Colophon */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 bg-[#D95D39] text-[#F5F2ED] flex items-center justify-center font-rozha font-bold text-sm border border-[#F5F2ED]">
                आ
              </div>
              <span className="font-rozha text-2xl font-bold tracking-tight text-[#F5F2ED]">
                AARAV MATURKAR
              </span>
            </div>

            <p className="font-sans text-xs text-stone-300 leading-relaxed max-w-sm">
              A personal site conceived as a retro-elegant maximalist artifact. 
              Bridging modern computing systems with the tactile soul of 1980s editorial print and analog vinyl.
            </p>

            <div className="pt-2 flex items-center space-x-3 text-xs font-mono-retro">
              <a
                href="mailto:codemaster923@gmail.com"
                className="text-[#E6A92A] hover:text-[#F5F2ED] underline decoration-dashed flex items-center space-x-1 font-bold"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>codemaster923@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Dispatches */}
          <div className="md:col-span-4 space-y-2 font-mono-retro text-xs">
            <span className="text-[#E6A92A] font-bold tracking-widest uppercase block mb-3">
              TABLE OF DISPATCHES
            </span>
            <div className="space-y-1.5 text-stone-300">
              <div>
                <a href="#manifesto" className="hover:text-[#F5F2ED] transition-colors">
                  01. The Proclamation & Manifesto
                </a>
              </div>
              <div>
                <a href="#stamps" className="hover:text-[#F5F2ED] transition-colors">
                  02. Collectible Social Postage Stamps
                </a>
              </div>
              <div>
                <a href="#turntable" className="hover:text-[#F5F2ED] transition-colors">
                  03. 33⅓ RPM Turntable & Cassette Synth
                </a>
              </div>
              <div>
                <a href="#curiosities" className="hover:text-[#F5F2ED] transition-colors">
                  04. Curio Cabinet of Obsessions
                </a>
              </div>
              <div>
                <button
                  onClick={onOpenGuestbook}
                  className="hover:text-[#F5F2ED] transition-colors text-left"
                >
                  05. Stamped Guestbook Ledger
                </button>
              </div>
            </div>
          </div>

          {/* Col 3: Vintage Barcode & Back to Top */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end justify-between space-y-4">
            <button
              onClick={scrollToTop}
              data-cursor="ELEVATOR"
              className="px-4 py-2.5 bg-[#D95D39] text-[#F5F2ED] font-mono-retro font-bold text-xs uppercase tracking-wider border-2 border-[#F5F2ED] shadow-[3px_3px_0px_#000] hover:bg-[#C04C2A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center space-x-2"
            >
              <span>RETURN TO TOP</span>
              <ArrowUp className="w-4 h-4" />
            </button>

            {/* Vintage Barcode graphic */}
            <div className="bg-[#F5F2ED] text-[#141414] p-2.5 border-2 border-[#F5F2ED] text-center select-none shadow-[3px_3px_0px_#000]">
              <div className="font-mono-retro text-[8px] font-bold tracking-tighter flex items-center justify-center space-x-0.5">
                <span className="w-1 h-7 bg-black inline-block"></span>
                <span className="w-0.5 h-7 bg-black inline-block"></span>
                <span className="w-1.5 h-7 bg-black inline-block"></span>
                <span className="w-0.5 h-7 bg-black inline-block"></span>
                <span className="w-2 h-7 bg-black inline-block"></span>
                <span className="w-0.5 h-7 bg-black inline-block"></span>
                <span className="w-1 h-7 bg-black inline-block"></span>
                <span className="w-1.5 h-7 bg-black inline-block"></span>
                <span className="w-0.5 h-7 bg-black inline-block"></span>
                <span className="w-2 h-7 bg-black inline-block"></span>
                <span className="w-1 h-7 bg-black inline-block"></span>
              </div>
              <span className="font-mono-retro text-[7px] font-bold text-stone-700 block mt-1 tracking-widest">
                8 901234 567888
              </span>
            </div>
          </div>
        </div>

        {/* Colophon Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-400 font-mono-retro text-[10px]">
          <div>
            © {new Date().getFullYear()} AARAV MATURKAR · ALL RIGHTS RESERVED. PRINTED ON COTTON RAG PIXELS.
          </div>

          <div className="flex items-center space-x-3">
            <span>KONAMI CODE COMPATIBLE</span>
            <span>·</span>
            <button
              onClick={onOpenEasterEgg}
              className="text-[#E6A92A] hover:underline font-bold"
            >
              LAUNCH TAPE DECK
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
