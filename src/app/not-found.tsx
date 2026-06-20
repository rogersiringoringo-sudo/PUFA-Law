import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[linear-gradient(135deg,var(--color-ink)_0%,var(--color-crimson-deep)_60%,var(--color-crimson)_100%)] px-6 text-center">
      <div className="font-serif text-[120px] font-bold leading-none text-gold-light">404</div>
      <h1 className="mt-2 font-serif text-3xl font-bold text-cream">Halaman Tidak Ditemukan</h1>
      <p className="mb-8 mt-3 max-w-md text-sm leading-relaxed text-white/60">
        Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
      </p>
      <Link href="/" className={buttonVariants("gold")}>
        Kembali ke Beranda
      </Link>
    </main>
  );
}
