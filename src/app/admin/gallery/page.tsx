import { prisma } from "@/lib/prisma";
import {
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  createFilter,
  deleteFilter,
} from "@/actions/admin";
import { EditBlock, Field, SelectField, SaveButton } from "@/components/admin/ui";
import { Disclosure } from "@/components/admin/Disclosure";
import { DeleteForm } from "@/components/admin/DeleteForm";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { MediaBox } from "@/components/site/MediaBox";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const [items, filters] = await Promise.all([
    prisma.galleryItem.findMany({ orderBy: { order: "asc" } }),
    prisma.galleryFilter.findMany({ orderBy: { order: "asc" } }),
  ]);
  const categoryOptions = filters.map((f) => f.name).filter((n) => n !== "Semua");

  return (
    <div className="space-y-6">
      <EditBlock title="Kelola Foto Gallery">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {items.map((g) => (
            <div key={g.id} className="border border-crimson/10">
              <MediaBox imageUrl={g.imageUrl} bg={g.bg} label={g.label} alt={g.title} className="h-[120px] text-sm" />
              <div className="p-2.5">
                <div className="truncate text-[11px] font-bold text-ink">{g.title}</div>
                <div className="text-[10px] text-body-light">Kategori: {g.category}</div>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <Disclosure summary="Edit">
                    <form action={updateGalleryItem} className="space-y-3">
                      <input type="hidden" name="id" value={g.id} />
                      <Field label="Judul" name="title" defaultValue={g.title} />
                      <SelectField
                        label="Kategori"
                        name="category"
                        defaultValue={g.category}
                        options={categoryOptions.length ? categoryOptions : [g.category]}
                      />
                      <Field label="Label" name="label" defaultValue={g.label} />
                      <ImageUpload folder="gallery" defaultUrl={g.imageUrl} label="Foto" />
                      <SaveButton />
                    </form>
                  </Disclosure>
                  <DeleteForm action={deleteGalleryItem} id={g.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Disclosure summary="Tambah Foto">
            <form action={createGalleryItem} className="space-y-3">
              <Field label="Judul Foto" name="title" placeholder="Judul foto..." />
              <SelectField
                label="Kategori"
                name="category"
                options={categoryOptions.length ? categoryOptions : ["Events"]}
              />
              <Field label="Label (teks pada kartu)" name="label" placeholder="mis. GALA NIGHT" />
              <ImageUpload folder="gallery" label="Foto" />
              <p className="text-[11px] text-body-light">
                Jika tidak mengunggah foto, kartu akan tampil sebagai gradient + label.
              </p>
              <SaveButton label="Tambah Foto" />
            </form>
          </Disclosure>
        </div>
      </EditBlock>

      <EditBlock title="Kelola Filter Kategori">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <div key={f.id} className="flex items-center gap-2 border border-crimson/15 bg-offwhite px-3 py-1.5">
              <span className="text-[12px] text-body">{f.name}</span>
              <DeleteForm action={deleteFilter} id={f.id} label="X" />
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Disclosure summary="Tambah Filter">
            <form action={createFilter} className="flex items-end gap-3">
              <div className="flex-1">
                <Field label="Nama Filter" name="name" placeholder="Nama filter..." />
              </div>
              <SaveButton label="Tambah" />
            </form>
          </Disclosure>
        </div>
      </EditBlock>
    </div>
  );
}
