/**
 * Tag cache untuk on-demand revalidation.
 * Halaman publik membaca data lewat `unstable_cache` dengan tag ini;
 * Server Action admin (Fase 3) memanggil `revalidateTag(TAGS.x)` setelah edit
 * agar perubahan langsung tampil tanpa rebuild.
 */
export const TAGS = {
  home: "home",
  about: "about",
  events: "events",
  panitia: "panitia",
  gallery: "gallery",
  team: "team",
  news: "news",
  contact: "contact",
  settings: "settings",
  messages: "messages",
} as const;

export type CacheTag = (typeof TAGS)[keyof typeof TAGS];
