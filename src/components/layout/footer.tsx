import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

import { categories } from "@/data/categories";
import { Logo } from "./logo";
import { NewsletterForm } from "@/components/home/newsletter-form";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/shop" },
      { label: "Bestsellers", href: "/shop?sort=popular" },
      { label: "New Arrivals", href: "/shop?filter=new" },
      { label: "Offers", href: "/shop?filter=limited" },
      { label: "Gift Cards", href: "/shop" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Track Order", href: "/dashboard/orders" },
      { label: "Shipping & Returns", href: "/blog" },
      { label: "FAQs", href: "/blog" },
      { label: "Contact Us", href: "/blog" },
      { label: "Beauty Quiz", href: "/quiz" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About GlowCart", href: "/blog" },
      { label: "Sustainability", href: "/blog" },
      { label: "Careers", href: "/blog" },
      { label: "Press", href: "/blog" },
      { label: "Loyalty Rewards", href: "/dashboard/rewards" },
    ],
  },
];

const socials = [
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Facebook, href: "#", label: "Facebook" },
  { Icon: Twitter, href: "#", label: "Twitter" },
  { Icon: Youtube, href: "#", label: "Youtube" },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-beige">
      <div className="container py-14">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Luxury beauty, thoughtfully curated. Clean formulas, iconic
              brands and an effortless glow — delivered to your door.
            </p>
            <div className="mt-5 flex gap-2">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-border bg-white text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl bg-white p-6 shadow-soft sm:p-8">
          <div className="grid items-center gap-6 sm:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold">Join the GlowList</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Be first to shop new launches and get 10% off your first order.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container flex flex-col items-center justify-between gap-3 py-5 text-xs text-muted-foreground sm:flex-row">
          <p>© {2026} GlowCart. Crafted with love for beautiful skin.</p>
          <div className="flex flex-wrap items-center gap-4">
            {categories.slice(0, 4).map((c) => (
              <Link
                key={c.id}
                href={`/category/${c.slug}`}
                className="hover:text-primary"
              >
                {c.name}
              </Link>
            ))}
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
