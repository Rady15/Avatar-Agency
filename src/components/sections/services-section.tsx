"use client";

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import {
  Globe, Palette, MessageCircle, Video, Megaphone, Monitor, Building2, Gift, Users, ArrowUpLeft,
  ExternalLink, Eye, Calendar, CheckCircle
} from "lucide-react";

// Enhanced services with real portfolio data
const services = [
  {
    id: 1, 
    icon: Globe, 
    title: "تصميم المواقع", 
    titleEn: "Web Design",
    description: "نصمم ونطور مواقع ويب احترافية ومتجاوبة تعكس هوية علامتك التجارية وتوفر تجربة مستخدم استثنائية تميزك عن المنافسين.",
    cta: "اطلب الخدمة", 
    bg: "#C62828", 
    bgExpanded: "linear-gradient(180deg, #C62828 0%, #7f1818 100%)", 
    accent: "#FFD4D4",
    portfolio: [
      { id: 1, title: "موقع شركة التقنية المتقدمة", year: "2024", description: "تصميم موقع احترافي لشركة تقنية سعودية متخصصة في الحلول الرقمية", image: "🌐", tags: ["تصميم UI/UX", "تطوير", "متجاوب"] },
      { id: 2, title: "متجر إلكتروني فاخر", year: "2024", description: "متجر إلكتروني متكامل مع نظام دفع وإدارة مخزون متقدم", image: "🛍️", tags: ["تجارة إلكترونية", "دفع إلكتروني"] },
      { id: 3, title: "منصة تعليمية تفاعلية", year: "2023", description: "منصة تعليمية مع نظام إدارة محتوى ودروس تفاعلية", image: "📚", tags: ["تعليم", "تفاعلي"] },
      { id: 4, title: "موقع مطعم سلسلة مطاعم", year: "2023", description: "موقع عرضي مع نظام حجز طاولات وطلبات أونلاين", image: "🍽️", tags: ["حجز", "عرضي"] },
    ]
  },
  {
    id: 2, 
    icon: Palette, 
    title: "الهوية البصرية", 
    titleEn: "Branding",
    description: "نبني هويات بصرية متكاملة ومتميزة تعكس قيم علامتك التجارية وتترك انطباعاً لا يُنسى لدى جمهورك المستهدف.",
    cta: "اطلب الخدمة", 
    bg: "#D4AF37", 
    bgExpanded: "linear-gradient(180deg, #D4AF37 0%, #9a7d1e 100%)", 
    accent: "#0A1D37",
    portfolio: [
      { id: 1, title: "هوية شركة عقارية فاخرة", year: "2024", description: "تصميم شعار وهوية بصرية كاملة لشركة عقارية راقية", image: "🏢", tags: ["شعار", "هوية متكاملة"] },
      { id: 2, title: "هوية مطعم عصري", year: "2024", description: "هوية بصرية متكاملة تشمل الشعار والقائمة والتغليف", image: "🎨", tags: ["مطاعم", "تغليف"] },
      { id: 3, title: "هوية علامة تجارية ناشئة", year: "2023", description: "بناء هوية بصرية لعلامة تجارية في مجال التجميل", image: "💄", tags: ["تجميل", "عصري"] },
      { id: 4, title: "هوية مؤسسة مالية", year: "2023", description: "تصميم هوية رسمية لمؤسسة مالية واستثمارية", image: "💼", tags: ["مالية", "رسمي"] },
    ]
  },
  {
    id: 3, 
    icon: MessageCircle, 
    title: "السوشيال ميديا", 
    titleEn: "Social Media",
    description: "ندير حساباتك على منصات التواصل الاجتماعي باحترافية ونزيد من تفاعل جمهورك مع محتوى إبداعي متميز ومدروس.",
    cta: "اطلب الخدمة", 
    bg: "#1565C0", 
    bgExpanded: "linear-gradient(180deg, #1565C0 0%, #0d3f7a 100%)", 
    accent: "#B3E5FC",
    portfolio: [
      { id: 1, title: "إدارة حساب مطعم شهير", year: "2024", description: "إدارة شاملة لحسابات التواصل الاجتماعي مع محتوى يومي", image: "📱", tags: ["إدارة", "محتوى"] },
      { id: 2, title: "حملة تسويقية لمتجر", year: "2024", description: "حملة تسويقية متكاملة على إنستغرام وتويتر", image: "📢", tags: ["حملات", "إعلانات"] },
      { id: 3, title: "محتوى شركة تقنية", year: "2023", description: "إنشاء محتوى تعليمي وتثقيفي لشركة تقنية", image: "💻", tags: ["تعليمي", "تثقيفي"] },
      { id: 4, title: "حملة إطلاق منتج", year: "2023", description: "حملة إطلاق منتج جديد مع influencers", image: "🚀", tags: ["إطلاق", "تعاون"] },
    ]
  },
  {
    id: 4, 
    icon: Video, 
    title: "إنتاج الفيديو", 
    titleEn: "Video Production",
    description: "ننتج فيديوهات إعلانية وترويجية احترافية تصل رسالتك بأسلوب سينمائي مؤثر يخطف الأنظار ويحقق النتائج.",
    cta: "اطلب الخدمة", 
    bg: "#6A1B9A", 
    bgExpanded: "linear-gradient(180deg, #6A1B9A 0%, #40105c 100%)", 
    accent: "#E1BEE7",
    portfolio: [
      { id: 1, title: "فيديو إعلاني لمنتجع سياحي", year: "2024", description: "إنتاج فيديو ترويجي بأسلوب سينمائي لمنتجع فاخر", image: "🎬", tags: ["سينمائي", "سياحة"] },
      { id: 2, title: "فيديو موشن جرافيك", year: "2024", description: "فيديو موشن جرافيك لشرح خدمات شركة", image: "🎥", tags: ["موشن", "جرافيك"] },
      { id: 3, title: "فيديو تدريبي للموظفين", year: "2023", description: "إنتاج فيديوهات تدريبية احترافية لشركة كبرى", image: "🎓", tags: ["تدريبي", "شركات"] },
      { id: 4, title: "فيديو إعلان تلفزيوني", year: "2023", description: "إنتاج إعلان تلفزيوني 30 ثانية لمنتج استهلاكي", image: "📺", tags: ["تلفزيون", "إعلان"] },
    ]
  },
  {
    id: 5, 
    icon: Megaphone, 
    title: "الحملات الإعلانية", 
    titleEn: "Paid Ads",
    description: "نصمم وندير حملات إعلانية مدفوعة فعّالة على جميع المنصات الرقمية لتحقيق أهدافك التسويقية بأفضل عائد.",
    cta: "اطلب الخدمة", 
    bg: "#E65100", 
    bgExpanded: "linear-gradient(180deg, #E65100 0%, #8c3200 100%)", 
    accent: "#FFE0B2",
    portfolio: [
      { id: 1, title: "حملة Google Ads متكاملة", year: "2024", description: "إدارة حملة إعلانية على جوجل أدز لمتجر إلكتروني", image: "🔍", tags: ["Google Ads", "تسويق"] },
      { id: 2, title: "حملة فيسبوك وإنستغرام", year: "2024", description: "حملة استهداف متقدمة على فيسبوك وإنستغرام", image: "👥", tags: ["Meta Ads", "استهداف"] },
      { id: 3, title: "حملة سناب شات", year: "2023", description: "إعلانات سناب شات للفئة العمرية الشابة", image: "👻", tags: ["Snapchat", "شباب"] },
      { id: 4, title: "حملة تيك توك", year: "2023", description: "حملة إعلانية على تيك توك لعلامة تجارية", image: "🎵", tags: ["TikTok", "فيروسي"] },
    ]
  },
  {
    id: 6, 
    icon: Monitor, 
    title: "اللافتات", 
    titleEn: "Signage",
    description: "نصمم وننفذ لافتات داخلية وخارجية مميزة تجذب الأنظار وتعزز حضور علامتك التجارية في كل مكان.",
    cta: "اطلب الخدمة", 
    bg: "#1B5E20", 
    bgExpanded: "linear-gradient(180deg, #1B5E20 0%, #103812 100%)", 
    accent: "#C8E6C9",
    portfolio: [
      { id: 1, title: "لافتات مركز تجاري", year: "2024", description: "تصميم وتنفيذ لافتات خارجية لمركز تجاري كبير", image: "🏪", tags: ["خارجية", "كبيرة"] },
      { id: 2, title: "لافتات سلسلة مطاعم", year: "2024", description: "لافتات موحدة لعدة فروع لمطعم مشهور", image: "🍔", tags: ["موحدة", "فروع"] },
      { id: 3, title: "لافتات داخلية مكتب", year: "2023", description: "لافتات داخلية وتوجيهية لمقر شركة", image: "🏢", tags: ["داخلية", "توجيهية"] },
      { id: 4, title: "لوحة LED خارجية", year: "2023", description: "لوحة LED ضخمة لعرض إعلانات على الطريق السريع", image: "💡", tags: ["LED", "رقمية"] },
    ]
  },
  {
    id: 7, 
    icon: Building2, 
    title: "المعارض", 
    titleEn: "Exhibitions",
    description: "نصمم وننفذ ستاندات معارض احترافية تجذب الزوار وتعرض منتجاتك وخدماتك بأفضل شكل ممكن.",
    cta: "اطلب الخدمة", 
    bg: "#00695C", 
    bgExpanded: "linear-gradient(180deg, #00695C 0%, #003d34 100%)", 
    accent: "#B2DFDB",
    portfolio: [
      { id: 1, title: "ستاند معرض ريادة الأعمال", year: "2024", description: "تصميم وتنفيذ ستاند احترافي لشركة ناشئة", image: "🎯", tags: ["ستاند", "احترافي"] },
      { id: 2, title: "جناح شركة تقنية", year: "2024", description: "جناح متكامل لشركة تقنية في معرض دولي", image: "🏛️", tags: ["جناح", "دولي"] },
      { id: 3, title: "بوث منتجع سياحي", year: "2023", description: "بوث تفاعلي لمنتجع في معرض سياحة", image: "✈️", tags: ["تفاعلي", "سياحة"] },
      { id: 4, title: "ستاند معرض عقارات", year: "2023", description: "ستاند لعرض مشاريع عقارية في معرض", image: "🏘️", tags: ["عقارات", "عرض"] },
    ]
  },
  {
    id: 8, 
    icon: Gift, 
    title: "الهدايا الدعائية", 
    titleEn: "Promo Gifts",
    description: "نوفر هدايا دعائية إبداعية ومخصصة تعزز ولاء العملاء وتزيد من انتشار وتأثير علامتك التجارية.",
    cta: "اطلب الخدمة", 
    bg: "#37474F", 
    bgExpanded: "linear-gradient(180deg, #37474F 0%, #1a2328 100%)", 
    accent: "#CFD8DC",
    portfolio: [
      { id: 1, title: "مجموعة هدايا بنك", year: "2024", description: "تصميم وإنتاج هدايا مخصصة لموظفي بنك", image: "🏦", tags: ["شركات", "موظفين"] },
      { id: 2, title: "هدايا مؤتمر تقني", year: "2024", description: "حقائب وهدايا لحضور مؤتمر تقني دولي", image: "🎒", tags: ["مؤتمرات", "دولية"] },
      { id: 3, title: "هدايا تسويقية لمتجر", year: "2023", description: "أكواب ودفاتر وقلم بشعار المتجر", image: "☕", tags: ["متاجر", "يومية"] },
      { id: 4, title: "هدايا VIP لعملاء", year: "2023", description: "مجموعة هدايا فاخرة لعملاء VIP", image: "🎁", tags: ["VIP", "فاخرة"] },
    ]
  },
  {
    id: 9, 
    icon: Users, 
    title: "الاستشارات", 
    titleEn: "Consulting",
    description: "نقدم استشارات تسويقية متخصصة لمساعدك في تطوير استراتيجيتك التسويقية وتحقيق أهدافك التجارية.",
    cta: "اطلب الخدمة", 
    bg: "#0A1D37", 
    bgExpanded: "linear-gradient(180deg, #0A1D37 0%, #050e1b 100%)", 
    accent: "#D4AF37",
    portfolio: [
      { id: 1, title: "استشارة لشركة ناشئة", year: "2024", description: "خطة تسويقية متكاملة لإطلاق منتج جديد", image: "📊", tags: ["خطة", "إطلاق"] },
      { id: 2, title: "تحليل سوق لعلامة تجارية", year: "2024", description: "دراسة سوق وتحليل منافسين لدخول السوق", image: "📈", tags: ["تحليل", "سوق"] },
      { id: 3, title: "استراتيجية تحول رقمي", year: "2023", description: "خطة تحول رقمي لشركة تقليدية", image: "🔄", tags: ["رقمي", "تحول"] },
      { id: 4, title: "ورشة تدريبية تسويقية", year: "2023", description: "ورشة تدريبية لفريق تسويق شركة كبرى", image: "👨‍🏫", tags: ["تدريب", "ورش"] },
    ]
  },
];

