"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useVelocity,
  useTransform,
  AnimatePresence,
} from "motion/react";

/**
 * BubbleCursor Component
 *
 * Visual Design:
 * - Bodi bola kaca minimalis murni dengan pendaran lembut di tepian tanpa garis & tanpa bulatan tengah.
 * - Tembus pandang di bagian tengah (semua teks & tombol terbaca jernih).
 * - Gerakan antisipasi mulus: Menyusut sesaat (0.68x) lalu langsung meletup membesar (1.7x) saat hover teks/tombol.
 */

interface BubbleCursorProps {
  /** Warna garis tepi saat hover (default: Amber / Golden Glow) */
  accentColor?: string;
  /** Ukuran dasar bubble diameter (px) */
  baseSize?: number;
  /** Mengaktifkan elastisitas gerak */
  enableWobble?: boolean;
}

export default function BubbleCursor({
  accentColor = "rgba(250, 204, 21, 0.9)",
  baseSize = 54,
  enableWobble = true,
}: BubbleCursorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Mencegah trigger berulang saat mouse bergerak di dalam elemen anak yang sama
  const activeElementRef = useRef<HTMLElement | null>(null);

  // ── 1. POSISI MOUSE & PEGAS HALUS (SPRING PHYSICS) ────────────
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { stiffness: 440, damping: 28, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Secondary spring untuk bayangan halo lembut di belakang
  const lagSpringConfig = { stiffness: 240, damping: 24, mass: 0.8 };
  const lagX = useSpring(mouseX, lagSpringConfig);
  const lagY = useSpring(mouseY, lagSpringConfig);

  // ── 2. KALKULASI VELOCITY UNTUK DEFORMASI GELEMBUNG ───────────
  const velX = useVelocity(smoothX);
  const velY = useVelocity(smoothY);

  const angle = useTransform([velX, velY], ([vx, vy]: number[]) => {
    return (Math.atan2(vy, vx) * 180) / Math.PI;
  });

  const stretchScaleX = useTransform([velX, velY], ([vx, vy]: number[]) => {
    if (!enableWobble) return 1;
    const speed = Math.sqrt(vx * vx + vy * vy);
    return Math.min(1 + speed * 0.00025, 1.3);
  });

  const stretchScaleY = useTransform([velX, velY], ([vx, vy]: number[]) => {
    if (!enableWobble) return 1;
    const speed = Math.sqrt(vx * vx + vy * vy);
    return Math.max(1 - speed * 0.00015, 0.8);
  });

  // ── 3. DETEKSI INTERAKSI TANPA FLICKER / JEDA ──────────────────
  const handlePointerMove = useCallback(
    (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    },
    [isVisible, mouseX, mouseY]
  );

  useEffect(() => {
    // Nonaktifkan pada layar sentuh
    if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        "h1, h2, h3, h4, h5, h6, p, span, strong, em, b, i, li, label, blockquote, button, a, [role='button'], input, textarea, select, .interactive-btn, [data-cursor-hover], [data-cursor-text]"
      ) as HTMLElement | null;

      if (interactive) {
        if (activeElementRef.current === interactive) return;

        activeElementRef.current = interactive;
        setIsHovered(true);
        const text = interactive.getAttribute("data-cursor-text") || "";
        setCursorText(text);
      } else {
        if (activeElementRef.current !== null) {
          activeElementRef.current = null;
          setIsHovered(false);
          setCursorText("");
        }
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsHovered(false);
      activeElementRef.current = null;
    };
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [handlePointerMove]);

  if (isTouchDevice) return null;

  // ── 4. VARIAN ANIMASI BUBBLE ───────────────────────────────────
  const currentAnimateState = isClicking ? "clicking" : isHovered ? "hover" : "default";

  const bubbleVariants = {
    // 1. Posisi normal melayang (Soft Glass Orb tanpa garis & tanpa bulatan)
    default: {
      scale: 1,
      width: baseSize,
      height: baseSize,
      borderRadius: "9999px",
      borderWidth: "0px",
      borderColor: "transparent",
      boxShadow: [
        "0 4px 20px rgba(0, 0, 0, 0.06)",
        "inset 0 0 20px rgba(199, 210, 254, 0.45)",
      ].join(", "),
      transition: {
        type: "spring",
        stiffness: 380,
        damping: 24,
      },
    },

    // 2. Saat mendekati/hover elemen:
    hover: {
      scale: [1, 0.68, 1.7],
      width: cursorText ? 104 : baseSize,
      height: cursorText ? 42 : baseSize,
      borderRadius: cursorText ? "22px" : "9999px",
      borderWidth: "0px",
      borderColor: "transparent",
      boxShadow: [
        `0 0 28px ${accentColor.replace("0.9", "0.45")}`,
        "0 6px 20px rgba(0, 0, 0, 0.12)",
        `inset 0 0 20px ${accentColor.replace("0.9", "0.35")}`,
      ].join(", "),
      transition: {
        scale: {
          times: [0, 0.25, 1],
          duration: 0.36,
          ease: ["easeIn", "easeOut"],
        },
        boxShadow: { duration: 0.2 },
      },
    },

    // 3. Saat diklik
    clicking: {
      scale: 0.85,
      borderWidth: "0px",
      borderColor: "transparent",
      boxShadow:
        "0 0 24px rgba(199, 210, 254, 0.6), inset 0 0 15px rgba(199, 210, 254, 0.5)",
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 18,
      },
    },
  };

  return (
    <>
      {/* ── A. HALO GLOW TIPIS DI BELAKANG (TRANSLUCENT) ─────────── */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9997] hidden lg:block rounded-full mix-blend-screen"
        style={{
          x: lagX,
          y: lagY,
          translateX: "-50%",
          translateY: "-50%",
          width: baseSize + 8,
          height: baseSize + 8,
          opacity: isVisible && !isHovered ? 0.35 : 0,
          background:
            "radial-gradient(circle, rgba(199, 210, 254, 0.4) 0%, rgba(244, 114, 182, 0.2) 50%, transparent 70%)",
          filter: "blur(6px)",
        }}
        transition={{ duration: 0.15 }}
      />

      {/* ── B. ROTASI & DEFORMASI ARAH GERAK (VELOCITY DRIVEN) ─── */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] hidden lg:flex items-center justify-center"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          rotate: !isHovered ? angle : 0,
          scaleX: !isHovered ? stretchScaleX : 1,
          scaleY: !isHovered ? stretchScaleY : 1,
          opacity: isVisible ? 1 : 0,
        }}
      >
        {/* ── C. GELEMBUNG LEMBUT (BORDERLESS & PURE TEMBUS PANDANG) ── */}
        <motion.div
          className="relative flex items-center justify-center pointer-events-none overflow-visible"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.03)", // Murni jernih
            backdropFilter: "none",
            WebkitBackdropFilter: "none",
          }}
          variants={bubbleVariants}
          initial="default"
          animate={currentAnimateState}
        >
          {/* Badge Teks Ringkas (jika ada data-cursor-text) */}
          <AnimatePresence>
            {cursorText && isHovered && (
              <motion.span
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.15 }}
                className="relative z-10 text-[9px] font-mono font-bold tracking-widest uppercase text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)] px-2.5 select-none whitespace-nowrap"
              >
                {cursorText}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
}



