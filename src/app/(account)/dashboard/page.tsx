import Link from "next/link";
import { ArrowRight, Gift, Heart, Package } from "lucide-react";

import { auth } from "@/lib/auth";
import { mockOrders } from "@/data/mock-account";
import { formatDate, formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { OrderStatusBadge } from "@/components/account/order-status-badge";

export default async function DashboardOverview() {
  const session = await auth().catch(() => null);
  const name = session?.user?.name ?? "Beauty lover";
  const points = session?.user ? 320 : 320;

  const stats = [
    { label: "Total orders", value: mockOrders.length, icon: Package, href: "/dashboard/orders" },
    { label: "GlowPoints", value: points, icon: Gift, href: "/dashboard/rewards" },
    { label: "Wishlist", value: "View", icon: Heart, href: "/dashboard/wishlist" },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold">
        Hello, {name.split(" ")[0]} ✨
      </h1>
      <p className="mt-1 text-muted-foreground">
        Here&apos;s what&apos;s happening with your GlowCart account.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="rounded-2xl border border-border bg-white p-5 shadow-soft transition-transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-rosegold-dark">
                <s.icon className="h-5 w-5" />
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="mt-3 font-serif text-2xl font-semibold">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-white p-6 shadow-soft">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-semibold">Recent orders</h2>
          <Link
            href="/dashboard/orders"
            className="text-sm font-medium text-primary hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="mt-4 divide-y divide-border">
          {mockOrders.map((order) => (
            <div
              key={order.orderNumber}
              className="flex items-center justify-between gap-4 py-3"
            >
              <div>
                <p className="text-sm font-medium">#{order.orderNumber}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(order.date)} · {order.items.length} items
                </p>
              </div>
              <OrderStatusBadge status={order.status} />
              <p className="hidden text-sm font-semibold sm:block">
                {formatPrice(order.total)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
