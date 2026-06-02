import type { Brand } from "@/types";

export const brands: Brand[] = [
  { id: "brand-luminé", name: "Luminé", slug: "lumine", featured: true },
  { id: "brand-velvet-rose", name: "Velvet Rose", slug: "velvet-rose", featured: true },
  { id: "brand-aurelia", name: "Aurelia", slug: "aurelia", featured: true },
  { id: "brand-soleil", name: "Soleil", slug: "soleil", featured: true },
  { id: "brand-petale", name: "Pétale", slug: "petale", featured: true },
  { id: "brand-noir-co", name: "Noir & Co.", slug: "noir-co", featured: true },
  { id: "brand-glasshouse", name: "Glasshouse", slug: "glasshouse" },
  { id: "brand-mirae", name: "Mirae", slug: "mirae" },
];

export function getBrand(slug: string) {
  return brands.find((b) => b.slug === slug);
}
