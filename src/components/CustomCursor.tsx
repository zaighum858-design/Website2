import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Smooth elastic spring position tracking
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  const dotX = useSpring(-100, { damping: 45, stiffness: 800 });
  const dotY = useSpring(-100, { damping: 45, stiffness: 800 });

  useEffect(() => {
    // Only enable on desktop screens
    if (window.innerWidth < 1024) return;

    document.body.classList.add('has-custom-cursor');

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const clickable = target.closest('a, button, input, textarea, select, [role="button"], .interactive-hover');
      const customHoverText = target.getAttribute('data-cursor-text') || clickable?.getAttribute('data-cursor-text');

      if (clickable) {
        setIsHovered(true);
        if (customHoverText) {
          setHoverText(customHoverText);
        } else {
          setHoverText(null);
        }
      } else {
        setIsHovered(false);
        setHoverText(null);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, dotX, dotY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Magnetic Elastic Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference hidden lg:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            width: isHovered ? (hoverText ? 85 : 55) : 32,
            height: isHovered ? (hoverText ? 85 : 55) : 32,
            borderColor: isHovered ? 'rgba(212, 175, 55, 0.9)' : 'rgba(212, 175, 55, 0.5)',
            backgroundColor: isHovered ? 'rgba(212, 175, 55, 0.08)' : 'rgba(0, 0, 0, 0)',
            boxShadow: isHovered
              ? '0 0 25px rgba(212, 175, 55, 0.4), inset 0 0 10px rgba(0, 240, 255, 0.2)'
              : '0 0 12px rgba(212, 175, 55, 0.2)',
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="rounded-full border flex items-center justify-center backdrop-blur-[1px]"
        >
          {hoverText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-[9px] uppercase tracking-widest font-mono-tech text-[#D4AF37] font-semibold text-center leading-none px-1"
            >
              {hoverText}
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* Central Precision Glowing Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 hidden lg:block"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            scale: isHovered ? 0 : 1,
            opacity: isHovered ? 0 : 1,
          }}
          className="w-2 h-2 bg-[#D4AF37] rounded-full shadow-[0_0_8px_#D4AF37]"
        />
      </motion.div>
    </>
  );
};
