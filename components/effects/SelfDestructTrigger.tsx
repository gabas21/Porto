"use client";

import React, { useState } from "react";
import { Warning, Skull } from "@phosphor-icons/react";
import { soundFx } from "@/lib/audio-fx";

export default function SelfDestructTrigger() {
  const [hovered, setHovered] = useState(false);

  const handleTrigger = () => {
    soundFx.playAlarmKlaxon();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("trigger-self-destruct"));
    }
  };

  return (
    <div className="w-full flex items-center justify-center pt-6 pb-2">
      {/* Sleek Minimalist Terminal Control Capsule */}
      <div
        onMouseEnter={() => {
          setHovered(true);
          soundFx.playHover();
        }}
        onMouseLeave={() => setHovered(false)}
        className="group relative inline-flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[var(--surface-card)]/80 hover:bg-[var(--surface-card-hover)] border border-[var(--border-subtle)] hover:border-red-500/30 transition-all duration-300 shadow-sm hover:shadow-md backdrop-blur-md select-none"
      >
        {/* Subtle Status Indicator */}
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-[var(--text-secondary)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
          </span>
          <span className="font-semibold uppercase hidden sm:inline">System Purge Protocol</span>
        </div>

        {/* The Sleek Danger Capsule Button */}
        <button
          type="button"
          onClick={handleTrigger}
          className="relative overflow-hidden inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/25 hover:border-red-500/50 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider transition-all active:scale-95 cursor-pointer shadow-xs"
          aria-label="Self-destruct trigger"
        >
          <Warning size={13} weight="fill" className="text-amber-500 dark:text-amber-400 animate-pulse" />
          <span>DO NOT CLICK</span>
          <Skull size={13} weight="bold" className="opacity-70" />
        </button>

        {/* Micro-warning hint */}
        <span className="text-[10px] font-mono text-[var(--text-secondary)] opacity-50 hidden md:inline">
          (Experimental)
        </span>
      </div>
    </div>
  );
}

