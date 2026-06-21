import type { Metadata } from "next";
import Image from "next/image";
import { getTeam } from "@/lib/data";
import { PageHero } from "@/components/site/PageHero";
import { initials } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Team",
  description: "Para profesional di balik PUFA Law — pemimpin dan tim inti.",
  alternates: { canonical: "/team" },
};

export default async function TeamPage() {
  const team = await getTeam();
  const f = team.featured;

  return (
    <>
      <PageHero title={<>Our <em>Team</em></>} subtitle="The People Behind PUFA Law" breadcrumb="Team" />

      <section className="container-pufa py-16 md:py-20">
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[4px] text-crimson before:h-0.5 before:w-7 before:bg-crimson">
            Pemimpin Kami
          </div>
          <h2 className="font-serif text-[clamp(26px,4vw,46px)] font-bold leading-[1.1] text-ink">
            Tim <em className="italic text-crimson">PUFA Law</em>
          </h2>
          <div className="mt-4 h-[3px] w-12 bg-crimson" />
        </div>

        {/* Featured */}
        <div className="mb-12 grid grid-cols-1 items-center gap-9 border border-crimson/15 bg-[linear-gradient(135deg,var(--color-ink),var(--color-ink-mid))] p-7 md:mb-14 md:grid-cols-[180px_1fr] md:p-12">
          <div className="mx-auto flex h-[140px] w-[140px] items-center justify-center border-[3px] border-gold bg-[linear-gradient(135deg,var(--color-gold),var(--color-gold-dark))] font-serif text-[40px] font-bold text-ink md:h-[180px] md:w-[180px] md:text-[44px]">
            {f.imageUrl ? (
              <Image
                src={f.imageUrl}
                alt={f.name}
                width={180}
                height={180}
                className="h-full w-full object-cover"
              />
            ) : (
              initials(f.name)
            )}
          </div>
          <div className="text-center md:text-left">
            <div className="mb-1 font-serif text-[30px] font-bold text-cream md:text-[38px]">{f.name}</div>
            <div className="mb-4 text-[11px] font-semibold uppercase tracking-[3px] text-gold">
              {f.role}
            </div>
            <p className="text-[13px] leading-[1.85] text-white/65">{f.bio}</p>
          </div>
        </div>

        {/* Members */}
        <div className="mb-5 flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[4px] text-crimson before:h-0.5 before:w-7 before:bg-crimson">
          Jajaran Tim Inti
        </div>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-6">
          {team.members.map((m) => (
            <article
              key={m.id}
              className="overflow-hidden border border-crimson/15 bg-cream transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(0,0,0,0.1)]"
            >
              <div className="flex h-[180px] items-center justify-center bg-[linear-gradient(135deg,var(--color-marble),var(--color-offwhite))] font-serif text-[40px] font-bold text-gold-dark md:h-[220px] md:text-[44px]">
                {m.imageUrl ? (
                  <Image
                    src={m.imageUrl}
                    alt={m.name}
                    width={300}
                    height={220}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  initials(m.name)
                )}
              </div>
              <div className="border-t-2 border-gold p-4">
                <div className="mb-0.5 font-serif text-lg font-bold text-ink md:text-xl">{m.name}</div>
                <div className="text-[10px] font-semibold uppercase tracking-[2px] text-gold">
                  {m.role}
                </div>
                <div className="mt-1 text-[11px] text-body-light">{m.dept}</div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
