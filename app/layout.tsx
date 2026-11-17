import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#080B0E",
};


const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Luxora Villa — Premium Private Sanctuary",
  description:
    "Escape the ordinary at Luxora Villa. An exclusive private sanctuary featuring luxury accommodation, azure swimming pool, bespoke dining, and peaceful outdoor living.",
  keywords: [
    "Luxora Villa",
    "Luxury Private Villa",
    "Private Pool Villa",
    "Boutique Vacation Rental",
    "Luxury Getaway",
    "Private Dining Villa",
  ],
  openGraph: {
    title: "Luxora Villa — Premium Private Sanctuary",
    description:
      "Your private sanctuary for unforgettable moments, beautiful dining, and effortless relaxation.",
    url: "https://luxoravilla.com",
    siteName: "Luxora Villa",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${plusJakarta.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[#080B0E] text-[#F3EFE6] font-sans selection:bg-[#C5A880]/30 selection:text-[#FFF]">
        {children}
      </body>
    </html>
  );
}

