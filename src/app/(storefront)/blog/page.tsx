import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { blogPosts } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Stagger, StaggerItem } from "@/components/shared/reveal";

export const metadata: Metadata = {
  title: "The Glow Journal",
  description: "Beauty tips, rituals and guides from the GlowCart experts.",
};

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;
  return (
    <div className="container py-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
      <h1 className="mt-3 font-serif text-4xl font-semibold">The Glow Journal</h1>
      <p className="mt-2 max-w-xl text-muted-foreground">
        Expert beauty advice, routines and the stories behind our favourite
        formulas.
      </p>

      {featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="group mt-8 grid overflow-hidden rounded-3xl border border-border bg-white md:grid-cols-2"
        >
          <div className="relative aspect-[16/10] md:aspect-auto">
            <Image
              src={featured.cover}
              alt={featured.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-center p-8">
            <Badge variant="soft" className="w-fit">
              {featured.category}
            </Badge>
            <h2 className="mt-3 font-serif text-2xl font-semibold leading-snug group-hover:text-primary">
              {featured.title}
            </h2>
            <p className="mt-2 text-muted-foreground">{featured.excerpt}</p>
            <p className="mt-4 text-sm text-muted-foreground">
              {featured.author} · {formatDate(featured.date)} · {featured.readTime}
            </p>
          </div>
        </Link>
      )}

      <Stagger className="mt-10 grid gap-6 md:grid-cols-3">
        {rest.map((post) => (
          <StaggerItem key={post.id}>
            <Link href={`/blog/${post.slug}`} className="group block">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                <Image
                  src={post.cover}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <Badge variant="soft" className="absolute left-3 top-3">
                  {post.category}
                </Badge>
              </div>
              <h3 className="mt-3 font-serif text-lg font-semibold group-hover:text-primary">
                {post.title}
              </h3>
              <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                {post.excerpt}
              </p>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
