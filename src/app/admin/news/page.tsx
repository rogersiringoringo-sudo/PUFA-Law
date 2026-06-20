import { getNews } from "@/lib/data";
import { saveNewsFeatured, createArticle, updateArticle, deleteArticle } from "@/actions/admin";
import { SingletonForm } from "@/components/admin/SingletonForm";
import { EditBlock, Field, TextArea, SelectField, SaveButton } from "@/components/admin/ui";
import { Disclosure } from "@/components/admin/Disclosure";
import { DeleteForm } from "@/components/admin/DeleteForm";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import type { Article } from "@/types/content";

export const dynamic = "force-dynamic";

const CATEGORIES = ["Hukum", "Event", "Komunitas", "Pengumuman"];
const STATUSES = ["Published", "Draft"];

function ArticleFields({ a }: { a?: Article }) {
  return (
    <>
      <Field label="Judul Artikel" name="title" defaultValue={a?.title} placeholder="Judul artikel..." />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <SelectField label="Kategori" name="category" defaultValue={a?.category} options={CATEGORIES} />
        <Field label="Penulis" name="author" defaultValue={a?.author ?? "Admin"} />
        <Field label="Tanggal Terbit" name="date" type="date" defaultValue={a?.date} />
        <SelectField label="Status" name="status" defaultValue={a?.status} options={STATUSES} />
      </div>
      <TextArea label="Ringkasan (Excerpt)" name="excerpt" defaultValue={a?.excerpt} rows={2} />
      <TextArea label="Isi Artikel" name="content" defaultValue={a?.content} rows={6} />
      <ImageUpload folder="news" defaultUrl={a?.imageUrl} label="Foto Artikel" />
    </>
  );
}

export default async function AdminNewsPage() {
  const news = await getNews();

  return (
    <div className="space-y-6">
      <EditBlock title="Daftar Artikel & Berita">
        <div className="space-y-3">
          {news.articles.map((a) => (
            <div key={a.id} className="border border-crimson/10 p-3">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-[13px] font-bold text-ink">{a.title}</div>
                  <div className="text-[11px] text-body-light">
                    {a.category} · {a.author} · {formatDate(a.date)}
                  </div>
                </div>
                <div className="flex flex-shrink-0 items-center gap-2">
                  <Badge variant={a.status === "Published" ? "green" : "gold"}>{a.status}</Badge>
                  <DeleteForm action={deleteArticle} id={a.id} />
                </div>
              </div>
              <div className="mt-2">
                <Disclosure summary="Edit Artikel">
                  <form action={updateArticle} className="space-y-3">
                    <input type="hidden" name="id" value={a.id} />
                    <ArticleFields a={a} />
                    <SaveButton />
                  </form>
                </Disclosure>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Disclosure summary="Tulis Artikel">
            <form action={createArticle} className="space-y-3">
              <ArticleFields />
              <SaveButton label="Simpan Artikel" />
            </form>
          </Disclosure>
        </div>
      </EditBlock>

      <SingletonForm title="Artikel Featured (tampil di atas halaman News)" action={saveNewsFeatured}>
        <Field label="Judul Artikel Featured" name="title" defaultValue={news.featured.title} />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="Kategori" name="category" defaultValue={news.featured.category} />
          <Field label="Penulis" name="author" defaultValue={news.featured.author} />
          <Field label="Tanggal Terbit" name="date" type="date" defaultValue={news.featured.date} />
          <Field label="Estimasi Baca" name="readtime" defaultValue={news.featured.readtime} />
        </div>
        <TextArea label="Ringkasan / Excerpt" name="excerpt" defaultValue={news.featured.excerpt} rows={3} />
      </SingletonForm>
    </div>
  );
}
