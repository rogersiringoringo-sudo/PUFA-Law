import Link from "next/link";
import type { EventItem } from "@/types/content";
import { buttonVariants } from "@/components/ui/Button";
import { MediaBox } from "@/components/site/MediaBox";
import { dayOf, monthOf, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function EventCard({ event }: { event: EventItem }) {
  const past = event.status === "Selesai";

  return (
    <article className="group flex flex-col overflow-hidden border border-crimson/15 bg-cream transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]">
      <div className="relative h-[200px]">
        <MediaBox
          imageUrl={event.imageUrl}
          bg={
            past
              ? "linear-gradient(135deg,#3A3028,#666)"
              : "linear-gradient(135deg,#1A0808,#B01020)"
          }
          label={event.category.toUpperCase()}
          alt={event.name}
          className="h-full text-xl tracking-[3px]"
          labelClassName="text-gold-light"
        />
        {/* date badge */}
        <div className="absolute left-4 top-4 bg-gold px-3.5 py-2 text-center">
          <strong className="block font-serif text-[28px] font-bold leading-none text-ink">
            {dayOf(event.date)}
          </strong>
          <span className="text-[9px] font-bold uppercase tracking-[2px] text-ink-mid">
            {monthOf(event.date)}
          </span>
        </div>
        {/* status badge */}
        <span
          className={cn(
            "absolute right-4 top-4 px-3 py-1 text-[9px] font-bold uppercase tracking-[2px]",
            past ? "bg-black/50 text-[#ccc]" : "bg-gold/90 text-ink",
          )}
        >
          {event.status}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 text-[10px] font-bold uppercase tracking-[2px] text-gold-dark">
          {event.category}
        </div>
        <h3 className="mb-2.5 font-serif text-[22px] font-bold leading-[1.3] text-ink">
          {event.name}
        </h3>
        <div className="mb-3.5 flex flex-wrap gap-4 text-[11px] text-body-light">
          <span>📅 {formatDate(event.date)}</span>
          <span>🕐 {event.time} WIB</span>
          <span>📍 {event.location}</span>
        </div>
        <p className="mb-5 text-xs leading-[1.7] text-body-light">{event.desc}</p>
        <div className="mt-auto">
          {/* Event selesai → arahkan ke dokumentasi (gallery); mendatang → pendaftaran (kontak). */}
          <Link
            href={past ? "/gallery" : "/contact"}
            className={buttonVariants(past ? "outline" : "primary")}
          >
            {event.btn}
          </Link>
        </div>
      </div>
    </article>
  );
}
