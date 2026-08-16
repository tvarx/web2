import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Dumbbell,
  Activity,
  ChevronRight,
  Home,
  Layers,
  Check,
  ShieldAlert,
  AlertTriangle,
  Tags,
  ChevronDown,
  Flame,
  HelpCircle,
  Languages,
  Play,
  Zap,
  CornerDownLeft,
} from "lucide-react";
import { SeoHead } from "../SeoHead";
import {
  buildSeo,
  faqList,
  detailHref,
  otherLang,
  isCategory,
  resolveDetailPath,
  getSportsData,
  headerGroups,
  detailHrefFromItem,
  exerciseHref,
  exerciseHrefSlugs,
  relatedToIndexed,
  exerciseFallbackImage,
} from "../data";
import { SITE_BASE_URL } from "../env";
import type { Lang, RelatedExercise } from "../types";
import { translations, TranslationSchema } from "../../i18n/translations";
import { buildVideoViews, posterFor } from "../ExerciseVideoTabs";
import { CTA } from "../../components/CTA";

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

function difficultyBadge(d: number, t: TranslationSchema) {
  const label = d >= 70 ? t.sports.difficultyHard : d >= 40 ? t.sports.difficultyMedium : t.sports.difficultyEasy;
  const color =
    d >= 70
      ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
      : d >= 40
        ? "text-amber-400 bg-amber-500/10 border-amber-500/20"
        : "text-sky-400 bg-sky-500/10 border-sky-500/20";
  return { label, color };
}

function exDifficulty(ex: RelatedExercise, t: TranslationSchema): string {
  const l = diffLabelLevel(diffLevel(ex.difficulty));
  return l === "easy" ? t.sports.difficultyEasy : l === "medium" ? t.sports.difficultyMedium : t.sports.difficultyHard;
}

function exDifficultyClasses(ex: RelatedExercise): string {
  const l = diffLabelLevel(diffLevel(ex.difficulty));
  return l === "easy"
    ? "text-sky-300 bg-sky-500/10 border-sky-500/25"
    : l === "medium"
    ? "text-amber-300 bg-amber-500/10 border-amber-500/25"
    : "text-emerald-300 bg-emerald-500/10 border-emerald-500/25";
}

function SectionTitle({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="w-1 h-7 rounded-full bg-gradient-to-b from-[#7C3AED] to-[#A855F7]" />
      <h2 className="text-xl font-bold text-white font-display flex items-center gap-2.5">
        {icon}
        {children}
      </h2>
    </div>
  );
}

