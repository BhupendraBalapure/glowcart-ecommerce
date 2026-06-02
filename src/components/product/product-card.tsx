"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, Heart, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

import type { Product } from "@/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/shared/rating";
import { Price } from "@/components/shared/price";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { useUIStore } from "@/store/ui-store";

function tagBadge(tag: Product["tags"][number]) {
  switch (tag) {
    case "bestseller":
      return { label: "Bestseller", variant: "default" as const };
    case "new":
      return { label: "New", variant: "soft" as const };
    case "trending":
      return { label: "Trending", variant: "gold" as const };
    case "limited":
      return { label: "Limited", variant: "destructive" as const };
  }
}

export function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const wishlisted = useWishlistStore((s) => s.slugs.includes(product.slug));
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const openQuickView = useUIStore((s) => s.openQuickView);

  const primaryTag = product.tags[0];
  const badge = primaryTag ? tagBadge(primaryTag) : null;

  function handleAdd() {
    addItem(
      {
        slug: product.slug,
        name: product.name,
        brand: product.brand,
        image: product.images[0],
        price: product.price,
        shade: product.shades?.[0]?.name,
      },
      1
    );
    toast.success("Added to bag", { description: product.name });
  }

  function handleWishlist() {
    toggleWishlist(product.slug);
    toast(wishlisted ? "Removed from wishlist" : "Saved to wishlist", {
      description: product.name,
    });
  }

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={cn("group relative flex flex-col", className)}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
        <Link href={`/product/${product.slug}`} aria-label={product.name}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt=""
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}
        </Link>

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {badge && <Badge variant={badge.variant}>{badge.label}</Badge>}
        </div>

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          aria-label="Toggle wishlist"
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-foreground shadow-soft backdrop-blur transition-transform hover:scale-110 active:scale-90"
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-colors",
              wishlisted && "fill-primary text-primary"
            )}
          />
        </button>

        {/* Quick actions */}
        <div className="absolute inset-x-3 bottom-3 flex translate-y-3 gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Button onClick={handleAdd} size="sm" className="flex-1">
            <ShoppingBag className="h-4 w-4" />
            Add
          </Button>
          <Button
            onClick={() => openQuickView(product.slug)}
            size="icon"
            variant="outline"
            className="h-9 w-9 bg-white/90 backdrop-blur"
            aria-label="Quick view"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 flex flex-1 flex-col">
        <span className="text-xs uppercase tracking-wide text-muted-foreground">
          {product.brand}
        </span>
        <Link
          href={`/product/${product.slug}`}
          className="mt-0.5 line-clamp-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
        >
          {product.name}
        </Link>
        <Rating
          value={product.rating}
          count={product.ratingCount}
          className="mt-1.5"
        />
        <Price
          price={product.price}
          compareAtPrice={product.compareAtPrice}
          className="mt-2"
        />
      </div>
    </motion.div>
  );
}
