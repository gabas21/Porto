"use client";

import { useEffect, useState } from "react";
import FadeBlurIn from "@/components/reactbits/FadeBlurIn";
import { soundFx } from "@/lib/audio-fx";
import {
  ArrowUp,
  ArrowUpRight,
  EnvelopeSimple,
  WhatsappLogo,
  GithubLogo,
  LinkedinLogo,
  FileText,
  Copy,
  Check,
} from "@phosphor-icons/react";

export default function Footer() {
  const [witaTime, setWitaTime] = useState<string>("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const email = "bagasa020@gmail.com";

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setWitaTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Makassar", // WITA (Samarinda, Kalimantan Timur)
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }) + " WITA"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenContact = () => {
    soundFx.playSweep();
    window.dispatchEvent(new CustomEvent("open-contact-modal"));
  };

  const handleOpenCV = () => {
    soundFx.playSweep();
    window.dispatchEvent(new CustomEvent("open-cv-modal"));
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    soundFx.playClick();
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      className="relative w-full bg-[var(--bg-main)] text-[var(--text-primary)] pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 md:px-12 lg:px-16 3xl:px-24 overflow-hidden border-t border-[var(--border-subtle)]"
    >
      <div className="max-w-7xl 3xl:max-w-[1700px] 4xl:max-w-[2000px] mx-auto space-y-16 lg:space-y-20">
        
        {/* ── 1. HIGH-END EDITORIAL CALL TO ACTION (CTA CARD) ── */}
        <FadeBlurIn>
          <div className="relative rounded-3xl p-8 sm:p-10 md:p-14 bg-gradient-to-br from-[var(--surface-card)] via-[var(--surface-card)]/80 to-[var(--surface-card)]/40 border border-[var(--border-subtle)] shadow-xl overflow-hidden backdrop-blur-md">
            {/* Subtle background glow element */}
            <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[var(--accent)]/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 sm:gap-10">
              {/* Left CTA Text */}
              <div className="space-y-3 max-w-2xl text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-main)]/80 border border-[var(--border-subtle)] text-xs font-mono text-[var(--accent)]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Siap Memulai Proyek Baru</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)] font-display leading-[1.15]">
                  Punya ide proyek atau ingin berkolaborasi?
                </h2>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] font-sans leading-relaxed">
                  Terbuka untuk pembuatan website instansi pemerintah, sistem informasi, aplikasi web interaktif modern, maupun diskusi peluang kerja profesional.
                </p>
              </div>

              {/* Right CTA Action Buttons */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={handleOpenContact}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-3.5 rounded-full bg-[var(--accent)] text-black font-bold text-sm tracking-tight shadow-md hover:shadow-lg hover:shadow-[var(--accent)]/20 hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                >
                  <EnvelopeSimple size={18} weight="bold" />
                  <span>Kirim Pesan</span>
                </button>

                <button
                  type="button"
                  onClick={handleOpenCV}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3.5 rounded-full bg-[var(--surface-card-hover)] hover:bg-[var(--surface-card)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--accent)]/40 font-semibold text-sm transition-all active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  <FileText size={17} weight="bold" className="text-[var(--accent)]" />
                  <span>Preview CV</span>
                </button>

                <a
                  href="https://wa.me/6282159888947"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3.5 rounded-full bg-[#059669] hover:bg-[#047857] text-white font-semibold text-sm shadow-sm active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  <WhatsappLogo size={19} weight="fill" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </FadeBlurIn>

        {/* ── 2. STRUCTURED DIRECTORY & INFORMATION GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 text-left border-b border-[var(--border-subtle)] pb-12 sm:pb-16">
          
          {/* Col 1: Identity & Statement (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-[var(--accent)] text-black flex items-center justify-center font-display font-extrabold text-sm shadow-sm">
                  BA
                </span>
                <h3 className="text-xl font-bold tracking-tight text-[var(--text-primary)] font-display">
                  Bagas Aditya
                </h3>
              </div>
              <p className="text-xs font-mono text-[var(--accent)] uppercase tracking-wider">
                Frontend Developer &amp; Creative UI Engineer
              </p>
            </div>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-md font-sans">
              Mahasiswa Teknik Informatika STMIK Widya Cipta Dharma. Berdedikasi merancang antarmuka web yang terstruktur, semantik, berkinerja tinggi, dan responsif.
            </p>

            {/* Live WITA Local Clock Pill */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[var(--surface-card)] border border-[var(--border-subtle)] shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-xs font-mono text-[var(--text-secondary)]">
                  Samarinda:
                </span>
                <span className="text-xs font-mono font-bold text-[var(--text-primary)]">
                  {witaTime || "Loading..."}
                </span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Sitemap (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-xs font-mono uppercase font-bold tracking-wider text-[var(--text-primary)]">
              Navigasi
            </p>
            <ul className="space-y-2.5 text-sm font-sans text-[var(--text-secondary)]">
              <li>
                <a href="#about" className="hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1">
                  <span>Tentang</span>
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1">
                  <span>Layanan</span>
                </a>
              </li>
              <li>
                <a href="#works" className="hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1">
                  <span>Karya Proyek</span>
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1">
                  <span>Tech Arsenal</span>
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1">
                  <span>Pengalaman</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Socials & Connect (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-xs font-mono uppercase font-bold tracking-wider text-[var(--text-primary)]">
              Jaringan
            </p>
            <ul className="space-y-2.5 text-sm font-sans text-[var(--text-secondary)]">
              <li>
                <a
                  href="https://linkedin.com/in/bagasaditya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1.5 group"
                >
                  <LinkedinLogo size={16} weight="fill" />
                  <span>LinkedIn</span>
                  <ArrowUpRight size={12} className="opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/gabas21"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1.5 group"
                >
                  <GithubLogo size={16} weight="fill" />
                  <span>GitHub</span>
                  <ArrowUpRight size={12} className="opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/6282159888947"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1.5 group"
                >
                  <WhatsappLogo size={16} weight="fill" />
                  <span>WhatsApp</span>
                  <ArrowUpRight size={12} className="opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Contact & Copy (3 cols on lg) */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs font-mono uppercase font-bold tracking-wider text-[var(--text-primary)]">
              Kontak Langsung
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-[var(--surface-card)] border border-[var(--border-subtle)]">
                <EnvelopeSimple size={16} weight="bold" className="text-[var(--accent)] shrink-0 ml-1" />
                <span className="text-xs font-mono text-[var(--text-primary)] truncate select-all">
                  {email}
                </span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="ml-auto p-1.5 rounded-lg hover:bg-[var(--surface-card-hover)] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors cursor-pointer"
                  title="Salin Email"
                >
                  {copiedEmail ? <Check size={14} weight="bold" className="text-emerald-500" /> : <Copy size={14} />}
                </button>
              </div>
              <p className="text-xs font-mono text-[var(--text-secondary)] pl-1">
                Tel / WA: +62 821-5988-8947
              </p>
            </div>
          </div>
        </div>

        {/* ── 3. BOTTOM BAR & BACK TO TOP ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--text-secondary)] text-center sm:text-left pt-2">
          <div>
            &copy; {new Date().getFullYear()} Bagas Aditya Anugrah Ramadhan. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-[var(--text-secondary)]/60">
              Samarinda, Kalimantan Timur &bull; Indonesia
            </span>

            {/* Back to Top Button */}
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--surface-card)] hover:bg-[var(--surface-card-hover)] border border-[var(--border-subtle)] hover:border-[var(--accent)]/40 text-[var(--text-primary)] transition-all cursor-pointer active:scale-95 shadow-sm"
              title="Kembali ke Bagian Paling Atas"
            >
              <span>Atas</span>
              <ArrowUp size={12} weight="bold" className="text-[var(--accent)]" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
