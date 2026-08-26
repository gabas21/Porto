"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Sun, Moon } from "@phosphor-icons/react";
import { Menu } from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";
import MagnetButton from "./reactbits/MagnetButton";
import ClickSpark from "./reactbits/ClickSpark";
import FullscreenMenu from "./layout/FullscreenMenu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 35,
    restDelta: 0.001,
  });

  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") as "dark" | "light") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["about", "experience", "skills", "works", "contact"];
      const scrollPos = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Works", href: "#works" },
  ];

  return (
    <>
      {/* Top Global Scroll Progress Bar Line */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-[var(--accent)] z-[100] shadow-[0_0_12px_var(--accent)] pointer-events-none"
        style={{
          scaleX,
          transformOrigin: "0%",
        }}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[var(--bg-main)]/90 backdrop-blur-xl border-b border-[var(--border-subtle)] py-3.5 shadow-xl"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-6 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 font-bold tracking-tight text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
          >
            <span className="text-xl uppercase tracking-tighter font-display">
              Bagas Aditya<span className="text-[var(--accent)] font-mono">.</span>
            </span>
          </Link>

          {/* Desktop Navigation Floating Pill */}
          <nav className="hidden md:flex items-center gap-1 bg-[var(--surface-card)]/90 border border-[var(--border-subtle)] rounded-full px-4 py-1.5 shadow-sm backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-xs font-mono font-medium px-4 py-1.5 rounded-full transition-all duration-150 ${
                    isActive
                      ? "bg-[var(--accent)] text-black font-semibold shadow-sm"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Theme Switcher, Contact & Menu CTA */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-[var(--surface-card)] border border-[var(--border-subtle)] hover:border-[var(--accent)] text-[var(--text-primary)] text-xs transition-all duration-200 cursor-pointer shadow-sm"
              title={`Switch to ${theme === "dark" ? "Light Mode" : "Dark Mode"}`}
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <Moon size={15} weight="fill" className="text-sky-400" />
              ) : (
                <Sun size={15} weight="bold" className="text-amber-500" />
              )}
            </button>

            {/* Quick Contact Link */}
            <a
              href="mailto:bagasa020@gmail.com"
              className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[var(--accent)] text-black font-semibold text-xs transition-all active:scale-[0.98] shadow-sm hover:opacity-90 cursor-pointer"
            >
              <span>Contact ↗</span>
            </a>

            {/* Fullscreen Curtain Menu Trigger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--surface-card)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:bg-[var(--accent)] hover:text-black transition-colors cursor-pointer"
              aria-label="Toggle Fullscreen Menu"
            >
              <Menu size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Modal Navigation */}
      <FullscreenMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
