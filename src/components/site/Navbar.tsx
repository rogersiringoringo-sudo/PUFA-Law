"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/config";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 flex h-[60px] items-center justify-between border-b-[3px] border-crimson-mid bg-ink px-4 shadow-[0_4px_24px_rgba(176,16,32,0.25)] md:h-[68px] md:px-10">
        <Link
          href="/"
          className="flex items-center gap-1 font-serif text-xl font-bold tracking-[3px] text-cream md:text-2xl"
        >
          PUFA <span className="text-crimson-light">LAW</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-[2px] px-3 py-2 text-[10.5px] font-semibold uppercase tracking-[1.8px] transition-all duration-200",
                isActive(link.href)
                  ? "bg-crimson/20 text-crimson-light"
                  : "text-white/65 hover:bg-crimson/30 hover:text-cream",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="hidden rounded-[2px] bg-crimson px-4 py-2 text-[10px] font-bold uppercase tracking-[2px] text-cream transition-colors hover:bg-crimson-deep lg:inline-block"
          >
            Admin
          </Link>

          {/* Hamburger */}
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex flex-col gap-[5px] p-1 lg:hidden"
          >
            <span
              className={cn(
                "block h-0.5 w-[22px] bg-cream transition-all duration-300",
                open && "translate-y-[7px] rotate-45",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-[22px] bg-cream transition-all duration-300",
                open && "opacity-0",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-[22px] bg-cream transition-all duration-300",
                open && "-translate-y-[7px] -rotate-45",
              )}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-x-0 top-[60px] z-40 flex-col border-b-2 border-crimson bg-ink-mid py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)] md:top-[68px] lg:hidden",
          open ? "flex" : "hidden",
        )}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className={cn(
              "border-b border-white/5 px-6 py-3.5 text-xs font-semibold uppercase tracking-[2px] transition-colors",
              isActive(link.href)
                ? "bg-crimson/15 text-crimson-light"
                : "text-white/70 hover:bg-crimson/15 hover:text-crimson-light",
            )}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/admin"
          onClick={() => setOpen(false)}
          className="px-6 py-3.5 text-xs font-semibold uppercase tracking-[2px] text-gold"
        >
          Admin Panel
        </Link>
      </div>
    </>
  );
}
