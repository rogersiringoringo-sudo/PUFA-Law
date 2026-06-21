# Laporan QA — PUFA Law

**Target:** https://pufa-law.vercel.app/
**Tanggal pengujian:** 21 Juni 2026
**Penguji:** QA Engineer (Claude — Playwright + Sequential Thinking)
**Stack terdeteksi:** Next.js 15 (App Router, RSC) · Prisma · Supabase · NextAuth · Tailwind · Vercel
**Metode:** Pengujian black-box pada live site + verifikasi root-cause pada source code

---

## 0. ✅ Status Perbaikan (Update — 21 Juni 2026)

Seluruh temuan telah **diperbaiki di kode** dan **diverifikasi** melalui build produksi
(`npm run build` ✓), `typecheck` ✓, `lint` ✓, serta pengujian ulang pada server produksi
lokal dengan Playwright. Perbaikan **belum di-deploy** — perlu commit + push agar tampil di
`pufa-law.vercel.app`.

| # | Temuan | Perbaikan | File utama | Verifikasi |
|---|---|---|---|---|
| BUG-01 | sitemap/robots → localhost | Resolusi URL self-heal: abaikan localhost di Vercel, fallback ke `VERCEL_PROJECT_PRODUCTION_URL` | `src/lib/config.ts` | ✅ Simulasi 4 env |
| BUG-02 | favicon 404 | Tambah `app/icon.svg` (auto-registrasi) | `src/app/icon.svg` | ✅ `<link rel=icon>` ada |
| BUG-03 | detail berita stub | Konten asli + fallback seed (tanpa operasi DB) | `src/lib/content.ts`, `src/lib/data.ts` | ✅ 4–5 paragraf, stub hilang |
| BUG-04 | dua `<h1>` di detail | `PageHero titleAs` + judul jadi satu-satunya `h1` | `PageHero.tsx`, `news/[slug]/page.tsx` | ✅ h1Count = 1 |
| BUG-05 | item gallery mati | Lightbox modal (klik, Esc, backdrop, a11y) | `GalleryGrid.tsx` | ✅ Buka & tutup OK |
| BUG-06 | pesan validasi usang | `noValidate` + reset error saat input | `ContactForm.tsx` | ✅ |
| WARN-02 | tidak ada og:image | `app/opengraph-image.tsx` (next/og) | `src/app/opengraph-image.tsx` | ✅ og+twitter image |
| WARN-03 | tidak ada canonical | `alternates.canonical` per halaman | semua `(site)` pages | ✅ |
| WARN-04 | tidak ada twitter card | `twitter.card = summary_large_image` | `layout.tsx`, detail | ✅ |
| UX-01/SEC-02 | email admin ter-prefill | Hapus `defaultValue` + autocomplete | `LoginForm.tsx` | ✅ value kosong |
| UX-02 | "Lihat Dokumentasi" → kontak | Event selesai → `/gallery` | `EventCard.tsx` | ✅ |
| UX-03 | urutan hero mobile | Hapus `order-first` → headline dulu | `(site)/page.tsx` | ✅ headline di atas |
| UX-04 | pesan tidak wajib | Validasi server `message` wajib | `actions/contact.ts` | ✅ "Mohon tuliskan pesan" |
| UX-05 | validasi native Inggris | `noValidate` + pesan Indonesia | `ContactForm.tsx` | ✅ tanpa popup native |
| UX-06 | form sukses buntu | Tombol "Kirim Pesan Lain" (reset via key) | `ContactForm.tsx` | ✅ |
| UX-08 | 404 tanpa navigasi | Navbar + Footer di `not-found` | `app/not-found.tsx` | ✅ nav + footer |
| SEC-01 | tanpa anti-spam | Honeypot `company` + diam-diam sukses | `ContactForm.tsx`, `actions/contact.ts` | ✅ field tersembunyi |
| SEC-03 | tanpa rate-limit login | Limiter sliding-window (5×/15 mnt) | `src/lib/rate-limit.ts`, `actions/auth.ts` | ✅ kode |

**Catatan deploy:**
- **Tidak ada migrasi/penulisan DB yang diperlukan** — konten berita disajikan via seed fallback; kolom DB yang diedit admin tetap diprioritaskan. (Opsional: jalankan `npm run db:seed` saat kredensial DB tersedia untuk mempersistenkan konten ke kolom `Article.content` — ini **menghapus** tabel `Message`, jadi backup inbox dulu.)
- **Disarankan** tetap set `NEXT_PUBLIC_SITE_URL` di Vercel ke domain final; namun kini situs tetap benar walau env tsb keliru (self-heal).

