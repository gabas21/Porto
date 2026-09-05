# Performance Optimization Quick Start Checklist

**Quick Reference Guide untuk Portfolio Bagas**

---

## 🚀 Start Here: Day 1 Tasks (30 minutes)

### Copy-Paste These 3 Files

#### 1️⃣ Update `next.config.ts`

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  swcMinify: true,
  compress: true,
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            three: {
              test: /[\\/]node_modules[\\/]three[\\/]/,
              name: 'vendors-three',
              priority: 10,
            },
            gsap: {
              test: /[\\/]node_modules[\\/]gsap[\\/]/,
              name: 'vendors-gsap',
              priority: 9,
            },
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              name: 'vendors-react',
              priority: 8,
            },
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors-general',
              priority: 5,
            },
          },
        },
      };
    }
    
    config.resolve.alias = {
      ...config.resolve.alias,
      'three': 'three/build/three.min.js',
    };
    
    return config;
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
  },

  experimental: {
    optimizePackageImports: [
      'three',
      'gsap',
      'lucide-react',
      '@phosphor-icons/react',
    ],
  },
};

export default nextConfig;
```

**Command:**
```bash
# Test konfigurasi
npm run build

# Cek apakah build berhasil
ls -la .next/
```

---

#### 2️⃣ Update Font Loading di `app/layout.tsx`

**FIND THIS:**
```typescript
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});
```

**REPLACE WITH:**
```typescript
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  preload: true, // ← ADD THIS
  fallback: ['system-ui', '-apple-system', 'sans-serif'], // ← ADD THIS
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "optional", // ← CHANGE FROM "swap"
  fallback: ['monospace'],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  display: "optional", // ← CHANGE FROM "swap"
  weight: "400",
  style: ["normal", "italic"],
  fallback: ['georgia', 'serif'], // ← ADD THIS
});
```

**Also add in `<head>`:**
```typescript
<head>
  <link
    rel="preconnect"
    href="https://fonts.googleapis.com"
  />
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossOrigin="anonymous"
  />
  {/* existing code */}
</head>
```

---

#### 3️⃣ Create `scripts/optimize-images.ts`

```typescript
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
const inputDir = path.join(process.cwd(), 'public/projects');

async function optimizeImages(dir: string): Promise<void> {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dir, file.name);

    if (file.isDirectory()) {
      await optimizeImages(fullPath);
    } else if (imageExtensions.includes(path.extname(file.name).toLowerCase())) {
      const outputPath = fullPath.replace(/\.[^/.]+$/, '.webp');
      
      try {
        await sharp(fullPath)
          .webp({ quality: 80 })
          .toFile(outputPath);
        
        console.log(`✓ ${file.name}`);
      } catch (error) {
        console.log(`✗ ${file.name}: ${error}`);
      }
    }
  }
}

optimizeImages(inputDir);
```

**Setup:**
```bash
# Install dependencies
npm install --save-dev sharp

# Add to package.json scripts
# "optimize-images": "ts-node scripts/optimize-images.ts"

# Run
npm run optimize-images
```

---

## ✅ Week 1 Tasks (Complete)

- [ ] **Done:** Update `next.config.ts` with webpack optimization
- [ ] **Done:** Update font loading strategy
- [ ] **Done:** Run image optimization script
- [ ] **Done:** Test `npm run build` - should complete without errors
- [ ] **Done:** Measure build output size

**Verification:**
```bash
# Check bundle analysis
npm run build

