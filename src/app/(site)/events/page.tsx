import type { Metadata } from "next";
import { getEvents, getPanitia } from "@/lib/data";
import { PageHero } from "@/components/site/PageHero";
import { EventCard } from "@/components/site/EventCard";
import { PanitiaTabs } from "@/components/site/PanitiaTabs";
import type { Panitia } from "@/types/content";

export const metadata: Metadata = {
  title: "Events",
  description: "Jadwal seminar, gala dinner, dan acara PUFA Law mendatang serta terdahulu.",
};

export default async function EventsPage() {
  const [events, panitia] = await Promise.all([getEvents(), getPanitia()]);

  // Kelompokkan panitia per event (urutan sesuai kemunculan).
  const groups = panitia.reduce<{ event: string; members: Panitia[] }[]>((acc, p) => {
    const g = acc.find((x) => x.event === p.event);
    if (g) g.members.push(p);
    else acc.push({ event: p.event, members: [p] });
    return acc;
  }, []);

  return (
    <>
      <PageHero title={<>Upcoming <em>Events</em></>} subtitle="Jadwal & Pelaksanaan" breadcrumb="Events" />

      <section className="container-pufa py-16 md:py-20">
        <div className="mb-10">
          <div className="mb-3 flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[4px] text-crimson before:h-0.5 before:w-7 before:bg-crimson">
            Acara Mendatang &amp; Terdahulu
          </div>
          <h2 className="font-serif text-[clamp(26px,4vw,46px)] font-bold leading-[1.1] text-ink">
            Kalender <em className="italic text-crimson">PUFA Law</em>
          </h2>
          <div className="mt-4 h-[3px] w-12 bg-crimson" />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {events.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>

        {/* Panitia */}
        <div className="mt-16">
          <div className="mb-3 flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[4px] text-crimson before:h-0.5 before:w-7 before:bg-crimson">
            Struktur Kepanitiaan
          </div>
          <h2 className="mb-2 font-serif text-[clamp(24px,3vw,38px)] font-bold text-ink">
            Panitia &amp; <em className="italic text-crimson">Penanggungjawab Event</em>
          </h2>
          <p className="mb-6 text-xs text-body-light">
            Kenali para profesional yang bertanggung jawab dalam menyukseskan setiap event PUFA Law.
          </p>
          <PanitiaTabs groups={groups} />
        </div>
      </section>
    </>
  );
}
