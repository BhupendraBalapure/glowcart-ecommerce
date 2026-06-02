export type SkinType =
  | "All"
  | "Oily"
  | "Dry"
  | "Combination"
  | "Sensitive"
  | "Normal";

export type CategorySlug =
  | "makeup"
  | "skincare"
  | "haircare"
  | "fragrances"
  | "bath-body"
  | "beauty-tools";

export interface Category {
  id: string;
  name: string;
  slug: CategorySlug;
  tagline: string;
  image: string;
  icon: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  featured?: boolean;
}

export interface ProductReview {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  images?: string[];
  verified?: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: CategorySlug;
  price: number;
  compareAtPrice?: number;
  rating: number;
  ratingCount: number;
  stock: number;
  shortDescription: string;
  description: string;
  images: string[];
  ingredients: string;
  benefits: string[];
  howToUse: string;
  skinTypes: SkinType[];
  shades?: { name: string; hex: string }[];
  tags: ("bestseller" | "new" | "trending" | "limited")[];
  reviews: ProductReview[];
  frequentlyBoughtWith?: string[]; // product slugs
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  quote: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
}
