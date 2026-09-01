"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Sparkle, Cpu, Layout, Database, Wrench, SquaresFour, ArrowLeft, ArrowRight, CheckCircle, Compass } from "@phosphor-icons/react";
import FadeBlurIn from "@/components/reactbits/FadeBlurIn";
import StrokeText from "@/components/reactbits/StrokeText";
import gsap from "gsap";
import { soundFx } from "@/lib/audio-fx";
import {
  NextjsLogo,
  ReactLogo,
  TypeScriptLogo,
  JavaScriptLogo,
  TailwindLogo,
  LaravelLogo,
  BladeLogo,
  FigmaLogo,
  PHPLogo,
  SupabaseLogo,
  MySQLLogo,
  GitLogo,
  ViteLogo,
  PostmanLogo,
  HTML5Logo,
  CSS3Logo,
  DesignSystemsLogo,
  PrototypingLogo,
  ResponsiveUILogo,
  RestApiLogo,
  CursorAILogo,
  NodejsLogo,
} from "@/components/icons/TechBrandLogos";

type CategoryId = "all" | "frontend" | "design" | "backend" | "tools";

interface TechItem {
  name: string;
  category: CategoryId;
  categoryLabel: string;
  icon: React.ReactNode;
}

const techItems: TechItem[] = [
  // Frontend
  { name: "Next.js 16", category: "frontend", categoryLabel: "Core Framework", icon: <NextjsLogo size={24} /> },
  { name: "React 19", category: "frontend", categoryLabel: "UI Library", icon: <ReactLogo size={24} /> },
  { name: "TypeScript", category: "frontend", categoryLabel: "Type Safety", icon: <TypeScriptLogo size={22} className="rounded-md" /> },
  { name: "JavaScript (ES6+)", category: "frontend", categoryLabel: "Language", icon: <JavaScriptLogo size={22} className="rounded-md" /> },
  { name: "Tailwind CSS", category: "frontend", categoryLabel: "Styling Engine", icon: <TailwindLogo size={24} /> },
  { name: "HTML5", category: "frontend", categoryLabel: "Semantic Markup", icon: <HTML5Logo size={22} /> },
  { name: "CSS3 & PostCSS", category: "frontend", categoryLabel: "Responsive Layout", icon: <CSS3Logo size={22} /> },

  // Design
  { name: "Figma", category: "design", categoryLabel: "UI/UX Design", icon: <FigmaLogo size={22} /> },
  { name: "Design Systems", category: "design", categoryLabel: "Design Tokens", icon: <DesignSystemsLogo size={22} /> },
  { name: "Interactive Prototyping", category: "design", categoryLabel: "Motion & UX", icon: <PrototypingLogo size={22} /> },
  { name: "Responsive UI", category: "design", categoryLabel: "Adaptive Viewports", icon: <ResponsiveUILogo size={22} /> },

  // Backend
  { name: "Laravel 11", category: "backend", categoryLabel: "Backend API", icon: <LaravelLogo size={24} /> },
  { name: "Blade Templating", category: "backend", categoryLabel: "Server Rendering", icon: <BladeLogo size={22} /> },
  { name: "PHP Ecosystem", category: "backend", categoryLabel: "Server Architecture", icon: <PHPLogo size={22} /> },
  { name: "MySQL", category: "backend", categoryLabel: "Relational DB", icon: <MySQLLogo size={22} /> },
  { name: "Supabase Realtime", category: "backend", categoryLabel: "BaaS & Auth", icon: <SupabaseLogo size={22} /> },
  { name: "RESTful APIs", category: "backend", categoryLabel: "API Integration", icon: <RestApiLogo size={22} /> },

  // Tools & Workflow
  { name: "Git & GitHub", category: "tools", categoryLabel: "Version Control", icon: <GitLogo size={22} /> },
  { name: "Vite Bundler", category: "tools", categoryLabel: "Build Tooling", icon: <ViteLogo size={22} /> },
  { name: "Postman", category: "tools", categoryLabel: "API Testing", icon: <PostmanLogo size={22} /> },
  { name: "Cursor / AI Dev", category: "tools", categoryLabel: "AI Engineering", icon: <CursorAILogo size={22} /> },
  { name: "NPM & Node.js", category: "tools", categoryLabel: "Package Manager", icon: <NodejsLogo size={22} /> },
];

