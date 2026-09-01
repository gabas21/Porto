# 🎯 PROJECT INTAKE & KICKOFF WIZARD (System Prompt & Interactive Interview)
> *Dokumen ini adalah instruksi standar yang dibaca oleh AI sebelum memulai proyek baru atau redesign.*

---

## 🤖 ATURAN UNTUK AI AGENT KETIKA USER MEMULAI PROYEK:
Ketika user mengatakan: *"Saya ingin membuat website baru"*, *"Bantu saya redesign web ini"*, atau sejenisnya, **AI HARUS** menjalankan wawancara interaktif terstruktur di bawah ini untuk mengunci arah desain sebelum menulis kode:

---

## 📋 5 TAHAP WAWANCARA KICKOFF PROYEK

### 1. 🏗️ Jenis & Tujuan Proyek (Scope)
* **A. Bangun dari Nol (From Scratch):** Membuat arsitektur, routing, dan komponen baru.
* **B. Redesign / Polish:** Mengupgrade antarmuka proyek yang sudah ada menjadi standar agensi tanpa merusak fungsionalitas backend.
* **C. Landing Page Konversi Tinggi:** Fokus pada visual *hero banner*, *storytelling*, dan CTA.
* **D. Fullstack Application:** Membutuhkan integrasi database (Supabase), autentikasi, API, atau AI features (seperti pada [[Proyek - Motion (Supabase Backend)]]).

---

### 2. 🎨 Pilihan Arah Desain & Vibe (Design Taste)
Pilih salah satu estetika dari katalog skill:
* 🖤 **[[High-End Visual Design & Agency Standards]]:** Gelap mewah, aksen emas/neon lembut, micro-shadows, tipografi kontras ekstrem.
* 📄 **[[Minimalist UI]]:** Monokrom hangat, flat bento grid, tipografi editorial bersih, muted pastel.
* ⚙️ **[[Industrial Brutalist UI]]:** Grid mekanis kaku, military/terminal vibes, monospace tebal, declassified blueprints.
* 🎬 **[[GPT Taste & GSAP Motion]]:** Sangat dinamis, section pinning, horizontal scrolling, fluid layout.

---

### 3. ✨ Modul Interaksi & Animasi yang Diinginkan
Pilih komponen dari [[02 - Design Patterns & Animation Arsenal]]:
- [ ] **3D Canvas:** [[3D Interactive Lanyard]] / Model 3D interaktif.
- [ ] **Kursor & Hover:** [[Hover Image Reveal]] / Magnetic Buttons.
- [ ] **Navigasi:** [[Glassmorphism Morphing Nav]] / Fullscreen Stagger Overlay.
- [ ] **Intro:** [[Cinematic Preloader]] dengan teks salam transisi.
- [ ] **Ribbon:** Infinite Seamless Marquee Loop.

---

### 4. 🛠️ Tech Stack & Integrasi
* **Framework:** Next.js (App Router) / Vite React.
* **Styling:** Tailwind CSS 4 + CSS Variables.
* **Motion Engine:** Motion.dev (Framer Motion) / GSAP ScrollTrigger.
* **Database & Auth:** Supabase PostgreSQL / RLS / Edge Functions.
* **Testing:** [[Playwright E2E Suite]].

---

### 5. 🚀 Output yang Dihasilkan AI Setelah Wawancara:
Setelah user menjawab pertanyaan di atas, AI akan otomatis:
1. Menyusun **`PROJECT_BRIEF.md`** di dalam proyek target.
2. Mengambil potongan kode (*snippets*) yang relevan dari folder `Skills/` dan `Libraries/` di Obsidian Vault ini.
3. Memulai pembangunan komponen dengan gaya visual yang sudah disepakati tanpa coba-coba (*zero guesswork*).
