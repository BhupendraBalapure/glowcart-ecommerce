"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { initials } from "@/lib/utils";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [form, setForm] = useState({
    name: session?.user?.name ?? "",
    email: session?.user?.email ?? "",
    phone: "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold">Profile</h1>
      <p className="mt-1 text-muted-foreground">
        Manage your personal information.
      </p>

      <div className="mt-6 rounded-2xl border border-border bg-white p-6 shadow-soft">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-lg">
              {initials(form.name || "GlowCart User")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-serif text-lg font-semibold">
              {form.name || "Your name"}
            </p>
            <p className="text-sm text-muted-foreground">
              {form.email || "your@email.com"}
            </p>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Profile saved");
          }}
          className="mt-6 grid max-w-xl gap-4 sm:grid-cols-2"
        >
          <div className="space-y-1.5">
            <Label htmlFor="p-name">Full name</Label>
            <Input id="p-name" value={form.name} onChange={set("name")} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="p-phone">Phone</Label>
            <Input id="p-phone" value={form.phone} onChange={set("phone")} placeholder="+91 ..." />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="p-email">Email</Label>
            <Input id="p-email" type="email" value={form.email} onChange={set("email")} />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit">Save changes</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
