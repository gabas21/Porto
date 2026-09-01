# ✨ Skill: Hover Image Reveal with Spring Physics

Saat kursor mouse melintasi item daftar (misalnya daftar proyek atau portofolio), gambar preview melayang muncul seketika dan mengikuti gerakan mouse dengan inersia pegas yang lembut.

---

## 🛠️ Stack / Dependencies
```bash
npm install motion
```

---

## 💡 Konsep Kerja & Formula
1. **Mouse Tracker:** Simpan posisi koordinat `(clientX, clientY)` saat `onMouseMove`.
2. **Spring Physics (`useSpring`):** Mengubah koordinat mentah menjadi nilai ber-interpolasi pegas (`stiffness: 250, damping: 25`) agar tidak kaku.
3. **AnimatePresence:** Menangani transisi fade in/scale saat mouse masuk (`onMouseEnter`) dan keluar (`onMouseLeave`).

---

## 🎯 Kapan Menggunakan:
- List Featured Works / Portofolio.
- Editorial blog table of contents.
- Menu navigasi interaktif.
