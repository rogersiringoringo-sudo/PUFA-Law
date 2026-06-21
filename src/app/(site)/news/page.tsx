import type { Metadata } from "next";
import Link from "next/link";
import { getNews } from "@/lib/data";
import { PageHero } from "@/components/site/PageHero";
import { NewsCard } from "@/components/site/NewsCard";
import { Reveal } from "@/components/site/Reveal";
import { buttonVariants } from "@/components/ui/Button";
import { formatDateLong, slugify } from "@/lib/utils";

export const metadata: Metadata = {
  title: "News",
  description: "Berita, artikel, dan jurnal terbaru dari PUFA Law.",
  alternates: { canonical: "/news" },
};

export default async function NewsPage() {
  const news = await getNews();
  const f = news.featured;
  const published = news.articles.filter((a) => a.status === "Published");

  return (
    <>
      <PageHero title={<>Berita &amp; <em>Jurnal</em></>} subtitle="News & Updates" breadcrumb="News" />

      <section className="container-pufa py-16 md:py-20">
        <Reveal className="mb-10">
          <div className="mb-3 flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[4px] text-crimson before:h-0.5 before:w-7 before:bg-crimson">
            Terbaru dari PUFA Law
          </div>
          <h2 className="font-serif text-[clamp(26px,4vw,46px)] font-bold leading-[1.1] text-ink">
            Berita &amp; <em className="italic text-crimson">Artikel</em>
          </h2>
          <div className="mt-4 h-[3px] w-12 bg-crimson" />
        </Reveal>

        {/* Featured */}
        <Reveal delay={120} className="mb-12 grid grid-cols-1 gap-8 md:mb-14 md:grid-cols-[1.5fr_1fr]">
          <div className="relative flex h-[260px] items-center justify-center border border-crimson/15 bg-[linear-gradient(135deg,var(--color-ink),var(--color-crimson))] font-serif text-[28px] font-bold tracking-[4px] text-gold-light md:h-[360px]">
            PUFA LAW
            <span className="absolute left-5 top-5 bg-gold px-3.5 py-[5px] text-[9px] font-bold uppercase tracking-[2px] text-ink">
              Featured
            </span>
          </div>
          <div className="flex flex-col justify-center">
            <div className="mb-2.5 text-[10px] font-bold uppercase tracking-[2px] text-gold-dark">
              {f.category}
            </div>
            <h3 className="mb-3 font-serif text-[26px] font-bold leading-[1.3] text-ink">{f.title}</h3>
            <p className="mb-4 text-[13px] leading-[1.85] text-body-light">{f.excerpt}</p>
            <div className="mb-5 flex flex-wrap gap-4 text-[11px] text-body-light">
              <span>{formatDateLong(f.date)}</span>
              <span>{f.author}</span>
              <span>{f.readtime}</span>
            </div>
            <div>
              <Link href={`/news/${slugify(f.title)}`} className={buttonVariants("primary")}>
                Baca Selengkapnya
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Articles */}
        <Reveal>
          <div className="mb-5 flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[4px] text-crimson before:h-0.5 before:w-7 before:bg-crimson">
            Artikel Terbaru
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {published.map((a) => (
              <NewsCard key={a.id} article={a} />
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}
