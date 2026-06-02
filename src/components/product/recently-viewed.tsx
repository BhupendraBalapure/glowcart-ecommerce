"use client";

import { getProductBySlug } from "@/data/products";
import { useRecentlyViewedStore } from "@/store/recently-viewed-store";
import { useMounted } from "@/hooks/use-mounted";
import { ProductCarousel } from "./product-carousel";
import { Reveal } from "@/components/shared/reveal";

export function RecentlyViewed({ excludeSlug }: { excludeSlug?: string }) {
  const slugs = useRecentlyViewedStore((s) => s.slugs);
  const mounted = useMounted();

  if (!mounted) return null;

  const products = slugs
    .filter((s) => s !== excludeSlug)
    .map((s) => getProductBySlug(s))
    .filter(Boolean) as NonNullable<ReturnType<typeof getProductBySlug>>[];

  if (products.length === 0) return null;

  return (
    <section className="container py-16">
      <Reveal className="mb-10">
        <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Recently viewed
        </span>
        <h2 className="text-3xl font-semibold sm:text-4xl">Pick up where you left off</h2>
      </Reveal>
      <ProductCarousel products={products} />
    </section>
  );
}
