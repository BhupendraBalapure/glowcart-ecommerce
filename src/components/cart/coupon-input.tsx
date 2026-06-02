"use client";

import { useState } from "react";
import { Tag, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/store/cart-store";

export function CouponInput() {
  const coupon = useCartStore((s) => s.coupon);
  const applyCoupon = useCartStore((s) => s.applyCoupon);
  const removeCoupon = useCartStore((s) => s.removeCoupon);
  const [code, setCode] = useState("");

  function apply() {
    const res = applyCoupon(code);
    if (res.ok) {
      toast.success(res.message);
      setCode("");
    } else {
      toast.error(res.message);
    }
  }

  if (coupon) {
    return (
      <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
        <span className="flex items-center gap-2 text-sm font-medium text-emerald-700">
          <Tag className="h-4 w-4" /> {coupon.code} applied
        </span>
        <button
          onClick={() => {
            removeCoupon();
            toast("Coupon removed");
          }}
          className="text-emerald-700 hover:text-emerald-900"
          aria-label="Remove coupon"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-2">
        <Input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Coupon code"
          onKeyDown={(e) => e.key === "Enter" && apply()}
        />
        <Button variant="outline" onClick={apply}>
          Apply
        </Button>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Try <strong>GLOW10</strong>, <strong>GLOW20</strong> or{" "}
        <strong>WELCOME200</strong>
      </p>
    </div>
  );
}
