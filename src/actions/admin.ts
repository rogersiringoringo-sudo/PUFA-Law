"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";
import { hashPassword } from "@/lib/password";
import { slugify } from "@/lib/utils";
import { TAGS } from "@/lib/cache-tags";
import type { ActionState } from "@/components/admin/ui";

// ===== Helpers =====
const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();
const num = (fd: FormData, k: string) => Number(fd.get(k) ?? 0);

/** Bust cache publik (tag) + segarkan halaman admin. */
function bump(tag: string, adminPath: string) {
  revalidateTag(tag);
  revalidatePath(adminPath);
}

async function withGuard<T>(fn: () => Promise<T>): Promise<ActionState> {
  await requireAdmin();
  try {
    await fn();
    return { ok: true };
  } catch (e) {
    console.error(e);
    return { error: "Gagal menyimpan. Coba lagi." };
  }
}

// ===== HOME (singleton) =====
export async function saveHome(_p: ActionState, fd: FormData): Promise<ActionState> {
  return withGuard(async () => {
    await prisma.homeContent.update({
      where: { id: 1 },
      data: {
        eyebrow: str(fd, "eyebrow"),
        title: str(fd, "title"),
        sub: str(fd, "sub"),
        btn1: str(fd, "btn1"),
        btn2: str(fd, "btn2"),
        stat1num: str(fd, "stat1num"),
        stat1label: str(fd, "stat1label"),
        stat2num: str(fd, "stat2num"),
        stat2label: str(fd, "stat2label"),
        stat3num: str(fd, "stat3num"),
        stat3label: str(fd, "stat3label"),
        ctaEyebrow: str(fd, "ctaEyebrow"),
        ctaTitle: str(fd, "ctaTitle"),
        ctaDesc: str(fd, "ctaDesc"),
        ctaBtn: str(fd, "ctaBtn"),
      },
    });
    bump(TAGS.home, "/admin/home");
  });
}

// ===== ABOUT (singleton + values + timeline) =====
export async function saveAbout(_p: ActionState, fd: FormData): Promise<ActionState> {
  return withGuard(async () => {
    await prisma.aboutContent.update({
      where: { id: 1 },
      data: {
        badgeNum: str(fd, "badgeNum"),
        badgeLabel: str(fd, "badgeLabel"),
        quote: str(fd, "quote"),
        para1: str(fd, "para1"),
        para2: str(fd, "para2"),
      },
    });
    bump(TAGS.about, "/admin/about");
  });
}

export async function addAboutValue(fd: FormData) {
  await requireAdmin();
  const max = await prisma.aboutValue.aggregate({ _max: { order: true } });
  await prisma.aboutValue.create({
    data: { name: str(fd, "name"), desc: str(fd, "desc"), order: (max._max.order ?? 0) + 1, aboutId: 1 },
  });
  bump(TAGS.about, "/admin/about");
}
export async function updateAboutValue(fd: FormData) {
  await requireAdmin();
  await prisma.aboutValue.update({
    where: { id: num(fd, "id") },
    data: { name: str(fd, "name"), desc: str(fd, "desc") },
  });
  bump(TAGS.about, "/admin/about");
}
export async function deleteAboutValue(fd: FormData) {
  await requireAdmin();
  await prisma.aboutValue.delete({ where: { id: num(fd, "id") } });
  bump(TAGS.about, "/admin/about");
}

export async function addTimelineItem(fd: FormData) {
  await requireAdmin();
  const max = await prisma.timelineItem.aggregate({ _max: { order: true } });
  await prisma.timelineItem.create({
    data: { year: str(fd, "year"), desc: str(fd, "desc"), order: (max._max.order ?? 0) + 1, aboutId: 1 },
  });
  bump(TAGS.about, "/admin/about");
}
export async function updateTimelineItem(fd: FormData) {
  await requireAdmin();
  await prisma.timelineItem.update({
    where: { id: num(fd, "id") },
    data: { year: str(fd, "year"), desc: str(fd, "desc") },
  });
  bump(TAGS.about, "/admin/about");
}
export async function deleteTimelineItem(fd: FormData) {
  await requireAdmin();
  await prisma.timelineItem.delete({ where: { id: num(fd, "id") } });
  bump(TAGS.about, "/admin/about");
}

