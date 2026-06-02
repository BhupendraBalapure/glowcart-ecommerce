import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GlowCart — Premium Beauty & Cosmetics",
    short_name: "GlowCart",
    description:
      "A luxury beauty destination for makeup, skincare, haircare & fragrances.",
    start_url: "/",
    display: "standalone",
    background_color: "#F8F5F2",
    theme_color: "#B76E79",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
