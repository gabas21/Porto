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
      id: "https://porto-bagas-app.vercel.app?lang=id",
      en: "https://porto-bagas-app.vercel.app?lang=en",
      "id-ID": "https://porto-bagas-app.vercel.app?lang=id",
      "en-US": "https://porto-bagas-app.vercel.app?lang=en",
      "x-default": "https://porto-bagas-app.vercel.app",
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
      name: "Bagas Aditya Portfolio",
      description:
        "Official Portfolio of Bagas Aditya Anugrah Ramadhan — Frontend Developer & Creative UI Engineer based in Samarinda, East Kalimantan.",
      inLanguage: ["id", "en"],
      author: {
        "@id": "https://porto-bagas-app.vercel.app/#person",
      },
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
        "Frontend Developer & Creative UI Engineer berbasis di Samarinda, Kalimantan Timur, Indonesia. Berpengalaman merancang antarmuka web yang modular, semantik, dan interaktif menggunakan TALL Stack (Tailwind CSS, Alpine.js, Laravel, Livewire), Next.js 15/16, React 19, TypeScript, dan Three.js 3D physics untuk instansi pemerintah dan bisnis.",
      url: "https://porto-bagas-app.vercel.app",
      image: "https://porto-bagas-app.vercel.app/avatar.jpg",
      email: "mailto:bagasa020@gmail.com",
      telephone: "+62-821-5988-8947",
      affiliation: {
        "@type": "CollegeOrUniversity",
        name: "STMIK Widya Cipta Dharma",
        sameAs: "https://wicida.ac.id",
      },
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "STMIK Widya Cipta Dharma",
        sameAs: "https://wicida.ac.id",
      },
      worksFor: [
        {
          "@type": "Organization",
          name: "Bappelitbangda Kota Samarinda & Mahakam Ulu",
        },
        {
          "@type": "Organization",
          name: "Inspektorat Daerah",
        },
        {
          "@type": "Organization",
          name: "AK Kreatif Software House",
        },
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Samarinda",
        addressRegion: "Kalimantan Timur",
        addressCountry: "ID",
      },
      knowsAbout: [
        "Tailwind CSS",
        "Laravel",
        "Livewire",
        "Alpine.js",
        "Next.js",
        "React",
        "Three.js",
        "TypeScript",
        "Go",
        "Echo",
        "PostgreSQL",
        "MySQL",
        "GSAP Motion",
        "Web Performance Optimization",
        "Playwright E2E Testing",
        "Fullstack Web Architecture",
        "WCAG Accessibility",
      ],
      sameAs: [
        "https://linkedin.com/in/bagasaditya",
        "https://github.com/gabas21",
        "https://wa.me/6282159888947",
      ],
    },
    {
      "@type": "Service",
      "@id": "https://porto-bagas-app.vercel.app/#service-frontend-architecture",
      serviceType: "Web Application Development",
      name: "Frontend Web Architecture",
      provider: {
        "@id": "https://porto-bagas-app.vercel.app/#person",
      },
      areaServed: "Indonesia",
      description:
        "Pengembangan web modular, semantik, dan interaktif menggunakan Tailwind CSS, Laravel, dan Next.js untuk instansi pemerintah dan bisnis dengan standar skor Lighthouse 95+.",
    },
    {
      "@type": "Service",
      "@id": "https://porto-bagas-app.vercel.app/#service-3d-webgl",
      serviceType: "Creative 3D Web Development",
      name: "Creative & 3D WebGL Interactions",
      provider: {
        "@id": "https://porto-bagas-app.vercel.app/#person",
      },
      areaServed: "Indonesia",
      description:
        "Mentransformasikan antarmuka web menjadi pengalaman 3D interaktif hidup melalui simulasi fisika hardware-accelerated Three.js, Rapier physics, custom GLSL shaders, dan koreografi GSAP motion.",
    },
    {
      "@type": "Service",
      "@id": "https://porto-bagas-app.vercel.app/#service-ui-ux",
      serviceType: "UI/UX Engineering & Design Systems",
      name: "High-Conversion UI/UX Engineering",
      provider: {
        "@id": "https://porto-bagas-app.vercel.app/#person",
      },
      areaServed: "Indonesia",
      description:
        "Menerjemahkan rancangan Figma secara presisi piksel ke dalam kode responsif berkinerja tinggi dengan standar aksesibilitas WCAG AA, feedback visual-taktil, dan sistem token desain.",
    },
    {
      "@type": "Service",
      "@id": "https://porto-bagas-app.vercel.app/#service-api-state",
      serviceType: "API & Backend Integration",
      name: "API Integration & Resilient State Architecture",
      provider: {
        "@id": "https://porto-bagas-app.vercel.app/#person",
      },
      areaServed: "Indonesia",
      description:
        "Membangun aliran data klien tangguh dengan RESTful APIs, WebSockets, TanStack Query, smart caching, dan integrasi backend Laravel/Livewire serta microservice Go (Echo).",
    },
    {
      "@type": "SoftwareSourceCode",
      "@id": "https://porto-bagas-app.vercel.app/#project-akkreatif",
      name: "AK Kreatif — Digital Agency & Software House Ecosystem",
      description:
        "Platform resmi agensi digital dan startup teknologi Kalimantan Timur yang menyelaraskan arsitektur web modern, sistem showcase portofolio multi-kategori, dan interaktivitas visual berkelas.",
      programmingLanguage: ["PHP", "JavaScript", "TypeScript"],
      keywords: ["Laravel 11", "Inertia.js", "React 19", "TypeScript", "Tailwind CSS", "GSAP", "Vite"],
      author: {
        "@id": "https://porto-bagas-app.vercel.app/#person",
      },
      url: "https://www.akkreatif.com",
    },
    {
      "@type": "SoftwareSourceCode",
      "@id": "https://porto-bagas-app.vercel.app/#project-bapelitbangda-mahulu",
      name: "Sistem Informasi Perencanaan Bapelitbangda Mahakam Ulu",
      description:
        "Dashboard perencanaan resmi yang diadopsi dan digunakan secara aktif oleh pemerintah daerah Kabupaten Mahakam Ulu untuk tata kelola administrasi perencanaan Musrenbang.",
      programmingLanguage: ["PHP", "Blade", "JavaScript"],
      keywords: ["Laravel Blade", "Tailwind CSS", "JavaScript", "Figma", "MySQL"],
      author: {
        "@id": "https://porto-bagas-app.vercel.app/#person",
      },
      codeRepository: "https://github.com/gabas21/bapelitbangda_mahuluNew",
      url: "https://bappelitbangdamahulu.akkreatif.my.id",
    },
    {
      "@type": "SoftwareSourceCode",
      "@id": "https://porto-bagas-app.vercel.app/#project-inspektorat-mahulu",
      name: "Web Portal Resmi Inspektorat Kabupaten Mahakam Ulu",
      description:
        "Portal layanan publik resmi dan formulir pengaduan masyarakat yang ramah aksesibilitas untuk Inspektorat Daerah Kabupaten Mahakam Ulu.",
      programmingLanguage: ["PHP", "Blade", "JavaScript"],
      keywords: ["Laravel Blade", "Tailwind CSS", "Figma", "JavaScript"],
      author: {
        "@id": "https://porto-bagas-app.vercel.app/#person",
      },
      codeRepository: "https://github.com/gabas21/inspektorat_mahakam_ulu_new",
      url: "https://inspektoratmahulu.akkreatif.my.id",
    },
    {
      "@type": "SoftwareSourceCode",
      "@id": "https://porto-bagas-app.vercel.app/#project-pt-mgr-migas",
      name: "Web Portal & Profil Perusahaan PT Mahakam Gerbang Raja Migas",
      description:
        "Portal korporat resmi BUMD sektor migas dengan fokus pada pendekatan mobile-first design, visualisasi data analitik, dan optimasi pemuatan web.",
      programmingLanguage: ["PHP", "Blade", "JavaScript"],
      keywords: ["Laravel Blade", "Tailwind CSS", "JavaScript", "REST API"],
      author: {
        "@id": "https://porto-bagas-app.vercel.app/#person",
      },
      codeRepository: "https://github.com/gabas21/pt-mgr-migas-portal",
      url: "https://mgrmkukar.akkreatif.my.id",
    },
    {
      "@type": "FAQPage",
      "@id": "https://porto-bagas-app.vercel.app/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Siapa Bagas Aditya dan apa spesialisasinya?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Bagas Aditya Anugrah Ramadhan adalah Frontend Developer dan Creative UI Engineer yang berbasis di Samarinda, Kalimantan Timur, Indonesia. Mahasiswa Teknik Informatika di STMIK Widya Cipta Dharma dengan spesialisasi pengembangan web modern berkinerja tinggi menggunakan TALL Stack (Tailwind CSS, Alpine.js, Laravel, Livewire), Next.js, React 19, TypeScript, dan 3D WebGL (Three.js).",
          },
        },
        {
          "@type": "Question",
          name: "Apa itu TALL Stack dan kenapa Bagas menggunakannya?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "TALL Stack adalah kombinasi teknologi Tailwind CSS, Alpine.js, Laravel, dan Livewire. Bagas menggunakannya karena memberikan keseimbangan ideal antara kecepatan pengembangan, keamanan enterprise, dan interaktivitas reaktif tanpa beban overhead arsitektur SPA yang berlebihan, sangat efektif untuk sistem administrasi instansi dan dashboard bisnis.",
          },
        },
        {
          "@type": "Question",
          name: "Jenis proyek apa saja yang pernah dikerjakan oleh Bagas?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Bagas telah mengerjakan sistem portal perencanaan daerah (Bapelitbangda Mahakam Ulu), sistem pengawasan dan pengaduan publik (Inspektorat Daerah), portal korporat BUMD energi (PT Mahakam Gerbang Raja Migas), ekosistem agensi digital (AK Kreatif), hingga platform otomasi AI dan simulasi interaktif 3D physics.",
          },
        },
        {
          "@type": "Question",
          name: "Apakah Bagas melayani pembuatan web untuk instansi pemerintah dan bisnis di luar Samarinda / Kalimantan Timur?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ya, Bagas melayani kolaborasi proyek baik secara on-site di wilayah Samarinda dan Kalimantan Timur (termasuk kawasan Ibu Kota Nusantara / IKN) maupun jarak jauh (remote) untuk seluruh wilayah Indonesia dan klien global.",
          },
        },
        {
          "@type": "Question",
          name: "Bagaimana cara menghubungi Bagas untuk kerja sama atau konsultasi proyek?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Anda dapat menghubungi Bagas langsung melalui WhatsApp di +62-821-5988-8947 (https://wa.me/6282159888947), email di bagasa020@gmail.com, atau melalui profil LinkedIn (linkedin.com/in/bagasaditya) dan GitHub (github.com/gabas21).",
          },
        },
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
