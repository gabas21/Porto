"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { journeys } from "@/data/journey";
import { Clock, Briefcase, GraduationCap } from "@phosphor-icons/react";

// ─── Color Tokens (Clean Solid Line, Zero Glow) ────────────────────────────────
const LINE_COLOR = "#FACC15"; // Clean solid yellow

const ROW_H = 680;
const X_LEFT = 160;
const X_RIGHT = 1280;

/**
 * Pure Harmonic S-Curve Generator (Desktop Full-Width Viewport Geometry):
 * - STARTS flush at the absolute far-left edge of the screen (X = -40, Y = 80)
 * - Sweeps in clean sinusoidal harmonic S-curves around typography
 * - ENDS flush off the absolute edge of the screen (X = -40 or X = 1480)
 */
function buildHarmonicTimelinePath(count: number): { pathD: string; totalH: number } {
  let y = 180;

  // Starts off-screen left (X = -40) flush at the screen's leftmost pixel
  let d = `M -40 80 C 60 80, ${X_LEFT} 80, ${X_LEFT} ${y}`;

  for (let i = 0; i < count; i++) {
    const isEven = i % 2 === 0;
    const nextY = y + ROW_H;
    const midY = (y + nextY) / 2;

    if (isEven) {
      // Curve smoothly from LEFT (X_LEFT) to RIGHT (X_RIGHT)
      d += ` C ${X_LEFT} ${midY}, ${X_RIGHT} ${midY}, ${X_RIGHT} ${nextY}`;
    } else {
      // Curve smoothly from RIGHT (X_RIGHT) to LEFT (X_LEFT)
      d += ` C ${X_RIGHT} ${midY}, ${X_LEFT} ${midY}, ${X_LEFT} ${nextY}`;
    }

    y = nextY;
  }

  // Tail exits FLUSH off the screen edge (zero gap)
  const isLastLeft = count % 2 === 0;
  if (isLastLeft) {
    d += ` C ${X_LEFT} ${y + 100}, 60 ${y + 160}, -40 ${y + 160}`;
  } else {
    d += ` C ${X_RIGHT} ${y + 100}, 1380 ${y + 160}, 1480 ${y + 160}`;
  }

  const totalH = y + 220;
  return { pathD: d, totalH };
}

// ─── Single Experience Entry ──────────────────────────────────────────────────
interface EntryProps {
  item: (typeof journeys)[number];
  index: number;
  count: number;
  pathProgress: ReturnType<typeof useSpring>;
}

function ExperienceEntry({ item, index, count, pathProgress }: EntryProps) {
  const isRightSide = index % 2 !== 0;

  // Progressive scroll reveal driven by scroll progress
  const start = index / count;
  const end = (index + 0.45) / count;
  const opacity = useTransform(pathProgress, [start, end], [0, 1]);
  const y = useTransform(pathProgress, [start, end], [28, 0]);

  const isEdu = item.role.toLowerCase().includes("bachelor") || item.role.toLowerCase().includes("informatics");

  return (
    <div
      className={`relative w-full flex items-center min-h-0 md:min-h-[680px] ${
        isRightSide ? "md:justify-end" : "md:justify-start"
      }`}
    >
      {/* Mobile Node Dot on the left rail */}
      <div className="md:hidden absolute -left-[17px] top-8 z-20 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[var(--bg-main)] bg-[#FACC15] text-black shadow-md">
        {isEdu ? <GraduationCap size={12} weight="bold" /> : <Briefcase size={12} weight="bold" />}
      </div>

      <motion.div
        className={`w-full md:w-[50%] lg:w-[45%] py-6 md:py-8 z-10 pl-5 sm:pl-8 md:pl-0 ${
          isRightSide ? "md:text-left md:pl-12" : "md:text-left md:pr-12"
        }`}
        style={{ opacity, y }}
      >
        {/* Pure Clean Editorial Typography */}
        <div className="space-y-3 sm:space-y-4 pt-2 md:pt-14 text-left">
          {/* Main Organization / Title */}
          <h3 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.12]">
            {item.organization}
          </h3>

          {/* Role & Position */}
          <div className="text-base sm:text-lg md:text-2xl font-medium text-[var(--text-secondary)]">
            {item.role}
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm md:text-base text-[var(--text-secondary)]/85 font-normal leading-relaxed max-w-xl">
            {item.description}
          </p>

          {/* Key Deliverables & Highlights */}
          <ul className="space-y-2 pt-1 max-w-xl">
            {item.highlights.map((highlight, hIdx) => (
              <li
                key={hIdx}
                className="text-xs sm:text-sm text-[var(--text-primary)]/85 flex items-start gap-2.5 leading-relaxed"
              >
                <span className="text-[#FACC15] font-bold shrink-0 mt-0.5">›</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>

          {/* Date / Period in Monospace Accent */}
          <div className="pt-2">
            <span className="inline-block text-[11px] sm:text-xs font-mono tracking-wider text-[#FACC15] uppercase font-semibold bg-[#FACC15]/10 border border-[#FACC15]/20 px-3 py-1 rounded-full">
              {item.period} &bull; {item.location}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main Section Component ───────────────────────────────────────────────────
export default function ExperienceTimeline() {
  const sectionRef = useRef<HTMLElement>(null);

  const count = journeys.length;
  const { pathD, totalH } = buildHarmonicTimelinePath(count);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end center"],
  });

  const pathProgress = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 20,
    restDelta: 0.001,
  });

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative w-full bg-[var(--bg-main)] text-[var(--text-primary)] overflow-x-hidden transition-colors duration-300"
    >
      {/* ── Timeline Body & Harmonic S-Curve Container ── */}
      <div className="relative w-full">
        {/* Desktop Full-Width SVG S-Curve Layer */}
        <div className="hidden md:block absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
          <svg
            viewBox={`0 0 1440 ${totalH}`}
            preserveAspectRatio="none"
            className="w-full h-full overflow-visible"
            fill="none"
          >
            {/* Solid Clean Main Stroke */}
            <motion.path
              d={pathD}
              stroke={LINE_COLOR}
              strokeWidth="18"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              style={{
                pathLength: pathProgress,
              }}
            />
          </svg>
        </div>

        {/* Center Subtle Vertical Axis Line for Desktop */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/5 pointer-events-none -translate-x-1/2" aria-hidden />

        {/* Section Header */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 pt-16 pb-8 text-left">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FACC15]">
              <Clock size={14} weight="bold" />
              <span>Journey &amp; Experience</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)]">
              Explore my journey<span className="text-[#FACC15]">.</span>
            </h2>
          </div>
        </div>

        {/* Timeline Entries Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16">
          {/* Mobile Vertical Linear Guide Rail */}
          <div className="md:hidden absolute left-7 sm:left-9 top-4 bottom-12 w-0.5 bg-[var(--border-subtle)]" aria-hidden>
            <motion.div
              className="absolute top-0 left-0 w-full origin-top bg-[#FACC15]"
              style={{
                scaleY: pathProgress,
                height: "100%",
              }}
            />
          </div>

          <div className="space-y-6 md:space-y-2 pl-4 sm:pl-6 md:pl-0">
            {journeys.map((item, idx) => (
              <ExperienceEntry
                key={idx}
                item={item}
                index={idx}
                count={count}
                pathProgress={pathProgress}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="pb-24 sm:pb-36" />
    </section>
  );
}
