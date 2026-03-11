import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Cairo } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { AssetPreloader } from "@/components/ui/asset-preloader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "AVATAR Advertising | أفتار للدعاية والإعلان",
  description: "نكسر القواعد لخلق الابتكار - Premium Creative Advertising Agency in Saudi Arabia. Web Design, Branding, Social Media, Video Production, Exhibitions, and more.",
  keywords: ["أفتار", "AVATAR", "دعاية وإعلان", "تصميم مواقع", "هوية بصرية", "سوشيال ميديا", "فيديو", "معارض", "السعودية", "creative agency"],
  authors: [{ name: "AVATAR Advertising Agency" }],
  openGraph: {
    title: "AVATAR Advertising | أفتار للدعاية والإعلان",
    description: "نكسر القواعد لخلق الابتكار - Breaking Rules to Create Innovation",
    type: "website",
    locale: "ar_SA",
  },
  twitter: {
    card: "summary_large_image",
    title: "AVATAR Advertising",
    description: "Premium Creative Advertising Agency",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cairo.variable} antialiased bg-background text-foreground`}
      >
        <LanguageProvider>
          {children}
          <AssetPreloader />
        </LanguageProvider>
      </body>
    </html>
  );
}
