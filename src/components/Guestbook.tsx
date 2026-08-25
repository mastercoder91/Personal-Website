import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  Feather, 
  Send, 
  Sparkles, 
  Stamp, 
  Sun, 
  Flower, 
  Crown, 
  Star, 
  Check, 
  Trash2,
  Clock,
  MapPin,
  MessageSquare
} from 'lucide-react';
import { INITIAL_GUESTBOOK } from '../data/portfolioData';
import { GuestbookEntry } from '../types';
import { audio } from '../utils/audio';

const STORAGE_KEY = 'aarav_portfolio_guestbook_v1';

export const Guestbook: React.FC = () => {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [author, setAuthor] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');
  const [sealColor, setSealColor] = useState('#C84B20');
  const [sealSymbol, setSealSymbol] = useState<'sun' | 'paisley' | 'lotus' | 'star' | 'crown'>('sun');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setEntries(JSON.parse(saved));
      } else {
        setEntries(INITIAL_GUESTBOOK);
      }
    } catch {
      setEntries(INITIAL_GUESTBOOK);
    }
  }, []);

  const saveEntries = (newEntries: GuestbookEntry[]) => {
    setEntries(newEntries);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newEntries));
    } catch {}
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !message.trim()) return;

    setIsSubmitting(true);
    audio.playStampThud();

    // Trigger celebratory confetti in retro palette
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#C84B20', '#E9A825', '#0D3B3A', '#FAF6EE']
      });
    } catch {}

    const newEntry: GuestbookEntry = {
      id: `note-${Date.now()}`,
      author: author.trim(),
      city: city.trim() || 'Planet Earth',
      message: message.trim(),
      timestamp: 'Just now',
      sealColor,
      sealSymbol
    };

    const updated = [newEntry, ...entries];
    saveEntries(updated);

    setAuthor('');
    setCity('');
    setMessage('');
    setIsSubmitting(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3500);
  };

  const getSymbolIcon = (symbol: string) => {
    switch (symbol) {
      case 'sun': return <Sun className="w-4 h-4" />;
      case 'lotus': return <Flower className="w-4 h-4" />;
      case 'crown': return <Crown className="w-4 h-4" />;
      case 'star': return <Star className="w-4 h-4" />;
      default: return <Sun className="w-4 h-4" />;
    }
  };

  return (
    <section id="guestbook" className="py-10 sm:py-16 md:py-24 border-b-2 sm:border-b-4 border-[#141414] bg-[#F5F2ED] relative">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 pb-4 sm:pb-6 border-b-2 sm:border-b-4 border-[#141414]">
          <div>
            <div className="flex items-center space-x-2 text-[10px] sm:text-xs font-mono-retro font-bold text-[#D95D39] uppercase tracking-widest">
              <span>SECTION 05</span>
              <span>—</span>
              <span>VISITORS' DISPATCH REGISTER</span>
            </div>
            <h2 className="font-rozha text-3xl sm:text-5xl md:text-6xl text-[#141414] font-black tracking-tight mt-1">
              THE VINTAGE GUESTBOOK
            </h2>
          </div>

          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#FFFFFF] border-2 border-[#141414] shadow-[2px_2px_0px_#141414] sm:shadow-[3px_3px_0px_#141414] text-[10px] sm:text-xs font-mono-retro font-bold text-[#D95D39]">
              <Stamp className="w-3.5 h-3.5" />
              <span>{entries.length} STAMPED ENTRIES</span>
            </span>
          </div>
        </div>

        {/* Two Columns: Typewriter Station (Left) & Stamped Ledger Board (Right) */}
        <div className="mt-6 sm:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left 5 Cols: Typewriter Dispatch Terminal */}
          <div className="lg:col-span-5 bg-[#FFFFFF] border-2 sm:border-4 border-[#141414] p-4 sm:p-7 shadow-[4px_4px_0px_#141414] sm:shadow-[8px_8px_0px_#141414]">
            <div className="flex items-center justify-between border-b-2 border-[#141414] pb-2.5 sm:pb-3 mb-3 sm:mb-4">
              <div className="flex items-center space-x-2">
                <Feather className="w-4 h-4 sm:w-5 sm:h-5 text-[#D95D39]" />
                <h3 className="font-rozha text-lg sm:text-xl font-bold text-[#141414]">
                  STAMP YOUR IMPRINT
                </h3>
              </div>
              <span className="text-[9px] sm:text-[10px] font-mono-retro font-bold text-stone-500 uppercase truncate">
                GODREJ 1984
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 font-mono-retro text-xs">
              <div>
                <label className="block text-stone-700 font-bold uppercase mb-1 text-[11px] sm:text-xs">
                  YOUR NAME / DISPATCH CODENAME:
                </label>
                <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Vikram Chandra or @curator"
                  className="w-full px-3 py-2 bg-[#F5F2ED] border-2 border-[#141414] shadow-[2px_2px_0px_#141414] focus:outline-none focus:bg-white text-stone-900 font-medium text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold uppercase mb-1 text-[11px] sm:text-xs">
                  CITY OF DISPATCH:
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Nagpur, Kyoto, London..."
                  className="w-full px-3 py-2 bg-[#F5F2ED] border-2 border-[#141414] shadow-[2px_2px_0px_#141414] focus:outline-none focus:bg-white text-stone-900 font-medium text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold uppercase mb-1 text-[11px] sm:text-xs">
                  MESSAGE / GREETING (MAX 240 CHARS):
                </label>
                <textarea
                  required
                  rows={3}
                  maxLength={240}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Leave a note, a record recommendation, or a word on typography..."
                  className="w-full px-3 py-2 bg-[#F5F2ED] border-2 border-[#141414] shadow-[2px_2px_0px_#141414] focus:outline-none focus:bg-white text-stone-900 font-medium font-sans resize-none text-xs sm:text-sm"
                />
              </div>

              {/* Wax Seal Selector */}
              <div className="pt-2 border-t border-stone-200">
                <label className="block text-stone-700 font-bold uppercase mb-1.5 text-[10px] sm:text-xs">
                  CUSTOMIZE WAX SEAL EMBLEM & WAX:
                </label>
                
                {/* Wax Color Picker */}
                <div className="flex items-center flex-wrap gap-2 mb-2.5">
                  <span className="text-[9px] sm:text-[10px] text-stone-500 uppercase font-bold mr-1">WAX:</span>
                  {[
                    { color: '#D95D39', label: 'Terracotta' },
                    { color: '#0E3D3C', label: 'Teal' },
                    { color: '#E6A92A', label: 'Gold' },
                    { color: '#8A252C', label: 'Burgundy' },
                    { color: '#141414', label: 'Black' }
                  ].map((c) => (
                    <button
                      key={c.color}
                      type="button"
                      onClick={() => {
                        audio.playClick(500);
                        setSealColor(c.color);
                      }}
                      className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-[#141414] transition-transform ${
                        sealColor === c.color ? 'scale-125 ring-2 ring-black' : 'hover:scale-110'
                      }`}
                      style={{ backgroundColor: c.color }}
                      title={c.label}
                    />
                  ))}
                </div>

                {/* Seal Symbol Picker */}
                <div className="flex items-center flex-wrap gap-1.5">
                  <span className="text-[9px] sm:text-[10px] text-stone-500 uppercase font-bold mr-1">CREST:</span>
                  {[
                    { id: 'sun', icon: Sun, label: 'Sun' },
                    { id: 'lotus', icon: Flower, label: 'Lotus' },
                    { id: 'crown', icon: Crown, label: 'Crown' },
                    { id: 'star', icon: Star, label: 'Star' }
                  ].map((s) => {
                    const Icon = s.icon;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => {
                          audio.playClick(560);
                          setSealSymbol(s.id as unknown as 'sun');
                        }}
                        className={`px-2 py-1 border-2 border-[#141414] transition-all flex items-center space-x-1 ${
                          sealSymbol === s.id
                            ? 'bg-[#141414] text-[#F5F2ED]'
                            : 'bg-[#F5F2ED] text-[#141414] hover:bg-[#FFFFFF]'
                        }`}
                      >
                        <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        <span className="text-[8px] sm:text-[9px] uppercase font-bold">{s.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                data-cursor="PRESS SEAL"
                className="w-full py-2.5 sm:py-3 bg-[#D95D39] text-[#F5F2ED] font-mono-retro font-bold text-xs uppercase tracking-wider border-2 border-[#141414] shadow-[3px_3px_0px_#141414] sm:shadow-[4px_4px_0px_#141414] hover:bg-[#C04C2A] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center justify-center space-x-2 mt-3 sm:mt-4"
              >
                <Stamp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>APPLY WAX SEAL & STAMP NOTE</span>
              </button>

              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-2 sm:p-2.5 bg-emerald-100 border border-emerald-400 text-emerald-900 rounded text-center font-bold text-xs"
                >
                  ✓ Note inscribed and wax-sealed successfully!
                </motion.div>
              )}
            </form>
          </div>

          {/* Right 7 Cols: Stamped Bulletin Board Ledger */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono-retro text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#0E3D3C]">
                RECENT VISITOR DISPATCHES
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono-retro text-stone-500 font-bold">
                SCROLLABLE BULLETIN LEDGER
              </span>
            </div>

            <div className="max-h-[460px] sm:max-h-[520px] overflow-y-auto pr-1 sm:pr-2 space-y-3 sm:space-y-4">
              <AnimatePresence>
                {entries.map((entry) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-3.5 sm:p-5 border-2 border-[#141414] bg-[#FFFFFF] shadow-[3px_3px_0px_#141414] sm:shadow-[4px_4px_0px_#141414] relative overflow-hidden"
                  >
                    {/* Embossed Wax Seal in top-right */}
                    <div
                      className="absolute top-3 sm:top-4 right-3 sm:right-4 w-8 sm:w-10 h-8 sm:h-10 rounded-full border-2 border-[#141414] shadow-md flex items-center justify-center text-[#F5F2ED] rotate-12"
                      style={{ backgroundColor: entry.sealColor }}
                      title="Embossed Wax Seal"
                    >
                      {getSymbolIcon(entry.sealSymbol)}
                    </div>

                    <div className="flex items-center space-x-2 sm:space-x-3 text-xs font-mono-retro text-stone-600 mb-1.5 sm:mb-2 pr-10">
                      <div className="font-rozha text-base sm:text-lg font-bold text-[#141414] truncate">
                        {entry.author}
                      </div>
                      <span className="text-stone-400">·</span>
                      <span className="flex items-center space-x-1 text-[#0E3D3C] font-bold shrink-0">
                        <MapPin className="w-3 h-3" />
                        <span>{entry.city}</span>
                      </span>
                    </div>

                    <p className="font-sans text-xs sm:text-sm text-stone-800 leading-relaxed max-w-[85%]">
                      "{entry.message}"
                    </p>

                    <div className="mt-2.5 sm:mt-3 pt-1.5 sm:pt-2 border-t border-stone-200 flex items-center justify-between text-[8px] sm:text-[9px] font-mono-retro text-stone-400 font-bold">
                      <span>STAMP VERIFIED</span>
                      <span>{entry.timestamp}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
