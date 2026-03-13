"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Layers, Target, Zap, Eye, ExternalLink, X, Film, Globe, Gift, Printer } from "lucide-react";
import { CardCarousel } from "@/components/ui/card-carousel";

/* ─── Portfolio Categories with Real Images ─── */
const portfolioCategories = [
  {
    id: "branding",
    label: "الهوية البصرية",
    labelEn: "Branding",
    icon: Target,
    color: "#D4AF37",
    description: "نصمم هويات بصرية متكاملة تعكس شخصية علامتك التجارية",
    images: Array.from({ length: 20 }, (_, i) => ({
      src: `/assets/${encodeURIComponent("الهوية البصرية")}/protfolio/${i + 1}.png`,
      alt: `هوية بصرية ${i + 1}`,
    })),
  },
  {
    id: "social",
    label: "السوشيال ميديا",
    labelEn: "Social Media",
    icon: Zap,
    color: "#6366f1",
    description: "محتوى إبداعي يشعل تفاعل جمهورك على منصات التواصل",
    images: Array.from({ length: 3 }, (_, i) => ({
      src: `/assets/${encodeURIComponent("السوشيال ميديا")}/portfolio/${i + 1}.jpg`,
      alt: `سوشيال ميديا ${i + 1}`,
    })),
  },
  {
    id: "signage",
    label: "اللافتات",
    labelEn: "Signage",
    icon: Layers,
    color: "#22c55e",
    description: "لافتات تجذب الأنظار وتُثبّت علامتك في ذهن العميل",
    images: Array.from({ length: 6 }, (_, i) => ({
      src: `/assets/${encodeURIComponent("اللافتات")}/portfolio/${i + 1}.png`,
      alt: `لافتة ${i + 1}`,
    })),
  },
  {
    id: "exhibitions",
    label: "المعارض",
    labelEn: "Exhibitions",
    icon: Eye,
    color: "#ec4899",
    description: "ستاندات ومعارض فاخرة تمثل علامتك بأبهى صورة",
    images: Array.from({ length: 7 }, (_, i) => ({
      src: `/assets/${encodeURIComponent("المعارض")}/portfolio/${i + 1}.png`,
      alt: `معرض ${i + 1}`,
    })),
  },
  {
    id: "video",
    label: "إنتاج الفيديو",
    labelEn: "Video Production",
    icon: Film,
    color: "#f97316",
    description: "محتوى مرئي سينمائي يحكي قصة علامتك بإبداع",
    images: [
      { src: `/assets/${encodeURIComponent("انتاج الفديو")}/protfolio/1.jpg`, alt: "إنتاج فيديو 1" },
      { src: `/assets/${encodeURIComponent("انتاج الفديو")}/protfolio/2.jpg`, alt: "إنتاج فيديو 2" },
      { src: `/assets/${encodeURIComponent("انتاج الفديو")}/protfolio/3.png`, alt: "إنتاج فيديو 3" },
    ],
  },
  {
    id: "webdesign",
    label: "تصميم المواقع",
    labelEn: "Web Design",
    icon: Globe,
    color: "#8b5cf6",
    description: "مواقع أنيقة وسريعة تحوّل الزوار إلى عملاء دائمين",
    images: [
      { src: `/assets/${encodeURIComponent("تصميم المواقع")}/protfolio/1.jpg`, alt: "موقع 1" },
      { src: `/assets/${encodeURIComponent("تصميم المواقع")}/protfolio/2.jpg`, alt: "موقع 2" },
      { src: `/assets/${encodeURIComponent("تصميم المواقع")}/protfolio/3.jpg`, alt: "موقع 3" },
      { src: `/assets/${encodeURIComponent("تصميم المواقع")}/protfolio/4.png`, alt: "موقع 4" },
      { src: `/assets/${encodeURIComponent("تصميم المواقع")}/protfolio/5.png`, alt: "موقع 5" },
    ],
  },
  {
    id: "apps",
    label: "تطبيقات الجوال",
    labelEn: "Mobile Apps",
    icon: ExternalLink,
    color: "#0ea5e9",
    description: "تطبيقات ذكية توفر تجربة مستخدم استثنائية",
    images: Array.from({ length: 6 }, (_, i) => ({
      src: `/assets/${encodeURIComponent("تطبيقات")}/protfolio/${i + 1}.jpg`,
      alt: `تطبيق ${i + 1}`,
    })),
  },
  {
    id: "print",
    label: "المطبوعات",
    labelEn: "Printed Materials",
    icon: Printer,
    color: "#14b8a6",
    description: "مطبوعات دقيقة وراقية تعكس احترافية علامتك التجارية",
    images: Array.from({ length: 12 }, (_, i) => ({
      src: `/assets/${encodeURIComponent("مطبوعات")}/protfolio/${i + 1}.png`,
      alt: `مطبوعات ${i + 1}`,
    })),
  },
  {
    id: "gifts",
    label: "الهدايا الدعائية",
    labelEn: "Promo Gifts",
    icon: Gift,
    color: "#f43f5e",
    description: "هدايا مخصصة تُذكّر عملاءك بعلامتك التجارية",
    images: Array.from({ length: 4 }, (_, i) => ({
      src: `/assets/${encodeURIComponent("هدايا")}/protfolio/${i + 1}.png`,
      alt: `هدية ${i + 1}`,
    })),
  },
  {
    id: "ads",
    label: "إعلانات ممولة",
    labelEn: "Paid Ads",
    icon: Zap,
    color: "#a855f7",
    description: "حملات إعلانية مستهدفة تحقق أعلى عائد على الاستثمار",
    images: [
      { src: `/assets/${encodeURIComponent("اعلانت ممولة")}/portfolio/1.jpg`, alt: "إعلان 1" },
      { src: `/assets/${encodeURIComponent("اعلانت ممولة")}/portfolio/2.jpg`, alt: "إعلان 2" },
      { src: `/assets/${encodeURIComponent("اعلانت ممولة")}/portfolio/3.jpg`, alt: "إعلان 3" },
      { src: `/assets/${encodeURIComponent("اعلانت ممولة")}/portfolio/4.jpg`, alt: "إعلان 4" },
      { src: `/assets/${encodeURIComponent("اعلانت ممولة")}/portfolio/4.png`, alt: "إعلان 5" },
    ],
  },
];

