"use client";

import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { X } from "lucide-react";

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { title: "Home", href: "/" },
  { title: "About", href: "#about" },
  { title: "Experience", href: "#experience" },
  { title: "Works", href: "#works" },
  { title: "Contact", href: "mailto:bagasa020@gmail.com" },
];

export default function FullscreenMenu({ isOpen, onClose }: MenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[990] flex items-center justify-center bg-black/85 backdrop-blur-2xl p-6"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl rounded-3xl bg-[var(--surface-card)] border border-[var(--border-subtle)] p-8 md:p-16 flex flex-col justify-between shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-3 rounded-full bg-[var(--bg-main)] text-white hover:bg-[var(--accent)] hover:text-black transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col space-y-4 my-8">
              {navLinks.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  onClick={onClose}
                  className="text-4xl md:text-6xl font-bold tracking-tight text-white hover:text-[var(--accent)] transition-colors"
                >
                  {link.title}
                </Link>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row justify-between text-xs font-mono text-[var(--text-secondary)] gap-4">
              <span>Bagas Aditya Anugrah Ramadhan — Samarinda</span>
              <span>bagasa020@gmail.com</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
