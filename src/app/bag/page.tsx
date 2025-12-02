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
    <div className="mx-auto max-w-6xl px-6 pb-12 pt-40 text-[var(--foreground)] md:px-10 lg:px-16">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.4em] text-[#a78a6e]">Bag</p>
        <h1 className="text-4xl">Review items before the on-site checkout goes live.</h1>
        <p className="text-sm text-[#4f3c27]">
          This page will eventually connect to mutations powered by Shop&apos;s API. For now, adjust the mock quantities below and see the
          summary update instantly.
        </p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
        <section className="space-y-4">
          {items.length === 0 ? (
            <div className="rounded-[32px] border border-[var(--border)] bg-white p-8 text-center">
              <p className="text-base text-[#4f3c27]">Your bag is empty.</p>
              <Link href="/catalog" className="mt-4 inline-flex rounded-full border border-[var(--border)] px-5 py-2 text-sm">
                Continue browsing
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <article
                key={item.id}
                className="flex flex-col gap-4 rounded-[32px] border border-[var(--border)] bg-white p-6 md:flex-row md:items-center"
              >
                <div className="h-32 w-full rounded-3xl border border-dashed border-[var(--border)] bg-[#f3e6d4] md:w-40" />
                <div className="flex flex-1 flex-col gap-2 text-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-base font-semibold">{item.name}</p>
                      <p className="text-[#6b4d2f]">{item.detail}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-xs uppercase tracking-[0.3em] text-[#b19067]"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="h-8 w-8 rounded-full border border-[var(--border)]"
                      >
                        −
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="h-8 w-8 rounded-full border border-[var(--border)]"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-semibold">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                </div>
              </article>
            ))
          )}
        </section>

        <aside className="space-y-4">
          <div className="rounded-[32px] border border-[var(--border)] bg-white p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-[#a78a6e]">Summary</p>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-[#6b4d2f]">
                <span>Shipping</span>
                <span>{formatCurrency(shipping)}</span>
              </div>
              <div className="flex items-center justify-between text-base font-semibold">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
              <button
                type="button"
                className="mt-4 w-full rounded-full bg-[var(--primary)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#fff7ec]"
              >
                Checkout (coming soon)
              </button>
            </div>
          </div>
          <div className="rounded-[28px] border border-dashed border-[var(--border)] bg-[#fefbf6] p-5 text-sm text-[#4f3c27]">
            Once the API connection is live, this summary will initiate server actions that create the order in Shop while keeping the
            shopper on anfa.com.
          </div>
        </aside>
      </div>
    </div>
  );
}
