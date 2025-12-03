"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type BagItem = {
  id: number;
  name: string;
  detail: string;
  price: number;
  quantity: number;
};

const initialItems: BagItem[] = [
  {
    id: 1,
    name: "Sculpted Kaftan",
    detail: "Camel silk · Size 1",
    price: 1480,
    quantity: 1,
  },
  {
    id: 2,
    name: "Nomad Trouser",
    detail: "Bone linen · Size 2",
    price: 980,
    quantity: 1,
  },
];

export default function BagPage() {
  const [items, setItems] = useState<BagItem[]>(initialItems);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );
  const shipping = items.length ? 45 : 0;
  const total = subtotal + shipping;

  const formatCurrency = (value: number) => `${value.toLocaleString("en-US")} AED`;

  const updateQuantity = (id: number, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#050505] via-[#120b08] to-[#1f0f05] text-white">
      <div className="pointer-events-none absolute -top-32 left-10 h-72 w-72 rounded-full bg-[#d9b787]/20 blur-3xl sm:h-96 sm:w-96 lg:left-32" />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-[#6b4d2f]/30 blur-3xl sm:h-[26rem] sm:w-[26rem]" />

      <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-40 md:px-10 lg:px-16">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-[#d9b787]">Bag</p>
          <h1 className="text-4xl text-white">
            Liquid glass capsule — adjust quantities before the concierge checkout opens.
          </h1>
          <p className="text-sm text-white/70">
            This mock experience previews the motion system, gradients, and translucent surfaces that will wrap the final Shopify
            integration.
          </p>
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
          <section className="space-y-5">
            {items.length === 0 ? (
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-white backdrop-blur-2xl">
                <p className="text-base">Your bag is empty.</p>
                <Link
                  href="/catalog"
                  className="mt-5 inline-flex rounded-full border border-white/30 px-5 py-2 text-sm uppercase tracking-[0.35em] text-white transition hover:border-white hover:bg-white/10"
                >
                  Continue browsing
                </Link>
              </div>
            ) : (
              items.map((item, idx) => (
                <article
                  key={item.id}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 text-white shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition hover:border-white/30 hover:bg-white/10 md:flex md:items-center md:gap-5"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  <div className="h-32 w-full rounded-2xl bg-gradient-to-br from-white/25 to-white/5 md:w-40" />
                  <div className="mt-4 flex flex-1 flex-col gap-2 text-sm md:mt-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-base font-semibold">{item.name}</p>
                        <p className="text-white/70">{item.detail}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-xs uppercase tracking-[0.3em] text-[#d9b787] transition hover:text-white"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/5 text-lg transition hover:border-white hover:bg-white/10"
                        >
                          −
                        </button>
                        <span className="min-w-[2.5rem] text-center text-base">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/5 text-lg transition hover:border-white hover:bg-white/10"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-base font-semibold">{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition duration-500 group-hover:opacity-100">
                    <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-white/20 to-transparent opacity-20" />
                  </div>
                </article>
              ))
            )}
          </section>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
              <p className="text-xs uppercase tracking-[0.35em] text-[#d9b787]">Summary</p>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between text-white/80">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-white/60">
                  <span>Shipping</span>
                  <span>{formatCurrency(shipping)}</span>
                </div>
                <div className="flex items-center justify-between text-base font-semibold text-white">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
                <button
                  type="button"
                  className="mt-6 w-full rounded-full border border-white/40 bg-white/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white transition hover:border-white hover:bg-white/20"
                >
                  Checkout (coming soon)
                </button>
              </div>
            </div>
            <div className="rounded-3xl border border-dashed border-white/20 bg-white/5 p-5 text-sm text-white/80 backdrop-blur-lg">
              Once the Shopify mutations are wired up, this glass summary will trigger the concierge checkout without leaving the Anfa
              experience.
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
