"use client";

import FadeBlurIn from "@/components/reactbits/FadeBlurIn";

const metrics = [
  {
    value: "100%",
    label: "Visual Design Fidelity",
    desc: "Pixel-perfect conversion from Figma UI/UX prototypes.",
  },
  {
    value: "5+",
    label: "Major Production Systems",
    desc: "Deployed for government, corporate portals, and AI platforms.",
  },
  {
    value: "40%+",
    label: "Workflow Efficiency",
    desc: "Automated document validation and real-time data filtering.",
  },
  {
    value: "1000+",
    label: "Users & Public Served",
    desc: "Through regional government portals and campus incident reporting.",
  },
];

export default function ImpactMetrics() {
  return (
    <section className="w-full bg-[var(--bg-main)] text-[var(--text-primary)] py-16 px-6 md:px-16 border-t border-[var(--border-subtle)]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {metrics.map((item, idx) => (
          <FadeBlurIn key={idx} delay={idx * 0.1}>
            <div className="border-l-2 border-[var(--accent)] pl-6 py-2 space-y-1 text-left">
              <h3 className="text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] font-mono">
                {item.value}
              </h3>
              <p className="text-sm font-semibold text-[var(--text-primary)]">
                {item.label}
              </p>
              <p className="text-xs text-[var(--text-secondary)] font-mono leading-relaxed">
                {item.desc}
              </p>
            </div>
          </FadeBlurIn>
        ))}
      </div>
    </section>
  );
}
