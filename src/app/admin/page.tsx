import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";

import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { AdminCharts } from "@/components/admin/admin-charts";

const kpis = [
  { label: "Total revenue", value: formatPrice(1510000), delta: "+12.4%", icon: DollarSign },
  { label: "Orders", value: "950", delta: "+8.1%", icon: ShoppingCart },
  { label: "Products", value: String(products.length), delta: "+3", icon: Package },
  { label: "Customers", value: "4,820", delta: "+5.6%", icon: Users },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back — here&apos;s how GlowCart is performing.
        </p>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <div
            key={k.label}
            className="rounded-2xl border border-border bg-white p-5 shadow-soft"
          >
            <div className="flex items-center justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-rosegold-dark">
                <k.icon className="h-5 w-5" />
              </span>
              <span className="text-xs font-semibold text-emerald-600">
                {k.delta}
              </span>
            </div>
            <p className="mt-3 font-serif text-2xl font-semibold">{k.value}</p>
            <p className="text-sm text-muted-foreground">{k.label}</p>
          </div>
        ))}
      </div>

      <AdminCharts />
    </div>
  );
}