// ===== EVENTS =====
function eventData(fd: FormData) {
  return {
    name: str(fd, "name"),
    date: str(fd, "date"),
    time: str(fd, "time"),
    location: str(fd, "location"),
    category: str(fd, "category"),
    status: str(fd, "status") || "Upcoming",
    desc: str(fd, "desc"),
    btn: str(fd, "btn") || "DAFTAR SEKARANG",
    imageUrl: str(fd, "imageUrl") || null,
  };
}
export async function createEvent(fd: FormData) {
  await requireAdmin();
  const max = await prisma.event.aggregate({ _max: { order: true } });
  await prisma.event.create({ data: { ...eventData(fd), order: (max._max.order ?? 0) + 1 } });
  bump(TAGS.events, "/admin/events");
}
export async function updateEvent(fd: FormData) {
  await requireAdmin();
  await prisma.event.update({ where: { id: num(fd, "id") }, data: eventData(fd) });
  bump(TAGS.events, "/admin/events");
}
export async function deleteEvent(fd: FormData) {
  await requireAdmin();
  await prisma.event.delete({ where: { id: num(fd, "id") } });
  bump(TAGS.events, "/admin/events");
}

// ===== PANITIA =====
export async function createPanitia(fd: FormData) {
  await requireAdmin();
  const max = await prisma.panitia.aggregate({ _max: { order: true } });
  await prisma.panitia.create({
    data: {
      name: str(fd, "name"),
      role: str(fd, "role"),
      division: str(fd, "division"),
      event: str(fd, "event"),
      order: (max._max.order ?? 0) + 1,
    },
  });
  bump(TAGS.panitia, "/admin/events");
}
export async function deletePanitia(fd: FormData) {
  await requireAdmin();
  await prisma.panitia.delete({ where: { id: num(fd, "id") } });
  bump(TAGS.panitia, "/admin/events");
}

// ===== GALLERY =====
export async function createGalleryItem(fd: FormData) {
  await requireAdmin();
  const max = await prisma.galleryItem.aggregate({ _max: { order: true } });
  const category = str(fd, "category");
  await prisma.galleryItem.create({
    data: {
      title: str(fd, "title"),
      category,
      bg: str(fd, "bg") || "linear-gradient(135deg,#8B1A2B,#C9A84C)",
      label: (str(fd, "label") || category).toUpperCase(),
      imageUrl: str(fd, "imageUrl") || null,
      order: (max._max.order ?? 0) + 1,
    },
  });
  bump(TAGS.gallery, "/admin/gallery");
}
export async function updateGalleryItem(fd: FormData) {
  await requireAdmin();
  const category = str(fd, "category");
  await prisma.galleryItem.update({
    where: { id: num(fd, "id") },
    data: {
      title: str(fd, "title"),
      category,
      label: (str(fd, "label") || category).toUpperCase(),
      imageUrl: str(fd, "imageUrl") || null,
    },
  });
  bump(TAGS.gallery, "/admin/gallery");
}
export async function deleteGalleryItem(fd: FormData) {
  await requireAdmin();
  await prisma.galleryItem.delete({ where: { id: num(fd, "id") } });
  bump(TAGS.gallery, "/admin/gallery");
}
export async function createFilter(fd: FormData) {
  await requireAdmin();
  const max = await prisma.galleryFilter.aggregate({ _max: { order: true } });
  await prisma.galleryFilter.create({ data: { name: str(fd, "name"), order: (max._max.order ?? 0) + 1 } });
  bump(TAGS.gallery, "/admin/gallery");
}
export async function deleteFilter(fd: FormData) {
  await requireAdmin();
  await prisma.galleryFilter.delete({ where: { id: num(fd, "id") } });
  bump(TAGS.gallery, "/admin/gallery");
}

