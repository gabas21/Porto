import type { Metadata } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/animations/SmoothScroll";
import CustomCursor from "@/components/animations/CustomCursor";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-bagas.vercel.app"),
  title: "Bagas Aditya Anugrah Ramadhan | Frontend Developer Portfolio",
  description:
    "Portfolio of Bagas Aditya Anugrah Ramadhan — Frontend & Web Developer based in Samarinda, East Kalimantan.",
  keywords: [
    "Bagas Aditya Anugrah Ramadhan",
    "Bagas Aditya",
    "Frontend Developer",
    "Web Developer",
    "React Developer",
    "Next.js",
    "Tailwind CSS",
    "TypeScript",
    "Bapelitbangda Mahulu",
    "Samarinda Developer",
  ],
  authors: [{ name: "Bagas Aditya Anugrah Ramadhan" }],
  creator: "Bagas Aditya Anugrah Ramadhan",
  openGraph: {
    title: "Bagas Aditya Anugrah Ramadhan — Frontend & Web Developer",
    description:
      "Portofolio resmi Bagas Aditya Anugrah Ramadhan. Menampilkan arsitektur frontend institusi pemerintah daerah, AI automation, dan sistem informasi berkinerja tinggi.",
    type: "website",
    locale: "id_ID",
    siteName: "Bagas Aditya Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      data-theme="dark"
      className={`${outfit.variable} ${spaceGrotesk.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] transition-colors duration-300">
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
