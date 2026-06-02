"use client";

import { formatPrice } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cart-store";

export function OrderSummary({ children }: { children?: React.ReactNode }) {
  const subtotal = useCartStore((s) => s.subtotal());
  const discount = useCartStore((s) => s.discount());
  const shipping = useCartStore((s) => s.shipping());
  const total = useCartStore((s) => s.total());
  const coupon = useCartStore((s) => s.coupon);

  const points = Math.floor(total / 100);

  return (
    <div className="rounded-3xl border border-border bg-white p-6 shadow-soft">
      <h2 className="font-serif text-lg font-semibold">Order summary</h2>

      <dl className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Subtotal</dt>
          <dd className="font-medium">{formatPrice(subtotal)}</dd>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-emerald-600">
            <dt>Discount {coupon ? `(${coupon.code})` : ""}</dt>
            <dd className="font-medium">−{formatPrice(discount)}</dd>
          </div>
        )}
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Shipping</dt>
          <dd className="font-medium">
            {shipping === 0 ? (
              <span className="text-emerald-600">Free</span>
            ) : (
              formatPrice(shipping)
            )}
          </dd>
        </div>
      </dl>

      <Separator className="my-4" />

      <div className="flex items-end justify-between">
        <span className="font-medium">Total</span>
        <span className="font-serif text-2xl font-semibold">
          {formatPrice(total)}
        </span>
      </div>

      {points > 0 && (
        <p className="mt-2 rounded-lg bg-secondary/50 px-3 py-2 text-xs text-rosegold-dark">
          ✨ You&apos;ll earn <strong>{points} GlowPoints</strong> on this order
        </p>
      )}

      {children}
    </div>
  );
}
