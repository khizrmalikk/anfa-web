"use client";

import { useState } from "react";

const sizes = ["S", "M", "L"];

export function ProductControls() {
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-[#d9b787]">Size</p>
        <div className="mt-3 flex flex-wrap gap-3">
          {sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              className={`rounded-full border px-5 py-2 text-sm transition ${
                selectedSize === size
                  ? "border-white/60 bg-white/20 text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
                  : "border-white/30 bg-white/5 text-white/70"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-[#d9b787]">Quantity</p>
        <div className="mt-3 flex items-center gap-3 text-sm">
          <button
            type="button"
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            className="h-10 w-10 rounded-full border border-white/30 bg-white/10 text-white transition hover:border-white hover:bg-white/20"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="w-10 text-center text-base">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((prev) => prev + 1)}
            className="h-10 w-10 rounded-full border border-[var(--border)]"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <button
        type="button"
        className="w-full rounded-full border border-white/30 bg-white/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white transition hover:border-white hover:bg-white/20"
      >
        Add to bag
      </button>
    </div>
  );
}
