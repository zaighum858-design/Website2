import React from 'react';
import { ArrowUp, Sparkles, Globe, ShieldCheck, Github, Linkedin, Twitter } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/agencyData';
import { audioSynth } from '../utils/audio';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    audioSynth.playChime(1046, 0.2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#040406] text-slate-300 py-16 border-t border-white/10 z-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <Logo size="md" showTagline={false} />
            
            <p className="text-xs font-normal text-slate-300 max-w-sm leading-relaxed">
              {COMPANY_DETAILS.legalName} • Reg No: {COMPANY_DETAILS.regNo}.
              Building digital solutions that drive business growth through custom software, AI innovation, and scalable cloud architectures.
            </p>

            <div className="flex items-center gap-2 text-[11px] font-mono-tech text-[#E58A2B]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Kuala Lumpur, Malaysia • Global Enterprise Reach</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono-tech uppercase tracking-widest text-white font-bold">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-mono-tech">
              <li><a href="#portfolio" className="hover:text-[#E58A2B] transition-colors">Portfolio Showcase</a></li>
              <li><a href="#solutions" className="hover:text-[#E58A2B] transition-colors">Technology Solutions</a></li>
              <li><a href="#narrative" className="hover:text-[#E58A2B] transition-colors">Brand Narrative</a></li>
              <li><a href="#industries" className="hover:text-[#E58A2B] transition-colors">Industries Supported</a></li>
              <li><a href="#contact" className="hover:text-[#E58A2B] transition-colors">Luxury Contact Portal</a></li>
            </ul>
          </div>

          {/* Services Quick List */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono-tech uppercase tracking-widest text-white font-bold">
              Core Capabilities
            </h4>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono-tech text-slate-400">
              <span>Custom Software</span>
              <span>Enterprise SaaS</span>
              <span>Web & Mobile Apps</span>
              <span>AI Automation</span>
              <span>Cloud Infrastructure</span>
              <span>Smart Contracts</span>
              <span>WebGL 3D Suites</span>
              <span>UI/UX Systems</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech">
          <p>© {new Date().getFullYear()} {COMPANY_DETAILS.legalName}. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            <span className="text-slate-400">ISO27001 Security Compliant</span>
            
            <button
              onClick={scrollToTop}
              onMouseEnter={() => audioSynth.playHover()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#121216] border border-white/10 hover:border-[#E58A2B] text-slate-300 hover:text-[#E58A2B] transition-all cursor-pointer"
              title="Return to top"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
