"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { submitMessage, type ContactState } from "@/actions/contact";
import { buttonVariants } from "@/components/ui/Button";

const inputClass =
  "w-full rounded-[2px] border-[1.5px] border-crimson/15 bg-offwhite px-4 py-3 text-[13px] text-body outline-none transition-colors focus:border-crimson focus:shadow-[0_0_0_3px_rgba(176,16,32,0.08)]";
const labelClass = "mb-2 block text-[10px] font-bold uppercase tracking-[2px] text-body-light";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={buttonVariants("primary", "w-full")}>
      {pending ? "Mengirim..." : "Kirim Pesan"}
    </button>
  );
}

/** Wrapper: pakai `key` untuk me-reset state form saat pengguna ingin mengirim lagi. */
export function ContactForm({ purposes }: { purposes: string[] }) {
  const [resetKey, setResetKey] = useState(0);
  return (
    <ContactFormInner
      key={resetKey}
      purposes={purposes}
      onReset={() => setResetKey((k) => k + 1)}
    />
  );
}

function ContactFormInner({
  purposes,
  onReset,
}: {
  purposes: string[];
  onReset: () => void;
}) {
  const [state, formAction] = useActionState<ContactState, FormData>(submitMessage, null);
  // Sembunyikan pesan error lama begitu pengguna mulai mengubah input lagi.
  const [errorHidden, setErrorHidden] = useState(false);
  const showError = state?.error && !errorHidden;

  if (state?.ok) {
    return (
      <div className="border border-crimson/15 bg-cream p-7 md:p-10">
        <div className="rounded-[2px] border border-[#287828]/30 bg-[#287828]/10 p-6 text-center">
          <div className="mb-1 font-serif text-xl font-bold text-[#287828]">Terima kasih! 🎉</div>
          <p className="mb-5 text-sm text-body-light">
            Pesan Anda telah terkirim. Tim PUFA Law akan menghubungi Anda segera.
          </p>
          <button type="button" onClick={onReset} className={buttonVariants("outline")}>
            Kirim Pesan Lain
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-crimson/15 bg-cream p-7 md:p-10">
      <div className="mb-6 font-serif text-2xl font-bold text-ink">Kirim Pesan</div>

      <form
        action={formAction}
        noValidate
        onSubmit={() => setErrorHidden(false)}
        onInput={() => setErrorHidden(true)}
        className="space-y-4"
      >
        {/* Honeypot anti-spam: tersembunyi dari pengguna, diisi hanya oleh bot. */}
        <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="name">
              Nama Lengkap
            </label>
            <input id="name" name="name" className={inputClass} placeholder="Nama Anda..." />
          </div>
          <div>
            <label className={labelClass} htmlFor="email">
              Email
            </label>
            <input id="email" name="email" type="email" className={inputClass} placeholder="email@anda.com" />
          </div>
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">
            Nomor Telepon
          </label>
          <input id="phone" name="phone" className={inputClass} placeholder="+62..." />
        </div>
        <div>
          <label className={labelClass} htmlFor="purpose">
            Keperluan
          </label>
          <select id="purpose" name="purpose" className={`${inputClass} cursor-pointer`}>
            {purposes.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="message">
            Pesan
          </label>
          <textarea
            id="message"
            name="message"
            className={`${inputClass} min-h-[110px] resize-y`}
            placeholder="Ceritakan kebutuhan Anda..."
          />
        </div>

        {showError && <p className="text-xs font-semibold text-crimson">{state?.error}</p>}

        <SubmitButton />
      </form>
    </div>
  );
}
