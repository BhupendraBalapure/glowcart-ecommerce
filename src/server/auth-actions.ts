"use server";

import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validators";

export type ActionResult = { ok: boolean; error?: string };

export async function registerUser(
  values: unknown
): Promise<ActionResult> {
  const parsed = registerSchema.safeParse(values);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const { name, email, password } = parsed.data;

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return { ok: false, error: "An account with this email already exists." };
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { name, email, passwordHash, loyaltyPoints: 100 },
    });

    return { ok: true };
  } catch (err) {
    console.error("registerUser error", err);
    return {
      ok: false,
      error:
        "Could not create account. Make sure the database is configured (DATABASE_URL).",
    };
  }
}
