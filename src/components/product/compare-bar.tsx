"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { GitCompareArrows, X } from "lucide-react";

import { getProductBySlug } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useCompareStore } from "@/store/compare-store";
import { useMounted } from "@/hooks/use-mounted";

export function CompareBar() {
  const slugs = useCompareStore((s) => s.slugs);
  const remove = useCompareStore((s) => s.remove);
  const clear = useCompareStore((s) => s.clear);
  const mounted = useMounted();

  const products = slugs
    .map((s) => getProductBySlug(s))
    .filter(Boolean);

  const show = mounted && products.length > 0;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-x-0 bottom-0 z-40 px-4 pb-4"
        >
          <div className="container flex items-center gap-4 rounded-2xl border border-border bg-white/95 p-3 shadow-soft-lg backdrop-blur">
            <div className="flex items-center gap-2">
              <GitCompareArrows className="h-5 w-5 text-primary" />
              <span className="hidden text-sm font-medium sm:inline">
                Compare ({products.length})
              </span>
            </div>
            <div className="flex flex-1 gap-2 overflow-x-auto">
              {products.map(
                (p) =>
                  p && (
                    <div key={p.id} className="relative shrink-0">
                      <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-muted">
                        <Image
                          src={p.images[0]}
                          alt={p.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <button
                        onClick={() => remove(p.slug)}
                        className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-ink text-white"
                        aria-label="Remove"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={clear}>
                Clear
              </Button>
              <Button asChild size="sm">
                <Link href="/compare">Compare</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
