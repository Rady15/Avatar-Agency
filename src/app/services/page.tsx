"use client";

import { ServicesSection } from "@/components/sections/services-section";
import { AnimatedStars } from "@/components/animated-stars";
import { Navigation } from "@/components/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export default function ServicesPage() {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <>
      <Navigation />
      <AnimatedStars />

      {/* Back Button & Mobile Lang - Floating */}
      {/* <div className="fixed top-24 left-6 z-50 flex flex-col gap-3">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 text-white/80 hover:text-primary transition-colors bg-[#0A1D37]/80 backdrop-blur-sm rounded-lg border border-primary/20 shadow-lg"
        >
          {language === 'ar' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>{language === 'ar' ? "رجوع" : "Back"}</span>
        </Link>
      </div> */}

      <main className="relative pt-20">
        <ServicesSection />
      </main>
    </>
  );
}