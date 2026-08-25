import React, { useState, useEffect } from 'react';
import { ScreenEffectMode } from './types';
import { audio } from './utils/audio';
import { CustomCursor } from './components/CustomCursor';
import { NavigationTicker } from './components/NavigationTicker';
import { HeroSection } from './components/HeroSection';
import { VinylSleeveCard } from './components/VinylSleeveCard';
import { AboutEditorial } from './components/AboutEditorial';
import { SocialStamps } from './components/SocialStamps';
import { NowPlayingCassette } from './components/NowPlayingCassette';
import { CurrentlyCabinet } from './components/CurrentlyCabinet';
import { Guestbook } from './components/Guestbook';
import { EasterEggVault } from './components/EasterEggVault';
import { FooterSignoff } from './components/FooterSignoff';

export default function App() {
  const [screenMode, setScreenMode] = useState<ScreenEffectMode>('clean');
  const [isMuted, setIsMuted] = useState(false);
  const [isEasterEggOpen, setIsEasterEggOpen] = useState(false);
  const [konamiSequence, setKonamiSequence] = useState<string[]>([]);

  // Toggle Mute
  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    audio.setMuted(nextMuted);
    if (nextMuted) {
      audio.stopAmbient();
    }
  };

  // Scroll to section
  const handleScrollToSection = (id: string) => {
    audio.playClick(500);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Open Guestbook scroll
  const handleOpenGuestbook = () => {
    handleScrollToSection('guestbook');
  };

  // Konami Code sequence: ↑ ↑ ↓ ↓ ← → ← → b a
  useEffect(() => {
    const konamiTarget = [
      'ArrowUp',
      'ArrowUp',
      'ArrowDown',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'ArrowLeft',
      'ArrowRight',
      'b',
      'a',
    ];

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      setKonamiSequence((prev) => {
        const next = [...prev, key].slice(-10);
        if (next.join(',') === konamiTarget.join(',')) {
          audio.playStampThud();
          setIsEasterEggOpen(true);
          return [];
        }
        return next;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      className={`min-h-screen bg-[#F5F2ED] text-[#141414] transition-all relative border-[4px] sm:border-[10px] md:border-[16px] border-[#D95D39] bg-bold-canvas overflow-x-hidden ${
        screenMode === 'crt' ? 'crt-mode' : screenMode === 'riso' ? 'riso-mode' : ''
      }`}
    >
      {/* Tactile Noise Texture Overlay */}
      <div 
        className="fixed inset-0 opacity-[0.035] pointer-events-none z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Custom Retro Compass Cursor */}
      <CustomCursor />

      {/* Top Editorial Navigation Ticker */}
      <NavigationTicker
        screenMode={screenMode}
        onScreenModeChange={setScreenMode}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenEasterEgg={() => setIsEasterEggOpen(true)}
        onOpenGuestbook={handleOpenGuestbook}
      />

      <main className="relative z-10">
        {/* Hero Section */}
        <HeroSection
          onScrollToSection={handleScrollToSection}
          onOpenGuestbook={handleOpenGuestbook}
        />

        {/* 3D Vinyl Sleeve Showcase Section */}
        <section className="py-12 bg-[#F5F2ED] border-b-4 border-[#141414] relative bg-vintage-grid">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <VinylSleeveCard />
          </div>
        </section>

        {/* Section 01: About & Manifesto */}
        <AboutEditorial />

        {/* Section 02: Collectible Postage Stamps Social Grid */}
        <SocialStamps />

        {/* Section 03: 33⅓ RPM Turntable & Cassette Sound Deck */}
        <NowPlayingCassette />

        {/* Section 04: Currently & Curio Cabinet */}
        <CurrentlyCabinet />

        {/* Section 05: Visitors' Stamped Guestbook */}
        <Guestbook />
      </main>

      {/* Footer Colophon */}
      <FooterSignoff
        onOpenEasterEgg={() => setIsEasterEggOpen(true)}
        onOpenGuestbook={handleOpenGuestbook}
      />

      {/* Secret 1984 Beat Machine Easter Egg Modal */}
      <EasterEggVault
        isOpen={isEasterEggOpen}
        onClose={() => setIsEasterEggOpen(false)}
      />
    </div>
  );
}