# See file sizes
du -sh .next/static/chunks/*
```

---

## 📊 Week 2: Analysis & Setup (2-3 hours)

### Task 1: Install Bundle Analyzer

```bash
npm install --save-dev @next/bundle-analyzer
```

**Update `next.config.ts`:**
```typescript
import withBundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzerConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzerConfig(nextConfig);
```

**Run analysis:**
```bash
ANALYZE=true npm run build
# Open .next/analyze/client.html
```

**Track these metrics:**
- [ ] Three.js bundle size
- [ ] GSAP bundle size
- [ ] React bundle size
- [ ] Total vendor size

---

### Task 2: Setup Dynamic Imports

**Replace `app/page.tsx`** with this structure:

```typescript
'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Critical - load immediately
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import Footer from '@/components/layout/Footer';

// Skeleton loader
const Skeleton = ({ h = 'h-96' }: { h?: string }) => (
  <div className={`${h} animate-pulse bg-gradient-to-r from-slate-200 to-slate-100 rounded-lg`} />
);

// Lazy load components
const BioIntroSection = dynamic(() => import('@/components/sections/BioIntroSection'), {
  loading: () => <Skeleton />,
  ssr: true,
});

const ExperienceTimeline = dynamic(() => import('@/components/sections/ExperienceTimeline'), {
  loading: () => <Skeleton />,
  ssr: true,
});

const TechArsenal = dynamic(() => import('@/components/sections/TechArsenal'), {
  loading: () => <Skeleton h="h-80" />,
  ssr: true,
});

const WorksHoverList = dynamic(() => import('@/components/sections/WorksHoverList'), {
  loading: () => <Skeleton />,
  ssr: true,
});

const AITwinFloatingButton = dynamic(() => import('@/components/ai-twin/AITwinFloatingButton'), {
  loading: () => null,
  ssr: false,
});

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Suspense fallback={<Skeleton />}>
        <BioIntroSection />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <ExperienceTimeline />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <TechArsenal />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <WorksHoverList />
      </Suspense>
      <Suspense fallback={null}>
        <AITwinFloatingButton />
      </Suspense>
      <Footer />
    </main>
  );
}
```

- [ ] Update app/page.tsx dengan dynamic imports

---

### Task 3: Optimize Images Components

**Create `lib/image-helper.ts`:**

```typescript
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}

export function OptimizedImage({
  src,
  alt,
  width = 1200,
  height = 800,
  priority = false,
  className = '',
}: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      quality={75}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className={`object-cover transition-transform duration-300 hover:scale-105 ${className}`}
      placeholder="blur"
      blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'%3E%3Crect fill='%23f3f4f6' width='1200' height='800'/%3E%3C/svg%3E"
    />
  );
}
```

**Use in components:**
```typescript
// BEFORE
<img src="/projects/mgrm/1.webp" alt="..." />

// AFTER
<OptimizedImage src="/projects/mgrm/1.webp" alt="MGRM Project" />
```

- [ ] Create image helper component
- [ ] Replace all `<img>` tags with `<OptimizedImage>`

---

## 🎯 Week 3: Animation Optimization (3-4 hours)

### Task 1: Optimize GSAP

**Create `lib/gsap-config.ts`:**

```typescript
import gsap from 'gsap/dist/gsap.min';
import ScrollToPlugin from 'gsap/dist/ScrollToPlugin';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

gsap.defaults({
  duration: 0.6,
  ease: 'power2.inOut',
  overwrite: 'auto',
});

export const enableGPU = (el: HTMLElement) => {
  gsap.set(el, {
    force3D: true,
    backfaceVisibility: 'hidden',
    willChange: 'transform',
  });
};

export default gsap;
```

- [ ] Create GSAP configuration
- [ ] Update all GSAP imports to use this config

---

### Task 2: Optimize Three.js Canvas

**Update Canvas settings:**

```typescript
<Canvas
  dpr={[1, 1.5]} // ← NOT 2
  gl={{
    powerPreference: 'high-performance',
    antialias: true,
    stencil: false,
    depth: true,
    precision: 'mediump', // ← Lower = faster
  }}
  performance={{ min: 0.5 }}
>
  {/* content */}
</Canvas>
```

- [ ] Update Canvas dpr settings
- [ ] Set precision to mediump
- [ ] Enable performance monitoring

---

## 📈 Week 4: Monitoring & Testing (2-3 hours)

### Task 1: Setup Web Vitals Tracking

**Create `lib/web-vitals.ts`:**

```typescript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

