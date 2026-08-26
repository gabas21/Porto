"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { projects, Project } from "@/data/projects";
import FadeBlurIn from "@/components/reactbits/FadeBlurIn";
import ProjectDeepDive from "@/components/ProjectDeepDive";
import { Sparkle, ArrowUpRight, Eye } from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function WorksHoverList() {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // ── GSAP Scroll-Triggered Dual-Wrapper Parallax Curtain Entrance ────────────
  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const outer = outerRef.current;
      const inner = innerRef.current;
      const bg = bgRef.current;
      const rows = sectionRef.current?.querySelectorAll(".project-row-item");

      if (!outer || !inner || !bg) return;

      const tl = gsap.timeline({
        paused: true,
        defaults: { duration: 1.1, ease: "power2.out" },
      });

      // Dual-wrapper counter-moving curtain wipe
      tl.fromTo(outer, { yPercent: 30 }, { yPercent: 0 }, 0)
        .fromTo(inner, { yPercent: -30 }, { yPercent: 0 }, 0)
        .fromTo(bg, { yPercent: 8 }, { yPercent: 0 }, 0);

      // Staggered reveal for rows
      if (rows && rows.length > 0) {
        tl.fromTo(
          rows,
          { autoAlpha: 0, y: 35 },
          { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power2.out" },
          0.2
        );
      }

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 82%",
        onEnter: () => tl.play(),
        onLeaveBack: () => tl.reverse(),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="works"
        className="relative w-full bg-[var(--surface-card)] border-t border-[var(--border-subtle)] transition-colors duration-300 overflow-hidden"
      >
        {/* Outer Wrapper (Moves down/up) */}
        <div ref={outerRef} className="w-full h-full overflow-hidden">
          {/* Inner Wrapper (Counter-moves in opposite direction) */}
          <div ref={innerRef} className="w-full h-full overflow-hidden">
            {/* Parallax Content Canvas */}
            <div ref={bgRef} className="w-full h-full py-16 sm:py-24 md:py-28 px-4 sm:px-6 md:px-16">
              <div className="max-w-6xl mx-auto space-y-10 sm:space-y-16 text-left">
                {/* ── Section Header ── */}
                <FadeBlurIn>
                  <div className="space-y-2.5 sm:space-y-3">
                    <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--accent)]">
                      <Sparkle size={14} weight="fill" />
                      <span>Selected Works &bull; Production Impact</span>
                    </div>
                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-[var(--text-primary)] tracking-tight">
                      Featured Projects<span className="text-[#FACC15]">.</span>
                    </h2>
                  </div>
                </FadeBlurIn>

                {/* ── Interactive Project Rows ── */}
                <div className="divide-y divide-[var(--border-subtle)]">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      onMouseEnter={() => setActiveImage(project.image)}
                      onMouseLeave={() => setActiveImage(null)}
                      onClick={() => setSelectedProject(project)}
                      data-cursor-hover
                      data-cursor-text="VIEW"
                      className="project-row-item group relative flex flex-col md:flex-row md:items-center justify-between py-6 sm:py-8 md:py-10 transition-all duration-300 hover:px-4 sm:hover:px-6 hover:bg-[var(--surface-card-hover)] rounded-2xl cursor-pointer"
                    >
                      <div className="space-y-2 max-w-2xl">
                        <div className="flex items-center gap-2 md:hidden pb-1">
                          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--accent)] bg-[var(--accent)]/10 px-2.5 py-0.5 rounded-full border border-[var(--accent)]/20">
                            {project.category}
                          </span>
                          <span className="text-[11px] font-mono text-[var(--text-secondary)]">
                            {project.timeline}
                          </span>
                        </div>

                        <h3 className="text-xl sm:text-2xl md:text-4xl font-bold uppercase tracking-tight text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)]">
                          {project.title}
                        </h3>

                        {/* Mobile preview image strip */}
                        <div className="md:hidden relative w-full h-44 sm:h-52 rounded-xl overflow-hidden my-2.5 border border-[var(--border-subtle)] bg-[#14161C] shadow-md">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 400px"
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                          <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white text-[11px] font-mono flex items-center gap-1.5 border border-white/10">
                            <Eye size={12} weight="bold" />
                            <span>View Case Study</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {project.techStack.map((tech, i) => (
                            <span key={i} className="text-[11px] sm:text-xs font-mono text-[var(--text-secondary)]">
                              #{tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="hidden md:flex items-center gap-2 text-sm font-mono text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors shrink-0">
                        <span>{project.category}</span>
                        <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Floating Hover Preview Box */}
        <AnimatePresence>
          {activeImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-none fixed top-1/2 right-24 z-50 h-64 w-96 -translate-y-1/2 overflow-hidden rounded-2xl shadow-2xl hidden lg:block border border-[var(--border-subtle)] bg-[var(--bg-main)]"
            >
              <Image
                src={activeImage}
                alt="Project preview"
                fill
                sizes="384px"
                className="object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Fullscreen Case Study Deep Dive Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[999] overflow-y-auto bg-[var(--bg-main)]">
          <ProjectDeepDive
            project={selectedProject}
            onBack={() => setSelectedProject(null)}
          />
        </div>
      )}
    </>
  );
}
