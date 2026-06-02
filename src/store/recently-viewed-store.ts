"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

const CAP = 8;

interface RecentlyViewedState {
  slugs: string[];
  add: (slug: string) => void;
  clear: () => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set) => ({
      slugs: [],
      add: (slug) =>
        set((state) => ({
          slugs: [slug, ...state.slugs.filter((s) => s !== slug)].slice(0, CAP),
        })),
      clear: () => set({ slugs: [] }),
    }),
    { name: "glowcart-recently-viewed" }
  )
);
