/**
 * Rate limiter sederhana berbasis memori (sliding window).
 *
 * CATATAN: state disimpan per-instance proses. Di serverless (Vercel) state ini
 * tidak dibagi antar-instance dan hilang saat cold start — jadi ini adalah
 * lapisan deterrent dasar, bukan jaminan kuat. Untuk produksi skala besar,
 * gunakan store eksternal (Upstash Redis / database).
 */

const buckets = new Map<string, number[]>();

const DEFAULT_MAX = 5;
const DEFAULT_WINDOW_MS = 15 * 60 * 1000; // 15 menit

function recent(key: string, windowMs: number): number[] {
  const now = Date.now();
  const arr = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  buckets.set(key, arr);
  return arr;
}

/** `true` jika percobaan untuk `key` sudah melampaui batas dalam window. */
export function tooManyAttempts(
  key: string,
  max = DEFAULT_MAX,
  windowMs = DEFAULT_WINDOW_MS,
): boolean {
  return recent(key, windowMs).length >= max;
}

/** Catat satu percobaan gagal untuk `key`. */
export function registerFailure(key: string, windowMs = DEFAULT_WINDOW_MS): void {
  const arr = recent(key, windowMs);
  arr.push(Date.now());
  buckets.set(key, arr);
}

/** Bersihkan hitungan percobaan untuk `key` (mis. setelah login sukses). */
export function clearAttempts(key: string): void {
  buckets.delete(key);
}
