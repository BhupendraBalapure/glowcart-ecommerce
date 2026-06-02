"use client";

import { useState } from "react";
import Image from "next/image";
import { ImagePlus, Star } from "lucide-react";
import { toast } from "sonner";

import type { Product, ProductReview } from "@/types";
import { cn, formatDate, initials } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Rating } from "@/components/shared/rating";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function Breakdown({ reviews }: { reviews: ProductReview[] }) {
  const counts = [5, 4, 3, 2, 1].map(
    (star) => reviews.filter((r) => Math.round(r.rating) === star).length
  );
  const total = reviews.length || 1;
  return (
    <div className="space-y-1.5">
      {[5, 4, 3, 2, 1].map((star, i) => (
        <div key={star} className="flex items-center gap-2 text-sm">
          <span className="flex w-10 items-center gap-0.5">
            {star}
            <Star className="h-3 w-3 fill-gold text-gold" />
          </span>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-gold"
              style={{ width: `${(counts[i] / total) * 100}%` }}
            />
          </div>
          <span className="w-8 text-right text-xs text-muted-foreground">
            {counts[i]}
          </span>
        </div>
      ))}
    </div>
  );
}

function ReviewForm({ onSubmit }: { onSubmit: (r: ProductReview) => void }) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (title.length < 2 || body.length < 5) {
      toast.error("Please add a title and a short review");
      return;
    }
    onSubmit({
      id: `local-${Date.now()}`,
      author: "You",
      rating,
      title,
      body,
      date: new Date().toISOString(),
      verified: true,
    });
    toast.success("Thanks for your review!");
    setOpen(false);
    setTitle("");
    setBody("");
    setRating(5);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Write a review</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share your experience</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <Label className="mb-1.5 block">Your rating</Label>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setRating(i + 1)}
                  aria-label={`${i + 1} stars`}
                >
                  <Star
                    className={cn(
                      "h-7 w-7 transition-colors",
                      i < rating ? "fill-gold text-gold" : "fill-muted text-muted"
                    )}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="rv-title">Title</Label>
            <Input
              id="rv-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Sum it up in a few words"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="rv-body">Review</Label>
            <Textarea
              id="rv-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="What did you love? How did it perform?"
            />
          </div>
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border py-4 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            onClick={() => toast("Photo upload is a demo in this build")}
          >
            <ImagePlus className="h-4 w-4" /> Add photos
          </button>
          <Button type="submit" className="w-full">
            Submit review
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function ProductReviews({ product }: { product: Product }) {
  const [reviews, setReviews] = useState<ProductReview[]>(product.reviews);

  return (
    <section id="reviews" className="border-t border-border py-12">
      <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
        {/* Summary */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <h2 className="font-serif text-2xl font-semibold">Customer reviews</h2>
          <div className="mt-4 flex items-end gap-3">
            <span className="text-5xl font-semibold">
              {product.rating.toFixed(1)}
            </span>
            <div className="pb-1">
              <Rating value={product.rating} />
              <p className="mt-1 text-sm text-muted-foreground">
                {product.ratingCount.toLocaleString()} reviews
              </p>
            </div>
          </div>
          <div className="mt-5">
            <Breakdown reviews={reviews} />
          </div>
          <div className="mt-6">
            <ReviewForm onSubmit={(r) => setReviews((prev) => [r, ...prev])} />
          </div>
        </div>

        {/* List */}
        <div className="space-y-6">
          {reviews.map((r) => (
            <article
              key={r.id}
              className="rounded-2xl border border-border bg-white p-5"
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>{initials(r.author)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold">{r.author}</p>
                  <div className="flex items-center gap-2">
                    <Rating value={r.rating} />
                    {r.verified && (
                      <span className="text-xs font-medium text-emerald-600">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                </div>
                <span className="ml-auto text-xs text-muted-foreground">
                  {formatDate(r.date)}
                </span>
              </div>
              <h3 className="mt-3 font-medium">{r.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{r.body}</p>
              {r.images && r.images.length > 0 && (
                <div className="mt-3 flex gap-2">
                  {r.images.map((img, i) => (
                    <div
                      key={i}
                      className="relative h-20 w-20 overflow-hidden rounded-lg"
                    >
                      <Image
                        src={img}
                        alt="Review"
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
