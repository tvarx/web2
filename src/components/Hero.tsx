import React from "react";
import { useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { Sparkles, Play, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { PhoneMockup } from "./PhoneMockup";
import { translations, TranslationSchema } from "../i18n/translations";

export function Hero() {
  const location = useLocation();
  const currentLang: "fa" | "en" = location.pathname.startsWith("/en") ? "en" : "fa";
  const t: TranslationSchema = translations[currentLang];
  const isRtl = t.dir === "rtl";

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen pt-28 pb-16 flex flex-col justify-center overflow-hidden bg-[#050505]"
      aria-label="Welcome Hero Area"
    >
      {/* Decorative Cinematic Background Glows */}
      <div className="absolute top-[10%] left-[5%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-[#7C3AED]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] rounded-full bg-[#A855F7]/10 blur-3xl pointer-events-none" />
      
      {/* Background Matrix Accent Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2e_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center ${isRtl ? "text-right" : "text-left"}`}>
          
          {/* Text Content Column: Headlines & Primary CTAs */}
          <div className={`lg:col-span-7 flex flex-col justify-center space-y-6 max-w-2xl ${isRtl ? "lg:ml-auto" : "lg:mr-auto"}`}>
            
            {/* Minimal Badge */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`inline-flex self-start items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs text-zinc-300 backdrop-blur-md`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#A855F7]" />
              <span className="font-medium">{t.hero.badge}</span>
            </motion.div>

            {/* Main Dynamic H1 Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight lg:leading-[1.15]"
            >
              {t.hero.titleFirst}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-purple-300">
                {t.hero.titleAccent}
              </span>{" "}
              {t.hero.titleLast}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-xl"
            >
              {t.hero.subtitle}
            </motion.p>

            {/* Interactive Trust Bullet points */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-2 gap-3 text-sm text-zinc-300 pt-2"
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{t.hero.trustBullet1}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{t.hero.trustBullet2}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#A855F7] flex-shrink-0" />
                <span>{t.hero.trustBullet3}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#A855F7] flex-shrink-0" />
                <span>{t.hero.trustBullet4}</span>
              </div>
            </motion.div>

            {/* Action Buttons segments */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleScroll("cta")}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#A855F7] text-white font-bold text-center hover:shadow-xl hover:shadow-[#7C3AED]/20 transition-all flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
                aria-label={t.hero.ctaPrimary}
              >
                <span>{t.hero.ctaPrimary}</span>
                <Play className="w-4 h-4 fill-white text-white" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.06)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleScroll("features")}
                className="px-8 py-4 rounded-2xl bg-white/[0.02] border border-white/10 text-white font-semibold text-center transition-all flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
                aria-label={t.hero.ctaSecondary}
              >
                <span>{t.hero.ctaSecondary}</span>
                {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </motion.button>
            </motion.div>
          </div>

          {/* Left Column: Overlapping 3D Phone Mockups Stack */}
          <div className="lg:col-span-5 h-[500px] sm:h-[600px] relative flex items-center justify-center pt-8 lg:pt-0">
            
            {/* Main Ambient Purple Light Glow behind the phone stack */}
            <div className="absolute w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] rounded-full bg-gradient-to-tr from-[#7C3AED] to-[#A855F7] opacity-25 blur-[90px] -z-10 animate-pulse" />

            {/* Overlapping Phone Mockup Layout with scale controls */}
            <div className="relative w-full max-w-[450px] h-[550px] flex items-center justify-center scale-80 sm:scale-95 md:scale-100">
              
              {/* Phone 1: Left Rotated (Workout Video Screen) */}
              <motion.div
                initial={{ opacity: 0, x: -60, rotate: -15, scale: 0.85 }}
                animate={{ opacity: 1, x: -70, rotate: -12, scale: 0.88 }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                whileHover={{ scale: 0.94, zIndex: 30, transition: { duration: 0.3 } }}
                className="absolute z-10 origin-bottom shadow-2xl filter brightness-90 hover:brightness-100 transition-all cursor-pointer left-0"
              >
                <PhoneMockup type="workout" interactive={false} />
              </motion.div>

              {/* Phone 2: Right Rotated (Progress Charts Screen) */}
              <motion.div
                initial={{ opacity: 0, x: 60, rotate: 15, scale: 0.85 }}
                animate={{ opacity: 1, x: 70, rotate: 12, scale: 0.88 }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                whileHover={{ scale: 0.94, zIndex: 30, transition: { duration: 0.3 } }}
                className="absolute z-10 origin-bottom shadow-2xl filter brightness-90 hover:brightness-100 transition-all cursor-pointer right-0"
              >
                <PhoneMockup type="analytics" interactive={false} />
              </motion.div>

              {/* Phone 3: Center Elevated (Live Log Tracking Screen) */}
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
                className="absolute z-20 shadow-2xl hover:scale-103 transition-transform duration-500"
              >
                {/* Floating animation loop */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                >
                  <PhoneMockup type="tracking" />
                </motion.div>
              </motion.div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
export default Hero;
