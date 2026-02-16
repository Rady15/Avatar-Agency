"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Lightbulb, Target, Users, Award, Sparkles } from "lucide-react";

const values = [
  { icon: Lightbulb, title: "الابتكار", titleEn: "Innovation", desc: "نحول الأفكار إلى واقع ملموس" },
  { icon: Target, title: "الجودة", titleEn: "Quality", desc: "نلتزم بأعلى معايير الإتقان" },
  { icon: Users, title: "الشراكة", titleEn: "Partnership", desc: "نبني علاقات طويلة الأمد" },
  { icon: Award, title: "التميز", titleEn: "Excellence", desc: "نسعى دائماً للريادة" },
];

const geometricData = [
  { left: 10, top: 20, duration: 10 },
  { left: 22, top: 50, duration: 12 },
  { left: 34, top: 80, duration: 11 },
  { left: 46, top: 30, duration: 13 },
  { left: 58, top: 60, duration: 10 },
  { left: 70, top: 40, duration: 12 },
  { left: 82, top: 70, duration: 11 },
  { left: 94, top: 25, duration: 13 },
];

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.9, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [10, 0]);

  return (
    <section ref={containerRef} id="about" className="relative min-h-[250vh] py-20">
      {/* Background */}
      <div className="absolute inset-0 gradient-mesh" />

      {/* Floating Geometric Shapes */}
      {geometricData.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${shape.left}%`, top: `${shape.top}%` }}
          animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
          transition={{ duration: shape.duration, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-8 h-8 border border-primary/20" style={{ transform: `rotate(${i * 45}deg)` }} />
        </motion.div>
      ))}

      {/* Sticky Content */}
      <motion.div style={{ opacity }} className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* 3D Statue */}
            <motion.div style={{ y, rotateX }} className="relative preserve-3d perspective-container order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotateY: -30 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                viewport={{ once: true }}
                className="relative mx-auto max-w-lg"
              >
                {/* Base Platform */}
                <motion.div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  <div
                    className="w-64 h-12 rounded-t-3xl"
                    style={{
                      background: "linear-gradient(180deg, #D4AF37 0%, #8B6914 100%)",
                      boxShadow: "0 10px 40px rgba(212, 175, 55, 0.3)",
                    }}
                  />
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-6 rounded-full"
                    style={{
                      background: "linear-gradient(180deg, rgba(212, 175, 55, 0.3) 0%, transparent 100%)",
                    }}
                  />
                </motion.div>

                {/* David Statue Concept */}
                <motion.div
                  className="relative z-10 pt-16"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <motion.div
                    className="relative mx-auto w-48 h-56 md:w-64 md:h-72"
                    style={{ perspective: "1000px" }}
                  >
                    <motion.div
                      className="absolute -inset-8 rounded-full"
                      style={{
                        background: "radial-gradient(circle, rgba(30, 136, 229, 0.2) 0%, transparent 70%)",
                      }}
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />

                    <div
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(180deg, #1E88E5 0%, #1565C0 50%, #0D47A1 100%)",
                        borderRadius: "45% 45% 50% 50%",
                        boxShadow: "inset -10px -10px 30px rgba(0,0,0,0.3), inset 10px 10px 30px rgba(255,255,255,0.1)",
                      }}
                    />

                    <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
                      <div className="flex gap-12 mb-6">
                        <motion.div
                          className="w-4 h-4 rounded-full bg-white/90"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        />
                        <motion.div
                          className="w-4 h-4 rounded-full bg-white/90"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 3, repeat: Infinity, delay: 0.1 }}
                        />
                      </div>
                      <div className="w-3 h-8 rounded-full bg-[#1565C0]" />
                      <div className="w-8 h-1 rounded-full bg-white/40 mt-4" />
                    </div>

                    <motion.div
                      className="absolute top-16 left-1/2 -translate-x-1/2 w-56 h-14 md:w-72 md:h-16"
                      style={{
                        background: "linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #B8860B 100%)",
                        borderRadius: "30px",
                        boxShadow: "0 0 30px rgba(212, 175, 55, 0.4)",
                      }}
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(212, 175, 55, 0.3)",
                          "0 0 40px rgba(212, 175, 55, 0.6)",
                          "0 0 20px rgba(212, 175, 55, 0.3)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div
                        className="absolute inset-2 rounded-2xl"
                        style={{
                          background: "linear-gradient(135deg, #0A1D37 0%, #152d4a 100%)",
                        }}
                      >
                        <motion.div
                          className="absolute left-0 right-0 h-0.5 bg-primary/50"
                          animate={{ top: ["10%", "90%", "10%"] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </div>
                    </motion.div>

                    {[Sparkles, Lightbulb, Target].map((Icon, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-10 h-10 rounded-lg bg-primary/20 backdrop-blur-sm flex items-center justify-center"
                        style={{
                          left: i === 0 ? "10%" : i === 1 ? "85%" : "50%",
                          top: i === 2 ? "0%" : `${30 + i * 20}%`,
                        }}
                        animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
                        transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
                      >
                        <Icon className="w-5 h-5 text-primary" />
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Content */}
            <motion.div style={{ y }} className="order-1 lg:order-2 text-center lg:text-right">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
                  من نحن؟
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight"
              >
                <span className="gold-text">أفتار</span> للدعاية والإعلان
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="text-lg md:text-xl text-white/70 leading-relaxed mb-6"
              >
                وكالة إبداعية متكاملة نجمع بين الفن والتقنية لنقدم حلولاً إعلانية
                متميزة. نؤمن بأن الابتكار يبدأ بكسر القواعد التقليدية.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
                className="text-base text-white/50 leading-relaxed mb-10"
              >
                منذ تأسيسنا، عملنا مع عشرات الشركات والمؤسسات في المملكة العربية
                السعودية لتحويل رؤيتهم إلى واقع ملموس.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="group p-5 rounded-2xl bg-secondary/30 border border-primary/10 hover:border-primary/30 transition-all"
                    whileHover={{ y: -5 }}
                  >
                    <value.icon className="w-8 h-8 text-primary mb-3" />
                    <h3 className="font-bold text-white text-lg mb-1">{value.title}</h3>
                    <p className="text-xs text-white/40 mb-2" style={{ fontFamily: "var(--font-geist-sans)" }}>
                      {value.titleEn}
                    </p>
                    <p className="text-sm text-white/60">{value.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
