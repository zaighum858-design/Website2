import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, CheckCircle, Cpu, ArrowRight, ShieldCheck } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenConsult: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onOpenConsult }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl bg-[#111111] border border-[#D4AF37]/40 rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(212,175,55,0.25)] my-8"
        >
          {/* Header Bar */}
          <div className="p-4 sm:p-6 bg-[#161616] border-b border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#F3E5AB] rounded text-[10px] font-mono-tech uppercase tracking-widest">
                {project.categoryLabel}
              </span>
              <span className="text-xs font-mono-tech text-gray-400">
                CLIENT: {project.client.toUpperCase()}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="max-h-[80vh] overflow-y-auto p-6 sm:p-8 space-y-8">
            
            {/* Banner Image */}
            <div className="relative aspect-[16/8] rounded-xl overflow-hidden border border-white/10">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <span className="text-xs font-mono-tech text-cyan-400">RELEASE YEAR: {project.year}</span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                  {project.title}
                </h2>
              </div>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-3 gap-4 bg-black/50 p-6 rounded-xl border border-white/10">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="text-center">
                  <span className="font-display text-2xl sm:text-3xl font-bold text-gold-gradient block">
                    {m.value}
                  </span>
                  <span className="text-[10px] font-mono-tech text-gray-400 uppercase tracking-widest">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Executive Case Study Text */}
            <div>
              <h3 className="text-xs font-mono-tech uppercase tracking-widest text-[#D4AF37] mb-3">
                Architectural Executive Brief:
              </h3>
              <p className="font-sans-clean text-gray-200 text-sm sm:text-base font-light leading-relaxed">
                {project.fullCaseStudy}
              </p>
            </div>

            {/* System Architecture Items */}
            <div>
              <h3 className="text-xs font-mono-tech uppercase tracking-widest text-gray-400 mb-4">
                Core System Stack Components:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.architecture.map((arch, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-black/40 rounded border border-white/5">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span className="text-xs font-mono-tech text-gray-300">{arch}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Tags */}
            <div>
              <h3 className="text-xs font-mono-tech uppercase tracking-widest text-gray-400 mb-3">
                Technologies Employed:
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 bg-[#1A1A1A] border border-white/10 rounded text-xs font-mono-tech text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-mono-tech text-gray-400">
                Engineered by Pearl Trinity SDN. BHD.
              </span>
              <button
                onClick={() => {
                  onClose();
                  onOpenConsult();
                }}
                className="w-full sm:w-auto px-6 py-3 bg-[#D4AF37] hover:bg-white text-black font-semibold uppercase font-mono-tech text-xs tracking-widest rounded transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Similar Architecture</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
