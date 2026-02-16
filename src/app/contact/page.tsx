"use client";

import { Navigation } from "@/components/navigation";
import { ContactSection } from "@/components/sections/contact-section";
import { Footer } from "@/components/footer";

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main className="relative overflow-x-hidden">
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
