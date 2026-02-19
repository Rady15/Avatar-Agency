"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, ExternalLink, X, ArrowUpRight, Layers, Zap, Target } from "lucide-react";

interface PortfolioItem {
  id: number;
  title: string;
  titleEn: string;
  category: string;
  categoryEn: string;
  description: string;
  year: string;
  image: string;
  tags: string[];
  color: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "هوية بصرية - شركة التقنية",
    titleEn: "Tech Company Branding",
    category: "الهوية البصرية",
    categoryEn: "Branding",
    description: "تصميم هوية بصرية متكاملة لشركة تقنية سعودية رائدة في مجال الحلول الرقمية.",
    year: "2024",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
    tags: ["شعار", "هوية متكاملة", "تصميم جرافيك"],
    color: "#6366f1",
  },
  {
    id: 2,
    title: "متجر إلكتروني فاخر",
    titleEn: "Luxury E-Commerce",
    category: "تصميم المواقع",
    categoryEn: "Web Design",
    description: "متجر إلكتروني متكامل مع نظام دفع وأvernment وإدارة مخزون متقدم.",
    year: "2024",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    tags: ["تجارة إلكترونية", "UI/UX", "تطوير"],
    color: "#8b5cf6",
  },
  {
    id: 3,
    title: "ستاند معرض قمة الأعمال",
    titleEn: "Business Summit Booth",
    category: "المعارض",
    categoryEn: "Exhibitions",
    description: "تصميم وتنفيذ ستاند احترافي لمعرض قمة الأعمال الدولي.",
    year: "2024",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    tags: ["ستاند", "تصميم", "تنفيذ"],
    color: "#ec4899",
  },
  {
    id: 4,
    title: "حملة سوشيال ميديا",
    titleEn: "Social Media Campaign",
    category: "السوشيال ميديا",
    categoryEn: "Social Media",
    description: "حملة تسويقية شاملة على منصات التواصل الاجتماعي.",
    year: "2024",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
    tags: ["تسويق", "محتوى", "إعلانات"],
    color: "#f43f5e",
  },
  {
    id: 5,
    title: "فيديو إعلاني لمنتجعات",
    titleEn: "Resort Commercial",
    category: "إنتاج الفيديو",
    categoryEn: "Video Production",
    description: "إنتاج فيديو ترويجي سينمائي لمنتجع سياحي فاخر.",
    year: "2023",
    image: "https://images.unsplash.com/photo-1573052905904-34ad8c27f0cc?w=800&h=600&fit=crop",
    tags: ["فيديو", "سينمائي", "ترويج"],
    color: "#f97316",
  },
  {
    id: 6,
    title: "لافتات مركز تجاري",
    titleEn: "Mall Signage",
    category: "اللافتات",
    categoryEn: "Signage",
    description: "تصميم وتنفيذ لافتات خارجية وداخلية لمركز تجاري.",
    year: "2023",
    image: "https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=800&h=600&fit=crop",
    tags: ["لافتات", "خارجية", "داخلية"],
    color: "#22c55e",
  },
  {
    id: 7,
    title: "هدايا دعائية للبنك",
    titleEn: "Bank Promotional Gifts",
    category: "الهدايا الدعائية",
    categoryEn: "Promo Gifts",
    description: "تصميم وإنتاج مجموعة هدايا مخصصة لموظفي بنك.",
    year: "2023",
    image: "https://images.unsplash.com/photo-1606156889509-1c30d639a4b1?w=800&h=600&fit=crop",
    tags: ["هدايا", "شركات", "تخصيص"],
    color: "#14b8a6",
  },
  {
    id: 8,
    title: "حملة إعلانية - شركة ناشئة",
    titleEn: "Startup Ads Campaign",
    category: "الحملات الإعلانية",
    categoryEn: "Paid Ads",
    description: "حملة إعلانية متكاملة لإطلاق شركة ناشئة في قطاع التقنية.",
    year: "2023",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    tags: ["إعلانات", "جوجل", "تسويق"],
    color: "#0ea5e9",
  },
  {
    id: 9,
    title: "منصة تعليمية",
    titleEn: "E-Learning Platform",
    category: "تصميم المواقع",
    categoryEn: "Web Design",
    description: "منصة تعليمية تفاعلية مع نظام إدارة محتوى متقدم.",
    year: "2023",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop",
    tags: ["تعليم", "منصة", "تفاعلي"],
    color: "#a855f7",
  },
];

const categories = [
  { id: "all", label: "الكل", icon: Layers },
  { id: "Branding", label: "الهوية البصرية", icon: Target },
  { id: "Web Design", label: "تصميم المواقع", icon: Zap },
  { id: "Social Media", label: "السوشيال ميديا", icon: Eye },
  { id: "Exhibitions", label: "المعارض", icon: ExternalLink },
];

export function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  const filteredItems =
    activeCategory === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.categoryEn === activeCategory);

  return (
    <section id="portfolio" className="relative min-h-screen py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1D37] via-[#0d2341] to-[#0A1D37]" />

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4">
            معرض أعمالنا
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
            <span className="gold-text">أعمالنا</span> المميزة
          </h2>
          <p className="text-white/50">نقدم حلولاً إبداعية تتجاوز التوقعات</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
              </button>
            );
          })}
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <motion.div
                  className="group relative h-[320px] rounded-2xl overflow-hidden cursor-pointer"
                  whileHover={{ y: -8 }}
                  onClick={() => setSelectedProject(item)}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1D37] via-[#0A1D37]/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  <div className="absolute top-4 right-4">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
                      style={{ background: `${item.color}30`, color: item.color }}
                    >
                      {item.category}
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                    <p className="text-white/60 text-sm mb-3 line-clamp-2">{item.description}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-white/40 text-xs">{item.year}</span>
                      <motion.div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ background: item.color }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <ArrowUpRight className="w-5 h-5 text-white" />
                      </motion.div>
                    </div>
                  </div>

                  <motion.div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `${item.color}20`, backdropFilter: "blur(4px)" }}
                  >
                    <motion.button
                      className="px-6 py-3 rounded-full font-bold flex items-center gap-2"
                      style={{ background: item.color, color: "#fff" }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Eye className="w-5 h-5" />
                      عرض المشروع
                    </motion.button>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <motion.button
            className="px-8 py-4 rounded-full font-bold text-lg bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg shadow-primary/25"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            عرض جميع المشاريع
          </motion.button>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-4xl w-full bg-[#0A1D37] rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-[300px] md:h-[400px]">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1D37] via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 right-6">
                  <span
                    className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-3"
                    style={{ background: `${selectedProject.color}30`, color: selectedProject.color }}
                  >
                    {selectedProject.category}
                  </span>
                  <h3 className="text-white text-2xl md:text-3xl font-bold">{selectedProject.title}</h3>
                  <p className="text-white/60">{selectedProject.titleEn}</p>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <p className="text-white/80 text-lg leading-relaxed mb-6">
                  {selectedProject.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-sm bg-white/10 text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <div className="flex items-center gap-2 text-white/50">
                    <span className="text-sm">{selectedProject.year}</span>
                  </div>
                  <motion.button
                    className="flex items-center gap-2 px-6 py-3 rounded-full font-bold"
                    style={{ background: selectedProject.color }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="w-5 h-5" />
                    تفاصيل المشروع
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
