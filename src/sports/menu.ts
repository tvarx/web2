import generated from "../generated/sports-menu";
import exercisesIndex from "../generated/exercises-index";
import type {
  Bilingual,
  CategoryListItem,
  HreflangMap,
  Lang,
  MenuData,
  MuscleListItem,
  IndexedExercise,
} from "./types";
import { SITE_BASE_URL } from "./env";

let cache: MenuData | null = null;
let exerciseCache: IndexedExercise[] | null = null;

/** Lightweight navigation/menu payload (headers + category/muscle summaries). */
export function getSportsMenu(): MenuData {
  if (!cache) cache = generated as unknown as MenuData;
  return cache;
}

/** Deduplicated list of every exercise known to the sports API (with media). */
export function getExercisesIndex(): IndexedExercise[] {
  if (!exerciseCache) exerciseCache = exercisesIndex as unknown as IndexedExercise[];
  return exerciseCache;
}

/** Unique per-page fa path slug, derived from the menu summaries. */
function buildFaPathMap(): Record<string, string> {
  const m = getSportsMenu();
  const map: Record<string, string> = {};
  const seen = new Set<string>();
  const pages: { slugEn: string; slugFa: string }[] = [
    ...m.categories.map((c) => ({ slugEn: c.slug.en, slugFa: c.slug.fa })),
    ...m.muscles.map((x) => ({ slugEn: x.slug.en, slugFa: x.slug.fa })),
  ];
  for (const p of pages) {
    const chosen = [p.slugFa, p.slugEn].find((s) => !seen.has(s)) ?? p.slugEn;
    seen.add(chosen);
    map[p.slugEn] = chosen;
  }
  return map;
}

export function faPathSlug(enSlug: string): string {
  return buildFaPathMap()[enSlug] ?? enSlug;
}

export function menuCategoryBySlug(slug: string): CategoryListItem | null {
  const m = getSportsMenu();
  return m.categories.find((c) => c.slug.en === slug || c.slug.fa === slug) ?? null;
}

export function menuMuscleBySlug(slug: string): MuscleListItem | null {
  const m = getSportsMenu();
  return m.muscles.find((x) => x.slug.en === slug || x.slug.fa === slug) ?? null;
}

export function detailHrefFromItem(item: CategoryListItem | MuscleListItem, lang: Lang): string {
  const slug = lang === "fa" ? faPathSlug(item.slug.en) : item.slug.en;
  return `/${lang}/sports/${encodeURIComponent(slug)}`;
}

export function listHref(lang: Lang): string {
  return lang === "fa" ? "/sports" : "/en/sports";
}

export function exerciseBasePath(lang: Lang): string {
  return lang === "fa" ? "/sports/exercises" : "/en/sports/exercises";
}

export function exerciseHrefSlugs(slug: { en: string; fa?: string }, lang: Lang): string {
  const s = lang === "fa" ? slug.fa || slug.en : slug.en;
  return `${exerciseBasePath(lang)}/${encodeURIComponent(s)}`;
}

export function exerciseHref(ex: IndexedExercise, lang: Lang): string {
  return exerciseHrefSlugs(ex.slug, lang);
}

/** Categories grouped by header group (for sidebar / mega-menu). */
export function headerGroups(): {
  id: string;
  title: Bilingual<string>;
  categories: CategoryListItem[];
}[] {
  return getSportsMenu().headers.map((h) => ({
    id: h.id,
    title: h.title,
    categories: h.categories,
  }));
}

/** Fallback visual for exercises without media: category → muscle image. */
export function menuExerciseFallbackImage(ex: IndexedExercise): string {
  const m = getSportsMenu();
  for (const c of ex.categories) {
    const item = m.categories.find((x) => x.slug.en === c.en);
    if (item?.image) return item.image;
  }
  for (const mm of ex.muscles) {
    const item = m.muscles.find((x) => x.slug.en === mm.en);
    if (item?.image) return item.image;
  }
  return "";
}

/** SEO for the sports listing page — mirrors what SportsHome renders. */
export function listSeo(lang: Lang): {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  hreflang: HreflangMap;
} {
  const hreflang = {
    en: `${SITE_BASE_URL}/en/sports`,
    fa: `${SITE_BASE_URL}/sports`,
    "x-default": `${SITE_BASE_URL}/en/sports`,
  } as const;
  if (lang === "fa") {
    return {
      title: "ورزش‌ها و تجهیزات بدنسازی | راهنمای کامل تمرینات و عضلات | TvarX",
      description:
        "راهنمای کامل ورزش‌ها، تجهیزات بدنسازی و آناتومی عضلات با فواید، نکات ایمنی و تمرین‌های مرتبط با هر حرکت — لیست دسته‌های ورزشی دوزبانه.",
      keywords: ["بدنسازی", "تجهیزات ورزشی", "تمرینات قدرتی", "آناتومی عضلات", "ورزش"],
      canonical: hreflang.fa,
      hreflang,
    };
  }
  return {
    title: "Sports & Gym Equipment | Complete Exercise & Muscle Guide | TvarX",
    description:
      "A complete bilingual guide to sports equipment and muscle anatomy: benefits, limitations, safety tips, and related exercises for every movement.",
    keywords: ["bodybuilding", "gym equipment", "strength training", "muscle anatomy", "sports"],
    canonical: hreflang.en,
    hreflang,
  };
}