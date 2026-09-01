"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Robot,
  PaperPlaneRight,
  Microphone,
  MicrophoneSlash,
  X,
  Sparkle,
  Terminal,
  SpeakerHigh,
  SpeakerSimpleSlash,
  ArrowSquareOut,
  FileText,
  WhatsappLogo,
  ArrowRight,
  Trash,
} from "@phosphor-icons/react";
import { queryBagasAI, AIAction, SUGGESTED_CHIPS } from "@/lib/ai-knowledge-engine";
import { soundFx } from "@/lib/audio-fx";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  actions?: AIAction[];
  timestamp: string;
}

interface AITwinTerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AITwinTerminalModal({ isOpen, onClose }: AITwinTerminalModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      sender: "ai",
      text: "Halo! Saya Bagas AI Twin 🤖 — kloning digital mandiri Bagas Aditya. Saya bisa menjawab detail tentang kecepatan slicing Figma, rate freelance, proyek instansi Mahulu, atau alasan transisi ke Next.js. Apa yang ingin kamu ketahui?",
      actions: [
        { label: "⚡ Slicing Figma 2 Jam?", type: "suggest_prompt", payload: "Bisa slicing Figma ke Tailwind dalam 2 jam?" },
        { label: "💰 Rate Freelance", type: "suggest_prompt", payload: "Berapa rate fee freelance lo?" },
        { label: "📄 Buka Preview CV", type: "open_cv" },
      ],
      timestamp: "Just now",
    },
  ]);

  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const recognitionRef = useRef<any>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, messages, typingText]);

  // Setup Web Speech API for voice queries
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        setSpeechSupported(true);
        const recog = new SpeechRecognition();
        recog.continuous = false;
        recog.interimResults = false;
        recog.lang = "id-ID";

        recog.onresult = (e: any) => {
          const transcript = e.results[0][0].transcript;
          if (transcript) {
            setInputVal(transcript);
            handleSendMessage(transcript);
          }
          setIsListening(false);
        };

        recog.onerror = () => {
          setIsListening(false);
        };

        recog.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recog;
      }
    }
  }, []);

  const toggleVoice = () => {
    if (!speechSupported || !recognitionRef.current) return;
    soundFx.playClick();
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch {
        setIsListening(false);
      }
    }
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text || isTyping) return;

    soundFx.playMessageSent();

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);
    setTypingText("");

    // Simulate AI thinking and streaming mechanical typewriter effect
    setTimeout(() => {
      const result = queryBagasAI(text);
      let charIdx = 0;
      const fullText = result.answer;

      const typeInterval = setInterval(() => {
        if (charIdx < fullText.length) {
          const nextChars = fullText.slice(0, charIdx + 1);
          setTypingText(nextChars);
          soundFx.playKeyClick();
          charIdx++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
          setTypingText("");

          const aiMsg: ChatMessage = {
            id: `ai-${Date.now()}`,
            sender: "ai",
            text: fullText,
            actions: result.actions,
            timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
          };
          setMessages((prev) => [...prev, aiMsg]);
        }
      }, 16);
    }, 400);
  };

  const handleActionClick = (action: AIAction) => {
    soundFx.playClick();
    if (action.type === "suggest_prompt" && action.payload) {
      handleSendMessage(action.payload);
    } else if (action.type === "open_cv") {
      window.dispatchEvent(new CustomEvent("open-cv-modal"));
    } else if (action.type === "open_whatsapp") {
      window.open("https://wa.me/6282159888947", "_blank");
    } else if (action.type === "open_email") {
      window.location.href = "mailto:bagasa020@gmail.com";
    } else if (action.type === "scroll_section" && action.payload) {
      onClose();
      const el = document.getElementById(action.payload);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleClearHistory = () => {
    soundFx.playClick();
    setMessages([
      {
        id: "welcome-reset",
        sender: "ai",
        text: "Terminal log di-reset. Apa pertanyaan selanjutnya seputar portofolio Bagas?",
        timestamp: "Just now",
      },
    ]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9990] flex items-end sm:items-center justify-end p-0 sm:p-6 md:p-8 pointer-events-none">
          {/* Backdrop for mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 sm:bg-transparent backdrop-blur-xs pointer-events-auto sm:pointer-events-none"
          />

          {/* Terminal Window Card */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.94 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="relative pointer-events-auto w-full sm:w-[420px] md:w-[460px] max-h-[85vh] h-[640px] rounded-t-3xl sm:rounded-3xl bg-[#0C0F17]/95 border border-[var(--border-subtle)] sm:border-emerald-500/20 shadow-2xl shadow-black/80 flex flex-col overflow-hidden backdrop-blur-2xl text-left"
          >
            {/* ── Top Header with Hologram Avatar & Live Beacon ── */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 border-b border-zinc-800/80 bg-zinc-950/60 select-none">
              <div className="flex items-center gap-3">
                {/* Minimalist Luxury AI Neural Node SVG Emblem */}
                <div className="relative w-9 h-9 rounded-full flex items-center justify-center bg-gradient-to-br from-zinc-900 via-[#0B0E14] to-black border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.25)]">
                  {/* Geometric Neural Sparkle Icon */}
                  <svg
                    className="w-5 h-5 text-emerald-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"
                      fill="url(#ai-modal-emerald-grad)"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinejoin="round"
                    />
                    <circle cx="12" cy="12" r="2.2" fill="#34D399" className="animate-pulse" />
                    <defs>
                      <linearGradient id="ai-modal-emerald-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#34D399" stopOpacity="0.75" />
                        <stop offset="1" stopColor="#059669" stopOpacity="0.3" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-mono font-bold text-zinc-100 tracking-wide">
                      BAGAS AI TWIN
                    </h3>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      v2.6
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Neural Clone &bull; Instant Match</span>
                  </div>
                </div>
              </div>

              {/* Window Controls */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleClearHistory}
                  title="Clear chat"
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 transition-colors cursor-pointer"
                >
                  <Trash size={15} />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                  aria-label="Close AI Terminal"
                >
                  <X size={16} weight="bold" />
                </button>
              </div>
            </div>

            {/* ── Chat Messages Scroll Stream ── */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-mono scrollbar-thin scrollbar-thumb-zinc-800">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl p-3 sm:p-3.5 leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-zinc-800/90 text-zinc-100 border border-zinc-700/50 rounded-br-xs"
                        : "bg-zinc-900/80 text-zinc-200 border border-emerald-500/20 shadow-md shadow-emerald-950/20 rounded-bl-xs"
                    }`}
                  >
                    {msg.sender === "ai" && (
                      <div className="flex items-center gap-1.5 mb-1 text-[10px] text-emerald-400/90 font-bold uppercase tracking-wider">
                        <Terminal size={12} weight="bold" />
                        <span>Bagas AI</span>
                      </div>
                    )}
                    <p className="whitespace-pre-wrap">{msg.text}</p>

                    {/* AI Action Chips */}
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="mt-3 pt-2 border-t border-zinc-800/80 flex flex-wrap gap-1.5">
                        {msg.actions.map((act, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleActionClick(act)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-800/80 hover:bg-emerald-500/20 hover:text-emerald-300 border border-zinc-700/60 hover:border-emerald-500/40 text-[10px] text-zinc-300 transition-all cursor-pointer select-none"
                          >
                            <span>{act.label}</span>
                            <ArrowRight size={10} />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <span className="text-[9px] text-zinc-500 mt-1 px-1">{msg.timestamp}</span>
                </div>
              ))}

              {/* Active Streaming Typewriter Message */}
              {isTyping && (
                <div className="flex flex-col items-start">
                  <div className="max-w-[88%] rounded-2xl p-3 sm:p-3.5 leading-relaxed bg-zinc-900/80 text-zinc-200 border border-emerald-500/30 rounded-bl-xs">
                    <div className="flex items-center gap-1.5 mb-1 text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                      <Terminal size={12} weight="bold" />
                      <span>Typing...</span>
                    </div>
                    <p className="whitespace-pre-wrap">
                      {typingText}
                      <span className="inline-block w-1.5 h-3.5 bg-emerald-400 ml-0.5 animate-pulse" />
                    </p>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ── Suggested Fast Chips ── */}
            <div className="px-3 py-2 border-t border-zinc-800/60 bg-zinc-950/40 overflow-x-auto scrollbar-none flex gap-1.5">
              {SUGGESTED_CHIPS.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    handleSendMessage(chip.replace(/^[^\w\s]+/, "").trim());
                  }}
                  className="shrink-0 px-2.5 py-1 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-[10px] font-mono text-zinc-300 hover:text-emerald-300 border border-zinc-800 hover:border-emerald-500/30 transition-all cursor-pointer select-none"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* ── Input Bar with Voice Button & Send ── */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-zinc-950 border-t border-zinc-800/80 flex items-center gap-2"
            >
              {/* Voice Input Button */}
              {speechSupported && (
                <button
                  type="button"
                  onClick={toggleVoice}
                  title={isListening ? "Stop listening" : "Ask by voice"}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                    isListening
                      ? "bg-red-500/20 text-red-400 border-red-500/50 animate-pulse"
                      : "bg-zinc-900 text-zinc-400 hover:text-zinc-200 border-zinc-800"
                  }`}
                >
                  {isListening ? <MicrophoneSlash size={16} /> : <Microphone size={16} />}
                </button>
              )}

              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={isListening ? "Listening... silakan bicara..." : "Tanya apa saja ke Bagas AI Twin..."}
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all"
              />

              <button
                type="submit"
                disabled={!inputVal.trim() || isTyping}
                className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:hover:bg-emerald-500 text-black font-bold transition-all cursor-pointer shadow-md shadow-emerald-500/20"
                aria-label="Send query to AI"
              >
                <PaperPlaneRight size={16} weight="fill" />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
