"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Question, CaretDown, ChatCircleDots, ArrowUpRight, Sparkle } from "@phosphor-icons/react";
import { useLanguage } from "@/context/LanguageContext";
import FadeBlurIn from "@/components/reactbits/FadeBlurIn";
import { soundFx } from "@/lib/audio-fx";

export default function FAQSection() {
  const { t, language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First FAQ opened by default

  const toggleItem = (index: number) => {
    soundFx.playClick();
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faq"
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 3xl:px-16 4xl:px-24 bg-[var(--bg-main)] text-[var(--text-primary)] transition-colors duration-300 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl 3xl:max-w-6xl 4xl:max-w-7xl mx-auto space-y-12 sm:space-y-16">
        {/* Section Header */}
        <FadeBlurIn>
          <div className="space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface-card)] border border-[var(--border-subtle)] text-xs font-mono uppercase tracking-widest text-[var(--accent)] shadow-sm backdrop-blur-md">
              <Question size={14} weight="bold" />
              <span>{t.faq?.badge || "Frequently Asked Questions"}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.12] font-display">
              {t.faq?.titleMain || "Pertanyaan yang"}{" "}
              <span className="bg-gradient-to-r from-[var(--accent)] via-amber-300 to-yellow-500 bg-clip-text text-transparent font-extrabold">
                {t.faq?.titleHighlight || "Sering Diajukan"}
              </span>{" "}
              {t.faq?.titleSuffix || "seputar Layanan."}
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] font-sans leading-relaxed max-w-3xl">
              {t.faq?.subtitle ||
                "Informasi langsung dan transparan mengenai spesialisasi teknis, stack teknologi, cakupan layanan instansi, dan mekanisme kolaborasi kerja sama."}
            </p>
          </div>
        </FadeBlurIn>

        {/* Accordion List */}
        <div className="space-y-3 sm:space-y-4">
          {t.faq?.items?.map((item, idx) => {
            const isOpen = openIndex === idx;
            const itemNumber = String(idx + 1).padStart(2, "0");

            return (
              <FadeBlurIn key={idx} delay={0.06 * idx}>
                <div
                  className={`group rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "bg-[var(--surface-card)] border-[var(--accent)]/40 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)] ring-1 ring-[var(--accent)]/20"
                      : "bg-[var(--surface-card)]/60 border-[var(--border-subtle)] hover:border-[var(--border-subtle)]/80 hover:bg-[var(--surface-card)]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                    id={`faq-question-${idx}`}
                    className="w-full text-left py-5 px-5 sm:px-7 flex items-center justify-between gap-4 cursor-pointer select-none transition-colors"
                  >
                    <div className="flex items-center gap-3.5 sm:gap-5 flex-1 pr-2">
                      <span className="font-mono text-xs sm:text-sm font-bold text-[var(--accent)] shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                        {itemNumber}
                      </span>
                      <span className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-[var(--text-primary)] font-display group-hover:text-[var(--accent)] transition-colors leading-snug">
                        {item.q}
                      </span>
                    </div>

                    <div
                      className={`shrink-0 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full border transition-all duration-300 ${
                        isOpen
                          ? "bg-[var(--accent)] text-black border-[var(--accent)] rotate-180"
                          : "bg-transparent text-[var(--text-secondary)] border-[var(--border-subtle)] group-hover:border-[var(--text-primary)] group-hover:text-[var(--text-primary)]"
                      }`}
                    >
                      <CaretDown size={16} weight="bold" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${idx}`}
                        role="region"
                        aria-labelledby={`faq-question-${idx}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-7 pb-6 pt-1 text-sm sm:text-base text-[var(--text-secondary)] font-sans leading-relaxed border-t border-[var(--border-subtle)]/60">
                          <p className="pt-2">{item.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeBlurIn>
            );
          })}
        </div>

        {/* Bottom CTA Card */}
        <FadeBlurIn delay={0.3}>
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[var(--surface-card)] via-[var(--surface-card)] to-[var(--accent)]/10 border border-[var(--border-subtle)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-sm">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)]">
                <ChatCircleDots size={16} weight="bold" />
                <span>{language === "id" ? "Masih ada pertanyaan lain?" : "Have another technical question?"}</span>
              </div>
              <p className="text-base sm:text-lg font-bold text-[var(--text-primary)] font-display">
                {language === "id"
                  ? "Diskusikan langsung kebutuhan proyek web Anda dengan Bagas."
                  : "Discuss your upcoming web project directly with Bagas."}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href="https://wa.me/6282159888947"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playSweep()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--accent)] text-black font-semibold text-xs transition-transform active:scale-95 hover:opacity-95 shadow-md"
              >
                <span>WhatsApp (+62 821)</span>
                <ArrowUpRight size={14} weight="bold" />
              </a>
              <a
                href="mailto:bagasa020@gmail.com"
                onClick={() => soundFx.playSweep()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[var(--surface-card)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-medium text-xs hover:border-[var(--accent)] transition-colors"
              >
                <span>Email</span>
              </a>
            </div>
          </div>
        </FadeBlurIn>
      </div>
    </section>
  );
}
