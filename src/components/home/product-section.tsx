import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Product } from "@/types";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/reveal";
import { ProductCarousel } from "@/components/product/product-carousel";

interface ProductSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  products: Product[];
  href?: string;
  className?: string;
}

export function ProductSection({
  eyebrow,
  title,
  description,
  products,
  href = "/shop",
  className,
}: ProductSectionProps) {
  if (!products.length) return null;
  return (
    <section className={cn("container py-16", className)}>
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <Reveal>
          {eyebrow && (
            <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {eyebrow}
            </span>
          )}
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="mt-2 max-w-xl text-muted-foreground">{description}</p>
          )}
        </Reveal>
        <Link
          href={href}
          className="group inline-flex items-center gap-1 text-sm font-medium text-primary"
        >
          View all
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <ProductCarousel products={products} />
    </section>
  );
}
