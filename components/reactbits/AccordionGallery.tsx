"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Project } from "@/data/projects";
import {
  ArrowUpRight,
  GithubLogo,
  BookOpen,
  CheckCircle,
  Sparkle,
} from "@phosphor-icons/react";
import ClickSpark from "./ClickSpark";

export interface AccordionGalleryItem {
  image: string;
  label: string;
  link?: string;
  project?: Project;
}

interface AccordionGalleryProps {
  items: AccordionGalleryItem[] | Project[];
  defaultIndex?: number;
  expandRatio?: number;
  trigger?: "hover" | "click";
  onOpenModal?: (project: Project) => void;
  className?: string;
}

export default function AccordionGallery({
  items,
  defaultIndex = 0,
  expandRatio = 0.52,
  trigger = "hover",
  onOpenModal,
  className = "",
}: AccordionGalleryProps) {
  // Normalize items to consistent Project-aware structure
  const normalizedItems = items.map((item) => {
    if ("id" in item) {
      // It's a Project
      return {
        image: item.image,
        label: item.title,
        link: item.liveUrl || item.githubUrl || "#",
        project: item,
      };
    }
    return item;
  });

  const [activeIndex, setActiveIndex] = useState<number>(
    defaultIndex < normalizedItems.length ? defaultIndex : 0
  );

  const handleInteraction = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Desktop & Tablet: Horizontal Expanding Slices */}
      <div className="hidden md:flex gap-3 h-[560px] w-full rounded-2xl p-2 bg-[#0B0E14] border border-white/[0.08] overflow-hidden">
        {normalizedItems.map((item, idx) => {
          const isActive = activeIndex === idx;
          const proj = item.project;

          return (
            <motion.div
              key={idx}
              layout
              transition={{
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1],
              }}
              onMouseEnter={() => trigger === "hover" && handleInteraction(idx)}
              onClick={() => {
                if (!isActive) {
                  handleInteraction(idx);
                } else if (proj && onOpenModal) {
                  onOpenModal(proj);
                }
              }}
              style={{
                flex: isActive ? expandRatio * 10 : 1,
              }}
              className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border ${
                isActive
                  ? "border-[#38BDF8]/40 shadow-[0_0_30px_rgba(56,189,248,0.12)]"
                  : "border-white/[0.06] hover:border-white/20 opacity-75 hover:opacity-100"
              }`}
            >
              {/* Background Image with Zoom & Dark Gradient */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  sizes="(max-width: 1200px) 100vw, 800px"
                  className={`object-cover transition-transform duration-700 ease-out ${
                    isActive ? "scale-105" : "scale-100 filter grayscale-[40%] contrast-110"
                  }`}
                  priority={idx === 0}
                />
                {/* Gradient Overlays for High-Contrast Readability */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    isActive
                      ? "bg-gradient-to-t from-[#0B0E14] via-[#0B0E14]/80 to-black/40"
                      : "bg-[#0B0E14]/75 hover:bg-[#0B0E14]/60"
                  }`}
                />
              </div>

              {/* Collapsed State View (Vertical text & index) */}
              {!isActive && (
                <div className="absolute inset-0 flex flex-col justify-between items-center py-6 px-2 z-10 select-none">
                  <span className="font-mono text-xs font-semibold text-[#38BDF8] px-2 py-1 rounded bg-[#0B0E14]/80 border border-white/10">
                    0{idx + 1}
                  </span>

                  <div className="flex-1 flex items-center justify-center">
                    <span
                      className="font-mono text-xs uppercase tracking-widest text-[#E7E9EE] whitespace-nowrap -rotate-90 origin-center drop-shadow-md"
                      style={{ writingMode: "vertical-rl" }}
                    >
                      {proj?.category || item.label}
                    </span>
                  </div>

                  <span className="w-2 h-2 rounded-full bg-white/20" />
                </div>
              )}

              {/* Active State View: Rich Project Narrative & Actions */}
              <AnimatePresence mode="wait">
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, delay: 0.15 }}
                    className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between z-10 text-left"
                  >
                    {/* Top: Category Tag, Timeline & Number */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-md bg-[#0B0E14]/90 backdrop-blur-md border border-[#38BDF8]/30 text-xs font-mono text-[#38BDF8] flex items-center gap-1.5 shadow-sm">
                          <Sparkle size={13} weight="fill" className="text-[#38BDF8]" />
                          <span>{proj?.category || "Project"}</span>
                        </span>
                        {proj?.timeline && (
                          <span className="px-2.5 py-1 rounded-md bg-[#0B0E14]/80 backdrop-blur-sm border border-white/10 text-[11px] font-mono text-[#8B92A3]">
                            {proj.timeline}
                          </span>
                        )}
                      </div>

                      <span className="font-mono text-xs font-semibold text-[#8B92A3]">
                        0{idx + 1} / 0{normalizedItems.length}
                      </span>
                    </div>

                    {/* Middle: Title, Description, Tech Stack & Key Highlights */}
                    <div className="space-y-4 max-w-[640px]">
                      <div className="space-y-2">
                        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#E7E9EE] leading-snug drop-shadow-md">
                          {item.label}
                        </h3>
                        {proj?.tagline && (
                          <p className="text-xs sm:text-sm font-mono text-[#38BDF8]/90">
                            {proj.tagline}
                          </p>
                        )}
                        <p className="text-xs sm:text-sm text-[#8B92A3] leading-relaxed line-clamp-3">
                          {proj?.description || "Klik tombol di bawah untuk meninjau studi kasus arsitektur lengkap."}
                        </p>
                      </div>

                      {/* Tech Stack Pills */}
                      {proj?.techStack && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {proj.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-0.5 rounded-full bg-[#12161F]/90 backdrop-blur-md border border-white/[0.08] text-[11px] font-mono text-[#E7E9EE]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Key Impact Metrics */}
                      {proj?.metrics && (
                        <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/[0.08]">
                          {proj.metrics.map((m, mIdx) => (
                            <div key={mIdx}>
                              <div className="text-base sm:text-lg font-bold font-mono text-[#E7E9EE]">
                                {m.value}
                              </div>
                              <div className="text-[10px] text-[#8B92A3] uppercase tracking-wider">
                                {m.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bottom: Action Buttons (STAR Case Study Modal + External links) */}
                    <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
                      {proj && onOpenModal ? (
                        <ClickSpark sparkColor="#38BDF8" sparkCount={6}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenModal(proj);
                            }}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#38BDF8] hover:bg-[#0284c7] text-[#0B0E14] text-xs font-semibold transition-all active:scale-[0.98] shadow-sm hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] cursor-pointer"
                          >
                            <BookOpen size={15} weight="bold" />
                            <span>Baca Studi Kasus (STAR)</span>
                          </button>
                        </ClickSpark>
                      ) : item.link && item.link !== "#" ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#38BDF8] hover:bg-[#0284c7] text-[#0B0E14] text-xs font-semibold transition-all"
                        >
                          <span>Buka Detail</span>
                          <ArrowUpRight size={15} weight="bold" />
                        </a>
                      ) : (
                        <div />
                      )}

                      <div className="flex items-center gap-2">
                        {proj?.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-2.5 rounded-lg bg-[#12161F]/90 hover:bg-white/[0.08] border border-white/[0.08] text-[#8B92A3] hover:text-[#38BDF8] transition-colors flex items-center justify-center"
                            title="Buka Live Demo"
                          >
                            <ArrowUpRight size={16} weight="bold" />
                          </a>
                        )}

                        {proj?.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-2.5 rounded-lg bg-[#12161F]/90 hover:bg-white/[0.08] border border-white/[0.08] text-[#8B92A3] hover:text-[#38BDF8] transition-colors flex items-center justify-center"
                            title="Lihat Source Code GitHub"
                          >
                            <GithubLogo size={16} weight="fill" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile: Vertical Accordion Cards */}
      <div className="md:hidden space-y-4">
        {normalizedItems.map((item, idx) => {
          const isActive = activeIndex === idx;
          const proj = item.project;

          return (
            <div
              key={idx}
              onClick={() => handleInteraction(idx)}
              className={`double-bezel transition-all overflow-hidden cursor-pointer ${
                isActive ? "border-[#38BDF8]/40" : ""
              }`}
            >
              <div className="double-bezel-inner overflow-hidden">
                {/* Header Preview */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12161F] via-[#12161F]/60 to-transparent" />
                  
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#0B0E14]/90 border border-white/10 text-[11px] font-mono text-[#38BDF8]">
                    {proj?.category || item.label}
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                    <h3 className="text-base font-bold text-[#E7E9EE] line-clamp-1">
                      {item.label}
                    </h3>
                    <span className="text-xs font-mono text-[#38BDF8]">
                      {isActive ? "▲" : "▼"}
                    </span>
                  </div>
                </div>

                {/* Expanded Content on Mobile */}
                {isActive && (
                  <div className="p-5 space-y-4 border-t border-white/[0.06]">
                    <p className="text-xs text-[#8B92A3] leading-relaxed">
                      {proj?.description}
                    </p>

                    {proj?.techStack && (
                      <div className="flex flex-wrap gap-1.5">
                        {proj.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded bg-[#0B0E14] border border-white/[0.06] text-[10px] font-mono text-[#8B92A3]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {proj && onOpenModal && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenModal(proj);
                        }}
                        className="w-full py-2.5 rounded-lg bg-[#38BDF8] text-[#0B0E14] text-xs font-semibold flex items-center justify-center gap-2"
                      >
                        <BookOpen size={16} weight="bold" />
                        <span>Baca Studi Kasus STAR</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
