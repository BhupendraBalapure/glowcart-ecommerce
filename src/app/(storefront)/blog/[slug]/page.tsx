import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { blogPosts, getPost } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { NewsletterForm } from "@/components/home/newsletter-form";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="container max-w-3xl py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />
      <Badge variant="soft" className="mt-4">
        {post.category}
      </Badge>
      <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight">
        {post.title}
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        {post.author} · {formatDate(post.date)} · {post.readTime}
      </p>

      <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-3xl">
        <Image
          src={post.cover}
          alt={post.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
        />
      </div>

      <div className="mt-8 space-y-4 leading-relaxed text-foreground/90">
        <p className="text-lg">{post.excerpt}</p>
        <p>
          At GlowCart, we believe beauty should feel effortless. In this guide
          we break down a simple, repeatable routine that works for real skin
          and real schedules — no 15-step regimen required.
        </p>
        <h2 className="font-serif text-2xl font-semibold">Start with clean skin</h2>
        <p>
          A gentle, pH-balanced cleanser sets the foundation for everything that
          follows. Massage for 60 seconds, rinse with lukewarm water and pat dry.
        </p>
        <h2 className="font-serif text-2xl font-semibold">Layer thin to thick</h2>
        <p>
          Apply your lightest products first — essences and serums — then seal
          everything in with a moisturiser. Finish your morning routine with a
          broad-spectrum SPF, every single day.
        </p>
        <p>
          Consistency beats intensity. Give any new product four to six weeks
          before judging results, and introduce actives slowly.
        </p>
      </div>

      <div className="mt-12 rounded-3xl bg-secondary/40 p-8 text-center">
        <h3 className="font-serif text-xl font-semibold">Enjoyed this read?</h3>
        <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
          Get our best beauty tips and early access to new launches.
        </p>
        <div className="mx-auto mt-4 max-w-md">
          <NewsletterForm />
        </div>
      </div>
    </article>
  );
}
