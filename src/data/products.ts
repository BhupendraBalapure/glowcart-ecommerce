import type { Product, ProductReview } from "@/types";

const IMG = {
  serum:
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80",
  serum2:
    "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=80",
  cream:
    "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80",
  cream2:
    "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80",
  lipstick:
    "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=80",
  lipstick2:
    "https://images.unsplash.com/photo-1631214540242-3cd8c4b0b3e8?auto=format&fit=crop&w=900&q=80",
  foundation:
    "https://images.unsplash.com/photo-1631730486784-5d63f3a4b3f3?auto=format&fit=crop&w=900&q=80",
  palette:
    "https://images.unsplash.com/photo-1583241801409-9e0734bcc9e4?auto=format&fit=crop&w=900&q=80",
  mascara:
    "https://images.unsplash.com/photo-1631214499883-d96e3b0d8d4e?auto=format&fit=crop&w=900&q=80",
  blush:
    "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80",
  perfume:
    "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80",
  perfume2:
    "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80",
  hairoil:
    "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=900&q=80",
  shampoo:
    "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=900&q=80",
  bodylotion:
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80",
  bodyscrub:
    "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=900&q=80",
  brush:
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
  roller:
    "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?auto=format&fit=crop&w=900&q=80",
  cleanser:
    "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=900&q=80",
  sunscreen:
    "https://images.unsplash.com/photo-1556229174-5e42a09e45af?auto=format&fit=crop&w=900&q=80",
};

function r(
  author: string,
  rating: number,
  title: string,
  body: string,
  opts: Partial<ProductReview> = {}
): ProductReview {
  return {
    id: `${author}-${title}`.toLowerCase().replace(/\s+/g, "-"),
    author,
    rating,
    title,
    body,
    date: opts.date ?? "2026-03-12",
    verified: opts.verified ?? true,
    avatar: opts.avatar,
    images: opts.images,
  };
}

