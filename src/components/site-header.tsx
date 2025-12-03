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
    "group px-10 transition-all duration-500 rounded-full border",
    isHome
      ? "text-white border-transparent data-[visible=false]:bg-transparent data-[visible=true]:border-white/20 data-[visible=true]:bg-white/10 data-[visible=true]:text-[var(--foreground)] data-[visible=true]:backdrop-blur-2xl"
      : "text-[var(--foreground)] border-white/40 bg-white/80 backdrop-blur-2xl shadow-[0_20px_60px_rgba(15,9,3,0.15)]",
  );

  const mobileNavClasses = cn(
    "px-7 py-4 transition-all duration-500 rounded-3xl border backdrop-blur-2xl",
    isHome
      ? "group text-white border-transparent bg-transparent data-[visible=true]:border-white/20 data-[visible=true]:bg-white/15 data-[visible=true]:text-[var(--foreground)]"
      : "group border-white/40 bg-white/85 text-[var(--foreground)]",
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
    "group relative flex h-10 w-10 items-center justify-center rounded-full border transition-colors",
    isHome
      ? "border-white/60 bg-white/10 text-white group-data-[visible=true]:border-white/60 group-data-[visible=true]:bg-transparent group-data-[visible=true]:text-white"
      : "border-[var(--border)] bg-white text-[var(--primary)]",
  );

  const mobileToggleClasses = cn(
    "transition-colors",
    isHome ? "text-white group-data-[visible=true]:text-[var(--foreground)]" : "text-[var(--foreground)]",
  );

  return (
    <Navbar className="top-[40px] px-4">
      <NavBody className={navBodyClasses}>
        <Link href="/" className="flex items-center gap-4 text-current">
          <Image src="/logo.webp" alt="Anfa logo" width={60} height={60} className="h-16 w-16 object-contain" priority />
          <div className="leading-tight">
            <p className="text-sm uppercase tracking-[0.4em]">Anfa Label</p>
            <p className={locationTextClasses}>Dubai</p>
          </div>
        </Link>
        <NavItems
          items={navItems}
          onItemClick={handleNavClick}
          className={cn(
            "text-current",
            isHome ? "text-white group-data-[visible=true]:text-[var(--foreground)]" : "text-[var(--foreground)]",
          )}
        />
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
            <PopoverContent
              id={popoverContentId}
              align="end"
              className={cn(
                "w-80 space-y-4 rounded-2xl border text-sm shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl",
                isHome
                  ? "border-white/25 bg-[#050505]/85 text-white"
                  : "border-white/30 bg-white/95 text-[var(--foreground)]",
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-between text-[11px] uppercase tracking-[0.35em]",
                  isHome ? "text-white/70" : "text-[#a78a6e]",
                )}
              >
                <span>Bag Preview</span>
                <span>
                  {bagCount} {bagCount === 1 ? "item" : "items"}
                </span>
              </div>
              {bagCount ? (
                <div className="space-y-3">
                  {bagItems.map((item) => (
                    <div
                      key={item.id}
                      className={cn(
                        "rounded-2xl p-4",
                        isHome ? "bg-white/10 text-white" : "bg-[#fefbf6] text-[var(--primary)]",
                      )}
                    >
                      <div
                        className={cn(
                          "flex items-center justify-between text-sm font-semibold",
                          isHome ? "text-white" : "text-[var(--primary)]",
                        )}
                      >
                        <span>{item.name}</span>
                        <span>{formatPrice(item.price)}</span>
                      </div>
                      <p className={cn("mt-1 text-xs", isHome ? "text-white/70" : "text-[#6b4d2f]")}>{item.detail}</p>
                    </div>
                  ))}
                  <div
                    className={cn(
                      "flex items-center justify-between border-t pt-3 text-xs uppercase tracking-[0.3em]",
                      isHome ? "border-white/20 text-white/70" : "border-[var(--border)] text-[#a78a6e]",
                    )}
                  >
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                </div>
              ) : (
                <p
                  className={cn(
                    "rounded-2xl border border-dashed p-4 text-center text-xs",
                    isHome ? "border-white/30 text-white/70" : "border-[var(--border)] text-[#6b4d2f]",
                  )}
                >
                  Your bag is empty.
                </p>
              )}
              <Link
                href="/bag"
                className={cn(
                  "block text-center text-xs uppercase tracking-[0.35em] underline underline-offset-4",
                  isHome ? "text-white" : "text-[var(--primary)]",
                )}
              >
                View full bag
              </Link>
            </PopoverContent>
          </Popover>
        </div>
      </NavBody>
      <MobileNav className={mobileNavClasses}>
        <MobileNavHeader>
          <Link href="/" className="flex items-center gap-3 text-current">
            <Image src="/logo.webp" alt="Anfa logo" width={48} height={48} className="h-12 w-12 object-contain" priority />
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
                className={cn(
                  "pointer-events-none absolute -right-1 -top-1 border-white bg-[var(--primary)] text-[10px] text-white",
                  isHome && "group-data-[visible=true]:border-[var(--primary)]",
                )}
              >
                {bagCount}
              </Badge>
            </Link>
            <MobileNavToggle
              className={mobileToggleClasses}
              isOpen={mobileOpen}
              onClick={() => setMobileOpen((prev) => !prev)}
            />
          </div>
        </MobileNavHeader>
        <MobileNavMenu
          isOpen={mobileOpen}
          className={cn(
            "gap-3 rounded-3xl border border-white/20 bg-white/10 px-6 py-6 text-white backdrop-blur-2xl",
            !isHome && "text-[var(--foreground)] border-white/30 bg-white/90 text-[var(--foreground)]",
          )}
        >
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              className={cn(
                "w-full rounded-2xl border px-4 py-3 text-sm uppercase tracking-[0.35em]",
                isHome
                  ? "border-white/30 text-white transition hover:border-white hover:bg-white/10"
                  : "border-[var(--border)] text-[var(--foreground)]",
              )}
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
