"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
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
    descriptionEn: "We design integrated visual identities that reflect your brand's personality",
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
    descriptionEn: "Creative content that ignites audience engagement on social platforms",
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
    descriptionEn: "Eye-catching signs that solidify your brand in customers' minds",
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
    descriptionEn: "Luxurious stands and exhibitions representing your brand beautifully",
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
    descriptionEn: "Cinematic visual content that tells your brand story creatively",
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
    descriptionEn: "Elegant, fast websites that convert visitors into loyal customers",
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
    descriptionEn: "Smart apps that provide exceptional user experiences",
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
    descriptionEn: "Precise, elegant printed materials reflecting your brand's professionalism",
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
    descriptionEn: "Custom gifts that remind customers of your brand",
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
    descriptionEn: "Targeted ad campaigns that achieve the highest ROI",
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
  const { language, t, isMounted } = useLanguage();
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

      <div className="sticky top-0 md:min-h-screen w-full flex items-center justify-center overflow-visible">
        <motion.div
          className="relative z-10 w-full h-full flex flex-col justify-center"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          {/* Header */}
          <div className="text-center pt-4 pb-2 px-4">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-2">
              <span className="text-yellow-400">{t("أعمالنا", "Our")}</span> {t("المميزة", "Featured Works")}
            </h2>
            <p className="text-white/50 text-sm">{t("اختر القسم لاستعراض أعمالنا", "Choose a category to browse our work")}</p>
          </div>

          {/* Category Tabs - Scrollable row */}
          <div className="w-full overflow-x-auto no-scrollbar px-4 py-4">
            <div className="flex gap-3 w-max mx-auto">
              {portfolioCategories.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className="flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-all duration-300 border shadow-lg hover:shadow-xl"
                    style={{
                      background: isActive 
                        ? `linear-gradient(135deg, ${cat.color}40, ${cat.color}20)` 
                        : "rgba(255,255,255,0.08)",
                      borderColor: isActive ? cat.color : "rgba(255,255,255,0.15)",
                      color: isActive ? cat.color : "rgba(255,255,255,0.7)",
                      transform: isActive ? "scale(1.08) translateY(-2px)" : "scale(1)",
                      boxShadow: isActive ? `0 8px 25px ${cat.color}30` : "0 4px 15px rgba(0,0,0,0.3)",
                    }}
                  >
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: isActive ? cat.color + "30" : "rgba(255,255,255,0.1)" }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    {language === 'ar' ? cat.label : cat.labelEn}
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
                  {language === 'ar' ? currentCategory.description : currentCategory.descriptionEn}
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

          {/* CTA Button */}
          <div className="text-center pb-6">
            <a
              href="/services"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{
                background: "linear-gradient(135deg, #D4AF37, #f59e0b)",
                color: "#0A1D37",
                boxShadow: "0 8px 30px rgba(212,175,55,0.4)",
              }}
            >
              {t("تصفح خدماتنا", "Browse Our Services")}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {language === 'ar' ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                )}
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
