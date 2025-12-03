import Link from "next/link";

import { ProductGallery } from "@/components/product-gallery";
import { ProductControls } from "../[handle]/product-controls";

const demoProduct = {
  title: "Blondes & Brunettes Demo Gown",
  handle: "demo-look",
  summary:
    "A corseted silk column that pools at the ankle, trimmed with glass-bead fringe and a removable satin hood. Built solely to demonstrate the product page experience.",
  price: 2480,
  collection: "Limited Capsule · Drop 07",
  heroImage: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1500&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=1200&q=80",
  ],
  details: [
    { label: "Fabrication", value: "Italian silk faille · glass beads · silk charmeuse lining" },
    { label: "Lead Time", value: "Made to order · 3 weeks · concierge fittings available" },
    { label: "Origin", value: "Designed and handcrafted in Dubai, UAE" },
  ],
  story: [
    "This page exists purely as a demo to showcase the long-form storytelling we can layer into Shopify product detail pages. The gown itself is a fictional piece from the Blondes & Brunettes drop, rendered in warm champagne hues with architectural draping.",
    "Use the controls to simulate size, quantity, and bag interactions. The supporting copy blocks below demonstrate how we can add process notes, atelier imagery, and editorial context aligned to each release.",
  ],
};

export default function DemoLookPage() {
  const gallery = [
    { url: demoProduct.heroImage, altText: demoProduct.title },
    ...demoProduct.gallery.map((url) => ({ url, altText: demoProduct.title })),
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#050505] via-[#120b08] to-[#1f0f05] text-white">
      <div className="pointer-events-none absolute -top-20 left-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-[#d9b787]/15 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-40 md:px-10 lg:px-16">
        <Link href="/catalog" className="text-xs uppercase tracking-[0.35em] text-white/70 underline">
          ← Back to catalog
        </Link>

        <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:items-start">
          <ProductGallery title={demoProduct.title} images={gallery} />

          <div className="space-y-6 rounded-3xl border border-white/15 bg-white/5 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition duration-500 hover:border-white/25 hover:bg-white/8 lg:sticky lg:top-36 lg:self-start">
            <p className="text-xs uppercase tracking-[0.35em] text-[#d9b787]">{demoProduct.collection}</p>
            <div>
              <h1 className="text-4xl leading-tight text-white">{demoProduct.title}</h1>
              <p className="mt-2 text-sm text-white/70">Demo-only listing</p>
            </div>
            <p className="text-lg font-semibold text-white">
              {demoProduct.price.toLocaleString("en-US")} AED
            </p>
            <p className="text-sm text-white/70">Taxes included. Shipping calculated at checkout.</p>
            <ProductControls />
            <div className="space-y-4 text-sm leading-relaxed text-white/80">
              {demoProduct.story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="grid gap-4 rounded-3xl border border-white/15 bg-white/5 px-5 py-5 text-sm text-white/80">
              {demoProduct.details.map((detail) => (
                <div key={detail.label} className="flex flex-col border-b border-white/15 pb-3 last:border-b-0 last:pb-0">
                  <span className="text-[11px] uppercase tracking-[0.35em] text-[#d9b787]">{detail.label}</span>
                  <span>{detail.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <section className="mt-16 grid gap-8 lg:grid-cols-2">
          <article className="space-y-4 rounded-3xl border border-white/15 bg-white/5 p-6 text-white/80 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition duration-500 hover:border-white/25 hover:bg-white/8">
            <p className="text-[11px] uppercase tracking-[0.35em] text-[#d9b787]">Atelier Notes</p>
            <p>
              Each gown is cut on the bias and draped on a custom form to mimic the client&apos;s proportions. Internal grosgrain waist
              stay, silk-covered snaps, and detachable hood allow styling multiple ways.
            </p>
          </article>
          <article className="space-y-4 rounded-3xl border border-white/15 bg-white/5 p-6 text-white/80 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition duration-500 hover:border-white/25 hover:bg-white/8">
            <p className="text-[11px] uppercase tracking-[0.35em] text-[#d9b787]">Concierge</p>
            <p>
              Tap the bag controls to preview e-commerce behavior, or reach out via{" "}
              <a href="mailto:concierge@anfalabel.com" className="underline">
                concierge@anfalabel.com
              </a>{" "}
              to schedule an in-person viewing of the mock sample.
            </p>
          </article>
        </section>
      </div>
    </div>
  );
}

