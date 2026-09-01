"use client";

import { useState, useCallback, useEffect } from "react";
import Preloader from "@/components/animations/Preloader";
import Navbar from "@/components/Navbar";
import SideSocialDock from "@/components/layout/SideSocialDock";
import Hero from "@/components/Hero";
import BioIntroSection from "@/components/sections/BioIntroSection";
import ServicesGrid from "@/components/sections/ServicesGrid";
import ExperienceTimeline from "@/components/sections/ExperienceTimeline";
import TechArsenal from "@/components/sections/TechArsenal";
import WorksHoverList from "@/components/sections/WorksHoverList";
import MarqueeRibbon from "@/components/sections/MarqueeRibbon";
import Footer from "@/components/layout/Footer";
import CommandPalette from "@/components/ui/CommandPalette";
import ResumePreviewModal from "@/components/modals/ResumePreviewModal";
import SelfDestructOverlay from "@/components/effects/SelfDestructOverlay";
import AITwinFloatingButton from "@/components/ai-twin/AITwinFloatingButton";

export default function Home() {

  // Preloader selalu di-mount. Ia mengangkat tirai sendiri via GSAP.
  // Tidak ada conditional render berdasarkan loading —
  // itu menyebabkan SSR mismatch dan stuck saat hard refresh.
  const [showPreloader, setShowPreloader] = useState(true);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setShowPreloader(false);
  }, []);

  useEffect(() => {
    const handleOpenCmd = () => setCmdOpen(true);
    const handleOpenCV = () => setCvOpen(true);

    window.addEventListener("open-command-palette", handleOpenCmd);
    window.addEventListener("open-cv-modal", handleOpenCV);
    return () => {
      window.removeEventListener("open-command-palette", handleOpenCmd);
      window.removeEventListener("open-cv-modal", handleOpenCV);
    };
  }, []);

  return (
    <>
      {/* Preloader selalu mount — internal logic menentukan apakah animasi penuh atau skip cepat */}
      {showPreloader && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}

      <main className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] overflow-x-hidden w-full max-w-full transition-colors duration-300">
        {/* Navigation & Fixed Social Dock */}
        <Navbar
          onOpenCV={() => setCvOpen(true)}
          onOpenCommandPalette={() => setCmdOpen(true)}
        />
        <SideSocialDock />

        {/* 1. Hero Section (Clean 2-Column + 3D Physics Lanyard) */}
        <Hero />

        {/* 2. About Me & Story Narrative */}
        <BioIntroSection />

        {/* 3. Core Services & Capabilities (What I Bring) */}
        <ServicesGrid />

        {/* 4. Featured Works (Interactive Hover Thumbnail Reveal & Case Studies) */}
        <WorksHoverList />

        {/* 5. Technology Arsenal & Skills Grid */}
        <TechArsenal />

        {/* 6. Experience & Education Timeline */}
        <ExperienceTimeline />

        {/* 7. Infinite Marquee Ribbon */}
        <MarqueeRibbon />

        {/* 8. Editorial Giant Footer with Live Samarinda WITA Time */}
        <Footer />
      </main>

      {/* 💥 Interactive Self-Destruct Breakdown & Golden Rebirth Engine 💣 */}
      <SelfDestructOverlay />

      {/* 🤖 Bagas AI Twin Floating Terminal & Voice Assistant 💬 */}
      <AITwinFloatingButton />

      {/* Global Interactive Command Palette (Ctrl+K / ⌘K) */}
      <CommandPalette
        isOpen={cmdOpen}
        onClose={() => setCmdOpen(false)}
        onOpenCV={() => {
          setCmdOpen(false);
          setCvOpen(true);
        }}
      />

      {/* Interactive CV / Resume Preview Modal */}
      <ResumePreviewModal
        isOpen={cvOpen}
        onClose={() => setCvOpen(false)}
      />
    </>
  );
}
