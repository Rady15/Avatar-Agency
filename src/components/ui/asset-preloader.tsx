"use client";

import { useEffect, useState } from "react";

const criticalAssets = [
    "/LOGO/White-logo_01.png",
    "/LOGO/Blue-logo_01.png",
    "/assets/استشارات/1.png",
    "/assets/اعلانت ممولة/1.png",
    "/assets/السوشيال ميديا/1.png",
    "/assets/اللافتات/1.png",
    "/assets/المعارض/1.png",
    "/assets/الهوية البصرية/1.png",
    "/assets/انتاج الفديو/1.png",
    "/assets/تصميم المواقع/1.png",
    "/assets/تطبيقات/1.png",
    "/assets/مطبوعات/1.png",
    "/assets/هدايا/1.png",
];

export function AssetPreloader() {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let loadedCount = 0;
        const totalCritical = criticalAssets.length;

        const preloadCritical = () => {
            criticalAssets.forEach((src) => {
                const img = new Image();
                img.src = encodeURI(src);

                img.onload = () => {
                    loadedCount++;
                    setProgress(Math.round((loadedCount / totalCritical) * 100));
                    if (loadedCount >= totalCritical) {
                        setTimeout(() => setLoading(false), 300);
                    }
                };

                img.onerror = () => {
                    loadedCount++;
                    setProgress(Math.round((loadedCount / totalCritical) * 100));
                    if (loadedCount >= totalCritical) {
                        setTimeout(() => setLoading(false), 300);
                    }
                };
            });
        };

        if (document.readyState === "complete") {
            preloadCritical();
        } else {
            window.addEventListener("load", preloadCritical);
            return () => window.removeEventListener("load", preloadCritical);
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
