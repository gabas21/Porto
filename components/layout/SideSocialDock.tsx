"use client";

import { motion, useScroll, useSpring } from "motion/react";

export default function SideSocialDock() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed bottom-10 left-8 z-40 hidden lg:flex flex-col items-center gap-6 text-xs font-mono text-[var(--text-secondary)] select-none">
      {/* Dynamic Vertical Scroll Progress Track & Indicator */}
      <div className="relative h-24 w-[2px] bg-[var(--border-subtle)] rounded-full overflow-hidden flex flex-col items-center">
        <motion.div
          className="w-full bg-[var(--accent)] rounded-full shadow-[0_0_8px_var(--accent)]"
          style={{
            height: "100%",
            scaleY: scaleY,
            transformOrigin: "top",
          }}
        />
      </div>

      {/* Social Media Links */}
      <div className="flex flex-col items-center gap-5">
        <a
          href="https://linkedin.com/in/bagasaditya"
          target="_blank"
          rel="noreferrer"
          className="hover:text-[var(--accent)] hover:-translate-y-1 transition-all"
          title="LinkedIn Profile"
        >
          LI
        </a>
        <a
          href="https://github.com/gabas21"
          target="_blank"
          rel="noreferrer"
          className="hover:text-[var(--accent)] hover:-translate-y-1 transition-all"
          title="GitHub Profile"
        >
          GH
        </a>
        <a
          href="https://wa.me/6282159888947"
          target="_blank"
          rel="noreferrer"
          className="hover:text-[var(--accent)] hover:-translate-y-1 transition-all"
          title="WhatsApp Chat"
        >
          WA
        </a>
      </div>
    </div>
  );
}
