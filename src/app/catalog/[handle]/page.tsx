import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getCatalogProducts, getProductByHandle } from "@/lib/shopify";
import { ProductControls } from "./product-controls";

export default async function ProductPage({
  params,
}: {
  params: { handle: string };
}) {
  const handle = decodeURIComponent(params.handle);
  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  const suggestions = (await getCatalogProducts()).filter(
    (item) => item.handle !== product.handle,
  ).slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 text-[var(--foreground)] md:px-10 lg:px-16">
      <Link
        href="/catalog"
        className="text-xs uppercase tracking-[0.35em] text-[var(--primary)] underline"
      >
        ← Back to catalog
      </Link>

      <div className="mt-8 grid gap-12 lg:grid-cols-[1.2fr,0.8fr]">
        <div className="space-y-4">
          <div className="relative h-[520px] w-full overflow-hidden rounded-[36px] border border-[var(--border)]">
            <Image
              src={product.image?.url ?? "/placeholder.png"}
              alt={product.image?.altText ?? product.title}
              fill
              sizes="(max-width: 1024px) 100vw, 720px"
              className="object-cover"
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {product.gallery.slice(0, 3).map((image, idx) => (
              <div key={idx} className="relative h-32 overflow-hidden rounded-2xl border border-[var(--border)]">
                <Image
                  src={image.url}
                  alt={image.altText ?? product.title}
                  fill
                  sizes="180px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.35em] text-[#a78a6e]">Anfa</p>
          <div>
            <h1 className="text-4xl leading-tight">{product.title}</h1>
            <p className="mt-2 text-sm text-[#4f3c27]">{product.category}</p>
          </div>
          <p className="text-lg font-semibold text-[var(--primary)]">
            {product.price.toLocaleString("en-US")} AED
          </p>
          <p className="text-sm text-[#4f3c27]">
            Taxes included. Shipping calculated at checkout.
          </p>
          <ProductControls />
          <div className="space-y-4 text-sm leading-relaxed text-[#4f3c27]">
            <p>{product.description}</p>
            <p>Entirely designed and crafted in Dubai, UAE.</p>
          </div>
        </div>
      </div>

      <section className="mt-16 space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.35em] text-[#a78a6e]">
            You may also like
          </p>
          <Link
            href="/catalog"
            className="text-xs uppercase tracking-[0.35em] text-[var(--primary)] underline"
          >
            View all
          </Link>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {suggestions.map((item) => (
            <Link
              key={item.id}
              href={`/catalog/${item.handle}`}
              className="rounded-[28px] border border-[var(--border)] bg-white"
            >
              <div className="relative h-56 overflow-hidden rounded-[28px]">
                <Image
                  src={item.image?.url ?? "/placeholder.png"}
                  alt={item.image?.altText ?? item.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 360px"
                  className="object-cover"
                />
              </div>
              <div className="space-y-1 px-4 py-4">
                <p className="text-xs uppercase tracking-[0.35em] text-[#b19067]">{item.category}</p>
                <h3 className="text-lg">{item.title}</h3>
                <p className="text-sm font-semibold text-[var(--primary)]">
                  {item.price.toLocaleString("en-US")} AED
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
