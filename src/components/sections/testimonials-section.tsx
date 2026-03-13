"use client";

import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { GlowCard } from "@/components/ui/glow-card";

const testimonials = [
  {
    name: "أحمد الراشد",
    nameEn: "Ahmed Al-Rashid",
    designation: "المدير التنفيذي — شركة التقنية المتقدمة",
    designationEn: "CEO — Advanced Tech Company",
    quote: "تجربة استثنائية مع فريق أفتار. تحولت رؤيتنا إلى واقع ملموس بتصاميم أبهرت عملاءنا. أنصح كل شركة ناشئة بالتعامل معهم.",
    quoteEn: "Exceptional experience with Avatar team. Our vision became a tangible reality with designs that amazed our clients. I recommend them to every startup.",
    src: "/ch1.png",
  },
  {
    name: "سارة المنصور",
    nameEn: "Sarah Al-Mansour",
    designation: "مديرة التسويق — مجموعة النجاح",
    designationEn: "Marketing Director — Al-Najm Group",
    quote: "الحملة التسويقية التي تنفيذها رفعت مبيعاتنا بشكل غير متوقع. احترافية عالية والتزام كامل بالمواعيد.",
    quoteEn: "The marketing campaign they executed increased our sales unexpectedly. High professionalism and full commitment to deadlines.",
    src: "/ch2.png",
  },
  {
    name: "محمد العتيبي",
    nameEn: "Mohammed Al-Otaibi",
    designation: "رائد أعمال — ستارت أب التقنية",
    designationEn: "Entrepreneur — Tech Startup",
    quote: "من أفضل القرارات التي اتخذتها. الهوية البصرية التي صمموها عكست روح المشروع بشكل مثالي.",
    quoteEn: "One of the best decisions I made. The visual identity they designed perfectly reflected the project's essence.",
    src: "/ch3.png",
  },
  {
    name: "نورة الشمري",
    nameEn: "Noura Al-Shammari",
    designation: "مديرة العلامة التجارية — أزياء الأصالة",
    designationEn: "Brand Manager — Asala Fashion",
    quote: "الفريق يفهم ما تحتاجه فعلاً. النتائج تتحدث عن نفسها — متجرنا أصبح المرجع في السوق.",
    quoteEn: "The team truly understands what you need. The results speak for themselves — our store became the market reference.",
    src: "/ch1.png",
  },
  {
    name: "خالد الحربي",
    nameEn: "Khaled Al-Harbi",
    designation: "مدير المشاريع — مؤسسة البناء",
    designationEn: "Projects Manager — Al-Binaa Establishment",
    quote: "شراكة مستمرة منذ 3 سنوات. كل مشروع معهم يحقق نجاحات جديدة. شكراً لفريق أفتار.",
    quoteEn: "Continuous partnership for 3 years. Every project with them achieves new successes. Thanks to Avatar team.",
    src: "/ch2.png",
  },
];

const stats = [
  { number: "50+", label: "عميل سعيد", labelEn: "Happy Clients" },
  { number: "150+", label: "مشروع منجز", labelEn: "Completed Projects" },
  { number: "98%", label: "رضا العملاء", labelEn: "Client Satisfaction" },
  { number: "5+", label: "سنوات خبرة", labelEn: "Years Experience" },
];


export function TestimonialsSection({ showBackground = true }: { showBackground?: boolean }) {
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

  const contentOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);
  const contentY = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [50, 0, 0, -50]);

  return (
    <section ref={containerRef} className="relative min-h-screen" style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}>
      {showBackground && (
        <div className="fixed inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent pointer-events-none z-0" />
      )}

      <div className="sticky top-0 min-h-screen w-full flex items-center justify-center overflow-visible">
        <motion.div
          className="w-full max-w-5xl px-4 flex flex-col gap-4"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          {/* Header */}
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-1">
              <span className="gold-text">{language === 'ar' ? 'آراء' : 'Our'}</span> {language === 'ar' ? 'عملائنا' : 'Clients'}
            </h2>
            <p className="text-white/50 text-sm">{language === 'ar' ? 'شركاء النجاح يشاركونك تجربتهم' : 'Success partners share their experience with you'}</p>
          </div>

          {/* Animated Testimonials */}
          <AnimatedTestimonials testimonials={testimonials} autoplay={true} />

          {/* Stats */}
          <div className="grid grid-cols-4 gap-3 mt-2">
            {stats.map((stat, i) => (
              <GlowCard key={i} customSize glowColor="red" className="w-full p-3 text-center">
                <div className="text-2xl md:text-3xl font-black gold-text mb-0.5">{stat.number}</div>
                <div className="text-white/50 text-xs">{language === 'ar' ? stat.label : (stat.labelEn || stat.label)}</div>
              </GlowCard>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
