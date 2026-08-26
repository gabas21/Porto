"use client";

import Image from "next/image";
import { Project } from "@/data/projects";
import { ArrowUpRight, GithubLogo, CheckCircle, BookOpen } from "@phosphor-icons/react";
import TiltCard from "./reactbits/TiltCard";
import Spotlight from "./reactbits/Spotlight";
import ClickSpark from "./reactbits/ClickSpark";

interface ProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
}

export default function ProjectCard({ project, onOpenModal }: ProjectCardProps) {
  return (
    <TiltCard maxTilt={5} className="h-full">
      <article className="group double-bezel flex flex-col justify-between h-full relative overflow-hidden transition-all duration-200">
        {/* Spotlight dynamic cursor glow inside the card */}
        <Spotlight size={300} color="rgba(56, 189, 248, 0.07)" />

        <div className="double-bezel-inner p-5 sm:p-6 flex flex-col justify-between h-full space-y-5 relative z-10">
          {/* Top: 16:9 High-Res Image Mockup */}
          <div className="space-y-4">
            <div
              onClick={() => onOpenModal(project)}
              className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/[0.08] bg-[#0B0E14] cursor-pointer group-hover:border-[#38BDF8]/40 transition-colors"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
              />

              {/* Category tag overlay */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#0B0E14]/90 backdrop-blur-sm border border-white/10 text-[11px] font-mono text-[#38BDF8]">
                {project.category}
              </div>

              {/* Quick click hint */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-3.5 py-1.5 rounded-full bg-[#0B0E14]/90 text-xs font-mono text-[#E7E9EE] border border-white/20 flex items-center gap-1.5 shadow-lg">
                  <BookOpen size={14} weight="bold" className="text-[#38BDF8]" />
                  <span>Baca Studi Kasus (STAR)</span>
                </span>
              </div>
            </div>

            {/* Header & Badges */}
            <div className="space-y-2">
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded bg-[#0B0E14] border border-white/[0.06] text-[10px] font-mono text-[#8B92A3]"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 3 && (
                  <span className="px-1.5 py-0.5 rounded bg-white/[0.02] text-[10px] font-mono text-[#8B92A3]">
                    +{project.techStack.length - 3}
                  </span>
                )}
              </div>

              <h3
                onClick={() => onOpenModal(project)}
                className="text-lg sm:text-xl font-bold text-[#E7E9EE] group-hover:text-[#38BDF8] transition-colors cursor-pointer"
              >
                {project.title}
              </h3>

              {/* Problem / Description */}
              <p className="text-xs sm:text-sm text-[#8B92A3] leading-relaxed line-clamp-2">
                {project.description}
              </p>
            </div>

            {/* Key Contributions & Results */}
            <div className="space-y-2 pt-2 border-t border-white/[0.04]">
              <div className="text-[11px] font-mono text-[#8B92A3] uppercase tracking-wider">
                Kontribusi &amp; Hasil Utama:
              </div>
              <ul className="space-y-1.5">
                {project.keyFeatures.map((feat, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs text-[#E7E9EE]/90 leading-relaxed"
                  >
                    <CheckCircle
                      size={14}
                      weight="fill"
                      className="text-[#38BDF8] shrink-0 mt-0.5"
                    />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom: Action Buttons */}
          <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
            <ClickSpark sparkColor="#38BDF8" sparkCount={6}>
              <button
                onClick={() => onOpenModal(project)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#38BDF8]/10 hover:bg-[#38BDF8] border border-[#38BDF8]/20 hover:border-[#38BDF8] text-[#38BDF8] hover:text-[#0B0E14] text-xs font-semibold transition-all duration-150 active:scale-[0.98] cursor-pointer"
              >
                <BookOpen size={14} weight="bold" />
                <span>Case Study</span>
              </button>
            </ClickSpark>

            <div className="flex items-center gap-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[#0B0E14] hover:bg-white/[0.06] border border-white/[0.08] text-[#8B92A3] hover:text-[#38BDF8] transition-colors"
                  title="Buka Live Demo"
                >
                  <ArrowUpRight size={16} weight="bold" />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[#0B0E14] hover:bg-white/[0.06] border border-white/[0.08] text-[#8B92A3] hover:text-[#38BDF8] transition-colors"
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
