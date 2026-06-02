"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";

import { getByTag } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { EmptyState } from "@/components/shared/empty-state";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CartItemRow } from "@/components/cart/cart-item-row";
import { CouponInput } from "@/components/cart/coupon-input";
import { OrderSummary } from "@/components/cart/order-summary";
import { ProductCarousel } from "@/components/product/product-carousel";
import { useCartStore } from "@/store/cart-store";
import { useMounted } from "@/hooks/use-mounted";

export default function CartPage() {
  const mounted = useMounted();
  const items = useCartStore((s) => s.items);
  const savedForLater = useCartStore((s) => s.savedForLater);
  const moveToCart = useCartStore((s) => s.moveToCart);
  const recommended = getByTag("trending", 8);

  if (!mounted) return <div className="container py-16" />;

  return (
    <div className="container py-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cart" }]} />
      <h1 className="mt-3 font-serif text-4xl font-semibold">Your bag</h1>

      {items.length === 0 ? (
        <EmptyState
          className="mt-8"
          icon={ShoppingBag}
          title="Your bag is empty"
          description="Looks like you haven't added anything yet. Let's find your next favourite."
          actionLabel="Start shopping"
          actionHref="/shop"
        />
      ) : (
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
          {/* Items */}
          <div>
            <div className="divide-y divide-border rounded-3xl border border-border bg-white px-6">
              {items.map((item) => (
                <CartItemRow key={item.id} item={item} />
              ))}
            </div>

            {savedForLater.length > 0 && (
              <div className="mt-8">
                <h2 className="font-serif text-xl font-semibold">
                  Saved for later
                </h2>
                <div className="mt-4 space-y-3">
                  {savedForLater.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 rounded-2xl border border-border bg-white p-3"
                    >
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-muted">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => moveToCart(item.id)}
                      >
                        Move to bag
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="mb-4">
              <CouponInput />
            </div>
            <OrderSummary>
              <Button asChild size="lg" className="mt-5 w-full">
                <Link href="/checkout">
                  Checkout <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Link
                href="/shop"
                className="mt-3 block text-center text-sm text-muted-foreground hover:text-primary"
              >
                Continue shopping
              </Link>
            </OrderSummary>
          </div>
        </div>
      )}

      {/* Recommendations */}
      {recommended.length > 0 && (
        <section className="py-16">
          <Separator className="mb-12" />
          <h2 className="mb-8 font-serif text-2xl font-semibold">
            You might also like
          </h2>
          <ProductCarousel products={recommended} />
        </section>
      )}
    </div>
  );
}
