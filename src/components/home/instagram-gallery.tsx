import Image from "next/image";
import { Instagram } from "lucide-react";

import { instagramGallery } from "@/data";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/reveal";

export function InstagramGallery() {
  return (
    <section className="container py-16">
      <SectionHeading
        eyebrow="@glowcart"
        title="Join the #GlowCart community"
        description="Tag us for a chance to be featured. Share how you glow."
      />

      <Stagger className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-6">
        {instagramGallery.map((img, i) => (
          <StaggerItem key={i}>
            <a
              href="#"
              className="group relative block aspect-square overflow-hidden rounded-2xl"
            >
              <Image
                src={img}
                alt="Instagram post"
                fill
                sizes="(max-width: 768px) 33vw, 16vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 grid place-items-center bg-ink/40 opacity-0 transition-opacity group-hover:opacity-100">
                <Instagram className="h-6 w-6 text-white" />
              </div>
            </a>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
