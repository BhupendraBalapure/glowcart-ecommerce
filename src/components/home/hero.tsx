import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Stagger, StaggerItem } from "@/components/shared/reveal";

export function Hero() {
  return (
    <section className="container py-6 lg:py-8">
      <Stagger className="grid grid-cols-2 gap-3 sm:gap-4 lg:h-[600px] lg:grid-cols-4 lg:grid-rows-2">
        {/* A — Headline + CTA (big tile) */}
        <StaggerItem className="col-span-2 lg:row-span-2">
          <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl glow-gradient p-7 sm:p-9">
            {/* decorative blob */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-pink/50 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 left-10 h-48 w-48 rounded-full bg-rosegold/15 blur-3xl" />

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-rosegold/20 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-rosegold-dark backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" /> New season, new glow
              </span>
              <h1 className="mt-5 text-balance text-4xl font-bold leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
                Beauty that lets your{" "}
                <span className="bg-gradient-to-r from-rosegold to-rosegold-dark bg-clip-text text-transparent">
                  radiance
                </span>{" "}
                shine.
              </h1>
              <p className="mt-4 max-w-md text-muted-foreground sm:text-lg">
                Clean, luxurious formulas across makeup, skincare and fragrance —
                curated for every skin type and every ritual.
              </p>
            </div>

            <div className="relative mt-6">
              <div className="flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <Link href="/shop">
                    Shop the collection <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/quiz">Take the beauty quiz</Link>
                </Button>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[47, 32, 20, 15].map((id) => (
                    <Image
                      key={id}
                      src={`https://i.pravatar.cc/80?img=${id}`}
                      alt=""
                      width={34}
                      height={34}
                      className="h-8 w-8 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Loved by <span className="font-semibold text-foreground">50,000+</span> customers
                </p>
              </div>
            </div>
          </div>
        </StaggerItem>

        {/* B — Wide lifestyle image */}
        <StaggerItem className="col-span-2">
          <Link
            href="/shop?sort=popular"
            className="group relative block h-44 overflow-hidden rounded-3xl sm:h-52 lg:h-full"
          >
            <Image
              src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1000&q=80"
              alt="Shop bestsellers"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
            <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between text-white">
              <div>
                <p className="text-xs uppercase tracking-wide text-white/80">
                  Most loved
                </p>
                <p className="font-serif text-xl font-semibold">Bestsellers</p>
              </div>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink transition-transform group-hover:scale-110">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        </StaggerItem>

        {/* C — Category tile */}
        <StaggerItem>
          <Link
            href="/category/skincare"
            className="group relative block h-44 overflow-hidden rounded-3xl sm:h-52 lg:h-full"
          >
            <Image
              src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=700&q=80"
              alt="Skincare"
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <p className="font-serif text-lg font-semibold text-white">Skincare</p>
              <p className="text-xs text-white/80">Glow from within →</p>
            </div>
          </Link>
        </StaggerItem>

        {/* D — Offer tile */}
        <StaggerItem>
          <Link
            href="/shop?filter=limited"
            className="group flex h-44 flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-rosegold to-rosegold-dark p-5 text-white sm:h-52 lg:h-full"
          >
            <span className="w-fit rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide backdrop-blur">
              Limited time
            </span>
            <div>
              <p className="font-serif text-3xl font-bold leading-none">
                Up to 30% off
              </p>
              <p className="mt-1.5 text-sm text-white/85">
                The Glow Edit sale
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold">
                Shop the sale
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </StaggerItem>
      </Stagger>
    </section>
  );
}
