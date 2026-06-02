"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Star } from "lucide-react";

import { Button } from "@/components/ui/button";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden glow-gradient">
      <div className="container grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
        {/* Copy */}
        <div className="relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-rosegold/20 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-rosegold-dark backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5" /> New season, new glow
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="mt-5 text-balance text-4xl font-semibold leading-[1.1] text-foreground sm:text-5xl lg:text-6xl"
          >
            Beauty that lets your{" "}
            <span className="rose-gradient-text">natural glow</span> shine.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            className="mt-5 max-w-md text-base text-muted-foreground sm:text-lg"
          >
            Discover clean, luxurious formulas across makeup, skincare and
            fragrance — curated for every skin type and every ritual.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button asChild size="lg">
              <Link href="/shop">
                Shop the collection <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/quiz">Take the beauty quiz</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-9 flex items-center gap-6"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-3">
                {[47, 32, 20, 15].map((id) => (
                  <Image
                    key={id}
                    src={`https://i.pravatar.cc/80?img=${id}`}
                    alt=""
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Loved by 50,000+ customers
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2.5rem] shadow-soft-lg">
            <Image
              src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80"
              alt="GlowCart beauty products"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 450px"
              className="object-cover"
            />
          </div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-2 top-10 rounded-2xl bg-white/90 p-3 shadow-soft backdrop-blur sm:left-4"
          >
            <p className="text-xs font-semibold">Bestselling Serum</p>
            <p className="text-[11px] text-muted-foreground">★ 4.8 · 1.2k reviews</p>
          </motion.div>

          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-2 bottom-12 rounded-2xl bg-white/90 p-3 shadow-soft backdrop-blur sm:right-4"
          >
            <p className="text-xs font-semibold text-rosegold-dark">Up to 30% off</p>
            <p className="text-[11px] text-muted-foreground">Limited time offers</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
