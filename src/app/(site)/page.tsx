import Link from "next/link";
import { Fragment } from "react";
import { getHome, getNews } from "@/lib/data";
import { SectionHeader } from "@/components/site/SectionHeader";
import { NewsCard } from "@/components/site/NewsCard";
import { buttonVariants } from "@/components/ui/Button";

const categories = [
  {
    href: "/events",
    label: "EVENTS",
    bg: "linear-gradient(135deg,#8B0010,#C8182C)",
    name: "Events Eksklusif",
    desc: "Seminar hukum, gala dinner, dan konferensi bergengsi yang dirancang untuk pengalaman tak terlupakan.",
    cta: "Lihat Events",
  },
  {
    href: "/gallery",
    label: "GALLERY",
    bg: "linear-gradient(135deg,#1A0808,#7A0A18)",
    name: "Gallery Premium",
    desc: "Koleksi foto dan dokumentasi terbaik dari setiap momen berharga PUFA Law sepanjang tahun.",
    cta: "Lihat Gallery",
  },
  {
    href: "/team",
    label: "TEAM",
    bg: "linear-gradient(135deg,#B01020,#1A0808)",
    name: "Tim Profesional",
    desc: "Didukung oleh para profesional berpengalaman di bidang hukum, advokasi, dan manajemen organisasi.",
    cta: "Kenali Tim",
  },
];

export default async function HomePage() {
  const [home, news] = await Promise.all([getHome(), getNews()]);
  const titleLines = home.title.split("|").map((p) => p.trim());
  const latest = news.articles.slice(0, 3);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative mt-[60px] flex min-h-[calc(100vh-60px)] items-center overflow-hidden bg-[linear-gradient(135deg,var(--color-ink)_0%,var(--color-crimson-deep)_45%,var(--color-crimson)_100%)] md:mt-[68px] md:min-h-[calc(100vh-68px)]">
        <div className="absolute inset-x-0 bottom-0 h-1 bg-[linear-gradient(90deg,var(--color-crimson-deep),var(--color-gold),var(--color-crimson-deep))]" />
        <div className="pointer-events-none absolute inset-5 hidden border border-white/[0.08] md:block">
          <span className="absolute -left-px -top-px h-7 w-7 border-l-2 border-t-2 border-gold" />
          <span className="absolute -bottom-px -right-px h-7 w-7 border-b-2 border-r-2 border-gold" />
        </div>

        <div className="container-pufa relative z-10 grid grid-cols-1 items-center gap-8 py-12 md:grid-cols-2 md:gap-14 md:py-16">
          {/* Left */}
          <div className="animate-fade-up">
            <div className="mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[4px] text-gold-light before:h-px before:w-10 before:bg-gold">
              {home.eyebrow}
            </div>
            <h1 className="mb-5 font-serif text-[clamp(40px,5.5vw,76px)] font-bold leading-[1.05] text-cream">
              {titleLines.map((line, i) => (
                <Fragment key={i}>
                  {i === 1 ? <em className="italic text-gold-light">{line}</em> : line}
                  {i < titleLines.length - 1 && <br />}
                </Fragment>
              ))}
            </h1>
            <p className="mb-10 max-w-md text-[11.5px] leading-[1.9] tracking-[2px] text-white/55">
              {home.sub}
            </p>
            <div className="flex flex-wrap items-center gap-3.5">
              <Link href="/events" className={buttonVariants("primary")}>
                {home.btn1}
              </Link>
              <Link href="/gallery" className={buttonVariants("outlineWhite")}>
                {home.btn2}
              </Link>
            </div>
          </div>

          {/* Right — stats panel */}
          <div className="order-first md:order-none">
            <div className="border border-white/[0.12] bg-white/[0.05] p-5 backdrop-blur-sm md:p-9">
              <div className="mb-7 border-b border-white/[0.08] pb-3.5 text-[9px] font-bold uppercase tracking-[3px] text-gold">
                PUFA LAW — STATISTIK
              </div>
              <div className="grid grid-cols-3 gap-0.5">
                {home.stats.map((s, i) => (
                  <div
                    key={i}
                    className="border border-white/[0.06] bg-black/20 px-3 py-6 text-center"
                  >
                    <div className="font-serif text-[28px] font-bold leading-none text-cream md:text-[38px]">
                      {s.num}
                    </div>
                    <div className="mt-1.5 text-[9px] font-bold uppercase tracking-[1.5px] text-white/40">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-crimson px-5 py-4 text-center font-serif text-[17px] italic leading-[1.5] text-cream">
                &ldquo;Excellence in Law&rdquo;
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="red-divider" />

      {/* ===== CATEGORIES ===== */}
      <section className="bg-cream py-16 md:py-20">
        <div className="container-pufa">
          <SectionHeader
            eyebrow="Apa yang Kami Tawarkan"
            title={
              <>
                Temukan <em>Keunggulan</em> Kami
              </>
            }
          />
          <div className="grid grid-cols-1 gap-px md:grid-cols-3">
            {categories.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="group relative overflow-hidden border border-crimson/15 bg-cream transition-all duration-300 hover:z-10 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(176,16,32,0.15)]"
              >
                <div
                  className="relative flex h-[200px] items-center justify-center font-serif text-base font-bold tracking-[3px] text-white/90"
                  style={{ backgroundImage: c.bg }}
                >
                  {c.label}
                  <span className="absolute inset-0 flex items-center justify-center bg-crimson/70 text-3xl text-cream opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    ›
                  </span>
                </div>
                <div className="h-[3px] bg-crimson" />
                <div className="p-6">
                  <div className="mb-2 text-xs font-bold uppercase tracking-[2px] text-ink">
                    {c.name}
                  </div>
                  <p className="text-xs leading-[1.7] text-body-light">{c.desc}</p>
                  <div className="mt-3.5 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[2px] text-crimson">
                    {c.cta} →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="red-divider" />

      {/* ===== LATEST NEWS ===== */}
      <section className="bg-crimson-pale py-16 md:py-20">
        <div className="container-pufa">
          <SectionHeader
            eyebrow="Terbaru dari PUFA Law"
            title={
              <>
                Berita &amp; <em>Liputan</em>
              </>
            }
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((a) => (
              <NewsCard key={a.id} article={a} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/news" className={buttonVariants("outline")}>
              Lihat Semua Berita
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative overflow-hidden bg-crimson-deep px-5 py-20 text-center md:py-24">
        <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--color-crimson-light),var(--color-gold),var(--color-crimson-light))]" />
        <div className="relative z-10 mx-auto max-w-[700px]">
          <div className="mb-4 text-[10px] font-bold uppercase tracking-[4px] text-gold">
            {home.ctaEyebrow}
          </div>
          <h2 className="mb-3.5 font-serif text-[clamp(30px,5vw,60px)] font-bold text-cream">
            {home.ctaTitle.includes("PUFA Law") ? (
              <>
                {home.ctaTitle.split("PUFA Law")[0]}
                <em className="italic text-gold-light">PUFA Law</em>
                {home.ctaTitle.split("PUFA Law")[1]}
              </>
            ) : (
              home.ctaTitle
            )}
          </h2>
          <p className="mb-9 text-[13px] leading-[1.8] text-white/55">{home.ctaDesc}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className={buttonVariants("primary")}>
              {home.ctaBtn}
            </Link>
            <Link href="/about" className={buttonVariants("outlineWhite")}>
              Tentang Kami
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
