"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

import { getProductBySlug } from "@/data/products";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Rating } from "@/components/shared/rating";
import { Price } from "@/components/shared/price";
import { useUIStore } from "@/store/ui-store";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";

export function QuickViewModal() {
  const slug = useUIStore((s) => s.quickViewSlug);
  const close = useUIStore((s) => s.closeQuickView);
  const addItem = useCartStore((s) => s.addItem);
  const wishlisted = useWishlistStore((s) => (slug ? s.slugs.includes(slug) : false));
  const toggleWishlist = useWishlistStore((s) => s.toggle);

  const [qty, setQty] = useState(1);
  const [shadeIdx, setShadeIdx] = useState(0);
  const [imgIdx, setImgIdx] = useState(0);

  const product = slug ? getProductBySlug(slug) : undefined;

  function handleAdd() {
    if (!product) return;
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
    toast.success("Added to bag", { description: product.name });
    close();
    setQty(1);
  }

  return (
    <Dialog open={!!product} onOpenChange={(o) => !o && close()}>
      <DialogContent className="max-w-3xl p-0">
        {product && (
          <div className="grid gap-0 sm:grid-cols-2">
            <div className="relative aspect-square overflow-hidden bg-muted sm:rounded-l-2xl">
              <Image
                src={product.images[imgIdx]}
                alt={product.name}
                fill
                sizes="400px"
                className="object-cover"
              />
              <div className="absolute bottom-3 left-3 flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIdx(i)}
                    className={cn(
                      "h-12 w-12 overflow-hidden rounded-lg border-2",
                      i === imgIdx ? "border-primary" : "border-white/70"
                    )}
                  >
                    <Image
                      src={img}
                      alt=""
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col p-6">
              <span className="text-xs uppercase tracking-wide text-muted-foreground">
                {product.brand}
              </span>
              <h2 className="mt-1 font-serif text-2xl font-semibold">
                {product.name}
              </h2>
              <Rating
                value={product.rating}
                count={product.ratingCount}
                className="mt-2"
                showValue
              />
              <Price
                price={product.price}
                compareAtPrice={product.compareAtPrice}
                size="lg"
                className="mt-3"
              />
              <p className="mt-3 text-sm text-muted-foreground">
                {product.shortDescription}
              </p>

              {product.shades && (
                <div className="mt-4">
                  <p className="mb-2 text-xs font-medium">
                    Shade:{" "}
                    <span className="text-muted-foreground">
                      {product.shades[shadeIdx].name}
                    </span>
                  </p>
                  <div className="flex gap-2">
                    {product.shades.map((shade, i) => (
                      <button
                        key={shade.name}
                        onClick={() => setShadeIdx(i)}
                        title={shade.name}
                        style={{ backgroundColor: shade.hex }}
                        className={cn(
                          "h-8 w-8 rounded-full ring-2 ring-offset-2 transition-all",
                          i === shadeIdx ? "ring-primary" : "ring-transparent"
                        )}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-5 flex items-center gap-3">
                <div className="flex items-center rounded-full border border-border">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="grid h-10 w-10 place-items-center rounded-full hover:bg-muted"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center text-sm font-medium">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="grid h-10 w-10 place-items-center rounded-full hover:bg-muted"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <Button onClick={handleAdd} className="flex-1">
                  <ShoppingBag className="h-4 w-4" /> Add to bag
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => toggleWishlist(product.slug)}
                  aria-label="Wishlist"
                >
                  <Heart
                    className={cn(
                      "h-4 w-4",
                      wishlisted && "fill-primary text-primary"
                    )}
                  />
                </Button>
              </div>

              <Link
                href={`/product/${product.slug}`}
                onClick={close}
                className="mt-4 text-center text-sm font-medium text-primary hover:underline"
              >
                View full details →
              </Link>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
