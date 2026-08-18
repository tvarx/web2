import React, { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Dumbbell, Play, SlidersHorizontal, X, ChevronDown, Zap, CornerDownLeft, CornerDownRight } from "lucide-react";
import { SeoHead } from "../SeoHead";
import {
  getSportsMenu,
  getExercisesIndex,
  menuCategoryBySlug,
  menuMuscleBySlug,
  detailHrefFromItem,
  listSeo,
  headerGroups,
  menuExerciseFallbackImage,
  exerciseHref,
} from "../menu";
import { SITE_BASE_URL } from "../env";
import type { Lang, IndexedExercise } from "../types";
import { translations, TranslationSchema } from "../../i18n/translations";
import { buildVideoViews, posterFor } from "../ExerciseVideoTabs";
import { CTA } from "../../components/CTA";

const PAGE_SIZE = 60;

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
  return l === "easy" ? t.sports.difficultyEasy : l === "medium" ? t.sports.difficultyMedium : t.sports.difficultyHard;
}

function difficultyClasses(level: number): string {
  const l = diffLabelLevel(level);
  return l === "easy"
    ? "text-sky-300 bg-sky-500/10 border-sky-500/25"
    : l === "medium"
    ? "text-amber-300 bg-amber-500/10 border-amber-500/25"
    : "text-emerald-300 bg-emerald-500/10 border-emerald-500/25";
}

interface FilterState {
  category: string | null;
  muscle: string | null;
  level: number | null;
  query: string;
  gender: "male" | "female";
}

function matches(ex: IndexedExercise, f: FilterState): boolean {
  if (f.category && !ex.categories.some((c) => c.en === f.category)) return false;
  if (f.muscle && !ex.muscles.some((m) => m.en === f.muscle)) return false;
  if (f.level !== null && diffLevel(ex.difficulty) !== f.level) return false;
  if (f.query) {
    const q = f.query.toLowerCase();
    const hay = `${ex.name.en} ${ex.name.fa} ${(ex.tags ?? []).join(" ")}`.toLowerCase();
    if (!hay.includes(q)) return false;
  }
  return true;
}

