import { Inter, Montserrat } from "next/font/google";

// Body font — Inter
export const fontBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// Heading font — Montserrat
export const fontDisplay = Montserrat({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});