export function PortfolioSection({ showBackground = true }: { showBackground?: boolean }) {
  const [activeCategory, setActiveCategory] = useState("branding");
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll(
    mounted
      ? {
          target: containerRef,
          offset: ["start end", "end start"],
        }
      : {}
  );

  const contentOpacity = useTransform(scrollYProgress, [0.05, 0.2, 0.8, 0.95], [0, 1, 1, 0]);
  const contentY = useTransform(scrollYProgress, [0.05, 0.2, 0.8, 0.95], [60, 0, 0, -60]);

  const currentCategory = portfolioCategories.find((c) => c.id === activeCategory)!;

  return (
    <section ref={containerRef} id="portfolio" className="relative min-h-screen">
      {showBackground && (
        <div className="fixed inset-0 bg-gradient-to-b from-[#0A1D37] via-[#0d2341] to-[#0A1D37] z-0 pointer-events-none" />
      )}

      <div className="sticky top-0 min-h-screen w-full flex items-center justify-center overflow-visible">
        <motion.div
          className="relative z-10 w-full h-full flex flex-col justify-center"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          {/* Header */}
          <div className="text-center pt-4 pb-2 px-4">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-2">
              <span className="gold-text">أعمالنا</span> المميزة
            </h2>
            <p className="text-white/50 text-sm">اختر القسم لاستعراض أعمالنا</p>
          </div>

          {/* Category Tabs - Scrollable row */}
          <div className="w-full overflow-x-auto no-scrollbar px-4 py-3">
            <div className="flex gap-2 w-max mx-auto">
              {portfolioCategories.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-300 border"
                    style={{
                      background: isActive ? cat.color + "33" : "rgba(255,255,255,0.05)",
                      borderColor: isActive ? cat.color : "rgba(255,255,255,0.1)",
                      color: isActive ? cat.color : "rgba(255,255,255,0.6)",
                      transform: isActive ? "scale(1.05)" : "scale(1)",
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Carousel Area */}
          <div className="flex-1 w-full overflow-hidden px-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="h-full flex flex-col items-center justify-center"
              >
                {/* Description */}
                <p
                  className="text-center text-sm mb-4 font-medium"
                  style={{ color: currentCategory.color }}
                >
                  {currentCategory.description}
                </p>

                {/* Carousel */}
                <div className="w-full max-w-5xl mx-auto">
                  <CardCarousel
                    images={currentCategory.images}
                    autoplayDelay={2000}
                    showPagination={true}
                    showNavigation={false}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
