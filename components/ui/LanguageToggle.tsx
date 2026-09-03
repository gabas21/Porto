"use client";

import React from "react";
import { motion } from "motion/react";
import { useLanguage, Language } from "@/context/LanguageContext";
import { soundFx } from "@/lib/audio-fx";

interface LanguageToggleProps {
  className?: string;
}

export function LanguageToggle({ className = "" }: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage();

  const handleSelect = (lang: Language) => {
    if (lang !== language) {
      soundFx.playPop();
      setLanguage(lang);
    }
  };

  return (
    <div
      role="group"
      aria-label="Language Selector"
      className={`relative inline-flex items-center p-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.08] border border-black/[0.08] dark:border-white/15 backdrop-blur-md shadow-sm select-none ${className}`}
    >
      {(["id", "en"] as Language[]).map((lang) => {
        const isActive = language === lang;
        return (
          <button
            key={lang}
            type="button"
            onClick={() => handleSelect(lang)}
            aria-pressed={isActive}
            className={`relative px-2.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider rounded-full transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
              isActive
                ? "text-black dark:text-black"
                : "text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeLangIndicator"
                transition={{ type: "spring", stiffness: 450, damping: 32 }}
                className="absolute inset-0 rounded-full bg-[var(--accent)] shadow-[0_2px_8px_rgba(250,204,21,0.35)] -z-10"
              />
            )}
            <span>{lang}</span>
          </button>
        );
      })}
    </div>
  );
}
