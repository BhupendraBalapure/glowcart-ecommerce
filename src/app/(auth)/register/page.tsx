import type { Metadata } from "next";

import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = { title: "Create account" };

export default function RegisterPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold">Create your account</h1>
      <p className="mt-2 text-muted-foreground">
        Join GlowCart and get 100 welcome GlowPoints + 10% off your first order.
      </p>
      <div className="mt-8">
        <RegisterForm />
      </div>
    </div>
  );
}
