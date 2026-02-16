"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Sparkles, ArrowLeft, MousePointer2 } from "lucide-react";

const slogans = [
  "نكسر القواعد لخلق الابتكار",
  "Breaking Rules to Create Innovation",
];

const TOTAL_FRAMES = 160;

export function HeroSection() {
  const [currentSlogan, setCurrentSlogan] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [currentFrame, setCurrentFrame] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Update frame based on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const frame = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(latest * TOTAL_FRAMES)));
      setCurrentFrame(frame);
    });
    
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Content opacity based on scroll
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);

  // Preload frames
  useEffect(() => {
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/live/ffout${String(i).padStart(3, "0")}.gif`;
    }
  }, []);

  // Slogan typing effect
  useEffect(() => {
    const currentText = slogans[currentSlogan];
    let index = 0;
    setIsTyping(true);
    setDisplayText("");

    const typeInterval = setInterval(() => {
      if (index < currentText.length) {
        setDisplayText(currentText.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
        setTimeout(() => {
          setCurrentSlogan((prev) => (prev + 1) % slogans.length);
        }, 3000);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [currentSlogan]);

  const frameUrl = `/live/ffout${String(currentFrame).padStart(3, "0")}.gif`;

  return (
    <div ref={containerRef} className="relative" style={{ height: '500vh' }}>
      {/* Fixed Viewport */}
      <div className="fixed inset-0 w-screen h-screen overflow-hidden">
        {/* Background Frame - Changes on scroll */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${frameUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          initial={false}
          transition={{ duration: 0 }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[#0A1D37]/50 pointer-events-none" />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1D37]/40 via-transparent to-[#0A1D37]/60 pointer-events-none" />
        
        {/* Vignette Effect */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, transparent 30%, rgba(10, 29, 55, 0.7) 100%)"
          }}
        />

        {/* Fixed Content */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: contentOpacity }}
        >
          <div className="text-center z-10 px-4 max-w-5xl mx-auto">
            {/* 3D Diamond Logo */}
            <motion.div 
              className="mb-8 md:mb-12"
              initial={{ scale: 0, rotateY: -180, opacity: 0 }}
              animate={{ scale: 1, rotateY: 0, opacity: 1 }}
              transition={{
                duration: 1.5,
                type: "spring",
                stiffness: 80,
                damping: 20,
              }}
            >
              <motion.div
                className="relative w-28 h-28 md:w-36 md:h-36 lg:w-48 lg:h-48 mx-auto"
                animate={{ rotateY: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              >
                <motion.div
                  className="absolute -inset-6 md:-inset-8 rounded-full"
                  style={{
                    background: "radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, transparent 70%)",
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                <div
                  className="absolute inset-0 gold-glow"
                  style={{
                    background: "linear-gradient(135deg, #D4AF37 0%, #FFD700 30%, #B8860B 70%, #8B6914 100%)",
                    clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                  }}
                />

                <div
                  className="absolute inset-4 md:inset-5"
                  style={{
                    background: "linear-gradient(135deg, #0A1D37 0%, #152d4a 50%, #0d2341 100%)",
                    clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                  }}
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    className="text-4xl md:text-5xl lg:text-6xl font-black gold-text"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    A
                  </motion.span>
                </div>

                <motion.div
                  className="absolute -inset-3 md:-inset-4 border-2 border-primary/30 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  style={{ borderStyle: "dashed" }}
                />

                <motion.div
                  className="absolute -inset-6 md:-inset-8 border border-primary/20 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </motion.div>

            {/* Brand Name */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mb-4 md:mb-6"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-2 md:mb-3 tracking-tight drop-shadow-2xl">
                <span className="gold-text">أفتار</span>
              </h1>
              <motion.p
                className="text-lg md:text-xl lg:text-2xl font-light text-white/70 tracking-[0.3em] uppercase"
                style={{ fontFamily: "var(--font-geist-sans)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                AVATAR
              </motion.p>
              <motion.p
                className="text-xs md:text-sm text-white/40 mt-1 md:mt-2"
                style={{ fontFamily: "var(--font-geist-sans)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                ADVERTISING AGENCY
              </motion.p>
            </motion.div>

            {/* Animated Slogan */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="h-16 md:h-20 flex items-center justify-center mb-6 md:mb-8"
            >
              <p className="text-lg md:text-xl lg:text-2xl text-white/90 font-light drop-shadow-lg">
                <span className={currentSlogan === 1 ? "font-normal" : ""}>
                  {displayText}
                </span>
                <span className={`${isTyping ? "typing-cursor" : ""}`} />
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center"
            >
              <motion.a
                href="/services"
                className="btn-3d group px-6 md:px-8 py-3 md:py-4 bg-primary text-primary-foreground font-bold rounded-xl text-base md:text-lg flex items-center justify-center gap-2 md:gap-3 shadow-2xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
                اكتشف خدماتنا
                <ArrowLeft className="w-3 h-3 md:w-4 md:h-4 group-hover:-translate-x-1 transition-transform" />
              </motion.a>
              <motion.a
                href="/contact"
                className="group px-6 md:px-8 py-3 md:py-4 border-2 border-primary/50 text-primary font-bold rounded-xl text-base md:text-lg flex items-center justify-center gap-2 md:gap-3 hover:bg-primary/10 transition-colors backdrop-blur-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                تواصل معنا
              </motion.a>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-primary/60"
          >
            <MousePointer2 className="w-5 h-5 mb-2" />
            <span className="text-xs mb-1 font-light">اسحب للأسفل</span>
            <motion.div
              className="w-6 h-10 border-2 border-primary/40 rounded-full flex justify-center pt-2"
            >
              <motion.div
                className="w-1 h-2 bg-primary/60 rounded-full"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Frame Counter (bottom left) */}
        <div className="absolute bottom-4 left-4 z-20 text-white/30 text-xs font-mono">
          Frame: {String(currentFrame).padStart(3, "0")} / {TOTAL_FRAMES}
        </div>
      </div>
    </div>
  );
}