interface StretchRipple {
  id: number;
  panelIndex: number;
  side: "left" | "right";
  yPercent: number;
  color: string;
}

let rippleCounter = 0;

export function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [expandedService, setExpandedService] = useState<number | null>(null);
  const [ripples, setRipples] = useState<StretchRipple[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback((index: number) => {
    if (expandedService === null) {
      setActiveIndex(index);
    }
  }, [expandedService]);

  const handleMouseLeave = useCallback(
    (index: number, e: React.MouseEvent<HTMLDivElement>) => {
      if (expandedService !== null) return;
      
      const rect = e.currentTarget.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const distLeft = Math.abs(mouseX - rect.left);
      const distRight = Math.abs(mouseX - rect.right);
      const exitedLeft = distLeft < distRight;
      const side: "left" | "right" = exitedLeft ? "left" : "right";
      const yPercent = ((mouseY - rect.top) / rect.height) * 100;
      const neighborIndex = exitedLeft ? index - 1 : index + 1;

      if (neighborIndex >= 0 && neighborIndex < services.length) {
        const newRipple: StretchRipple = {
          id: rippleCounter++,
          panelIndex: neighborIndex,
          side: exitedLeft ? "right" : "left",
          yPercent: Math.max(5, Math.min(95, yPercent)),
          color: services[index].bg,
        };

        setRipples((prev) => [...prev, newRipple]);
        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
        }, 800);
      }
    },
    [expandedService]
  );

  const handleSectionLeave = useCallback(() => {
    if (expandedService === null) {
      setActiveIndex(null);
    }
  }, [expandedService]);

  const handleServiceClick = useCallback((index: number) => {
    setExpandedService(expandedService === index ? null : index);
    setActiveIndex(expandedService === index ? null : index);
  }, [expandedService]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full h-screen overflow-hidden flex"
      style={{ direction: "ltr" }}
      onMouseLeave={handleSectionLeave}
    >
      {services.map((service, index) => {
        const isActive = activeIndex === index;
        const hasActive = activeIndex !== null;
        const IconComponent = service.icon;
        const isGold = service.bg === "#D4AF37";
        const textColor = isGold && isActive ? "#0A1D37" : "#FFFFFF";
        const panelRipples = ripples.filter((r) => r.panelIndex === index);

        return (
          <PanelWithGlow
            key={service.id}
            service={service}
            index={index}
            isActive={isActive}
            isExpanded={expandedService === index}
            hasActive={hasActive}
            panelRipples={panelRipples}
            IconComponent={IconComponent}
            textColor={textColor}
            totalServices={services.length}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={(e) => handleMouseLeave(index, e)}
            onClick={() => handleServiceClick(index)}
          />
        );
      })}
    </section>
  );
}

