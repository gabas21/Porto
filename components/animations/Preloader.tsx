"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

// Salam khas dari berbagai suku & daerah di Nusantara (Indonesia)
const greetings = [
  { text: "Halo", origin: "Indonesia" },
  { text: "Sampurasun", origin: "Sunda" },
  { text: "Sugeng Rawuh", origin: "Jawa" },
  { text: "Horas", origin: "Batak" },
  { text: "Tabe' Pun", origin: "Kutai (Kalimantan Timur)" },
  { text: "Om Swastiastu", origin: "Bali" },
  { text: "Ya'ahowu", origin: "Nias" },
  { text: "Adil Ka' Talino", origin: "Dayak (Kalimantan)" },
  { text: "Halo", origin: "Selamat Datang" },
];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index === greetings.length - 1) {
      const timeout = setTimeout(() => onComplete(), 1200);
      return () => clearTimeout(timeout);
    }
    const timer = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, 850);
    return () => clearTimeout(timer);
  }, [index, onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{
        y: "-100%",
        transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
      }}
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#090A0C] text-white select-none pointer-events-auto"
    >
      <div className="relative flex flex-col items-center justify-center space-y-4">
        {/* Main Greeting Typography with Slow Cinematic Transitions */}
        <div className="h-16 sm:h-20 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.h1
              key={index}
              initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-5xl md:text-6xl font-mono tracking-tight font-light flex items-center gap-3"
            >
              <span className="text-[#FACC15] font-bold">•</span>
              <span>{greetings[index].text}</span>
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Region / Origin Subtitle Badge */}
        <div className="h-6 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="text-[11px] font-mono tracking-widest uppercase text-zinc-400 font-semibold"
            >
              {greetings[index].origin}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
