import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, Copy, Sparkles, Mail, MapPin, Building, ShieldCheck, PhoneCall } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/agencyData';
import { ContactFormData } from '../types';
import { audioSynth } from '../utils/audio';

interface LuxuryContactPortalProps {
  preselectedService?: string;
}

export const LuxuryContactPortal: React.FC<LuxuryContactPortalProps> = ({ preselectedService }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    service: preselectedService || 'Custom Software Development',
    budget: '$50,000 - $100,000',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const servicesList = [
    'Custom Software Development',
    'Web & Mobile Applications',
    'AI & Intelligent Automation',
    'Cloud Solutions & Infra',
    'Blockchain & Emerging Tech',
    'UI/UX Design & Experience',
  ];

  const budgetOptions = [
    '$15,000 - $30,000',
    '$30,000 - $75,000',
    '$75,000 - $150,000',
    '$150,000 - $500,000+',
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(COMPANY_DETAILS.email);
    setCopiedEmail(true);
    audioSynth.playChime(1046, 0.2);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    audioSynth.playHover();

    // Simulate luxury API gateway submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      audioSynth.playSuccess();
    }, 1500);
  };

  return (
    <section id="contact" className="relative py-28 bg-[#060608] text-white z-10 border-t border-white/10">
      {/* Background Orbs */}
      <div className="bg-glow-orb-amber bottom-0 left-1/3 opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121216] border border-[#E58A2B]/40 text-[10px] font-mono-tech uppercase tracking-[0.25em] text-[#E58A2B] mb-4">
            <Mail className="w-3.5 h-3.5 text-[#E58A2B]" />
            <span>Luxury Contact Portal</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Initiate Architectural <span className="text-amber-gradient italic font-light">Dialogue</span>
          </h2>
          <p className="font-sans text-slate-300 font-normal mt-4 text-sm sm:text-base leading-relaxed">
            Connect directly with Pearl Trinity's principal architects to formulate your digital roadmap.
          </p>
        </div>

        {/* Main Portal Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Official Corporate Credentials & Direct Contact */}
          <div className="lg:col-span-5 bg-[#121216] p-8 rounded-2xl border border-[#E58A2B]/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#E58A2B] via-amber-200 to-[#E58A2B]"></div>

            <h3 className="font-display text-2xl font-bold text-white mb-2">
              {COMPANY_DETAILS.legalName}
            </h3>
            <p className="text-xs font-mono-tech text-[#E58A2B] mb-6 font-semibold">
              Digital Solutions & Software Development Company
            </p>

            {/* Corporate Registration Details Badge */}
            <div className="bg-[#060608]/80 p-4 rounded-xl border border-white/10 space-y-3 mb-8">
              <div className="flex items-center justify-between text-xs font-mono-tech">
                <span className="text-slate-400">Company Reg No:</span>
                <span className="text-[#38BDF8] font-semibold">{COMPANY_DETAILS.regNo}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono-tech">
                <span className="text-slate-400">Jurisdiction:</span>
                <span className="text-white">{COMPANY_DETAILS.country}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono-tech">
                <span className="text-slate-400">Global Operations:</span>
                <span className="text-emerald-400 font-semibold">24/7 SLA Active</span>
              </div>
            </div>

            {/* Direct Email Action */}
            <div className="mb-8">
              <span className="text-xs font-mono-tech text-slate-400 uppercase tracking-widest block mb-2">
                Official Inquiries Email:
              </span>
              <div className="flex items-center gap-2 p-3 bg-[#060608] rounded-lg border border-[#E58A2B]/40">
                <Mail className="w-4 h-4 text-[#E58A2B]" />
                <span className="font-mono-tech text-sm text-white flex-1">{COMPANY_DETAILS.email}</span>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded bg-[#E58A2B]/20 hover:bg-[#E58A2B] text-[#E58A2B] hover:text-black transition-colors cursor-pointer"
                  title="Copy Email Address"
                >
                  {copiedEmail ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              {copiedEmail && (
                <span className="text-[10px] font-mono-tech text-emerald-400 mt-1 block">
                  Email copied to clipboard!
                </span>
              )}
            </div>

            {/* Location Details */}
            <div className="space-y-4 pt-6 border-t border-white/10">
              <div className="flex items-start gap-3 text-xs font-sans-clean text-gray-300">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono-tech font-semibold text-white block">Headquarters</span>
                  <p className="font-light text-gray-400">Kuala Lumpur, Malaysia</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs font-sans-clean text-gray-300">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono-tech font-semibold text-white block">NDA & Security First</span>
                  <p className="font-light text-gray-400">Strict non-disclosure agreement provided before initial discovery.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Glowing Form */}
          <div className="lg:col-span-7 bg-[#121212] p-8 rounded-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 text-center flex flex-col items-center justify-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center mb-6 shadow-[0_0_35px_rgba(212,175,55,0.6)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-3xl font-bold text-white mb-2">
                    Consultation Request Transmitted
                  </h3>
                  <p className="font-sans-clean text-gray-300 font-light max-w-md text-sm mb-6 leading-relaxed">
                    Thank you, <span className="text-[#D4AF37] font-semibold">{formData.name}</span>. A principal digital architect from Pearl Trinity SDN. BHD. will review your specification and reach out via <span className="text-cyan-400">{formData.email}</span> within 12 hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        company: '',
                        service: servicesList[0],
                        budget: budgetOptions[1],
                        message: '',
                      });
                    }}
                    className="px-6 py-2.5 bg-[#121212] border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-mono-tech text-xs uppercase tracking-widest rounded transition-all cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Service Selection Chips */}
                  <div>
                    <label className="block text-xs font-mono-tech uppercase tracking-widest text-gray-300 mb-3">
                      Select Primary Service Domain:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {servicesList.map((srv) => (
                        <button
                          key={srv}
                          type="button"
                          onClick={() => {
                            audioSynth.playHover();
                            setFormData({ ...formData, service: srv });
                          }}
                          className={`px-3 py-2 rounded-lg text-[11px] font-mono-tech text-left transition-all cursor-pointer border ${
                            formData.service === srv
                              ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#F3E5AB] font-semibold shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                              : 'bg-black/40 border-white/5 text-gray-400 hover:text-white hover:border-white/20'
                          }`}
                        >
                          {srv}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name & Email Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono-tech uppercase tracking-widest text-gray-300 mb-2">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Lord Alexander Vance"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all font-sans-clean"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono-tech uppercase tracking-widest text-gray-300 mb-2">
                        Corporate Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="vance@apexcapital.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all font-sans-clean"
                      />
                    </div>
                  </div>

                  {/* Company Name & Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono-tech uppercase tracking-widest text-gray-300 mb-2">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Apex Financial Holdings"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all font-sans-clean"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono-tech uppercase tracking-widest text-gray-300 mb-2">
                        Estimated Budget Bracket
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-all font-mono-tech cursor-pointer"
                      >
                        {budgetOptions.map((b) => (
                          <option key={b} value={b} className="bg-[#121212] text-white">
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message Input */}
                  <div>
                    <label className="block text-xs font-mono-tech uppercase tracking-widest text-gray-300 mb-2">
                      Project Specification Brief *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Outline your technical requirements, desired outcomes, timeline, or architecture goals..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all font-sans-clean"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    onMouseEnter={() => audioSynth.playHover()}
                    data-cursor-text="TRANSMIT"
                    className="w-full py-4 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#A38025] text-black font-semibold text-xs font-mono-tech uppercase tracking-[0.2em] rounded-lg shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_50px_rgba(212,175,55,0.7)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 animate-spin text-black" />
                        Transmitting Encrypted Spec...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Submit Architectural Inquiry
                        <Send className="w-4 h-4" />
                      </span>
                    )}
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};
