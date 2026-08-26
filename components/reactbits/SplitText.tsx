"use client";

import { motion, useInView } from "motion/react";
import { useRef, useMemo } from "react";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: [number, number, number, number];
  startOnView?: boolean;
  threshold?: number;
}

export default function SplitText({
  text,
  className = "",
  delay = 50,
  duration = 600,
  ease = [0.16, 1, 0.3, 1],
  startOnView = true,
  threshold = 0.2,
}: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  const words = useMemo(() => text.split(" "), [text]);

  const active = startOnView ? isInView : true;

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.28em] last:mr-0 align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "115%", opacity: 0 }}
            animate={active ? { y: "0%", opacity: 1 } : { y: "115%", opacity: 0 }}
            transition={{
              duration: duration / 1000,
              delay: (i * delay) / 1000,
              ease,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
