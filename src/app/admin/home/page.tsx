import { getHome } from "@/lib/data";
import { saveHome } from "@/actions/admin";
import { SingletonForm } from "@/components/admin/SingletonForm";
import { Field, TextArea } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  const h = await getHome();

  return (
    <SingletonForm title="Halaman Home — Hero, Statistik & CTA" action={saveHome}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Eyebrow" name="eyebrow" defaultValue={h.eyebrow} />
        <Field label="Sub Text" name="sub" defaultValue={h.sub} />
      </div>
      <Field label="Judul Hero (pakai | untuk baris baru)" name="title" defaultValue={h.title} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Teks Tombol 1" name="btn1" defaultValue={h.btn1} />
        <Field label="Teks Tombol 2" name="btn2" defaultValue={h.btn2} />
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        <Field label="Angka 1" name="stat1num" defaultValue={h.stats[0].num} />
        <Field label="Label 1" name="stat1label" defaultValue={h.stats[0].label} />
        <div className="hidden md:block" />
        <Field label="Angka 2" name="stat2num" defaultValue={h.stats[1].num} />
        <Field label="Label 2" name="stat2label" defaultValue={h.stats[1].label} />
        <div className="hidden md:block" />
        <Field label="Angka 3" name="stat3num" defaultValue={h.stats[2].num} />
        <Field label="Label 3" name="stat3label" defaultValue={h.stats[2].label} />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="CTA Eyebrow" name="ctaEyebrow" defaultValue={h.ctaEyebrow} />
        <Field label="CTA Teks Tombol" name="ctaBtn" defaultValue={h.ctaBtn} />
      </div>
      <Field label="CTA Judul" name="ctaTitle" defaultValue={h.ctaTitle} />
      <TextArea label="CTA Deskripsi" name="ctaDesc" defaultValue={h.ctaDesc} rows={2} />
    </SingletonForm>
  );
}
