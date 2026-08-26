"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

interface FadeBlurInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  blur?: number;
  yOffset?: number;
}

export default function FadeBlurIn({
  children,
  delay = 0,
  duration = 0.7,
  className = "",
  blur = 8,
  yOffset = 20,
}: FadeBlurInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: yOffset,
        filter: `blur(${blur}px)`,
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }
          : {
              opacity: 0,
              y: yOffset,
              filter: `blur(${blur}px)`,
            }
      }
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
