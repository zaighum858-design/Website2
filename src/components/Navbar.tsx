import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Sparkles, Menu, X, Globe, ArrowUpRight } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/agencyData';
import { audioSynth } from '../utils/audio';
import { Logo } from './Logo';

interface NavbarProps {
  onOpenConsultModal: () => void;
  particleDensity: 'high' | 'medium' | 'low';
  setParticleDensity: (density: 'high' | 'medium' | 'low') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenConsultModal,
  particleDensity,
  setParticleDensity,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [klTime, setKlTime] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);

    // Update Live KL Time
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kuala_Lumpur',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setKlTime(now.toLocaleTimeString('en-US', options) + ' MYT');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const toggleAudio = () => {
    const muted = audioSynth.toggleMute();
    setIsAudioMuted(muted);
  };

  const navLinks = [
    { name: 'Showcase', href: '#portfolio' },
    { name: 'Solutions', href: '#solutions' },
    { name: 'Approach', href: '#approach' },
    { name: 'Narrative', href: '#narrative' },
    { name: 'Industries', href: '#industries' },
    { name: 'Contact', href: '#contact' },
  ];

  const cycleParticles = () => {
    audioSynth.playHover();
    if (particleDensity === 'medium') setParticleDensity('high');
    else if (particleDensity === 'high') setParticleDensity('low');
    else setParticleDensity('medium');
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-[#060608]/90 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.85)]'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo - Architek Style */}
        <a
          href="#"
          className="group flex items-center gap-3 cursor-pointer"
          onMouseEnter={() => audioSynth.playHover()}
          data-cursor-text="PEARL"
        >
          <Logo size="md" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-9">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs uppercase tracking-[0.22em] text-gray-200 hover:text-[#E58A2B] transition-colors font-mono-tech relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#E58A2B] hover:after:w-full after:transition-all after:duration-300 font-semibold"
              onMouseEnter={() => audioSynth.playHover()}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Tools & CTA & Language Switcher from Reference */}
        <div className="hidden lg:flex items-center gap-5">
          {/* Reference Image Language Indicator */}
          <div className="flex items-center gap-1.5 text-xs font-mono-tech text-gray-400 border-r border-white/10 pr-4">
            <span className="text-white font-semibold cursor-pointer hover:text-[#E58A2B]">EN</span>
            <span>/</span>
            <span className="hover:text-white cursor-pointer transition-colors">ES</span>
            <span>/</span>
            <span className="hover:text-white cursor-pointer transition-colors">FR</span>
          </div>

          {/* Live Time Badge */}
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#121216] border border-white/10 text-[10px] text-slate-300 font-mono-tech">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E58A2B] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#E58A2B]"></span>
            </span>
            <Globe className="w-3 h-3 text-[#E58A2B]" />
            <span>{klTime}</span>
          </div>

          {/* Particle Density Toggle */}
          <button
            onClick={cycleParticles}
            className="p-2 rounded-full bg-[#121216] border border-white/10 text-gray-400 hover:text-[#E58A2B] hover:border-[#E58A2B]/40 transition-all cursor-pointer"
            title={`Particles: ${particleDensity.toUpperCase()}`}
            onMouseEnter={() => audioSynth.playHover()}
            data-cursor-text="PARTICLES"
          >
            <Sparkles className="w-4 h-4" />
          </button>

          {/* Audio Synthesizer Mute Toggle */}
          <button
            onClick={toggleAudio}
            className={`p-2 rounded-md bg-[#121216] border transition-all cursor-pointer ${
              !isAudioMuted
                ? 'border-[#E58A2B] text-[#E58A2B] shadow-[0_0_12px_rgba(229,138,43,0.3)]'
                : 'border-white/10 text-slate-400 hover:text-white'
            }`}
            title={isAudioMuted ? 'Unmute Audio FX' : 'Mute Audio FX'}
            onMouseEnter={() => audioSynth.playHover()}
            data-cursor-text="AUDIO"
          >
            {!isAudioMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Initiate Consult CTA - Reference Outline Pill Button */}
          <button
            onClick={() => {
              audioSynth.playChime(880, 0.2);
              onOpenConsultModal();
            }}
            onMouseEnter={() => audioSynth.playHover()}
            data-cursor-text="CONSULT"
            className="btn-architek-outline text-xs tracking-wider uppercase font-medium py-2 px-4 border-white/40 hover:border-white"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              Explore Consult
              <ArrowUpRight className="w-3.5 h-3.5 text-white" />
            </span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={toggleAudio}
            className="p-2 rounded-full bg-[#121212] border border-white/10 text-gray-400"
          >
            {!isAudioMuted ? <Volume2 className="w-4 h-4 text-[#D4AF37]" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-300 hover:text-[#D4AF37] focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0A0A0A]/95 border-b border-[#D4AF37]/20 backdrop-blur-2xl px-6 py-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-mono-tech uppercase tracking-widest text-gray-200 hover:text-[#D4AF37] transition-colors py-2 border-b border-white/5"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2 flex items-center justify-between text-xs font-mono-tech text-gray-400">
                <span>Location: {COMPANY_DETAILS.location}</span>
                <span className="text-[#D4AF37]">{klTime}</span>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultModal();
                }}
                className="mt-4 w-full py-3 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#A38025] text-black font-semibold uppercase text-xs tracking-widest rounded-sm text-center"
              >
                Initiate Consult
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
