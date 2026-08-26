"use client";

export default function MarqueeRibbon() {
  const items = [
    "PIXEL-PERFECT FIGMA SLICING",
    "✦",
    "NEXT.JS & LARAVEL ECOSYSTEM",
    "✦",
    "TAILWIND CSS WIZARDRY",
    "✦",
    "SAMARINDA • EAST KALIMANTAN",
    "✦",
  ];

  return (
    <div className="relative w-full overflow-hidden bg-[var(--bg-main)] py-20 select-none border-y border-[var(--border-subtle)]">
      {/* Ribbon Bar 1 (Dark Tilted Left) */}
      <div className="relative -rotate-2 bg-[#0B0B0D] text-white py-4 shadow-xl flex whitespace-nowrap overflow-hidden border-y border-white/10">
        <div className="flex animate-marquee-left gap-8 text-sm md:text-base font-mono font-bold tracking-wider uppercase">
          {[...items, ...items, ...items].map((text, idx) => (
            <span key={idx} className={text === "✦" ? "text-[var(--accent)]" : ""}>
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* Ribbon Bar 2 (Neon Lime Tilted Right Cross) */}
      <div className="relative rotate-2 -mt-7 bg-[var(--accent)] text-black py-4 shadow-xl flex whitespace-nowrap overflow-hidden">
        <div className="flex animate-marquee-right gap-8 text-sm md:text-base font-mono font-bold tracking-wider uppercase">
          {[...items, ...items, ...items].map((text, idx) => (
            <span key={idx}>
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
