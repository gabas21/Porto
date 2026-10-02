"use client";

import React, { useId } from "react";
import { motion } from "motion/react";
import { useLanguage, Language } from "@/context/LanguageContext";
import { soundFx } from "@/lib/audio-fx";

interface LanguageToggleProps {
  className?: string;
  size?: "sm" | "md";
}

export function LanguageToggle({ className = "", size = "md" }: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage();
  const instanceId = useId();

  const handleSelect = (lang: Language) => {
    if (lang !== language) {
      soundFx.playPop();
      setLanguage(lang);
    }
  };

  const isSmall = size === "sm";

  return (
    <div
      role="group"
      aria-label="Language Selector"
      className={`relative inline-flex items-center p-0.5 sm:p-1 rounded-full bg-white/95 dark:bg-[var(--surface-card)]/95 border border-black/[0.08] dark:border-white/15 backdrop-blur-xl shadow-sm select-none ${
        isSmall ? "h-[32px]" : "h-[36px] sm:h-[38px]"
      } ${className}`}
    >
      {(["id", "en"] as Language[]).map((lang) => {
        const isActive = language === lang;
        return (
          <button
            key={lang}
            type="button"
            onClick={() => handleSelect(lang)}
            aria-pressed={isActive}
            className={`relative min-w-[28px] sm:min-w-[32px] h-full flex items-center justify-center px-2 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider rounded-full transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
              isActive
                ? "text-black font-extrabold"
                : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId={`activeLangIndicator-${instanceId}`}
                transition={{
                  type: "spring",
                  stiffness: 420,
                  damping: 30,
                  mass: 0.8,
                }}
                className="absolute inset-0 rounded-full bg-[var(--accent)] shadow-[0_2px_8px_rgba(250,204,21,0.45),inset_0_1px_1px_rgba(255,255,255,0.7)] -z-10"
              />
            )}
            <span className="relative z-10 leading-none">{lang}</span>
          </button>
        );
      })}
    </div>
  );
}

