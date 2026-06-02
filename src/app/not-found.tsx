import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center glow-gradient px-6 text-center">
      <span className="font-serif text-7xl font-semibold rose-gradient-text">
        404
      </span>
      <h1 className="mt-4 font-serif text-3xl font-semibold">
        This page went off to glow up
      </h1>
      <p className="mt-2 max-w-sm text-muted-foreground">
        We couldn&apos;t find the page you were looking for. Let&apos;s get you
        back to the good stuff.
      </p>
      <div className="mt-6 flex gap-3">
        <Button asChild>
          <Link href="/">Back home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/shop">Continue shopping</Link>
        </Button>
      </div>
    </div>
  );
}