**Belum diperbaiki (keputusan desain, bukan bug):**
- **UX-07** (tidak ada foto asli) — situs sengaja memakai gradient/inisial. Komponen `MediaBox`/`ImageUpload` sudah siap memakai foto via `next/image` bila admin mengunggahnya.

---

## 1. Ringkasan Eksekutif

Aplikasi **stabil secara teknis**: tidak ada error JavaScript / hydration di console pada seluruh halaman (satu-satunya error runtime adalah `favicon.ico` 404). Layout responsif solid (tidak ada horizontal-overflow di mobile), navigasi berfungsi, form kontak & login bekerja, dan route admin terproteksi dengan benar.

Namun ditemukan **1 bug SEO berdampak tinggi** (sitemap & robots menunjuk ke `localhost:3000`), **konten berita yang masih stub**, beberapa **masalah aksesibilitas/SEO**, dan sejumlah **isu UX & keamanan ringan** (email admin ter-prefill, tidak ada proteksi spam pada form).

### Skor per area

| Area | Status | Catatan |
|---|---|---|
| Fungsionalitas inti | 🟢 Baik | Navigasi, tabs, filter, form, auth berfungsi |
| Stabilitas (console) | 🟢 Baik | 0 error JS; hanya favicon 404 |
| Responsif / Mobile | 🟢 Baik | Tidak ada overflow; menu hamburger OK |
| SEO / Metadata | 🔴 Bermasalah | sitemap/robots → localhost, no canonical, no og:image |
| Konten | 🟠 Perlu perbaikan | Semua artikel berita masih stub |
| Aksesibilitas | 🟠 Perlu perbaikan | Multi-`h1`, affordance palsu |
| Keamanan | 🟡 Cukup | Route terproteksi; tapi email admin bocor & tanpa rate-limit |

### Rekapitulasi temuan

| Severity | Jumlah |
|---|---|
| 🔴 High | 1 |
| 🟠 Medium | 3 |
| 🟡 Low | 2 |
| 🔵 UX | 8 |
| 🔐 Security | 3 |

---

## 2. Cakupan Pengujian

| Halaman / Fitur | Diuji | Hasil |
|---|---|---|
| `/` Home (desktop + mobile) | ✅ | OK (catatan urutan hero di mobile) |
| `/about` | ✅ | OK |
| `/events` + tab kepanitiaan (PanitiaTabs) | ✅ | OK — tab interaktif berfungsi |
| `/gallery` + filter + klik item | ✅ | Filter OK; klik item tidak berfungsi |
| `/team` | ✅ | OK |
| `/news` (listing) | ✅ | OK |
| `/news/[slug]` (detail) | ✅ | Render OK, tapi konten stub |
| `/news/<slug-invalid>` (404) | ✅ | Custom 404 muncul |
| `/contact` + form (validasi & submit) | ✅ | Validasi & happy-path OK |
| `/login` (kredensial salah) | ✅ | Error handling OK |
| `/admin`, `/admin/users` (proteksi) | ✅ | Redirect ke login (terproteksi) |
| `robots.txt`, `sitemap.xml` | ✅ | Bermasalah (localhost) |
| Menu hamburger mobile | ✅ | OK |
| Console errors / network | ✅ | Hanya favicon 404 |

Screenshot tersimpan di root proyek: `qa-01-home-full.png` … `qa-14-events-mobile.png`.

---

## 3. 🐞 BUGS

### BUG-01 🔴 HIGH — `sitemap.xml` & `robots.txt` menunjuk ke `http://localhost:3000`
**Lokasi:** `/sitemap.xml`, `/robots.txt` · sumber: `src/app/sitemap.ts`, `src/app/robots.ts`, `src/lib/config.ts`

Seluruh URL di sitemap dan baris `Sitemap:` di robots.txt menggunakan domain **`http://localhost:3000`**, bukan domain produksi.

```
# robots.txt (live)
Sitemap: http://localhost:3000/sitemap.xml

# sitemap.xml (live)
<loc>http://localhost:3000</loc>
<loc>http://localhost:3000/about</loc>
...
```

**Root cause:** `siteConfig.url = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pufalaw.id"`. Karena fallback adalah `pufalaw.id` (bukan localhost), berarti env var **`NEXT_PUBLIC_SITE_URL` di Vercel sengaja/keliru di-set ke `http://localhost:3000`** (kemungkinan ter-copy dari `.env` lokal). Nilai yang sama dipakai sebagai `metadataBase` di `src/app/layout.tsx`, sehingga **canonical & OG absolute URL juga akan salah**.

