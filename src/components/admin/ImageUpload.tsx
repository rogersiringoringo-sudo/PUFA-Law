"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { uploadImage } from "@/actions/upload";

/**
 * Upload gambar ke Supabase Storage lalu simpan public URL pada hidden input
 * (`name`) supaya ikut terkirim saat form entity (event/gallery/dll) disubmit.
 */
export function ImageUpload({
  name = "imageUrl",
  defaultUrl,
  folder = "misc",
  label = "Foto",
}: {
  name?: string;
  defaultUrl?: string | null;
  folder?: string;
  label?: string;
}) {
  const [url, setUrl] = useState(defaultUrl ?? "");
  const [error, setError] = useState("");
  const [pending, start] = useTransition();

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.set("file", file);
    fd.set("folder", folder);
    setError("");
    start(async () => {
      const res = await uploadImage(null, fd);
      if (res?.error) setError(res.error);
      else if (res?.url) setUrl(res.url);
    });
  }

  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[2px] text-body-light">
        {label}
      </label>
      <input type="hidden" name={name} value={url} readOnly />
      <div className="flex items-center gap-3">
        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden border border-crimson/15 bg-offwhite">
          {url ? (
            <Image src={url} alt="preview" fill className="object-cover" sizes="80px" />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-[10px] text-body-light">
              Tidak ada
            </span>
          )}
        </div>
        <label className="cursor-pointer border border-gold px-3 py-2 text-[10px] font-bold uppercase tracking-[1px] text-gold-dark transition-colors hover:bg-gold hover:text-ink">
          {pending ? "Mengunggah..." : url ? "Ganti Foto" : "Pilih Foto"}
          <input type="file" accept="image/*" className="hidden" onChange={onChange} disabled={pending} />
        </label>
      </div>
      {error && <p className="mt-1.5 text-[11px] font-semibold text-crimson">{error}</p>}
      <p className="mt-1 text-[10px] text-body-light">JPG/PNG/WebP, maks. 5MB.</p>
    </div>
  );
}
