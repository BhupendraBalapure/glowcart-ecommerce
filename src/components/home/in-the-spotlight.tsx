"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";

interface Banner {
  brand: string;
  title: string;
  subtitle?: string;
  offer: string;
  note?: string;
  href: string;
  image: string;
  bg: string; // full tailwind gradient classes
  fade: string; // from-<color> for image blend
}

const banners: Banner[] = [
  {
    brand: "Luminé",
    title: "Clinically Tested Barrier Repair",
    subtitle: "For Dry & Sensitive Skin",
    offer: "Upto 10% Off",
    note: "Free gift on ₹1500",
    href: "/shop?brand=lumine",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=700&q=80",
    bg: "bg-gradient-to-br from-sky-400 to-blue-500",
    fade: "from-blue-500",
  },
  {
    brand: "Velvet Rose",
    title: "Bold Lips, So In",
    subtitle: "The Velvet Matte Edit",
    offer: "Up to 20% Off",
    note: "On the entire makeup range",
    href: "/category/makeup",
    image:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=700&q=80",
    bg: "bg-gradient-to-br from-rose-400 to-red-500",
    fade: "from-red-500",
  },
  {
    brand: "Pétale",
    title: "Find Your Signature Scent",
    subtitle: "Rose Élixir EDP",
    offer: "Limited Edition",
    note: "While stocks last",
    href: "/category/fragrances",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=700&q=80",
    bg: "bg-gradient-to-br from-pink-400 to-rose-500",
    fade: "from-rose-500",
  },
  {
    brand: "Aurelia",
    title: "Glow From Within",
    subtitle: "The Vitamin C Edit",
    offer: "New Launch",
    note: "Brighten & even tone",
    href: "/category/skincare",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=700&q=80",
    bg: "bg-gradient-to-br from-emerald-400 to-teal-500",
    fade: "from-teal-500",
  },
  {
    brand: "Soleil",
    title: "Soft Skin Season",
    subtitle: "Whipped Body Soufflé",
    offer: "Free gift on ₹1500",
    note: "48-hour softness",
    href: "/category/bath-body",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=700&q=80",
    bg: "bg-gradient-to-br from-amber-400 to-orange-500",
    fade: "from-orange-500",
  },
];

function BannerCard({ banner }: { banner: Banner }) {
  return (
    <div
      className={cn(
        "relative flex h-44 overflow-hidden rounded-2xl shadow-soft sm:h-48",
        banner.bg
      )}
    >
      {/* Text */}
      <div className="relative z-10 flex w-[60%] flex-col justify-between p-5">
        <div>
          <span className="inline-block rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink shadow-sm">
            {banner.brand}
          </span>
          <h3 className="mt-3 text-lg font-bold leading-tight text-white drop-shadow-sm">
            {banner.title}
          </h3>
          {banner.subtitle && (
            <span className="mt-1.5 inline-block rounded-md bg-black/15 px-2 py-0.5 text-[11px] font-medium text-white">
              {banner.subtitle}
            </span>
          )}
        </div>
        <div>
          <p className="text-lg font-extrabold text-white drop-shadow-sm">
            {banner.offer}
          </p>
          {banner.note && (
            <p className="text-[11px] text-white/85">{banner.note}</p>
          )}
        </div>
      </div>

      {/* Image */}
      <div className="relative w-[40%]">
        <Image
          src={banner.image}
          alt={banner.title}
          fill
          sizes="360px"
          className="object-cover"
        />
        <div
          className={cn(
            "absolute inset-y-0 -left-px w-20 bg-gradient-to-r to-transparent",
            banner.fade
          )}
        />
      </div>

      {/* Shop Now */}
      <Button
        asChild
        size="sm"
        className="absolute bottom-4 right-4 z-10 bg-white text-rosegold-dark hover:bg-white/90"
      >
        <Link href={banner.href}>
          Shop Now <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </Button>

      {/* full-card link */}
      <Link
        href={banner.href}
        aria-label={`Shop ${banner.brand}`}
        className="absolute inset-0 z-0"
      />
    </div>
  );
}

export function InTheSpotlight() {
  const scroller = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: "smooth" });
  };

  return (
    <section className="container py-12">
      <div className="mb-6 flex items-end justify-between">
        <Reveal>
          <span className="mb-1 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Featured offers
          </span>
          <h2 className="text-3xl font-semibold sm:text-4xl">In the Spotlight</h2>
        </Reveal>
        <div className="hidden gap-2 sm:flex">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scrollBy(-1)}
            aria-label="Previous"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scrollBy(1)}
            aria-label="Next"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        ref={scroller}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2"
      >
        {banners.map((banner) => (
          <div
            key={banner.brand}
            className="w-[88%] shrink-0 snap-start sm:w-[55%] lg:w-[32.5%]"
          >
            <BannerCard banner={banner} />
          </div>
        ))}
      </div>
    </section>
  );
}
