import type { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    slug: "the-perfect-glass-skin-routine",
    title: "The Perfect Glass Skin Routine in 5 Steps",
    excerpt:
      "Achieve that lit-from-within, dewy glass-skin finish with our dermatologist-approved layering method.",
    cover:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=80",
    category: "Skincare",
    readTime: "6 min read",
    date: "2026-05-18",
    author: "Dr. Aisha Verma",
  },
  {
    id: "b2",
    slug: "find-your-signature-scent",
    title: "How to Find Your Signature Scent",
    excerpt:
      "From fragrance families to longevity tips — a simple guide to choosing a perfume that feels like you.",
    cover:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80",
    category: "Fragrance",
    readTime: "4 min read",
    date: "2026-05-09",
    author: "Naina Kapoor",
  },
  {
    id: "b3",
    slug: "everyday-no-makeup-makeup",
    title: "The Everyday 'No-Makeup' Makeup Look",
    excerpt:
      "Five products and ten minutes for a fresh, your-skin-but-better look that lasts all day.",
    cover:
      "https://images.unsplash.com/photo-1583241801409-9e0734bcc9e4?auto=format&fit=crop&w=1000&q=80",
    category: "Makeup",
    readTime: "5 min read",
    date: "2026-04-27",
    author: "Riya Sethi",
  },
];

export function getPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
