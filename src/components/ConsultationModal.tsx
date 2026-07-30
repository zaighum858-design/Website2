import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, CheckCircle2, ArrowRight, Calculator } from 'lucide-react';
import { audioSynth } from '../utils/audio';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  initialService,
}) => {
  const [step, setStep] = useState<number>(1);
  const [service, setService] = useState<string>(initialService || 'Custom Software');
  const [timeline, setTimeline] = useState<string>('2-3 Months');
  const [complexity, setComplexity] = useState<string>('Enterprise Scale');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isBooked, setIsBooked] = useState<boolean>(false);

  if (!isOpen) return null;

  const services = [
    'Custom Software',
    'Web & Mobile App',
    'AI & Automation',
    'Cloud Architecture',
    'Blockchain & Web3',
    'UI/UX Design',
  ];

  const timelines = ['1 Month (Express)', '2-3 Months (Standard)', '4+ Months (Phase Build)'];
  const complexities = ['Standard Solution', 'Enterprise Scale', 'Mission-Critical Defense'];

  const calculateEstimate = () => {
    let base = 30000;
    if (service.includes('AI') || service.includes('Cloud')) base += 25000;
    if (service.includes('Blockchain')) base += 35000;
    if (complexity === 'Enterprise Scale') base *= 1.6;
    if (complexity === 'Mission-Critical Defense') base *= 2.4;
    return `$${Math.round(base / 1000)}k - $${Math.round((base * 1.5) / 1000)}k`;
  };

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    audioSynth.playSuccess();
    setIsBooked(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-2xl bg-[#121212] border border-[#D4AF37]/50 rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(212,175,55,0.3)] my-8"
        >
          {/* Header */}
          <div className="p-6 bg-[#181818] border-b border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Calculator className="w-5 h-5 text-[#D4AF37]" />
              <span className="font-display font-bold text-white tracking-wide">
                Pearl Trinity • Project Scope Estimator
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 sm:p-8">
            {isBooked ? (
              <div className="py-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-2">
                  Discovery Call Reserved
                </h3>
                <p className="text-sm font-sans-clean text-gray-300 font-light max-w-md mx-auto mb-6">
                  We have received your estimate parameters ({calculateEstimate()}) for {service}. An architect will contact {email} shortly.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#D4AF37] text-black font-semibold text-xs font-mono-tech uppercase tracking-widest rounded"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div>
                {/* Step Indicator */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10 text-xs font-mono-tech">
                  <span className={step >= 1 ? 'text-[#D4AF37]' : 'text-gray-500'}>1. SELECT SCOPE</span>
                  <span className={step >= 2 ? 'text-[#D4AF37]' : 'text-gray-500'}>2. TIMELINE & SCALE</span>
                  <span className={step >= 3 ? 'text-[#D4AF37]' : 'text-gray-500'}>3. ESTIMATE & BOOK</span>
                </div>

                {step === 1 && (
                  <div className="space-y-6">
                    <h3 className="font-display text-xl font-bold text-white">
                      Select Primary Service Category:
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {services.map((s) => (
                        <button
                          key={s}
                          onClick={() => {
                            audioSynth.playHover();
                            setService(s);
                          }}
                          className={`p-4 rounded-lg text-xs font-mono-tech text-left border transition-all ${
                            service === s
                              ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#F3E5AB] font-bold shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                              : 'bg-black/40 border-white/10 text-gray-400 hover:text-white'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setStep(2)}
                      className="w-full py-3.5 bg-[#D4AF37] text-black font-semibold uppercase font-mono-tech text-xs tracking-widest rounded flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Continue to Timeline & Scale</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-display text-lg font-bold text-white mb-3">Target Delivery Timeline:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {timelines.map((t) => (
                          <button
                            key={t}
                            onClick={() => setTimeline(t)}
                            className={`p-3 rounded text-xs font-mono-tech border ${
                              timeline === t ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#F3E5AB]' : 'bg-black/40 border-white/10 text-gray-400'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-display text-lg font-bold text-white mb-3">Architectural Scale:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {complexities.map((c) => (
                          <button
                            key={c}
                            onClick={() => setComplexity(c)}
                            className={`p-3 rounded text-xs font-mono-tech border ${
                              complexity === c ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#F3E5AB]' : 'bg-black/40 border-white/10 text-gray-400'
                            }`}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={() => setStep(1)}
                        className="w-1/3 py-3 bg-black border border-white/10 text-gray-300 font-mono-tech text-xs uppercase tracking-widest rounded"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setStep(3)}
                        className="w-2/3 py-3 bg-[#D4AF37] text-black font-semibold font-mono-tech text-xs uppercase tracking-widest rounded flex items-center justify-center gap-2"
                      >
                        Calculate Estimate
                      </button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <form onSubmit={handleBook} className="space-y-6">
                    <div className="bg-black/60 p-5 rounded-xl border border-[#D4AF37]/40 text-center">
                      <span className="text-[10px] font-mono-tech uppercase text-gray-400 block">ESTIMATED ARCHITECTURAL INVESTMENT</span>
                      <span className="font-display text-3xl font-bold text-gold-gradient block my-1">
                        {calculateEstimate()}
                      </span>
                      <span className="text-xs font-mono-tech text-cyan-400">
                        Includes: {service} • {complexity} • {timeline}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 bg-black border border-white/10 rounded text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Your Corporate Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-black border border-white/10 rounded text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="w-1/3 py-3 bg-black border border-white/10 text-gray-300 font-mono-tech text-xs uppercase tracking-widest rounded"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="w-2/3 py-3 bg-gradient-to-r from-[#D4AF37] to-[#A38025] text-black font-semibold font-mono-tech text-xs uppercase tracking-widest rounded"
                      >
                        Confirm Consult Request
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
