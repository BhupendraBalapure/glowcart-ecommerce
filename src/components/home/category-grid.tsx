import Image from "next/image";
import Link from "next/link";

import { categories } from "@/data/categories";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/reveal";

export function CategoryGrid() {
  return (
    <section className="container py-16">
      <SectionHeading
        eyebrow="Shop by category"
        title="Find your beauty essentials"
        description="From radiant skincare to bold makeup — explore curated collections for every part of your routine."
      />

      <Stagger className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((cat) => (
          <StaggerItem key={cat.id}>
            <Link
              href={`/category/${cat.slug}`}
              className="group relative block overflow-hidden rounded-2xl"
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 16vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-3 text-center">
                <p className="font-serif text-sm font-semibold text-white">
                  {cat.name}
                </p>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
