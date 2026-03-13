"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { GlowCard } from "@/components/ui/glow-card";

const testimonials = [
  {
    name: "أحمد الراشد",
    designation: "المدير التنفيذي — شركة التقنية المتقدمة",
    quote:
      "تجربة استثنائية مع فريق أفتار. تحولت رؤيتنا إلى واقع ملموس بتصاميم أبهرت عملاءنا. أنصح كل شركة ناشئة بالتعامل معهم.",
    src: "https://picsum.photos/400/500?random=10",
  },
  {
    name: "سارة المنصور",
    designation: "مديرة التسويق — مجموعة النجاح",
    quote:
      "الحملة التسويقية التي نفذوها رفعت مبيعاتنا بشكل غير متوقع. احترافية عالية والتزام كامل بالمواعيد.",
    src: "https://picsum.photos/400/500?random=11",
  },
  {
    name: "محمد العتيبي",
    designation: "رائد أعمال — ستارت أب التقنية",
    quote:
      "من أفضل القرارات التي اتخذتها. الهوية البصرية التي صمموها عكست روح المشروع بشكل مثالي.",
    src: "https://picsum.photos/400/500?random=12",
  },
  {
    name: "نورة الشمري",
    designation: "مديرة العلامة التجارية — أزياء الأصالة",
    quote:
      "الفريق يفهم ما تحتاجه فعلاً. النتائج تتحدث عن نفسها — متجرنا أصبح المرجع في السوق.",
    src: "https://picsum.photos/400/500?random=13",
  },
  {
    name: "خالد الحربي",
    designation: "مدير المشاريع — مؤسسة البناء",
    quote:
      "شراكة مستمرة منذ 3 سنوات. كل مشروع معهم يحقق نجاحات جديدة. شكراً لفريق أفتار.",
    src: "https://picsum.photos/400/500?random=14",
  },
];

const stats = [
  { number: "50+", label: "عميل سعيد" },
  { number: "150+", label: "مشروع منجز" },
  { number: "98%", label: "رضا العملاء" },
  { number: "5+", label: "سنوات خبرة" },
];

export function TestimonialsSection({ showBackground = true }: { showBackground?: boolean }) {
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
    <section ref={containerRef} className="relative min-h-screen">
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
              <span className="gold-text">آراء</span> عملائنا
            </h2>
            <p className="text-white/50 text-sm">شركاء النجاح يشاركونك تجربتهم</p>
          </div>

          {/* Animated Testimonials */}
          <AnimatedTestimonials testimonials={testimonials} autoplay={true} />

          {/* Stats */}
          <div className="grid grid-cols-4 gap-3 mt-2">
            {stats.map((stat, i) => (
              <GlowCard key={i} customSize glowColor="red" className="w-full p-3 text-center">
                <div className="text-2xl md:text-3xl font-black gold-text mb-0.5">{stat.number}</div>
                <div className="text-white/50 text-xs">{stat.label}</div>
              </GlowCard>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
