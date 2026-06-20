"use client";

import { useEffect } from "react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
      <h2 className="mb-2 font-serif text-2xl font-bold text-ink">Terjadi Kesalahan</h2>
      <p className="mb-6 text-sm text-body-light">Gagal memuat panel. Silakan coba lagi.</p>
      <button
        onClick={reset}
        className="bg-gold px-6 py-2.5 text-[11px] font-bold uppercase tracking-[2px] text-ink transition-colors hover:bg-gold-dark hover:text-cream"
      >
        Coba Lagi
      </button>
    </div>
  );
}
