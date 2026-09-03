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

    // Honor prefers-reduced-motion or repeat visits in same session
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadyVisited = typeof window !== "undefined" && sessionStorage.getItem("porto_preloader_seen") === "true";

    if (reducedMotion || alreadyVisited) {
      // Jika sudah pernah melihat preloader di sesi ini, angkat tirai instan
      gsap.to(curtain, {
        yPercent: -102,
        duration: 0.35,
        ease: "power3.inOut",
        onStart: () => {
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("preloader-curtain-lift"));
          }
        },
        onComplete: finish,
      });
      return;
    }

    // Tandai sudah melihat preloader
    sessionStorage.setItem("porto_preloader_seen", "true");

    // Safety fallback: 3 detik max
    const safetyTimer = setTimeout(() => {
      gsap.to(curtain, {
        yPercent: -102,
        duration: 0.4,
        ease: "power3.inOut",
        overwrite: true,
        onComplete: finish,
      });
    }, 3000);

    const ctx = gsap.context(() => {
      // Urutan animasi dinamis & responsif (~1.3s - 1.4s total):
      // 1. Dot pulse cepat
      // 2. Teks greeting masuk
      // 3. Progress line tumbuh cepat
      // 4. Siklus salam nusantara yang dinamis & ringkas
      // 5. Tirai terbuka dengan kurva expo halus

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
        { scale: 1, opacity: 1, duration: 0.2, ease: "back.out(2)" }
      );

      // Phase 2: Teks pertama masuk dari bawah
      tl.fromTo(
        [textRef.current, originRef.current],
        { opacity: 0, y: 10, filter: "blur(4px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.25, ease: "power3.out", stagger: 0.04 },
        "-=0.05"
      );

      // Phase 3: Progress line tumbuh cepat
      tl.fromTo(
        progressLineRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.2, ease: "power2.inOut", transformOrigin: "left center" },
        "-=0.08"
      );

      // Diam sangat sebentar pada salam pertama
      tl.to({}, { duration: 0.12 });

      // Transisi salam nusantara yang cepat, tajam & bersih
      const transitionGreeting = (idx: number, gap = 0.08) => {
        tl.to({}, { duration: gap });
        tl.to([textRef.current, originRef.current], {
          opacity: 0,
          y: -8,
          filter: "blur(3px)",
          duration: 0.12,
          ease: "power2.in",
          onComplete: () => {
            if (textRef.current) textRef.current.textContent = greetings[idx].text;
            if (originRef.current) originRef.current.textContent = greetings[idx].origin;
          },
        });
        tl.fromTo(
          [textRef.current, originRef.current],
          { opacity: 0, y: 8, filter: "blur(3px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.16, ease: "power3.out", stagger: 0.03 }
        );
      };

      transitionGreeting(1);
      transitionGreeting(2);
      transitionGreeting(3, 0.1);

      // Skip hint fade in saat salam terakhir tampil
      tl.fromTo(
        skipHintRef.current,
        { opacity: 0, y: 4 },
        { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" },
        "-=0.1"
      );

      // Diam sejenak di "Selamat Datang"
      tl.to({}, { duration: 0.2 });

      // Phase 5: Tirai naik — split curtain effect cepat & mewah
      tl.to(
        [textRef.current, originRef.current, dotRef.current, progressLineRef.current, skipHintRef.current],
        { opacity: 0, y: -6, duration: 0.18, ease: "power2.in", stagger: 0.02 }
      );

      tl.to(
        curtain,
        {
          yPercent: -102,
          duration: 0.55,
          ease: "expo.inOut",
          onStart: () => {
            if (typeof window !== "undefined") {
              window.dispatchEvent(new CustomEvent("preloader-curtain-lift"));
            }
          },
        },
        "-=0.06"
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
