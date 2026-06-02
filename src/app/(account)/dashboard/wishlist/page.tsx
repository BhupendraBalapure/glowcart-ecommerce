"use client";

import { Heart } from "lucide-react";

import { getProductBySlug } from "@/data/products";
import { EmptyState } from "@/components/shared/empty-state";
import { ProductCard } from "@/components/product/product-card";
import { useWishlistStore } from "@/store/wishlist-store";
import { useMounted } from "@/hooks/use-mounted";

export default function DashboardWishlistPage() {
  const mounted = useMounted();
  const slugs = useWishlistStore((s) => s.slugs);

  const products = slugs
    .map((s) => getProductBySlug(s))
    .filter(Boolean) as NonNullable<ReturnType<typeof getProductBySlug>>[];

  if (!mounted) return <div className="py-10" />;

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold">Your wishlist</h1>
      <p className="mt-1 text-muted-foreground">
        Saved products waiting for the perfect moment.
      </p>

      {products.length === 0 ? (
        <EmptyState
          className="mt-6"
          icon={Heart}
          title="No favourites yet"
          description="Tap the heart on any product to save it here."
          actionLabel="Browse products"
          actionHref="/shop"
        />
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
