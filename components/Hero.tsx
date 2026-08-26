"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import {
  ArrowDown,
  GithubLogo,
  EnvelopeSimple,
  MapPin,
  WhatsappLogo,
  LinkedinLogo,
  Check,
  Copy,
} from "@phosphor-icons/react";
import Aurora from "./reactbits/Aurora";
import MagnetButton from "./reactbits/MagnetButton";
import ClickSpark from "./reactbits/ClickSpark";
import FadeBlurIn from "./reactbits/FadeBlurIn";

// Dynamic import of 3D Lanyard (Three.js / Rapier Physics)
const Lanyard = dynamic(() => import("@/components/Lanyard"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-56 h-80 rounded-2xl bg-[var(--surface-card)]/40 border border-[var(--border-subtle)] animate-pulse flex flex-col items-center justify-center p-6 space-y-4">
        <div className="w-24 h-24 rounded-full bg-[var(--surface-card-hover)] animate-pulse" />
        <div className="w-32 h-3 rounded bg-[var(--surface-card-hover)] animate-pulse" />
      </div>
    </div>
  ),
});

export default function Hero() {
  const [copied, setCopied] = React.useState(false);
  const email = "bagasa020@gmail.com";

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="about"
      className="relative min-h-[100dvh] flex items-center justify-center pt-28 pb-16 px-6 overflow-hidden bg-[var(--bg-main)]"
    >
      {/* Resolute Ultramarine Ambient Ocean Glow */}
      <Aurora
        colorStops={[
          "rgba(46, 76, 140, 0.45)", // Resolute Ultramarine
          "rgba(96, 165, 250, 0.25)", // Luminous Sky
          "rgba(19, 32, 56, 0.6)",    // Deep Oceanic Card
        ]}
      />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      {/* Main Container — 50/50 Balanced & Spacious */}
      <div className="relative z-10 max-w-[1240px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Clean, Punchy & Uncluttered Bio (6 cols) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Status & Location Pill */}
            <FadeBlurIn delay={0.1}>
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface-card)] border border-[var(--border-subtle)] shadow-sm backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-xs font-mono text-[var(--accent)] font-semibold">
                    Available for Work &bull; Samarinda, ID
                  </span>
                </div>
              </div>
            </FadeBlurIn>

            {/* Name & Headline */}
            <FadeBlurIn delay={0.2}>
              <div className="space-y-2">
                <p className="text-xs sm:text-sm font-mono text-[var(--text-secondary)] uppercase tracking-wider">
                  Bagas Aditya Anugrah Ramadhan
                </p>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.12]">
                  Frontend &amp;{" "}
                  <span className="text-[var(--accent)] underline decoration-[var(--accent-subtle)] underline-offset-8">
                    Web Developer
                  </span>
                </h1>
              </div>
            </FadeBlurIn>

            {/* Clean & Concise Bio (Easy to Read) */}
            <FadeBlurIn delay={0.3}>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] font-mono leading-relaxed max-w-xl">
                Mahasiswa Teknik Informatika di <strong className="text-[var(--text-primary)] font-medium">STMIK Widya Cipta Dharma</strong>. Berpengalaman merancang antarmuka web yang modular, semantik, dan cepat menggunakan Tailwind CSS, Laravel, dan Next.js untuk instansi pemerintah dan bisnis.
              </p>
            </FadeBlurIn>

            {/* Minimal Core Tech Stack Strip */}
            <FadeBlurIn delay={0.35}>
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  "Tailwind CSS",
                  "Laravel Blade",
                  "Next.js",
                  "React",
                  "Figma Slicing",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-lg bg-[var(--surface-card)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-primary)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </FadeBlurIn>

            {/* Action Buttons & Socials */}
            <FadeBlurIn delay={0.4}>
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2">
                <ClickSpark sparkColor="var(--accent)" sparkCount={8}>
                  <MagnetButton strength={0.25} className="w-full sm:w-auto">
                    <a
                      href="#works"
                      className="flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-full bg-[var(--accent)] text-[var(--bg-main)] font-bold text-sm tracking-tight transition-all active:scale-[0.98] shadow-md hover:shadow-[0_0_24px_var(--accent-subtle)] cursor-pointer"
                    >
                      <span>Lihat Proyek</span>
                      <ArrowDown size={16} weight="bold" />
                    </a>
                  </MagnetButton>
                </ClickSpark>

                <ClickSpark sparkColor="var(--accent)" sparkCount={5}>
                  <MagnetButton strength={0.2} className="flex-1 sm:flex-initial">
                    <a
                      href="https://wa.me/6282159888947"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 sm:px-6 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-sm transition-all shadow-sm"
                    >
                      <WhatsappLogo size={18} weight="fill" />
                      <span>WhatsApp</span>
                    </a>
                  </MagnetButton>
                </ClickSpark>

                <button
                  onClick={handleCopyEmail}
                  className="flex items-center justify-center gap-2 flex-1 sm:flex-initial px-4 py-3.5 rounded-full bg-[var(--surface-card)] hover:bg-[var(--surface-card-hover)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-mono text-xs transition-all cursor-pointer shadow-sm"
                  title="Salin Email: bagasa020@gmail.com"
                >
                  {copied ? (
                    <>
                      <Check size={14} weight="bold" className="text-emerald-400" />
                      <span>Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Salin Email</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href="https://github.com/gabas21"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-full bg-[var(--surface-card)] hover:bg-[var(--surface-card-hover)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors shadow-sm"
                    title="GitHub: gabas21"
                  >
                    <GithubLogo size={18} weight="fill" />
                  </a>

                  <a
                    href="https://linkedin.com/in/bagasaditya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-full bg-[var(--surface-card)] hover:bg-[var(--surface-card-hover)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors shadow-sm"
                    title="LinkedIn: bagasaditya"
                  >
                    <LinkedinLogo size={18} weight="fill" />
                  </a>
                </div>
              </div>
            </FadeBlurIn>
          </div>

          {/* Right Column: Prominent & Responsive 3D Physics Lanyard (6 cols) */}
          <div className="lg:col-span-6 flex items-center justify-center relative min-h-[380px] sm:min-h-[480px] lg:min-h-[720px] w-full mt-4 lg:mt-0">
            <FadeBlurIn delay={0.3} className="w-full h-full">
              <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[720px] flex items-center justify-center">
                <Lanyard
                  position={[0, 0, 11.5]}
                  gravity={[0, -35, 0]}
                  fov={20}
                  transparent={true}
                  frontImage="/avatar.jpg"
                  backImage="/avatar.jpg"
                  lanyardImage="/assets/lanyard/lanyard.webp"
                  lanyardWidth={1.3}
                  anchorY={3.8}
                  className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
                />
              </div>
            </FadeBlurIn>
          </div>
        </div>
      </div>
    </section>
  );
}
