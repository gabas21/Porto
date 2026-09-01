# 🧪 Skill: Playwright E2E Multi-Device Testing Suite

Framework pengujian otomatis end-to-end yang menguji website di berbagai viewport dan browser engine secara paralel (Chromium Desktop & Mobile Pixel 7).

---

## 🛠️ Stack & Perintah
```bash
# Menjalankan seluruh pengujian otomatis
npx playwright test

# Membuka antarmuka visual test runner
npm run test:ui
```

---

## 💡 Apa yang Diuji:
1. **Visual Preloader:** Memastikan intro multi-bahasa selesai dan membuka tirai konten tanpa macet.
2. **Responsive Header & Branding:** Memvalidasi bahwa logo muncul di semua ukuran layar dan tombol hamburger muncul di mobile.
3. **DOM Content Hydration:** Memverifikasi seluruh section (Hero, Bio, Experience, Tech Arsenal, Works, Footer) ter-load dengan benar saat scrolling.
4. **Token-Efficiency:** Menggunakan accessibility trees & lightweight snapshots sehingga AI tidak boros token saat melakukan validasi antarmuka.
