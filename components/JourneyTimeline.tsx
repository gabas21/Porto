"use client";

import { journeys } from "@/data/journey";
import { Clock } from "@phosphor-icons/react";
import FadeBlurIn from "./reactbits/FadeBlurIn";

export default function JourneyTimeline() {
  return (
    <section id="journey" className="py-36 md:py-48 px-6 border-t border-[var(--border-subtle)] relative">
      <div className="max-w-[1240px] mx-auto space-y-12">
        {/* Section Header */}
        <FadeBlurIn>
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface-card)] border border-[var(--border-subtle)] text-[var(--accent)] text-xs font-mono shadow-sm">
              <Clock size={14} weight="bold" />
              <span>Rekam Jejak &amp; Pengalaman</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
              Perjalanan Karir
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl leading-relaxed font-mono">
              Pengalaman nyata dalam perancangan aplikasi web institusi, kolaborasi tim pengembang, dan penyelesaian proyek skala rilis.
            </p>
          </div>
        </FadeBlurIn>

        {/* Minimalist Vertical Timeline with thin line + nodes */}
        <div className="relative pl-6 sm:pl-8 border-l border-[var(--border-subtle)] space-y-12 ml-2 sm:ml-4">
          {journeys.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Node Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-[var(--surface-card)] border-2 border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:shadow-[0_0_14px_var(--accent-subtle)] transition-all duration-200" />

              <div className="space-y-3 text-left">
                {/* Period & Category Badge */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-xs font-mono text-[var(--accent)] font-semibold">
                    {item.period}
                  </span>
                  <span className="opacity-30 text-xs">•</span>
                  <span className="px-2.5 py-0.5 rounded bg-[var(--surface-card)] border border-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)] font-mono">
                    {item.type}
                  </span>
                  <span className="opacity-30 text-xs">•</span>
                  <span className="text-xs text-[var(--text-secondary)]">
                    {item.location}
                  </span>
                </div>

                {/* Role & Org */}
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                    {item.role}
                  </h3>
                  <p className="text-sm font-medium text-[var(--text-secondary)]">
                    {item.organization}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-[65ch] font-mono">
                  {item.description}
                </p>

                {/* Highlights List */}
                <ul className="space-y-1.5 pt-1">
                  {item.highlights.map((highlight, hIdx) => (
                    <li
                      key={hIdx}
                      className="text-xs text-[var(--text-primary)]/90 flex items-start gap-2 font-mono"
                    >
                      <span className="text-[var(--accent)] font-bold mt-0.5">›</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-0.5 rounded bg-[var(--surface-card)] border border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-secondary)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
