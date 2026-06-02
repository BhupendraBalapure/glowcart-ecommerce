"use client";

import { Heart } from "lucide-react";

import { getProductBySlug } from "@/data/products";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { EmptyState } from "@/components/shared/empty-state";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { Stagger, StaggerItem } from "@/components/shared/reveal";
import { useWishlistStore } from "@/store/wishlist-store";
import { useMounted } from "@/hooks/use-mounted";

export default function WishlistPage() {
  const mounted = useMounted();
  const slugs = useWishlistStore((s) => s.slugs);
  const clear = useWishlistStore((s) => s.clear);

  const products = slugs
    .map((s) => getProductBySlug(s))
    .filter(Boolean) as NonNullable<ReturnType<typeof getProductBySlug>>[];

  if (!mounted) return <div className="container py-16" />;

  return (
    <div className="container py-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Wishlist" }]} />
      <div className="mt-3 flex items-center justify-between">
        <h1 className="font-serif text-4xl font-semibold">Your wishlist</h1>
        {products.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clear}>
            Clear all
          </Button>
        )}
      </div>

      {products.length === 0 ? (
        <EmptyState
          className="mt-8"
          icon={Heart}
          title="No favourites yet"
          description="Tap the heart on any product to save it here for later."
          actionLabel="Discover products"
          actionHref="/shop"
        />
      ) : (
        <Stagger className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <StaggerItem key={p.id}>
              <ProductCard product={p} />
            </StaggerItem>
          ))}
        </Stagger>
      )}
    </div>
  );
}
