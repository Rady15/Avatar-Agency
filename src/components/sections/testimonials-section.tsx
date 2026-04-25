"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";
import { GlowCard } from "@/components/ui/glow-card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "أحمد الراشد",
    nameEn: "Ahmed Al-Rashid",
    designation: "المدير التنفيذي — شركة التقنية المتقدمة",
    designationEn: "CEO — Advanced Tech Company",
    quote: "تجربة استثنائية مع فريق أفتار. تحولت رؤيتنا إلى واقع ملموس بتصاميم أبهرت عملاءنا. أنصح كل شركة ناشئة بالتعامل معهم.",
    quoteEn: "Exceptional experience with Avatar team. Our vision became a tangible reality with designs that amazed our clients. I recommend them to every startup.",
  },
  {
    name: "سارة المنصور",
    nameEn: "Sarah Al-Mansour",
    designation: "مديرة التسويق — مجموعة النجاح",
    designationEn: "Marketing Director — Al-Najm Group",
    quote: "الحملة التسويقية التي تنفيذها رفعت مبيعاتنا بشكل غير متوقع. احترافية عالية والتزام كامل بالمواعيد.",
    quoteEn: "The marketing campaign they executed increased our sales unexpectedly. High professionalism and full commitment to deadlines.",
  },
  {
    name: "محمد العتيبي",
    nameEn: "Mohammed Al-Otaibi",
    designation: "رائد أعمال — ستارت أب التقنية",
    designationEn: "Entrepreneur — Tech Startup",
    quote: "من أفضل القرارات التي اتخذتها. الهوية البصرية التي صمموها عكست روح المشروع بشكل مثالي.",
    quoteEn: "One of the best decisions I made. The visual identity they designed perfectly reflected the project's essence.",
  },
  {
    name: "نورة الشمري",
    nameEn: "Noura Al-Shammari",
    designation: "مديرة العلامة التجارية — أزياء الأصالة",
    designationEn: "Brand Manager — Asala Fashion",
    quote: "الفريق يفهم ما تحتاجه فعلاً. النتائج تتحدث عن نفسها — متجرنا أصبح المرجع في السوق.",
    quoteEn: "The team truly understands what you need. The results speak for themselves — our store became the market reference.",
  },
  {
    name: "خالد الحربي",
    nameEn: "Khaled Al-Harbi",
    designation: "مدير المشاريع — مؤسسة البناء",
    designationEn: "Projects Manager — Al-Binaa Establishment",
    quote: "شراكة مستمرة منذ 3 سنوات. كل مشروع معهم يحقق نجاحات جديدة. شكراً لفريق أفتار.",
    quoteEn: "Continuous partnership for 3 years. Every project with them achieves new successes. Thanks to Avatar team.",
  },
];

const stats = [
  { number: "50+", label: "عميل سعيد", labelEn: "Happy Clients" },
  { number: "150+", label: "مشروع منجز", labelEn: "Completed Projects" },
  { number: "98%", label: "رضا العملاء", labelEn: "Client Satisfaction" },
  { number: "5+", label: "سنوات خبرة", labelEn: "Years Experience" },
];

const TestimonialCard = ({ testimonial, language }: { testimonial: typeof testimonials[0], language: string }) => {
  return (
    <div className="flex-shrink-0 w-[350px] p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 mx-4 relative overflow-hidden group hover:border-yellow-400/30 transition-all duration-300">
      <div className="absolute -top-4 -right-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Quote className="w-24 h-24 text-yellow-400 rotate-180" />
      </div>
      
      <div className="relative z-10">
        <div className="mb-4">
          <Quote className="w-8 h-8 text-yellow-400 mb-2" />
        </div>
        
        <p className="text-white/80 text-sm leading-relaxed mb-6 italic min-h-[80px]">
          "{language === 'ar' ? testimonial.quote : testimonial.quoteEn}"
        </p>
        
        <div className="mt-auto">
          <h4 className="text-white font-bold text-base">{language === 'ar' ? testimonial.name : testimonial.nameEn}</h4>
          <p className="text-yellow-400/70 text-xs mt-1">{language === 'ar' ? testimonial.designation : testimonial.designationEn}</p>
        </div>
      </div>
    </div>
  );
};

export function TestimonialsSection({ showBackground = true }: { showBackground?: boolean }) {
  const { language, t, isMounted } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Infinite scroll logic
  const [baseVelocity, setBaseVelocity] = useState(-0.5); // Direction and speed
  const x = useMotionValue(0);
  
  // Triple the list for a seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  useEffect(() => {
    setMounted(true);
  }, []);

  useAnimationFrame((t, delta) => {
    let moveBy = baseVelocity * (delta / 16); // adjust for frame rate
    x.set(x.get() + moveBy);
    
    // Reset to start when we've scrolled one full set
    // total width of one set is testimonials.length * (cardWidth + margin)
    const cardWidth = 350 + 32; // card + horizontal margins
    const totalSetWidth = testimonials.length * cardWidth;
    
    if (x.get() <= -totalSetWidth) {
      x.set(0);
    }
  });

  if (!isMounted) return null;

  return (
    <section id="testimonials" ref={containerRef} className="relative min-h-[80vh] py-20 overflow-hidden z-10 w-full" style={{ direction: 'ltr' }}>
      {showBackground && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent pointer-events-none z-0" />
      )}

      <div className="w-full relative z-10 px-0">
        {/* Header */}
        <motion.div 
          className="text-center mb-16 w-full px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            <span className="text-yellow-400">{language === 'ar' ? 'آراء' : 'Clients'}</span> {language === 'ar' ? 'عملائنا' : 'Testimonials'}
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">{language === 'ar' ? 'شركاء النجاح يشاركونك تجربتهم مع أفتار' : 'Our success partners share their experience with Avatar'}</p>
        </motion.div>

        {/* Marquee Slider */}
        <div 
          className="relative w-full overflow-hidden py-10"
          onMouseEnter={() => setBaseVelocity(-0.2)}
          onMouseLeave={() => setBaseVelocity(-0.5)}
        >
          <motion.div 
            className="flex flex-nowrap"
            style={{ x }}
          >
            {duplicatedTestimonials.map((testimonial, idx) => (
              <TestimonialCard 
                key={`${idx}-${testimonial.nameEn}`} 
                testimonial={testimonial} 
                language={language} 
              />
            ))}
          </motion.div>
          
          {/* Gradient Overlays for smooth edges */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
        </div>

        {/* Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {stats.map((stat, i) => (
            <GlowCard key={i} customSize glowColor="red" className="w-full p-6 text-center">
              <div className="text-3xl md:text-4xl font-black text-yellow-400 mb-1">{stat.number}</div>
              <div className="text-white/50 text-sm">{language === 'ar' ? stat.label : (stat.labelEn || stat.label)}</div>
            </GlowCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
