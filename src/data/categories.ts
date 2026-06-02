import type { Category } from "@/types";

export const categories: Category[] = [
  {
    id: "cat-makeup",
    name: "Makeup",
    slug: "makeup",
    tagline: "Color that lasts all day",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80",
    icon: "Sparkles",
  },
  {
    id: "cat-skincare",
    name: "Skincare",
    slug: "skincare",
    tagline: "Glow from within",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80",
    icon: "Droplets",
  },
  {
    id: "cat-haircare",
    name: "Haircare",
    slug: "haircare",
    tagline: "Salon shine at home",
    image:
      "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=900&q=80",
    icon: "Wind",
  },
  {
    id: "cat-fragrances",
    name: "Fragrances",
    slug: "fragrances",
    tagline: "Signature scents",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80",
    icon: "Flower2",
  },
  {
    id: "cat-bath-body",
    name: "Bath & Body",
    slug: "bath-body",
    tagline: "Everyday rituals",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80",
    icon: "Bath",
  },
  {
    id: "cat-beauty-tools",
    name: "Beauty Tools",
    slug: "beauty-tools",
    tagline: "Pro-level essentials",
    image:
      "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?auto=format&fit=crop&w=900&q=80",
    icon: "Brush",
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
