import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { Dumbbell, Play, Zap, Sparkles, ArrowLeft, ArrowRight } from "lucide-react";
import { translations, TranslationSchema } from "../i18n/translations";
import {
  getSportsMenu,
  getExercisesIndex,
  detailHrefFromItem,
  exerciseHref,
  listHref,
  menuExerciseFallbackImage,
} from "../sports/menu";
import { posterFor, buildVideoViews } from "../sports/ExerciseVideoTabs";
import type { Lang, CategoryListItem, IndexedExercise } from "../sports/types";

const DIFF_LEVELS = ["Novice", "Beginner", "Intermediate", "Advanced"] as const;

function diffLevel(d: string | undefined): number {
  const idx = DIFF_LEVELS.indexOf((d ?? "") as (typeof DIFF_LEVELS)[number]);
  return idx >= 0 ? idx : 0;
}

function diffLabelLevel(level: number): "easy" | "medium" | "hard" {
  if (level <= 1) return "easy";
  if (level === 2) return "medium";
  return "hard";
}

function difficultyText(diff: string | undefined, t: TranslationSchema): string {
  const l = diffLabelLevel(diffLevel(diff));
  return l === "easy"
    ? t.sports.difficultyEasy
    : l === "medium"
    ? t.sports.difficultyMedium
    : t.sports.difficultyHard;
}

function difficultyClasses(level: number): string {
  const l = diffLabelLevel(level);
  return l === "easy"
    ? "text-sky-300 bg-sky-500/10 border-sky-500/25"
    : l === "medium"
    ? "text-amber-300 bg-amber-500/10 border-amber-500/25"
    : "text-emerald-300 bg-emerald-500/10 border-emerald-500/25";
}

