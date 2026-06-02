import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { categories, getCategory } from "@/data/categories";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ShopClient } from "@/components/shop/shop-client";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "Category" };
  return {
    title: category.name,
    description: `Shop ${category.name} — ${category.tagline} at GlowCart.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="relative h-[280px]">
          <Image
            src={category.image}
            alt={category.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/40 to-ink/20" />
          <div className="container relative flex h-full flex-col justify-end pb-8">
            <Breadcrumbs
              className="[&_*]:text-white/80"
              items={[
                { label: "Home", href: "/" },
                { label: "Shop", href: "/shop" },
                { label: category.name },
              ]}
            />
            <h1 className="mt-3 font-serif text-4xl font-semibold text-white sm:text-5xl">
              {category.name}
            </h1>
            <p className="mt-2 text-white/85">{category.tagline}</p>
          </div>
        </div>
      </section>

      <ShopClient initial={{ categories: [category.slug] }} />
    </>
  );
}
