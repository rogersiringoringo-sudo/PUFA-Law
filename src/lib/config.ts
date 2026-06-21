/**
 * Konfigurasi situs tingkat-aplikasi (statis, bukan konten yang diedit admin).
 * Konten yang bisa diedit admin ada di `lib/data` (Fase 1: seed, Fase 2: DB).
 */

/**
 * URL kanonik situs untuk metadata, sitemap, dan robots.
 *
 * Urutan prioritas:
 * 1. `NEXT_PUBLIC_SITE_URL` — selama BUKAN localhost saat berjalan di Vercel.
 *    (Mencegah bug: env var keliru di-set ke `http://localhost:3000` di produksi
 *    membuat sitemap/robots/OG menunjuk ke localhost.)
 * 2. Domain produksi Vercel (`VERCEL_PROJECT_PRODUCTION_URL`) — self-heal di prod.
 * 3. URL deploy Vercel saat ini (`VERCEL_URL`) — untuk preview deployment.
 * 4. Nilai eksplisit apa adanya, atau `http://localhost:3000` untuk dev.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  const onVercel = Boolean(process.env.VERCEL);
  const isLocalhost = (u?: string) => !!u && /localhost|127\.0\.0\.1|0\.0\.0\.0/.test(u);

  if (explicit && !(onVercel && isLocalhost(explicit))) return explicit;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return explicit || "http://localhost:3000";
}

export const siteConfig = {
  name: "PUFA Law",
  tagline: "Excellence in Law",
  description:
    "Organisasi hukum terkemuka yang menghadirkan pengalaman eksklusif dan pelayanan profesional untuk setiap kebutuhan hukum Anda.",
  url: resolveSiteUrl(),
} as const;

/** Item navigasi utama — dipakai Navbar & Footer. */
export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/team", label: "Team" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
] as const;
