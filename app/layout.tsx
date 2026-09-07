import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { getActiveMarket } from "@/lib/markets";
import { MetaPixel } from "@/components/MetaPixel";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const market = getActiveMarket();
  return {
    title: market.metaTitle,
    description: market.metaDescription,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const market = getActiveMarket();

  return (
    <html lang={market.lang}>
      <body className={`${fraunces.variable} ${outfit.variable}`}>
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