// ===== TEAM =====
export async function saveTeamFeatured(_p: ActionState, fd: FormData): Promise<ActionState> {
  return withGuard(async () => {
    await prisma.teamFeatured.update({
      where: { id: 1 },
      data: {
        name: str(fd, "name"),
        role: str(fd, "role"),
        bio: str(fd, "bio"),
        imageUrl: str(fd, "imageUrl") || null,
      },
    });
    bump(TAGS.team, "/admin/team");
  });
}
function memberData(fd: FormData) {
  return {
    name: str(fd, "name"),
    role: str(fd, "role"),
    dept: str(fd, "dept"),
    status: str(fd, "status") || "Aktif",
    imageUrl: str(fd, "imageUrl") || null,
  };
}
export async function createTeamMember(fd: FormData) {
  await requireAdmin();
  const max = await prisma.teamMember.aggregate({ _max: { order: true } });
  await prisma.teamMember.create({ data: { ...memberData(fd), order: (max._max.order ?? 0) + 1 } });
  bump(TAGS.team, "/admin/team");
}
export async function updateTeamMember(fd: FormData) {
  await requireAdmin();
  await prisma.teamMember.update({ where: { id: num(fd, "id") }, data: memberData(fd) });
  bump(TAGS.team, "/admin/team");
}
export async function deleteTeamMember(fd: FormData) {
  await requireAdmin();
  await prisma.teamMember.delete({ where: { id: num(fd, "id") } });
  bump(TAGS.team, "/admin/team");
}

// ===== NEWS =====
export async function saveNewsFeatured(_p: ActionState, fd: FormData): Promise<ActionState> {
  return withGuard(async () => {
    await prisma.newsFeatured.update({
      where: { id: 1 },
      data: {
        title: str(fd, "title"),
        category: str(fd, "category"),
        author: str(fd, "author"),
        date: str(fd, "date"),
        readtime: str(fd, "readtime"),
        excerpt: str(fd, "excerpt"),
      },
    });
    bump(TAGS.news, "/admin/news");
  });
}
export async function createArticle(fd: FormData) {
  await requireAdmin();
  const max = await prisma.article.aggregate({ _max: { order: true } });
  const title = str(fd, "title");
  const category = str(fd, "category");
  await prisma.article.create({
    data: {
      slug: slugify(title) || `artikel-${Date.now()}`,
      title,
      category,
      author: str(fd, "author") || "Admin",
      date: str(fd, "date") || new Date().toISOString().split("T")[0],
      status: str(fd, "status") || "Published",
      excerpt: str(fd, "excerpt"),
      content: str(fd, "content") || null,
      imageUrl: str(fd, "imageUrl") || null,
      bg: "linear-gradient(135deg,#f0e8d0,#C9A84C)",
      label: category.toUpperCase(),
      order: (max._max.order ?? 0) + 1,
    },
  });
  bump(TAGS.news, "/admin/news");
}
export async function updateArticle(fd: FormData) {
  await requireAdmin();
  const title = str(fd, "title");
  const category = str(fd, "category");
  await prisma.article.update({
    where: { id: num(fd, "id") },
    data: {
      title,
      slug: slugify(title) || undefined,
      category,
      author: str(fd, "author"),
      date: str(fd, "date"),
      status: str(fd, "status"),
      excerpt: str(fd, "excerpt"),
      content: str(fd, "content") || null,
      imageUrl: str(fd, "imageUrl") || null,
      label: category.toUpperCase(),
    },
  });
  bump(TAGS.news, "/admin/news");
}
export async function deleteArticle(fd: FormData) {
  await requireAdmin();
  await prisma.article.delete({ where: { id: num(fd, "id") } });
  bump(TAGS.news, "/admin/news");
}

