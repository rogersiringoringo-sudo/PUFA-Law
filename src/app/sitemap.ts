import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { getNews } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, "");
  const staticRoutes = ["", "/about", "/events", "/gallery", "/team", "/news", "/contact"].map(
    (path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    }),
  );

  let articleRoutes: MetadataRoute.Sitemap = [];
  try {
    const news = await getNews();
    articleRoutes = news.articles.map((a) => ({
      url: `${base}/news/${a.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch {
    // DB belum siap saat build — abaikan, halaman statis tetap masuk sitemap.
  }

  return [...staticRoutes, ...articleRoutes];
}
