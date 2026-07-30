import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Sparkles, Layers, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '../data/agencyData';
import { Project } from '../types';
import { audioSynth } from '../utils/audio';

interface PortfolioShowcaseProps {
  onSelectProject: (project: Project) => void;
}

export const PortfolioShowcase: React.FC<PortfolioShowcaseProps> = ({ onSelectProject }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filterTabs = [
    { id: 'all', label: 'All Portfolio' },
    { id: 'ai', label: 'AI & Enterprise' },
    { id: 'web-mobile', label: 'Web & Mobile' },
    { id: 'software', label: 'Custom Software' },
    { id: 'cloud-web3', label: 'Cloud & Web3' },
  ];

  const filteredProjects = PORTFOLIO_PROJECTS.filter((proj) => {
    if (activeFilter === 'all') return true;
    return proj.category === activeFilter;
  });

  return (
    <section id="portfolio" className="relative py-28 bg-[#060608] z-10 border-t border-white/10">
      {/* Background Orbs */}
      <div className="bg-glow-orb-amber top-1/3 left-10 opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121216] border border-[#E58A2B]/40 text-[10px] font-mono-tech uppercase tracking-[0.25em] text-[#E58A2B] mb-4">
              <Sparkles className="w-3 h-3 text-[#E58A2B]" />
              <span>Selected Works & Case Studies</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Dynamic Portfolio <span className="text-amber-gradient font-light italic">Showcase</span>
            </h2>
            <p className="font-sans text-slate-300 font-normal mt-3 max-w-xl text-sm sm:text-base">
              Explore bespoke digital solutions designed for high-net-worth institutions, financial leaders, luxury brands, and healthcare pioneers.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#121216] border border-white/10 rounded-lg">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  audioSynth.playHover();
                  setActiveFilter(tab.id);
                }}
                className={`px-4 py-2 rounded-md text-xs font-mono-tech uppercase tracking-wider transition-all cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-[#E58A2B] text-black font-bold shadow-[0_0_20px_rgba(229,138,43,0.4)]'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="group relative"
              >
                <div
                  onClick={() => {
                    audioSynth.playChime(1046, 0.2);
                    onSelectProject(project);
                  }}
                  onMouseEnter={() => audioSynth.playHover()}
                  data-cursor-text="INSPECT"
                  className="h-full bg-[#121216] rounded-xl border border-white/10 overflow-hidden hover:border-[#E58A2B]/60 transition-all duration-500 hover:shadow-[0_15px_45px_rgba(229,138,43,0.2)] flex flex-col justify-between cursor-pointer"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-black">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-[#121216]/30 to-transparent"></div>

                    {/* Category Tag */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-[#060608]/90 backdrop-blur-md border border-[#E58A2B]/40 text-[10px] font-mono-tech uppercase tracking-widest text-amber-300 rounded">
                        {project.categoryLabel}
                      </span>
                    </div>

                    {/* Year Tag */}
                    <div className="absolute top-4 right-4">
                      <span className="px-2.5 py-1 bg-[#060608]/90 backdrop-blur-md text-[10px] font-mono-tech text-slate-300 rounded">
                        {project.year}
                      </span>
                    </div>

                    {/* Hover Inspect Overlay */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-[#E58A2B] text-black flex items-center justify-center shadow-[0_0_25px_#E58A2B] transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <ArrowUpRight className="w-6 h-6 text-black" />
                      </div>
                    </div>
                  </div>

                  {/* Content Block */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-mono-tech text-[#E58A2B] uppercase tracking-widest block mb-1">
                        Client: {project.client}
                      </span>
                      <h3 className="font-display text-xl font-bold text-white group-hover:text-[#E58A2B] transition-colors line-clamp-2">
                        {project.title}
                      </h3>
                      <p className="text-xs font-sans text-slate-300 font-normal mt-2 line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Key Metrics Row */}
                    <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-3 gap-2">
                      {project.metrics.map((m, idx) => (
                        <div key={idx} className="bg-[#060608]/80 p-2 rounded border border-white/5">
                          <span className="font-display font-bold text-sm text-[#E58A2B] block">
                            {m.value}
                          </span>
                          <span className="text-[9px] font-mono-tech text-slate-400 uppercase tracking-tight line-clamp-1">
                            {m.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[9px] font-mono-tech bg-white/5 text-gray-300 border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
