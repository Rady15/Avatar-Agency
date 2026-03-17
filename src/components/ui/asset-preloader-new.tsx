"use client";

import { useEffect, useState } from "react";

const criticalAssets = [
  "/LOGO/White-logo_01.png",
  "/LOGO/Blue-logo_01.png",
  "/manager.png",
  "/manager2.png",
  "/ch1.png",
  "/ch2.png",
  "/ch3.png",
  "/Flow2.mp4",
  "/1.webp",
  "/1_png.png",
  "/2_png.png",
  // Partners
  "/assets/p1.png",
  "/assets/p2.png",
  "/assets/p3.png",
];

export function AssetPreloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const preloadAll = () => {
      let loadedCount = 0;
      const totalCritical = criticalAssets.length;

      criticalAssets.forEach((src) => {
        const isVideo = src.endsWith('.mp4');
        
        if (isVideo) {
          const video = document.createElement('video');
          video.preload = 'auto';
          video.src = src;
          video.onloadeddata = () => {
            loadedCount++;
            setProgress(Math.round((loadedCount / totalCritical) * 100));
            if (loadedCount >= totalCritical) {
              setTimeout(() => setLoading(false), 500);
            }
          };
          video.onerror = () => {
            loadedCount++;
            setProgress(Math.round((loadedCount / totalCritical) * 100));
            if (loadedCount >= totalCritical) {
              setTimeout(() => setLoading(false), 500);
            }
          };
        } else {
          const img = new Image();
          img.src = src;
          
          img.onload = () => {
            loadedCount++;
            setProgress(Math.round((loadedCount / totalCritical) * 100));
            if (loadedCount >= totalCritical) {
              setTimeout(() => setLoading(false), 500);
            }
          };
          
          img.onerror = () => {
            loadedCount++;
            setProgress(Math.round((loadedCount / totalCritical) * 100));
            if (loadedCount >= totalCritical) {
              setTimeout(() => setLoading(false), 500);
            }
          };
        }
      });
    };

    if (document.readyState === "complete") {
      preloadAll();
    } else {
      window.addEventListener("load", preloadAll);
      return () => window.removeEventListener("load", preloadAll);
    }
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black gap-4">
      <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#D4AF37] transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