export const products: Product[] = [
  // ---------------- SKINCARE ----------------
  {
    id: "p-glow-serum",
    name: "Radiance Glow Vitamin C Serum",
    slug: "radiance-glow-vitamin-c-serum",
    brand: "Luminé",
    category: "skincare",
    price: 1899,
    compareAtPrice: 2499,
    rating: 4.8,
    ratingCount: 1284,
    stock: 64,
    shortDescription:
      "A brightening 15% vitamin C serum that fades dark spots and revives dull skin.",
    description:
      "Our cult-favourite Radiance Glow Serum pairs stabilised 15% vitamin C with hyaluronic acid and ferulic acid to brighten, firm and deeply hydrate. Skin looks visibly more even and lit-from-within in just two weeks.",
    images: [IMG.serum, IMG.serum2, IMG.cream],
    ingredients:
      "Aqua, Ascorbic Acid (15%), Sodium Hyaluronate, Ferulic Acid, Vitamin E, Glycerin, Panthenol.",
    benefits: [
      "Brightens & evens skin tone",
      "Fades dark spots in 4 weeks",
      "Boosts collagen & firmness",
      "72-hour hydration",
    ],
    howToUse:
      "Apply 3–4 drops to clean, dry skin every morning before moisturiser and SPF. Avoid the eye area.",
    skinTypes: ["All", "Dry", "Normal", "Combination"],
    tags: ["bestseller", "trending"],
    frequentlyBoughtWith: [
      "dewy-veil-moisturiser",
      "invisible-shield-spf-50",
    ],
    reviews: [
      r("Ananya R.", 5, "My skin has never looked better", "Two weeks in and my dark spots are visibly lighter. A little goes a long way.", { images: [IMG.serum] }),
      r("Priya K.", 5, "Worth every rupee", "Lightweight, sinks in fast, no stickiness. My new holy grail."),
      r("Sara M.", 4, "Great glow", "Lovely glow but the dropper could be better designed."),
    ],
  },
  {
    id: "p-dewy-moisturiser",
    name: "Dewy Veil Hydrating Moisturiser",
    slug: "dewy-veil-moisturiser",
    brand: "Aurelia",
    category: "skincare",
    price: 1599,
    compareAtPrice: 1999,
    rating: 4.7,
    ratingCount: 932,
    stock: 80,
    shortDescription:
      "A cloud-light gel cream with ceramides for a plump, dewy finish.",
    description:
      "Dewy Veil drenches skin in lasting moisture without any grease. A blend of ceramides, squalane and niacinamide strengthens the skin barrier for a soft, bouncy, glass-skin finish.",
    images: [IMG.cream, IMG.cream2],
    ingredients:
      "Aqua, Squalane, Niacinamide, Ceramide NP, Glycerin, Sodium Hyaluronate, Allantoin.",
    benefits: [
      "Plumps & hydrates for 24h",
      "Strengthens the skin barrier",
      "Non-greasy, fast-absorbing",
    ],
    howToUse:
      "Smooth over face and neck morning and night after serum.",
    skinTypes: ["All", "Dry", "Sensitive", "Normal"],
    tags: ["bestseller"],
    frequentlyBoughtWith: ["radiance-glow-vitamin-c-serum"],
    reviews: [
      r("Megha T.", 5, "So plumping", "My skin drinks this up. Perfect under makeup."),
      r("Ishita D.", 4, "Lovely everyday cream", "Great hydration, faint scent I wish wasn't there."),
    ],
  },
  {
    id: "p-spf",
    name: "Invisible Shield SPF 50 Sunscreen",
    slug: "invisible-shield-spf-50",
    brand: "Luminé",
    category: "skincare",
    price: 1299,
    rating: 4.9,
    ratingCount: 2103,
    stock: 120,
    shortDescription:
      "A weightless, no-white-cast SPF 50 PA++++ for daily glow protection.",
    description:
      "This silky broad-spectrum sunscreen melts into skin with zero white cast and a soft satin finish. Infused with green tea and vitamin E to defend against UV and pollution.",
    images: [IMG.sunscreen, IMG.cream2],
    ingredients:
      "Aqua, Homosalate, Niacinamide, Green Tea Extract, Vitamin E, Glycerin.",
    benefits: [
      "SPF 50 PA++++ broad spectrum",
      "No white cast, no grease",
      "Doubles as a smooth makeup base",
    ],
    howToUse:
      "Apply generously as the last step of your morning routine. Reapply every 3–4 hours.",
    skinTypes: ["All", "Oily", "Combination", "Sensitive"],
    tags: ["bestseller", "trending"],
    reviews: [
      r("Neha S.", 5, "Finally an SPF I'll actually wear", "No cast, no stinging eyes. Perfect under makeup."),
      r("Kavya P.", 5, "Daily essential", "Repurchased 3 times already."),
    ],
  },
  {
    id: "p-cleanser",
    name: "Soft Reset Gentle Gel Cleanser",
    slug: "soft-reset-gel-cleanser",
    brand: "Mirae",
    category: "skincare",
    price: 899,
    compareAtPrice: 1199,
    rating: 4.6,
    ratingCount: 654,
    stock: 95,
    shortDescription:
      "A pH-balanced gel cleanser that melts away makeup without stripping.",
    description:
      "Soft Reset gently lifts away dirt, SPF and makeup while keeping your barrier happy. Amino-acid surfactants and panthenol leave skin clean, calm and never tight.",
    images: [IMG.cleanser, IMG.serum2],
    ingredients:
      "Aqua, Coco-Glucoside, Glycerin, Panthenol, Allantoin, Centella Asiatica.",
    benefits: ["Removes makeup & SPF", "pH balanced 5.5", "Never stripping"],
    howToUse:
      "Massage onto damp skin morning and night, rinse with lukewarm water.",
    skinTypes: ["All", "Sensitive", "Oily", "Combination"],
    tags: ["new"],
    reviews: [
      r("Diya N.", 5, "So gentle", "Cleans thoroughly without that tight feeling."),
    ],
  },
  // ---------------- MAKEUP ----------------
  {
    id: "p-velvet-lipstick",
    name: "Velvet Matte Lipstick — Rosewood",
    slug: "velvet-matte-lipstick-rosewood",
    brand: "Velvet Rose",
    category: "makeup",
    price: 1099,
    compareAtPrice: 1399,
    rating: 4.7,
    ratingCount: 1789,
    stock: 50,
    shortDescription:
      "A creamy, weightless matte lipstick in an everyday rosewood nude.",
    description:
      "Velvet Matte glides on like a balm and sets to a transfer-resistant, full-coverage matte. Enriched with shea butter and vitamin E so lips stay comfortable for hours.",
    images: [IMG.lipstick, IMG.lipstick2],
    ingredients:
      "Shea Butter, Vitamin E, Jojoba Oil, Candelilla Wax, Mica.",
    benefits: ["8-hour wear", "Non-drying matte", "Buildable colour"],
    howToUse:
      "Line lips and fill in from the centre outward. Layer for a bolder finish.",
    skinTypes: ["All"],
    shades: [
      { name: "Rosewood", hex: "#9C5A64" },
      { name: "Spiced Mauve", hex: "#7E4B52" },
      { name: "Petal", hex: "#C77F8C" },
      { name: "Brick", hex: "#A24A3E" },
    ],
    tags: ["bestseller", "trending"],
    frequentlyBoughtWith: ["flawless-silk-foundation", "cloud-blush-peony"],
    reviews: [
      r("Tanvi A.", 5, "The perfect nude", "Goes with everything and doesn't dry my lips."),
      r("Riya G.", 4, "Pretty shade", "Lovely but I need a balm under it."),
    ],
  },
  {
    id: "p-foundation",
    name: "Flawless Silk Serum Foundation",
    slug: "flawless-silk-foundation",
    brand: "Velvet Rose",
    category: "makeup",
    price: 1999,
    rating: 4.6,
    ratingCount: 1120,
    stock: 70,
    shortDescription:
      "A skin-like medium-coverage foundation with a luminous satin finish.",
    description:
      "Half serum, half foundation. Hyaluronic acid and niacinamide care for skin while blurring imperfections for a real-skin, lit-from-within finish that lasts all day.",
    images: [IMG.foundation, IMG.cream],
    ingredients:
      "Aqua, Hyaluronic Acid, Niacinamide, Vitamin E, Iron Oxides.",
    benefits: ["Buildable medium coverage", "Skincare-infused", "12-hour wear"],
    howToUse:
      "Apply with a damp sponge or brush, building coverage where needed.",
    skinTypes: ["All", "Normal", "Dry", "Combination"],
    shades: [
      { name: "Porcelain", hex: "#F2D6C2" },
      { name: "Sand", hex: "#E3B591" },
      { name: "Honey", hex: "#C98C5E" },
      { name: "Caramel", hex: "#A66A3E" },
      { name: "Mocha", hex: "#7A4A2B" },
    ],
    tags: ["bestseller"],
    reviews: [
      r("Sneha V.", 5, "Looks like skin", "Medium coverage but never cakey."),
    ],
  },
  {
    id: "p-palette",
    name: "Sunlit Nudes Eyeshadow Palette",
    slug: "sunlit-nudes-eyeshadow-palette",
    brand: "Soleil",
    category: "makeup",
    price: 2299,
    compareAtPrice: 2899,
    rating: 4.8,
    ratingCount: 845,
    stock: 40,
    shortDescription:
      "12 buttery, blendable neutral shades from matte to molten foil.",
    description:
      "A do-it-all palette of warm nudes, soft pinks and golden foils. The silky, pigment-rich formula blends like a dream and lasts from desk to dinner.",
    images: [IMG.palette, IMG.blush],
    ingredients: "Mica, Talc, Magnesium Stearate, Dimethicone, Pigments.",
    benefits: ["12 versatile shades", "High pigment", "Crease-resistant"],
    howToUse:
      "Use matte shades to define and shimmer shades to highlight. Build slowly.",
    skinTypes: ["All"],
    tags: ["trending", "new"],
    reviews: [
      r("Pooja L.", 5, "Everyday perfection", "The foils are stunning and barely any fallout."),
    ],
  },
  {
    id: "p-mascara",
    name: "Sky High Volumising Mascara",
    slug: "sky-high-volumising-mascara",
    brand: "Noir & Co.",
    category: "makeup",
    price: 1199,
    rating: 4.7,
    ratingCount: 1532,
    stock: 110,
    shortDescription:
      "A lengthening, volumising mascara that lifts and separates without clumps.",
    description:
      "The flexible hourglass brush coats every lash for sky-high length and fanned-out volume. Smudge-proof and humidity-resistant for all-day definition.",
    images: [IMG.mascara, IMG.lipstick2],
    ingredients: "Aqua, Beeswax, Carnauba Wax, Provitamin B5, Iron Oxides.",
    benefits: ["Dramatic length & volume", "No clumps", "Smudge-proof"],
    howToUse: "Wiggle from root to tip, building two to three coats.",
    skinTypes: ["All"],
    tags: ["bestseller"],
    reviews: [
      r("Aditi R.", 5, "Lashes for days", "Looks like falsies. Holds a curl all day."),
    ],
  },
  {
    id: "p-blush",
    name: "Cloud Blush — Peony",
    slug: "cloud-blush-peony",
    brand: "Pétale",
    category: "makeup",
    price: 999,
    rating: 4.6,
    ratingCount: 612,
    stock: 85,
    shortDescription:
      "A whipped gel-cream blush that melts into a natural, dewy flush.",
    description:
      "Cloud Blush gives a soft-focus, just-pinched flush that looks like it's coming from within. The bouncy formula blends seamlessly with fingers or a brush.",
    images: [IMG.blush, IMG.lipstick],
    ingredients: "Aqua, Glycerin, Dimethicone, Mica, Pigments.",
    benefits: ["Dewy natural flush", "Blends effortlessly", "Buildable"],
    howToUse: "Dab onto cheeks and blend upward toward the temples.",
    skinTypes: ["All", "Dry", "Normal"],
    shades: [
      { name: "Peony", hex: "#E59AA6" },
      { name: "Coral", hex: "#E78A6E" },
      { name: "Berry", hex: "#B85C7A" },
    ],
    tags: ["new", "trending"],
    reviews: [r("Nidhi S.", 5, "That lit-from-within flush", "So pretty and natural.")],
  },
  // ---------------- FRAGRANCES ----------------
  {
    id: "p-rose-eau",
    name: "Rose Élixir Eau de Parfum",
    slug: "rose-elixir-eau-de-parfum",
    brand: "Pétale",
    category: "fragrances",
    price: 3499,
    compareAtPrice: 4299,
    rating: 4.9,
    ratingCount: 988,
    stock: 30,
    shortDescription:
      "A modern rose with notes of lychee, peony and warm musk.",
    description:
      "Rose Élixir opens with juicy lychee, blooms into Turkish rose and peony, and dries down to a velvety musk. An effortlessly romantic signature for day or night.",
    images: [IMG.perfume, IMG.perfume2],
    ingredients: "Alcohol Denat., Parfum, Aqua, Limonene, Linalool, Citronellol.",
    benefits: ["8–10 hour longevity", "Eau de parfum concentration", "Unisex"],
    howToUse: "Spray onto pulse points. Do not rub.",
    skinTypes: ["All"],
    tags: ["bestseller", "limited"],
    reviews: [
      r("Shreya M.", 5, "Compliment magnet", "Smells expensive and lasts all day."),
      r("Tara J.", 5, "My signature now", "Romantic without being old-fashioned."),
    ],
  },
  {
    id: "p-amber-oud",
    name: "Amber Oud Intense Parfum",
    slug: "amber-oud-intense-parfum",
    brand: "Noir & Co.",
    category: "fragrances",
    price: 4599,
    rating: 4.8,
    ratingCount: 421,
    stock: 22,
    shortDescription:
      "A warm, smoky oud wrapped in amber, saffron and vanilla.",
    description:
      "An opulent evening fragrance. Smoky oud and saffron meet creamy amber and vanilla for a sillage that turns heads. A little goes a long way.",
    images: [IMG.perfume2, IMG.perfume],
    ingredients: "Alcohol Denat., Parfum, Aqua, Coumarin, Eugenol.",
    benefits: ["12-hour longevity", "Bold evening sillage", "Refillable bottle"],
    howToUse: "One or two sprays on pulse points is plenty.",
    skinTypes: ["All"],
    tags: ["trending", "limited"],
    reviews: [r("Zoya K.", 5, "Luxurious", "Smells like a five-star hotel lobby.")],
  },
  // ---------------- HAIRCARE ----------------
  {
    id: "p-hair-oil",
    name: "Silk Repair Argan Hair Oil",
    slug: "silk-repair-argan-hair-oil",
    brand: "Glasshouse",
    category: "haircare",
    price: 1399,
    compareAtPrice: 1799,
    rating: 4.7,
    ratingCount: 1043,
    stock: 75,
    shortDescription:
      "A lightweight argan & marula oil that tames frizz and adds glass-like shine.",
    description:
      "This fast-absorbing oil smooths frizz, seals split ends and leaves hair impossibly glossy — never greasy. Argan, marula and vitamin E nourish from mid-length to tip.",
    images: [IMG.hairoil, IMG.shampoo],
    ingredients: "Argania Spinosa Oil, Marula Oil, Vitamin E, Fragrance.",
    benefits: ["Tames frizz", "Adds mirror shine", "Heat protection to 180°C"],
    howToUse:
      "Warm 2–3 drops between palms and smooth through damp or dry mid-lengths.",
    skinTypes: ["All"],
    tags: ["bestseller"],
    frequentlyBoughtWith: ["repair-restore-shampoo"],
    reviews: [
      r("Meera B.", 5, "Glass hair", "Frizz gone, so shiny, and not greasy at all."),
    ],
  },
  {
    id: "p-shampoo",
    name: "Repair & Restore Bond Shampoo",
    slug: "repair-restore-shampoo",
    brand: "Glasshouse",
    category: "haircare",
    price: 1199,
    rating: 4.6,
    ratingCount: 738,
    stock: 90,
    shortDescription:
      "A sulphate-free bond-building shampoo for stronger, smoother hair.",
    description:
      "Gently cleanses while bond-building technology repairs damage from heat and colour. Hair feels stronger, softer and more resilient wash after wash.",
    images: [IMG.shampoo, IMG.hairoil],
    ingredients: "Aqua, Coco-Betaine, Glycerin, Hydrolysed Keratin, Panthenol.",
    benefits: ["Sulphate-free", "Repairs bonds", "Colour-safe"],
    howToUse: "Massage into wet hair, lather and rinse. Follow with conditioner.",
    skinTypes: ["All"],
    tags: ["new"],
    reviews: [r("Lavanya P.", 5, "Hair feels stronger", "Less breakage after a month.")],
  },
  // ---------------- BATH & BODY ----------------
  {
    id: "p-body-lotion",
    name: "Whipped Shea Body Soufflé",
    slug: "whipped-shea-body-souffle",
    brand: "Soleil",
    category: "bath-body",
    price: 999,
    compareAtPrice: 1299,
    rating: 4.8,
    ratingCount: 856,
    stock: 100,
    shortDescription:
      "A cloud-soft body cream with shea and vanilla for 48-hour softness.",
    description:
      "This melt-in body soufflé wraps skin in shea butter, cocoa butter and a cosy vanilla-amber scent. Deeply nourishing yet fast-absorbing and never sticky.",
    images: [IMG.bodylotion, IMG.bodyscrub],
    ingredients: "Shea Butter, Cocoa Butter, Glycerin, Vitamin E, Fragrance.",
    benefits: ["48-hour moisture", "Non-sticky", "Cosy vanilla scent"],
    howToUse: "Massage over the body after showering.",
    skinTypes: ["All", "Dry"],
    tags: ["bestseller"],
    frequentlyBoughtWith: ["sugar-glow-body-scrub"],
    reviews: [r("Anjali R.", 5, "So soft", "Smells divine and absorbs quickly.")],
  },
  {
    id: "p-body-scrub",
    name: "Sugar Glow Body Polish Scrub",
    slug: "sugar-glow-body-scrub",
    brand: "Soleil",
    category: "bath-body",
    price: 1099,
    rating: 4.6,
    ratingCount: 489,
    stock: 88,
    shortDescription:
      "A sugar & coffee scrub that buffs skin baby-smooth and glowing.",
    description:
      "Fine cane sugar and coffee gently exfoliate while nourishing oils leave skin polished, soft and luminous. The perfect pre-tan or pre-shave ritual.",
    images: [IMG.bodyscrub, IMG.bodylotion],
    ingredients: "Sucrose, Coffea Arabica Seed, Coconut Oil, Shea Butter.",
    benefits: ["Buffs away dullness", "Nourishing oils", "Reveals glow"],
    howToUse: "Massage onto damp skin in circular motions, then rinse.",
    skinTypes: ["All"],
    tags: ["new"],
    reviews: [r("Bhavya S.", 5, "Baby smooth", "Skin glows after one use.")],
  },
  // ---------------- BEAUTY TOOLS ----------------
  {
    id: "p-brush-set",
    name: "Artistry Pro 10-Piece Brush Set",
    slug: "artistry-pro-brush-set",
    brand: "Mirae",
    category: "beauty-tools",
    price: 2499,
    compareAtPrice: 3299,
    rating: 4.7,
    ratingCount: 367,
    stock: 45,
    shortDescription:
      "Ten ultra-soft vegan brushes for a flawless face and eye routine.",
    description:
      "A complete kit of densely packed, vegan synthetic brushes that pick up and blend product beautifully. Comes in a luxe travel case with rose-gold detailing.",
    images: [IMG.brush, IMG.palette],
    ingredients: "Vegan synthetic bristles, aluminium ferrule, birchwood handle.",
    benefits: ["10 essential brushes", "Soft vegan bristles", "Travel case included"],
    howToUse: "Use face brushes for base and eye brushes to shade and blend.",
    skinTypes: ["All"],
    tags: ["bestseller"],
    reviews: [r("Komal D.", 5, "Soft and dense", "Better than sets twice the price.")],
  },
  {
    id: "p-roller",
    name: "Rose Quartz Facial Roller & Gua Sha",
    slug: "rose-quartz-roller-gua-sha",
    brand: "Aurelia",
    category: "beauty-tools",
    price: 1299,
    rating: 4.5,
    ratingCount: 512,
    stock: 60,
    shortDescription:
      "A genuine rose quartz roller and gua sha set to depuff and sculpt.",
    description:
      "Roll and sculpt your way to a calmer, more lifted complexion. Helps boost circulation, reduce puffiness and press skincare deeper into the skin.",
    images: [IMG.roller, IMG.cream2],
    ingredients: "100% natural rose quartz.",
    benefits: ["Depuffs & sculpts", "Boosts circulation", "Pairs with serums"],
    howToUse:
      "Glide upward and outward over serum or oil, from the centre of the face.",
    skinTypes: ["All", "Sensitive"],
    tags: ["trending"],
    reviews: [r("Ira N.", 5, "So relaxing", "Lovely cold in the morning to depuff.")],
  },
];

// ---- helpers -------------------------------------------------------------
export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string) {
  return products.filter((p) => p.category === category);
}

export function getRelatedProducts(product: Product, limit = 4) {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}

export function getFrequentlyBought(product: Product) {
  return (product.frequentlyBoughtWith ?? [])
    .map((slug) => getProductBySlug(slug))
    .filter(Boolean) as Product[];
}

export function getByTag(tag: Product["tags"][number], limit?: number) {
  const list = products.filter((p) => p.tags.includes(tag));
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

export function recommendBySkinType(skinType: string, limit = 4) {
  return products
    .filter((p) => p.skinTypes.includes(skinType as never))
    .slice(0, limit);
}
