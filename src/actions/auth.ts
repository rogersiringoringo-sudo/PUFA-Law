"use server";

import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";
import { clearAttempts, registerFailure, tooManyAttempts } from "@/lib/rate-limit";

export type LoginState = { error?: string } | null;

/** Login admin via Credentials. Pada sukses, redirect ke /admin (melempar NEXT_REDIRECT). */
export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const key = `login:${email || "unknown"}`;

  // Batasi brute-force: blokir sementara setelah terlalu banyak percobaan gagal.
  if (tooManyAttempts(key)) {
    return { error: "Terlalu banyak percobaan login. Silakan coba lagi dalam beberapa menit." };
  }

  try {
    await signIn("credentials", {
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
      redirectTo: "/admin",
    });
    return null;
  } catch (error) {
    if (error instanceof AuthError) {
      registerFailure(key);
      return { error: "Email atau password salah." };
    }
    // Bukan AuthError → kemungkinan redirect sukses: reset counter lalu teruskan.
    clearAttempts(key);
    throw error; // redirect & error lain harus diteruskan
  }
}

export async function logoutAction() {
  await signOut({ redirectTo: "/login" });
}
