"use client";

import { useState } from "react";
import { projects, Project } from "@/data/projects";
import { Folder } from "@phosphor-icons/react";
import FadeBlurIn from "./reactbits/FadeBlurIn";
import AccordionGallery from "./reactbits/AccordionGallery";
import PixelSwap from "./reactbits/PixelSwap";
import ProjectDeepDive from "./ProjectDeepDive";

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<Project>(projects[0]);
  const [isDeepDiveActive, setIsDeepDiveActive] = useState(false);

  const handleOpenProject = (proj: Project) => {
    setActiveProject(proj);
    setIsDeepDiveActive(true);
  };

  const handleBackToPortfolio = () => {
    setIsDeepDiveActive(false);
  };

  return (
    <section id="projects" className="relative">
      <PixelSwap
        active={isDeepDiveActive}
        onActiveChange={setIsDeepDiveActive}
        pixelSize={64}
        gap={0}
        pixelRadius={0}
        pixelSpin={0}
        pixelScale={0.35}
        duration={1400}
        pixelDuration={450}
        pattern="random"
        randomness={0}
        fade={true}
        trigger="manual"
        firstContent={
          <div className="py-36 md:py-48 px-6 border-t border-[var(--border-subtle)] max-w-[1240px] mx-auto space-y-12">
            {/* Section Header */}
            <FadeBlurIn>
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface-card)] border border-[var(--border-subtle)] text-[var(--accent)] text-xs font-mono shadow-sm">
                  <Folder size={14} weight="bold" />
                  <span>Selected Works</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
                  Proyek Unggulan
                </h2>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl leading-relaxed font-mono">
                  Koleksi sistem informasi instansi pemerintah daerah, arsitektur AI agent web, dan portal korporat performa tinggi.
                </p>
              </div>
            </FadeBlurIn>

            {/* AccordionGallery Showcase: Click opens PixelSwap transition */}
            <AccordionGallery
              items={projects}
              defaultIndex={0}
              expandRatio={0.52}
              trigger="hover"
              onOpenModal={handleOpenProject}
            />
          </div>
        }
        secondContent={
          <div className="py-12 px-4 sm:px-6">
            <ProjectDeepDive
              project={activeProject}
              onBack={handleBackToPortfolio}
            />
          </div>
        }
      />
    </section>
  );
}
