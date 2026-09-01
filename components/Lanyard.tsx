/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
'use client';

import React, { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';
import { soundFx } from '@/lib/audio-fx';

extend({ MeshLineGeometry, MeshLineMaterial });

declare module '@react-three/fiber' {
  interface ThreeElements {
    meshLineGeometry: any;
    meshLineMaterial: any;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: any;
      meshLineMaterial: any;
    }
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        meshLineGeometry: any;
        meshLineMaterial: any;
      }
    }
  }
}

const BLANK_PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

const CARD_GLB_PATH = '/assets/lanyard/card.glb';
const LANYARD_TEXTURE_PATH = '/assets/lanyard/lanyard.webp';

useGLTF.preload(CARD_GLB_PATH);
useTexture.preload(LANYARD_TEXTURE_PATH);

const FRONT_UV_RECT = { x: 0, y: 0, w: 0.5, h: 0.755 };
const BACK_UV_RECT = { x: 0.5, y: 0, w: 0.5, h: 0.757 };

/**
 * Render a high-end, obsidian-matte developer ID badge on the canvas
 */
function renderFrontBadge(
  ctx: CanvasRenderingContext2D,
  rx: number,
  ry: number,
  rw: number,
  rh: number,
  photoImg: HTMLImageElement | null
) {
  ctx.save();
  ctx.translate(rx, ry);

  // 1. Dark Titanium Casing Background
  const bgGrad = ctx.createLinearGradient(0, 0, rw, rh);
  bgGrad.addColorStop(0, '#13161C');
  bgGrad.addColorStop(0.5, '#0E1014');
  bgGrad.addColorStop(1, '#0A0B0E');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, rw, rh);

  // 2. Subtle Outer Chamfer & Inner Bezel
  ctx.strokeStyle = '#2A303C';
  ctx.lineWidth = Math.max(2, rw * 0.006);
  ctx.strokeRect(rw * 0.02, rh * 0.015, rw * 0.96, rh * 0.97);

  // 3. Top Clip Slot & Security Chip Indicator
  const topBarY = rh * 0.07;
  ctx.fillStyle = '#FACC15';
  ctx.beginPath();
  ctx.arc(rw * 0.1, topBarY, rw * 0.014, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#94A3B8';
  ctx.font = `bold ${Math.round(rw * 0.032)}px monospace, monospace`;
  ctx.fillText('DEV ACCESS PASS // 2026', rw * 0.14, topBarY + rw * 0.012);

  ctx.fillStyle = '#475569';
  ctx.font = `bold ${Math.round(rw * 0.028)}px monospace, monospace`;
  ctx.textAlign = 'right';
  ctx.fillText('ID: 0426-BAR', rw * 0.9, topBarY + rw * 0.012);
  ctx.textAlign = 'left';

  // 4. Centered Portrait Photo with Sleek Frame
  const photoW = rw * 0.78;
  const photoH = rh * 0.46;
  const photoX = (rw - photoW) / 2;
  const photoY = rh * 0.11;

  // Photo Frame Border
  ctx.strokeStyle = '#384252';
  ctx.lineWidth = Math.max(2, rw * 0.005);
  ctx.strokeRect(photoX - 2, photoY - 2, photoW + 4, photoH + 4);

  if (photoImg && photoImg.width > 0) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(photoX, photoY, photoW, photoH);
    ctx.clip();

    // Scale to cover upper-body nicely focusing on the head & suit
    const scale = Math.max(photoW / photoImg.width, photoH / photoImg.height) * 1.15;
    const dw = photoImg.width * scale;
    const dh = photoImg.height * scale;
    const dx = photoX + (photoW - dw) / 2;
    // Geser posisi vertikal foto ke atas agar kepala pas di tengah-atas bingkai dan jas/dasi terlihat
    const dy = photoY - dh * 0.14;
    ctx.drawImage(photoImg, dx, dy, dw, dh);

    // Subtle bottom shadow gradient on photo
    const pGrad = ctx.createLinearGradient(photoX, photoY + photoH * 0.72, photoX, photoY + photoH);
    pGrad.addColorStop(0, 'rgba(10,11,14,0)');
    pGrad.addColorStop(1, 'rgba(10,11,14,0.75)');
    ctx.fillStyle = pGrad;
    ctx.fillRect(photoX, photoY + photoH * 0.72, photoW, photoH * 0.28);

    ctx.restore();
  }

  // 5. Developer Name & Role Typography
  const textStartY = photoY + photoH + rh * 0.06;
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `900 ${Math.round(rw * 0.068)}px system-ui, -apple-system, sans-serif`;
  ctx.fillText('BAGAS ADITYA', rw * 0.11, textStartY);

  ctx.fillStyle = '#FACC15';
  ctx.font = `bold ${Math.round(rw * 0.038)}px monospace, monospace`;
  ctx.fillText('FRONTEND DEVELOPER', rw * 0.11, textStartY + rh * 0.045);

  ctx.fillStyle = '#94A3B8';
  ctx.font = `500 ${Math.round(rw * 0.032)}px system-ui, -apple-system, sans-serif`;
  ctx.fillText('WEB ARCHITECT • SAMARINDA, ID', rw * 0.11, textStartY + rh * 0.085);

  // 6. Security Barcode & Verification Footer
  const barY = rh * 0.82;
  const barH = rh * 0.08;
  const barW = rw * 0.78;
  const barX = rw * 0.11;

  ctx.fillStyle = '#1E242E';
  ctx.fillRect(barX, barY, barW, barH);

  // Procedural barcode stripes
  ctx.fillStyle = '#CBD5E1';
  let currX = barX + 12;
  const endBarX = barX + barW - 12;
  let toggle = true;
  while (currX < endBarX) {
    const sw = toggle ? (currX % 7 === 0 ? 4 : currX % 3 === 0 ? 2.5 : 1.5) : 2;
    if (toggle) {
      ctx.fillRect(currX, barY + 6, sw, barH - 12);
    }
    currX += sw + 2;
    toggle = !toggle;
  }

  // Footer Tagline
  ctx.fillStyle = '#64748B';
  ctx.font = `600 ${Math.round(rw * 0.024)}px monospace, monospace`;
  ctx.fillText('VERIFIED AUTHENTIC // WITA STANDARD', rw * 0.11, rh * 0.94);

  ctx.restore();
}

