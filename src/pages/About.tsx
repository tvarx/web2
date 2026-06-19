import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { Sparkles, Trophy, ShieldAlert, Zap, LayoutGrid, CheckCircle, Cpu, Activity, Camera, Play, Pause, RefreshCw, Database, WifiOff, Settings } from "lucide-react";
import { SEO } from "../components/SEO";
import { TarxLogo } from "../components/TarxLogo";
import { translations, TranslationSchema } from "../i18n/translations";

export function About() {
  const location = useLocation();
  const currentLang: "fa" | "en" = location.pathname.startsWith("/en") ? "en" : "fa";
  const t: TranslationSchema = translations[currentLang];
  const isRtl = t.dir === "rtl";

  const [fusionRatio, setFusionRatio] = useState(0.5);
  const [exerciseProgress, setExerciseProgress] = useState(0);
  const [isSimulatingScan, setIsSimulatingScan] = useState(true);
  const [selectedJoint, setSelectedJoint] = useState<string>("elbow");
  const [processingDelay, setProcessingDelay] = useState(1.1);

  // Smooth periodic update for skeleton model animation
  useEffect(() => {
    if (!isSimulatingScan) return;
    const interval = setInterval(() => {
      setExerciseProgress((prev) => (prev + 0.04) % (Math.PI * 2));
      // subtle jitter for processing delay to make it feel alive
      setProcessingDelay((d) => Math.min(1.8, Math.max(0.8, d + (Math.random() - 0.5) * 0.15)));
    }, 45);
    return () => clearInterval(interval);
  }, [isSimulatingScan]);

  return (
    <>
      {/* SEO configuration for About Page */}
      <SEO 
        title={t.aboutPage.seoTitle}
        description={t.aboutPage.seoDesc}
        lang={t.lang}
        dir={t.dir}
      />

      <section className={`min-h-screen pt-32 pb-24 bg-[#050505] relative overflow-hidden ${
        isRtl ? "text-right" : "text-left"
      }`}>
        
        {/* Cinematic Backdrop Glow Spheres */}
        <div className="absolute top-[15%] left-[10%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-[#7C3AED]/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[15%] right-[10%] w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] rounded-full bg-[#A855F7]/10 blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full space-y-20">
          
          {/* Page main display caption */}
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center mx-auto mb-3"
            >
              <TarxLogo size={64} />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl font-black text-white"
            >
              {t.aboutPage.title}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#A855F7] font-semibold text-xs uppercase tracking-widest font-mono"
            >
              {currentLang === "fa" ? "درباره تکنولوژی ورزشی ما" : "OUR HYPERTROPHY METHODOLOGIES"}
            </motion.p>
          </div>

          {/* Intro Story Grid */}
          <div className="border-b border-white/5 pb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-5 max-w-3xl"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-purple-300">
                {t.aboutPage.introTitle}
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed text-justify">
                {t.aboutPage.introDesc1}
              </p>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed text-justify">
                {t.aboutPage.introDesc2}
              </p>
            </motion.div>
          </div>

          {/* Brand Name Meaning & Philosophy Section */}
          <div className="space-y-12 border-b border-white/5 pb-16" id="brand-meaning-section">
            <div className={`space-y-4 max-w-3xl ${isRtl ? "text-right" : "text-left"}`}>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="px-3 py-1 text-xs font-mono tracking-wider text-purple-400 bg-purple-950/40 border border-purple-800/30 rounded-full inline-block"
              >
                {currentLang === "fa" ? "ریشه‌شناسی و فلسفه برند" : "BRAND GENESIS & PHILOSOPHY"}
              </motion.span>
              <motion.h3
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-2xl sm:text-4xl font-black text-white tracking-tight"
              >
                {t.aboutPage.namePhilosophy.title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-zinc-400 text-sm sm:text-base leading-relaxed text-justify"
              >
                {t.aboutPage.namePhilosophy.p1}
              </motion.p>
            </div>

            {/* Interactive Concept Simulator (Quantum Synthesis Engine) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative p-1 sm:p-8 rounded-3xl bg-zinc-950/40 border border-white/5 overflow-hidden"
              id="interactive-quantum-synthesis"
            >
              <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

              {/* Grid Layout inside Interactive Box */}
              <div className="relative p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Side: Controllers & Info */}
                <div className="lg:col-span-7 space-y-8">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
                      <span className="text-xs font-mono uppercase tracking-widest text-[#A855F7]">
                        {currentLang === "fa" ? "شبیه‌ساز تعاملی هسته توارکس" : "TVARX CORE FUSION MATRIX"}
                      </span>
                    </div>
                    <h4 className="text-xl sm:text-2xl font-black text-white">
                      {currentLang === "fa" ? "درگاه ترکیب هوشمند" : "Interactive Concept Synthesizer"}
                    </h4>
                    <p className="text-zinc-400 text-xs sm:text-sm">
                      {currentLang === "fa" 
                        ? "با حرکت دادن اهرم زیر، درصد تلفیق واژه باستانی (Tvar) و فناوری نوین (X) را برای بیدارسازی پتانسیل مخفی تغییر دهید:"
                        : "Drag the fader key below to balance the ancient athletic torque (Tvar) with the cutting-edge cybernetic precision (X):"}
                    </p>
                  </div>

                  {/* The Interactive Slider Component */}
                  <div className="space-y-4">
                    <div className="flex justify-between text-xs font-mono font-bold text-zinc-500">
                      <span className={fusionRatio < 0.3 ? "text-blue-400" : ""}>
                        {currentLang === "fa" ? "توار (۱۰۰٪ حرکت)" : "Pure Tvar (100% Kinetic)"}
                      </span>
                      <span className={(fusionRatio >= 0.4 && fusionRatio <= 0.6) ? "text-purple-400" : ""}>
                        {currentLang === "fa" ? "سنتز توارکس (۵۰/۵۰)" : "Ideal TvarX (50/50 Split)"}
                      </span>
                      <span className={fusionRatio > 0.7 ? "text-pink-400" : ""}>
                        {currentLang === "fa" ? "ایکس (۱۰۰٪ هوش)" : "Pure X (100% Cyber)"}
                      </span>
                    </div>

                    <div className="relative group/slider">
                      {/* Interactive slide track background gradients */}
                      <div className="absolute inset-y-0 left-0 right-0 h-2 my-auto rounded-full bg-zinc-900 overflow-hidden border border-white/5">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 transition-all duration-300"
                          style={{ width: `${fusionRatio * 100}%` }}
                        />
                      </div>
                      <input 
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={fusionRatio}
                        onChange={(e) => setFusionRatio(parseFloat(e.target.value))}
                        className="w-full relative h-8 opacity-0 cursor-pointer h-full z-10"
                        id="fusion-range-slider"
                      />
                      {/* Styled Knob indicator */}
                      <div 
                        className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-2 border-purple-600 shadow-lg shadow-purple-500/20 pointer-events-none transition-all duration-150 transform -translate-x-1/2 group-hover/slider:scale-125"
                        style={{ [isRtl ? 'right' : 'left']: `${fusionRatio * 100}%` }}
                      />
                    </div>

                    {/* Presets Snap Triggers */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      <button 
                        onClick={() => setFusionRatio(0.0)}
                        id="btn-preset-tvar"
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono border transition-all ${
                          fusionRatio === 0.0 
                            ? "bg-blue-950/40 border-blue-500/40 text-blue-400 font-bold" 
                            : "bg-zinc-950/20 border-white/5 hover:border-white/10 text-zinc-500 hover:text-zinc-300"
                        }`}
                      >
                        {currentLang === "fa" ? "آب باستانی (0.0 Tvar)" : "Genesis Tvar (0.0)"}
                      </button>
                      <button 
                        onClick={() => setFusionRatio(0.5)}
                        id="btn-preset-tvarx"
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono border transition-all ${
                          fusionRatio === 0.5 
                            ? "bg-purple-950/40 border-purple-500/40 text-purple-400 font-bold" 
                            : "bg-zinc-950/20 border-white/5 hover:border-white/10 text-zinc-500 hover:text-zinc-300"
                        }`}
                      >
                        {currentLang === "fa" ? "سنتز متقارن (0.5 TvarX)" : "Symmetric Synthesis (0.5)"}
                      </button>
                      <button 
                        onClick={() => setFusionRatio(1.0)}
                        id="btn-preset-x"
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono border transition-all ${
                          fusionRatio === 1.0 
                            ? "bg-pink-950/40 border-pink-500/40 text-pink-400 font-bold" 
                            : "bg-zinc-950/20 border-white/5 hover:border-white/10 text-zinc-500 hover:text-zinc-300"
                        }`}
                      >
                        {currentLang === "fa" ? "علم مطلق (1.0 X)" : "Pure AI Science (1.0)"}
                      </button>
                    </div>
                  </div>

                  {/* Live Interactive Text Readouts */}
                  <div className="p-5 rounded-2xl bg-zinc-900/40 border border-white/5 space-y-3 min-h-[140px] flex flex-col justify-between">
                    <div>
                      {fusionRatio < 0.35 && (
                        <div className="space-y-1 entry-animation">
                          <span className="text-xs font-mono text-blue-400 uppercase font-semibold">
                            {currentLang === "fa" ? "حالت فرکانسی: جنبش و شتاب بدنی" : "FREQUENCY: ANCESTRAL KINETIC PULSE"}
                          </span>
                          <h5 className="text-lg font-black text-white">{t.aboutPage.namePhilosophy.tvarTitle}</h5>
                          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">{t.aboutPage.namePhilosophy.tvarDesc}</p>
                        </div>
                      )}
                      
                      {fusionRatio >= 0.35 && fusionRatio <= 0.65 && (
                        <div className="space-y-1 entry-animation">
                          <span className="text-xs font-mono text-purple-400 uppercase font-semibold">
                            {currentLang === "fa" ? "حالت فرکانسی: سنتز متقارن فناوری و بافت عضلانی" : "FREQUENCY: COMPLETE COHESIVE TVARX SYMMETRY"}
                          </span>
                          <h5 className="text-lg font-black text-white">
                            {currentLang === "fa" ? "توارکس (تلفیق متعادل غایی)" : "TvarX Core Equilibrium"}
                          </h5>
                          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                            {currentLang === "fa" 
                              ? "ترکیب کامل و پایدار شتاب باستانی کار بر روی بدن فیزیکی (Tvar) به همراه شبکه بهینه ساز ریاضی هوش مصنوعی (X). توازن ایده آل برای تکامل فیزیکی شما."
                              : "The optimal state of the system where ancestral body kinetics perfectly fuse with deep mathematical neural processors. Balanced to make physical fitness seamlessly natural."}
                          </p>
                        </div>
                      )}

                      {fusionRatio > 0.65 && (
                        <div className="space-y-1 entry-animation">
                          <span className="text-xs font-mono text-pink-400 uppercase font-semibold">
                            {currentLang === "fa" ? "حالت فرکانسی: تحلیل عددی پیشرفته" : "FREQUENCY: QUANTUM COGNITIVE HYPERTROPHY"}
                          </span>
                          <h5 className="text-lg font-black text-white">{t.aboutPage.namePhilosophy.xTitle}</h5>
                          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">{t.aboutPage.namePhilosophy.xDesc}</p>
                        </div>
                      )}
                    </div>

                    <p className="text-zinc-500 font-serif text-xs italic border-t border-white/5 pt-3">
                      {t.aboutPage.namePhilosophy.p2}
                    </p>
                  </div>
                </div>

                {/* Right Side: Awesome Custom Dynamic SVG Matrix Screen */}
                <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-4">
                  <div className="relative w-full aspect-square max-w-[280px] rounded-3xl bg-zinc-950 border border-white/5 flex items-center justify-center p-6 overflow-hidden id-brand-canvas-matrix">
                    
                    {/* Matrix grid backdrop lines */}
                    <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-10 pointer-events-none">
                      {[...Array(36)].map((_, i) => (
                        <div key={i} className="border-[0.5px] border-zinc-500" />
                      ))}
                    </div>

                    {/* Quantum Circular Energy Wave Ring */}
                    <div className="absolute inset-0 m-auto w-48 h-48 rounded-full border border-dashed border-zinc-800 animate-[spin_40s_linear_infinite]" />
                    <div 
                      className="absolute inset-0 m-auto w-36 h-36 rounded-full border border-dotted transition-all duration-300"
                      style={{ 
                        borderColor: fusionRatio < 0.35 ? '#3B82F6' : fusionRatio > 0.65 ? '#EC4899' : '#A855F7',
                        transform: `scale(${1 + Math.sin(fusionRatio * Math.PI) * 0.15})`
                      }}
                    />

                    {/* Central Synthesis Engine graphic */}
                    <div className="relative z-10 flex flex-col items-center justify-center text-center">
                      <motion.div 
                        animate={{ 
                          scale: [1, 1.05, 1],
                          rotate: fusionRatio * 15 - 7.5
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity,
                          ease: "easeInOut" 
                        }}
                        className="relative"
                      >
                        {/* Core glow */}
                        <div 
                          className="absolute inset-0 rounded-full blur-2xl opacity-40 transition-all duration-500"
                          style={{
                            backgroundColor: fusionRatio < 0.35 ? '#3B82F6' : fusionRatio > 0.65 ? '#EC4899' : '#A855F7',
                          }}
                        />
                        
                        {/* Dynamic Core Graphic */}
                        <svg width="120" height="120" viewBox="0 0 100 100" fill="none" className="relative z-10">
                          <defs>
                            <linearGradient id="matrix-grad" x1="0" y1="100" x2="100" y2="0">
                              <stop offset="0%" stopColor="#3B82F6" stopOpacity={1 - fusionRatio} />
                              <stop offset="50%" stopColor="#7C3AED" stopOpacity={1} />
                              <stop offset="100%" stopColor="#EC4899" stopOpacity={fusionRatio} />
                            </linearGradient>
                          </defs>

                          {/* Circuit Paths */}
                          <path 
                            d="M 50 15 C 65 30, 85 50, 85 70 C 85 85, 15 85, 15 70 C 15 50, 35 30, 50 15 Z" 
                            stroke="url(#matrix-grad)" 
                            strokeWidth="3" 
                            strokeDasharray={fusionRatio < 0.3 ? "none" : "5, 5"}
                            fill="none" 
                          />

                          {/* Central Pulsing Heart Node */}
                          <circle 
                            cx="50" 
                            cy="55" 
                            r={14 + Math.sin(fusionRatio * Math.PI) * 10} 
                            fill="url(#matrix-grad)" 
                            className="transition-all duration-300"
                          />

                          {/* Orbiting Tech Nodes */}
                          <circle cx="28" cy="45" r="5" fill="#3B82F6" className="animate-pulse" />
                          <circle cx="72" cy="45" r="5" fill="#EC4899" className="animate-pulse" />

                          {/* Interactive vector alignment lines depending on ratio */}
                          <line 
                            x1="50" y1="55" 
                            x2={28 + fusionRatio * 22} 
                            y2={45 + fusionRatio * 10} 
                            stroke="#A855F7" 
                            strokeWidth="1.5" 
                          />
                        </svg>
                      </motion.div>

                      {/* Display readout inside matrix box */}
                      <div className="mt-4 space-y-1">
                        <div className="text-zinc-500 font-mono text-[9px] uppercase tracking-widest text-center">
                          {currentLang === "fa" ? "بازدهی انرژی هم‌افزایی" : "INTEGRATION EFFICIENCY"}
                        </div>
                        <div className="font-mono text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                          {/* Ideal synergetic output formula (peaks at 100% when fusion ratio is 0.5) */}
                          {Math.round((1 - Math.abs(fusionRatio - 0.5) * 1.5) * 100)}%
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detailed statistics dashboard panel */}
                  <div className="w-full max-w-[280px] bg-zinc-950/80 border border-white/5 p-4 rounded-2xl space-y-3 font-mono text-xs">
                    <div className="flex justify-between items-center text-[10px] text-zinc-500 border-b border-white/5 pb-1.5 uppercase font-bold">
                      <span>{currentLang === "fa" ? "شاخص عملکرد" : "KPI METRICS"}</span>
                      <span>{currentLang === "fa" ? "محلی" : "STANDALONE"}</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-zinc-400">
                        <span>{currentLang === "fa" ? "تکانه فیزیکی (توار):" : "Physical Momentum:"}</span>
                        <span className="text-blue-400 font-bold">{Math.round((1 - fusionRatio) * 100)}%</span>
                      </div>
                      <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 transition-all duration-200"
                          style={{ width: `${(1 - fusionRatio) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-zinc-400">
                        <span>{currentLang === "fa" ? "فرمول هم‌افزایی (X):" : "AI Precision Ratio:"}</span>
                        <span className="text-pink-400 font-bold">{Math.round(fusionRatio * 100)}%</span>
                      </div>
                      <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-pink-500 transition-all duration-200"
                          style={{ width: `${fusionRatio * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-zinc-400">
                        <span>{currentLang === "fa" ? "امتیاز پایداری هسته:" : "Cohesion Integrity:"}</span>
                        <span className="text-[#A855F7] font-bold">
                          {fusionRatio >= 0.4 && fusionRatio <= 0.6 ? (currentLang === "fa" ? "ایده‌آل" : "OPTIMAL") : (currentLang === "fa" ? "نامتوازن" : "VARIATIONAL")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>

            {/* Fusion Quote Banner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative p-6 rounded-2xl bg-zinc-950/30 border border-purple-500/10 hover:border-purple-500/20 transition-all text-center overflow-hidden"
              id="quote-fusion-banner"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-500 to-[#7C3AED]" />
              <p className="text-sm sm:text-base md:text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-white to-purple-200 leading-relaxed">
                "{t.aboutPage.namePhilosophy.p3}"
              </p>
            </motion.div>
          </div>

          {/* Central Columns: Vision & Core Strengths */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-b border-white/5 pb-16">
            
            {/* Mission Vision statement */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                <Sparkles className="w-6 h-6 text-[#A855F7]" />
                <span>{t.aboutPage.visionTitle}</span>
              </h3>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                {t.aboutPage.visionDesc}
              </p>
            </motion.div>

            {/* Highlights List list */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                <LayoutGrid className="w-6 h-6 text-[#A855F7]" />
                <span>{t.aboutPage.featuresTitle}</span>
              </h3>
              <ul className="space-y-3.5 text-sm text-zinc-400">
                {t.aboutPage.featuresList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

          </div>

          {/* Values Grid */}
          <div className="space-y-10">
            <h3 className="text-2xl sm:text-3xl font-black text-white text-center">
              {t.aboutPage.valuesTitle}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {t.aboutPage.values.map((v, idx) => {
                const icons = [
                  <Zap className="w-5 h-5 text-[#A855F7]" />,
                  <ShieldAlert className="w-5 h-5 text-purple-400" />,
                  <Trophy className="w-5 h-5 text-indigo-400" />
                ];
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="p-6 rounded-2xl bg-zinc-950/40 border border-white/5 space-y-4 hover:border-white/10 transition-colors"
                  >
                    <div className="p-2 w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center border border-white/5">
                      {icons[idx] || <CheckCircle className="w-5 h-5" />}
                    </div>
                    <h4 className="text-lg font-bold text-white">
                      {v.title}
                    </h4>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      {v.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>

      </section>
    </>
  );
}

export default About;
