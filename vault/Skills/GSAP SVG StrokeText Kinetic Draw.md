---
type: skill
category: micro-interactions
technology: GSAP, ScrollTrigger, SVG, ReactBits
date_created: 2026-08-28
status: active
---

# ⚡ GSAP SVG StrokeText Kinetic Draw Component

## Overview
`<StrokeText />` is a high-performance SVG typography animation component powered by GSAP and ScrollTrigger. It measures font letterforms into vector glyphs, dynamically sketches the glowing character stroke outlines on entry/scroll, and smoothly wipes into solid high-contrast fill colors.

## Component Location
`components/reactbits/StrokeText.tsx`

## Integrated Sections in Porto
1. **Tech Arsenal (`components/sections/TechArsenal.tsx`):**
   - Animated wordmark: `"Technology Arsenal."`
   - Trigger: `trigger="scroll"`, `fillMode="wipe"`, `strokeColor="#FACC15"`.
2. **Featured Works (`components/sections/WorksHoverList.tsx`):**
   - Animated wordmark: `"Featured Projects."`
   - Trigger: `trigger="scroll"`, `fillMode="wipe"`, `strokeColor="#FACC15"`.
3. **Experience Timeline (`components/sections/ExperienceTimeline.tsx`):**
   - Animated wordmark: `"Explore my journey."`
   - Trigger: `trigger="scroll"`, `fillMode="wipe"`, `strokeColor="#FACC15"`.

## Props & Usage Signature
```tsx
import StrokeText from "@/components/reactbits/StrokeText";

<StrokeText
  text="Technology Arsenal."
  strokeColor="#FACC15"
  fillColor="var(--text-primary)"
  strokeWidth={1.4}
  drawDuration={1.3}
  fillDelay={0.15}
  stagger={0.035}
  ease="power2.out"
  trigger="scroll"
  fillMode="wipe"
  fontSize={48}
  fontWeight={800}
  letterSpacing={-1.5}
/>
```
