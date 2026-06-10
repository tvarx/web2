import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Mail, Send, CheckCircle, Smartphone } from "lucide-react";
import { 
  translations, 
  TranslationSchema,
  APP_STORE_URL,
  GOOGLE_PLAY_URL,
  BAZAAR_URL,
  MYKET_URL
} from "../i18n/translations";

export function CTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const location = useLocation();

  const currentLang: "fa" | "en" = location.pathname.startsWith("/en") ? "en" : "fa";
  const t: TranslationSchema = translations[currentLang];
  const isRtl = t.dir === "rtl";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
    }, 1200);
  };

  return (
    <section 
      id="cta" 
      className={`py-24 bg-[#050505] relative overflow-hidden ${isRtl ? "text-right" : "text-left"}`}
      aria-label="Early Signup and Downloads"
    >
      {/* Dynamic Background Glows */}
      <div className="absolute top-[20%] left-[20%] w-[450px] h-[450px] rounded-full bg-[#7C3AED]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[20%] w-[450px] h-[450px] rounded-full bg-[#A855F7]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="relative p-8 sm:p-14 rounded-3xl bg-zinc-950/40 border border-white/10 backdrop-blur-2xl overflow-hidden shadow-2xl">
          {/* Internal Glowing Orb */}
          <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full bg-[#7C3AED]/10 blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-[200px] h-[200px] rounded-full bg-[#A855F7]/10 blur-[80px]" />

          <div className="relative space-y-8 text-center">
            
            {/* VIP Access Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.02] border border-white/5 text-xs text-[#A855F7] backdrop-blur-md mx-auto">
              <Sparkles className="w-3.5 h-3.5 text-[#A855F7]" />
              <span>{t.cta.badge}</span>
            </div>

            {/* Title & Description */}
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                {t.cta.title}
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto">
                {t.cta.subtitle}
              </p>
            </div>

            {/* Animated Interactive Beta Form with AnimatePresence */}
            <div className="max-w-md mx-auto">
              <AnimatePresence mode="wait">
                {status !== "success" ? (
                  <motion.form
                    key="cta-form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row gap-3 relative w-full"
                  >
                    <div className="relative flex-grow">
                      <Mail className={`absolute top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5 ${isRtl ? "right-4" : "left-4"}`} />
                      <input
                        type="email"
                        required
                        disabled={status === "sending"}
                        placeholder={t.cta.placeholder}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full py-4 text-sm rounded-2xl bg-black/60 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all disabled:opacity-50 ${
                          isRtl ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left"
                        }`}
                      />
                    </div>
                    <motion.button
                      type="submit"
                      disabled={status === "sending"}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-4 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#A855F7] text-white font-bold hover:shadow-lg hover:shadow-[#7C3AED]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-80"
                    >
                      {status === "sending" ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>{t.cta.sending}</span>
                        </>
                      ) : (
                        <>
                          <span>{t.cta.button}</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="cta-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 rounded-2xl bg-emerald-950/10 border border-emerald-500/20 backdrop-blur-md text-center space-y-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto text-emerald-400">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">{t.cta.successTitle}</h4>
                      <p className="text-xs text-zinc-400 mt-1">{t.cta.successDesc}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/5 max-w-xs mx-auto text-xs">
                      <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                        <span className="block text-[10px] text-zinc-500 uppercase">{t.cta.successPromoCode}</span>
                        <span className="block font-bold text-[#A855F7] mt-0.5 font-mono">{t.cta.successPromoVal}</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                        <span className="block text-[10px] text-zinc-500 uppercase">{t.cta.successQueue}</span>
                        <span className="block font-bold text-emerald-400 mt-0.5 font-mono">{t.cta.successQueueVal}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="text-[10px] text-zinc-500">
              {t.cta.trialBadge}
            </div>

            {/* MARKETPLACE DOWNLOADS BUTTONS (App Store, Google Play, Bazaar, Myket) */}
            <div className="pt-8 border-t border-white/5 space-y-5">
              <h3 className="text-sm font-bold text-zinc-300">
                {t.cta.downloadsTitle}
              </h3>
              
              <div className="flex flex-wrap justify-center items-center gap-4">
                
                {/* 1. App Store Link Button */}
                <motion.a
                  whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-black border border-white/10 hover:shadow-lg hover:shadow-purple-500/5 transition-all text-white w-40 text-left"
                >
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.7-1.13 1.84-.99 2.94.1.(...)c1.07-.08 2.16-.65 2.82-1.33z" />
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="0" fill="none" />
                    <path d="M12.2 6.51c.02-.1.08-.22.18-.3.38-.34 1-.16 1.1.34l.02.13c-.1.01-.22.07-.3.17-.38.35-1 .17-1.1-.34zm3.8 6.9c.1.42-.1.87-.52.97-.4.1-.85-.12-.95-.53l-.12-.41c.1-.42-.1-.87.53-.98.42-.1.87.12.97.53l.1.42zm-5.7 3.83c-.34-.28-.39-.77-.11-1.1.28-.34.78-.4 1.11-.12l.27.22c.34.28.4.77.12 1.1-.28.34-.78.4-1.11.12l-.28-.22zm-3.21-3.66c-.43.1-.88-.13-.97-.55l-.1-.41c-.1-.42.12-.87.54-.97.42-.1.88.13.97.55l.1.41c.1.42-.12.87-.54.97z" />
                  </svg>
                  <div className="leading-tight">
                    <span className="block text-[8px] text-zinc-500 uppercase">Download on</span>
                    <span className="block text-xs font-bold font-sans">App Store</span>
                  </div>
                </motion.a>

                {/* 2. Google Play Link Button */}
                <motion.a
                  whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  href={GOOGLE_PLAY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-black border border-white/10 hover:shadow-lg hover:shadow-purple-500/5 transition-all text-white w-40 text-left"
                >
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 5.27v13.46c0 .82.68 1.43 1.47 1.25l12.44-6.84L4.35 4.14C3.6 3.94 3 4.5 3 5.27zm14.86 6.09L5.43 18.2l12.43-5.84-12.43-5.84 12.43 5.84zm1.19-.65l2.48 1.16c.38.18.38.68 0 .86l-2.48 1.16-1.57-1.59 1.57-1.59z" />
                  </svg>
                  <div className="leading-tight">
                    <span className="block text-[8px] text-zinc-500 uppercase">Get it on</span>
                    <span className="block text-xs font-bold font-sans">Google Play</span>
                  </div>
                </motion.a>

                {/* 3. Cafe Bazaar Link Button */}
                <motion.a
                  whileHover={{ scale: 1.05, borderColor: "rgba(34,197,94,0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  href={BAZAAR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-black border border-white/10 hover:shadow-lg hover:shadow-green-500/5 transition-all text-white w-40 text-left"
                >
                  {/* Dynamic clean Bazaar SVG leaf logo */}
                  <svg className="w-5 h-5 flex-shrink-0 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5zm.3-4.5c0 .28-.22.5-.5.5h-1.6c-.28 0-.5-.22-.5-.5V8.1c0-1.2 1.4-1.8 2.2-1l1.4 1.4c.8.8.2 2.2-1 2.2h-.5V12z" />
                  </svg>
                  <div className="leading-tight">
                    <span className="block text-[8px] text-zinc-500 uppercase">دریافت مستقیم از</span>
                    <span className="block text-xs font-bold font-mono">Cafe Bazaar</span>
                  </div>
                </motion.a>

                {/* 4. Myket Link Button */}
                <motion.a
                  whileHover={{ scale: 1.05, borderColor: "rgba(59,130,246,0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  href={MYKET_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-black border border-white/10 hover:shadow-lg hover:shadow-blue-500/5 transition-all text-white w-40 text-left"
                >
                  {/* Dynamic direct clean Myket 'M' crown logo */}
                  <svg className="w-5 h-5 flex-shrink-0 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 3h-6.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H3a1 1 0 00-1 1v16a1 1 0 001 1h18a1 1 0 001-1V4a1 1 0 00-1-1zm-9-1c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm8 17H4V5h16v14z" />
                    <path d="M6 8l5 5 5-5v8H6V8z" />
                  </svg>
                  <div className="leading-tight">
                    <span className="block text-[8px] text-zinc-500 uppercase">دانلود مستقیم از</span>
                    <span className="block text-xs font-bold font-mono">Myket App</span>
                  </div>
                </motion.a>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default CTA;
