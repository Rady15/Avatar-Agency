"use client";

import { Navigation } from "@/components/navigation";
import { ServicesSection } from "@/components/sections/services-section";
import { Footer } from "@/components/footer";

export default function ServicesPage() {
  return (
    <>
      <Navigation />
      <main className="relative overflow-x-hidden">
        <ServicesSection />
      </main>
      <Footer />
    </>
  );
}
