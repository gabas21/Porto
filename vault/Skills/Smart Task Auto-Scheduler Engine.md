# 📅 Skill: Smart Task Auto-Scheduler Engine

Algoritma cerdas yang menganalisis daftar tugas kuliah (`public.tasks`), batas waktu pengumpulan (*due date*), estimasi lama pengerjaan, dan preferensi jam produktif pengguna (`public.scheduling_preferences`) untuk secara otomatis menempatkan sesi pengerjaan ke dalam slot kosong di kalender (`public.calendar_events`).

---

## 💡 Fitur Utama:
1. **Conflict Avoidance:** Memeriksa jadwal kuliah SIAK yang sudah ada dan tidak menjadwalkan tugas di jam kuliah aktif.
2. **Buffer Time Protection:** Memberikan jeda istirahat (misal: 15-30 menit) di antara sesi pengerjaan tugas.
3. **Priority & Urgency Scoring:** Tugas dengan deadline paling dekat dan bobot SKS tinggi diprioritaskan terlebih dahulu.

---

## 🎯 Kapan Menggunakan di Proyek Baru:
- Aplikasi produktivitas, Time Management App, atau AI Calendar Assistant.
