"use client";

import { FormEvent, useState } from "react";
import { defaultHeroConfig, type HeroConfig } from "@/data/hero-config";

export default function HeroAdminPage() {
  const [formState, setFormState] = useState<HeroConfig>(defaultHeroConfig);
  const [preview, setPreview] = useState<HeroConfig>(defaultHeroConfig);
  const [message, setMessage] = useState<string>("");

  const handleChange = (
    field: keyof HeroConfig,
    value: string
  ) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPreview(formState);
    setMessage("Preview updated. Connect an API or CMS to persist this hero.");
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 text-[var(--foreground)] md:px-10 lg:px-16">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.4em] text-[#a78a6e]">Hero Admin</p>
        <h1 className="text-4xl">Update the latest drop without touching code.</h1>
        <p className="text-sm text-[#4f3c27]">
          This is a staging surface for upcoming CMS or Storefront API integration. Adjust the fields, hit preview, and share the
          result before wiring it to the actual home hero.
        </p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <form onSubmit={handleSubmit} className="space-y-4 rounded-[32px] border border-[var(--border)] bg-white p-6">
          <div className="grid gap-4">
            <label className="flex flex-col gap-1 text-sm">
              <span>Status</span>
              <input
                value={formState.status}
                onChange={(event) => handleChange("status", event.target.value)}
                className="rounded-2xl border border-[var(--border)] px-3 py-2"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span>Drop label</span>
              <input
                value={formState.dropLabel}
                onChange={(event) => handleChange("dropLabel", event.target.value)}
                className="rounded-2xl border border-[var(--border)] px-3 py-2"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span>Release window</span>
              <input
                value={formState.releaseWindow}
                onChange={(event) => handleChange("releaseWindow", event.target.value)}
                className="rounded-2xl border border-[var(--border)] px-3 py-2"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span>Title</span>
              <input
                value={formState.title}
                onChange={(event) => handleChange("title", event.target.value)}
                className="rounded-2xl border border-[var(--border)] px-3 py-2"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span>Description</span>
              <textarea
                rows={3}
                value={formState.description}
                onChange={(event) => handleChange("description", event.target.value)}
                className="rounded-2xl border border-[var(--border)] px-3 py-2"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span>CTA label</span>
              <input
                value={formState.ctaLabel}
                onChange={(event) => handleChange("ctaLabel", event.target.value)}
                className="rounded-2xl border border-[var(--border)] px-3 py-2"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span>Hero image URL</span>
              <input
                value={formState.image}
                onChange={(event) => handleChange("image", event.target.value)}
                className="rounded-2xl border border-[var(--border)] px-3 py-2"
                placeholder="/hero.webp or https://..."
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-[var(--primary)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#fff7ec]"
          >
            Update preview
          </button>
          {message && <p className="text-xs text-[#4f3c27]">{message}</p>}
        </form>

        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-[#a78a6e]">Live preview</p>
          <div className="rounded-[36px] border border-[var(--border)] bg-white p-6">
            <div className="relative h-64 w-full overflow-hidden rounded-[28px] border border-[var(--border)]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${preview.image})` }}
              />
              <div className="absolute inset-0 bg-black/45" />
              <div className="relative z-10 flex h-full flex-col justify-end bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6 text-white">
                <p className="text-xs uppercase tracking-[0.4em] text-[#f7ead7]">{preview.dropLabel}</p>
                <h2 className="text-2xl capitalize">{preview.title}</h2>
                <p className="text-sm text-[#fef9f1]">{preview.description}</p>
              </div>
            </div>
            <div className="mt-4 space-y-2 text-sm text-[#4f3c27]">
              <p>
                <strong>Status:</strong> {preview.status}
              </p>
              <p>
                <strong>Release window:</strong> {preview.releaseWindow}
              </p>
              <p>
                <strong>CTA:</strong> {preview.ctaLabel}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
