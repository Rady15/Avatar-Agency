"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface IntroAnimationProps {
  onComplete: () => void;
}

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<"intro" | "button" | "flow4">("intro");
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setCanPlay(true);
      if (phase === "intro") {
        video.play().catch(() => {
          // Autoplay blocked
        });
      }
    };

    const handleEnded = () => {
      if (phase === "intro") {
        setPhase("button");
      } else if (phase === "flow4") {
        onComplete();
      }
    };

    video.addEventListener("canplaythrough", handleCanPlay);
    video.addEventListener("ended", handleEnded);

    if (video.readyState >= 3) {
      handleCanPlay();
    }

    return () => {
      video.removeEventListener("canplaythrough", handleCanPlay);
      video.removeEventListener("ended", handleEnded);
    };
  }, [phase, onComplete]);

  // Update video source when phase changes to flow4
  useEffect(() => {
    const video = videoRef.current;
    if (video && phase === "flow4") {
      video.src = "/Flow4.mp4";
      video.load();
      video.play().catch(() => {
        // If autoplay fails, still proceed
        onComplete();
      });
    }
  }, [phase, onComplete]);

  const handleButtonClick = () => {
    setPhase("flow4");
  };

  const getVideoSrc = () => {
    if (phase === "flow4") {
      return "/Flow4.mp4";
    }
    return "/Flow.mp4";
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[10000] flex items-center justify-center bg-black"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* Video Background */}
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          key={phase} // Force re-render when phase changes
        >
          <source src={getVideoSrc()} type="video/mp4" />
        </video>

        {/* Enter Button Overlay - shown after Flow.mp4 ends */}
        <AnimatePresence>
          {phase === "button" && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                onClick={handleButtonClick}
                className="cursor-pointer"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  y: 0,
                  rotate: 360 
                }}
                transition={{ 
                  opacity: { duration: 0.5, delay: 0.2 },
                  scale: { duration: 0.5, delay: 0.2 },
                  y: { duration: 0.5, delay: 0.2 },
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <img 
                  src="/click.png" 
                  alt="اضغط للدخول" 
                  className="w-32 h-32 object-contain"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
