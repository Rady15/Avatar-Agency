"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import {
  Send, Mail, Phone, MapPin, Clock, Instagram, Twitter, Linkedin, Facebook, CheckCircle, MessageSquare, Globe
} from "lucide-react";
import { GlowCard } from "@/components/ui/glow-card";

const contactInfo = [
  { icon: Phone, label: "اتصل بنا", value: "+966 50 000 0000", href: "tel:+966500000000", color: "from-emerald-500/20 to-teal-500/20", iconColor: "text-emerald-400" },
  { icon: Mail, label: "راسلنا", value: "info@avatar-ad.com", href: "mailto:info@avatar-ad.com", color: "from-blue-500/20 to-cyan-500/20", iconColor: "text-blue-400" },
  { icon: MapPin, label: "زورنا", value: "الرياض، المملكة العربية السعودية", href: "#", color: "from-orange-500/20 to-amber-500/20", iconColor: "text-orange-400" },
  { icon: Clock, label: "ساعات العمل", value: "الأحد - الخميس: 9ص - 6م", href: "#", color: "from-purple-500/20 to-pink-500/20", iconColor: "text-purple-400" },
];

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram", color: "hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600" },
  { icon: Twitter, href: "#", label: "Twitter", color: "hover:bg-blue-500" },
  { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:bg-blue-700" },
  { icon: Facebook, href: "#", label: "Facebook", color: "hover:bg-blue-600" },
  { icon: Globe, href: "#", label: "Website", color: "hover:bg-emerald-500" },
];

const services = [
  "تصميم المواقع", "الهوية البصرية", "السوشيال ميديا", "إنتاج الفيديو",
  "الحملات الإعلانية", "اللافتات", "المعارض والستاندات", "الهدايا الدعائية", "تطبيقات الجوال", "المطبوعات", "الاستشارات",
];

export function ContactSection({ showBackground = true }: { showBackground?: boolean }) {
  const [formState, setFormState] = useState({
    name: "", email: "", phone: "", service: "", message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ name: "", email: "", phone: "", service: "", message: "" });
    }, 3000);
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const contentOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.3, 0.7, 0.9],
    [0, 1, 1, 0]
  );

  const contentY = useTransform(
    scrollYProgress,
    [0.1, 0.3, 0.7, 0.9],
    [50, 0, 0, -50]
  );

  return (
    <section ref={containerRef} id="contact" className="relative h-[150vh]">
      {/* Image Background */}
      {showBackground && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <img
            src="/ra.jpg"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0A1D37]/50" />
        </div>
      )}

      {/* Sticky Content Container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div
          className="relative z-10 w-full h-full flex items-center justify-center p-4 lg:p-8"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          <div className="w-full max-w-7xl">
            {/* Header */}
            <div className="text-center mb-6">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl lg:text-5xl font-black mb-2"
              >
                لنبدأ <span className="gold-text">مشروعك</span> معاً
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-white/50 text-sm"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                LET&apos;S START YOUR PROJECT TOGETHER
              </motion.p>
            </div>

            <div className="grid lg:grid-cols-5 gap-6 items-start">
              {/* Contact Form - Takes 3 columns */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-3"
              >
                <GlowCard customSize glowColor="blue" className="w-full p-0">
                  <form
                    onSubmit={handleSubmit}
                    className="relative p-6 rounded-2xl overflow-hidden"
                  >
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />

                    <div className="relative z-10 space-y-4">
                      {/* Name */}
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-1.5">الاسم الكامل</label>
                        <input
                          type="text"
                          required
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                          placeholder="أدخل اسمك الكامل"
                        />
                      </div>

                      {/* Email & Phone */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-white/80 mb-1.5">البريد الإلكتروني</label>
                          <input
                            type="email"
                            required
                            value={formState.email}
                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                            placeholder="example@email.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white/80 mb-1.5">رقم الهاتف</label>
                          <input
                            type="tel"
                            value={formState.phone}
                            onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                            placeholder="+966 50 000 0000"
                          />
                        </div>
                      </div>

                      {/* Service Select */}
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-1.5">الخدمة المطلوبة</label>
                        <select
                          required
                          value={formState.service}
                          onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all appearance-none cursor-pointer"
                        >
                          <option value="" className="bg-[#0A1D37]">اختر الخدمة</option>
                          {services.map((service) => (
                            <option key={service} value={service} className="bg-[#0A1D37]">{service}</option>
                          ))}
                        </select>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-1.5">تفاصيل المشروع</label>
                        <textarea
                          required
                          rows={3}
                          value={formState.message}
                          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
                          placeholder="أخبرنا عن مشروعك وأهدافك..."
                        />
                      </div>

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        disabled={isSubmitting || isSubmitted}
                        className={`w-full py-3.5 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${isSubmitted ? "bg-green-500 text-white" : "bg-gradient-to-r from-primary to-primary/80 text-white hover:shadow-lg hover:shadow-primary/30"
                          }`}
                        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      >
                        {isSubmitting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          />
                        ) : isSubmitted ? (
                          <>
                            <CheckCircle className="w-5 h-5" />
                            تم الإرسال بنجاح!
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            أرسل رسالتك
                          </>
                        )}
                      </motion.button>
                    </div>
                  </form>
                </GlowCard>
              </motion.div>

              {/* Contact Info - Takes 2 columns */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="lg:col-span-2 space-y-4"
              >
                {/* Info Cards */}
                <div className="grid grid-cols-2 gap-3">
                  {contactInfo.map((item, index) => (
                    <GlowCard key={item.label} customSize glowColor="blue" className="w-full p-0">
                      <motion.a
                        href={item.href}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                        className="group p-4 rounded-2xl flex flex-col h-full transition-all"
                      >
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center mb-2`}>
                          <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                        </div>
                        <p className="text-xs text-white/50 mb-0.5">{item.label}</p>
                        <p className="text-white text-sm font-medium">{item.value}</p>
                      </motion.a>
                    </GlowCard>
                  ))}
                </div>

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="p-4 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    <h3 className="font-bold text-white text-sm">تابعنا على</h3>
                  </div>
                  <div className="flex gap-2">
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        className={`w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/70 ${social.color} hover:text-white transition-all`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <social.icon className="w-4 h-4" />
                      </motion.a>
                    ))}
                  </div>
                </motion.div>

                {/* Quick Message Box */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="p-4 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-sm border border-primary/30"
                >
                  <h3 className="font-bold text-white text-sm mb-2">هل لديك سؤال عاجل؟</h3>
                  <p className="text-white/60 text-xs mb-3">تواصل معنا مباشرة عبر الواتساب للرد السريع</p>
                  <motion.a
                    href="https://wa.me/966500000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/20 text-green-400 text-sm font-medium border border-green-500/30 hover:bg-green-500/30 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <MessageSquare className="w-4 h-4" />
                    تواصل عبر واتساب
                  </motion.a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
