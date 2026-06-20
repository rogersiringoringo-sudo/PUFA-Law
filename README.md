# PUFA Law

Website resmi **PUFA Law** — situs publik + panel admin (CMS) yang bisa mengedit
seluruh konten tanpa menyentuh kode. Dibangun ulang dari situs HTML statis lama
(masih tersimpan di `legacy/`) menjadi aplikasi **Next.js** modern.

## Tech stack

| Bagian          | Teknologi                                                   |
| --------------- | ----------------------------------------------------------- |
| Framework       | Next.js 15 (App Router, Server Components, Server Actions)   |
| Bahasa          | TypeScript                                                   |
| Styling         | Tailwind CSS v4                                              |
| Database/ORM    | Prisma + PostgreSQL (Supabase)                              |
| Autentikasi     | Auth.js v5 (Credentials + JWT, password bcrypt)             |
| Upload foto     | Supabase Storage (bucket publik)                            |
| Deploy          | Vercel                                                       |

## Struktur singkat

```
src/
  app/(site)/      Halaman publik (Home, About, Events, Gallery, Team, News, Contact)
  app/admin/       Panel admin (di-guard middleware) — CRUD semua konten
  app/login/       Halaman login admin
  actions/         Server Actions (admin CRUD, kontak, upload)
  lib/             data (baca konten), prisma, auth-guard, supabase, dsb.
  components/      UI publik (site/) & admin (admin/)
prisma/
  schema.prisma    Model data (PostgreSQL/Supabase)
  seed.ts          Seed konten awal dari src/lib/content.ts
legacy/            Situs HTML lama (arsip, tidak dipakai runtime)
```

## Menjalankan secara lokal

Prasyarat: Node.js 18+.

Database produksi (Supabase Postgres `pufa-law`) sudah dibuat, di-migrate, dan
di-seed. Untuk menjalankan lokal cukup isi kredensialnya:

```bash
# 1) Install dependency
npm install

# 2) Isi .env (lihat .env.example). Yang wajib diisi:
#   - DATABASE_URL & DIRECT_URL → ganti [PASSWORD] dengan DB password
#     (Supabase → project pufa-law → Connect / Settings → Database)
#   - SUPABASE_SERVICE_ROLE_KEY  → Settings → API → service_role (rahasia)
#   - AUTH_SECRET, NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
#     sudah terisi di .env

# 3) Jalankan
npm run dev            # http://localhost:3000
```

> Skema sudah ada di cloud. `npm run db:push` hanya diperlukan bila kamu mengubah
> `schema.prisma`; `npm run db:seed` bila ingin reset konten ke data awal.

### Akun admin default (hasil seed)

- URL: `http://localhost:3000/login`
- Email: `admin@pufalaw.id`
- Password: `pufalaw2026`

> Segera ganti password lewat **Admin → Users** setelah login pertama.
> Semua route `/admin/*` diproteksi `middleware.ts` → redirect ke `/login`.

## Mengedit konten

Login → panel admin menyediakan editor untuk Home, About, Events (+ panitia),
Gallery (+ filter), Team, News, Contact (+ inbox pesan), Settings, dan Users.
Setiap simpan memicu `revalidateTag`, jadi perubahan langsung tampil di situs publik.

## Upload foto (Supabase Storage)

Form editor Events, Gallery, News, dan Team punya komponen **Upload Foto** yang
mengunggah ke **Supabase Storage** (bucket publik `pufa-media`, sudah dibuat:
limit 5MB, hanya gambar). Foto disimpan sebagai public URL pada field `imageUrl`.

Yang dibutuhkan agar tombol upload aktif: `SUPABASE_SERVICE_ROLE_KEY` terisi di
`.env` (dipakai server action, bypass RLS). `NEXT_PUBLIC_SUPABASE_URL` & anon key
sudah terisi, dan host `*.supabase.co` sudah diizinkan di `next.config.ts` untuk
`next/image`. Bila service_role belum diisi, tombol upload menampilkan pesan ramah
dan situs tetap memakai gradient + label sebagai fallback.

## Skrip npm

| Skrip               | Fungsi                                          |
| ------------------- | ----------------------------------------------- |
| `npm run dev`       | Server dev                                       |
| `npm run build`     | `prisma generate` + build produksi               |
| `npm start`         | Jalankan hasil build                             |
| `npm run lint`      | ESLint                                           |
| `npm run typecheck` | `tsc --noEmit`                                   |
| `npm run db:push`   | Sinkron skema ke DB (tanpa file migrasi)         |
| `npm run db:seed`   | Isi/reset data awal                              |
| `npm run db:reset`  | Drop + buat ulang skema lalu seed                |
| `npm run db:studio` | Prisma Studio (GUI database)                     |

## Deploy ke Vercel

Database Supabase (`pufa-law`) + bucket storage sudah siap, jadi tinggal:

1. **Set env di Vercel** (Project Settings → Environment Variables) — sama seperti
   `.env`:
   - `DATABASE_URL` → Transaction pooler Supabase (port `6543`, `?pgbouncer=true`)
   - `DIRECT_URL` → Session pooler (port `5432`)
   - `AUTH_SECRET`, `NEXT_PUBLIC_SITE_URL` (set ke domain produksi)
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
     `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_STORAGE_BUCKET`
2. **Deploy**: import repo ke Vercel. Build command `npm run build` sudah
   menjalankan `prisma generate`. Skema & seed tidak perlu dijalankan ulang
   (sudah ada di cloud).

> Keamanan: semua tabel mengaktifkan RLS tanpa policy → REST API publik Supabase
> tertutup; aplikasi mengakses data hanya lewat Prisma (koneksi langsung).
> Catatan serverless: Auth.js v5 butuh `trustHost: true` (sudah diset di
> `auth.config.ts`) agar callback URL benar di produksi.
