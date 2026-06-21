import type { Metadata } from "next";
import { getContact } from "@/lib/data";
import { PageHero } from "@/components/site/PageHero";
import { ContactForm } from "@/components/site/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Hubungi PUFA Law untuk konsultasi, keanggotaan, atau kerjasama.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const c = await getContact();

  const items = [
    { icon: "LOC", label: "Alamat", val: c.address },
    { icon: "TEL", label: "Telepon", val: c.phone },
    { icon: "MAIL", label: "Email", val: c.email },
    { icon: "JAM", label: "Jam Operasional", val: c.hours },
  ];

  // Tagline dengan "PUFA Law" disorot crimson.
  const taglineParts = c.tagline.split("PUFA Law");

  return (
    <>
      <PageHero title={<>Hubungi <em>Kami</em></>} subtitle="Get In Touch" breadcrumb="Contact Us" />

      <section className="container-pufa py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          {/* Info */}
          <div>
            <div className="mb-3 flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[4px] text-crimson before:h-0.5 before:w-7 before:bg-crimson">
              Kontak Kami
            </div>
            <h2 className="mb-4 font-serif text-[clamp(28px,4vw,36px)] font-bold leading-[1.2] text-ink">
              {taglineParts.length > 1 ? (
                <>
                  {taglineParts[0]}
                  <em className="italic text-crimson">PUFA Law</em>
                  {taglineParts[1]}
                </>
              ) : (
                c.tagline
              )}
            </h2>
            <p className="mb-9 text-[13px] leading-[1.85] text-body-light">{c.desc}</p>

            <div className="flex flex-col gap-[22px]">
              {items.map((it) => (
                <div key={it.label} className="flex items-start gap-4">
                  <div className="flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center border border-crimson/15 bg-offwhite font-serif text-xs font-bold tracking-[1px] text-gold-dark">
                    {it.icon}
                  </div>
                  <div>
                    <div className="mb-1 text-[10px] font-bold uppercase tracking-[2px] text-gold">
                      {it.label}
                    </div>
                    <div className="whitespace-pre-line text-[13px] leading-[1.7] text-body">
                      {it.val}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <ContactForm purposes={c.formOptions} />
        </div>
      </section>
    </>
  );
}
