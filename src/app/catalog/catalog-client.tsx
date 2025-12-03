"use client";

import { useMemo, useState } from "react";

import { ProductCard } from "@/components/product-card";
import { ShopifyProduct } from "@/lib/shopify";

const sortOptions = [
  { label: "Featured", value: "none" },
  { label: "Price · Low to High", value: "asc" },
  { label: "Price · High to Low", value: "desc" },
];

type CatalogClientProps = {
  initialProducts: ShopifyProduct[];
};

export function CatalogClient({ initialProducts }: CatalogClientProps) {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOrder, setSortOrder] = useState("none");

  const filteredProducts = useMemo(() => {
    const min = minPrice ? Number(minPrice) : undefined;
    const max = maxPrice ? Number(maxPrice) : undefined;

    const filtered = initialProducts.filter((product) => {
      const meetsMin = typeof min === "number" ? product.price >= min : true;
      const meetsMax = typeof max === "number" ? product.price <= max : true;
      return meetsMin && meetsMax;
    });

    if (sortOrder === "asc") {
      return [...filtered].sort((a, b) => a.price - b.price);
    }

    if (sortOrder === "desc") {
      return [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [initialProducts, maxPrice, minPrice, sortOrder]);

  const formatPrice = (price: number) => `${price.toLocaleString("en-US")} AED`;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#050505] via-[#120b08] to-[#1f0f05] text-white">
      <div className="pointer-events-none absolute -top-28 left-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-10 h-72 w-72 rounded-full bg-[#d9b787]/15 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-40 md:px-10 lg:px-16">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-[#d9b787]">Catalog</p>
          <h1 className="text-4xl text-white">Objects of desire, styled three across.</h1>
          <p className="text-sm text-white/70">
            Catalog pulls live from Shopify when credentials exist. Until configured, you&apos;re browsing our mock capsule.
          </p>
        </header>

        <div className="mt-10 grid gap-8">
          <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.35em] text-white/70">
            <label className="flex items-center gap-2">
              Min AED
              <input
                type="number"
                min={0}
                value={minPrice}
                onChange={(event) => setMinPrice(event.target.value)}
                className="w-24 rounded-full border border-white/30 bg-white/10 px-3 py-2 text-white focus:border-white focus:outline-none"
              />
            </label>
            <label className="flex items-center gap-2">
              Max AED
              <input
                type="number"
                min={0}
                value={maxPrice}
                onChange={(event) => setMaxPrice(event.target.value)}
                className="w-24 rounded-full border border-white/30 bg-white/10 px-3 py-2 text-white focus:border-white focus:outline-none"
              />
            </label>
            <label className="flex items-center gap-2">
              Sort
              <select
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value)}
                className="rounded-full border border-white/30 bg-white/10 px-3 py-2 text-white focus:border-white focus:outline-none"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value} className="text-black">
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="button"
              onClick={() => {
                setMinPrice("");
                setMaxPrice("");
                setSortOrder("none");
              }}
              className="rounded-full border border-white/30 px-4 py-2 text-white transition hover:border-white hover:bg-white/10"
            >
              Reset
            </button>
          </div>

          <div className="grid grid-cols-2 gap-5 sm:gap-8 md:gap-10 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                href={`/catalog/${product.handle}`}
                title={product.title}
                description={product.description}
                category={product.category}
                priceLabel={formatPrice(product.price)}
                image={{ url: product.image?.url ?? "/placeholder.png", alt: product.image?.altText ?? product.title }}
                hoverImage={
                  product.gallery[1]
                    ? { url: product.gallery[1].url, alt: product.gallery[1].altText ?? product.title }
                    : undefined
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
