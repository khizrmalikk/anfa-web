"use client";

import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  href: string;
  title: string;
  description: string;
  category?: string;
  badge?: string;
  priceLabel: string;
  image: { url: string; alt?: string };
  hoverImage?: { url: string; alt?: string } | null;
};

export function ProductCard({
  href,
  title,
  description,
  category,
  badge,
  priceLabel,
  image,
  hoverImage,
}: ProductCardProps) {
  const heroImage = image.url || "/placeholder.png";
  const secondaryImage = hoverImage?.url || heroImage;

  return (
    <Link
      href={href}
      className="group relative block overflow-hidden border border-[var(--border)] bg-black/5 shadow-[0_14px_50px_rgba(15,9,3,0.12)] transition duration-500 hover:-translate-y-1"
      style={{ aspectRatio: "3 / 4" }}
    >
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt={image.alt ?? title}
          className="object-cover transition duration-700 group-hover:opacity-0"
          fill
          sizes="(max-width: 1024px) 100vw, 420px"
        />
        <Image
          src={secondaryImage}
          alt={hoverImage?.alt ?? title}
          className="object-cover opacity-0 transition duration-700 group-hover:opacity-100"
          fill
          sizes="(max-width: 1024px) 100vw, 420px"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/85 transition duration-500 group-hover:via-black/55 group-hover:to-black/90" />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-between p-6 text-white">
        {(badge || category) && (
          <p className="inline-flex rounded-full border border-white/30 px-4 py-1 text-[10px] uppercase tracking-[0.35em] text-[#f5e3c5] md:text-[11px] md:tracking-[0.4em]">
            {badge ?? category}
          </p>
        )}

        <div className="space-y-3">
          <p className="text-lg font-semibold leading-tight md:text-2xl">{title}</p>
          <p className="hidden text-sm leading-relaxed text-white/85 md:block">{description}</p>
          <div className="flex items-center justify-between text-sm font-semibold">
            <span className="text-base md:text-lg">{priceLabel}</span>
            <span className="text-[11px] uppercase tracking-[0.35em] text-white/80 md:text-xs md:tracking-[0.4em]">
              View ↗
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

