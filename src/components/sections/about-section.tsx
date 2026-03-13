"use client";

import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Rocket, ArrowLeft, ArrowRight, CheckCircle,
  Lightbulb, Target, Users, Award, Heart, Shield, Star
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { GlowCard } from "@/components/ui/glow-card";

const values = [
  { icon: Lightbulb, title: "الابتكار", titleEn: "Innovation", desc: "نكسر القواعد لخلق الحلول الإبداعية التي تتجاوز التوقعات", descEn: "We break the rules to create innovative solutions that exceed expectations", iconColor: "text-yellow-400" },
  { icon: Target, title: "الجودة", titleEn: "Quality", desc: "نلتزم بأعلى معايير الإتقان في كل مشروع ننفذه", descEn: "We commit to the highest standards in every project we deliver", iconColor: "text-blue-400" },
  { icon: Users, title: "الشراكة", titleEn: "Partnership", desc: "نبني علاقات طويلة الأمد مع عملائنا والشركاء", descEn: "We build long-term relationships with our clients and partners", iconColor: "text-green-400" },
  { icon: Award, title: "التميز", titleEn: "Excellence", desc: "نسعى دائماً للريادة والتفوق في كل ما نقدمه", descEn: "We always strive for leadership and excellence in everything we offer", iconColor: "text-purple-400" },
  { icon: Heart, title: "الشغف", titleEn: "Passion", desc: "نعمل بحب للعمل وشغف لتقديم ما هو أفضل", descEn: "We work with love for what we do and passion to deliver the best", iconColor: "text-rose-400" },
  { icon: Shield, title: "الموثوقية", titleEn: "Reliability", desc: "نحرص على تنفيذ مشاريعكم في الوقت المحدد وبأعلى جودة", descEn: "We ensure your projects are delivered on time with the highest quality", iconColor: "text-cyan-400" },
];

const methodology = [
  { step: "01", title: "الفهم", titleEn: "Understanding", desc: "ندرس البراند، السوق، والجمهور المستهدف بعمق لنفهم احتياجاتكم الحقيقية", descEn: "We deeply study the brand, market, and target audience to understand your real needs", icon: "📊" },
  { step: "02", title: "التخطيط", titleEn: "Planning", desc: "نضع استراتيجية واضحة مبنية على أهداف حقيقية وقابلة للقياس", descEn: "We develop a clear strategy based on real and measurable goals", icon: "📋" },
  { step: "03", title: "التنفيذ والتطوير", titleEn: "Execution & Development", desc: "نطبق الاستراتيجيات ونراقب الأداء ونطور باستمرار لتحقيق أفضل النتائج", descEn: "We implement strategies, monitor performance, and continuously develop for the best results", icon: "🚀" },
];

interface AboutSectionProps {
  showBackground?: boolean;
  fullContent?: boolean;
}

