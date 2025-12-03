import Link from "next/link";

const footerLinks = [
  { label: "Contact", href: "mailto:concierge@anfalabel.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Journal", href: "#editorial" },
  { label: "Shipping", href: "https://anfalabel.com/policies/shipping-policy" },
];

export function SiteFooter() {
  return (
    <footer className="relative bg-[#050505] text-white">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute left-0 top-0 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-40 w-40 rounded-full bg-[#d9b787]/15 blur-3xl" />
      </div>
      <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-6 pb-12 pt-10 text-sm md:flex-row md:items-center md:justify-between md:px-10 lg:px-16">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.35em] text-[#d9b787]">Anfa Label</p>
          <p className="text-white/75">Modern desert luxury · Designed in Dubai · Data via Shop API.</p>
          <div className="flex items-center gap-3 text-white">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="rounded-full border border-white/30 px-3 py-1 text-xs uppercase tracking-[0.4em] transition hover:border-white hover:bg-white/10"
            >
              IG
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              className="rounded-full border border-white/30 px-3 py-1 text-xs uppercase tracking-[0.4em] transition hover:border-white hover:bg-white/10"
            >
              TT
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-4 text-sm md:flex-row md:items-center">
          <label className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-[#d9b787]">
            Region & Currency
            <select className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm text-white focus:border-white focus:outline-none">
              <option className="text-black">UAE · AED</option>
              <option className="text-black">USA · USD</option>
              <option className="text-black">EU · EUR</option>
              <option className="text-black">UK · GBP</option>
            </select>
          </label>
          <div className="flex flex-wrap gap-4 text-sm font-medium text-white/80">
            {footerLinks.map((link) =>
              link.href.startsWith("/") || link.href.startsWith("#") ? (
                <Link key={link.label} href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              ) : (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="transition hover:text-white">
                  {link.label}
                </a>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

