import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { motion } from "motion/react";
import {
  Home,
  Layers,
  ChevronRight,
  Dumbbell,
  Activity,
  Flame,
  Tags,
  Languages,
  Zap,
  CornerDownRight,
} from "lucide-react";
import { SeoHead } from "../SeoHead";
import {
  exerciseBySlug,
  exerciseHref,
  relatedForExercise,
  exercisesByCategorySlug,
  buildExerciseSeo,
  exerciseFallbackImage,
  detailHrefFromItem,
  otherLang,
} from "../data";
import { getSportsMenu } from "../menu";
import { useExerciseDetails } from "../details";
import { SITE_BASE_URL, SPORTS_API_BASE } from "../env";
import type { ExerciseMedia, Lang, IndexedExercise } from "../types";
import { translations, TranslationSchema } from "../../i18n/translations";
import { ExerciseVideoTabs, buildVideoViews, posterFor } from "../ExerciseVideoTabs";
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

function exDifficultyText(diff: string | undefined, t: TranslationSchema): string {
  const l = diffLabelLevel(diffLevel(diff));
  return l === "easy" ? t.sports.difficultyEasy : l === "medium" ? t.sports.difficultyMedium : t.sports.difficultyHard;
}

function exDifficultyClasses(diff: string | undefined): string {
  const l = diffLabelLevel(diffLevel(diff));
  return l === "easy"
    ? "text-sky-300 bg-sky-500/10 border-sky-500/25"
    : l === "medium"
    ? "text-amber-300 bg-amber-500/10 border-amber-500/25"
    : "text-emerald-300 bg-emerald-500/10 border-emerald-500/25";
}

type RelatedCardProps = { ex: IndexedExercise; t: TranslationSchema; lang: Lang; key?: React.Key };

/** Render `**bold**` inline as <strong>. */
function bold(s: string): React.ReactNode[] {
  return s.split(/\*\*(.+?)\*\*/g).map((p, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-zinc-100">
        {p}
      </strong>
    ) : (
      p
    )
  );
}

/** Light renderer for the API's markdown-lite description (bullets + bold paragraphs). */
function RichLines({ text }: { text: string }) {
  const lines = String(text ?? "").split(/\r?\n/);
  const out: React.ReactNode[] = [];
  let bullets: React.ReactNode[] = [];
  const flush = () => {
    if (!bullets.length) return;
    out.push(
      <ul key={out.length} className="space-y-2.5 list-disc list-inside">
        {bullets}
      </ul>
    );
    bullets = [];
  };
  lines.forEach((raw, i) => {
    const line = raw.trim();
    if (!line) return;
    if (/^[-•*]\s+/.test(line)) {
      bullets.push(
        <li key={i} className="text-sm leading-relaxed text-zinc-300" dir="auto">
          {bold(line.replace(/^[-•*]\s+/, ""))}
        </li>
      );
    } else {
      flush();
      out.push(
        <p key={`p${i}`} className="text-sm leading-relaxed text-zinc-300" dir="auto">
          {bold(line)}
        </p>
      );
    }
  });
  flush();
  return <>{out}</>;
}

