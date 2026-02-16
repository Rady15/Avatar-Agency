"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";

interface IntroAnimationProps {
  onComplete: () => void;
}

const TOTAL_FRAMES = 160;
const FPS = 15;
const FADE_OUT_DURATION = 1.5;

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [currentFrame, setCurrentFrame] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const loadedFrames = useRef<Set<number>>(new Set());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const getFrameUrl = useCallback((frame: number) => {
    const frameNumber = frame.toString().padStart(3, "0");
    return `/live/ffout${frameNumber}.gif`;
  }, []);

  // Load frames in background
  useEffect(() => {
    const loadFrames = async () => {
      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = getFrameUrl(i);
        img.onload = () => {
          loadedFrames.current.add(i);
        };
        img.onerror = () => {
          loadedFrames.current.add(i);
        };
        
        // Small delay to not block UI
        if (i % 10 === 0) {
          await new Promise(resolve => setTimeout(resolve, 10));
        }
      }
    };

    loadFrames();
  }, [getFrameUrl]);

  // Animation loop
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentFrame((prev) => {
        const next = prev + 1;
        if (next > TOTAL_FRAMES) {
          // Animation complete
          setIsComplete(true);
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(() => {
              onComplete();
            }, FADE_OUT_DURATION * 1000);
          }, 500);
          return TOTAL_FRAMES;
        }
        return next;
      });
    }, 1000 / FPS);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [onComplete]);

  // Get the best frame to display
  const getDisplayFrame = useCallback(() => {
    if (loadedFrames.current.has(currentFrame)) {
      return currentFrame;
    }
    
    // Find nearest loaded frame
    for (let i = currentFrame; i >= 1; i--) {
      if (loadedFrames.current.has(i)) {
        return i;
      }
    }
    
    return 1;
  }, [currentFrame]);

  const displayFrame = getDisplayFrame();
  const progress = Math.round((currentFrame / TOTAL_FRAMES) * 100);

  return (
    <AnimatePresence>
      {!isFadingOut && (
        <motion.div
          className="fixed inset-0 z-[10000] overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_OUT_DURATION, ease: "easeInOut" }}
        >
          {/* Frame Animation Background */}
          <motion.div
            key={displayFrame}
            className="absolute inset-0"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.05 }}
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${getFrameUrl(displayFrame)})`,
                willChange: "background-image",
              }}
            />
          </motion.div>

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-[#0A1D37]/60" />

          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1D37]/50 via-transparent to-[#0A1D37]/80" />
          
          {/* Vignette */}
          <div 
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at center, transparent 30%, rgba(10, 29, 55, 0.8) 100%)"
            }}
          />

          {/* Loading Progress */}
          <motion.div 
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {/* Progress Bar */}
            <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            
            {/* Progress Text */}
            <div className="flex items-center gap-2">
              <span className="text-white/40 text-sm font-mono">
                {String(currentFrame).padStart(3, "0")} / {TOTAL_FRAMES}
              </span>
              <span className="text-white/30">|</span>
              <span className="text-primary text-sm font-bold">
                {progress}%
              </span>
            </div>

            {/* Brand Logo Small */}
            <motion.div
              className="flex items-center gap-2 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: currentFrame > 20 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <div
                className="w-8 h-8"
                style={{
                  background: "linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #B8860B 100%)",
                  clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                }}
              >
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #0A1D37 0%, #152d4a 100%)",
                    clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                    margin: "2px",
                  }}
                >
                  <span className="text-primary font-bold text-xs">A</span>
                </div>
              </div>
              <span className="text-white/60 text-sm font-bold gold-text">أفتار</span>
            </motion.div>
          </motion.div>

          {/* Skip Button */}
          <motion.button
            className="absolute top-6 right-6 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/40 text-sm hover:bg-white/10 hover:text-white/60 transition-all"
            onClick={() => {
              setIsFadingOut(true);
              setTimeout(() => onComplete(), FADE_OUT_DURATION * 1000);
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            تخطي
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
