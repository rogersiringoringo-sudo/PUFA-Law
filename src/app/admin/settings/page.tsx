import { getSettings } from "@/lib/data";
import { saveSettings } from "@/actions/admin";
import { SingletonForm } from "@/components/admin/SingletonForm";
import { Field, TextArea } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const s = await getSettings();

  return (
    <SingletonForm title="Pengaturan Situs & Footer" action={saveSettings}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Nama Situs" name="siteName" defaultValue={s.siteName} />
        <Field label="Tagline" name="tagline" defaultValue={s.tagline} />
        <Field label="Email Utama" name="emailUtama" type="email" defaultValue={s.emailUtama} />
        <Field label="Nomor WhatsApp" name="whatsapp" defaultValue={s.whatsapp} />
      </div>
      <Field label="Teks Copyright" name="copyright" defaultValue={s.copyright} />
      <TextArea label="Deskripsi Footer" name="footerDesc" defaultValue={s.footerDesc} rows={2} />
      <Field label="Teks Kanan Footer" name="footerRight" defaultValue={s.footerRight} />
    </SingletonForm>
  );
}
