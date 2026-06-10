import React from "react";
import { useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { Brain, Camera, LineChart, Sparkles, UserCheck, Smartphone } from "lucide-react";
import { translations, TranslationSchema } from "../i18n/translations";

export function FeatureCard({ 
  icon, 
  title, 
  description, 
  badge, 
  glowColor,
  isRtl
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  badge?: string; 
  glowColor: string;
  isRtl: boolean;
}) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`relative group p-8 rounded-3xl bg-zinc-950/40 border border-white/10 backdrop-blur-xl flex flex-col justify-between h-full hover:border-[#A855F7]/40 transition-colors ${
        isRtl ? "text-right" : "text-left"
      }`}
    >
      {/* Dynamic Hover Background Glow overlay */}
      <div className={`absolute -inset-0.5 rounded-3xl ${glowColor} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 -z-10`} />

      <div className="space-y-4">
        {/* Top Icon Shell */}
        <div className={`w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#A855F7] group-hover:bg-[#7C3AED]/20 group-hover:text-white transition-colors ${
          isRtl ? "mr-0" : "ml-0"
        }`}>
          {icon}
        </div>

        {/* Badge if exists */}
        {badge && (
          <span className="inline-block mt-2 px-2.5 py-0.5 rounded bg-[#7C3AED]/10 text-[#A855F7] text-[10px] font-bold self-start">
            {badge}
          </span>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-white group-hover:text-[#A855F7] transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-zinc-400 group-hover:text-zinc-300 leading-relaxed transition-colors">
          {description}
        </p>
      </div>

      {/* Decorative Corner Lights */}
      <div className={`w-12 h-[2px] bg-gradient-to-r from-transparent to-[#7C3AED] absolute top-0 opacity-0 group-hover:opacity-100 transition-opacity ${
        isRtl ? "right-10" : "left-10"
      }`} />
    </motion.div>
  );
}

export function FeatureGrid() {
  const location = useLocation();
  const currentLang: "fa" | "en" = location.pathname.startsWith("/en") ? "en" : "fa";
  const t: TranslationSchema = translations[currentLang];
  const isRtl = t.dir === "rtl";

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const featuresList = [
    {
      id: "ai-plan",
      title: t.features.item1Title,
      description: t.features.item1Desc,
      icon: <Brain className="w-6 h-6" />,
      badge: t.features.item1Badge,
      glowColor: "bg-[#7C3AED]"
    },
    {
      id: "motion-check",
      title: t.features.item2Title,
      description: t.features.item2Desc,
      icon: <Camera className="w-6 h-6" />,
      badge: t.features.item2Badge,
      glowColor: "bg-[#A855F7]"
    },
    {
      id: "analytics-track",
      title: t.features.item3Title,
      description: t.features.item3Desc,
      icon: <LineChart className="w-6 h-6" />,
      badge: t.features.item3Badge,
      glowColor: "bg-fuchsia-600"
    }
  ];

  return (
    <section 
      id="features" 
      className={`py-24 bg-[#050505] relative overflow-hidden ${isRtl ? "text-right" : "text-left"}`}
      aria-label="Features & Capabilities"
    >
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#7C3AED]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.02] border border-white/5 text-xs text-[#A855F7] backdrop-blur-md">
            <Sparkles className="w-3 h-3 text-[#A855F7]" />
            <span>{t.features.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            {t.features.title}
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto">
            {t.features.subtitle}
          </p>
        </div>

        {/* Feature Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {featuresList.map((feature) => (
            <motion.div key={feature.id} variants={itemVariants}>
              <FeatureCard 
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                badge={feature.badge}
                glowColor={feature.glowColor}
                isRtl={isRtl}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Supporting stats footer list */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto border-t border-white/5 pt-12 text-center text-zinc-400 text-xs sm:text-sm">
          <div className="flex items-center justify-center gap-2">
            <UserCheck className="w-5 h-5 text-[#A855F7]" />
            <span>{t.features.subBar1}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Smartphone className="w-5 h-5 text-[#A855F7]" />
            <span>{t.features.subBar2}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-[#A855F7]" />
            <span>{t.features.subBar3}</span>
          </div>
        </div>

      </div>
    </section>
  );
}

export default FeatureGrid;
