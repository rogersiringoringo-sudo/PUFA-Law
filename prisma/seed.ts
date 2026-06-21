import { PrismaClient } from "@prisma/client";
import * as c from "../src/lib/content";
import { hashPassword } from "../src/lib/password";

const prisma = new PrismaClient();

/**
 * Seed database dari satu sumber konten (`src/lib/content.ts`).
 * Idempoten: menghapus data lama lalu menulis ulang, jadi aman dijalankan berulang.
 */
async function main() {
  console.log("🌱 Seeding PUFA Law database...");

  // Hapus dalam urutan aman-FK (anak dulu, lalu induk).
  await prisma.message.deleteMany();
  await prisma.formOption.deleteMany();
  await prisma.contactInfo.deleteMany();
  await prisma.aboutValue.deleteMany();
  await prisma.timelineItem.deleteMany();
  await prisma.aboutContent.deleteMany();
  await prisma.article.deleteMany();
  await prisma.newsFeatured.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.teamFeatured.deleteMany();
  await prisma.galleryFilter.deleteMany();
  await prisma.galleryItem.deleteMany();
  await prisma.panitia.deleteMany();
  await prisma.event.deleteMany();
  await prisma.homeContent.deleteMany();
  await prisma.siteSettings.deleteMany();

  // --- Settings ---
  await prisma.siteSettings.create({ data: { id: 1, ...c.siteSettings } });

  // --- Home (stats di-flatten) ---
  const [s1, s2, s3] = c.homeContent.stats;
  await prisma.homeContent.create({
    data: {
      id: 1,
      eyebrow: c.homeContent.eyebrow,
      title: c.homeContent.title,
      sub: c.homeContent.sub,
      btn1: c.homeContent.btn1,
      btn2: c.homeContent.btn2,
      stat1num: s1.num,
      stat1label: s1.label,
      stat2num: s2.num,
      stat2label: s2.label,
      stat3num: s3.num,
      stat3label: s3.label,
      ctaEyebrow: c.homeContent.ctaEyebrow,
      ctaTitle: c.homeContent.ctaTitle,
      ctaDesc: c.homeContent.ctaDesc,
      ctaBtn: c.homeContent.ctaBtn,
    },
  });

  // --- About (+ values, timeline) ---
  await prisma.aboutContent.create({
    data: {
      id: 1,
      badgeNum: c.aboutContent.badgeNum,
      badgeLabel: c.aboutContent.badgeLabel,
      quote: c.aboutContent.quote,
      para1: c.aboutContent.para1,
      para2: c.aboutContent.para2,
      values: { create: c.aboutContent.values.map((v, i) => ({ name: v.name, desc: v.desc, order: i })) },
      timeline: { create: c.aboutContent.timeline.map((t, i) => ({ year: t.year, desc: t.desc, order: i })) },
    },
  });

  // --- Events ---
  await prisma.event.createMany({
    data: c.events.map((e, i) => ({
      name: e.name,
      date: e.date,
      time: e.time,
      location: e.location,
      category: e.category,
      status: e.status,
      desc: e.desc,
      btn: e.btn,
      order: i,
    })),
  });

  // --- Panitia ---
  await prisma.panitia.createMany({
    data: c.panitia.map((p, i) => ({
      name: p.name,
      role: p.role,
      division: p.division,
      event: p.event,
      order: i,
    })),
  });

  // --- Gallery + filters ---
  await prisma.galleryItem.createMany({
    data: c.gallery.map((g, i) => ({
      title: g.title,
      category: g.category,
      bg: g.bg,
      label: g.label,
      order: i,
    })),
  });
  await prisma.galleryFilter.createMany({
    data: c.galleryFilters.map((name, i) => ({ name, order: i })),
  });

  // --- Team ---
  await prisma.teamFeatured.create({
    data: {
      id: 1,
      name: c.teamContent.featured.name,
      role: c.teamContent.featured.role,
      bio: c.teamContent.featured.bio,
    },
  });
  await prisma.teamMember.createMany({
    data: c.teamContent.members.map((m, i) => ({
      name: m.name,
      role: m.role,
      dept: m.dept,
      status: m.status,
      order: i,
    })),
  });

  // --- News ---
  // `content` featured tidak punya kolom DB (disajikan via seed fallback), jadi
  // hanya field yang ada di skema yang ditulis.
  const { content: _featuredContent, ...featuredData } = c.newsContent.featured;
  void _featuredContent;
  await prisma.newsFeatured.create({ data: { id: 1, ...featuredData } });
  await prisma.article.createMany({
    data: c.newsContent.articles.map((a, i) => ({
      slug: a.slug,
      title: a.title,
      category: a.category,
      author: a.author,
      date: a.date,
      status: a.status,
      excerpt: a.excerpt,
      content: a.content ?? null,
      bg: a.bg,
      label: a.label,
      order: i,
    })),
  });

  // --- Contact (+ form options) ---
  await prisma.contactInfo.create({
    data: {
      id: 1,
      tagline: c.contactInfo.tagline,
      desc: c.contactInfo.desc,
      address: c.contactInfo.address,
      phone: c.contactInfo.phone,
      email: c.contactInfo.email,
      hours: c.contactInfo.hours,
      formOptions: { create: c.contactInfo.formOptions.map((label, i) => ({ label, order: i })) },
    },
  });

  // --- Messages (contoh inbox) ---
  await prisma.message.createMany({
    data: c.messages.map((m) => ({
      name: m.name,
      email: m.email,
      purpose: m.purpose,
      message: m.msg,
      status: m.status,
    })),
  });

  // --- Admin user (upsert: tidak menimpa password yang sudah diubah) ---
  await prisma.adminUser.upsert({
    where: { email: "admin@pufalaw.id" },
    update: {},
    create: {
      email: "admin@pufalaw.id",
      name: "Super Admin",
      role: "Super Admin",
      passwordHash: await hashPassword("pufalaw2026"),
    },
  });

  console.log("✅ Seed selesai.");
}

main()
  .catch((e) => {
    console.error("❌ Seed gagal:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
