import type { Metadata } from "next";
import { Outfit, Space_Grotesk, Instrument_Serif } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/animations/SmoothScroll";
import BubbleCursor from "@/components/animations/BubbleCursor";
import { LanguageProvider } from "@/context/LanguageContext";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "sans-serif"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "optional",
  preload: false,
  fallback: ["monospace", "courier"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "optional",
  preload: false,
  fallback: ["Georgia", "serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://porto-bagas-app.vercel.app"),
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
  authors: [{ name: "Bagas Aditya Anugrah Ramadhan", url: "https://porto-bagas-app.vercel.app" }],
  creator: "Bagas Aditya Anugrah Ramadhan",
  alternates: {
    canonical: "https://porto-bagas-app.vercel.app",
    languages: {
      "id-ID": "https://porto-bagas-app.vercel.app?lang=id",
      "en-US": "https://porto-bagas-app.vercel.app?lang=en",
    },
  },
  openGraph: {
    title: "Bagas Aditya Anugrah Ramadhan | Frontend Developer & Creative UI Engineer",
    description:
      "Crafting high-performance web applications, interactive 3D physics interfaces, and enterprise dashboard architectures.",
    type: "profile",
    locale: "id_ID",
    alternateLocale: ["en_US"],
    url: "https://porto-bagas-app.vercel.app",
    siteName: "Bagas Aditya Portfolio",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Bagas Aditya Anugrah Ramadhan — Frontend Developer & Creative UI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bagas Aditya Anugrah Ramadhan | Frontend Developer",
    description:
      "Frontend developer portfolio featuring interactive 3D physics, STAR case studies, and modern web engineering.",
    images: ["/opengraph-image"],
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
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://porto-bagas-app.vercel.app/#website",
      url: "https://porto-bagas-app.vercel.app",
      name: "Bagas Aditya Anugrah Ramadhan Portfolio",
      description:
        "Official Portfolio of Bagas Aditya Anugrah Ramadhan — Frontend Developer & Creative UI Engineer",
      inLanguage: ["id-ID", "en-US"],
    },
    {
      "@type": "ProfilePage",
      "@id": "https://porto-bagas-app.vercel.app/#profilepage",
      url: "https://porto-bagas-app.vercel.app",
      name: "Bagas Aditya Anugrah Ramadhan | Frontend Developer Profile",
      isPartOf: {
        "@id": "https://porto-bagas-app.vercel.app/#website",
      },
      mainEntity: {
        "@id": "https://porto-bagas-app.vercel.app/#person",
      },
    },
    {
      "@type": "Person",
      "@id": "https://porto-bagas-app.vercel.app/#person",
      name: "Bagas Aditya Anugrah Ramadhan",
      alternateName: ["Bagas Aditya", "gabas21"],
      jobTitle: "Frontend Developer & Creative UI Engineer",
      description:
        "Frontend Developer specializing in high-performance web applications, interactive 3D physics interfaces, and enterprise government systems.",
      url: "https://porto-bagas-app.vercel.app",
      image: "https://porto-bagas-app.vercel.app/bagas.jpg",
      email: "bagasaditya2411@gmail.com",
      telephone: "+6285250485906",
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "STMIK Widya Cipta Dharma",
        sameAs: "https://wicida.ac.id",
      },
      worksFor: [
        {
          "@type": "Organization",
          name: "Bappelitbangda Kota Samarinda",
        },
        {
          "@type": "Organization",
          name: "Inspektorat Daerah",
        },
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Samarinda",
        addressRegion: "Kalimantan Timur",
        addressCountry: "ID",
      },
      knowsAbout: [
        "Next.js",
        "React 19",
        "TypeScript",
        "Tailwind CSS",
        "Three.js WebGL",
        "GSAP",
        "Web Performance Optimization",
        "Playwright E2E Testing",
        "Fullstack Web Architecture",
      ],
      sameAs: [
        "https://github.com/gabas21",
        "https://linkedin.com/in/bagas-aditya-anugrah-ramadhan",
      ],
    },
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
        <LanguageProvider>
          <SmoothScroll>
            <BubbleCursor />
            {children}
          </SmoothScroll>
        </LanguageProvider>
      </body>


    </html>
  );
}
