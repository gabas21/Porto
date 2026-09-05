"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  X,
  DownloadSimple,
  Copy,
  Check,
  Briefcase,
  GraduationCap,
  Sparkle,
  Envelope,
  Phone,
  MapPin,
  FilePdf,
  Certificate,
  FolderSimple,
  LinkedinLogo,
  GithubLogo,
} from "@phosphor-icons/react";
import { soundFx } from "@/lib/audio-fx";
import { useLanguage } from "@/context/LanguageContext";

interface ResumePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumePreviewModal({ isOpen, onClose }: ResumePreviewModalProps) {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  const handleCopySummary = () => {
    const summaryText = `BAGAS ADITYA ANUGRAH RAMADHAN
Frontend Developer | Web Developer
Samarinda, Kalimantan Timur • bagasa020@gmail.com • +62 821-5988-8947
LinkedIn: linkedin.com/in/bagasaditya • GitHub: github.com/gabas21

Ringkasan Profesional:
Mahasiswa Teknik Informatika di STMIK Widya Cipta Dharma dengan fokus keahlian pada Frontend Web Development dan ekosistem modern Laravel. Berpengalaman menerjemahkan rancangan desain UI/UX berbasis Figma menjadi antarmuka web yang modular, semantik, responsif, dan teroptimasi lintas perangkat menggunakan Tailwind CSS, Blade Templating, dan Next.js. Berhasil merancang antarmuka sistem informasi yang diadopsi dan diimplementasikan secara resmi oleh instansi pemerintah daerah (Bapelitbangda Mahakam Ulu), serta berpengalaman dalam integrasi RESTful API, dynamic state management, dan alur kerja kolaboratif Git.`;

