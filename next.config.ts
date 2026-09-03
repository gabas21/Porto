import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 95],
  },
  experimental: {
    optimizePackageImports: [
      "@phosphor-icons/react",
      "motion",
      "gsap",
      "three",
      "@react-three/fiber",
      "@react-three/drei",
    ],
  },
};


export default nextConfig;
