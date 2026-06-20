import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Kotak media: tampilkan foto asli bila ada `imageUrl`, jika tidak pakai
 * gradient + label (gaya lama). Dipakai di Gallery/Events/News/Team.
 */
export function MediaBox({
  imageUrl,
  bg,
  label,
  alt,
  className,
  labelClassName,
}: {
  imageUrl?: string | null;
  bg?: string;
  label?: string;
  alt: string;
  className?: string;
  labelClassName?: string;
}) {
  if (imageUrl) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image src={imageUrl} alt={alt} fill className="object-cover" sizes="(max-width:768px) 100vw, 400px" />
      </div>
    );
  }

  // Warna teks label: emas pada gradient gelap, putih pada lainnya.
  const darkBg = bg?.includes("2C24") || bg?.includes("1A14") || bg?.includes("2C20");
  return (
    <div
      className={cn(
        "flex items-center justify-center overflow-hidden font-serif text-[15px] font-bold tracking-[2px]",
        className,
      )}
      style={bg ? { backgroundImage: bg } : undefined}
    >
      <span className={cn(darkBg ? "text-gold-light" : "text-white/90", labelClassName)}>{label}</span>
    </div>
  );
}
