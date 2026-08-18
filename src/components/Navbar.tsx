import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowLeft, ArrowRight, Languages, ChevronDown, Dumbbell, Activity } from "lucide-react";
import { TarxLogo } from "./TarxLogo";
import { translations, TranslationSchema } from "../i18n/translations";
import { detailHrefFromItem, headerGroups, getSportsMenu } from "../sports/menu";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [sportsOpen, setSportsOpen] = useState(false);
  const [sportsMobileOpen, setSportsMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Deduce active language from pathname
  const currentLang: "fa" | "en" = location.pathname.startsWith("/en") ? "en" : "fa";
  const t: TranslationSchema = translations[currentLang];
  const isRtl = t.dir === "rtl";

  const sportsHref = currentLang === "fa" ? "/sports" : "/en/sports";
  const groups = headerGroups();
  const muscles = getSportsMenu().muscles;

  const handleLanguageToggle = () => {
    setIsOpen(false);
    const otherLang = currentLang === "fa" ? "en" : "fa";

    // Determine the target route to preserve sub-page paths
    let targetPath = `/${otherLang}`;

    if (location.pathname === "/sports" || location.pathname === "/en/sports") {
      targetPath = otherLang === "en" ? "/en/sports" : "/sports";
    } else if (location.pathname.includes("/sports/")) {
      import("../sports/data").then(({ resolveDetailPath, detailHref }) => {
        const resolved = resolveDetailPath(location.pathname);
        navigate(resolved ? detailHref(resolved.detail, otherLang) : targetPath);
      });
      return;
    } else if (location.pathname.includes("/about")) {
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
    { text: t.sports.navLabel, type: "route", target: currentLang === "fa" ? "/sports" : "/en/sports" },
    { text: t.navbar.features, type: "hash", target: "features" },
    { text: t.navbar.about, type: "route", target: `/${currentLang}/about` },
    { text: t.navbar.privacy, type: "route", target: `/${currentLang}/privacy` },
    { text: t.navbar.terms, type: "route", target: `/${currentLang}/terms` }
  ];

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-40 bg-black/40 backdrop-blur-xl border-b border-white/10" id="navbar">
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
        <div className="hidden md:flex items-center gap-4 lg:gap-7">
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
            } else if (item.target === sportsHref) {
              const active = location.pathname.startsWith("/sports");
              return (
                <div
                  key={idx}
                  className="relative"
                  onMouseEnter={() => setSportsOpen(true)}
                  onMouseLeave={() => setSportsOpen(false)}
                >
                  <Link
                    to={item.target}
                    onClick={() => setSportsOpen(false)}
                    className={`text-sm font-medium relative py-1 transition-colors group flex items-center gap-1.5 ${
                      active ? "text-[#A855F7]" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {item.text}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform ${sportsOpen ? "rotate-180" : ""} ${
                        active ? "text-[#A855F7]" : "text-zinc-500"
                      }`}
                    />
                    <span className={`absolute bottom-0 right-0 h-[2px] bg-[#A855F7] transition-all duration-300 ${active ? "w-full" : "w-0 group-hover:w-full"}`} />
                  </Link>

                  {/* Mega menu with all categories + muscles */}
                  <AnimatePresence>
                    {sportsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[min(92vw,860px)]"
                      >
                        <div className="rounded-2xl border border-white/10 bg-zinc-950/95 backdrop-blur-2xl shadow-2xl shadow-black/60 overflow-hidden">
                          <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
                            <span className="text-sm font-semibold text-white flex items-center gap-2.5">
                              <span className="p-1.5 rounded-lg bg-[#7C3AED]/15 border border-[#A855F7]/30 text-[#A855F7]">
                                <Dumbbell className="w-4 h-4" />
                              </span>
                              {t.sports.title}
                            </span>
                            <span className="text-[11px] text-zinc-500" dir="auto">
                              {currentLang === "fa"
                                ? `${groups.reduce((n, g) => n + g.categories.length, 0)} دسته · ${muscles.length} عضله`
                                : `${groups.reduce((n, g) => n + g.categories.length, 0)} categories · ${muscles.length} muscles`}
                            </span>
                          </div>

                          <div className="flex max-h-[70vh] overflow-y-auto">
                            {/* Category groups */}
                            <div className="flex-1 min-w-0 grid grid-cols-3 gap-x-5 gap-y-4 p-5">
                              {groups.map((g) => {
                                const wide = g.categories.length > 5;
                                return (
                                  <div key={g.id} className={wide ? "col-span-3" : "col-span-1"}>
                                    <p
                                      className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-2 flex items-center gap-2"
                                      dir="auto"
                                    >
                                      <span className="w-1 h-1 rounded-full bg-[#A855F7]" />
                                      {currentLang === "fa" ? g.title.fa : g.title.en}
                                    </p>
                                    <ul className={`space-y-0.5 ${wide ? "grid grid-cols-2 gap-x-5" : ""}`}>
                                      {g.categories.map((c) => (
                                        <li key={c.slug.en}>
                                          <Link
                                            to={detailHrefFromItem(c, currentLang)}
                                            onClick={() => setSportsOpen(false)}
                                            className="group flex items-center justify-between gap-3 text-[13px] text-zinc-400 hover:text-white px-2 py-1 rounded-lg hover:bg-white/5 transition-colors"
                                          >
                                            <span className="truncate" dir="auto">
                                              {c.name[currentLang]}
                                            </span>
                                            <span className="shrink-0 rounded-md bg-white/5 px-1.5 py-px text-[10px] tabular-nums text-zinc-500 group-hover:bg-[#7C3AED]/20 group-hover:text-[#A855F7] transition-colors">
                                              {c.exercise_count}
                                            </span>
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                );
                              })}
                            </div>

                            {/* Muscles sidebar */}
                            <div className="w-64 shrink-0 border-e border-white/5 bg-white/[0.02] p-5">
                              <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-2 flex items-center gap-2">
                                <Activity className="w-3 h-3 text-[#A855F7]" />
                                {t.sports.filterMuscles}
                              </p>
                              <ul className="grid grid-cols-2 gap-x-2 gap-y-0.5">
                                {muscles.map((m) => (
                                  <li key={m.slug.en}>
                                    <Link
                                      to={detailHrefFromItem(m, currentLang)}
                                      onClick={() => setSportsOpen(false)}
                                      title={m.name[currentLang]}
                                      className="flex items-center justify-between gap-2 text-[13px] text-zinc-400 hover:text-white px-2 py-1 rounded-lg hover:bg-white/5 transition-colors"
                                    >
                                      <span className="truncate" dir="auto">
                                        {m.name[currentLang]}
                                      </span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <Link
                            to={sportsHref}
                            onClick={() => setSportsOpen(false)}
                            className="flex items-center justify-center gap-2 py-3 text-xs font-semibold text-[#A855F7] hover:bg-[#7C3AED]/10 transition-colors border-t border-white/5"
                          >
                            {t.lang === "fa" ? "مرور همه تمرین‌ها" : "Browse all exercises"}
                            {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
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
    </header>

    {/* Mobile Drawer Overlay */}
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
        />
      )}
    </AnimatePresence>

    {/* Mobile Slide-in Drawer from right */}
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="md:hidden fixed top-0 right-0 z-50 h-full w-[280px] max-w-[85vw] bg-zinc-950/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl overflow-y-auto"
        >
          <div className="flex flex-col h-full px-5 py-6">
            
            {/* Close button + brand */}
            <div className="flex items-center justify-between mb-8">
              <Link
                to={`/${currentLang}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2"
              >
                <TarxLogo size={32} />
                <span className="text-lg font-bold text-white font-display">TvarX</span>
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation items */}
            <div className="flex-1 space-y-1">
              {menuItems.map((item, idx) => {
                if (item.type === "hash") {
                  return (
                    <button
                      key={idx}
                      onClick={() => handleScrollToSection(item.target)}
                      className={`w-full px-4 py-3 text-zinc-300 hover:text-white hover:bg-white/5 rounded-xl transition-all text-base font-medium text-right ${
                        isRtl ? "text-right" : "text-left"
                      }`}
                    >
                      {item.text}
                    </button>
                  );
                } else {
                  const active = location.pathname === item.target;
                  if (item.target === sportsHref) {
                    return (
                      <div key={idx} className="rounded-xl">
                        <button
                          onClick={() => setSportsMobileOpen((v) => !v)}
                          className={`w-full px-4 py-3 rounded-xl transition-all text-base font-medium flex items-center justify-between ${
                            active
                              ? "text-[#A855F7] bg-[#7C3AED]/10"
                              : "text-zinc-300 hover:text-white hover:bg-white/5"
                          }`}
                          aria-expanded={sportsMobileOpen}
                        >
                          <span className="flex items-center gap-2">
                            <Dumbbell className="w-4 h-4 text-[#A855F7]" />
                            {item.text}
                          </span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${sportsMobileOpen ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence initial={false}>
                          {sportsMobileOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-3 pr-2 pb-3 space-y-1">
                                <Link
                                  to={sportsHref}
                                  onClick={() => setIsOpen(false)}
                                  className="block px-4 py-2.5 rounded-lg text-sm font-medium text-[#A855F7] bg-[#7C3AED]/10"
                                >
                                  {t.lang === "fa" ? "همه تمرین‌ها (ویدیو + عکس)" : "All exercises (video + photos)"}
                                </Link>
                                {groups.map((g) => (
                                  <div key={g.id} className="mt-2">
                                    <p className="text-[11px] font-semibold text-zinc-500 px-3 py-1" dir="auto">
                                      {currentLang === "fa" ? g.title.fa : g.title.en}
                                    </p>
                                    {g.categories.map((c) => (
                                      <Link
                                        key={c.slug.en}
                                        to={detailHrefFromItem(c, currentLang)}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center justify-between px-4 py-2 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-white/5"
                                      >
                                        <span className="truncate" dir="auto">
                                          {c.name[currentLang]}
                                        </span>
                                        <span className="text-[10px] text-zinc-600 shrink-0">{c.exercise_count}</span>
                                      </Link>
                                    ))}
                                  </div>
                                ))}
                                <p className="text-[11px] font-semibold text-zinc-500 px-3 py-1 mt-2">
                                  {t.sports.filterMuscles}
                                </p>
                                {muscles.map((m) => (
                                  <Link
                                    key={m.slug.en}
                                    to={detailHrefFromItem(m, currentLang)}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center justify-between px-4 py-2 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-white/5"
                                  >
                                    <span className="truncate" dir="auto">
                                      {m.name[currentLang]}
                                    </span>
                                    <span className="text-[10px] text-zinc-600 shrink-0">{m.exercise_count}</span>
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }
                  return (
                    <Link
                      key={idx}
                      to={item.target}
                      onClick={() => setIsOpen(false)}
                      className={`w-full px-4 py-3 rounded-xl transition-all text-base font-medium block ${
                        active
                          ? "text-[#A855F7] bg-[#7C3AED]/10"
                          : "text-zinc-300 hover:text-white hover:bg-white/5"
                      } ${isRtl ? "text-right" : "text-left"}`}
                    >
                      {item.text}
                    </Link>
                  );
                }
              })}
            </div>

            {/* Bottom actions */}
            <div className="pt-4 border-t border-white/5 space-y-3">
              <button
                onClick={handleLanguageToggle}
                className="w-full py-3 px-4 text-zinc-400 hover:text-white text-sm font-semibold flex items-center gap-2 justify-center border border-white/5 rounded-xl bg-white/[0.01]"
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
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#A855F7] text-white font-bold text-center flex items-center justify-center gap-2"
              >
                <span>{t.navbar.cta}</span>
                {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>);
}
export default Navbar;
