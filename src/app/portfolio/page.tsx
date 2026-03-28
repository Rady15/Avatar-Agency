"use client";

import { Navigation } from "@/components/navigation";
import { PortfolioSection } from "@/components/sections/portfolio-section";
import { Footer } from "@/components/footer";

export default function PortfolioPage() {
  return (
    <>
      <Navigation />
      <main className="relative overflow-x-hidden">
        <PortfolioSection />
      </main>
      <Footer />
    </>
  );
}
