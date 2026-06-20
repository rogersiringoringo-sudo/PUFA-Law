import type { ReactNode } from "react";

/** Panel buka-tutup pakai <details> native (tanpa JS client). */
export function Disclosure({ summary, children }: { summary: string; children: ReactNode }) {
  return (
    <details className="group border border-crimson/15 bg-offwhite">
      <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[1px] text-gold-dark hover:bg-gold/10">
        <span className="text-base leading-none transition-transform group-open:rotate-45">+</span>
        {summary}
      </summary>
      <div className="border-t border-crimson/15 p-4">{children}</div>
    </details>
  );
}
