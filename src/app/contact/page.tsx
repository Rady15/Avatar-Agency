"use client";

import { Navigation } from "@/components/navigation";
import { TubesBackground } from "@/components/ui/tubes-background";
import { ContactSection } from "@/components/sections/contact-section";

export default function ContactPage() {
  return (
    <main className="relative min-h-screen">
      {/* Hero Background */}
      <div className="fixed inset-0 z-0">
        <img src="/1.webp" alt="Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      <div className="relative z-10">
        <ContactSection showBackground={false} />
      </div>
    </main>
  );
}
