"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Eye, ExternalLink } from "lucide-react";

const portfolioItems = [
  { id: 1, title: "هوية بصرية - شركة تقنية", category: "Branding", color: "#D4AF37", year: "2024" },
  { id: 2, title: "موقع إلكتروني - متجر فاخر", category: "Web Design", color: "#1E88E5", year: "2024" },
  { id: 3, title: "ستاند معرض - قمة الأعمال", category: "Exhibition", color: "#6A1B9A", year: "2023" },
  { id: 4, title: "حملة سوشيال - مطعم", category: "Social Media", color: "#C62828", year: "2023" },
  { id: 5, title: "فيديو إعلاني - منتجعات", category: "Video Production", color: "#E65100", year: "2023" },
  { id: 6, title: "لافتات - مركز تجاري", category: "Signage", color: "#1B5E20", year: "2023" },
  { id: 7, title: "هدايا دعائية - بنك", category: "Promotional Gifts", color: "#00695C", year: "2022" },
  { id: 8, title: "حملة إعلانية - شركة ناشئة", category: "Paid Ads", color: "#D4AF37", year: "2022" },
];

const particlePositions = [
  { left: 12, top: 15, duration: 6, delay: 0.5 },
  { left: 25, top: 35, duration: 7, delay: 1.2 },
  { left: 38, top: 55, duration: 5, delay: 0.3 },
  { left: 51, top: 75, duration: 8, delay: 1.8 },
  { left: 64, top: 25, duration: 6, delay: 0.8 },
  { left: 77, top: 45, duration: 7, delay: 1.5 },
  { left: 88, top: 65, duration: 5, delay: 0.2 },
  { left: 15, top: 85, duration: 8, delay: 1.0 },
  { left: 42, top: 10, duration: 6, delay: 1.6 },
  { left: 73, top: 90, duration: 7, delay: 0.7 },
  { left: 95, top: 40, duration: 5, delay: 1.3 },
  { left: 30, top: 20, duration: 8, delay: 0.9 },
  { left: 55, top: 60, duration: 6, delay: 1.1 },
  { left: 82, top: 80, duration: 7, delay: 0.4 },
  { left: 8, top: 50, duration: 5, delay: 1.7 },
];

export function PortfolioSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-60%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <section ref={containerRef} id="portfolio" className="relative min-h-[200vh] py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1D37] via-[#0d2341] to-[#0A1D37]" />

      {/* Floating Particles */}
      {particlePositions.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/30 rounded-full"
          style={{ left: `${p.left}%`, top: `${p.top}%` }}
          animate={{ y: [0, -50, 0], opacity: [0, 1, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
        />
      ))}

      {/* Sticky Content */}
      <motion.div style={{ opacity }} className="sticky top-0 h-screen flex flex-col justify-center">
        {/* Header */}
        <div className="container mx-auto px-4 mb-12 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4"
          >
            أعمالنا
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-black"
          >
            <span className="gold-text">معرض</span> أعمالنا
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-white/50 mt-3 text-sm"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            SHOWCASE OF OUR WORK
          </motion.p>
        </div>

        {/* Filmstrip Gallery */}
        <div className="relative overflow-hidden py-6">
          {/* Film Perforations - Top */}
          <div className="absolute top-0 left-0 right-0 h-5 bg-[#111] z-10 flex items-center">
            <motion.div style={{ x }} className="flex gap-6 px-2">
              {[...Array(50)].map((_, i) => (
                <div key={i} className="w-3 h-2 bg-[#0A1D37] rounded-sm flex-shrink-0" />
              ))}
            </motion.div>
          </div>

          {/* Film Perforations - Bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-5 bg-[#111] z-10 flex items-center">
            <motion.div style={{ x }} className="flex gap-6 px-2">
              {[...Array(50)].map((_, i) => (
                <div key={i} className="w-3 h-2 bg-[#0A1D37] rounded-sm flex-shrink-0" />
              ))}
            </motion.div>
          </div>

          {/* Scrollable Content */}
          <motion.div style={{ x }} className="flex gap-6 px-8 py-4">
            {[...portfolioItems, ...portfolioItems].map((item, index) => (
              <motion.div key={`${item.id}-${index}`} className="flex-shrink-0 w-[280px] md:w-[350px]">
                <motion.div
                  className="relative h-[350px] md:h-[420px] rounded-2xl overflow-hidden group cursor-pointer"
                  style={{
                    background: `linear-gradient(135deg, ${item.color}20 0%, ${item.color}05 100%)`,
                    border: `1px solid ${item.color}30`,
                  }}
                  whileHover={{ scale: 1.03, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Placeholder Image */}
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ background: `radial-gradient(circle, ${item.color}15 0%, transparent 70%)` }}
                  >
                    <motion.div
                      className="w-20 h-20 rounded-full flex items-center justify-center"
                      style={{ background: `${item.color}20`, border: `2px solid ${item.color}40` }}
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Eye className="w-8 h-8" style={{ color: item.color }} />
                    </motion.div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1D37] via-[#0A1D37]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span
                        className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3"
                        style={{ background: `${item.color}30`, color: item.color }}
                      >
                        {item.category}
                      </span>
                      <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/40">{item.year}</span>
                        <motion.button
                          className="flex items-center gap-2 text-sm font-medium"
                          style={{ color: item.color }}
                          whileHover={{ x: -5 }}
                        >
                          عرض المشروع
                          <ExternalLink className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Frame Number */}
                  <div className="absolute top-4 right-4 text-xs font-mono" style={{ color: item.color, opacity: 0.5 }}>
                    {String(index + 1).padStart(3, "0")}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Hint */}
        <motion.div
          className="text-center mt-8 text-white/40 text-sm flex items-center justify-center gap-2"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span>اسحب للتمرير</span>
          <motion.span animate={{ x: [0, -10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            ←
          </motion.span>
        </motion.div>
      </motion.div>
    </section>
  );
}
