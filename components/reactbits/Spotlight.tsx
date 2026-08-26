"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useMotionTemplate } from "motion/react";

interface SpotlightProps {
  className?: string;
  size?: number;
  color?: string;
}

export default function Spotlight({
  className = "",
  size = 350,
  color = "rgba(56, 189, 248, 0.08)",
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(-size);
  const mouseY = useMotionValue(-size);

  const background = useMotionTemplate`radial-gradient(${size}px circle at ${mouseX}px ${mouseY}px, ${color}, transparent 80%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(-size);
        mouseY.set(-size);
      }}
      className={`absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden ${className}`}
    >
      <motion.div
        className="absolute inset-0 rounded-[inherit] transition-opacity duration-300 pointer-events-none"
        style={{
          background,
          opacity: isHovered ? 1 : 0,
        }}
      />
    </div>
  );
}
