import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { defaultHeroConfig } from "@/data/hero-config";

const processHighlights = [
  {
    title: "REVOLUTIONARY WEAR",
    body: "Innovative pieces designed to embody the relaxed urban culture the UAE has to offer.",
    image:
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "OUR PROCESS",
    body: "All of our items are designed and handcrafted in the UAE. We use local manufacturers and source material native to the region.",
    image: "/label.webp",
  },
];

const featuredProducts = [
  {
    title: "Demo Gown Experience",
    description: "Hand-draped silk column created solely to showcase the product page flow.",
    priceLabel: "2,480 AED",
    badge: "Demo · Limited Capsule",
    image: {
      url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
      alt: "Demo gown",
    },
    hoverImage: {
      url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80",
      alt: "Demo gown detail",
    },
    href: "/catalog/demo-look",
  },
  {
    title: "Nomad Trouser",
    description: "Bone linen blend with double pleats and adjustable belt tabs.",
    priceLabel: "980 AED",
    badge: "Signature Capsule",
    image: { url: "/Hero2.webp", alt: "Nomad Trouser" },
    hoverImage: { url: "/hero.webp", alt: "Nomad Trouser detail" },
    href: "/catalog/nomad-trouser",
  },
  {
    title: "Contour Bustier Dress",
    description: "Boned bodice with low back and liquid satin finish.",
    priceLabel: "1,620 AED",
    badge: "Limited · 65 units",
    image: {
      url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
      alt: "Contour Bustier Dress",
    },
    hoverImage: {
      url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80",
      alt: "Contour Bustier Dress detail",
    },
    href: "/catalog/contour-bustier-dress",
  },
];

export default function Home() {
  const hero = defaultHeroConfig;
  const [primaryHeroWord, ...restHeroWords] = hero.title.split(" ");
  const secondaryHeroLine = restHeroWords.join(" ");

  return (
    <div className="">
      <section className="relative min-h-screen w-full overflow-hidden text-[#0b0b0b]">
        <Image
          src={hero.image}
          alt={hero.title}
          fill
          priority
          className="object-cover scale-[1.2]"
          sizes="100vw"
          style={{ objectPosition: "30% 50%" }}
        />
        <div className="relative z-10 flex min-h-screen items-center justify-start px-4 py-16 text-white md:px-10 lg:px-16">
          <div className="grid w-full max-w-3xl gap-8">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="font-semibold uppercase leading-[0.85] tracking-[-0.04em] text-[clamp(8.5rem,26vw,8rem)] text-white">
                  <span className="block">{primaryHeroWord}</span>
                  {secondaryHeroLine && <span className="block">{secondaryHeroLine}</span>}
          </h1>
                <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.5em] text-white/80">
                  <span className="rounded-full border border-white/60 px-4 py-1">{hero.status}</span>
                </div>
                <span className="text-md uppercase tracking-[0.5em] text-white/80">{hero.dropLabel}</span>
              </div>
              <div className="space-y-4 text-xl leading-relaxed text-white/80 max-w-xl">
                <p>{hero.description}</p>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.4em] text-white/80">
                <Link
                  href="/catalog"
                  className="inline-flex items-center justify-center rounded-full border border-white/60 px-8 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  {hero.ctaLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="space-y-24 px-6 py-16 md:px-10 lg:px-16">
        <section className="mx-auto max-w-6xl space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.45em] text-[#a78a6e]">Current Styles</p>
              <h2 className="text-3xl text-[#0e0b05]">Wearable sculptures.</h2>
            </div>
            <Link
              href="/catalog"
              className="text-xs uppercase tracking-[0.4em] text-[var(--primary)] underline underline-offset-4"
            >
              View full catalog
            </Link>
          </div>

          <div className="-mx-4 md:hidden">
            <div className="flex gap-4 overflow-x-auto px-4 pb-2 snap-x snap-mandatory">
              {featuredProducts.map((product) => (
                <div
                  key={`mobile-${product.title}`}
                  className="w-[78vw] flex-shrink-0 snap-center"
                >
                  <ProductCard {...product} />
                </div>
              ))}
            </div>
          </div>

          <div className="hidden gap-6 md:grid md:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.title} {...product} />
            ))}
          </div>
        </section>
      </div>

      <section className="px-6 py-8 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
          {processHighlights.map((item, index) => (
            <article
              key={item.title}
              className="overflow-hidden rounded-[28px] border border-border bg-white shadow-[0_8px_20px_rgba(15,9,3,0.06)]"
            >
              <div className="relative h-[260px] w-full overflow-hidden md:h-[320px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover object-center transition duration-700"
                  sizes="(max-width: 768px) 100vw, 520px"
                  priority={index === 1}
                />
              </div>
              <div className="space-y-2 px-5 py-3 text-[#4f3c27]">
                <p className="text-[11px] uppercase tracking-[0.4em] text-[#a78a6e]">{item.title}</p>
                <p className="text-sm leading-relaxed">{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="relative isolate w-full overflow-hidden text-white">
        <Image
          src="/hero.webp"
          alt="Blondes & Brunettes drop"
          fill
          priority={false}
          className="object-cover"
          sizes="100vw"
          style={{ objectPosition: "30% 45%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/35 to-black/5" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 py-72 md:px-10 lg:px-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl space-y-4">
            <p className="text-xs uppercase tracking-[0.45em] text-[#d9b787]">Current Drop</p>
            <h2 className="text-5xl font-semibold uppercase leading-tight tracking-[0.02em]">Blondes & Brunettes</h2>
            <p className="text-sm text-white/85">
              Fashion that defies conformity, empowering individuals to express their true selves with every stitch.
            </p>
          </div>
          <div className="space-y-5 text-xs uppercase tracking-[0.4em] text-white/80">
            <div className="flex flex-wrap gap-4">
              <span className="rounded-full border border-white/70 px-4 py-1">{hero.status}</span>
              <span>{hero.dropLabel}</span>
              <span>Release Window · {hero.releaseWindow}</span>
            </div>
            <Link
              href="/catalog"
              className="inline-flex items-center justify-center rounded-full border border-white/70 px-8 py-3 text-xs font-semibold tracking-[0.4em] text-white transition hover:bg-white/10"
            >
              Explore drop ↗
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
