"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface FrameScrollBackgroundProps {
  frameCount?: number;
  framePath?: string;
  frameExtension?: string;
  className?: string;
}

export function FrameScrollBackground({
  frameCount = 160,
  framePath = "/live/ffout",
  frameExtension = ".gif",
  className = "",
}: FrameScrollBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scroll progress for the entire viewport height
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Transform scroll progress to frame number
  const currentFrame = useTransform(
    scrollYProgress,
    [0, 1],
    [1, frameCount]
  );

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 w-screen h-screen overflow-hidden ${className}`}
      style={{ zIndex: 0 }}
    >
      {/* Frame Display - Updates based on scroll */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: useTransform(
            currentFrame,
            (frame) => {
              const frameNum = Math.round(frame);
              const paddedFrame = frameNum.toString().padStart(3, "0");
              return `url(${framePath}${paddedFrame}${frameExtension})`;
            }
          ),
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
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
    </div>
  );
}
