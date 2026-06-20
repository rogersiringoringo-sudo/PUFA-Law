import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = { title: "Login Admin" };

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) redirect("/admin");

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-4">
      <div className="relative w-full max-w-[420px] border border-crimson/40 bg-ink-mid p-9 text-center sm:p-12">
        <span className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--color-crimson-deep),var(--color-crimson-light))]" />
        <div className="font-serif text-[36px] font-bold tracking-[4px] text-cream">
          PUFA <span className="text-crimson-light">LAW</span>
        </div>
        <div className="mb-9 text-[10px] font-semibold uppercase tracking-[3px] text-white/30">
          Admin Panel
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
