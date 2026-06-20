import { getTeam } from "@/lib/data";
import {
  saveTeamFeatured,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "@/actions/admin";
import { SingletonForm } from "@/components/admin/SingletonForm";
import { EditBlock, Field, TextArea, SelectField, SaveButton } from "@/components/admin/ui";
import { Disclosure } from "@/components/admin/Disclosure";
import { DeleteForm } from "@/components/admin/DeleteForm";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Badge } from "@/components/ui/Badge";
import type { TeamMember } from "@/types/content";

export const dynamic = "force-dynamic";

const STATUSES = ["Aktif", "Tidak Aktif"];

function MemberFields({ m }: { m?: TeamMember }) {
  return (
    <>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <Field label="Nama Lengkap" name="name" defaultValue={m?.name} placeholder="Nama..." />
        <Field label="Jabatan" name="role" defaultValue={m?.role} placeholder="Jabatan..." />
        <Field label="Departemen / Divisi" name="dept" defaultValue={m?.dept} placeholder="Divisi..." />
        <SelectField label="Status" name="status" defaultValue={m?.status} options={STATUSES} />
      </div>
      <ImageUpload folder="team" defaultUrl={m?.imageUrl} label="Foto Anggota" />
    </>
  );
}

export default async function AdminTeamPage() {
  const team = await getTeam();

  return (
    <div className="space-y-6">
      <SingletonForm title="Pemimpin Utama (Featured)" action={saveTeamFeatured}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="Nama Lengkap" name="name" defaultValue={team.featured.name} />
          <Field label="Jabatan" name="role" defaultValue={team.featured.role} />
        </div>
        <TextArea label="Biografi" name="bio" defaultValue={team.featured.bio} rows={4} />
        <ImageUpload folder="team" defaultUrl={team.featured.imageUrl} label="Foto Pemimpin" />
      </SingletonForm>

      <EditBlock title="Anggota Tim">
        <div className="space-y-3">
          {team.members.map((m) => (
            <div key={m.id} className="border border-crimson/10 p-3">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-[13px] font-bold text-ink">{m.name}</div>
                  <div className="text-[11px] text-body-light">
                    {m.role} · {m.dept}
                  </div>
                </div>
                <div className="flex flex-shrink-0 items-center gap-2">
                  <Badge variant={m.status === "Aktif" ? "green" : "crimson"}>{m.status}</Badge>
                  <DeleteForm action={deleteTeamMember} id={m.id} />
                </div>
              </div>
              <div className="mt-2">
                <Disclosure summary="Edit Anggota">
                  <form action={updateTeamMember} className="space-y-3">
                    <input type="hidden" name="id" value={m.id} />
                    <MemberFields m={m} />
                    <SaveButton />
                  </form>
                </Disclosure>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Disclosure summary="Tambah Anggota">
            <form action={createTeamMember} className="space-y-3">
              <MemberFields />
              <SaveButton label="Tambah Anggota" />
            </form>
          </Disclosure>
        </div>
      </EditBlock>
    </div>
  );
}
