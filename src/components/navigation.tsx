"use client";

import { motion, useScroll } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, Diamond, Globe } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const navLinks = [
  { label: "الرئيسية", labelEn: "Home", href: "/" as const },
  { label: "من نحن", labelEn: "About", href: "/about" as const },
  { label: "خدماتنا", labelEn: "Services", href: "/services" as const },
  { label: "تواصل معنا", labelEn: "Contact", href: "/contact" as const },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-[#0A1D37]/95 backdrop-blur-xl border-b border-primary/10" : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.img
              src="/logo.svg"
              alt="AVATAR Logo"
              className="w-12 h-12 object-contain"
              animate={{ rotateY: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.img
              src="/logotxt.svg"
              alt="AVATAR"
              className="hidden sm:block h-8 object-contain"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center">
            <style>{`
              .nav-menu {
                display: flex;
                justify-content: center;
                align-items: center;
                list-style: none;
                background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 100%);
                border-radius: 9999px;
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                border: 1px solid rgba(255,255,255,0.15);
                box-shadow: 
                  0 8px 32px rgba(0,0,0,0.3),
                  inset 0 1px 0 rgba(255,255,255,0.1),
                  inset 0 -1px 0 rgba(255,255,255,0.05);
                padding: 0.5rem 1rem;
                gap: 1.5rem;
              }
              .nav-menu li {
                position: relative;
                width: auto;
                height: auto;
                transition: background-position-x 0.9s linear;
                text-align: center;
                padding: 0.5rem 1.5rem;
                cursor: pointer;
              }
              .nav-menu li a {
                font-size: 14px;
                font-weight: 500;
                color: rgba(255,255,255,0.7);
                text-decoration: none;
                transition: all 0.45s;
                position: relative;
                z-index: 2;
              }
              .nav-menu li:hover {
                background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEi%0D%0AIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhs%0D%0AaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB3aWR0%0D%0AaD0iMzkwcHgiIGhlaWdodD0iNTBweCIgdmlld0JveD0iMCAwIDM5MCA1MCIgZW5hYmxlLWJhY2tn%0D%0Acm91bmQ9Im5ldyAwIDAgMzkwIDUwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHBhdGggZmlsbD0i%0D%0Abm9uZSIgc3Ryb2tlPSIjZDk0ZjVjIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLW1pdGVybGlt%0D%0FaXQ9IjEwIiBkPSJNMCw0Ny41ODVjMCwwLDk3LjUsMCwxMzAsMAoJYzEzLjc1LDAsMjguNzQtMzgu%0D%0ANzc4LDQ2LjE2OC0xOS40MTZDMTkyLjY2OSw0Ni41LDI0My42MDMsNDcuNTg1LDI2MCw0Ny41ODVj%0D%0AMzEuODIxLDAsMTMwLDAsMTMwLDAiLz4KPC9zdmc+Cg==");
                animation: nav-line 1s;
              }
              .nav-menu li:hover a {
                color: #ffffff;
              }
              @keyframes nav-line {
                0% {
                  background-position-x: 390px;
                }
              }
            `}</style>
            <ul className="nav-menu">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>
                    {language === "ar" ? link.label : link.labelEn}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Language Switcher & CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Switch Button */}
            <motion.button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2 text-white/80 hover:text-primary transition-colors bg-white/5 rounded-lg border border-white/10 hover:border-primary/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">{language === "ar" ? "EN" : "عربي"}</span>
            </motion.button>

            {/* CTA Button */}
            <Link
              href="#contact"
              className="flex items-center gap-2 px-6 py-3 text-white font-bold rounded-lg text-sm btn-3d"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2"
              >
                <Diamond className="w-4 h-4" />
                {t("ابدأ مشروعك", "Start Project")}
              </motion.span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-12 h-12 rounded-xl bg-secondary/50 border border-primary/20 flex items-center justify-center text-white hover:bg-secondary transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden overflow-hidden"
        >
          <nav className="py-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between py-4 px-6 text-white/80 hover:text-primary hover:bg-secondary/30 rounded-xl transition-all"
              >
                <span className="font-medium">
                  {language === "ar" ? link.label : link.labelEn}
                </span>
                <span className="text-xs text-white/30" style={{ fontFamily: "var(--font-geist-sans)" }}>
                  {language === "ar" ? link.labelEn : link.label}
                </span>
              </Link>
            ))}

            {/* Language Switch - Mobile */}
            <button
              onClick={toggleLanguage}
              className="flex items-center justify-between w-full py-4 px-6 text-white/80 hover:text-primary hover:bg-secondary/30 rounded-xl transition-all"
            >
              <span className="font-medium">
                {t("تغيير اللغة", "Switch Language")}
              </span>
              <Globe className="w-4 h-4" />
            </button>

            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="block py-4 px-6 btn-3d text-white font-bold rounded-xl text-center mt-4"
            >
              {t("ابدأ مشروعك", "Start Project")}
            </Link>
          </nav>
        </motion.div>
      </div>
    </motion.header>
  );
}

