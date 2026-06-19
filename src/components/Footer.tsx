import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { Github, Twitter, Instagram, Mail, Heart } from "lucide-react";
import { TarxLogo } from "./TarxLogo";
import logo from "../assets/images/logo.png";
import myket from "../assets/images/myket.png";
import badgeNew from "../assets/images/badge-new.png";
import { 
  translations, 
  TranslationSchema,
  BAZAAR_URL,
  MYKET_URL 
} from "../i18n/translations";

export function Footer() {
  const location = useLocation();
  const currentLang: "fa" | "en" = location.pathname.startsWith("/en") ? "en" : "fa";
  const t: TranslationSchema = translations[currentLang];
  const isRtl = t.dir === "rtl";

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black border-t border-white/5 pt-16 pb-8 relative overflow-hidden" id="footer">
      {/* Absolute Bottom Glow layer */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] rounded-full bg-[#7C3AED]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className={`grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-white/5 pb-12 ${
          isRtl ? "text-right" : "text-left"
        }`}>
          
          {/* Logo Brand information */}
          <div className="md:col-span-5 space-y-5">
            <Link to={`/${currentLang}`} onClick={handleScrollTop} className="flex items-center gap-3">
              <div className="flex items-center justify-center">
                {currentLang === "fa" ? (
                  <img src={logo} alt="TvarX" className="h-8 object-contain" />
                ) : (
                  <TarxLogo size={32} />
                )}
              </div>
              { (
                <span className="text-xl font-bold tracking-tight text-white font-display">TvarX</span>
              )}
            </Link>
            
            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
              {t.footer.description}
            </p>

            {/* Social handles */}
            <div className={`flex gap-4 ${isRtl ? "justify-start" : "justify-start"}`}>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/[0.03] border border-white/5 hover:border-[#A855F7]/30 hover:text-white text-zinc-500 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/[0.03] border border-white/5 hover:border-[#A855F7]/30 hover:text-white text-zinc-500 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/[0.03] border border-white/5 hover:border-[#A855F7]/30 hover:text-white text-zinc-500 transition-all">
                <Github className="w-4 h-4" />
              </a>
              <a href="mailto:tvarxapp@gmail.com" className="p-2.5 rounded-full bg-white/[0.03] border border-white/5 hover:border-[#A855F7]/30 hover:text-white text-zinc-500 transition-all">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav Links Column 1: Website routes */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
              {currentLang === "fa" ? "لینک‌های مفید" : "Quick Links"}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to={`/${currentLang}`} onClick={handleScrollTop} className="text-zinc-400 hover:text-white transition-colors">
                  {t.navbar.home}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLang}/about`} onClick={handleScrollTop} className="text-zinc-400 hover:text-white transition-colors">
                  {t.navbar.about}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLang}/privacy`} onClick={handleScrollTop} className="text-zinc-400 hover:text-white transition-colors">
                  {t.navbar.privacy}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLang}/terms`} onClick={handleScrollTop} className="text-zinc-400 hover:text-white transition-colors">
                  {t.navbar.terms}
                </Link>
              </li>
            </ul>
          </div>

          {/* Nav Links Column 2: App market download hubs */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
              {t.footer.storeDownloadTitle}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href={BAZAAR_URL} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
                  <img src={badgeNew} alt="Cafe Bazaar" className="h-8 object-contain" />
                </a>
              </li>
              <li>
                <a href={MYKET_URL} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
                  <img src={myket} alt="Myket App" className="h-8 object-contain" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p className="text-center md:text-right">
            &copy; {new Date().getFullYear()} TvarX. {t.footer.copyright}
          </p>

          <p className="flex items-center gap-1 text-center md:text-left">
            <span>{t.footer.craftedWith}</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
