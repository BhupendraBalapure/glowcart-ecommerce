import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2", className)}
      aria-label="GlowCart home"
    >
      <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground shadow-soft">
        <span className="font-serif text-lg font-semibold">G</span>
      </span>
      <span className="font-serif text-xl font-semibold tracking-tight text-foreground">
        Glow<span className="text-primary">Cart</span>
      </span>
    </Link>
  );
}
