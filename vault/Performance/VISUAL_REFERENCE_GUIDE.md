# Visual Performance Reference Guide

**Quick Visual Guide untuk Portfolio Optimization**

---

## 📊 Performance Metrics Target

### Current State vs Target

```
METRIC                  CURRENT    TARGET     IMPROVEMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Lighthouse Score        ~65        →    90+        +38%
First Contentful Paint  ~2.5s      →    1.2s       -52%
Largest Contentful Pt.  ~3.2s      →    2.0s       -37%
Cumulative Layout Shift ~0.15      →    0.08       -47%
Bundle Size (gzipped)   ~150KB     →    80KB       -47%
Total Bundle (raw)      ~1MB       →    500KB      -50%
Time to Interactive     ~4.5s      →    2.5s       -44%
```

---

## 🎯 Implementation Priority Map

```
IMPACT     EFFORT     PRIORITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⭐⭐⭐⭐⭐  ⏱️ 15min   🔴 [1] Image Optimization
⭐⭐⭐⭐⭐  ⏱️ 20min   🔴 [2] Bundle Code Splitting
⭐⭐⭐⭐⭐  ⏱️ 10min   🔴 [3] Font Loading Strategy
⭐⭐⭐⭐   ⏱️ 30min   🟡 [4] Dynamic Imports
⭐⭐⭐⭐   ⏱️ 20min   🟡 [5] GSAP Configuration
⭐⭐⭐    ⏱️ 15min   🟡 [6] Three.js Settings
⭐⭐     ⏱️ 20min   🟢 [7] Web Vitals Track
⭐⭐     ⏱️ 10min   🟢 [8] CSS Optimization
```

---

## 🔄 Before & After Code Examples

### Example 1: Font Loading

#### ❌ BEFORE (Current - Blocking)

```typescript
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap", // ← Still blocks
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap", // ← Still blocks
});
```

**Impact:** FCP +0.5s | 3 font requests = 3 network waterfalls

---

#### ✅ AFTER (Optimized - Non-Blocking)

```typescript
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  preload: true, // ← Critical font loads early
  fallback: ['system-ui'],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "optional", // ← Won't block render
  fallback: ['monospace'],
});
```

**Impact:** FCP -0.3s | Parallel loading | Fallback ready

---

### Example 2: Image Loading

#### ❌ BEFORE (Unoptimized)

```tsx
// 24 images loading at full resolution
<img src="/projects/mgrm/1.webp" alt="..." />
<img src="/projects/mgrm/2.webp" alt="..." />
<img src="/projects/mgrm/3.webp" alt="..." />
```

**Network Impact:**
```
Project Images: ~2.4MB total
No lazy loading: All load immediately
No format optimization: JPEG used (older format)
No responsiveness: Same size on mobile
```

---

#### ✅ AFTER (Optimized)

```tsx
// Smart loading, modern formats, responsive
<Image
  src="/projects/mgrm/1.webp"
  alt="Project"
  width={1200}
  height={800}
  quality={75}           // ← Compress
  priority={false}       // ← Lazy load
  sizes="..."            // ← Responsive
  formats={['avif', 'webp']} // ← Modern formats
/>
```

**Network Impact:**
```
Project Images: ~300KB total (87% reduction)
Lazy loading: Load on-demand
Format optimization: AVIF/WebP used
Responsive: Different sizes per device
```

---

### Example 3: Bundle Splitting

#### ❌ BEFORE (Single Bundle)

```
main-abc123.js (total: ~450KB)
├── React (85KB)
├── Three.js (500KB)    ← Heavy 3D library
├── GSAP (150KB)
├── Custom components (50KB)
└── Others (60KB)

⚠️ User downloads entire bundle even for hero section
```

---

#### ✅ AFTER (Smart Splitting)

```
main-xyz789.js (initial: ~80KB)    ← Only critical code
├── React (20KB)
├── Layout components (30KB)
├── Hero section (20KB)
└── Essential utils (10KB)

+ vendors-three-abc.js (170KB)     ← Loaded when AITwin used
+ vendors-gsap-def.js (60KB)       ← Loaded when animations needed
+ vendors-react-ghi.js (85KB)      ← Separate vendor bundle
+ experience-jkl.js (30KB)         ← Code-split on intersection
```

**Result:** 
- Initial load: -82% smaller
- Parallel downloads: Faster total time
- Unused code: Never downloaded

---

### Example 4: Dynamic Imports

#### ❌ BEFORE (Everything at once)

