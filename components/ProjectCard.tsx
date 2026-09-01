"use client";

import Image from "next/image";
import { Project } from "@/data/projects";
import { ArrowUpRight, GithubLogo, CheckCircle, BookOpen, Globe, Lock } from "@phosphor-icons/react";
import TiltCard from "./reactbits/TiltCard";
import { soundFx } from "@/lib/audio-fx";

interface ProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
}

export default function ProjectCard({ project, onOpenModal }: ProjectCardProps) {
  const handleClick = () => {
    soundFx.playClick();
    onOpenModal(project);
  };

  return (
    <TiltCard maxTilt={4} className="h-full">
      <article className="group double-bezel flex flex-col justify-between h-full relative overflow-hidden transition-all duration-300">
        <div className="double-bezel-inner p-5 sm:p-6 flex flex-col justify-between h-full space-y-5 relative z-10">


          {/* Top: High-Res Image Mockup Frame */}
          <div className="space-y-4">
            <div
              onClick={handleClick}
              className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-main)] cursor-pointer group-hover:border-[var(--accent)]/40 transition-colors"
            >
              {/* Chrome bar */}
              <div className="flex items-center justify-between px-3 py-1.5 border-b border-[var(--border-subtle)] bg-[var(--surface-card)]/70">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                  <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                  <span className="w-2 h-2 rounded-full bg-[#27C93F]" />
                </div>
                <span className="text-[10px] font-mono text-[var(--text-secondary)]">{project.timeline}</span>
              </div>

              <div className="relative w-full h-[calc(100%-25px)]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                />

                {/* Category tag overlay */}
                <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-[var(--bg-main)]/90 backdrop-blur-sm border border-[var(--border-subtle)] text-[10px] font-mono text-[var(--accent)]">
                  {project.category}
                </div>

                {/* Quick click hint */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3 py-1.5 rounded-full bg-black/80 text-xs font-mono text-white border border-white/20 flex items-center gap-1.5 shadow-lg">
                    <BookOpen size={14} weight="bold" />
                    <span>Baca Studi Kasus (STAR)</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Header & Badges */}
            <div className="space-y-2 text-left">
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded bg-[var(--bg-main)] border border-[var(--border-subtle)] text-[10px] font-mono text-[var(--text-secondary)]"
                  >
                    #{tech}
                  </span>
                ))}
                {project.techStack.length > 3 && (
                  <span className="px-1.5 py-0.5 rounded bg-[var(--bg-main)] text-[10px] font-mono text-[var(--text-secondary)]">
                    +{project.techStack.length - 3}
                  </span>
                )}
              </div>

              <h3
                onClick={() => onOpenModal(project)}
                className="text-lg sm:text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors cursor-pointer leading-snug"
              >
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                {project.description}
              </p>
            </div>

            {/* Key Contributions & Results */}
            <div className="space-y-2 pt-2 border-t border-[var(--border-subtle)] text-left">
              <div className="text-[11px] font-mono text-[var(--text-secondary)] uppercase tracking-wider">
                Kontribusi &amp; Hasil Utama:
              </div>
              <ul className="space-y-1.5">
                {project.keyFeatures.slice(0, 2).map((feat, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs text-[var(--text-primary)]/90 leading-relaxed font-sans"
                  >
                    <CheckCircle
                      size={14}
                      weight="fill"
                      className="text-[var(--accent)] shrink-0 mt-0.5"
                    />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom: Action Buttons */}
          <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between gap-3">
            <button
              onClick={() => onOpenModal(project)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[var(--accent)] text-[var(--accent-fg)] text-xs font-semibold transition-all active:scale-[0.98] cursor-pointer shadow-sm hover:opacity-90"
            >
              <BookOpen size={14} weight="bold" />
              <span>Case Study</span>
            </button>

            <div className="flex items-center gap-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[var(--bg-main)] hover:bg-[var(--surface-card-hover)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                  title="Buka Live Demo"
                >
                  <Globe size={16} weight="bold" />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[var(--bg-main)] hover:bg-[var(--surface-card-hover)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                  title="Lihat Source Code di GitHub"
                >
                  <GithubLogo size={16} weight="fill" />
                </a>
              )}
            </div>
          </div>
        </div>
      </article>
    </TiltCard>
  );
}


