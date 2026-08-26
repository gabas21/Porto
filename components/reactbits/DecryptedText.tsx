"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

interface DecryptedTextProps {
  text: string;
  className?: string;
  speed?: number;
  maxIterations?: number;
  characters?: string;
  encryptedClassName?: string;
}

export default function DecryptedText({
  text,
  className = "",
  speed = 40,
  maxIterations = 8,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+",
  encryptedClassName = "text-[#38BDF8]/60 font-mono",
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState<string[]>(() => text.split(""));
  const [decodedIndices, setDecodedIndices] = useState<Set<number>>(new Set());
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (!isInView || hasTriggered.current) return;
    hasTriggered.current = true;

    let currentIteration = 0;
    const totalChars = text.length;

    const interval = setInterval(() => {
      currentIteration++;

      // Number of characters to lock into place based on progress
      const charsToLock = Math.floor((currentIteration / maxIterations) * totalChars);

      setDisplayText(() => {
        return text.split("").map((char, index) => {
          if (char === " ") return " ";
          if (index < charsToLock) {
            return char;
          }
          return characters[Math.floor(Math.random() * characters.length)];
        });
      });

      setDecodedIndices(() => {
        const set = new Set<number>();
        for (let i = 0; i < charsToLock; i++) {
          set.add(i);
        }
        return set;
      });

      if (currentIteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text.split(""));
        setDecodedIndices(new Set(Array.from({ length: text.length }, (_, i) => i)));
      }
    }, speed);

    return () => clearInterval(interval);
  }, [isInView, text, speed, maxIterations, characters]);

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {displayText.map((char, i) => (
        <span
          key={i}
          className={
            decodedIndices.has(i) || char === " "
              ? "transition-colors duration-150"
              : encryptedClassName
          }
        >
          {char}
        </span>
      ))}
    </span>
  );
}
