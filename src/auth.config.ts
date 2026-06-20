import type { NextAuthConfig } from "next-auth";

/**
 * Konfigurasi Auth.js yang AMAN untuk Edge (tanpa Prisma/bcrypt).
 * Dipakai oleh middleware. Provider Credentials (butuh Node) ditambahkan di `auth.ts`.
 */
export const authConfig = {
  // Wajib untuk self-hosting (next start / Vercel pakai header host).
  trustHost: true,
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      if (nextUrl.pathname.startsWith("/admin")) return isLoggedIn;
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        if (user.name) token.name = user.name;
      }
      return token;
    },
    session({ session, token }) {
      if (token.id) session.user.id = String(token.id);
      if (token.role) session.user.role = String(token.role);
      return session;
    },
  },
} satisfies NextAuthConfig;

export default authConfig;
