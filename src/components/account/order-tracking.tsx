import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { ORDER_TIMELINE, type OrderStatus } from "@/data/mock-account";

const labels: Record<OrderStatus, string> = {
  PENDING: "Order placed",
  PAID: "Payment confirmed",
  PROCESSING: "Processing",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

export function OrderTracking({ status }: { status: OrderStatus }) {
  if (status === "CANCELLED") {
    return (
      <div className="rounded-xl bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
        This order was cancelled.
      </div>
    );
  }

  const currentIndex = ORDER_TIMELINE.indexOf(status);

  return (
    <ol className="flex items-center">
      {ORDER_TIMELINE.map((step, i) => {
        const done = i <= currentIndex;
        const active = i === currentIndex;
        return (
          <li key={step} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <span
                className={cn(
                  "grid h-8 w-8 place-items-center rounded-full text-xs font-semibold transition-colors",
                  done
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground",
                  active && "ring-4 ring-secondary"
                )}
              >
                {done ? <Check className="h-4 w-4" /> : i + 1}
              </span>
              <span
                className={cn(
                  "hidden text-center text-[11px] font-medium sm:block",
                  done ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {labels[step]}
              </span>
            </div>
            {i < ORDER_TIMELINE.length - 1 && (
              <span
                className={cn(
                  "mx-2 h-0.5 flex-1 rounded-full",
                  i < currentIndex ? "bg-primary" : "bg-border"
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
