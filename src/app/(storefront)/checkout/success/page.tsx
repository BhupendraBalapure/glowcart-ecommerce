"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Check, Package, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

function SuccessInner() {
  const params = useSearchParams();
  const orderNumber = params.get("order") ?? "GC000000";
  const [name, setName] = useState("there");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("glowcart-last-order");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.name) setName(parsed.name);
      }
    } catch {}
  }, []);

  return (
    <div className="container flex flex-col items-center py-20 text-center">
      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 14 }}
        className="grid h-20 w-20 place-items-center rounded-full bg-primary text-primary-foreground shadow-soft-lg"
      >
        <Check className="h-10 w-10" strokeWidth={3} />
      </motion.div>

      <h1 className="mt-6 font-serif text-3xl font-semibold sm:text-4xl">
        Thank you, {name}! 🎉
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        Your order has been placed successfully. We&apos;ve sent a confirmation
        to your email and you&apos;ll get tracking updates soon.
      </p>

      <div className="mt-6 rounded-2xl border border-border bg-white px-6 py-4 shadow-soft">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          Order number
        </p>
        <p className="font-serif text-2xl font-semibold">{orderNumber}</p>
      </div>

      <p className="mt-5 flex items-center gap-1.5 rounded-full bg-secondary/50 px-4 py-2 text-sm text-rosegold-dark">
        <Sparkles className="h-4 w-4" /> GlowPoints have been added to your account
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/dashboard/orders">
            <Package className="h-4 w-4" /> Track your order
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/shop">Continue shopping</Link>
        </Button>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="container py-20" />}>
      <SuccessInner />
    </Suspense>
  );
}
