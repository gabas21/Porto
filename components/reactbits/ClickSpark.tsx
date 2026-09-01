"use client";

import React, { useState, useCallback } from "react";
import { soundFx } from "@/lib/audio-fx";

interface Spark {
  id: number;
  x: number;
  y: number;
}

interface ClickSparkProps {
  children: React.ReactNode;
  sparkColor?: string;
  sparkCount?: number;
  duration?: number;
  className?: string;
}

export default function ClickSpark({
  children,
  sparkColor = "#38BDF8",
  sparkCount = 8,
  duration = 450,
  className = "",
}: ClickSparkProps) {
  const [sparks, setSparks] = useState<Spark[]>([]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      soundFx.playClick();
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now() + Math.random();

      setSparks((prev) => [...prev, { id, x, y }]);

      setTimeout(() => {
        setSparks((prev) => prev.filter((s) => s.id !== id));
      }, duration);
    },
    [duration]
  );

  return (
    <div className={`relative inline-block ${className}`} onClick={handleClick}>
      {children}
      {sparks.map(({ id, x, y }) => (
        <svg
          key={id}
          className="pointer-events-none absolute z-50 overflow-visible"
          style={{ left: x, top: y, width: 0, height: 0 }}
        >
          {Array.from({ length: sparkCount }).map((_, i) => {
            const angle = (i * 360) / sparkCount;
            const rad = (angle * Math.PI) / 180;
            const distance = 22;
            const targetX = Math.cos(rad) * distance;
            const targetY = Math.sin(rad) * distance;

            return (
              <line
                key={i}
                x1={0}
                y1={0}
                x2={targetX}
                y2={targetY}
                stroke={sparkColor}
                strokeWidth={2}
                strokeLinecap="round"
                style={{
                  animation: `sparkFly ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
                }}
              />
            );
          })}
        </svg>
      ))}
    </div>
  );
}
