// Bagas AI Twin — Local Neural Knowledge & Semantic Intent Engine
// 100% Zero-Latency, Autonomous, Client-side Knowledge Base

export interface AIAction {
  label: string;
  type: "open_cv" | "open_whatsapp" | "scroll_section" | "open_email" | "suggest_prompt";
  payload?: string;
}

export interface AIResponse {
  answer: string;
  actions?: AIAction[];
  suggestedPrompts?: string[];
}

export interface FAQItem {
  keywords: string[];
  intents: string[];
  response: string;
  actions?: AIAction[];
  suggestedPrompts?: string[];
}

export const SUGGESTED_CHIPS = [
  "⚡ Slicing Figma 2 jam?",
  "💰 Berapa rate freelance?",
  "🚀 Kenapa pindah ke Next.js?",
  "💼 Proyek Bapelitbangda Mahulu?",
  "📄 Preview Resume / CV",
  "📞 Hubungi via WhatsApp",
];

const KNOWLEDGE_BASE: FAQItem[] = [
  // ── 1. FIGMA SLICING & KECEPATAN ──
  {
    keywords: ["slicing", "figma", "tailwind", "2 jam", "jam", "kecepatan", "cepat", "fidelitas", "pixel perfect"],
    intents: ["slicing_speed", "figma_to_code"],
    response:
      "Bisa banget! Selama magang di CV Anak Kalimantan Kreatif dan mengerjakan proyek instansi, slicing Figma 100% pixel-perfect ke Tailwind CSS dan Laravel Blade/Next.js adalah keahlian harian saya. Rata-rata 1 landing page kompleks selesai dalam 2–4 jam lengkap dengan micro-interaction, token warna semantik, dan responsivitas mobile-first.",
    actions: [
      { label: "💼 Lihat Hasil Slicing Proyek", type: "scroll_section", payload: "works" },
      { label: "📄 Cek Sertifikat Software Engineer", type: "open_cv" },
    ],
    suggestedPrompts: ["Berapa rate freelance lo?", "Kenapa pindah ke Next.js?", "Proyek paling kompleks?"]
  },

  // ── 2. RATE FREELANCE & HARGA PROYEK ──
  {
    keywords: ["rate", "fee", "harga", "biaya", "freelance", "gaji", "budget", "bayar", "cost", "ongkos", "tarif"],
    intents: ["rate_fee", "freelance_pricing"],
    response:
      "Rate freelance saya transparan dan fleksibel berbasis scope & kompleksitas proyek:\n\n• Landing Page Interaktif: Rp 1.5jt – 4jt (2–5 hari kerja)\n• Web App / Dashboard Sistem Informasi: Rp 5jt – 15jt+ (2–4 minggu)\n• Full-Stack / Integrasi AI & API: Sesuai milestone\n\nUntuk kolaborasi full-time, contract, atau remote, saya sangat terbuka untuk negosiasi!",
    actions: [
      { label: "💬 Diskusi Scope via WhatsApp", type: "open_whatsapp" },
      { label: "✉️ Kirim Email Tawaran", type: "open_email" },
    ],
    suggestedPrompts: ["Bisa slicing Figma 2 jam?", "Apakah available untuk full-time?", "Lihat proyek instansi"]
  },

  // ── 3. KENAPA PINDAH DARI LARAVEL KE NEXT.JS ──
  {
    keywords: ["kenapa", "pindah", "laravel", "next.js", "nextjs", "react", "alasan", "framework", "bandingkan", "vs"],
    intents: ["laravel_vs_nextjs", "tech_transition"],
    response:
      "Bukan meninggalkan Laravel, melainkan memperluas senjata arsitektur web! Laravel tetap menjadi pilihan kuat saya untuk sistem informasi instansi & backend monolit. Namun untuk produk modern yang menuntut performa ultra-cepat, Server Components (RSC), SSR/SSG dinamis, serta animasi interaktif (GSAP & Three.js), Next.js 15 memberikan fleksibilitas frontend tanpa batas.",
    actions: [
      { label: "🔍 Cek Proyek Motion (Next.js + AI)", type: "scroll_section", payload: "works" },
      { label: "🛠️ Lihat Tech Arsenal", type: "scroll_section", payload: "skills" },
    ],
    suggestedPrompts: ["Apa tech stack andalan lo?", "Proyek Bapelitbangda Mahulu?", "Berapa rate freelance?"]
  },

  // ── 4. PROYEK BAPELITBANGDA MAHAKAM ULU ──
  {
    keywords: ["mahulu", "bapelitbangda", "bappelitbangda", "mahakam", "pemda", "pemerintah", "perencanaan"],
    intents: ["project_mahulu"],
    response:
      "Sistem Informasi Perencanaan Bapelitbangda Mahakam Ulu adalah dashboard resmi yang diadopsi aktif oleh Pemkab Mahulu. Saya membangun sistem desain Figma dan mengonversinya ke Blade modular + Tailwind CSS, dengan tabel data interaktif, live search asinkronus, dan validasi usulan Musrenbang lintas bidang.",
    actions: [
      { label: "📁 Buka Showcase Works", type: "scroll_section", payload: "works" },
      { label: "🌐 Kunjungi Portal Mahulu", type: "scroll_section", payload: "works" },
    ],
    suggestedPrompts: ["Proyek Motion AI?", "Bisa slicing Figma 2 jam?", "Preview Resume / CV"]
  },

  // ── 5. PROYEK MOTION AI (AI TASK PIPELINE) ──
  {
    keywords: ["motion", "motion ai", "llm", "ai", "pipeline", "bot", "telegram", "golang", "docker"],
    intents: ["project_motion"],
    response:
      "Motion adalah platform otomasi AI multi-service yang saya rancang dengan Next.js 14 App Router di frontend dan backend microservice Golang di Docker. Menghubungkan eksekusi real-time LLM OpenRouter serta bot Telegram dengan latensi streaming di bawah 150ms.",
    actions: [
      { label: "⚡ Lihat Detail di Works", type: "scroll_section", payload: "works" },
    ],
    suggestedPrompts: ["Kenapa pindah ke Next.js?", "Berapa rate freelance?", "Apakah bisa bekerja remote?"]
  },

  // ── 6. PT MAHAKAM GERBANG RAJA MIGAS & AK KREATIF ──
  {
    keywords: ["migas", "mgr", "pt mgr", "bumd", "energi", "ak kreatif", "agency", "anak kalimantan"],
    intents: ["project_corporate"],
    response:
      "Untuk PT MGR Migas, saya membangun web portal korporat BUMD energi dengan skor Lighthouse 98/100 dan pendekatan mobile-first design. Sementara di AK Kreatif, saya menjadi Lead Frontend untuk platform software house yang menaungi 43+ portofolio web apps.",
    actions: [
      { label: "💼 Buka Portfolio Section", type: "scroll_section", payload: "works" },
    ],
    suggestedPrompts: ["Download CV / Resume", "Rate fee freelance?", "Kontak WhatsApp"]
  },

  // ── 7. TECH STACK & KEAHLIAN TEKNIS ──
  {
    keywords: ["skill", "skills", "tech", "stack", "keahlian", "teknologi", "bahasa", "typescript", "javascript", "css"],
    intents: ["tech_stack", "skills"],
    response:
      "Senjata utama saya berfokus pada ekosistem Frontend Modern:\n\n• Core: TypeScript, JavaScript (ES6+), HTML5 Semantik\n• UI/Framework: Next.js 15, React 19, Tailwind CSS (Expert), Laravel Blade\n• Visual & Motion: Figma (100% Slicing), GSAP, Three.js / React Three Fiber, Motion\n• Backend & Database: PHP/Laravel, RESTful APIs, MySQL, Supabase, Git",
    actions: [
      { label: "🛠️ Buka Interactive Skills Grid", type: "scroll_section", payload: "skills" },
    ],
    suggestedPrompts: ["Bisa slicing Figma 2 jam?", "Kenapa pindah ke Next.js?", "Lihat Proyek"]
  },

  // ── 8. KETERSEDIAAN KERJA (AVAILABILITY & HIRE) ──
  {
    keywords: ["hire", "lowongan", "available", "kerja", "rekrut", "recruiter", "fulltime", "full-time", "remote", "intern", "join"],
    intents: ["hire_availability"],
    response:
      "Status saya saat ini: ACTIVE & AVAILABLE FOR OPPORTUNITIES! 🚀\nSaya siap untuk posisi Frontend Developer / Web Developer baik secara Remote, Hybrid, maupun On-site (Full-time / Contract / Freelance). Mahasiswa tingkat akhir Teknik Informatika STMIK Widya Cipta Dharma dengan jam kerja fleksibel.",
    actions: [
      { label: "📄 Buka CV & Sertifikasi", type: "open_cv" },
      { label: "💬 Chat via WhatsApp", type: "open_whatsapp" },
    ],
    suggestedPrompts: ["Berapa rate freelance?", "Bisa slicing Figma 2 jam?", "Kontak email"]
  },

  // ── 9. RESUME / CV & SERTIFIKASI ──
  {
    keywords: ["cv", "resume", "sertifikat", "sertifikasi", "ijazah", "hackerrank", "dicoding", "download", "pdf"],
    intents: ["resume_cv"],
    response:
      "Kamu bisa langsung melihat preview interaktif CV dan riwayat sertifikasi saya (termasuk Software Engineer Certificate dari HackerRank dan Cloud & Gen AI AWS dari Dicoding) langsung di web ini!",
    actions: [
      { label: "📄 Buka Modal Preview CV", type: "open_cv" },
      { label: "💼 Lihat Riwayat Karir", type: "scroll_section", payload: "experience" },
    ],
    suggestedPrompts: ["Berapa rate freelance?", "Skill utama Bagas?", "Kontak langsung"]
  },

  // ── 10. KONTAK & LOKASI ──
  {
    keywords: ["kontak", "contact", "whatsapp", "wa", "email", "lokasi", "domisili", "samarinda", "telepon", "hubungi"],
    intents: ["contact_location"],
    response:
      "Saya berdomisili di Samarinda, Kalimantan Timur (WITA, UTC+8).\n\n• WhatsApp: +62 821-5988-8947\n• Email: bagasa020@gmail.com\n• LinkedIn: linkedin.com/in/bagasaditya\n• GitHub: github.com/gabas21\n\nSilakan kontak kapan saja, saya siap merespons dengan cepat!",
    actions: [
      { label: "💬 Chat WhatsApp Sekarang", type: "open_whatsapp" },
      { label: "✉️ Kirim Pesan Email", type: "open_email" },
    ],
    suggestedPrompts: ["Berapa rate freelance?", "Bisa slicing Figma 2 jam?", "Preview Resume / CV"]
  },
];

