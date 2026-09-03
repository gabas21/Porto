"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  motion,
  useMotionValue,
  useSpring,
  useVelocity,
  useTransform,
  AnimatePresence,
  type Variants,
} from "motion/react";

interface BubbleCursorProps {
  /** Warna aksen ring kaca pembesar & hover (default: Golden Glow) */
  accentColor?: string;
  /** Ukuran dasar bubble diameter (px) */
  baseSize?: number;
  /** Faktor pembesar teks di dalam lensa (default: 1.3x) */
  zoomFactor?: number;
}

const LENS_RADIUS = 36; // Radius lensa pembesar (diameter 72px)

/**
 * Cari elemen teks di bawah koordinat (x, y).
 */
function findTextEl(x: number, y: number): HTMLElement | null {
  if (x < 0 || y < 0) return null;
  const all = document.elementsFromPoint(x, y) as HTMLElement[];
  for (const el of all) {
    if (el.hasAttribute("data-cursor-lens")) continue;
    if (el.matches("canvas,svg,img,video,iframe,html,body")) continue;
    const hasDirectText = Array.from(el.childNodes).some(
      (n) => n.nodeType === Node.TEXT_NODE && (n.textContent?.trim().length ?? 0) > 0
    );
    if (hasDirectText) return el;
  }
  return null;
}

/**
 * Cari background warna nyata dari elemen ke atas DOM tree.
 */
function findRealBg(el: HTMLElement): string {
  let curr: HTMLElement | null = el;
  while (curr && curr !== document.documentElement) {
    const bg = window.getComputedStyle(curr).backgroundColor;
    if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
      return bg;
    }
    curr = curr.parentElement;
  }
  return "var(--bg-main)";
}

/**
 * Cari elemen visual pembungkus terdekat yang memiliki background atau batas sendiri.
 */
function findVisualUnit(textEl: HTMLElement): HTMLElement {
  let el: HTMLElement = textEl;
  for (let i = 0; i < 3; i++) {
    const bg = window.getComputedStyle(el).backgroundColor;
    if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
      return el;
    }
    if (!el.parentElement || el.parentElement.matches("html,body")) break;
    el = el.parentElement as HTMLElement;
  }
  return textEl;
}

