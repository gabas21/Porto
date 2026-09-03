"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "motion/react";
import {
  Sparkle,
  MapPin,
  Compass,
  Code,
  Terminal,
  GraduationCap,
  Buildings,
  CheckCircle,
  Cpu,
  ArrowUpRight,
} from "@phosphor-icons/react";
import FadeBlurIn from "@/components/reactbits/FadeBlurIn";
import { Meteors } from "@/components/ui/meteors";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { soundFx } from "@/lib/audio-fx";
import { useLanguage } from "@/context/LanguageContext";

export default function BioIntroSection() {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const bouncyContainerRef = useRef<HTMLDivElement>(null);
  const bouncyPathRef = useRef<SVGPathElement>(null);
  const reduceMotion = useReducedMotion();

  // Dynamic Scroll Progress: Convex top dome arches dynamically after scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "start 25%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 26,
    mass: 0.2,
    restDelta: 0.001,
  });

  const curveHeight = useTransform(smoothProgress, [0, 1], [0, 160]);
  const contentY = useTransform(smoothProgress, [0, 1], [30, 0]);

  // ── GSAP ScrollTrigger Elastic Jelly Bounce Transition (Bottom Boundary) ────
  useEffect(() => {
    if (typeof window === "undefined" || !bouncyContainerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const START_Y = 160;
    const curveObj = { y: START_Y };

    const updatePath = () => {
      const pathString = `M 0 -0.3 C 0 -0.3, 464 ${curveObj.y}, 1139 ${curveObj.y} S 2278 -0.3, 2278 -0.3 V 400 H 0 V -0.3 Z`;
      if (bouncyPathRef.current) {
        bouncyPathRef.current.setAttribute("d", pathString);
      }
    };

    updatePath();

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: bouncyContainerRef.current,
        start: "top 88%",
        onEnter: () => {
          soundFx.playJellyBounce();
          if (reduceMotion) {
            gsap.to(curveObj, { y: 0, duration: 0.6, ease: "power2.out", onUpdate: updatePath });
            return;
          }
          gsap.killTweensOf(curveObj);
          gsap.fromTo(
            curveObj,
            { y: START_Y },
            {
              y: 0,
              duration: 2.8,
              ease: "elastic.out(1.45, 0.18)",
              onUpdate: updatePath,
              overwrite: "auto",
            }
          );
        },
        onLeaveBack: () => {
          gsap.killTweensOf(curveObj);
          gsap.to(curveObj, {
            y: START_Y,
            duration: 0.5,
            ease: "power2.out",
            onUpdate: updatePath,
            overwrite: "auto",
          });
        },
      });
    }, bouncyContainerRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full bg-[#0E0F12] text-white pt-16 sm:pt-24 pb-0 z-20"
    >
      <Meteors number={16} />

      {/* Subtle calibrated ambient lighting flares */}
      <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-[#FACC15]/[0.025] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-24 right-10 w-[500px] h-[500px] bg-[#38BDF8]/[0.025] rounded-full blur-3xl pointer-events-none" />

      {/* ── 1. Dynamic Scroll-Triggered Convex Dome Curve Transition (Top) ── */}
      <motion.div
        style={{ height: curveHeight }}
        className="absolute top-0 left-0 right-0 -translate-y-[99%] w-full pointer-events-none overflow-hidden leading-none z-20"
      >
        <svg
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          className="w-full h-full text-[#0E0F12] fill-current block"
          aria-hidden
        >
          <path d="M 0 200 C 340 0, 1100 0, 1440 200 L 1440 200 L 0 200 Z" />
        </svg>
      </motion.div>

      {/* ── 2. Content Container ── */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 max-w-6xl 3xl:max-w-[1600px] 4xl:max-w-[1920px] mx-auto px-6 md:px-12 3xl:px-20 space-y-12 3xl:space-y-16 pb-6 sm:pb-8"
      >
        {/* Editorial Heading Block */}
        <FadeBlurIn>
          <div className="space-y-4 max-w-4xl 3xl:max-w-5xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono uppercase tracking-widest text-[#FACC15] backdrop-blur-md shadow-sm">
              <Sparkle size={14} weight="fill" />
              <span>{language === "id" ? "Tentang Saya • Profil & Filosofi" : "About Me • Profile Story"}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 3xl:text-7xl font-bold leading-[1.15] tracking-tight text-white font-display">
              {language === "id" ? "Saya Bagas — Frontend & Web Developer" : "I'm Bagas — a Frontend Developer"}
            </h2>

            <p className="text-xl sm:text-2xl md:text-3xl 3xl:text-4xl font-normal text-zinc-400 leading-relaxed max-w-3xl 3xl:max-w-4xl font-sans">
              {language === "id" ? (
                <>
                  berdomisili di Samarinda, berdedikasi mentransformasikan konsep digital menjadi kenyataan yang tangguh dan <span className="font-display font-bold text-[#FACC15]">presisi piksel</span>.
                </>
              ) : (
                <>
                  based in Samarinda, dedicated to turning digital concepts into tangible, <span className="font-display font-bold text-[#FACC15]">pixel-perfect</span> reality.
                </>
              )}
            </p>
          </div>
        </FadeBlurIn>

        {/* Narrative & Visual Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 3xl:gap-16 items-stretch">
          {/* LEFT: Profile Photo Card (Luxury Obsidian Bezel + Liquid Glass HUD) */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <FadeBlurIn delay={0.15} className="w-full h-full flex justify-center items-center">
              <div className="relative w-full max-w-[320px] sm:max-w-[350px] 3xl:max-w-[420px] group">
                
                {/* ── Ambient Backlight Glow (Subtle Dual-Tone Halo) ── */}
                <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-tr from-[#FACC15]/20 via-[#38BDF8]/15 to-transparent blur-xl opacity-60 group-hover:opacity-90 transition-opacity duration-700 pointer-events-none" />

                {/* ── Outer Precision Bezel Container ── */}
                <div className="relative w-full aspect-[4/5] sm:h-[450px] 3xl:h-[520px] rounded-[1.75rem] p-1.5 bg-gradient-to-b from-white/[0.14] via-white/[0.04] to-white/[0.08] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.95)] transition-transform duration-500 ease-out group-hover:-translate-y-1">
                  
                  {/* Inner Photo Display Container */}
                  <div className="relative w-full h-full rounded-[1.35rem] overflow-hidden bg-[#0A0C10]">
                    
                    {/* Portrait Photo */}
                    <Image
                      src="/bagas.jpg"
                      alt="Bagas Aditya Anugrah Ramadhan"
                      fill
                      sizes="(max-width: 640px) 320px, 350px"
                      className="object-cover object-top scale-[1.02] group-hover:scale-105 transition-transform duration-700 ease-out"
                      priority
                    />

                    {/* Calibrated Obsidian Gradient Overlay for Depth & Contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E0F12] via-[#0E0F12]/25 to-transparent opacity-95 pointer-events-none" />

                    {/* Diagonal Light Sheen (Sweeps on Hover) */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.08] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                    {/* Precision Corner Reticles / Swiss Ticks */}
                    <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-[#FACC15]/70 pointer-events-none" />
                    <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-[#38BDF8]/70 pointer-events-none" />
                    <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-[#38BDF8]/70 pointer-events-none" />
                    <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-[#FACC15]/70 pointer-events-none" />

                    {/* Top HUD: Status Beacon + Identity Metadata */}
                    <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between pointer-events-none">
                      <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 shadow-sm">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                        <span className="text-xs font-mono text-zinc-200 font-semibold tracking-wider">VERIFIED // ID</span>
                      </div>

                      <div className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono text-zinc-400">
                        <span>WITA // SAMARINDA</span>
                      </div>
                    </div>

                    {/* Left Micro Telemetry Ruler */}
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 opacity-40 pointer-events-none">
                      <div className="w-2 h-px bg-white" />
                      <div className="w-1 h-px bg-white/60" />
                      <div className="w-1 h-px bg-white/60" />
                      <div className="w-2 h-px bg-[#FACC15]" />
                      <div className="w-1 h-px bg-white/60" />
                      <div className="w-1 h-px bg-white/60" />
                      <div className="w-2 h-px bg-white" />
                    </div>

                    {/* Bottom Floating Luxury Glass Capsule */}
                    <div className="absolute bottom-3.5 inset-x-3.5 bg-[#0E1016]/85 backdrop-blur-2xl border border-white/15 rounded-2xl p-3.5 shadow-2xl transition-all duration-300 group-hover:border-white/25 group-hover:bg-[#12141D]/90">
                      <div className="flex items-center justify-between gap-3">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FACC15]">
                              DEV ACCESS PASS
                            </span>
                            <span className="text-zinc-600 text-xs">•</span>
                            <span className="text-xs font-mono text-zinc-400">2026</span>
                          </div>
                          <p className="text-sm sm:text-base font-bold text-white tracking-tight leading-tight font-display">
                            Bagas Aditya
                          </p>
                          <p className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                            <Compass size={11} className="text-[#38BDF8] shrink-0" />
                            <span>Samarinda, Kalimantan Timur</span>
                          </p>
                        </div>

                        <div className="shrink-0 p-2.5 rounded-xl bg-white/[0.06] border border-white/10 group-hover:border-[#FACC15]/40 group-hover:bg-[#FACC15]/10 transition-colors">
                          <MapPin size={18} className="text-[#FACC15]" weight="fill" />
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </FadeBlurIn>
          </div>

          {/* RIGHT: Bento 2.0 Engineering & Production Cards */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-5 text-left">
            {/* ── CARD 1: Academic & Engineering Foundation ── */}
            <FadeBlurIn delay={0.25}>
              <div className="group relative rounded-2xl border border-white/[0.08] bg-[#12141A]/80 p-6 sm:p-7 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-[#161822] active:scale-[0.995]">
                {/* Header Row with Telemetry Badge */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#FACC15] font-mono tracking-wider">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#FACC15]/20 bg-[#FACC15]/10 text-[#FACC15]">
                      <GraduationCap size={16} weight="bold" />
                    </div>
                    <span>ACADEMIC &amp; FOUNDATION</span>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-zinc-400 font-medium">
                    2022 &mdash; Present
                  </span>
                </div>

                {/* Primary Entity Highlight */}
                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg 3xl:text-xl font-bold text-white tracking-tight flex items-center gap-2 font-display">
                    <span>STMIK Widya Cipta Dharma</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-[#FACC15]/10 text-[#FACC15] font-mono font-normal border border-[#FACC15]/20">
                      {t.about.degree}
                    </span>
                  </h3>

                  <p className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed max-w-[65ch]">
                    {t.about.degreeDesc}
                  </p>
                </div>

                {/* Key Competency Micro-Pills */}
                <div className="mt-4 pt-4 border-t border-white/[0.06] flex flex-wrap items-center gap-2">
                  {t.about.pills.map((pill) => (
                    <span
                      key={pill}
                      className="px-3 py-1 rounded-md bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-zinc-300 group-hover:border-white/10 transition-colors"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            </FadeBlurIn>

            {/* ── CARD 2: Production Impact & Government Platforms ── */}
            <FadeBlurIn delay={0.35}>
              <div className="group relative rounded-2xl border border-white/[0.08] bg-[#12141A]/80 p-6 sm:p-7 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-[#161822] active:scale-[0.995]">
                {/* Header Row with Verified Badge */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#38BDF8] font-mono tracking-wider">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#38BDF8]/20 bg-[#38BDF8]/10 text-[#38BDF8]">
                      <Buildings size={16} weight="bold" />
                    </div>
                    <span>{t.about.deliverablesTitle}</span>
                  </div>

                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs font-mono text-emerald-400 font-semibold">
                    <CheckCircle size={11} weight="fill" />
                    <span>{t.about.govVerifiedBadge}</span>
                  </span>
                </div>

                {/* Structured Impact Platforms Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-[#38BDF8]/30 transition-colors">
                    <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
                      <span>{t.about.bappelitbangdaTitle}</span>
                      <span className="text-xs font-mono text-[#FACC15]">{t.about.bappelitbangdaRegion}</span>
                    </div>
                    <p className="text-xs font-mono text-zinc-400 leading-snug">
                      {t.about.bappelitbangdaDesc}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-[#38BDF8]/30 transition-colors">
                    <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
                      <span>{t.about.inspektoratTitle}</span>
                      <span className="text-xs font-mono text-[#38BDF8]">{t.about.inspektoratRegion}</span>
                    </div>
                    <p className="text-xs font-mono text-zinc-400 leading-snug">
                      {t.about.inspektoratDesc}
                    </p>
                  </div>
                </div>

                {/* Tech Stack Strip */}
                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                    {t.about.coreArsenalLabel}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {["Tailwind CSS", "Next.js", "Laravel Blade", "TypeScript"].map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300 font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeBlurIn>
          </div>
        </div>
      </motion.div>

      {/* ── 3. Seamless Bouncy Elastic Jelly Morph Transition (Bottom to Experience Timeline) ── */}
      <div
        ref={bouncyContainerRef}
        className="relative w-full overflow-hidden leading-none select-none pointer-events-none -mb-1 block"
      >
        <svg
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2278 400"
          className="w-full h-14 sm:h-18 md:h-24 lg:h-28 block text-[var(--bg-main)] fill-current overflow-visible"
          aria-hidden
        >
          <path
            ref={bouncyPathRef}
            d="M 0 -0.3 C 0 -0.3, 464 160, 1139 160 S 2278 -0.3, 2278 -0.3 V 400 H 0 V -0.3 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
}
