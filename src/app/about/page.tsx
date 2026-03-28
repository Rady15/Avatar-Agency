"use client";

import { Navigation } from "@/components/navigation";
import { AboutSection } from "@/components/sections/about-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";

export default function AboutPage() {
  return (
    <>
      <main className="relative z-10">
        <AboutSection fullContent={true} showBackground={true} />
        <TestimonialsSection showBackground={true} />
      </main>
    </>
  );
}
