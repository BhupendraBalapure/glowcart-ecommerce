import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";

import {
  getProductBySlug,
  getRelatedProducts,
  getFrequentlyBought,
  products,
} from "@/data/products";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductInfo } from "@/components/product/product-info";
import { ProductReviews } from "@/components/product/product-reviews";
import { FrequentlyBought } from "@/components/product/frequently-bought";
import { ProductCarousel } from "@/components/product/product-carousel";
import { RecentlyViewed } from "@/components/product/recently-viewed";
import { TrackRecentlyViewed } from "@/components/product/track-recently-viewed";
import { StickyAddToCart } from "@/components/product/sticky-add-to-cart";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [product.images[0]],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);
  const bundle = getFrequentlyBought(product);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images,
    description: product.shortDescription,
    brand: { "@type": "Brand", name: product.brand },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.ratingCount,
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "INR",
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
  };

  return (
    <div className="container py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TrackRecentlyViewed slug={product.slug} />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: product.name },
        ]}
      />

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} name={product.name} />
        <ProductInfo product={product} />
      </div>

      {/* Details tabs */}
      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className="flex-wrap">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
            <TabsTrigger value="how">How to use</TabsTrigger>
          </TabsList>

          <TabsContent value="description">
            <div className="max-w-3xl text-muted-foreground">
              <p>{product.description}</p>
            </div>
          </TabsContent>

          <TabsContent value="ingredients">
            <div className="max-w-3xl">
              <p className="text-muted-foreground">{product.ingredients}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {product.skinTypes.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-rosegold-dark"
                  >
                    {s} skin
                  </span>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="benefits">
            <ul className="grid max-w-2xl gap-3 sm:grid-cols-2">
              {product.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-secondary text-rosegold-dark">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-sm">{b}</span>
                </li>
              ))}
            </ul>
          </TabsContent>

          <TabsContent value="how">
            <div className="max-w-3xl text-muted-foreground">
              <p>{product.howToUse}</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {bundle.length > 0 && (
        <FrequentlyBought product={product} bundle={bundle} />
      )}

      <ProductReviews product={product} />

      {related.length > 0 && (
        <section className="py-12">
          <h2 className="mb-8 font-serif text-2xl font-semibold">
            You may also like
          </h2>
          <ProductCarousel products={related} />
        </section>
      )}

      <RecentlyViewed excludeSlug={product.slug} />

      <StickyAddToCart product={product} />
    </div>
  );
}
