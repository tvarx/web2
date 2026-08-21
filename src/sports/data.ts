import generated from "../generated/sports-data";
import { API_DEFAULT_HOST, SITE_BASE_URL } from "./env";
import { getExerciseDetails } from "./details";
import {
  faPathSlug,
  detailHrefFromItem,
  listHref,
  listSeo,
  headerGroups,
  exerciseHref,
  exerciseHrefSlugs,
  exerciseBasePath,
  getExercisesIndex,
  menuExerciseFallbackImage as exerciseFallbackImage,
} from "./menu";
import type {
  Bilingual,
  CategoryDetail,
  CategoryListItem,
  DetailUnion,
  HreflangMap,
  IndexedExercise,
  JsonLdItem,
  Lang,
  MuscleDetail,
  MuscleListItem,
  RelatedExercise,
  ResolvedSportsPage,
  SportsData,
  SportsKind,
} from "./types";

export {
  faPathSlug,
  detailHrefFromItem,
  listHref,
  listSeo,
  headerGroups,
  exerciseFallbackImage,
  exerciseHref,
  exerciseHrefSlugs,
  exerciseBasePath,
  getExercisesIndex,
};

let cache: SportsData | null = null;

const enOf = (lang: Lang): Lang => (lang === "fa" ? "en" : "fa");

