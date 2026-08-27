"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Sun, Moon } from "@phosphor-icons/react";
import { Menu } from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";
import GlassSurface from "./reactbits/GlassSurface";
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
      setScrolled(window.scrollY > 30);

      const sections = ["about", "experience", "skills", "works", "contact"];
      const scrollPos = window.scrollY + 140;

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

      {/* Floating 3D Morphing Navbar Container */}
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none flex justify-center px-4 pt-3 sm:pt-4">
        <motion.div
          layout
          transition={{
            type: "spring",
            stiffness: 280,
            damping: 28,
            mass: 0.8,
          }}
          className={`pointer-events-auto w-full transition-all duration-300 ${
            scrolled ? "max-w-[860px]" : "max-w-[1240px]"
          }`}
        >
          {scrolled ? (
            /* ── 3D Morphing Glass Surface Pill (Scrolled State) ── */
            <GlassSurface
              width="100%"
              height="auto"
              borderRadius={9999}
              borderWidth={0.06}
              brightness={50}
              opacity={0.93}
              blur={11}
              displace={0}
              distortionScale={-160}
              redOffset={0}
              greenOffset={10}
              blueOffset={20}
              mixBlendMode="difference"
              className="py-1.5 px-3 sm:px-4"
            >
              {/* Brand Logo */}
              <Link
                href="/"
                className="group flex items-center gap-1.5 font-bold tracking-tight text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors pl-2"
              >
                <span className="text-sm sm:text-base uppercase tracking-tighter font-display">
                  Bagas Aditya<span className="text-[var(--accent)] font-mono">.</span>
                </span>
              </Link>

              {/* Desktop Nav Items */}
              <nav className="hidden md:flex items-center gap-1 bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.08] rounded-full p-1 shadow-inner backdrop-blur-md">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      className={`relative text-xs font-mono font-medium px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                        isActive
                          ? "text-black font-semibold"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="active-nav-indicator"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          className="absolute inset-0 rounded-full bg-[var(--accent)] shadow-[0_2px_12px_rgba(191,255,4,0.4)] -z-10"
                        />
                      )}
                      {link.name}
                    </a>
                  );
                })}
              </nav>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleTheme}
                  className="p-2 sm:p-2.5 rounded-full bg-black/[0.03] dark:bg-white/[0.06] border border-black/[0.08] dark:border-white/10 hover:border-[var(--accent)] text-[var(--text-primary)] text-xs transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
                  title={`Switch to ${theme === "dark" ? "Light Mode" : "Dark Mode"}`}
                  aria-label="Toggle Theme"
                >
                  {theme === "dark" ? (
                    <Moon size={14} weight="fill" className="text-sky-400" />
                  ) : (
                    <Sun size={14} weight="bold" className="text-amber-500" />
                  )}
                </button>

                <a
                  href="mailto:bagasa020@gmail.com"
                  className="hidden sm:inline-flex items-center gap-1 px-4 py-2 rounded-full bg-[var(--accent)] text-black font-semibold text-xs transition-all hover:scale-105 active:scale-95 shadow-[0_2px_12px_rgba(191,255,4,0.3)] hover:opacity-95 cursor-pointer"
                >
                  <span>Contact</span>
                  <ArrowUpRight size={12} weight="bold" />
                </a>

                <button
                  onClick={() => setMenuOpen(true)}
                  className="flex h-8 w-8 sm:h-8.5 sm:w-8.5 items-center justify-center rounded-full bg-black/[0.03] dark:bg-white/[0.06] border border-black/[0.08] dark:border-white/10 text-[var(--text-primary)] hover:bg-[var(--accent)] hover:text-black hover:border-[var(--accent)] transition-all cursor-pointer shadow-sm"
                  aria-label="Toggle Fullscreen Menu"
                >
                  <Menu size={15} />
                </button>
              </div>
            </GlassSurface>
          ) : (
            /* ── Top Full-Width Hero Navbar State ── */
            <header className="w-full flex items-center justify-between py-3 px-2 sm:px-4 bg-transparent">
              {/* Brand Logo */}
              <Link
                href="/"
                className="group flex items-center gap-2 font-bold tracking-tight text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors pl-2"
              >
                <span className="text-lg sm:text-xl uppercase tracking-tighter font-display">
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
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={toggleTheme}
                  className="p-2.5 rounded-full bg-[var(--surface-card)] border border-[var(--border-subtle)] hover:border-[var(--accent)] text-[var(--text-primary)] text-xs transition-all duration-200 cursor-pointer shadow-sm hover:scale-105 active:scale-95"
                  title={`Switch to ${theme === "dark" ? "Light Mode" : "Dark Mode"}`}
                  aria-label="Toggle Theme"
                >
                  {theme === "dark" ? (
                    <Moon size={15} weight="fill" className="text-sky-400" />
                  ) : (
                    <Sun size={15} weight="bold" className="text-amber-500" />
                  )}
                </button>

                <a
                  href="mailto:bagasa020@gmail.com"
                  className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[var(--accent)] text-black font-semibold text-xs transition-all active:scale-[0.98] shadow-sm hover:opacity-90 cursor-pointer"
                >
                  <span>Contact ↗</span>
                </a>

                <button
                  onClick={() => setMenuOpen(true)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--surface-card)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:bg-[var(--accent)] hover:text-black transition-colors cursor-pointer hover:scale-105 active:scale-95"
                  aria-label="Toggle Fullscreen Menu"
                >
                  <Menu size={16} />
                </button>
              </div>
            </header>
          )}
        </motion.div>
      </div>

      {/* Fullscreen Modal Navigation */}
      <FullscreenMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
