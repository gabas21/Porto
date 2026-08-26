"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { Sparkle, Compass, Code, Lightbulb } from "@phosphor-icons/react";

interface ScrubTextRevealProps {
  children?: React.ReactNode;
}

const PHILOSOPHY_PARAGRAPHS = [
  "Rekayasa frontend bukan sekadar menumpuk animasi atau memasang efek visual yang berlebihan.",
  "Ini tentang membangun struktur kode yang bersih, kecepatan muat instan di bawah fold, dan arsitektur data yang dapat dipertanggungjawabkan di dunia nyata.",
  "Setiap baris kode, pemilihan token warna, dan pemisahan modul memiliki tujuan tunggal: memberikan pengalaman pengguna yang elegan, kredibel, dan berstatus tinggi."
];

function Word({
  word,
  range,
  progress,
}: {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const color = useTransform(
    progress,
    range,
    ["var(--text-secondary)", "var(--text-primary)"]
  );

  return (
    <span className="relative inline-block mr-2.5 my-1">
      <motion.span style={{ opacity, color }} className="transition-colors duration-150 font-medium">
        {word}
      </motion.span>
    </span>
  );
}

export default function ScrubTextReveal({ children }: ScrubTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.4"],
  });

  const fullText = PHILOSOPHY_PARAGRAPHS.join(" ");
  const words = fullText.split(" ");

  return (
    <section
      id="philosophy"
      ref={containerRef}
      className="py-36 md:py-48 px-6 border-t border-[var(--border-subtle)] relative overflow-hidden bg-[var(--bg-main)]"
    >
      <div className="max-w-[1100px] mx-auto space-y-12">
        {/* Section Pill Badge */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--accent)]">
          <Sparkle size={14} weight="fill" />
          <span>Filosofi &amp; Manifesto Rekayasa</span>
        </div>

        {/* Scrubbing Text Content */}
        <div className="text-2xl sm:text-4xl md:text-5xl font-bold leading-[1.35] tracking-tight font-sans">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word
                key={i}
                word={word}
                range={[start, end]}
                progress={scrollYProgress}
              />
            );
          })}
        </div>

        {/* 3 Core Architecture Pillars */}
        <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-[var(--border-subtle)]">
          <div className="p-6 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-subtle)] space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent-subtle)] text-[var(--accent)] flex items-center justify-center">
              <Compass size={22} weight="bold" />
            </div>
            <h3 className="text-lg font-bold text-[var(--text-primary)]">
              Less Noise, More Clarity
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-mono">
              Menghindari efek semu (*AI Slop*). Setiap komponen, transisi, dan margin dibuat dengan alasan fungsional yang kuat.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-subtle)] space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent-subtle)] text-[var(--accent)] flex items-center justify-center">
              <Code size={22} weight="bold" />
            </div>
            <h3 className="text-lg font-bold text-[var(--text-primary)]">
              Clean TypeScript Architecture
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-mono">
              Strict type system, pemisahan data model yang modular, dan kepatuhan standar rekayasa Next.js modern.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-subtle)] space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent-subtle)] text-[var(--accent)] flex items-center justify-center">
              <Lightbulb size={22} weight="bold" />
            </div>
            <h3 className="text-lg font-bold text-[var(--text-primary)]">
              Sub-second Performa
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-mono">
              Optimasi WebP, GPU canvas rendering, tree-shaking CSS, dan bundle size terkontrol untuk skor Lighthouse 95+.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
