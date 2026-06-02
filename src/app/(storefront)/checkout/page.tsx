"use client";

import { ShoppingBag } from "lucide-react";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { EmptyState } from "@/components/shared/empty-state";
import { CheckoutClient } from "@/components/checkout/checkout-client";
import { useCartStore } from "@/store/cart-store";
import { useMounted } from "@/hooks/use-mounted";

export default function CheckoutPage() {
  const mounted = useMounted();
  const items = useCartStore((s) => s.items);

  if (!mounted) return <div className="container py-16" />;

  return (
    <div className="container py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Cart", href: "/cart" },
          { label: "Checkout" },
        ]}
      />
      <h1 className="mb-8 mt-3 font-serif text-4xl font-semibold">Checkout</h1>

      {items.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="Your bag is empty"
          description="Add a few products before heading to checkout."
          actionLabel="Start shopping"
          actionHref="/shop"
        />
      ) : (
        <CheckoutClient />
      )}
    </div>
  );
}
