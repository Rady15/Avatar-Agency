"use client";

import { useState } from "react";
import { IntroAnimation } from "@/components/intro-animation";
import { Navigation } from "@/components/navigation";
import { TubesBackground } from "@/components/ui/tubes-background";
import { PointerCursor } from "@/components/ui/pointer-cursor";
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
      <main className="relative z-10">
        <HeroSection />
      </main>
    </>
  );
}
