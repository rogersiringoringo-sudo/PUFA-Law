import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNews } from "@/lib/data";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { buttonVariants } from "@/components/ui/Button";
import { formatDateLong, slugify } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

/** Cari artikel berdasarkan slug — termasuk artikel featured. */
async function resolveArticle(slug: string) {
  const news = await getNews();
  const article = news.articles.find((a) => a.slug === slug);
  if (article) return { ...article, readtime: undefined as string | undefined };

  const f = news.featured;
  if (slugify(f.title) === slug) {
    return {
      title: f.title,
      category: f.category,
      author: f.author,
      date: f.date,
      excerpt: f.excerpt,
      content: f.content,
      readtime: f.readtime,
    };
  }
  return null;
}

export async function generateStaticParams() {
  const news = await getNews();
  return [
    { slug: slugify(news.featured.title) },
    ...news.articles.map((a) => ({ slug: a.slug })),
  ];
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = await resolveArticle(slug);
  if (!article) return { title: "Artikel tidak ditemukan" };
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/news/${slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      images: ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: ["/opengraph-image"],
    },
  };
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = await resolveArticle(slug);
  if (!article) notFound();

  return (
    <>
      <PageHero title={article.title} subtitle={article.category} breadcrumb="News" />

      <article className="container-pufa max-w-[820px] py-16 md:py-20">
        <Link
          href="/news"
          className="mb-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[2px] text-crimson hover:underline"
        >
          ← Kembali ke News
        </Link>

        <div className="mb-4 text-[10px] font-bold uppercase tracking-[2px] text-gold-dark">
          {article.category}
        </div>
        <div className="mb-8 flex flex-wrap gap-4 border-b border-crimson/15 pb-6 text-[11px] text-body-light">
          <span>{formatDateLong(article.date)}</span>
          <span>oleh {article.author}</span>
          {article.readtime && <span>{article.readtime}</span>}
        </div>

        <Reveal className="prose-pufa space-y-5 text-[15px] leading-[1.9] text-body">
          <p className="font-serif text-[20px] italic leading-[1.5] text-crimson">{article.excerpt}</p>
          {article.content ? (
            article.content.split("\n\n").map((para, i) => <p key={i}>{para}</p>)
          ) : (
            <p className="text-body-light">
              Isi artikel lengkap akan segera tersedia. Untuk informasi lebih lanjut, silakan hubungi
              tim PUFA Law melalui halaman kontak.
            </p>
          )}
        </Reveal>

        <div className="mt-12 border-t border-crimson/15 pt-8">
          <Link href="/contact" className={buttonVariants("outline")}>
            Hubungi Kami
          </Link>
        </div>
      </article>
    </>
  );
}
