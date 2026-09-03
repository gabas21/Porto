"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, SpeakerHigh, SpeakerSlash, Command, FileText } from "@phosphor-icons/react";
import { Menu } from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";
import GlassSurface from "./reactbits/GlassSurface";
import FullscreenMenu from "./layout/FullscreenMenu";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";
import { soundFx } from "@/lib/audio-fx";

interface NavbarProps {
  onOpenCV?: () => void;
  onOpenCommandPalette?: () => void;
}

export default function Navbar({ onOpenCV, onOpenCommandPalette }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [isMuted, setIsMuted] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 35,
    restDelta: 0.001,
  });

  useEffect(() => {
    setIsMuted(soundFx.getIsMuted());
    const handleSoundToggle = (e: Event) => {
      const custom = e as CustomEvent<{ isMuted: boolean }>;
      setIsMuted(custom.detail.isMuted);
    };
    window.addEventListener("porto-sound-toggle", handleSoundToggle);
    return () => window.removeEventListener("porto-sound-toggle", handleSoundToggle);
  }, []);

  const toggleSound = () => {
    const nextMuted = soundFx.toggleMute();
    setIsMuted(nextMuted);
  };

  const openCmdPalette = () => {
    soundFx.playSweep();
    if (onOpenCommandPalette) {
      onOpenCommandPalette();
    } else {
      window.dispatchEvent(new CustomEvent("open-command-palette"));
    }
  };

  const openCV = () => {
    soundFx.playSweep();
    if (onOpenCV) {
      onOpenCV();
    } else {
      window.dispatchEvent(new CustomEvent("open-cv-modal"));
    }
  };

  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") as "dark" | "light") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");

    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // When at the top (Hero Section), no section pill should be active
      if (window.scrollY < 220) {
        setActiveSection("");
        return;
      }

      const sections = ["about", "services", "works", "skills", "experience", "contact"];
      const scrollPos = window.scrollY + 160;
      let found = false;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            found = true;
            break;
          }
        }
      }

      if (!found) {
        setActiveSection("");
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("reset-nav-state", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("reset-nav-state", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Works", href: "#works" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
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
            scrolled
              ? "max-w-[1040px] 3xl:max-w-[1400px] 4xl:max-w-[1680px]"
              : "max-w-[1240px] 3xl:max-w-[1600px] 4xl:max-w-[2000px]"
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
              opacity={0.94}
              blur={12}
              displace={0}
              distortionScale={-35}
              redOffset={0}
              greenOffset={2}
              blueOffset={4}
              mixBlendMode="difference"
              className="py-1.5 px-3 sm:px-4"
            >
              <div className="w-full flex items-center justify-between gap-3 sm:gap-4 px-1">
                {/* Brand Logo - High Contrast (Black in Light, Crisp White in Dark) */}
                <Link
                  href="/"
                  className="group flex items-center gap-1.5 font-bold tracking-tight text-zinc-900 dark:text-white hover:text-[var(--accent)] transition-colors pl-2 shrink-0"
                >
                  <span className="text-sm sm:text-base uppercase tracking-tighter font-display">
                    Bagas Aditya<span className="text-[var(--accent)] font-mono">.</span>
                  </span>
                </Link>

                {/* Desktop Nav Items - Crisp High-Contrast Badges */}
                <nav className="hidden md:flex items-center gap-1 bg-black/[0.04] dark:bg-white/[0.08] border border-black/[0.06] dark:border-white/15 rounded-full p-1 shadow-inner backdrop-blur-md">
                  {navLinks.map((link) => {
                    const isActive = activeSection === link.href.substring(1);
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        className={`relative text-xs font-mono font-medium px-4 py-2 min-h-[36px] flex items-center justify-center rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
                          isActive
                            ? "text-black font-semibold"
                            : "text-zinc-600 dark:text-zinc-200 hover:text-black dark:hover:text-white"
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="active-nav-indicator"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                            className="absolute inset-0 rounded-full bg-[var(--accent)] shadow-[0_2px_12px_rgba(250,204,21,0.4)] -z-10"
                          />
                        )}
                        {link.name}
                      </a>
                    );
                  })}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  {/* Command Palette Trigger */}
                  <button
                    onClick={openCmdPalette}
                    className="flex items-center gap-1.5 px-3 py-2 min-h-[38px] rounded-full bg-black/[0.04] dark:bg-white/[0.08] border border-black/[0.08] dark:border-white/15 hover:border-[var(--accent)] text-zinc-600 dark:text-zinc-200 hover:text-black dark:hover:text-white text-xs transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                    title="Buka Command Menu (Ctrl+K / ⌘K)"
                    aria-label="Command Menu"
                  >
                    <Command size={14} className="text-[var(--accent)]" />
                    <span className="text-xs font-mono font-semibold hidden md:inline">⌘K</span>
                  </button>

                  {/* Audio FX Toggle */}
                  <button
                    onClick={toggleSound}
                    className="w-9.5 h-9.5 min-w-[38px] min-h-[38px] rounded-full bg-black/[0.04] dark:bg-white/[0.08] border border-black/[0.08] dark:border-white/15 hover:border-[var(--accent)] text-zinc-700 dark:text-zinc-200 text-xs transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                    title={isMuted ? "Aktifkan Efek Suara" : "Matikan Efek Suara"}
                    aria-label="Toggle Sound Effects"
                  >
                    {isMuted ? (
                      <SpeakerSlash size={16} className="text-rose-400" />
                    ) : (
                      <SpeakerHigh size={16} className="text-[var(--accent)]" />
                    )}
                  </button>

                  <AnimatedThemeToggler
                    variant="circle"
                    duration={500}
                    theme={theme}
                    onThemeChange={(newTheme) => setTheme(newTheme)}
                    className="w-9.5 h-9.5 min-w-[38px] min-h-[38px] rounded-full bg-black/[0.04] dark:bg-white/[0.08] border border-black/[0.08] dark:border-white/15 hover:border-[var(--accent)] text-zinc-700 dark:text-zinc-200 text-xs transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  />

                  <button
                    onClick={() => {
                      soundFx.playSweep();
                      window.dispatchEvent(new CustomEvent("open-contact-modal"));
                    }}
                    className="hidden sm:inline-flex items-center gap-1.5 px-4.5 py-2 min-h-[38px] rounded-full bg-[var(--accent)] text-black font-semibold text-xs transition-all hover:scale-105 active:scale-95 shadow-[0_2px_12px_rgba(250,204,21,0.3)] hover:opacity-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                  >
                    <span>Contact</span>
                    <ArrowUpRight size={13} weight="bold" />
                  </button>

                  <button
                    onClick={() => setMenuOpen(true)}
                    className="flex h-10 w-10 min-w-[40px] min-h-[40px] items-center justify-center rounded-full bg-black/[0.04] dark:bg-white/[0.08] border border-black/[0.08] dark:border-white/15 text-zinc-700 dark:text-zinc-200 hover:bg-[var(--accent)] hover:text-black hover:border-[var(--accent)] transition-all cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                    aria-label="Toggle Fullscreen Menu"
                  >
                    <Menu size={17} />
                  </button>
                </div>
              </div>
            </GlassSurface>
          ) : (
            /* ── Top Full-Width Hero Navbar State ── */
            <header className="w-full flex items-center justify-between gap-4 py-3 px-3 sm:px-6 bg-transparent">
              {/* Brand Logo - Crisp White in Dark Mode */}
              <Link
                href="/"
                className="group flex items-center gap-2 font-bold tracking-tight text-zinc-900 dark:text-white hover:text-[var(--accent)] transition-colors pl-1 sm:pl-2 shrink-0"
              >
                <span className="text-lg sm:text-xl uppercase tracking-tighter font-display">
                  Bagas Aditya<span className="text-[var(--accent)] font-mono">.</span>
                </span>
              </Link>

              {/* Desktop Navigation Floating Pill */}
              <nav className="hidden md:flex items-center gap-1 bg-white/90 dark:bg-[var(--surface-card)]/90 border border-black/[0.08] dark:border-white/15 rounded-full px-3 py-1 shadow-sm backdrop-blur-md">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      className={`text-xs font-mono font-medium px-4 py-2 min-h-[36px] flex items-center justify-center rounded-full transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
                        isActive
                          ? "bg-[#F0F0F2] text-black border border-black/5 shadow-sm dark:bg-[#FACC15] dark:text-black dark:border-transparent font-semibold"
                          : "text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white"
                      }`}
                    >
                      {link.name}
                    </a>
                  );
                })}
              </nav>

              {/* Theme Switcher, Contact & Menu CTA */}
              <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
                {/* Command Palette Trigger */}
                <button
                  onClick={openCmdPalette}
                  className="flex items-center gap-1.5 px-3 py-2 min-h-[38px] rounded-full bg-white dark:bg-[var(--surface-card)] border border-black/[0.08] dark:border-white/15 hover:border-[var(--accent)] text-zinc-600 dark:text-zinc-200 hover:text-black dark:hover:text-white text-xs transition-all duration-200 cursor-pointer shadow-sm hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  title="Buka Command Menu (Ctrl+K / ⌘K)"
                  aria-label="Command Menu"
                >
                  <Command size={14} className="text-[var(--accent)]" />
                  <span className="text-xs font-mono font-semibold hidden sm:inline">⌘K</span>
                </button>

                {/* Audio FX Toggle */}
                <button
                  onClick={toggleSound}
                  className="w-9.5 h-9.5 min-w-[38px] min-h-[38px] rounded-full bg-white dark:bg-[var(--surface-card)] border border-black/[0.08] dark:border-white/15 hover:border-[var(--accent)] text-zinc-700 dark:text-zinc-200 text-xs transition-all duration-200 cursor-pointer shadow-sm hover:scale-105 active:scale-95 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  title={isMuted ? "Aktifkan Efek Suara" : "Matikan Efek Suara"}
                  aria-label="Toggle Sound Effects"
                >
                  {isMuted ? (
                    <SpeakerSlash size={16} className="text-rose-400" />
                  ) : (
                    <SpeakerHigh size={16} className="text-[var(--accent)]" />
                  )}
                </button>

                <AnimatedThemeToggler
                  variant="circle"
                  duration={500}
                  theme={theme}
                  onThemeChange={(newTheme) => setTheme(newTheme)}
                  className="w-9.5 h-9.5 min-w-[38px] min-h-[38px] rounded-full bg-white dark:bg-[var(--surface-card)] border border-black/[0.08] dark:border-white/15 hover:border-[var(--accent)] text-zinc-700 dark:text-zinc-200 text-xs transition-all duration-200 cursor-pointer shadow-sm hover:scale-105 active:scale-95 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                />

                <button
                  onClick={() => {
                    soundFx.playSweep();
                    window.dispatchEvent(new CustomEvent("open-contact-modal"));
                  }}
                  className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 min-h-[38px] rounded-full bg-white hover:bg-gray-50 text-black border border-black/10 shadow-sm dark:bg-[var(--accent)] dark:text-black dark:border-transparent font-semibold text-xs transition-all active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                >
                  <span>Contact ↗</span>
                </button>

                <button
                  onClick={() => setMenuOpen(true)}
                  className="flex h-10 w-10 min-w-[40px] min-h-[40px] items-center justify-center rounded-full bg-white dark:bg-[var(--surface-card)] border border-black/[0.08] dark:border-white/15 text-zinc-700 dark:text-zinc-200 hover:bg-[var(--accent)] hover:text-black transition-colors cursor-pointer hover:scale-105 active:scale-95 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  aria-label="Toggle Fullscreen Menu"
                >
                  <Menu size={18} />
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
