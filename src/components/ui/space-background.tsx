"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

export function SpaceBackground() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const starLayers = useMemo(() => {
        if (typeof window === "undefined") return [];
        return Array.from({ length: 3 }).map((_, layerIndex) => ({
            layerIndex,
            stars: Array.from({ length: 50 }).map(() => ({
                size: Math.random() * 2 + 1,
                left: Math.random() * 100,
                top: Math.random() * 100,
                opacity: Math.random() * 0.7 + 0.3,
                duration: Math.random() * 3 + 2,
                delay: Math.random() * 5,
            })),
        }));
    }, []);

    const shootingStars = useMemo(() => {
        if (typeof window === "undefined") return [];
        return Array.from({ length: 5 }).map(() => ({
            top: Math.random() * 100,
            delay: Math.random() * 10,
        }));
    }, []);

    if (!isMounted) return null;

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Base Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/1.webp')" }}
            />

            {/* Stars Overlay */}
            <div className="absolute inset-0">
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

            <style jsx global>{`
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

            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#0A1D37]" />
            <div
                className="absolute inset-0"
                style={{
                    background: "radial-gradient(ellipse at center, transparent 30%, rgba(10, 29, 55, 0.6) 100%)"
                }}
            />
        </div>
    );
}
