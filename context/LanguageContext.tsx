"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { id, TranslationDictionary } from "@/data/locales/id";
import { en } from "@/data/locales/en";

export type Language = "id" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language | ((prev: Language) => Language)) => void;
  toggleLanguage: () => void;
  t: TranslationDictionary;
}

const dictionaries: Record<Language, TranslationDictionary> = {
  id,
  en,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("id");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("lang") as Language | null;
      if (savedLang === "id" || savedLang === "en") {
        setLanguageState(savedLang);
        document.documentElement.setAttribute("lang", savedLang);
      } else if (typeof navigator !== "undefined") {
        const browserLang = navigator.language?.toLowerCase().startsWith("id") ? "id" : "en";
        setLanguageState(browserLang);
        document.documentElement.setAttribute("lang", browserLang);
      }
    } catch {
      // Fallback to default
    }
    setMounted(true);
  }, []);

  const setLanguage = useCallback((langOrUpdater: Language | ((prev: Language) => Language)) => {
    setLanguageState((prev) => {
      const next = typeof langOrUpdater === "function" ? langOrUpdater(prev) : langOrUpdater;
      try {
        localStorage.setItem("lang", next);
        document.documentElement.setAttribute("lang", next);
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === "id" ? "en" : "id"));
  }, [setLanguage]);

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    t: dictionaries[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
