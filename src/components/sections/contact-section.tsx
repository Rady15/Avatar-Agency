"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Send, Mail, Phone, MapPin, Clock, Instagram, Linkedin, Facebook, CheckCircle, MessageSquare
} from "lucide-react";

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/theavatarksa", label: "Facebook", color: "hover:bg-blue-600" },
  { icon: Instagram, href: "https://www.instagram.com/theavatarksa?igsh=MW1hY3QzaWJwMWVnNw==", label: "Instagram", color: "hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600" },
  { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:bg-blue-700" },
];

const servicesList = [
  { label: "تصميم المواقع", labelEn: "Web Design" },
  { label: "الهوية البصرية", labelEn: "Visual Identity" },
  { label: "السوشيال ميديا", labelEn: "Social Media" },
  { label: "إنتاج الفيديو", labelEn: "Video Production" },
  { label: "الحملات الإعلانية", labelEn: "Ad Campaigns" },
  { label: "اللافتات", labelEn: "Signage" },
  { label: "المعارض والستاندات", labelEn: "Exhibitions & Stands" },
  { label: "الهدايا الدعائية", labelEn: "Promotional Gifts" },
  { label: "تطبيقات الجوال", labelEn: "Mobile Apps" },
  { label: "المطبوعات", labelEn: "Printing" },
  { label: "الاستشارات", labelEn: "Consulting" },
];

export function ContactSection({ showBackground = true }: { showBackground?: boolean }) {
  const { language, t } = useLanguage();
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

  const contactCards = [
    { icon: Phone, label: language === 'ar' ? 'اتصل بنا' : 'Call Us', value: "+966 50 000 0000", href: "tel:+966500000000", bg: "bg-emerald-500" },
    { icon: Mail, label: language === 'ar' ? 'راسلنا' : 'Email Us', value: "info@avatar-ad.com", href: "mailto:info@avatar-ad.com", bg: "bg-blue-500" },
    { icon: MapPin, label: language === 'ar' ? 'موقعنا' : 'Our Location', value: language === 'ar' ? 'الرياض، السعودية' : 'Riyadh, Saudi Arabia', href: "#", bg: "bg-orange-500" },
    { icon: Clock, label: language === 'ar' ? 'أوقات العمل' : 'Working Hours', value: language === 'ar' ? 'الأحد - الخميس: 9ص - 6م' : 'Sun - Thu: 9AM - 6PM', href: "#", bg: "bg-purple-500" },
  ];

  return (
    <section id="contact" className="relative py-20 overflow-hidden" style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}>
      {/* Background */}
      {showBackground && (
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A1D37] via-[#0d2847] to-[#0A1D37]" />
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
            {language === 'ar' ? (
              <>تواصل <span className="gold-text">معنا</span></>
            ) : (
              <>Contact <span className="gold-text">Us</span></>
            )}
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'نحن هنا لمساعدتك في تحقيق أحلامك التسويقية. تواصل معنا الآن!'
              : 'We are here to help you achieve your marketing dreams. Contact us now!'}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Contact Cards Grid */}
            <div className="grid grid-cols-2 gap-4">
              {contactCards.map((card, index) => (
                <motion.a
                  key={card.label}
                  href={card.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all"
                >
                  <div className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center mb-3`}>
                    <card.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-white/50 text-xs mb-1">{card.label}</p>
                  <p className="text-white font-medium text-sm">{card.value}</p>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <h3 className="text-white font-bold mb-4">{language === 'ar' ? 'تابعنا على وسائل التواصل' : 'Follow Us on Social Media'}</h3>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all"
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* WhatsApp CTA */}
            <motion.a
              href="https://wa.me/966500000000"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-green-500/20 border border-green-500/30 text-green-400 font-bold"
            >
              <MessageSquare className="w-6 h-6" />
              {language === 'ar' ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}
            </motion.a>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="rounded-2xl overflow-hidden border border-white/10 h-48"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3571.083295488267!2d46.67529531525595!3d24.71357298046908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f02e3f1f1f1f1%3A0x1f1f1f1f1f1f1f1!2sRiyadh%2C%20Saudi%20Arabia!5e0!3m2!1sen!2sus!4v1635789012345!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Riyadh Location"
              />
            </motion.div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="p-6 md:p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 space-y-5">
              <h3 className="text-2xl font-bold text-white mb-6">
                {language === 'ar' ? 'أرسل لنا رسالة' : 'Send Us a Message'}
              </h3>

              {/* Name */}
              <div>
                <label className="block text-white/70 text-sm mb-2">{language === 'ar' ? 'الاسم الكامل' : 'Full Name'}</label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all"
                  placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                />
              </div>

              {/* Email & Phone */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 text-sm mb-2">{language === 'ar' ? 'البريد الإلكتروني' : 'Email'}</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all"
                    placeholder="example@email.com"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">{language === 'ar' ? 'رقم الهاتف' : 'Phone'}</label>
                  <input
                    type="tel"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all"
                    placeholder="+966 50 000 0000"
                  />
                </div>
              </div>

              {/* Service */}
              <div>
                <label className="block text-white/70 text-sm mb-2">{language === 'ar' ? 'الخدمة المطلوبة' : 'Required Service'}</label>
                <select
                  required
                  value={formState.service}
                  onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all appearance-none cursor-pointer"
                >
                  <option value="" className="bg-[#0A1D37]">{language === 'ar' ? 'اختر الخدمة' : 'Choose Service'}</option>
                  {servicesList.map((service) => (
                    <option key={service.label} value={service.label} className="bg-[#0A1D37]">
                      {language === 'ar' ? service.label : service.labelEn}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-white/70 text-sm mb-2">{language === 'ar' ? 'الرسالة' : 'Message'}</label>
                <textarea
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all resize-none"
                  placeholder={language === 'ar' ? 'أخبرنا عن مشروعك...' : 'Tell us about your project...'}
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                  isSubmitted 
                    ? "bg-green-500 text-white" 
                    : "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600"
                }`}
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
                    {language === 'ar' ? 'تم الإرسال!' : 'Sent!'}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    {language === 'ar' ? 'إرسال الرسالة' : 'Send Message'}
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