export function AboutSection({ showBackground = true, fullContent = false }: AboutSectionProps) {
  const { language, t, isMounted } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Only use scroll animations on homepage (compact mode)
  const { scrollYProgress } = fullContent ? { scrollYProgress: null } : useScroll(
    mounted
      ? {
          target: containerRef,
          offset: ["start end", "end start"],
        }
      : {}
  );

  // Only apply scroll-linked fade on homepage (compact mode)
  const contentOpacityScrolled = scrollYProgress ? useTransform(scrollYProgress, [0.05, 0.2, 0.8, 0.95], [0, 1, 1, 0]) : null;
  const contentYScrolled = scrollYProgress ? useTransform(scrollYProgress, [0.05, 0.2, 0.8, 0.95], [60, 0, 0, -60]) : null;

  if (!isMounted) {
    return <section ref={fullContent ? undefined : containerRef} className={`relative ${fullContent ? "min-h-screen" : "h-[150vh]"}`} />;
  }

  const highlights = [
    t("فريق متخصص من الخبراء", "A specialized team of experts"),
    t("أكثر من 150 مشروع منجز", "Over 150 completed projects"),
    t("خبرة تمتد لأكثر من 5 سنوات", "Over 5 years of experience"),
    t("98% نسبة رضا العملاء", "98% client satisfaction rate"),
  ];

  // On fullContent (/about page): normal flow layout, no sticky effect
  if (fullContent) {
    return (
      <section className="relative py-20">
        {showBackground && (
          <div className="fixed inset-0 z-0 w-full h-full overflow-hidden pointer-events-none">
            <video autoPlay muted playsInline preload="auto" className="w-full h-full object-cover">
              <source src="/Flow2.mp4" type="video/mp4" />
            </video>
          </div>
        )}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-10 space-y-16">
          {/* TWO-COLUMN: Logo + Description */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* LEFT — Logo */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400/30 to-orange-500/30 blur-3xl scale-125" />
                <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-black/30 backdrop-blur-md flex items-center justify-center">
                  <img src="/LOGO/White-logo_01.png" alt="Avatar Agency Logo" className="w-52 h-52 object-contain drop-shadow-2xl" />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black text-sm shadow-xl whitespace-nowrap">
                  {t("وكالة إعلانية متكاملة", "Full-Service Ad Agency")}
                </div>
              </div>
            </div>

            {/* RIGHT — Description */}
            <div className="flex flex-col gap-5 text-right">
              <div>
                <p className="text-white/50 text-sm font-semibold tracking-widest uppercase mb-2">{t("تعرف علينا", "Get to know us")}</p>
                <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                  {t("من", "About")} <span className="gold-text">{t("نحن", "Us")}</span>
                </h2>
              </div>
              <p className="text-lg text-white/80 leading-relaxed">
                {t("نجاحنا بدأ بخطوات صغيرة على مسار طويل، مرافق بحب للعمل وشغف لتقديم ما هو أفضل لكم. نقدم أفضل الخدمات تحت إشراف نخبة من الخبراء المختصين في العديد من المجالات.",
                  "Our success began with small steps on a long journey, accompanied by love for work and passion to deliver the best. We offer the finest services under elite specialists.")}
              </p>
              <div className="p-4 rounded-2xl bg-gradient-to-r from-yellow-400/10 to-orange-500/10 border border-yellow-400/20">
                <div className="flex items-center gap-3 mb-2 justify-end">
                  <span className="text-white font-bold">{t("رسالتنا", "Our Mission")}</span>
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <Rocket className="w-5 h-5 text-white" />
                  </div>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  {t("تمكين العلامات التجارية من تحقيق نمو مستدام عبر حلول دعائية وتسويقية متكاملة.",
                    "Enabling brands to achieve sustainable growth through integrated marketing solutions.")}
                </p>
              </div>
              <ul className="flex flex-col gap-2">
                {highlights.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 justify-end">
                    <span className="text-white/80 text-sm">{item}</span>
                    <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Methodology */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h3 className="text-3xl font-bold text-white text-center mb-8">
              {t("منهجيتنا", "Our Methodology")} <span className="gold-text">{t("في العمل", "in Work")}</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {methodology.map((item) => (
                <div key={item.step} className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center group hover:border-yellow-400/30 transition-all">
                  <div className="absolute -top-3 right-1/2 translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-sm font-black">{item.step}</div>
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h4 className="text-xl font-bold text-white mb-2">{language === "ar" ? item.title : item.titleEn}</h4>
                  <p className="text-white/70 text-sm leading-relaxed">{language === "ar" ? item.desc : item.descEn}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Values — Coverflow Carousel */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h3 className="text-3xl font-bold text-white text-center mb-8">
              {t("قيمنا التي", "Our Values that")} <span className="gold-text">{t("تميزنا", "Distinguish Us")}</span>
            </h3>

            <style>{`
              .values-swiper {
                width: 100%;
                padding-bottom: 40px !important;
                padding-top: 16px !important;
              }
              .values-swiper .swiper-slide {
                width: 220px;
                height: 280px;
                border-radius: 20px;
              }
              .values-swiper .swiper-3d .swiper-slide-shadow-left {
                background-image: linear-gradient(to left, rgba(0,0,0,0.4), rgba(0,0,0,0));
              }
              .values-swiper .swiper-3d .swiper-slide-shadow-right {
                background-image: linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0));
              }
            `}</style>

            <Swiper
              className="values-swiper"
              spaceBetween={20}
              autoplay={{ delay: 2200, disableOnInteraction: false }}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              loop={true}
              slidesPerView="auto"
              coverflowEffect={{ rotate: 0, stretch: 0, depth: 120, modifier: 2.5, slideShadows: true }}
              modules={[EffectCoverflow, Autoplay]}
            >
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <SwiperSlide key={value.title}>
                    <GlowCard customSize glowColor="purple" className="w-full h-full flex flex-col items-center justify-center gap-4 p-6">
                      <div className={`w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center ${value.iconColor}`} style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <div className="text-center">
                        <h4 className="text-xl font-black text-white mb-2">{language === "ar" ? value.title : value.titleEn}</h4>
                        <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>{language === "ar" ? value.titleEn : value.title}</p>
                      </div>
                      <p className="text-white/65 text-xs text-center leading-relaxed">
                        {language === "ar" ? value.desc : value.descEn}
                      </p>
                    </GlowCard>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </motion.div>

          {/* Headquarters */}
          <GlowCard customSize glowColor="green" className="w-full p-6 text-center">
            <div className="flex items-center justify-center gap-2 text-white/70 mb-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="font-bold">{t("مقرنا الرئيسي", "Our Headquarters")}</span>
            </div>
            <p className="text-xl text-white font-bold">{t("المملكة العربية السعودية", "Kingdom of Saudi Arabia")}</p>
            <p className="text-white/50 text-sm">{t("الرياض", "Riyadh")}</p>
          </GlowCard>
        </div>
      </section>
    );
  }

  const sectionHeight = "h-[100vh]";

  return (
    <section ref={containerRef} className={`relative ${sectionHeight}`}>
      {showBackground && (
        <div className="fixed inset-0 z-0 w-full h-full overflow-hidden pointer-events-none">
          <video autoPlay muted playsInline preload="auto" className="w-full h-full object-cover">
            <source src="/Flow2.mp4" type="video/mp4" />
          </video>
        </div>
      )}

      {/* ── STICKY viewport ── */}
      <div className="sticky top-0 min-h-screen w-full flex items-center justify-center overflow-visible">
        <motion.div
          className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-10 py-10"
          style={{ opacity: contentOpacityScrolled ?? 1, y: contentYScrolled ?? 0 }}
        >
          {/* ── TWO-COLUMN: Logo (left) + Description (right) ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">

            {/* LEFT — Logo */}
            <motion.div
              className="flex flex-col items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400/30 to-orange-500/30 blur-3xl scale-125" />
                <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-black/30 backdrop-blur-md flex items-center justify-center">
                  <img
                    src="/LOGO/White-logo_01.png"
                    alt="Avatar Agency Logo"
                    className="w-52 h-52 object-contain drop-shadow-2xl"
                  />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black text-sm shadow-xl whitespace-nowrap">
                  {t("وكالة إعلانية متكاملة", "Full-Service Ad Agency")}
                </div>
              </div>
            </motion.div>

            {/* RIGHT — Description */}
            <motion.div
              className="flex flex-col gap-5 text-right"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            >
              <div>
                <p className="text-white/50 text-sm font-semibold tracking-widest uppercase mb-2">
                  {t("تعرف علينا", "Get to know us")}
                </p>
                <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                  {t("من", "About")} <span className="gold-text">{t("نحن", "Us")}</span>
                </h2>
              </div>

              <p className="text-lg text-white/80 leading-relaxed">
                {t(
                  "نجاحنا بدأ بخطوات صغيرة على مسار طويل، مرافق بحب للعمل وشغف لتقديم ما هو أفضل لكم. نقدم أفضل الخدمات تحت إشراف نخبة من الخبراء المختصين في العديد من المجالات.",
                  "Our success began with small steps on a long journey, accompanied by love for work and a passion for delivering the best. We offer the finest services under elite specialists."
                )}
              </p>

              {/* Mission */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-yellow-400/10 to-orange-500/10 border border-yellow-400/20 backdrop-blur-md">
                <div className="flex items-center gap-3 mb-2 justify-end">
                  <span className="text-white font-bold text-base">{t("رسالتنا", "Our Mission")}</span>
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <Rocket className="w-5 h-5 text-white" />
                  </div>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  {t(
                    "تمكين العلامات التجارية من تحقيق نمو مستدام عبر حلول دعائية وتسويقية متكاملة.",
                    "Enabling brands to achieve sustainable growth through integrated marketing solutions."
                  )}
                </p>
              </div>

              {/* Highlights */}
              <ul className="flex flex-col gap-2">
                {highlights.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 justify-end">
                    <span className="text-white/80 text-sm">{item}</span>
                    <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  </li>
                ))}
              </ul>

              {/* CTA — only show on homepage (not fullContent) */}
              {!fullContent && (
                <div className="flex justify-end">
                  <a
                    href="/about"
                    className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-2xl font-bold text-base transition-all duration-300 hover:opacity-90"
                    style={{
                      background: "linear-gradient(135deg, #D4AF37, #f59e0b)",
                      color: "#0A1D37",
                      boxShadow: "0 4px 20px rgba(212,175,55,0.3)",
                    }}
                  >
                    {t("المزيد عنا", "More About Us")}
                    {language === "ar" ? (
                      <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                    ) : (
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    )}
                  </a>
                </div>
              )}
            </motion.div>
          </div>

          {/* ── FULL CONTENT (only on /about page) ── */}
          {fullContent && (
            <div className="space-y-16">
              {/* Methodology */}
              <div>
                <h3 className="text-3xl font-bold text-white text-center mb-8">
                  {t("منهجيتنا", "Our Methodology")} <span className="gold-text">{t("في العمل", "in Work")}</span>
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {methodology.map((item) => (
                    <div
                      key={item.step}
                      className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center group hover:border-yellow-400/30 transition-all"
                    >
                      <div className="absolute -top-3 right-1/2 translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-sm font-black">
                        {item.step}
                      </div>
                      <div className="text-4xl mb-4">{item.icon}</div>
                      <h4 className="text-xl font-bold text-white mb-2">{language === "ar" ? item.title : item.titleEn}</h4>
                      <p className="text-white/70 text-sm leading-relaxed">
                        {language === "ar" ? item.desc : item.descEn}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Values */}
              <div>
                <h3 className="text-3xl font-bold text-white text-center mb-8">
                  {t("قيمنا التي", "Our Values that")} <span className="gold-text">{t("تميزنا", "Distinguish Us")}</span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {values.map((value) => (
                    <div
                      key={value.title}
                      className="p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-center hover:border-white/20 transition-all group"
                    >
                      <div className={`w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform ${value.iconColor}`}>
                        <value.icon className="w-6 h-6" />
                      </div>
                      <h4 className="font-bold text-white text-sm mb-1">{language === "ar" ? value.title : value.titleEn}</h4>
                      <p className="text-white/60 text-xs leading-relaxed">
                        {language === "ar" ? value.desc : value.descEn}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Headquarters */}
              <div className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
                <div className="flex items-center justify-center gap-2 text-white/70 mb-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="font-bold">{t("مقرنا الرئيسي", "Our Headquarters")}</span>
                </div>
                <p className="text-xl text-white font-bold">{t("المملكة العربية السعودية", "Kingdom of Saudi Arabia")}</p>
                <p className="text-white/50 text-sm">{t("الرياض", "Riyadh")}</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
