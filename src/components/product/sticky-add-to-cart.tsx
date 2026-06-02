"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";

import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";

export function StickyAddToCart({ product }: { product: Product }) {
  const [show, setShow] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-white/95 p-3 shadow-soft-lg backdrop-blur lg:hidden"
        >
          <div className="container flex items-center gap-3">
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-muted">
              <Image src={product.images[0]} alt={product.name} fill sizes="44px" className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{product.name}</p>
              <p className="text-sm font-semibold">{formatPrice(product.price)}</p>
            </div>
            <Button
              onClick={() => {
                addItem(
                  {
                    slug: product.slug,
                    name: product.name,
                    brand: product.brand,
                    image: product.images[0],
                    price: product.price,
                    shade: product.shades?.[0]?.name,
                  },
                  1
                );
                toast.success("Added to bag", { description: product.name });
              }}
            >
              <ShoppingBag className="h-4 w-4" /> Add
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