**Dampak:** Search engine tidak dapat menemukan/meng-crawl sitemap yang valid; URL yang di-index salah; sharing OG rusak. Dampak SEO besar.

**Langkah reproduksi:**
1. Buka `https://pufa-law.vercel.app/robots.txt` dan `https://pufa-law.vercel.app/sitemap.xml`.
2. Perhatikan semua `<loc>` = `http://localhost:3000/...`.

**Rekomendasi:** Set env var di Vercel `NEXT_PUBLIC_SITE_URL=https://pufa-law.vercel.app` (atau domain final, mis. `https://pufalaw.id`), lalu redeploy. Pertimbangkan memakai `VERCEL_PROJECT_PRODUCTION_URL` sebagai fallback otomatis agar tidak bergantung pada nilai manual.

---

### BUG-02 🟠 MEDIUM — `favicon.ico` 404 di setiap halaman
**Lokasi:** seluruh halaman · sumber: `src/app/layout.tsx` (tidak ada `metadata.icons`)

Console error muncul di setiap halaman:
```
[ERROR] Failed to load resource: the server responded with a status of 404 () @ /favicon.ico
```
Tidak ada `<link rel="icon">` di `<head>` (dicek via DOM: `favicon: null`).

**Dampak:** Tidak ada ikon di tab browser/bookmark; error 404 di console; kesan kurang profesional.

**Rekomendasi:** Tambahkan `src/app/icon.png` (atau `favicon.ico` di `src/app/`) — Next.js App Router otomatis mendaftarkannya. Atau set `metadata.icons` di `layout.tsx`.

---

### BUG-03 🟠 MEDIUM — Semua halaman detail berita hanya berisi stub
**Lokasi:** `/news/[slug]` · sumber: `src/app/(site)/news/[slug]/page.tsx:78-85`, data `lib/data`

Setiap artikel hanya menampilkan **excerpt** lalu placeholder:
> "Isi artikel lengkap akan segera tersedia. Untuk informasi lebih lanjut, silakan hubungi tim PUFA Law melalui halaman kontak."

Penyebab: field `content` `undefined` untuk **semua** artikel (data seed hanya punya excerpt). Tombol "Baca Selengkapnya" dari listing → halaman tanpa isi.

**Dampak:** Fitur berita praktis tidak memberi nilai bagi pengunjung; buruk untuk SEO (thin content) dan kredibilitas.

**Langkah reproduksi:** Buka berita mana pun, mis. `/news/persiapan-gala-night-pufa-law-2026-telah-dimulai`.

**Rekomendasi:** Isi field `content` melalui admin (CMS sudah ada di `/admin/news`), atau sembunyikan halaman detail sampai konten tersedia. Lihat screenshot `qa-07-news-detail-full.png`.

---

### BUG-04 🟠 MEDIUM — Dua `<h1>` di halaman detail berita & hero menampilkan kategori, bukan judul
**Lokasi:** `/news/[slug]` · sumber: `PageHero.tsx:19` + `news/[slug]/page.tsx:54,67`

`PageHero` merender `<h1>` berisi **kategori** ("Hukum"), lalu body artikel merender `<h1>` kedua berisi **judul** artikel. Akibatnya:
- Ada **2 elemen `<h1>`** dalam satu halaman (pelanggaran aksesibilitas/SEO — idealnya satu `h1`).
- `h1` hero yang paling besar menampilkan kategori, bukan judul artikel — membingungkan secara hirarki.

**Rekomendasi:** Jadikan hanya satu `h1` (judul artikel). Buat `PageHero` menerima prop `as`/heading level, atau ubah heading hero menjadi `<p>`/`<span>` pada halaman detail.

> Catatan: di halaman lain (Home, About, Events, dst.) jumlah `h1` sudah benar (=1). Masalah ini spesifik halaman detail berita.

---

### BUG-05 🟡 LOW — Item gallery tampak bisa diklik tapi tidak melakukan apa-apa
**Lokasi:** `/gallery` · sumber: `src/components/site/GalleryGrid.tsx:41-55`

Setiap item gallery memakai `cursor-pointer` + efek `hover:scale-[1.02]` + shadow (affordance kuat bahwa item bisa diklik / membuka lightbox), namun **tidak ada `onClick`** dan tidak ada modal/lightbox. Klik tidak menghasilkan aksi apa pun.

**Langkah reproduksi:** `/gallery` → klik kartu mana pun → tidak terjadi apa-apa.

**Rekomendasi:** Tambahkan lightbox/modal pembesaran gambar, atau hapus `cursor-pointer`/efek hover-scale agar tidak memberi sinyal interaksi palsu.

