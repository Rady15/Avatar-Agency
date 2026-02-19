"use client";

import { motion, useScroll } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, Diamond } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "الرئيسية", labelEn: "Home", href: "/" },
  { label: "من نحن", labelEn: "About", href: "/about" },
  { label: "خدماتنا", labelEn: "Services", href: "/services" },
  { label: "تواصل معنا", labelEn: "Contact", href: "/contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-[#0A1D37]/95 backdrop-blur-xl border-b border-primary/10" : "bg-transparent"
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
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link, index) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative text-white/80 hover:text-primary transition-colors group"
              >
                <motion.span
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  whileHover={{ y: -2 }}
                >
                  <span className="text-sm font-medium">{link.label}</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                </motion.span>
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <Link
            href="/contact"
            className="hidden md:flex items-center gap-2 px-6 py-3 text-white font-bold rounded-lg text-sm btn-3d"
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
              ابدأ مشروعك
            </motion.span>
          </Link>

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
                <span className="font-medium">{link.label}</span>
                <span className="text-xs text-white/30" style={{ fontFamily: "var(--font-geist-sans)" }}>
                  {link.labelEn}
                </span>
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="block py-4 px-6 btn-3d text-white font-bold rounded-xl text-center mt-4"
            >
              ابدأ مشروعك
            </Link>
          </nav>
        </motion.div>
      </div>
    </motion.header>
  );
}
