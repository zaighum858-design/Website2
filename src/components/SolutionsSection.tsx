import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Smartphone, Sparkles, Cloud, ShieldCheck, Palette, CheckCircle, ArrowRight, Layers } from 'lucide-react';
import { SOLUTION_PILLARS } from '../data/agencyData';
import { SolutionPillar } from '../types';
import { audioSynth } from '../utils/audio';

interface SolutionsSectionProps {
  onOpenConsultModal: () => void;
}

export const SolutionsSection: React.FC<SolutionsSectionProps> = ({ onOpenConsultModal }) => {
  const [activePillarId, setActivePillarId] = useState<string>(SOLUTION_PILLARS[0].id);

  const activePillar = SOLUTION_PILLARS.find((p) => p.id === activePillarId) || SOLUTION_PILLARS[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-5 h-5 text-[#E58A2B]" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-[#E58A2B]" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-[#E58A2B]" />;
      case 'Cloud': return <Cloud className="w-5 h-5 text-[#38BDF8]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-[#E58A2B]" />;
      case 'Palette': return <Palette className="w-5 h-5 text-[#38BDF8]" />;
      default: return <Layers className="w-5 h-5 text-[#E58A2B]" />;
    }
  };

  return (
    <section id="solutions" className="relative py-28 bg-[#060608] z-10 border-t border-white/10">
      <div className="bg-glow-orb-amber top-1/4 -right-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121216] border border-[#E58A2B]/30 text-[10px] font-mono-tech uppercase tracking-[0.25em] text-[#E58A2B] mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>Our Technology Solutions</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Comprehensive Digital <span className="text-amber-gradient italic font-light">Architectures</span>
          </h2>
          <p className="font-sans text-slate-300 font-normal mt-4 text-sm sm:text-base leading-relaxed">
            From custom enterprise software to intelligent AI pipelines and WebGL design systems, Pearl Trinity provides complete end-to-end capabilities.
          </p>
        </div>

        {/* Interactive Layout: Left Tabs / Selector Grid, Right Pillar Detail Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column Selector Cards */}
          <div className="lg:col-span-5 space-y-3">
            {SOLUTION_PILLARS.map((pillar) => {
              const isActive = pillar.id === activePillarId;
              return (
                <div
                  key={pillar.id}
                  onClick={() => {
                    audioSynth.playHover();
                    setActivePillarId(pillar.id);
                  }}
                  onMouseEnter={() => audioSynth.playHover()}
                  data-cursor-text="SELECT"
                  className={`p-5 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-between ${
                    isActive
                      ? 'bg-[#121216] border-[#E58A2B] shadow-[0_0_25px_rgba(229,138,43,0.2)]'
                      : 'bg-[#121216]/50 border-white/5 hover:border-white/20 hover:bg-[#121216]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${isActive ? 'bg-[#E58A2B]/20 border border-[#E58A2B]' : 'bg-[#060608]/80 border border-white/10'}`}>
                      {getIcon(pillar.iconName)}
                    </div>
                    <div>
                      <h3 className={`font-display text-base font-semibold transition-colors ${isActive ? 'text-[#E58A2B]' : 'text-white'}`}>
                        {pillar.title}
                      </h3>
                      <p className="text-xs font-mono-tech text-slate-400 mt-0.5 line-clamp-1">
                        {pillar.tagline}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className={`w-4 h-4 transition-transform ${isActive ? 'text-[#E58A2B] translate-x-1' : 'text-slate-500'}`} />
                </div>
              );
            })}
          </div>

          {/* Right Column Detail Showcase Panel */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePillar.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-[#121216] rounded-2xl border border-[#E58A2B]/30 p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden"
              >
                {/* Background Accent Image Overlay */}
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none overflow-hidden">
                  <img src={activePillar.image} alt={activePillar.title} className="w-full h-full object-cover filter blur-xs" />
                </div>

                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-[#E58A2B]/15 border border-[#E58A2B]/30 rounded text-[10px] font-mono-tech uppercase text-amber-300">
                    SOLUTIONS DEEP-DIVE
                  </span>
                  <span className="text-xs text-slate-400 font-mono-tech">
                    PEARL TRINITY CAPABILITY
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
                  {activePillar.title}
                </h3>
                <p className="text-sm font-mono-tech text-[#E58A2B] mb-6">
                  {activePillar.tagline}
                </p>

                <p className="text-sm font-sans text-slate-300 font-normal leading-relaxed mb-8">
                  {activePillar.description}
                </p>

                {/* Capabilities Checklist */}
                <div className="mb-8">
                  <h4 className="text-xs font-mono-tech uppercase tracking-widest text-slate-400 mb-4">
                    Solutions & Services Include:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activePillar.items.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 bg-[#060608]/80 p-3 rounded border border-white/5">
                        <CheckCircle className="w-4 h-4 text-[#E58A2B] shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-200 font-sans font-normal">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Badges */}
                <div className="mb-8 pt-6 border-t border-white/10">
                  <h4 className="text-xs font-mono-tech uppercase tracking-widest text-slate-400 mb-3">
                    Core Technologies & Frameworks:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activePillar.techStack.map((tech, idx) => (
                      <span key={idx} className="px-3 py-1 bg-[#060608] border border-[#E58A2B]/20 rounded-md text-xs font-mono-tech text-slate-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Highlight Metric & Action CTA */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10 bg-[#060608]/80 p-4 rounded-xl border border-white/5">
                  <div>
                    <span className="text-[10px] font-mono-tech uppercase text-slate-400 tracking-wider block">Key Performance Guarantee</span>
                    <span className="text-xs font-mono-tech text-[#E58A2B] font-semibold">{activePillar.highlightMetric}</span>
                  </div>

                  <button
                    onClick={() => {
                      audioSynth.playChime(880, 0.2);
                      onOpenConsultModal();
                    }}
                    onMouseEnter={() => audioSynth.playHover()}
                    data-cursor-text="BUILD"
                    className="w-full sm:w-auto px-5 py-2.5 bg-[#E58A2B] hover:bg-[#F59E0B] text-black font-bold text-xs font-mono-tech uppercase tracking-widest rounded transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Request Architecture Blueprint</span>
                    <ArrowRight className="w-4 h-4 text-black" />
                  </button>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};
