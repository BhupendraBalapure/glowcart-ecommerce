import { Gift, ShoppingBag, Sparkles, Star, Truck } from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const POINTS = 320;
const NEXT_TIER = 500;

const earnWays = [
  { icon: ShoppingBag, label: "Earn 1 point for every ₹100 spent" },
  { icon: Star, label: "50 points for every product review" },
  { icon: Sparkles, label: "100 bonus points on your birthday" },
];

const rewards = [
  { points: 200, label: "₹100 off your next order" },
  { points: 400, label: "Free standard shipping for a month" },
  { points: 600, label: "₹350 off + a deluxe sample" },
  { points: 1000, label: "VIP early access to new launches" },
];

export default function RewardsPage() {
  const progress = Math.min(100, (POINTS / NEXT_TIER) * 100);

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold">GlowRewards</h1>
      <p className="mt-1 text-muted-foreground">
        Earn points on every order and unlock luxurious perks.
      </p>

      {/* Balance card */}
      <div className="mt-6 overflow-hidden rounded-3xl bg-gradient-to-br from-rosegold to-rosegold-dark p-6 text-white shadow-soft-lg sm:p-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white/80">Your balance</p>
            <p className="font-serif text-4xl font-semibold">{POINTS} pts</p>
          </div>
          <Gift className="h-12 w-12 text-white/80" />
        </div>
        <div className="mt-6">
          <div className="mb-1.5 flex justify-between text-sm text-white/90">
            <span>Silver</span>
            <span>{NEXT_TIER - POINTS} pts to Gold</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/25">
            <div
              className="h-full rounded-full bg-white"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Ways to earn */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
          <h2 className="font-serif text-xl font-semibold">Ways to earn</h2>
          <ul className="mt-4 space-y-3">
            {earnWays.map((w) => (
              <li key={w.label} className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-rosegold-dark">
                  <w.icon className="h-4 w-4" />
                </span>
                <span className="text-sm">{w.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
          <h2 className="font-serif text-xl font-semibold">Redeem rewards</h2>
          <ul className="mt-4 space-y-3">
            {rewards.map((r) => {
              const canRedeem = POINTS >= r.points;
              return (
                <li
                  key={r.points}
                  className="flex items-center justify-between gap-3 rounded-xl border border-border p-3"
                >
                  <div>
                    <p className="text-sm font-medium">{r.label}</p>
                    <Badge variant="gold" className="mt-1">
                      {r.points} pts
                    </Badge>
                  </div>
                  <Button size="sm" variant={canRedeem ? "default" : "outline"} disabled={!canRedeem}>
                    {canRedeem ? "Redeem" : "Locked"}
                  </Button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
