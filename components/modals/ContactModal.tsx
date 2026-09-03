"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  EnvelopeSimple,
  WhatsappLogo,
  PaperPlaneTilt,
  Copy,
  Check,
  Sparkle,
  ChatCircleDots,
  User,
  Phone,
  Briefcase,
} from "@phosphor-icons/react";
import { soundFx } from "@/lib/audio-fx";
import confetti from "canvas-confetti";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SERVICE_OPTIONS = [
  "Full-Time Frontend Role",
  "Freelance Web Project",
  "Slicing Figma to Next.js / Tailwind",
  "Konsultasi Arsitektur Web",
  "Lainnya / Diskusi Santai",
];

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [serviceType, setServiceType] = useState(SERVICE_OPTIONS[0]);
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const emailAddress = "bagasa020@gmail.com";
  const whatsappNumber = "6282159888947";

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleCopyEmail = () => {
    soundFx.playClick();
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#FACC15", "#38BDF8", "#34D399", "#FFFFFF"],
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playClick();

    const subject = encodeURIComponent(`[Inquiry] ${serviceType} - dari ${name || "Klien"}`);
    const body = encodeURIComponent(
      `Halo Bagas Aditya,\n\nNama: ${name || "-"}\nKontak/WhatsApp/Email: ${contact || "-"}\nTopik: ${serviceType}\n\nPesan:\n${message || "Halo Bagas, saya tertarik untuk mendiskusikan peluang kerja sama dengan Anda."}\n\nTerima kasih!`
    );

    window.open(`mailto:${emailAddress}?subject=${subject}&body=${body}`, "_blank");
  };

  const handleSendWhatsApp = () => {
    soundFx.playClick();

    const text = encodeURIComponent(
      `Halo Bagas Aditya! 👋\n\n*Nama:* ${name || "-"}\n*Topik:* ${serviceType}\n*Kontak:* ${contact || "-"}\n\n*Pesan:*\n${message || "Halo Bagas, saya tertarik berdiskusi mengenai proyek/peluang kerja."}`
    );

    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", stiffness: 420, damping: 30 }}
            className="relative w-full max-w-xl bg-[var(--surface-card)] border border-[var(--border-subtle)] rounded-3xl shadow-2xl overflow-hidden z-10 text-left my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient Backlight Header Glow */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[var(--accent)]/15 via-transparent to-transparent pointer-events-none" />

            {/* Header */}
            <div className="flex items-start justify-between p-6 sm:p-7 border-b border-[var(--border-subtle)] relative">
              <div className="space-y-1.5 pr-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Available for Work &bull; Samarinda, ID</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)] font-display pt-1">
                  Hubungi Bagas Aditya<span className="text-[var(--accent)]">.</span>
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans">
                  Isi formulir singkat di bawah atau hubungi langsung via WhatsApp & Email.
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={() => {
                  soundFx.playClick();
                  onClose();
                }}
                className="p-2 rounded-full bg-[var(--bg-main)] hover:bg-[var(--surface-card-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)] transition-colors cursor-pointer shrink-0"
                aria-label="Tutup Modal"
              >
                <X size={18} weight="bold" />
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSendEmail} className="p-6 sm:p-7 space-y-4">
              {/* Row 1: Name & Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-1.5">
                    <User size={13} className="text-[var(--accent)]" />
                    <span>Nama / Perusahaan</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Bpk. Hendra / PT Digital"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-subtle)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] text-xs sm:text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/50 font-mono outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-1.5">
                    <Phone size={13} className="text-[var(--accent)]" />
                    <span>Email / No. WhatsApp</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="nama@email.com / 0812..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-subtle)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] text-xs sm:text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/50 font-mono outline-none transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Service / Topic Type */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-1.5">
                  <Briefcase size={13} className="text-[var(--accent)]" />
                  <span>Kebutuhan / Topik Diskusi</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SERVICE_OPTIONS.map((opt) => {
                    const isSelected = serviceType === opt;
                    return (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => {
                          soundFx.playClick();
                          setServiceType(opt);
                        }}
                        className={`text-left px-3 py-2 rounded-xl text-xs font-mono transition-all border cursor-pointer ${
                          isSelected
                            ? "bg-[var(--accent)] text-[var(--accent-fg)] font-semibold border-[var(--accent)] shadow-xs"
                            : "bg-[var(--bg-main)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border-[var(--border-subtle)] hover:border-[var(--accent)]/40"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 3: Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-1.5">
                  <ChatCircleDots size={13} className="text-[var(--accent)]" />
                  <span>Pesan / Rincian Singkat (Opsional)</span>
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ceritakan proyek, timeline, atau detail tawaran yang ingin Anda diskusikan..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-subtle)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] text-xs sm:text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/50 font-mono outline-none transition-all resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
                {/* Primary: Send via Email */}
                <button
                  type="submit"
                  className="w-full sm:flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[var(--accent)] hover:opacity-95 text-[var(--accent-fg)] font-bold text-xs sm:text-sm transition-all shadow-md active:scale-[0.98] cursor-pointer"
                >
                  <PaperPlaneTilt size={16} weight="bold" />
                  <span>Kirim Pesan via Email</span>
                </button>

                {/* WhatsApp Direct Option */}
                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-semibold text-xs sm:text-sm transition-all shadow-sm active:scale-[0.98] cursor-pointer"
                >
                  <WhatsappLogo size={16} weight="fill" />
                  <span>Kirim WhatsApp</span>
                </button>

                {/* Copy Email Pill */}
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3.5 py-3 rounded-xl bg-[var(--bg-main)] hover:bg-[var(--surface-card-hover)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-mono text-xs transition-colors cursor-pointer"
                  title="Salin alamat email"
                >
                  {copied ? (
                    <>
                      <Check size={14} weight="bold" className="text-emerald-400" />
                      <span className="text-emerald-400">Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Salin</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
