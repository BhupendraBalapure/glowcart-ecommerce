# GlowCart — Premium Beauty & Cosmetics eCommerce ✨

A luxurious, conversion-focused beauty store built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, **shadcn-style UI**, **Framer Motion**, **Zustand**, **Prisma + PostgreSQL** and **Auth.js v5**.

![Palette](https://img.shields.io/badge/Soft%20Pink-%23FADADD-FADADD) ![Palette](https://img.shields.io/badge/Rose%20Gold-%23B76E79-B76E79) ![Palette](https://img.shields.io/badge/Beige-%23F8F5F2-F8F5F2)

---

## ✨ Features

**Storefront**
- Animated **Home** — hero, categories, bestsellers, new launches, limited-offer countdown, trending, testimonials, blog, Instagram gallery, newsletter
- **Shop** — search, category/brand/price/rating/skin-type filters, sorting, responsive grid, skeletons
- **Product** — gallery with hover-zoom, shade swatches, tabs (description/ingredients/benefits/how-to-use), reviews with rating breakdown + review form, frequently-bought-together bundle, related products, JSON-LD
- **Category** pages, **Blog** (list + article)
- **Cart** — quantity steppers, save-for-later, coupons (`GLOW10`, `GLOW20`, `WELCOME200`), live order summary
- **Multi-step Checkout** → confirmation with order number
- **Wishlist**

**Premium features**
- Quick-view modal, product **comparison** (`/compare`), recently-viewed, floating compare bar
- **Beauty Quiz / skin-type selector** (`/quiz`) with personalised recommendations
- Rule-based recommendations, loyalty **GlowRewards**, order tracking timeline

**Accounts & Admin**
- Auth.js v5 email/password (bcrypt), JWT sessions, role-based `middleware`
- **User dashboard** — overview, orders + tracking, addresses CRUD, wishlist, rewards, profile
- **Admin dashboard** — analytics (Recharts), product/category/brand CRUD, order management, customers

**Polish** — Framer Motion scroll reveals, page transitions, hover effects, shimmer skeletons, SEO metadata, `sitemap.xml`, `robots.txt`, PWA manifest.

---

## 🧱 Tech Stack

| | |
|---|---|
| Framework | Next.js 15 (App Router, RSC, Server Actions) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + CSS-variable design tokens |
| UI | shadcn-style components (Radix primitives) |
| Animation | Framer Motion |
| State | Zustand (`persist`) |
| DB / ORM | PostgreSQL + Prisma |
| Auth | Auth.js / NextAuth v5 (Credentials) |
| Charts | Recharts |

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
Copy `.env.example` → `.env` and fill in values:
```bash
cp .env.example .env
```
- `DATABASE_URL` — a PostgreSQL connection string from **Neon** or **Supabase** (free tier works great).
- `AUTH_SECRET` — generate with `npx auth secret` or `openssl rand -base64 32`.

### 3. Set up the database
```bash
npm run db:push      # create tables from the Prisma schema
npm run db:seed      # seed categories, brands, 24 products, reviews, coupons + admin
```
The seed prints the admin login (default: `admin@glowcart.dev` / `Admin@12345`).
A demo customer is also created: `demo@glowcart.dev` / `Demo@12345`.

### 4. Run
```bash
npm run dev
```
Open <http://localhost:3000>.

> **Note:** The product catalogue is served from a static dataset (`src/data/`) so the storefront is fully browsable even before the database is configured. The database powers **auth, the admin dashboard, orders, reviews and persistence**. The same `src/data` is used to seed the DB, so everything stays in sync.

---

## 📜 Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build (runs `prisma generate`) |
| `npm run start` | Start the production server |
| `npm run db:push` | Push the Prisma schema to the DB |
| `npm run db:migrate` | Create a migration |
| `npm run db:seed` | Seed sample data |
| `npm run db:studio` | Open Prisma Studio |

---

## 📁 Project Structure

```
src/
├─ app/
│  ├─ (storefront)/   # home, shop, product, category, cart, checkout, wishlist, quiz, compare, blog
│  ├─ (account)/      # user dashboard (orders, addresses, rewards, profile, wishlist)
│  ├─ (auth)/         # login, register
│  ├─ admin/          # admin dashboard (products, categories, brands, orders, customers, analytics)
│  ├─ api/auth/       # Auth.js route handler
│  ├─ sitemap.ts · robots.ts · manifest.ts
├─ components/        # ui/ (primitives), layout/, home/, product/, shop/, cart/, checkout/, account/, admin/, shared/
├─ store/             # Zustand: cart, wishlist, compare, recently-viewed, ui
├─ data/              # catalogue source of truth (products, categories, brands, reviews, blog, mock-account)
├─ lib/               # prisma, auth, utils, validators, fonts
├─ server/            # server actions (registration)
└─ types/
prisma/               # schema.prisma + seed.ts
```

---

## 🎨 Design Tokens

Defined once in `globals.css` and `tailwind.config.ts`:

| Token | Hex | Use |
|---|---|---|
| Soft Pink | `#FADADD` | secondary / badges / hover wash |
| Rose Gold | `#B76E79` | primary CTAs / accents |
| Beige | `#F8F5F2` | section backgrounds |
| Ink | `#1E1E1E` | primary text |
| Gold | `#C9A227` | ratings / loyalty |

Typography pairs **Montserrat** (headings) with **Inter** (body).

---

## 🔮 Roadmap (nice next steps)

- Real Stripe payments + webhooks, Resend transactional email
- Persist cart/wishlist/reviews/orders to the DB for logged-in users
- Live faceted search (Algolia/Meilisearch), AR shade try-on
- Cloudinary/UploadThing for real review & product image uploads
- i18n + currency switch, full Lighthouse/Core-Web-Vitals pass

---

Crafted with 💗 for beautiful skin.
