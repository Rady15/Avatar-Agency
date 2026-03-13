"use client";

import React, { useState } from 'react';
import { Home, Palette, Info, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

interface NavItemProps {
  icon: React.ElementType;
  isActive?: boolean;
  indicatorPosition: number;
  position: number;
  label: string;
  href: string;
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
        className={`w-5 h-5 mb-1 transition-colors duration-200 ${
          isActive ? 'text-white' : 'text-white/50 hover:text-white/80'
        }`}
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

interface SpotlightNavProps {
  onNavigate?: (index: number) => void;
  className?: string;
}

export const SpotlightNav: React.FC<SpotlightNavProps> = ({ 
  onNavigate,
  className = "" 
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { language } = useLanguage();

  const navItems = [
    { icon: Home, label: language === 'ar' ? 'الرئيسية' : 'Home', href: '/' },
    { icon: Palette, label: language === 'ar' ? 'خدماتنا' : 'Services', href: '/services' },
    { icon: Info, label: language === 'ar' ? 'من نحن' : 'About', href: '/about' },
    { icon: MessageCircle, label: language === 'ar' ? 'تواصل' : 'Contact', href: '/contact' },
  ];

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
    onNavigate?.(index);
  };

  return (
    <nav className={`relative flex items-center px-2 py-2 ${className}`}>
      <div 
        className="absolute top-0 h-[2px] bg-[#D4AF37] transition-all duration-400 ease-in-out"
        style={{
          left: `${activeIndex * 68 + 16}px`,
          width: '40px',
          transform: 'translateY(-1px)',
        }}
      />
      {navItems.map((item, index) => (
        <NavItem
          key={item.label}
          icon={item.icon}
          isActive={activeIndex === index}
          indicatorPosition={activeIndex}
          position={index}
          label={item.label}
          href={item.href}
        />
      ))}
    </nav>
  );
};

export default SpotlightNav;
