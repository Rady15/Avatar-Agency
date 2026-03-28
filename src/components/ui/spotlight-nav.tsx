"use client";

import React, { useState } from 'react';
import { Home, Palette, Info, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

interface NavItemProps {
  icon: React.ElementType<{ className?: string; strokeWidth?: number }>;
  isActive?: boolean;
  indicatorPosition: number;
  position: number;
  label: string;
  href: string;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ 
  icon: Icon, 
  isActive = false, 
  indicatorPosition,
  position,
  label,
  href
}) => {
  const router = useRouter();
  const distance = Math.abs(indicatorPosition - position);
  const spotlightOpacity = isActive ? 1 : Math.max(0, 1 - distance * 0.6);

  return (
    <button
      onClick={() => router.push(href as any)}
      className="relative flex flex-col items-center justify-center w-16 h-12 mx-1 transition-all duration-400"
    >
      <div 
        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-24 bg-gradient-to-b from-[#D4AF37]/40 to-transparent blur-lg rounded-full transition-opacity duration-400"
        style={{
          opacity: spotlightOpacity,
          transitionDelay: isActive ? '0.1s' : '0s',
        }}
      />
      <Icon
        className="w-5 h-5 mb-1 transition-colors duration-200"
        strokeWidth={isActive ? 2.5 : 2}
      />
      <span className={`text-[10px] transition-colors duration-200 ${
        isActive ? 'text-white' : 'text-white/50'
      }`}>
        {label}
      </span>
    </button>
  );
};

export function SpotlightNav() {
  const router = useRouter();
  const { language, t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [
    { icon: Home, label: t("الرئيسية", "Home"), href: "/" },
    { icon: Palette, label: t("خدماتنا", "Services"), href: "/services" },
    { icon: Info, label: t("من نحن", "About"), href: "/about" },
    { icon: MessageCircle, label: t("تواصل", "Contact"), href: "/contact" },
  ];

  const handleNavClick = (index: number, href: string) => {
    setActiveIndex(index);
    router.push(href as any);
  };

  return (
    <nav className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center bg-white/5 backdrop-blur-xl rounded-full px-4 py-2 border border-white/10 shadow-lg">
        {items.map((item, index) => (
          <NavItem
            key={item.label}
            icon={item.icon}
            isActive={activeIndex === index}
            indicatorPosition={activeIndex}
            position={index}
            label={item.label}
            href={item.href}
            onClick={() => handleNavClick(index, item.href)}
          />
        ))}
      </div>
    </nav>
  );
}
