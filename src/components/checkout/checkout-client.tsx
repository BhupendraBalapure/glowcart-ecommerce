"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Check,
  CreditCard,
  Loader2,
  Lock,
  MapPin,
  Truck,
  Wallet,
} from "lucide-react";

import { cn, formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { OrderSummary } from "@/components/cart/order-summary";
import { useCartStore } from "@/store/cart-store";

const STEPS = ["Information", "Shipping", "Payment", "Review"] as const;

export function CheckoutClient() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);

  const [step, setStep] = useState(0);
  const [placing, setPlacing] = useState(false);
  const [data, setData] = useState({
    email: "",
    phone: "",
    fullName: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    shipping: "standard",
    payment: "card",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvc: "",
  });

  const set = (k: keyof typeof data) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setData((d) => ({ ...d, [k]: e.target.value }));

  function next() {
    setStep((s) => Math.min(STEPS.length - 1, s + 1));
  }
  function back() {
    setStep((s) => Math.max(0, s - 1));
  }

  function placeOrder() {
    setPlacing(true);
    const orderNo = "GC" + Math.floor(100000 + Math.random() * 900000);
    // Persist a lightweight order snapshot for the success page (demo).
    try {
      localStorage.setItem(
        "glowcart-last-order",
        JSON.stringify({
          orderNumber: orderNo,
          name: data.fullName || "there",
          email: data.email,
          itemCount: items.reduce((n, i) => n + i.quantity, 0),
        })
      );
    } catch {}
    setTimeout(() => {
      clear();
      router.push(`/checkout/success?order=${orderNo}`);
    }, 1100);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
      <div>
        {/* Stepper */}
        <ol className="mb-8 flex items-center">
          {STEPS.map((label, i) => (
            <li key={label} className="flex flex-1 items-center last:flex-none">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "grid h-8 w-8 place-items-center rounded-full text-sm font-semibold transition-colors",
                    i < step
                      ? "bg-primary text-primary-foreground"
                      : i === step
                        ? "bg-primary text-primary-foreground ring-4 ring-secondary"
                        : "bg-muted text-muted-foreground"
                  )}
                >
                  {i < step ? <Check className="h-4 w-4" /> : i + 1}
                </span>
                <span
                  className={cn(
                    "hidden text-sm font-medium sm:inline",
                    i === step ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <span
                  className={cn(
                    "mx-3 h-px flex-1",
                    i < step ? "bg-primary" : "bg-border"
                  )}
                />
              )}
            </li>
          ))}
        </ol>

        <div className="rounded-3xl border border-border bg-white p-6 sm:p-8">
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="font-serif text-xl font-semibold">
                Contact information
              </h2>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={data.email} onChange={set("email")} placeholder="you@example.com" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" value={data.phone} onChange={set("phone")} placeholder="+91 98765 43210" />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-serif text-xl font-semibold">
                Shipping address
              </h2>
              <div className="space-y-1.5">
                <Label htmlFor="fullName">Full name</Label>
                <Input id="fullName" value={data.fullName} onChange={set("fullName")} placeholder="Ananya Rao" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="line1">Address line 1</Label>
                <Input id="line1" value={data.line1} onChange={set("line1")} placeholder="Flat / House no, Street" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="line2">Address line 2 (optional)</Label>
                <Input id="line2" value={data.line2} onChange={set("line2")} placeholder="Landmark, Area" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" value={data.city} onChange={set("city")} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" value={data.state} onChange={set("state")} />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="postalCode">PIN code</Label>
                <Input id="postalCode" value={data.postalCode} onChange={set("postalCode")} />
              </div>

              <div className="pt-2">
                <Label className="mb-2 block">Delivery method</Label>
                <RadioGroup value={data.shipping} onValueChange={(v) => setData((d) => ({ ...d, shipping: v }))}>
                  {[
                    { id: "standard", icon: Truck, label: "Standard (3–5 days)", price: "Free" },
                    { id: "express", icon: Truck, label: "Express (1–2 days)", price: "₹149" },
                  ].map((opt) => (
                    <label
                      key={opt.id}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-2xl border p-3 transition-colors",
                        data.shipping === opt.id ? "border-primary bg-secondary/40" : "border-border"
                      )}
                    >
                      <RadioGroupItem value={opt.id} />
                      <opt.icon className="h-5 w-5 text-primary" />
                      <span className="flex-1 text-sm font-medium">{opt.label}</span>
                      <span className="text-sm">{opt.price}</span>
                    </label>
                  ))}
                </RadioGroup>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-serif text-xl font-semibold">Payment</h2>
              <RadioGroup value={data.payment} onValueChange={(v) => setData((d) => ({ ...d, payment: v }))}>
                {[
                  { id: "card", icon: CreditCard, label: "Credit / Debit card" },
                  { id: "upi", icon: Wallet, label: "UPI" },
                  { id: "cod", icon: Truck, label: "Cash on delivery" },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-2xl border p-3 transition-colors",
                      data.payment === opt.id ? "border-primary bg-secondary/40" : "border-border"
                    )}
                  >
                    <RadioGroupItem value={opt.id} />
                    <opt.icon className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">{opt.label}</span>
                  </label>
                ))}
              </RadioGroup>

              {data.payment === "card" && (
                <div className="space-y-3 rounded-2xl bg-muted/40 p-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="cardNumber">Card number</Label>
                    <Input id="cardNumber" value={data.cardNumber} onChange={set("cardNumber")} placeholder="4242 4242 4242 4242" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="cardName">Name on card</Label>
                    <Input id="cardName" value={data.cardName} onChange={set("cardName")} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="expiry">Expiry</Label>
                      <Input id="expiry" value={data.expiry} onChange={set("expiry")} placeholder="MM/YY" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" value={data.cvc} onChange={set("cvc")} placeholder="123" />
                    </div>
                  </div>
                </div>
              )}

              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Lock className="h-3.5 w-3.5" /> This is a demo checkout — no real
                payment is processed.
              </p>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="font-serif text-xl font-semibold">Review your order</h2>
              <div className="rounded-2xl bg-muted/40 p-4 text-sm">
                <p className="flex items-center gap-2 font-medium">
                  <MapPin className="h-4 w-4 text-primary" /> Shipping to
                </p>
                <p className="mt-1 text-muted-foreground">
                  {data.fullName || "—"}, {data.line1} {data.line2}, {data.city},{" "}
                  {data.state} {data.postalCode}
                </p>
              </div>
              <div className="divide-y divide-border">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 py-3">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-muted">
                      <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Nav buttons */}
          <div className="mt-6 flex items-center justify-between">
            {step > 0 ? (
              <Button variant="ghost" onClick={back}>
                Back
              </Button>
            ) : (
              <span />
            )}
            {step < STEPS.length - 1 ? (
              <Button onClick={next}>Continue</Button>
            ) : (
              <Button onClick={placeOrder} disabled={placing} size="lg">
                {placing && <Loader2 className="h-4 w-4 animate-spin" />}
                Place order
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="lg:sticky lg:top-24 lg:self-start">
        <OrderSummary />
      </div>
    </div>
  );
}
