# 🎬 Skill: Multi-Language Cinematic Preloader

Animasi tirai pembuka website dengan siklus ucapan salam yang merefleksikan identitas daerah (Kutai, Dayak, Nusantara) sebelum menampilkan Hero section.

---

## 🛠️ Stack / Dependencies
```bash
npm install motion
```

---

## 📋 Daftar Salam yang Diterapkan:
1. **`Tabe' Pun`** — Kutai (Kalimantan Timur)
2. **`Adil Ka' Talino`** — Dayak (Kalimantan)
3. **`Sampurasun`** — Nusantara
4. **`Selamat Datang`** — Bagas Aditya Portfolio

---

## ⚡ Formula Timing & Efek Transisi:
* **Pergantian Kata:** `750ms` per kata.
* **Hold Akhir:** `1000ms` sebelum tirai terangkat ke atas.
* **Motion Effect:** Slide vertikal (`y: 16 -> 0 -> -16`) dipadukan dengan blur filter (`filter: blur(8px) -> blur(0px) -> blur(8px)`).
* **Exit Curtain:** `y: "-100%"` dengan cubic-bezier `[0.76, 0, 0.24, 1]`.
