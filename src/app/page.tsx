"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { SpaceBackground } from "@/components/ui/space-background";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { PortfolioSection } from "@/components/sections/portfolio-section";
import { ContactSection } from "@/components/sections/contact-section";
import { Footer } from "@/components/footer";
import { TestimonialsSection } from "@/components/sections/testimonials-section";

const AstronautCharacter = () => {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll(
    mounted
      ? {
          target: containerRef,
          offset: ["start start", "end start"] // تغيير نقطة البداية والنهاية
        }
      : {}
  );

  // تعديل rawX لتبدأ من 5vw (ثابتة على اليسار) ثم تتحرك
  const rawX = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1], // الـ 0.1 الأولى ثابتة
    ["5vw", "30vw", "40vw", "50vw", "70vw", "120vw", "70vw", "30vw", "5vw", "-10vw", "-10vw"]
  );

  // تعديل rawRotateZ لتبدأ من 0 ثم تتحرك بعد فترة
  const rawRotateZ = useTransform(
    scrollYProgress,
    [0, 0.1, 0.35, 0.6, 0.85, 1], // الـ 0.1 الأولى ثابتة
    [0, 0, 20, -15, 25, 0]
  );

  // تعديل rawFaceRight لتبدأ من 1 (يمين) ثم تتغير بعد فترة
  const rawFaceRight = useTransform(
    scrollYProgress,
    [0, 0.1, 0.15, 0.2, 0.25, 0.4, 0.45, 0.5, 0.55, 0.8, 0.85, 1],
    [1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1] // أول 0.1 ثابتة على 1
  );

  // تعديل rawScale لتبدأ من 1 ثم تتغير بعد فترة
  const rawScale = useTransform(
    scrollYProgress,
    [0, 0.1, 0.35, 0.6, 0.85, 1], // الـ 0.1 الأولى ثابتة
    [1, 1, 1.05, 0.95, 1.02, 1]
  );

  const x = useSpring(rawX, { stiffness: 30, damping: 20, restDelta: 0.001 });
  const rotateZ = useSpring(rawRotateZ, { stiffness: 35, damping: 20, restDelta: 0.001 });
  const faceRight = useSpring(rawFaceRight, { stiffness: 30, damping: 20, restDelta: 0.001 });
  const scale = useSpring(rawScale, { stiffness: 30, damping: 20, restDelta: 0.001 });

  const [floatOffset, setFloatOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let frameId: number;
    const animate = (time: number) => {
      setFloatOffset({
        x: Math.cos(time / 1800) * 8,
        y: Math.sin(time / 1200) * 15
      });
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const combinedX = useTransform(() => x.get() + floatOffset.x);
  const combinedY = useTransform(() => floatOffset.y);

  const animatedX = useSpring(combinedX, { stiffness: 30, damping: 20, restDelta: 0.001 });
  const animatedY = useSpring(combinedY, { stiffness: 30, damping: 20, restDelta: 0.001 });

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 5 }}>
      <motion.div
        style={{
          position: "absolute",
          top: "15%",
          left: 0,
          x: animatedX,
          y: animatedY,
          rotateZ,
          scale,
          width: "45%",
          maxWidth: "380px",
          minWidth: "130px",
        }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/15 blur-[60px] rounded-full scale-150" />
          <div className="relative w-full">
            <motion.img
              src="/2_png.png"
              alt="Astronaut"
              className="w-full h-auto drop-shadow-[0_0_40px_rgba(255,255,255,0.2)]"
              animate={{ opacity: faceRight.get() > 0.5 ? 1 : 0 }}
              transition={{ duration: 0.15 }}
            />
            <motion.img
              src="/2_png.png"
              alt="Astronaut"
              className="w-full h-auto drop-shadow-[0_0_40px_rgba(255,255,255,0.2)] absolute inset-0 top-0 left-0"
              style={{ transform: "scaleX(-1)" }}
              animate={{ opacity: faceRight.get() > 0.5 ? 0 : 1 }}
              transition={{ duration: 0.15 }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

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
      <SpaceBackground />
      <AstronautCharacter />
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
