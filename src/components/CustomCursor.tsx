import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

interface CustomCursorProps {
  cursorText?: string;
  isHovering?: boolean;
}

export const CustomCursor: React.FC<CustomCursorProps> = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const [isTouch, setIsTouch] = useState(false);

  // Smooth springs for cursor follow
  const cursorX = useSpring(-100, { stiffness: 600, damping: 35 });
  const cursorY = useSpring(-100, { stiffness: 600, damping: 35 });

  const trailerX = useSpring(-100, { stiffness: 180, damping: 25 });
  const trailerY = useSpring(-100, { stiffness: 180, damping: 25 });

  useEffect(() => {
    // Detect touch devices to disable custom cursor gracefully
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      trailerX.set(e.clientX);
      trailerY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check if target is interactive or has custom label
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactiveEl = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor]');
        if (interactiveEl) {
          setIsPointer(true);
          const customText = interactiveEl.getAttribute('data-cursor');
          setHoverLabel(customText);
        } else {
          setIsPointer(false);
          setHoverLabel(null);
        }
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, trailerX, trailerY, isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Retro Ring / Sunburst Trailer */}
      <motion.div
        style={{
          x: trailerX,
          y: trailerY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="fixed top-0 left-0 flex items-center justify-center pointer-events-none"
        animate={{
          scale: isPointer ? 1.6 : 1,
          opacity: isPointer ? 0.9 : 0.45,
          borderColor: isPointer ? '#D95D39' : '#E6A92A',
        }}
        transition={{ duration: 0.2 }}
      >
        <div className={`w-8 h-8 rounded-full border-2 border-dashed border-[#D95D39] transition-colors duration-200 ${
          isPointer ? 'bg-[#D95D39]/20' : 'bg-transparent'
        }`} />
      </motion.div>

      {/* Center Core Dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="fixed top-0 left-0 pointer-events-none flex items-center justify-center"
      >
        <div className={`w-2.5 h-2.5 rounded-full transition-transform duration-150 ${
          isPointer ? 'bg-[#D95D39] scale-125' : 'bg-[#141414]'
        }`} />

        {hoverLabel && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-0.5 bg-[#141414] text-[#F5F2ED] text-[10px] font-mono-retro font-bold tracking-wider shadow-lg border border-[#E6A92A]"
          >
            {hoverLabel}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
