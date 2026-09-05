/**
 * Web Vitals Performance Tracking Helper
 * Captures Core Web Vitals (FCP, LCP, CLS, FID/INP, TTFB)
 * and logs/transmits analytics in production environments.
 */

export interface WebVitalsMetric {
  name: string;
  value: number;
  rating?: "good" | "needs-improvement" | "poor";
  delta?: number;
  id?: string;
}

export function reportWebVitals(metric: WebVitalsMetric) {
  if (process.env.NODE_ENV !== "production") {
    // In dev mode, log vitals to console if debugging
    if (typeof window !== "undefined" && (window as unknown as { __DEBUG_PERF__?: boolean }).__DEBUG_PERF__) {
      console.log(`[Web Vitals] ${metric.name}:`, Math.round(metric.value * 100) / 100);
    }
    return;
  }

  // Google Analytics / Vercel Analytics integration
  if (typeof window !== "undefined") {
    const win = window as unknown as { gtag?: (...args: unknown[]) => void };
    if (typeof win.gtag === "function") {
      win.gtag("event", metric.name, {
        value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
        event_category: "Web Vitals",
        event_label: metric.id,
        non_interaction: true,
      });
    }
  }
}
