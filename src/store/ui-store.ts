"use client";

import { create } from "zustand";

interface UIState {
  quickViewSlug: string | null;
  openQuickView: (slug: string) => void;
  closeQuickView: () => void;

  cartDrawerOpen: boolean;
  setCartDrawer: (open: boolean) => void;

  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  quickViewSlug: null,
  openQuickView: (slug) => set({ quickViewSlug: slug }),
  closeQuickView: () => set({ quickViewSlug: null }),

  cartDrawerOpen: false,
  setCartDrawer: (open) => set({ cartDrawerOpen: open }),

  searchOpen: false,
  setSearchOpen: (open) => set({ searchOpen: open }),
}));
