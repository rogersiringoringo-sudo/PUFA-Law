"use client";

import { useState } from "react";
import type { Panitia } from "@/types/content";
import { initials, cn } from "@/lib/utils";

export function PanitiaTabs({ groups }: { groups: { event: string; members: Panitia[] }[] }) {
  const [active, setActive] = useState(0);

  if (groups.length === 0) return null;

  return (
    <div>
      <div className="mb-7 flex flex-wrap gap-2">
        {groups.map((g, i) => (
          <button
            key={g.event}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "border px-4 py-2 text-[10px] font-bold uppercase tracking-[2px] transition-all duration-200",
              i === active
                ? "border-gold bg-gold text-ink"
                : "border-crimson/15 bg-marble text-body hover:border-gold hover:bg-gold hover:text-ink",
            )}
          >
            {g.event}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
        {groups[active].members.map((m) => (
          <div
            key={m.id}
            className="border border-crimson/15 bg-cream p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold"
          >
            <div className="mx-auto mb-3 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--color-gold-light),var(--color-gold))] font-serif text-xl font-bold text-ink">
              {initials(m.name)}
            </div>
            <div className="mb-1 text-[13px] font-bold text-ink">{m.name}</div>
            <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-[2px] text-gold-dark">
              {m.role}
            </div>
            <div className="text-[11px] text-body-light">{m.division}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
