import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SEO } from "../components/SEO";
import { Hero } from "../components/Hero";
import { FeatureGrid } from "../components/FeatureCard";
import { SportsSection } from "../components/SportsSection";
import { Showcase } from "../components/Showcase";
import { Stats } from "../components/Stats";
import { CTA } from "../components/CTA";
import { translations, TranslationSchema } from "../i18n/translations";

export function Home() {
  const location = useLocation();
  const currentLang: "fa" | "en" = location.pathname.startsWith("/en") ? "en" : "fa";
  const t: TranslationSchema = translations[currentLang];

  // Scroll to hash section if redirected from a subpage
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        // Let any initial animations complete
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <>
      {/* Dynamic SEO Meta sync */}
      <SEO 
        title={t.meta.title}
        description={t.meta.description}
        keywords={t.meta.keywords}
        lang={t.lang}
        dir={t.dir}
      />
      
      {/* Landing page components */}
      <Hero />
      <CTA />
      <FeatureGrid />
      <SportsSection />
      <Showcase />
      <Stats />
    </>
  );
}

export default Home;
