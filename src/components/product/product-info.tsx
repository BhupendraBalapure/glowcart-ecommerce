"use client";

import { useState } from "react";
import {
  Check,
  GitCompareArrows,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { toast } from "sonner";

import type { Product } from "@/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/shared/rating";
import { Price } from "@/components/shared/price";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { useCompareStore } from "@/store/compare-store";

export function ProductInfo({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const [shadeIdx, setShadeIdx] = useState(0);

  const addItem = useCartStore((s) => s.addItem);
  const wishlisted = useWishlistStore((s) => s.slugs.includes(product.slug));
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const compared = useCompareStore((s) => s.slugs.includes(product.slug));
  const toggleCompare = useCompareStore((s) => s.toggle);

  const inStock = product.stock > 0;

  function handleAdd() {
    addItem(
      {
        slug: product.slug,
        name: product.name,
        brand: product.brand,
        image: product.images[0],
        price: product.price,
        shade: product.shades?.[shadeIdx]?.name,
      },
      qty
    );
    toast.success("Added to bag", {
      description: `${qty} × ${product.name}`,
    });
  }

  function handleCompare() {
    const res = toggleCompare(product.slug);
    if (!res.ok) toast.error(res.message ?? "Could not add to compare");
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm uppercase tracking-wide text-muted-foreground">
          {product.brand}
        </span>
        {product.tags.map((t) => (
          <Badge key={t} variant="soft" className="capitalize">
            {t}
          </Badge>
        ))}
      </div>

      <h1 className="mt-2 font-serif text-3xl font-semibold leading-tight sm:text-4xl">
        {product.name}
      </h1>

      <div className="mt-3 flex items-center gap-3">
        <Rating value={product.rating} count={product.ratingCount} showValue />
        <span className="text-sm text-muted-foreground">·</span>
        <span
          className={cn(
            "text-sm font-medium",
            inStock ? "text-emerald-600" : "text-destructive"
          )}
        >
          {inStock ? "In stock" : "Out of stock"}
        </span>
      </div>

      <Price
        price={product.price}
        compareAtPrice={product.compareAtPrice}
        size="lg"
        className="mt-4"
      />

      <p className="mt-4 text-muted-foreground">{product.shortDescription}</p>

      {/* Shades */}
      {product.shades && (
        <div className="mt-6">
          <p className="mb-2 text-sm font-medium">
            Shade:{" "}
            <span className="text-muted-foreground">
              {product.shades[shadeIdx].name}
            </span>
          </p>
          <div className="flex flex-wrap gap-2.5">
            {product.shades.map((shade, i) => (
              <button
                key={shade.name}
                onClick={() => setShadeIdx(i)}
                title={shade.name}
                style={{ backgroundColor: shade.hex }}
                className={cn(
                  "grid h-9 w-9 place-items-center rounded-full ring-2 ring-offset-2 transition-all",
                  i === shadeIdx ? "ring-primary" : "ring-transparent"
                )}
              >
                {i === shadeIdx && (
                  <Check className="h-4 w-4 text-white drop-shadow" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity + actions */}
      <div className="mt-7 flex flex-wrap items-center gap-3">
        <div className="flex items-center rounded-full border border-border">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="grid h-11 w-11 place-items-center rounded-full hover:bg-muted"
            aria-label="Decrease"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-10 text-center font-medium">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="grid h-11 w-11 place-items-center rounded-full hover:bg-muted"
            aria-label="Increase"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <Button
          onClick={handleAdd}
          size="lg"
          className="flex-1"
          disabled={!inStock}
        >
          <ShoppingBag className="h-4 w-4" /> Add to bag
        </Button>

        <Button
          onClick={() => toggleWishlist(product.slug)}
          size="icon"
          variant="outline"
          className="h-12 w-12"
          aria-label="Wishlist"
        >
          <Heart
            className={cn("h-5 w-5", wishlisted && "fill-primary text-primary")}
          />
        </Button>
      </div>

      <button
        onClick={handleCompare}
        className={cn(
          "mt-3 inline-flex items-center gap-1.5 text-sm font-medium transition-colors",
          compared ? "text-primary" : "text-muted-foreground hover:text-primary"
        )}
      >
        <GitCompareArrows className="h-4 w-4" />
        {compared ? "Added to compare" : "Add to compare"}
      </button>

      {/* Trust */}
      <div className="mt-7 grid gap-3 rounded-2xl border border-border bg-muted/40 p-4 sm:grid-cols-3">
        <div className="flex items-center gap-2 text-sm">
          <Truck className="h-4 w-4 text-primary" /> Free shipping ₹999+
        </div>
        <div className="flex items-center gap-2 text-sm">
          <ShieldCheck className="h-4 w-4 text-primary" /> Secure checkout
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Check className="h-4 w-4 text-primary" /> 100% authentic
        </div>
      </div>
    </div>
  );
}