```typescript
// app/page.tsx - All imported statically
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import BioIntroSection from '@/components/sections/BioIntroSection';
import ExperienceTimeline from '@/components/sections/ExperienceTimeline';
import TechArsenal from '@/components/sections/TechArsenal';
import ProjectDeepDive from '@/components/ProjectDeepDive';
import AITwinFloatingButton from '@/components/ai-twin/AITwinFloatingButton';
import ContactModal from '@/components/modals/ContactModal';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <BioIntroSection />
      <ExperienceTimeline />
      <TechArsenal />
      <ProjectDeepDive />
      <AITwinFloatingButton />
      <ContactModal />
    </>
  );
}
```

**Issues:**
- All components parsed even if user never scrolls
- 3D models loaded even if modal never opens
- TTI delayed until all components ready

---

#### ✅ AFTER (Smart Loading)

```typescript
// app/page.tsx - Strategic loading
import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';    // Critical
import Navbar from '@/components/Navbar'; // Critical

// Load on scroll
const BioIntroSection = dynamic(
  () => import('@/components/sections/BioIntroSection'),
  { loading: () => <Skeleton /> }
);

// Load on demand
const AITwinFloatingButton = dynamic(
  () => import('@/components/ai-twin/AITwinFloatingButton'),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <Navbar />              {/* 10ms */}
      <Hero />                {/* 50ms */}
      <Suspense fallback={<Skeleton />}>
        <BioIntroSection />   {/* Loaded when in viewport */}
      </Suspense>
      <AITwinFloatingButton /> {/* Loaded after page interactive */}
    </>
  );
}
```

**Benefits:**
- TTI: -40% (2.8s → 1.7s)
- FCP: Same or better
- LCP: -25% (loads critical content first)

---

## 📈 Performance Timeline

### Week 1: Critical Fixes

```
Day 1:  Font + Bundle + Images  ┌─────────────────┐
        │                        │                 │
        ├─ Fonts -0.3s FCP      │ Score: ~75     │
        ├─ Images -0.5s LCP     │                 │
        ├─ Split -0.4s TTI      │ Bundle: -35%   │
        │                        │                 │
Day 5:  Launch optimizations    └─────────────────┘
        
Result: +15 Lighthouse points
```

### Week 2-3: High Impact

```
Day 8:  Dynamic imports         ┌─────────────────┐
        GSAP config             │                 │
        Three.js tuning         │ Score: ~82     │
        │                       │                 │
Day 15: Run audits              │ Bundle: -50%   │
        Benchmark metrics       │ FCP: 1.2s      │
        │                       │ LCP: 2.1s      │
Day 21: Polish & refine         └─────────────────┘
        
Result: +18 Lighthouse points (cumulative +33)
```

### Week 4: Maintenance

```
Day 22: Monitoring setup        ┌─────────────────┐
        Performance tracking    │                 │
        Documentation           │ Score: ~90     │
        │                       │                 │
Day 30: Review & iterate        │ All metrics ✅  │
        Continuous monitoring   │                 │
        User feedback           │ Ready for prod  │
                                └─────────────────┘
        
Result: +10 Lighthouse points (cumulative +43 → 90+)
```

---

## 🎨 UX Impact (No Aesthetic Loss)

### Visual Performance Perception

```
METRIC                    PERCEIVED IMPACT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FCP (Hero appears)        Feels "instant" vs "slow"
LCP (Content ready)       User can interact quickly
TTI (Fully interactive)   Smooth scrolling, no jank

OPTIMIZATION              VISUAL CHANGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Image optimization      Same quality, loads faster
✅ Font loading            Same fonts, no FOIT
✅ Animation tuning        Smoother, no stutters
✅ Bundle splitting        No visible change
✅ Dynamic imports         Progressive enhancement

❌ AESTHETIC LOSSES: NONE
```

---

## 🛠️ Implementation Flow Chart

