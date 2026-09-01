"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Sparkle, ChatCircleDots } from "@phosphor-icons/react";
import { soundFx } from "@/lib/audio-fx";
import AITwinTerminalModal from "./AITwinTerminalModal";

export default function AITwinFloatingButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleToggle = () => {
    if (!isOpen) {
      soundFx.playTerminalOpen();
      setIsOpen(true);
    } else {
      soundFx.playTerminalClose();
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Floating HUD Trigger Docked Bottom Right */}
      <div className="fixed bottom-5 right-5 z-[9900] flex items-center gap-2.5 pointer-events-auto select-none">
        {/* Micro Tooltip on Hover */}
        <AnimatePresence>
          {isHovered && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.95 }}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--surface-card)]/90 border border-[var(--border-subtle)] dark:border-emerald-500/30 text-[11px] font-mono text-[var(--text-primary)] shadow-lg shadow-black/5 dark:shadow-black/50 backdrop-blur-md"
            >
              <Sparkle size={12} weight="fill" className="text-emerald-500 animate-spin" />
              <span>Tanya Bagas AI Twin</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Minimalist AI Orb Button */}
        <motion.button
          type="button"
          onClick={handleToggle}
          onMouseEnter={() => {
            setIsHovered(true);
            soundFx.playHover();
          }}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex items-center gap-2.5 p-1.5 sm:p-2 pr-3.5 rounded-full bg-[var(--surface-card)]/90 hover:bg-[var(--surface-card-hover)] border border-[var(--border-subtle)] hover:border-emerald-500/40 text-[var(--text-primary)] shadow-lg shadow-black/5 dark:shadow-emerald-950/40 backdrop-blur-xl transition-all duration-300 cursor-pointer"
          aria-label="Open Bagas AI Twin Terminal"
        >
          {/* Minimalist Luxury AI Neural Node SVG Emblem */}
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center bg-[var(--surface-card-hover)] border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.2)] group-hover:border-emerald-400 transition-all">
            {/* Geometric Neural Sparkle Icon */}
            <svg
              className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-emerald-500 dark:text-emerald-400 transition-transform duration-500 group-hover:rotate-45"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"
                fill="url(#ai-emerald-grad)"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="12" r="2.2" fill="#34D399" className="animate-pulse" />
              <defs>
                <linearGradient id="ai-emerald-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#34D399" stopOpacity="0.8" />
                  <stop offset="1" stopColor="#059669" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>

            {/* Green beacon dot */}
            <span className="absolute bottom-0 right-0 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-white dark:border-black" />
            </span>
          </div>

          {/* Label Badge */}
          <div className="flex flex-col text-left">
            <span className="text-[11px] font-mono font-bold tracking-wider text-[var(--text-primary)] flex items-center gap-1">
              AI TWIN
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[9px] font-mono text-[var(--text-secondary)] font-medium">
              Ask Me Anything
            </span>
          </div>
        </motion.button>
      </div>

      {/* Terminal Chat Modal */}
      <AITwinTerminalModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
