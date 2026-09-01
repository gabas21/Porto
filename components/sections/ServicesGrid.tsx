"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Code,
  Cube,
  Layout,
  PlugsConnected,
  CheckCircle,
  ArrowUpRight,
  Sparkle,
  CaretRight,
  ChatCircleText,
} from "@phosphor-icons/react";
import FadeBlurIn from "@/components/reactbits/FadeBlurIn";
import { soundFx } from "@/lib/audio-fx";

interface ServicePillar {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: typeof Code;
  accentColor: string;
  deliverables: string[];
  technologies: string[];
  highlight: string;
}

const services: ServicePillar[] = [
  {
    number: "01",
    title: "Frontend Web Architecture",
    subtitle: "Enterprise Next.js, React 19 & Strict TypeScript",
    description:
      "Membangun arsitektur frontend berskala produksi dengan performa optimal, struktur atomic modular, type safety menyeluruh, dan skor Lighthouse 95+.",
    icon: Code,
    accentColor: "#EAB308",
    deliverables: [
      "Atomic Component Architecture",
      "SSR / SSG / ISR Hybrid Rendering",
      "Lighthouse 95+ Performance & Core Web Vitals",
      "Strict End-to-End Type Safety",
    ],
    technologies: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Turbopack"],
    highlight: "Skalabilitas & Kecepatan",
  },
  {
    number: "02",
    title: "Creative & 3D WebGL Interactions",
    subtitle: "Three.js, Rapier Physics & Kinetic GSAP Motion",
    description:
      "Mentransformasikan halaman web statis menjadi pengalaman 3D interaktif yang hidup dengan simulasi fisika hardware-accelerated, custom shaders, dan koreografi scroll halus.",
    icon: Cube,
    accentColor: "#0284C7",
    deliverables: [
      "3D Physics & RigidBody Simulation",
      "Custom GLSL Shader & MeshLine Effects",
      "GSAP ScrollTrigger Pinned Choreography",
      "GPU-Accelerated 60fps Motion Dynamics",
    ],
    technologies: ["Three.js", "R3F (@react-three/fiber)", "Rapier.js", "GSAP", "Motion"],
    highlight: "Imersif & Visual Wow",
  },
  {
    number: "03",
    title: "High-Conversion UI/UX Engineering",
    subtitle: "Design Systems, Micro-Interactions & WCAG A11y",
    description:
      "Menjembatani presisi desain Figma menjadi kode antarmuka responsif dengan umpan balik taktil (haptic feel), transisi tema mulus, dan standar aksesibilitas inklusif.",
    icon: Layout,
    accentColor: "#16A34A",
    deliverables: [
      "Design Token Systems & UI Libraries",
      "Haptic & Micro-Delight Audio-Visual FX",
      "View Transitions API & Seamless Theming",
      "WCAG AA Compliant & Mobile-First Layouts",
    ],
    technologies: ["Design Systems", "Radix UI", "Phosphor Icons", "Figma-to-Code", "Web Audio"],
    highlight: "Taktil & Konversi Tinggi",
  },
  {
    number: "04",
    title: "API Integration & State Architecture",
    subtitle: "RESTful APIs, WebSockets & Resilient Data Flow",
    description:
      "Merancang alur data klien yang tangguh, caching pintar, sinkronisasi event real-time, dan optimistic UI updates tanpa layout thrashing atau glitching.",
    icon: PlugsConnected,
    accentColor: "#DB2777",
    deliverables: [
      "Optimistic UI & Smart Server Caching",
      "Real-time WebSockets & Event Streaming",
      "Global State Management (Zustand / Context)",
      "Resilient Error Boundaries & Fallbacks",
    ],
    technologies: ["TanStack Query", "Zustand", "WebSockets / SSE", "REST APIs", "Web Workers"],
    highlight: "Real-Time & Andal",
  },
];

