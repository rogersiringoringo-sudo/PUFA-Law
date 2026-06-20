/**
 * Tipe konten PUFA Law — sumber kebenaran tunggal untuk situs publik & admin.
 * Diturunkan dari struktur data lama di `legacy/data.js`.
 * Di Fase 2 model Prisma akan mengikuti bentuk ini.
 */

export interface HomeContent {
  eyebrow: string;
  /** Pakai "|" untuk pemisah baris; bagian ke-2 ditampilkan italic emas. */
  title: string;
  sub: string;
  btn1: string;
  btn2: string;
  stats: { num: string; label: string }[];
  ctaEyebrow: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaBtn: string;
}

export interface AboutValue {
  name: string;
  desc: string;
}

export interface TimelineItem {
  year: string;
  desc: string;
}

export interface AboutContent {
  badgeNum: string;
  badgeLabel: string;
  quote: string;
  para1: string;
  para2: string;
  values: AboutValue[];
  timeline: TimelineItem[];
}

export type EventStatus = "Upcoming" | "Selesai";

export interface EventItem {
  id: number;
  name: string;
  date: string; // ISO yyyy-mm-dd
  time: string;
  location: string;
  category: string;
  status: EventStatus;
  desc: string;
  btn: string;
  imageUrl?: string | null;
}

export interface Panitia {
  id: number;
  name: string;
  role: string;
  division: string;
  event: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  category: string;
  /** Gradient CSS fallback saat belum ada foto asli. */
  bg: string;
  label: string;
  imageUrl?: string | null;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  dept: string;
  status: "Aktif" | "Tidak Aktif";
  imageUrl?: string | null;
}

export interface TeamContent {
  featured: {
    name: string;
    role: string;
    bio: string;
    imageUrl?: string | null;
  };
  members: TeamMember[];
}

export type ArticleStatus = "Published" | "Draft";

export interface Article {
  id: number;
  slug: string;
  title: string;
  category: string;
  author: string;
  date: string; // ISO
  status: ArticleStatus;
  excerpt: string;
  content?: string;
  bg: string;
  label: string;
  imageUrl?: string | null;
}

export interface NewsContent {
  featured: {
    title: string;
    category: string;
    author: string;
    date: string;
    readtime: string;
    excerpt: string;
  };
  articles: Article[];
}

export interface ContactInfo {
  tagline: string;
  desc: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  formOptions: string[];
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  emailUtama: string;
  whatsapp: string;
  copyright: string;
  footerDesc: string;
  footerRight: string;
}

export interface Message {
  id: number;
  name: string;
  email: string;
  purpose: string;
  date: string;
  status: "Belum Dibaca" | "Dibaca";
  msg: string;
}
