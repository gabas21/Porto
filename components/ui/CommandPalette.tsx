"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MagnifyingGlass,
  Command,
  FileText,
  Envelope,
  WhatsappLogo,
  SpeakerHigh,
  SpeakerSlash,
  ArrowRight,
  FolderOpen,
  Compass,
  X,
  Sparkle,
  Check,
} from "@phosphor-icons/react";
import { projects } from "@/data/projects";
import { soundFx } from "@/lib/audio-fx";
import { useLanguage } from "@/context/LanguageContext";

interface CommandItem {
  id: string;
  title: string;
  category: "Navigation" | "Projects" | "Actions";
  icon: React.ReactNode;
  subtitle?: string;
  badge?: string;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCV?: () => void;
}

export default function CommandPalette({ isOpen, onClose, onOpenCV }: CommandPaletteProps) {
  const { t, language, toggleLanguage } = useLanguage();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isMuted, setIsMuted] = useState(() => (typeof window !== "undefined" ? soundFx.getIsMuted() : false));
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleSoundToggle = (e: Event) => {
      const custom = e as CustomEvent<{ isMuted: boolean }>;
      setIsMuted(custom.detail.isMuted);
    };
    window.addEventListener("porto-sound-toggle", handleSoundToggle);
    return () => window.removeEventListener("porto-sound-toggle", handleSoundToggle);
  }, []);

  // Global hotkey Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          soundFx.playSweep();
          window.dispatchEvent(new CustomEvent("open-command-palette"));
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const scrollToSection = useCallback((id: string) => {
    onClose();
    soundFx.playClick();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  }, [onClose]);

  const handleCopyEmail = useCallback(() => {
    navigator.clipboard.writeText("bagasaditya2411@gmail.com");
    soundFx.playSuccess();
    setCopiedEmail(true);
    setTimeout(() => {
      setCopiedEmail(false);
      onClose();
    }, 1200);
  }, [onClose]);

  const handleToggleSound = useCallback(() => {
    const nextMuted = soundFx.toggleMute();
    setIsMuted(nextMuted);
  }, []);

  // Build command list
  const commandItems: CommandItem[] = [
    // Navigation
    {
      id: "nav-hero",
      title: "Hero & Introduction",
      category: "Navigation",
      subtitle: "Back to top and 3D lanyard",
      icon: <Compass size={18} weight="duotone" className="text-[var(--accent)]" />,
      action: () => scrollToSection("hero"),
    },
    {
      id: "nav-about",
      title: "About Me & Philosophy",
      category: "Navigation",
      subtitle: "Story, background & core beliefs",
      icon: <Compass size={18} weight="duotone" className="text-[var(--accent)]" />,
      action: () => scrollToSection("about"),
    },
    {
      id: "nav-experience",
      title: "Journey & Experience",
      category: "Navigation",
      subtitle: "Work timeline & education history",
      icon: <Compass size={18} weight="duotone" className="text-[var(--accent)]" />,
      action: () => scrollToSection("experience"),
    },
    {
      id: "nav-tech",
      title: "Technology Arsenal",
      category: "Navigation",
      subtitle: "Core stack, animation & backend tools",
      icon: <Compass size={18} weight="duotone" className="text-[var(--accent)]" />,
      action: () => scrollToSection("tech-arsenal"),
    },
    {
      id: "nav-works",
      title: "Selected Works Showcase",
      category: "Navigation",
      subtitle: "Case studies & live interactive projects",
      icon: <FolderOpen size={18} weight="duotone" className="text-[var(--accent)]" />,
      action: () => scrollToSection("works"),
    },
    {
      id: "nav-contact",
      title: "Contact & Footer",
      category: "Navigation",
      subtitle: "Get in touch & local Samarinda time",
      icon: <Envelope size={18} weight="duotone" className="text-[var(--accent)]" />,
      action: () => scrollToSection("contact"),
    },

    // Actions
    {
      id: "act-cv",
      title: "Interactive CV / Resume",
      category: "Actions",
      subtitle: "View professional summary & key qualifications",
      badge: "Quick View",
      icon: <FileText size={18} weight="duotone" className="text-amber-400" />,
      action: () => {
        onClose();
        soundFx.playSweep();
        if (onOpenCV) onOpenCV();
        else window.dispatchEvent(new CustomEvent("open-cv-modal"));
      },
    },
    {
      id: "act-copy-email",
      title: copiedEmail ? "Email Berhasil Disalin!" : "Copy Email Address",
      category: "Actions",
      subtitle: "bagasaditya2411@gmail.com",
      badge: copiedEmail ? "Copied ✓" : "Copy",
      icon: copiedEmail ? <Check size={18} weight="bold" className="text-emerald-400" /> : <Envelope size={18} weight="duotone" className="text-sky-400" />,
      action: handleCopyEmail,
    },
    {
      id: "act-whatsapp",
      title: "Direct WhatsApp Message",
      category: "Actions",
      subtitle: "Chat directly for inquiries",
      badge: "External",
      icon: <WhatsappLogo size={18} weight="duotone" className="text-emerald-400" />,
      action: () => {
        onClose();
        soundFx.playClick();
        window.open("https://wa.me/6285250485906?text=Halo%20Bagas,%20saya%20tertarik%20dengan%20portofolio%20Anda.", "_blank");
      },
    },
    {
      id: "act-toggle-lang",
      title: language === "id" ? "Ganti Bahasa (Switch to English)" : "Switch Language (Ubah ke Bahasa Indonesia)",
      category: "Actions",
      subtitle: language === "id" ? "Aktifkan bahasa Inggris di seluruh halaman" : "Enable Indonesian across all sections",
      badge: language.toUpperCase(),
      icon: <Sparkle size={18} weight="duotone" className="text-emerald-400" />,
      action: () => {
        toggleLanguage();
        onClose();
        soundFx.playPop();
      },
    },
    {
      id: "act-toggle-sound",
      title: isMuted ? "Aktifkan Efek Suara (Unmute)" : "Matikan Efek Suara (Mute)",
      category: "Actions",
      subtitle: "Web Audio API haptic synthesis",
      badge: isMuted ? "Muted" : "Active",
      icon: isMuted ? <SpeakerSlash size={18} weight="duotone" className="text-rose-400" /> : <SpeakerHigh size={18} weight="duotone" className="text-emerald-400" />,
      action: handleToggleSound,
    },

    // Projects direct jumps
    ...projects.map((proj) => ({
      id: `proj-${proj.id}`,
      title: proj.title,
      category: "Projects" as const,
      subtitle: `${proj.category} • ${proj.techStack.slice(0, 3).join(", ")}`,
      badge: proj.timeline,
      icon: <Sparkle size={18} weight="duotone" className="text-[var(--accent)]" />,
      action: () => {
        scrollToSection("works");
        // Dispatch custom event to open this project's deep dive
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent("open-project-modal", { detail: { projectId: proj.id } }));
        }, 300);
      },
    })),
  ];

  // Filter based on search query
  const filteredItems = commandItems.filter((item) => {
    const search = query.toLowerCase().trim();
    if (!search) return true;
    return (
      item.title.toLowerCase().includes(search) ||
      item.category.toLowerCase().includes(search) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(search))
    );
  });

  // Handle keyboard navigation
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      soundFx.playHover();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      soundFx.playHover();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.children[selectedIndex] as HTMLElement | undefined;
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Backdrop overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
      />

      {/* Palette Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -10 }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-main)] shadow-2xl shadow-black/80 flex flex-col z-10"
      >
            {/* Header / Input Field */}
            <div className="relative flex items-center border-b border-[var(--border-subtle)] px-4 py-3.5 bg-[var(--surface-card)]">
              <MagnifyingGlass size={20} className="text-[var(--text-secondary)] mr-3 shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Cari navigasi, proyek, aksi cepat (Ctrl+K)..."
                className="w-full bg-transparent text-sm sm:text-base text-[var(--text-primary)] placeholder-[var(--text-secondary)]/60 focus:outline-none font-sans"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="text-xs text-[var(--text-secondary)] hover:text-white mr-2 p-1"
                >
                  <X size={16} />
                </button>
              )}
              <kbd className="hidden sm:inline-flex items-center gap-1 rounded bg-[var(--bg-main)] px-2 py-0.5 font-mono text-[11px] text-[var(--text-secondary)] border border-[var(--border-subtle)]">
                ESC
              </kbd>
            </div>

            {/* Suggestions / Results list */}
            <div
              ref={listRef}
              data-lenis-prevent="true"
              className="max-h-[60vh] overflow-y-auto overscroll-contain p-2 divide-y divide-[var(--border-subtle)]/30 font-sans no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {filteredItems.length === 0 ? (
                <div className="py-12 text-center text-sm text-[var(--text-secondary)]">
                  Tidak ada perintah atau proyek yang cocok dengan &quot;{query}&quot;
                </div>
              ) : (
                filteredItems.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => item.action()}
                      onMouseEnter={() => {
                        setSelectedIndex(index);
                        soundFx.playHover();
                      }}
                      className={`group flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-colors duration-150 ${
                        isSelected
                          ? "bg-[var(--surface-card-hover)] text-[var(--text-primary)]"
                          : "text-[var(--text-secondary)] hover:bg-[var(--surface-card)]"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 pr-2">
                        <div
                          className={`p-2 rounded-lg border transition-colors ${
                            isSelected
                              ? "border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent)]"
                              : "border-[var(--border-subtle)] bg-[var(--bg-main)] text-[var(--text-secondary)]"
                          }`}
                        >
                          {item.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-sm font-medium truncate ${
                                isSelected ? "text-[var(--text-primary)] font-semibold" : ""
                              }`}
                            >
                              {item.title}
                            </span>
                            {item.badge && (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 shrink-0">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          {item.subtitle && (
                            <p className="text-xs text-[var(--text-secondary)] truncate">
                              {item.subtitle}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[11px] font-mono text-[var(--text-secondary)]">Pilih</span>
                        <ArrowRight size={13} className="text-[var(--accent)]" />
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer with keyboard hints */}
            <div className="flex items-center justify-between border-t border-[var(--border-subtle)] px-4 py-2 bg-[var(--surface-card)] text-[11px] font-mono text-[var(--text-secondary)]">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-main)] border border-[var(--border-subtle)]">↑</kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-main)] border border-[var(--border-subtle)]">↓</kbd> Navigasi
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-main)] border border-[var(--border-subtle)]">↵</kbd> Jalankan
                </span>
              </div>
              <div className="flex items-center gap-1 text-[var(--accent)] font-semibold">
                <Command size={13} />
                <span>Command Menu</span>
              </div>
            </div>
          </motion.div>
        </div>
  );
}
