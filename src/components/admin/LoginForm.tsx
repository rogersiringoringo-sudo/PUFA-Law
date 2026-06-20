"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { loginAction, type LoginState } from "@/actions/auth";

const inputClass =
  "w-full rounded-[2px] border border-white/10 bg-white/5 px-4 py-3.5 text-[13px] text-cream outline-none transition-colors placeholder:text-white/30 focus:border-crimson";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 w-full cursor-pointer rounded-[2px] bg-crimson px-4 py-3.5 text-xs font-bold uppercase tracking-[2px] text-cream transition-colors hover:bg-crimson-deep disabled:opacity-60"
    >
      {pending ? "Memproses..." : "Masuk ke Dashboard"}
    </button>
  );
}

export function LoginForm() {
  const [state, formAction] = useActionState<LoginState, FormData>(loginAction, null);

  return (
    <form action={formAction} className="space-y-3 text-left">
      {state?.error && (
        <p className="text-center text-xs font-semibold text-[#e05050]">{state.error}</p>
      )}
      <input
        name="email"
        type="email"
        required
        placeholder="Email Admin"
        defaultValue="admin@pufalaw.id"
        className={inputClass}
      />
      <input name="password" type="password" required placeholder="Password" className={inputClass} />
      <SubmitButton />
      <Link
        href="/"
        className="mt-3 block text-center text-[11px] text-white/30 transition-colors hover:text-white/70"
      >
        Kembali ke Website
      </Link>
    </form>
  );
}
