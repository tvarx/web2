import React from "react";
import { useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { Sparkles, Download, ShieldCheck } from "lucide-react";
import badgeNew from "../assets/images/badge-new.webp";
import myket from "../assets/images/myket.webp";

import { 
  translations, 
  TranslationSchema,
  BAZAAR_URL,
  MYKET_URL
} from "../i18n/translations";

export function CTA() {
  const location = useLocation();

  const currentLang: "fa" | "en" = location.pathname.startsWith("/en") ? "en" : "fa";
  const t: TranslationSchema = translations[currentLang];
  const isRtl = t.dir === "rtl";

  return (
    <section 
      id="cta" 
      className={`py-12 sm:py-16 relative overflow-hidden bg-black ${isRtl ? "text-right" : "text-left"}`}
      aria-label="Direct Marketplace Downloads"
    >
      {/* Precision ambient glows that direct user focus to the CTA container */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[250px] h-[250px] rounded-full bg-emerald-500/5 blur-[90px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl bg-zinc-950/40 border border-white/10 backdrop-blur-3xl overflow-hidden p-6 sm:p-10 lg:p-12 hover:border-[#7C3AED]/30 transition-all duration-500">
          
          {/* Top linear shimmer gradient */}
          <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#7C3AED]/50 to-transparent animate-pulse" />

          {/* Side-by-Side Content & Download Badges Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Column 1 (Left): App highlights and trust indicators */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* Ultra-Premium VIP Golden Badge */}
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-black text-purple-300 uppercase tracking-wider rounded-full bg-gradient-to-r from-purple-950/80 to-zinc-900 border border-purple-500/30"
              >
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
                </span>
                <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                <span>{t.cta.badge}</span>
              </motion.div>

              {/* Title & Concise Subtitle */}
              <div className="space-y-3">
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  {t.cta.title}
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xl text-justify">
                  {t.cta.subtitle}
                </p>
              </div>

              {/* Space-saving subtle trial disclosure banner */}
              <div className="flex items-center gap-2 text-xs text-zinc-300 bg-white/[0.03] border border-white/5 py-2 px-4 rounded-xl w-fit">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold">{t.cta.trialBadge}</span>
              </div>

            </div>

            {/* Column 2 (Right): Bento style grid of direct marketplace downloads */}
            <div className="lg:col-span-5 bg-zinc-950/60 rounded-2xl border border-white/5 p-4 sm:p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-purple-400" />
                <h3 className="text-xs sm:text-sm font-semibold text-zinc-200 tracking-wide uppercase">
                  {t.cta.downloadsTitle}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <motion.a
                  whileHover={{ scale: 1.02, borderColor: "rgba(16,185,129,0.25)" }}
                  whileTap={{ scale: 0.98 }}
                  href={BAZAAR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-3 rounded-xl bg-black border border-white/5 hover:shadow-lg transition-all"
                >
                  <img src={badgeNew} alt="Cafe Bazaar" className="h-10 object-contain" />
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.02, borderColor: "rgba(59,130,246,0.25)" }}
                  whileTap={{ scale: 0.98 }}
                  href={MYKET_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-3 rounded-xl bg-black border border-white/5 hover:shadow-lg transition-all"
                >
                  <img src={myket} alt="Myket App" className="h-10 object-contain" />
                </motion.a>
              </div>

              {/* Secure statement bar inside bento */}
              <div className="pt-2 border-t border-white/5 text-[9px] text-zinc-500 flex items-center justify-between font-mono">
                <span>{currentLang === "fa" ? "فایل خام ایمن و آزمایش تاییدشده" : "Verifiably Malware Safe"}</span>
                <span>v3.4.0 (Pass)</span>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;