function CategoryCard({ c, lang, t }: { c: CategoryListItem; lang: Lang; t: TranslationSchema }) {
  const [imgFailed, setImgFailed] = useState(false);
  return (
    <Link
      to={detailHrefFromItem(c, lang)}
      className="group relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-950/60 aspect-[16/11] block hover:border-[#A855F7]/50 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A855F7]/60"
      aria-label={c.name[lang]}
    >
      {c.image && !imgFailed ? (
        <img
          src={c.image}
          alt={c.name[lang]}
          loading="lazy"
          decoding="async"
          onError={() => setImgFailed(true)}
          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#7C3AED]/20 via-zinc-900 to-zinc-950">
          <Dumbbell className="w-8 h-8 text-[#A855F7]/50" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 p-4">
        <h3 className="text-white font-semibold text-sm sm:text-base leading-snug" dir="auto">
          {c.name[lang]}
        </h3>
        <p className="mt-1.5 text-[11px] text-zinc-400">
          {c.exercise_count} {t.sports.exercises}
        </p>
      </div>
    </Link>
  );
}

function MiniExerciseCard({
  ex,
  t,
  lang,
  index,
}: {
  ex: IndexedExercise;
  t: TranslationSchema;
  lang: Lang;
  index: number;
  key?: React.Key;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const poster = ex.poster || posterFor(ex.media, "male");
  const views = buildVideoViews(ex.media);
  const name = t.lang === "fa" ? ex.name.fa || ex.name.en : ex.name.en;
  const level = diffLevel(ex.difficulty);

  return (
    <Link
      to={exerciseHref(ex, lang)}
      className="group block rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-[#A855F7]/50 hover:bg-white/[0.04] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A855F7]/60"
      aria-label={name}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-black">
        {poster && !imgFailed ? (
          <img
            src={poster}
            alt={name}
            loading="lazy"
            decoding="async"
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#7C3AED]/20 via-zinc-900 to-zinc-950">
            <Dumbbell className="w-9 h-9 text-[#A855F7]/40" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div
          className={`absolute top-2.5 ${t.lang === "fa" ? "right-2.5" : "left-2.5"} px-2.5 py-1 rounded-md text-[11px] font-semibold border backdrop-blur-sm ${difficultyClasses(level)}`}
        >
          {difficultyText(ex.difficulty, t)}
        </div>
        {views.length > 0 ? (
          <div
            className={`absolute bottom-2.5 ${t.lang === "fa" ? "left-2.5" : "right-2.5"} px-2 py-1 rounded bg-black/50 backdrop-blur-sm border border-white/10 text-[10px] font-medium text-zinc-300 flex items-center gap-1.5`}
          >
            <Zap className="w-3.5 h-3.5 text-[#A855F7]" />
            {views.length} {t.homeSports.videosLabel}
          </div>
        ) : null}
      </div>
      <div className="px-4 py-3 border-t border-white/5">
        <h3 className="text-[15px] font-semibold text-white leading-snug line-clamp-2" dir="auto">
          {name}
        </h3>
        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="text-xs text-zinc-500 truncate" dir="auto">
            {index + 1} — {t.homeSports.exercisesTitle}
          </span>
          <Play className="w-3.5 h-3.5 text-zinc-700 group-hover:text-[#A855F7] shrink-0 transition-colors" />
        </div>
      </div>
    </Link>
  );
}

export function SportsSection() {
  const location = useLocation();
  const lang: Lang = location.pathname.startsWith("/en") ? "en" : "fa";
  const t: TranslationSchema = translations[lang];
  const isRtl = t.dir === "rtl";
  const Arrow = isRtl ? ArrowLeft : ArrowRight;

  const m = getSportsMenu();
  const exercises = getExercisesIndex();

  const categories = [...m.categories].sort((a, b) => a.rank - b.rank).slice(0, 8);
  const popular = exercises.filter((e) => e.poster || posterFor(e.media, "male")).slice(0, 6);

  return (
    <section
      id="sports"
      className={`py-24 bg-[#050505] relative overflow-hidden ${isRtl ? "text-right" : "text-left"}`}
      aria-label="Sports and exercise library"
    >
      <div className="absolute top-1/3 right-[10%] w-[500px] h-[500px] rounded-full bg-[#A855F7]/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-[5%] w-[400px] h-[400px] rounded-full bg-[#7C3AED]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-end justify-between gap-6 flex-wrap mb-12">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.02] border border-white/5 text-xs text-[#A855F7] backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-[#A855F7]" />
              <span>{t.homeSports.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              {t.homeSports.title}
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
              {t.homeSports.subtitle}
            </p>
          </div>

          <Link
            to={listHref(lang)}
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#A855F7]/40 bg-[#7C3AED]/10 text-sm font-semibold text-[#C4B5FD] hover:bg-[#7C3AED]/25 hover:text-white transition-all duration-200"
          >
            {t.homeSports.viewAll}
            <Arrow className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Equipment categories */}
        {categories.length > 0 && (
          <>
            <div className="flex items-center gap-3 mb-5">
              <span className="p-1.5 rounded-lg bg-[#7C3AED]/15 border border-[#A855F7]/30 text-[#A855F7]">
                <Dumbbell className="w-4 h-4" />
              </span>
              <h3 className="text-lg font-bold text-white">{t.homeSports.categoriesTitle}</h3>
            </div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } },
              }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5"
            >
              {categories.map((c) => (
                <motion.div
                  key={c.slug.en}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
                  }}
                >
                  <CategoryCard c={c} lang={lang} t={t} />
                </motion.div>
              ))}
            </motion.div>
          </>
        )}

        {/* Popular exercises */}
        {popular.length > 0 && (
          <div className="mt-14">
            <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
              <div className="flex items-center gap-3">
                <span className="p-1.5 rounded-lg bg-[#7C3AED]/15 border border-[#A855F7]/30 text-[#A855F7]">
                  <Play className="w-4 h-4" fill="currentColor" />
                </span>
                <h3 className="text-lg font-bold text-white">{t.homeSports.exercisesTitle}</h3>
              </div>
              <Link
                to={listHref(lang)}
                className="text-xs font-medium text-zinc-400 hover:text-[#A855F7] transition-colors flex items-center gap-1"
              >
                {t.lang === "fa" ? "همه تمرین‌ها" : "All exercises"}
                <Arrow className="w-3.5 h-3.5" />
              </Link>
            </div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } },
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
            >
              {popular.map((ex, i) => (
                <motion.div
                  key={ex.id}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
                  }}
                >
                  <MiniExerciseCard ex={ex} t={t} lang={lang} index={i} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {/* Bottom CTA to the full sports hub */}
        <div className="mt-14 text-center">
          <Link
            to={listHref(lang)}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#A855F7] text-white text-sm font-bold hover:shadow-lg hover:shadow-[#7C3AED]/30 transition-all duration-200"
          >
            <Dumbbell className="w-4 h-4" />
            {t.homeSports.viewAll}
            <Arrow className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default SportsSection;