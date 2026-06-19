import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowLeft, ArrowRight, Languages } from "lucide-react";
import { TarxLogo } from "./TarxLogo";
import { translations, TranslationSchema } from "../i18n/translations";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Deduce active language from pathname
  const currentLang: "fa" | "en" = location.pathname.startsWith("/en") ? "en" : "fa";
  const t: TranslationSchema = translations[currentLang];
  const isRtl = t.dir === "rtl";

  const handleLanguageToggle = () => {
    setIsOpen(false);
    const otherLang = currentLang === "fa" ? "en" : "fa";
    
    // Determine the target route to preserve sub-page paths
    let targetPath = `/${otherLang}`;
    
    if (location.pathname.includes("/about")) {
      targetPath = `/${otherLang}/about`;
    } else if (location.pathname.includes("/privacy")) {
      targetPath = `/${otherLang}/privacy`;
    } else if (location.pathname.includes("/terms")) {
      targetPath = `/${otherLang}/terms`;
    }
    
    navigate(targetPath);
  };

  const handleScrollToSection = (id: string) => {
    setIsOpen(false);
    
    // If we are on a subpage, navigate back home first
    if (location.pathname.includes("/about") || location.pathname.includes("/privacy") || location.pathname.includes("/terms")) {
      navigate(`/${currentLang}#${id}`);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const menuItems = [
    { text: t.navbar.home, type: "route", target: `/${currentLang}` },
    { text: t.navbar.features, type: "hash", target: "features" },
    { text: t.navbar.about, type: "route", target: `/${currentLang}/about` },
    { text: t.navbar.privacy, type: "route", target: `/${currentLang}/privacy` },
    { text: t.navbar.terms, type: "route", target: `/${currentLang}/terms` }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/10" id="navbar">
      <nav 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between" 
        aria-label={t.lang === "fa" ? "منوی اصلی ناوبری" : "Global navigation header"}
      >
        
        {/* Left/Right Brand logo depending on RTL flow */}
        <div className="flex items-center gap-3">
          <Link 
            to={`/${currentLang}`} 
            className="flex items-center gap-2.5 group" 
            aria-label="TvarX Home"
          >
            <motion.div 
              whileHover={{ scale: 1.08, rotate: -5 }}
              className="flex items-center justify-center"
            >
              <TarxLogo size={40} />
            </motion.div>
            <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-[#A855F7] bg-clip-text text-transparent font-display">
              TvarX
            </span>
          </Link>
        </div>

        {/* Center links - responsive desktop navigation */}
        <div className="hidden lg:flex items-center gap-7">
          {menuItems.map((item, idx) => {
            if (item.type === "hash") {
              return (
                <button
                  key={idx}
                  onClick={() => handleScrollToSection(item.target)}
                  className="text-zinc-400 hover:text-white transition-colors text-sm font-medium relative py-1 cursor-pointer group"
                >
                  {item.text}
                  <span className="absolute bottom-0 right-0 w-0 h-[2px] bg-[#A855F7] transition-all duration-300 group-hover:w-full" />
                </button>
              );
            } else {
              const active = location.pathname === item.target;
              return (
                <Link
                  key={idx}
                  to={item.target}
                  className={`text-sm font-medium relative py-1 transition-colors group ${
                    active ? "text-[#A855F7]" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {item.text}
                  <span className={`absolute bottom-0 right-0 h-[2px] bg-[#A855F7] transition-all duration-300 ${active ? "w-full" : "w-0 group-hover:w-full"}`} />
                </Link>
              );
            }
          })}
        </div>

        {/* Right segment: Language toggle and primary CTA */}
        <div className="hidden md:flex items-center gap-4">
          
          {/* Polished Language Switcher */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLanguageToggle}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#A855F7]/30 transition-all text-xs font-semibold text-zinc-300 cursor-pointer font-mono"
            aria-label={currentLang === "fa" ? "Change language" : "تغییر زبان"}
          >
            <Languages className="w-4 h-4 text-[#A855F7]" />
            <span>{t.navbar.languageToggle}</span>
          </motion.button>

          {/* Nav CTA button */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.dispatchEvent(new CustomEvent("open-vip-modal"))}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#A855F7] text-white text-sm font-medium hover:shadow-lg hover:shadow-[#7C3AED]/30 transition-all cursor-pointer flex items-center gap-2"
          >
            <span>{t.navbar.cta}</span>
            {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </motion.button>
        </div>

        {/* Mobile menu and Language swap button stack */}
        <div className="md:hidden flex items-center gap-2">
          
          {/* Direct small language toggle for mobile screen */}
          <button
            onClick={handleLanguageToggle}
            className="p-2 text-zinc-400 hover:text-[#A855F7] transition-colors border border-white/5 rounded-lg bg-white/[0.02]"
            aria-label="Language Selector"
          >
            <Languages className="w-5 h-5 text-[#A855F7]" />
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-zinc-400 hover:text-white transition-colors"
            aria-expanded={isOpen}
            aria-label="Navigation Menu toggler"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Glass Drawer Component */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden border-b border-white/10 bg-black/90 backdrop-blur-2xl overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 flex flex-col gap-3">
              {menuItems.map((item, idx) => {
                if (item.type === "hash") {
                  return (
                    <button
                      key={idx}
                      onClick={() => handleScrollToSection(item.target)}
                      className={`text-right w-full py-2.5 text-zinc-300 hover:text-[#A855F7] transition-colors border-b border-zinc-900/50 text-base ${isRtl ? "text-right" : "text-left"}`}
                    >
                      {item.text}
                    </button>
                  );
                } else {
                  return (
                    <Link
                      key={idx}
                      to={item.target}
                      onClick={() => setIsOpen(false)}
                      className={`w-full py-2.5 text-zinc-300 hover:text-[#A855F7] transition-colors border-b border-zinc-900/50 text-base block ${isRtl ? "text-right" : "text-left"}`}
                    >
                      {item.text}
                    </Link>
                  );
                }
              })}
              
              {/* Language toggle inside Mobile Sidebar menu */}
              <button
                onClick={handleLanguageToggle}
                className={`w-full py-3 mt-1 text-zinc-400 hover:text-white text-sm font-semibold flex items-center gap-2 justify-center border border-white/5 rounded-xl bg-white/[0.01]`}
              >
                <Languages className="w-4 h-4 text-[#A855F7]" />
                <span>{currentLang === "fa" ? "English Website" : "سایت فارسی"}</span>
              </button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setIsOpen(false);
                  window.dispatchEvent(new CustomEvent("open-vip-modal"));
                }}
                className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#A855F7] text-white font-bold text-center flex items-center justify-center gap-2"
              >
                <span>{t.navbar.cta}</span>
                {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
export default Navbar;
