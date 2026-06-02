"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { registerUser } from "@/server/auth-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await registerUser(form);
    if (!res.ok) {
      setLoading(false);
      toast.error(res.error ?? "Something went wrong");
      return;
    }
    // Auto sign-in after successful registration
    await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });
    toast.success("Account created — welcome to GlowCart!");
    window.location.href = "/dashboard";
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="name">Full name</Label>
        <Input id="name" value={form.name} onChange={update("name")} placeholder="Ananya Rao" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={form.email} onChange={update("email")} placeholder="you@example.com" required />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={form.password} onChange={update("password")} placeholder="••••••••" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm</Label>
          <Input id="confirmPassword" type="password" value={form.confirmPassword} onChange={update("confirmPassword")} placeholder="••••••••" required />
        </div>
      </div>

      <Button type="submit" className="w-full" size="lg" disabled={loading}>
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        Create account
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
