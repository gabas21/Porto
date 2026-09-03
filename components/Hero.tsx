"use client";

import * as React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  ArrowDown,
  GithubLogo,
  WhatsappLogo,
  LinkedinLogo,
  Check,
  Copy,
  FileText,
  EnvelopeSimple,
} from "@phosphor-icons/react";
import CloudVideoBackground from "./ui/CloudVideoBackground";
import MagnetButton from "./reactbits/MagnetButton";
import ClickSpark from "./reactbits/ClickSpark";
import FadeBlurIn from "./reactbits/FadeBlurIn";
import PixelTransition from "./reactbits/PixelTransition";
import { soundFx } from "@/lib/audio-fx";

// Dynamic import of 3D Lanyard (Three.js / Rapier Physics)
const Lanyard = dynamic(() => import("@/components/Lanyard"), {
  ssr: false,
  loading: () => <div className="w-full h-full pointer-events-none" />,
});

export default function Hero() {
  const [copied, setCopied] = React.useState(false);
  const [isDark, setIsDark] = React.useState(false);
  const [isDesktop, setIsDesktop] = React.useState(false);
  const email = "bagasa020@gmail.com";

  // Deteksi layar desktop (min-width: 1024px) agar 3D Lanyard & physics engine
  // tidak dimuat sama sekali di perangkat mobile/tablet (hemat ~6 MB data)
  React.useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const handleResize = () => setIsDesktop(mql.matches);
    handleResize();
    mql.addEventListener("change", handleResize);
    return () => mql.removeEventListener("change", handleResize);
  }, []);

  const handleOpenCV = () => {
    soundFx.playSweep();
    window.dispatchEvent(new CustomEvent("open-cv-modal"));
  };

  // Reactive theme tracking for seamless light/dark shader transitions
  React.useEffect(() => {
    const checkDark = () => {
      const isDarkMode =
        document.documentElement.classList.contains("dark") ||
        document.documentElement.getAttribute("data-theme") === "dark";
      setIsDark(isDarkMode);
    };

    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="about"
      className="relative min-h-[92dvh] sm:min-h-[95dvh] lg:min-h-[100dvh] flex flex-col justify-start lg:justify-center pt-20 sm:pt-24 lg:pt-28 pb-6 sm:pb-10 lg:pb-16 px-4 sm:px-6 3xl:px-16 4xl:px-24 overflow-hidden bg-[var(--bg-main)]"
    >
      {/* ── Seamless Cinematic Cloud Video Background (Hardware-Accelerated Decoding) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-700 opacity-95 dark:opacity-90">
        <CloudVideoBackground
          className="w-full h-full"
          src="/clouds.mp4?v=v2"
          poster="/clouds-poster.webp?v=v2"
          playbackRate={1.0}
        />

        {/* Soft Left Vignette (Protects Text Contrast while Letting 3D Clouds Shine) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-main)]/85 via-[var(--bg-main)]/30 to-transparent w-full lg:w-1/2" />

        {/* Soft Bottom Fade into Content */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg-main)]" />
      </div>

      {/* Subtle Micro-Grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      {/* Main Container — Balanced & Spacious */}
      <div className="relative z-10 max-w-[1240px] 3xl:max-w-[1600px] 4xl:max-w-[2000px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 3xl:gap-20 items-center">

          {/* Left Column: Clean, Punchy & High-End Bio (6 cols on desktop, full width on mobile) */}
          <div className="w-full lg:col-span-6 3xl:col-span-6 space-y-4 sm:space-y-5 3xl:space-y-7 text-left py-2 sm:py-4 lg:py-0">

            {/* Top Header: Left Info + Right Large Pure Circular Photo */}
            <div className="flex items-start justify-between gap-3 sm:gap-4">
              {/* Left: Status & Name */}
              <div className="space-y-2 flex-1 pt-1">
                <FadeBlurIn delay={0.1}>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-card)]/80 border border-[var(--border-subtle)] shadow-sm backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span className="text-xs font-mono font-semibold text-[var(--accent)] uppercase tracking-wider">
                      Available for Work
                    </span>
                    <span className="text-[var(--text-secondary)] opacity-40 font-mono text-xs">•</span>
                    <span className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider">
                      Samarinda, ID
                    </span>
                  </div>
                </FadeBlurIn>

                <FadeBlurIn delay={0.15}>
                  <p className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-widest pl-0.5">
                    Bagas Aditya Anugrah Ramadhan
                  </p>
                </FadeBlurIn>
              </div>

              {/* Right: Large Pure Circular Photo with PixelTransition */}
              <FadeBlurIn delay={0.1} className="shrink-0 lg:hidden">
                <PixelTransition
                  firstContent={
                    <div className="relative w-full h-full">
                      <Image
                        src="/avatar.jpg"
                        alt="Bagas Aditya"
                        fill
                        sizes="(max-width: 640px) 350px, 450px"
                        quality={95}
                        className="object-cover object-top"
                        priority
                      />
                    </div>
                  }
                  secondContent={
                    <div className="relative w-full h-full overflow-hidden">
                      <Image
                        src="/avatar-2.jpg"
                        alt="Special Highlight"
                        fill
                        sizes="(max-width: 640px) 350px, 450px"
                        quality={95}
                        className="object-cover scale-[1.95] origin-[43%_48%]"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    </div>
                  }
                  gridSize={9}
                  pixelColor={isDark ? "#FACC15" : "#14161C"}
                  animationStepDuration={0.35}
                  trigger="click"
                  aspectRatio="100%"
                  className="w-[140px] h-[140px] sm:w-[165px] sm:h-[165px] md:w-[185px] md:h-[185px] rounded-full overflow-hidden border-2 border-black/20 dark:border-white/25 ring-4 ring-[var(--accent)]/15 shadow-2xl bg-[#14161C] active:scale-95 transition-transform"
                />
              </FadeBlurIn>
            </div>

            {/* Headline */}
            <FadeBlurIn delay={0.2}>
              <h1 className="text-3xl sm:text-4xl md:text-6xl 3xl:text-7xl 4xl:text-8xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.12] font-display">
                Frontend &amp;{" "}
                <span className="bg-gradient-to-r from-[var(--accent)] via-amber-300 to-yellow-500 bg-clip-text text-transparent font-extrabold">
                  Web Developer
                </span>
              </h1>
            </FadeBlurIn>

            {/* Clean & Concise Bio (Ergonomic Reading Flow - Max 65ch & Sans font) */}
            <FadeBlurIn delay={0.3}>
              <p className="text-sm sm:text-base 3xl:text-lg text-[var(--text-secondary)] font-sans leading-relaxed max-w-[65ch]">
                Mahasiswa Teknik Informatika di <strong className="text-[var(--text-primary)] font-medium">STMIK Widya Cipta Dharma</strong>. Berpengalaman merancang antarmuka web yang modular, semantik, dan interaktif menggunakan Tailwind CSS, Laravel, dan Next.js untuk instansi pemerintah dan bisnis.
              </p>
            </FadeBlurIn>

            {/* Minimal Core Tech Stack Strip */}
            <FadeBlurIn delay={0.35}>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 3xl:gap-3 pt-0.5">
                {[
                  "Tailwind CSS",
                  "Laravel Blade",
                  "Next.js",
                  "React",
                  "Figma Slicing",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 3xl:px-4 3xl:py-1.5 rounded-lg bg-[var(--surface-card)]/80 border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-primary)] backdrop-blur-sm hover:border-[var(--accent)]/40 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </FadeBlurIn>

            {/* Action Buttons & Socials (Ergonomic Mobile Layout) */}
            <FadeBlurIn delay={0.4}>
              <div className="space-y-2.5 sm:space-y-3 pt-1">
                {/* Primary Action Row (Lihat Proyek, Resume/CV, WhatsApp) */}
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                  <ClickSpark sparkColor="var(--accent)" sparkCount={6}>
                    <MagnetButton strength={0.2} className="w-full sm:w-auto">
                      <a
                        href="#works"
                        className="flex items-center justify-center gap-2 w-full sm:w-auto min-h-[46px] sm:min-h-[48px] px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[var(--accent)] text-black font-bold text-xs sm:text-sm tracking-tight transition-all active:scale-[0.98] shadow-md shadow-[var(--accent)]/20 hover:shadow-lg hover:shadow-[var(--accent)]/30 hover:opacity-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                      >
                        <span>Lihat Proyek</span>
                        <ArrowDown size={15} weight="bold" />
                      </a>
                    </MagnetButton>
                  </ClickSpark>

                  {/* Resume / Interactive CV Button (Solid Premium Clean - Non-Glowing) */}
                  <MagnetButton strength={0.2} className="w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={handleOpenCV}
                      data-testid="hero-resume-btn"
                      className="group flex items-center justify-center gap-2 w-full sm:w-auto min-h-[46px] sm:min-h-[48px] px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-[#14161C] dark:bg-[#1C1E26] hover:bg-[#20232D] dark:hover:bg-[#282B37] text-white border border-black/15 dark:border-white/15 font-semibold text-xs sm:text-sm transition-all shadow-sm active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                      title="Buka Resume & CV Interaktif"
                    >
                      <FileText size={16} weight="bold" className="text-[var(--accent)] group-hover:scale-105 transition-transform" />
                      <span className="font-semibold text-white tracking-tight">Resume / CV</span>
                      <span className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono text-neutral-300 font-medium">
                        PDF
                      </span>
                    </button>
                  </MagnetButton>

                  <MagnetButton strength={0.2} className="w-full sm:w-auto">
                    <a
                      href="https://wa.me/6282159888947"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full sm:w-auto min-h-[46px] sm:min-h-[48px] px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-[#059669] hover:bg-[#047857] text-white font-semibold text-xs sm:text-sm transition-all shadow-sm active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                    >
                      <WhatsappLogo size={18} weight="fill" />
                      <span>WhatsApp</span>
                    </a>
                  </MagnetButton>
                </div>

                {/* Secondary Quick Action & Socials Row */}
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <button
                    onClick={() => {
                      soundFx.playSweep();
                      window.dispatchEvent(new CustomEvent("open-contact-modal"));
                    }}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-2 min-h-[44px] px-5 py-3 rounded-full bg-[var(--surface-card)] hover:bg-[var(--surface-card-hover)] border border-[var(--border-subtle)] hover:border-[var(--accent)]/40 text-[var(--text-primary)] font-mono text-xs transition-all cursor-pointer shadow-sm active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                    title="Buka Formulir Kontak & Kirim Pesan"
                  >
                    <EnvelopeSimple size={15} weight="bold" className="text-[var(--accent)]" />
                    <span>Kirim Pesan</span>
                  </button>

                  <a
                    href="https://github.com/gabas21"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-[var(--surface-card)] hover:bg-[var(--surface-card-hover)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors shadow-sm active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                    title="GitHub: gabas21"
                    aria-label="GitHub Profile Bagas Aditya"
                  >
                    <GithubLogo size={18} weight="fill" />
                  </a>

                  <a
                    href="https://linkedin.com/in/bagasaditya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-[var(--surface-card)] hover:bg-[var(--surface-card-hover)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors shadow-sm active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                    title="LinkedIn: bagasaditya"
                    aria-label="LinkedIn Profile Bagas Aditya"
                  >
                    <LinkedinLogo size={18} weight="fill" />
                  </a>
                </div>
              </div>
            </FadeBlurIn>
          </div>

          {/* Right Column: High-End 3D Physics Lanyard (Seamless Floating Desktop Showcase) */}
          <div className="hidden lg:flex lg:col-span-6 items-center justify-center relative w-full pointer-events-auto">
            <FadeBlurIn delay={0.3} className="w-full flex items-center justify-center">
              {/* 3D Canvas Viewport - Free Floating Seamless Canvas */}
              <div className="relative w-full h-[550px] lg:h-[720px] 3xl:h-[840px] 4xl:h-[940px] flex items-center justify-center">
                {isDesktop && (
                  <Lanyard
                    position={[0, 0, 11.5]}
                    gravity={[0, -35, 0]}
                    fov={20}
                    transparent={true}
                    frontImage="/avatar.jpg"
                    backImage="/avatar.jpg"
                    lanyardImage="/assets/lanyard/lanyard.png"
                    lanyardWidth={1.3}
                    anchorY={4.7}
                    className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
                  />
                )}
              </div>
            </FadeBlurIn>
          </div>
        </div>
      </div>
    </section>
  );
}
