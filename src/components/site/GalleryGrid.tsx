"use client";

import { useState } from "react";
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

  const shown = active === "Semua" ? items : items.filter((g) => g.category === active);

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
          <div
            key={g.id}
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
          </div>
        ))}
      </div>

      {shown.length === 0 && (
        <p className="py-12 text-center text-sm text-body-light">Belum ada foto pada kategori ini.</p>
      )}
    </>
  );
}
