import { Badge } from "@/components/ui/badge";
import type { OrderStatus } from "@/data/mock-account";

const map: Record<OrderStatus, { label: string; variant: "default" | "secondary" | "gold" | "soft" | "success" | "destructive" }> = {
  PENDING: { label: "Pending", variant: "secondary" },
  PAID: { label: "Paid", variant: "gold" },
  PROCESSING: { label: "Processing", variant: "gold" },
  SHIPPED: { label: "Shipped", variant: "default" },
  DELIVERED: { label: "Delivered", variant: "success" },
  CANCELLED: { label: "Cancelled", variant: "destructive" },
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const cfg = map[status];
  return <Badge variant={cfg.variant}>{cfg.label}</Badge>;
}