// ===== CONTACT =====
export async function saveContactInfo(_p: ActionState, fd: FormData): Promise<ActionState> {
  return withGuard(async () => {
    await prisma.contactInfo.update({
      where: { id: 1 },
      data: {
        tagline: str(fd, "tagline"),
        desc: str(fd, "desc"),
        address: str(fd, "address"),
        phone: str(fd, "phone"),
        email: str(fd, "email"),
        hours: str(fd, "hours"),
      },
    });
    bump(TAGS.contact, "/admin/contact");
  });
}
export async function createFormOption(fd: FormData) {
  await requireAdmin();
  const max = await prisma.formOption.aggregate({ _max: { order: true } });
  await prisma.formOption.create({
    data: { label: str(fd, "label"), order: (max._max.order ?? 0) + 1, contactId: 1 },
  });
  bump(TAGS.contact, "/admin/contact");
}
export async function deleteFormOption(fd: FormData) {
  await requireAdmin();
  await prisma.formOption.delete({ where: { id: num(fd, "id") } });
  bump(TAGS.contact, "/admin/contact");
}

// ===== MESSAGES =====
export async function markMessageRead(fd: FormData) {
  await requireAdmin();
  await prisma.message.update({ where: { id: num(fd, "id") }, data: { status: "Dibaca" } });
  revalidatePath("/admin/contact");
}
export async function deleteMessage(fd: FormData) {
  await requireAdmin();
  await prisma.message.delete({ where: { id: num(fd, "id") } });
  revalidatePath("/admin/contact");
}

// ===== SETTINGS =====
export async function saveSettings(_p: ActionState, fd: FormData): Promise<ActionState> {
  return withGuard(async () => {
    await prisma.siteSettings.update({
      where: { id: 1 },
      data: {
        siteName: str(fd, "siteName"),
        tagline: str(fd, "tagline"),
        emailUtama: str(fd, "emailUtama"),
        whatsapp: str(fd, "whatsapp"),
        copyright: str(fd, "copyright"),
        footerDesc: str(fd, "footerDesc"),
        footerRight: str(fd, "footerRight"),
      },
    });
    revalidateTag(TAGS.settings);
    revalidatePath("/admin/settings");
  });
}

// ===== ADMIN USERS =====
export async function createAdminUser(_p: ActionState, fd: FormData): Promise<ActionState> {
  await requireAdmin();
  const email = str(fd, "email").toLowerCase();
  const name = str(fd, "name");
  const password = str(fd, "password");
  if (!email || !name || password.length < 6) {
    return { error: "Nama, email, dan password (min. 6 karakter) wajib diisi." };
  }
  const exists = await prisma.adminUser.findUnique({ where: { email } });
  if (exists) return { error: "Email sudah terdaftar." };
  try {
    await prisma.adminUser.create({
      data: { email, name, role: str(fd, "role") || "Editor", passwordHash: await hashPassword(password) },
    });
    revalidatePath("/admin/users");
    return { ok: true };
  } catch {
    return { error: "Gagal menambah admin." };
  }
}
export async function deleteAdminUser(fd: FormData) {
  await requireAdmin();
  // Jangan hapus admin terakhir.
  const count = await prisma.adminUser.count();
  if (count > 1) await prisma.adminUser.delete({ where: { id: num(fd, "id") } });
  revalidatePath("/admin/users");
}
export async function changePassword(_p: ActionState, fd: FormData): Promise<ActionState> {
  const me = await requireAdmin();
  const password = str(fd, "password");
  if (password.length < 6) return { error: "Password minimal 6 karakter." };
  try {
    await prisma.adminUser.update({
      where: { id: Number(me.id) },
      data: { passwordHash: await hashPassword(password) },
    });
    return { ok: true };
  } catch {
    return { error: "Gagal mengubah password." };
  }
}
