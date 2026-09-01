"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useVelocity,
  useTransform,
  useMotionValueEvent,
} from "motion/react";

export default function LiquidGlassCursor() {
  const svgFilterRef = useRef<SVGFETurbulenceElement>(null);
  const dispMapRef = useRef<SVGFEDisplacementMapElement>(null);

  const [svgFilterSupported, setSvgFilterSupported] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");

  // ── 1. RAW MOUSE POSITION ─────────────────────────────────────
  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);

  // ── 2. SPRING PHYSICS (Liquid Glass Inertia & Fluid Drag) ──────
  const springConfig = { stiffness: 420, damping: 30, mass: 0.45 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Secondary spring for chromatic aberration trailing (extra fluid lag)
  const lagSpringConfig = { stiffness: 280, damping: 24, mass: 0.8 };
  const lagX = useSpring(mouseX, lagSpringConfig);
  const lagY = useSpring(mouseY, lagSpringConfig);

  // ── 3. VELOCITY TRACKING ──────────────────────────────────────
  const velX = useVelocity(springX);
  const velY = useVelocity(springY);

  // ── 4. MAP VELOCITY TO DISTORTION INTENSITY & TURBULENCE ──────
  const distortionScale = useTransform([velX, velY], ([vx, vy]: number[]) => {
    const speed = Math.sqrt(vx * vx + vy * vy);
    return Math.min(speed * 0.009, 16); // max 16px displacement
  });

  const turbulenceFreq = useTransform([velX, velY], ([vx, vy]: number[]) => {
    const speed = Math.sqrt(vx * vx + vy * vy);
    return 0.004 + Math.min(speed * 0.00002, 0.035);
  });

  // ── 5. CHROMATIC ABERRATION OFFSETS (Per Channel Vector) ──────
  const cyanOffsetX = useTransform(velX, [-2000, 0, 2000], [7, 0, -7]);
  const cyanOffsetY = useTransform(velY, [-2000, 0, 2000], [5, 0, -5]);

  const redOffsetX = useTransform(velX, [-2000, 0, 2000], [-7, 0, 7]);
  const redOffsetY = useTransform(velY, [-2000, 0, 2000], [-5, 0, 5]);

  const violetOffsetY = useTransform(velY, [-2000, 0, 2000], [6, 0, -6]);

  const aberrationOpacity = useTransform([velX, velY], ([vx, vy]: number[]) => {
    const speed = Math.sqrt(vx * vx + vy * vy);
    return Math.min(speed * 0.0012, 0.75); // 0 at rest, max 0.75 during fast sweep
  });

  // ── 6. EVENT LISTENERS & HOVER STATE ──────────────────────────
  useEffect(() => {
    // Detect SVG backdrop-filter support (Chrome/Edge/Opera Blink engine)
    const testDiv = document.createElement("div");
    testDiv.style.backdropFilter = "url(#cursor-lens-test)";
    setSvgFilterSupported(testDiv.style.backdropFilter !== "");

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest("a, button, [data-cursor-hover], input, textarea, select");
      if (interactiveEl) {
        setIsHovered(true);
        const text = interactiveEl.getAttribute("data-cursor-text");
        setCursorText(text || "");
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  // ── 7. DIRECT DOM MUTATION FOR SVG ATTRIBUTES (60-120 FPS) ────
  useMotionValueEvent(distortionScale, "change", (latest) => {
    if (dispMapRef.current) {
      dispMapRef.current.setAttribute("scale", latest.toFixed(2));
    }
  });

  useMotionValueEvent(turbulenceFreq, "change", (latest) => {
    if (svgFilterRef.current) {
      svgFilterRef.current.setAttribute("baseFrequency", latest.toFixed(4));
    }
  });

  // Ignore render completely on mobile/touch screens
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
      setIsTouch(true);
    }
  }, []);

  if (isTouch) return null;

  // Dynamic lens sizing based on state
  const lensWidth = isHovered ? (cursorText ? 84 : 58) : 74;
  const lensHeight = isHovered ? (cursorText ? 42 : 58) : 74;

  return (
    <>
      {/* ── 1. SVG FILTER DEFINITION (Hidden in DOM) ────────────── */}
      <svg
        className="fixed pointer-events-none"
        style={{ width: 0, height: 0, position: "absolute", overflow: "hidden" }}
        aria-hidden="true"
      >
        <defs>
          <filter
            id="liquid-lens-filter"
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              ref={svgFilterRef}
              type="turbulence"
              baseFrequency="0.004"
              numOctaves="2"
              seed="42"
              result="noise"
            />
            <feDisplacementMap
              ref={dispMapRef}
              in="SourceGraphic"
              in2="noise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* ── 2. CHROMATIC ABERRATION: CYAN RING (Lag Trailing) ───── */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9996] hidden lg:block rounded-full mix-blend-screen"
        style={{
          x: lagX,
          y: lagY,
          translateX: "-50%",
          translateY: "-50%",
          width: lensWidth + 6,
          height: lensHeight + 6,
          opacity: aberrationOpacity,
          border: "1px solid rgba(0, 242, 254, 0.75)",
          boxShadow: "0 0 12px rgba(0, 242, 254, 0.4)",
          filter: "blur(0.5px)",
          left: cyanOffsetX,
          top: cyanOffsetY,
        }}
      />

      {/* ── 3. CHROMATIC ABERRATION: RED/ROSE RING (Opposite Vector) ─ */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9996] hidden lg:block rounded-full mix-blend-screen"
        style={{
          x: lagX,
          y: lagY,
          translateX: "-50%",
          translateY: "-50%",
          width: lensWidth + 6,
          height: lensHeight + 6,
          opacity: aberrationOpacity,
          border: "1px solid rgba(244, 63, 94, 0.75)",
          boxShadow: "0 0 12px rgba(244, 63, 94, 0.4)",
          filter: "blur(0.5px)",
          left: redOffsetX,
          top: redOffsetY,
        }}
      />

      {/* ── 4. CHROMATIC ABERRATION: VIOLET RING ───────────────── */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9996] hidden lg:block rounded-full mix-blend-screen"
        style={{
          x: lagX,
          y: lagY,
          translateX: "-50%",
          translateY: "-50%",
          width: lensWidth + 4,
          height: lensHeight + 4,
          opacity: aberrationOpacity,
          border: "1px solid rgba(168, 85, 247, 0.6)",
          top: violetOffsetY,
        }}
      />

      {/* ── 5. MAIN LIQUID GLASS REFRACTION LENS ───────────────── */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] hidden lg:flex items-center justify-center rounded-full overflow-hidden transition-colors duration-200"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
          backdropFilter: svgFilterSupported
            ? "url(#liquid-lens-filter) blur(0.4px) saturate(140%)"
            : "blur(12px) brightness(1.2) saturate(150%)",
          WebkitBackdropFilter: svgFilterSupported
            ? "url(#liquid-lens-filter) blur(0.4px) saturate(140%)"
            : "blur(12px) brightness(1.2) saturate(150%)",
          background: isHovered
            ? "rgba(255, 255, 255, 0.12)"
            : "radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.02) 70%)",
          border: isHovered
            ? "1.5px solid rgba(250, 204, 21, 0.7)"
            : "1px solid rgba(255, 255, 255, 0.22)",
          boxShadow: isHovered
            ? "0 0 20px rgba(250, 204, 21, 0.35), inset 0 1px 2px rgba(255, 255, 255, 0.4)"
            : "0 8px 32px rgba(0, 0, 0, 0.25), inset 0 1.5px 1px rgba(255, 255, 255, 0.35), inset 0 -1px 2px rgba(0, 0, 0, 0.2)",
        }}
        animate={{
          width: lensWidth,
          height: lensHeight,
          scale: isHovered ? 1.08 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 380,
          damping: 24,
        }}
      >
        {/* Specular Glint Highlight (Gloss Reflection) */}
        <div
          className="absolute top-1 left-2 w-3.5 h-1.5 rounded-full bg-white/40 blur-[0.5px] pointer-events-none transform -rotate-12"
          aria-hidden="true"
        />

        {/* Text inside cursor when data-cursor-text is present */}
        {cursorText && (
          <span className="relative z-10 text-[10px] font-mono font-extrabold uppercase tracking-wider text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] px-2 select-none">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* ── 6. ULTRA-FINE CENTER POINT INDICATOR (Laser Focus) ─── */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden lg:block rounded-full bg-white"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovered ? 0 : 4,
          height: isHovered ? 0 : 4,
          opacity: isVisible && !isHovered ? 0.9 : 0,
          boxShadow: "0 0 6px rgba(255, 255, 255, 0.9)",
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
