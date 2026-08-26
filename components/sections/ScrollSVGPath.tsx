"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

// Yellow glow color — vibrant gold/amber that pops on both dark and light bg
const YELLOW = "#FACC15";
const YELLOW_GLOW = "#FDE047";

// Different SVG path shapes for visual variety between sections
const PATHS = [
  // Wave — S-curve across full width
  "M0,160 C200,80 400,240 600,140 C800,40 1000,220 1200,120 C1320,80 1400,160 1440,140",
  // Rise — starts low, arcs high, dips again
  "M0,260 C120,240 240,60 480,80 C720,100 840,220 1080,180 C1260,150 1380,240 1440,200",
  // Deep dip — starts high, dips to bottom, rises
  "M0,80 C200,100 360,280 600,260 C840,240 960,60 1200,80 C1360,96 1420,60 1440,60",
  // Diagonal sweep — flows from top-left to bottom-right
  "M0,60 C300,80 500,180 720,200 C940,220 1100,260 1440,280",
  // Double arch — two peaks
  "M0,200 C180,220 280,60 480,80 C680,100 760,240 960,220 C1160,200 1300,60 1440,100",
  // Gentle S  
  "M0,180 C360,80 720,280 1080,160 C1260,100 1380,180 1440,200",
];

interface ScrollSVGPathProps {
  variant?: number; // 0–5 to select from PATHS array
  flip?: boolean;   // mirror the curve vertically
}

export default function ScrollSVGPath({ variant = 0, flip = false }: ScrollSVGPathProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.65], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);

  const d = PATHS[variant % PATHS.length];

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden pointer-events-none select-none"
      style={{
        height: "260px",
        transform: flip ? "scaleY(-1)" : "none",
        background: "transparent",
      }}
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
        fill="none"
        preserveAspectRatio="none"
      >
        {/* Ghost/Rail track — subtle dim line showing the full path */}
        <path
          d={d}
          stroke="rgba(250,204,21,0.12)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="8 6"
        />

        {/* Main animated yellow stroke — draws itself as the element enters viewport */}
        <motion.path
          d={d}
          stroke={YELLOW}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          style={{
            pathLength,
            opacity,
            filter: `drop-shadow(0 0 6px ${YELLOW}) drop-shadow(0 0 20px ${YELLOW_GLOW})`,
          }}
        />

        {/* Glowing leading dot that travels along the path */}
        <motion.circle
          r="6"
          fill={YELLOW}
          style={{
            offsetPath: `path('${d}')`,
            offsetDistance: useTransform(pathLength, [0, 1], ["0%", "100%"]) as never,
            opacity,
            filter: `drop-shadow(0 0 12px ${YELLOW}) drop-shadow(0 0 28px ${YELLOW_GLOW})`,
          }}
        />

        {/* Trailing secondary dot — slightly behind for depth/echo effect */}
        <motion.circle
          r="3"
          fill={YELLOW_GLOW}
          style={{
            offsetPath: `path('${d}')`,
            offsetDistance: useTransform(pathLength, [0.05, 1], ["0%", "88%"]) as never,
            opacity: useTransform(pathLength, [0.05, 0.15], [0, 0.6]),
            filter: `drop-shadow(0 0 6px ${YELLOW})`,
          }}
        />
      </svg>
    </div>
  );
}
