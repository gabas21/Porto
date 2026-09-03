"use client";

import { useEffect, useRef, useState } from "react";

interface CloudVideoBackgroundProps {
  className?: string;
  src?: string;
  poster?: string;
  /** Playback speed multiplier (default 1.0 for native 60 FPS smooth cloud drift) */
  playbackRate?: number;
  /** Opacity in light mode (default 0.95) */
  lightOpacity?: number;
  /** Opacity in dark mode (default 0.75) */
  darkOpacity?: number;
}

export default function CloudVideoBackground({
  className = "",
  src = "/clouds.mp4",
  poster = "/clouds-poster.webp",
  playbackRate = 1.0,
  lightOpacity = 0.95,
  darkOpacity = 0.75,
}: CloudVideoBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    let isDestroyed = false;

    // Strict DOM attribute reinforcement for restrictive browser policies (iOS, Low Power, Chrome)
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = true;
    video.playbackRate = playbackRate;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.setAttribute("autoplay", "");
    video.setAttribute("loop", "");

    const attemptPlay = () => {
      if (isDestroyed || !video) return;
      if (!video.paused) {
        setIsLoaded(true);
        return;
      }

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            if (!isDestroyed) setIsLoaded(true);
          })
          .catch(() => {
            // Unprompted autoplay blocked by browser policy:
            // Unlock on the very first user interaction (mouse move, touch, click, scroll)
            const unlockAutoplay = () => {
              if (video && !isDestroyed) {
                video.muted = true;
                video.play()
                  .then(() => {
                    if (!isDestroyed) setIsLoaded(true);
                  })
                  .catch(() => {});
              }
              window.removeEventListener("pointerdown", unlockAutoplay);
              window.removeEventListener("pointermove", unlockAutoplay);
              window.removeEventListener("touchstart", unlockAutoplay);
              window.removeEventListener("scroll", unlockAutoplay);
              window.removeEventListener("keydown", unlockAutoplay);
            };

            window.addEventListener("pointerdown", unlockAutoplay, { passive: true, once: true });
            window.addEventListener("pointermove", unlockAutoplay, { passive: true, once: true });
            window.addEventListener("touchstart", unlockAutoplay, { passive: true, once: true });
            window.addEventListener("scroll", unlockAutoplay, { passive: true, once: true });
            window.addEventListener("keydown", unlockAutoplay, { passive: true, once: true });
          });
      }
    };

    // Auto-pause ONLY when user has scrolled completely past Hero to save GPU
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (isDestroyed || !video) return;
        if (entry.isIntersecting) {
          attemptPlay();
        } else if (entry.boundingClientRect.bottom < 0) {
          video.pause();
        }
      },
      { threshold: 0 }
    );

    observer.observe(container);

    // Initial play trigger
    attemptPlay();

    const handleCanPlay = () => {
      video.playbackRate = playbackRate;
      attemptPlay();
    };
    const handleLoadedData = () => {
      if (!isDestroyed) setIsLoaded(true);
      video.playbackRate = playbackRate;
      attemptPlay();
    };

    const handleRate = () => {
      if (video && video.playbackRate !== playbackRate) {
        video.playbackRate = playbackRate;
      }
    };

    // Auto-resume if tab loses and regains focus or visibility
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        video.playbackRate = playbackRate;
        attemptPlay();
      }
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("playing", handleLoadedData);
    video.addEventListener("play", handleRate);
    video.addEventListener("seeked", handleRate);
    video.addEventListener("ratechange", handleRate);
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("focus", attemptPlay);

    // If video hasn't started loading buffer yet, trigger explicit load
    if (video.readyState === 0) {
      video.load();
      attemptPlay();
    }

    return () => {
      isDestroyed = true;
      observer.disconnect();
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("playing", handleLoadedData);
      video.removeEventListener("play", handleRate);
      video.removeEventListener("seeked", handleRate);
      video.removeEventListener("ratechange", handleRate);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("focus", attemptPlay);
    };
  }, [playbackRate]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden pointer-events-none select-none ${className}`}
    >
      {/* Video Element (WebM prioritized for 60% bandwidth savings + MP4 fallback) */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={poster}
        className={`w-full h-full object-cover transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-85"
        } contrast-[1.06] saturate-[1.04] dark:brightness-[0.72] dark:contrast-[1.2] dark:saturate-[0.85]`}
        style={{
          transform: "translate3d(0, 0, 0)", // triggers GPU compositing layer
        }}
      >
        <source src="/clouds.webm?v=v2" type="video/webm" />
        <source src={src} type="video/mp4" />
      </video>

      {/* Dark Mode Atmospheric Tint (Transforms bright clouds into luminous silver night clouds) */}
      <div className="absolute inset-0 bg-[#050811]/25 dark:bg-[#070b18]/45 mix-blend-multiply opacity-0 dark:opacity-100 transition-opacity duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-main)] via-transparent to-[var(--bg-main)]/35 opacity-0 dark:opacity-75 transition-opacity duration-700" />
    </div>
  );
}