function Checklist({ items, tone }: { items: string[]; tone: "ok" | "warn" | "danger" }) {
  const styles = {
    ok: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    warn: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    danger: "text-rose-400 bg-rose-500/10 border-rose-500/20",
  } as const;
  const icons = {
    ok: <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />,
    warn: <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />,
    danger: <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />,
  } as const;
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-3 text-sm leading-relaxed text-zinc-300 bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3"
        >
          <span className={`p-1 rounded-lg border ${styles[tone]}`}>{icons[tone]}</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function FaqAccordion({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  if (!faqs.length) return null;
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <motion.div key={i} className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 cursor-pointer group"
            >
              <span
                className={`text-sm font-semibold ${isOpen ? "text-[#C4B5FD]" : "text-zinc-200"} group-hover:text-[#C4B5FD] transition-colors`}
              >
                {faq.question}
              </span>
              <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="w-4 h-4 text-[#A855F7]" />
              </motion.span>
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="px-5 pb-5 text-sm leading-relaxed text-zinc-400">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

function SidebarMenu({ lang, t }: { lang: Lang; t: TranslationSchema }) {
  const isRtl = t.dir === "rtl";
  const data = getSportsData();
  const location = useLocation();
  const groups = headerGroups();
  return (
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
            {g.categories.map((c) => {
              const href = detailHrefFromItem(c, lang);
              const active = location.pathname === href;
              return (
                <div
                  key={c.slug.en}
                  className={`flex items-center rounded-lg border transition-colors ${
                    active ? "bg-[#7C3AED]/15 border-[#A855F7]/40" : "border-transparent hover:bg-white/5"
                  }`}
                >
                  <Link
                    to={href}
                    className={`flex-1 min-w-0 flex items-center justify-between gap-2 px-3 py-1.5 text-[13px] ${
                      active ? "text-white" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    <span className="truncate" dir="auto">
                      {c.name[lang]}
                    </span>
                    <span className={`text-[10px] shrink-0 ${active ? "text-[#C4B5FD]" : "text-zinc-600"}`}>
                      {c.exercise_count}
                    </span>
                  </Link>
                  <Link
                    to={`${lang === "fa" ? "/" : "/en/"}sports`}
                    className={`p-1.5 text-zinc-600 hover:text-[#A855F7] transition-colors ${isRtl ? "ml-1" : "mr-1"}`}
                    aria-label={t.sports.filterCategories}
                  >
                    <CornerDownLeft className={`w-3.5 h-3.5 ${isRtl ? "-scale-x-100" : ""}`} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mt-5 mb-2 px-3">
        {t.sports.filterMuscles}
      </p>
      <div className="space-y-0.5">
        {data.muscles.map((m) => {
          const href = detailHrefFromItem(m, lang);
          const active = location.pathname === href;
          return (
            <div
              key={m.slug.en}
              className={`flex items-center rounded-lg border transition-colors ${
                active ? "bg-[#7C3AED]/15 border-[#A855F7]/40" : "border-transparent hover:bg-white/5"
              }`}
            >
              <Link
                to={href}
                className={`flex-1 min-w-0 flex items-center justify-between gap-2 px-3 py-1.5 text-[13px] ${
                  active ? "text-white" : "text-zinc-400 hover:text-white"
                }`}
              >
                <span className="truncate" dir="auto">
                  {m.name[lang]}
                </span>
                <span className={`text-[10px] shrink-0 ${active ? "text-[#C4B5FD]" : "text-zinc-600"}`}>
                  {m.exercise_count}
                </span>
              </Link>
              <Link
                to={`${lang === "fa" ? "/" : "/en/"}sports`}
                className={`p-1.5 text-zinc-600 hover:text-[#A855F7] transition-colors ${isRtl ? "ml-1" : "mr-1"}`}
                aria-label={t.sports.filterMuscles}
              >
                <CornerDownLeft className={`w-3.5 h-3.5 ${isRtl ? "-scale-x-100" : ""}`} />
              </Link>
            </div>
          );
        })}
      </div>
    </nav>
  );
}

function ExerciseLibrary({ exercises, t, lang }: { exercises: RelatedExercise[]; t: TranslationSchema; lang: Lang }) {
  const [gender, setGender] = useState<"male" | "female">("male");
  const isRtl = t.dir === "rtl";

  if (!exercises?.length) return null;

  return (
    <section className="mt-14">
      <div className="flex items-center justify-between gap-4 flex-wrap mb-5">
        <SectionTitle icon={<Dumbbell className="w-5 h-5 text-[#A855F7]" />}>
          {t.sports.relatedExercises}
          <span className="text-xs font-normal text-zinc-500">({exercises.length})</span>
        </SectionTitle>
        <div className="flex items-center rounded-xl border border-white/10 bg-white/[0.02] p-1">
          {(["male", "female"] as const).map((g) => (
            <button
              key={g}
              onClick={() => setGender(g)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                gender === g ? "bg-[#7C3AED] text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              {g === "male" ? t.sports.male : t.sports.female}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {exercises.map((ex) => {
          const views = buildVideoViews(ex.media);
          const poster = posterFor(ex.media, gender) || "";
          const name = ex.name?.[lang] ?? "";
          const indexed = relatedToIndexed(ex);
          const href = ex.slug ? exerciseHrefSlugs(ex.slug, lang) : indexed ? exerciseHref(indexed, lang) : null;
          return (
            <Link
              key={ex.id ?? ex.content_id}
              to={href ?? "#"}
              onClick={href ? undefined : (e) => e.preventDefault()}
              className="group text-start rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-[#A855F7]/50 hover:bg-white/[0.04] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A855F7]/60"
              aria-label={`${name} — ${exDifficulty(ex, t)}`}
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-black">
                {poster ? (
                  <img
                    src={poster}
                    alt={name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#7C3AED]/20 via-zinc-900 to-zinc-950">
                    <Dumbbell className="w-8 h-8 text-[#A855F7]/40" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div
                  className={`absolute top-2 ${isRtl ? "right-2" : "left-2"} px-2 py-0.5 rounded-md text-[10px] font-semibold border backdrop-blur-sm ${exDifficultyClasses(ex)}`}
                >
                  {exDifficulty(ex, t)}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-200 scale-75 group-hover:scale-100">
                    <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                  </span>
                </div>
                {views.length > 0 ? (
                  <div
                    className={`absolute bottom-2 ${isRtl ? "left-2" : "right-2"} px-1.5 py-0.5 rounded bg-black/50 backdrop-blur-sm border border-white/10 text-[9px] font-medium text-zinc-300 flex items-center gap-1`}
                  >
                    <Zap className="w-3 h-3 text-[#A855F7]" />
                    {views.length} {t.lang === "fa" ? "ویدیو" : "videos"}
                  </div>
                ) : null}
                {ex.need_warmup ? (
                  <div
                    className={`absolute bottom-2 ${isRtl ? "right-2" : "left-2"} px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-amber-500/30 text-[9px] font-medium text-amber-300 flex items-center gap-1`}
                  >
                    <Flame className="w-3 h-3" />
                    {t.sports.needsWarmup}
                  </div>
                ) : null}
              </div>
              <div className="px-3 py-2.5 border-t border-white/5">
                <h3 className="text-[13px] font-semibold text-white leading-snug line-clamp-2" dir="auto">
                  {name}
                </h3>
                {ex.tags?.length ? (
                  <p className="mt-1 text-[11px] text-zinc-500 truncate" dir="auto">
                    {ex.tags.slice(0, 3).join(" · ")}
                  </p>
                ) : null}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export function SportsDetail() {
  const location = useLocation();
  const lang: Lang = location.pathname.startsWith("/en/") ? "en" : "fa";
  const t: TranslationSchema = translations[lang];
  const isRtl = t.dir === "rtl";
  const resolved = resolveDetailPath(location.pathname);

  if (!resolved) {
    return (
      <div className="pt-40 pb-24 text-center">
        <h1 className="text-2xl font-bold text-white">404 — Not Found</h1>
        <Link to={lang === "fa" ? "/sports" : "/en/sports"} className="text-[#A855F7] mt-4 inline-block hover:underline">
          {t.sports.backToList}
        </Link>
      </div>
    );
  }

  const { detail } = resolved;
  const seo = buildSeo(detail, lang);
  const name = detail.name[lang];
  const faqs = faqList(detail, lang);
  const isCat = isCategory(detail);
  const altHref = detailHref(detail, otherLang(lang));
  const listHrefValue = lang === "fa" ? "/sports" : "/en/sports";
  const difficulty = resolved.item?.degree_of_difficulty ?? 0;
  const exerciseCount = resolved.item?.exercise_count ?? detail.related_exercises?.length ?? 0;
  const diff = difficultyBadge(difficulty, t);
  const homeHref = lang === "fa" ? "/fa" : "/en";

  return (
    <div className="relative">
      <SeoHead
        lang={lang}
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={`${SITE_BASE_URL}${location.pathname}`}
        hreflang={seo.hreflang}
        ogTitle={seo.ogTitle}
        ogDescription={seo.ogDescription}
        ogImage={seo.ogImage}
        ogType={seo.ogType}
        ogUrl={seo.ogUrl}
        jsonLd={seo.jsonLd}
      />

      <div className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-8" aria-label="Breadcrumb">
            <Link to={homeHref} className="flex items-center gap-1.5 hover:text-[#A855F7] transition-colors">
              <Home className="w-3.5 h-3.5" />
              {t.sports.breadcrumbHome}
            </Link>
            <ChevronRight className={`w-3.5 h-3.5 ${isRtl ? "-scale-x-100" : ""}`} />
            <Link to={listHrefValue} className="flex items-center gap-1.5 hover:text-[#A855F7] transition-colors">
              <Layers className="w-3.5 h-3.5" />
              {t.sports.breadcrumbSports}
            </Link>
            <ChevronRight className={`w-3.5 h-3.5 ${isRtl ? "-scale-x-100" : ""}`} />
            <span className="text-zinc-300 truncate max-w-[40vw]">{name}</span>
          </nav>

          <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-8 items-start">
            {/* Sidebar menu */}
            <aside className="hidden lg:block lg:sticky lg:top-28 mb-8 lg:mb-0">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 max-h-[calc(100vh-140px)] overflow-y-auto">
                <SidebarMenu lang={lang} t={t} />
              </div>
            </aside>

            <div className="min-w-0">
              {/* Hero */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="mb-12"
              >
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                  <div className="w-full md:w-80 shrink-0 rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] aspect-[16/10] md:aspect-auto md:h-56">
                    {detail.image ? (
                      <img
                        src={detail.image}
                        alt={name}
                        fetchPriority="high"
                        decoding="async"
                        className="w-full h-full object-cover"
                        onError={(e) => (e.currentTarget.style.display = "none")}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#7C3AED]/30 to-[#A855F7]/20 flex items-center justify-center">
                        <Dumbbell className="w-16 h-16 text-[#A855F7]/50" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#C4B5FD] bg-[#7C3AED]/10 border border-[#A855F7]/30 rounded-full px-3 py-1">
                        {isCat ? t.sports.groupsTitle : t.sports.musclesTitle}
                      </span>
                      <span className={`text-[11px] font-semibold rounded-full px-2.5 py-1 border ${diff.color}`}>{diff.label}</span>
                      {isCat && (
                        <span className="text-[11px] font-semibold text-zinc-300 bg-white/5 border border-white/10 rounded-full px-2.5 py-1 flex items-center gap-1">
                          <Dumbbell className="w-3 h-3" />
                          {detail.equipment_needed ? t.sports.equipmentNeeded : t.sports.equipmentNotNeeded}
                        </span>
                      )}
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display mb-3" dir="auto">
                      {name}
                    </h1>
                    <p className="text-zinc-400 leading-relaxed text-sm sm:text-base max-w-2xl">
                      {isCat ? detail.content.description_short[lang] : detail.content.description[lang]}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 mt-5 text-sm text-zinc-400">
                      <span className="flex items-center gap-2 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2">
                        <Activity className="w-4 h-4 text-[#A855F7]" />
                        {exerciseCount} {t.sports.exercises}
                      </span>
                      <Link
                        to={altHref}
                        className="flex items-center gap-2 bg-white/[0.03] border border-white/10 hover:border-[#A855F7]/40 rounded-xl px-4 py-2 text-zinc-300 hover:text-white transition-all"
                      >
                        <Languages className="w-4 h-4 text-[#A855F7]" />
                        {t.sports.seeAltLang}
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Main content */}
              <div className="space-y-10">
                <section>
                  <SectionTitle icon={<Activity className="w-5 h-5 text-[#A855F7]" />}>{t.sports.anatomyDesc}</SectionTitle>
                  <div className="text-sm leading-relaxed text-zinc-300 whitespace-pre-line bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-5">
                    {isCat ? detail.content.description_detailed[lang] : detail.content.description[lang]}
                  </div>
                </section>

                {isCat ? (
                  <>
                    <section>
                      <SectionTitle icon={<Check className="w-5 h-5 text-emerald-400" />}>{t.sports.benefits}</SectionTitle>
                      <Checklist items={detail.content.benefits?.[lang] ?? []} tone="ok" />
                    </section>
                    <section>
                      <SectionTitle icon={<AlertTriangle className="w-5 h-5 text-amber-400" />}>{t.sports.limitations}</SectionTitle>
                      <Checklist items={detail.content.limitations?.[lang] ?? []} tone="warn" />
                    </section>
                    <section>
                      <SectionTitle icon={<ShieldAlert className="w-5 h-5 text-rose-400" />}>{t.sports.safetyTips}</SectionTitle>
                      <Checklist items={detail.content.safety_tips?.[lang] ?? []} tone="danger" />
                    </section>
                    {(detail.content.tags?.[lang] ?? []).length > 0 && (
                      <section>
                        <SectionTitle icon={<Tags className="w-5 h-5 text-[#A855F7]" />}>{t.sports.tagsLabel}</SectionTitle>
                        <div className="flex flex-wrap gap-2">
                          {detail.content.tags[lang].map((tag, i) => (
                            <span key={i} className="text-xs text-zinc-300 bg-white/[0.03] border border-white/10 rounded-full px-3 py-1.5">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </section>
                    )}
                  </>
                ) : (
                  <section className="rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden">
                    <div className="px-6 py-5 border-b border-white/5 flex items-center gap-3">
                      <span className="w-1 h-6 rounded-full bg-gradient-to-b from-[#7C3AED] to-[#A855F7]" />
                      <h2 className="text-lg font-bold text-white font-display">{t.sports.anatomyTitle}</h2>
                    </div>
                    <dl className="divide-y divide-white/5">
                      {(
                        [
                          ["function", t.sports.anatomyFunction],
                          ["location", t.sports.anatomyLocation],
                          ["origin", t.sports.anatomyOrigin],
                          ["insertion", t.sports.anatomyInsertion],
                          ["blood_supply", t.sports.anatomyBlood],
                          ["daily_life_usage", t.sports.anatomyDaily],
                        ] as const
                      ).map(([key, label]) => {
                        const value = (detail.content as unknown as Record<string, { [k in Lang]: string } | undefined>)[key]?.[lang];
                        if (!value) return null;
                        return (
                          <div key={key} className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 sm:gap-6 px-6 py-4">
                            <dt className="text-sm font-semibold text-[#C4B5FD]">{label}</dt>
                            <dd className="text-sm leading-relaxed text-zinc-300">{value}</dd>
                          </div>
                        );
                      })}
                      {(detail.content.antagonist_muscles?.[lang] ?? []).length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 sm:gap-6 px-6 py-4">
                          <dt className="text-sm font-semibold text-[#C4B5FD]">{t.sports.anatomyAntagonist}</dt>
                          <dd className="flex flex-wrap gap-2">
                            {detail.content.antagonist_muscles[lang].map((m, i) => (
                              <span key={i} className="text-xs text-zinc-300 bg-white/[0.03] border border-white/10 rounded-full px-3 py-1.5">
                                {m}
                              </span>
                            ))}
                          </dd>
                        </div>
                      )}
                      {(detail.content.synergist_muscles?.[lang] ?? []).length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 sm:gap-6 px-6 py-4">
                          <dt className="text-sm font-semibold text-[#C4B5FD]">{t.sports.anatomySynergist}</dt>
                          <dd className="flex flex-wrap gap-2">
                            {detail.content.synergist_muscles![lang].map((m, i) => (
                              <span key={i} className="text-xs text-zinc-300 bg-white/[0.03] border border-white/10 rounded-full px-3 py-1.5">
                                {m}
                              </span>
                            ))}
                          </dd>
                        </div>
                      )}
                    </dl>
                  </section>
                )}

                <section>
                  <SectionTitle icon={<HelpCircle className="w-5 h-5 text-[#A855F7]" />}>{t.sports.faq}</SectionTitle>
                  <FaqAccordion faqs={faqs} />
                </section>

                <ExerciseLibrary exercises={detail.related_exercises} t={t} lang={lang} />
              </div>
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

export default SportsDetail;