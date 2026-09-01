export interface Project {
  id: string;
  title: string;
  category: 'Government' | 'AI & WebApp' | 'Corporate';
  tagline: string;
  description: string;
  techStack: string[];
  image: string;
  gallery?: string[];
  liveUrl?: string;
  githubUrl?: string;
  sandboxUrl?: string;
  keyFeatures: string[];
  role: string;
  timeline: string;
  situation: string;
  action: string;
  impact: string;
  metrics: { label: string; value: string }[];
  architecturePoints: string[];
}

export const projects: Project[] = [
  {
    id: 'akkreatif-agency',
    title: 'AK Kreatif — Digital Agency & Software House Ecosystem',
    category: 'Corporate',
    tagline: 'Enterprise Digital Agency Hub & Multi-Category Portfolio System',
    description: 'Platform resmi agensi digital dan startup teknologi Kalimantan Timur yang menyelaraskan arsitektur web modern, sistem showcase portofolio multi-kategori, dan interaktivitas visual berkelas.',
    techStack: ['Laravel 11', 'Inertia.js', 'React 19', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Vite'],
    image: '/projects/akkreatif/1-home.jpg',
    gallery: [
      '/projects/akkreatif/1-home.jpg',
      '/projects/akkreatif/2-about.jpg',
      '/projects/akkreatif/3-services.jpg',
      '/projects/akkreatif/4-webapp.jpg',
      '/projects/akkreatif/5-portfolio.jpg',
      '/projects/akkreatif/6-contact.jpg'
    ],
    role: 'Lead Frontend & Web Architecture Developer',
    timeline: '2024 - Present',
    keyFeatures: [
      'Arsitektur web agensi performa tinggi berbasis Laravel 11, Inertia.js, React 19, dan Tailwind CSS',
      'Sistem showcase dan filtering portofolio interaktif untuk 43+ aplikasi web pemerintah dan korporat',
      'Integrasi micro-animations GSAP, responsive layout, dan optimasi aset prefetching'
    ],
    liveUrl: 'https://www.akkreatif.com',
    situation: 'AK Kreatif (Anak Kalimantan Kreatif) membutuhkan portal resmi representatif untuk memamerkan puluhan karya aplikasi web instansi pemerintah daerah, layanan desain, dan solusi teknologi informasi.',
    action: 'Merancang arsitektur monolit modern dengan Laravel & Inertia.js React, membangun sistem showcase portofolio interaktif dengan filter instan, dan menerapkan optimasi performa serta asset prefetching.',
    impact: 'Menjadi etalase digital utama agensi yang dipercaya instansi pemerintah dan BUMD, dengan performa pemuatan super cepat dan visual elegan.',
    metrics: [
      { label: 'Total Karya', value: '98+ Proyek' },
      { label: 'Web Apps', value: '43 Systems' },
      { label: 'Lighthouse Perf', value: '99/100' }
    ],
    architecturePoints: [
      'Integrasi full-stack monolit Laravel 11 + Inertia.js React 19 tanpa overhead REST boilerplate',
      'Dynamic multi-category portfolio indexing dengan filter interaktif berbasis state',
      'Optimasi asset preloading dan SEO metadata komprehensif'
    ]
  },
  {
    id: 'bapelitbangda-mahulu',
    title: 'Sistem Informasi Perencanaan Bapelitbangda Mahakam Ulu',
    category: 'Government',
    tagline: 'Enterprise Public Sector Planning & Administration System',
    description: 'Dashboard perencanaan resmi yang diadopsi dan digunakan secara aktif oleh pemerintah daerah Kabupaten Mahakam Ulu untuk tata kelola administrasi perencanaan.',
    techStack: ['Laravel Blade', 'Tailwind CSS', 'JavaScript', 'Figma', 'MySQL'],
    image: '/projects/bappelitbangda/1.webp',
    gallery: [
      '/projects/bappelitbangda/1.webp',
      '/projects/bappelitbangda/2.webp',
      '/projects/bappelitbangda/3.webp',
      '/projects/bappelitbangda/4.webp',
      '/projects/bappelitbangda/5.webp',
      '/projects/bappelitbangda/6.webp'
    ],
    role: 'Frontend Developer',
    timeline: '2023 - 2024',
    keyFeatures: [
      'Merancang sistem desain antarmuka dan dashboard yang diadopsi resmi oleh Pemkab Mahakam Ulu',
      'Mengonversi alur birokrasi pemerintahan menjadi antarmuka intuitif untuk validasi dokumen lintas bidang',
      'Tabel data interaktif dengan penyaringan multi-kategori, pencarian real-time, dan status badge dokumen'
    ],
    liveUrl: 'https://bappelitbangdamahulu.akkreatif.my.id',
    githubUrl: 'https://github.com/gabas21/bapelitbangda_mahuluNew',
    situation: 'Instansi Bapelitbangda Mahakam Ulu membutuhkan digitalisasi tata kelola dokumen perencanaan dan validasi usulan program Musrenbang yang sebelumnya manual dan rawan inkonsistensi data antar bidang.',
    action: 'Merancang sistem desain antarmuka Figma dan mengonversinya ke template Blade modular dengan Tailwind CSS, menerapkan dynamic state management dan tabel data interaktif dengan fitur live search.',
    impact: 'Diadopsi secara resmi dan digunakan aktif oleh pemerintah daerah untuk tata kelola administrasi perencanaan yang transparan dan efisien.',
    metrics: [
      { label: 'Status Adopsi', value: 'Resmi Pemda' },
      { label: 'Efisiensi Rekap', value: '+70%' },
      { label: 'Integritas Data', value: '100%' }
    ],
    architecturePoints: [
      'Komponen UI modular berbasis Blade Components & Tailwind utility layer',
      'Data-table asinkronus dengan pagination dinamis & filter status dokumen perencanaan',
      'Sistem role-based access visual untuk Admin, Verifikator, dan Bidang Perencanaan'
    ]
  },
  {
    id: 'motion-ai',
    title: 'Motion — AI Task & LLM Agent Pipeline Platform',
    category: 'AI & WebApp',
    tagline: 'Fullstack Next.js 14, Golang Microservice & AI Automation Hub',
    description: 'Platform otomasi AI multi-service terintegrasi antarmuka Next.js 14, backend Golang berkecepatan tinggi, dan integrasi Telegram Bot & OpenRouter LLM.',
    techStack: ['Next.js 14', 'React.js', 'Golang', 'TypeScript', 'Tailwind CSS', 'Docker', 'REST API'],
    image: '/projects/motion-ai.jpg',
    role: 'Full Stack / Frontend Developer',
    timeline: '2024 - 2025',
    keyFeatures: [
      'Frontend Next.js 14 modern dengan tata letak modular, Tailwind CSS, dan dynamic state management',
      'Integrasi backend Golang microservice dengan arsitektur Docker Compose multi-container',
      'Alur eksekusi prompt & response LLM real-time dengan feedback visual streaming dan integrasi bot'
    ],
    githubUrl: 'https://github.com/gabas21/motion',
    liveUrl: 'https://motion-liard-seven.vercel.app',
    sandboxUrl: 'https://stackblitz.com/github/gabas21/motion/tree/main/frontend',
    situation: 'Dibutuhkan platform otomasi cerdas yang menggabungkan kecepatan pemrosesan data backend Golang dengan antarmuka frontend reaktif Next.js untuk mengeksekusi pipeline instruksi AI.',
    action: 'Membangun arsitektur frontend modular berbasis Next.js 14, menghubungkannya ke REST API Golang, dan mengonfigurasi multi-container Docker untuk pengujian lokal & cloud sandbox.',
    impact: 'Menghadirkan platform AI yang siap dijalankan baik di cloud Vercel maupun live interactive sandbox di browser.',
    metrics: [
      { label: 'Latency Streaming', value: '< 150ms' },
      { label: 'Arsitektur Service', value: 'Go + Next.js' },
      { label: 'Deploy Status', value: 'Live Vercel' }
    ],
    architecturePoints: [
      'Frontend Next.js 14 App Router teroptimasi dengan TypeScript & Tailwind',
      'Backend Golang performa tinggi untuk pemrosesan data & integrasi LLM',
      'Orkestrasi multi-service lengkap dengan Docker Compose & Sandbox container'
    ]
  },
  {
    id: 'pt-mgr-migas',
    title: 'Web Portal & Profil Perusahaan PT Mahakam Gerbang Raja Migas',
    category: 'Corporate',
    tagline: 'Enterprise Corporate Energy & ESG Portal',
    description: 'Portal korporat resmi BUMD sektor migas dengan fokus pada pendekatan mobile-first design, visualisasi data analitik, dan optimasi pemuatan web.',
    techStack: ['Laravel Blade', 'Tailwind CSS', 'JavaScript', 'REST API'],
    image: '/projects/mgrm/1.webp',
    gallery: [
      '/projects/mgrm/1.webp',
      '/projects/mgrm/2.webp',
      '/projects/mgrm/3.webp',
      '/projects/mgrm/4.webp',
      '/projects/mgrm/5.webp',
      '/projects/mgrm/6.webp'
    ],
    role: 'Frontend Developer',
    timeline: '2024',
    keyFeatures: [
      'Merancang dan membangun arsitektur antarmuka portal institusi dengan pendekatan mobile-first design',
      'Komponen UI interaktif untuk visualisasi data analitik dan feed konten dinamis melalui RESTful API',
      'Optimasi rendering halaman dan asset bundling guna meningkatkan performa kecepatan pemuatan web'
    ],
    liveUrl: 'https://mgrmkukar.akkreatif.my.id',
    githubUrl: 'https://github.com/gabas21/pt-mgr-migas-portal',
    situation: 'BUMD sektor energi membutuhkan portal profil perusahaan yang modern, responsif, dan mampu menampilkan data korporat serta publikasi informasi secara cepat.',
    action: 'Merancang arsitektur mobile-first dengan Tailwind CSS dan Laravel Blade, mengintegrasikan feed konten dinamis via REST API, dan mengoptimalkan asset bundling.',
    impact: 'Pemuatan halaman menjadi sangat responsif dan menyajikan informasi publik perusahaan secara profesional dan terpercaya.',
    metrics: [
      { label: 'Lighthouse Perf', value: '98/100' },
      { label: 'LCP Mobile', value: '0.9s' },
      { label: 'Mobile First', value: '100% Score' }
    ],
    architecturePoints: [
      'Mobile-first layout architecture dengan asset bundling teroptimasi',
      'Konsumsi RESTful API untuk visualisasi analitik dan feed konten publikasi',
      'Desain antarmuka korporat bersih dengan standar kontras warna tinggi'
    ]
  },
  {
    id: 'sim-kampus-qr',
    title: 'Sistem Pelaporan Kerusakan Fasilitas Kampus (Laporan Kampus)',
    category: 'AI & WebApp',
    tagline: 'In-Browser Hardware QR Scanner & Facility Management',
    description: 'Sistem pelaporan fasilitas kampus dengan pemindai QR Code kamera langsung di browser dan dashboard manajemen teknisi teroptimasi.',
    techStack: ['Laravel Blade', 'Tailwind CSS', 'JavaScript', 'HTML5 QR Scanner'],
    image: '/projects/sim-kampus-qr.jpg',
    role: 'Full Stack / Frontend Developer',
    timeline: '2024',
    keyFeatures: [
      'Antarmuka interaktif pelaporan fasilitas dan dashboard teknisi teroptimasi di mobile maupun desktop',
      'Integrasi modul scanner kamera QR Code langsung pada browser untuk identifikasi lokasi kerusakan instan',
      'Form dinamis dengan validasi client-side, upload preview gambar, serta sistem pelacakan status tiket visual'
    ],
    liveUrl: 'https://kampus-scanner-demo.vercel.app',
    githubUrl: 'https://github.com/gabas21/sim-kampus-qr-scanner',
    situation: 'Proses pelaporan fasilitas kampus yang rusak membutuhkan alur yang cepat dari mahasiswa ke tim teknisi tanpa perlu mengetik lokasi secara manual.',
    action: 'Mengintegrasikan scanner kamera QR Code berbasis browser, membangun form dinamis dengan live preview upload gambar, serta dashboard teknisi dengan badge tiket visual.',
    impact: 'Mempermudah proses identifikasi lokasi kerusakan secara instan dan mempercepat respon perbaikan fasilitas kampus.',
    metrics: [
      { label: 'Scan QR Speed', value: 'Instant (<0.4s)' },
      { label: 'Form Validation', value: 'Client & Server' },
      { label: 'Device Support', value: 'Mobile & Desktop' }
    ],
    architecturePoints: [
      'Integrasi HTML5 Camera QR Scanner API tanpa instalasi aplikasi native',
      'Formulir interaktif dengan live image preview dan validasi reaktif',
      'Dashboard manajemen teknisi dengan pelacakan status tiket visual'
    ]
  },
  {
    id: 'inspektorat-mahulu',
    title: 'Web Portal Resmi Inspektorat Kabupaten Mahakam Ulu',
    category: 'Government',
    tagline: 'Public Service & Community Reporting Information System',
    description: 'Portal layanan publik resmi dan formulir pengaduan masyarakat yang ramah aksesibilitas untuk Inspektorat Daerah Kabupaten Mahakam Ulu.',
    techStack: ['Laravel Blade', 'Tailwind CSS', 'Figma', 'JavaScript'],
    image: '/projects/inspektorat/1.webp',
    gallery: [
      '/projects/inspektorat/1.webp',
      '/projects/inspektorat/2.webp',
      '/projects/inspektorat/3.webp',
      '/projects/inspektorat/4.webp',
      '/projects/inspektorat/5.webp',
      '/projects/inspektorat/6.webp'
    ],
    role: 'Frontend Developer',
    timeline: '2024',
    keyFeatures: [
      'Slicing desain wireframe dan prototipe Figma menjadi komponen Blade yang modular dan semantik',
      'Tata letak informasi layanan publik dan formulir pengaduan masyarakat ramah aksesibilitas',
      'Desain antarmuka pemerintah yang terstruktur dan bersih sesuai standar instansi'
    ],
    liveUrl: 'https://inspektoratmahulu.akkreatif.my.id',
    githubUrl: 'https://github.com/gabas21/inspektorat_mahakam_ulu_new',
    situation: 'Inspektorat Kabupaten Mahakam Ulu membutuhkan portal resmi untuk menyajikan informasi pengawasan daerah dan kanal pengaduan masyarakat yang transparan dan mudah diakses.',
    action: 'Menerjemahkan rancangan prototipe Figma menjadi antarmuka Blade modular dengan Tailwind CSS, memastikan kepatuhan semantik HTML5 dan aksesibilitas publik.',
    impact: 'Memberikan kanal informasi dan pengaduan yang mudah digunakan oleh masyarakat dan aparatur pemerintah daerah.',
    metrics: [
      { label: 'Figma Fidelity', value: '100% Sliced' },
      { label: 'Accessibility', value: 'Standard WCAG' },
      { label: 'Status Rilis', value: 'Instansi Pemda' }
    ],
    architecturePoints: [
      'Pemisahan komponen Blade modular untuk header, formulir layanan, dan feed pengumuman',
      'Struktur semantik HTML5 yang optimal untuk aksesibilitas dan SEO pemerintah',
      'Desain responsif lintas perangkat dari smartphone hingga desktop'
    ]
  }
];
