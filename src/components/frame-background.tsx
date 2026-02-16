"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback, useRef } from "react";

interface FrameBackgroundProps {
  frameCount?: number;
  framePath?: string;
  frameExtension?: string;
  fps?: number;
  className?: string;
}

export function FrameBackground({
  frameCount = 160,
  framePath = "/live/ffout",
  frameExtension = ".gif",
  fps = 10,
  className = "",
}: FrameBackgroundProps) {
  const [currentFrame, setCurrentFrame] = useState(1);
  const [loadedFrames, setLoadedFrames] = useState<Set<number>>(new Set());
  const [isReady, setIsReady] = useState(false);
  const frameCache = useRef<Map<number, HTMLImageElement>>(new Map());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Get frame URL
  const getFrameUrl = useCallback((frame: number) => {
    const frameNumber = frame.toString().padStart(3, "0");
    return `${framePath}${frameNumber}${frameExtension}`;
  }, [framePath, frameExtension]);

  // Load a single frame
  const loadFrame = useCallback((frameNumber: number): Promise<void> => {
    return new Promise((resolve) => {
      if (frameCache.current.has(frameNumber)) {
        resolve();
        return;
      }

      const img = new Image();
      img.src = getFrameUrl(frameNumber);
      
      img.onload = () => {
        frameCache.current.set(frameNumber, img);
        setLoadedFrames(prev => new Set(prev).add(frameNumber));
        resolve();
      };
      
      img.onerror = () => {
        // Even on error, mark as "loaded" to continue
        setLoadedFrames(prev => new Set(prev).add(frameNumber));
        resolve();
      };
    });
  }, [getFrameUrl]);

  // Start with first few frames immediately
  useEffect(() => {
    const init = async () => {
      // Load first 5 frames immediately for instant display
      await Promise.all(
        Array.from({ length: Math.min(5, frameCount) }, (_, i) => 
          loadFrame(i + 1)
        )
      );
      
      setIsReady(true);
      
      // Continue loading remaining frames in background
      const loadRemaining = async () => {
        for (let i = 6; i <= frameCount; i++) {
          await loadFrame(i);
        }
      };
      loadRemaining();
    };

    init();
  }, [frameCount, loadFrame]);

  // Frame animation loop
  useEffect(() => {
    if (!isReady) return;

    intervalRef.current = setInterval(() => {
      setCurrentFrame((prev) => {
        const next = prev + 1;
        return next > frameCount ? 1 : next;
      });
    }, 1000 / fps);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isReady, frameCount, fps]);

  // Skip to next loaded frame if current not loaded
  const getDisplayFrame = useCallback(() => {
    if (loadedFrames.has(currentFrame)) {
      return currentFrame;
    }
    
    // Find previous loaded frame
    for (let i = currentFrame - 1; i >= 1; i--) {
      if (loadedFrames.has(i)) {
        return i;
      }
    }
    
    // Find any loaded frame
    for (let i = 1; i <= frameCount; i++) {
      if (loadedFrames.has(i)) {
        return i;
      }
    }
    
    return 1;
  }, [currentFrame, loadedFrames, frameCount]);

  const displayFrame = getDisplayFrame();

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Frame Animation - Shows Immediately */}
      <AnimatePresence mode="sync">
        <motion.div
          key={displayFrame}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.03, ease: "linear" }}
        >
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${getFrameUrl(displayFrame)})`,
              willChange: "background-image",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1D37]/40 via-transparent to-[#0A1D37]/70 pointer-events-none" />
      
      {/* Vignette Effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, rgba(10, 29, 55, 0.4) 100%)"
        }}
      />
      
      {/* Noise Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle Loading Indicator (optional, bottom right) */}
      {loadedFrames.size < frameCount && (
        <motion.div 
          className="absolute bottom-4 right-4 z-50 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <div className="w-4 h-4 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
          <span className="text-xs text-white/50">
            {Math.round((loadedFrames.size / frameCount) * 100)}%
          </span>
        </motion.div>
      )}
    </div>
  );
}
