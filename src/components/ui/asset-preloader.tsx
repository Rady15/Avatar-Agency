"use client";

import { useEffect, useState } from "react";
import assetsList from "@/data/assets.json";

// We exclude huge video files from automatic image preloading to avoid bandwidth hogs.
// We only preload images to browser memory.
export function AssetPreloader() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Only start preloading after the main content is fully loaded
        // to avoid blocking critical rendering.
        if (document.readyState === "complete") {
            setMounted(true);
        } else {
            window.addEventListener("load", () => setMounted(true));
            return () => window.removeEventListener("load", () => setMounted(true));
        }
    }, []);

    useEffect(() => {
        if (!mounted) return;

        // Background preloading logic
        // We process assets in chunks to avoid locking the UI thread
        const images = assetsList.filter((src) => src.match(/\.(png|jpe?g|svg|webp)$/i));

        // Chunking function
        const preloadChunk = (chunk: string[]) => {
            chunk.forEach((src) => {
                const img = new Image();
                // Since we use encodeURI in the app for Arabic paths, 
                // we should preload the encoded version
                img.src = encodeURI(src);
            });
        };

        const chunkSize = 5;
        let i = 0;

        const interval = setInterval(() => {
            if (i >= images.length) {
                clearInterval(interval);
                return;
            }
            preloadChunk(images.slice(i, i + chunkSize));
            i += chunkSize;
        }, 500); // Preload 5 images every 500ms silently

        return () => clearInterval(interval);
    }, [mounted]);

    return null; // This component doesn't render anything
}
