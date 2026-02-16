"use client";

import { Navigation } from "@/components/navigation";
import { AboutSection } from "@/components/sections/about-section";
import { Footer } from "@/components/footer";

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="relative overflow-x-hidden">
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}