interface PanelWithGlowProps {
  service: (typeof services)[number];
  index: number;
  isActive: boolean;
  isExpanded: boolean;
  hasActive: boolean;
  panelRipples: StretchRipple[];
  IconComponent: React.ComponentType<{ className?: string; style?: React.CSSProperties; strokeWidth?: number }>;
  textColor: string;
  totalServices: number;
  onMouseEnter: () => void;
  onMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => void;
  onClick: () => void;
}

function PanelWithGlow({
  service, index, isActive, isExpanded, hasActive, panelRipples, IconComponent, textColor, totalServices,
  onMouseEnter, onMouseLeave, onClick,
}: PanelWithGlowProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { stiffness: 200, damping: 30, mass: 0.5 });
  const glowY = useSpring(mouseY, { stiffness: 200, damping: 30, mass: 0.5 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = panelRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  const handleEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = panelRef.current?.getBoundingClientRect();
      if (rect) {
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
      setIsHovering(true);
      onMouseEnter();
    },
    [mouseX, mouseY, onMouseEnter]
  );

  const handleLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      setIsHovering(false);
      onMouseLeave(e);
    },
    [onMouseLeave]
  );

  const glowBackground = useTransform(
    [glowX, glowY],
    ([x, y]: number[]) => `radial-gradient(circle 150px at ${x}px ${y}px, ${service.accent}20 0%, transparent 60%)`
  );

  return (
    <motion.div
      ref={panelRef}
      className="relative h-full cursor-pointer overflow-hidden"
      style={{ background: isActive ? service.bgExpanded : service.bg }}
      animate={{ flex: isExpanded ? 12 : isActive ? 5 : hasActive ? 0.4 : 1 }}
      transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={onClick}
    >
      {/* Zoom Lines Effect */}
      <motion.div
        className="absolute w-[600px] h-[600px] pointer-events-none z-[1]"
        style={{
          left: 0, top: 0, x: glowX, y: glowY, translateX: "-50%", translateY: "-50%",
          opacity: isHovering ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <ZoomLines color={service.accent} />
      </motion.div>

      {/* Background Glow */}
      <motion.div className="absolute inset-0 pointer-events-none z-[1]" style={{ background: glowBackground }} />

      {/* Divider Line */}
      <div className="absolute top-0 left-0 w-px h-full z-[2]" style={{ background: "rgba(255,255,255,0.08)" }} />

      {/* Ripple Effects */}
      {panelRipples.map((ripple) => (
        <FabricStretch key={ripple.id} side={ripple.side} yPercent={ripple.yPercent} color={ripple.color} />
      ))}

      {/* Collapsed State */}
      <AnimatePresence>
        {!isActive && !isExpanded && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center gap-6 z-[3]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: isActive ? 0 : 0.3 }}
          >
            <motion.div
              className="flex items-center justify-center"
              animate={{ scale: hasActive ? 0.8 : 1 }}
              transition={{ duration: 0.5 }}
            >
              <IconComponent className="w-8 h-8 md:w-10 md:h-10" style={{ color: "rgba(255,255,255,0.7)" }} strokeWidth={1.5} />
            </motion.div>

            <div
              className="absolute bottom-12 left-1/2 -translate-x-1/2"
              style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
            >
              <span className="text-sm md:text-base font-bold tracking-wider whitespace-nowrap" style={{ color: "rgba(255,255,255,0.9)" }}>
                {service.title}
              </span>
            </div>

            <div className="absolute top-6 left-1/2 -translate-x-1/2">
              <span
                className="text-xs font-mono tracking-widest"
                style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-geist-mono)" }}
              >
                {String(service.id).padStart(2, "0")}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active State - Service Details */}
      <AnimatePresence>
        {isActive && !isExpanded && (
          <motion.div
            className="absolute inset-0 flex flex-col md:flex-row items-center justify-center p-6 md:p-12 lg:p-20 z-[3] overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            {/* Left Side - Icon */}
            <motion.div
              className="w-full md:w-2/5 flex items-center justify-center mb-8 md:mb-0"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.32, 0.72, 0, 1] }}
            >
              <div className="relative">
                <motion.div
                  className="absolute rounded-full"
                  style={{ width: "240px", height: "240px", top: "50%", left: "50%", transform: "translate(-50%, -50%)", border: `1px solid ${service.accent}20` }}
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />

                <motion.div
                  className="w-36 h-36 md:w-48 md:h-48 rounded-3xl flex items-center justify-center"
                  style={{ background: `${service.accent}12`, border: `1px solid ${service.accent}25` }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <IconComponent className="w-16 h-16 md:w-24 md:h-24" style={{ color: service.accent }} strokeWidth={1} />
                </motion.div>

                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{ background: service.accent, top: `${15 + i * 25}%`, [i % 2 === 0 ? "left" : "right"]: "-20px" }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: [0, 0.6, 0], scale: [0, 1, 0], y: [0, -30, -60] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.6 }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Right Side - Content */}
            <motion.div
              className="w-full md:w-3/5 md:pr-8 lg:pr-16 text-center md:text-right"
              style={{ direction: "rtl" }}
              initial={{ x: 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 60, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: [0.32, 0.72, 0, 1] }}
            >
              <motion.span
                className="inline-block text-sm font-mono tracking-[0.3em] mb-4"
                style={{ color: `${textColor}60`, fontFamily: "var(--font-geist-mono)" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {String(service.id).padStart(2, "0")} — {String(totalServices).padStart(2, "0")}
              </motion.span>

              <motion.h2
                className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight mb-3"
                style={{ color: textColor }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {service.title}
              </motion.h2>

              <motion.p
                className="text-base md:text-lg mb-6 tracking-wide"
                style={{ color: `${textColor}55`, fontFamily: "var(--font-geist-sans)" }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.5 }}
              >
                {service.titleEn}
              </motion.p>

              <motion.div
                className="h-px w-16 mb-6 mx-auto md:mx-0 md:mr-0"
                style={{ background: `${textColor}30` }}
                initial={{ width: 0 }}
                animate={{ width: 64 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              />

              <motion.p
                className="text-base md:text-lg leading-relaxed mb-8 max-w-lg mx-auto md:mx-0"
                style={{ color: `${textColor}CC` }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.5 }}
              >
                {service.description}
              </motion.p>

              {/* Portfolio Preview Button */}
              <motion.button
                className="group inline-flex items-center gap-3 px-6 py-3 rounded-xl font-bold text-base transition-all duration-300 mb-4"
                style={{ background: `${service.accent}30`, border: `1px solid ${service.accent}50`, color: textColor }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                whileHover={{ scale: 1.05, background: `${service.accent}50` }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onClick();
                }}
              >
                <Eye className="w-5 h-5" />
                عرض أعمالنا
                <ArrowUpLeft className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:-translate-x-0.5" />
              </motion.button>

              {/* Main CTA */}
              <motion.button
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 ml-4"
                style={{ background: service.accent, color: service.bg }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => e.stopPropagation()}
              >
                {service.cta}
                <ExternalLink className="w-5 h-5 transition-transform group-hover:-translate-y-0.5 group-hover:-translate-x-0.5" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded State - Portfolio Showcase */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="absolute inset-0 overflow-y-auto z-[3]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <motion.div 
              className="sticky top-0 z-10 px-8 py-6 flex items-center justify-between"
              style={{ background: service.bgExpanded }}
            >
              <div className="flex items-center gap-4">
                <motion.div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: `${service.accent}20` }}
                  whileHover={{ scale: 1.1 }}
                >
                  <IconComponent className="w-6 h-6" style={{ color: service.accent }} />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold" style={{ color: textColor }}>أعمال {service.title}</h3>
                  <p className="text-sm opacity-60" style={{ color: textColor }}>{service.portfolio.length} مشروع</p>
                </div>
              </div>
              
              <motion.button
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all"
                style={{ background: `${service.accent}20`, color: textColor }}
                whileHover={{ scale: 1.05, background: `${service.accent}40` }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onClick();
                }}
              >
                <ArrowUpLeft className="w-4 h-4 rotate-180" />
                رجوع
              </motion.button>
            </motion.div>

            {/* Portfolio Grid */}
            <div className="px-8 pb-12 pt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {service.portfolio.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    className="group rounded-2xl overflow-hidden transition-all duration-300"
                    style={{ 
                      background: `${service.accent}10`, 
                      border: `1px solid ${service.accent}20`,
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + idx * 0.1 }}
                    whileHover={{ 
                      scale: 1.02, 
                      y: -5,
                      borderColor: `${service.accent}50`,
                      boxShadow: `0 20px 40px -15px ${service.bg}80`
                    }}
                  >
                    {/* Project Image/Icon */}
                    <div 
                      className="h-48 flex items-center justify-center relative overflow-hidden"
                      style={{ background: `linear-gradient(135deg, ${service.accent}15 0%, ${service.bg} 100%)` }}
                    >
                      <motion.span 
                        className="text-6xl"
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {item.image}
                      </motion.span>
                      
                      {/* Hover Overlay */}
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ background: `${service.bg}90` }}
                      >
                        <motion.button
                          className="px-6 py-3 rounded-xl font-bold flex items-center gap-2"
                          style={{ background: service.accent, color: service.bg }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Eye className="w-5 h-5" />
                          عرض المشروع
                        </motion.button>
                      </motion.div>
                    </div>

                    {/* Project Details */}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-bold text-lg" style={{ color: textColor }}>{item.title}</h4>
                        <span 
                          className="text-xs px-3 py-1 rounded-full flex items-center gap-1"
                          style={{ background: `${service.accent}25`, color: service.accent }}
                        >
                          <Calendar className="w-3 h-3" />
                          {item.year}
                        </span>
                      </div>
                      
                      <p className="text-sm opacity-70 mb-4 leading-relaxed" style={{ color: textColor }}>
                        {item.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag, tagIdx) => (
                          <span
                            key={tagIdx}
                            className="text-xs px-2 py-1 rounded-md"
                            style={{ background: `${service.accent}15`, color: `${textColor}90` }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Stats Section */}
              <motion.div 
                className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {[
                  { label: "مشاريع منجزة", value: service.portfolio.length * 12 + "+" },
                  { label: "عميل سعيد", value: service.portfolio.length * 8 + "+" },
                  { label: "سنوات خبرة", value: "5+" },
                  { label: "نسبة رضا", value: "98%" },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    className="p-4 rounded-xl text-center"
                    style={{ background: `${service.accent}10`, border: `1px solid ${service.accent}20` }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-2xl font-black mb-1" style={{ color: service.accent }}>{stat.value}</div>
                    <div className="text-xs opacity-60" style={{ color: textColor }}>{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Section */}
              <motion.div
                className="mt-12 p-8 rounded-2xl text-center"
                style={{ background: `linear-gradient(135deg, ${service.accent}20 0%, ${service.accent}05 100%)`, border: `1px solid ${service.accent}30` }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <CheckCircle className="w-12 h-12 mx-auto mb-4" style={{ color: service.accent }} />
                <h4 className="text-xl font-bold mb-2" style={{ color: textColor }}>جاهز لبدء مشروعك؟</h4>
                <p className="text-sm opacity-70 mb-6" style={{ color: textColor }}>
                  دعنا نساعدك في تحقيق رؤيتك التسويقية
                </p>
                <motion.button
                  className="px-8 py-4 rounded-xl font-bold text-lg inline-flex items-center gap-3"
                  style={{ background: service.accent, color: service.bg }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink className="w-5 h-5" />
                  ابدأ مشروعك الآن
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Gradient */}
      {!isActive && !isExpanded && (
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: `linear-gradient(to top, ${service.bg} 0%, transparent 100%)` }}
        />
      )}
    </motion.div>
  );
}

function FabricStretch({ side, yPercent, color }: { side: "left" | "right"; yPercent: number; color: string }) {
  const bulge = useMotionValue(1);
  const springBulge = useSpring(bulge, { stiffness: 300, damping: 15, mass: 0.8 });
  const displacement = useTransform(springBulge, [0, 1], [0, 50]);

  useEffect(() => {
    const timeout = setTimeout(() => { bulge.set(0); }, 50);
    return () => clearTimeout(timeout);
  }, [bulge]);

  const cy = yPercent;

  return (
    <motion.div
      className="absolute top-0 h-full pointer-events-none z-[1]"
      style={{ [side]: 0, width: "60px" }}
      initial={{ opacity: 0.9 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <svg viewBox="0 0 60 100" preserveAspectRatio="none" className="w-full h-full" style={{ overflow: "visible" }}>
        <motion.path
          fill={color}
          style={{
            d: useTransform(displacement, (d) => {
              const top = Math.max(0, cy - 25);
              const bot = Math.min(100, cy + 25);
              if (side === "left") {
                return `M0,0 L0,${top} Q${d},${cy} 0,${bot} L0,100 L0,0 Z`;
              } else {
                return `M60,0 L60,${top} Q${60 - d},${cy} 60,${bot} L60,100 L60,0 Z`;
              }
            }),
          }}
        />
      </svg>
    </motion.div>
  );
}

function ZoomLines({ color }: { color: string }) {
  const rays = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i, angle: (360 / 24) * i, width: 2 + Math.random() * 6,
      length: 40 + Math.random() * 60, delay: Math.random() * 2,
    }));
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute w-20 h-20 rounded-full blur-xl" style={{ background: color, opacity: 0.15 }} />
      {rays.map((ray) => (
        <motion.div
          key={ray.id}
          className="absolute top-1/2 left-1/2 origin-left"
          style={{
            height: `${ray.width}px`, width: "50%",
            background: `linear-gradient(90deg, ${color}00 0%, ${color}40 20%, ${color}00 100%)`,
            rotate: `${ray.angle}deg`, y: "-50%",
          }}
          animate={{ scaleX: [0.8, 1.2, 0.8], opacity: [0.3, 0.7, 0.3], width: ["40%", "60%", "40%"] }}
          transition={{ duration: 2 + ray.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
