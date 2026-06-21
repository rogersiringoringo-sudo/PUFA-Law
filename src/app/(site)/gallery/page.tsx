import type { Metadata } from "next";
import { getGallery } from "@/lib/data";
import { PageHero } from "@/components/site/PageHero";
import { GalleryGrid } from "@/components/site/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Koleksi foto dan dokumentasi momen berharga PUFA Law.",
  alternates: { canonical: "/gallery" },
};

export default async function GalleryPage() {
  const { items, filters } = await getGallery();

  return (
    <>
      <PageHero title={<>Our <em>Gallery</em></>} subtitle="Moments & Memories" breadcrumb="Gallery" />

      <section className="container-pufa py-16 md:py-20">
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[4px] text-crimson before:h-0.5 before:w-7 before:bg-crimson">
            Koleksi Foto
          </div>
          <h2 className="font-serif text-[clamp(26px,4vw,46px)] font-bold leading-[1.1] text-ink">
            Momen <em className="italic text-crimson">Berharga</em>
          </h2>
          <div className="mt-4 h-[3px] w-12 bg-crimson" />
        </div>

        <GalleryGrid items={items} filters={filters} />
      </section>
    </>
  );
}
