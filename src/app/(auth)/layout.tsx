import Image from "next/image";
import Link from "next/link";

import { Logo } from "@/components/layout/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Visual */}
      <div className="relative hidden lg:block">
        <Image
          src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=80"
          alt="GlowCart beauty"
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />
        <div className="absolute bottom-12 left-12 max-w-sm text-white">
          <h2 className="font-serif text-3xl font-semibold leading-tight">
            Your glow, beautifully curated.
          </h2>
          <p className="mt-3 text-white/80">
            Sign in to track orders, save favourites and earn GlowPoints on
            every purchase.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="flex flex-col">
        <header className="flex items-center justify-between p-6">
          <Logo />
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-primary"
          >
            ← Back to store
          </Link>
        </header>
        <div className="flex flex-1 items-center justify-center px-6 pb-12">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </div>
  );
}
