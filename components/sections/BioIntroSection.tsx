"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "motion/react";
import { Sparkle, MapPin, Compass, Code, Terminal } from "@phosphor-icons/react";
import FadeBlurIn from "@/components/reactbits/FadeBlurIn";
import { Meteors } from "@/components/ui/meteors";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function BioIntroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bouncyContainerRef = useRef<HTMLDivElement>(null);
  const bouncyPathRef = useRef<SVGPathElement>(null);
  const reduceMotion = useReducedMotion();

  // Dynamic Scroll Progress: Convex top dome arches dynamically as user scrolls from Hero
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 30%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    mass: 0.15,
    restDelta: 0.001,
  });

  const curveHeight = useTransform(smoothProgress, [0, 1], [0, 200]);
  const contentY = useTransform(smoothProgress, [0, 1], [40, 0]);

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
              ease: "elastic.out(1.45, 0.18)", // Calibrated for 4 distinct rebound cycles
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
      className="relative w-full bg-[#0E0F12] text-white pt-24 pb-0 z-20"
    >
      {/* ── Background Meteors effect across the entire section (Calm & Subtle) ── */}
      <Meteors number={16} />

      {/* Subtle ambient lighting flares */}
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
        className="relative z-10 max-w-6xl mx-auto px-6 md:px-16 space-y-16 pb-16"
      >
        {/* Intro Tagline */}
        <FadeBlurIn>
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono uppercase tracking-widest text-[#FACC15] backdrop-blur-md shadow-sm">
              <Sparkle size={14} weight="fill" />
              <span>About Me &bull; Profile Story</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] max-w-4xl tracking-tight text-white">
              I&apos;m Bagas — a Frontend Developer based in Samarinda, dedicated to turning digital concepts into tangible, pixel-perfect reality<span className="text-[#FACC15]">.</span>
            </h2>
          </div>
        </FadeBlurIn>

        {/* Narrative & Visual Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Profile Photo Container (Obsidian Bezel) */}
          <div className="lg:col-span-5 relative flex justify-center">
            <FadeBlurIn delay={0.2}>
              <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[340px] aspect-[4/5] sm:h-96 md:h-[420px] rounded-2xl overflow-hidden border border-white/15 bg-[#14161C] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] group mx-auto">
                <Image
                  src="/avatar.jpg"
                  alt="Bagas Aditya Anugrah Ramadhan"
                  fill
                  sizes="(max-width: 640px) 280px, (max-width: 1024px) 340px, 420px"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  priority
                />

                {/* Subtle Obsidian Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0F12] via-transparent to-transparent opacity-90" />

                {/* Top Corner Technical HUD */}
                <div className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono text-zinc-300 font-semibold tracking-wider">DEV // 2026</span>
                </div>

                {/* Floating Location Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#14161C]/90 backdrop-blur-xl border border-white/10 rounded-xl p-3.5 shadow-2xl flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                      <Compass size={11} className="text-[#FACC15]" />
                      <span>Base Location</span>
                    </p>
                    <p className="text-xs font-bold text-white tracking-tight">Samarinda, Kalimantan Timur</p>
                  </div>
                  <div className="p-2 rounded-lg bg-white/[0.06] border border-white/10">
                    <MapPin size={16} className="text-[#FACC15]" weight="fill" />
                  </div>
                </div>
              </div>
            </FadeBlurIn>
          </div>

          {/* Bio Description from CV (Crisp Luxury Typography) */}
          <div className="lg:col-span-7 space-y-6 text-zinc-300 font-mono text-sm sm:text-base leading-relaxed text-left">
            {/* Card 1: Academic & Engineering Foundation */}
            <FadeBlurIn delay={0.3}>
              <div className="relative w-full group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#FACC15]/20 via-amber-500/10 to-transparent rounded-2xl blur-xl transition-opacity duration-500 opacity-60 group-hover:opacity-100" />
                <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-[#12141A]/90 p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 group-hover:border-[#FACC15]/30">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#FACC15] uppercase tracking-wider mb-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#FACC15]/20 bg-[#FACC15]/10 text-[#FACC15]">
                      <Terminal size={16} weight="bold" />
                    </div>
                    <span>Academic &amp; Engineering Foundation</span>
                  </div>
                  <p className="relative z-10 text-zinc-300 leading-relaxed">
                    Currently pursuing a Bachelor&apos;s Degree in Informatics Engineering at{" "}
                    <strong className="text-white font-semibold">STMIK Widya Cipta Dharma</strong>. My core expertise lies at the intersection of aesthetic design precision, responsive architecture, and robust frontend engineering.
                  </p>
                </div>
              </div>
            </FadeBlurIn>

            {/* Card 2: Production Impact & Deliverables */}
            <FadeBlurIn delay={0.4}>
              <div className="relative w-full group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#38BDF8]/20 via-blue-500/10 to-transparent rounded-2xl blur-xl transition-opacity duration-500 opacity-60 group-hover:opacity-100" />
                <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-[#12141A]/90 p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 group-hover:border-[#38BDF8]/30">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#38BDF8] uppercase tracking-wider mb-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#38BDF8]/20 bg-[#38BDF8]/10 text-[#38BDF8]">
                      <Code size={16} weight="bold" />
                    </div>
                    <span>Production Impact &amp; Deliverables</span>
                  </div>
                  <p className="relative z-10 text-zinc-300 leading-relaxed">
                    I specialize in transforming intricate Figma designs into semantic, reusable components using{" "}
                    <strong className="text-white font-semibold">Tailwind CSS</strong>,{" "}
                    <strong className="text-white font-semibold">Next.js</strong>, and{" "}
                    <strong className="text-white font-semibold">Blade Templating</strong>. My work includes delivering mission-critical web platforms officially implemented by regional government institutions, such as{" "}
                    <em className="text-white font-medium not-italic underline decoration-white/20">Bapelitbangda Mahakam Ulu</em> and{" "}
                    <em className="text-white font-medium not-italic underline decoration-white/20">Inspektorat Kabupaten Mahakam Ulu</em>.
                  </p>
                </div>
              </div>
            </FadeBlurIn>

            <FadeBlurIn delay={0.5}>
              <div className="pt-2 flex flex-wrap gap-2.5">
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-mono text-[#FACC15] shadow-sm hover:border-[#FACC15]/40 transition-colors">
                  #GovernmentTech
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-mono text-[#38BDF8] shadow-sm hover:border-[#38BDF8]/40 transition-colors">
                  #NextJSEcosystem
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-mono text-emerald-400 shadow-sm hover:border-emerald-400/40 transition-colors">
                  #TailwindCSSMastery
                </span>
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
          className="w-full h-28 sm:h-36 md:h-48 lg:h-56 block text-[var(--bg-main)] fill-current overflow-visible"
          aria-hidden
        >
          {/* Main solid fill connecting directly into next section */}
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
