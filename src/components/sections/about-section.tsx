"use client";

import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Rocket, ArrowLeft, ArrowRight, CheckCircle,
  Lightbulb, Target, Users, Award, Heart, Shield, Star
} from "lucide-react";
import { GlowCard } from "@/components/ui/glow-card";

const values = [
  { icon: Shield, title: "الموثوقية", titleEn: "Reliability", desc: "نسعى لتحقيق أحلامك ورسم مستقبلك من خلال تقديم أفضل الخدمات بموثوقية وجودة", descEn: "We strive to achieve your dreams and shape your future by providing the best services with reliability and quality", iconColor: "text-cyan-400" },
  { icon: Lightbulb, title: "الإبداع", titleEn: "Creativity", desc: "نقدم أفكار إبداعية تنافسية تميز علامتك عن المنافسين", descEn: "We provide competitive creative ideas that distinguish your brand from competitors", iconColor: "text-yellow-400" },
  { icon: Target, title: "الفعالية", titleEn: "Effectiveness", desc: "نستخدم استراتيجيات فعالة تضمن تحقيق أهدافك التسويقية", descEn: "We use effective strategies to ensure your marketing goals are achieved", iconColor: "text-blue-400" },
  { icon: Heart, title: "الشغف", titleEn: "Passion", desc: "نعمل بحب للعمل وشغف لتقديم ما هو أفضل لك", descEn: "We work with love for work and passion to deliver the best for you", iconColor: "text-rose-400" },
  { icon: Users, title: "الشراكة", titleEn: "Partnership", desc: "نبني علاقات طويلة الأمد مع عملائنا والشركاء", descEn: "We build long-term relationships with our clients and partners", iconColor: "text-green-400" },
  { icon: Award, title: "التميز", titleEn: "Excellence", desc: "سعي دائم للوصول إلى الأفضل من خلال خدماتنا المتميزة", descEn: "Constant strive to reach the best through our distinguished services", iconColor: "text-purple-400" },
];

const methodology = [
  { step: "01", title: "الفهم", titleEn: "Understanding", desc: "ندرس البراند، السوق، والجمهور بعمق لنفهم احتياجاتكم الحقيقية", descEn: "We study the brand, market, and audience deeply to understand your real needs", icon: "📊" },
  { step: "02", title: "التخطيط", titleEn: "Planning", desc: "نضع استراتيجية واضحة مبنية على أهداف حقيقية وقابلة للقياس", descEn: "We develop a clear strategy based on real and measurable goals", icon: "📋" },
  { step: "03", title: "التنفيذ والتطوير", titleEn: "Execution & Development", desc: "نطبق الاستراتيجيات ونراقب الأداء ونطور باستمرار لتحقيق أفضل النتائج", descEn: "We implement strategies, monitor performance, and continuously develop to achieve the best results", icon: "🚀" },
];

interface AboutSectionProps {
  showBackground?: boolean;
  fullContent?: boolean;
}

