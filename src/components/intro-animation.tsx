"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export const IntroAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 5200);

    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch(() => {});
    }

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden z-[9999]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 4.7, duration: 0.8 }}
    >
      {/* SOUND */}
      <audio ref={audioRef} src="/space-intro.mp3" />

      {/* PARALLAX STARS */}
      <div className="absolute inset-0">
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] bg-white rounded-full"
            style={{
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0.3],
              scale: [0.5, 1.5, 1],
              y: [-20, 20],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* CAMERA ZOOM GLOW */}
      <motion.div
        className="absolute w-[700px] h-[700px] bg-blue-500/20 blur-[180px] rounded-full"
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1.4, opacity: 1 }}
        transition={{ duration: 3 }}
      />

      {/* ASTRONAUT FLYING */}
      <motion.img
        src="/1_png.png"
        alt="astronaut"
        className="absolute w-[240px] drop-shadow-[0_0_60px_rgba(255,255,255,0.3)]"
        initial={{
          x: -900,
          y: 180,
          rotate: -40,
          scale: 0.4,
          opacity: 0,
        }}
        animate={{
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 2.4,
          ease: "easeOut",
        }}
      />

      {/* THRUSTER FLAME */}
      <motion.div
        className="absolute w-[120px] h-[120px] bg-blue-400/50 blur-3xl rounded-full"
        initial={{
          x: -920,
          y: 200,
          scale: 0.5,
        }}
        animate={{
          x: -120,
          y: 40,
          scale: [0.8, 1.4, 1],
        }}
        transition={{
          duration: 2.4,
        }}
      />

      {/* LOGO TEXT */}
      <motion.h1
        className="text-white text-5xl md:text-7xl font-bold tracking-widest"
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 2.2,
          duration: 1,
        }}
      >
        EXPLORE SPACE
      </motion.h1>

      {/* LIGHT SWEEP */}
      <motion.div
        className="absolute w-[120vw] h-[2px] bg-gradient-to-r from-transparent via-white to-transparent"
        initial={{ x: "-120vw" }}
        animate={{ x: "120vw" }}
        transition={{
          delay: 2,
          duration: 1.5,
        }}
      />
    </motion.div>
  );
};
