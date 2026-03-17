"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion, useScroll, useTransform } from "framer-motion";
import { Layers, Target, Zap, Eye, Film, Globe, Gift, Printer, Palette, Megaphone, Users, Building2, Smartphone, PenTool, Sparkles, Monitor } from "lucide-react";

/* ─── 14 Main Services ─── */
const servicesList = [
  { id: "social", label: "إدارة السوشيال ميديا", labelEn: "Social Media Management", icon: Zap, color: "#6366f1", description: "تصميم وإدارة المحتوى على منصات التواصل الاجتماعي", descriptionEn: "Design and management of social media content" },
  { id: "webdev", label: "تطوير المواقع", labelEn: "Website Development", icon: Globe, color: "#0ea5e9", description: "تصميم وبرمجة المواقع الإلكترونية المتقدمة", descriptionEn: "Advanced website design and programming" },
  { id: "graphic", label: "الجرافيك ديزاين", labelEn: "Graphic Design", icon: Palette, color: "#D4AF37", description: "تصميم الشعارات والهوية البصرية والشعارات", descriptionEn: "Logos, visual identity and branding design" },
  { id: "digital", label: "التسويق الاكتروني", labelEn: "Digital Marketing", icon: Megaphone, color: "#ef4444", description: "الحملات التسويقية على سناب وتيك توك وجوجل", descriptionEn: "Marketing campaigns on Snapchat, TikTok and Google" },
  { id: "ads", label: "الاعلان والترويج", labelEn: "Advertising and Promotion", icon: PenTool, color: "#a855f7", description: "الحملات الاعلانية والاستراتيجية التسويقية", descriptionEn: "Advertising campaigns and marketing strategy" },
  { id: "apps", label: "تطوير التطبيقات", labelEn: "App Development", icon: Smartphone, color: "#14b8a6", description: "تطبيقات اندرويد وايفون والويب", descriptionEn: "Android, iOS and web applications" },
  { id: "print", label: "المطبوعات", labelEn: "Printed Materials", icon: Printer, color: "#8b5cf6", description: "البزنس كارت والبروشورات والبنرات", descriptionEn: "Business cards, brochures and banners" },
  { id: "signage-in", label: "اللافتات الداخلية", labelEn: "Indoor Signage", icon: Layers, color: "#22c55e", description: "لوحات التوجيه والبيوت الابيض والاوفيس", descriptionEn: "Wayfinding, light boxes and office signs" },
  { id: "signage-out", label: "اللافتات الخارجية", labelEn: "Outdoor Signage", icon: Building2, color: "#f97316", description: "اللافتات والحروف البارزة والجداريات", descriptionEn: "Signage, 3D letters and wall murals" },
  { id: "gifts", label: "الهدايا الدعائية", labelEn: "Promotional Gifts", icon: Gift, color: "#ec4899", description: "هدايا دعائية وهدايا تقنية مخصصة", descriptionEn: "Promotional and custom tech gifts" },
  { id: "exhibition", label: "خدمات المعارض", labelEn: "Exhibition Services", icon: Eye, color: "#06b6d4", description: "تصميم وتنفيذ المعارض والمؤتمرات", descriptionEn: "Exhibition and conference design and execution" },
  { id: "video", label: "انتاج الفيديو", labelEn: "Animated Videos & Video Editing", icon: Film, color: "#f43f5e", description: "فيديو ترويجي وموشن جرافيك ومونتاج", descriptionEn: "Promo videos, motion graphics and editing" },
  { id: "consulting", label: "الاستشارات التسويقية", labelEn: "Marketing Consulting Services", icon: Users, color: "#84cc16", description: "الخطة التسويقية ودراسة الجدوى والتحليل", descriptionEn: "Marketing plan, feasibility study and analysis" },
  { id: "stand", label: "تصميم الستاند", labelEn: "Stand Design", icon: Sparkles, color: "#f59e0b", description: "تصميم ستاندات ثلاثية الابعاد ومخصصة", descriptionEn: "3D and custom stand design" },
];

export function PortfolioSection({ showBackground = true }: { showBackground?: boolean }) {
  const { language, t, isMounted } = useLanguage();
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
          <div className="text-center pt-4 pb-6 px-4">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-2">
              <span className="text-yellow-400">{t("خدماتنا", "Our")}</span> {t("المتنوعة", "Services")}
            </h2>
            <p className="text-white/50 text-sm">{t("نقدم لك كل ما تحتاجه لنجاح عملك", "Everything you need for your business success")}</p>
          </div>

          {/* Services Grid - Same Style as Values */}
          <style>{`
            .services-grid {
              display: flex;
              justify-content: center;
              flex-wrap: wrap;
              gap: 16px;
              padding: 20px;
              max-width: 1200px;
              margin: 0 auto;
            }
            .service-card {
              position: relative;
              width: 160px;
              background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%);
              text-align: center;
              padding: 16px 12px;
              transform: rotate(-8deg) skew(10deg);
              transition: .4s;
              box-shadow: -6px 6px 16px rgba(0,0,0,0.3);
              backdrop-filter: blur(8px);
              border: 1px solid rgba(255,255,255,0.08);
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 8px;
              cursor: pointer;
            }
            .service-card:hover {
              transform: rotate(-8deg) skew(10deg) translate(8px,-6px);
              box-shadow: -16px 16px 28px rgba(0,0,0,0.4);
              border-color: rgba(255,255,255,0.2);
            }
            .service-card .icon-wrap {
              font-size: 26px;
              transition: .4s;
              z-index: 2;
            }
            .service-card h4 {
              font-size: 13px;
              font-weight: bold;
              color: white;
              margin: 0;
              transition: .4s;
              z-index: 2;
              line-height: 1.3;
            }
            .service-card p {
              font-size: 9px;
              color: rgba(255,255,255,0.5);
              margin: 0;
              transition: .4s;
              z-index: 2;
              line-height: 1.3;
            }
            .service-card:hover h4,
            .service-card:hover .icon-wrap {
              color: white;
            }
            .service-card:hover p {
              color: rgba(255,255,255,0.8);
            }
          `}</style>

          <div className="services-grid">
            {servicesList.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="service-card"
                >
                  <div className="icon-wrap" style={{ color: service.color }}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4>{language === 'ar' ? service.label : service.labelEn}</h4>
                  <p>{language === 'ar' ? service.description : service.descriptionEn}</p>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="text-center pb-6 mt-4">
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
