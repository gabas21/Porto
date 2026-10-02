"use client";

import Link from "next/link";
import { House, ArrowLeft, Eye, Compass } from "@phosphor-icons/react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] flex flex-col items-center justify-center px-4 sm:px-6 relative overflow-hidden selection:bg-[var(--accent)] selection:text-black">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 bg-[var(--accent)]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-xl w-full text-center space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface-card)] border border-[var(--border-subtle)] text-xs font-mono uppercase tracking-wider text-[var(--accent)] font-semibold shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-ping" />
          <span>Error 404 // Out of Range</span>
        </div>

        {/* Big Display 404 */}
        <div className="space-y-3">
          <h1 className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter font-display text-[var(--text-primary)] leading-none select-none">
            4<span className="bg-gradient-to-r from-[var(--accent)] via-amber-300 to-yellow-500 bg-clip-text text-transparent">0</span>4
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight font-display text-[var(--text-primary)]">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] font-sans max-w-md mx-auto leading-relaxed">
            Koordinat atau rute yang Anda tuju tampaknya berada di luar direktori portofolio atau telah dipindahkan ke alamat baru.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-[var(--accent)] text-black font-semibold text-sm hover:brightness-110 active:scale-[0.98] transition-all shadow-md shadow-[var(--accent)]/20"
          >
            <House size={18} weight="bold" />
            <span>Kembali ke Beranda</span>
          </Link>

          <Link
            href="/#works"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-[var(--surface-card)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-medium text-sm hover:border-[var(--accent)]/50 hover:bg-[var(--surface-card-hover)] active:scale-[0.98] transition-all"
          >
            <Eye size={18} weight="bold" />
            <span>Lihat Karya & Portofolio</span>
          </Link>
        </div>

        {/* Footer info tag */}
        <div className="pt-8 border-t border-[var(--border-subtle)]/50 text-xs font-mono text-[var(--text-secondary)]">
          <span>Official Portfolio of Bagas Aditya Anugrah Ramadhan</span>
        </div>
      </div>
    </main>
  );
}
