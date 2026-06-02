"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import type { Product } from "@/types";
import { cn, formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useCartStore } from "@/store/cart-store";

export function FrequentlyBought({
  product,
  bundle,
}: {
  product: Product;
  bundle: Product[];
}) {
  const items = [product, ...bundle];
  const [selected, setSelected] = useState<string[]>(items.map((p) => p.slug));
  const addItem = useCartStore((s) => s.addItem);

  const chosen = items.filter((p) => selected.includes(p.slug));
  const total = chosen.reduce((sum, p) => sum + p.price, 0);

  function toggle(slug: string) {
    setSelected((s) =>
      s.includes(slug) ? s.filter((x) => x !== slug) : [...s, slug]
    );
  }

  function addAll() {
    chosen.forEach((p) =>
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
      )
    );
    toast.success(`${chosen.length} items added to bag`);
  }

  return (
    <section className="border-t border-border py-12">
      <h2 className="font-serif text-2xl font-semibold">
        Frequently bought together
      </h2>

      <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-center">
        <div className="flex flex-wrap items-center gap-3">
          {items.map((p, i) => (
            <div key={p.id} className="flex items-center gap-3">
              <label className="relative block cursor-pointer">
                <div className="relative h-28 w-28 overflow-hidden rounded-2xl border border-border bg-muted">
                  <Image
                    src={p.images[0]}
                    alt={p.name}
                    fill
                    sizes="112px"
                    className={cn(
                      "object-cover transition-opacity",
                      !selected.includes(p.slug) && "opacity-40"
                    )}
                  />
                </div>
                <span className="absolute left-2 top-2">
                  <Checkbox
                    checked={selected.includes(p.slug)}
                    onCheckedChange={() => toggle(p.slug)}
                    className="bg-white"
                  />
                </span>
              </label>
              {i < items.length - 1 && (
                <Plus className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
          ))}
        </div>

        <div className="lg:ml-auto">
          <p className="text-sm text-muted-foreground">
            Total for {chosen.length} item{chosen.length !== 1 && "s"}
          </p>
          <p className="text-2xl font-semibold">{formatPrice(total)}</p>
          <Button
            onClick={addAll}
            className="mt-3"
            disabled={chosen.length === 0}
          >
            Add bundle to bag
          </Button>
        </div>
      </div>
    </section>
  );
}