/**
 * Render the back side of the developer ID card (Tech specs & Verification matrix)
 */
function renderBackBadge(
  ctx: CanvasRenderingContext2D,
  rx: number,
  ry: number,
  rw: number,
  rh: number
) {
  ctx.save();
  ctx.translate(rx, ry);

  // 1. Dark Obsidian Background
  ctx.fillStyle = '#0E1014';
  ctx.fillRect(0, 0, rw, rh);

  // 2. Magnetic Security Stripe
  ctx.fillStyle = '#050608';
  ctx.fillRect(0, rh * 0.08, rw, rh * 0.12);
  ctx.fillStyle = '#1A1E26';
  ctx.fillRect(0, rh * 0.08 + 2, rw, 1.5);

  // 3. Technical Header
  ctx.fillStyle = '#FACC15';
  ctx.font = `bold ${Math.round(rw * 0.034)}px monospace, monospace`;
  ctx.fillText('TECHNICAL SPECIFICATIONS', rw * 0.1, rh * 0.28);

  // 4. Core Stack Badges (Next.js, TS, React, Tailwind, Git, Laravel)
  const skills = [
    'NEXT.JS 16',
    'TYPESCRIPT',
    'REACT.JS',
    'TAILWIND CSS',
    'LARAVEL',
    'THREE.JS',
    'GIT ARCHITECTURE',
    'REST API',
  ];

  const badgeStartX = rw * 0.1;
  let badgeY = rh * 0.33;
  const colW = rw * 0.38;

  skills.forEach((skill, i) => {
    const col = i % 2;
    const bx = badgeStartX + col * (colW + rw * 0.04);
    if (i > 0 && col === 0) badgeY += rh * 0.065;

    ctx.fillStyle = '#181C24';
    ctx.strokeStyle = '#2D3442';
    ctx.lineWidth = 1.5;
    ctx.fillRect(bx, badgeY, colW, rh * 0.05);
    ctx.strokeRect(bx, badgeY, colW, rh * 0.05);

    ctx.fillStyle = '#E2E8F0';
    ctx.font = `bold ${Math.round(rw * 0.026)}px monospace, monospace`;
    ctx.fillText(skill, bx + rw * 0.025, badgeY + rh * 0.033);
  });

  // 5. Hologram Security Strip
  const holoY = rh * 0.68;
  const holoGrad = ctx.createLinearGradient(rw * 0.1, holoY, rw * 0.9, holoY);
  holoGrad.addColorStop(0, '#38BDF8');
  holoGrad.addColorStop(0.3, '#F472B6');
  holoGrad.addColorStop(0.6, '#FACC15');
  holoGrad.addColorStop(1, '#4ADE80');
  ctx.fillStyle = holoGrad;
  ctx.fillRect(rw * 0.1, holoY, rw * 0.8, rh * 0.06);

  ctx.fillStyle = '#0F172A';
  ctx.font = `900 ${Math.round(rw * 0.028)}px system-ui, sans-serif`;
  ctx.fillText('AUTHENTIC DEVELOPER ID • 2026', rw * 0.14, holoY + rh * 0.038);

  // 6. Security Microtext & Contact Info
  ctx.fillStyle = '#64748B';
  ctx.font = `500 ${Math.round(rw * 0.024)}px monospace, monospace`;
  ctx.fillText('STMIK WIDYA CIPTA DHARMA // SAMARINDA', rw * 0.1, rh * 0.86);
  ctx.fillText('FRONTEND SYSTEM INTEGRITY VERIFIED', rw * 0.1, rh * 0.91);

  ctx.restore();
}

export interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  frontImage?: string | null;
  backImage?: string | null;
  imageFit?: 'cover' | 'contain';
  lanyardImage?: string | null;
  lanyardWidth?: number;
  anchorY?: number;
  groupX?: number;
  className?: string;
}

export default function Lanyard({
  position = [0, -0.6, 14.5],
  gravity = [0, -35, 0],
  fov = 24,
  transparent = true,
  frontImage = null,
  backImage = null,
  imageFit = 'cover',
  lanyardImage = null,
  lanyardWidth = 1,
  anchorY = 6.8, // Raised anchor point outside top of screen
  groupX = 0,
  className = 'relative z-0 w-full h-full flex justify-center items-center',
}: LanyardProps) {
  const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth < 1024 : false));
  const [isInView, setIsInView] = useState(true);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Performance Optimization: Pause physics & WebGL render loop when scrolled out of view
  useEffect(() => {
    if (!wrapperRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  const actualGroupX = isMobile ? 0 : groupX;
  const responsivePosition: [number, number, number] = isMobile
    ? [0, 0, 13.2]
    : position;
  const responsiveAnchorY = isMobile ? 4.3 : anchorY;

  return (
    <div ref={wrapperRef} className={className}>
      <Canvas
        frameloop={isInView ? 'always' : 'never'}
        camera={{ position: responsivePosition, fov: isMobile ? 22 : fov }}
        dpr={[1, 1.5]}
        gl={{ alpha: transparent, antialias: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI * 1.1} />
        <Suspense fallback={null}>
          <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
            <Band
              isMobile={isMobile}
              frontImage={frontImage}
              backImage={backImage}
              imageFit={imageFit}
              lanyardImage={lanyardImage}
              lanyardWidth={lanyardWidth}
              anchorY={responsiveAnchorY}
              groupX={actualGroupX}
            />
          </Physics>
          <Environment blur={0.75}>
            <Lightformer
              intensity={2}
              color="white"
              position={[0, -1, 5]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[-1, -1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[1, 1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={8}
              color="white"
              position={[-10, 0, 14]}
              rotation={[0, Math.PI / 2, Math.PI / 3]}
              scale={[100, 10, 1]}
            />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
  frontImage?: string | null;
  backImage?: string | null;
  imageFit?: 'cover' | 'contain';
  lanyardImage?: string | null;
  lanyardWidth?: number;
  anchorY?: number;
  groupX?: number;
}

function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
  frontImage = null,
  backImage = null,
  imageFit = 'cover',
  lanyardImage = null,
  lanyardWidth = 1,
  anchorY = 6.8,
  groupX = 0,
}: BandProps) {
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);

  const vec = useMemo(() => new THREE.Vector3(), []);
  const ang = useMemo(() => new THREE.Vector3(), []);
  const rot = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);

  const segmentProps = {
    type: 'dynamic' as const,
    canSleep: false,        // Harus false agar segmen tidak freeze saat scene pertama load
    colliders: false as const,
    angularDamping: 2,
    linearDamping: 4,
  };

  const { nodes, materials } = useGLTF(CARD_GLB_PATH) as any;
  const rawTexture = useTexture(lanyardImage || LANYARD_TEXTURE_PATH) as THREE.Texture;
  const frontTex = useTexture(frontImage || BLANK_PIXEL) as THREE.Texture;
  const backTex = useTexture(backImage || BLANK_PIXEL) as THREE.Texture;

  const texture = useMemo(() => {
    if (!rawTexture) return rawTexture;
    const cloned = rawTexture.clone();
    cloned.wrapS = THREE.RepeatWrapping;
    cloned.wrapT = THREE.RepeatWrapping;
    cloned.needsUpdate = true;
    return cloned;
  }, [rawTexture]);

  const cardMap = useMemo(() => {
    const baseMap = materials?.base?.map;
    if (!baseMap) return null;

    const baseImg = baseMap.image;
    if (!baseImg || !baseImg.width || !baseImg.height) return baseMap;

    const W = baseImg.width;
    const H = baseImg.height;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return baseMap;

    ctx.drawImage(baseImg, 0, 0, W, H);

    const rx = FRONT_UV_RECT.x * W;
    const ry = FRONT_UV_RECT.y * H;
    const rw = FRONT_UV_RECT.w * W;
    const rh = FRONT_UV_RECT.h * H;

    const brx = BACK_UV_RECT.x * W;
    const bry = BACK_UV_RECT.y * H;
    const brw = BACK_UV_RECT.w * W;
    const brh = BACK_UV_RECT.h * H;

    // Render High-End Front Developer Badge Casing
    const photo = (frontTex.image as HTMLImageElement) || null;
    renderFrontBadge(ctx, rx, ry, rw, rh, photo);

    // Render High-End Back Developer Badge Casing
    renderBackBadge(ctx, brx, bry, brw, brh);

    const composite = new THREE.CanvasTexture(canvas);
    composite.colorSpace = THREE.SRGBColorSpace;
    composite.flipY = baseMap.flipY;
    composite.anisotropy = 16;
    composite.needsUpdate = true;
    return composite;
  }, [frontTex, materials]);

  const curve = useMemo(() => {
    // 4 titik: j3 (= attachment point clip) → j2 → j1 → fixed anchor
    // j3 secara fisika sudah terikat di posisi klip kartu via sphericalJoint
    const c = new THREE.CatmullRomCurve3([
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
    ]);
    c.curveType = 'chordal';
    return c;
  }, []);

  const [dragged, drag] = useState<any>(false);
  const [hovered, hover] = useState(false);

  // Rope segments: panjang 1 unit (sesuai referensi)
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  // Spherical joint: Y offset harus = -groupOffset + scale * h_clip_in_model
  // h_clip = (1.45_ref + 1.2_ref) / 2.25_ref = 1.178. Dengan scale 2.85 & offset -1.45:
  // joint_Y = -1.45 + 2.85 * 1.178 = 1.907  → tali benar-benar menempel pada klip fisik
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.907, 0],
  ]);

  const triggerDropAnimation = useCallback(() => {
    if (!card.current || !j1.current || !j2.current || !j3.current || !fixed.current) return;

    try {
      const fixTrans = fixed.current.translation();
      if (!fixTrans || isNaN(fixTrans.x)) return;

      const fx = fixTrans.x;
      const fy = fixTrans.y;
      const fz = fixTrans.z || 0;

      // Wake up all rigid bodies in the physics engine
      [fixed, j1, j2, j3, card].forEach((ref) => ref.current?.wakeUp());

      // Lift rope segments and card up and slightly to the right/forward
      // When gravity acts, it produces a realistic elastic drop & swing motion
      j1.current.setTranslation({ x: fx + 0.6, y: fy - 0.5, z: fz + 0.3 }, true);
      j1.current.setLinvel({ x: -0.4, y: -0.8, z: -0.1 }, true);

      j2.current.setTranslation({ x: fx + 1.2, y: fy - 1.1, z: fz + 0.6 }, true);
      j2.current.setLinvel({ x: -0.8, y: -1.6, z: -0.2 }, true);

      j3.current.setTranslation({ x: fx + 1.8, y: fy - 1.7, z: fz + 0.9 }, true);
      j3.current.setLinvel({ x: -1.2, y: -2.4, z: -0.4 }, true);

      card.current.setTranslation({ x: fx + 2.4, y: fy - 2.4, z: fz + 1.3 }, true);
      card.current.setLinvel({ x: -2.2, y: -3.8, z: -0.6 }, true);
      card.current.setAngvel({ x: 0.2, y: 1.5, z: -0.8 }, true);

      // Reset lerped positions so the mesh curve doesn't have an initial visual glitch
      if (j1.current) j1.current.lerped = new THREE.Vector3(fx + 0.6, fy - 0.5, fz + 0.3);
      if (j2.current) j2.current.lerped = new THREE.Vector3(fx + 1.2, fy - 1.1, fz + 0.6);

      soundFx.playLanyardDrop();
    } catch {
      // Ignore if called before physics graph is fully initialized
    }
  }, []);

  useEffect(() => {
    let triggered = false;

    const handleCurtainLift = () => {
      setTimeout(() => {
        triggerDropAnimation();
        triggered = true;
      }, 100);
    };

    window.addEventListener('preloader-curtain-lift', handleCurtainLift);

    // Initial timeout fallback in case preloader is disabled or already completed
    const timer = setTimeout(() => {
      if (!triggered) {
        triggerDropAnimation();
      }
    }, 600);

    return () => {
      window.removeEventListener('preloader-curtain-lift', handleCurtainLift);
      clearTimeout(timer);
    };
  }, [triggerDropAnimation]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    if (fixed.current && j1.current && j2.current && j3.current && card.current && band.current) {
      try {
        const fixTrans = fixed.current.translation();
        const j1Trans = j1.current.translation();
        const j2Trans = j2.current.translation();
        const j3Trans = j3.current.translation();

        if (fixTrans && j1Trans && j2Trans && j3Trans && !isNaN(fixTrans.x) && !isNaN(j1Trans.x)) {
          // j1 dan j2 di-lerp untuk smooth sway; j3 pakai translation langsung
          // (j3 adalah attachment point fisik, harus akurat posisinya)
          [j1, j2].forEach((ref) => {
            if (!ref.current) return;
            const trans = ref.current.translation();
            if (!trans || isNaN(trans.x)) return;
            if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(trans);
            const clampedDistance = Math.max(
              0.1,
              Math.min(1, ref.current.lerped.distanceTo(trans))
            );
            ref.current.lerped.lerp(
              trans,
              delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
            );
          });

          if (j2.current.lerped && j1.current.lerped) {
            // points[0] = j3.translation() langsung — j3 secara fisika ADA di posisi klip
            // karena sphericalJoint mengikatnya ke [0, 1.907, 0] di card local space
            curve.points[0].copy(j3.current.translation());
            curve.points[1].copy(j2.current.lerped);
            curve.points[2].copy(j1.current.lerped);
            curve.points[3].copy(fixTrans);

            const pts = curve.getPoints(32);
            if (
              pts.length > 0 &&
              !isNaN(pts[0].x) &&
              band.current?.geometry?.setPoints
            ) {
              band.current.geometry.setPoints(pts);
            }
          }

          ang.copy(card.current.angvel());
          rot.copy(card.current.rotation());
          card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
        }
      } catch {
        // Silently catch transient frame init errors during hydration
      }
    }
  });

  curve.curveType = 'chordal';

  return (
    <>
      <group position={[groupX, anchorY, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        {/* Segmen rope posisi awal terangkat untuk drop fisika dinamis */}
        <RigidBody position={[0.6, -0.5, 0.3]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.2, -1.1, 0.6]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.8, -1.7, 0.9]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2.4, -2.4, 1.3]}
          ref={card}
          {...segmentProps}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider args={[0.9, 1.35, 0.01]} />
          <group
            scale={isMobile ? 2.2 : 2.85}
            position={[0, -1.45, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: any) => {
              e.target.releasePointerCapture(e.pointerId);
              drag(false);
              soundFx.playLanyardRelease();
            }}
            onPointerDown={(e: any) => {
              e.target.setPointerCapture(e.pointerId);
              soundFx.playLanyardGrab();
              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(vec.copy(card.current.translation()))
              );
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={cardMap || materials.base.map}
                map-anisotropy={16}
                clearcoat={1}
                clearcoatRoughness={0.15}
                roughness={0.3}
                metalness={0.2}
              />
            </mesh>
            <mesh
              geometry={nodes.clip.geometry}
              material={materials.metal}
              material-roughness={0.3}
            />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [800, 1200] : [1400, 1400]}
          useMap={1}
          map={texture}
          repeat={[-4, 1]}
          lineWidth={lanyardWidth}
        />
      </mesh>
    </>
  );
}
