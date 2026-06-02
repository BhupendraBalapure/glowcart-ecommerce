"use client";

import { useState } from "react";
import Image from "next/image";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { products as seedProducts } from "@/data/products";
import { categories } from "@/data/categories";
import { brands } from "@/data/brands";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AdminPageHeader } from "@/components/admin/admin-page-header";

interface Row {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  image: string;
}

const seed: Row[] = seedProducts.map((p) => ({
  id: p.id,
  name: p.name,
  slug: p.slug,
  brand: p.brand,
  category: p.category,
  price: p.price,
  compareAtPrice: p.compareAtPrice,
  stock: p.stock,
  image: p.images[0],
}));

const blank: Row = {
  id: "",
  name: "",
  slug: "",
  brand: brands[0].name,
  category: categories[0].slug,
  price: 0,
  stock: 0,
  image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80",
};

export default function AdminProductsPage() {
  const [rows, setRows] = useState<Row[]>(seed);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Row>(blank);

  const filtered = rows.filter(
    (r) =>
      r.name.toLowerCase().includes(query.toLowerCase()) ||
      r.brand.toLowerCase().includes(query.toLowerCase())
  );

  function save() {
    if (!editing.name || editing.price <= 0) {
      toast.error("Name and a valid price are required");
      return;
    }
    if (editing.id) {
      setRows((list) => list.map((r) => (r.id === editing.id ? editing : r)));
      toast.success("Product updated");
    } else {
      setRows((list) => [
        { ...editing, id: `p-${Date.now()}`, slug: editing.name.toLowerCase().replace(/\s+/g, "-") },
        ...list,
      ]);
      toast.success("Product created");
    }
    setOpen(false);
  }

  function remove(id: string) {
    setRows((list) => list.filter((r) => r.id !== id));
    toast("Product deleted");
  }

  return (
    <div>
      <AdminPageHeader title="Products" description={`${rows.length} products in catalogue`}>
        <Button
          onClick={() => {
            setEditing({ ...blank });
            setOpen(true);
          }}
        >
          <Plus className="h-4 w-4" /> Add product
        </Button>
      </AdminPageHeader>

      <div className="rounded-2xl border border-border bg-white shadow-soft">
        <div className="border-b border-border p-4">
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="pl-9"
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((r) => (
              <TableRow key={r.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-muted">
                      <Image src={r.image} alt={r.name} fill sizes="44px" className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{r.name}</p>
                      <p className="text-xs text-muted-foreground">{r.brand}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="capitalize">{r.category.replace("-", " ")}</TableCell>
                <TableCell>{formatPrice(r.price)}</TableCell>
                <TableCell>
                  <Badge variant={r.stock > 0 ? "success" : "destructive"}>
                    {r.stock > 0 ? `${r.stock} in stock` : "Out"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={() => {
                        setEditing(r);
                        setOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => remove(r.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing.id ? "Edit product" : "New product"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label>Name</Label>
              <Input
                value={editing.name}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Brand</Label>
                <Select
                  value={editing.brand}
                  onValueChange={(v) => setEditing({ ...editing, brand: v })}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {brands.map((b) => (
                      <SelectItem key={b.id} value={b.name}>{b.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Category</Label>
                <Select
                  value={editing.category}
                  onValueChange={(v) => setEditing({ ...editing, category: v })}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={c.slug}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label>Price ₹</Label>
                <Input
                  type="number"
                  value={editing.price}
                  onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Compare ₹</Label>
                <Input
                  type="number"
                  value={editing.compareAtPrice ?? ""}
                  onChange={(e) =>
                    setEditing({ ...editing, compareAtPrice: Number(e.target.value) || undefined })
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label>Stock</Label>
                <Input
                  type="number"
                  value={editing.stock}
                  onChange={(e) => setEditing({ ...editing, stock: Number(e.target.value) })}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Image URL</Label>
              <Input
                value={editing.image}
                onChange={(e) => setEditing({ ...editing, image: e.target.value })}
              />
            </div>
            <Button onClick={save} className="w-full">
              {editing.id ? "Save changes" : "Create product"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
