"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Project } from "@/data/projects";

interface YellowCurtainProps {
  isActive: boolean;
  project: Project | null;
  mode?: "open" | "close";
}

export default function YellowCurtainTransition({
  isActive,
  project,
}: YellowCurtainProps) {
  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key="yellow-curtain"
          initial={{ y: "100%" }}
          animate={{
            y: "0%",
            transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] },
          }}
          exit={{
            y: "-100%",
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.15 },
          }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#FACC15] text-black select-none pointer-events-none"
        >
          {project && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="text-center px-6 max-w-2xl space-y-2"
            >
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-black/70 flex items-center justify-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-black" />
                <span>{project.category}</span>
              </span>

              <h2 className="text-2xl sm:text-4xl md:text-5xl font-mono font-extrabold tracking-tight text-black">
                {project.title}
              </h2>

              <p className="text-xs sm:text-sm font-mono text-black/80 font-medium">
                {project.role}
              </p>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
