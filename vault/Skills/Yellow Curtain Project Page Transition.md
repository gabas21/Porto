# 🎬 Skill: Yellow Curtain Project Page Transition

Animasi transisi halaman bergaya *agency/award-winning* menggunakan tirai kuning emas (`#FACC15`) yang meluncur menutup layar penuh saat pengguna mengklik kartu proyek, menampilkan judul proyek dalam tipografi tebal, lalu membuka lembaran studi kasus mendalam (*Case Study Deep Dive*).

---

## 🛠️ Stack / Dependencies
```bash
npm install motion
```

---

## 💡 Konsep Kerja & Formula
1. **Trigger:** Saat pengguna mengklik salah satu kartu proyek di `WorksHoverList`.
2. **Phase 1 (Sweep In):** Tirai kuning (`bg-[#FACC15]`) meluncur dari bawah ke atas (`y: "100%" -> "0%"`) dengan cubic-bezier `[0.76, 0, 0.24, 1]`.
3. **Phase 2 (Content Swap):** Selama layar tertutup kuning, judul proyek dan kategori ditampilkan di tengah layar, dan komponen `ProjectDeepDive` di-mount ke DOM di latar belakang.
4. **Phase 3 (Sweep Out):** Tirai kuning meluncur keluar ke atas (`y: "0%" -> "-100%"`) untuk mengungkap halaman detail studi kasus.
5. **Phase 4 (Reverse on Back):** Saat tombol *"Kembali ke Portofolio"* diklik, alur tirai kuning kembali memicu transisi halus ke halaman depan.

---

## 🎯 Kapan Menggunakan di Proyek Baru:
- Transisi antar halaman portofolio, detail produk e-commerce, atau modal case study.
