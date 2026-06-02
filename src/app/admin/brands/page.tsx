"use client";

import { useState } from "react";
import { Pencil, Plus, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { brands as seed } from "@/data/brands";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  featured: boolean;
}

export default function AdminBrandsPage() {
  const [rows, setRows] = useState<Row[]>(
    seed.map((b) => ({ id: b.id, name: b.name, slug: b.slug, featured: !!b.featured }))
  );
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const count = (n: string) => products.filter((p) => p.brand === n).length;

  function add() {
    if (!name) return toast.error("Name is required");
    setRows((l) => [
      ...l,
      { id: `b-${Date.now()}`, name, slug: name.toLowerCase().replace(/\s+/g, "-"), featured: false },
    ]);
    toast.success("Brand added");
    setName("");
    setOpen(false);
  }

  return (
    <div>
      <AdminPageHeader title="Brands" description={`${rows.length} brands`}>
        <Button onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4" /> Add brand
        </Button>
      </AdminPageHeader>

      <div className="rounded-2xl border border-border bg-white shadow-soft">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Brand</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((b) => (
              <TableRow key={b.id}>
                <TableCell className="font-medium">{b.name}</TableCell>
                <TableCell>{count(b.name)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={b.featured}
                      onCheckedChange={(v) =>
                        setRows((l) => l.map((r) => (r.id === b.id ? { ...r, featured: v } : r)))
                      }
                    />
                    {b.featured && <Badge variant="gold">Featured</Badge>}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => { setRows((l) => l.filter((r) => r.id !== b.id)); toast("Brand deleted"); }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New brand</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label>Brand name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <Button onClick={add} className="w-full">Add brand</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
