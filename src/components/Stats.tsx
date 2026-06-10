import React from "react";
import { useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { Trophy, Activity, Users, Flame } from "lucide-react";
import { translations, TranslationSchema } from "../i18n/translations";

export function Stats() {
  const location = useLocation();
  const currentLang: "fa" | "en" = location.pathname.startsWith("/en") ? "en" : "fa";
  const t: TranslationSchema = translations[currentLang];
  const isRtl = t.dir === "rtl";

  const statItems = [
    {
      id: "exercises",
      icon: <Flame className="w-5 h-5 text-[#A855F7]" />,
      value: t.stats.item1Val,
      suffix: t.stats.item1Suf,
      label: t.stats.item1Label,
      description: t.stats.item1Desc,
    },
    {
      id: "programs",
      icon: <Trophy className="w-5 h-5 text-purple-400" />,
      value: t.stats.item2Val,
      suffix: t.stats.item2Suf,
      label: t.stats.item2Label,
      description: t.stats.item2Desc,
    },
    {
      id: "availability",
      icon: <Activity className="w-5 h-5 text-indigo-400" />,
      value: t.stats.item3Val,
      suffix: t.stats.item3Suf,
      label: t.stats.item3Label,
      description: t.stats.item3Desc,
    },
    {
      id: "adaptation",
      icon: <Users className="w-5 h-5 text-rose-400" />,
      value: t.stats.item4Val,
      suffix: t.stats.item4Suf,
      label: t.stats.item4Label,
      description: t.stats.item4Desc,
    }
  ];

  return (
    <section 
      id="stats" 
      className={`py-20 bg-black relative overflow-hidden ${isRtl ? "text-right" : "text-left"}`}
      aria-label="Tarx App Performance statistics"
    >
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-[#7C3AED]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statItems.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5, borderColor: "rgba(168, 85, 247, 0.3)" }}
              className={`p-6 rounded-2xl bg-zinc-950/50 border border-white/5 backdrop-blur-md flex flex-col justify-between space-y-4 hover:bg-zinc-900/10 transition-all duration-300 ${isRtl ? "text-right" : "text-left"}`}
            >
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center">
                  {stat.icon}
                </div>
              </div>

              <div className="space-y-1">
                <div className={`flex items-baseline gap-1 ${isRtl ? "justify-start flex-row-reverse" : "justify-start"}`}>
                  <span className="text-3xl sm:text-4xl font-black text-white tracking-tight font-mono">
                    {stat.value}
                  </span>
                  <span className="text-xs text-[#A855F7] font-semibold">
                    {stat.suffix}
                  </span>
                </div>
                
                <h4 className="text-sm font-semibold text-zinc-300">
                  {stat.label}
                </h4>
                <p className="text-xs text-zinc-500">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Stats;
