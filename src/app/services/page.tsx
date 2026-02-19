"use client";

import { ServicesSection } from "@/components/sections/services-section";
import { AnimatedStars } from "@/components/animated-stars";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ServicesPage() {
  return (
    <>
      {/* Back Button */}
      <Link
        href="/"
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 text-white/80 hover:text-primary transition-colors bg-[#0A1D37]/80 backdrop-blur-sm rounded-lg border border-primary/20"
      >
        <ArrowRight className="w-4 h-4" />
        <span>رجوع</span>
      </Link>
      <AnimatedStars />
      <main className="relative">
        <ServicesSection />
      </main>
    </>
  );
}