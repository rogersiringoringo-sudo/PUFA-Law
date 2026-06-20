import { DeleteButton } from "@/components/admin/ui";

/** Form hapus 1 item (server action menerima FormData dengan field `id`). */
export function DeleteForm({
  action,
  id,
  label,
}: {
  action: (fd: FormData) => Promise<void>;
  id: number;
  label?: string;
}) {
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <DeleteButton label={label} />
    </form>
  );
}
