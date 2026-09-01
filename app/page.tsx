"use client";

import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import Preloader from "@/components/animations/Preloader";
import Navbar from "@/components/Navbar";
import SideSocialDock from "@/components/layout/SideSocialDock";
import Hero from "@/components/Hero";
import MarqueeRibbon from "@/components/sections/MarqueeRibbon";
import Footer from "@/components/layout/Footer";

// Lazy-load komponen berat — hanya dimuat saat dibutuhkan
const BioIntroSection = dynamic(() => import("@/components/sections/BioIntroSection"), { ssr: false });
const ServicesGrid = dynamic(() => import("@/components/sections/ServicesGrid"), { ssr: false });
const WorksHoverList = dynamic(() => import("@/components/sections/WorksHoverList"), { ssr: false });
const TechArsenal = dynamic(() => import("@/components/sections/TechArsenal"), { ssr: false });
const ExperienceTimeline = dynamic(() => import("@/components/sections/ExperienceTimeline"), { ssr: false });
const CommandPalette = dynamic(() => import("@/components/ui/CommandPalette"), { ssr: false });
const ResumePreviewModal = dynamic(() => import("@/components/modals/ResumePreviewModal"), { ssr: false });
const SelfDestructOverlay = dynamic(() => import("@/components/effects/SelfDestructOverlay"), { ssr: false });
const AITwinFloatingButton = dynamic(() => import("@/components/ai-twin/AITwinFloatingButton"), { ssr: false });

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
