"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import confetti from "canvas-confetti";
import { soundFx } from "@/lib/audio-fx";
import {
  Warning,
  Terminal,
  Sparkle,
  Cpu,
  ShieldCheck,
  Lightning,
  Flame,
} from "@phosphor-icons/react";

type DestructStage = "idle" | "glitch" | "shatter" | "terminal" | "rebirth";

export default function SelfDestructOverlay() {
  const [stage, setStage] = useState<DestructStage>("idle");
  const [terminalProgress, setTerminalProgress] = useState(0);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const handleTrigger = () => {
      if (stage !== "idle") return;
      startCinematicSequence();
    };

    window.addEventListener("trigger-self-destruct", handleTrigger);
    return () => window.removeEventListener("trigger-self-destruct", handleTrigger);
  }, [stage]);

  const startCinematicSequence = () => {
    // ── STAGE 1: Real 3D Tearing & Glitch Explosion (0.0s - 2.0s) ──
    setStage("glitch");
    soundFx.playAlarmKlaxon();

    // Violent 3D Perspective Screen Shake Physics on main page
    const mainEl = document.querySelector("main") || document.body;
    gsap.timeline({
      onComplete: () => {
        gsap.set(mainEl, { clearProps: "all" });
      },
    })
      .to(mainEl, {
        x: 16,
        y: 12,
        rotationZ: 1.5,
        skewX: 6,
        duration: 0.04,
        repeat: 45,
        yoyo: true,
        ease: "power1.inOut",
      })
      .set(mainEl, { clearProps: "all" });

    // ── STAGE 2: Fractal Glass Fracture & CRT Power-Down (at 2.0s) ──
    setTimeout(() => {
      setStage("shatter");
      soundFx.playGlassCrack();
      drawFractalGlass();
    }, 2000);

    // ── STAGE 3: Cyberpunk BIOS Recovery Terminal (at 3.6s) ──
    setTimeout(() => {
      setStage("terminal");
      soundFx.playSystemReboot();
      runTerminalRebuild();
    }, 3600);
  };

  // Canvas Fractal Glass Shatter with Radiating Web Cracks
  const drawFractalGlass = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    // Draw spiderweb rings
    const ringCount = 6;
    for (let r = 1; r <= ringCount; r++) {
      ctx.beginPath();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.75)";
      ctx.lineWidth = 1.8;
      ctx.shadowColor = "rgba(255, 255, 255, 0.9)";
      ctx.shadowBlur = 6;

      const radius = r * (Math.min(canvas.width, canvas.height) / (ringCount * 2.2));
      const vertices = 12;
      for (let v = 0; v <= vertices; v++) {
        const angle = (v / vertices) * Math.PI * 2;
        const offset = (Math.random() - 0.5) * 22;
        const x = cx + Math.cos(angle) * (radius + offset);
        const y = cy + Math.sin(angle) * (radius + offset);
        if (v === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }

    // Radiating sharp jagged fracture lines
    const rays = 18;
    for (let i = 0; i < rays; i++) {
      let x = cx;
      let y = cy;
      const angle = (i / rays) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
      ctx.beginPath();
      ctx.moveTo(x, y);

      const segments = 14;
      for (let s = 0; s < segments; s++) {
        const step = (Math.max(canvas.width, canvas.height) / segments) * 0.75;
        const currentAngle = angle + (Math.random() - 0.5) * 0.55;
        x += Math.cos(currentAngle) * step;
        y += Math.sin(currentAngle) * step;
        ctx.lineTo(x, y);

        // Branching sub-fractures
        if (Math.random() > 0.55) {
          ctx.moveTo(x, y);
          const subAngle = currentAngle + (Math.random() > 0.5 ? 0.75 : -0.75);
          ctx.lineTo(x + Math.cos(subAngle) * 55, y + Math.sin(subAngle) * 55);
          ctx.moveTo(x, y);
        }
      }
      ctx.stroke();
    }
  };

  // Interactive BIOS Terminal Restoration Sequence
  const runTerminalRebuild = () => {
    setTerminalLogs([]);
    setTerminalProgress(0);

    const logs = [
      "> [PANIC_0x00DEAD] User initiated system self-destruct.",
      "> [PURGE] Corrupted DOM subtrees & memory allocated... PURGED.",
      "> [RECOVERY] Querying Next.js 15 Turbopack cache repository...",
      "> [REBUILD] Compiling Server Components & CSS Tailwind tokens...",
      "> [REHYDRATE] React 19 fiber reconciliation... 100% OK.",
      "> [SECURITY] Integrity check passed. Initiating golden rebirth...",
    ];

    logs.forEach((msg, idx) => {
      setTimeout(() => {
        setTerminalLogs((prev) => [...prev, msg]);
        setTerminalProgress(Math.round(((idx + 1) / logs.length) * 100));
      }, idx * 360);
    });

    // ── STAGE 4: Golden Cinematic Curtain Sweep (at 2.6s) ──
    setTimeout(() => {
      setStage("rebirth");
      soundFx.playCurtainSweep();

      // Launch 1st wave golden confetti explosion!
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.55 },
          colors: ["#FACC15", "#FFFFFF", "#EAB308", "#F59E0B", "#FEF08A"],
          zIndex: 100001,
        });
      } catch {}

      // Launch 2nd wave side confetti cannons at +600ms
      setTimeout(() => {
        try {
          confetti({
            particleCount: 50,
            angle: 60,
            spread: 60,
            origin: { x: 0, y: 0.65 },
            colors: ["#FACC15", "#FFFFFF", "#EAB308"],
            zIndex: 100001,
          });
          confetti({
            particleCount: 50,
            angle: 120,
            spread: 60,
            origin: { x: 1, y: 0.65 },
            colors: ["#FACC15", "#FFFFFF", "#EAB308"],
            zIndex: 100001,
          });
        } catch {}
      }, 600);

      // Scroll window to top cleanly
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("scroll"));
        window.dispatchEvent(new CustomEvent("reset-nav-state"));
      }
      gsap.set(["main", "body", "html"], { clearProps: "all" });

      // Lift curtain with extended duration (3.2 seconds) to let user enjoy the rebirth
      setTimeout(() => {
        soundFx.playSuccess();
        gsap.set(["main", "body", "html"], { clearProps: "all" });
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("scroll"));
          window.dispatchEvent(new CustomEvent("reset-nav-state"));
        }
        setStage("idle");
      }, 3200);
    }, 2600);
  };

  if (stage === "idle") return null;

  return (
    <div className="fixed inset-0 z-[99999] pointer-events-none select-none overflow-hidden font-mono">
      {/* ── STAGE 1: Fullscreen Cyber Glitch & Horizontal Slice Tearing ── */}
      {stage === "glitch" && (
        <div className="absolute inset-0 bg-red-950/30 backdrop-invert-[0.2] overflow-hidden">
          {/* Animated Glitch Slices */}
          <div className="absolute inset-0 flex flex-col justify-between opacity-80">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-8 bg-red-600/20 mix-blend-difference"
                style={{
                  transform: `translateX(${((i % 2 === 0 ? 1 : -1) * (i * 12 + 15))}px)`,
                  animation: `pulse ${0.15 + i * 0.05}s infinite`,
                }}
              />
            ))}
          </div>

          {/* CRT Scanline Mesh */}
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.6)_0px,rgba(0,0,0,0.6)_2px,transparent_2px,transparent_4px)] pointer-events-none" />

          {/* Hologram Alert HUD Banner */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center p-8 rounded-3xl bg-black/95 border-2 border-red-500 shadow-[0_0_120px_rgba(239,68,68,0.9)] max-w-md w-full">
            <div className="flex items-center justify-center gap-3 text-red-500 mb-3">
              <Flame size={42} weight="fill" className="animate-bounce text-amber-400" />
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-widest text-red-400">
                SYSTEM PURGED
              </h2>
              <Flame size={42} weight="fill" className="animate-bounce text-amber-400" />
            </div>
            <p className="text-xs text-red-300 font-bold uppercase tracking-widest leading-relaxed">
              FATAL: CRITICAL SELF-DESTRUCT TRIGGERED
            </p>
          </div>
        </div>
      )}

      {/* ── STAGE 2: Glass Fracture & CRT TV Blackout Beam ── */}
      {stage === "shatter" && (
        <div className="absolute inset-0 bg-black/90 flex items-center justify-center">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
          
          {/* CRT Power-Off Collapse Animation */}
          <motion.div
            initial={{ scaleY: 1, scaleX: 1, opacity: 1 }}
            animate={{ scaleY: [1, 0.005, 0], scaleX: [1, 1.2, 0], opacity: [1, 1, 0] }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="w-full h-full bg-white/20 pointer-events-none"
          />
        </div>
      )}

      {/* ── STAGE 3: Cyberpunk BIOS Recovery Terminal ── */}
      {stage === "terminal" && (
        <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 bg-black/95 pointer-events-auto backdrop-blur-3xl">
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-full max-w-2xl rounded-3xl bg-[#090C12] border border-emerald-500/40 p-6 sm:p-8 shadow-[0_0_100px_rgba(16,185,129,0.3)] text-left space-y-6"
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4">
              <div className="flex items-center gap-2.5 text-emerald-400">
                <Terminal size={22} weight="bold" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-widest">
                  Next.js 15 Turbopack Recovery Console
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[11px] font-bold text-emerald-400 tracking-wider">
                  RESTORE_MODE
                </span>
              </div>
            </div>

            {/* Live Streaming Logs */}
            <div className="space-y-2 text-xs sm:text-sm text-emerald-300/90 min-h-[160px] font-mono leading-relaxed bg-black/40 p-4 rounded-xl border border-emerald-500/15">
              {terminalLogs.map((log, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-emerald-500 font-bold">&gt;</span>
                  <span>{log.replace(/^>\s*/, "")}</span>
                </motion.p>
              ))}
            </div>

            {/* Glowing Recovery Progress Bar */}
            <div className="space-y-2.5 pt-2">
              <div className="flex justify-between text-xs sm:text-sm text-emerald-400 font-bold tracking-wider">
                <span className="flex items-center gap-1.5">
                  <Cpu size={16} weight="bold" />
                  REBUILDING SYSTEM CACHE
                </span>
                <span>{terminalProgress}%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-emerald-950/80 border border-emerald-500/40 p-0.5 overflow-hidden shadow-inner">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 shadow-[0_0_20px_rgba(52,211,153,0.8)]"
                  style={{ width: `${terminalProgress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* ── STAGE 4: Grand Golden Cinematic Curtain Rebirth ── */}
      <AnimatePresence>
        {stage === "rebirth" && (
          <motion.div
            key="golden-rebirth-curtain"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 bg-gradient-to-b from-[#FFE57F] via-[#FACC15] to-[#EAB308] flex flex-col items-center justify-center text-black shadow-2xl"
          >
            {/* Golden Sheen Wave Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4)_0%,transparent_70%)] pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-center space-y-4 px-6 relative z-10"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/10 backdrop-blur-md border border-black/20 text-xs font-mono font-black uppercase tracking-widest text-black">
                <Sparkle size={16} weight="fill" className="text-black animate-spin" />
                <span>SYSTEM FULLY RESTORED</span>
                <ShieldCheck size={16} weight="bold" />
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-black font-display">
                WELCOME BACK
              </h1>

              <p className="text-xs sm:text-sm font-mono font-bold text-black/80 max-w-md mx-auto">
                Next.js 15 &bull; 100% Rebuilt &bull; Pixel-Perfect Experience
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
