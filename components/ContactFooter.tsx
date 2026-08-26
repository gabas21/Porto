"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import {
  EnvelopeSimple,
  Copy,
  Check,
  GithubLogo,
  LinkedinLogo,
  WhatsappLogo,
  ArrowUpRight,
  MapPin,
  GraduationCap,
} from "@phosphor-icons/react";
import FadeBlurIn from "./reactbits/FadeBlurIn";
import MagnetButton from "./reactbits/MagnetButton";
import ClickSpark from "./reactbits/ClickSpark";
import ShinyText from "./reactbits/ShinyText";

export default function ContactFooter() {
  const [copied, setCopied] = useState(false);
  const emailAddress = "bagasa020@gmail.com";
  const phoneFormatted = "+62 821-5988-8947";
  const whatsappUrl = "https://wa.me/6282159888947";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.85 },
      colors: ["#60A5FA", "#2E4C8C", "#FFF4E2", "#34d399"],
    });

    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer id="contact" className="py-36 md:py-48 px-6 border-t border-[var(--border-subtle)] relative bg-grid-pattern overflow-hidden">
      {/* Background soft ambient blur */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[320px] bg-[var(--accent)]/10 blur-[160px] rounded-full pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-[1240px] mx-auto space-y-16">
        {/* Main Kinetic CTA Card */}
        <FadeBlurIn>
          <div className="double-bezel relative overflow-hidden">
            <div className="double-bezel-inner p-8 sm:p-16 text-center space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <ShinyText text="Status: Terbuka untuk Tawaran Kerja & Proyek Web" speed={3.5} className="text-emerald-400 font-medium" />
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] max-w-3xl mx-auto leading-[1.12]">
                Mari Bekerja Sama &amp; Wujudkan Web Berkualitas Tinggi
              </h2>

              <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed font-mono">
                Tertarik merekrut untuk posisi Frontend Developer, kolaborasi proyek sistem instansi, atau integrasi aplikasi web modern? Saya siap berdiskusi.
              </p>

              {/* Email & WhatsApp Quick Interactions */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <div className="flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-[var(--bg-main)] border border-[var(--border-subtle)] text-xs sm:text-sm font-mono text-[var(--text-primary)] shadow-sm">
                  <EnvelopeSimple size={18} className="text-[var(--accent)]" />
                  <span>{emailAddress}</span>
                </div>

                <ClickSpark sparkColor="var(--accent)" sparkCount={8}>
                  <MagnetButton strength={0.3}>
                    <button
                      onClick={handleCopyEmail}
                      className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-[var(--accent)] text-[var(--bg-main)] font-semibold text-xs transition-all active:scale-[0.98] shadow-sm hover:shadow-[0_0_24px_var(--accent-subtle)] cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check size={16} weight="bold" />
                          <span>Email Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={16} weight="bold" />
                          <span>Salin Alamat Email</span>
                        </>
                      )}
                    </button>
                  </MagnetButton>
                </ClickSpark>

                <MagnetButton strength={0.2}>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold transition-all active:scale-[0.98] cursor-pointer shadow-sm"
                  >
                    <WhatsappLogo size={16} weight="fill" />
                    <span>Chat WhatsApp</span>
                  </a>
                </MagnetButton>
              </div>
            </div>
          </div>
        </FadeBlurIn>

        {/* Social Links & Meta Info Bar */}
        <div className="pt-8 border-t border-[var(--border-subtle)] flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[var(--text-secondary)] font-mono">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <span>&copy; {new Date().getFullYear()} Bagas Aditya Anugrah Ramadhan.</span>
            <span className="hidden sm:inline opacity-30">&bull;</span>
            <span className="flex items-center gap-1">
              <MapPin size={13} />
              <span>Samarinda, Kalimantan Timur</span>
            </span>
          </div>

          {/* Social Profiles from CV */}
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/gabas21"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[var(--accent)] transition-colors"
            >
              <GithubLogo size={16} weight="fill" />
              <span>github.com/gabas21</span>
            </a>

            <a
              href="https://linkedin.com/in/bagasaditya"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[var(--accent)] transition-colors"
            >
              <LinkedinLogo size={16} weight="fill" />
              <span>linkedin.com/in/bagasaditya</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
