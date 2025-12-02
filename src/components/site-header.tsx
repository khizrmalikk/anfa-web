"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavBody,
  NavItems,
  Navbar,
} from "@/components/ui/resizable-navbar";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Catalog", link: "/catalog" },
  { name: "Contact", link: "mailto:concierge@anfalabel.com" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const bagItems = useMemo(
    () => [
      {
        id: 1,
        name: "Sculpted Kaftan",
        detail: "Camel silk · Size 1",
        price: 1480,
      },
      {
        id: 2,
        name: "Nomad Trouser",
        detail: "Bone linen · Size 2",
        price: 980,
      },
    ],
    [],
  );
  const bagCount = bagItems.length;
  const subtotal = bagItems.reduce((sum, item) => sum + item.price, 0);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const popoverContentId = useId();

  const handleNavClick = () => setMobileOpen(false);
  const formatPrice = (value: number) => `${value.toLocaleString("en-US")} AED`;

  const navBodyClasses = cn(
    isHome
      ? "group pl-6 pr-4 text-white transition-all duration-500 data-[visible=true]:border data-[visible=true]:border-white/15 data-[visible=true]:bg-white/20 data-[visible=true]:text-[var(--foreground)] data-[visible=true]:backdrop-blur-lg data-[visible=false]:bg-transparent"
      : "group pl-6 pr-4 text-[var(--foreground)] border border-[var(--border)]/70 bg-white/95",
  );

  const mobileNavClasses = cn(
    isHome
      ? "px-4 py-3 transition-all duration-500 data-[visible=true]:border data-[visible=true]:border-[var(--border)]/70 data-[visible=true]:bg-white/90"
      : "px-4 py-3 border border-[var(--border)]/70 bg-white/95",
  );

  const locationTextClasses = cn(
    "text-[11px] uppercase tracking-[0.35em] transition",
    isHome ? "text-[#f5e3c5] group-data-[visible=true]:text-[#6b4d2f]" : "text-[#6b4d2f]",
  );

  const bagButtonClasses = cn(
    "relative flex h-12 w-12 items-center justify-center rounded-full border transition",
    isHome
      ? "border-white/40 bg-white/10 text-white group-data-[visible=true]:border-transparent group-data-[visible=true]:bg-white/80 group-data-[visible=true]:text-[var(--foreground)]"
      : "border-[var(--border)] bg-white/95 text-[var(--primary)]",
  );

  const mobileBagButtonClasses = cn(
    "relative flex h-10 w-10 items-center justify-center rounded-full border",
    isHome ? "border-white/40 bg-white/10 text-white" : "border-[var(--border)] text-[var(--primary)]",
  );

  return (
    <Navbar className="top-[40px] px-4">
      <NavBody className={navBodyClasses}>
        <Link href="/" className="flex items-center gap-3 text-current">
          <Image src="/logo.webp" alt="Anfa logo" width={44} height={44} className="h-11 w-11 object-contain" priority />
          <div className="leading-tight">
            <p className="text-sm uppercase tracking-[0.4em]">Anfa Label</p>
            <p className={locationTextClasses}>Dubai</p>
          </div>
        </Link>
        <NavItems items={navItems} onItemClick={handleNavClick} className="text-current" />
        <div className="ml-auto flex items-center gap-3">
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className={bagButtonClasses}
                aria-label="Open bag"
                aria-controls={popoverOpen ? popoverContentId : undefined}
              >
                <BagIcon />
                <Badge
                  variant="secondary"
                  className="pointer-events-none absolute -right-1 -top-1 border-white bg-[var(--primary)] text-[11px] text-white"
                >
                  {bagCount}
                </Badge>
              </button>
            </PopoverTrigger>
            <PopoverContent id={popoverContentId} align="end" className="w-80 space-y-4 text-sm">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.35em] text-[#a78a6e]">
                <span>Bag Preview</span>
                <span>{bagCount} {bagCount === 1 ? "item" : "items"}</span>
              </div>
              {bagCount ? (
                <div className="space-y-3">
                  {bagItems.map((item) => (
                    <div key={item.id} className="rounded-2xl bg-[#fefbf6] p-4">
                      <div className="flex items-center justify-between text-sm font-semibold text-[var(--primary)]">
                        <span>{item.name}</span>
                        <span>{formatPrice(item.price)}</span>
                      </div>
                      <p className="mt-1 text-xs text-[#6b4d2f]">{item.detail}</p>
                    </div>
                  ))}
                  <div className="flex items-center justify-between border-t border-[var(--border)] pt-3 text-xs uppercase tracking-[0.3em] text-[#a78a6e]">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                </div>
              ) : (
                <p className="rounded-2xl border border-dashed border-[var(--border)] p-4 text-center text-xs text-[#6b4d2f]">
                  Your bag is empty.
                </p>
              )}
              <Link
                href="/bag"
                className="block text-center text-xs uppercase tracking-[0.35em] text-[var(--primary)] underline underline-offset-4"
              >
                View full bag
              </Link>
            </PopoverContent>
          </Popover>
        </div>
      </NavBody>
      <MobileNav className={mobileNavClasses}>
        <MobileNavHeader>
          <Link href="/" className="flex items-center gap-3 text-[var(--primary)]">
            <Image src="/logo.webp" alt="Anfa logo" width={36} height={36} className="h-9 w-9 object-contain" priority />
            <span className="text-xs uppercase tracking-[0.35em]">Anfa</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/bag"
              className={mobileBagButtonClasses}
              aria-label="Open bag"
            >
              <BagIcon size={18} />
              <Badge
                variant="secondary"
                className="pointer-events-none absolute -right-1 -top-1 border-white bg-[var(--primary)] text-[10px] text-white"
              >
                {bagCount}
              </Badge>
            </Link>
            <MobileNavToggle isOpen={mobileOpen} onClick={() => setMobileOpen((prev) => !prev)} />
          </div>
        </MobileNavHeader>
        <MobileNavMenu isOpen={mobileOpen} className="gap-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              className="w-full rounded-2xl border border-[var(--border)] px-4 py-3 text-sm uppercase tracking-[0.35em]"
              onClick={handleNavClick}
            >
              {item.name}
            </Link>
          ))}
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}

function BagIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 7h12l1.5 12.5a2 2 0 0 1-2 2.5H6.5a2 2 0 0 1-2-2.5z" />
      <path d="M9 10v-2a3 3 0 0 1 6 0v2" />
    </svg>
  );
}
