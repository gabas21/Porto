import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
}

export function NextjsLogo({ className = "w-6 h-6", size = 26 }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="90" cy="90" r="90" fill="currentColor" className="text-zinc-900 dark:text-white" />
      <path
        d="M149.508 157.567L69.142 54H54V125.97H66.2136V69.3837L139.999 164.845C143.333 162.614 146.509 160.181 149.508 157.567Z"
        fill="currentColor"
        className="text-white dark:text-zinc-900"
      />
      <rect x="115" y="54" width="12" height="72" fill="currentColor" className="text-white dark:text-zinc-900" />
    </svg>
  );
}

export function ReactLogo({ className = "w-6 h-6", size = 26 }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="-11.5 -10.23174 23 20.46348" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="0" cy="0" r="2.05" fill="#00D8FF" />
      <g stroke="#00D8FF" strokeWidth="1.2" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

export function TypeScriptLogo({ className = "w-6 h-6", size = 24 }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="128" height="128" rx="24" fill="#3178C6" />
      <path d="M 74.2 68.9 C 74.2 68.9 77.8 66.8 83.1 66.8 C 88.4 66.8 91.2 69.4 91.2 73.6 C 91.2 77.2 88.8 79.5 83.7 82.2 C 75.3 86.6 70.3 91.2 70.3 100.8 C 70.3 111.4 78.5 117.8 91.9 117.8 C 98.7 117.8 104.7 115.4 104.7 115.4 L 102.1 104.3 C 102.1 104.3 96.9 106.9 91.7 106.9 C 85.5 106.9 82.7 103.9 82.7 99.8 C 82.7 95.8 85.5 93.3 91.2 90.3 C 99.6 85.8 103.7 80.9 103.7 72.8 C 103.7 62.4 95.9 56.2 83.9 56.2 C 75.8 56.2 69.3 59 69.3 59 L 74.2 68.9 Z M 48.7 57.5 L 48.7 116.5 L 61 116.5 L 61 57.5 L 48.7 57.5 Z M 35.8 46.5 L 73.8 46.5 L 73.8 57.5 L 35.8 57.5 Z" fill="#FFFFFF" />
    </svg>
  );
}

export function JavaScriptLogo({ className = "w-6 h-6", size = 24 }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="128" height="128" rx="24" fill="#F7DF1E" />
      <path d="M 74.2 68.9 C 74.2 68.9 77.8 66.8 83.1 66.8 C 88.4 66.8 91.2 69.4 91.2 73.6 C 91.2 77.2 88.8 79.5 83.7 82.2 C 75.3 86.6 70.3 91.2 70.3 100.8 C 70.3 111.4 78.5 117.8 91.9 117.8 C 98.7 117.8 104.7 115.4 104.7 115.4 L 102.1 104.3 C 102.1 104.3 96.9 106.9 91.7 106.9 C 85.5 106.9 82.7 103.9 82.7 99.8 C 82.7 95.8 85.5 93.3 91.2 90.3 C 99.6 85.8 103.7 80.9 103.7 72.8 C 103.7 62.4 95.9 56.2 83.9 56.2 C 75.8 56.2 69.3 59 69.3 59 L 74.2 68.9 Z M 22 57.5 L 34.3 57.5 L 34.3 99.2 C 34.3 104.5 37.1 107.1 42.4 107.1 C 45.9 107.1 48.4 105.7 48.4 105.7 L 50.3 116.1 C 50.3 116.1 46.2 117.8 39.8 117.8 C 28.5 117.8 22 110.8 22 98.5 L 22 57.5 Z" fill="#000000" />
    </svg>
  );
}

export function TailwindLogo({ className = "w-6 h-6", size = 26 }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" fill="#06B6D4" />
    </svg>
  );
}

export function HTML5Logo({ className = "w-6 h-6", size = 24 }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M3 2l1.6 18 7.4 2 7.4-2L21 2H3zm14.3 5.4H9.4l.2 2.2h7.3l-.6 6.3-4.3 1.2-4.3-1.2-.3-3.3h2.2l.2 1.6 2.2.6 2.2-.6.3-3H7.1L6.5 5.2h11l-.2 2.2z" fill="#E34F26"/>
    </svg>
  );
}

