import { prisma } from "@/lib/prisma";
import { createAdminUser, deleteAdminUser, changePassword } from "@/actions/admin";
import { SingletonForm } from "@/components/admin/SingletonForm";
import { EditBlock, Field, SelectField } from "@/components/admin/ui";
import { DeleteForm } from "@/components/admin/DeleteForm";
import { Badge } from "@/components/ui/Badge";

export const dynamic = "force-dynamic";

const ROLES = ["Editor", "Admin", "Super Admin"];

export default async function AdminUsersPage() {
  const users = await prisma.adminUser.findMany({ orderBy: { id: "asc" } });

  return (
    <div className="space-y-6">
      <EditBlock title="Pengguna Admin">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-ink text-left text-[10px] font-bold uppercase tracking-[1px] text-gold">
                <th className="px-3 py-2.5">Nama</th>
                <th className="px-3 py-2.5">Email</th>
                <th className="px-3 py-2.5">Role</th>
                <th className="px-3 py-2.5"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-crimson/10 text-[12px] text-body">
                  <td className="px-3 py-2.5 font-semibold text-ink">{u.name}</td>
                  <td className="px-3 py-2.5">{u.email}</td>
                  <td className="px-3 py-2.5">
                    <Badge variant={u.role === "Super Admin" ? "crimson" : "gold"}>{u.role}</Badge>
                  </td>
                  <td className="px-3 py-2.5 text-right">
                    {users.length > 1 && <DeleteForm action={deleteAdminUser} id={u.id} />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </EditBlock>

      <SingletonForm title="Tambah Admin Baru" action={createAdminUser}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="Nama Lengkap" name="name" placeholder="Nama..." />
          <Field label="Email" name="email" type="email" placeholder="email@pufalaw.id" />
          <SelectField label="Role" name="role" options={ROLES} />
          <Field label="Password (min. 6 karakter)" name="password" type="password" placeholder="Password..." />
        </div>
      </SingletonForm>

      <SingletonForm title="Ubah Password Saya" action={changePassword}>
        <Field label="Password Baru (min. 6 karakter)" name="password" type="password" placeholder="Password baru..." />
      </SingletonForm>
    </div>
  );
}
