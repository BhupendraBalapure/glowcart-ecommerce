"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

const MAX = 4;

interface CompareState {
  slugs: string[];
  toggle: (slug: string) => { ok: boolean; message?: string };
  has: (slug: string) => boolean;
  remove: (slug: string) => void;
  clear: () => void;
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      slugs: [],
      toggle: (slug) => {
        const { slugs } = get();
        if (slugs.includes(slug)) {
          set({ slugs: slugs.filter((s) => s !== slug) });
          return { ok: true };
        }
        if (slugs.length >= MAX) {
          return { ok: false, message: `You can compare up to ${MAX} products` };
        }
        set({ slugs: [...slugs, slug] });
        return { ok: true };
      },
      has: (slug) => get().slugs.includes(slug),
      remove: (slug) =>
        set((state) => ({ slugs: state.slugs.filter((s) => s !== slug) })),
      clear: () => set({ slugs: [] }),
    }),
    { name: "glowcart-compare" }
  )
);
