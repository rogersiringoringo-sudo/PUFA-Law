"use server";

import { requireAdmin } from "@/lib/auth-guard";
import { supabaseAdmin, STORAGE_BUCKET, isStorageConfigured } from "@/lib/supabase";

export type UploadState = { url?: string; error?: string } | null;

const MAX_BYTES = 5 * 1024 * 1024; // 5MB

/**
 * Upload satu gambar ke Supabase Storage (bucket publik), kembalikan public URL.
 * Dipanggil imperatif dari komponen ImageUpload (bukan via <form> bersarang).
 */
export async function uploadImage(_prev: UploadState, formData: FormData): Promise<UploadState> {
  await requireAdmin();

  if (!isStorageConfigured()) {
    return { error: "Supabase Storage belum dikonfigurasi (isi env Supabase dulu)." };
  }

  const file = formData.get("file");
  const folder = String(formData.get("folder") ?? "misc").replace(/[^a-z0-9-]/gi, "");

  if (!(file instanceof File) || file.size === 0) return { error: "Pilih file gambar dulu." };
  if (!file.type.startsWith("image/")) return { error: "File harus berupa gambar (JPG/PNG/WebP)." };
  if (file.size > MAX_BYTES) return { error: "Ukuran maksimal 5MB." };

  const ext = (file.name.split(".").pop() ?? "jpg").toLowerCase();
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  try {
    const supabase = supabaseAdmin();
    const buffer = Buffer.from(await file.arrayBuffer());
    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(path, buffer, { contentType: file.type, cacheControl: "3600", upsert: false });
    if (error) return { error: `Upload gagal: ${error.message}` };

    const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
    return { url: data.publicUrl };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Upload gagal." };
  }
}
