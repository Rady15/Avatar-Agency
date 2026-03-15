import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Cairo } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { Navigation } from "@/components/navigation";
import { AssetPreloader } from "@/components/ui/asset-preloader-new";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const cairo = Cairo({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0A1D37",
};

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="font" type="font/woff2" href="https://fonts.gstatic.com/s/cairo/v31/SlGWmQSNjdsma65JNK4VK4Kt3A.woff2" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cairo.variable} antialiased bg-background text-foreground`}
      >
        <AssetPreloader />
        <div className="fixed inset-0 z-[-1] w-full h-full overflow-hidden pointer-events-none">
          <img src="/1.webp" alt="Background" className="w-full h-full object-cover" />
        </div>
        <LanguageProvider>
          <Navigation />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