---

### BUG-06 🟡 LOW — Pesan validasi usang (stale) pada form kontak
**Lokasi:** `/contact` · sumber: `ContactForm.tsx` (`useActionState`) + input `type="email"`

Skenario: setelah submit kosong (muncul "Mohon isi nama dan email terlebih dahulu."), lalu isi **Nama** + email **tidak valid** dan submit lagi. Validasi native browser (`type="email"`) memblok submit (server action tidak jalan), sehingga pesan error lama **tetap tampil** padahal Nama sudah diisi → pesan jadi menyesatkan.

**Rekomendasi:** Reset/clear `state` error saat input berubah, atau samakan strategi validasi (lihat UX-04/UX-05).

---

## 4. ⚠️ WARNINGS (Metadata / SEO konfigurasi)

| Kode | Temuan | Dampak |
|---|---|---|
| WARN-01 | `metadataBase` resolve ke `http://localhost:3000` (akar yang sama dengan BUG-01) | Canonical & OG absolute URL akan salah |
| WARN-02 | Tidak ada `og:image` (dicek: `ogImage: null`) | Share ke WA/LinkedIn/Twitter tanpa gambar preview |
| WARN-03 | Tidak ada `<link rel="canonical">` di halaman | Risiko duplikasi URL di index |
| WARN-04 | Tidak ada `og:image` per-artikel & `twitter:card` | Preview sosial minim |

Sisi positif: `lang="id"` ✅, `<title>` + template ✅, `meta description` ✅, `og:title`/`og:siteName` ✅, `viewport` ✅.

---

## 5. 🎨 UX ISSUES

**UX-01 — Email admin ter-prefill di form login.** `/login` mengisi otomatis `admin@pufalaw.id` (`LoginForm.tsx:37 defaultValue`). Membocorkan akun admin valid (lihat juga SEC-02) dan memaksa user lain menghapusnya dulu. *Rekomendasi: hapus `defaultValue`.*

**UX-02 — Tombol "LIHAT DOKUMENTASI" mengarah ke `/contact`.** Di `/events`, event yang sudah "Selesai" punya tombol "Lihat Dokumentasi" tetapi link-nya ke halaman kontak, bukan ke gallery/dokumentasi. Menyesatkan. *Rekomendasi: arahkan ke `/gallery` atau halaman dokumentasi event terkait.*

**UX-03 — Urutan hero terbalik di mobile.** Pada viewport mobile, panel **Statistik** muncul **di atas** judul utama "THE GOLDEN HOUR COLLECTION" (lihat `qa-12-home-mobile.png`). Hirarki visual terbalik — headline utama seharusnya tampil lebih dulu. *Rekomendasi: atur urutan dengan `order-*` Tailwind agar headline di atas pada mobile.*

**UX-04 — Field "Pesan" tidak wajib.** Server action `submitMessage` hanya memvalidasi `name` + `email` (`actions/contact.ts:25`). User bisa mengirim pesan kontak dengan body kosong → entri tidak berguna di inbox admin. *Rekomendasi: jadikan `message` wajib (client + server).*

**UX-05 — Pesan validasi native berbahasa Inggris.** Pada situs berbahasa Indonesia, validasi email native menampilkan *"Please include an '@' in the email address…"*. Inkonsistensi bahasa. *Rekomendasi: gunakan validasi kustom berbahasa Indonesia + `noValidate` pada form.*

**UX-06 — Form kontak hilang setelah sukses.** Setelah sukses, seluruh form diganti pesan "Terima kasih" tanpa opsi mengirim pesan lain selain refresh halaman. *Rekomendasi: tambahkan tombol "Kirim pesan lain".*

**UX-07 — Tidak ada gambar asli di seluruh situs.** Semua "gambar" (hero, kartu, gallery, avatar tim) adalah blok gradient/inisial (0 elemen `<img>`). Untuk organisasi nyata, ini mengurangi kepercayaan & daya tarik. *Rekomendasi (jika bukan keputusan desain final): tambahkan foto nyata via `next/image` (komponen `MediaBox`/`ImageUpload` sudah disiapkan).*

**UX-08 — Halaman 404 tanpa navigasi situs.** Custom 404 hanya menampilkan teks + tombol "Kembali ke Beranda", tanpa navbar/footer (lihat `qa-08-news-404.png`). *Rekomendasi: sertakan navbar/footer agar user bisa berpindah halaman.*

---

## 6. 🔐 Observasi Keamanan

