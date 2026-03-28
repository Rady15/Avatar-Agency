"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Send, Mail, Phone, MapPin, Clock, Instagram, Linkedin, Facebook, CheckCircle, MessageSquare, Twitter
} from "lucide-react";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.67a8.2 8.2 0 004.76 1.52V6.74a4.86 4.86 0 01-1-.05z" />
  </svg>
);

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/theavatarksa", label: "Facebook", color: "hover:bg-blue-600" },
  { icon: Instagram, href: "https://www.instagram.com/theavatarksa", label: "Instagram", color: "hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600" },
  { icon: Twitter, href: "https://twitter.com/theavatarksa", label: "Twitter", color: "hover:bg-sky-500" },
  { icon: TikTokIcon, href: "https://www.tiktok.com/@theavatarksa", label: "TikTok", color: "hover:bg-black" },
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
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formsubmit.co/ajax/marketing@avatarksa.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: `طلب خدمة جديد: ${formState.service}`,
          الاسم: formState.name,
          'البريد الإلكتروني': formState.email,
          'رقم الهاتف': formState.phone,
          'الخدمة المطلوبة': formState.service,
          الرسالة: formState.message,
          _template: 'table',
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setShowModal(true);
        setFormState({ name: "", email: "", phone: "", service: "", message: "" });
        setTimeout(() => {
          setIsSubmitted(false);
          setShowModal(false);
        }, 6000);
      } else {
        alert(language === 'ar' ? 'حدث خطأ، حاول مرة أخرى' : 'An error occurred, please try again');
      }
    } catch {
      alert(language === 'ar' ? 'حدث خطأ في الاتصال، حاول مرة أخرى' : 'Connection error, please try again');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactCards = [
    { icon: Phone, label: language === 'ar' ? 'اتصل بنا' : 'Call Us', value: "+966 56 881 6357", href: "tel:+966568816357", bg: "bg-emerald-500" },
    { icon: Mail, label: language === 'ar' ? 'راسلنا' : 'Email Us', value: "marketing@avatarksa.com", href: "mailto:marketing@avatarksa.com", bg: "bg-blue-500" },
    { icon: MapPin, label: language === 'ar' ? 'موقعنا' : 'Our Location', value: language === 'ar' ? 'المنطقة الشرقية - الدمام' : 'Eastern Province - Dammam', href: "#", bg: "bg-orange-500" },
    { icon: Clock, label: language === 'ar' ? 'أوقات العمل' : 'Working Hours', value: language === 'ar' ? 'الأحد - الخميس: 9ص - 6م' : 'Sun - Thu: 9AM - 6PM', href: "#", bg: "bg-purple-500" },
  ];

  return (
    <>
      <section id="contact" className="relative min-h-screen" style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}>
        {/* Background */}
        {showBackground && (
          <div className="fixed inset-0 z-0 w-full h-full overflow-hidden pointer-events-none">
            <img src="/1.webp" alt="Background" className="w-full h-full object-cover" />
          </div>
        )}

        <div className="sticky top-0 min-h-screen w-full flex items-center justify-center overflow-visible">
          <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-20">
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
                  <>تواصل <span className="text-yellow-400">معنا</span></>
                ) : (
                  <>Contact <span className="text-yellow-400">Us</span></>
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
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
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
                      <p className="text-white font-medium text-sm" dir="ltr">{card.value}</p>
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
                  href="https://wa.me/966568816357"
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
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
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
                        placeholder="+966 56 881 6357"
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
                      style={{ colorScheme: 'dark' }}
                    >
                      <option value="" className="bg-[#1a1a2e] text-white">{language === 'ar' ? 'اختر الخدمة' : 'Choose Service'}</option>
                      {servicesList.map((service) => (
                        <option key={service.label} value={service.label} className="bg-[#1a1a2e] text-white">
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
                    className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${isSubmitted
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
        </div>
      </section>

      {/* Success Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal Content */}
            <motion.div
              className="relative w-full max-w-md rounded-3xl overflow-hidden"
              initial={{ scale: 0.5, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Gradient Border */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 rounded-3xl" />
              <div className="relative m-[2px] bg-[#0a1628] rounded-[22px] p-8 md:p-10 text-center">

                {/* Animated Checkmark */}
                <motion.div
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                >
                  <motion.svg
                    width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <motion.path
                      d="M5 13l4 4L19 7"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    />
                  </motion.svg>
                </motion.div>

                {/* Sparkle dots */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-yellow-400"
                    style={{
                      top: `${20 + Math.sin(i * 60 * Math.PI / 180) * 35}%`,
                      left: `${50 + Math.cos(i * 60 * Math.PI / 180) * 40}%`,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.1, repeat: Infinity, repeatDelay: 2 }}
                  />
                ))}

                {/* Arabic Text */}
                <motion.h3
                  className="text-2xl md:text-3xl font-black text-white mb-3"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {language === 'ar' ? 'تم إرسال طلبك بنجاح!' : 'Request Sent Successfully! '}
                </motion.h3>

                <motion.p
                  className="text-white/70 text-base md:text-lg leading-relaxed mb-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {language === 'ar'
                    ? 'سيتم التواصل معك بأقرب وقت من خلال فريق أفتار'
                    : 'Our Avatar team will contact you as soon as possible'}
                </motion.p>

                {/* Close Button */}
                <motion.button
                  onClick={() => setShowModal(false)}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold text-base hover:from-yellow-500 hover:to-yellow-600 transition-all"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {language === 'ar' ? 'حسناً' : 'OK'}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
