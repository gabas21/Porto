"use client";

import Image from "next/image";
import { Project } from "@/data/projects";
import { X, ArrowUpRight, GithubLogo, CheckCircle, Cpu, Stack } from "@phosphor-icons/react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Click outside to close backdrop */}
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-3xl my-8 bg-[#12161F] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 text-left">
        {/* Top Header Bar */}
        <div className="sticky top-0 bg-[#12161F]/95 backdrop-blur-md border-b border-white/[0.08] px-6 py-4 flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded-full bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20 text-xs font-mono">
              {project.category}
            </span>
            <span className="text-xs text-[#8B92A3] font-mono">
              {project.timeline}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#0B0E14] border border-white/10 text-[#8B92A3] hover:text-[#E7E9EE] hover:border-white/20 transition-colors"
            aria-label="Tutup modal"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[80vh] overflow-y-auto">
          {/* Main Image Mockup */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-[#0B0E14]">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
            />
          </div>

          {/* Title & Tagline */}
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#E7E9EE]">
              {project.title}
            </h3>
            <p className="text-sm font-mono text-[#38BDF8]">
              {project.tagline}
            </p>
            <p className="text-sm text-[#8B92A3] leading-relaxed pt-1">
              {project.description}
            </p>
          </div>

          {/* Metrics Highlight Bar */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-[#0B0E14] border border-white/[0.06]">
            {project.metrics.map((metric, idx) => (
              <div key={idx} className="text-center">
                <div className="text-lg sm:text-xl font-bold font-mono text-[#38BDF8]">
                  {metric.value}
                </div>
                <div className="text-[11px] text-[#8B92A3] mt-0.5">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* STAR Methodology Section */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#8B92A3] flex items-center gap-2">
              <Stack size={14} weight="bold" className="text-[#38BDF8]" />
              <span>Studi Kasus &amp; Metodologi STAR</span>
            </h4>

            <div className="grid gap-4">
              {/* Situation */}
              <div className="p-4 rounded-xl bg-[#0B0E14] border border-white/[0.06] space-y-1">
                <div className="text-xs font-semibold text-[#E7E9EE] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Situasi &amp; Tantangan</span>
                </div>
                <p className="text-xs sm:text-sm text-[#8B92A3] leading-relaxed pl-4">
                  {project.situation}
                </p>
              </div>

              {/* Action */}
              <div className="p-4 rounded-xl bg-[#0B0E14] border border-white/[0.06] space-y-1">
                <div className="text-xs font-semibold text-[#E7E9EE] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
                  <span>Tindakan Rekayasa &amp; Arsitektur</span>
                </div>
                <p className="text-xs sm:text-sm text-[#8B92A3] leading-relaxed pl-4">
                  {project.action}
                </p>
              </div>

              {/* Impact */}
              <div className="p-4 rounded-xl bg-[#0B0E14] border border-white/[0.06] space-y-1">
                <div className="text-xs font-semibold text-[#E7E9EE] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Dampak Nyata &amp; Hasil Akhir</span>
                </div>
                <p className="text-xs sm:text-sm text-[#8B92A3] leading-relaxed pl-4">
                  {project.impact}
                </p>
              </div>
            </div>
          </div>

          {/* Architecture Highlights */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#8B92A3] flex items-center gap-2">
              <Cpu size={14} weight="bold" className="text-[#38BDF8]" />
              <span>Sorotan Arsitektur Teknis</span>
            </h4>
            <ul className="space-y-2">
              {project.architecturePoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#8B92A3]">
                  <CheckCircle size={16} weight="fill" className="text-[#38BDF8] shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Badges */}
          <div className="space-y-2 pt-2 border-t border-white/[0.06]">
            <div className="text-xs font-mono text-[#8B92A3]">
              Teknologi yang Digunakan:
            </div>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-md bg-[#0B0E14] border border-white/[0.08] text-xs font-mono text-[#E7E9EE]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-4 border-t border-white/[0.08] flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#38BDF8] hover:bg-[#0284c7] text-[#0B0E14] font-semibold text-xs transition-colors"
              >
                <span>Buka Live Demo</span>
                <ArrowUpRight weight="bold" className="w-3.5 h-3.5" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0B0E14] hover:bg-white/[0.06] border border-white/10 text-[#E7E9EE] text-xs font-medium transition-colors"
              >
                <GithubLogo size={16} weight="fill" />
                <span>Lihat Source Code di GitHub</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
