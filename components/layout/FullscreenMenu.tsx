"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { X, ArrowUpRight } from "lucide-react";
import { soundFx } from "@/lib/audio-fx";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageToggle } from "../ui/LanguageToggle";

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FullscreenMenu({ isOpen, onClose }: MenuProps) {
  const { t, language } = useLanguage();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const menuLinks = [
    { num: "01", title: language === "id" ? "Beranda" : "Home", href: "/", tag: language === "id" ? "Kembali ke Atas & Gambaran Umum" : "Return to Top & Overview" },
    { num: "02", title: t.nav.about, href: "#about", tag: language === "id" ? "Filosofi Rekayasa & Rekam Jejak" : "Engineering Story & Philosophy" },
    { num: "03", title: t.nav.services, href: "#services", tag: language === "id" ? "Pilar Layanan & Kapabilitas Teknis" : "Core Pillars & What I Bring" },
    { num: "04", title: t.nav.works, href: "#works", tag: language === "id" ? "Karya Pilihan & Kajian STAR" : "Selected Projects & Case Studies" },
    { num: "05", title: t.nav.skills, href: "#skills", tag: language === "id" ? "Persenjataan Teknologi & Alat Kerja" : "Technical Arsenal & Tools" },
    { num: "06", title: t.nav.experience, href: "#experience", tag: language === "id" ? "Linimasa Karier & Riwayat Produksi" : "Career Timeline & Production Roles" },
    { num: "07", title: t.nav.contact, href: "mailto:bagasa020@gmail.com", tag: language === "id" ? "Mulai Komunikasi & Diskusi Proyek" : "Get in Touch & Inquiries" },
  ];

  const handleClose = () => {
    soundFx.playClick();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/75 dark:bg-black/85 backdrop-blur-2xl p-4 sm:p-6"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="relative w-full max-w-3xl rounded-3xl bg-[var(--surface-card)] border border-[var(--border-subtle)] p-6 sm:p-10 md:p-12 flex flex-col justify-between shadow-[0_30px_70px_-15px_rgba(0,0,0,0.6)] overflow-hidden"
          >
            {/* Header / Close Button */}
            <div className="flex items-center justify-between pb-5 border-b border-[var(--border-subtle)]">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse" />
                <span className="text-xs font-mono tracking-widest uppercase text-[var(--text-secondary)]">
                  Navigation Menu &bull; Directory
                </span>
              </div>

              <div className="flex items-center gap-3">
                <LanguageToggle />
                <button
                  onClick={handleClose}
                  className="group flex items-center gap-2 py-1.5 px-3.5 rounded-full bg-[var(--surface-card-hover)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:bg-[var(--accent)] hover:text-black hover:border-[var(--accent)] transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
                  aria-label="Close menu"
                >
                  <span className="text-xs font-mono font-medium hidden sm:inline">ESC // Close</span>
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Menu Links with Magnetic Pill Hover & Kinetic Typography */}
            <div
              className="flex flex-col space-y-1.5 sm:space-y-2 my-6 sm:my-8"
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {menuLinks.map((link, idx) => {
                const isHovered = hoveredIdx === idx;
                return (
                  <motion.div
                    key={link.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 + idx * 0.035 }}
                    onMouseEnter={() => {
                      soundFx.playHover();
                      setHoveredIdx(idx);
                    }}
                    className="relative"
                  >
                    <Link
                      href={link.href}
                      onClick={handleClose}
                      className="group relative z-10 flex items-center justify-between py-2.5 sm:py-3.5 px-4 sm:px-5 rounded-2xl transition-all duration-300"
                    >
                      {/* Left: Number + Title + Subtitle */}
                      <div className="flex items-center gap-4 sm:gap-6">
                        <span
                          className={`text-xs sm:text-sm font-mono transition-all duration-300 ${
                            isHovered
                              ? "text-[var(--accent)] font-bold scale-110"
                              : "text-[var(--text-secondary)]"
                          }`}
                        >
                          {link.num}
                        </span>

                        <div className="flex flex-col">
                          <span
                            className={`text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight transition-all duration-300 ${
                              isHovered
                                ? "text-[var(--accent)] translate-x-2"
                                : "text-[var(--text-primary)]"
                            }`}
                          >
                            {link.title}
                          </span>
                          
                          <span
                            className={`text-[10px] sm:text-xs font-mono transition-all duration-300 hidden sm:block ${
                              isHovered
                                ? "opacity-90 translate-x-2 text-[var(--text-secondary)]"
                                : "opacity-0 h-0 overflow-hidden"
                            }`}
                          >
                            // {link.tag}
                          </span>
                        </div>
                      </div>

                      {/* Right: Interactive 3D Arrow Action Pill */}
                      <div
                        className={`flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border transition-all duration-300 ${
                          isHovered
                            ? "bg-[var(--accent)] text-black border-[var(--accent)] scale-110 rotate-45 shadow-[0_0_16px_rgba(191,255,4,0.4)]"
                            : "bg-transparent text-[var(--text-secondary)] border-[var(--border-subtle)]"
                        }`}
                      >
                        <ArrowUpRight size={18} />
                      </div>
                    </Link>

                    {/* Fluid Sliding Background Pill Indicator */}
                    {isHovered && (
                      <motion.div
                        layoutId="menu-hover-pill"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                        className="absolute inset-0 rounded-2xl bg-white/[0.08] dark:bg-white/[0.05] border border-white/10 dark:border-white/[0.08] backdrop-blur-md shadow-sm -z-0"
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Footer Information */}
            <div className="pt-5 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-[var(--text-secondary)] gap-3">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Bagas Aditya Anugrah Ramadhan &mdash; Samarinda, ID
              </span>
              <a
                href="mailto:bagasa020@gmail.com"
                className="hover:text-[var(--accent)] transition-colors underline decoration-[var(--border-subtle)] hover:decoration-[var(--accent)]"
              >
                bagasa020@gmail.com ↗
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
