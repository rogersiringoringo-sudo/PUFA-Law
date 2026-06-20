import { prisma } from "@/lib/prisma";
import { getContact } from "@/lib/data";
import {
  saveContactInfo,
  createFormOption,
  deleteFormOption,
  markMessageRead,
  deleteMessage,
} from "@/actions/admin";
import { SingletonForm } from "@/components/admin/SingletonForm";
import { EditBlock, Field, TextArea, SaveButton } from "@/components/admin/ui";
import { Disclosure } from "@/components/admin/Disclosure";
import { DeleteForm } from "@/components/admin/DeleteForm";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminContactPage() {
  const c = await getContact();
  const [formOptions, messages] = await Promise.all([
    prisma.formOption.findMany({ orderBy: { order: "asc" } }),
    prisma.message.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <div className="space-y-6">
      <SingletonForm title="Informasi Kontak" action={saveContactInfo}>
        <Field label="Tagline Kontak" name="tagline" defaultValue={c.tagline} />
        <TextArea label="Deskripsi" name="desc" defaultValue={c.desc} rows={2} />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <TextArea label="Alamat" name="address" defaultValue={c.address} rows={2} />
          <TextArea label="Nomor Telepon" name="phone" defaultValue={c.phone} rows={2} />
          <TextArea label="Email" name="email" defaultValue={c.email} rows={2} />
          <TextArea label="Jam Operasional" name="hours" defaultValue={c.hours} rows={2} />
        </div>
      </SingletonForm>

      <EditBlock title="Opsi Dropdown Form Kontak">
        <div className="space-y-2">
          {formOptions.map((o) => (
            <div key={o.id} className="flex items-center justify-between gap-3 border border-crimson/10 px-3 py-2">
              <span className="text-[13px] text-body">{o.label}</span>
              <DeleteForm action={deleteFormOption} id={o.id} />
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Disclosure summary="Tambah Opsi">
            <form action={createFormOption} className="flex items-end gap-3">
              <div className="flex-1">
                <Field label="Opsi Baru" name="label" placeholder="mis. Konsultasi Hukum" />
              </div>
              <SaveButton label="Tambah" />
            </form>
          </Disclosure>
        </div>
      </EditBlock>

      <EditBlock title={`Pesan Masuk (${messages.length})`}>
        {messages.length === 0 ? (
          <p className="text-sm text-body-light">Belum ada pesan masuk.</p>
        ) : (
          <div className="space-y-3">
            {messages.map((m) => (
              <div key={m.id} className="border border-crimson/10 p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-[13px] font-bold text-ink">
                      {m.name} <span className="font-normal text-body-light">· {m.email}</span>
                    </div>
                    <div className="text-[11px] text-body-light">
                      {m.purpose} · {formatDate(m.createdAt.toISOString())}
                      {m.phone ? ` · ${m.phone}` : ""}
                    </div>
                  </div>
                  <div className="flex flex-shrink-0 items-center gap-2">
                    <Badge variant={m.status === "Dibaca" ? "green" : "gold"}>{m.status}</Badge>
                    {m.status !== "Dibaca" && (
                      <form action={markMessageRead}>
                        <input type="hidden" name="id" value={m.id} />
                        <button
                          type="submit"
                          className="cursor-pointer border border-gold-dark px-3 py-1.5 text-[10px] font-bold uppercase tracking-[1px] text-gold-dark transition-colors hover:bg-gold-dark hover:text-cream"
                        >
                          Tandai dibaca
                        </button>
                      </form>
                    )}
                    <DeleteForm action={deleteMessage} id={m.id} />
                  </div>
                </div>
                <p className="mt-2 whitespace-pre-line border-t border-crimson/10 pt-2 text-[12px] text-body">
                  {m.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </EditBlock>
    </div>
  );
}
