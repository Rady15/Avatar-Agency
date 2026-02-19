"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star, ExternalLink } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "أحمد الراشد",
    role: "المدير التنفيذي",
    company: "شركة التقنية المتقدمة",
    content: "تجربة استثنائية مع فريق أفتار. تحولت رؤيتنا إلى واقع ملموس بتصاميم ابهرت عملاءنا. أنصح كل شركة ناشئة بالتعامل معهم.",
    rating: 5,
    avatar: "https://picsum.photos/200/200?random=10",
  },
  {
    id: 2,
    name: "سارة المنصور",
    role: "مديرة التسويق",
    company: "مجموعة النجاح",
    content: "الحملة التسويقية التي نفذوها رفعت مبيعاتنا بشكل غير متوقع. احترافية عالية والتزام كامل بالمواعيد.",
    rating: 5,
    avatar: "https://picsum.photos/200/200?random=11",
  },
  {
    id: 3,
    name: "محمد العتيبي",
    role: "رائد أعمال",
    company: "ستارت أب التقنية",
    content: "من أفضل القرارات التي اتخذتها. الهوية البصرية التي صمموها عكست روح المشروع بشكل مثالي.",
    rating: 5,
    avatar: "https://picsum.photos/200/200?random=12",
  },
  {
    id: 4,
    name: "نورة الشمري",
    role: "مديرة العلامة التجارية",
    company: "أزياء الأصالة",
    content: "الفريق يفهم ما تحتاجه فعلاً. النتائج تتحدث عن نفسها - متجرنا أصبح المرجع في السوق.",
    rating: 5,
    avatar: "https://picsum.photos/200/200?random=13",
  },
  {
    id: 5,
    name: "خالد الحربي",
    role: "مدير المشاريع",
    company: "مؤسسة البناء",
    content: "شراكة مستمرة منذ 3 سنوات. كل مشروع معهم يحقق نجاحات جديدة. شكراً لفريق أفتار.",
    rating: 5,
    avatar: "https://picsum.photos/200/200?random=14",
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent pointer-events-none" />

      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            <span className="gold-text">آراء</span> عملائنا
          </h2>
          <p className="text-white/60">شركاء النجاح يشاركونك تجربتهم</p>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12">
                <Quote className="absolute top-6 right-6 w-16 h-16 text-white/10" />
                
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden ring-4 ring-white/20 shadow-2xl">
                        <img
                          src={current.avatar}
                          alt={current.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                        <Star className="w-5 h-5 text-white fill-white" />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: current.rating }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    <blockquote className="text-lg md:text-xl text-white/90 leading-relaxed mb-6">
                      "{current.content}"
                    </blockquote>

                    <div className="flex items-center gap-4">
                      <div>
                        <h4 className="text-white font-bold text-lg">{current.name}</h4>
                        <p className="text-white/60">{current.role}</p>
                      </div>
                      <div className="h-8 w-px bg-white/20" />
                      <div className="flex items-center gap-2 text-white/40">
                        <span className="text-sm">{current.company}</span>
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prevTestimonial}
              className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:border-white/40 transition-all group"
            >
              <ChevronRight className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-gradient-to-r from-yellow-400 to-orange-500"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:border-white/40 transition-all group"
            >
              <ChevronLeft className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { number: "50+", label: "عميل سعيد" },
            { number: "150+", label: "مشروع منجز" },
            { number: "98%", label: "رضا العملاء" },
            { number: "5+", label: "سنوات خبرة" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-4 rounded-2xl bg-white/5 border border-white/10"
            >
              <div className="text-3xl md:text-4xl font-black gold-text mb-1">{stat.number}</div>
              <div className="text-white/50 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
