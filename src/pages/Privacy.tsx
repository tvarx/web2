import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { List, ShieldCheck, CornerDownLeft, CornerDownRight, ScrollText } from "lucide-react";
import { SEO } from "../components/SEO";
import { translations, TranslationSchema } from "../i18n/translations";

export function Privacy() {
  const location = useLocation();
  const currentLang: "fa" | "en" = location.pathname.startsWith("/en") ? "en" : "fa";
  const t: TranslationSchema = translations[currentLang];
  const isRtl = t.dir === "rtl";

  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Monitor viewport to highlight active section in the table of contents
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (const section of t.privacyPage.sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [t.privacyPage.sections]);

  const scrollToEl = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: offset, behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <>
      <SEO 
        title={t.privacyPage.seoTitle}
        description={t.privacyPage.seoDesc}
        lang={t.lang}
        dir={t.dir}
      />

      <section className={`min-h-screen pt-32 pb-24 bg-[#050505] relative overflow-hidden ${
        isRtl ? "text-right" : "text-left"
      }`}>
        {/* Lights */}
        <div className="absolute top-[10%] right-[10%] w-[450px] h-[450px] rounded-full bg-[#7C3AED]/3 blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[10%] left-[10%] w-[350px] h-[350px] rounded-full bg-[#A855F7]/5 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header block */}
          <div className="border-b border-white/5 pb-10 mb-12 max-w-4xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t.privacyPage.title}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              {t.privacyPage.seoTitle}
            </h1>
            <p className="text-xs text-zinc-500 mt-3 font-mono">
              {t.privacyPage.lastUpdated}
            </p>
          </div>

          {/* Core layout with columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* STICKY TABLE OF CONTENTS (Left on LTR / Right on RTL) */}
            <aside className={`lg:col-span-4 sticky top-28 space-y-4 bg-zinc-950/40 border border-white/10 p-6 rounded-2xl backdrop-blur-xl max-w-sm w-full z-10 ${
              isRtl ? "lg:order-2" : "lg:order-1"
            }`}>
              <h3 className="text-sm font-bold text-zinc-300 flex items-center gap-2 pb-3 border-b border-white/5 uppercase tracking-wide">
                <List className="w-4 h-4 text-[#A855F7]" />
                <span>{t.privacyPage.tocTitle}</span>
              </h3>
              
              <nav className="flex flex-col gap-2.5" aria-label="Table of Contents">
                {t.privacyPage.sections.map((section) => {
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToEl(section.id)}
                      className={`text-right w-full py-1.5 px-2.5 rounded-lg text-xs font-semibold hover:bg-white/[0.02] hover:text-white transition-all flex items-center justify-between cursor-pointer ${
                        isActive 
                          ? "text-[#A855F7] bg-[#7C3AED]/5 border-r-2 border-[#7C3AED]" 
                          : "text-zinc-500"
                      } ${isRtl ? "text-right flex-row-reverse" : "text-left flex-row"}`}
                    >
                      <span className="truncate">{section.title}</span>
                      {isActive && (isRtl ? <CornerDownLeft className="w-3.5 h-3.5" /> : <CornerDownRight className="w-3.5 h-3.5" />)}
                    </button>
                  );
                })}
              </nav>
            </aside>

            {/* SECTIONS ARTICLES PANEL */}
            <div className={`lg:col-span-8 space-y-8 ${isRtl ? "lg:order-1" : "lg:order-2"}`}>
              {t.privacyPage.sections.map((section) => (
                <motion.article
                  id={section.id}
                  key={section.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                  className="p-8 rounded-3xl bg-zinc-950/30 border border-white/5 backdrop-blur-md space-y-4 scroll-mt-28"
                >
                  <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-white/5 pb-2">
                    {section.title}
                  </h2>
                  <div className="space-y-3.5 text-zinc-400 text-sm sm:text-base leading-relaxed">
                    {section.content.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>

          </div>

        </div>
      </section>
    </>
  );
}

export default Privacy;