/** Lightweight markdown strip for API content (**bold**, bullets, links). */
function stripMd(s: string): string {
  return String(s ?? "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/[*_`~]/g, "")
    .trim();
}

export function getSportsData(): SportsData {
  if (!cache) cache = generated as unknown as SportsData;
  return cache;
}

/** Deduplicated list of every exercise known to the sports API (with media). */
export function apiUrl(url: string): string {
  if (url.startsWith(API_DEFAULT_HOST)) {
    return SITE_BASE_URL + url.slice(API_DEFAULT_HOST.length);
  }
  return url;
}

export function categoryBySlug(slug: string): CategoryListItem | null {
  const d = getSportsData();
  return d.categories.find((c) => c.slug.en === slug || c.slug.fa === slug) ?? null;
}

export function muscleBySlug(slug: string): MuscleListItem | null {
  const d = getSportsData();
  return d.muscles.find((m) => m.slug.en === slug || m.slug.fa === slug) ?? null;
}

export function detailBySlug(slug: string): DetailUnion | null {
  const d = getSportsData();
  const category = d.category_details[slug.toLowerCase()];
  if (category) return category;
  const muscle = d.muscle_details[slug.toLowerCase()];
  if (muscle) return muscle;
  for (const c of d.categories) {
    if (c.slug.fa === slug || faPathSlug(c.slug.en) === slug) return d.category_details[c.slug.en] ?? null;
  }
  for (const m of d.muscles) {
    if (m.slug.fa === slug || faPathSlug(m.slug.en) === slug) return d.muscle_details[m.slug.en] ?? null;
  }
  return null;
}

export function isCategory(detail: DetailUnion): detail is CategoryDetail {
  return detail.type === "category";
}

export function kindFromDetail(detail: DetailUnion): SportsKind {
  return detail.type;
}

/** Local site href (already URL-encoded) for a detail page in the given language. */
export function detailHref(detail: DetailUnion, lang: Lang): string {
  const slug = lang === "fa" ? faPathSlug(detail.slug.en) : detail.slug.en;
  return `/${lang}/sports/${encodeURIComponent(slug)}`;
}

/** Rewrite the API's canonical/hreflang URLs onto this site's domain. */
export function siteSeoUrls(detail: DetailUnion) {
  return {
    en: detail.seo.en.canonical_url,
    fa: detail.seo.fa.canonical_url,
    "x-default": detail.seo.en.hreflang["x-default"],
  };
}

export function buildHreflang(detail: DetailUnion): HreflangMap {
  const urls = siteSeoUrls(detail);
  return {
    en: apiUrl(urls.en),
    fa: apiUrl(urls.fa),
    "x-default": apiUrl(urls["x-default"]),
  };
}

export interface SportsSeo {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  hreflang: HreflangMap;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogType: string;
  ogUrl: string;
  jsonLd: JsonLdItem[];
}

/** Full SEO payload for a detail page in the given language. */
export function buildSeo(detail: DetailUnion, lang: Lang): SportsSeo {
  const seo = detail.seo[lang];
  const hreflang = buildHreflang(detail);
  return {
    title: seo.meta_title,
    description: seo.meta_description,
    keywords: Array.isArray(seo.keywords) ? seo.keywords : [],
    canonical: hreflang[lang],
    hreflang,
    ogTitle: seo.og_title || seo.meta_title,
    ogDescription: seo.og_description || seo.meta_description,
    ogImage: seo.og_image || detail.image,
    ogType: seo.og_type || "article",
    ogUrl: hreflang[lang],
    jsonLd: Array.isArray(detail.json_ld?.[lang]) ? detail.json_ld[lang] : [],
  };
}

/** FAQ list (Question/Answer pairs) extracted from the FAQPage JSON-LD. */
export function faqList(detail: DetailUnion, lang: Lang): { question: string; answer: string }[] {
  const items = detail.json_ld?.[lang] ?? [];
  const faq = items.find((item) => item["@type"] === "FAQPage");
  const entries = faq?.mainEntity;
  if (!Array.isArray(entries)) return [];
  return entries
    .filter((e) => e && e["@type"] === "Question")
    .map((e) => ({
      question:
        typeof e.name === "string" ? e.name : (e as { name?: string }).name ?? "",
      answer:
        typeof e.acceptedAnswer === "object" &&
        e.acceptedAnswer &&
        typeof (e.acceptedAnswer as { text?: string }).text === "string"
          ? ((e.acceptedAnswer as { text: string }).text as string)
          : "",
    }))
    .filter((f) => f.question || f.answer);
}

export interface DetailRoute {
  kind: SportsKind;
  href: string;
  fsPath: string;
}

/** Every detail route (per language), for prerendering and sitemaps. */
export function allDetailRoutes(): DetailRoute[] {
  const d = getSportsData();
  const routes: DetailRoute[] = [];
  const push = (kind: SportsKind, slugEn: string, slugFa: string) => {
    for (const lang of ["fa", "en"] as Lang[]) {
      const slug = lang === "fa" ? faPathSlug(slugEn) : slugEn;
      routes.push({
        kind,
        href: `/${lang}/sports/${encodeURIComponent(slug)}`,
        fsPath: `${lang === "fa" ? "fa" : "en"}/sports/${slug
          .replace(/[/\\]/g, "-")
          .replace(/\s+/g, " ")}/index.html`,
      });
    }
  };
  d.categories.forEach((c) => push("category", c.slug.en, c.slug.fa));
  d.muscles.forEach((m) => push("muscle", m.slug.en, m.slug.fa));
  return routes;
}

/**
 * Resolve a site pathname to a sports detail page. Returns null for
 * non-sports paths. Assumes `lang` is derived from the path prefix.
 */
export function resolveDetailPath(pathname: string): ResolvedSportsPage | null {
  let lang: Lang = "fa";
  let rest = pathname;
  if (pathname.startsWith("/en/")) {
    lang = "en";
    rest = "/" + pathname.slice(4);
  } else if (pathname.startsWith("/fa/")) {
    rest = "/" + pathname.slice(4);
  }
  if (!rest.startsWith("/sports/") || rest === "/sports/") return null;
  const rawSlug = decodeURIComponent(rest.slice("/sports/".length)).replace(/\/+$/, "");
  const detail = detailBySlug(rawSlug);
  if (!detail) return null;
  const item = isCategory(detail) ? findCategoryItem(detail) : findMuscleItem(detail);
  return { kind: detail.type, lang, detail, item };
}

function findCategoryItem(detail: CategoryDetail): CategoryListItem | null {
  return getSportsData().categories.find((c) => c.slug.en === detail.slug.en) ?? null;
}

function findMuscleItem(detail: MuscleDetail): MuscleListItem | null {
  return getSportsData().muscles.find((m) => m.slug.en === detail.slug.en) ?? null;
}

export function isSportsListPath(pathname: string): boolean {
  return pathname === "/sports" || pathname === "/en/sports";
}

export function listLang(pathname: string): Lang {
  return pathname.startsWith("/en/") ? "en" : "fa";
}

export function otherLang(lang: Lang): Lang {
  return lang === "fa" ? "en" : "fa";
}

export function exercisesByCategorySlug(enSlug: string): IndexedExercise[] {
  return getExercisesIndex().filter((e) => e.categories.some((c) => c.en === enSlug));
}

export function exercisesByMuscleSlug(enSlug: string): IndexedExercise[] {
  return getExercisesIndex().filter((e) => e.muscles.some((m) => m.en === enSlug));
}

export function exerciseBySlug(slug: string): IndexedExercise | null {
  const s = decodeURIComponent(slug || "").toLowerCase().trim();
  if (!s) return null;
  return getExercisesIndex().find((e) => e.slug.en === s || e.slug.fa === s) ?? null;
}

/** Map a RelatedExercise (sports-data) to its indexed entry (which carries full data). */
export function relatedToIndexed(ex: RelatedExercise): IndexedExercise | null {
  const all = getExercisesIndex();
  return (
    all.find((e) => e.id === ex.id) ??
    (ex.content_id ? all.find((e) => e.content_id === ex.content_id) : null) ??
    null
  );
}

/** Fallback visual for exercises without media: category image lookup (menu). */

export function relatedForExercise(ex: IndexedExercise, limit = 9): IndexedExercise[] {
  const all = getExercisesIndex();
  const catSlugs = new Set(ex.categories.map((c) => c.en));
  const muscleSlugs = new Set(ex.muscles.map((m) => m.en));
  const out: IndexedExercise[] = [];
  for (const e of all) {
    if (e.id === ex.id) continue;
    const sharedCat = e.categories.some((c) => catSlugs.has(c.en));
    const sharedMuscle = e.muscles.some((m) => muscleSlugs.has(m.en));
    if (sharedCat || sharedMuscle) out.push(e);
    if (out.length >= limit) break;
  }
  return out;
}

/** Full SEO payload for a dedicated exercise page in the given language. */
export function buildExerciseSeo(ex: IndexedExercise, lang: Lang): SportsSeo {
  const d = getSportsData();
  const catItem = ex.categories[0]
    ? d.categories.find((c) => c.slug.en === ex.categories[0].en)
    : null;
  const muscleItems = ex.muscles
    .map((m) => d.muscles.find((x) => x.slug.en === m.en))
    .filter((m): m is MuscleListItem => !!m);
  const catName = catItem ? catItem.name[lang] : "";
  const muscleNames = muscleItems.map((m) => m.name[lang]);
  const name = lang === "fa" ? ex.name.fa || ex.name.en : ex.name.en;
  const diff = difficultyText(ex.difficulty ?? "");
  const poster = ex.poster || exerciseFallbackImage(ex);
  const canonical = `${SITE_BASE_URL}${exerciseHref(ex, lang)}`;
  const hreflang: HreflangMap = {
    en: `${SITE_BASE_URL}/en/sports/exercises/${encodeURIComponent(ex.slug.en)}`,
    fa: `${SITE_BASE_URL}/sports/exercises/${encodeURIComponent(ex.slug.fa || ex.slug.en)}`,
    "x-default": `${SITE_BASE_URL}/en/sports/exercises/${encodeURIComponent(ex.slug.en)}`,
  };

  const faDescription = `آموزش تصویری حرکت «${name}»${catName ? ` در دسته ${catName}` : ""}${
    muscleNames.length ? ` — عضلات هدف: ${muscleNames.join("، ")}` : ""
  } با ویدیوهای باکیفیت از نمای روبرو و کناری (مرد و زن). سطح ${diff}${
    ex.need_warmup ? "، نیازمند گرم‌کردن" : ""
  } در اپلیکیشن TvarX.`;
  const enDescription = `Step-by-step video guide for "${name}"${catName ? ` in the ${catName} category` : ""}${
    muscleNames.length ? ` — target muscles: ${muscleNames.join(", ")}` : ""
  } with high-quality front & side view videos (male & female). Difficulty: ${diff}${
    ex.need_warmup ? ", warm-up required" : ""
  } — in the TvarX app.`;
  const description = lang === "fa" ? faDescription : enDescription;
  const title =
    lang === "fa"
      ? `${name} | ${catName || "تمرین"} | آموزش تصویری و ویدیو | TvarX`
      : `${name} | ${catName || "Exercise"} | Video Guide & Demo | TvarX`;
  const keywords = [name, catName, ...muscleNames, "exercise video", "بدنسازی", "آموزش تمرین"];

  const firstVideo = ex.media?.male?.front?.video || ex.media?.male?.side?.video;
  const jsonLd: JsonLdItem[] = [];
  if (firstVideo) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: ex.name.en,
      description: enDescription,
      thumbnailUrl: poster || `${SITE_BASE_URL}/logo.png`,
      contentUrl: firstVideo,
      uploadDate: (d.fetched_at || "").slice(0, 10) + "T00:00:00Z",
      inLanguage: lang === "fa" ? "fa" : "en",
      publisher: { "@type": "Organization", name: "TvarX" },
    });
  }

  const rich = getExerciseDetails(ex.id);
  const plainDesc = stripMd(rich?.description?.[lang] ?? rich?.description?.[enOf(lang)] ?? "");
  const steps = rich?.correct_steps?.[lang] ?? rich?.correct_steps?.[enOf(lang)] ?? [];
  if (plainDesc || steps.length) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: lang === "fa" ? `آموزش حرکت ${ex.name.fa || ex.name.en}` : `How to Do ${ex.name.en}: Complete Exercise Guide`,
      description: plainDesc || description,
      image: poster || `${SITE_BASE_URL}/logo.png`,
      mainEntityOfPage: canonical,
      inLanguage: lang,
      publisher: { "@type": "Organization", name: "TvarX" },
    });
    const faqs: JsonLdItem[] = [];
    const pushQ = (q: string, a: string) => {
      if (!a) return;
      faqs.push({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      });
    };
    pushQ(
      lang === "fa" ? `${ex.name.fa || ex.name.en} چطور انجام می‌شود؟` : `How to do ${ex.name.en}?`,
      plainDesc
    );
    pushQ(
      lang === "fa" ? "مراحل اجرای صحیح چیست؟" : `What are the steps of ${ex.name.en}?`,
      steps.map((s, i) => `${i + 1}. ${s}`).join(" ")
    );
    pushQ(
      lang === "fa" ? "سطح سختی این حرکت چقدر است؟" : `What difficulty level is ${ex.name.en}?`,
      diff
    );
    pushQ(lang === "fa" ? "چرا باید این حرکت را انجام دهم؟" : `What are the benefits of using ${ex.name.en}?`, `${
        lang === "fa" ? `تقویت و رشد عضلات${muscleNames.length ? ` ${muscleNames.join("، ")}` : ""} با اجرای صحیح ${ex.name.fa || ex.name.en}.` : `Builds strength and muscle in${muscleNames.length ? ` ${muscleNames.join(", ")}` : ""} with proper ${ex.name.en} execution.`
      }`);
    pushQ(
      lang === "fa" ? "چطور این حرکت را ایمن انجام دهم؟" : `How can I do ${ex.name.en} exercises safely?`,
      lang === "fa"
        ? `همیشه گرم‌کردن را انجام بده و فرم صحیح را حفظ کن${ex.need_warmup ? "؛ این حرکت نیازمند گرم‌کردن است" : ""}.`
        : `Always warm up and maintain proper form${ex.need_warmup ? "; this movement requires a warm-up" : ""}.`
    );
    if (faqs.length) {
      jsonLd.push({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs });
    }
  }

  jsonLd.push({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: lang === "fa" ? "خانه" : "Home", item: lang === "fa" ? `${SITE_BASE_URL}/fa` : SITE_BASE_URL },
      { "@type": "ListItem", position: 2, name: lang === "fa" ? "ورزش" : "Sports", item: `${SITE_BASE_URL}/en/sports` },
      { "@type": "ListItem", position: 3, name: ex.name.en, item: canonical },
    ],
  });

  return {
    title,
    description,
    keywords,
    canonical: canonical,
    hreflang,
    ogTitle: name,
    ogDescription: description,
    ogImage: poster || `${SITE_BASE_URL}/logo.png`,
    ogType: "video.other",
    ogUrl: canonical,
    jsonLd,
  };
}

function difficultyText(diff: string): string {
  const base = diff.toLowerCase();
  if (base === "advanced") return "Advanced / پیشرفته";
  if (base === "intermediate") return "Intermediate / متوسط";
  return "Beginner / ساده";
}

export function categoryExerciseCount(enSlug: string): number {
  return exercisesByCategorySlug(enSlug).length;
}

export function muscleExerciseCount(enSlug: string): number {
  return exercisesByMuscleSlug(enSlug).length;
}