**Positif**
- ✅ Route admin terproteksi: `/admin` & `/admin/users` me-redirect (307) ke `/login?callbackUrl=…` saat belum login.
- ✅ Pesan error login generik ("Email atau password salah.") — tidak membocorkan field mana yang salah.
- ✅ `robots.txt` melarang `/admin`, `/login`, `/api`.

**Perlu perhatian**
- 🔐 **SEC-01 — Tidak ada proteksi anti-spam pada form kontak.** Form menulis langsung ke tabel `Message` (Prisma) tanpa CAPTCHA/honeypot/rate-limit. Berisiko flooding inbox admin & DB. *Rekomendasi: tambahkan honeypot + rate-limit (mis. per-IP) atau CAPTCHA.*
- 🔐 **SEC-02 — Email admin terekspos** (lihat UX-01). Dikombinasikan dengan tidak adanya rate-limit login, mempermudah brute-force. *Rekomendasi: hapus prefill + tambahkan rate-limit/lockout pada login.*
- 🔐 **SEC-03 — Tidak ada indikasi rate-limit pada login.** Tidak terlihat pembatasan percobaan login. *Rekomendasi: batasi percobaan per akun/IP.*

> Catatan: pengujian dilakukan tanpa kredensial valid (tidak ada percobaan bypass auth). Temuan di atas berbasis perilaku yang teramati + review kode publik.

---

## 7. ✅ Hal yang Sudah Baik

- **Stabilitas runtime:** 0 error JS / warning hydration di seluruh halaman.
- **Responsif:** Tidak ada horizontal overflow di mobile (370px); menu hamburger beranimasi & berfungsi.
- **Interaktivitas:** Tab kepanitiaan (`/events`) dan filter kategori (`/gallery`) berfungsi benar.
- **Form kontak (happy path):** Validasi server + penyimpanan ke DB + pesan sukses bekerja.
- **Proteksi route admin & auth** berjalan sesuai harapan.
- **Performa:** RSC prefetch otomatis untuk link navigasi; font dioptimasi (`next/font`).
- **Semantik & i18n dasar:** `lang="id"`, struktur heading/landmark (nav/main/footer) rapi, breadcrumb konsisten.

---

## 8. Rekomendasi Prioritas (Action Items)

| Prioritas | Item | Referensi |
|---|---|---|
| 🔴 P0 | Set `NEXT_PUBLIC_SITE_URL` ke domain produksi di Vercel + redeploy | BUG-01, WARN-01..04 |
| 🟠 P1 | Isi konten artikel berita (atau sembunyikan detail) | BUG-03 |
| 🟠 P1 | Tambahkan favicon / `metadata.icons` | BUG-02 |
| 🟠 P1 | Perbaiki struktur heading detail berita (satu `h1` = judul) | BUG-04 |
| 🟠 P1 | Tambah proteksi anti-spam form kontak + rate-limit login | SEC-01, SEC-03 |
| 🟡 P2 | Hapus prefill email admin | UX-01, SEC-02 |
| 🟡 P2 | Lightbox gallery atau hapus affordance klik | BUG-05 |
| 🟡 P2 | Tambah `og:image` + canonical | WARN-02, WARN-03 |
| 🔵 P3 | Perbaiki link "Lihat Dokumentasi", urutan hero mobile, validasi pesan/i18n, 404 chrome, gambar asli | UX-02..08 |

---

## 9. Lampiran — Daftar Screenshot

| File | Deskripsi |
|---|---|
| `qa-01-home-full.png` | Home (desktop, full page) |
| `qa-02-about-full.png` | About |
| `qa-03-events-full.png` | Events |
| `qa-04-gallery-full.png` | Gallery |
| `qa-05-team-full.png` | Team |
| `qa-06-news-full.png` | News listing |
| `qa-07-news-detail-full.png` | News detail (stub content) |
| `qa-08-news-404.png` | Halaman 404 |
| `qa-09-contact-full.png` | Contact |
| `qa-10-contact-success.png` | Contact — sukses kirim |
| `qa-11-login.png` | Login (email admin ter-prefill) |
| `qa-12-home-mobile.png` | Home mobile (urutan hero) |
| `qa-13-mobile-menu.png` | Menu hamburger mobile |
| `qa-14-events-mobile.png` | Events mobile |

---
*Dihasilkan melalui pengujian otomatis dengan Playwright (Chromium) + analisis Sequential Thinking. Catatan: 1 pesan uji bertanda `[QA AUTOMATED TEST]` telah terkirim ke inbox kontak saat menguji happy-path form — silakan hapus dari `/admin/contact`.*
