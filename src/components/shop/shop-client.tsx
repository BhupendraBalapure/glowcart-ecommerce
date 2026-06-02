"use client";

import { useMemo, useState } from "react";
import { LayoutGrid, Search, SlidersHorizontal, X } from "lucide-react";

import { products as allProducts } from "@/data/products";
import { brands } from "@/data/brands";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product/product-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Stagger, StaggerItem } from "@/components/shared/reveal";
import {
  FiltersPanel,
  PRICE_BOUNDS,
  type Filters,
} from "./filters-panel";

const brandSlugByName = new Map(brands.map((b) => [b.name, b.slug]));

const SORTS = [
  { value: "featured", label: "Featured" },
  { value: "popular", label: "Most popular" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top rated" },
  { value: "newest", label: "Newest" },
];

export interface ShopInitial {
  categories?: string[];
  brands?: string[];
  tag?: string;
  sort?: string;
  query?: string;
}

export function ShopClient({ initial }: { initial: ShopInitial }) {
  const [query, setQuery] = useState(initial.query ?? "");
  const [sort, setSort] = useState(initial.sort ?? "featured");
  const [filters, setFilters] = useState<Filters>({
    categories: initial.categories ?? [],
    brands: initial.brands ?? [],
    skinTypes: [],
    price: PRICE_BOUNDS,
    minRating: 0,
  });

  const reset = () =>
    setFilters({
      categories: [],
      brands: [],
      skinTypes: [],
      price: PRICE_BOUNDS,
      minRating: 0,
    });

  const results = useMemo(() => {
    let list = [...allProducts];
    const q = query.trim().toLowerCase();

    if (initial.tag) list = list.filter((p) => p.tags.includes(initial.tag as never));
    if (q)
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q)
      );
    if (filters.categories.length)
      list = list.filter((p) => filters.categories.includes(p.category));
    if (filters.brands.length)
      list = list.filter((p) =>
        filters.brands.includes(brandSlugByName.get(p.brand) ?? "")
      );
    if (filters.skinTypes.length)
      list = list.filter((p) =>
        filters.skinTypes.some((s) => p.skinTypes.includes(s as never))
      );
    list = list.filter(
      (p) => p.price >= filters.price[0] && p.price <= filters.price[1]
    );
    if (filters.minRating)
      list = list.filter((p) => p.rating >= filters.minRating);

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
        list.sort((a, b) => b.ratingCount - a.ratingCount);
        break;
      case "newest":
        list.sort(
          (a, b) =>
            Number(b.tags.includes("new")) - Number(a.tags.includes("new"))
        );
        break;
    }
    return list;
  }, [query, sort, filters, initial.tag]);

  const activeCount =
    filters.categories.length +
    filters.brands.length +
    filters.skinTypes.length +
    (filters.minRating ? 1 : 0) +
    (filters.price[0] !== PRICE_BOUNDS[0] || filters.price[1] !== PRICE_BOUNDS[1]
      ? 1
      : 0);

  return (
    <div className="container py-8">
      {/* Toolbar */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products…"
            className="pl-9"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden text-sm text-muted-foreground sm:inline">
            {results.length} products
          </span>

          {/* Mobile filters */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="lg:hidden">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeCount > 0 && (
                  <Badge className="ml-1 h-5 px-1.5">{activeCount}</Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[320px] overflow-y-auto">
              <FiltersPanel
                filters={filters}
                setFilters={setFilters}
                onReset={reset}
              />
            </SheetContent>
          </Sheet>

          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-[180px]">
              <LayoutGrid className="mr-1 h-4 w-4 text-muted-foreground" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORTS.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24">
            <FiltersPanel
              filters={filters}
              setFilters={setFilters}
              onReset={reset}
            />
          </div>
        </aside>

        {/* Grid */}
        <div className="flex-1">
          {results.length === 0 ? (
            <EmptyState
              icon={X}
              title="No products match your filters"
              description="Try adjusting or resetting your filters to see more."
              actionLabel="Reset filters"
              actionHref="/shop"
            />
          ) : (
            <Stagger
              key={results.map((r) => r.id).join("-")}
              className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3"
            >
              {results.map((p) => (
                <StaggerItem key={p.id}>
                  <ProductCard product={p} />
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </div>
      </div>
    </div>
  );
}
