"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  WhatsappLogo,
  PaperPlaneTilt,
  Copy,
  Check,
  CheckCircle,
  WarningCircle,
  CircleNotch,
  ChatCircleDots,
  User,
  Phone,
  Briefcase,
  ArrowsClockwise,
  ArrowSquareOut,
} from "@phosphor-icons/react";
import { soundFx } from "@/lib/audio-fx";
import confetti from "canvas-confetti";
import { useLanguage } from "@/context/LanguageContext";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { t, language } = useLanguage();
  const serviceOptions =
    language === "id"
      ? [
          "Peluang Kerja Full-Time",
          "Proyek Web Freelance / Kontrak",
          "Slicing Figma ke Next.js / Tailwind",
          "Konsultasi Arsitektur Web Instansi",
          "Lainnya / Diskusi Santai",
        ]
      : [
          "Full-Time Frontend Role",
          "Freelance / Contract Web Project",
          "Figma Slicing to Next.js / Tailwind",
          "Government / Enterprise Web Consulting",
          "Other / General Technical Discussion",
        ];

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [serviceType, setServiceType] = useState(serviceOptions[0]);
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [copied, setCopied] = useState(false);

  // Form submission state
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const emailAddress = "bagasa020@gmail.com";
  const whatsappNumber = "6282159888947";

  // Reset status when modal closes
  useEffect(() => {
    if (!isOpen) {
      const timeout = setTimeout(() => {
        setStatus("idle");
        setErrorMessage("");
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

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
      particleCount: 35,
      spread: 50,
      origin: { y: 0.7 },
      colors: ["#FACC15", "#38BDF8", "#34D399", "#FFFFFF"],
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDirectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playClick();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          contact,
          serviceType,
          message,
          honeypot,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Gagal mengirim pesan otomatis.");
      }

      setStatus("success");
      soundFx.playSuccess();
      confetti({
        particleCount: 80,
        spread: 75,
        origin: { y: 0.6 },
        colors: ["#FACC15", "#38BDF8", "#34D399", "#FFFFFF"],
      });
    } catch (err: unknown) {
      console.error("Contact Form Error:", err);
      soundFx.playPop();
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : t.contactModal.errorMessage || "Terjadi kesalahan saat mengirim pesan."
      );
    }
  };

  const handleSendWhatsApp = () => {
    soundFx.playClick();
    const text = encodeURIComponent(
      `Halo Bagas Aditya! 👋\n\n*Nama:* ${name || "-"}\n*Topik:* ${serviceType}\n*Kontak:* ${contact || "-"}\n\n*Pesan:*\n${message || "Halo Bagas, saya tertarik berdiskusi mengenai proyek/peluang kerja."}`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank");
  };

  const handleSendMailtoFallback = () => {
    soundFx.playClick();
    const subject = encodeURIComponent(`[Inquiry] ${serviceType} - dari ${name || "Klien"}`);
    const body = encodeURIComponent(
      `Halo Bagas Aditya,\n\nNama: ${name || "-"}\nKontak: ${contact || "-"}\nTopik: ${serviceType}\n\nPesan:\n${message || "Halo Bagas, saya tertarik untuk mendiskusikan peluang kerja sama dengan Anda."}\n\nTerima kasih!`
    );
    window.open(`mailto:${emailAddress}?subject=${subject}&body=${body}`, "_blank");
  };

  const handleResetForm = () => {
    soundFx.playClick();
    setName("");
    setContact("");
    setMessage("");
    setStatus("idle");
    setErrorMessage("");
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
                  {t.contactModal.title}
                  <span className="text-[var(--accent)]">.</span>
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans">
                  {t.contactModal.subtitle}
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

            {/* ── SUCCESS STATE VIEW ── */}
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-7 sm:p-9 text-center space-y-5"
              >
                <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_24px_rgba(52,211,153,0.25)]">
                  <CheckCircle size={36} weight="fill" />
                </div>

                <div className="space-y-2">
                  <h4 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] font-display">
                    {t.contactModal.successTitle}
                  </h4>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
                    {t.contactModal.successDesc}
                  </p>
                </div>

                {/* Sent Summary Card */}
                <div className="bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-2xl p-4 text-left text-xs font-mono space-y-1.5 max-w-md mx-auto">
                  <div className="flex justify-between text-[var(--text-secondary)]">
                    <span>Pengirim:</span>
                    <span className="text-[var(--text-primary)] font-semibold">{name}</span>
                  </div>
                  <div className="flex justify-between text-[var(--text-secondary)]">
                    <span>Kontak:</span>
                    <span className="text-[var(--text-primary)] font-semibold">{contact}</span>
                  </div>
                  <div className="flex justify-between text-[var(--text-secondary)]">
                    <span>Topik:</span>
                    <span className="text-[var(--accent)] font-semibold">{serviceType}</span>
                  </div>
                </div>

                {/* Action Controls */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleResetForm}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--bg-main)] hover:bg-[var(--surface-card-hover)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-semibold text-xs transition-all cursor-pointer"
                  >
                    <ArrowsClockwise size={15} />
                    <span>{t.contactModal.sendAnother || "Kirim Pesan Lain"}</span>
                  </button>

                  <button
                    onClick={handleSendWhatsApp}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-semibold text-xs transition-all cursor-pointer"
                  >
                    <WhatsappLogo size={16} weight="fill" />
                    <span>Lanjut di WhatsApp ↗</span>
                  </button>

                  <button
                    onClick={() => {
                      soundFx.playClick();
                      onClose();
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--accent)] hover:opacity-95 text-[var(--accent-fg)] font-bold text-xs transition-all cursor-pointer"
                  >
                    <span>{t.contactModal.closeModal || "Selesai"}</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              /* ── FORM VIEW ── */
              <form onSubmit={handleDirectSubmit} className="p-6 sm:p-7 space-y-4">
                {/* Honeypot Spam Trap (Hidden for screen readers and bots) */}
                <input
                  type="text"
                  name="honeypot"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Error Banner Alert */}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-400 text-xs flex items-start gap-2.5"
                  >
                    <WarningCircle size={18} weight="fill" className="shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-semibold">{errorMessage}</p>
                      <div className="flex gap-3 pt-1">
                        <button
                          type="button"
                          onClick={handleSendWhatsApp}
                          className="underline hover:text-rose-300 cursor-pointer font-bold inline-flex items-center gap-1"
                        >
                          <WhatsappLogo size={12} weight="fill" /> Kirim via WhatsApp
                        </button>
                        <button
                          type="button"
                          onClick={handleSendMailtoFallback}
                          className="underline hover:text-rose-300 cursor-pointer font-bold inline-flex items-center gap-1"
                        >
                          <ArrowSquareOut size={12} /> Buka Mail App
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Row 1: Name & Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-1.5">
                      <User size={13} className="text-[var(--accent)]" />
                      <span>{t.contactModal.nameLabel}</span>
                    </label>
                    <input
                      type="text"
                      required
                      disabled={status === "submitting"}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t.contactModal.namePlaceholder}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-subtle)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] text-xs sm:text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/50 font-mono outline-none transition-all disabled:opacity-60"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-1.5">
                      <Phone size={13} className="text-[var(--accent)]" />
                      <span>{t.contactModal.emailLabel} / WA</span>
                    </label>
                    <input
                      type="text"
                      required
                      disabled={status === "submitting"}
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder={t.contactModal.emailPlaceholder}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-subtle)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] text-xs sm:text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/50 font-mono outline-none transition-all disabled:opacity-60"
                    />
                  </div>
                </div>

                {/* Row 2: Service / Topic Type */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-1.5">
                    <Briefcase size={13} className="text-[var(--accent)]" />
                    <span>{t.contactModal.subjectLabel}</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {serviceOptions.map((opt) => {
                      const isSelected = serviceType === opt;
                      return (
                        <button
                          type="button"
                          key={opt}
                          disabled={status === "submitting"}
                          onClick={() => {
                            soundFx.playClick();
                            setServiceType(opt);
                          }}
                          className={`text-left px-3 py-2 rounded-xl text-xs font-mono transition-all border cursor-pointer disabled:opacity-60 ${
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
                    <span>{t.contactModal.messageLabel}</span>
                  </label>
                  <textarea
                    rows={3}
                    required
                    disabled={status === "submitting"}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.contactModal.messagePlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-subtle)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] text-xs sm:text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/50 font-mono outline-none transition-all resize-none disabled:opacity-60"
                  />
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
                  {/* Primary: Direct API Submit */}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full sm:flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[var(--accent)] hover:opacity-95 text-[var(--accent-fg)] font-bold text-xs sm:text-sm transition-all shadow-md active:scale-[0.98] cursor-pointer disabled:opacity-75"
                  >
                    {status === "submitting" ? (
                      <>
                        <CircleNotch size={16} weight="bold" className="animate-spin" />
                        <span>{t.contactModal.sendingBtn}</span>
                      </>
                    ) : (
                      <>
                        <PaperPlaneTilt size={16} weight="bold" />
                        <span>{t.contactModal.submitBtn}</span>
                      </>
                    )}
                  </button>

                  {/* WhatsApp Direct Option */}
                  <button
                    type="button"
                    disabled={status === "submitting"}
                    onClick={handleSendWhatsApp}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-semibold text-xs sm:text-sm transition-all shadow-sm active:scale-[0.98] cursor-pointer disabled:opacity-60"
                  >
                    <WhatsappLogo size={16} weight="fill" />
                    <span>WhatsApp</span>
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
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
