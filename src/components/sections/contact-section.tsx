"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  Send, Mail, Phone, MapPin, Clock, Instagram, Twitter, Linkedin, Facebook, CheckCircle,
} from "lucide-react";

const contactInfo = [
  { icon: Phone, label: "اتصل بنا", value: "+966 50 000 0000", href: "tel:+966500000000" },
  { icon: Mail, label: "راسلنا", value: "info@avatar-ad.com", href: "mailto:info@avatar-ad.com" },
  { icon: MapPin, label: "زورنا", value: "الرياض، المملكة العربية السعودية", href: "#" },
  { icon: Clock, label: "ساعات العمل", value: "الأحد - الخميس: 9ص - 6م", href: "#" },
];

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Facebook, href: "#", label: "Facebook" },
];

const services = [
  "تصميم المواقع", "الهوية البصرية", "السوشيال ميديا", "إنتاج الفيديو",
  "الحملات الإعلانية", "اللافتات", "المعارض والستاندات", "الهدايا الدعائية", "الاستشارات",
];

const particlePositions = [
  { left: 8, top: 12, duration: 9, delay: 0.5 },
  { left: 18, top: 28, duration: 10, delay: 1.2 },
  { left: 28, top: 44, duration: 8, delay: 0.3 },
  { left: 38, top: 60, duration: 11, delay: 1.8 },
  { left: 48, top: 76, duration: 9, delay: 0.8 },
  { left: 58, top: 20, duration: 10, delay: 1.5 },
  { left: 68, top: 36, duration: 8, delay: 0.2 },
  { left: 78, top: 52, duration: 11, delay: 1.0 },
  { left: 88, top: 68, duration: 9, delay: 1.6 },
  { left: 15, top: 84, duration: 10, delay: 0.7 },
  { left: 35, top: 15, duration: 8, delay: 1.3 },
  { left: 55, top: 35, duration: 11, delay: 0.9 },
  { left: 75, top: 55, duration: 9, delay: 1.1 },
  { left: 92, top: 75, duration: 10, delay: 0.4 },
  { left: 5, top: 45, duration: 8, delay: 1.7 },
  { left: 25, top: 65, duration: 11, delay: 0.6 },
  { left: 45, top: 85, duration: 9, delay: 1.4 },
  { left: 65, top: 10, duration: 10, delay: 0.1 },
  { left: 85, top: 30, duration: 8, delay: 1.9 },
  { left: 95, top: 50, duration: 11, delay: 0.85 },
];

export function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({
    name: "", email: "", phone: "", service: "", message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [50, 0]);

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

  return (
    <section ref={containerRef} id="contact" className="relative min-h-[150vh] py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1D37] via-[#0d2341] to-[#0A1D37]" />

      {/* Particles */}
      {particlePositions.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/40 rounded-full"
          style={{ left: `${p.left}%`, top: `${p.top}%` }}
          animate={{ y: [0, -100, 0], opacity: [0, 1, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
        />
      ))}

      {/* Sticky Content */}
      <motion.div style={{ opacity }} className="sticky top-0 h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4"
            >
              تواصل معنا
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-black"
            >
              لنبدأ <span className="gold-text">مشروعك</span> معاً
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-white/50 mt-3 text-sm"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              LET&apos;S START YOUR PROJECT TOGETHER
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <motion.div style={{ y }} className="preserve-3d perspective-container">
              <motion.form
                onSubmit={handleSubmit}
                className="relative p-6 md:p-8 rounded-3xl overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(13, 35, 65, 0.9) 0%, rgba(10, 29, 55, 0.95) 100%)",
                  border: "1px solid rgba(212, 175, 55, 0.15)",
                }}
                whileHover={{ rotateY: 2, rotateX: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Glow Effect */}
                <div className="absolute -inset-px bg-gradient-to-br from-primary/20 via-transparent to-primary/10 rounded-3xl opacity-50" />

                <div className="relative z-10 space-y-5">
                  {/* Name */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <label className="block text-sm font-medium text-white/70 mb-2">الاسم الكامل</label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-secondary/50 border border-primary/20 text-white placeholder:text-white/30 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="أدخل اسمك الكامل"
                    />
                  </motion.div>

                  {/* Email & Phone */}
                  <div className="grid md:grid-cols-2 gap-5">
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <label className="block text-sm font-medium text-white/70 mb-2">البريد الإلكتروني</label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-secondary/50 border border-primary/20 text-white placeholder:text-white/30 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="example@email.com"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 }}
                      viewport={{ once: true }}
                    >
                      <label className="block text-sm font-medium text-white/70 mb-2">رقم الهاتف</label>
                      <input
                        type="tel"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-secondary/50 border border-primary/20 text-white placeholder:text-white/30 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="+966 50 000 0000"
                      />
                    </motion.div>
                  </div>

                  {/* Service Select */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <label className="block text-sm font-medium text-white/70 mb-2">الخدمة المطلوبة</label>
                    <select
                      required
                      value={formState.service}
                      onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-secondary/50 border border-primary/20 text-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-card">اختر الخدمة</option>
                      {services.map((service) => (
                        <option key={service} value={service} className="bg-card">{service}</option>
                      ))}
                    </select>
                  </motion.div>

                  {/* Message */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 }}
                    viewport={{ once: true }}
                  >
                    <label className="block text-sm font-medium text-white/70 mb-2">تفاصيل المشروع</label>
                    <textarea
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-secondary/50 border border-primary/20 text-white placeholder:text-white/30 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                      placeholder="أخبرنا عن مشروعك وأهدافك..."
                    />
                  </motion.div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                    className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                      isSubmitted ? "bg-green-500 text-white" : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-6 h-6 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
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
              </motion.form>
            </motion.div>

            {/* Contact Info */}
            <motion.div style={{ y }} className="space-y-6">
              {/* Info Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="group p-5 rounded-2xl bg-secondary/30 border border-primary/10 hover:border-primary/30 transition-all"
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-white/40 mb-1">{item.label}</p>
                        <p className="text-white font-medium">{item.value}</p>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-secondary/30 border border-primary/10"
              >
                <h3 className="font-bold text-white mb-4">تابعنا على</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Map Placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                viewport={{ once: true }}
                className="h-48 rounded-2xl overflow-hidden relative bg-secondary/30 border border-primary/10"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
                    <p className="text-white/60">الرياض، المملكة العربية السعودية</p>
                  </div>
                </div>
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(212, 175, 55, 0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(212, 175, 55, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: "20px 20px",
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
