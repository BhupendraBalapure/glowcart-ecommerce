"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { getProductBySlug } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/shared/rating";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { useCartStore } from "@/store/cart-store";

// Curated "look" — each hotspot points to a product at an x/y position on the image.
const LOOK = [
  { slug: "radiance-glow-vitamin-c-serum", top: "26%", left: "24%" },
  { slug: "dewy-veil-moisturiser", top: "58%", left: "64%" },
  { slug: "velvet-matte-lipstick-rosewood", top: "72%", left: "30%" },
  { slug: "rose-elixir-eau-de-parfum", top: "40%", left: "76%" },
];

const EDITORIAL_IMG =
  "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1100&q=80";

export function ShopTheLook() {
  const [active, setActive] = useState<number | null>(null);
  const addItem = useCartStore((s) => s.addItem);

  const items = LOOK.map((l) => ({
    ...l,
    product: getProductBySlug(l.slug),
  })).filter((i) => i.product) as (typeof LOOK[number] & {
    product: NonNullable<ReturnType<typeof getProductBySlug>>;
  })[];

  function add(p: NonNullable<ReturnType<typeof getProductBySlug>>) {
    addItem(
      {
        slug: p.slug,
        name: p.name,
        brand: p.brand,
        image: p.images[0],
        price: p.price,
        shade: p.shades?.[0]?.name,
      },
      1
    );
    toast.success("Added to bag", { description: p.name });
  }

  return (
    <section className="container py-16">
      <SectionHeading
        eyebrow="Shop the look"
        title="Get the editorial glow"
        description="Tap the dots to shop every product in this look — straight to your bag."
      />

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1.4fr_1fr]">
        {/* Image with hotspots */}
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-muted shadow-soft sm:aspect-[16/12]">
            <Image
              src={EDITORIAL_IMG}
              alt="Shop the look — curated beauty edit"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent" />

            {items.map((item, i) => {
              const isOpen = active === i;
              return (
                <div
                  key={item.slug}
                  className="absolute"
                  style={{ top: item.top, left: item.left }}
                >
                  {/* Hotspot dot */}
                  <button
                    onMouseEnter={() => setActive(i)}
                    onClick={() => setActive(isOpen ? null : i)}
                    aria-label={`Shop ${item.product.name}`}
                    className="relative grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center"
                  >
                    <span className="absolute inline-flex h-7 w-7 animate-ping rounded-full bg-white/70" />
                    <span className="relative grid h-7 w-7 place-items-center rounded-full bg-white text-rosegold-dark shadow-soft ring-1 ring-rosegold/30">
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>

                  {/* Popup card */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        onMouseLeave={() => setActive(null)}
                        className="absolute bottom-full left-1/2 z-20 mb-3 w-56 -translate-x-1/2 rounded-2xl border border-border bg-white p-3 shadow-soft-lg"
                      >
                        <div className="flex gap-3">
                          <Link
                            href={`/product/${item.product.slug}`}
                            className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-muted"
                          >
                            <Image
                              src={item.product.images[0]}
                              alt={item.product.name}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          </Link>
                          <div className="min-w-0">
                            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                              {item.product.brand}
                            </p>
                            <Link
                              href={`/product/${item.product.slug}`}
                              className="line-clamp-2 text-xs font-medium hover:text-primary"
                            >
                              {item.product.name}
                            </Link>
                            <Rating value={item.product.rating} className="mt-1" />
                          </div>
                        </div>
                        <div className="mt-2.5 flex items-center justify-between">
                          <span className="text-sm font-semibold">
                            {formatPrice(item.product.price)}
                          </span>
                          <Button size="sm" onClick={() => add(item.product)}>
                            <Plus className="h-3.5 w-3.5" /> Add
                          </Button>
                        </div>
                        {/* arrow */}
                        <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-border bg-white" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* Product list (always visible — great on mobile) */}
        <Reveal delay={0.1}>
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              In this look
            </p>
            {items.map((item, i) => (
              <div
                key={item.slug}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className="flex items-center gap-3 rounded-2xl border border-border bg-white p-3 transition-colors hover:border-rosegold/40"
              >
                <Link
                  href={`/product/${item.product.slug}`}
                  className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-muted"
                >
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </Link>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                    {item.product.brand}
                  </p>
                  <Link
                    href={`/product/${item.product.slug}`}
                    className="line-clamp-1 text-sm font-medium hover:text-primary"
                  >
                    {item.product.name}
                  </Link>
                  <span className="text-sm font-semibold">
                    {formatPrice(item.product.price)}
                  </span>
                </div>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-9 w-9 shrink-0"
                  onClick={() => add(item.product)}
                  aria-label="Add to bag"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
