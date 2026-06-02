"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, GitCompareArrows, ShoppingBag, X } from "lucide-react";
import { toast } from "sonner";

import { getProductBySlug } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/shared/rating";
import { EmptyState } from "@/components/shared/empty-state";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { useCompareStore } from "@/store/compare-store";
import { useCartStore } from "@/store/cart-store";
import { useMounted } from "@/hooks/use-mounted";

export default function ComparePage() {
  const mounted = useMounted();
  const slugs = useCompareStore((s) => s.slugs);
  const remove = useCompareStore((s) => s.remove);
  const addItem = useCartStore((s) => s.addItem);

  const products = slugs
    .map((s) => getProductBySlug(s))
    .filter(Boolean) as NonNullable<ReturnType<typeof getProductBySlug>>[];

  if (!mounted) return <div className="container py-16" />;

  if (products.length === 0) {
    return (
      <div className="container py-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Compare" }]} />
        <EmptyState
          className="mt-8"
          icon={GitCompareArrows}
          title="Nothing to compare yet"
          description="Add products to compare using the compare button on any product."
          actionLabel="Browse products"
          actionHref="/shop"
        />
      </div>
    );
  }

  const rows: { label: string; render: (p: (typeof products)[number]) => React.ReactNode }[] = [
    { label: "Price", render: (p) => <span className="font-semibold">{formatPrice(p.price)}</span> },
    { label: "Rating", render: (p) => <Rating value={p.rating} count={p.ratingCount} /> },
    { label: "Brand", render: (p) => p.brand },
    { label: "Category", render: (p) => <span className="capitalize">{p.category.replace("-", " ")}</span> },
    { label: "Skin types", render: (p) => p.skinTypes.join(", ") },
    {
      label: "Key benefits",
      render: (p) => (
        <ul className="space-y-1 text-left">
          {p.benefits.slice(0, 3).map((b) => (
            <li key={b} className="flex items-start gap-1.5 text-xs">
              <Check className="mt-0.5 h-3 w-3 shrink-0 text-primary" /> {b}
            </li>
          ))}
        </ul>
      ),
    },
    { label: "Availability", render: (p) => (p.stock > 0 ? <span className="text-emerald-600">In stock</span> : <span className="text-destructive">Out of stock</span>) },
  ];

  return (
    <div className="container py-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Compare" }]} />
      <h1 className="mt-3 font-serif text-4xl font-semibold">Compare products</h1>
      <p className="mt-2 text-muted-foreground">
        Side-by-side details to help you choose.
      </p>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[640px] border-separate border-spacing-x-3">
          <thead>
            <tr>
              <th className="w-32" />
              {products.map((p) => (
                <th key={p.id} className="align-top">
                  <div className="relative rounded-2xl border border-border bg-white p-4 text-center shadow-soft">
                    <button
                      onClick={() => remove(p.slug)}
                      className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-muted hover:bg-secondary"
                      aria-label="Remove"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <Link href={`/product/${p.slug}`}>
                      <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-xl bg-muted">
                        <Image src={p.images[0]} alt={p.name} fill sizes="128px" className="object-cover" />
                      </div>
                      <p className="mt-3 text-sm font-medium">{p.name}</p>
                    </Link>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <td className="py-3 text-sm font-semibold text-muted-foreground">
                  {row.label}
                </td>
                {products.map((p) => (
                  <td
                    key={p.id}
                    className="rounded-xl bg-white px-4 py-3 text-center align-top text-sm"
                  >
                    {row.render(p)}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td />
              {products.map((p) => (
                <td key={p.id} className="px-4 py-3 text-center">
                  <Button
                    size="sm"
                    onClick={() => {
                      addItem(
                        {
                          slug: p.slug,
                          name: p.name,
                          brand: p.brand,
                          image: p.images[0],
                          price: p.price,
                          shade: p.shades?.[0]?.name,
                        },
                        1
                      );
                      toast.success("Added to bag", { description: p.name });
                    }}
                  >
                    <ShoppingBag className="h-4 w-4" /> Add
                  </Button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
