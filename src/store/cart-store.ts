"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartLine {
  id: string; // unique line id (slug + shade)
  slug: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  shade?: string;
  quantity: number;
}

export interface AppliedCoupon {
  code: string;
  type: "percent" | "flat";
  value: number;
}

const COUPONS: Record<string, AppliedCoupon> = {
  GLOW10: { code: "GLOW10", type: "percent", value: 10 },
  GLOW20: { code: "GLOW20", type: "percent", value: 20 },
  WELCOME200: { code: "WELCOME200", type: "flat", value: 200 },
};

interface CartState {
  items: CartLine[];
  savedForLater: CartLine[];
  coupon: AppliedCoupon | null;
  addItem: (line: Omit<CartLine, "quantity" | "id">, qty?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  saveForLater: (id: string) => void;
  moveToCart: (id: string) => void;
  applyCoupon: (code: string) => { ok: boolean; message: string };
  removeCoupon: () => void;
  clear: () => void;
  // selectors
  count: () => number;
  subtotal: () => number;
  discount: () => number;
  shipping: () => number;
  total: () => number;
}

const lineId = (slug: string, shade?: string) =>
  shade ? `${slug}__${shade}` : slug;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      savedForLater: [],
      coupon: null,

      addItem: (line, qty = 1) =>
        set((state) => {
          const id = lineId(line.slug, line.shade);
          const existing = state.items.find((i) => i.id === id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === id ? { ...i, quantity: i.quantity + qty } : i
              ),
            };
          }
          return { items: [...state.items, { ...line, id, quantity: qty }] };
        }),

      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      updateQuantity: (id, qty) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.id === id ? { ...i, quantity: Math.max(1, qty) } : i))
            .filter((i) => i.quantity > 0),
        })),

      saveForLater: (id) =>
        set((state) => {
          const item = state.items.find((i) => i.id === id);
          if (!item) return state;
          return {
            items: state.items.filter((i) => i.id !== id),
            savedForLater: [...state.savedForLater, item],
          };
        }),

      moveToCart: (id) =>
        set((state) => {
          const item = state.savedForLater.find((i) => i.id === id);
          if (!item) return state;
          return {
            savedForLater: state.savedForLater.filter((i) => i.id !== id),
            items: [...state.items, item],
          };
        }),

      applyCoupon: (code) => {
        const found = COUPONS[code.trim().toUpperCase()];
        if (!found) return { ok: false, message: "Invalid coupon code" };
        set({ coupon: found });
        return { ok: true, message: `Coupon ${found.code} applied!` };
      },

      removeCoupon: () => set({ coupon: null }),

      clear: () => set({ items: [], coupon: null }),

      count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      subtotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

      discount: () => {
        const { coupon } = get();
        const sub = get().subtotal();
        if (!coupon) return 0;
        return coupon.type === "percent"
          ? Math.round((sub * coupon.value) / 100)
          : Math.min(coupon.value, sub);
      },

      shipping: () => {
        const sub = get().subtotal();
        if (sub === 0) return 0;
        return sub >= 999 ? 0 : 99;
      },

      total: () => {
        const sub = get().subtotal();
        return Math.max(0, sub - get().discount()) + get().shipping();
      },
    }),
    { name: "glowcart-cart" }
  )
);
