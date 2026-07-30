import React from 'react';
import { motion } from 'motion/react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
  animateOnHover?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showTagline = true,
  className = '',
}) => {
  const dimensions = {
    sm: { icon: 'w-8 h-8', text: 'text-base', tagline: 'text-[8px]', gap: 'gap-2.5', viewBox: 40 },
    md: { icon: 'w-10 h-10', text: 'text-lg', tagline: 'text-[9px]', gap: 'gap-3', viewBox: 40 },
    lg: { icon: 'w-14 h-14', text: 'text-2xl', tagline: 'text-[11px]', gap: 'gap-4', viewBox: 40 },
  }[size];

  return (
    <div className={`flex items-center ${dimensions.gap} ${className} group cursor-pointer select-none`}>
      {/* Animated Architectonic Emblem Container */}
      <div className={`relative ${dimensions.icon} flex items-center justify-center shrink-0`}>
        
        {/* Pulsing Ambient Backlight */}
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.35, 0.7, 0.35],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-full bg-gradient-to-r from-[#E58A2B]/40 via-amber-300/30 to-[#38BDF8]/20 blur-md pointer-events-none"
        />

        {/* Rotating Outer Geometric Ring Accent */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -inset-1 rounded-full border border-dashed border-[#E58A2B]/30 opacity-70 group-hover:border-[#E58A2B] group-hover:scale-110 transition-all duration-500"
        />

        {/* Main Vector Emblem */}
        <motion.svg
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          whileHover={{ scale: 1.08, rotate: 6 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="w-full h-full relative z-10 filter drop-shadow-[0_2px_10px_rgba(229,138,43,0.3)]"
        >
          {/* Outer Triangle Architectural Facet */}
          <polygon
            points="22,4 40,35 4,35"
            fill="none"
            stroke="url(#trinity-stroke-grad)"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />

          {/* Trinity Interlocking Primary Pillar (Left Peak) */}
          <path
            d="M22 6L36 32H29L22 17L15 32H8L22 6Z"
            fill="url(#trinity-facet-gold)"
          />

          {/* Trinity Interlocking Secondary Wing (Right Accent) */}
          <path
            d="M38 33.5L24 22L27 17L41 28L38 33.5Z"
            fill="url(#trinity-facet-cyan)"
            opacity="0.9"
          />

          {/* Central Animated Luminous Pearl Sphere */}
          <circle
            cx="22"
            cy="24"
            r="4"
            fill="#FFFFFF"
            className="drop-shadow-[0_0_10px_rgba(255,255,255,1)]"
          />
          <circle
            cx="22"
            cy="24"
            r="2"
            fill="#E58A2B"
          />

          {/* Radial Pearl Pulse Wave */}
          <motion.circle
            cx="22"
            cy="24"
            r="7"
            fill="none"
            stroke="#E58A2B"
            strokeWidth="1"
            animate={{
              r: [4, 9, 4],
              opacity: [0.8, 0, 0.8],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />

          {/* Gradients */}
          <defs>
            <linearGradient id="trinity-stroke-grad" x1="4" y1="4" x2="40" y2="35" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#E58A2B" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.6" />
            </linearGradient>

            <linearGradient id="trinity-facet-gold" x1="22" y1="6" x2="22" y2="32" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFF2D6" />
              <stop offset="50%" stopColor="#E58A2B" />
              <stop offset="100%" stopColor="#A8570B" />
            </linearGradient>

            <linearGradient id="trinity-facet-cyan" x1="24" y1="17" x2="41" y2="33" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#E58A2B" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>

      {/* Brand Typography with Animated Hover Accent */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1">
          <span className={`font-display font-black tracking-[0.22em] uppercase text-white ${dimensions.text} transition-all duration-300 group-hover:tracking-[0.25em]`}>
            PEARL{' '}
            <span className="font-light italic bg-gradient-to-r from-[#E58A2B] via-amber-200 to-[#E58A2B] bg-clip-text text-transparent group-hover:from-white group-hover:to-[#E58A2B] transition-colors">
              TRINITY
            </span>
          </span>
        </div>

        {showTagline && (
          <div className="flex items-center gap-1.5 mt-1 overflow-hidden">
            <span className={`font-mono-tech uppercase tracking-widest text-slate-400 group-hover:text-amber-300 transition-colors ${dimensions.tagline}`}>
              Digital Solutions & Architecture
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E58A2B] animate-pulse"></span>
          </div>
        )}
      </div>
    </div>
  );
};
