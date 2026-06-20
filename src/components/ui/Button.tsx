import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "outline" | "outlineWhite" | "gold";

const base =
  "inline-flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[2px] transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:pointer-events-none px-6 py-3 md:px-8 md:py-3.5";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-crimson text-cream hover:bg-crimson-deep hover:-translate-y-px hover:shadow-[0_6px_18px_rgba(176,16,32,0.4)]",
  outline:
    "bg-transparent text-crimson border-[1.5px] border-crimson font-semibold hover:bg-crimson hover:text-cream",
  outlineWhite:
    "bg-transparent text-white/85 border-[1.5px] border-white/40 font-semibold hover:border-gold-light hover:text-gold-light",
  gold: "bg-gold text-ink hover:bg-gold-dark hover:text-cream",
};

/** className builder — pakai untuk `<Link className={buttonVariants("primary")}>`. */
export function buttonVariants(variant: ButtonVariant = "primary", className?: string) {
  return cn(base, variants[variant], className);
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return <button className={buttonVariants(variant, className)} {...props} />;
}
