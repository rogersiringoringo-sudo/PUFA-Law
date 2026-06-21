import Link from "next/link";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { buttonVariants } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="mt-[60px] flex min-h-[calc(100vh-60px)] flex-col items-center justify-center bg-[linear-gradient(135deg,var(--color-ink)_0%,var(--color-crimson-deep)_60%,var(--color-crimson)_100%)] px-6 py-20 text-center md:mt-[68px] md:min-h-[calc(100vh-68px)]">
        <div className="font-serif text-[120px] font-bold leading-none text-gold-light">404</div>
        <h1 className="mt-2 font-serif text-3xl font-bold text-cream">Halaman Tidak Ditemukan</h1>
        <p className="mb-8 mt-3 max-w-md text-sm leading-relaxed text-white/60">
          Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className={buttonVariants("gold")}>
            Kembali ke Beranda
          </Link>
          <Link href="/contact" className={buttonVariants("outlineWhite")}>
            Hubungi Kami
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
