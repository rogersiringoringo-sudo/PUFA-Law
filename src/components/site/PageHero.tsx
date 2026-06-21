import type { ReactNode } from "react";

/** Hero header untuk halaman dalam (About/Events/Gallery/Team/News/Contact). */
export function PageHero({
  title,
  subtitle,
  breadcrumb,
}: {
  title: ReactNode;
  subtitle?: string;
  breadcrumb?: string;
}) {
  return (
    <section className="relative mt-[60px] flex min-h-[220px] items-center justify-center overflow-hidden bg-[linear-gradient(135deg,var(--color-crimson-deep)_0%,var(--color-crimson)_50%,var(--color-ink)_100%)] md:mt-[68px] md:min-h-[280px]">
      {/* texture */}
      <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2280%22%20height%3D%2280%22%20viewBox%3D%220%200%2080%2080%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M40%200L0%2040%2040%2080%2080%2040z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')]" />
      <div className="absolute inset-x-0 bottom-0 h-1 bg-[linear-gradient(90deg,var(--color-crimson-deep),var(--color-gold),var(--color-crimson-deep))]" />
      <div className="relative z-10 px-5 py-10 text-center">
        <h1 className="font-serif text-[clamp(28px,6vw,72px)] font-bold tracking-[2px] text-cream [&_em]:italic [&_em]:text-gold-light">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2.5 text-[11px] font-medium uppercase tracking-[3px] text-white/50 md:tracking-[4px]">
            {subtitle}
          </p>
        )}
        {breadcrumb && (
          <div className="mt-3.5 flex items-center justify-center gap-2 text-[11px] font-medium tracking-[1px] text-white/40">
            <span>Home</span>
            <span className="text-gold-light">›</span>
            <span className="text-gold-light">{breadcrumb}</span>
          </div>
        )}
      </div>
    </section>
  );
}
