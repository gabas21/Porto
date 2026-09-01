# ⚡ Proyek: Motion App (Fullstack AI & Academic Productivity)

- **Database:** Supabase PostgreSQL v17 (Active Healthy, Region: `ap-south-1`)
- **Project Ref / ID:** `tytaozgplqynphhxxipz`
- **Domain:** AI Academic Assistant, Smart Task Scheduling, Moodle & SIAK Scraping / Sync, RAG Knowledge Retrieval.

---

## 🏗️ Arsitektur & Modul Skill yang Ada di Proyek Motion:

### 1. 🤖 AI Document Chunks & RAG Engine (`public.document_chunks`, `public.chat_histories`)
* **Skill:** Vector Embeddings & Document Chunking untuk memecah PDF / materi kuliah menjadi token kecil agar bisa di-*search* secara semantik oleh LLM.
* **Fitur:** Tanya-jawab AI interaktif berbasis konteks dokumen akademis mahasiswa.

### 2. 🎓 SIAK & Moodle Scraping & Sync Engine
* **Tabel:** `public.siak_accounts`, `public.siak_schedules`, `public.siak_grades`, `public.siak_exams`, `public.moodle_courses`, `public.moodle_assignments`.
* **Skill:** Otomasi sinkronisasi jadwal kuliah, tugas, nilai IPK/KHS, dan jadwal ujian secara real-time.

### 3. ✉️ AI Moodle Excuse Letter Generator (`public.moodle_excuse_letters`)
* **Skill:** AI Prompt Engineering khusus untuk men-generate surat izin sakit / dispensasi kuliah formal otomatis yang terintegrasi dengan penugasan Moodle.

### 4. 📅 Smart Task & Calendar Auto-Scheduler (`public.tasks`, `public.calendar_events`, `public.scheduling_preferences`)
* **Skill:** Algoritma penjadwalan pintar yang menyusun to-do list tugas kuliah ke dalam slot kosong kalender pengguna sesuai preferensi jam produktif.

### 5. 💳 SaaS Subscriptions & User Session Management (`public.subscriptions`, `public.user_usages`, `public.user_sessions`)
* **Skill:** Multi-tier SaaS model (Free vs Pro limits), pelacakan kuota pemakaian AI token per user, dan rate limiting.