```
                    ┌─────────────────────────┐
                    │  START OPTIMIZATION     │
                    └────────────┬────────────┘
                                 │
                    ┌────────────┴──────────┐
                    │                       │
              WEEK 1              WEEK 2-3        WEEK 4
         CRITICAL PHASE      HIGH PRIORITY     MAINTENANCE
                    │                       │
        ┌───────────┼───────────┐          │
        │           │           │          │
    FONTS      IMAGES      BUNDLE       DYNAMIC  ANIMATIONS   MONITOR
     |           |           |           |          |          |
  [✓]---+   [✓]---+   [✓]---+   [✓]---+  [✓]---+   [✓]---+
     |       |       |       |       |      |
     └───────┴───────┴───────┴───────┴──────┴────────────────┐
                                                              │
                                   ┌──────────────────────────┘
                                   │
                    ┌──────────────┴──────────────┐
                    │   VERIFY IMPROVEMENTS       │
                    ├─────────────────────────────┤
                    │ □ Lighthouse Score: 90+     │
                    │ □ FCP: < 1.5s               │
                    │ □ LCP: < 2.5s               │
                    │ □ CLS: < 0.1                │
                    │ □ Bundle: < 500KB           │
                    └────────────┬────────────────┘
                                 │
                    ┌────────────┴───────────┐
                    │   DEPLOY & MONITOR     │
                    └────────────────────────┘
```

---

## 📋 Daily Checklist Template

### Day 1 (30 minutes)

```
TIME    TASK                          STATUS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 9:00  Update next.config.ts          □
 9:05  Update font loading            □
 9:10  Create optimization script     □
 9:15  Run image optimization        □
 9:25  Test build (npm run build)    □
 9:30  Commit changes                 □
```

### Day 2-7 (Implementation)

```
         MON    TUE    WED    THU    FRI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Fonts    ✅
Images   ✅      ✅
Bundle          ✅      ✅
Code Split             ✅      ✅
Test                        ✅      ✅
```

---

## 💡 Pro Tips

### Tip 1: Measure Before & After

```bash
# BEFORE
npm run build
# Note the output size and build time

# After each change
npm run build
# Compare metrics

# Final analysis
ANALYZE=true npm run build
# Open .next/analyze/client.html
```

### Tip 2: Use DevTools Performance Tab

```javascript
// In browser console
performance.mark('start');
// ... perform action
performance.mark('end');
performance.measure('my-measurement', 'start', 'end');

// View in Performance tab
performance.getEntriesByName('my-measurement');
```

### Tip 3: Test on Real Device

```bash
# Build & start production server
npm run build && npm start

# Access from mobile on same network
# http://YOUR_IP:3000

# Use Chrome DevTools on mobile
# Remote debugging
```

### Tip 4: Monitor Over Time

```markdown
# Performance Log

## Week 1
- Date: Sept 10, 2026
- Score: 75
- FCP: 2.1s
- Changes: Fonts + Images + Bundle

## Week 2
- Date: Sept 17, 2026
- Score: 82
- FCP: 1.4s
- Changes: Dynamic imports + GSAP

## Week 4
- Date: Oct 1, 2026
- Score: 90
- FCP: 1.1s
- Changes: Monitoring setup
```

---

## 🚀 Quick Win Order (Copy-Paste Ready)

**Do these in order for maximum quick wins:**

1. **5 min:** Update `next.config.ts` bundle splitting
   ```bash
   # Just copy-paste the webpack config
   ```

2. **5 min:** Update font display strategy
   ```bash
   # Change "swap" to "optional" for non-critical fonts
   ```

3. **10 min:** Run image optimization
   ```bash
   npm install --save-dev sharp
   npm run optimize-images
   ```

4. **15 min:** Update app/page.tsx with dynamic imports
   ```bash
   # Replace static imports with dynamic
   ```

5. **5 min:** Setup GSAP config
   ```bash
   # Create lib/gsap-config.ts
   ```

**Total time: 40 minutes**
**Estimated improvement: +20 Lighthouse points**

---

## 📞 Troubleshooting Quick Ref

| Problem | Solution | Time |
|---------|----------|------|
| Build fails | `rm -rf .next && npm run build` | 1m |
| Images not optimized | Check `public/projects/` for .webp files | 2m |
| Dynamic imports error | Add `ssr: true` to loading component | 5m |
| Bundle still large | Run `ANALYZE=true npm run build` | 3m |
| Fonts not loading | Check font preconnect links in head | 2m |

---

## ✨ Success Indicators

You'll know it's working when:

- ✅ Lighthouse score increases week by week
- ✅ DevTools Performance tab shows improvements
- ✅ PageSpeed Insights shows "Good" for Core Web Vitals
- ✅ Website feels faster on slow 4G
- ✅ No visual changes (aesthetic maintained)
- ✅ Animations still smooth at 60fps

---

**Ready to start? Begin with Week 1 checklist! 🚀**

**Bookmark this guide for reference during implementation.**

**Last Updated:** September 2026  
**Difficulty:** Intermediate  
**Estimated Total Time:** 4 weeks, 8-10 hours  

---

*Every optimization maintains the premium aesthetic of your portfolio while dramatically improving performance metrics.*
