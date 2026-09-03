"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { projects, Project } from "@/data/projects";
import FadeBlurIn from "@/components/reactbits/FadeBlurIn";
import StrokeText from "@/components/reactbits/StrokeText";
import ProjectDeepDive from "@/components/ProjectDeepDive";
import YellowCurtainTransition from "@/components/animations/YellowCurtainTransition";
import { soundFx } from "@/lib/audio-fx";
import { useLanguage } from "@/context/LanguageContext";
import {
  ArrowUpRight,
  Eye,
  SquaresFour,
  ListDashes,
  GithubLogo,
  Globe,
  Lock,
  X,
} from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type CategoryFilter = "All" | "Government" | "AI & WebApp" | "Corporate";
type ViewMode = "grid" | "list";

export default function WorksHoverList() {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("All");
  const [activeTechFilter, setActiveTechFilter] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [curtainActive, setCurtainActive] = useState(false);
  const [curtainProject, setCurtainProject] = useState<Project | null>(null);

  const handleOpenProject = (project: Project) => {
    soundFx.playSweep();
    setCurtainProject(project);
    setCurtainActive(true);
    setTimeout(() => {
      setSelectedProject(project);
      setTimeout(() => {
        setCurtainActive(false);
      }, 350);
    }, 450);
  };

  const handleCloseProject = () => {
    soundFx.playClick();
    setCurtainProject(selectedProject);
    setCurtainActive(true);
    setTimeout(() => {
      setSelectedProject(null);
      setTimeout(() => {
        setCurtainActive(false);
        setCurtainProject(null);
      }, 350);
    }, 450);
  };

  // Event listener untuk filter teknologi dari TechArsenal atau CommandPalette
  useEffect(() => {
    const handleFilterTech = (e: Event) => {
      const custom = e as CustomEvent<{ tech: string }>;
      if (custom.detail?.tech) {
        setActiveTechFilter(custom.detail.tech);
        setSelectedCategory("All");
      }
    };

    const handleOpenProjModal = (e: Event) => {
      const custom = e as CustomEvent<{ projectId: string }>;
      const target = projects.find((p) => p.id === custom.detail.projectId);
      if (target) {
        handleOpenProject(target);
      }
    };

    window.addEventListener("filter-works-by-tech", handleFilterTech);
    window.addEventListener("open-project-modal", handleOpenProjModal);
    return () => {
      window.removeEventListener("filter-works-by-tech", handleFilterTech);
      window.removeEventListener("open-project-modal", handleOpenProjModal);
    };
  }, []);

  const sectionRef = useRef<HTMLElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const categories: CategoryFilter[] = ["All", "Government", "AI & WebApp", "Corporate"];

  const filteredProjects = projects.filter((p) => {
    const matchCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchTech =
      !activeTechFilter ||
      p.techStack.some(
        (t) =>
          t.toLowerCase().includes(activeTechFilter.toLowerCase()) ||
          activeTechFilter.toLowerCase().includes(t.toLowerCase())
      );
    return matchCategory && matchTech;
  });

  // Lock background scroll when modal is active
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  // ── GSAP Scroll-Triggered Curtain Entrance ────────────
  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const outer = outerRef.current;
      const inner = innerRef.current;
      const bg = bgRef.current;

      if (!outer || !inner || !bg) return;

      const tl = gsap.timeline({
        paused: true,
        defaults: { duration: 1.1, ease: "power2.out" },
      });

      tl.fromTo(outer, { yPercent: 20 }, { yPercent: 0 }, 0)
        .fromTo(inner, { yPercent: -20 }, { yPercent: 0 }, 0)
        .fromTo(bg, { yPercent: 5 }, { yPercent: 0 }, 0);

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 85%",
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
        {/* Outer Wrapper */}
        <div ref={outerRef} className="w-full h-full overflow-hidden">
          {/* Inner Wrapper */}
          <div ref={innerRef} className="w-full h-full overflow-hidden">
            {/* Parallax Canvas */}
            <div ref={bgRef} className="w-full h-full py-16 sm:py-24 md:py-28 px-4 sm:px-6 md:px-12 lg:px-16 3xl:px-24">
              <div className="max-w-7xl 3xl:max-w-[1700px] 4xl:max-w-[2000px] mx-auto space-y-10 sm:space-y-14 3xl:space-y-18 text-left">
                {/* ── Section Header & Filter Toolbar ── */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-[var(--border-subtle)]">
                  <FadeBlurIn>
                    <div className="space-y-2.5">
                      {/* Mobile View: Dynamic Kinetic StrokeText */}
                      <div className="sm:hidden w-full max-w-full">
                        <StrokeText
                          text={`${t.works.heading}.`}
                          strokeColor="var(--text-primary)"
                          fillColor="var(--text-primary)"
                          strokeWidth={1.0}
                          drawDuration={1.2}
                          fillDelay={0.12}
                          stagger={0.03}
                          ease="power2.out"
                          trigger="scroll"
                          fillMode="wipe"
                          fontSize={34}
                          fontWeight={700}
                          letterSpacing={-1}
                        />
                      </div>

                      {/* Desktop View: Standard Display Typography */}
                      <h2 className="hidden sm:block text-3xl sm:text-5xl md:text-6xl 3xl:text-7xl 4xl:text-8xl font-bold text-[var(--text-primary)] tracking-tight">
                        {t.works.heading}<span className="text-[var(--accent)]">.</span>
                      </h2>
                    </div>
                  </FadeBlurIn>

                    {/* Filter & View Switcher Controls */}
                    <div className="flex flex-wrap items-center gap-3">
                      {/* Active Tech Filter Tag if selected from TechArsenal */}
                      {activeTechFilter && (
                        <div
                          data-testid="active-tech-filter-tag"
                          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface-card)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-secondary)] shadow-sm backdrop-blur-sm hover:border-[var(--accent)]/40 transition-colors"
                        >
                          <span>Tech:</span>
                          <span className="text-[var(--accent)] font-semibold">{activeTechFilter}</span>
                          <button
                            onClick={() => {
                              soundFx.playClick();
                              setActiveTechFilter(null);
                            }}
                            className="p-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors ml-0.5 cursor-pointer"
                            title="Hapus filter teknologi"
                          >
                            <X size={12} weight="bold" />
                          </button>
                        </div>
                      )}

                      {/* Category Filter Pills */}
                      <div className="flex items-center p-1.5 rounded-full bg-[var(--bg-main)] border border-[var(--border-subtle)] overflow-x-auto max-w-full gap-1">
                        {categories.map((cat) => {
                          const isActive = selectedCategory === cat && !activeTechFilter;
                          const label = cat === "All" ? t.works.filterAll : cat === "Corporate" ? (language === "id" ? "Korporat" : "Corporate") : cat;
                          return (
                            <button
                              key={cat}
                              onClick={() => {
                                soundFx.playClick();
                                setSelectedCategory(cat);
                                setActiveTechFilter(null);
                              }}
                              className={`relative px-4 sm:px-5 py-2.5 sm:py-2 min-h-[38px] sm:min-h-[36px] flex items-center justify-center rounded-full text-xs font-mono transition-colors cursor-pointer whitespace-nowrap touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
                                isActive
                                  ? "text-[var(--accent-fg)] font-semibold"
                                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                              }`}
                            >
                              {isActive && (
                                <motion.div
                                  layoutId="activeCategoryPill"
                                  className="absolute inset-0 rounded-full bg-[var(--accent)] shadow-sm"
                                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                />
                              )}
                              <span className="relative z-10">{label}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* View Switcher (Grid vs List) */}
                      <div className="hidden sm:flex items-center p-1 rounded-xl bg-[var(--bg-main)] border border-[var(--border-subtle)] gap-1">
                        <button
                          onClick={() => {
                            soundFx.playClick();
                            setViewMode("grid");
                          }}
                          className={`w-9 h-9 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
                            viewMode === "grid"
                              ? "bg-[var(--surface-card)] text-[var(--accent)] shadow-sm"
                              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                          }`}
                          title="Bento Grid View"
                          aria-label="Bento Grid View"
                        >
                          <SquaresFour size={18} weight={viewMode === "grid" ? "fill" : "regular"} />
                        </button>
                        <button
                          onClick={() => {
                            soundFx.playClick();
                            setViewMode("list");
                          }}
                          className={`w-9 h-9 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
                            viewMode === "list"
                              ? "bg-[var(--surface-card)] text-[var(--accent)] shadow-sm"
                              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                          }`}
                          title="Editorial List View"
                          aria-label="Editorial List View"
                        >
                          <ListDashes size={18} weight={viewMode === "list" ? "bold" : "regular"} />
                        </button>
                      </div>
                  </div>
                </div>

                {/* ── Main Content: Bento Grid or Editorial List ── */}
                <AnimatePresence mode="wait">
                  {viewMode === "grid" ? (
                    /* ── BENTO 2.0 SHOWCASE GRID ── */
                    <motion.div
                      key={`grid-${selectedCategory}`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-1 md:grid-cols-2 3xl:grid-cols-3 gap-6 sm:gap-8 3xl:gap-10"
                    >
                      {filteredProjects.map((project, idx) => (
                        <div
                          key={project.id}
                          data-testid="project-card"
                          onClick={() => handleOpenProject(project)}
                          className={`group cursor-pointer flex flex-col justify-between space-y-5 transition-all duration-300 ease-out hover:scale-[1.018] hover:-translate-y-1 ${
                            idx === 0 && filteredProjects.length % 2 !== 0 ? "md:col-span-2 3xl:col-span-1" : ""
                          }`}
                        >
                          <div className="space-y-4">
                            {/* Clean Modern Browser Mockup Frame (Direct, No Outer Card) */}
                            <div className="rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--surface-card)]/40 hover:border-[var(--accent)]/50 transition-all duration-300 shadow-sm hover:shadow-xl">
                              {/* Chrome Bar */}
                              <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-subtle)] bg-[var(--surface-card)]/80">
                                <div className="flex items-center gap-1.5">
                                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                                  <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                                </div>
                                <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--text-secondary)]">
                                  <Lock size={10} weight="fill" className="text-emerald-500" />
                                  <span className="truncate max-w-[160px] sm:max-w-[220px]">
                                    {project.liveUrl ? project.liveUrl.replace(/^https?:\/\//, '') : project.category}
                                  </span>
                                </div>
                                <span className="text-xs font-mono text-[var(--text-secondary)]">
                                  {project.timeline}
                                </span>
                              </div>

                              {/* Project Preview Image */}
                              <div className="relative w-full aspect-[16/10] overflow-hidden bg-[var(--bg-main)]">
                                <Image
                                  src={project.image}
                                  alt={project.title}
                                  fill
                                  priority={idx === 0}
                                  loading={idx <= 1 ? "eager" : "lazy"}
                                  sizes="(max-width: 768px) 100vw, 600px"
                                  className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                                  <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-white text-xs font-mono flex items-center gap-1.5 border border-white/20">
                                    <Eye size={12} weight="bold" />
                                    <span>{t.works.deepDiveCTA}</span>
                                  </span>

                                  {project.liveUrl && (
                                    <a
                                      href={project.liveUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={(e) => e.stopPropagation()}
                                      className="px-3 py-1 rounded-full bg-[var(--accent)] text-[var(--accent-fg)] text-xs font-mono font-semibold flex items-center gap-1 shadow-lg hover:opacity-90 transition-opacity"
                                    >
                                      <Globe size={12} weight="bold" />
                                      <span>{t.works.openLiveCTA}</span>
                                      <ArrowUpRight size={12} weight="bold" />
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Title & Quick Action Icons Only (Clean & Minimalist) */}
                            <div className="flex items-center justify-between gap-3 pt-2 text-left">
                              <div className="space-y-0.5 min-w-0">
                                <h3 className="text-base sm:text-lg 3xl:text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all duration-300 leading-snug line-clamp-1 font-display">
                                  {project.title}
                                </h3>
                                <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)]">
                                  <span>{project.category}</span>
                                  <span>•</span>
                                  <span>{project.timeline}</span>
                                </div>
                              </div>

                              {/* Only Quick Action Icons */}
                              <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                                {project.liveUrl && (
                                  <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl bg-[var(--surface-card)] hover:bg-[var(--accent)] hover:text-[var(--accent-fg)] border border-[var(--border-subtle)] text-[var(--text-primary)] transition-all shadow-sm active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                                    title="Buka Website Live"
                                    aria-label={`Buka Website Live ${project.title}`}
                                  >
                                    <Globe size={18} weight="bold" />
                                  </a>
                                )}

                                {project.githubUrl && (
                                  <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl bg-[var(--surface-card)] hover:bg-[var(--surface-card-hover)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all shadow-sm active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                                    title="Source Code GitHub"
                                    aria-label={`Source Code GitHub ${project.title}`}
                                  >
                                    <GithubLogo size={18} weight="fill" />
                                  </a>
                                )}

                                <button
                                  type="button"
                                  onClick={() => handleOpenProject(project)}
                                  className="w-10 h-10 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl bg-[var(--surface-card)] hover:bg-[var(--surface-card-hover)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-all shadow-sm active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                                  title="Lihat Detail Proyek & Studi Kasus"
                                  aria-label={`Lihat Detail Proyek ${project.title}`}
                                >
                                  <ArrowUpRight size={18} weight="bold" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  ) : (
                    /* ── EDITORIAL MINIMALIST LIST VIEW ── */
                    <motion.div
                      key={`list-${selectedCategory}`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.3 }}
                      className="divide-y divide-[var(--border-subtle)]"
                    >
                      {filteredProjects.map((project) => (
                        <div
                          key={project.id}
                          onMouseEnter={() => setActiveImage(project.image)}
                          onMouseLeave={() => setActiveImage(null)}
                          onClick={() => handleOpenProject(project)}
                          className="project-row-item group relative flex flex-col md:flex-row md:items-center justify-between py-6 sm:py-8 transition-all duration-300 ease-out hover:scale-[1.018] origin-left hover:px-4 sm:hover:px-6 hover:bg-[var(--surface-card-hover)] hover:shadow-lg rounded-2xl cursor-pointer"
                        >
                          <div className="space-y-2 max-w-2xl text-left">
                            <div className="flex items-center gap-2 pb-1">
                              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--accent)] bg-[var(--surface-card)] px-3 py-1 rounded-full border border-[var(--border-subtle)] shadow-xs">
                                {project.category}
                              </span>
                              <span className="text-xs font-mono text-[var(--text-secondary)]">
                                {project.timeline}
                              </span>
                            </div>

                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tight text-[var(--text-primary)] transition-all duration-300 group-hover:text-[var(--accent)] group-hover:translate-x-1.5 font-display">
                              {project.title}
                            </h3>

                            {/* Mobile preview image strip */}
                            <div className="md:hidden relative w-full h-44 sm:h-52 rounded-xl overflow-hidden my-2.5 border border-[var(--border-subtle)] bg-[var(--bg-main)]">
                              <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 400px"
                                className="object-cover object-top"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                              <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white text-xs font-mono flex items-center gap-1.5 border border-white/10">
                                <Eye size={12} weight="bold" />
                                <span>View Case Study</span>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              {project.techStack.map((tech, i) => (
                                <span key={i} className="text-xs font-mono text-[var(--text-secondary)]">
                                  #{tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="hidden md:flex items-center gap-2 text-sm font-mono text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors shrink-0">
                            <span>Read Case Study</span>
                            <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Floating Hover Preview Box for List View */}
        <AnimatePresence>
          {activeImage && viewMode === "list" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-none fixed top-1/2 right-20 3xl:right-32 z-50 h-64 w-96 3xl:h-80 3xl:w-[480px] -translate-y-1/2 overflow-hidden rounded-2xl shadow-2xl hidden lg:block border border-[var(--border-subtle)] bg-[var(--bg-main)]"
            >
              <Image
                src={activeImage}
                alt="Project preview"
                fill
                sizes="384px"
                className="object-cover object-top"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Cinematic Yellow Curtain Page Transition */}
      <YellowCurtainTransition
        isActive={curtainActive}
        project={curtainProject}
      />

      {/* Fullscreen Case Study Deep Dive Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            data-lenis-prevent="true"
            className="fixed inset-0 z-[999] h-screen h-[100dvh] overflow-y-auto overflow-x-hidden bg-[var(--bg-main)] overscroll-contain"
          >
            <ProjectDeepDive
              project={selectedProject}
              onBack={handleCloseProject}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
