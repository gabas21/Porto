"use client";

import React from "react";

interface ScrollVelocityMarqueeProps {
  items: string[];
  className?: string;
  itemClassName?: string;
}

export default function ScrollVelocityMarquee({
  items,
  className = "",
  itemClassName = "",
}: ScrollVelocityMarqueeProps) {
  // Duplicate array 3 times to ensure infinite smooth marquee loop without blank space
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className={`w-full overflow-hidden whitespace-nowrap py-3 select-none relative ${className}`}>
      {/* Left/Right fading gradient mask */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#0B0E14] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#0B0E14] to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee flex items-center">
        {repeatedItems.map((item, idx) => (
          <div
            key={idx}
            className={`inline-flex items-center gap-4 px-4 font-mono text-xs sm:text-sm uppercase tracking-widest text-[#8B92A3] transition-colors hover:text-[#38BDF8] ${itemClassName}`}
          >
            <span>{item}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]/40" />
          </div>
        ))}
      </div>
    </div>
  );
}
