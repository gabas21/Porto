"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const greetings = [
  { text: "Tabe' Pun", origin: "Kutai (Kalimantan Timur)" },
  { text: "Adil Ka' Talino", origin: "Dayak (Kalimantan)" },
  { text: "Sampurasun", origin: "Nusantara" },
  { text: "Selamat Datang", origin: "Bagas Aditya Portfolio" },
];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const curtainRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const originRef = useRef<HTMLParagraphElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const skipHintRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("preloader-curtain-lift"));
    }
    onComplete();
  };

  useEffect(() => {
    const curtain = curtainRef.current;
    if (!curtain) return;

    // Honor prefers-reduced-motion
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      finish();
      return;
    }

    // Safety fallback: 5 detik max
    const safetyTimer = setTimeout(() => {
      gsap.to(curtain, {
        yPercent: -100,
        duration: 0.5,
        ease: "power3.inOut",
        overwrite: true,
        onComplete: finish,
      });
    }, 5000);

    const ctx = gsap.context(() => {
      // Urutan animasi yg termotivasi secara naratif:
      // 1. Dot accent pulse in  →  sinyal hidup / pembukaan identitas
      // 2. Teks greeting fade in  →  sapaan budaya regional
      // 3. Progress line tumbuh  →  komunikasi "loading berlangsung"
      // 4. Salam bergantian  →  perjalanan nusantara ke tujuan portfolio
      // 5. Tirai slide-up belah vertikal  →  "layar teater terbuka"

      const tl = gsap.timeline({
        onComplete: () => {
          clearTimeout(safetyTimer);
          finish();
        },
      });

      // Phase 1: Entri dot pulse
      tl.fromTo(
        dotRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(2)" }
      );

      // Phase 2: Teks pertama masuk dari bawah
      tl.fromTo(
        [textRef.current, originRef.current],
        { opacity: 0, y: 14, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.45, ease: "power3.out", stagger: 0.07 },
        "-=0.1"
      );

      // Phase 3: Progress line tumbuh (komunikasi "loading")
      tl.fromTo(
        progressLineRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.35, ease: "power2.inOut", transformOrigin: "left center" },
        "-=0.1"
      );

      // Diam sebentar pada salam pertama
      tl.to({}, { duration: 0.25 });

      // Fungsi transisi salam yang halus — blur out → text swap → blur in
      const transitionGreeting = (idx: number, gap = 0.15) => {
        tl.to({}, { duration: gap });
        tl.to([textRef.current, originRef.current], {
          opacity: 0,
          y: -10,
          filter: "blur(4px)",
          duration: 0.18,
          ease: "power2.in",
          onComplete: () => {
            if (textRef.current) textRef.current.textContent = greetings[idx].text;
            if (originRef.current) originRef.current.textContent = greetings[idx].origin;
          },
        });
        tl.fromTo(
          [textRef.current, originRef.current],
          { opacity: 0, y: 12, filter: "blur(6px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.28, ease: "power3.out", stagger: 0.06 }
        );
      };

      transitionGreeting(1);
      transitionGreeting(2);
      transitionGreeting(3, 0.2);

      // Skip hint fade in saat salam terakhir tampil
      tl.fromTo(
        skipHintRef.current,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
        "-=0.2"
      );

      // Diam sebentar di "Selamat Datang"
      tl.to({}, { duration: 0.35 });

      // Phase 5: Tirai naik — split curtain effect
      // Elemen utama (curtain) slide up, sementara konten fade out lebih cepat
      tl.to(
        [textRef.current, originRef.current, dotRef.current, progressLineRef.current, skipHintRef.current],
        { opacity: 0, y: -8, duration: 0.25, ease: "power2.in", stagger: 0.03 }
      );

      tl.to(
        curtain,
        {
          yPercent: -102, // sedikit lebih dari 100 agar tidak ada garis sisa
          duration: 0.9,
          ease: "expo.inOut",
          onStart: () => {
            if (typeof window !== "undefined") {
              window.dispatchEvent(new CustomEvent("preloader-curtain-lift"));
            }
          },
        },
        "-=0.08"
      );
    }, curtain);

    return () => {
      clearTimeout(safetyTimer);
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Skip on click/tap
  const handleSkip = () => {
    const curtain = curtainRef.current;
    if (!curtain) { finish(); return; }
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("preloader-curtain-lift"));
    }
    gsap.to(curtain, {
      yPercent: -102,
      duration: 0.55,
      ease: "expo.inOut",
      overwrite: true,
      onComplete: finish,
    });
  };

  return (
    // Tirai hitam: fixed, z-[1000], will-change: transform agar GPU-accelerated
    <div
      ref={curtainRef}
      onClick={handleSkip}
      style={{ willChange: "transform" }}
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#090A0C] cursor-pointer select-none"
      aria-label="Preloader — klik untuk skip"
    >

      {/* Centre greeting block */}
      <div className="pointer-events-none relative flex flex-col items-center text-center gap-5 px-4">
        {/* Greeting text */}
        <div className="flex items-center gap-3">
          <span
            ref={dotRef}
            className="inline-block w-2.5 h-2.5 rounded-full bg-[#FACC15] flex-shrink-0"
            style={{ willChange: "transform, opacity" }}
          />
          <h1 className="font-mono text-2xl sm:text-[2.25rem] md:text-5xl font-light tracking-tight text-white leading-none">
            <span ref={textRef}>{greetings[0].text}</span>
          </h1>
        </div>

        {/* Region subtitle */}
        <p
          ref={originRef}
          className="text-[10px] sm:text-[11px] font-mono tracking-[0.22em] uppercase text-zinc-500 font-semibold"
        >
          {greetings[0].origin}
        </p>

        {/* Progress line — communicates "something is loading" */}
        <div className="w-16 h-px bg-zinc-800 mt-1 overflow-hidden">
          <div
            ref={progressLineRef}
            className="h-full bg-[#FACC15]"
            style={{ transformOrigin: "left center", willChange: "transform, opacity" }}
          />
        </div>
      </div>

      {/* Skip hint — appears only on last greeting */}
      <div
        ref={skipHintRef}
        className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] sm:text-[11px] font-mono tracking-[0.18em] uppercase text-zinc-600"
        style={{ opacity: 0 }}
      >
        tap anywhere to skip
      </div>
    </div>
  );
}
