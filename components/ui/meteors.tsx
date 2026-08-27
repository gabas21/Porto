"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const Meteors = ({
  number = 16,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>([]);

  useEffect(() => {
    const styles = new Array(number).fill(true).map(() => ({
      top: (Math.random() * 80 - 30).toFixed(2) + "%",
      left: (Math.random() * 120 - 5).toFixed(2) + "%",
      animationDelay: (Math.random() * 8 + 0.3).toFixed(2) + "s",
      animationDuration: (Math.random() * 4.5 + 7.5).toFixed(2) + "s",
    }));
    setMeteorStyles(styles);
  }, [number]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {meteorStyles.map((style, idx) => (
        <span
          key={"meteor" + idx}
          className={cn(
            "pointer-events-none absolute size-[2.5px] rounded-full bg-white/90 shadow-[0_0_6px_1.5px_rgba(255,255,255,0.7)] animate-meteor opacity-0",
            "before:content-[''] before:absolute before:top-1/2 before:-translate-y-1/2 before:right-0 before:h-[1px] before:w-[70px] sm:before:w-[110px] before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-white/90",
            className
          )}
          style={style}
        />
      ))}
    </div>
  );
};
