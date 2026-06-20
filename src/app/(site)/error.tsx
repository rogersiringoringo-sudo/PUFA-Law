"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function SiteError({
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
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-3 font-serif text-3xl font-bold text-ink">Terjadi Kesalahan</h1>
      <p className="mb-8 max-w-md text-sm text-body-light">
        Maaf, ada masalah saat memuat halaman ini. Silakan coba lagi.
      </p>
      <Button variant="primary" onClick={reset}>
        Coba Lagi
      </Button>
    </div>
  );
}
