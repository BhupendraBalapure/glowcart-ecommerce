"use client";

import { useState } from "react";
import { MapPin, Pencil, Plus, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { mockAddresses, type MockAddress } from "@/data/mock-account";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const blank: MockAddress = {
  id: "",
  fullName: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postalCode: "",
  isDefault: false,
};

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<MockAddress[]>(mockAddresses);
  const [editing, setEditing] = useState<MockAddress | null>(null);
  const [open, setOpen] = useState(false);

  function save(addr: MockAddress) {
    if (addr.id) {
      setAddresses((list) => list.map((a) => (a.id === addr.id ? addr : a)));
      toast.success("Address updated");
    } else {
      setAddresses((list) => [...list, { ...addr, id: `addr-${Date.now()}` }]);
      toast.success("Address added");
    }
    setOpen(false);
    setEditing(null);
  }

  function remove(id: string) {
    setAddresses((list) => list.filter((a) => a.id !== id));
    toast("Address removed");
  }

  function makeDefault(id: string) {
    setAddresses((list) =>
      list.map((a) => ({ ...a, isDefault: a.id === id }))
    );
    toast.success("Default address updated");
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-semibold">Addresses</h1>
          <p className="mt-1 text-muted-foreground">
            Manage your saved delivery addresses.
          </p>
        </div>
        <Button
          onClick={() => {
            setEditing({ ...blank });
            setOpen(true);
          }}
        >
          <Plus className="h-4 w-4" /> Add new
        </Button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {addresses.map((a) => (
          <div
            key={a.id}
            className="rounded-2xl border border-border bg-white p-5 shadow-soft"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <p className="font-medium">{a.fullName}</p>
              </div>
              {a.isDefault && <Badge variant="soft">Default</Badge>}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {a.line1}
              {a.line2 ? `, ${a.line2}` : ""}, {a.city}, {a.state} {a.postalCode}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{a.phone}</p>

            <div className="mt-4 flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setEditing(a);
                  setOpen(true);
                }}
              >
                <Pencil className="h-3.5 w-3.5" /> Edit
              </Button>
              {!a.isDefault && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => makeDefault(a.id)}
                >
                  <Star className="h-3.5 w-3.5" /> Set default
                </Button>
              )}
              <Button
                size="sm"
                variant="ghost"
                className="ml-auto text-destructive hover:text-destructive"
                onClick={() => remove(a.id)}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <AddressDialog
        open={open}
        onOpenChange={setOpen}
        address={editing}
        onSave={save}
      />
    </div>
  );
}

function AddressDialog({
  open,
  onOpenChange,
  address,
  onSave,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  address: MockAddress | null;
  onSave: (a: MockAddress) => void;
}) {
  const [form, setForm] = useState<MockAddress>(address ?? blank);

  // keep form in sync when a different address is opened
  if (address && form.id !== address.id && open) {
    setForm(address);
  }

  const set = (k: keyof MockAddress) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{form.id ? "Edit address" : "Add address"}</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(form);
          }}
          className="space-y-3"
        >
          <div className="space-y-1.5">
            <Label htmlFor="a-name">Full name</Label>
            <Input id="a-name" value={form.fullName} onChange={set("fullName")} required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="a-phone">Phone</Label>
            <Input id="a-phone" value={form.phone} onChange={set("phone")} required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="a-line1">Address</Label>
            <Input id="a-line1" value={form.line1} onChange={set("line1")} required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="a-city">City</Label>
              <Input id="a-city" value={form.city} onChange={set("city")} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="a-state">State</Label>
              <Input id="a-state" value={form.state} onChange={set("state")} required />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="a-pin">PIN code</Label>
            <Input id="a-pin" value={form.postalCode} onChange={set("postalCode")} required />
          </div>
          <Button type="submit" className="w-full">
            Save address
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
