"use server";

import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { TAGS } from "@/lib/cache-tags";

export type ContactState = { ok: boolean; error?: string } | null;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Server Action form kontak — menyimpan pesan ke tabel Message.
 * Dipakai dengan `useActionState` di komponen client.
 */
export async function submitMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot anti-spam: field tersembunyi yang hanya diisi bot.
  // Pura-pura sukses agar bot tidak tahu telah diblokir, tanpa menulis ke DB.
  // Dicatat ke log agar potensi false-positive (mis. autofill) bisa ditelusuri,
  // jadi tidak benar-benar "silent".
  const honeypot = String(formData.get("company") ?? "").trim();
  if (honeypot) {
    const email = String(formData.get("email") ?? "").trim();
    console.warn(`[contact] honeypot terisi — pesan diabaikan${email ? ` (email: ${email})` : ""}`);
    return { ok: true };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const purpose = String(formData.get("purpose") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email) return { ok: false, error: "Mohon isi nama dan email terlebih dahulu." };
  if (!EMAIL_RE.test(email)) return { ok: false, error: "Format email tidak valid." };
  if (!message) return { ok: false, error: "Mohon tuliskan pesan Anda." };

  try {
    await prisma.message.create({
      data: {
        name,
        email,
        phone: phone || null,
        purpose: purpose || "Pertanyaan Umum",
        message,
        status: "Belum Dibaca",
      },
    });
  } catch {
    return { ok: false, error: "Terjadi kesalahan. Coba lagi nanti." };
  }

  // Inbox admin (Fase 3) akan menampilkan pesan baru.
  revalidateTag(TAGS.messages);
  return { ok: true };
}