export function CSS3Logo({ className = "w-6 h-6", size = 24 }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M3 2l1.6 18 7.4 2 7.4-2L21 2H3zm14.3 5.4h-9l.2 2.2h8.6l-.7 7.3-4.4 1.2-4.4-1.2-.3-3.3h2.2l.2 1.6 2.3.6 2.3-.6.4-3.8H7.1L6.5 5.2h11.1l-.3 2.2z" fill="#1572B6"/>
    </svg>
  );
}

export function FigmaLogo({ className = "w-6 h-6", size = 24 }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE" />
      <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
      <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
      <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
      <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
    </svg>
  );
}

export function DesignSystemsLogo({ className = "w-6 h-6", size = 24 }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="3" y="3" width="8" height="8" rx="2" fill="#8B5CF6" />
      <rect x="13" y="3" width="8" height="8" rx="2" fill="#A78BFA" />
      <rect x="3" y="13" width="8" height="8" rx="2" fill="#C4B5FD" />
      <rect x="13" y="13" width="8" height="8" rx="2" fill="#7C3AED" />
    </svg>
  );
}

export function PrototypingLogo({ className = "w-6 h-6", size = 24 }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M4 4h16v8h-8l-4 8v-8H4V4z" fill="#F43F5E" fillOpacity="0.2" stroke="#F43F5E" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="12" cy="8" r="2" fill="#F43F5E" />
    </svg>
  );
}

export function ResponsiveUILogo({ className = "w-6 h-6", size = 24 }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="2" y="4" width="14" height="11" rx="2" stroke="#0284C7" strokeWidth="2" fill="#0284C7" fillOpacity="0.1" />
      <path d="M6 19h6M9 15v4" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
      <rect x="14" y="9" width="8" height="12" rx="1.5" stroke="#38BDF8" strokeWidth="2" fill="#0284C7" />
      <circle cx="18" cy="18.5" r="0.75" fill="white" />
    </svg>
  );
}

export function LaravelLogo({ className = "w-6 h-6", size = 26 }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M57.62 19.34L35.29 6.45L12.96 19.34V45.13L35.29 58.02L57.62 45.13V19.34Z" stroke="#FF2D20" strokeWidth="3" strokeLinejoin="round" fill="none"/>
      <path d="M35.29 6.45V32.24M35.29 32.24L57.62 19.34M35.29 32.24L12.96 19.34" stroke="#FF2D20" strokeWidth="3" strokeLinejoin="round"/>
      <path d="M46.46 38.68L35.29 32.24L24.12 38.68V51.58L35.29 58.02L46.46 51.58V38.68Z" fill="#FF2D20" fillOpacity="0.9"/>
    </svg>
  );
}

export function BladeLogo({ className = "w-6 h-6", size = 24 }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="24" height="24" rx="6" fill="#F05340" />
      <path d="M7 6l8 6-8 6V6z" fill="#FFFFFF" />
      <path d="M13 10l4 2-4 2v-4z" fill="#FFA39E" />
    </svg>
  );
}

export function PHPLogo({ className = "w-6 h-6", size = 24 }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="64" cy="64" rx="60" ry="36" fill="#777BB4" />
      <path d="M38 48H52C58 48 62 51 61 57C60 63 55 67 49 67H41L38 80H28L38 48ZM44 59H49C52 59 54 58 54 56C55 54 53 53 50 53H45L44 59Z" fill="#FFFFFF" />
      <path d="M60 48H70L67 61H78L81 48H91L83 80H73L76 68H65L62 80H52L60 48Z" fill="#FFFFFF" />
      <path d="M90 48H104C110 48 114 51 113 57C112 63 107 67 101 67H93L90 80H80L90 48ZM96 59H101C104 59 106 58 106 56C107 54 105 53 102 53H97L96 59Z" fill="#FFFFFF" />
    </svg>
  );
}

export function MySQLLogo({ className = "w-6 h-6", size = 24 }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="24" height="24" rx="6" fill="#00618A" />
      <path d="M6 16c2-4 5-6 9-6 1 0 2 .2 3 .5-1.5-2.5-4-3.5-6.5-3.5-3 0-5.5 1.5-6.5 4.5-.5 1.5-.5 3 1 4.5z" fill="#E48E00"/>
      <path d="M12 17c3.5 0 6-2 6.5-5.5-1.5 1-3.5 1.5-5.5 1.5-2 0-3.5-.5-4.5-1.5.5 3 2 5.5 3.5 5.5z" fill="#FFFFFF"/>
    </svg>
  );
}

