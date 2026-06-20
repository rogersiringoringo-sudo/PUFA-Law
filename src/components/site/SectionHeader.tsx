import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Header bagian dengan eyebrow + judul serif. Bagian judul yang dibungkus
 * `<em>` di teks (pakai prop `title` sebagai ReactNode) tampil italic crimson.
 */
export function SectionHeader({
  eyebrow,
  title,
  centered = true,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  centered?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(centered ? "text-center" : "", "mb-10 md:mb-12", className)}>
      <div
        className={cn(
          "mb-3 flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[4px] text-crimson",
          centered ? "justify-center" : "before:h-0.5 before:w-7 before:bg-crimson",
        )}
      >
        {eyebrow}
      </div>
      <h2 className="font-serif text-[clamp(26px,5vw,52px)] font-bold leading-[1.1] text-ink [&_em]:italic [&_em]:text-crimson">
        {title}
      </h2>
      <div className={cn("mt-4 h-[3px] w-12 bg-crimson", centered && "mx-auto")} />
    </div>
  );
}
