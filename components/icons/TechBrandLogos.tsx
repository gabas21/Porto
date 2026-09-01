import React from "react";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiFigma,
  SiLaravel,
  SiPhp,
  SiMysql,
  SiSupabase,
  SiGit,
  SiVite,
  SiPostman,
  SiNodedotjs,
} from "react-icons/si";

interface LogoProps {
  className?: string;
  size?: number;
}

export function NextjsLogo({ className = "", size = 22 }: LogoProps) {
  return <SiNextdotjs size={size} className={`text-white ${className}`} />;
}

export function ReactLogo({ className = "", size = 24 }: LogoProps) {
  return <SiReact size={size} className={`text-[#00D8FF] ${className}`} />;
}

export function TypeScriptLogo({ className = "", size = 22 }: LogoProps) {
  return <SiTypescript size={size} className={`text-[#3178C6] ${className}`} />;
}

export function JavaScriptLogo({ className = "", size = 22 }: LogoProps) {
  return <SiJavascript size={size} className={`text-[#F7DF1E] ${className}`} />;
}

export function TailwindLogo({ className = "", size = 24 }: LogoProps) {
  return <SiTailwindcss size={size} className={`text-[#06B6D4] ${className}`} />;
}

export function HTML5Logo({ className = "", size = 22 }: LogoProps) {
  return <SiHtml5 size={size} className={`text-[#E34F26] ${className}`} />;
}

export function CSS3Logo({ className = "", size = 22 }: LogoProps) {
  return <SiCss size={size} className={`text-[#1572B6] ${className}`} />;
}

export function FigmaLogo({ className = "", size = 22 }: LogoProps) {
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

export function DesignSystemsLogo({ className = "", size = 22 }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="3" y="3" width="7.5" height="7.5" rx="2" fill="#8B5CF6" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="2" fill="#A78BFA" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="2" fill="#C4B5FD" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" fill="#7C3AED" />
    </svg>
  );
}

export function PrototypingLogo({ className = "", size = 22 }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#F43F5E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function ResponsiveUILogo({ className = "", size = 22 }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="2" y="3" width="20" height="14" rx="2" stroke="#0284C7" strokeWidth="2" />
      <path d="M8 21h8M12 17v4" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
      <rect x="15" y="8" width="5" height="7" rx="1" fill="#38BDF8" />
    </svg>
  );
}

export function LaravelLogo({ className = "", size = 24 }: LogoProps) {
  return <SiLaravel size={size} className={`text-[#FF2D20] ${className}`} />;
}

export function BladeLogo({ className = "", size = 22 }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="24" height="24" rx="6" fill="#F05340" />
      <path d="M7 6l8 6-8 6V6z" fill="#FFFFFF" />
      <path d="M13 10l4 2-4 2v-4z" fill="#FFA39E" />
    </svg>
  );
}

export function PHPLogo({ className = "", size = 24 }: LogoProps) {
  return <SiPhp size={size} className={`text-[#777BB4] ${className}`} />;
}

export function MySQLLogo({ className = "", size = 24 }: LogoProps) {
  return <SiMysql size={size} className={`text-[#4479A1] ${className}`} />;
}

export function SupabaseLogo({ className = "", size = 22 }: LogoProps) {
  return <SiSupabase size={size} className={`text-[#3ECF8E] ${className}`} />;
}

export function RestApiLogo({ className = "", size = 22 }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M4 8h16M4 8l4-4M4 8l4 4M20 16H4M20 16l-4-4M20 16l-4 4" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function GitLogo({ className = "", size = 22 }: LogoProps) {
  return <SiGit size={size} className={`text-[#F05032] ${className}`} />;
}

export function ViteLogo({ className = "", size = 22 }: LogoProps) {
  return <SiVite size={size} className={`text-[#646CFF] ${className}`} />;
}

export function PostmanLogo({ className = "", size = 22 }: LogoProps) {
  return <SiPostman size={size} className={`text-[#FF6C37] ${className}`} />;
}

export function CursorAILogo({ className = "", size = 22 }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="24" height="24" rx="6" fill="#000000" />
      <path d="M12 4L4 18h16L12 4z" fill="#FFFFFF" fillOpacity="0.9" />
      <path d="M12 9l-4 7h8l-4-7z" fill="#000000" />
    </svg>
  );
}

export function NodejsLogo({ className = "", size = 22 }: LogoProps) {
  return <SiNodedotjs size={size} className={`text-[#5FA04E] ${className}`} />;
}
