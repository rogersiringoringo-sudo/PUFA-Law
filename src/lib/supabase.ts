import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Klien Supabase sisi-server (service role) untuk upload ke Storage.
 * HANYA dipakai di server (Server Action) — service role key bersifat rahasia.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET ?? "pufa-media";

/** Apakah env Supabase Storage sudah diisi? (untuk pesan ramah di admin) */
export function isStorageConfigured(): boolean {
  return Boolean(url && serviceKey);
}

let cached: SupabaseClient | null = null;

export function supabaseAdmin(): SupabaseClient {
  if (!url || !serviceKey) {
    throw new Error(
      "Supabase belum dikonfigurasi. Set NEXT_PUBLIC_SUPABASE_URL & SUPABASE_SERVICE_ROLE_KEY di .env.local.",
    );
  }
  if (!cached) {
    cached = createClient(url, serviceKey, { auth: { persistSession: false } });
  }
  return cached;
}
