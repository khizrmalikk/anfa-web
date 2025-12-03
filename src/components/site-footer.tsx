import Link from "next/link";

const footerLinks = [
  { label: "Contact", href: "mailto:concierge@anfalabel.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Journal", href: "#editorial" },
  { label: "Shipping", href: "https://anfalabel.com/policies/shipping-policy" },
];

export function SiteFooter() {
  return (
    <footer className="mx-auto flex max-w-6xl flex-col gap-6 border-t border-border px-6 pb-12 pt-10 text-sm text-[#4f3c27] md:flex-row md:items-center md:justify-between md:px-10 lg:px-16">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.35em] text-[#a78a6e]">Anfa Label</p>
        <p>Modern desert luxury · Designed in Dubai · Data via Shop API.</p>
        <div className="flex items-center gap-3 text-[var(--primary)]">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="rounded-full border border-[var(--border)] px-3 py-1 text-xs uppercase tracking-[0.4em]"
          >
            IG
          </a>
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noreferrer"
            aria-label="TikTok"
            className="rounded-full border border-[var(--border)] px-3 py-1 text-xs uppercase tracking-[0.4em]"
          >
            TT
          </a>
        </div>
      </div>
      <div className="flex flex-col gap-4 text-sm md:flex-row md:items-center">
        <label className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-[#a78a6e]">
          Region & Currency
          <select className="rounded-full border border-[var(--border)] px-4 py-2 text-sm">
            <option>UAE · AED</option>
            <option>USA · USD</option>
            <option>EU · EUR</option>
            <option>UK · GBP</option>
          </select>
        </label>
        <div className="flex flex-wrap gap-4 text-sm font-medium text-primary">
          {footerLinks.map((link) =>
            link.href.startsWith("/") || link.href.startsWith("#") ? (
              <Link key={link.label} href={link.href}>
                {link.label}
              </Link>
            ) : (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ),
          )}
        </div>
      </div>
    </footer>
  );
}

