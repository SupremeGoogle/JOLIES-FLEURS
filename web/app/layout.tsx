import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RevealInit from "@/components/RevealInit";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jolies Fleurs — Цветочный магазин в Москве",
  description:
    "Свежие букеты и цветочные композиции. Два магазина в Москве, доставка по Москве и МО. Тел: +7 (985) 389-85-91",
  keywords: "цветы, букеты, Москва, доставка цветов, Jolies Fleurs",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="min-h-screen flex flex-col" style={{ background: "#FDFAF6" }}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <RevealInit />
      </body>
    </html>
  );
}
