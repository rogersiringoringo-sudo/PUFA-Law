"use server";

import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";

export type LoginState = { error?: string } | null;

/** Login admin via Credentials. Pada sukses, redirect ke /admin (melempar NEXT_REDIRECT). */
export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  try {
    await signIn("credentials", {
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
      redirectTo: "/admin",
    });
    return null;
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Email atau password salah." };
    }
    throw error; // redirect & error lain harus diteruskan
  }
}

export async function logoutAction() {
  await signOut({ redirectTo: "/login" });
}
