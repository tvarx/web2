import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { Sparkles, Trophy, ShieldAlert, Zap, LayoutGrid, CheckCircle } from "lucide-react";
import { SEO } from "../components/SEO";
import { TarxLogo } from "../components/TarxLogo";
import { translations, TranslationSchema } from "../i18n/translations";

export function About() {
  const location = useLocation();
  const currentLang: "fa" | "en" = location.pathname.startsWith("/en") ? "en" : "fa";
  const t: TranslationSchema = translations[currentLang];
  const isRtl = t.dir === "rtl";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      {/* SEO configuration for About Page */}
      <SEO 
        title={t.aboutPage.seoTitle}
        description={t.aboutPage.seoDesc}
        lang={t.lang}
        dir={t.dir}
      />

      <section className={`min-h-screen pt-32 pb-24 bg-[#050505] relative overflow-hidden ${
        isRtl ? "text-right" : "text-left"
      }`}>
        
        {/* Cinematic Backdrop Glow Spheres */}
        <div className="absolute top-[15%] left-[10%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-[#7C3AED]/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[15%] right-[10%] w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] rounded-full bg-[#A855F7]/10 blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full space-y-20">
          
          {/* Page main display caption */}
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#7C3AED] to-[#A855F7] flex items-center justify-center mx-auto shadow-lg shadow-[#7C3AED]/20 mb-3"
            >
              <TarxLogo size={36} className="text-white" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl font-black text-white"
            >
              {t.aboutPage.title}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#A855F7] font-semibold text-xs uppercase tracking-widest font-mono"
            >
              {currentLang === "fa" ? "درباره تکنولوژی ورزشی ما" : "OUR HYPERTROPHY METHODOLOGIES"}
            </motion.p>
          </div>

          {/* Intro Story Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center border-b border-white/5 pb-16">
            <motion.div 
              initial={{ opacity: 0, x: isRtl ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-5"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-purple-300">
                {t.aboutPage.introTitle}
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                {t.aboutPage.introDesc1}
              </p>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                {t.aboutPage.introDesc2}
              </p>
            </motion.div>

            {/* Glowing Tech Card Illustration */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative p-8 rounded-3xl bg-zinc-950/60 border border-white/10 backdrop-blur-xl flex flex-col items-center justify-center text-center space-y-6 aspect-video max-w-md mx-auto"
            >
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-[#7C3AED] to-[#A855F7] opacity-10 blur-xl animate-pulse" />
              
              <div className="flex gap-4">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <p className="text-white font-mono text-center text-lg font-black uppercase tracking-wider">
                {currentLang === "fa" ? "[ مدل آنالیز بدنی فعال ]" : "[ AI BODY CHANCE MODEL ]"}
              </p>
              <p className="text-zinc-500 text-xs uppercase leading-relaxed font-mono">
                {currentLang === "fa" 
                  ? "پردازش ۱۰۰٪ محلی فریم مفاصل بدون پینگ سرور"
                  : "LOCAL FRAMEWORK CALCULATING AT 60 FPS WITHOUT DELAY"}
              </p>
            </motion.div>
          </div>

          {/* Central Columns: Vision & Core Strengths */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-b border-white/5 pb-16">
            
            {/* Mission Vision statement */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                <Sparkles className="w-6 h-6 text-[#A855F7]" />
                <span>{t.aboutPage.visionTitle}</span>
              </h3>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                {t.aboutPage.visionDesc}
              </p>
            </motion.div>

            {/* Highlights List list */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                <LayoutGrid className="w-6 h-6 text-[#A855F7]" />
                <span>{t.aboutPage.featuresTitle}</span>
              </h3>
              <ul className="space-y-3.5 text-sm text-zinc-400">
                {t.aboutPage.featuresList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

          </div>

          {/* Values Grid */}
          <div className="space-y-10">
            <h3 className="text-2xl sm:text-3xl font-black text-white text-center">
              {t.aboutPage.valuesTitle}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {t.aboutPage.values.map((v, idx) => {
                const icons = [
                  <Zap className="w-5 h-5 text-[#A855F7]" />,
                  <ShieldAlert className="w-5 h-5 text-purple-400" />,
                  <Trophy className="w-5 h-5 text-indigo-400" />
                ];
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="p-6 rounded-2xl bg-zinc-950/40 border border-white/5 space-y-4 hover:border-white/10 transition-colors"
                  >
                    <div className="p-2 w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center border border-white/5">
                      {icons[idx] || <CheckCircle className="w-5 h-5" />}
                    </div>
                    <h4 className="text-lg font-bold text-white">
                      {v.title}
                    </h4>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      {v.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>

      </section>
    </>
  );
}

export default About;
