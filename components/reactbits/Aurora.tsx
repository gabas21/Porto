"use client";

import React from "react";

interface AuroraProps {
  colorStops?: string[];
  amplitude?: number;
  blend?: number;
  speed?: number;
  className?: string;
}

export default function Aurora({
  colorStops = [
    "rgba(46, 76, 140, 0.45)",
    "rgba(96, 165, 250, 0.25)",
    "rgba(19, 32, 56, 0.6)",
  ],
  className = "",
}: AuroraProps) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none -z-10 select-none ${className}`}
      aria-hidden="true"
    >
      {/* Blob 1: Resolute Ultramarine Deep Blob */}
      <div
        className="animate-aurora-1 absolute -top-[20%] -left-[10%] w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] rounded-full opacity-40 mix-blend-screen filter blur-[90px] sm:blur-[140px] pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${colorStops[0] || "rgba(46, 76, 140, 0.5)"} 0%, rgba(19, 32, 56, 0.7) 60%, transparent 80%)`,
          willChange: "transform",
        }}
      />

      {/* Blob 2: Luminous Sky Blue Ocean Highlight */}
      <div
        className="animate-aurora-2 absolute top-[10%] -right-[15%] w-[500px] sm:w-[650px] h-[500px] sm:h-[650px] rounded-full opacity-35 mix-blend-screen filter blur-[100px] sm:blur-[150px] pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${colorStops[1] || "rgba(96, 165, 250, 0.3)"} 0%, rgba(46, 76, 140, 0.4) 50%, transparent 75%)`,
          willChange: "transform",
        }}
      />

      {/* Blob 3: Deep Marine Ambient Accent */}
      <div
        className="animate-aurora-3 absolute bottom-[-10%] left-[25%] w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] rounded-full opacity-30 mix-blend-screen filter blur-[80px] sm:blur-[130px] pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${colorStops[2] || "rgba(19, 32, 56, 0.7)"} 0%, rgba(96, 165, 250, 0.2) 60%, transparent 80%)`,
          willChange: "transform",
        }}
      />

      {/* Dark overlay mesh pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      
      {/* Subtle bottom vignette to blend with following sections */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--bg-main)] to-transparent pointer-events-none" />
    </div>
  );
}
