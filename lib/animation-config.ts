import gsap from "gsap";

/**
 * Global GSAP & WebGL Animation Performance Configuration
 * - lagSmoothing(500, 33): Prevents animation stutter / teleporting during CPU spikes
 * - autoSleep(60): Conserves mobile battery and reduces CPU heat when inactive
 * - force3D: "auto": Ensures GPU hardware acceleration is leveraged
 */
if (typeof window !== "undefined") {
  gsap.ticker.lagSmoothing(500, 33);

  gsap.config({
    autoSleep: 60,
    force3D: "auto",
  });
}

export const enableGPUAcceleration = (element: HTMLElement) => {
  gsap.set(element, {
    force3D: true,
    backfaceVisibility: "hidden",
    perspective: 1000,
    willChange: "transform",
  });
};

export default gsap;
