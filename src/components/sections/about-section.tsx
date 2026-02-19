"use client";

import { useRef, useState } from "react";
import { Lightbulb, Target, Users, Award } from "lucide-react";
import { GlowCard } from "@/components/ui/glow-card";

const values = [
  { 
    icon: Lightbulb, 
    title: "الابتكار", 
    titleEn: "Innovation", 
    desc: "نحول الأفكار إلى واقع ملموس",
    color: "orange" as const,
    iconColor: "text-yellow-400"
  },
  { 
    icon: Target, 
    title: "الجودة", 
    titleEn: "Quality", 
    desc: "نلتزم بأعلى معايير الإتقان",
    color: "blue" as const,
    iconColor: "text-blue-400"
  },
  { 
    icon: Users, 
    title: "الشراكة", 
    titleEn: "Partnership", 
    desc: "نبني علاقات طويلة الأمد",
    color: "green" as const,
    iconColor: "text-green-400"
  },
  { 
    icon: Award, 
    title: "التميز", 
    titleEn: "Excellence", 
    desc: "نسعى دائماً للريادة",
    color: "purple" as const,
    iconColor: "text-purple-400"
  },
];

export function AboutSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isEnded, setIsEnded] = useState(false);

  const handleEnded = () => {
    setIsEnded(true);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <section className="relative min-h-screen">
      {/* Video Background - Auto plays and stops at end */}
      <div className="fixed inset-0 z-0 w-screen h-screen">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={handleEnded}
          className="w-full h-full object-cover"
        >
          <source src="/Flow2.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Static Content - Always Visible */}
      <div className="relative z-10 flex items-center justify-center min-h-screen w-full">
        <div className="w-full flex items-center justify-center px-4 lg:px-8 py-20">
          <div className="w-full max-w-6xl">
            {/* Main Title */}
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight text-white drop-shadow-2xl">
                <span className="gold-text">أفتار</span> للدعاية والإعلان
              </h2>

              <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-6 drop-shadow-lg max-w-3xl mx-auto">
                وكالة إبداعية متكاملة نجمع بين الفن والتقنية لنقدم حلولاً إعلانية
                متميزة
              </p>

              <p className="text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
                منذ تأسيسنا، عملنا مع عشرات الشركات والمؤسسات في المملكة العربية
                السعودية لتحويل رؤيتهم إلى واقع ملموس
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <GlowCard
                  key={value.title}
                  glowColor={value.color}
                  customSize
                  width="100%"
                  height="auto"
                  className="min-h-[280px]"
                >
                  <div className="h-full flex flex-col p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 transition-all duration-500">
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 ${value.iconColor}`}>
                      <value.icon className="w-8 h-8" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-bold text-white text-2xl mb-2">{value.title}</h3>
                    
                    {/* English Title */}
                    <p className="text-sm text-white/40 mb-4 tracking-wider uppercase" style={{ fontFamily: "var(--font-geist-sans)" }}>
                      {value.titleEn}
                    </p>
                    
                    {/* Description */}
                    <p className="text-white/70 text-base leading-relaxed">{value.desc}</p>
                    
                    {/* Bottom Line */}
                    <div className="mt-auto pt-6">
                      <div className="h-1 w-12 bg-white/20 rounded-full" />
                    </div>
                  </div>
                </GlowCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
