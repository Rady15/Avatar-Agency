"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef, useMemo } from "react";
import { Sparkles, ArrowLeft, MousePointer2 } from "lucide-react";

const slogans = [
  "نكسر القواعد لخلق الابتكار",
  "Breaking Rules to Create Innovation",
];

// Generate deterministic pseudo-random values based on index
const getStarValues = (layerIndex: number, starIndex: number) => {
  const seed = layerIndex * 1000 + starIndex;
  const pseudoRandom = (s: number) => {
    const x = Math.sin(s) * 10000;
    return x - Math.floor(x);
  };
  
  return {
    size: pseudoRandom(seed) * 2 + 1,
    left: pseudoRandom(seed + 1) * 100,
    top: pseudoRandom(seed + 2) * 100,
    delay: pseudoRandom(seed + 3) * 3,
    duration: pseudoRandom(seed + 4) * 2 + 1,
    opacity: pseudoRandom(seed + 5) * 0.7 + 0.3,
  };
};

// Generate deterministic values for shooting stars
const getShootingStarValues = (index: number) => {
  const seed = index * 5000;
  const pseudoRandom = (s: number) => {
    const x = Math.sin(s) * 10000;
    return x - Math.floor(x);
  };
  
  return {
    top: pseudoRandom(seed) * 50,
    delay: index * 5 + pseudoRandom(seed + 1) * 5,
  };
};

export function HeroSection() {
  const [currentSlogan, setCurrentSlogan] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Content opacity based on scroll
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);

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

  // Pre-computed star layers
  const starLayers = useMemo(() => {
    return [0, 1, 2].map(layerIndex => ({
      layerIndex,
      stars: Array.from({ length: 50 }, (_, i) => getStarValues(layerIndex, i))
    }));
  }, []);

  // Pre-computed shooting stars
  const shootingStars = useMemo(() => {
    return [0, 1, 2].map(i => getShootingStarValues(i));
  }, []);

  return (
    <div ref={containerRef} className="relative" style={{ height: '500vh' }}>
      {/* Fixed Viewport */}
      <div 
        className="fixed inset-0 w-screen h-screen overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/1.png')" }}
      >
        {/* Animated Stars Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Generate multiple layers of stars */}
          {starLayers.map(({ layerIndex, stars }) => (
            <div
              key={layerIndex}
              className="absolute inset-0"
              style={{
                animation: `starMove${layerIndex} ${20 + layerIndex * 10}s linear infinite`,
              }}
            >
              {stars.map((star, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: star.size,
                    height: star.size,
                    left: `${star.left}%`,
                    top: `${star.top}%`,
                    opacity: star.opacity,
                  }}
                  animate={{
                    opacity: [0.2, 1, 0.2],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: star.duration,
                    repeat: Infinity,
                    delay: star.delay,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          ))}
          {/* Shooting stars */}
          {shootingStars.map((star, i) => (
            <motion.div
              key={`shooting-${i}`}
              className="absolute h-px bg-gradient-to-r from-transparent via-white to-transparent"
              style={{
                width: 100,
                top: `${star.top}%`,
                left: -100,
              }}
              animate={{
                left: ["-10%", "110%"],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: star.delay,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        <style jsx>{`
          @keyframes starMove0 {
            from { transform: translateY(0); }
            to { transform: translateY(-100vh); }
          }
          @keyframes starMove1 {
            from { transform: translateY(0) translateX(0); }
            to { transform: translateY(-100vh) translateX(20px); }
          }
          @keyframes starMove2 {
            from { transform: translateY(0) translateX(0); }
            to { transform: translateY(-100vh) translateX(-20px); }
          }
        `}</style>

        {/* Subtle Gradient Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 pointer-events-none" />
        
        {/* Vignette Effect */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.5) 100%)"
          }}
        />

        {/* Fixed Content */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: contentOpacity }}
        >
          <div className="text-center z-10 px-4 max-w-5xl mx-auto">
            {/* Logo */}
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
                className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 mx-auto"
                animate={{ rotateY: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <motion.img
                  src="/logo.svg"
                  alt="AVATAR Logo"
                  className="w-full h-full object-contain"
                />
              </motion.div>
              <motion.div
                className="relative w-32 h-12 md:w-40 md:h-16 lg:w-48 lg:h-20 mx-auto mt-4"
              >
                <motion.img
                  src="/logotxt.svg"
                  alt="AVATAR Text"
                  className="w-full h-full object-contain"
                />
              </motion.div>
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
                className="btn-3d group px-6 md:px-8 py-3 md:py-4 text-white font-bold rounded-xl text-base md:text-lg flex items-center justify-center gap-2 md:gap-3 shadow-2xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                اكتشف خدماتنا
                <ArrowLeft className="w-3 h-3 md:w-4 md:h-4 group-hover:-translate-x-1 transition-transform" />
              </motion.a>
              <motion.a
                href="/contact"
                className="group btn-outline px-6 md:px-8 py-3 md:py-4 border-2 border-[#3a4a8a] text-white font-bold rounded-xl text-base md:text-lg flex items-center justify-center gap-2 md:gap-3 backdrop-blur-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                تواصل معنا
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
