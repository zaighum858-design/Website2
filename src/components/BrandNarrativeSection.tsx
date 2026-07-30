import React, { useState } from 'react';
import { motion } from 'motion/react';
import { APPROACH_STEPS, METRICS_DATA, COMPANY_DETAILS } from '../data/agencyData';
import { Sparkles, ArrowRight, ShieldCheck, Compass, Code2, Rocket, Award, Check } from 'lucide-react';
import { audioSynth } from '../utils/audio';

interface BrandNarrativeSectionProps {
  onOpenConsultModal: () => void;
}

export const BrandNarrativeSection: React.FC<BrandNarrativeSectionProps> = ({ onOpenConsultModal }) => {
  const [activeStep, setActiveStep] = useState<string>('01');

  const stepIcons = [Compass, Sparkles, Code2, Rocket];

  return (
    <section id="narrative" className="relative py-28 bg-[#060608] text-white z-10 border-t border-white/10">
      {/* Glow Orbs */}
      <div className="bg-glow-orb-amber top-1/2 left-1/4 opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split-Screen Header Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          
          {/* Left: Editorial Brand Narrative */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121216] border border-[#E58A2B]/40 text-[10px] font-mono-tech uppercase tracking-[0.25em] text-[#E58A2B] mb-6">
              <Award className="w-3.5 h-3.5 text-[#E58A2B]" />
              <span>The Pearl Trinity Narrative</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-[1.15]">
              Creating Technology <br />
              <span className="text-amber-gradient italic font-light">That Enables The Future</span>
            </h2>

            <blockquote className="font-editorial text-xl sm:text-2xl text-slate-200 font-normal italic border-l-2 border-[#E58A2B] pl-6 py-2 my-6 bg-[#E58A2B]/10 rounded-r">
              "{COMPANY_DETAILS.vision}"
            </blockquote>

            <p className="font-sans text-slate-300 font-normal text-base leading-relaxed mb-8">
              Pearl Trinity is a Malaysia-based technology solutions company helping businesses transform ideas into powerful digital experiences. We combine deep technology expertise, creative design, and strategic business understanding to deliver solutions that create real, measurable impact.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3.5 rounded-lg bg-[#121216] border border-white/10">
                <Check className="w-5 h-5 text-[#E58A2B]" />
                <span className="text-xs font-mono-tech text-slate-200">End-to-End Digital Capability</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-lg bg-[#121216] border border-white/10">
                <Check className="w-5 h-5 text-[#E58A2B]" />
                <span className="text-xs font-mono-tech text-slate-200">Modern Technology Expertise</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-lg bg-[#121216] border border-white/10">
                <Check className="w-5 h-5 text-[#E58A2B]" />
                <span className="text-xs font-mono-tech text-slate-200">Scalable & Secure Development</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-lg bg-[#121216] border border-white/10">
                <Check className="w-5 h-5 text-[#E58A2B]" />
                <span className="text-xs font-mono-tech text-slate-200">Long-Term Technology Partnership</span>
              </div>
            </div>
          </div>

          {/* Right: Micro-Animated Metrics Showcase Cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {METRICS_DATA.map((metric, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="bg-[#121216] p-6 rounded-xl border border-white/10 hover:border-[#E58A2B]/60 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono-tech text-slate-400 uppercase tracking-widest block mb-2">
                    KEY METRIC #{idx + 1}
                  </span>
                  <div className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight flex items-baseline gap-0.5">
                    <span className="text-[#E58A2B]">{metric.prefix}</span>
                    <span className="text-amber-gradient">{metric.value}</span>
                    <span className="text-[#38BDF8] text-2xl">{metric.suffix}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10">
                  <h4 className="font-display text-sm font-semibold text-white">
                    {metric.label}
                  </h4>
                  <p className="text-[11px] font-sans text-slate-300 font-normal mt-1 leading-snug">
                    {metric.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* The Pearl Trinity 4-Step Approach */}
        <div className="mt-20 pt-16 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-mono-tech text-[#E58A2B] uppercase tracking-[0.2em] block mb-2 font-bold">
                FROM IDEA TO DIGITAL SUCCESS
              </span>
              <h3 className="font-display text-3xl sm:text-4xl font-bold text-white">
                Our Proven Methodology
              </h3>
            </div>
            <p className="text-xs font-mono-tech text-slate-400 mt-2 md:mt-0">
              DISCOVER • DESIGN • DEVELOP • DELIVER
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {APPROACH_STEPS.map((stepItem, idx) => {
              const IconComp = stepIcons[idx] || Compass;
              const isSelected = activeStep === stepItem.step;

              return (
                <div
                  key={stepItem.step}
                  onClick={() => {
                    audioSynth.playHover();
                    setActiveStep(stepItem.step);
                  }}
                  onMouseEnter={() => audioSynth.playHover()}
                  data-cursor-text="STEP"
                  className={`p-6 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#121216] border-[#E58A2B] shadow-[0_10px_35px_rgba(229,138,43,0.25)]'
                      : 'bg-[#121216]/60 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <span className="font-display text-3xl font-bold text-amber-gradient">
                        {stepItem.step}
                      </span>
                      <div className={`p-2 rounded-md ${isSelected ? 'bg-[#E58A2B] text-black' : 'bg-[#060608] text-[#E58A2B]'}`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                    </div>

                    <h4 className="font-display text-xl font-bold text-white mb-1">
                      {stepItem.title}
                    </h4>
                    <span className="text-[11px] font-mono-tech text-[#E58A2B] block mb-3 font-semibold">
                      {stepItem.subtitle}
                    </span>

                    <p className="text-xs font-sans text-slate-300 font-normal leading-relaxed mb-6">
                      {stepItem.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex justify-between items-center text-[10px] font-mono-tech text-slate-400">
                    <span>DURATION: {stepItem.duration}</span>
                    <span className="text-[#E58A2B]">{stepItem.deliverables.length} Deliverables</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Callout Banner */}
          <div className="mt-16 bg-gradient-to-r from-[#16140F] via-[#121212] to-[#0A1218] p-8 rounded-2xl border border-[#D4AF37]/30 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl font-bold text-white mb-2">
                Ready to transform your idea into enterprise reality?
              </h3>
              <p className="text-sm font-sans-clean text-gray-300 font-light">
                Partner with Pearl Trinity SDN. BHD. for custom software, AI innovation, and scalable cloud architectures.
              </p>
            </div>

            <button
              onClick={() => {
                audioSynth.playChime(880, 0.2);
                onOpenConsultModal();
              }}
              onMouseEnter={() => audioSynth.playHover()}
              data-cursor-text="START"
              className="px-8 py-4 bg-[#D4AF37] hover:bg-white text-black font-semibold uppercase font-mono-tech text-xs tracking-widest rounded transition-colors flex items-center gap-2 shrink-0 cursor-pointer shadow-[0_0_25px_rgba(212,175,55,0.4)]"
            >
              <span>Initiate Discovery Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
