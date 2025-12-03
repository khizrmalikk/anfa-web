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
    <div className="mx-auto max-w-6xl px-6 pb-12 pt-40 text-[var(--foreground)] md:px-10 lg:px-16">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.4em] text-[#a78a6e]">Catalog</p>
        <h1 className="text-4xl">Objects of desire, styled three across.</h1>
        <p className="text-sm text-[#4f3c27]">
          Catalog pulls live from Shopify when credentials exist. Until configured, you&apos;re browsing our mock capsule.
        </p>
      </header>

      <div className="mt-10 grid gap-8">
        <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.35em] text-[#a78a6e]">
          <label className="flex items-center gap-2">
            Min AED
            <input
              type="number"
              min={0}
              value={minPrice}
              onChange={(event) => setMinPrice(event.target.value)}
              className="w-20 rounded-full border border-[var(--border)] px-3 py-1 text-[var(--foreground)]"
            />
          </label>
          <label className="flex items-center gap-2">
            Max AED
            <input
              type="number"
              min={0}
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
              className="w-20 rounded-full border border-[var(--border)] px-3 py-1 text-[var(--foreground)]"
            />
          </label>
          <label className="flex items-center gap-2">
            Sort
            <select
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
              className="rounded-full border border-[var(--border)] px-3 py-1 text-[var(--foreground)]"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
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
            className="rounded-full border border-[var(--border)] px-4 py-1 text-[var(--primary)]"
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
  );
}
