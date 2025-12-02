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
      className="group flex h-full flex-col overflow-hidden rounded-[40px] border border-[var(--border)] bg-white shadow-[0_20px_70px_rgba(15,9,3,0.08)] transition duration-500 hover:-translate-y-1"
    >
      <div
        className="relative w-full overflow-hidden rounded-[32px]"
        style={{ aspectRatio: "3 / 4" }}
      >
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 space-y-2 p-5 text-white">
          {badge ? (
            <p className="text-[11px] uppercase tracking-[0.45em] text-[#f5e3c5]">
              {badge}
            </p>
          ) : (
            category && (
              <p className="text-[11px] uppercase tracking-[0.45em] text-[#f5e3c5]">
                {category}
              </p>
            )
          )}
          <h3 className="text-2xl leading-tight">{title}</h3>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between space-y-4 px-6 py-6 text-[#4f3c27]">
        <p className="text-sm leading-relaxed text-[#4f3c27]">{description}</p>
        <div className="flex items-center justify-between text-sm font-semibold text-[var(--primary)]">
          <span>{priceLabel}</span>
          <span className="text-xs uppercase tracking-[0.35em] text-[#a78a6e]">
            View ↗
          </span>
        </div>
      </div>
    </Link>
  );
}

