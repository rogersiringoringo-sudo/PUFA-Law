import { auth } from "@/auth";

/**
 * Pastikan pemanggil sudah login admin. Dipanggil di awal setiap Server Action
 * yang memutasi data (middleware hanya melindungi render halaman, bukan action).
 */
export async function requireAdmin() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  return session.user;
}
