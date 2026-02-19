"use client";

import { Navigation } from "@/components/navigation";
import { TubesBackground } from "@/components/ui/tubes-background";
import { PointerCursor } from "@/components/ui/pointer-cursor";
import { ContactSection } from "@/components/sections/contact-section";

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <TubesBackground className="fixed inset-0 z-0">
        <div className="w-full h-full" />
      </TubesBackground>
      <PointerCursor 
        size={36}
        color="#ffffff"
        glowColor="#6366f1"
        glowIntensity={25}
        showGlow={true}
      />
      <main className="relative z-10 w-screen h-screen overflow-hidden">
        <ContactSection />
      </main>
    </>
  );
}
