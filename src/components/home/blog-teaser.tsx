import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { blogPosts } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/shared/reveal";

export function BlogTeaser() {
  return (
    <section className="container py-16">
      <div className="mb-10 flex items-end justify-between">
        <Reveal>
          <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            The Glow Journal
          </span>
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Beauty tips & rituals
          </h2>
        </Reveal>
        <Link
          href="/blog"
          className="group inline-flex items-center gap-1 text-sm font-medium text-primary"
        >
          All articles
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {blogPosts.map((post, i) => (
          <Reveal key={post.id} delay={i * 0.1}>
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
              <div className="mt-4">
                <p className="text-xs text-muted-foreground">
                  {formatDate(post.date)} · {post.readTime}
                </p>
                <h3 className="mt-1.5 font-serif text-lg font-semibold leading-snug transition-colors group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
