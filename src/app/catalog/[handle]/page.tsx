import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductGallery } from "@/components/product-gallery";
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

  const galleryImages = [
    product.image,
    ...product.gallery.filter((image) => image.url !== product.image?.url),
  ].filter((image): image is NonNullable<typeof image> => Boolean(image?.url));

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#050505] via-[#120b08] to-[#1f0f05] text-white">
      <div className="pointer-events-none absolute -top-32 left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-10 h-72 w-72 rounded-full bg-[#d9b787]/15 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-40 md:px-10 lg:px-16">
        <Link
          href="/catalog"
          className="text-xs uppercase tracking-[0.35em] text-white/70 underline"
        >
          ← Back to catalog
        </Link>

        <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:items-start">
          <ProductGallery title={product.title} images={galleryImages} />

          <div className="space-y-6 rounded-3xl border border-white/15 bg-white/5 px-6 py-6 shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition duration-500 hover:border-white/25 hover:bg-white/8 lg:sticky lg:top-36 lg:self-start lg:px-8 lg:py-6">
            <p className="text-xs uppercase tracking-[0.35em] text-[#d9b787]">Anfa</p>
            <div>
              <h1 className="text-4xl leading-tight text-white">{product.title}</h1>
              <p className="mt-2 text-sm text-white/70">{product.category}</p>
            </div>
            <p className="text-lg font-semibold text-white">
              {product.price.toLocaleString("en-US")} AED
            </p>
            <p className="text-sm text-white/70">
              Taxes included. Shipping calculated at checkout.
            </p>
            <ProductControls />
            <div className="space-y-4 text-sm leading-relaxed text-white/80">
              <p>{product.description}</p>
              <p>Entirely designed and crafted in Dubai, UAE.</p>
            </div>
          </div>
        </div>

        <section className="mt-16 space-y-6">
          <div className="flex items-center justify-between text-white">
            <p className="text-xs uppercase tracking-[0.35em] text-[#d9b787]">
              You may also like
            </p>
            <Link
              href="/catalog"
              className="text-xs uppercase tracking-[0.35em] text-white/70 underline"
            >
              View all
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {suggestions.map((item) => (
              <Link
                key={item.id}
                href={`/catalog/${item.handle}`}
                className="overflow-hidden rounded-3xl border border-white/15 bg-white/10 text-white shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition hover:-translate-y-1 hover:border-white/30 hover:bg-white/15"
              >
                <div className="relative h-56">
                  <Image
                    src={item.image?.url ?? "/placeholder.png"}
                    alt={item.image?.altText ?? item.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 360px"
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1 px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.35em] text-white/70">{item.category}</p>
                  <h3 className="text-lg text-white">{item.title}</h3>
                  <p className="text-sm font-semibold text-white">
                    {item.price.toLocaleString("en-US")} AED
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