function ExerciseCard({
  ex,
  gender,
  t,
  href,
  index,
}: {
  ex: IndexedExercise;
  gender: "male" | "female";
  t: TranslationSchema;
  href: string;
  index: number;
  key?: React.Key;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const poster = posterFor(ex.media, gender) || ex.poster || menuExerciseFallbackImage(ex);
  const level = diffLevel(ex.difficulty);
  const name = t.lang === "fa" ? ex.name.fa : ex.name.en;
  const views = buildVideoViews(ex.media);
  const catLabel =
    (t.lang === "fa" ? ex.categories[0]?.fa : ex.categories[0]?.en) ||
    (t.lang === "fa" ? ex.muscles[0]?.fa : ex.muscles[0]?.en) ||
    "";

  return (
    <Link
      to={href}
      className="group block rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-[#A855F7]/50 hover:bg-white/[0.04] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A855F7]/60"
      aria-label={`${name} — ${difficultyText(ex.difficulty, t)}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-black">
        {poster && !imgFailed ? (
          <img
            src={poster}
            alt={name}
            loading={index < 6 ? "eager" : "lazy"}
            fetchPriority={index < 6 ? "high" : "auto"}
            decoding="async"
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-300 media-crop-bottom"
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
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="w-14 h-14 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-200 scale-75 group-hover:scale-100">
            <Play className="w-6 h-6 ml-0.5" fill="currentColor" />
          </span>
        </div>
        {views.length > 0 ? (
          <div
            className={`absolute bottom-2.5 ${t.lang === "fa" ? "left-2.5" : "right-2.5"} px-2 py-1 rounded bg-black/50 backdrop-blur-sm border border-white/10 text-[10px] font-medium text-zinc-300 flex items-center gap-1.5`}
          >
            <Zap className="w-3.5 h-3.5 text-[#A855F7]" />
            {views.length} {t.lang === "fa" ? "ویدیو" : "videos"}
          </div>
        ) : null}
      </div>
      <div className="px-4 py-3 border-t border-white/5">
        <h3 className="text-[15px] font-semibold text-white leading-snug line-clamp-2" dir="auto">
          {name}
        </h3>
        <div className="mt-2 flex items-center justify-between gap-2">
          {catLabel ? (
            <span className="text-xs text-zinc-500 truncate" dir="auto">
              {catLabel}
            </span>
          ) : (
            <span />
          )}
          <CornerDownRight className="w-4 h-4 text-zinc-700 group-hover:text-[#A855F7] shrink-0 transition-colors" />
        </div>
      </div>
    </Link>
  );
}

function SidebarLink({
  active,
  onClick,
  label,
  count,
  href,
  isRtl,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
  href: string;
  isRtl: boolean;
  key?: React.Key;
}) {
  return (
    <div
      className={`flex items-center rounded-lg transition-colors border ${
        active
          ? "bg-[#7C3AED]/15 border-[#A855F7]/40"
          : "border-transparent hover:bg-white/5"
      }`}
    >
      <button
        onClick={onClick}
        className={`flex-1 min-w-0 flex items-center justify-between gap-2 px-3 py-1.5 text-[13px] ${
          active ? "text-white" : "text-zinc-400 hover:text-white"
        }`}
      >
        <span className="truncate" dir="auto">
          {label}
        </span>
        <span className={`text-[10px] shrink-0 ${active ? "text-[#C4B5FD]" : "text-zinc-600"}`}>{count}</span>
      </button>
      <Link
        to={href}
        title={label}
        className={`p-1.5 text-zinc-600 hover:text-[#A855F7] transition-colors ${isRtl ? "ml-1" : "mr-1"}`}
        aria-label={label}
      >
        <CornerDownLeft className={`w-3.5 h-3.5 ${isRtl ? "-scale-x-100" : ""}`} />
      </Link>
    </div>
  );
}

export function SportsHome() {
  const location = useLocation();
  const lang: Lang = location.pathname.startsWith("/en/") ? "en" : "fa";
  const t: TranslationSchema = translations[lang];
  const isRtl = t.dir === "rtl";
  const menu = getSportsMenu();
  const exercises = getExercisesIndex();

  const [filter, setFilter] = useState<FilterState>({
    category: null,
    muscle: null,
    level: null,
    query: "",
    gender: "male",
  });
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const set = (patch: Partial<FilterState>) => {
    setFilter((f) => ({ ...f, ...patch }));
    setVisible(PAGE_SIZE);
    setFiltersOpen(false);
  };

  const filtered = useMemo(() => {
    return exercises.filter((e) => matches(e, filter));
  }, [exercises, filter]);

  const visibleList = filtered.slice(0, visible);
  const totalWithMedia = exercises.filter((e) => buildVideoViews(e.media).length > 0).length;

  const seo = listSeo(lang);
  const canonical = seo.canonical;
  const hreflang = seo.hreflang;
  const groups = headerGroups();

  const activeCat = filter.category ? menuCategoryBySlug(filter.category) : null;
  const activeMuscle = filter.muscle ? menuMuscleBySlug(filter.muscle) : null;

  return (
    <div className="relative">
      <SeoHead
        lang={lang}
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={canonical}
        hreflang={hreflang}
        ogType="website"
        ogUrl={canonical}
        ogImage={`${SITE_BASE_URL}/logo.png`}
      />

      <div className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Compact page header */}
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <span className="p-1.5 rounded-lg bg-[#7C3AED]/15 border border-[#A855F7]/30 text-[#A855F7]">
                <Dumbbell className="w-4 h-4" />
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-white font-display">{t.sports.title}</h1>
            </div>
            <p className="mt-2 text-sm text-zinc-400 max-w-2xl leading-relaxed">{t.sports.subtitle}</p>
          </div>

          {/* Toolbar */}
          <div className="mb-6 flex flex-col lg:flex-row lg:items-center gap-3">
            <div className="relative flex-1 max-w-xl">
              <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 ${isRtl ? "right-3" : "left-3"}`} />
              <input
                type="search"
                value={filter.query}
                onChange={(e) => set({ query: e.target.value })}
                placeholder={t.sports.searchExercises}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#A855F7]/50 transition-colors"
              />
              {filter.query ? (
                <button
                  onClick={() => set({ query: "" })}
                  className={`absolute top-1/2 -translate-y-1/2 ${isRtl ? "left-3" : "right-3"} text-zinc-500 hover:text-white`}
                  aria-label={t.sports.close}
                >
                  <X className="w-4 h-4" />
                </button>
              ) : null}
            </div>

            {/* Difficulty chips */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => set({ level: null })}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  filter.level === null
                    ? "border-[#A855F7]/50 bg-[#7C3AED]/15 text-white"
                    : "border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white"
                }`}
              >
                {t.sports.allItems}
              </button>
              {([0, 1, 2, 3] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => set({ level: filter.level === lvl ? null : lvl })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${difficultyClasses(lvl)} ${
                    filter.level === lvl ? "ring-1 ring-current opacity-100" : "border-white/10 bg-white/[0.02] opacity-70 hover:opacity-100"
                  }`}
                >
                  {difficultyText(DIFF_LEVELS[lvl], t)}
                </button>
              ))}
            </div>

            {/* Gender toggle */}
            <div className="flex items-center rounded-xl border border-white/10 bg-white/[0.02] p-1 w-fit">
              {(["male", "female"] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => set({ gender: g })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    filter.gender === g ? "bg-[#7C3AED] text-white" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {g === "male" ? t.sports.male : t.sports.female}
                </button>
              ))}
            </div>

            <span className="text-xs text-zinc-500">
              {filtered.length} {t.sports.exercisesCount} · {totalWithMedia} {t.lang === "fa" ? "با ویدیو" : "with video"}
            </span>
          </div>

          {/* Mobile filter toggle */}
          <button
            onClick={() => setFiltersOpen((v) => !v)}
            className="lg:hidden w-full mb-4 flex items-center justify-between px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.02] text-sm text-zinc-300"
            aria-expanded={filtersOpen}
          >
            <span className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#A855F7]" />
              {t.lang === "fa" ? "فیلترها" : "Filters"}
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform ${filtersOpen ? "rotate-180" : ""}`} />
          </button>

          <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-8 items-start">
            {/* Sidebar menu */}
            <aside className={`${filtersOpen ? "block" : "hidden"} lg:block lg:sticky lg:top-28 mb-6 lg:mb-0`}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 max-h-[70vh] overflow-y-auto lg:max-h-[calc(100vh-140px)]">
                <nav aria-label={t.lang === "fa" ? "فهرست دسته‌بندی‌ها" : "Category menu"}>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mb-2 px-3">
                    {t.sports.filterCategories}
                  </p>
                  {groups.map((g) => (
                    <div key={g.id} className="mb-1">
                      <p className="text-[11px] text-zinc-600 px-3 py-1" dir="auto">
                        {lang === "fa" ? g.title.fa : g.title.en}
                      </p>
                      <div className="space-y-0.5">
                        {g.categories.map((c) => (
                          <SidebarLink
                            key={c.slug.en}
                            active={filter.category === c.slug.en && !filter.muscle}
                            onClick={() => set({ category: filter.category === c.slug.en ? null : c.slug.en, muscle: null })}
                            label={c.name[lang]}
                            count={c.exercise_count}
                            href={detailHrefFromItem(c, lang)}
                            isRtl={isRtl}
                          />
                        ))}
                      </div>
                    </div>
                  ))}

                  <p className={`text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mt-5 mb-2 px-3 ${t.lang === "fa" ? "text-right" : ""}`}>
                    {t.sports.filterMuscles}
                  </p>
                  <div className="space-y-0.5">
                    {menu.muscles.map((m) => (
                      <SidebarLink
                        key={m.slug.en}
                        active={filter.muscle === m.slug.en && !filter.category}
                        onClick={() => set({ muscle: filter.muscle === m.slug.en ? null : m.slug.en, category: null })}
                        label={m.name[lang]}
                        count={m.exercise_count}
                        href={detailHrefFromItem(m, lang)}
                        isRtl={isRtl}
                      />
                    ))}
                  </div>
                </nav>
              </div>
            </aside>

            {/* Results */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-zinc-300" dir="auto">
                  {activeCat ? activeCat.name[lang] : activeMuscle ? activeMuscle.name[lang] : t.lang === "fa" ? "همه تمرین‌ها" : "All exercises"}
                </h2>
                <div className="flex items-center gap-3">
                  {activeCat || activeMuscle ? (
                    <Link
                      to={activeCat ? detailHrefFromItem(activeCat, lang) : activeMuscle ? detailHrefFromItem(activeMuscle, lang) : ""}
                      className="text-xs text-zinc-400 hover:text-[#A855F7] transition-colors"
                    >
                      {t.lang === "fa" ? "صفحه کامل ←" : "Full page →"}
                    </Link>
                  ) : null}
                  {(filter.category || filter.muscle) && (
                    <button
                      onClick={() => set({ category: null, muscle: null })}
                      className="text-xs text-[#A855F7] hover:underline"
                    >
                      {t.lang === "fa" ? "پاک‌کردن فیلتر" : "Clear filter"}
                    </button>
                  )}
                </div>
              </div>

              {filtered.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/10 py-20 text-center text-zinc-500 text-sm">
                  {t.sports.noResults}
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
                    {visibleList.map((ex, i) => (
                      <ExerciseCard
                        key={ex.id}
                        ex={ex}
                        gender={filter.gender}
                        t={t}
                        href={exerciseHref(ex, lang)}
                        index={i}
                      />
                    ))}
                  </div>
                  {filtered.length > visible ? (
                    <div className="mt-8 text-center">
                      <button
                        onClick={() => setVisible((v) => v + PAGE_SIZE)}
                        className="px-6 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-sm font-medium text-zinc-300 hover:border-[#A855F7]/40 hover:text-white transition-colors"
                      >
                        {t.lang === "fa" ? "نمایش بیشتر" : "Show more"} ({filtered.length - visible})
                      </button>
                    </div>
                  ) : null}
                </>
              )}
            </div>
          </div>
        </div>

        {/* App install CTA with free trial */}
        <div className="mt-8">
          <CTA />
        </div>
      </div>
    </div>
  );
}

export default SportsHome;