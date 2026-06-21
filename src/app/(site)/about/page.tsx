import type { Metadata } from "next";
import { getAbout } from "@/lib/data";
import { PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = {
  title: "About",
  description: "Kisah, visi, dan nilai-nilai di balik PUFA Law.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const about = await getAbout();

  return (
    <>
      <PageHero title={<>Tentang <em>PUFA Law</em></>} subtitle="Our Story & Vision" breadcrumb="About Us" />

      {/* Intro grid */}
      <section className="container-pufa grid grid-cols-1 items-center gap-12 py-16 md:grid-cols-2 md:gap-20 md:py-20">
        <div className="relative">
          <div className="flex h-[340px] items-center justify-center border border-crimson/15 bg-[linear-gradient(135deg,var(--color-offwhite),var(--color-marble))] font-serif text-[32px] font-bold tracking-[4px] text-gold-dark md:h-[480px]">
            PUFA LAW
          </div>
          <div className="absolute -bottom-5 -right-2 flex h-[120px] w-[120px] flex-col items-center justify-center bg-gold p-2 text-center md:-right-5">
            <strong className="font-serif text-[36px] font-bold text-ink">{about.badgeNum}</strong>
            <span className="text-[8px] font-bold uppercase leading-[1.3] tracking-[1px] text-ink-mid">
              {about.badgeLabel}
            </span>
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[4px] text-crimson before:h-0.5 before:w-7 before:bg-crimson">
            Tentang Kami
          </div>
          <h2 className="mb-4 font-serif text-[clamp(26px,4vw,46px)] font-bold leading-[1.1] text-ink">
            Kisah di Balik
            <br />
            <em className="italic text-crimson">PUFA Law</em>
          </h2>
          <div className="mb-6 h-[3px] w-12 bg-crimson" />
          <p className="mb-5 font-serif text-[22px] italic leading-[1.4] text-crimson md:text-[26px]">
            {about.quote}
          </p>
          <p className="mb-4 text-sm leading-[1.9] text-body-light">{about.para1}</p>
          <p className="mb-4 text-sm leading-[1.9] text-body-light">{about.para2}</p>

          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {about.values.map((v) => (
              <div key={v.name} className="border border-crimson/15 p-[18px]">
                <div className="mb-1.5 text-[11px] font-bold uppercase tracking-[2px] text-gold-dark">
                  {v.name}
                </div>
                <div className="text-xs leading-[1.6] text-body-light">{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-ink px-4 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-[800px] text-center">
          <div className="mb-3 flex items-center justify-center text-[10px] font-bold uppercase tracking-[4px] text-gold">
            Perjalanan Kami
          </div>
          <h2 className="mb-12 font-serif text-[clamp(28px,4vw,48px)] font-bold text-cream">
            Milestones <em className="italic text-gold-light">PUFA Law</em>
          </h2>

          <ol className="relative space-y-7 before:absolute before:left-[7px] before:top-2 before:h-full before:w-px before:bg-crimson/30 md:before:left-1/2 md:before:-translate-x-1/2">
            {about.timeline.map((t, i) => (
              <li key={t.year} className="relative flex items-start gap-5 md:items-center">
                {/* mobile: dot left; desktop: alternating */}
                <span
                  className={`relative z-10 mt-1.5 h-3.5 w-3.5 flex-shrink-0 rounded-full md:mt-0 md:absolute md:left-1/2 md:-translate-x-1/2 ${i % 2 === 0 ? "bg-gold" : "bg-crimson"}`}
                />
                <div
                  className={`md:w-1/2 ${i % 2 === 0 ? "md:pr-10 md:text-right" : "md:ml-auto md:pl-10 md:text-left"}`}
                >
                  <div className="font-serif text-[22px] font-bold text-gold">{t.year}</div>
                  <div className="text-[13px] text-white/70">{t.desc}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