export function trackWebVitals() {
  getCLS((m) => console.log('CLS:', m.value));
  getFID((m) => console.log('FID:', m.value));
  getFCP((m) => console.log('FCP:', m.value));
  getLCP((m) => console.log('LCP:', m.value));
  getTTFB((m) => console.log('TTFB:', m.value));
}
```

**Add to `app/layout.tsx`:**
```typescript
'use client';

import { useEffect } from 'react';
import { trackWebVitals } from '@/lib/web-vitals';

export default function RootLayout({ children }) {
  useEffect(() => {
    trackWebVitals();
  }, []);
  
  return <html>...</html>;
}
```

- [ ] Setup Web Vitals tracking
- [ ] Check browser DevTools > Performance

---

### Task 2: Run Lighthouse Audit

```bash
# Open DevTools (F12)
# Go to Lighthouse tab
# Click "Analyze page load"
# Capture baseline metrics

# Record in spreadsheet:
# - Performance score
# - FCP
# - LCP
# - CLS
```

**Create `METRICS.md` to track:**

```markdown
# Performance Metrics Tracking

## Before Optimization
- Performance Score: XX/100
- FCP: XXs
- LCP: XXs
- CLS: X.X
- Bundle Size: XXkb

## After Optimization
- Performance Score: XX/100
- FCP: XXs
- LCP: XXs
- CLS: X.X
- Bundle Size: XXkb

## Improvement
- Score: +XX%
- FCP: -XXms
- LCP: -XXms
```

- [ ] Run Lighthouse audit
- [ ] Document baseline metrics
- [ ] Re-test after each optimization

---

### Task 3: Performance Testing Script

**Add to `package.json`:**

```json
{
  "scripts": {
    "perf-test": "npm run build && npm start",
    "bundle-analyze": "ANALYZE=true npm run build",
    "lighthouse": "lighthouse https://localhost:3000 --view"
  }
}
```

- [ ] Add performance test scripts
- [ ] Create CI/CD performance checks

---

## 🎉 Quick Wins Summary

| Task | Time | Impact | Priority |
|------|------|--------|----------|
| Fix fonts | 10m | ⭐⭐⭐ | 🔴 |
| Optimize images | 15m | ⭐⭐⭐⭐⭐ | 🔴 |
| Bundle splitting | 20m | ⭐⭐⭐⭐ | 🔴 |
| Dynamic imports | 30m | ⭐⭐⭐⭐ | 🟡 |
| GSAP config | 15m | ⭐⭐⭐ | 🟡 |
| Three.js tune | 20m | ⭐⭐⭐ | 🟡 |
| Web Vitals tracking | 15m | ⭐⭐ | 🟡 |
| **TOTAL** | **~2 hours** | | |

---

## 🚨 Common Issues & Fixes

### Issue: Build fails with webpack changes

**Solution:**
```bash
# Clear Next.js cache
rm -rf .next/

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Try build again
npm run build
```

### Issue: Images not showing as WebP

**Solution:**
```bash
# Check if images were converted
ls -la public/projects/*/

# If .webp files exist, update references
# Use OptimizedImage component (handles both jpg and webp)
```

### Issue: Dynamic imports causing hydration errors

**Solution:**
```typescript
// Add this to dynamic imports
const Component = dynamic(() => import('@/component'), {
  ssr: true, // Keep SSR enabled
  loading: () => <Skeleton />,
});
```

---

## 📞 Need Help?

**Check these resources:**
- [Next.js Docs](https://nextjs.org/docs)
- [Web.dev Performance](https://web.dev/performance/)
- [Vercel Optimizations](https://vercel.com/docs/frameworks/nextjs)

---

**Last Updated:** September 2026  
**Status:** Ready to Implement  
**Estimated Timeline:** 4 weeks  

---

*Copy-paste the code snippets, follow the checklist, and watch your Lighthouse score climb! 🚀*
