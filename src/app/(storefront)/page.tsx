import { getByTag } from "@/data/products";
import { Hero } from "@/components/home/hero";
import { ValueProps } from "@/components/home/value-props";
import { CategoryGrid } from "@/components/home/category-grid";
import { ProductSection } from "@/components/home/product-section";
import { BrandStrip } from "@/components/home/brand-strip";
import { OffersCountdown } from "@/components/home/offers-countdown";
import { Testimonials } from "@/components/home/testimonials";
import { BlogTeaser } from "@/components/home/blog-teaser";
import { InstagramGallery } from "@/components/home/instagram-gallery";
import { RecentlyViewed } from "@/components/product/recently-viewed";

export default function HomePage() {
  const bestSellers = getByTag("bestseller");
  const newArrivals = getByTag("new");
  const trending = getByTag("trending");

  return (
    <>
      <Hero />
      <ValueProps />
      <CategoryGrid />
      <ProductSection
        eyebrow="Bestsellers"
        title="Most-loved favourites"
        description="The formulas our community can't stop repurchasing."
        products={bestSellers}
        href="/shop?sort=popular"
      />
      <BrandStrip />
      <ProductSection
        eyebrow="New launches"
        title="Fresh on the shelf"
        description="Just-dropped formulas to add to your routine."
        products={newArrivals}
        href="/shop?filter=new"
      />
      <OffersCountdown />
      <ProductSection
        eyebrow="Trending now"
        title="What everyone's loving"
        products={trending}
        href="/shop?sort=popular"
      />
      <Testimonials />
      <BlogTeaser />
      <RecentlyViewed />
      <InstagramGallery />
    </>
  );
}
