"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  GithubLogo,
  EnvelopeSimple,
  MapPin,
  Sparkle,
  Copy,
  Check,
  ArrowUpRight,
  ShieldCheck,
  GraduationCap,
  LinkedinLogo,
} from "@phosphor-icons/react";
import TiltCard from "./reactbits/TiltCard";
import Spotlight from "./reactbits/Spotlight";
import ClickSpark from "./reactbits/ClickSpark";

export default function DeveloperCard() {
  const [copied, setCopied] = useState(false);
  const email = "bagasa020@gmail.com";

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <TiltCard maxTilt={8} perspective={1100} className="w-full max-w-[440px] mx-auto">
      <div className="group relative double-bezel overflow-hidden transition-all duration-300 shadow-2xl">
        {/* Dynamic Interactive Radial Spotlight Glow */}
        <Spotlight size={360} color="var(--accent-subtle)" />

        {/* Ambient Backlight Glow */}
        <div
          className="absolute -top-20 -right-20 w-48 h-48 bg-[var(--accent)]/15 rounded-full blur-3xl pointer-events-none group-hover:bg-[var(--accent)]/25 transition-all duration-700"
          aria-hidden="true"
        />

        <div className="double-bezel-inner p-6 sm:p-7 space-y-5 relative z-10">
          {/* Top Bar: Developer Badge & Status Pill */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-main)] border border-[var(--border-subtle)] text-[11px] font-mono text-[var(--accent)] shadow-inner">
              <Sparkle size={13} weight="fill" />
              <span>Frontend Developer</span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Hire</span>
            </div>
          </div>

          {/* Portrait Photo Container with 3D Depth & Hover Shimmer */}
          <div className="relative aspect-[4/3] sm:aspect-square w-full rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-main)] shadow-md group-hover:border-[var(--accent)]/40 transition-colors duration-500">
            <Image
              src="/avatar.jpg"
              alt="Foto Profil Bagas Aditya Anugrah Ramadhan"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              priority
            />

            {/* Bottom Gradient for Text Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-main)]/95 via-transparent to-transparent opacity-85" />

            {/* Floating Overlay Badge on Photo */}
            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
              <div className="space-y-0.5 backdrop-blur-md px-3 py-1.5 rounded-xl bg-[var(--surface-card)]/85 border border-[var(--border-subtle)]">
                <div className="text-xs font-bold text-[var(--text-primary)]">
                  Bagas Aditya A. R.
                </div>
                <div className="text-[10px] font-mono text-[var(--accent)] flex items-center gap-1">
                  <MapPin size={11} />
                  <span>Samarinda, Kaltim</span>
                </div>
              </div>

              <div className="backdrop-blur-md px-2.5 py-1.5 rounded-xl bg-[var(--surface-card)]/85 border border-[var(--border-subtle)] text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <ShieldCheck size={13} weight="fill" />
                <span>Verified</span>
              </div>
            </div>
          </div>

          {/* Personal Bio Snippet */}
          <div className="space-y-1.5 text-left">
            <h3 className="text-base font-bold text-[var(--text-primary)] tracking-tight">
              Frontend &amp; Web Developer
            </h3>
            
            <div className="text-[11px] font-mono text-[var(--accent)] flex items-center gap-1.5">
              <GraduationCap size={14} />
              <span>Mahasiswa TI &bull; STMIK Widya Cipta Dharma</span>
            </div>

            <p className="text-xs text-[var(--text-secondary)] font-mono leading-relaxed pt-1">
              Spesialis slicing Figma ke antarmuka web semantik, modular, dan responsif menggunakan Tailwind CSS, Laravel Blade, dan Next.js.
            </p>
          </div>

          {/* Tech Stack Matrix Pills */}
          <div className="space-y-2 pt-1 border-t border-[var(--border-subtle)] text-left">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-secondary)]">
              Keahlian Teknis Terverifikasi
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                "Tailwind CSS",
                "Laravel Blade",
                "Next.js",
                "React.js",
                "Figma Slicing",
                "JavaScript ES6+",
                "RESTful API",
                "Git & GitHub",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg bg-[var(--bg-main)] border border-[var(--border-subtle)] text-[10px] font-mono text-[var(--text-primary)] hover:border-[var(--accent)] transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Card Action Footer */}
          <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between gap-2">
            <ClickSpark sparkColor="var(--accent)" sparkCount={6}>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--bg-main)] hover:bg-[var(--surface-card-hover)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-primary)] hover:text-[var(--accent)] transition-all cursor-pointer shadow-sm"
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
            </ClickSpark>

            <div className="flex items-center gap-2">
              <a
                href="https://github.com/gabas21"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-[var(--bg-main)] hover:bg-[var(--surface-card-hover)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors shadow-sm"
                title="GitHub: gabas21"
              >
                <GithubLogo size={16} weight="fill" />
              </a>

              <a
                href="https://linkedin.com/in/bagasaditya"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-[var(--bg-main)] hover:bg-[var(--surface-card-hover)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors shadow-sm"
                title="LinkedIn: bagasaditya"
              >
                <LinkedinLogo size={16} weight="fill" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-[var(--accent)] text-[var(--bg-main)] font-semibold text-xs transition-opacity hover:opacity-90 shadow-sm"
              >
                <span>Kontak</span>
                <ArrowUpRight size={14} weight="bold" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}
