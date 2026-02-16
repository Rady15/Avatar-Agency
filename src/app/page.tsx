"use client";

import { useState } from "react";
import { IntroAnimation } from "@/components/intro-animation";
import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/sections/hero-section";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <>
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
      <Navigation />
      <main className="relative">
        <HeroSection />
      </main>
      {/* Footer removed from homepage */}
    </>
  );
}
