import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Disc, 
  Radio, 
  Sparkles, 
  Sliders,
  Music,
  Headphones
} from 'lucide-react';
import { VINYL_TRACKS } from '../data/portfolioData';
import { TrackItem } from '../types';
import { audio } from '../utils/audio';

export const NowPlayingCassette: React.FC = () => {
  const [deckMode, setDeckMode] = useState<'vinyl' | 'cassette'>('vinyl');
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [eqBars, setEqBars] = useState<number[]>([40, 75, 55, 90, 65, 80, 45]);

  const currentTrack: TrackItem = VINYL_TRACKS[currentTrackIndex];

  // Animate fake VU meter bars when playing
  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setEqBars([
          Math.floor(Math.random() * 60) + 30,
          Math.floor(Math.random() * 80) + 20,
          Math.floor(Math.random() * 70) + 30,
          Math.floor(Math.random() * 95) + 15,
          Math.floor(Math.random() * 85) + 20,
          Math.floor(Math.random() * 75) + 25,
          Math.floor(Math.random() * 65) + 30,
        ]);
      }, 180);
    } else {
      setEqBars([10, 15, 10, 20, 15, 10, 15]);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    audio.playClick(520);
    if (isPlaying) {
      audio.stopAmbient();
      setIsPlaying(false);
    } else {
      audio.playVinylScratch();
      // Start ambient chord progression for the selected track
      const chordChords = [
        currentTrack.frequencies,
        currentTrack.frequencies.map(f => f * 1.12),
        currentTrack.frequencies.map(f => f * 0.9),
        currentTrack.frequencies
      ];
      audio.startAmbientTrack(chordChords);
      setIsPlaying(true);
    }
  };

  const handleNextTrack = () => {
    audio.playVinylScratch();
    const nextIdx = (currentTrackIndex + 1) % VINYL_TRACKS.length;
    setCurrentTrackIndex(nextIdx);
    if (isPlaying) {
      const nextTrack = VINYL_TRACKS[nextIdx];
      const chordChords = [
        nextTrack.frequencies,
        nextTrack.frequencies.map(f => f * 1.12),
        nextTrack.frequencies.map(f => f * 0.9),
        nextTrack.frequencies
      ];
      audio.startAmbientTrack(chordChords);
    }
  };

  const switchMode = (mode: 'vinyl' | 'cassette') => {
    audio.playClick(600);
    setDeckMode(mode);
  };

  return (
    <section id="turntable" className="py-10 sm:py-16 md:py-24 border-b-2 sm:border-b-4 border-[#141414] bg-[#F5F2ED] relative">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 pb-4 sm:pb-6 border-b-2 sm:border-b-4 border-[#141414]">
          <div>
            <div className="flex items-center space-x-2 text-[10px] sm:text-xs font-mono-retro font-bold text-[#D95D39] uppercase tracking-widest">
              <span>SECTION 03</span>
              <span>—</span>
              <span>ANALOG SOUND ENGINE</span>
            </div>
            <h2 className="font-rozha text-3xl sm:text-5xl md:text-6xl text-[#141414] font-black tracking-tight mt-1">
              TURNTABLE & CASSETTE DECK
            </h2>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => switchMode('vinyl')}
              data-cursor="VINYL"
              className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[10px] sm:text-xs font-mono-retro font-bold border-2 border-[#141414] shadow-[2px_2px_0px_#141414] sm:shadow-[3px_3px_0px_#141414] transition-all ${
                deckMode === 'vinyl'
                  ? 'bg-[#D95D39] text-[#F5F2ED]'
                  : 'bg-[#FFFFFF] text-[#141414] hover:bg-[#F5F2ED]'
              }`}
            >
              33⅓ RPM TURNTABLE
            </button>
            <button
              onClick={() => switchMode('cassette')}
              data-cursor="CASSETTE"
              className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[10px] sm:text-xs font-mono-retro font-bold border-2 border-[#141414] shadow-[2px_2px_0px_#141414] sm:shadow-[3px_3px_0px_#141414] transition-all ${
                deckMode === 'cassette'
                  ? 'bg-[#0E3D3C] text-[#F5F2ED]'
                  : 'bg-[#FFFFFF] text-[#141414] hover:bg-[#F5F2ED]'
              }`}
            >
              CASSETTE TAPE
            </button>
          </div>
        </div>

        {/* Player Container */}
        <div className="mt-6 sm:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center bg-[#FFFFFF] border-2 sm:border-4 border-[#141414] p-3 sm:p-6 md:p-8 shadow-[4px_4px_0px_#141414] sm:shadow-[8px_8px_0px_#141414]">
          {/* Visual Deck Stage (Left 7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center p-3 sm:p-6 bg-[#141414] border-2 border-[#141414] text-[#F5F2ED] relative overflow-hidden min-h-[320px] sm:min-h-[380px]">
            {/* Top Deck Label Plate */}
            <div className="absolute top-2 sm:top-4 left-3 sm:left-6 right-3 sm:right-6 flex items-center justify-between font-mono-retro text-[8px] sm:text-[10px] text-stone-400 border-b border-stone-800 pb-1.5 sm:pb-2">
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#E6A92A] animate-pulse"></span>
                <span className="text-[#F5F2ED] font-bold">HMV STEREO 84</span>
              </div>
              <span className="text-[#E6A92A] truncate">WEB AUDIO SYNTH READY</span>
            </div>

            {deckMode === 'vinyl' ? (
              /* Vinyl Turntable Visual */
              <div className="relative my-6 sm:my-8 flex items-center justify-center">
                {/* Turntable Platter */}
                <div className="w-52 min-[360px]:w-56 sm:w-72 h-52 min-[360px]:h-56 sm:h-72 rounded-full bg-[#2A2624] border-2 sm:border-4 border-[#3D3734] shadow-2xl flex items-center justify-center relative">
                  {/* Spinning Vinyl Record */}
                  <div
                    className={`w-44 min-[360px]:w-48 sm:w-64 h-44 min-[360px]:h-48 sm:h-64 rounded-full bg-[#111111] border sm:border-2 border-[#1E1E1E] shadow-inner flex items-center justify-center ${
                      isPlaying ? 'animate-spin-slow' : 'animate-spin-slow-paused'
                    }`}
                    style={{
                      backgroundImage: `repeating-radial-gradient(circle at center, #111 0, #111 2px, #1a1a1a 3px, #111 4px)`,
                    }}
                  >
                    {/* Vinyl Center Label */}
                    <div
                      className="w-16 min-[360px]:w-18 sm:w-24 h-16 min-[360px]:h-18 sm:h-24 rounded-full flex flex-col items-center justify-center text-center p-0.5 sm:p-1 border border-[#E6A92A]"
                      style={{ backgroundColor: currentTrack.color }}
                    >
                      <span className="text-[5px] sm:text-[6px] font-mono-retro font-bold text-white uppercase">AARAV SOUND</span>
                      <span className="font-rozha text-[8px] min-[360px]:text-[9px] sm:text-[10px] text-white font-bold leading-none my-0.5 truncate max-w-[50px] sm:max-w-none">{currentTrack.title}</span>
                      <span className="text-[5px] sm:text-[6px] font-mono-retro text-[#E6A92A]">33⅓ RPM</span>
                    </div>
                  </div>

                  {/* Tonearm & Needle */}
                  <motion.div
                    animate={{
                      rotate: isPlaying ? 28 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                    style={{ transformOrigin: 'top right' }}
                    className="absolute -top-3 -right-3 w-10 sm:w-12 h-28 sm:h-36 pointer-events-none z-20"
                  >
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-stone-400 border-2 border-stone-600 shadow-md ml-auto" />
                    <div className="w-1 sm:w-1.5 h-20 sm:h-28 bg-stone-300 ml-auto mr-2 sm:mr-2.5 rounded shadow" />
                    <div className="w-2.5 sm:w-3 h-4 sm:h-5 bg-[#D95D39] ml-auto mr-1.5 rounded-none border border-black shadow" />
                  </motion.div>
                </div>
              </div>
            ) : (
              /* Cassette Tape Visual */
              <div className="relative my-6 sm:my-8 w-52 min-[360px]:w-64 sm:w-80 h-34 min-[360px]:h-40 sm:h-48 bg-[#2A2624] border-2 sm:border-4 border-[#3D3734] shadow-2xl p-2.5 sm:p-4 flex flex-col justify-between">
                {/* Cassette Label Strip */}
                <div
                  className="p-1.5 sm:p-2 flex items-center justify-between text-[#F5F2ED]"
                  style={{ backgroundColor: currentTrack.color }}
                >
                  <span className="font-mono-retro text-[7px] sm:text-[9px] font-bold uppercase">SIDE A</span>
                  <span className="font-rozha text-[10px] sm:text-xs font-bold truncate max-w-[120px]">{currentTrack.title}</span>
                  <span className="font-mono-retro text-[7px] sm:text-[9px]">C-60</span>
                </div>

                {/* Cassette Tape Window with Reels */}
                <div className="h-12 sm:h-16 bg-[#111] border border-stone-700 flex items-center justify-around px-3 sm:px-4 relative">
                  {/* Left Reel */}
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white/20 flex items-center justify-center ${
                      isPlaying ? 'animate-spin' : ''
                    }`}
                  >
                    <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white/40 border border-white" />
                  </div>

                  {/* Tape connecting strip */}
                  <div className="w-10 sm:w-16 h-1 bg-[#4A2E18]" />

                  {/* Right Reel */}
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white/20 flex items-center justify-center ${
                      isPlaying ? 'animate-spin' : ''
                    }`}
                  >
                    <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white/40 border border-white" />
                  </div>
                </div>

                <div className="text-center font-mono-retro text-[7px] sm:text-[8px] text-stone-500 uppercase tracking-widest">
                  DOLBY SYSTEM · CHROME DIOXIDE
                </div>
              </div>
            )}

            {/* Bottom VU Meter Equalizer */}
            <div className="w-full flex items-center justify-between pt-2 sm:pt-3 border-t border-stone-800">
              <div className="flex items-center space-x-1 sm:space-x-1.5">
                <span className="text-[8px] sm:text-[9px] font-mono-retro text-stone-400 font-bold">VU:</span>
                <div className="flex items-end space-x-0.5 sm:space-x-1 h-4 sm:h-5">
                  {eqBars.map((height, i) => (
                    <div
                      key={i}
                      style={{ height: `${height}%` }}
                      className={`w-1 sm:w-1.5 transition-all duration-150 ${
                        height > 75 ? 'bg-[#D95D39]' : height > 50 ? 'bg-[#E6A92A]' : 'bg-[#0E3D3C]'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="text-[8px] sm:text-[10px] font-mono-retro text-[#E6A92A] font-bold">
                {isPlaying ? '● LIVE' : '○ STANDBY'}
              </div>
            </div>
          </div>

          {/* Track Details & Mechanical Controls (Right 5 Cols) */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <div>
              <span className="px-2 py-0.5 bg-[#E6A92A]/30 text-[#141414] border border-[#141414] text-[9px] sm:text-[10px] font-mono-retro font-bold uppercase">
                TRACK {currentTrackIndex + 1} OF {VINYL_TRACKS.length}
              </span>
              <h3 className="font-rozha text-2xl sm:text-3xl font-black text-[#141414] leading-tight mt-1.5 sm:mt-2">
                {currentTrack.title}
              </h3>
              <p className="font-mono-retro text-xs font-bold text-[#0E3D3C]">
                {currentTrack.artist} · ({currentTrack.year})
              </p>
            </div>

            <p className="text-xs sm:text-sm font-sans text-stone-700 leading-relaxed bg-[#F5F2ED] p-2.5 sm:p-3 border border-stone-300">
              {currentTrack.description}
            </p>

            {/* Big Tactile Transport Buttons */}
            <div className="flex items-center space-x-2.5 sm:space-x-3">
              <button
                onClick={togglePlay}
                data-cursor={isPlaying ? "PAUSE" : "PLAY"}
                className={`flex-1 py-2.5 sm:py-3 px-3 sm:px-4 font-mono-retro font-bold text-xs sm:text-sm uppercase tracking-wider border-2 border-[#141414] shadow-[3px_3px_0px_#141414] sm:shadow-[4px_4px_0px_#141414] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center justify-center space-x-1.5 sm:space-x-2 ${
                  isPlaying
                    ? 'bg-[#D95D39] text-[#F5F2ED]'
                    : 'bg-[#E6A92A] text-[#141414] hover:bg-[#D4981C]'
                }`}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" /> : <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />}
                <span>{isPlaying ? 'PAUSE SYNTH' : 'ENGAGE PLAYBACK'}</span>
              </button>

              <button
                onClick={handleNextTrack}
                data-cursor="NEXT TRACK"
                className="p-2.5 sm:p-3 bg-[#FFFFFF] text-[#141414] border-2 border-[#141414] shadow-[3px_3px_0px_#141414] sm:shadow-[4px_4px_0px_#141414] hover:bg-[#F5F2ED] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all shrink-0"
                title="Next Track"
              >
                <SkipForward className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Track Selection Pill Badges */}
            <div className="space-y-1.5">
              <span className="text-[9px] sm:text-[10px] font-mono-retro text-stone-500 uppercase font-bold">
                PRESSINGS IN ARCHIVE:
              </span>
              <div className="space-y-1">
                {VINYL_TRACKS.map((track, idx) => (
                  <button
                    key={track.id}
                    onClick={() => {
                      audio.playClick(450);
                      setCurrentTrackIndex(idx);
                      if (isPlaying) {
                        const chordChords = [
                          track.frequencies,
                          track.frequencies.map(f => f * 1.12),
                          track.frequencies.map(f => f * 0.9),
                          track.frequencies
                        ];
                        audio.startAmbientTrack(chordChords);
                      }
                    }}
                    className={`w-full text-left px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs font-mono-retro flex items-center justify-between border-2 transition-all ${
                      currentTrackIndex === idx
                        ? 'bg-[#141414] text-[#F5F2ED] border-[#141414] font-bold'
                        : 'bg-[#F5F2ED] text-[#141414] border-stone-300 hover:bg-[#FFFFFF]'
                    }`}
                  >
                    <span className="truncate pr-2">0{idx + 1}. {track.title}</span>
                    <span className="text-[9px] sm:text-[10px] text-[#E6A92A] font-bold shrink-0">{track.genre}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
