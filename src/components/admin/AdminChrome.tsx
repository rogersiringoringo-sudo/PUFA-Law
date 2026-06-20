"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/actions/auth";
import { cn } from "@/lib/utils";

const groups = [
  { title: "Dashboard", items: [{ href: "/admin", label: "Overview" }] },
  {
    title: "Halaman Website",
    items: [
      { href: "/admin/home", label: "Home" },
      { href: "/admin/about", label: "About" },
      { href: "/admin/events", label: "Events" },
      { href: "/admin/gallery", label: "Gallery" },
      { href: "/admin/team", label: "Team" },
      { href: "/admin/news", label: "News" },
      { href: "/admin/contact", label: "Contact Us" },
    ],
  },
  {
    title: "Pengaturan",
    items: [
      { href: "/admin/settings", label: "Pengaturan Situs" },
      { href: "/admin/users", label: "Pengguna Admin" },
    ],
  },
];

export function AdminChrome({
  user,
  children,
}: {
  user: { name: string; role: string };
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-offwhite">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col overflow-y-auto border-r-2 border-gold bg-ink transition-transform duration-300 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="border-b border-white/[0.07] px-5 py-6">
          <div className="font-serif text-[22px] font-bold tracking-[3px] text-gold">
            PUFA <span className="text-crimson-light">LAW</span>
          </div>
          <div className="mt-1 text-[9px] font-semibold uppercase tracking-[2px] text-white/30">
            Admin Panel
          </div>
        </div>

        <nav className="flex-1 px-3 py-4">
          {groups.map((g) => (
            <div key={g.title} className="mb-6">
              <div className="mb-2 px-2 text-[9px] font-bold uppercase tracking-[3px] text-white/25">
                {g.title}
              </div>
              {g.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "mb-0.5 flex items-center gap-2.5 rounded-[3px] px-3 py-2.5 text-[11.5px] font-medium transition-all",
                    isActive(item.href)
                      ? "bg-crimson/20 font-semibold text-crimson-light"
                      : "text-white/55 hover:bg-crimson/10 hover:text-crimson-light",
                  )}
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 flex-shrink-0 rounded-full",
                      isActive(item.href) ? "bg-crimson-light" : "bg-white/20",
                    )}
                  />
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>

        <div className="flex items-center justify-between gap-2 border-t border-white/[0.07] px-5 py-4">
          <form action={logoutAction}>
            <button
              type="submit"
              className="cursor-pointer border border-crimson bg-crimson/20 px-4 py-2 text-[10px] font-semibold uppercase tracking-[1px] text-crimson-light transition-colors hover:bg-crimson hover:text-cream"
            >
              Logout
            </button>
          </form>
          <Link
            href="/"
            target="_blank"
            className="border border-gold bg-gold/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[1px] text-gold transition-colors hover:bg-gold hover:text-ink"
          >
            Lihat Site
          </Link>
        </div>
      </aside>

      {/* Backdrop (mobile) */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      {/* Main */}
      <div className="lg:pl-[260px]">
        <header className="sticky top-0 z-30 flex h-[60px] items-center justify-between border-b border-crimson/15 bg-cream px-4 md:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="flex flex-col gap-[5px] p-1 lg:hidden"
            >
              <span className="block h-0.5 w-5 bg-ink" />
              <span className="block h-0.5 w-5 bg-ink" />
              <span className="block h-0.5 w-5 bg-ink" />
            </button>
            <span className="font-serif text-lg font-bold text-ink md:text-xl">Dashboard</span>
          </div>
          <div className="text-[11px] text-body-light">
            {user.name} · <span className="font-semibold text-crimson">{user.role}</span>
          </div>
        </header>

        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
