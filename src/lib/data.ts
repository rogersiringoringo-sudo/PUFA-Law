/**
 * Data-access layer — SATU-SATUNYA pintu baca konten untuk UI.
 *
 * Sekarang (Fase 2): query ke database lewat Prisma, dibungkus `unstable_cache`
 * dengan tag agar bisa di-revalidate on-demand saat admin mengedit (Fase 3).
 * Signature fungsi TIDAK berubah dari Fase 1, jadi halaman tidak perlu diubah.
 *
 * Singleton konten punya fallback ke seed (`lib/content`) agar situs tetap tampil
 * walau DB belum di-seed.
 */
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import { TAGS } from "@/lib/cache-tags";
import * as seed from "@/lib/content";
import type {
  AboutContent,
  Article,
  ArticleStatus,
  ContactInfo,
  EventItem,
  EventStatus,
  GalleryItem,
  HomeContent,
  NewsContent,
  Panitia,
  SiteSettings,
  TeamContent,
  TeamMember,
} from "@/types/content";

const REVALIDATE = 300; // detik — fallback bila tidak ada revalidate manual

export const getHome = unstable_cache(
  async (): Promise<HomeContent> => {
    const h = await prisma.homeContent.findUnique({ where: { id: 1 } });
    if (!h) return seed.homeContent;
    return {
      eyebrow: h.eyebrow,
      title: h.title,
      sub: h.sub,
      btn1: h.btn1,
      btn2: h.btn2,
      stats: [
        { num: h.stat1num, label: h.stat1label },
        { num: h.stat2num, label: h.stat2label },
        { num: h.stat3num, label: h.stat3label },
      ],
      ctaEyebrow: h.ctaEyebrow,
      ctaTitle: h.ctaTitle,
      ctaDesc: h.ctaDesc,
      ctaBtn: h.ctaBtn,
    };
  },
  ["home"],
  { tags: [TAGS.home], revalidate: REVALIDATE },
);

export const getAbout = unstable_cache(
  async (): Promise<AboutContent> => {
    const a = await prisma.aboutContent.findUnique({
      where: { id: 1 },
      include: {
        values: { orderBy: { order: "asc" } },
        timeline: { orderBy: { order: "asc" } },
      },
    });
    if (!a) return seed.aboutContent;
    return {
      badgeNum: a.badgeNum,
      badgeLabel: a.badgeLabel,
      quote: a.quote,
      para1: a.para1,
      para2: a.para2,
      values: a.values.map((v) => ({ name: v.name, desc: v.desc })),
      timeline: a.timeline.map((t) => ({ year: t.year, desc: t.desc })),
    };
  },
  ["about"],
  { tags: [TAGS.about], revalidate: REVALIDATE },
);

export const getEvents = unstable_cache(
  async (): Promise<EventItem[]> => {
    const rows = await prisma.event.findMany({ orderBy: [{ order: "asc" }, { date: "asc" }] });
    return rows.map((e) => ({
      id: e.id,
      name: e.name,
      date: e.date,
      time: e.time,
      location: e.location,
      category: e.category,
      status: e.status as EventStatus,
      desc: e.desc,
      btn: e.btn,
      imageUrl: e.imageUrl,
    }));
  },
  ["events"],
  { tags: [TAGS.events], revalidate: REVALIDATE },
);

export const getPanitia = unstable_cache(
  async (): Promise<Panitia[]> => {
    const rows = await prisma.panitia.findMany({ orderBy: { order: "asc" } });
    return rows.map((p) => ({
      id: p.id,
      name: p.name,
      role: p.role,
      division: p.division,
      event: p.event,
    }));
  },
  ["panitia"],
  { tags: [TAGS.panitia], revalidate: REVALIDATE },
);

export const getGallery = unstable_cache(
  async (): Promise<{ items: GalleryItem[]; filters: string[] }> => {
    const [items, filters] = await Promise.all([
      prisma.galleryItem.findMany({ orderBy: { order: "asc" } }),
      prisma.galleryFilter.findMany({ orderBy: { order: "asc" } }),
    ]);
    return {
      items: items.map((g) => ({
        id: g.id,
        title: g.title,
        category: g.category,
        bg: g.bg,
        label: g.label,
        imageUrl: g.imageUrl,
      })),
      filters: filters.map((f) => f.name),
    };
  },
  ["gallery"],
  { tags: [TAGS.gallery], revalidate: REVALIDATE },
);

export const getTeam = unstable_cache(
  async (): Promise<TeamContent> => {
    const [featured, members] = await Promise.all([
      prisma.teamFeatured.findUnique({ where: { id: 1 } }),
      prisma.teamMember.findMany({ orderBy: { order: "asc" } }),
    ]);
    return {
      featured: featured
        ? { name: featured.name, role: featured.role, bio: featured.bio, imageUrl: featured.imageUrl }
        : seed.teamContent.featured,
      members: members.map(
        (m): TeamMember => ({
          id: m.id,
          name: m.name,
          role: m.role,
          dept: m.dept,
          status: m.status as TeamMember["status"],
          imageUrl: m.imageUrl,
        }),
      ),
    };
  },
  ["team"],
  { tags: [TAGS.team], revalidate: REVALIDATE },
);

function mapArticle(a: {
  id: number;
  slug: string;
  title: string;
  category: string;
  author: string;
  date: string;
  status: string;
  excerpt: string;
  content: string | null;
  bg: string;
  label: string;
  imageUrl: string | null;
}): Article {
  return {
    id: a.id,
    slug: a.slug,
    title: a.title,
    category: a.category,
    author: a.author,
    date: a.date,
    status: a.status as ArticleStatus,
    excerpt: a.excerpt,
    content: a.content ?? undefined,
    bg: a.bg,
    label: a.label,
    imageUrl: a.imageUrl,
  };
}

export const getNews = unstable_cache(
  async (): Promise<NewsContent> => {
    const [featured, articles] = await Promise.all([
      prisma.newsFeatured.findUnique({ where: { id: 1 } }),
      prisma.article.findMany({ orderBy: { order: "asc" } }),
    ]);
    return {
      featured: featured
        ? {
            title: featured.title,
            category: featured.category,
            author: featured.author,
            date: featured.date,
            readtime: featured.readtime,
            excerpt: featured.excerpt,
          }
        : seed.newsContent.featured,
      articles: articles.map(mapArticle),
    };
  },
  ["news"],
  { tags: [TAGS.news], revalidate: REVALIDATE },
);

export const getArticleBySlug = unstable_cache(
  async (slug: string): Promise<Article | undefined> => {
    const a = await prisma.article.findUnique({ where: { slug } });
    return a ? mapArticle(a) : undefined;
  },
  ["article-by-slug"],
  { tags: [TAGS.news], revalidate: REVALIDATE },
);

export const getContact = unstable_cache(
  async (): Promise<ContactInfo> => {
    const c = await prisma.contactInfo.findUnique({
      where: { id: 1 },
      include: { formOptions: { orderBy: { order: "asc" } } },
    });
    if (!c) return seed.contactInfo;
    return {
      tagline: c.tagline,
      desc: c.desc,
      address: c.address,
      phone: c.phone,
      email: c.email,
      hours: c.hours,
      formOptions: c.formOptions.map((o) => o.label),
    };
  },
  ["contact"],
  { tags: [TAGS.contact], revalidate: REVALIDATE },
);

export const getSettings = unstable_cache(
  async (): Promise<SiteSettings> => {
    const s = await prisma.siteSettings.findUnique({ where: { id: 1 } });
    return s ?? seed.siteSettings;
  },
  ["settings"],
  { tags: [TAGS.settings], revalidate: REVALIDATE },
);
