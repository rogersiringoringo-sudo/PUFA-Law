import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

// Middleware Edge: pakai config aman-edge (tanpa Prisma). Callback `authorized`
// di auth.config menolak akses /admin bila belum login → redirect ke /login.
export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: ["/admin/:path*"],
};
