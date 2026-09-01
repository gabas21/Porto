# Live Iframe Embed — Secure Portfolio Integration Plan

Menampilkan aplikasi Motion AI secara **live dan interaktif langsung di dalam modal studi kasus portofolio**, dengan keamanan CSP yang tepat agar tidak rentan terhadap serangan clickjacking.

---

## Open Questions

> [!IMPORTANT]
> **Sebelum eksekusi, konfirmasi dua hal berikut:**
>
> 1. **URL portofolio Anda saat di-deploy ke Vercel adalah apa?**
>    Contoh: `https://gabas21.vercel.app` atau `https://portfolio-gabas.vercel.app`
>    _(Diperlukan untuk whitelist CSP agar iframe hanya tampil dari domain portofolio Anda)_
>
> 2. **Apakah folder `motion/` ada di komputer lokal Anda?**
>    _(Kita perlu edit `next.config.mjs` dan push ke GitHub agar Vercel re-deploy Motion)_

---

## Gambaran Masalah

| Masalah | Penyebab |
|---|---|
| iframe Motion error "menolak terhubung" | Vercel + Next.js default kirim `X-Frame-Options: SAMEORIGIN` |
| StackBlitz "Unable to run Embedded Project" | Butuh COOP/COEP headers khusus di server host |

---

## Proposed Changes

### Bagian 1 — Repo `gabas21/motion`

#### [MODIFY] `frontend/next.config.mjs`

Tambahkan blok `headers()` di dalam `nextConfig` untuk mengizinkan iframe **hanya** dari domain portofolio:

```js
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "frame-ancestors 'self'",
              "https://<PORTO_DOMAIN>.vercel.app",
              "http://localhost:3005",
              "http://localhost:3000",
            ].join(' '),
          },
        ],
      },
    ];
  },
};

export default withPWA(nextConfig);
```

#### [MODIFY] `frontend/vercel.json`

Tambahkan entry header CSP global agar Vercel tidak override config Next.js:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "frame-ancestors 'self' https://<PORTO_DOMAIN>.vercel.app http://localhost:3005"
        }
      ]
    }
  ]
}
```

---

### Bagian 2 — Repo `porto` (di sini)

#### [MODIFY] [`ProjectDeepDive.tsx`](file:///c:/laragon/www/porto/components/ProjectDeepDive.tsx)

Aktifkan live iframe sebagai tampilan **default** dengan:
- Auto-fallback ke screenshot jika iframe gagal (`onError`)
- Loading spinner saat memuat
- Toggle manual Live ↔ Screenshot tetap tersedia

#### [MODIFY] [`next.config.ts`](file:///c:/laragon/www/porto/next.config.ts)

Tambahkan COOP header agar portofolio bisa menghosting iframe cross-origin dengan aman:

```ts
async headers() {
  return [{
    source: '/(.*)',
    headers: [
      { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
    ],
  }];
}
```

---

## Urutan Eksekusi

```
1. [ANDA] Konfirmasi URL portofolio Vercel + akses folder motion/ lokal
       ↓
2. [SAYA] Tulis kode next.config.mjs & vercel.json untuk repo motion
       ↓
3. [ANDA] Copy → paste → commit → push ke gabas21/motion
       ↓  Vercel auto-deploy (~1-2 menit)
4. [SAYA] Aktifkan live iframe di ProjectDeepDive.tsx + next.config.ts porto
       ↓
5. [SAYA] npm run build + verifikasi
       ↓
6. [ANDA] Push portofolio ke GitHub & deploy Vercel
```

---

## Verification Plan

### Automated
- `npm run build` pada portofolio setelah perubahan `next.config.ts` dan `ProjectDeepDive.tsx`

### Manual
- Modal proyek Motion → iframe harus langsung muncul live tanpa error
- DevTools → Network → Response Headers → cek `Content-Security-Policy` pada response dari `motion-liard-seven.vercel.app`
- Buka `motion-liard-seven.vercel.app` dari domain lain → harus tetap diblokir (keamanan terjaga)
