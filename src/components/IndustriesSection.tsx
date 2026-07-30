import React from 'react';
import { motion } from 'motion/react';
import { INDUSTRIES_SUPPORTED } from '../data/agencyData';
import { Terminal, TrendingUp, Activity, ShoppingBag, Briefcase, Factory, Rocket, ArrowRight, ShieldCheck } from 'lucide-react';
import { audioSynth } from '../utils/audio';

interface IndustriesSectionProps {
  onSelectIndustry: (industryTitle: string) => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({ onSelectIndustry }) => {
  const getIndustryIcon = (icon: string) => {
    switch (icon) {
      case 'Terminal': return <Terminal className="w-5 h-5 text-[#E58A2B]" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-[#E58A2B]" />;
      case 'Activity': return <Activity className="w-5 h-5 text-[#38BDF8]" />;
      case 'ShoppingBag': return <ShoppingBag className="w-5 h-5 text-[#E58A2B]" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-[#E58A2B]" />;
      case 'Factory': return <Factory className="w-5 h-5 text-[#38BDF8]" />;
      case 'Rocket': return <Rocket className="w-5 h-5 text-[#E58A2B]" />;
      default: return <ShieldCheck className="w-5 h-5 text-[#E58A2B]" />;
    }
  };

  return (
    <section id="industries" className="relative py-28 bg-[#060608] z-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121216] border border-[#E58A2B]/40 text-[10px] font-mono-tech uppercase tracking-[0.25em] text-[#E58A2B] mb-4">
              <Briefcase className="w-3 h-3 text-[#E58A2B]" />
              <span>Tailored Industry Expertise</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Industries <span className="text-amber-gradient italic font-light">We Support</span>
            </h2>
          </div>
          <p className="font-sans text-slate-300 font-normal text-sm max-w-md mt-4 md:mt-0 leading-relaxed">
            We provide specialized digital solutions tailored to regulatory compliance, security requirements, and domain-specific growth engines.
          </p>
        </div>

        {/* Industry Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INDUSTRIES_SUPPORTED.map((ind) => (
            <motion.div
              key={ind.id}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="group relative bg-[#121216] rounded-xl border border-white/10 hover:border-[#E58A2B]/60 overflow-hidden transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_rgba(229,138,43,0.2)] flex flex-col justify-between"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-black">
                <img
                  src={ind.image}
                  alt={ind.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-75 group-hover:brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4 p-2.5 rounded-lg bg-[#060608]/90 backdrop-blur-md border border-white/10">
                  {getIndustryIcon(ind.icon)}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-xl font-bold text-white group-hover:text-[#E58A2B] transition-colors mb-2">
                    {ind.title}
                  </h3>
                  <p className="text-xs font-sans text-slate-300 font-normal leading-relaxed mb-6">
                    {ind.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {ind.useCases.map((uc, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[9px] font-mono-tech bg-[#060608] text-slate-300 border border-white/10"
                      >
                        {uc}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      audioSynth.playChime(880, 0.2);
                      onSelectIndustry(ind.title);
                    }}
                    onMouseEnter={() => audioSynth.playHover()}
                    data-cursor-text="CONSULT"
                    className="w-full py-2.5 bg-[#060608] hover:bg-[#E58A2B] border border-white/10 hover:border-[#E58A2B] text-slate-300 hover:text-[#060608] font-mono-tech text-xs uppercase tracking-widest rounded font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Consult for {ind.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
