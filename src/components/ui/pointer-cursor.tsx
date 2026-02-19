"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

interface PointerCursorConfig {
  size?: number;
  color?: string;
  glowColor?: string;
  glowIntensity?: number;
  showGlow?: boolean;
}

export function PointerCursor({
  size = 32,
  color = "#ffffff",
  glowColor = "#6366f1",
  glowIntensity = 20,
  showGlow = true,
}: PointerCursorConfig) {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999]"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        width: size,
        height: size,
      }}
    >
      {showGlow && (
        <div
          className="absolute inset-0 rounded-full animate-pulse"
          style={{
            background: `radial-gradient(circle, ${glowColor}40 0%, transparent 70%)`,
            filter: `blur(${glowIntensity}px)`,
            transform: "scale(1.5)",
          }}
        />
      )}
      
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-lg"
        style={{
          filter: showGlow ? `drop-shadow(0 0 ${glowIntensity / 2}px ${glowColor})` : undefined,
        }}
      >
        <path
          d="M5.65376 12.4563L4.41069 4.02874C4.23414 2.65218 6.33791 1.87604 7.22559 2.76372L12.2256 7.76372C12.9573 8.49544 12.9573 9.71827 12.2256 10.45L11.3379 11.3377C10.6062 12.0694 9.38335 12.0694 8.65163 11.3377L6.27495 8.96099L9.54907 20.7637C9.72562 22.1403 7.62185 22.9164 6.73417 22.0287L5.65376 20.9483C4.92204 20.2166 4.92204 18.9938 5.65376 18.262L5.65376 12.4563Z"
          fill={color}
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}
