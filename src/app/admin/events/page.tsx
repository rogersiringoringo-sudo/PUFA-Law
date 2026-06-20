import { getEvents, getPanitia } from "@/lib/data";
import { createEvent, updateEvent, deleteEvent, createPanitia, deletePanitia } from "@/actions/admin";
import { EditBlock, Field, TextArea, SelectField, SaveButton } from "@/components/admin/ui";
import { Disclosure } from "@/components/admin/Disclosure";
import { DeleteForm } from "@/components/admin/DeleteForm";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import type { EventItem } from "@/types/content";

export const dynamic = "force-dynamic";

const CATEGORIES = ["Gala Dinner", "Seminar", "Exhibition", "Workshop", "Konferensi"];
const STATUSES = ["Upcoming", "Selesai"];

function EventFields({ ev }: { ev?: EventItem }) {
  return (
    <>
      <Field label="Nama Event" name="name" defaultValue={ev?.name} placeholder="Nama event..." />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <Field label="Tanggal" name="date" type="date" defaultValue={ev?.date} />
        <Field label="Jam Mulai" name="time" defaultValue={ev?.time ?? "19:00"} placeholder="19:00" />
        <SelectField label="Kategori" name="category" defaultValue={ev?.category} options={CATEGORIES} />
        <SelectField label="Status" name="status" defaultValue={ev?.status} options={STATUSES} />
      </div>
      <Field label="Lokasi" name="location" defaultValue={ev?.location} placeholder="Lokasi..." />
      <TextArea label="Deskripsi" name="desc" defaultValue={ev?.desc} rows={3} />
      <Field label="Teks Tombol" name="btn" defaultValue={ev?.btn ?? "DAFTAR SEKARANG"} />
      <ImageUpload folder="events" defaultUrl={ev?.imageUrl} label="Foto Event" />
    </>
  );
}

export default async function AdminEventsPage() {
  const [events, panitia] = await Promise.all([getEvents(), getPanitia()]);
  const eventNames = [...new Set(panitia.map((p) => p.event))];

  return (
    <div className="space-y-6">
      <EditBlock title="Daftar Events">
        <div className="space-y-3">
          {events.map((e) => (
            <div key={e.id} className="border border-crimson/10 p-3">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-[13px] font-bold text-ink">{e.name}</div>
                  <div className="text-[11px] text-body-light">
                    {formatDate(e.date)} · {e.location}
                  </div>
                </div>
                <div className="flex flex-shrink-0 items-center gap-2">
                  <Badge variant={e.status === "Upcoming" ? "gold" : "crimson"}>{e.status}</Badge>
                  <DeleteForm action={deleteEvent} id={e.id} />
                </div>
              </div>
              <div className="mt-2">
                <Disclosure summary="Edit Event">
                  <form action={updateEvent} className="space-y-3">
                    <input type="hidden" name="id" value={e.id} />
                    <EventFields ev={e} />
                    <SaveButton />
                  </form>
                </Disclosure>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Disclosure summary="Tambah Event">
            <form action={createEvent} className="space-y-3">
              <EventFields />
              <SaveButton label="Tambah Event" />
            </form>
          </Disclosure>
        </div>
      </EditBlock>

      {/* Panitia */}
      <EditBlock title="Panitia Events">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-ink text-left text-[10px] font-bold uppercase tracking-[1px] text-gold">
                <th className="px-3 py-2.5">Nama</th>
                <th className="px-3 py-2.5">Jabatan</th>
                <th className="px-3 py-2.5">Divisi</th>
                <th className="px-3 py-2.5">Event</th>
                <th className="px-3 py-2.5"></th>
              </tr>
            </thead>
            <tbody>
              {panitia.map((p) => (
                <tr key={p.id} className="border-b border-crimson/10 text-[12px] text-body">
                  <td className="px-3 py-2.5 font-semibold text-ink">{p.name}</td>
                  <td className="px-3 py-2.5">{p.role}</td>
                  <td className="px-3 py-2.5">{p.division}</td>
                  <td className="px-3 py-2.5">{p.event}</td>
                  <td className="px-3 py-2.5 text-right">
                    <DeleteForm action={deletePanitia} id={p.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <Disclosure summary="Tambah Panitia">
            <form action={createPanitia} className="space-y-3">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <Field label="Nama" name="name" placeholder="Nama panitia..." />
                <Field label="Jabatan" name="role" placeholder="Jabatan..." />
                <Field label="Divisi" name="division" placeholder="Divisi..." />
                <SelectField
                  label="Event"
                  name="event"
                  options={eventNames.length ? eventNames : events.map((e) => e.name)}
                />
              </div>
              <SaveButton label="Tambah Panitia" />
            </form>
          </Disclosure>
        </div>
      </EditBlock>
    </div>
  );
}
