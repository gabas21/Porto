"use client";

import React, { useState } from "react";
import {
  Code,
  Cpu,
  Lightning,
  ShieldCheck,
  GitBranch,
  TerminalWindow,
  Database,
  Browsers,
  CheckCircle,
  Sparkle,
} from "@phosphor-icons/react";
import FadeBlurIn from "./reactbits/FadeBlurIn";
import Spotlight from "./reactbits/Spotlight";
import ClickSpark from "./reactbits/ClickSpark";

export default function TechStack() {
  const [activeBenchmark, setActiveBenchmark] = useState<"nextjs" | "react" | "ts" | "tailwind">("nextjs");

  const benchmarks = {
    nextjs: {
      title: "Next.js 16 + Turbopack",
      latency: "14ms Fast Refresh",
      renderStrategy: "Static & Server Components (RSC)",
      description: "Optimasi streaming SSR dan prerendering statis untuk zero-layout-shift dan waktu muat instan.",
    },
    react: {
      title: "React 19 Concurrent Engine",
      latency: "60 FPS UI Thread",
      renderStrategy: "Automatic Batching & Transitions",
      description: "Pengelolaan state non-blocking dan arsitektur komponen modular berbasis functional hooks.",
    },
    ts: {
      title: "Strict TypeScript 5.7+",
      latency: "0 Runtime Type Bugs",
      renderStrategy: "Compile-Time Schema Enforcement",
      description: "Jaminan integritas data dari API contract hingga UI presentation layer tanpa any-types.",
    },
    tailwind: {
      title: "Tailwind CSS v4 Engine",
      latency: "< 35KB CSS Payload",
      renderStrategy: "Oxide Rust-Powered Bundler",
      description: "Desain sistem atomic dengan CSS variables dinamis untuk performa rendering ultra-cepat.",
    },
  };

  return (
    <section id="architecture" className="py-36 md:py-48 px-6 border-t border-[var(--border-subtle)] relative">
      <div className="max-w-[1240px] mx-auto space-y-12">
        {/* Section Header */}
        <FadeBlurIn>
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface-card)] border border-[var(--border-subtle)] text-[var(--accent)] text-xs font-mono shadow-sm">
              <Cpu size={14} weight="bold" />
              <span>Gapless Architecture Bento</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
              Stack Teknologi &amp; Standar Rekayasa
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl leading-relaxed font-mono">
              Bento grid terintegrasi tanpa rongga kosong yang mengawasi performa, type-safety, dan ekosistem frontend modern.
            </p>
          </div>
        </FadeBlurIn>

        {/* Gapless Bento Grid with grid-flow-dense */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 grid-flow-dense">
          {/* Card 1: Core Frameworks Interactive Sandbox (2 cols, 2 rows) */}
          <div className="col-span-1 md:col-span-2 md:row-span-2 group double-bezel relative overflow-hidden">
            <Spotlight size={360} color="var(--accent-subtle)" />
            <div className="double-bezel-inner p-8 space-y-6 h-full flex flex-col justify-between relative z-10">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent)] uppercase tracking-wider">
                    <Browsers size={18} weight="bold" />
                    <span>Core Web Engine</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono">
                    ● Production Verified
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                  Next.js, React 19, &amp; TypeScript
                </h3>

                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-mono">
                  Arsitektur frontend performa tinggi yang digunakan dalam sistem informasi pemerintah daerah dan aplikasi web tingkat produksi.
                </p>

                {/* Benchmark Tab Switcher */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {(["nextjs", "react", "ts", "tailwind"] as const).map((key) => (
                    <button
                      key={key}
                      onClick={() => setActiveBenchmark(key)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                        activeBenchmark === key
                          ? "bg-[var(--accent)] text-[var(--bg-main)] font-semibold shadow-sm"
                          : "bg-[var(--bg-main)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]"
                      }`}
                    >
                      {key.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Telemetry Box */}
              <div className="p-5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-subtle)] space-y-3 font-mono">
                <div className="flex items-center justify-between text-xs border-b border-[var(--border-subtle)] pb-2">
                  <span className="text-[var(--accent)] font-semibold">
                    {benchmarks[activeBenchmark].title}
                  </span>
                  <span className="text-emerald-400">
                    {benchmarks[activeBenchmark].latency}
                  </span>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="text-[var(--text-secondary)]">
                    Strategy: <span className="text-[var(--text-primary)]">{benchmarks[activeBenchmark].renderStrategy}</span>
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed pt-1">
                    {benchmarks[activeBenchmark].description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Performance Audit Matrix (1 col, 1 row) */}
          <div className="col-span-1 group double-bezel relative overflow-hidden">
            <Spotlight size={240} color="var(--accent-subtle)" />
            <div className="double-bezel-inner p-6 space-y-4 h-full flex flex-col justify-between relative z-10">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent)] uppercase tracking-wider">
                  <Lightning size={16} weight="bold" />
                  <span>Audit Mutu Kode</span>
                </div>
                <h4 className="text-lg font-bold text-[var(--text-primary)]">
                  Lighthouse 95+ Standard
                </h4>
              </div>

              <div className="space-y-2 font-mono text-xs">
                <div className="flex justify-between items-center py-1 border-b border-[var(--border-subtle)]">
                  <span className="text-[var(--text-secondary)]">Performance</span>
                  <span className="text-emerald-400 font-bold">98 / 100</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[var(--border-subtle)]">
                  <span className="text-[var(--text-secondary)]">Accessibility</span>
                  <span className="text-emerald-400 font-bold">100 / 100</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[var(--border-subtle)]">
                  <span className="text-[var(--text-secondary)]">Best Practices</span>
                  <span className="text-emerald-400 font-bold">100 / 100</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-[var(--text-secondary)]">SEO &amp; Semantics</span>
                  <span className="text-emerald-400 font-bold">100 / 100</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Backend & Data Integrity (1 col, 1 row) */}
          <div className="col-span-1 group double-bezel relative overflow-hidden">
            <Spotlight size={240} color="var(--accent-subtle)" />
            <div className="double-bezel-inner p-6 space-y-4 h-full flex flex-col justify-between relative z-10">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent)] uppercase tracking-wider">
                  <Database size={16} weight="bold" />
                  <span>Data Layer Integration</span>
                </div>
                <h4 className="text-lg font-bold text-[var(--text-primary)]">
                  Backend &amp; Storage
                </h4>
              </div>

              <p className="text-xs text-[var(--text-secondary)] font-mono leading-relaxed">
                Integrasi RESTful API, Laravel Backend, PostgreSQL / MySQL, dan real-time event streaming Supabase.
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {["Laravel", "PostgreSQL", "Supabase", "REST API", "Zustand"].map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded bg-[var(--bg-main)] border border-[var(--border-subtle)] text-[10px] font-mono text-[var(--text-primary)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Card 4: Full Engineering Tooling Strip (3 cols) */}
          <div className="col-span-1 md:col-span-3 group double-bezel relative overflow-hidden">
            <Spotlight size={300} color="var(--accent-subtle)" />
            <div className="double-bezel-inner p-6 space-y-4 relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent)] uppercase tracking-wider">
                  <TerminalWindow size={16} weight="bold" />
                  <span>Developer Workflow &amp; Tooling</span>
                </div>
                <span className="text-[11px] font-mono text-[var(--text-secondary)]">
                  CI/CD &bull; Strict Linting &bull; Semantic Versioning
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 pt-2">
                {[
                  { name: "Git & GitHub", note: "Branching & PRs" },
                  { name: "Turbopack", note: "Instant HMR" },
                  { name: "Vite", note: "Rollup Bundler" },
                  { name: "Framer Motion", note: "GPU Physics" },
                  { name: "Postman", note: "API Contract" },
                  { name: "Tailwind CSS", note: "Design Tokens" },
                ].map((tool) => (
                  <div
                    key={tool.name}
                    className="p-3.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-subtle)] space-y-1 hover:border-[var(--accent)] transition-colors"
                  >
                    <div className="text-xs font-bold text-[var(--text-primary)]">
                      {tool.name}
                    </div>
                    <div className="text-[10px] font-mono text-[var(--text-secondary)]">
                      {tool.note}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