export default function BubbleCursor({
  accentColor = "rgba(250, 204, 21, 0.9)",
  baseSize = 48,
  zoomFactor = 1.3,
}: BubbleCursorProps) {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isMagnifying, setIsMagnifying] = useState(false);

  // Refs untuk DOM overlay & tracking
  const overlayRef = useRef<HTMLDivElement>(null);
  const cloneRootRef = useRef<HTMLDivElement>(null);
  const lensRingRef = useRef<HTMLDivElement>(null);
  const activeElementRef = useRef<HTMLElement | null>(null);
  const currentUnitRef = useRef<HTMLElement | null>(null);
  const currentCloneRef = useRef<HTMLElement | null>(null);
  const currentRectRef = useRef<DOMRect | null>(null);
  const visibleRef = useRef(false);
  const rafRef = useRef<number>(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mousePosRef = useRef({ x: -500, y: -500 });

  // ── 1. POSISI MOUSE & SPRING PHYSICS UNTUK BUBBLE BIASA ──────────
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { stiffness: 450, damping: 28, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const velX = useVelocity(smoothX);
  const velY = useVelocity(smoothY);

  const angle = useTransform([velX, velY], ([vx, vy]: number[]) => {
    return (Math.atan2(vy, vx) * 180) / Math.PI;
  });

  const stretchScaleX = useTransform([velX, velY], ([vx, vy]: number[]) => {
    const speed = Math.sqrt(vx * vx + vy * vy);
    return Math.min(1 + speed * 0.00025, 1.25);
  });

  const stretchScaleY = useTransform([velX, velY], ([vx, vy]: number[]) => {
    const speed = Math.sqrt(vx * vx + vy * vy);
    return Math.max(1 - speed * 0.00015, 0.85);
  });

  // ── 2. RESET MAGNIFIER FUNCTION ─────────────────────────────────
  const resetMagnifier = useCallback(() => {
    setIsMagnifying(false);
    activeElementRef.current = null;
    currentUnitRef.current = null;
    currentCloneRef.current = null;
    currentRectRef.current = null;
    if (overlayRef.current) {
      overlayRef.current.style.clipPath = "circle(0px at -500px -500px)";
    }
    if (lensRingRef.current) {
      lensRingRef.current.style.opacity = "0";
    }
    if (cloneRootRef.current) {
      cloneRootRef.current.innerHTML = "";
    }
  }, []);

  // ── 3. UPDATE MAGNIFIER LENS DENGAN FAST-PATH CACHING ───────────
  const updateMagnifier = useCallback(() => {
    const { x: mx, y: my } = mousePosRef.current;
    const overlay = overlayRef.current;
    const cloneRoot = cloneRootRef.current;
    const lensRing = lensRingRef.current;

    if (!overlay || !cloneRoot || !lensRing) return;
    if (mx < 0 || my < 0) {
      resetMagnifier();
      return;
    }

    // Fast-path: jika kursor masih di dalam bounding rect elemen aktif
    const activeRect = currentRectRef.current;
    const activeClone = currentCloneRef.current;
    const activeUnit = currentUnitRef.current;

    if (
      activeRect &&
      activeClone &&
      activeUnit &&
      mx >= activeRect.left &&
      mx <= activeRect.right &&
      my >= activeRect.top &&
      my <= activeRect.bottom
    ) {
      const originX = mx - activeRect.left;
      const originY = my - activeRect.top;
      activeClone.style.transformOrigin = `${originX}px ${originY}px`;
      overlay.style.clipPath = `circle(${LENS_RADIUS}px at ${mx}px ${my}px)`;
      lensRing.style.transform = `translate3d(${mx - LENS_RADIUS}px, ${my - LENS_RADIUS}px, 0)`;
      return;
    }

    // Slow-path: cari elemen teks baru
    const textEl = findTextEl(mx, my);

    if (!textEl) {
      resetMagnifier();
      return;
    }

    setIsMagnifying(true);

    const unit = findVisualUnit(textEl);
    const rect = unit.getBoundingClientRect();
    const st = window.getComputedStyle(unit);
    const realBg = findRealBg(unit);

    overlay.style.backgroundColor = realBg;
    cloneRoot.innerHTML = "";
    const clone = unit.cloneNode(true) as HTMLElement;

    const originX = mx - rect.left;
    const originY = my - rect.top;

    clone.style.cssText = `
      position: fixed;
      left: ${rect.left}px;
      top: ${rect.top}px;
      width: ${rect.width}px;
      height: ${rect.height}px;
      margin: 0;
      padding: ${st.paddingTop} ${st.paddingRight} ${st.paddingBottom} ${st.paddingLeft};
      font-size: ${st.fontSize};
      font-weight: ${st.fontWeight};
      font-family: ${st.fontFamily};
      font-style: ${st.fontStyle};
      line-height: ${st.lineHeight};
      letter-spacing: ${st.letterSpacing};
      color: ${st.color};
      text-transform: ${st.textTransform};
      text-align: ${st.textAlign};
      white-space: ${st.whiteSpace};
      background-color: ${st.backgroundColor};
      background-image: ${st.backgroundImage};
      background-size: ${st.backgroundSize};
      background-position: ${st.backgroundPosition};
      border: ${st.border};
      border-radius: ${st.borderRadius};
      box-shadow: ${st.boxShadow};
      display: ${st.display === "inline" ? "inline-block" : st.display};
      align-items: ${st.alignItems};
      justify-content: ${st.justifyContent};
      gap: ${st.gap};
      box-sizing: border-box;
      pointer-events: none;
      transform: scale(${zoomFactor});
      transform-origin: ${originX}px ${originY}px;
      overflow: visible;
      z-index: 1;
      will-change: transform;
    `;

    cloneRoot.appendChild(clone);
    currentUnitRef.current = unit;
    currentCloneRef.current = clone;
    currentRectRef.current = rect;

    overlay.style.clipPath = `circle(${LENS_RADIUS}px at ${mx}px ${my}px)`;
    lensRing.style.transform = `translate3d(${mx - LENS_RADIUS}px, ${my - LENS_RADIUS}px, 0)`;
    lensRing.style.opacity = "1";
  }, [zoomFactor, resetMagnifier]);

  // ── 4. LISTENER EVENT MOUSE & SCROLL (FIX STUCK ON SCROLL BUG) ──
  const handlePointerMove = useCallback(
    (e: MouseEvent) => {
      if (!visibleRef.current) {
        visibleRef.current = true;
        setIsVisible(true);
      }
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      mousePosRef.current = { x: e.clientX, y: e.clientY };

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateMagnifier);
    },
    [mouseX, mouseY, updateMagnifier]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;

    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        "button, a, [role='button'], input, textarea, select, .interactive-btn, [data-cursor-hover], [data-cursor-text]"
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
      resetMagnifier();
    };
    const handleMouseEnter = () => setIsVisible(true);

    // ── CRITICAL FIX: RESET SAAT SCROLL AGAR TEKS TIDAK NYANGKUT ──
    const handleScroll = () => {
      // Segera reset pembesar saat halaman discroll
      resetMagnifier();

      // Saat scroll berhenti, cek kembali teks di posisi mouse terkini
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        if (mousePosRef.current.x >= 0 && mousePosRef.current.y >= 0) {
          updateMagnifier();
        }
      }, 120);
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      cancelAnimationFrame(rafRef.current);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mounted, handlePointerMove, resetMagnifier, updateMagnifier]);

  if (!mounted) return null;

  // ── 5. VARIAN ANIMASI BUBBLE BIASA (NON-MAGNIFYING) ───────────────
  const currentAnimateState = isClicking ? "clicking" : isHovered ? "hover" : "default";

  const bubbleVariants: Variants = {
    default: {
      scale: 1,
      width: baseSize,
      height: baseSize,
      borderRadius: "9999px",
      border: "1.5px solid rgba(255, 255, 255, 0.45)",
      boxShadow: [
        "0 4px 20px rgba(0, 0, 0, 0.08)",
        "inset 0 0 16px rgba(255, 255, 255, 0.35)",
        "0 0 12px rgba(250, 204, 21, 0.25)",
      ].join(", "),
      transition: {
        type: "spring",
        stiffness: 380,
        damping: 24,
      },
    },
    hover: {
      scale: 1.15,
      width: cursorText ? 104 : baseSize + 6,
      height: cursorText ? 42 : baseSize + 6,
      borderRadius: cursorText ? "22px" : "9999px",
      border: `1.5px solid ${accentColor}`,
      boxShadow: [
        `0 0 20px ${accentColor.replace("0.9", "0.35")}`,
        "0 4px 14px rgba(0, 0, 0, 0.1)",
        `inset 0 0 14px ${accentColor.replace("0.9", "0.25")}`,
      ].join(", "),
      transition: { duration: 0.2 },
    },
    clicking: {
      scale: 0.85,
      border: "1.5px solid rgba(250, 204, 21, 1)",
      boxShadow: "0 0 24px rgba(250, 204, 21, 0.6), inset 0 0 16px rgba(250, 204, 21, 0.5)",
      transition: { type: "spring", stiffness: 500, damping: 18 },
    },
  };

  return createPortal(
    <>
      {/* ── LAYER 1: OVERLAY CLIPPED MAGNIFIER LENS ─── */}
      <div
        ref={overlayRef}
        data-cursor-lens="overlay"
        className="pointer-events-none fixed inset-0"
        style={{
          zIndex: 9994,
          clipPath: "circle(0px at -500px -500px)",
          backgroundColor: "transparent",
        }}
      >
        <div
          ref={cloneRootRef}
          data-cursor-lens="root"
          className="absolute inset-0"
        />
      </div>

      {/* ── LAYER 2: RING KACA PEMBESAR TUNGGAL ── */}
      <div
        ref={lensRingRef}
        data-cursor-lens="ring"
        className="pointer-events-none fixed top-0 left-0"
        style={{
          zIndex: 9996,
          width: LENS_RADIUS * 2,
          height: LENS_RADIUS * 2,
          borderRadius: "50%",
          opacity: 0,
          border: `1.5px solid ${accentColor}`,
          boxShadow: `0 0 14px ${accentColor.replace("0.9", "0.45")}, inset 0 0 10px rgba(255, 255, 255, 0.3), 0 4px 12px rgba(0,0,0,0.15)`,
          willChange: "transform, opacity",
          transition: "opacity 0.12s ease",
        }}
      />

      {/* ── LAYER 3: BUBBLE KURSOR BIASA (HANYA MUNCUL SAAT TIDAK ZOOM) ── */}
      {!isMagnifying && (
        <>
          {/* Halo Glow Ambient */}
          <motion.div
            className="pointer-events-none fixed top-0 left-0 z-[9997] hidden lg:block rounded-full mix-blend-screen"
            style={{
              x: smoothX,
              y: smoothY,
              translateX: "-50%",
              translateY: "-50%",
              width: baseSize + 8,
              height: baseSize + 8,
              opacity: isVisible && !isHovered ? 0.35 : 0,
              background:
                "radial-gradient(circle, rgba(250, 204, 21, 0.35) 0%, rgba(199, 210, 254, 0.2) 50%, transparent 70%)",
              filter: "blur(6px)",
            }}
            transition={{ duration: 0.15 }}
          />

          {/* Glass Bubble Orb */}
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
            <motion.div
              className="relative flex items-center justify-center pointer-events-none overflow-visible"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.04)",
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
      )}
    </>,
    document.body
  );
}
