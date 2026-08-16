import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Loader2 } from "lucide-react";

// Import the high-fidelity generated images
import tracking from "../assets/images/1.webp";
import workout from "../assets/images/2.webp";
import analytics from "../assets/images/4.webp";
import mapboady from "../assets/images/3.webp";
import workuser from "../assets/images/5.webp";

interface PhoneMockupProps {
  type: "workout" | "tracking" | "analytics" |"mapboady" |"workuser";
  interactive?: boolean;
}

export function PhoneMockup({ type }: PhoneMockupProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Map types to the imported optimized assets
  const getImagePath = () => {
    switch (type) {
      case "workout":
        return workout;
      case "tracking":
        return tracking;
      case "analytics":
        return analytics;
      case "mapboady":
        return mapboady;
      case "workuser":
        return workuser;
      default:
        return workout;
    }
  };

  const getScreenTitle = () => {
    switch (type) {
      case "workout":
        return "تمرین هوازی بدنسازی";
      case "tracking":
        return "ثبت ست تمرینی";
      case "analytics":
        return "گزارش پیشرفت بدنی";
      default:
        return "برنامه بدنسازی";
    }
  };

  return (
    <div 
      id={`phone-mockup-${type}`}
      className="relative mx-auto w-[240px] sm:w-[300px] md:w-[350px] h-[500px] sm:h-[560px] md:h-[630px] rounded-[40px] md:rounded-[50px] bg-zinc-950 p-2 border-4 border-zinc-800 shadow-2xl shadow-brand-purple/20 flex flex-col overflow-hidden text-right leading-relaxed select-none"
    >
      {/* Decorative Outer Bezel Gloss */}
      <div className="absolute inset-0 rounded-[34px] md:rounded-[44px] border-2 border-white/5 pointer-events-none z-30" />

      {/* Screen Container */}
      <div className="relative w-full h-full rounded-[28px] md:rounded-[38px] bg-[#070709] border border-zinc-900 overflow-hidden flex flex-col text-xs text-zinc-300">
        
        {/* Dynamic Island Notch */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-6 rounded-full bg-zinc-950 z-40 flex items-center justify-center border border-zinc-900/60 shadow-inner">
          <div className="w-2.5 h-2.5 rounded-full bg-indigo-950/80 mr-4" />
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
        </div>



        {/* Progressive Loading Skeleton */}
        <AnimatePresence mode="popLayout">
          {!isLoaded && (
            <motion.div
              key="skeleton"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0 bg-[#09090c] z-20 flex flex-col justify-between p-6 pt-16 pb-10"
            >
              {/* Pulsing Header */}
              <div className="flex justify-between items-center">
                <div className="w-16 h-4 bg-zinc-800/60 rounded-md animate-pulse" />
                <div className="w-24 h-4 bg-zinc-800 rounded-md animate-pulse" />
              </div>

              {/* Shimmer Hero Area */}
              <div className="flex-1 my-6 rounded-2xl bg-zinc-900/40 border border-white/5 relative overflow-hidden flex flex-col items-center justify-center p-4">
                {/* Visual loading spinner aligned elegantly */}
                <div className="relative flex flex-col items-center gap-3">
                  <div className="absolute -inset-1 rounded-full bg-[#7C3AED]/20 blur-md animate-pulse" />
                  <Loader2 className="w-8 h-8 text-[#A855F7] animate-spin relative z-10" />
                  <span className="text-[10px] text-zinc-500 font-medium tracking-wide animate-pulse">{getScreenTitle()}</span>
                </div>
              </div>

              {/* Bottom List Skeleton items */}
              <div className="space-y-3">
                <div className="h-10 bg-zinc-900/80 border border-white/5 rounded-xl flex items-center justify-between px-3">
                  <div className="w-16 h-3 bg-zinc-800/70 rounded animate-pulse" />
                  <div className="w-20 h-3 bg-zinc-800 rounded animate-pulse" />
                </div>
                <div className="h-10 bg-zinc-900/80 border border-white/5 rounded-xl flex items-center justify-between px-3">
                  <div className="w-12 h-3 bg-zinc-800/70 rounded animate-pulse" />
                  <div className="w-24 h-3 bg-zinc-800 rounded animate-pulse" />
                </div>
              </div>

              {/* Shimmer Footer Grab bar */}
              <div className="h-4 flex items-center justify-center mt-4">
                <div className="w-28 h-1 rounded-full bg-zinc-800/60" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* High-Performance Screen Image with smooth lazy-loaded styling */}
        <div className="w-full h-full relative overflow-hidden">
          <img
            src={getImagePath()}
            alt={getScreenTitle()}
            className={`w-full h-full object-cover select-none transition-all duration-700 ease-out ${
              isLoaded ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-105 blur-md"
            }`}
            referrerPolicy="no-referrer"
            decoding="async"
            loading="eager"
            onLoad={() => setIsLoaded(true)}
          />
        </div>

        {/* Decorative IOS Home Grab indicator (rendered above image) */}
        <div className="absolute bottom-1 inset-x-0 h-6 flex items-center justify-center z-30 pointer-events-none">
          <div className="w-28 h-1 rounded-full bg-zinc-500/40" />
        </div>

      </div>
    </div>
  );
}

