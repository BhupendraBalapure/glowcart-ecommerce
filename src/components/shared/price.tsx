import { cn } from "@/lib/utils";
import { discountPercent, formatPrice } from "@/lib/utils";

interface PriceProps {
  price: number;
  compareAtPrice?: number | null;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Price({
  price,
  compareAtPrice,
  size = "md",
  className,
}: PriceProps) {
  const pct = discountPercent(price, compareAtPrice);
  const sizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-2xl",
  } as const;
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className={cn("font-semibold text-foreground", sizes[size])}>
        {formatPrice(price)}
      </span>
      {pct > 0 && (
        <>
          <span
            className={cn(
              "text-muted-foreground line-through",
              size === "lg" ? "text-base" : "text-xs"
            )}
          >
            {formatPrice(compareAtPrice!)}
          </span>
          <span className="text-xs font-semibold text-emerald-600">
            {pct}% off
          </span>
        </>
      )}
    </div>
  );
}