const categoryPills: { id: CategoryId; label: string; count: number; icon: React.ReactNode; desc: string; focus: string }[] = [
  { id: "all", label: "All Arsenal", count: techItems.length, icon: <SquaresFour size={16} weight="bold" />, desc: "Complete production-ready frontend, design, backend, and AI toolchain verified across enterprise deployments.", focus: "Full-Stack & Architecture" },
  { id: "frontend", label: "Frontend Core", count: techItems.filter((i) => i.category === "frontend").length, icon: <Cpu size={16} weight="bold" />, desc: "Modern React 19 & Next.js 16 architectures with type-safe styling engines and high-framerate rendering.", focus: "Client Architecture & Motion" },
  { id: "design", label: "UI/UX & Systems", count: techItems.filter((i) => i.category === "design").length, icon: <Layout size={16} weight="bold" />, desc: "Figma component systems, fluid layout viewports, design tokens, and kinetic interactive prototyping.", focus: "Design Systems & Tokens" },
  { id: "backend", label: "Backend & DB", count: techItems.filter((i) => i.category === "backend").length, icon: <Database size={16} weight="bold" />, desc: "Robust Laravel 11 APIs, Supabase real-time infrastructure, and relational SQL database architectures.", focus: "Server & REST API" },
  { id: "tools", label: "Tools & AI", count: techItems.filter((i) => i.category === "tools").length, icon: <Wrench size={16} weight="bold" />, desc: "High-speed Vite bundling, Git version control, Postman API testing, and AI-accelerated dev workflow.", focus: "Workflow Automation" },
];

