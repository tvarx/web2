import { motion } from "motion/react";
import { Play, Flame, Heart, Sparkles, Check, ChevronLeft, Award, TrendingUp, Calendar, Zap } from "lucide-react";
import { useState } from "react";

interface PhoneMockupProps {
  type: "workout" | "tracking" | "analytics";
  interactive?: boolean;
}

export function PhoneMockup({ type, interactive = true }: PhoneMockupProps) {
  // Local state for some interactive fun on the tracking and workout screen
  const [completedSets, setCompletedSets] = useState<boolean[]>([true, true, false]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState<"week" | "month">("week");

  const toggleSet = (index: number) => {
    const next = [...completedSets];
    next[index] = !next[index];
    setCompletedSets(next);
  };

  return (
    <div className="relative mx-auto w-[280px] sm:w-[310px] h-[580px] sm:h-[630px] rounded-[48px] bg-zinc-950 p-2.5 border-4 border-zinc-800 shadow-2xl shadow-brand-purple/20 flex flex-col overflow-hidden text-right leading-relaxed select-none">
      
      {/* Decorative Outer Bezel Gloss */}
      <div className="absolute inset-0 rounded-[44px] border-2 border-white/5 pointer-events-none" />

      {/* Screen Container */}
      <div className="relative w-full h-full rounded-[38px] bg-[#0A0A0C] border border-zinc-900 overflow-hidden flex flex-col text-xs text-zinc-300">
        
        {/* Dynamic Island Notch */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-6 rounded-full bg-zinc-950 z-30 flex items-center justify-center border border-zinc-900">
          <div className="w-2.5 h-2.5 rounded-full bg-indigo-950/80 mr-4" />
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
        </div>

        {/* Dynamic IOS Status Bar */}
        <div className="h-10 pt-3 px-6 flex items-center justify-between text-[10px] text-zinc-400 font-mono z-20">
          <div>09:41</div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-2.5 h-2.5 text-[#A855F7]" />
            <div className="w-4 h-2 border border-zinc-600 rounded-sm p-0.5 flex items-center">
              <div className="w-2.5 h-full bg-[#7C3AED] rounded-2xs" />
            </div>
            <span>5G</span>
          </div>
        </div>

        {/* SCREEN 1: Workout Screen */}
        {type === "workout" && (
          <div className="flex-1 flex flex-col justify-between p-4 pt-1">
            {/* Top Bar inside App */}
            <div className="flex justify-between items-center text-zinc-400">
              <div className="flex items-center gap-1 bg-zinc-900/60 px-2 py-1 rounded-full border border-white/5 text-[9px]">
                <Flame className="w-3 h-3 text-[#A855F7] animate-pulse" />
                <span className="font-mono text-zinc-200">۴۲۰ کالری</span>
              </div>
              <span className="font-semibold text-zinc-200">تمرین هوازی فوق‌العاده</span>
            </div>

            {/* Simulated Video Deck with Motion Orbs */}
            <div className="my-3 flex-1 min-h-[180px] rounded-2xl bg-zinc-900 border border-white/10 relative overflow-hidden flex flex-col justify-end p-3">
              {/* Spinning gradient orbs mimicking exercise visualization */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#7C3AED]/40 blur-2xl animate-pulse" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-fuchsia-600/30 blur-2xl" />

              {/* Coach Avatar Ring */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <motion.button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-14 h-14 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#A855F7] flex items-center justify-center text-white shadow-lg shadow-[#7C3AED]/40 cursor-pointer"
                >
                  {isPlaying ? (
                    <div className="flex gap-1 items-center justify-center p-0.5">
                      <div className="w-1 h-4 bg-white rounded-xs animate-bounce" />
                      <div className="w-1 h-3 bg-white rounded-xs animate-bounce delay-75" />
                      <div className="w-1 h-4 bg-white rounded-xs animate-bounce delay-150" />
                    </div>
                  ) : (
                    <Play className="w-6 h-6 text-white translate-x-[-1px] fill-white" />
                  )}
                </motion.button>
              </div>

              {/* Progress Slider */}
              <div className="space-y-1.5 z-20">
                <div className="flex justify-between text-[9px] text-zinc-400 font-mono">
                  <span>۱۴:۲۴</span>
                  <span>۲۰:۰۰</span>
                </div>
                <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#7C3AED] to-[#A855F7] w-[72%]" />
                </div>
              </div>
            </div>

            {/* Current exercise status card */}
            <div className="bg-zinc-900/80 border border-white/5 rounded-xl p-3 space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-zinc-400">حرکت فعلی</span>
                <span className="px-2 py-0.5 rounded bg-[#7C3AED]/10 text-[#A855F7] text-[9px] font-bold">ست ۳ از ۴</span>
              </div>
              <h4 className="text-sm font-bold text-white">اسکوات هالتر پشت پا</h4>
              
              {/* Dynamic Health Stats */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="bg-white/[0.02] border border-white/5 rounded-lg p-2 flex items-center justify-between">
                  <div className="text-right">
                    <p className="text-[8px] text-zinc-500">ضربان قلب</p>
                    <p className="font-mono text-zinc-200 font-bold text-xs">۱۳۴ <span className="text-[9px] font-normal text-zinc-500">BPM</span></p>
                  </div>
                  <Heart className="w-4 h-4 text-rose-500 animate-pulse" />
                </div>
                <div className="bg-white/[0.02] border border-white/5 rounded-lg p-2 flex items-center justify-between">
                  <div className="text-right">
                    <p className="text-[8px] text-zinc-500">زمان استراحت</p>
                    <p className="font-mono text-zinc-200 font-bold text-xs">۰۰:۴۵</p>
                  </div>
                  <ClockIcon className="w-4 h-4 text-indigo-400" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 2: Exercise Tracking Screen */}
        {type === "tracking" && (
          <div className="flex-1 flex flex-col justify-between p-4 pt-1">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="w-6 h-6 rounded-lg bg-zinc-900 flex items-center justify-center border border-white/5">
                <ChevronLeft className="w-3.5 h-3.5 text-zinc-400" />
              </div>
              <span className="font-semibold text-zinc-200">ثبت ست تمرینی</span>
              <div className="w-6" /> {/* Placeholder */}
            </div>

            {/* Exercise Overview */}
            <div className="my-2 p-3 bg-zinc-900/50 border border-white/5 rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#7C3AED]/10 border border-[#7C3AED]/20 flex items-center justify-center text-[#A855F7] font-bold">
                ۳۵k
              </div>
              <div className="flex-1 text-right">
                <h4 className="text-zinc-200 font-bold">پرس سینه با دمبل</h4>
                <p className="text-[9px] text-zinc-500">هدف امروز: ۳ ست × ۸ تکرار | خستگی متوسط</p>
              </div>
            </div>

            {/* Smart Coach feedback balloon with glowing background */}
            <div className="relative bg-gradient-to-r from-zinc-900 to-[#1e1435] border border-[#7C3AED]/30 rounded-2xl p-3 my-2 shadow-lg shadow-[#7C3AED]/10">
              <div className="flex items-center gap-1.5 mb-1 text-zinc-200">
                <Sparkles className="w-3.5 h-3.5 text-[#A855F7]" />
                <span className="font-bold text-[10px]">مربی هوشمند بدنسازی Tarx</span>
              </div>
              <p className="text-zinc-300 leading-relaxed text-[10.5px]">
                «فرم آرنجت در زاویه عالی ۹۰ درجه است! برای ست آخر وزنه رو ۲ کیلوگرم بیشتر کن تا عضلات به اوج پمپ برسند.»
              </p>
            </div>

            {/* Sets Tracker Checklist */}
            <div className="space-y-1.5 flex-1 justify-center flex flex-col">
              <p className="text-[10px] text-zinc-400 mb-1">تیک تایید تکرارها</p>
              {[
                { label: "ست ۱", weight: "۴۰ کیلوگرم", reps: "۱۲ تکرار" },
                { label: "ست ۲", weight: "۴۵ کیلوگرم", reps: "۱۰ تکرار" },
                { label: "ست ۳", weight: "۵۰ کیلوگرم", reps: "۸ تکرار" }
              ].map((set, index) => (
                <div 
                  key={index} 
                  onClick={() => toggleSet(index)}
                  className={`flex justify-between items-center p-2.5 rounded-xl border transition-all cursor-pointer ${
                    completedSets[index] 
                      ? "bg-[#7C3AED]/10 border-[#7C3AED]/30 text-white" 
                      : "bg-zinc-900/40 border-white/5 text-zinc-400 hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                      completedSets[index] 
                        ? "bg-[#7C3AED] border-[#7C3AED] text-white" 
                        : "border-zinc-700"
                    }`}>
                      {completedSets[index] && <Check className="w-3 h-3" />}
                    </div>
                    <span className="font-semibold text-[10px]">{set.label}</span>
                  </div>
                  <div className="flex gap-3 text-[10px] font-mono">
                    <span>{set.weight}</span>
                    <span>{set.reps}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Completing Button */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-3 w-full py-2.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#A855F7] text-white font-semibold text-center text-[11px] shadow-md shadow-[#7C3AED]/20 cursor-pointer"
            >
              ثبت و ذخیره تمرین
            </motion.button>
          </div>
        )}

        {/* SCREEN 3: Analytics Dashboard */}
        {type === "analytics" && (
          <div className="flex-1 flex flex-col justify-between p-4 pt-1">
            {/* Header */}
            <div className="flex items-center justify-between text-zinc-200">
              <span className="font-semibold">گزارش پیشرفت بدنی</span>
              <Award className="w-4 h-4 text-amber-400" />
            </div>

            {/* Custom Tab Selector */}
            <div className="grid grid-cols-2 gap-1 p-1 bg-zinc-900 rounded-lg my-2 text-center text-[10px]">
              <button 
                onClick={() => setActiveTab("week")}
                className={`py-1 rounded-md cursor-pointer transition-colors ${activeTab === "week" ? "bg-[#7C3AED] text-white" : "text-zinc-400"}`}
              >
                هفتگی
              </button>
              <button 
                onClick={() => setActiveTab("month")}
                className={`py-1 rounded-md cursor-pointer transition-colors ${activeTab === "month" ? "bg-[#7C3AED] text-white" : "text-zinc-400"}`}
              >
                ماهانه
              </button>
            </div>

            {/* Micro Stats Grid */}
            <div className="grid grid-cols-3 gap-1.5 my-1 text-center">
              <div className="bg-zinc-900 p-1.5 rounded-lg border border-white/5">
                <span className="text-[7.5px] text-zinc-500 block">قدرت کل</span>
                <span className="font-mono text-zinc-100 font-bold text-[10px] text-[#A855F7]">+۲۴%</span>
              </div>
              <div className="bg-zinc-900 p-1.5 rounded-lg border border-white/5">
                <span className="text-[7.5px] text-zinc-500 block">تمرینات ماه</span>
                <span className="font-mono text-zinc-100 font-bold text-[10px]">۱۸ جلسه</span>
              </div>
              <div className="bg-zinc-900 p-1.5 rounded-lg border border-white/5">
                <span className="text-[7.5px] text-zinc-500 block">اسکور تمرین</span>
                <span className="font-mono text-zinc-100 font-bold text-[10px] text-emerald-400">A+</span>
              </div>
            </div>

            {/* Glowing Analytics Line Chart represented as fine inline SVGs */}
            <div className="bg-zinc-950 border border-white/5 rounded-xl p-2.5 my-2 flex-1 flex flex-col justify-between">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[8px] text-zinc-500">نمودار حجم تمرین (تونتاژ هفتگی)</span>
                <span className="text-[#A855F7] text-[8px] font-mono flex items-center gap-0.5"><TrendingUp className="w-2.5 h-2.5" /> ۱۲,۴۰۰ kg</span>
              </div>
              
              {/* Interactive custom high tech SVG Line Chart */}
              <div className="h-28 w-full relative flex items-end">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 200 100" preserveAspectRatio="none">
                  {/* Glowing glow effect filter */}
                  <defs>
                    <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#A855F7" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  {/* Grid Lines */}
                  <line x1="0" y1="20" x2="200" y2="20" stroke="#1d1d21" strokeWidth="0.5" strokeDasharray="3,3" />
                  <line x1="0" y1="50" x2="200" y2="50" stroke="#1d1d21" strokeWidth="0.5" strokeDasharray="3,3" />
                  <line x1="0" y1="80" x2="200" y2="80" stroke="#1d1d21" strokeWidth="0.5" strokeDasharray="3,3" />
                  
                  {/* Fill Area */}
                  <path 
                    d="M 5 95 L 40 75 L 80 50 L 120 65 L 160 30 L 195 15 L 195 95 Z" 
                    fill="url(#purpleGrad)" 
                  />
                  
                  {/* Trend Line */}
                  <path 
                    d="M 5 95 L 40 75 L 80 50 L 120 65 L 160 30 L 195 15" 
                    fill="none" 
                    stroke="url(#lineGrad)" 
                    strokeWidth="2.5"
                    strokeLinecap="round" 
                  />
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#7C3AED" />
                    <stop offset="100%" stopColor="#A855F7" />
                  </linearGradient>
                  
                  {/* Pulsing Dot */}
                  <circle cx="195" cy="15" r="4.5" fill="#ffffff" />
                  <circle cx="195" cy="15" r="8" fill="#A855F7" fillOpacity="0.4" className="animate-ping" />
                </svg>

                {/* X labels */}
                <div className="absolute -bottom-1 left-0 right-0 flex justify-between text-[7px] text-zinc-600 font-mono mt-1 px-1">
                  <span>ش</span><span>ی</span><span>د</span><span>س</span><span>چ</span><span>پ</span><span>ج</span>
                </div>
              </div>
            </div>

            {/* Workout consistency heatmap dots resembling Github commit grid */}
            <div className="bg-zinc-900/50 border border-white/5 rounded-lg p-2.5">
              <div className="flex justify-between text-[8px] text-zinc-400 mb-1.5">
                <span className="flex items-center gap-1"><Calendar className="w-2.5 h-2.5" /> ۱۲ روز پیوسته</span>
                <span>تیر و مرداد</span>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 28 }).map((_, i) => {
                  let opacity = "bg-zinc-800";
                  if ([2, 3, 5, 6, 7, 10, 11, 12, 13, 14, 18, 19, 20, 21, 24, 25, 26, 27].includes(i)) {
                    opacity = "bg-[#7C3AED]";
                  } else if ([1, 8, 15, 22].includes(i)) {
                    opacity = "bg-[#A855F7]/40";
                  }
                  return (
                    <div 
                      key={i} 
                      className={`h-2 rounded-xs transition-colors hover:bg-white ${opacity}`}
                      title={`روز ${i + 1}`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Decorative IOS Home Grab indicator */}
        <div className="h-6 flex items-center justify-center">
          <div className="w-28 h-1 rounded-full bg-zinc-700/80" />
        </div>
      </div>
    </div>
  );
}

// Visual mini components to preserve standard layout
function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
