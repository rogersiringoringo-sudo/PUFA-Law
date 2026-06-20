import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "gold" | "crimson" | "green";

const variants: Record<BadgeVariant, string> = {
  gold: "bg-gold/15 text-gold-dark",
  crimson: "bg-crimson/10 text-crimson",
  green: "bg-[#287828]/10 text-[#287828]",
};

export function Badge({
  children,
  variant = "gold",
  className,
}: {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block rounded-[2px] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[1px]",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