export function queryBagasAI(userQuery: string): AIResponse {
  const clean = userQuery.toLowerCase().trim();

  if (!clean) {
    return {
      answer: "Halo! Saya Bagas AI Twin 🤖. Tanyakan apa saja tentang skill, kecepatan slicing Figma, rate freelance, atau pengalaman proyek saya!",
      suggestedPrompts: SUGGESTED_CHIPS.slice(0, 4),
    };
  }

  // Scoring matcher based on keyword and intent matches
  let bestMatch: FAQItem | null = null;
  let highestScore = 0;

  for (const item of KNOWLEDGE_BASE) {
    let score = 0;

    for (const kw of item.keywords) {
      if (clean.includes(kw)) {
        score += kw.length > 4 ? 3 : 1.5;
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && highestScore >= 1.5) {
    return {
      answer: bestMatch.response,
      actions: bestMatch.actions,
      suggestedPrompts: bestMatch.suggestedPrompts || SUGGESTED_CHIPS.slice(0, 3),
    };
  }

  // Fallback intelligent response
  return {
    answer: `Menarik! Sebagai kloning digital Bagas Aditya (Frontend Developer di Samarinda), saya menguasai Tailwind CSS, Next.js 15, Figma Slicing, dan Laravel. Pertanyaan spesifik tentang apa yang ingin kamu ketahui?`,
    actions: [
      { label: "📄 Buka Preview CV", type: "open_cv" },
      { label: "💬 Tanya Langsung via WA", type: "open_whatsapp" },
    ],
    suggestedPrompts: [
      "⚡ Slicing Figma 2 jam?",
      "💰 Berapa rate freelance?",
      "🚀 Kenapa pindah ke Next.js?",
      "💼 Proyek Bapelitbangda Mahulu?",
    ],
  };
}
