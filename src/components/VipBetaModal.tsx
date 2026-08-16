import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, X, Download, ShieldCheck, Check } from "lucide-react";
import badgeNew from "../assets/images/badge-new.webp";
import { 
  translations, 
  TranslationSchema,
  BAZAAR_URL,
  MYKET_URL
} from "../i18n/translations";

interface VipBetaModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: "fa" | "en";
}

export function VipBetaModal({ isOpen, onClose, lang }: VipBetaModalProps) {
  const t: TranslationSchema = translations[lang];
  const isRtl = t.dir === "rtl";

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const features = lang === "fa" 
    ? [
        "فعال‌سازی آنی تمام امکانات تیمی و هوش حرکتی",
        "فاقد هرگونه آگهی تبلیغاتی مزاحم یا پرداخت مکرر",
        "تست رایگان بی‌قید‌و‌شرط برای مدت ۶ روز کامل"
      ]
    : [
        "Instant access to all skeleton Tracking features",
        "Zero ad banners or prompt payments",
        "100% unconditional 6-day all-access trial"
      ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5" id="vip-modal-container">
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-xl"
            id="vip-modal-backdrop"
          />

          {/* Modal Card - Split Desktop Grid to avoid scroll overflow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.4 }}
            className={`relative w-full max-w-[720px] bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-5 sm:p-7 z-10 ${
              isRtl ? "text-right" : "text-left font-sans"
            }`}
            id="vip-modal-card"
          >
            {/* Design accents */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/10 rounded-full blur-[60px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-[60px] pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className={`absolute top-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all cursor-pointer z-20 ${
                isRtl ? "left-4" : "right-4"
              }`}
              aria-label="Close modal"
              id="btn-close-vip-modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Dynamic Content Columns */}
            <div className="relative space-y-5">
              
              {/* Header Zone */}
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-950/40 border border-purple-500/30 text-[10px] font-bold text-purple-300">
                  <Sparkles className="w-3 h-3 text-purple-400 animate-pulse" />
                  <span>{t.cta.badge}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {t.cta.title}
                </h2>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {t.cta.subtitle}
                </p>
              </div>

              {/* Grid content */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                
                {/* Feature bullets */}
                <div className="sm:col-span-6 space-y-2 bg-white/[0.01] border border-white/5 rounded-xl p-3 sm:p-4">
                  {features.map((feat, index) => (
                    <div key={index} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span className="leading-normal">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Direct download matrix */}
                <div className="sm:col-span-6 bg-zinc-900 border border-white/5 rounded-xl p-3 space-y-3">
                  <div className="flex items-center gap-1.5 px-1">
                    <Download className="w-3.5 h-3.5 text-purple-400" />
                    <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">
                      {t.cta.downloadsTitle}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <motion.a
                      whileHover={{ scale: 1.02, borderColor: "rgba(16,185,129,0.25)" }}
                      whileTap={{ scale: 0.98 }}
                      href={BAZAAR_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-2 rounded-lg bg-black border border-white/5 hover:shadow-md transition-all"
                    >
                      <img src={badgeNew} alt="Cafe Bazaar" className="h-8 object-contain" />
                    </motion.a>

                    <motion.a
                      whileHover={{ scale: 1.02, borderColor: "rgba(59,130,246,0.25)" }}
                      whileTap={{ scale: 0.98 }}
                      href={MYKET_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-2 rounded-lg bg-black border border-white/5 hover:shadow-md transition-all"
                    >
                      <img src={badgeNew} alt="Myket App" className="h-8 object-contain" />
                    </motion.a>
                  </div>
                </div>

              </div>

              {/* Secure statement at the bottom */}
              <div className="pt-2 border-t border-white/5 text-[10px] text-zinc-500 flex items-center justify-between font-mono">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{t.cta.trialBadge}</span>
                </div>
                <span>Approved Sandbox OK</span>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default VipBetaModal;
