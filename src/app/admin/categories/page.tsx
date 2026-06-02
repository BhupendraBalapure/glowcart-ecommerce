"use client";

import { useState } from "react";
import Image from "next/image";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { categories as seed } from "@/data/categories";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  tagline: string;
  image: string;
}

const blank: Row = {
  id: "",
  name: "",
  slug: "",
  tagline: "",
  image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80",
};

export default function AdminCategoriesPage() {
  const [rows, setRows] = useState<Row[]>(
    seed.map((c) => ({ id: c.id, name: c.name, slug: c.slug, tagline: c.tagline, image: c.image }))
  );
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Row>(blank);

  const count = (slug: string) =>
    products.filter((p) => p.category === slug).length;

  function save() {
    if (!editing.name) return toast.error("Name is required");
    if (editing.id) {
      setRows((l) => l.map((r) => (r.id === editing.id ? editing : r)));
      toast.success("Category updated");
    } else {
      setRows((l) => [
        ...l,
        { ...editing, id: `cat-${Date.now()}`, slug: editing.name.toLowerCase().replace(/\s+/g, "-") },
      ]);
      toast.success("Category created");
    }
    setOpen(false);
  }

  return (
    <div>
      <AdminPageHeader title="Categories" description={`${rows.length} categories`}>
        <Button onClick={() => { setEditing({ ...blank }); setOpen(true); }}>
          <Plus className="h-4 w-4" /> Add category
        </Button>
      </AdminPageHeader>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map((c) => (
          <div key={c.id} className="overflow-hidden rounded-2xl border border-border bg-white shadow-soft">
            <div className="relative h-32">
              <Image src={c.image} alt={c.name} fill sizes="320px" className="object-cover" />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-semibold">{c.name}</h3>
                <span className="text-xs text-muted-foreground">{count(c.slug)} products</span>
              </div>
              <p className="text-sm text-muted-foreground">{c.tagline}</p>
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="outline" onClick={() => { setEditing(c); setOpen(true); }}>
                  <Pencil className="h-3.5 w-3.5" /> Edit
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-destructive hover:text-destructive"
                  onClick={() => { setRows((l) => l.filter((r) => r.id !== c.id)); toast("Category deleted"); }}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing.id ? "Edit category" : "New category"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label>Name</Label>
              <Input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Tagline</Label>
              <Input value={editing.tagline} onChange={(e) => setEditing({ ...editing, tagline: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Image URL</Label>
              <Input value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value })} />
            </div>
            <Button onClick={save} className="w-full">Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
