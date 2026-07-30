import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Sparkles, ShieldCheck, ArrowRight, Layers, Eye, Code, Cpu, Activity, X } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/agencyData';
import { audioSynth } from '../utils/audio';

interface HeroSectionProps {
  onOpenConsultModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenConsultModal }) => {
  const [activeMediaTab, setActiveMediaTab] = useState<'video' | 'obsidian' | 'cyber'>('video');
  const [isPlayingReel, setIsPlayingReel] = useState(false);

  return (
    <section className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center overflow-hidden z-10">
      {/* Glow Orbs in background */}
      <div className="bg-glow-orb-gold top-1/4 -left-48 animate-gold-pulse" />
      <div className="bg-glow-orb-cyan bottom-10 -right-48" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content - Reference Image Architectural Layout */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            {/* Slide Index & Category (Reference: 01   Architecture) */}
            <div className="flex items-center gap-6 mb-8">
              <span className="font-mono-tech text-base font-bold text-slate-400 tracking-wider">01</span>
              <span className="font-sans text-sm font-semibold tracking-wide text-amber-400 uppercase">
                Enterprise Architecture
              </span>
            </div>

            {/* Main Headline (Reference: Industrial Home Style Crisp Architectural Title) */}
            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-extrabold text-white leading-[1.02] tracking-tight mb-8">
              Digital <br />
              <span className="text-white">Architecture</span>
            </h1>

            {/* Subtitle Narrative */}
            <p className="font-sans text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed mb-10">
              {COMPANY_DETAILS.subtitle} Engineering custom software, AI automation pipelines, and high-availability cloud architectures.
            </p>

            {/* Reference Style Outline Button ("Explore Project") */}
            <div className="flex flex-wrap items-center gap-5 mb-8">
              <a
                href="#portfolio"
                onMouseEnter={() => audioSynth.playHover()}
                data-cursor-text="WORK"
                className="btn-architek-outline text-base font-medium px-8 py-3.5 border-white/40 hover:border-white transition-all shadow-lg"
              >
                Explore Solutions
              </a>

              <button
                onClick={() => {
                  audioSynth.playChime(880, 0.2);
                  onOpenConsultModal();
                }}
                onMouseEnter={() => audioSynth.playHover()}
                data-cursor-text="CONSULT"
                className="btn-architek-filled text-base font-semibold px-8 py-3.5"
              >
                Initiate Consult
              </button>
            </div>

            {/* Slogan micro-badge */}
            <div className="flex items-center gap-3 pt-6 border-t border-white/10 w-full max-w-lg">
              <span className="w-2 h-2 rounded-full bg-[#E58A2B] animate-pulse"></span>
              <span className="text-xs font-mono-tech uppercase tracking-widest text-slate-400">
                {COMPANY_DETAILS.motto} • ISO27001 Security Compliant
              </span>
            </div>
          </motion.div>

          {/* Right Architectural Showcase Image (Matching Reference Dark Modern Home with Warm Light Window Glow) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative group rounded-2xl overflow-hidden border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.85)] bg-[#101014]">
              
              {/* Main Architectural Hero Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
                  alt="Pearl Trinity Architecture & Digital Engineering"
                  className="w-full h-full object-cover filter brightness-[0.92] contrast-[1.05] group-hover:scale-105 transition-transform duration-1000"
                />
                
                {/* Warm Ambient Window Glow Radial Overlay matching image warmth */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-transparent to-black/30 pointer-events-none"></div>

                {/* Floating Tag */}
                <div className="absolute top-5 left-5 z-10 px-3.5 py-1.5 rounded-full bg-[#060608]/85 backdrop-blur-md border border-white/20 text-xs font-mono-tech text-white uppercase tracking-wider">
                  Featured Case Study • 2026
                </div>

                {/* Play Video Trigger Overlay */}
                <button
                  onClick={() => {
                    audioSynth.playChime(1046, 0.3);
                    setIsPlayingReel(true);
                  }}
                  onMouseEnter={() => audioSynth.playHover()}
                  data-cursor-text="PLAY"
                  className="absolute bottom-6 right-6 z-20 px-5 py-2.5 rounded-lg bg-[#E58A2B] text-black font-semibold text-xs font-mono-tech uppercase tracking-wider flex items-center gap-2 shadow-[0_0_25px_rgba(229,138,43,0.5)] hover:scale-105 transition-all cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-black" />
                  <span>Watch Reel</span>
                </button>
              </div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* Video Reel Modal */}
      <AnimatePresence>
        {isPlayingReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
          >
            <div className="relative w-full max-w-5xl bg-[#0A0A0A] border border-[#D4AF37]/40 rounded-lg overflow-hidden shadow-[0_0_80px_rgba(212,175,55,0.3)]">
              <div className="p-4 bg-[#121212] border-b border-white/10 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                  <span className="font-display font-semibold text-white tracking-wide">
                    PEARL TRINITY • Cinematic Experience & Engineering Reel
                  </span>
                </div>
                <button
                  onClick={() => setIsPlayingReel(false)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="aspect-video relative bg-black flex flex-col items-center justify-center p-8 text-center">
                <img
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80"
                  alt="Pearl Trinity Showcase"
                  className="absolute inset-0 w-full h-full object-cover opacity-40 filter blur-sm"
                />
                <div className="relative z-10 max-w-xl">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#D4AF37] text-black flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.8)] animate-pulse">
                    <Play className="w-9 h-9 fill-black translate-x-0.5" />
                  </div>
                  <h2 className="font-display text-3xl font-bold text-white mb-3">
                    Crafting Ultra-Luxury Digital Experiences
                  </h2>
                  <p className="text-gray-300 font-light text-sm mb-6">
                    From enterprise software applications and custom AI pipelines to WebGL luxury configurators and sovereign cloud systems.
                  </p>
                  <button
                    onClick={() => {
                      setIsPlayingReel(false);
                      onOpenConsultModal();
                    }}
                    className="px-6 py-3 bg-[#D4AF37] text-black font-semibold uppercase font-mono-tech text-xs tracking-widest rounded hover:bg-white transition-colors cursor-pointer"
                  >
                    Schedule Direct Consultation
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