export function AboutSection({ showBackground = true, fullContent = false }: AboutSectionProps) {
  const { language, t, isMounted } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Only use scroll animations on homepage (compact mode)
  const { scrollYProgress } = fullContent ? { scrollYProgress: null } : useScroll(
    mounted
      ? {
          target: containerRef,
          offset: ["start end", "end start"],
        }
      : {}
  );

  // Only apply scroll-linked fade on homepage (compact mode)
  const contentOpacityScrolled = scrollYProgress ? useTransform(scrollYProgress, [0.05, 0.2, 0.8, 0.95], [0, 1, 1, 0]) : null;
  const contentYScrolled = scrollYProgress ? useTransform(scrollYProgress, [0.05, 0.2, 0.8, 0.95], [60, 0, 0, -60]) : null;

  if (!isMounted) {
    return <section ref={fullContent ? undefined : containerRef} className={`relative ${fullContent ? "min-h-screen" : "h-[150vh]"}`} />;
  }

  const highlights = [
    t("فريق متخصص من الخبراء", "A specialized team of experts"),
    t("أكثر من 150 مشروع منجز", "Over 150 completed projects"),
    t("خبرة تمتد لأكثر من 5 سنوات", "Over 5 years of experience"),
    t("98% نسبة رضا العملاء", "98% client satisfaction rate"),
  ];

  // On fullContent (/about page): normal flow layout, no sticky effect
  if (fullContent) {
    return (
      <section className="relative py-20" style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}>
        {showBackground && (
          <div className="fixed inset-0 z-0 w-full h-full overflow-hidden pointer-events-none">
            <img src="/1.webp" alt="Background" className="w-full h-full object-cover" />
          </div>
        )}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-10 space-y-16">
          {/* Chairman's Message */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Text Side */}
            <div className="flex flex-col justify-center gap-2 order-2 lg:order-1 p-4 md:p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-8 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full" />
                <span className="text-yellow-400 font-bold text-xs tracking-wider">{t("كلمة الرئيس التنفيذي", "CEO's Message")}</span>
              </div>
              <h2 className={`text-xl md:text-2xl font-black text-white leading-tight ${language === 'ar' ? '' : 'text-left'}`}>
                {t("بسم الله الرحمن الرحيم", "In the name of Allah")}
              </h2>
              <div className="text-white/70 leading-relaxed space-y-2 text-justify">
                <p className="text-xs">{t("الحمد لله الذي جعل الطموح بداية لكل إنجاز، وجعل العمل المتقن طريقاً للتميز.", "Praise be to Allah who made ambition the beginning of every achievement, and meticulous work the path to excellence.")}</p>
                <p className="text-xs">{t("في ظل التحولات الكبرى التي تشهدها المملكة العربية السعودية بقيادة خادم الحرمين الشريفين وسمو ولي عهده الأمين – حفظهما الله – تأتي رؤية المملكة 2030 لتؤكد أن المستقبل يُصنع بالإبداع، والابتكار، والتمكين، والاستثمار في الإنسان والتقنية.", "In light of the major transformations witnessed by the Kingdom of Saudi Arabia under the leadership of the Custodian of the Two Holy Mosques and his Crown Prince - may Allah protect them - comes the Kingdom's Vision 2030 to confirm that the future is shaped by creativity, innovation, empowerment, and investment in people and technology.")}</p>
                <p className="text-xs">{t("ومن هذا المنطلق، تأسست أفتار للدعاية والإعلان برؤية واضحة تتناغم مع مستهدفات رؤية 2030، إيمانًا منا بأهمية دور قطاع الإعلام والتسويق في دعم الاقتصاد الوطني، وتعزيز هوية العلامات التجارية السعودية، وتمكينها من المنافسة محليًا وإقليميًا وعالميًا.", "From this standpoint, Avatar Advertising and Publicity was established with a clear vision that aligns with the objectives of Vision 2030, believing in the importance of the media and marketing sector's role in supporting the national economy, enhancing the identity of Saudi brands, and enabling them to compete locally, regionally, and globally.")}</p>
                <p className="text-xs">{t("نحن في أفتار لا نرى الإعلان مجرد وسيلة ترويج، بل نراه أداة استراتيجية لبناء القيمة، وتحفيز النمو، وتعزيز حضور العلامات التجارية في سوق يتسم بالتنافسية والتطور المتسارع. لذلك نحرص على تبني أحدث التقنيات، وتطوير الكفاءات الوطنية، والعمل وفق معايير احترافية تواكب تطلعات وطننا الطموح.", "At Avatar, we don't see advertising merely as a promotional tool, but as a strategic tool for building value, stimulating growth, and enhancing the presence of brands in a market characterized by competitiveness and rapid development. Therefore, we are keen to adopt the latest technologies, develop national competencies, and work according to professional standards that keep pace with the ambitious aspirations of our country.")}</p>
                <p className="text-xs">{t("إن التزامنا بالجودة، والابتكار، والتحليل القائم على البيانات، يعكس إيماننا بأن المرحلة القادمة تتطلب حلولًا ذكية ومستدامة تسهم في تحقيق مستهدفات التنوع الاقتصادي، ورفع كفاءة الإنفاق، وتعزيز المحتوى المحلي.", "Our commitment to quality, innovation, and data-driven analysis reflects our belief that the coming phase requires smart and sustainable solutions that contribute to achieving the objectives of economic diversity, improving spending efficiency, and enhancing local content.")}</p>
                <p className="text-xs">{t("نفخر بثقة شركائنا وعملائنا، ونعتبر كل مشروع ننفذه مساهمة حقيقية في مسيرة التنمية الوطنية.", "We take pride in the trust of our partners and clients, and consider every project we implement a real contribution to the path of national development.")}</p>
                <p className="text-xs">{t("نسأل الله أن يوفقنا لنكون دائمًا عند حسن الظن، وأن نواصل رحلتنا كشريك إبداعي يدعم تطلعات عملائنا، ويساهم في بناء مستقبل أكثر إشراقًا لوطننا الغالي.", "We ask Allah to grant us success to always be worthy of the good impression, and to continue our journey as a creative partner that supports our clients' aspirations and contributes to building a brighter future for our dear nation.")}</p>
                <p className="font-bold text-yellow-400 text-xs">{t("والله ولي التوفيق", "And Allah is the Grantor of Success")}</p>
              </div>
            </div>

            {/* Image Side */}
            <div className="flex flex-col justify-center lg:justify-end order-1 lg:order-2 items-center gap-2">
              <img src="/manager.png" alt="Chairman" className="w-full h-auto max-h-[600px] object-cover rounded-2xl" />
              <p className="text-white font-bold text-lg">{t("عبد العزيز الظفيري", "Abdulaziz Al-Dhafiri")}</p>
              <p className="text-yellow-400 text-sm">{t("الرئيس التنفيذي", "CEO")}</p>
            </div>
          </motion.div>

          {/* Creative Director Section */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Text Side */}
            <div className="flex flex-col justify-center gap-2 order-1 lg:order-2 p-4 md:p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-8 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full" />
                <span className="text-yellow-400 font-bold text-xs tracking-wider">{t("كلمة المدير الإبداعي", "Creative Director's Message")}</span>
              </div>
              <h2 className={`text-xl md:text-2xl font-black text-white leading-tight ${language === 'ar' ? '' : 'text-left'}`}>
                {t("في عالم يتسارع فيه الإبداع ويتجدد كل يوم", "In a world where creativity accelerates and renews every day")}
              </h2>
              <div className="text-white/70 leading-relaxed space-y-2 text-justify">
                <p className="text-xs">{t("وقفنا نحن في افتار أمام سؤال واحد: ما الذي يجعل مؤسسة دعاية وإعلان تختلف عن غيرها؟ والجواب كان دائماً واضحاً في أذهاننا — الإنسان.", "At Avatar, we asked ourselves one question: What makes an advertising agency different from others? The answer has always been clear to us — the people.")}</p>
                <p className="text-xs">{t("منذ انطلاقتنا الأولى، آمنّا بأن الإبداع ليس مجرد أداة أو تقنية، بل هو روح تسري في كل ما نصنعه. الإبداع هو أساس افتار، وهو اللغة التي نتحدث بها مع العالم، والجسر الذي يصل به عملك إلى قلوب جمهورك.", "Since our inception, we believed that creativity is not just a tool or technique, but a spirit that runs through everything we create. Creativity is the foundation of Avatar, the language we speak to the world, and the bridge that connects your work to your audience's hearts.")}</p>
                <p className="text-xs">{t("لم نبنِ مؤسستنا على الأجهزة والبرامج وحدها، بل بنيناها على عقول تفكّر، وأيدٍ تصنع، وقلوب تهتم. موظفونا هم العمود الفقري لهذه المؤسسة والسر الحقيقي خلف كل نجاح حققناه.", "We didn't build our institution on devices and software alone, but on minds that think, hands that create, and hearts that care. Our employees are the backbone of this institution and the true secret behind every success we've achieved.")}</p>
                <p className="text-xs">{t("يحمّل كل واحد منهم رؤيةً فريدة وشغفاً لا ينضب، ويأتي كل يوم إلى عمله وهو يعلم أن ما يصنعه يُحدث فرقاً حقيقياً. هم من يحوّلون الأفكار العابرة إلى حملات راسخة، والرؤى المجردة إلى واقع ملموس.", "Each one carries a unique vision and unending passion, coming to work every day knowing that what they create makes a real difference. They transform fleeting ideas into enduring campaigns, and abstract visions into tangible reality.")}</p>
                <p className="text-xs">{t("في افتار، لا نبيع لك خدمة فحسب، نحن نشاركك رحلة بناء صورتك، ونضع فيها من الجهد والإبداع ما نضعه لو كان العمل عملنا نحن.", "At Avatar, we don't just sell you a service — we share with you the journey of building your image, putting in the effort and creativity as if the work were our own.")}</p>
                <p className="font-bold text-yellow-400 text-xs">{t("افتار للدعاية والإعلان — حيث يلتقي الإبداع بالإنسان، ويبدأ النجاح.", "Avatar Advertising — where creativity meets people, and success begins.")}</p>
              </div>
            </div>

            {/* Image Side */}
            <div className="flex flex-col justify-center lg:justify-end order-2 lg:order-1 items-center gap-2">
              <img src="/manager2.png" alt="Creative Director" className="w-full h-auto max-h-[600px] object-cover rounded-2xl" />
              <p className="text-white font-bold text-lg">{t("سامر عيسى", "Samer Issa")}</p>
              <p className="text-yellow-400 text-sm">{t("المدير الإبداعي", "Creative Director")}</p>
            </div>
          </motion.div>

          {/* TWO-COLUMN: Logo + Description + Mission + Values */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* LEFT — Logo */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400/30 to-orange-500/30 blur-3xl scale-125" />
                <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-black/30 backdrop-blur-md flex items-center justify-center">
                  <img src="/LOGO/White-logo_01.png" alt="Avatar Agency Logo" className="w-52 h-52 object-contain drop-shadow-2xl" />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black text-sm shadow-xl whitespace-nowrap">
                  {t("وكالة إعلانية متكاملة", "Full-Service Ad Agency")}
                </div>
              </div>
            </div>

            {/* RIGHT — Description + Mission + Values */}
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-white/50 text-sm font-semibold tracking-widest uppercase mb-2">{t("تعرف علينا", "Get to know us")}</p>
                <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                  {t("من", "About")} <span className="text-yellow-400">{t("نحن", "Us")}</span>
                </h2>
              </div>
              <p className="text-lg text-white/80 leading-relaxed">
                {t("نجاحنا بدأ بخطوات صغيرة على مسار طويل مرافق بحب للعمل وشغف لتقديم ما هو أفضل لك وسعي دائم للوصول إلى الأفضل من خلال خدماتنا المتميزة وأسعارنا المناسبة ومواكبة كل ما هو جديد. نقدم لك أفضل الخدمات تحت إشراف نخبة من الخبراء المختصين في العديد من المجالات بإدارة كادر محترف. مقرنا الرئيسي المملكة العربية السعودية.",
                  "Our success began with small steps on a long journey accompanied by love for work and passion to deliver what is best for you, with constant striving to reach the best through our distinguished services, reasonable prices, and keeping up with everything new. We offer you the best services under the supervision of elite experts in many fields, managed by a professional team. Our headquarters is in the Kingdom of Saudi Arabia.")}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-yellow-400/10 to-orange-500/10 border border-yellow-400/20">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-white font-bold">{t("رسالتنا", "Our Mission")}</span>
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                      <Rocket className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {t("تمكين العلامات التجارية من تحقيق نمو مستدام عبر حلول دعائية وتسويقية متكاملة، تعتمد على التخطيط الاستراتيجي، والإبداع، والتنفيذ الاحترافي القائم على تحليل البيانات وقياس الأداء.",
                      "Enabling brands to achieve sustainable growth through integrated advertising and marketing solutions, based on strategic planning, creativity, and professional execution.")}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-400/10 to-pink-500/10 border border-purple-400/20">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-white font-bold">{t("قيمنا", "Our Values")}</span>
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center flex-shrink-0">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {t("الموثوقية، الإبداع، الفعالية، الشغف، الشراكة، والتميز.",
                      "Reliability, Creativity, Effectiveness, Passion, Partnership, and Excellence.")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Methodology */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h3 className="text-3xl font-bold text-white text-center mb-8">
              {t("منهجيتنا", "Our Methodology")} <span className="text-yellow-400">{t("في العمل", "in Work")}</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {methodology.map((item) => (
                <div key={item.step} className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center group hover:border-yellow-400/30 transition-all">
                  <div className="absolute -top-3 right-1/2 translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-sm font-black">{item.step}</div>
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h4 className="text-xl font-bold text-white mb-2">{language === "ar" ? item.title : item.titleEn}</h4>
                  <p className="text-white/70 text-sm leading-relaxed">{language === "ar" ? item.desc : item.descEn}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Values — 3D Skewed Cards */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h3 className="text-3xl font-bold text-white text-center mb-8">
              {t("قيمنا التي", "Our Values that")} <span className="text-yellow-400">{t("تميزنا", "Distinguish Us")}</span>
            </h3>

            <style>{`
              .values-grid {
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                gap: 20px;
                padding: 20px;
              }
              .value-card {
                position: relative;
                width: 180px;
                height: 120px;
                background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%);
                text-align: center;
                padding: 15px;
                transform: rotate(-10deg) skew(15deg) translate(0,0);
                transition: .5s;
                box-shadow: -10px 10px 20px rgba(0,0,0,0.3);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255,255,255,0.1);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 8px;
              }
              .value-card:before {
                content: '';
                position: absolute;
                top: 8px;
                left: -15px;
                height: 100%;
                width: 15px;
                background: rgba(255,255,255,0.1);
                transform: rotate(0deg) skewY(-25deg);
              }
              .value-card:after {
                content: '';
                position: absolute;
                bottom: -12px;
                left: -5px;
                height: 15px;
                width: 100%;
                background: rgba(255,255,255,0.08);
                transform: rotate(0deg) skewX(-25deg);
              }
              .value-card:hover {
                transform: rotate(-10deg) skew(15deg) translate(15px,-10px);
                box-shadow: -25px 25px 30px rgba(0,0,0,0.4);
              }
              .value-card .icon-wrapper {
                font-size: 28px;
                color: rgba(255,255,255,0.8);
                transition: .5s;
                z-index: 2;
              }
              .value-card h4 {
                font-size: 14px;
                font-weight: bold;
                color: white;
                margin: 0;
                transition: .5s;
                z-index: 2;
              }
              .value-card p {
                font-size: 9px;
                color: rgba(255,255,255,0.6);
                margin: 0;
                transition: .5s;
                z-index: 2;
              }
              .value-card:hover .icon-wrapper,
              .value-card:hover h4,
              .value-card:hover p {
                color: white;
              }
            `}</style>

            <div className="values-grid">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={value.title} className="value-card">
                    <div className="icon-wrapper" style={{ color: value.iconColor.replace('text-', '') === 'yellow-400' ? '#facc15' : value.iconColor.replace('text-', '') === 'cyan-400' ? '#22d3d1' : value.iconColor.replace('text-', '') === 'blue-400' ? '#60a5fa' : value.iconColor.replace('text-', '') === 'rose-400' ? '#fb7185' : value.iconColor.replace('text-', '') === 'green-400' ? '#4ade80' : '#c084fc' }}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <h4>{language === "ar" ? value.title : value.titleEn}</h4>
                    <p>{language === "ar" ? value.titleEn : value.title}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Headquarters */}
          <GlowCard customSize glowColor="green" className="w-full p-6 text-center">
            <div className="flex items-center justify-center gap-2 text-white/70 mb-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="font-bold">{t("مقرنا الرئيسي", "Our Headquarters")}</span>
            </div>
            <p className="text-xl text-white font-bold">{t("المملكة العربية السعودية", "Kingdom of Saudi Arabia")}</p>
            <p className="text-white/50 text-sm">{t("الرياض", "Riyadh")}</p>
          </GlowCard>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="relative h-auto md:h-[150vh]" style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}>
      {showBackground && (
        <div className="fixed inset-0 z-0 w-full h-full overflow-hidden pointer-events-none">
          <video autoPlay muted playsInline preload="auto" className="w-full h-full object-cover">
            <source src="/Flow2.mp4" type="video/mp4" />
          </video>
        </div>
      )}

      {/* ── STICKY viewport: desktop only ── */}
      <div className="hidden md:sticky md:top-0 md:min-h-screen md:w-full md:flex md:items-center md:justify-center md:overflow-visible">
        <motion.div
          className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-10 py-10"
          style={{ opacity: contentOpacityScrolled ?? 1, y: contentYScrolled ?? 0 }}
        >
          {/* ── TWO-COLUMN: Logo (left) + Description (right) ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">

            {/* LEFT — Logo */}
            <motion.div
              className="flex flex-col items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400/30 to-orange-500/30 blur-3xl scale-125" />
                <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-black/30 backdrop-blur-md flex items-center justify-center">
                  <img
                    src="/LOGO/White-logo_01.png"
                    alt="Avatar Agency Logo"
                    className="w-52 h-52 object-contain drop-shadow-2xl"
                  />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black text-sm shadow-xl whitespace-nowrap">
                  {t("وكالة إعلانية متكاملة", "Full-Service Ad Agency")}
                </div>
              </div>
            </motion.div>

            {/* RIGHT — Description */}
            <motion.div
              className="flex flex-col gap-5 text-right"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            >
              <div>
                <p className="text-white/50 text-sm font-semibold tracking-widest uppercase mb-2">
                  {t("تعرف علينا", "Get to know us")}
                </p>
                <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                  {t("من", "About")} <span className="text-yellow-400">{t("نحن", "Us")}</span>
                </h2>
              </div>

              <p className="text-lg text-white/80 leading-relaxed">
                {t(
                  "نجاحنا بدأ بخطوات صغيرة على مسار طويل مرافق بحب للعمل وشغف لتقديم ما هو أفضل لك وسعي دائم للوصول إلى الأفضل من خلال خدماتنا المتميزة وأسعارنا المناسبة ومواكبة كل ما هو جديد. نقدم لك أفضل الخدمات تحت إشراف نخبة من الخبراء المختصين في العديد من المجالات بإدارة كادر محترف. مقرنا الرئيسي المملكة العربية السعودية.",
                  "Our success began with small steps on a long journey accompanied by love for work and passion to deliver what is best for you, with constant striving to reach the best through our distinguished services, reasonable prices, and keeping up with everything new. We offer you the best services under the supervision of elite experts in many fields, managed by a professional team. Our headquarters is in the Kingdom of Saudi Arabia."
                )}
              </p>

              {/* Mission */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-yellow-400/10 to-orange-500/10 border border-yellow-400/20 backdrop-blur-md">
                <div className="flex items-center gap-3 mb-2 justify-end">
                  <span className="text-white font-bold text-base">{t("رسالتنا", "Our Mission")}</span>
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <Rocket className="w-5 h-5 text-white" />
                  </div>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  {t(
                    "تمكين العلامات التجارية من تحقيق نمو مستدام عبر حلول دعائية وتسويقية متكاملة، تعتمد على التخطيط الاستراتيجي، والإبداع، والتنفيذ الاحترافي القائم على تحليل البيانات وقياس الأداء. نلتزم بتقديم قيمة حقيقية تتجاوز التوقعات، وتدعم مكانة عملائنا في سوق تنافسي متسارع.",
                    "Enabling brands to achieve sustainable growth through integrated advertising and marketing solutions, based on strategic planning, creativity, and professional execution based on data analysis and performance measurement. We are committed to delivering real value that exceeds expectations and supports our clients' position in a rapidly competitive market."
                  )}
                </p>
              </div>

              {/* Values */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-400/10 to-pink-500/10 border border-purple-400/20 backdrop-blur-md">
                <div className="flex items-center gap-3 mb-2 justify-end">
                  <span className="text-white font-bold text-base">{t("قيمنا", "Our Values")}</span>
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  {t(
                    "نسعى لتحقيق أحلامك ورسم مستقبلك من خلال تقديم أفضل الخدمات بموثوقية وجودة وأفكار إبداعية تنافسية وأساليب واستراتيجيات فعالة.",
                    "We strive to achieve your dreams and shape your future by providing the best services with reliability, quality, competitive creative ideas, and effective methods and strategies."
                  )}
                </p>
              </div>

              {/* Highlights */}
              <ul className="flex flex-col gap-2">
                {highlights.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 justify-end">
                    <span className="text-white/80 text-sm">{item}</span>
                    <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  </li>
                ))}
              </ul>

              {/* CTA — only show on homepage (not fullContent) */}
              {!fullContent && (
                <div className="flex justify-end">
                  <a
                    href="/about"
                    className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-2xl font-bold text-base transition-all duration-300 hover:opacity-90"
                    style={{
                      background: "linear-gradient(135deg, #D4AF37, #f59e0b)",
                      color: "#0A1D37",
                      boxShadow: "0 4px 20px rgba(212,175,55,0.3)",
                    }}
                  >
                    {t("المزيد عنا", "More About Us")}
                    {language === "ar" ? (
                      <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                    ) : (
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    )}
                  </a>
                </div>
              )}
            </motion.div>
          </div>

          {/* ── FULL CONTENT (only on /about page) ── */}
          {fullContent && (
            <div className="space-y-16">
              {/* Methodology */}
              <div>
                <h3 className="text-3xl font-bold text-white text-center mb-8">
                  {t("منهجيتنا", "Our Methodology")} <span className="text-yellow-400">{t("في العمل", "in Work")}</span>
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {methodology.map((item) => (
                    <div
                      key={item.step}
                      className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center group hover:border-yellow-400/30 transition-all"
                    >
                      <div className="absolute -top-3 right-1/2 translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-sm font-black">
                        {item.step}
                      </div>
                      <div className="text-4xl mb-4">{item.icon}</div>
                      <h4 className="text-xl font-bold text-white mb-2">{language === "ar" ? item.title : item.titleEn}</h4>
                      <p className="text-white/70 text-sm leading-relaxed">
                        {language === "ar" ? item.desc : item.descEn}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Values */}
              <div>
                <h3 className="text-3xl font-bold text-white text-center mb-8">
                  {t("قيمنا التي", "Our Values that")} <span className="text-yellow-400">{t("تميزنا", "Distinguish Us")}</span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {values.map((value) => (
                    <div
                      key={value.title}
                      className="p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-center hover:border-white/20 transition-all group"
                    >
                      <div className={`w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform ${value.iconColor}`}>
                        <value.icon className="w-6 h-6" />
                      </div>
                      <h4 className="font-bold text-white text-sm mb-1">{language === "ar" ? value.title : value.titleEn}</h4>
                      <p className="text-white/60 text-xs leading-relaxed">
                        {language === "ar" ? value.desc : value.descEn}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Headquarters */}
              <div className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
                <div className="flex items-center justify-center gap-2 text-white/70 mb-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="font-bold">{t("مقرنا الرئيسي", "Our Headquarters")}</span>
                </div>
                <p className="text-xl text-white font-bold">{t("المملكة العربية السعودية", "Kingdom of Saudi Arabia")}</p>
                <p className="text-white/50 text-sm">{t("الرياض", "Riyadh")}</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Mobile container: no sticky */}
      <div className="block md:hidden w-full px-4 py-8">
        <motion.div
          className="relative z-10 w-full max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 gap-8">
            <motion.div
              className="flex flex-col items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400/30 to-orange-500/30 blur-3xl scale-125" />
                <div className="relative w-48 h-48 rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-black/30 backdrop-blur-md flex items-center justify-center">
                  <img
                    src="/LOGO/White-logo_01.png"
                    alt="Avatar Agency Logo"
                    className="w-40 h-40 object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-col gap-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <p className="text-white/50 text-xs font-semibold tracking-widest uppercase mb-1">
                  {t("تعرف علينا", "Get to know us")}
                </p>
                <h2 className="text-3xl font-black text-white leading-tight">
                  {t("من", "About")} <span className="text-yellow-400">{t("نحن", "Us")}</span>
                </h2>
              </div>

              <p className="text-base text-white/80 leading-relaxed">
                {t(
                  "نجاحنا بدأ بخطوات صغيرة على مسار طويل مرافق بحب للعمل وشغف لتقديم ما هو أفضل لك.",
                  "Our success began with small steps on a long journey accompanied by love for work and passion to deliver what is best for you."
                )}
              </p>

              <div className="p-3 rounded-xl bg-gradient-to-r from-yellow-400/10 to-orange-500/10 border border-yellow-400/20">
                <span className="text-white font-bold text-sm">{t("رسالتنا", "Our Mission")}</span>
                <p className="text-white/70 text-xs mt-1">
                  {t("تمكين العلامات التجارية من تحقيق نمو مستدام", "Enabling brands to achieve sustainable growth")}
                </p>
              </div>

              <ul className="flex flex-col gap-1 text-center">
                {highlights.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 justify-center">
                    <CheckCircle className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                    <span className="text-white/80 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
