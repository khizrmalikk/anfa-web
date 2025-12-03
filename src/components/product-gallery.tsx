"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import type { ShopifyImage } from "@/lib/shopify";

type ProductGalleryProps = {
  title: string;
  images: ShopifyImage[];
};

export function ProductGallery({ title, images }: ProductGalleryProps) {
  const gallery = images.length ? images : [{ url: "/placeholder.png", altText: title }];
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const activeImage = gallery[activeIndex] ?? gallery[0];
  const trackRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const slideWidth = track.clientWidth;
    isProgrammaticScroll.current = true;
    track.scrollTo({
      left: slideWidth * activeIndex,
      behavior: "smooth",
    });
    const timeout = window.setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 320);
    return () => window.clearTimeout(timeout);
  }, [activeIndex]);

  const handleTrackScroll = () => {
    if (isProgrammaticScroll.current) return;
    const track = trackRef.current;
    if (!track) return;
    const slideWidth = track.clientWidth;
    const nextIndex = Math.round(track.scrollLeft / slideWidth);
    if (nextIndex !== activeIndex) {
      setActiveIndex(nextIndex);
    }
  };

  return (
    <>
      <div className="space-y-4">
        <div className="relative">
          <div
            ref={trackRef}
            onScroll={handleTrackScroll}
            className="flex snap-x snap-mandatory overflow-x-auto rounded-[36px] border border-[var(--border)] bg-black/5 scrollbar-hide"
          >
            {gallery.map((image, idx) => (
              <div
                key={`${image.url}-slide-${idx}`}
                className="relative min-w-full snap-center overflow-hidden rounded-[36px] border border-transparent"
              >
                <div className="relative aspect-[3/4] max-h-[360px] md:max-h-[480px] lg:max-h-[560px]">
                  <Image
                    src={image.url}
                    alt={image.altText ?? title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 720px"
                    className="object-cover"
                    priority={idx === 0}
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setZoomed(true)}
            className="absolute right-4 top-4 rounded-full bg-white/85 px-4 py-1 text-[11px] uppercase tracking-[0.35em] text-[var(--foreground)] shadow"
          >
            Zoom
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2">
          {gallery.map((image, idx) => (
            <button
              key={`${image.url}-thumb-${idx}`}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl border transition",
                activeIndex === idx ? "border-[var(--primary)]" : "border-[var(--border)]",
              )}
              aria-label={`Show image ${idx + 1}`}
            >
              <Image
                src={image.url}
                alt={image.altText ?? title}
                fill
                sizes="96px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {zoomed && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-6">
          <button
            type="button"
            className="absolute right-6 top-6 rounded-full border border-white/40 px-4 py-1 text-xs uppercase tracking-[0.35em] text-white"
            onClick={() => setZoomed(false)}
            aria-label="Close zoomed image"
          >
            Close
          </button>
          <div className="relative h-full w-full max-h-[90vh] max-w-5xl">
            <Image
              src={activeImage.url}
              alt={activeImage.altText ?? title}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}

