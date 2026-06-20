/**
 * Konfigurasi situs tingkat-aplikasi (statis, bukan konten yang diedit admin).
 * Konten yang bisa diedit admin ada di `lib/data` (Fase 1: seed, Fase 2: DB).
 */
export const siteConfig = {
  name: "PUFA Law",
  tagline: "Excellence in Law",
  description:
    "Organisasi hukum terkemuka yang menghadirkan pengalaman eksklusif dan pelayanan profesional untuk setiap kebutuhan hukum Anda.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://pufalaw.id",
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
