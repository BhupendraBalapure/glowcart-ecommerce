"use client";

import { useEffect } from "react";

import { useRecentlyViewedStore } from "@/store/recently-viewed-store";

export function TrackRecentlyViewed({ slug }: { slug: string }) {
  const add = useRecentlyViewedStore((s) => s.add);
  useEffect(() => {
    add(slug);
  }, [slug, add]);
  return null;
}
