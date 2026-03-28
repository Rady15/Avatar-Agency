"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Instagram, Twitter, Facebook, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.67a8.2 8.2 0 004.76 1.52V6.74a4.86 4.86 0 01-1-.05z"/>
  </svg>
);

const quickLinks = [
  { label: "الرئيسية", labelEn: "Home", href: "/" as const },
  { label: "من نحن", labelEn: "About", href: "/about" as const },
  { label: "خدماتنا", labelEn: "Services", href: "/services" as const },
  { label: "تواصل معنا", labelEn: "Contact", href: "/contact" as const },
];

const services = [
  { ar: "تصميم المواقع", en: "Web Design" },
  { ar: "الهوية البصرية", en: "Visual Identity" },
  { ar: "السوشيال ميديا", en: "Social Media" },
  { ar: "إنتاج الفيديو", en: "Video Production" },
  { ar: "الحملات الإعلانية", en: "Ad Campaigns" },
  { ar: "اللافتات", en: "Signage" },
  { ar: "المعارض والستاندات", en: "Exhibitions & Stands" },
  { ar: "الهدايا الدعائية", en: "Promotional Gifts" },
  { ar: "تطبيقات الجوال", en: "Mobile Apps" },
  { ar: "المطبوعات", en: "Printing" },
  { ar: "الاستشارات", en: "Consulting" },
];

export function Footer() {
  const [currentYear, setCurrentYear] = useState(2026);
  const { language, t } = useLanguage();

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="relative bg-[#060d18] border-t border-primary/10" style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}>
      {/* Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Logo */}
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/logo.svg"
                alt="Avatar Agency Logo"
                width={120}
                height={60}
                className="object-contain"
                priority
              />
            </div>

            <p className="text-sm text-white/50 leading-relaxed mb-6">
              {t(
                'وكالة دعاية وإعلان متكاملة نكسر القواعد لخلق الابتكار. نقدم حلولاً إبداعية متميزة تلبي جميع احتياجاتك التسويقية.',
                'A full-service advertising agency breaking rules to create innovation. We offer exceptional creative solutions for all your marketing needs.'
              )}
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: "https://www.instagram.com/theavatarksa" },
                { icon: Twitter, href: "https://twitter.com/theavatarksa" },
                { icon: Facebook, href: "https://www.facebook.com/theavatarksa" },
                { icon: TikTokIcon, href: "https://www.tiktok.com/@theavatarksa" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="w-10 h-10 rounded-lg bg-secondary/50 border border-primary/10 flex items-center justify-center text-white/60 hover:text-primary hover:border-primary/30 transition-all"
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-bold text-lg mb-6 text-yellow-400">{t('روابط سريعة', 'Quick Links')}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-primary transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-primary transition-all" />
                    {language === 'ar' ? link.label : link.labelEn}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-bold text-lg mb-6 text-yellow-400">{t('خدماتنا', 'Our Services')}</h4>
            <ul className="grid grid-cols-2 gap-2">
              {services.map((service) => (
                <li key={service.ar}>
                  <Link href="/services" className="text-white/60 hover:text-primary transition-colors text-sm">
                    {language === 'ar' ? service.ar : service.en}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-bold text-lg mb-6 text-yellow-400">{t('تواصل معنا', 'Contact Us')}</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span dir="ltr">+966 56 881 6357</span>
              </li>
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span dir="ltr">marketing@avatarksa.com</span>
              </li>
              <li className="flex items-start gap-3 text-white/60 text-sm">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>{t('المنطقة الشرقية - الدمام، المملكة العربية السعودية', 'Eastern Province - Dammam, Saudi Arabia')}</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/40 text-center">
            {t(
              `© ${currentYear} أفتار للدعاية والإعلان. جميع الحقوق محفوظة.`,
              `© ${currentYear} Avatar Advertising. All rights reserved.`
            )}
          </p>
          <p className="text-sm text-white/30 text-center">
            {t('صُمم بـواسطة فريق ', 'Designed by ')}
            <Link href="https://oktech-uae.com" target="_blank" className="text-primary hover:underline">OK_Tech</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
