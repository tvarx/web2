import React from "react";
import { useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { BarChart3, HelpCircle, Flame, Dumbbell, Clock, Sparkles } from "lucide-react";
import { PhoneMockup } from "./PhoneMockup";
import { translations, TranslationSchema } from "../i18n/translations";

export function Showcase() {
  const location = useLocation();
  const currentLang: "fa" | "en" = location.pathname.startsWith("/en") ? "en" : "fa";
  const t: TranslationSchema = translations[currentLang];
  const isRtl = t.dir === "rtl";

  const textRightToLeft = {
    hidden: { opacity: 0, x: isRtl ? 50 : -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const textLeftToRight = {
    hidden: { opacity: 0, x: isRtl ? -50 : 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const phoneVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, delay: 0.1, ease: "easeOut" } }
  };

  return (
    <section 
      id="showcase" 
      className={`py-24 bg-[#050505] relative overflow-hidden ${isRtl ? "text-right" : "text-left"}`}
      aria-label="App Showcase & Screenshots"
    >
      {/* Visual Ambient Light effects */}
      <div className="absolute top-[30%] -left-10 w-[500px] h-[500px] rounded-full bg-[#7C3AED]/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[30%] -right-10 w-[500px] h-[500px] rounded-full bg-[#A855F7]/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
        
        {/* ROW 1: Progress Analytics Tracking */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Dynamic Copywriter Column */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={textRightToLeft}
            className={`lg:col-span-6 space-y-6 ${isRtl ? "lg:order-2" : "lg:order-1"}`}
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-xs text-[#A855F7]">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>{t.showcase.row1Badge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              {t.showcase.row1Title}
            </h2>

            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              {t.showcase.row1Desc}
            </p>

            {/* Micro Feature List columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-2.5">
                <BarChart3 className="w-5 h-5 text-[#A855F7] mt-1 flex-shrink-0" />
                <div className={isRtl ? "text-right" : "text-left"}>
                  <h4 className="font-semibold text-white">{t.showcase.row1Bullet1Title}</h4>
                  <p className="text-xs text-zinc-500">{t.showcase.row1Bullet1Desc}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Flame className="w-5 h-5 text-[#A855F7] mt-1 flex-shrink-0" />
                <div className={isRtl ? "text-right" : "text-left"}>
                  <h4 className="font-semibold text-white">{t.showcase.row1Bullet2Title}</h4>
                  <p className="text-xs text-zinc-500">{t.showcase.row1Bullet2Desc}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Analytics Phone Mockup Column */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={phoneVariants}
            className={`lg:col-span-6 flex justify-center ${isRtl ? "lg:order-1" : "lg:order-2"} relative`}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full bg-[#A855F7]/10 blur-[90px] -z-10" />
            <PhoneMockup type="analytics" />
          </motion.div>

        </div>

        {/* ROW 2: Guided Workout Guide */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Dynamic Copywriter Column 2 */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={textLeftToRight}
            className={`lg:col-span-6 space-y-6 ${isRtl ? "lg:order-1" : "lg:order-2"}`}
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A855F7]/10 border border-[#A855F7]/20 text-xs text-[#A855F7]">
              <Dumbbell className="w-3.5 h-3.5" />
              <span>{t.showcase.row2Badge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              {t.showcase.row2Title}
            </h2>

            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              {t.showcase.row2Desc}
            </p>

            {/* Micro Feature List columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-2.5">
                <Clock className="w-5 h-5 text-[#A855F7] mt-1 flex-shrink-0" />
                <div className={isRtl ? "text-right" : "text-left"}>
                  <h4 className="font-semibold text-white">{t.showcase.row2Bullet1Title}</h4>
                  <p className="text-xs text-zinc-500">{t.showcase.row2Bullet1Desc}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <HelpCircle className="w-5 h-5 text-[#A855F7] mt-1 flex-shrink-0" />
                <div className={isRtl ? "text-right" : "text-left"}>
                  <h4 className="font-semibold text-white">{t.showcase.row2Bullet2Title}</h4>
                  <p className="text-xs text-zinc-500">{t.showcase.row2Bullet2Desc}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Workout Video Phone Mockup Column */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" ,}}
            variants={phoneVariants}
            className={`lg:col-span-6 flex justify-center ${isRtl ? "lg:order-2" : "lg:order-1"} relative`}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full bg-[#7C3AED]/10 blur-[90px] -z-10" />
            <PhoneMockup type="workuser" />
          </motion.div>

        </div>

      </div>
    </section>
  );
}
export default Showcase;
