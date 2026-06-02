"use client";

import { Star } from "lucide-react";

import { categories } from "@/data/categories";
import { brands } from "@/data/brands";
import { cn, formatPrice } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

export interface Filters {
  categories: string[];
  brands: string[];
  skinTypes: string[];
  price: [number, number];
  minRating: number;
}

export const SKIN_TYPES = [
  "Oily",
  "Dry",
  "Combination",
  "Sensitive",
  "Normal",
];

export const PRICE_BOUNDS: [number, number] = [0, 5000];

function Group({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-border py-5">
      <h3 className="mb-3 text-sm font-semibold">{title}</h3>
      {children}
    </div>
  );
}

export function FiltersPanel({
  filters,
  setFilters,
  onReset,
}: {
  filters: Filters;
  setFilters: (f: Filters) => void;
  onReset: () => void;
}) {
  const toggle = (key: "categories" | "brands" | "skinTypes", value: string) => {
    const arr = filters[key];
    setFilters({
      ...filters,
      [key]: arr.includes(value)
        ? arr.filter((v) => v !== value)
        : [...arr, value],
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between pb-2">
        <h2 className="font-serif text-lg font-semibold">Filters</h2>
        <Button variant="ghost" size="sm" onClick={onReset}>
          Reset
        </Button>
      </div>

      <Group title="Category">
        <div className="space-y-2.5">
          {categories.map((c) => (
            <label key={c.id} className="flex cursor-pointer items-center gap-2.5">
              <Checkbox
                checked={filters.categories.includes(c.slug)}
                onCheckedChange={() => toggle("categories", c.slug)}
              />
              <span className="text-sm">{c.name}</span>
            </label>
          ))}
        </div>
      </Group>

      <Group title="Brand">
        <div className="space-y-2.5">
          {brands.map((b) => (
            <label key={b.id} className="flex cursor-pointer items-center gap-2.5">
              <Checkbox
                checked={filters.brands.includes(b.slug)}
                onCheckedChange={() => toggle("brands", b.slug)}
              />
              <span className="text-sm">{b.name}</span>
            </label>
          ))}
        </div>
      </Group>

      <Group title="Price">
        <Slider
          value={filters.price}
          min={PRICE_BOUNDS[0]}
          max={PRICE_BOUNDS[1]}
          step={100}
          onValueChange={(v) =>
            setFilters({ ...filters, price: [v[0], v[1]] as [number, number] })
          }
        />
        <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
          <span>{formatPrice(filters.price[0])}</span>
          <span>{formatPrice(filters.price[1])}</span>
        </div>
      </Group>

      <Group title="Rating">
        <div className="space-y-2">
          {[4, 3, 2].map((r) => (
            <button
              key={r}
              onClick={() =>
                setFilters({
                  ...filters,
                  minRating: filters.minRating === r ? 0 : r,
                })
              }
              className={cn(
                "flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors",
                filters.minRating === r ? "bg-secondary" : "hover:bg-muted"
              )}
            >
              <span className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-3.5 w-3.5",
                      i < r ? "fill-gold text-gold" : "fill-muted text-muted"
                    )}
                  />
                ))}
              </span>
              <span className="text-muted-foreground">& up</span>
            </button>
          ))}
        </div>
      </Group>

      <Group title="Skin Type">
        <div className="flex flex-wrap gap-2">
          {SKIN_TYPES.map((s) => (
            <button
              key={s}
              onClick={() => toggle("skinTypes", s)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs transition-colors",
                filters.skinTypes.includes(s)
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:border-primary"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </Group>
    </div>
  );
}
