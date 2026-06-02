import { Skeleton } from "@/components/ui/skeleton";
import { ProductGridSkeleton } from "@/components/product/product-card-skeleton";

export default function ShopLoading() {
  return (
    <div className="container py-8">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="mt-3 h-4 w-80" />
      <div className="mt-8 flex gap-8">
        <div className="hidden w-64 shrink-0 space-y-4 lg:block">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
        <div className="flex-1">
          <ProductGridSkeleton count={9} />
        </div>
      </div>
    </div>
  );
}
