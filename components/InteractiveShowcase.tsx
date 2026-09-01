"use client";

import { useState } from "react";
import {
  QrCode,
  Robot,
  DeviceMobile,
  Play,
  CheckCircle,
  PaperPlaneTilt,
  Lightning,
  ArrowsClockwise,
} from "@phosphor-icons/react";
import FadeBlurIn from "./reactbits/FadeBlurIn";
import ClickSpark from "./reactbits/ClickSpark";
import { soundFx } from "@/lib/audio-fx";

export default function InteractiveShowcase() {
  const [activeTab, setActiveTab] = useState<"qr" | "ai" | "responsive">("qr");

  // State for QR Simulator
  const [scanning, setScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState<{
    id: string;
    item: string;
    holder: string;
    time: string;
    status: string;
  } | null>(null);

  // State for AI Streaming Simulator
  const [promptInput, setPromptInput] = useState(
    "Ringkas status dokumen perencanaan Musrenbang 2024 dan kirim ke Telegram."
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [streamedText, setStreamedText] = useState("");
  const [webhookStatus, setWebhookStatus] = useState<"idle" | "sending" | "sent">("idle");

  // State for Responsive Inspector
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");

  const handleSimulateScan = () => {
    soundFx.playClick();
    setScanning(true);
    setScannedResult(null);

    setTimeout(() => {
      soundFx.playSuccess();
      setScanning(false);
      setScannedResult({
        id: "QR-MHU-2024-8842",
        item: "Dokumen Perencanaan Bapelitbangda",
        holder: "Admin Bapelitbangda Mahulu",
        time: new Date().toLocaleTimeString("id-ID"),
        status: "Tervalidasi & Sinkron",
      });
    }, 1200);
  };

  const handleSimulateAI = () => {
    if (!promptInput.trim() || isGenerating) return;

    soundFx.playClick();
    setIsGenerating(true);
    setStreamedText("");
    setWebhookStatus("idle");

    const fullResponse =
      "Status Terverifikasi (AI Agent):\n\n1. Dokumen Musrenbang Kabupaten Mahakam Ulu telah diterima di server Bapelitbangda.\n2. Total 142 usulan sub-kegiatan telah dipetakan ke RKPD 2024.\n3. Integrasi bot Telegram berhasil dikirim ke kanal Pengawas Internal.";

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullResponse.length) {
        setStreamedText(fullResponse.slice(0, currentIndex));
        currentIndex += 3;
      } else {
        clearInterval(interval);
        soundFx.playSuccess();
        setIsGenerating(false);
        setWebhookStatus("sent");
      }
    }, 25);
  };

  return (
    <section id="showcase" className="py-36 md:py-48 px-6 border-t border-[var(--border-subtle)] relative">
      <div className="max-w-[1240px] mx-auto space-y-12">
        {/* Header */}
        <FadeBlurIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface-card)] border border-[var(--border-subtle)] text-[var(--accent)] text-xs font-mono shadow-sm">
                <Lightning size={14} weight="bold" />
                <span>Interactive Feature Lab</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
                Eksplorasi Fitur Langsung
              </h2>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl leading-relaxed font-mono">
                Uji langsung kapabilitas interaktif in-browser: pemindai QR hardware, streaming token AI response, dan inspeksi performa Core Web Vitals.
              </p>
            </div>

            {/* Tab Switcher */}
            <div className="flex gap-1.5 bg-[var(--surface-card)] p-1.5 rounded-xl border border-[var(--border-subtle)] shadow-sm">
              <ClickSpark sparkColor="var(--accent)" sparkCount={5}>
                <button
                  onClick={() => setActiveTab("qr")}
                  className={`flex items-center gap-2 text-xs px-3.5 py-2 rounded-lg font-medium transition-all cursor-pointer font-mono ${
                    activeTab === "qr"
                      ? "bg-[var(--accent)] text-[var(--bg-main)] font-semibold shadow-sm"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <QrCode size={16} weight="bold" />
                  <span>QR Scanner Demo</span>
                </button>
              </ClickSpark>

              <ClickSpark sparkColor="var(--accent)" sparkCount={5}>
                <button
                  onClick={() => setActiveTab("ai")}
                  className={`flex items-center gap-2 text-xs px-3.5 py-2 rounded-lg font-medium transition-all cursor-pointer font-mono ${
                    activeTab === "ai"
                      ? "bg-[var(--accent)] text-[var(--bg-main)] font-semibold shadow-sm"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <Robot size={16} weight="bold" />
                  <span>AI Prompt Streaming</span>
                </button>
              </ClickSpark>

              <ClickSpark sparkColor="var(--accent)" sparkCount={5}>
                <button
                  onClick={() => setActiveTab("responsive")}
                  className={`flex items-center gap-2 text-xs px-3.5 py-2 rounded-lg font-medium transition-all cursor-pointer font-mono ${
                    activeTab === "responsive"
                      ? "bg-[var(--accent)] text-[var(--bg-main)] font-semibold shadow-sm"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <DeviceMobile size={16} weight="bold" />
                  <span>Mobile Audit</span>
                </button>
              </ClickSpark>
            </div>
          </div>
        </FadeBlurIn>

        {/* Interactive Sandbox Container */}
        <div className="double-bezel">
          <div className="double-bezel-inner p-6 sm:p-10 min-h-[400px]">
            {/* 1. QR Scanner Demo Tab */}
            {activeTab === "qr" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 space-y-4">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[var(--accent-subtle)] text-[var(--accent)] text-xs font-mono">
                    <span>WebRTC &amp; Canvas Decoder API</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--text-primary)]">
                    In-Browser Hardware QR Scanner
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-mono">
                    Simulasi deteksi kode QR langsung di browser dengan latensi di bawah 0.4 detik tanpa perlu download aplikasi native.
                  </p>

                  <div className="pt-2">
                    <button
                      onClick={handleSimulateScan}
                      disabled={scanning}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--accent)] text-[var(--bg-main)] font-semibold text-xs transition-all active:scale-[0.98] disabled:opacity-50 shadow-sm hover:shadow-[0_0_20px_var(--accent-subtle)] cursor-pointer"
                    >
                      {scanning ? (
                        <>
                          <ArrowsClockwise className="animate-spin w-4 h-4" />
                          <span>Memindai Frame Kamera...</span>
                        </>
                      ) : (
                        <>
                          <Play weight="fill" className="w-3.5 h-3.5" />
                          <span>Uji Pemindaian QR Sekarang</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <div className="relative rounded-2xl bg-[var(--bg-main)] border border-[var(--border-subtle)] p-6 flex flex-col items-center justify-center min-h-[280px] overflow-hidden shadow-inner">
                    {/* Viewfinder UI */}
                    <div className="relative w-44 h-44 rounded-xl border-2 border-dashed border-[var(--accent)]/40 flex items-center justify-center p-2">
                      <QrCode size={110} weight="thin" className="text-[var(--accent)]/70" />

                      {scanning && (
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent animate-pulse" />
                      )}
                    </div>

                    {/* Result Pill */}
                    {scannedResult && (
                      <div className="mt-4 p-4 rounded-xl bg-[var(--surface-card)] border border-emerald-500/30 text-left w-full space-y-1.5 animate-fadeIn shadow-sm">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="font-semibold text-emerald-500 flex items-center gap-1.5">
                            <CheckCircle size={15} weight="fill" />
                            {scannedResult.status}
                          </span>
                          <span className="text-[10px] text-[var(--text-secondary)]">
                            {scannedResult.time}
                          </span>
                        </div>
                        <div className="text-xs text-[var(--text-primary)] font-mono">
                          ID: {scannedResult.id}
                        </div>
                        <div className="text-[11px] text-[var(--text-secondary)] font-mono">
                          Item: {scannedResult.item} ({scannedResult.holder})
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 2. AI Prompt Streaming Tab */}
            {activeTab === "ai" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-[var(--text-primary)]">
                    Motion AI — Server-Sent Events Streaming &amp; Webhook Bot
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-mono">
                    Ketik instruksi prompt atau gunakan contoh di bawah untuk melihat token streaming feedback secara real-time.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={promptInput}
                    onChange={(e) => setPromptInput(e.target.value)}
                    placeholder="Tulis instruksi otomasi..."
                    className="flex-1 px-4 py-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border-subtle)] text-xs sm:text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] font-mono"
                  />
                  <button
                    onClick={handleSimulateAI}
                    disabled={isGenerating}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[var(--accent)] text-[var(--bg-main)] font-semibold text-xs hover:opacity-90 transition-all disabled:opacity-50 cursor-pointer shadow-sm"
                  >
                    <PaperPlaneTilt size={16} weight="fill" />
                    <span>Kirim Prompt</span>
                  </button>
                </div>

                {/* Output Terminal */}
                <div className="p-6 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-subtle)] font-mono text-xs space-y-3 min-h-[170px] shadow-inner">
                  <div className="flex items-center justify-between text-[var(--text-secondary)] border-b border-[var(--border-subtle)] pb-2 text-[11px]">
                    <span>STATUS: {isGenerating ? "STREAMING TOKENS..." : "IDLE"}</span>
                    <span>TTFB: &lt; 180ms</span>
                  </div>

                  <div className="whitespace-pre-line text-[var(--text-primary)] leading-relaxed">
                    {streamedText || "Menunggu prompt dieksekusi..."}
                    {isGenerating && (
                      <span className="inline-block w-2 h-4 bg-[var(--accent)] ml-1 animate-pulse" />
                    )}
                  </div>

                  {webhookStatus === "sent" && (
                    <div className="pt-2 border-t border-[var(--border-subtle)] text-emerald-500 flex items-center gap-2 text-[11px]">
                      <CheckCircle size={15} weight="fill" />
                      <span>Webhook Telegram Bot Terkirim Sukses (HTTP 200 OK)</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 3. Mobile vs Desktop Tab */}
            {activeTab === "responsive" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-[var(--text-primary)]">
                      PT Mahakam Gerbang Raja Migas — Mobile-First Score
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-mono">
                      Optimasi viewport responsif dengan skor Core Web Vitals tertinggi di industri energi daerah.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 bg-[var(--bg-main)] p-1 rounded-xl border border-[var(--border-subtle)]">
                    <button
                      onClick={() => setViewMode("desktop")}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                        viewMode === "desktop"
                          ? "bg-[var(--accent)] text-[var(--bg-main)] font-semibold shadow-sm"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      Desktop (1440px)
                    </button>
                    <button
                      onClick={() => setViewMode("mobile")}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                        viewMode === "mobile"
                          ? "bg-[var(--accent)] text-[var(--bg-main)] font-semibold shadow-sm"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      Mobile (375px)
                    </button>
                  </div>
                </div>

                {/* Performance Metrics Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-[var(--bg-main)] border border-[var(--border-subtle)] text-center font-mono">
                    <div className="text-2xl font-bold text-emerald-500">98/100</div>
                    <div className="text-[10px] text-[var(--text-secondary)] mt-1 uppercase tracking-wider">Performance Score</div>
                  </div>
                  <div className="p-4 rounded-xl bg-[var(--bg-main)] border border-[var(--border-subtle)] text-center font-mono">
                    <div className="text-2xl font-bold text-[var(--accent)]">0.9s</div>
                    <div className="text-[10px] text-[var(--text-secondary)] mt-1 uppercase tracking-wider">LCP (Fast Paint)</div>
                  </div>
                  <div className="p-4 rounded-xl bg-[var(--bg-main)] border border-[var(--border-subtle)] text-center font-mono">
                    <div className="text-2xl font-bold text-[var(--accent)]">0.000</div>
                    <div className="text-[10px] text-[var(--text-secondary)] mt-1 uppercase tracking-wider">CLS (Zero Shift)</div>
                  </div>
                  <div className="p-4 rounded-xl bg-[var(--bg-main)] border border-[var(--border-subtle)] text-center font-mono">
                    <div className="text-2xl font-bold text-emerald-500">100%</div>
                    <div className="text-[10px] text-[var(--text-secondary)] mt-1 uppercase tracking-wider">Best Practices</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
