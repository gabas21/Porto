---
type: skill
category: micro-interactions
technology: GSAP, Canvas/DOM Pixel Grid, ReactBits
date_created: 2026-08-28
status: active
---

# ⚡ PixelTransition Interactive Reveal Component

## Overview
`<PixelTransition />` transforms elements between two states (`firstContent` and `secondContent`) through a randomized pixel grid dissolution animation powered by GSAP.

## Component Location
`components/reactbits/PixelTransition.tsx`

## Integrated Section in Porto
- **Mobile Avatar Frame (`components/Hero.tsx`):**
  - Displays formal avatar by default.
  - On **click/tap**, dissolves into creative developer badge card (`Frontend Dev • Samarinda, ID`).
  - Trigger: `trigger="click"`, `gridSize={9}`, `animationStepDuration={0.35}`.

## Props Signature
```tsx
import PixelTransition from '@/components/reactbits/PixelTransition';

<PixelTransition
  firstContent={<img src="/avatar.jpg" alt="Avatar" />}
  secondContent={<div>Alternate Card</div>}
  gridSize={9}
  pixelColor="#FACC15"
  animationStepDuration={0.35}
  trigger="click"
  aspectRatio="100%"
  className="w-[116px] h-[116px] rounded-full overflow-hidden"
/>
```
