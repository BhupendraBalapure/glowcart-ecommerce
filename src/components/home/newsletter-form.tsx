"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }
    setDone(true);
    toast.success("You're on the GlowList!", {
      description: "Check your inbox for a 10% welcome code.",
    });
  }

  if (done) {
    return (
      <div className="flex items-center gap-2 rounded-full bg-secondary px-4 py-3 text-sm font-medium text-rosegold-dark">
        <Check className="h-4 w-4" /> Subscribed — welcome to GlowCart!
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="flex-1"
        aria-label="Email address"
      />
      <Button type="submit">Subscribe</Button>
    </form>
  );
}
