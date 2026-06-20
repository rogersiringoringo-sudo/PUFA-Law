import { prisma } from "@/lib/prisma";
import { getAbout } from "@/lib/data";
import {
  saveAbout,
  addAboutValue,
  updateAboutValue,
  deleteAboutValue,
  addTimelineItem,
  updateTimelineItem,
  deleteTimelineItem,
} from "@/actions/admin";
import { SingletonForm } from "@/components/admin/SingletonForm";
import { EditBlock, Field, TextArea, SaveButton } from "@/components/admin/ui";
import { Disclosure } from "@/components/admin/Disclosure";
import { DeleteForm } from "@/components/admin/DeleteForm";

export const dynamic = "force-dynamic";

export default async function AdminAboutPage() {
  const a = await getAbout();
  // Ambil id mentah untuk edit/hapus (getAbout tidak mengembalikan id).
  const raw = await prisma.aboutContent.findUnique({
    where: { id: 1 },
    include: { values: { orderBy: { order: "asc" } }, timeline: { orderBy: { order: "asc" } } },
  });
  const values = raw?.values ?? [];
  const timeline = raw?.timeline ?? [];

  return (
    <div className="space-y-6">
      <SingletonForm title="Konten Utama About" action={saveAbout}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="Tahun Berdiri (Badge)" name="badgeNum" defaultValue={a.badgeNum} />
          <Field label="Label Badge" name="badgeLabel" defaultValue={a.badgeLabel} />
        </div>
        <Field label="Quote / Tagline" name="quote" defaultValue={a.quote} />
        <TextArea label="Paragraf 1" name="para1" defaultValue={a.para1} />
        <TextArea label="Paragraf 2" name="para2" defaultValue={a.para2} />
      </SingletonForm>

      {/* Values */}
      <EditBlock title="Nilai-Nilai (Values)">
        <div className="space-y-3">
          {values.map((v) => (
            <div key={v.id} className="flex items-start gap-3 border border-crimson/10 p-3">
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-bold text-ink">{v.name}</div>
                <div className="text-xs text-body-light">{v.desc}</div>
                <Disclosure summary="Edit">
                  <form action={updateAboutValue} className="space-y-3">
                    <input type="hidden" name="id" value={v.id} />
                    <Field label="Nama" name="name" defaultValue={v.name} />
                    <TextArea label="Deskripsi" name="desc" defaultValue={v.desc} rows={2} />
                    <SaveButton />
                  </form>
                </Disclosure>
              </div>
              <DeleteForm action={deleteAboutValue} id={v.id} />
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Disclosure summary="Tambah Nilai">
            <form action={addAboutValue} className="space-y-3">
              <Field label="Nama" name="name" placeholder="Nama nilai..." />
              <TextArea label="Deskripsi" name="desc" rows={2} placeholder="Deskripsi..." />
              <SaveButton label="Tambah" />
            </form>
          </Disclosure>
        </div>
      </EditBlock>

      {/* Timeline */}
      <EditBlock title="Timeline / Milestones">
        <div className="space-y-3">
          {timeline.map((t) => (
            <div key={t.id} className="flex items-start gap-3 border border-crimson/10 p-3">
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-bold text-gold-dark">{t.year}</div>
                <div className="text-xs text-body-light">{t.desc}</div>
                <Disclosure summary="Edit">
                  <form action={updateTimelineItem} className="space-y-3">
                    <input type="hidden" name="id" value={t.id} />
                    <Field label="Tahun" name="year" defaultValue={t.year} />
                    <TextArea label="Deskripsi" name="desc" defaultValue={t.desc} rows={2} />
                    <SaveButton />
                  </form>
                </Disclosure>
              </div>
              <DeleteForm action={deleteTimelineItem} id={t.id} />
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Disclosure summary="Tambah Milestone">
            <form action={addTimelineItem} className="space-y-3">
              <Field label="Tahun" name="year" placeholder="2026" />
              <TextArea label="Deskripsi" name="desc" rows={2} placeholder="Deskripsi milestone..." />
              <SaveButton label="Tambah" />
            </form>
          </Disclosure>
        </div>
      </EditBlock>
    </div>
  );
}
