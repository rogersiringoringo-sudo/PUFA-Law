"use client";

import { useActionState } from "react";
import type { ReactNode } from "react";
import { EditBlock, SaveButton, FormFeedback, type ActionState } from "@/components/admin/ui";

/**
 * Form untuk konten singleton (Home/About/Settings/dst). Menerima Server Action
 * lewat prop `action` dan menampilkan feedback "Tersimpan" via `useActionState`.
 * Field-nya dikirim sebagai children dari Server Component pemanggil.
 */
export function SingletonForm({
  title,
  action,
  children,
}: {
  title: string;
  action: (prev: ActionState, fd: FormData) => Promise<ActionState>;
  children: ReactNode;
}) {
  const [state, formAction] = useActionState(action, null);

  return (
    <form action={formAction}>
      <EditBlock title={title} action={<SaveButton />}>
        <div className="space-y-4">{children}</div>
        <div className="mt-4">
          <FormFeedback state={state} />
        </div>
      </EditBlock>
    </form>
  );
}
