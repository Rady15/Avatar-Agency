"use client";

import { useState, useEffect } from "react";
import { IntroAnimation } from "@/components/intro-animation";
import { Navigation } from "@/components/navigation";
import { SpaceBackground } from "@/components/ui/space-background";
import { PointerCursor } from "@/components/ui/pointer-cursor";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { PortfolioSection } from "@/components/sections/portfolio-section";
import { ContactSection } from "@/components/sections/contact-section";
import { Footer } from "@/components/footer";
import { TestimonialsSection } from "@/components/sections/testimonials-section";

export default function Home() {
  const [showIntro, setShowIntro] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const hasPlayed = sessionStorage.getItem("introPlayed");
    if (!hasPlayed) {
      setShowIntro(true);
    }
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem("introPlayed", "true");
    setShowIntro(false);
  };

  if (!isMounted) return null; // Prevent hydration mismatch

  return (
    <>
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
      <Navigation />
      <SpaceBackground />
      <PointerCursor
        size={36}
        color="#ffffff"
        glowColor="#6366f1"
        glowIntensity={25}
        showGlow={true}
      />
      <main className="relative z-10">
        <HeroSection showBackground={false} />
        <AboutSection showBackground={false} />
        <PortfolioSection showBackground={false} />
        <TestimonialsSection showBackground={false} />
        <ContactSection showBackground={false} />
      </main>
      <Footer />
    </>
  );
}
