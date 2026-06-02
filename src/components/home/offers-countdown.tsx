"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getByTag } from "@/data/products";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import { Reveal } from "@/components/shared/reveal";

function useCountdown(targetHoursFromNow = 36) {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const target = Date.now() + targetHoursFromNow * 3600 * 1000;
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setTime({
        h: Math.floor(diff / 3.6e6),
        m: Math.floor((diff % 3.6e6) / 6e4),
        s: Math.floor((diff % 6e4) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetHoursFromNow]);

  return time;
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-ink text-2xl font-semibold text-white tabular-nums">
        {String(value).padStart(2, "0")}
      </div>
      <span className="mt-1.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

export function OffersCountdown() {
  const { h, m, s } = useCountdown(36);
  const offers = getByTag("limited", 4);

  return (
    <section className="container py-16">
      <div className="overflow-hidden rounded-3xl border border-rosegold/15 bg-secondary/40 p-6 sm:p-10">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <Reveal>
            <span className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground">
              Limited time
            </span>
            <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
              Glow Edit Sale — up to 30% off
            </h2>
            <p className="mt-3 max-w-md text-muted-foreground">
              Our most-wanted formulas at their best prices. Hurry — these
              prices vanish when the timer hits zero.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Unit value={h} label="Hours" />
              <span className="text-2xl font-semibold text-muted-foreground">:</span>
              <Unit value={m} label="Mins" />
              <span className="text-2xl font-semibold text-muted-foreground">:</span>
              <Unit value={s} label="Secs" />
            </div>
            <Button asChild size="lg" className="mt-7">
              <Link href="/shop?filter=limited">
                Shop the sale <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </Reveal>

          <div className="grid grid-cols-2 gap-4">
            {offers.slice(0, 2).map((p) => (
              <div key={p.id} className="rounded-2xl bg-white p-3 shadow-soft">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
