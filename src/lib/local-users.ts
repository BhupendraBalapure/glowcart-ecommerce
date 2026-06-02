/**
 * Built-in fallback users so login works even before a database is configured.
 * Used by `authorize()` ONLY when DATABASE_URL is not set (or unreachable).
 * Once a real DATABASE_URL is configured, the database is the source of truth.
 *
 * Passwords (bcrypt-hashed):
 *   admin@glowcart.dev / Admin@12345   (ADMIN)
 *   demo@glowcart.dev  / Demo@12345    (USER)
 */
export interface LocalUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: "USER" | "ADMIN";
  image: string | null;
}

export const localUsers: LocalUser[] = [
  {
    id: "local-admin",
    name: "GlowCart Admin",
    email: "admin@glowcart.dev",
    passwordHash:
      "$2a$10$bo5WzGHfcWh/2GXavmsdjePilDa7i3BTIcKqRNVZBpD6cXFko7YTe",
    role: "ADMIN",
    image: null,
  },
  {
    id: "local-demo",
    name: "Demo Customer",
    email: "demo@glowcart.dev",
    passwordHash:
      "$2a$10$XMN0UiQgX286jiApk3BkT.8c.xoZViKYtAM6tbzzGQeMITf6r/qKK",
    role: "USER",
    image: null,
  },
];

/** True when a real Postgres connection string is configured. */
export function isDatabaseConfigured() {
  const url = process.env.DATABASE_URL;
  return !!url && !url.includes("REPLACE_WITH");
}
