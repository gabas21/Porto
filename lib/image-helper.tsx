import React from "react";
import Image from "next/image";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  sizes?: string;
  quality?: number;
}

/**
 * Reusable OptimizedImage component implementing modern image delivery:
 * - Next.js automatic AVIF/WebP conversion
 * - Blur placeholder to prevent Cumulative Layout Shift (CLS)
 * - Responsive sizes for mobile / tablet / desktop devices
 * - Configurable compression quality (default 75)
 */
export function OptimizedImage({
  src,
  alt,
  width = 1200,
  height = 800,
  fill = false,
  priority = false,
  className = "",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality = 75,
}: OptimizedImageProps) {
  const blurPlaceholder =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'%3E%3Crect fill='%2318181b' width='1200' height='800'/%3E%3C/svg%3E";

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        quality={quality}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        sizes={sizes}
        className={`object-cover transition-transform duration-300 ${className}`}
        placeholder="blur"
        blurDataURL={blurPlaceholder}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      quality={quality}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      sizes={sizes}
      className={`object-cover transition-transform duration-300 ${className}`}
      placeholder="blur"
      blurDataURL={blurPlaceholder}
    />
  );
}

export default OptimizedImage;
