import Image from "next/image";
import { Quote } from "lucide-react";

import { testimonials } from "@/data/testimonials";
import { Rating } from "@/components/shared/rating";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/reveal";

export function Testimonials() {
  return (
    <section className="container py-16">
      <SectionHeading
        eyebrow="Loved by you"
        title="Real glow, real reviews"
        description="Join thousands who made GlowCart part of their daily ritual."
      />

      <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((t) => (
          <StaggerItem key={t.id}>
            <figure className="flex h-full flex-col rounded-3xl border border-border bg-white p-6 shadow-soft">
              <Quote className="h-7 w-7 text-secondary" />
              <Rating value={t.rating} className="mt-3" />
              <blockquote className="mt-3 flex-1 text-sm text-foreground/90">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.location}</p>
                </div>
              </figcaption>
            </figure>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
