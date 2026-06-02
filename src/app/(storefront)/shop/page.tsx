import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ShopClient, type ShopInitial } from "@/components/shop/shop-client";

export const metadata: Metadata = {
  title: "Shop all beauty",
  description:
    "Shop premium makeup, skincare, haircare, fragrances and more at GlowCart.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const asArray = (v?: string | string[]) =>
    v ? (Array.isArray(v) ? v : [v]) : undefined;

  const initial: ShopInitial = {
    categories: asArray(sp.category),
    brands: asArray(sp.brand),
    tag: typeof sp.filter === "string" ? sp.filter : undefined,
    sort: typeof sp.sort === "string" ? sp.sort : undefined,
    query: typeof sp.q === "string" ? sp.q : undefined,
  };

  return (
    <>
      <div className="border-b border-border bg-beige">
        <div className="container py-8">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shop" }]} />
          <h1 className="mt-3 font-serif text-4xl font-semibold">
            The GlowCart Edit
          </h1>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Explore our full collection of clean, luxurious beauty — filtered to
            find exactly what your routine needs.
          </p>
        </div>
      </div>
      <ShopClient initial={initial} />
    </>
  );
}
