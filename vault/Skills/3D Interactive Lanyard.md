# 🕹️ Skill: 3D Interactive Physics Lanyard

Menampilkan kartu identitas / nametag 3D yang memiliki tali elastis, bisa di-drag dengan mouse, dan berayun mengikuti gravitasi serta gerakan kursor.

---

## 🛠️ Stack / Dependencies
```bash
npm install three @types/three @react-three/fiber @react-three/drei @react-three/rapier meshline
```

---

## 💡 Konsep Kerja & Formula Fisika
1. **Canvas R3F:** Menyiapkan viewport WebGL responsif.
2. **RigidBody & Joints (Rapier):** Menggunakan `sphericalJoint` berantai untuk mensimulasikan segmen-segmen tali elastis.
3. **MeshLine:** Menggambar tali poligon 3D mulus yang melacak posisi tiap simpul joint secara dinamis per frame (`useFrame`).
4. **Drag Interaction:** Menggunakan pointer events untuk menerapkan impulse gaya saat pengguna menarik kartu.

---

## 🚀 Kapan Menggunakan Skill Ini:
- Hero section portfolio untuk memberi kesan *high-end tech* & *creative developer*.
- Event badge / digital ticket preview.
