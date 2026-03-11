"use client";

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import {
  Globe, Palette, MessageCircle, Video, Megaphone, Monitor, Building2, Gift, Users, ArrowUpLeft,
  ExternalLink, Calendar, CheckCircle, Smartphone, Printer, ChevronLeft, ChevronRight
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { CardCarousel } from "@/components/ui/card-carousel";

// Enhanced services with real portfolio data
const services = [
  {
    id: 1,
    title: "تصميم المواقع",
    imgDir: "تصميم المواقع",
    titleEn: "Web Design",
    description: "نصمم ونطور مواقع ويب احترافية ومتجاوبة تعكس هوية علامتك التجارية وتوفر تجربة مستخدم استثنائية تميزك عن المنافسين.",
    descriptionEn: "We design and develop professional, responsive websites that reflect your brand identity.",
    cta: "اطلب الخدمة",
    ctaEn: "Request Service",
    bg: "#C62828",
    bgExpanded: "linear-gradient(180deg, #C62828 0%, #7f1818 100%)",
    accent: "#FFD4D4",
    portfolio: [
      { id: 1, title: "تصميم واجهة مستخدم", titleEn: "UI Design", year: "2024", description: "تصميم واجهة مستخدم حديثة", descriptionEn: "Modern UI Design", image: encodeURI("/assets/تصميم المواقع/protfolio/1.jpg"), tags: ["UI/UX"], tagsEn: ["UI/UX"] },
      { id: 2, title: "تجربة مستخدم", titleEn: "UX Design", year: "2024", description: "تحسين تجربة المستخدم", descriptionEn: "UX Optimization", image: encodeURI("/assets/تصميم المواقع/protfolio/2.jpg"), tags: ["UX"], tagsEn: ["UX"] },
      { id: 3, title: "متجر إلكتروني", titleEn: "E-Commerce", year: "2024", description: "تصميم متجر إلكتروني متكامل", descriptionEn: "Total E-commerce Design", image: encodeURI("/assets/تصميم المواقع/protfolio/3.jpg"), tags: ["E-Commerce"], tagsEn: ["E-Commerce"] },
      { id: 4, title: "موقع تعريفي", titleEn: "Corporate Site", year: "2023", description: "موقع تعريفي للشركات", descriptionEn: "Corporate Branding Site", image: encodeURI("/assets/تصميم المواقع/protfolio/4.png"), tags: ["Corporate"], tagsEn: ["Corporate"] },
      { id: 5, title: "بوابة إلكترونية", titleEn: "Web Portal", year: "2023", description: "تطوير بوابة إلكترونية", descriptionEn: "Web Portal Development", image: encodeURI("/assets/تصميم المواقع/protfolio/5.png"), tags: ["Portal"], tagsEn: ["Portal"] },
    ]
  },
  {
    id: 2,
    title: "الهوية البصرية",
    imgDir: "الهوية البصرية",
    titleEn: "Branding",
    description: "نبني هويات بصرية متكاملة ومتميزة تعكس قيم علامتك التجارية.",
    descriptionEn: "We build integrated visual identities that reflect your brand values.",
    cta: "اطلب الخدمة",
    ctaEn: "Request Service",
    bg: "#D4AF37",
    bgExpanded: "linear-gradient(180deg, #D4AF37 0%, #9a7d1e 100%)",
    accent: "#0A1D37",
    portfolio: [
      { id: 1, title: "شعار وهوية", titleEn: "Logo & ID", year: "2024", description: "تصميم هوية كاملة", descriptionEn: "Full Identity Design", image: encodeURI("/assets/الهوية البصرية/protfolio/1.png"), tags: ["Branding"], tagsEn: ["Branding"] },
      { id: 2, title: "بروفايل شركة", titleEn: "Company Profile", year: "2024", description: "تصميم بروفايل احترافي", descriptionEn: "Professional Profile", image: encodeURI("/assets/الهوية البصرية/protfolio/2.png"), tags: ["Profile"], tagsEn: ["Profile"] },
      { id: 3, title: "تغليف منتجات", titleEn: "Packaging", year: "2024", description: "تصميم تغليف مبتكر", descriptionEn: "Innovative Packaging", image: encodeURI("/assets/الهوية البصرية/protfolio/3.png"), tags: ["Packaging"], tagsEn: ["Packaging"] },
      { id: 4, title: "أوراق رسمية", titleEn: "Stationery", year: "2023", description: "تصميم مطبوعات مكتبية", descriptionEn: "Stationery Design", image: encodeURI("/assets/الهوية البصرية/protfolio/4.png"), tags: ["Stationery"], tagsEn: ["Stationery"] },
      { id: 5, title: "دليل الهوية", titleEn: "Brand Guidelines", year: "2023", description: "إعداد ميثاق الهوية", descriptionEn: "Brand Manual", image: encodeURI("/assets/الهوية البصرية/protfolio/5.png"), tags: ["Manual"], tagsEn: ["Manual"] },
      { id: 6, title: "هوية بصرية", titleEn: "Visual Identity", year: "2024", description: "تطوير هوية بصرية", descriptionEn: "Visual ID Development", image: encodeURI("/assets/الهوية البصرية/protfolio/6.png"), tags: ["Visual"], tagsEn: ["Visual"] },
      { id: 7, title: "تطبيقات الهوية", titleEn: "ID Applications", year: "2024", description: "تطبيقات الهوية التجارية", descriptionEn: "Commercial Applications", image: encodeURI("/assets/الهوية البصرية/protfolio/7.png"), tags: ["Apps"], tagsEn: ["Apps"] },
      { id: 8, title: "تصميم شعار", titleEn: "Logo Design", year: "2024", description: "تصميم شعار مميز", descriptionEn: "Unique Logo", image: encodeURI("/assets/الهوية البصرية/protfolio/8.png"), tags: ["Logo"], tagsEn: ["Logo"] },
      { id: 9, title: "هوية مؤسسية", titleEn: "Corporate Identity", year: "2023", description: "هوية مؤسسية متكاملة", descriptionEn: "Full Corporate Identity", image: encodeURI("/assets/الهوية البصرية/protfolio/9.png"), tags: ["Corporate"], tagsEn: ["Corporate"] },
      { id: 10, title: "إعادة بناء الهوية", titleEn: "Rebranding", year: "2023", description: "تحديث الهوية البصرية", descriptionEn: "Brand Refresh", image: encodeURI("/assets/الهوية البصرية/protfolio/10.png"), tags: ["Refresh"], tagsEn: ["Refresh"] },
    ]
  },
  {
    id: 3,
    title: "السوشيال ميديا",
    imgDir: "السوشيال ميديا",
    titleEn: "Social Media",
    description: "ندير حساباتك على منصات التواصل الاجتماعي باحترافية.",
    descriptionEn: "We professionally manage your social media accounts.",
    cta: "اطلب الخدمة",
    ctaEn: "Request Service",
    bg: "#1565C0",
    bgExpanded: "linear-gradient(180deg, #1565C0 0%, #0d3f7a 100%)",
    accent: "#B3E5FC",
    portfolio: [
      { id: 1, title: "تصاميم سوشيال", titleEn: "Social Posts", year: "2024", description: "تصميم منشورات جذابة", descriptionEn: "Engaging Social Posts", image: encodeURI("/assets/السوشيال ميديا/portfolio/1.jpg"), tags: ["Social"], tagsEn: ["Social"] },
      { id: 2, title: "إدارة محتوى", titleEn: "Content Mgmt", year: "2024", description: "إدارة المحتوى الرقمي", descriptionEn: "Digital Content Management", image: encodeURI("/assets/السوشيال ميديا/portfolio/2.jpg"), tags: ["Content"], tagsEn: ["Content"] },
      { id: 3, title: "حملة إبداعية", titleEn: "Creative Campaign", year: "2024", description: "حملة إبداعية متكاملة", descriptionEn: "Integrated Creative Campaign", image: encodeURI("/assets/السوشيال ميديا/portfolio/3.jpg"), tags: ["Campaign"], tagsEn: ["Campaign"] },
    ]
  },
  {
    id: 4,
    title: "إنتاج الفيديو",
    imgDir: "انتاج الفديو",
    titleEn: "Video Production",
    description: "ننتج فيديوهات إعلانية وترويجية احترافية.",
    descriptionEn: "We produce professional advertising and promotional videos.",
    cta: "اطلب الخدمة",
    ctaEn: "Request Service",
    bg: "#6A1B9A",
    bgExpanded: "linear-gradient(180deg, #6A1B9A 0%, #40105c 100%)",
    accent: "#E1BEE7",
    portfolio: [
      { id: 1, title: "إعلان تجاري", titleEn: "Commercial TVC", year: "2024", description: "إنتاج إعلان تلفزيوني", descriptionEn: "TVC Production", image: encodeURI("/assets/انتاج الفديو/protfolio/1.jpg"), tags: ["TVC"], tagsEn: ["TVC"] },
      { id: 2, title: "فيديو تعريفي", titleEn: "Intro Video", year: "2024", description: "فيديو تعريفي للشركات", descriptionEn: "Corporate Intro Video", image: encodeURI("/assets/انتاج الفديو/protfolio/2.jpg"), tags: ["Intro"], tagsEn: ["Intro"] },
      { id: 3, title: "موشن جرافيك", titleEn: "Motion Graphics", year: "2024", description: "تصميم موشن جرافيك", descriptionEn: "Motion Graphics Design", image: encodeURI("/assets/انتاج الفديو/protfolio/3.png"), tags: ["Motion"], tagsEn: ["Motion"] },
    ]
  },
  {
    id: 5,
    title: "الحملات الإعلانية",
    imgDir: "اعلانت ممولة",
    titleEn: "Paid Ads",
    description: "نصمم وندير حملات إعلانية مدفوعة فعّالة.",
    descriptionEn: "We design and manage effective paid advertising campaigns.",
    cta: "اطلب الخدمة",
    ctaEn: "Request Service",
    bg: "#E65100",
    bgExpanded: "linear-gradient(180deg, #E65100 0%, #8c3200 100%)",
    accent: "#FFE0B2",
    portfolio: [
      { id: 1, title: "حملة سناب", titleEn: "Snapchat Ads", year: "2024", description: "إعلانات سناب شات", descriptionEn: "Snapchat Ads Campaign", image: encodeURI("/assets/اعلانت ممولة/portfolio/1.jpg"), tags: ["Snap"], tagsEn: ["Snap"] },
      { id: 2, title: "حملة تيك توك", titleEn: "TikTok Ads", year: "2024", description: "إعلانات تيك توك", descriptionEn: "TikTok Ads Campaign", image: encodeURI("/assets/اعلانت ممولة/portfolio/2.jpg"), tags: ["TikTok"], tagsEn: ["TikTok"] },
      { id: 3, title: "حملة ميتا", titleEn: "Meta Ads", year: "2024", description: "إعلانات فيسبوك وانستجرام", descriptionEn: "Facebook & Instagram Ads", image: encodeURI("/assets/اعلانت ممولة/portfolio/3.jpg"), tags: ["Meta"], tagsEn: ["Meta"] },
      { id: 4, title: "جوجل أدز", titleEn: "Google Ads", year: "2023", description: "حملة جوجل أدز", descriptionEn: "Google Search Ads", image: encodeURI("/assets/اعلانت ممولة/portfolio/4.jpg"), tags: ["Google"], tagsEn: ["Google"] },
      { id: 5, title: "إعلان ممول", titleEn: "Sponsored Ad", year: "2023", description: "إعلانات ممولة احترافية", descriptionEn: "Professional Sponsored Ads", image: encodeURI("/assets/اعلانت ممولة/portfolio/4.png"), tags: ["Ads"], tagsEn: ["Ads"] },
    ]
  },
  {
    id: 6,
    title: "اللافتات",
    imgDir: "اللافتات",
    titleEn: "Signage",
    description: "نصمم وننفذ لافتات داخلية وخارجية مميزة.",
    descriptionEn: "We design and execute distinctive indoor and outdoor signage.",
    cta: "اطلب الخدمة",
    ctaEn: "Request Service",
    bg: "#1B5E20",
    bgExpanded: "linear-gradient(180deg, #1B5E20 0%, #103812 100%)",
    accent: "#C8E6C9",
    portfolio: [
      { id: 1, title: "لافتة خارجية", titleEn: "Outdoor Sign", year: "2024", description: "تصميم لافتة محلات", descriptionEn: "Retail Signboard Design", image: encodeURI("/assets/اللافتات/portfolio/1.png"), tags: ["Outdoor"], tagsEn: ["Outdoor"] },
      { id: 2, title: "لافتة ثلاثية الأبعاد", titleEn: "3D Signage", year: "2024", description: "حروف بارزة مضيئة", descriptionEn: "Illuminated 3D Letters", image: encodeURI("/assets/اللافتات/portfolio/2.png"), tags: ["3D"], tagsEn: ["3D"] },
      { id: 3, title: "لوحة توجيهية", titleEn: "Directional Sign", year: "2024", description: "لوحات توجيهية داخلية", descriptionEn: "Indoor Wayfinding", image: encodeURI("/assets/اللافتات/portfolio/3.png"), tags: ["Wayfinding"], tagsEn: ["Wayfinding"] },
      { id: 4, title: "لوحة بوب أب", titleEn: "Pop-up Sign", year: "2023", description: "لوحات عرض مؤقتة", descriptionEn: "Temporary Display Sign", image: encodeURI("/assets/اللافتات/portfolio/4.png"), tags: ["Display"], tagsEn: ["Display"] },
      { id: 5, title: "لافتة مكتبية", titleEn: "Office Sign", year: "2023", description: "لافتات مكاتب واستقبال", descriptionEn: "Office & Reception Sign", image: encodeURI("/assets/اللافتات/portfolio/5.png"), tags: ["Office"], tagsEn: ["Office"] },
      { id: 6, title: "لافتة جدارية", titleEn: "Wall Mural", year: "2024", description: "تصميم جداريات تجارية", descriptionEn: "Commercial Wall Murals", image: encodeURI("/assets/اللافتات/portfolio/6.png"), tags: ["Mural"], tagsEn: ["Mural"] },
    ]
  },
  {
    id: 7,
    title: "المعارض والستاندات",
    imgDir: "المعارض",
    titleEn: "Exhibitions",
    description: "نصمم وننفذ ستاندات معارض احترافية.",
    descriptionEn: "We design and execute professional exhibition stands.",
    cta: "اطلب الخدمة",
    ctaEn: "Request Service",
    bg: "#00695C",
    bgExpanded: "linear-gradient(180deg, #00695C 0%, #003d34 100%)",
    accent: "#B2DFDB",
    portfolio: [
      { id: 1, title: "بوث معرض", titleEn: "Expo Booth", year: "2024", description: "تصميم بوث متكامل", descriptionEn: "Full Expo Booth Design", image: encodeURI("/assets/المعارض/portfolio/1.png"), tags: ["Booth"], tagsEn: ["Booth"] },
      { id: 2, title: "ستاند عرض", titleEn: "Display Stand", year: "2024", description: "ستاند عرض منتجات", descriptionEn: "Product Display Stand", image: encodeURI("/assets/المعارض/portfolio/2.png"), tags: ["Stand"], tagsEn: ["Stand"] },
      { id: 3, title: "منصة عرض", titleEn: "Promo Counter", year: "2024", description: "منصة ترويجية", descriptionEn: "Promotional Counter", image: encodeURI("/assets/المعارض/portfolio/3.png"), tags: ["Counter"], tagsEn: ["Counter"] },
      { id: 4, title: "رول أب", titleEn: "Roll-up Banner", year: "2023", description: "تصميم رول أب", descriptionEn: "Roll-up Design", image: encodeURI("/assets/المعارض/portfolio/4.png"), tags: ["Banner"], tagsEn: ["Banner"] },
      { id: 5, title: "خلفية معرض", titleEn: "Backdrop", year: "2023", description: "خلفية تصوير معارض", descriptionEn: "Expo Backdrop", image: encodeURI("/assets/المعارض/portfolio/5.png"), tags: ["Backdrop"], tagsEn: ["Backdrop"] },
      { id: 6, title: "ستاند تفاعلي", titleEn: "Interactive Stand", year: "2024", description: "ستاند عرض تفاعلي", descriptionEn: "Interactive Expo Stand", image: encodeURI("/assets/المعارض/portfolio/6.png"), tags: ["Interactive"], tagsEn: ["Interactive"] },
      { id: 7, title: "تجهيز أجنحة", titleEn: "Booth Setup", year: "2024", description: "تجهيز أجنحة المعارض", descriptionEn: "Exhibition Booth Setup", image: encodeURI("/assets/المعارض/portfolio/7.png"), tags: ["Setup"], tagsEn: ["Setup"] },
    ]
  },
  {
    id: 8,
    title: "الهدايا الدعائية",
    imgDir: "هدايا",
    titleEn: "Promo Gifts",
    description: "نوفر هدايا دعائية إبداعية ومخصصة.",
    descriptionEn: "We provide creative and customized promotional gifts.",
    cta: "اطلب الخدمة",
    ctaEn: "Request Service",
    bg: "#37474F",
    bgExpanded: "linear-gradient(180deg, #37474F 0%, #1a2328 100%)",
    accent: "#CFD8DC",
    portfolio: [
      { id: 1, title: "هدية مؤسسية", titleEn: "Corporate Gift", year: "2024", description: "هدايا شركات فاخرة", descriptionEn: "Luxury Corporate Gifts", image: encodeURI("/assets/هدايا/protfolio/1.png"), tags: ["Gifts"], tagsEn: ["Gifts"] },
      { id: 2, title: "منتجات دعائية", titleEn: "Promo Products", year: "2024", description: "مطبوعات دعائية للهدايا", descriptionEn: "Custom Promo Products", image: encodeURI("/assets/هدايا/protfolio/2.png"), tags: ["Promo"], tagsEn: ["Promo"] },
      { id: 3, title: "طقم هدايا", titleEn: "Gift Set", year: "2024", description: "طقم هدايا متكامل", descriptionEn: "Full Gift Set", image: encodeURI("/assets/هدايا/protfolio/3.png"), tags: ["Set"], tagsEn: ["Set"] },
      { id: 4, title: "هدايا ترويجية", titleEn: "Giveaways", year: "2023", description: "توزيعات وهدايا بسيطة", descriptionEn: "Promotional Giveaways", image: encodeURI("/assets/هدايا/protfolio/4.png"), tags: ["Giveaway"], tagsEn: ["Giveaway"] },
    ]
  },
  {
    id: 9,
    title: "تطبيقات الجوال",
    imgDir: "تطبيقات",
    titleEn: "App Development",
    description: "نصمم ونطور تطبيقات جوال احترافية.",
    descriptionEn: "We design and develop professional mobile apps.",
    cta: "اطلب الخدمة",
    ctaEn: "Request Service",
    bg: "#0277BD",
    bgExpanded: "linear-gradient(180deg, #0277BD 0%, #014a85 100%)",
    accent: "#B3E5FC",
    portfolio: [
      { id: 1, title: "واجهة تطبيق", titleEn: "App UI", year: "2024", description: "تصميم واجهة تطبيق جوال", descriptionEn: "Mobile App UI Design", image: encodeURI("/assets/تطبيقات/protfolio/1.jpg"), tags: ["App"], tagsEn: ["App"] },
      { id: 2, title: "تطبيق تجاري", titleEn: "Retail App", year: "2024", description: "تطبيقات التجارة الإلكترونية", descriptionEn: "Retail App Development", image: encodeURI("/assets/تطبيقات/protfolio/2.jpg"), tags: ["Retail"], tagsEn: ["Retail"] },
      { id: 3, title: "تجربة مستخدم", titleEn: "App UX", year: "2024", description: "تحسين تجربة مستخدم التطبيقات", descriptionEn: "Mobile UX Optimization", image: encodeURI("/assets/تطبيقات/protfolio/3.jpg"), tags: ["UX"], tagsEn: ["UX"] },
      { id: 4, title: "تطبيق خدمي", titleEn: "Service App", year: "2023", description: "تطبيقات الخدمات اللوجستية", descriptionEn: "Service Booking App", image: encodeURI("/assets/تطبيقات/protfolio/4.jpg"), tags: ["Services"], tagsEn: ["Services"] },
      { id: 5, title: "برمجة تطبيقات", titleEn: "App Coding", year: "2023", description: "برمجة تطبيقات الكروس بلاتفورم", descriptionEn: "Cross-platform Development", image: encodeURI("/assets/تطبيقات/protfolio/5.jpg"), tags: ["Coding"], tagsEn: ["Coding"] },
      { id: 6, title: "تطبيق ذكي", titleEn: "Smart App", year: "2024", description: "تطبيقات المدن الذكية", descriptionEn: "Smart City Solutions App", image: encodeURI("/assets/تطبيقات/protfolio/6.jpg"), tags: ["Smart"], tagsEn: ["Smart"] },
    ]
  },
  {
    id: 10,
    title: "المطبوعات",
    imgDir: "مطبوعات",
    titleEn: "Printed Materials",
    description: "نقدم خدمات طباعة احترافية عالية الجودة.",
    descriptionEn: "We provide professional high-quality printing services.",
    cta: "اطلب الخدمة",
    ctaEn: "Request Service",
    bg: "#5D4037",
    bgExpanded: "linear-gradient(180deg, #5D4037 0%, #3e2723 100%)",
    accent: "#D7CCC8",
    portfolio: [
      { id: 1, title: "منيو مطعم", titleEn: "Restaurant Menu", year: "2024", description: "تصميم طباعة المنيو", descriptionEn: "Restaurant Menu Printing", image: encodeURI("/assets/مطبوعات/protfolio/1.png"), tags: ["Menu"], tagsEn: ["Menu"] },
      { id: 2, title: "بروشور تعريفي", titleEn: "Brochure", year: "2024", description: "تصميم بروشورات إعلانية", descriptionEn: "Promotional Brochures", image: encodeURI("/assets/مطبوعات/protfolio/2.png"), tags: ["Brochure"], tagsEn: ["Brochure"] },
      { id: 3, title: "بطاقة عمل", titleEn: "Business Card", year: "2024", description: "تصميم كروت شخصية", descriptionEn: "Professional Business Cards", image: encodeURI("/assets/مطبوعات/protfolio/3.png"), tags: ["Card"], tagsEn: ["Card"] },
      { id: 4, title: "ظرف مراسلات", titleEn: "Envelope", year: "2023", description: "تصميم أظرف رسمية", descriptionEn: "Corporate Envelopes", image: encodeURI("/assets/مطبوعات/protfolio/4.png"), tags: ["Envelope"], tagsEn: ["Envelope"] },
      { id: 5, title: "فلاير إعلاني", titleEn: "Flyer", year: "2023", description: "طباعة فلايرات عروض", descriptionEn: "Marketing Flyers", image: encodeURI("/assets/مطبوعات/protfolio/5.png"), tags: ["Flyer"], tagsEn: ["Flyer"] },
      { id: 6, title: "مجلد شركات", titleEn: "Folder", year: "2024", description: "تصميم مجلدات الأوراق", descriptionEn: "Corporate Folders", image: encodeURI("/assets/مطبوعات/protfolio/6.png"), tags: ["Folder"], tagsEn: ["Folder"] },
      { id: 7, title: "بوستر إعلاني", titleEn: "Poster", year: "2024", description: "طباعة بوسترات دعائية", descriptionEn: "Advertising Posters", image: encodeURI("/assets/مطبوعات/protfolio/7.png"), tags: ["Poster"], tagsEn: ["Poster"] },
      { id: 8, title: "مجلة دورية", titleEn: "Magazine", year: "2024", description: "تصميم وإخراج المجلات", descriptionEn: "Magazine Page Layout", image: encodeURI("/assets/مطبوعات/protfolio/8.png"), tags: ["Magazine"], tagsEn: ["Magazine"] },
      { id: 9, title: "ملصقات منتجات", titleEn: "Stickers", year: "2023", description: "طباعة استيكرات لاصقة", descriptionEn: "Product Stickers Labels", image: encodeURI("/assets/مطبوعات/protfolio/9.png"), tags: ["Label"], tagsEn: ["Label"] },
      { id: 10, title: "أجندة مخصصة", titleEn: "Diary", year: "2023", description: "تصميم أجندات سنوية", descriptionEn: "Customized Diary Design", image: encodeURI("/assets/مطبوعات/protfolio/10.png"), tags: ["Diary"], tagsEn: ["Diary"] },
      { id: 11, title: "شنطة ورقية", titleEn: "Paper Bag", year: "2024", description: "تصميم أكياس ورقية", descriptionEn: "Custom Paper Bag Design", image: encodeURI("/assets/مطبوعات/protfolio/11.png"), tags: ["Bag"], tagsEn: ["Bag"] },
      { id: 12, title: "طباعة قماشية", titleEn: "Canvas Print", year: "2024", description: "تجربة الطباعة الفنية", descriptionEn: "Artistic Canvas Printing", image: encodeURI("/assets/مطبوعات/protfolio/12.png"), tags: ["Canvas"], tagsEn: ["Canvas"] },
    ]
  },
  {
    id: 11,
    title: "الاستشارات",
    imgDir: "استشارات",
    titleEn: "Consulting",
    description: "نقدم استشارات تسويقية متخصصة.",
    descriptionEn: "We provide specialized marketing consulting.",
    cta: "اطلب الخدمة",
    ctaEn: "Request Service",
    bg: "#0A1D37",
    bgExpanded: "linear-gradient(180deg, #0A1D37 0%, #050e1b 100%)",
    accent: "#D4AF37",
    portfolio: [
      { id: 1, title: "خطة تسويقية", titleEn: "Marketing Plan", year: "2024", description: "إعداد استراتيجيات التسويق", descriptionEn: "Marketing Strategy Prep", image: encodeURI("/assets/استشارات/portfolio/1.jpg"), tags: ["Strategy"], tagsEn: ["Strategy"] },
      { id: 2, title: "دراسة جدوى", titleEn: "Feasibility Study", year: "2024", description: "دراسات الجدوى الاقتصادية", descriptionEn: "Economic Feasibility Study", image: encodeURI("/assets/استشارات/portfolio/2.jpg"), tags: ["Study"], tagsEn: ["Study"] },
      { id: 3, title: "تحليل منافسين", titleEn: "Competitor Analysis", year: "2024", description: "تحليل السوق والمنافسين", descriptionEn: "Market Competitor Analysis", image: encodeURI("/assets/استشارات/portfolio/3.jpg"), tags: ["Analysis"], tagsEn: ["Analysis"] },
    ]
  },
];

interface StretchRipple {
  id: number;
  panelIndex: number;
  side: "left" | "right";
  yPercent: number;
  color: string;
}

let rippleCounter = 0;

export function ServicesSection() {
  const { language, t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [expandedService, setExpandedService] = useState<number | null>(null);
  const [ripples, setRipples] = useState<StretchRipple[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4;
  const maxIndex = Math.max(0, services.length - itemsPerPage);
  const sectionRef = useRef<HTMLDivElement>(null);

  const nextSlide = useCallback(() => {
    setStartIndex((prev) => Math.min(prev + 1, maxIndex));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleMouseEnter = useCallback((index: number) => {
    if (expandedService === null) {
      setActiveIndex(index);
    }
  }, [expandedService]);

  const handleMouseLeave = useCallback(
    (index: number, e: React.MouseEvent<HTMLDivElement>) => {
      if (expandedService !== null) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const distLeft = Math.abs(mouseX - rect.left);
      const distRight = Math.abs(mouseX - rect.right);
      const exitedLeft = distLeft < distRight;
      const side: "left" | "right" = exitedLeft ? "left" : "right";
      const yPercent = ((mouseY - rect.top) / rect.height) * 100;
      const neighborIndex = exitedLeft ? index - 1 : index + 1;

      if (neighborIndex >= 0 && neighborIndex < services.length) {
        const newRipple: StretchRipple = {
          id: rippleCounter++,
          panelIndex: neighborIndex,
          side: exitedLeft ? "right" : "left",
          yPercent: Math.max(5, Math.min(95, yPercent)),
          color: services[index].bg,
        };

        setRipples((prev) => [...prev, newRipple]);
        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
        }, 800);
      }
    },
    [expandedService]
  );

  const handleSectionLeave = useCallback(() => {
    if (expandedService === null) {
      setActiveIndex(null);
    }
  }, [expandedService]);

  const handleServiceClick = useCallback((index: number) => {
    if (expandedService === null) {
      setExpandedService(index);
      setActiveIndex(index);
    } else if (expandedService !== index) {
      setExpandedService(index);
      setActiveIndex(index);
    }
  }, [expandedService]);

  const handleCloseExpanded = useCallback(() => {
    setExpandedService(null);
    setActiveIndex(null);
  }, []);

  return (
    <section
      id="services"
      className="relative w-full h-screen overflow-hidden bg-[#050505]"
      style={{ direction: "ltr" }}
    >
      {/* Navigation Arrows */}
      <AnimatePresence>
        {startIndex > 0 && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-[40] w-14 h-14 rounded-full flex items-center justify-center border border-white/10 bg-black/20 backdrop-blur-md text-white hover:bg-white/10 transition-colors"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-8 h-8" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {startIndex < maxIndex && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-[40] w-14 h-14 rounded-full flex items-center justify-center border border-white/10 bg-black/20 backdrop-blur-md text-white hover:bg-white/10 transition-colors"
            onClick={nextSlide}
          >
            <ChevronRight className="w-8 h-8" />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.div
        ref={sectionRef}
        className="flex h-full"
        animate={{ x: expandedService !== null ? "0vw" : `-${startIndex * 25}vw` }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        style={{ width: expandedService !== null ? "100vw" : `${services.length * 25}vw` }}
        onMouseLeave={handleSectionLeave}
      >
        {services.map((service, index) => {
          const isActive = activeIndex === index;
          const hasActive = activeIndex !== null;
          const isGold = service.bg === "#D4AF37";
          const textColor = isGold && isActive ? "#0A1D37" : "#FFFFFF";
          const panelRipples = ripples.filter((r) => r.panelIndex === index);

          return (
            <PanelWithGlow
              key={service.id}
              service={service}
              index={index}
              isActive={isActive}
              isExpanded={expandedService === index}
              hasActive={hasActive}
              panelRipples={panelRipples}
              textColor={textColor}
              totalServices={services.length}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={(e) => handleMouseLeave(index, e)}
              onClick={() => handleServiceClick(index)}
              onCloseExpanded={handleCloseExpanded}
              startIndex={startIndex}
              expandedService={expandedService}
              language={language}
            />
          );
        })}
      </motion.div>
    </section>
  );
}

interface PanelWithGlowProps {
  service: (typeof services)[number];
  index: number;
  isActive: boolean;
  isExpanded: boolean;
  hasActive: boolean;
  panelRipples: StretchRipple[];
  textColor: string;
  totalServices: number;
  onMouseEnter: () => void;
  onMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => void;
  onClick: () => void;
  onCloseExpanded: () => void;
  startIndex: number;
  expandedService: number | null;
  language: string;
}

function PanelWithGlow({
  service, index, isActive, isExpanded, hasActive, panelRipples, textColor, totalServices,
  onMouseEnter, onMouseLeave, onClick, onCloseExpanded, startIndex, expandedService, language,
}: PanelWithGlowProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { stiffness: 200, damping: 30, mass: 0.5 });
  const glowY = useSpring(mouseY, { stiffness: 200, damping: 30, mass: 0.5 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = panelRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  const handleEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = panelRef.current?.getBoundingClientRect();
      if (rect) {
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
      setIsHovering(true);
      onMouseEnter();
    },
    [mouseX, mouseY, onMouseEnter]
  );

  const handleLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      setIsHovering(false);
      onMouseLeave(e);
    },
    [onMouseLeave]
  );

  const glowBackground = useTransform(
    [glowX, glowY],
    ([x, y]: number[]) => `radial-gradient(circle 150px at ${x}px ${y}px, ${service.accent}20 0%, transparent 60%)`
  );

  return (
    <motion.div
      ref={panelRef}
      className="relative h-full cursor-pointer overflow-hidden shrink-0"
      style={{
        background: isActive ? service.bgExpanded : service.bg,
      }}
      animate={{
        width: isExpanded
          ? "100vw"
          : expandedService !== null
            ? "0vw"
            : hasActive && index >= startIndex && index < startIndex + 4
              ? (isActive ? "40vw" : "20vw")
              : "25vw",
        minWidth: isExpanded
          ? "100vw"
          : expandedService !== null
            ? "0vw"
            : hasActive && index >= startIndex && index < startIndex + 4
              ? (isActive ? "40vw" : "20vw")
              : "25vw"
      }}
      transition={{
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1], // Liquid-like ease-out
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={onClick}
    >
      {/* Liquid Cursor Blob */}
      <motion.div
        className="absolute pointer-events-none z-[2] blur-[15px]"
        style={{
          left: 0,
          top: 0,
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
          width: "80px",
          height: "80px",
          background: `radial-gradient(circle, ${service.accent}60 0%, transparent 70%)`,
          opacity: isHovering ? 0.6 : 0,
        }}
        animate={{
          scale: isHovering ? [1, 1.15, 1] : 0,
        }}
        transition={{
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
      />
      {/* Zoom Lines Effect */}
      <motion.div
        className="absolute w-[600px] h-[600px] pointer-events-none z-[1]"
        style={{
          left: 0, top: 0, x: glowX, y: glowY, translateX: "-50%", translateY: "-50%",
          opacity: isHovering ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <ZoomLines color={service.accent} />
      </motion.div>

      {/* Background Glow */}
      <motion.div className="absolute inset-0 pointer-events-none z-[1]" style={{ background: glowBackground }} />

      {/* Divider Line */}
      <div className="absolute top-0 left-0 w-px h-full z-[2]" style={{ background: "rgba(255,255,255,0.08)" }} />

      {/* Ripple Effects */}
      {panelRipples.map((ripple) => (
        <FabricStretch key={ripple.id} side={ripple.side} yPercent={ripple.yPercent} color={ripple.color} />
      ))}

      {/* Collapsed State */}
      <AnimatePresence>
        {!isActive && !isExpanded && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center gap-6 z-[3]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: isActive ? 0 : 0.3 }}
          >
            <motion.div
              className="flex items-center justify-center relative w-[85%] aspect-square mx-auto"
              animate={{
                scale: hasActive ? 0.6 : 1.1,
                rotate: isHovering ? 0 : 0
              }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <AnimatePresence initial={false}>
                <motion.img
                  key={isHovering ? 'hover' : 'idle'}
                  src={`/assets/${service.imgDir}/${isHovering ? '2.png' : '1.png'}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl"
                />
              </AnimatePresence>
            </motion.div>

            <div
              className="absolute top-14 left-1/2 -translate-x-1/2"
            >
              <span className="text-sm md:text-base font-bold tracking-wider whitespace-nowrap" style={{ color: "rgba(255,255,255,0.9)" }}>
                {language === 'ar' ? service.title : service.titleEn}
              </span>
            </div>

            <div className="absolute top-6 left-1/2 -translate-x-1/2">
              <span
                className="text-xs font-mono tracking-widest"
                style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-geist-mono)" }}
              >
                {String(service.id).padStart(2, "0")}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active State - Service Details */}
      <AnimatePresence>
        {isActive && !isExpanded && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-12 lg:p-20 z-[3] overflow-y-auto"
            style={{ direction: "rtl" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            {/* Max Width Container for Layout */}
            <div className="w-full max-w-7xl flex flex-col gap-12">

              {/* Top Row: Content & Image */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">

                {/* Right Side - Description Content */}
                <motion.div
                  className="w-full md:w-1/2 flex flex-col items-center md:items-start text-right"
                  initial={{ x: 60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 60, opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.4, ease: [0.32, 0.72, 0, 1] }}
                >
                  <motion.span
                    className="inline-block text-sm font-mono tracking-[0.3em] mb-4"
                    style={{ color: `${textColor}60`, fontFamily: "var(--font-geist-mono)" }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {String(service.id).padStart(2, "0")} — {String(totalServices).padStart(2, "0")}
                  </motion.span>

                  <motion.h2
                    className="text-4xl md:text-5xl lg:text-7xl font-black leading-tight mb-3"
                    style={{ color: textColor }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    {language === 'ar' ? service.title : service.titleEn}
                  </motion.h2>

                  <motion.p
                    className="text-lg md:text-xl font-medium mb-6 opacity-40 uppercase tracking-widest"
                    style={{ color: textColor }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.55 }}
                  >
                    {language === 'ar' ? service.titleEn : service.title}
                  </motion.p>

                  <motion.div
                    className="h-1 w-24 mb-6 bg-gradient-to-l"
                    style={{ backgroundImage: `linear-gradient(to left, ${service.accent}, transparent)` }}
                    initial={{ width: 0 }}
                    animate={{ width: 96 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  />

                  <motion.p
                    className="text-lg md:text-xl leading-relaxed mb-8 opacity-80"
                    style={{ color: textColor }}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65, duration: 0.5 }}
                  >
                    {language === 'ar' ? service.description : service.descriptionEn}
                  </motion.p>
                </motion.div>

                {/* Left Side - Hero Image */}
                <motion.div
                  className="w-full md:w-1/2 flex items-center justify-center relative"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="relative w-full max-w-[550px] aspect-square min-h-[350px] md:min-h-[500px] flex items-center justify-center">
                    {/* Decorative Rings */}
                    <motion.div
                      className="absolute rounded-full"
                      style={{ width: "80%", height: "80%", border: `1px solid ${service.accent}20` }}
                      animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.1, 0.2] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                      className="absolute rounded-full"
                      style={{ width: "60%", height: "60%", border: `1px solid ${service.accent}40` }}
                      animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    />

                    <motion.div className="w-full h-full relative z-10 flex items-center justify-center">
                      <AnimatePresence initial={false}>
                        <motion.img
                          key={isHovering ? 'hover-active' : 'idle-active'}
                          src={encodeURI(`/assets/${service.imgDir}/${isHovering ? '2.png' : '1.png'}`)}
                          className="absolute inset-0 w-full h-full object-contain filter drop-shadow-[0_0_60px_rgba(255,255,255,0.25)]"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4 }}
                        />
                      </AnimatePresence>
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* Bottom Row - Interaction Buttons */}
              <motion.div
                className="flex flex-wrap items-center justify-center md:justify-start gap-6 pt-8 border-t border-white/10"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <motion.button
                  className="group flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all"
                  style={{ background: `${service.accent}20`, border: `1px solid ${service.accent}40`, color: textColor }}
                  whileHover={{ scale: 1.05, background: `${service.accent}30` }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onClick();
                  }}
                >
                  {language === 'ar' ? "عرض معرض الأعمال" : "View Portfolio"}
                  <ArrowUpLeft className="w-5 h-5 transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1" />
                </motion.button>

                <motion.a
                  href="#contact"
                  className="group flex items-center gap-4 px-10 py-4 rounded-2xl font-bold text-lg transition-all"
                  style={{ background: service.accent, color: service.bg }}
                  whileHover={{ scale: 1.05, y: -4, boxShadow: `0 10px 40px ${service.accent}40` }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {language === 'ar' ? service.cta : service.ctaEn}
                  <ExternalLink className="w-6 h-6 transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1" />
                </motion.a>
              </motion.div>

            </div>
          </motion.div>
        )
        }
      </AnimatePresence >

      {/* Expanded State - Portfolio Showcase */}
      <AnimatePresence>
        {
          isExpanded && (
            <motion.div
              className="absolute inset-0 overflow-y-auto z-[3]"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header - Centered Title */}
              <motion.div
                className="sticky top-0 z-10 px-8 py-10 flex flex-col items-center justify-center text-center w-full"
                style={{ background: `linear-gradient(to bottom, ${service.bgExpanded} 0%, transparent 100%)` }}
              >
                <motion.div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: `${service.accent}20`, border: `1px solid ${service.accent}40` }}
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{ scale: 1, rotate: 0 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <img src={`/assets/${service.imgDir}/1.png`} className="w-12 h-12 object-contain" alt="" />
                </motion.div>

                <motion.h3
                  className="text-4xl md:text-5xl lg:text-6xl font-black mb-4"
                  style={{ color: textColor }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                >
                  {language === 'ar' ? `أعمال ${service.title}` : `${service.titleEn} Portfolio`}
                </motion.h3>

                <motion.p
                  className="text-lg opacity-60 max-w-2xl"
                  style={{ color: textColor }}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {language === 'ar'
                    ? `نستعرض لكم مجموعة من أفضل أعمالنا في مجال ${service.title}، حيث نجمع بين الإبداع والنتائج الملموسة.`
                    : `We present to you a collection of our best work in ${service.titleEn}, where we combine creativity with tangible results.`}
                </motion.p>

                <motion.button
                  className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 rounded-lg transition-all"
                  style={{ background: `${service.accent}20`, color: textColor }}
                  whileHover={{ scale: 1.05, background: `${service.accent}40` }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onCloseExpanded();
                  }}
                >
                  <ArrowUpLeft className={`w-4 h-4 ${language === 'en' ? 'rotate-0' : 'rotate-180'}`} />
                  {language === 'ar' ? "رجوع" : "Back"}
                </motion.button>
              </motion.div>

              {/* Card Carousel Portfolio Showcase */}
              <div className="px-4 pb-8">
                <CardCarousel
                  images={service.portfolio.map(p => ({
                    src: p.image,
                    alt: language === 'ar' ? p.title : p.titleEn,
                  }))}
                  autoplayDelay={2000}
                  showPagination={true}
                  showNavigation={false}
                />
              </div>



              {/* CTA Section */}
              {/* <motion.div
                className="mt-12 p-8 rounded-2xl text-center relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${service.accent}20 0%, ${service.accent}05 100%)`, border: `1px solid ${service.accent}30` }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, ${service.accent} 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />

                <CheckCircle className="w-12 h-12 mx-auto mb-4" style={{ color: service.accent }} />
                <h4 className="text-xl font-bold mb-2 relative z-10" style={{ color: textColor }}>
                  {language === 'ar' ? "جاهز لبدء مشروعك؟" : "Ready to start your project?"}
                </h4>
                <p className="text-sm opacity-70 mb-6 relative z-10" style={{ color: textColor }}>
                  {language === 'ar' ? "دعنا نساعدك في تحقيق رؤيتك التسويقية" : "Let us help you achieve your marketing vision"}
                </p>
                <motion.a
                  href="#contact"
                  className="px-8 py-4 rounded-xl font-bold text-lg inline-flex items-center gap-3 relative z-10"
                  style={{ background: service.accent, color: service.bg }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <ExternalLink className="w-5 h-5" />
                  {language === 'ar' ? "ابدأ مشروعك الآن" : "Start Your Project Now"}
                </motion.a>
              </motion.div> */}
            </motion.div>
          )
        }
      </AnimatePresence >

      {/* Bottom Gradient */}
      {
        !isActive && !isExpanded && (
          <div
            className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
            style={{ background: `linear-gradient(to top, ${service.bg} 0%, transparent 100%)` }}
          />
        )
      }
    </motion.div >
  );
}

function FabricStretch({ side, yPercent, color }: { side: "left" | "right"; yPercent: number; color: string }) {
  const bulge = useMotionValue(1);
  const springBulge = useSpring(bulge, { stiffness: 300, damping: 15, mass: 0.8 });
  const displacement = useTransform(springBulge, [0, 1], [0, 50]);

  useEffect(() => {
    const timeout = setTimeout(() => { bulge.set(0); }, 50);
    return () => clearTimeout(timeout);
  }, [bulge]);

  const cy = yPercent;

  return (
    <motion.div
      className="absolute top-0 h-full pointer-events-none z-[1]"
      style={{ [side]: 0, width: "60px" }}
      initial={{ opacity: 0.9 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <svg viewBox="0 0 60 100" preserveAspectRatio="none" className="w-full h-full" style={{ overflow: "visible" }}>
        <motion.path
          fill={color}
          style={{
            d: useTransform(displacement, (d) => {
              const top = Math.max(0, cy - 25);
              const bot = Math.min(100, cy + 25);
              if (side === "left") {
                return `M0,0 L0,${top} Q${d},${cy} 0,${bot} L0,100 L0,0 Z`;
              } else {
                return `M60,0 L60,${top} Q${60 - d},${cy} 60,${bot} L60,100 L60,0 Z`;
              }
            }),
          }}
        />
      </svg>
    </motion.div>
  );
}

function ZoomLines({ color }: { color: string }) {
  const rays = useMemo(() => {
    const pseudoRandom = (s: number) => {
      const x = Math.sin(s) * 10000;
      return x - Math.floor(x);
    };

    return Array.from({ length: 24 }).map((_, i) => ({
      id: i, angle: (360 / 24) * i, width: 2 + pseudoRandom(i * 100) * 6,
      length: 40 + pseudoRandom(i * 100 + 1) * 60, delay: pseudoRandom(i * 100 + 2) * 2,
    }));
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute w-20 h-20 rounded-full blur-xl" style={{ background: color, opacity: 0.15 }} />
      {rays.map((ray) => (
        <motion.div
          key={ray.id}
          className="absolute top-1/2 left-1/2 origin-left"
          style={{
            height: `${ray.width}px`, width: "50%",
            background: `linear-gradient(90deg, ${color}00 0%, ${color}40 20%, ${color}00 100%)`,
            rotate: `${ray.angle}deg`, y: "-50%",
          }}
          animate={{ scaleX: [0.8, 1.2, 0.8], opacity: [0.3, 0.7, 0.3], width: ["40%", "60%", "40%"] }}
          transition={{ duration: 2 + ray.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
