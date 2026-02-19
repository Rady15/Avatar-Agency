"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Instagram, Twitter, Linkedin, Facebook, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

const quickLinks = [
  { label: "الرئيسية", labelEn: "Home", href: "/" },
  { label: "من نحن", labelEn: "About", href: "/about" },
  { label: "خدماتنا", labelEn: "Services", href: "/services" },
  { label: "تواصل معنا", labelEn: "Contact", href: "/contact" },
];

const services = [
  "تصميم المواقع", "الهوية البصرية", "السوشيال ميديا", "إنتاج الفيديو",
  "الحملات الإعلانية", "اللافتات", "المعارض والستاندات", "الهدايا الدعائية", "الاستشارات",
];

export function Footer() {
  const [currentYear, setCurrentYear] = useState(2026);
  
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="relative bg-[#060d18] border-t border-primary/10">
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
              <div
                className="w-12 h-12"
                style={{
                  background: "linear-gradient(135deg, #222e64 0%, #2a3a7a 50%, #1a2550 100%)",
                  clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                }}
              >
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)",
                    clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                    margin: "3px",
                  }}
                >
                  <span className="text-[#222e64] font-bold">A</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold gold-text">أفتار</h3>
                <p className="text-[10px] text-white/40 tracking-widest" style={{ fontFamily: "var(--font-geist-sans)" }}>
                  AVATAR ADVERTISING
                </p>
              </div>
            </div>

            <p className="text-sm text-white/50 leading-relaxed mb-6">
              وكالة دعاية وإعلان متكاملة نكسر القواعد لخلق الابتكار. نقدم
              حلولاً إبداعية متميزة تلبي جميع احتياجاتك التسويقية.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Facebook, href: "#" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
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
            <h4 className="font-bold text-lg mb-6 gold-text">روابط سريعة</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-primary transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-primary transition-all" />
                    {link.label}
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
            <h4 className="font-bold text-lg mb-6 gold-text">خدماتنا</h4>
            <ul className="grid grid-cols-2 gap-2">
              {services.map((service) => (
                <li key={service}>
                  <Link href="/services" className="text-white/60 hover:text-primary transition-colors text-sm">
                    {service}
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
            <h4 className="font-bold text-lg mb-6 gold-text">تواصل معنا</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <Phone className="w-4 h-4 text-primary" />
                <span>+966 50 000 0000</span>
              </li>
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <span>info@avatar-ad.com</span>
              </li>
              <li className="flex items-start gap-3 text-white/60 text-sm">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span>الرياض، المملكة العربية السعودية</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/40 text-center md:text-right">
            © {currentYear} أفتار للدعاية والإعلان. جميع الحقوق محفوظة.
          </p>
          <p className="text-sm text-white/30 text-center md:text-left">
            صُمم بـ ❤️ في أفتار
          </p>
        </div>
      </div>
    </footer>
  );
}
