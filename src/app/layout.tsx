import type { Metadata } from "next";

import { fontBody, fontDisplay } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/components/providers";

import "./globals.css";

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: "GlowCart — Premium Beauty & Cosmetics",
    template: "%s · GlowCart",
  },
  description:
    "GlowCart is a luxury beauty destination for makeup, skincare, haircare, fragrances and more. Clean formulas, iconic brands, effortless glow.",
  keywords: [
    "beauty",
    "cosmetics",
    "skincare",
    "makeup",
    "haircare",
    "fragrance",
    "luxury beauty",
  ],
  openGraph: {
    title: "GlowCart — Premium Beauty & Cosmetics",
    description:
      "A luxury beauty destination for makeup, skincare, haircare & fragrances.",
    url: appUrl,
    siteName: "GlowCart",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          fontBody.variable,
          fontDisplay.variable,
          "min-h-screen bg-background font-sans"
        )}
      >
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
