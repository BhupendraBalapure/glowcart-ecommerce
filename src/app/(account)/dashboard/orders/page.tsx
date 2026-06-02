import Image from "next/image";

import { mockOrders } from "@/data/mock-account";
import { formatDate, formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { OrderStatusBadge } from "@/components/account/order-status-badge";
import { OrderTracking } from "@/components/account/order-tracking";

export default function OrdersPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold">Your orders</h1>
      <p className="mt-1 text-muted-foreground">
        Track shipments and revisit past purchases.
      </p>

      <div className="mt-6 space-y-5">
        {mockOrders.map((order) => (
          <div
            key={order.orderNumber}
            className="rounded-2xl border border-border bg-white p-6 shadow-soft"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
              <div>
                <p className="font-semibold">Order #{order.orderNumber}</p>
                <p className="text-sm text-muted-foreground">
                  Placed {formatDate(order.date)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <OrderStatusBadge status={order.status} />
                <span className="font-semibold">{formatPrice(order.total)}</span>
              </div>
            </div>

            <div className="py-5">
              <OrderTracking status={order.status} />
            </div>

            <div className="divide-y divide-border border-t border-border">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-muted">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Qty {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-semibold">{formatPrice(item.price)}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-3">
              <Button variant="outline" size="sm">
                Need help?
              </Button>
              <Button variant="ghost" size="sm">
                Buy again
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
