"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Project } from "@/data/projects";
import {
  ArrowLeft,
  ArrowUpRight,
  GithubLogo,
  CheckCircle,
  Lightning,
  Sparkle,
  Cpu,
  ChartLineUp,
  ShieldCheck,
  Lock,
  Globe,
  CaretLeft,
  CaretRight,
  Images,
} from "@phosphor-icons/react";
import FadeBlurIn from "./reactbits/FadeBlurIn";
import { soundFx } from "@/lib/audio-fx";

interface ProjectDeepDiveProps {
  project: Project;
  onBack: () => void;
}

export default function ProjectDeepDive({ project, onBack }: ProjectDeepDiveProps) {
  const gallery = project.gallery && project.gallery.length > 0 ? project.gallery : [project.image];
  const [activeSlide, setActiveSlide] = useState(0);

  const handleBack = () => {
    soundFx.playClick();
    onBack();
  };

  const prevSlide = useCallback(() => {
    soundFx.playClick();
    setActiveSlide((prev) => (prev > 0 ? prev - 1 : gallery.length - 1));
  }, [gallery.length]);

  const nextSlide = useCallback(() => {
    soundFx.playClick();
    setActiveSlide((prev) => (prev < gallery.length - 1 ? prev + 1 : 0));
  }, [gallery.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevSlide, nextSlide]);

  const currentImage = gallery[activeSlide] || project.image;
  return (
    <div data-lenis-prevent="true" className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] transition-colors pb-24">
      {/* Sticky Top Navigation Bar with Liquid Glass Effect */}
      <div className="sticky top-0 z-40 w-full border-b border-[var(--border-subtle)] bg-[var(--bg-main)]/80 backdrop-blur-xl">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface-card)] hover:bg-[var(--surface-card-hover)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-primary)] hover:border-[var(--accent)] transition-all cursor-pointer shadow-sm active:scale-[0.98]"
          >
            <ArrowLeft size={16} weight="bold" />
            <span>Kembali ke Portofolio</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[var(--surface-card)] border border-[var(--border-subtle)] text-[11px] font-mono font-medium text-[var(--accent)]">
              {project.category}
            </span>
            <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-[var(--surface-card)] border border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-secondary)]">
              {project.timeline}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 pt-8 sm:pt-12 space-y-10 sm:space-y-14">
        {/* Hero Header */}
        <FadeBlurIn>
          <div className="space-y-5 text-left">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)] bg-[var(--accent)]/10 px-3 py-1 rounded-full border border-[var(--accent)]/20">
                <Sparkle size={14} weight="fill" />
                <span>{project.role}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
                {project.title}
              </h1>
              <p className="text-base sm:text-lg font-mono text-[var(--text-secondary)] max-w-3xl">
                {project.tagline}
              </p>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--accent)] text-[var(--accent-fg)] font-semibold text-xs transition-all active:scale-[0.98] shadow-md hover:opacity-90 cursor-pointer"
                >
                  <Globe size={16} weight="bold" />
                  <span>Buka Live Website (Vercel)</span>
                  <ArrowUpRight size={16} weight="bold" />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--surface-card)] hover:bg-[var(--surface-card-hover)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-primary)] hover:border-[var(--accent)] transition-all shadow-sm cursor-pointer"
                >
                  <GithubLogo size={16} weight="fill" />
                  <span>Source Code Repository</span>
                </a>
              )}

              {project.sandboxUrl && (
                <a
                  href={project.sandboxUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--surface-card)] hover:bg-[var(--surface-card-hover)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-primary)] hover:border-[var(--accent)] transition-all shadow-sm cursor-pointer"
                >
                  <Cpu size={16} weight="bold" className="text-[var(--accent)]" />
                  <span>Buka Cloud Sandbox (StackBlitz)</span>
                  <ArrowUpRight size={14} weight="bold" />
                </a>
              )}
            </div>
          </div>
        </FadeBlurIn>

        {/* High-Fidelity Modern Browser Frame (Direct Front-Page Display) */}
        <div className="liquid-glass rounded-2xl overflow-hidden border border-[var(--border-subtle)] diffusion-shadow">
          {/* Browser Window Chrome Top Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-[var(--border-subtle)] bg-[var(--bg-main)]/70">
            {/* Window Action Buttons */}
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/10 inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/10 inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/10 inline-block" />
            </div>

            {/* URL Address Bar */}
            <div className="flex items-center gap-2 px-3 sm:px-5 py-1.5 rounded-lg bg-[var(--surface-card)] border border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-secondary)] max-w-sm sm:max-w-md w-full mx-3 justify-between shadow-inner">
              <div className="flex items-center gap-1.5 truncate">
                <Lock size={12} weight="fill" className="text-emerald-500 shrink-0" />
                <span className="truncate text-[var(--text-primary)] font-medium">
                  {project.liveUrl ? project.liveUrl : `https://internal.system/${project.id}`}
                </span>
              </div>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[var(--accent)] hover:underline font-semibold shrink-0 ml-1.5"
                  title="Buka Website Asli di Tab Baru"
                >
                  <span className="hidden sm:inline">Kunjungi</span>
                  <ArrowUpRight size={12} weight="bold" />
                </a>
              )}
            </div>

            {/* Right Status Badge */}
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-[var(--text-secondary)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="hidden sm:inline">PROD</span>
            </div>
          </div>

          {/* Browser Viewport: Direct High-Res Front-Page Display with Carousel */}
          <div className="relative w-full aspect-[16/10] sm:aspect-video bg-[var(--bg-main)] overflow-hidden group">
            <Image
              key={`${project.id}-${activeSlide}`}
              src={currentImage}
              alt={`${project.title} — screenshot ${activeSlide + 1}`}
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover object-top transition-all duration-300 ease-out"
              priority={activeSlide === 0}
            />

            {/* Left / Right Nav Overlays when multi-image gallery exists */}
            {gallery.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 opacity-80 group-hover:opacity-100 transition-all active:scale-95 shadow-lg cursor-pointer"
                  title="Screenshot Sebelumnya (Panah Kiri)"
                >
                  <CaretLeft size={20} weight="bold" />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 opacity-80 group-hover:opacity-100 transition-all active:scale-95 shadow-lg cursor-pointer"
                  title="Screenshot Selanjutnya (Panah Kanan)"
                >
                  <CaretRight size={20} weight="bold" />
                </button>
              </>
            )}

            {/* Floating Quick CTA on the screenshot */}
            {project.liveUrl && (
              <div className="absolute top-4 right-4 z-20">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-main)]/90 hover:bg-[var(--bg-main)] backdrop-blur-md border border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-primary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all shadow-xl"
                >
                  <Globe size={13} weight="bold" className="text-[var(--accent)]" />
                  <span>Buka Live Web</span>
                  <ArrowUpRight size={13} weight="bold" />
                </a>
              </div>
            )}
          </div>

          {/* Carousel Thumbnail Strip & Counter Bar */}
          {gallery.length > 1 && (
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 bg-[var(--bg-main)]/90 border-t border-[var(--border-subtle)]">
              {/* Previous Button */}
              <button
                type="button"
                onClick={prevSlide}
                className="p-1.5 rounded-lg bg-[var(--surface-card)] hover:bg-[var(--surface-card-hover)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors cursor-pointer"
                title="Sebelumnya"
              >
                <CaretLeft size={16} weight="bold" />
              </button>

              {/* Thumbnails Row */}
              <div className="flex items-center gap-2 overflow-x-auto py-1 max-w-[70vw] sm:max-w-none no-scrollbar">
                {gallery.map((imgSrc, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveSlide(idx)}
                    className={`relative w-14 sm:w-20 aspect-[16/10] rounded-md overflow-hidden border transition-all cursor-pointer shrink-0 ${
                      activeSlide === idx
                        ? "border-[var(--accent)] ring-2 ring-[var(--accent)]/40 scale-105"
                        : "border-[var(--border-subtle)] opacity-50 hover:opacity-100"
                    }`}
                    title={`Slide ${idx + 1}`}
                  >
                    <Image
                      src={imgSrc}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover object-top"
                    />
                  </button>
                ))}
              </div>

              {/* Next Button & Slide Counter */}
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={nextSlide}
                  className="p-1.5 rounded-lg bg-[var(--surface-card)] hover:bg-[var(--surface-card-hover)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors cursor-pointer"
                  title="Selanjutnya"
                >
                  <CaretRight size={16} weight="bold" />
                </button>
                <span className="text-xs font-mono font-bold text-[var(--text-secondary)] bg-[var(--surface-card)] px-2.5 py-1 rounded-full border border-[var(--border-subtle)]">
                  {activeSlide + 1} / {gallery.length}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Key Metrics Bento Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {project.metrics.map((metric, idx) => (
            <div key={idx} className="double-bezel">
              <div className="double-bezel-inner p-5 sm:p-6 space-y-1.5 text-left">
                <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                  {metric.label}
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-[var(--accent)] tracking-tight">
                  {metric.value}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* STAR Framework Deep Dive (Asymmetric Bento Cards) */}
        <div className="space-y-6 pt-4">
          <div className="space-y-1.5 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[var(--accent)] uppercase tracking-wider font-semibold">
              <Lightning size={16} weight="bold" />
              <span>Kajian Metodologi STAR</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
              Tantangan, Keputusan Teknis, dan Dampak Nyata
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Situation & Challenge */}
            <div className="double-bezel">
              <div className="double-bezel-inner p-6 space-y-3.5 h-full text-left">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-500 font-mono">
                  <ShieldCheck size={18} weight="bold" />
                  <span>1. Situation (Latar Belakang)</span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
                  {project.situation}
                </p>
              </div>
            </div>

            {/* Action & Technical Execution */}
            <div className="double-bezel">
              <div className="double-bezel-inner p-6 space-y-3.5 h-full text-left">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[var(--accent)] font-mono">
                  <Cpu size={18} weight="bold" />
                  <span>2. Action (Solusi Rekayasa)</span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
                  {project.action}
                </p>
              </div>
            </div>

            {/* Impact & Result */}
            <div className="double-bezel">
              <div className="double-bezel-inner p-6 space-y-3.5 h-full text-left">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-500 font-mono">
                  <ChartLineUp size={18} weight="bold" />
                  <span>3. Result (Hasil &amp; Dampak)</span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
                  {project.impact}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Architecture Highlights & Key Decisions */}
        <div className="space-y-5 pt-4 text-left">
          <h3 className="text-lg sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
            Keputusan Arsitektur &amp; Praktik Rekayasa Frontend
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.architecturePoints.map((point, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-xl bg-[var(--surface-card)] border border-[var(--border-subtle)] flex items-start gap-3.5 shadow-sm"
              >
                <CheckCircle size={20} weight="fill" className="text-[var(--accent)] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed font-sans font-normal">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Breakdown */}
        <div className="space-y-4 pt-4 text-left">
          <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)]">
            Stack &amp; Perangkat yang Digunakan
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3.5 py-1.5 rounded-lg bg-[var(--surface-card)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-primary)] hover:border-[var(--accent)] transition-colors"
              >
                #{tech}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Return Action */}
        <div className="pt-10 sm:pt-14 text-center border-t border-[var(--border-subtle)]">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[var(--accent)] text-[var(--accent-fg)] font-semibold text-sm transition-all active:scale-[0.98] shadow-md hover:opacity-90 cursor-pointer"
          >
            <ArrowLeft size={18} weight="bold" />
            <span>Kembali ke Halaman Utama</span>
          </button>
        </div>
      </div>
    </div>
  );
}
