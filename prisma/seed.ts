import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

import { categories } from "../src/data/categories";
import { brands } from "../src/data/brands";
import { products } from "../src/data/products";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱  Seeding GlowCart database…");

  // --- Categories ---
  const categoryMap = new Map<string, string>();
  for (const c of categories) {
    const rec = await prisma.category.upsert({
      where: { slug: c.slug },
      update: { name: c.name, tagline: c.tagline, image: c.image },
      create: { name: c.name, slug: c.slug, tagline: c.tagline, image: c.image },
    });
    categoryMap.set(c.slug, rec.id);
  }
  console.log(`   ✓ ${categories.length} categories`);

  // --- Brands ---
  const brandMap = new Map<string, string>();
  for (const b of brands) {
    const rec = await prisma.brand.upsert({
      where: { slug: b.slug },
      update: { name: b.name, featured: b.featured ?? false },
      create: { name: b.name, slug: b.slug, featured: b.featured ?? false },
    });
    brandMap.set(b.name, rec.id);
  }
  console.log(`   ✓ ${brands.length} brands`);

  // --- Products + reviews ---
  for (const p of products) {
    const brandId =
      brandMap.get(p.brand) ?? brandMap.values().next().value!;
    const categoryId = categoryMap.get(p.category)!;

    const product = await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        name: p.name,
        slug: p.slug,
        brandId,
        categoryId,
        price: p.price,
        compareAtPrice: p.compareAtPrice ?? null,
        rating: p.rating,
        ratingCount: p.ratingCount,
        stock: p.stock,
        shortDescription: p.shortDescription,
        description: p.description,
        images: p.images,
        ingredients: p.ingredients,
        benefits: p.benefits,
        howToUse: p.howToUse,
        skinTypes: p.skinTypes,
        tags: p.tags,
        isBestSeller: p.tags.includes("bestseller"),
        isNew: p.tags.includes("new"),
        isTrending: p.tags.includes("trending"),
        isLimited: p.tags.includes("limited"),
      },
    });

    for (const rv of p.reviews) {
      await prisma.review.create({
        data: {
          productId: product.id,
          author: rv.author,
          rating: rv.rating,
          title: rv.title,
          body: rv.body,
          images: rv.images ?? [],
          verified: rv.verified ?? true,
        },
      });
    }
  }
  console.log(`   ✓ ${products.length} products + reviews`);

  // --- Coupons ---
  const coupons = [
    { code: "GLOW10", type: "percent", value: 10 },
    { code: "GLOW20", type: "percent", value: 20 },
    { code: "WELCOME200", type: "flat", value: 200 },
  ];
  for (const c of coupons) {
    await prisma.coupon.upsert({
      where: { code: c.code },
      update: {},
      create: c,
    });
  }
  console.log(`   ✓ ${coupons.length} coupons`);

  // --- Users ---
  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin@glowcart.dev";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "Admin@12345";
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { role: "ADMIN" },
    create: {
      name: "GlowCart Admin",
      email: adminEmail,
      passwordHash: await bcrypt.hash(adminPassword, 10),
      role: "ADMIN",
      loyaltyPoints: 5000,
    },
  });

  await prisma.user.upsert({
    where: { email: "demo@glowcart.dev" },
    update: {},
    create: {
      name: "Demo Customer",
      email: "demo@glowcart.dev",
      passwordHash: await bcrypt.hash("Demo@12345", 10),
      role: "USER",
      loyaltyPoints: 320,
    },
  });

  console.log("   ✓ admin + demo users");
  console.log(`\n✅  Done!  Admin login → ${adminEmail} / ${adminPassword}\n`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
