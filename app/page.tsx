"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import Preloader from "@/components/animations/Preloader";
import Navbar from "@/components/Navbar";
import SideSocialDock from "@/components/layout/SideSocialDock";
import Hero from "@/components/Hero";
import BioIntroSection from "@/components/sections/BioIntroSection";
import ExperienceTimeline from "@/components/sections/ExperienceTimeline";
import TechArsenal from "@/components/sections/TechArsenal";
import WorksHoverList from "@/components/sections/WorksHoverList";
import MarqueeRibbon from "@/components/sections/MarqueeRibbon";
import Footer from "@/components/layout/Footer";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* Multi-language Preloader */}
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <main className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] overflow-x-hidden w-full max-w-full transition-colors duration-300">
        {/* Navigation & Fixed Social Dock */}
        <Navbar />
        <SideSocialDock />

        {/* 1. Hero Section (Clean 2-Column + 3D Physics Lanyard) */}
        <Hero />

        {/* 2. About Me & Story Narrative */}
        <BioIntroSection />

        {/* 3. Experience & Education Timeline */}
        <ExperienceTimeline />

        {/* 5. Technology Arsenal & Skills Grid */}
        <TechArsenal />

        {/* 6. Featured Works (Interactive Hover Thumbnail Reveal) */}
        <WorksHoverList />

        {/* 7. Infinite Marquee Ribbon */}
        <MarqueeRibbon />

        {/* 8. Editorial Giant Footer with Live Samarinda WITA Time */}
        <Footer />
      </main>
    </>
  );
}