export default function ServicesGrid() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeService = services[activeIdx];
  const ActiveIcon = activeService.icon;

  const handleSelectService = (idx: number, isHover = false) => {
    if (idx !== activeIdx) {
      if (isHover) {
        soundFx.playHover();
      } else {
        soundFx.playClick();
      }
      setActiveIdx(idx);
    }
  };

  return (
    <section
      id="services"
      className="relative w-full bg-[var(--bg-main)] py-16 sm:py-24 md:py-28 px-4 sm:px-6 md:px-12 max-w-[1240px] mx-auto overflow-hidden text-left transition-colors duration-300"
    >
      {/* Section Header */}
      <FadeBlurIn className="max-w-3xl space-y-3 mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-card)] border border-[var(--border-subtle)] text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-semibold shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
          What I Bring to the Table
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.12] font-display">
          Crafting High-Performance{" "}
          <span className="text-[var(--accent)] font-serif italic font-normal">Digital Experiences</span> with Substance.
        </h2>

        <p className="text-xs sm:text-sm md:text-base text-[var(--text-secondary)] font-mono leading-relaxed max-w-[65ch]">
          Semua pilar layanan arsitektur frontend dalam satu tampilan terpadu &mdash; arahkan kursor atau klik untuk menjelajahi kapabilitas teknis.
        </p>
      </FadeBlurIn>

      {/* ── Option 1: Interactive Split-Tabs Layout (Zero-Scroll Showcase) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        
        {/* LEFT: 4 Service Selector Tabs (Full Visibility in 1 Viewport) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-2.5 sm:gap-3">
          {services.map((service, idx) => {
            const isSelected = activeIdx === idx;
            const Icon = service.icon;

            return (
              <button
                key={service.number}
                type="button"
                onClick={() => handleSelectService(idx, false)}
                onMouseEnter={() => handleSelectService(idx, true)}
                className={`group relative text-left w-full p-4 sm:p-4.5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between gap-3 select-none ${
                  isSelected
                    ? "bg-[var(--surface-card-hover)] border-[var(--border-hover)] shadow-lg shadow-black/5"
                    : "bg-[var(--surface-card)]/70 border-[var(--border-subtle)] hover:bg-[var(--surface-card)] hover:border-[var(--border-subtle)]/80"
                }`}
              >
                {/* Active Indicator Strip on Left */}
                {isSelected && (
                  <motion.div
                    layoutId="activeServiceIndicator"
                    className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full"
                    style={{ backgroundColor: service.accentColor }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}

                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Service Number Badge */}
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-transform duration-300 ${
                      isSelected
                        ? "scale-105 shadow-sm text-black"
                        : "bg-[var(--surface-card-hover)] text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]"
                    }`}
                    style={{
                      backgroundColor: isSelected ? service.accentColor : undefined,
                    }}
                  >
                    <Icon size={18} weight={isSelected ? "bold" : "duotone"} />
                  </div>

                  {/* Title & Highlight */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-[var(--accent)]">
                        // {service.number}
                      </span>
                      <span className="text-[10px] font-mono text-[var(--text-secondary)] opacity-60">•</span>
                      <span className="text-[10px] font-mono text-[var(--text-secondary)] truncate">
                        {service.highlight}
                      </span>
                    </div>

                    <h4
                      className={`text-sm sm:text-base font-bold tracking-tight truncate transition-colors duration-200 ${
                        isSelected
                          ? "text-[var(--text-primary)] font-display"
                          : "text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]"
                      }`}
                    >
                      {service.title}
                    </h4>
                  </div>
                </div>

                {/* Right Caret Indicator */}
                <div
                  className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isSelected
                      ? "bg-[var(--surface-card)] text-[var(--text-primary)] translate-x-0.5"
                      : "opacity-0 group-hover:opacity-60 -translate-x-1 group-hover:translate-x-0"
                  }`}
                >
                  <CaretRight size={14} weight="bold" />
                </div>
              </button>
            );
          })}
        </div>

        {/* RIGHT: Dynamic Spotlight Stage (Instant Detailed Showcase) */}
        <div className="lg:col-span-7 relative min-h-[420px] sm:min-h-[460px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.number}
              initial={{ opacity: 0, y: 10, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.985 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="relative h-full rounded-[2rem] p-2 sm:p-2.5 bg-[var(--surface-card-hover)] border border-[var(--border-subtle)] shadow-xl shadow-black/10 flex flex-col"
            >
              {/* Subtle Radial Gradient Flare matching Active Accent */}
              <div
                className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-30"
                style={{
                  background: `radial-gradient(500px circle at 80% 20%, ${activeService.accentColor}25, transparent 70%)`,
                }}
              />

              {/* Inner Detail Container */}
              <div className="relative flex flex-col justify-between h-full rounded-[calc(2rem-0.625rem)] bg-[var(--surface-card)] p-6 sm:p-8 border border-[var(--border-subtle)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
                
                {/* Stage Header */}
                <div>
                  <div className="flex items-center justify-between gap-4 pb-5 border-b border-[var(--border-subtle)]">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold text-[var(--accent)] tracking-widest">
                        CAPABILITY STAGE // {activeService.number}
                      </span>
                      <span className="h-3 w-px bg-[var(--border-subtle)]" />
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[var(--surface-card-hover)] border border-[var(--border-subtle)] text-[var(--text-secondary)] font-semibold">
                        <Sparkle size={11} style={{ color: activeService.accentColor }} weight="fill" />
                        {activeService.highlight}
                      </span>
                    </div>

                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm border border-[var(--border-subtle)]"
                      style={{
                        backgroundColor: `${activeService.accentColor}18`,
                        color: activeService.accentColor,
                      }}
                    >
                      <ActiveIcon size={20} weight="duotone" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="mt-5 space-y-1.5">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[var(--text-primary)] font-display">
                      {activeService.title}
                    </h3>
                    <p
                      className="text-xs sm:text-sm font-mono font-semibold"
                      style={{ color: activeService.accentColor }}
                    >
                      {activeService.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="mt-3.5 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
                    {activeService.description}
                  </p>

                  {/* Key Deliverables Grid (2-Columns for Compact Clarity) */}
                  <div className="mt-6 pt-5 border-t border-[var(--border-subtle)] space-y-3">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-secondary)] font-bold">
                      Key Deliverables &amp; Output:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {activeService.deliverables.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 p-2.5 rounded-xl bg-[var(--surface-card-hover)]/70 border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] font-medium leading-tight"
                        >
                          <CheckCircle
                            size={15}
                            className="mt-0.5 shrink-0"
                            style={{ color: activeService.accentColor }}
                            weight="fill"
                          />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Technologies + Quick Action */}
                <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-mono text-[var(--text-secondary)] uppercase tracking-wider mr-1">
                      Stack:
                    </span>
                    {activeService.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-[var(--surface-card-hover)] border border-[var(--border-subtle)] text-[var(--text-secondary)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <a
                    href="https://wa.me/6282159888947"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-semibold bg-[var(--surface-card-hover)] hover:bg-[var(--accent)] hover:text-black border border-[var(--border-subtle)] text-[var(--text-primary)] transition-all shadow-sm active:scale-95 cursor-pointer shrink-0"
                  >
                    <ChatCircleText size={14} weight="bold" />
                    <span>Diskusikan</span>
                  </a>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Bottom Collaboration Callout Strip */}
      <FadeBlurIn delay={0.3} className="mt-10 sm:mt-14">
        <div className="rounded-[1.75rem] p-6 sm:p-7 bg-[var(--surface-card)] border border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left shadow-sm transition-colors duration-300">
          <div className="space-y-1">
            <h4 className="text-sm sm:text-base font-bold text-[var(--text-primary)] font-display">
              Punya ide proyek atau kebutuhan pengembangan spesifik?
            </h4>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-mono">
              Tersedia untuk proyek freelance, full-time remote, maupun konsultasi arsitektur frontend.
            </p>
          </div>

          <a
            href="mailto:bagasa020@gmail.com"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-2.5 sm:py-3 rounded-full bg-[var(--accent)] text-black font-bold text-xs sm:text-sm hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
          >
            <span>Mulai Kolaborasi</span>
            <ArrowUpRight size={14} weight="bold" />
          </a>
        </div>
      </FadeBlurIn>
    </section>
  );
}

