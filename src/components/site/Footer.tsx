import Link from "next/link";
import { getContact, getSettings } from "@/lib/data";

export async function Footer() {
  const [settings, contact] = await Promise.all([getSettings(), getContact()]);

  const phone = contact.phone.split("\n")[0];
  const email = contact.email.split("\n")[0];

  return (
    <footer className="border-t-4 border-crimson bg-ink px-4 pb-7 pt-12 md:px-10 md:pt-16">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-7 sm:grid-cols-2 md:mb-10 md:grid-cols-[2fr_1fr_1fr_1fr] md:gap-10">
        <div>
          <div className="mb-3 font-serif text-[28px] font-bold tracking-[3px] text-cream">
            PUFA <span className="text-crimson-light">LAW</span>
          </div>
          <p className="text-xs leading-[1.8] text-white/35">{settings.footerDesc}</p>
        </div>

        <FooterCol
          title="Navigasi"
          links={[
            { href: "/", label: "Home" },
            { href: "/about", label: "About" },
            { href: "/events", label: "Events" },
            { href: "/gallery", label: "Gallery" },
          ]}
        />
        <FooterCol
          title="Lainnya"
          links={[
            { href: "/team", label: "Team" },
            { href: "/news", label: "News" },
            { href: "/contact", label: "Contact" },
          ]}
        />

        <div>
          <FooterColTitle>Kontak</FooterColTitle>
          <ul className="space-y-2.5">
            <li className="text-xs text-white/45">{phone}</li>
            <li className="text-xs text-white/45">{email}</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-2 border-t border-white/[0.06] pt-5 text-[11px] text-white/20 sm:flex-row sm:justify-between">
        <span>{settings.copyright}</span>
        <span>{settings.footerRight}</span>
      </div>
    </footer>
  );
}

function FooterColTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 border-b border-crimson/30 pb-2 text-[9px] font-bold uppercase tracking-[3px] text-crimson-light">
      {children}
    </div>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <FooterColTitle>{title}</FooterColTitle>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-xs text-white/45 transition-colors hover:text-crimson-light">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