    navigator.clipboard.writeText(summaryText);
    soundFx.playSuccess();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    soundFx.playClick();
    const link = document.createElement("a");
    link.href = "/cv.pdf";
    link.download = "CV_Bagas_Aditya_Anugrah_Ramadhan_Frontend_Developer.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <div
      data-testid="resume-preview-modal"
      data-lenis-prevent="true"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6"
    >
      {/* Backdrop */}
      <div
        onClick={() => {
          soundFx.playClick();
          onClose();
        }}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
        data-lenis-prevent="true"
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-main)] shadow-2xl z-10 font-sans overflow-hidden"
      >
        {/* Header / Top action bar */}
        <div className="flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5 border-b border-[var(--border-subtle)] bg-[var(--bg-main)]/95 backdrop-blur-md shrink-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30 flex items-center justify-center shrink-0">
              <FilePdf size={22} weight="duotone" />
            </div>
            <div>
              <h2 data-testid="cv-modal-title" className="text-lg sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
                Curriculum Vitae Preview
              </h2>
              <p className="text-xs font-mono text-[var(--text-secondary)]">
                Bagas Aditya Anugrah Ramadhan • Official Resume Details
              </p>
            </div>
          </div>

          <button
            data-testid="close-cv-modal"
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-2 rounded-xl text-[var(--text-secondary)] hover:text-white hover:bg-[var(--surface-card)] transition-colors cursor-pointer"
            aria-label="Tutup CV Modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Resume Content Body */}
        <div
          data-lenis-prevent="true"
          className="flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-8 space-y-6 text-left no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {/* Profile Intro Card */}
          <div className="p-5 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-subtle)] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] uppercase tracking-tight">
                  Bagas Aditya Anugrah Ramadhan
                </h3>
                <p className="text-xs sm:text-sm font-mono font-semibold text-[var(--accent)]">
                  Frontend Developer | Web Developer
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--text-secondary)]">
                <MapPin size={14} className="text-[var(--accent)]" />
                <span>Samarinda, Kalimantan Timur</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-secondary)] font-bold">
                {language === "id" ? "Ringkasan Profesional" : "Professional Summary"}
              </h4>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
                {language === "id" ? (
                  <>
                    Mahasiswa Teknik Informatika di <strong className="text-[var(--text-primary)] font-medium">STMIK Widya Cipta Dharma</strong> dengan fokus keahlian pada Frontend Web Development dan ekosistem modern Laravel. Berpengalaman menerjemahkan rancangan desain UI/UX berbasis Figma menjadi antarmuka web yang modular, semantik, responsif, dan teroptimasi lintas perangkat menggunakan Tailwind CSS, Blade Templating, dan Next.js. Berhasil merancang antarmuka sistem informasi yang diadopsi dan diimplementasikan secara resmi oleh instansi pemerintah daerah (Bapelitbangda Mahakam Ulu), serta berpengalaman dalam integrasi RESTful API, dynamic state management, dan alur kerja kolaboratif Git.
                  </>
                ) : (
                  <>
                    Computer Science student at <strong className="text-[var(--text-primary)] font-medium">STMIK Widya Cipta Dharma</strong> specializing in Frontend Web Architecture and modern web engineering. Proven track record translating Figma design specifications into modular, semantic, and high-performance web interfaces across viewports using Next.js, TypeScript, and Tailwind CSS. Successfully architected regional government systems adopted by regional planning agencies (Bapelitbangda Mahakam Ulu), with deep competence in RESTful API integration, dynamic state management, and Git workflows.
                  </>
                )}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-3 text-xs font-mono text-[var(--text-secondary)] border-t border-[var(--border-subtle)]/60">
              <a href="mailto:bagasa020@gmail.com" className="flex items-center gap-1.5 hover:text-[var(--accent)] transition-colors">
                <Envelope size={14} className="text-[var(--accent)]" /> bagasa020@gmail.com
              </a>
              <a href="https://wa.me/6282159888947" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
                <Phone size={14} className="text-emerald-400" /> +62 821-5988-8947
              </a>
              <a href="https://linkedin.com/in/bagasaditya" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-sky-400 transition-colors">
                <LinkedinLogo size={14} className="text-sky-400" /> linkedin.com/in/bagasaditya
              </a>
              <a href="https://github.com/gabas21" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
                <GithubLogo size={14} className="text-amber-400" /> github.com/gabas21
              </a>
            </div>
          </div>

          {/* Work Experience */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-2">
              <Briefcase size={15} className="text-[var(--accent)]" />
              {language === "id" ? "Pengalaman Kerja & Magang" : "Work Experience & Internships"}
            </h4>

            <div className="p-4 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-subtle)] space-y-2.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <h5 className="text-sm font-bold text-[var(--text-primary)]">
                    CV Anak Kalimantan Kreatif — Frontend Developer Intern
                  </h5>
                  <p className="text-xs font-mono text-[var(--text-secondary)]">Samarinda, Kalimantan Timur</p>
                </div>
                <span className="text-xs font-mono text-[var(--accent)] font-semibold">Januari 2026 – Maret 2026</span>
              </div>
              <ul className="text-xs sm:text-sm text-[var(--text-secondary)] space-y-1.5 list-disc list-inside leading-relaxed">
                <li>Bertanggung jawab penuh dalam proses slicing antarmuka pengguna berbasis desain Figma ke dalam template Blade menggunakan Tailwind CSS dan JavaScript.</li>
                <li>Memastikan tingkat fidelitas visual 100% sesuai acuan UI/UX serta mengeliminasi kendala responsivitas pada berbagai resolusi layar.</li>
                <li>Berkolaborasi aktif bersama tim pengembang backend menggunakan alur kerja Git (branching, pull request, code review) untuk integrasi modul secara berkelanjutan.</li>
              </ul>
            </div>
          </div>

          {/* Key Technology Projects */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-2">
              <FolderSimple size={15} className="text-[var(--accent)]" />
              Proyek Teknologi &amp; Pengembangan Web
            </h4>

            <div className="grid grid-cols-1 gap-2.5">
              {[
                {
                  title: "Sistem Informasi Perencanaan Bapelitbangda Mahakam Ulu (bapelitbangda_mahuluNew)",
                  role: "Frontend Developer",
                  tech: "Laravel Blade, Tailwind CSS, JavaScript, Figma, MySQL",
                  bullets: [
                    "Merancang sistem desain antarmuka dan mengembangkan dashboard yang diadopsi dan digunakan secara aktif oleh pemerintah daerah untuk tata kelola administrasi perencanaan.",
                    "Mengonversi kebutuhan alur birokrasi pemerintahan menjadi antarmuka intuitif dan terstruktur guna mempermudah proses validasi dokumen lintas bidang.",
                    "Membangun komponen tabel data interaktif dengan fitur penyaringan kategori, pencarian data real-time, dan status badge dokumen perencanaan."
                  ]
                },
                {
                  title: "Motion — AI-Powered Task & Automation Platform",
                  role: "Frontend Developer",
                  tech: "Next.js, React.js, Golang, Supabase, REST API",
                  bullets: [
                    "Mengembangkan antarmuka web modern berbasis Next.js dan Tailwind CSS dengan struktur tata letak modular dan performa responsif.",
                    "Mengimplementasikan alur interaksi antarmuka cerdas untuk prompt & response LLM via integrasi API OpenRouter serta Telegram Bot.",
                    "Mengelola dynamic state management komponen, navigasi dinamis, dan feedback visual (loading skeleton, status badge) secara real-time."
                  ]
                },
                {
                  title: "Web Portal & Profil Perusahaan PT Mahakam Gerbang Raja Migas",
                  role: "Frontend Developer",
                  tech: "Laravel Blade, Tailwind CSS, JavaScript, REST API",
                  bullets: [
                    "Merancang dan membangun arsitektur antarmuka portal institusi dengan pendekatan mobile-first design.",
                    "Mengembangkan komponen UI interaktif untuk visualisasi data analitik dan feed konten dinamis melalui konsumsi RESTful API.",
                    "Mengoptimalkan rendering halaman dan asset bundling guna meningkatkan performa kecepatan pemuatan web."
                  ]
                },
                {
                  title: "Sistem Pelaporan Kerusakan Fasilitas Kampus (Laporan Kampus)",
                  role: "Full Stack / Frontend Developer",
                  tech: "Laravel Blade, Tailwind CSS, JavaScript, HTML5 QR Scanner",
                  bullets: [
                    "Membangun antarmuka interaktif pelaporan fasilitas dan dashboard manajemen teknisi yang teroptimasi di mobile maupun desktop.",
                    "Mengintegrasikan modul scanner kamera QR Code langsung pada browser untuk identifikasi lokasi kerusakan secara instan.",
                    "Menerapkan form dinamis dengan validasi client-side, upload preview gambar, serta sistem pelacakan status tiket visual."
                  ]
                },
                {
                  title: "Web Portal Resmi Inspektorat Kabupaten Mahakam Ulu",
                  role: "Frontend Developer",
                  tech: "Laravel Blade, Tailwind CSS, Figma",
                  bullets: [
                    "Melakukan slicing desain wireframe dan prototipe Figma menjadi komponen Blade yang modular dan semantik.",
                    "Mengembangkan tata letak informasi layanan publik dan formulir pengaduan masyarakat yang ramah aksesibilitas."
                  ]
                }
              ].map((proj, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[var(--surface-card)] border border-[var(--border-subtle)] space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-0.5">
                    <h5 className="text-xs sm:text-sm font-bold text-[var(--text-primary)]">{proj.title}</h5>
                    <span className="text-[11px] font-mono text-[var(--accent)] font-semibold">{proj.role}</span>
                  </div>
                  <p className="text-[11px] font-mono text-[var(--text-secondary)]">{proj.tech}</p>
                  <ul className="text-xs text-[var(--text-secondary)] space-y-1 list-disc list-inside">
                    {proj.bullets.map((b, bi) => (
                      <li key={bi}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Education */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-2">
                <GraduationCap size={15} className="text-[var(--accent)]" />
                Pendidikan
              </h4>

              <div className="p-4 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-subtle)] space-y-1">
                <div className="flex items-center justify-between">
                  <h5 className="text-sm font-bold text-[var(--text-primary)]">
                    STMIK Widya Cipta Dharma
                  </h5>
                  <span className="text-[11px] font-mono text-[var(--accent)] font-semibold">2022 – Sekarang</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)]">
                  Sarjana Komputer (S.Kom) dalam Teknik Informatika
                </p>
                <p className="text-[11px] font-mono text-[var(--text-secondary)]/80">
                  Samarinda, Indonesia
                </p>
              </div>
            </div>

            {/* Certifications */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-2">
                <Certificate size={15} className="text-[var(--accent)]" />
                Sertifikasi &amp; Pelatihan
              </h4>

              <div className="p-4 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-subtle)] space-y-1.5 text-xs text-[var(--text-secondary)]">
                <div className="flex items-center justify-between">
                  <span>• Software Engineer Certificate</span>
                  <span className="font-mono text-[var(--accent)]">HackerRank (2026)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>• JavaScript (Basic) Certificate</span>
                  <span className="font-mono text-[var(--accent)]">HackerRank (2026)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>• Belajar Dasar Cloud dan Gen AI di AWS</span>
                  <span className="font-mono text-[var(--accent)]">Dicoding (2026)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>• Memulai Pemrograman dengan Python</span>
                  <span className="font-mono text-[var(--accent)]">Dicoding (2026)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Skills 6 Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-2">
              <Sparkle size={15} className="text-[var(--accent)]" />
              Keahlian Teknis
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              {[
                { cat: "Frontend Core", items: "HTML5 (Semantic), CSS3, JavaScript (ES6+), Blade Templating" },
                { cat: "UI Frameworks & Libraries", items: "Tailwind CSS, Next.js, React.js, Bootstrap, PostCSS" },
                { cat: "UI/UX & Design", items: "Figma (Design Slicing, Design System, Prototyping), Responsive Web Design, Mobile-First Design" },
                { cat: "Backend & API Integration", items: "RESTful API Integration, JSON Data Handling, PHP, Laravel, MySQL, Supabase" },
                { cat: "Tools & Version Control", items: "Git, GitHub (Branching, PRs, Code Review), Postman, Vite, NPM, Yarn" },
                { cat: "AI-Assisted Development", items: "Cursor, Windsurf, OpenCode, Antigravity" }
              ].map((group, gi) => (
                <div key={gi} className="p-3 rounded-xl bg-[var(--surface-card)] border border-[var(--border-subtle)] space-y-1">
                  <span className="text-[11px] font-bold text-[var(--accent)] block">{group.cat}</span>
                  <span className="text-[11px] text-[var(--text-secondary)] leading-relaxed font-sans">{group.items}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-4 sm:px-8 sm:py-4 border-t border-[var(--border-subtle)] bg-[var(--bg-main)]/95 backdrop-blur-md shrink-0 z-20">
          <button
            onClick={handleCopySummary}
            className="w-full sm:w-auto min-h-[44px] px-5 py-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:bg-[var(--surface-card-hover)] text-xs font-mono text-[var(--text-primary)] flex items-center justify-center gap-2 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            {copied ? (
              <>
                <Check size={16} weight="bold" className="text-emerald-400" />
                <span>{language === "id" ? "Summary Tersalin!" : "Summary Copied!"}</span>
              </>
            ) : (
              <>
                <Copy size={16} />
                <span>{language === "id" ? "Salin Ringkasan Profil" : "Copy Profile Summary"}</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleDownload}
              className="w-full sm:w-auto min-h-[44px] px-6 py-3 rounded-xl bg-[var(--accent)] hover:opacity-90 text-black font-semibold text-xs sm:text-sm font-mono flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              <DownloadSimple size={18} weight="bold" />
              <span>Download CV (PDF)</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
