import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { prisma } from "./prisma";
import { authConfig } from "./auth.config";
import { loginSchema } from "./validators";
import { isDatabaseConfigured, localUsers, type LocalUser } from "./local-users";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const email = parsed.data.email.toLowerCase();
        const { password } = parsed.data;

        let user: LocalUser | null = null;
        let dbAnswered = false;

        // 1) Try the database when a real connection string is configured.
        if (isDatabaseConfigured()) {
          try {
            const dbUser = await prisma.user.findUnique({ where: { email } });
            dbAnswered = true;
            if (dbUser) {
              user = {
                id: dbUser.id,
                name: dbUser.name ?? "",
                email: dbUser.email,
                passwordHash: dbUser.passwordHash,
                role: dbUser.role,
                image: dbUser.image,
              };
            }
          } catch (err) {
            console.error(
              "[auth] Database unreachable — falling back to built-in users:",
              (err as Error).message
            );
          }
        }

        // 2) Fall back to built-in admin/demo only when the DB isn't the
        //    source of truth (not configured, or unreachable).
        if (!user && !dbAnswered) {
          user = localUsers.find((u) => u.email === email) ?? null;
        }

        if (!user) return null;

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image,
        };
      },
    }),
  ],
});
