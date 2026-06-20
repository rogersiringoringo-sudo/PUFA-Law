import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [events, team, gallery, articles, messages, unread, recentMsgs] = await Promise.all([
    prisma.event.count(),
    prisma.teamMember.count(),
    prisma.galleryItem.count(),
    prisma.article.count(),
    prisma.message.count(),
    prisma.message.count({ where: { status: "Belum Dibaca" } }),
    prisma.message.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  const stats = [
    { num: events, label: "Total Events" },
    { num: team, label: "Anggota Tim" },
    { num: gallery, label: "Foto Gallery" },
    { num: articles, label: "Artikel Berita" },
  ];

  const quick = [
    { href: "/admin/home", label: "Edit Home" },
    { href: "/admin/events", label: "Kelola Events" },
    { href: "/admin/news", label: "Tulis Berita" },
    { href: "/admin/team", label: "Edit Tim" },
    { href: "/admin/gallery", label: "Upload Foto" },
    { href: "/admin/contact", label: "Pesan Masuk" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="border border-crimson/15 border-t-[3px] border-t-crimson bg-cream p-5 text-center">
            <div className="font-serif text-[40px] font-bold leading-none text-crimson">{s.num}</div>
            <div className="mt-1.5 text-[10px] font-semibold uppercase tracking-[2px] text-body-light">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="border border-crimson/15 bg-cream">
          <div className="border-b border-crimson/15 bg-[linear-gradient(90deg,var(--color-ink),var(--color-ink-mid))] px-5 py-4 text-[11px] font-bold uppercase tracking-[2px] text-gold">
            Navigasi Cepat
          </div>
          <div className="flex flex-wrap gap-2.5 p-5">
            {quick.map((q) => (
              <Link
                key={q.href}
                href={q.href}
                className="border border-gold px-4 py-2 text-[10px] font-bold uppercase tracking-[2px] text-gold-dark transition-colors hover:bg-gold hover:text-ink"
              >
                {q.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="border border-crimson/15 bg-cream">
          <div className="flex items-center justify-between border-b border-crimson/15 bg-[linear-gradient(90deg,var(--color-ink),var(--color-ink-mid))] px-5 py-4">
            <span className="text-[11px] font-bold uppercase tracking-[2px] text-gold">Pesan Terbaru</span>
            <span className="text-[10px] text-white/50">
              {unread} belum dibaca / {messages} total
            </span>
          </div>
          <div className="divide-y divide-crimson/10">
            {recentMsgs.length === 0 && (
              <p className="p-5 text-sm text-body-light">Belum ada pesan masuk.</p>
            )}
            {recentMsgs.map((m) => (
              <div key={m.id} className="flex items-center justify-between gap-3 px-5 py-3">
                <div className="min-w-0">
                  <div className="truncate text-[13px] font-semibold text-ink">{m.name}</div>
                  <div className="truncate text-[11px] text-body-light">{m.purpose}</div>
                </div>
                <div className="flex flex-shrink-0 items-center gap-3">
                  <span className="text-[10px] text-body-light">{formatDate(m.createdAt.toISOString())}</span>
                  <Badge variant={m.status === "Dibaca" ? "green" : "gold"}>{m.status}</Badge>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-crimson/15 p-4">
            <Link href="/admin/contact" className="text-[11px] font-bold uppercase tracking-[2px] text-crimson hover:underline">
              Lihat semua pesan →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
