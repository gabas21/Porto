# 🔄 Redesign Workflow & Audit Checklist
> *Panduan audit dan peningkatan visual saat user ingin mendesain ulang (redesign) website.*

---

## 🔍 Tahap 1: Audit Visual Awal (Pre-Flight Check)
Sebelum menyentuh kode, periksa kekurangan berikut:
- [ ] **Warna Murah/Default:** Apakah ada warna jenuh tanpa nuansa HSL?
- [ ] **Tipografi Generic:** Apakah masih menggunakan font default browser tanpa hierarki jelas?
- [ ] **Cards Tumpuk (Card-in-Card):** Apakah terlalu banyak nesting kotak yang tidak perlu?
- [ ] **Ketiadaan Micro-Motion:** Apakah tombol dan kartu terasa mati / kaku saat di-hover?
- [ ] **Layout Patah di Mobile:** Apakah navbar atau grid overflow di layar HP?

---

## 🚀 Tahap 2: Transformasi 4 Langkah (Upgrade Phase)
1. **Perbaiki Design System (`globals.css`):**
   * Terapkan palet warna HSL dari [[High-End Visual Design & Agency Standards]].
   * Pasang Google Font premium (Inter, Space Grotesk, Syne).
2. **Upgrade Navbar:**
   * Pasang [[Glassmorphism Morphing Nav]] untuk tampilan melayang premium.
3. **Tambahkan Interaksi Kunci:**
   * Terapkan [[Hover Image Reveal]] pada daftar kartu/karya.
4. **Validasi E2E:**
   * Jalankan [[Playwright E2E Suite]] untuk memastikan tidak ada fitur lama yang rusak.
