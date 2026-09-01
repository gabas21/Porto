# 🎓 Skill: SIAK Academic Schedule Sync & Scraping Engine

Modul otomasi yang menghubungkan akun portal akademik kampus (`public.siak_accounts`) untuk mengekstrak dan menyinkronkan data perkuliahan mahasiswa secara terstruktur ke dalam database.

---

## 📊 Data yang Disinkronkan:
1. **Jadwal Kuliah Mingguan (`public.siak_schedules`):** Hari, jam mulai, jam selesai, mata kuliah, dosen, dan ruang kelas.
2. **Histori Nilai & KHS (`public.siak_grades`):** Nilai huruf (A, B, C), bobot angka, SKS, dan total IPK semester.
3. **Jadwal Ujian (`public.siak_exams`):** Tanggal, sesi, dan ruang ujian UTS / UAS.

---

## 🎯 Kapan Menggunakan di Proyek Baru:
- Aplikasi portal mahasiswa, bot notifikasi jadwal via WhatsApp/Telegram, atau integrasi kampus.
