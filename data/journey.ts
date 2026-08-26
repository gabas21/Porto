export interface JourneyItem {
  period: string;
  role: string;
  organization: string;
  location: string;
  type: 'Work' | 'Education' | 'Certification';
  description: string;
  highlights: string[];
  skills: string[];
}

export const journeys: JourneyItem[] = [
  {
    period: 'Januari 2026 – Maret 2026',
    role: 'Frontend Developer Intern',
    organization: 'CV Anak Kalimantan Kreatif',
    location: 'Samarinda, Kalimantan Timur',
    type: 'Work',
    description: 'Bertanggung jawab penuh dalam proses slicing antarmuka pengguna berbasis desain Figma ke dalam template Blade menggunakan Tailwind CSS dan JavaScript.',
    highlights: [
      'Memastikan tingkat fidelitas visual 100% sesuai acuan desain UI/UX Figma',
      'Mengeliminasi kendala responsivitas pada berbagai resolusi layar (mobile hingga desktop)',
      'Berkolaborasi aktif bersama tim pengembang backend menggunakan alur kerja Git (branching, PRs, code review)'
    ],
    skills: ['Tailwind CSS', 'Laravel Blade', 'JavaScript', 'Figma Slicing', 'Git']
  },
  {
    period: '2023 – Sekarang',
    role: 'Frontend & Web Developer (Proyek Instansi & Portofolio)',
    organization: 'Bapelitbangda Mahulu, PT MGR Migas, Motion AI',
    location: 'Kalimantan Timur, Indonesia',
    type: 'Work',
    description: 'Merancang dan membangun antarmuka web instansi pemerintah daerah, portal korporat energi BUMD, dan platform otomasi berbasis AI.',
    highlights: [
      'Merancang dashboard perencanaan resmi Bapelitbangda Mahakam Ulu yang diadopsi aktif oleh Pemkab',
      'Membangun mobile-first portal korporat PT Mahakam Gerbang Raja Migas dengan performa Lighthouse 98+',
      'Mengembangkan integrasi AI Prompt & Response LLM via API OpenRouter serta bot Telegram di platform Motion'
    ],
    skills: ['Next.js', 'React.js', 'TypeScript', 'Tailwind CSS', 'Laravel', 'REST API', 'MySQL']
  },
  {
    period: '2022 – Sekarang',
    role: 'Sarjana Komputer (S.Kom) — Teknik Informatika',
    organization: 'STMIK Widya Cipta Dharma',
    location: 'Samarinda, Indonesia',
    type: 'Education',
    description: 'Menempuh pendidikan tinggi Teknik Informatika dengan fokus keahlian pada Frontend Web Development, Rekayasa Perangkat Lunak, dan ekosistem modern web.',
    highlights: [
      'Fokus riset dan implementasi antarmuka web semantik dan modular',
      'Mengembangkan sistem pelaporan kerusakan fasilitas kampus berbasis QR scanner in-browser',
      'Mendalami arsitektur data, state management, dan alur kerja pengembangan kolaboratif'
    ],
    skills: ['Teknik Informatika', 'Software Engineering', 'UI/UX Design', 'Web Architecture', 'Database Systems']
  },
  {
    period: '2024 – 2026',
    role: 'Sertifikasi Kompetensi & Pelatihan Profesional',
    organization: 'Google Developers, Dicoding, freeCodeCamp, Coursera',
    location: 'Online / Global',
    type: 'Certification',
    description: 'Menyelesaikan berbagai sertifikasi resmi industri dalam bidang Generative AI, Cloud Tech, Front-End Web, dan Version Control.',
    highlights: [
      'Building & Modernizing Applications with Generative AI / Cloud Tech — Google Developers (2026)',
      'Pengembang Web Modern / Front-End Web — Dicoding Indonesia (2025)',
      'Responsive Web Design Certification — freeCodeCamp (2024)',
      'Version Control with Git & GitHub — Coursera / Dicoding (2024)',
      'UI/UX Design with Figma for Frontend Developers — Great Learning / BWA (2024)'
    ],
    skills: ['Generative AI', 'Cloud Tech', 'Responsive Web Design', 'Git & GitHub', 'Figma UI/UX']
  }
];
