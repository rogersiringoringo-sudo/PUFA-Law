import bcrypt from "bcryptjs";

/** Hash password (dipakai saat seed admin & ubah password). */
export function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 10);
}

/** Bandingkan password dengan hash tersimpan. */
export function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}
