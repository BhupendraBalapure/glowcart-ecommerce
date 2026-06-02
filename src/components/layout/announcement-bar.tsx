"use client";

import { Sparkles } from "lucide-react";

const messages = [
  "✨ Free shipping on orders over ₹999",
  "🎁 New arrivals — up to 20% off this week",
  "💎 Earn GlowPoints on every order",
  "🚚 Easy 15-day returns on all products",
];

export function AnnouncementBar() {
  return (
    <div className="overflow-hidden bg-ink text-white">
      <div className="flex w-max animate-marquee items-center gap-12 whitespace-nowrap py-2 text-xs font-medium tracking-wide">
        {[...messages, ...messages, ...messages].map((m, i) => (
          <span key={i} className="flex items-center gap-2">
            <Sparkles className="h-3 w-3 text-pink" />
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}
