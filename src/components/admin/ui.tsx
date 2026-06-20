"use client";

import type { ReactNode } from "react";
import { useFormStatus } from "react-dom";

export type ActionState = { ok?: boolean; error?: string } | null;

const inputClass =
  "w-full rounded-[2px] border border-crimson/15 bg-offwhite px-3.5 py-2.5 text-[13px] text-body outline-none transition-colors focus:border-gold";
const labelClass = "mb-1.5 block text-[10px] font-bold uppercase tracking-[2px] text-body-light";

/** Card editor dengan header gelap. */
export function EditBlock({
  title,
  action,
  children,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="mb-6 border border-crimson/15 bg-cream">
      <div className="flex items-center justify-between gap-3 border-b border-crimson/15 bg-[linear-gradient(90deg,var(--color-ink),var(--color-ink-mid))] px-5 py-4">
        <h2 className="text-[11px] font-bold uppercase tracking-[2px] text-gold">{title}</h2>
        {action}
      </div>
      <div className="p-5 md:p-6">{children}</div>
    </section>
  );
}

export function Field({
  label,
  name,
  defaultValue,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string | number;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className={labelClass} htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        className={inputClass}
      />
    </div>
  );
}

export function TextArea({
  label,
  name,
  defaultValue,
  rows = 4,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <div>
      <label className={labelClass} htmlFor={name}>
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={`${inputClass} resize-y`}
      />
    </div>
  );
}

export function SelectField({
  label,
  name,
  defaultValue,
  options,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  options: string[];
}) {
  return (
    <div>
      <label className={labelClass} htmlFor={name}>
        {label}
      </label>
      <select id={name} name={name} defaultValue={defaultValue} className={`${inputClass} cursor-pointer`}>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

export function SaveButton({ label = "Simpan" }: { label?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="cursor-pointer bg-gold px-6 py-2.5 text-[11px] font-bold uppercase tracking-[2px] text-ink transition-colors hover:bg-gold-dark hover:text-cream disabled:opacity-60"
    >
      {pending ? "Menyimpan..." : label}
    </button>
  );
}

export function FormFeedback({ state }: { state: ActionState }) {
  if (!state) return null;
  if (state.error) return <p className="text-xs font-semibold text-crimson">{state.error}</p>;
  if (state.ok) return <p className="text-xs font-semibold text-[#287828]">✓ Tersimpan.</p>;
  return null;
}

/** Tombol hapus kecil (dipakai di dalam form action delete). */
export function DeleteButton({ label = "Hapus" }: { label?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="cursor-pointer border border-crimson px-3 py-1.5 text-[10px] font-bold uppercase tracking-[1px] text-crimson transition-colors hover:bg-crimson hover:text-cream disabled:opacity-50"
    >
      {pending ? "..." : label}
    </button>
  );
}
