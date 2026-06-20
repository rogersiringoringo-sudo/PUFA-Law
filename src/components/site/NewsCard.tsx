import Link from "next/link";
import type { Article } from "@/types/content";
import { MediaBox } from "@/components/site/MediaBox";

export function NewsCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/news/${article.slug}`}
      className="group block overflow-hidden border border-crimson/15 bg-cream transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(176,16,32,0.12)]"
    >
      <MediaBox
        imageUrl={article.imageUrl}
        bg={article.bg}
        label={article.label}
        alt={article.title}
        className="h-[170px]"
      />
      <div className="h-[3px] bg-crimson" />
      <div className="p-5">
        <div className="mb-2 text-[9.5px] font-bold uppercase tracking-[2px] text-crimson">
          {article.category}
        </div>
        <h3 className="mb-2 font-serif text-lg font-bold leading-[1.3] text-ink transition-colors group-hover:text-crimson">
          {article.title}
        </h3>
        <p className="line-clamp-3 text-xs leading-[1.65] text-body-light">{article.excerpt}</p>
      </div>
    </Link>
  );
}
