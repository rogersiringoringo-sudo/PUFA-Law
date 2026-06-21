"use client";

import { useEffect, useState } from "react";
import type { GalleryItem } from "@/types/content";
import { MediaBox } from "@/components/site/MediaBox";
import { cn } from "@/lib/utils";

export function GalleryGrid({
  items,
  filters,
}: {
  items: GalleryItem[];
  filters: string[];
}) {
  const [active, setActive] = useState(filters[0] ?? "Semua");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const shown = active === "Semua" ? items : items.filter((g) => g.category === active);

  // Tutup lightbox dengan Escape + kunci scroll body saat terbuka.
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setActive(f)}
            className={cn(
              "border px-5 py-2 text-[10px] font-bold uppercase tracking-[2px] transition-all duration-200",
              f === active
                ? "border-gold bg-gold text-ink"
                : "border-crimson/15 bg-transparent text-body hover:border-gold hover:bg-gold hover:text-ink",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {shown.map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => setLightbox(g)}
            aria-label={`Perbesar: ${g.title}`}
            className="group relative aspect-square cursor-pointer overflow-hidden border border-crimson/15 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)]"
          >
            <MediaBox
              imageUrl={g.imageUrl}
              bg={g.bg}
              label={g.label}
              alt={g.title}
              className="h-full text-base tracking-[3px]"
            />
            <div className="absolute inset-0 flex items-end bg-[linear-gradient(to_top,rgba(26,20,16,0.8),transparent)] p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="text-xs font-semibold tracking-[1px] text-cream">{g.title}</span>
            </div>
          </button>
        ))}
      </div>

      {shown.length === 0 && (
        <p className="py-12 text-center text-sm text-body-light">Belum ada foto pada kategori ini.</p>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.title}
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            aria-label="Tutup"
            onClick={() => setLightbox(null)}
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-2xl leading-none text-cream transition-colors hover:bg-white/10"
          >
            ×
          </button>
          <figure
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden border border-gold/30 bg-ink-mid shadow-2xl"
          >
            <MediaBox
              imageUrl={lightbox.imageUrl}
              bg={lightbox.bg}
              label={lightbox.label}
              alt={lightbox.title}
              className="aspect-[4/3] w-full text-2xl tracking-[4px]"
            />
            <figcaption className="flex items-center justify-between gap-3 border-t border-white/10 px-5 py-4">
              <span className="font-serif text-lg font-bold text-cream">{lightbox.title}</span>
              <span className="text-[10px] font-bold uppercase tracking-[2px] text-gold">
                {lightbox.category}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
