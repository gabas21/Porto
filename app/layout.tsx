import type { Metadata } from "next";
import { Outfit, Space_Grotesk, Instrument_Serif } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/animations/SmoothScroll";
import BubbleCursor from "@/components/animations/BubbleCursor";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-bagas.vercel.app"),
  title: "Bagas Aditya Anugrah Ramadhan | Frontend Developer & Creative UI Engineer",
  description:
    "Official Portfolio of Bagas Aditya Anugrah Ramadhan — Frontend Developer specializing in high-performance web applications, 3D interactive physics, and modern UI engineering.",
  keywords: [
    "Bagas Aditya Anugrah Ramadhan",
    "Bagas Aditya",
    "Frontend Developer",
    "Creative Engineer",
    "Next.js Developer",
    "React 19",
    "Three.js",
    "Tailwind CSS",
    "TypeScript",
    "Portfolio Frontend Indonesia",
    "Samarinda Developer",
  ],
  authors: [{ name: "Bagas Aditya Anugrah Ramadhan", url: "https://portfolio-bagas.vercel.app" }],
  creator: "Bagas Aditya Anugrah Ramadhan",
  openGraph: {
    title: "Bagas Aditya Anugrah Ramadhan | Frontend Developer & Creative UI Engineer",
    description:
      "Crafting high-performance web applications, interactive 3D physics interfaces, and enterprise dashboard architectures.",
    type: "website",
    locale: "id_ID",
    url: "https://portfolio-bagas.vercel.app",
    siteName: "Bagas Aditya Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bagas Aditya Anugrah Ramadhan | Frontend Developer",
    description:
      "Frontend developer portfolio featuring interactive 3D physics, STAR case studies, and modern web engineering.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Bagas Aditya Anugrah Ramadhan",
  jobTitle: "Frontend Developer & Creative UI Engineer",
  url: "https://portfolio-bagas.vercel.app",
  email: "bagasaditya2411@gmail.com",
  telephone: "+6285250485906",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Samarinda",
    addressRegion: "Kalimantan Timur",
    addressCountry: "ID",
  },
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Three.js",
    "GSAP",
    "Web Performance Optimization",
    "Playwright E2E Testing",
  ],
  sameAs: [
    "https://github.com/gabas21",
    "https://linkedin.com/in/bagas-aditya-anugrah-ramadhan",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      data-theme="light"
      suppressHydrationWarning
      className={`${outfit.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable} scroll-smooth antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem("theme");var t=s==="dark"?"dark":"light";document.documentElement.setAttribute("data-theme",t);if(t==="dark"){document.documentElement.classList.add("dark");}else{document.documentElement.classList.remove("dark");}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] transition-colors duration-300">
        <SmoothScroll>
          <BubbleCursor />
          {children}
        </SmoothScroll>
      </body>


    </html>
  );
}