function RelatedExerciseCard({ ex, t, lang }: RelatedCardProps) {
  const views = buildVideoViews(ex.media);
  return (
    <Link
      to={exerciseHref(ex, lang)}
      className="group block rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-[#A855F7]/50 hover:bg-white/[0.04] transition-all duration-200"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-black">
        <img
          src={posterFor(ex.media, "male") || ex.poster || exerciseFallbackImage(ex) || "/logo.png"}
          alt={ex.name[lang]}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-300"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-2 left-2 flex items-center gap-1.5">
          <span
            className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border backdrop-blur-sm ${exDifficultyClasses(ex.difficulty)}`}
          >
            {exDifficultyText(ex.difficulty, t)}
          </span>
          {views.length > 0 ? (
            <span className="px-1.5 py-0.5 rounded-md bg-black/50 backdrop-blur-sm border border-white/10 text-[9px] font-medium text-zinc-300 flex items-center gap-0.5">
              <Zap className="w-3 h-3 text-[#A855F7]" />
              {views.length}
            </span>
          ) : null}
        </div>
      </div>
      <div className="px-3 py-2.5 border-t border-white/5 flex items-center justify-between gap-2">
        <h4 className="text-[13px] font-semibold text-white leading-snug line-clamp-1" dir="auto">
          {ex.name[lang]}
        </h4>
        <CornerDownRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-[#A855F7] shrink-0 transition-colors" />
      </div>
    </Link>
  );
}

export function ExercisePage() {
  const location = useLocation();
  const { slug } = useParams<{ slug: string }>();
  const lang: Lang = location.pathname.startsWith("/en/") ? "en" : "fa";
  const t: TranslationSchema = translations[lang];
  const isRtl = t.dir === "rtl";
  const ex = slug ? exerciseBySlug(slug) : null;
  const details = useExerciseDetails(ex?.id ?? "");
  const [remoteMedia, setRemoteMedia] = useState<ExerciseMedia | null>(null);

  // The catalogue is prerendered at build time and the API refuses browser
  // CORS requests, so the shipped media is the source of truth. Only when the
  // prerendered record ships without any media at all, try a direct API fetch
  // as a last resort (it may still fail cross-origin, keeping the fallback).
  useEffect(() => {
    if (!ex?.id) {
      setRemoteMedia(null);
      return;
    }
    if (ex.media && Object.keys(ex.media).length > 0) {
      setRemoteMedia(null);
      return;
    }

    const controller = new AbortController();
    fetch(`${SPORTS_API_BASE}/sports/exercises/${encodeURIComponent(ex.id)}`, {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error(`Exercise media request failed: ${response.status}`);
        return response.json() as Promise<{ media?: ExerciseMedia | null }>;
      })
      .then((payload) => {
        if (payload.media) setRemoteMedia(payload.media);
      })
      .catch(() => {
        // Keep the prerendered media as a graceful offline fallback.
      });

    return () => controller.abort();
  }, [ex?.id]);

  if (!ex) {
    return (
      <div className="pt-40 pb-24 text-center">
        <h1 className="text-2xl font-bold text-white">404 — Not Found</h1>
        <Link to={lang === "fa" ? "/sports" : "/en/sports"} className="text-[#A855F7] mt-4 inline-block hover:underline">
          {t.sports.backToList}
        </Link>
      </div>
    );
  }

  const seo = buildExerciseSeo(ex, lang);
  const name = lang === "fa" ? ex.name.fa || ex.name.en : ex.name.en;
  const media = remoteMedia ?? ex.media;
  const views = buildVideoViews(media);
  const poster = posterFor(media, "male") || ex.poster || exerciseFallbackImage(ex);
  const menu = getSportsMenu();
  const catItems = ex.categories
    .map((c) => menu.categories.find((x) => x.slug.en === c.en))
    .filter((c): c is NonNullable<typeof c> => !!c);
  const muscleItems = ex.muscles
    .map((m) => menu.muscles.find((x) => x.slug.en === m.en))
    .filter((m): m is NonNullable<typeof m> => !!m);
  const related = relatedForExercise(ex, 9);
  const sameCategory = catItems[0] ? exercisesByCategorySlug(catItems[0].slug.en).slice(0, 4) : [];
  const homeHref = lang === "fa" ? "/fa" : "/en";
  const listHrefValue = lang === "fa" ? "/sports" : "/en/sports";
  const steps = details?.correct_steps?.[lang] ?? details?.correct_steps?.[lang === "fa" ? "en" : "fa"] ?? [];
  const descText = details?.description?.[lang] ?? details?.description?.[lang === "fa" ? "en" : "fa"] ?? "";
  const extra = details?.extra
    ? (Object.keys(details.extra).filter((k) => details.extra![k] != null) as (keyof typeof details.extra)[])
    : [];

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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-6 flex-wrap" aria-label="Breadcrumb">
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
            {catItems[0] && (
              <>
                <Link
                  to={detailHrefFromItem(catItems[0], lang)}
                  className="hover:text-[#A855F7] transition-colors truncate max-w-[25vw]"
                  dir="auto"
                >
                  {catItems[0].name[lang]}
                </Link>
                <ChevronRight className={`w-3.5 h-3.5 ${isRtl ? "-scale-x-100" : ""}`} />
              </>
            )}
            <span className="text-zinc-300 truncate max-w-[30vw]" dir="auto">
              {name}
            </span>
          </nav>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: "easeOut" }} className="mb-8">
            <div className="flex items-start gap-4 flex-wrap">
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-display" dir="auto">
                  {name}
                </h1>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#C4B5FD] bg-[#7C3AED]/10 border border-[#A855F7]/30 rounded-full px-3 py-1">
                    {t.lang === "fa" ? "تمرین" : "Exercise"}
                  </span>
                  <span className={`text-[11px] font-semibold rounded-full px-2.5 py-1 border ${exDifficultyClasses(ex.difficulty)}`}>
                    {exDifficultyText(ex.difficulty, t)}
                  </span>
                  {ex.need_warmup ? (
                    <span className="text-[11px] font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/25 rounded-full px-2.5 py-1 flex items-center gap-1">
                      <Flame className="w-3 h-3" />
                      {t.sports.needsWarmup}
                    </span>
                  ) : null}
                  {ex.equipment_needed != null && (
                    <span className="text-[11px] font-semibold text-zinc-300 bg-white/5 border border-white/10 rounded-full px-2.5 py-1 flex items-center gap-1">
                      <Dumbbell className="w-3 h-3" />
                      {ex.equipment_needed ? t.sports.equipmentNeeded : t.sports.equipmentNotNeeded}
                    </span>
                  )}
                  <span className="text-[11px] font-semibold text-zinc-300 bg-white/5 border border-white/10 rounded-full px-2.5 py-1 flex items-center gap-1">
                    <Activity className="w-3 h-3 text-[#A855F7]" />
                    {views.length} {t.lang === "fa" ? "ویدیو" : "videos"}
                  </span>
                </div>
                {(catItems.length > 0 || muscleItems.length > 0) && (
                  <p className="mt-3 text-sm text-zinc-400 leading-relaxed max-w-2xl" dir="auto">
                    {catItems.length > 0
                      ? `${
                          t.lang === "fa" ? "دسته" : "Category"
                        }: ${catItems.map((c) => c.name[lang]).join("، ")}${muscleItems.length ? " — " : ""}`
                      : ""}
                    {muscleItems.length > 0
                      ? `${t.lang === "fa" ? "عضلات هدف" : "Target muscles"}: ${muscleItems
                          .map((m) => m.name[lang])
                          .join("، ")}`
                      : ""}
                  </p>
                )}
              </div>
              <Link
                to={exerciseHref(ex, otherLang(lang))}
                className="flex items-center gap-2 bg-white/[0.03] border border-white/10 hover:border-[#A855F7]/40 rounded-xl px-4 py-2 text-xs text-zinc-300 hover:text-white transition-all"
              >
                <Languages className="w-4 h-4 text-[#A855F7]" />
                {t.sports.seeAltLang}
              </Link>
            </div>
          </motion.div>

          <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-8 items-start">
            {/* Main: video guide */}
            <div className="min-w-0">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-1 h-6 rounded-full bg-gradient-to-b from-[#7C3AED] to-[#A855F7]" />
                <h2 className="text-lg font-bold text-white font-display">{t.lang === "fa" ? "راهنمای ویدیویی" : "Video Guide"}</h2>
              </div>
              <ExerciseVideoTabs name={ex.name} media={media} lang={lang} />
            </div>

            {/* Aside: details */}
            <aside className="mt-8 lg:mt-0">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 space-y-5">
                {muscleItems.length > 0 && (
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                      {t.sports.filterMuscles}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {muscleItems.map((m) => (
                        <Link
                          key={m.slug.en}
                          to={detailHrefFromItem(m, lang)}
                          className="text-xs text-zinc-300 bg-white/[0.03] border border-white/10 rounded-full px-3 py-1.5 hover:border-[#A855F7]/40 hover:text-white transition-colors"
                        >
                          {m.name[lang]}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                {(ex.tags ?? []).length > 0 && (
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                      {t.sports.tagsLabel}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(ex.tags ?? []).slice(0, 14).map((tag, i) => (
                        <span key={i} className="text-[11px] text-zinc-500 bg-white/[0.03] border border-white/10 rounded-full px-2.5 py-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <Link
                  to={listHrefValue}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#A855F7]/40 bg-[#7C3AED]/15 text-sm font-medium text-[#C4B5FD] hover:bg-[#7C3AED]/25 transition-colors"
                >
                  <Dumbbell className="w-4 h-4" />
                  {t.lang === "fa" ? "مرور همه تمرین‌ها" : "Browse all exercises"}
                </Link>
              </div>
            </aside>
          </div>

          {/* How-to steps */}
          {steps.length > 0 && (
            <section className="mt-12">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-1 h-6 rounded-full bg-gradient-to-b from-[#7C3AED] to-[#A855F7]" />
                <h2 className="text-lg font-bold text-white font-display">
                  {t.lang === "fa" ? "مراحل اجرا" : "How to Do It"}
                </h2>
              </div>
              <ol className="space-y-3">
                {steps.map((step, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm leading-relaxed text-zinc-300 bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3"
                  >
                    <span className="w-6 h-6 shrink-0 rounded-full bg-[#7C3AED]/15 border border-[#A855F7]/30 text-[#C4B5FD] text-xs font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <span className="min-w-0" dir="auto">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* Detailed description */}
          {descText && (
            <section className="mt-12">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-1 h-6 rounded-full bg-gradient-to-b from-[#7C3AED] to-[#A855F7]" />
                <h2 className="text-lg font-bold text-white font-display">
                  {t.lang === "fa" ? "راهنمای کامل حرکت" : "Exercise Guide"}
                </h2>
              </div>
              <div className="text-sm leading-relaxed text-zinc-300 space-y-3 bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-5">
                <RichLines text={descText} />
              </div>
            </section>
          )}

          {/* Admin extra data */}
          {details?.extra && extra.length > 0 && (
            <section className="mt-12">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-1 h-6 rounded-full bg-gradient-to-b from-[#7C3AED] to-[#A855F7]" />
                <h2 className="text-lg font-bold text-white font-display">
                  {t.lang === "fa" ? "جزئیات تمرین" : "Workout Details"}
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {details?.extra?.reps != null && (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-center">
                    <p className="text-2xl font-bold text-white">{details?.extra?.reps}</p>
                    <p className="text-xs text-zinc-500 mt-1">{t.lang === "fa" ? "تکرار" : "Reps"}</p>
                  </div>
                )}
                {details?.extra?.sets != null && (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-center">
                    <p className="text-2xl font-bold text-white">{details?.extra?.sets}</p>
                    <p className="text-xs text-zinc-500 mt-1">{t.lang === "fa" ? "ست" : "Sets"}</p>
                  </div>
                )}
                {(() => {
                  const tips = details?.extra?.safety_tips as { en?: string[]; fa?: string[] } | string[] | undefined;
                  if (!tips) return null;
                  const list = Array.isArray(tips) ? tips : tips[lang] ?? tips.en ?? [];
                  if (!list.length) return null;
                  return (
                    <div className="rounded-2xl border border-amber-500/25 bg-amber-500/5 p-4 col-span-2 sm:col-span-1">
                      <p className="text-xs font-semibold text-amber-300 mb-2">
                        {t.lang === "fa" ? "نکات ایمنی" : "Safety Tips"}
                      </p>
                      <ul className="space-y-1">
                        {list.map((tip, i) => (
                          <li key={i} className="text-xs text-zinc-300 leading-relaxed" dir="auto">
                            • {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })()}
              </div>
            </section>
          )}

          {/* Same category strip */}
          {sameCategory.length > 0 && (
            <section className="mt-12">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <span className="w-1 h-6 rounded-full bg-gradient-to-b from-[#7C3AED] to-[#A855F7]" />
                  <h2 className="text-lg font-bold text-white font-display" dir="auto">
                    {t.lang === "fa" ? `بیشتر از «${catItems[0]!.name[lang]}»` : `More from ${catItems[0]!.name[lang]}`}
                  </h2>
                </div>
                <Link to={detailHrefFromItem(catItems[0]!, lang)} className="text-xs text-[#A855F7] hover:underline shrink-0">
                  {t.lang === "fa" ? "مشاهده همه" : "View all"}
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {sameCategory.map((e) => (
                  <RelatedExerciseCard key={e.id} ex={e} t={t} lang={lang} />
                ))}
              </div>
            </section>
          )}

          {/* Related exercises */}
          {related.length > 0 && (
            <section className="mt-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-1 h-6 rounded-full bg-gradient-to-b from-[#7C3AED] to-[#A855F7]" />
                <h2 className="text-lg font-bold text-white font-display">{t.sports.relatedExercises}</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {related.map((e) => (
                  <RelatedExerciseCard key={e.id} ex={e} t={t} lang={lang} />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* App install CTA with 6-day free trial */}
        <div className="mt-16">
          <CTA />
        </div>
      </div>
    </div>
  );
}

export default ExercisePage;