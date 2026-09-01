# 🎬 GPT Taste & Advanced GSAP Motion Engineering

Standar teknik animasi dan interaksi berbasis **GSAP (GreenSock)** dan **Framer Motion / Motion.dev**.

---

## ⚡ 4 Pilar Motion Kelas Atas:

### 1. Spring Physics vs Linear Transitions
Jangan pernah menggunakan animasi linear untuk interaksi mouse. Selalu gunakan kurva fisika pegas:
* `stiffness: 300 - 400`
* `damping: 25 - 35`
* `mass: 0.8`

### 2. Scroll-Triggered Pinning & Scrubbing
* **Section Pinning:** Menahan posisi section saat scroll untuk memperlihatkan animasi transisi bertahap (*storytelling experience*).
* **Parallax Depth:** Menggerakkan elemen latar belakang lebih lambat daripada elemen depan untuk menciptakan ilusi kedalaman 3D.

### 3. Staggered Text & Card Reveals
* Munculnya teks per kata atau per huruf menggunakan `opacity: 0, y: 20` ➔ `opacity: 1, y: 0` dengan jeda *stagger* 0.05s per item.

### 4. GPU-Accelerated Hardware Performance
* Hanya gunakan animasi pada properti `transform` (`translate3d`, `scale`, `rotate`) dan `opacity` untuk menghindari browser repaint / layout reflow.