export default function TechArsenal() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const outerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const innerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isAnimatingRef = useRef<boolean>(false);
  const currentIndexRef = useRef<number>(0);

  // ── GSAP Dual-Wrapper Parallax Curtain Animation ─────────────────────────────
  const gotoCategory = useCallback((targetIndex: number, direction?: number) => {
    if (isAnimatingRef.current) return;
    if (targetIndex === currentIndexRef.current) return;

    const fromIndex = currentIndexRef.current;
    const count = categoryPills.length;
    const nextIdx = gsap.utils.wrap(0, count, targetIndex);

    // Determine motion direction
    const dir = direction !== undefined ? direction : nextIdx > fromIndex ? 1 : -1;
    const dFactor = dir === -1 ? -1 : 1;

    isAnimatingRef.current = true;
    setActiveIndex(nextIdx);

    const prevSection = sectionsRef.current[fromIndex];
    const nextSection = sectionsRef.current[nextIdx];
    const prevBg = bgRefs.current[fromIndex];
    const nextOuter = outerRefs.current[nextIdx];
    const nextInner = innerRefs.current[nextIdx];
    const nextBg = bgRefs.current[nextIdx];
    const nextCards = nextSection ? nextSection.querySelectorAll(".tech-card-item") : null;

    if (!prevSection || !nextSection || !nextOuter || !nextInner || !nextBg) {
      isAnimatingRef.current = false;
      currentIndexRef.current = nextIdx;
      return;
    }

    const tl = gsap.timeline({
      defaults: { duration: 0.85, ease: "power2.inOut" },
      onComplete: () => {
        gsap.set(prevSection, { autoAlpha: 0, zIndex: 0 });
        isAnimatingRef.current = false;
        currentIndexRef.current = nextIdx;
      },
    });

    // 1. Send previous section back & slide its background with parallax
    gsap.set(prevSection, { zIndex: 0 });
    if (prevBg) {
      tl.to(prevBg, { yPercent: -18 * dFactor, duration: 0.85 }, 0);
    }

    // 2. Bring next section forward
    gsap.set(nextSection, { autoAlpha: 1, zIndex: 2 });

    // 3. Counter-moving dual wrappers (GSAP split curtain wipe)
    tl.fromTo(
      [nextOuter, nextInner],
      { yPercent: (i) => (i === 0 ? 100 * dFactor : -100 * dFactor) },
      { yPercent: 0, duration: 0.85, ease: "power2.inOut" },
      0
    );

    // 4. Parallax background counter-shift
    tl.fromTo(nextBg, { yPercent: 18 * dFactor }, { yPercent: 0, duration: 0.85, ease: "power2.inOut" }, 0);

    // 5. Staggered card emergence
    if (nextCards && nextCards.length > 0) {
      tl.fromTo(
        nextCards,
        { autoAlpha: 0, y: 30 * dFactor, scale: 0.95 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.55,
          ease: "power2.out",
          stagger: {
            each: 0.025,
            from: "start",
          },
        },
        0.25
      );
    }
  }, []);

  // Initialize GSAP initial state
  useEffect(() => {
    const ctx = gsap.context(() => {
      sectionsRef.current.forEach((sec, idx) => {
        if (!sec) return;
        if (idx === 0) {
          gsap.set(sec, { autoAlpha: 1, zIndex: 1 });
          if (outerRefs.current[idx]) gsap.set(outerRefs.current[idx], { yPercent: 0 });
          if (innerRefs.current[idx]) gsap.set(innerRefs.current[idx], { yPercent: 0 });
          if (bgRefs.current[idx]) gsap.set(bgRefs.current[idx], { yPercent: 0 });
        } else {
          gsap.set(sec, { autoAlpha: 0, zIndex: 0 });
          if (outerRefs.current[idx]) gsap.set(outerRefs.current[idx], { yPercent: 100 });
          if (innerRefs.current[idx]) gsap.set(innerRefs.current[idx], { yPercent: -100 });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handlePrev = () => gotoCategory(activeIndex - 1, -1);
  const handleNext = () => gotoCategory(activeIndex + 1, 1);

  const handleTechClick = (techName: string) => {
    soundFx.playClick();
    const worksEl = document.getElementById("works");
    if (worksEl) {
      worksEl.scrollIntoView({ behavior: "smooth" });
    }
    window.dispatchEvent(new CustomEvent("filter-works-by-tech", { detail: { tech: techName } }));
  };

  return (
    <section
      id="skills"
      className="w-full bg-[var(--bg-main)] py-20 sm:py-24 px-4 sm:px-6 md:px-16 border-t border-[var(--border-subtle)] transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto space-y-8 sm:space-y-10">
        {/* ── Section Header ── */}
        <FadeBlurIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6">
            <div className="space-y-2.5 sm:space-y-3 text-left">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--accent)]">
                <Sparkle size={14} weight="fill" />
                <span>Capabilities &amp; Tech Arsenal</span>
              </div>
              {/* Mobile View: Dynamic Kinetic StrokeText */}
              <div className="sm:hidden w-full max-w-full">
                <StrokeText
                  text="Technology Arsenal."
                  strokeColor="var(--text-primary)"
                  fillColor="var(--text-primary)"
                  strokeWidth={1.0}
                  drawDuration={1.2}
                  fillDelay={0.12}
                  stagger={0.03}
                  ease="power2.out"
                  trigger="scroll"
                  fillMode="wipe"
                  fontSize={32}
                  fontWeight={700}
                  letterSpacing={-1}
                />
              </div>

              {/* Desktop View: Standard Display Typography */}
              <h2 className="hidden sm:block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)]">
                Technology Arsenal<span className="text-[#FACC15]">.</span>
              </h2>
            </div>

            {/* Top Navigation & Status Controls */}
            <div className="flex items-center justify-between sm:justify-start gap-3 w-full sm:w-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[var(--surface-card)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-secondary)] shadow-sm">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>
                  <strong className="text-[var(--text-primary)] font-bold">{techItems.length}</strong> Technologies
                </span>
              </div>

              {/* Prev / Next Category Slide Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrev}
                  className="p-2 sm:p-2.5 rounded-xl bg-[var(--surface-card)] hover:bg-[var(--surface-card-hover)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer shadow-sm active:scale-95"
                  title="Previous Category"
                  aria-label="Previous Category"
                >
                  <ArrowLeft size={16} weight="bold" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 sm:p-2.5 rounded-xl bg-[var(--surface-card)] hover:bg-[var(--surface-card-hover)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer shadow-sm active:scale-95"
                  title="Next Category"
                  aria-label="Next Category"
                >
                  <ArrowRight size={16} weight="bold" />
                </button>
              </div>
            </div>
          </div>
        </FadeBlurIn>

        {/* ── Mobile Horizontal Pill Switcher (< lg) ── */}
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categoryPills.map((pill, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={pill.id}
                onClick={() => gotoCategory(idx)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? "bg-[var(--text-primary)] text-[var(--bg-main)] shadow-md font-semibold"
                    : "bg-[var(--surface-card)] text-[var(--text-secondary)] border border-[var(--border-subtle)]"
                }`}
              >
                <span>{pill.icon}</span>
                <span>{pill.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive
                      ? "bg-[var(--bg-main)] text-[var(--text-primary)]"
                      : "bg-[var(--bg-main)] text-[var(--text-secondary)]"
                  }`}
                >
                  {pill.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Symmetrical Matching Dual-Card Grid (Left: Sidebar Box | Right: Curtain Box) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* ── Left Box: Unified Sidebar Container (4 cols, desktop only for clean vertical ergonomics) ── */}
          <div className="hidden lg:flex lg:col-span-4 h-full rounded-3xl bg-[var(--surface-card)]/50 border border-[var(--border-subtle)] p-4 sm:p-5 shadow-inner flex-col justify-between space-y-4 text-left">
            <div className="space-y-3">
              {/* Box Header */}
              <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
                <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-bold flex items-center gap-1.5">
                  <Compass size={14} weight="bold" />
                  <span>Domain Category</span>
                </span>
                <span className="text-[11px] font-mono text-[var(--text-secondary)] font-semibold">
                  {categoryPills.length} Domains
                </span>
              </div>

              {/* Vertical Category Tab Buttons */}
              <div className="space-y-2 flex flex-col">
                {categoryPills.map((pill, idx) => {
                  const isActive = activeIndex === idx;
                  return (
                    <button
                      key={pill.id}
                      onClick={() => gotoCategory(idx)}
                      className={`w-full flex items-center justify-between p-3 sm:p-3.5 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                        isActive
                          ? "bg-[var(--text-primary)] text-[var(--bg-main)] border-transparent shadow-md font-semibold scale-[1.01]"
                          : "bg-[var(--bg-main)] hover:bg-[var(--surface-card-hover)] text-[var(--text-primary)] border-[var(--border-subtle)] hover:border-[var(--accent)]/30 shadow-sm"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={`p-1.5 rounded-xl transition-colors shrink-0 ${
                            isActive
                              ? "bg-[var(--bg-main)] text-[var(--text-primary)]"
                              : "bg-[var(--surface-card)] text-[var(--text-secondary)]"
                          }`}
                        >
                          {pill.icon}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm font-bold tracking-tight truncate">{pill.label}</p>
                          <p
                            className={`text-[10px] font-mono truncate ${
                              isActive ? "text-[var(--bg-main)]/80" : "text-[var(--text-secondary)]"
                            }`}
                          >
                            {pill.focus}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`text-[11px] font-mono px-2 py-0.5 rounded-full font-bold shrink-0 ml-1.5 ${
                          isActive
                            ? "bg-[var(--bg-main)] text-[var(--text-primary)]"
                            : "bg-[var(--surface-card)] text-[var(--text-secondary)] border border-[var(--border-subtle)]"
                        }`}
                      >
                        {pill.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Domain Focus Summary HUD */}
            <div className="p-4 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-subtle)] space-y-2 shadow-sm mt-auto">
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent)] uppercase font-bold tracking-wider">
                <CheckCircle size={14} weight="fill" />
                <span>Active Domain Focus</span>
              </div>
              <p className="text-xs sm:text-[13px] font-mono text-[var(--text-secondary)] leading-relaxed">
                {categoryPills[activeIndex]?.desc}
              </p>
            </div>
          </div>

          {/* ── Right Box: GSAP Parallax Curtain Canvas Stage (12 cols mobile, 8 cols desktop) ── */}
          <div
            ref={containerRef}
            className="w-full lg:col-span-8 h-full relative min-h-[460px] sm:min-h-[440px] lg:min-h-[500px] rounded-3xl overflow-hidden bg-[var(--surface-card)]/50 border border-[var(--border-subtle)] p-3 sm:p-4 lg:p-5 shadow-inner flex flex-col justify-center"
          >
            {categoryPills.map((cat, catIdx) => {
              const items =
                cat.id === "all" ? techItems : techItems.filter((i) => i.category === cat.id);

              return (
                <div
                  key={cat.id}
                  ref={(el) => { sectionsRef.current[catIdx] = el; }}
                  className="tech-section absolute inset-0 w-full h-full"
                  style={{ visibility: catIdx === 0 ? "visible" : "hidden" }}
                >
                  {/* Outer Wrapper (Moves down/up) */}
                  <div
                    ref={(el) => { outerRefs.current[catIdx] = el; }}
                    className="tech-outer w-full h-full overflow-hidden"
                  >
                    {/* Inner Wrapper (Counter-moves in opposite direction) */}
                    <div
                      ref={(el) => { innerRefs.current[catIdx] = el; }}
                      className="tech-inner w-full h-full overflow-hidden flex flex-col justify-center"
                    >
                      {/* Parallax Content Canvas */}
                      <div
                        ref={(el) => { bgRefs.current[catIdx] = el; }}
                        className="tech-bg w-full h-full p-2.5 sm:p-4 lg:p-5 flex flex-col justify-center"
                      >
                        {/* Responsive Grid of Cards (1 col small phone, 2 cols tablet, 3 cols desktop) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3.5 lg:gap-4">
                          {items.map((item) => (
                            <div
                              key={item.name}
                              data-testid={`tech-card-${item.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                              onClick={() => handleTechClick(item.name)}
                              title={`Lihat proyek yang menggunakan ${item.name}`}
                              className="tech-card-item group relative p-3 sm:p-3.5 lg:p-4 rounded-2xl border border-[var(--border-subtle)] hover:border-[var(--accent)]/50 bg-[var(--surface-card)] hover:bg-[var(--surface-card-hover)] transition-all duration-300 flex items-center justify-between gap-3 shadow-sm hover:shadow-md cursor-pointer select-none active:scale-[0.98]"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                {/* High-Contrast Solid Black Brand Logo Tile */}
                                <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#0D0F14] border border-black/20 dark:border-white/10 flex items-center justify-center shadow-sm group-hover:scale-105 group-hover:border-[var(--accent)]/50 transition-all duration-300">
                                  {item.icon}
                                </div>

                                {/* Title & Category Subtitle */}
                                <div className="min-w-0">
                                  <h4 className="text-xs sm:text-sm font-bold text-[var(--text-primary)] tracking-tight font-mono truncate group-hover:text-[var(--accent)] transition-colors">
                                    {item.name}
                                  </h4>
                                  <p className="text-[10px] sm:text-[11px] font-mono text-[var(--text-secondary)] truncate">
                                    {item.categoryLabel}
                                  </p>
                                </div>
                              </div>

                              {/* Active indicator dot */}
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 group-hover:bg-emerald-400 group-hover:scale-125 transition-all shrink-0" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Bottom Section HUD Footer ── */}
        <FadeBlurIn delay={0.2}>
          <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[var(--text-secondary)] gap-2.5 sm:gap-3 text-center sm:text-left">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              <span>
                Active Category: <strong className="text-[var(--text-primary)]">{categoryPills[activeIndex].label}</strong> ({categoryPills[activeIndex].count} tools)
              </span>
            </span>
            <span className="text-[var(--accent)] font-semibold flex items-center gap-1.5">
              <Sparkle size={13} weight="fill" />
              <span>GSAP Dual-Parallax Curtain Engine</span>
            </span>
          </div>
        </FadeBlurIn>
      </div>
    </section>
  );
}
