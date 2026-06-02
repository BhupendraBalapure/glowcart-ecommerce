"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  Sparkles,
  User,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { categories } from "@/data/categories";
import { brands } from "@/data/brands";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { useUIStore } from "@/store/ui-store";
import { useMounted } from "@/hooks/use-mounted";
import { Logo } from "./logo";
import { SearchOverlay } from "./search-overlay";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Bestsellers", href: "/shop?sort=popular" },
  { label: "New", href: "/shop?filter=new" },
  { label: "Blog", href: "/blog" },
];

function CountBadge({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
      {count}
    </span>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const mounted = useMounted();

  const cartCount = useCartStore((s) => s.count());
  const wishCount = useWishlistStore((s) => s.slugs.length);
  const setSearchOpen = useUIStore((s) => s.setSearchOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-all duration-300",
        scrolled
          ? "border-border bg-white/85 backdrop-blur-md shadow-soft"
          : "border-transparent bg-white"
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Mobile menu */}
        <div className="flex items-center gap-2 lg:hidden">
          <MobileMenu />
        </div>

        <Logo className="lg:mr-4" />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          <div
            onMouseEnter={() => setMegaOpen(true)}
            onMouseLeave={() => setMegaOpen(false)}
            className="relative"
          >
            <button className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary">
              Categories
            </button>
            {megaOpen && <MegaMenu />}
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
                pathname === link.href
                  ? "text-primary"
                  : "text-foreground/80"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/quiz"
            className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            Beauty Quiz
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Account">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuLabel>My GlowCart</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/login">Sign in</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/register">Create account</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/orders">My orders</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/admin">Admin</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            aria-label="Wishlist"
            asChild
            className="relative"
          >
            <Link href="/wishlist">
              <Heart className="h-5 w-5" />
              {mounted && <CountBadge count={wishCount} />}
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            aria-label="Cart"
            asChild
            className="relative"
          >
            <Link href="/cart">
              <ShoppingBag className="h-5 w-5" />
              {mounted && <CountBadge count={cartCount} />}
            </Link>
          </Button>
        </div>
      </div>
      <SearchOverlay />
    </header>
  );
}

function MegaMenu() {
  return (
    <div className="absolute left-1/2 top-full z-50 w-[680px] -translate-x-1/2 pt-3">
      <div className="grid grid-cols-3 gap-3 rounded-3xl border border-border bg-white p-4 shadow-soft-lg">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/category/${cat.slug}`}
            className="group/item relative overflow-hidden rounded-2xl"
          >
            <div className="relative aspect-[3/2]">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="220px"
                className="object-cover transition-transform duration-500 group-hover/item:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
              <div className="absolute bottom-2 left-3">
                <p className="font-serif text-sm font-semibold text-white">
                  {cat.name}
                </p>
                <p className="text-[11px] text-white/80">{cat.tagline}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function MobileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] overflow-y-auto p-0">
        <div className="border-b border-border p-5">
          <Logo />
        </div>
        <nav className="flex flex-col p-3">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-sm font-medium hover:bg-muted"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/quiz"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-medium hover:bg-muted"
          >
            <Sparkles className="h-4 w-4 text-primary" /> Beauty Quiz
          </Link>
        </nav>
        <div className="px-5 pb-3 pt-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Categories
        </div>
        <nav className="grid grid-cols-2 gap-2 px-3 pb-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              onClick={() => setOpen(false)}
              className="rounded-xl bg-muted/60 px-3 py-3 text-sm font-medium hover:bg-secondary"
            >
              {cat.name}
            </Link>
          ))}
        </nav>
        <div className="border-t border-border p-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Top Brands
          </p>
          <div className="flex flex-wrap gap-2">
            {brands.slice(0, 6).map((b) => (
              <Link
                key={b.id}
                href={`/shop?brand=${b.slug}`}
                onClick={() => setOpen(false)}
                className="rounded-full border border-border px-3 py-1 text-xs"
              >
                {b.name}
              </Link>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
