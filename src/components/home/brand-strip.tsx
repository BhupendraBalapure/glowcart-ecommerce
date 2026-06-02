import Link from "next/link";

import { brands } from "@/data/brands";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";

export function BrandStrip() {
  return (
    <section className="border-y border-border bg-beige py-14">
      <div className="container">
        <SectionHeading
          eyebrow="Top brands"
          title="Brands you'll love"
          description="We partner with the best in clean, conscious beauty."
        />
        <Reveal className="mt-10">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {brands.map((brand) => (
              <Link
                key={brand.id}
                href={`/shop?brand=${brand.slug}`}
                className="group grid h-20 place-items-center rounded-2xl border border-border bg-white px-4 text-center transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-soft"
              >
                <span className="font-serif text-base font-semibold text-foreground transition-colors group-hover:text-primary">
                  {brand.name}
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
