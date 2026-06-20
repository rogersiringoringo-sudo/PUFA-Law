import { z } from "zod";

/** Skema validasi login admin. */
export const signInSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(1, "Password wajib diisi"),
});

export type SignInInput = z.infer<typeof signInSchema>;
