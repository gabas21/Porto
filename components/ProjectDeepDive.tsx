"use client";

import React from "react";
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
} from "@phosphor-icons/react";
import FadeBlurIn from "./reactbits/FadeBlurIn";

interface ProjectDeepDiveProps {
  project: Project;
  onBack: () => void;
}

export default function ProjectDeepDive({ project, onBack }: ProjectDeepDiveProps) {
  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] py-12 px-6 sm:px-10 max-w-[1240px] mx-auto space-y-12 transition-colors">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[var(--surface-card)] hover:bg-[var(--surface-card-hover)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-primary)] hover:text-[var(--accent)] transition-all cursor-pointer shadow-sm"
        >
          <ArrowLeft size={16} weight="bold" />
          <span>Kembali ke Portofolio</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-[var(--surface-card)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--accent)]">
            {project.category}
          </span>
          <span className="px-3 py-1 rounded-full bg-[var(--surface-card)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-secondary)]">
            {project.timeline}
          </span>
        </div>
      </div>

      {/* Hero Header */}
      <FadeBlurIn>
        <div className="space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-mono text-[var(--accent)] uppercase tracking-widest flex items-center gap-2">
              <Sparkle size={14} weight="fill" />
              <span>{project.role}</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
              {project.title}
            </h1>
            <p className="text-lg sm:text-xl font-mono text-[var(--text-secondary)]">
              {project.tagline}
            </p>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--accent)] text-[var(--bg-main)] font-semibold text-xs transition-all active:scale-[0.98] shadow-sm hover:shadow-[0_0_24px_var(--accent-subtle)]"
              >
                <span>Buka Live Preview</span>
                <ArrowUpRight size={16} weight="bold" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--surface-card)] hover:bg-[var(--surface-card-hover)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-primary)] hover:text-[var(--accent)] transition-all shadow-sm"
              >
                <GithubLogo size={16} weight="fill" />
                <span>Source Code Repository</span>
              </a>
            )}
          </div>
        </div>
      </FadeBlurIn>

      {/* Main Image Showcase */}
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--surface-card)] shadow-2xl">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-main)] via-transparent to-transparent opacity-60" />
      </div>

      {/* Metrics Bento Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {project.metrics.map((metric, idx) => (
          <div key={idx} className="double-bezel">
            <div className="double-bezel-inner p-6 space-y-1">
              <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                {metric.label}
              </div>
              <div className="text-3xl font-bold font-mono text-[var(--accent)]">
                {metric.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* STAR Framework Deep Dive */}
      <div className="space-y-6 pt-6 border-t border-[var(--border-subtle)]">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[var(--accent)] uppercase tracking-wider">
            <Lightning size={16} weight="bold" />
            <span>Kajian Metodologi STAR</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
            Tantangan, Keputusan Teknis, dan Dampak Nyata
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Situation & Challenge */}
          <div className="double-bezel">
            <div className="double-bezel-inner p-6 space-y-3 h-full">
              <div className="flex items-center gap-2 text-sm font-semibold text-amber-500 font-mono">
                <ShieldCheck size={18} />
                <span>1. Situation (Latar Belakang)</span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                {project.situation}
              </p>
            </div>
          </div>

          {/* Action & Solution */}
          <div className="double-bezel">
            <div className="double-bezel-inner p-6 space-y-3 h-full">
              <div className="flex items-center gap-2 text-sm font-semibold text-[var(--accent)] font-mono">
                <Cpu size={18} />
                <span>2. Action (Solusi & Eksekusi)</span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                {project.action}
              </p>
            </div>
          </div>

          {/* Impact & Result */}
          <div className="double-bezel">
            <div className="double-bezel-inner p-6 space-y-3 h-full">
              <div className="flex items-center gap-2 text-sm font-semibold text-emerald-500 font-mono">
                <ChartLineUp size={18} />
                <span>3. Result (Hasil & Dampak)</span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                {project.impact}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Architecture Points */}
      <div className="space-y-6 pt-6 border-t border-[var(--border-subtle)]">
        <h3 className="text-xl font-bold text-[var(--text-primary)]">
          Keputusan Arsitektur &amp; Praktik Rekayasa Frontend
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {project.architecturePoints.map((point, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[var(--surface-card)] border border-[var(--border-subtle)] flex items-start gap-3 shadow-sm">
              <CheckCircle size={18} weight="fill" className="text-[var(--accent)] shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-[var(--text-primary)]/90 leading-relaxed font-mono">{point}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack Breakdown */}
      <div className="space-y-4 pt-6 border-t border-[var(--border-subtle)]">
        <h3 className="text-lg font-bold text-[var(--text-primary)]">
          Stack &amp; Perangkat yang Digunakan
        </h3>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3.5 py-1.5 rounded-lg bg-[var(--surface-card)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--accent)]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Return Button */}
      <div className="pt-12 text-center border-t border-[var(--border-subtle)]">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[var(--accent)] text-[var(--bg-main)] font-semibold text-sm transition-all active:scale-[0.98] shadow-sm hover:shadow-[0_0_24px_var(--accent-subtle)] cursor-pointer"
        >
          <ArrowLeft size={18} weight="bold" />
          <span>Kembali ke Halaman Utama</span>
        </button>
      </div>
    </div>
  );
}
