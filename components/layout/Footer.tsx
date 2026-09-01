"use client";

import { useEffect, useState } from "react";
import FadeBlurIn from "@/components/reactbits/FadeBlurIn";
import SelfDestructTrigger from "@/components/effects/SelfDestructTrigger";

export default function Footer() {
  const [witaTime, setWitaTime] = useState<string>("");

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
        }) + " WITA (UTC+8)"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer id="contact" className="relative w-full bg-[var(--bg-main)] text-[var(--text-primary)] pt-20 sm:pt-24 pb-10 sm:pb-12 px-4 sm:px-6 md:px-16 overflow-hidden border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center space-y-12 sm:space-y-16">
        {/* Top Info Grid */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-xs font-mono text-[var(--text-secondary)] border-b border-[var(--border-subtle)] pb-12 sm:pb-16 text-left">
          <div>
            <p className="text-[var(--text-primary)] mb-3 uppercase font-bold tracking-wider">Navigation</p>
            <ul className="space-y-2">
              <li><a href="#about" className="hover:text-[var(--accent)] transition-colors">About</a></li>
              <li><a href="#services" className="hover:text-[var(--accent)] transition-colors">Services</a></li>
              <li><a href="#works" className="hover:text-[var(--accent)] transition-colors">Works</a></li>
              <li><a href="#skills" className="hover:text-[var(--accent)] transition-colors">Skills</a></li>
              <li><a href="#experience" className="hover:text-[var(--accent)] transition-colors">Experience</a></li>
            </ul>
          </div>

          <div>
            <p className="text-[var(--text-primary)] mb-3 uppercase font-bold tracking-wider">Socials</p>
            <ul className="space-y-2">
              <li><a href="https://linkedin.com/in/bagasaditya" target="_blank" rel="noreferrer" className="hover:text-[var(--accent)] transition-colors">LinkedIn</a></li>
              <li><a href="https://github.com/gabas21" target="_blank" rel="noreferrer" className="hover:text-[var(--accent)] transition-colors">GitHub</a></li>
              <li><a href="https://wa.me/6282159888947" target="_blank" rel="noreferrer" className="hover:text-[var(--accent)] transition-colors">WhatsApp</a></li>
            </ul>
          </div>

          <div>
            <p className="text-[var(--text-primary)] mb-3 uppercase font-bold tracking-wider">Local Time</p>
            <p className="text-[var(--accent)] font-mono text-sm">{witaTime || "Loading..."}</p>
            <p className="text-[11px] text-[var(--text-secondary)] mt-1">Samarinda, East Kalimantan</p>
          </div>

          <div>
            <p className="text-[var(--text-primary)] mb-3 uppercase font-bold tracking-wider">Contact Directly</p>
            <a href="mailto:bagasa020@gmail.com" className="text-[var(--text-primary)] hover:text-[var(--accent)] underline block font-mono break-all">
              bagasa020@gmail.com
            </a>
            <p className="text-[11px] text-[var(--text-secondary)] mt-1 font-mono">+62 821-5988-8947</p>
          </div>
        </div>

        {/* Giant Editorial Name */}
        <FadeBlurIn>
          <h1 className="text-[13vw] sm:text-[14vw] font-extrabold tracking-tighter text-[var(--text-primary)]/90 select-none leading-none text-center uppercase font-display">
            BAGAS ADITYA
          </h1>
        </FadeBlurIn>

        {/* Copyright & Meta Bar */}
        <div className="w-full pt-6 sm:pt-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[var(--text-secondary)] gap-3 sm:gap-4 text-center sm:text-left">
          <span>Designed &amp; Coded by Bagas Aditya Anugrah Ramadhan</span>
          <span>&copy; {new Date().getFullYear()} &bull; Samarinda, Indonesia</span>
        </div>

        {/* 💥 Forbidden Self-Destruct Protocol Module 💣 */}
        <SelfDestructTrigger />
      </div>
    </footer>
  );
}
