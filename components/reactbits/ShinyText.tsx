"use client";

import React from "react";

interface ShinyTextProps {
  text: string;
  className?: string;
  speed?: number;
  disabled?: boolean;
}

export default function ShinyText({
  text,
  className = "",
  speed = 3.5,
  disabled = false,
}: ShinyTextProps) {
  return (
    <span
      className={`inline-block bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(120deg, rgba(231, 233, 238, 0.7) 0%, rgba(231, 233, 238, 0.9) 35%, #38BDF8 50%, rgba(231, 233, 238, 0.9) 65%, rgba(231, 233, 238, 0.7) 100%)",
        backgroundSize: "200% auto",
        animation: disabled ? "none" : `shinySwipe ${speed}s linear infinite`,
        WebkitBackgroundClip: "text",
      }}
    >
      {text}
    </span>
  );
}
