import React, { useState } from 'react';
import { ParticleBackground } from './components/ParticleBackground';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PortfolioShowcase } from './components/PortfolioShowcase';
import { SolutionsSection } from './components/SolutionsSection';
import { BrandNarrativeSection } from './components/BrandNarrativeSection';
import { IndustriesSection } from './components/IndustriesSection';
import { LuxuryContactPortal } from './components/LuxuryContactPortal';
import { ProjectModal } from './components/ProjectModal';
import { ConsultationModal } from './components/ConsultationModal';
import { Footer } from './components/Footer';
import { Project } from './types';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [consultInitialService, setConsultInitialService] = useState<string | undefined>(undefined);
  const [particleDensity, setParticleDensity] = useState<'high' | 'medium' | 'low'>('medium');

  const handleOpenConsultForIndustry = (industryTitle: string) => {
    setConsultInitialService(`Software Architecture for ${industryTitle}`);
    setIsConsultModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#060608] text-white selection:bg-[#E58A2B] selection:text-black relative">
      {/* Floating Canvas Particle Background */}
      <ParticleBackground density={particleDensity} interactive={true} />

      {/* Smooth Magnetic Custom Cursor */}
      <CustomCursor />

      {/* Luxury Navigation Header */}
      <Navbar
        onOpenConsultModal={() => {
          setConsultInitialService(undefined);
          setIsConsultModalOpen(true);
        }}
        particleDensity={particleDensity}
        setParticleDensity={setParticleDensity}
      />

      {/* Main Page Layout Sections */}
      <main>
        {/* 1. Cinematic Hero Section */}
        <HeroSection
          onOpenConsultModal={() => {
            setConsultInitialService(undefined);
            setIsConsultModalOpen(true);
          }}
        />

        {/* 2. Dynamic Portfolio Showcase */}
        <PortfolioShowcase
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* 3. Technology Solutions Ecosystem */}
        <SolutionsSection
          onOpenConsultModal={() => {
            setConsultInitialService(undefined);
            setIsConsultModalOpen(true);
          }}
        />

        {/* 4. Brand Narrative & Micro-Animated Metrics */}
        <BrandNarrativeSection
          onOpenConsultModal={() => {
            setConsultInitialService(undefined);
            setIsConsultModalOpen(true);
          }}
        />

        {/* 5. Industries Supported */}
        <IndustriesSection
          onSelectIndustry={handleOpenConsultForIndustry}
        />

        {/* 6. Luxury Contact Portal */}
        <LuxuryContactPortal
          preselectedService={consultInitialService}
        />
      </main>

      {/* Luxury Footer */}
      <Footer />

      {/* Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenConsult={() => {
          setSelectedProject(null);
          setIsConsultModalOpen(true);
        }}
      />

      <ConsultationModal
        isOpen={isConsultModalOpen}
        onClose={() => setIsConsultModalOpen(false)}
        initialService={consultInitialService}
      />
    </div>
  );
}
