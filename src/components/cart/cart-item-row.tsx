"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Minus, Plus, Trash2 } from "lucide-react";

import { type CartLine, useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";

export function CartItemRow({ item }: { item: CartLine }) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const saveForLater = useCartStore((s) => s.saveForLater);

  return (
    <div className="flex gap-4 py-5">
      <Link
        href={`/product/${item.slug}`}
        className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-muted"
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="96px"
          className="object-cover"
        />
      </Link>

      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              {item.brand}
            </p>
            <Link
              href={`/product/${item.slug}`}
              className="text-sm font-medium hover:text-primary"
            >
              {item.name}
            </Link>
            {item.shade && (
              <p className="text-xs text-muted-foreground">Shade: {item.shade}</p>
            )}
          </div>
          <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
        </div>

        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-center rounded-full border border-border">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="grid h-8 w-8 place-items-center rounded-full hover:bg-muted"
              aria-label="Decrease"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-8 text-center text-sm font-medium">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="grid h-8 w-8 place-items-center rounded-full hover:bg-muted"
              aria-label="Increase"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-3 text-muted-foreground">
            <button
              onClick={() => saveForLater(item.id)}
              className="flex items-center gap-1 text-xs hover:text-primary"
            >
              <Heart className="h-3.5 w-3.5" /> Save for later
            </button>
            <button
              onClick={() => removeItem(item.id)}
              className="flex items-center gap-1 text-xs hover:text-destructive"
            >
              <Trash2 className="h-3.5 w-3.5" /> Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
