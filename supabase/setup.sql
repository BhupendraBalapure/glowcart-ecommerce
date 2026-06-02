-- ============================================================================
-- GlowCart — Supabase setup SQL
-- Run this in:  Supabase Dashboard → SQL Editor → New query → paste → Run
-- Creates the login "User" table (matches the app's Prisma model) + a username
-- column, and seeds an admin + demo account so you can log in immediately.
-- ============================================================================

-- 1) Role enum (USER / ADMIN) ------------------------------------------------
do $$
begin
  if not exists (select 1 from pg_type where typname = 'Role') then
    create type "Role" as enum ('USER', 'ADMIN');
  end if;
end $$;

-- 2) Users table ------------------------------------------------------------
create table if not exists "User" (
  "id"            text         primary key default gen_random_uuid()::text,
  "username"      text         unique,
  "name"          text,
  "email"         text         not null unique,
  "passwordHash"  text         not null,
  "role"          "Role"       not null default 'USER',
  "loyaltyPoints" integer      not null default 0,
  "image"         text,
  "createdAt"     timestamp(3) not null default current_timestamp,
  "updatedAt"     timestamp(3) not null default current_timestamp
);

-- 3) Seed accounts (passwords are bcrypt-hashed) ----------------------------
--    admin@glowcart.dev / Admin@12345   (role ADMIN)
--    demo@glowcart.dev  / Demo@12345    (role USER)
insert into "User" ("username", "name", "email", "passwordHash", "role", "loyaltyPoints")
values
  ('admin', 'GlowCart Admin', 'admin@glowcart.dev',
   '$2a$10$bo5WzGHfcWh/2GXavmsdjePilDa7i3BTIcKqRNVZBpD6cXFko7YTe', 'ADMIN', 5000),
  ('demo',  'Demo Customer',  'demo@glowcart.dev',
   '$2a$10$XMN0UiQgX286jiApk3BkT.8c.xoZViKYtAM6tbzzGQeMITf6r/qKK', 'USER', 320)
on conflict ("email") do nothing;

-- Done. Verify:
select "id", "username", "name", "email", "role", "loyaltyPoints" from "User";