export function SupabaseLogo({ className = "w-6 h-6", size = 24 }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M13.35 21.05C12.8 21.75 11.7 21.35 11.7 20.45V13.85H3.6C2.7 13.85 2.25 12.8 2.85 12.2L11.55 2.35C12.1 1.7 13.15 2.1 13.15 2.95V9.55H21.25C22.15 9.55 22.6 10.6 22 11.2L13.35 21.05Z" fill="#3ECF8E" />
    </svg>
  );
}

export function RestApiLogo({ className = "w-6 h-6", size = 24 }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="24" height="24" rx="6" fill="#10B981" />
      <path d="M6 9l4-4 4 4M10 5v10M18 15l-4 4-4-4M14 19V9" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function GitLogo({ className = "w-6 h-6", size = 24 }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M124.7 57.3L70.7 3.3c-4.4-4.4-11.5-4.4-15.9 0L3.3 54.8c-4.4 4.4-4.4 11.5 0 15.9l54 54c4.4 4.4 11.5 4.4 15.9 0l51.5-51.5c4.4-4.4 4.4-11.5 0-15.9z" fill="#F05032"/>
      <path d="M72.2 73.6V52.8c2.9-1.5 4.9-4.5 4.9-8.1 0-5-4.1-9.1-9.1-9.1s-9.1 4.1-9.1 9.1c0 3.6 2.1 6.7 5.1 8.2v18.7c-3 1.5-5.1 4.6-5.1 8.2 0 5 4.1 9.1 9.1 9.1s9.1-4.1 9.1-9.1c0-3.2-1.7-6-4.2-7.6l16.1-16.1c1.6 2.5 4.4 4.2 7.6 4.2 5 0 9.1-4.1 9.1-9.1 0-5-4.1-9.1-9.1-9.1s-9.1 4.1-9.1 9.1c0 1.2.2 2.3.7 3.3L72.2 73.6z" fill="#FFFFFF"/>
    </svg>
  );
}

export function ViteLogo({ className = "w-6 h-6", size = 24 }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M29.98 5.92L16.89 29.58c-.37.66-1.41.66-1.78 0L2.02 5.92c-.41-.74.19-1.63 1.01-1.52l12.48 1.63a1.05 1.05 0 00.28 0l13.18-1.63c.82-.11 1.42.78 1.01 1.52z" fill="url(#vite-grad-new)"/>
      <path d="M20.94 2.18L10.37 18.23l4.63-.64-3.18 10.99 11.58-15.65-4.71.65 2.25-11.4z" fill="#FFD62E"/>
      <defs>
        <linearGradient id="vite-grad-new" x1="2" y1="4" x2="30" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#41D1FF"/>
          <stop offset="1" stopColor="#BD34FE"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

export function PostmanLogo({ className = "w-6 h-6", size = 24 }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="12" cy="12" r="11" fill="#FF6C37" />
      <path d="M12 4a8 8 0 100 16 8 8 0 000-16zm3.8 11.2l-2.8 1.2a.4.4 0 01-.5-.2l-.9-2a.4.4 0 01.2-.5l2.8-1.2a.4.4 0 01.5.2l.9 2a.4.4 0 01-.2.5z" fill="#FFFFFF" />
    </svg>
  );
}

export function CursorAILogo({ className = "w-6 h-6", size = 24 }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="24" height="24" rx="6" fill="#0E1015" stroke="currentColor" strokeWidth="1" className="text-zinc-700" />
      <path d="M6 17l4-10 4 10-4-3-4 3z" fill="#FACC15" />
      <path d="M15 14l3 3M18 14l-3 3" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function NodejsLogo({ className = "w-6 h-6", size = 24 }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 2l9 5.2v10.4L12 23l-9-5.4V7.2L12 2z" fill="#5FA04E" />
      <path d="M12 6.5l5.5 3.2v6.4L12 19.3l-5.5-3.2V9.7L12 6.5z" fill="#333333" />
      <path d="M12 8.5v7M8.5 10.5l7 4M15.5 10.5l-7 4" stroke="#5FA04E" strokeWidth="1.5" />
    </svg>
  );
}
