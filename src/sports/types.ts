export type Lang = "fa" | "en";

export interface Bilingual<T> {
  en: T;
  fa: T;
}

export interface Slug extends Bilingual<string> {}

export interface HreflangMap {
  en: string;
  fa: string;
  "x-default": string;
}

export interface SportsSeoBlock {
  meta_title: string;
  meta_description: string;
  keywords: string[];
  og_title: string;
  og_description: string;
  og_image: string;
  og_type: string;
  canonical_url: string;
  hreflang: HreflangMap;
}

export type JsonLdItem = {
  "@context"?: string;
  "@type": string;
  [key: string]: unknown;
};

export interface CategoryListItem {
  type: "category";
  slug: Slug;
  name: Bilingual<string>;
  image: string;
  rank: number;
  exercise_count: number;
  degree_of_difficulty: number;
  /** Present on /sports/categories items; absent on grouped header items. */
  equipment_needed?: boolean;
  meta_title: Bilingual<string>;
  meta_description: Bilingual<string>;
  canonical_url: Bilingual<string>;
}

export interface MuscleListItem {
  type: "muscle";
  slug: Slug;
  name: Bilingual<string>;
  image: string;
  rank: number;
  exercise_count: number;
  degree_of_difficulty: number;
  meta_title: Bilingual<string>;
  meta_description: Bilingual<string>;
  canonical_url: Bilingual<string>;
}

export interface MediaVariant {
  image: string;
  video: string;
}

export interface ExerciseMediaView {
  front?: MediaVariant;
  side?: MediaVariant;
}

export interface ExerciseMedia {
  male?: ExerciseMediaView;
  female?: ExerciseMediaView;
}

export interface RelatedExercise {
  id: string;
  content_id?: string;
  slug?: Slug;
  name: Bilingual<string>;
  difficulty: string;
  need_warmup: boolean;
  tags?: string[];
  media?: ExerciseMedia;
  description?: Bilingual<string> | null;
  correct_steps?: Bilingual<string[]> | null;
  equipment_needed?: boolean | null;
  category?: string | null;
}

export interface ExerciseExtra {
  reps?: number;
  sets?: number;
  [key: string]: unknown;
}

export interface IndexedExercise {
  id: string;
  content_id?: string;
  slug: Slug;
  name: Bilingual<string>;
  difficulty?: string;
  need_warmup?: boolean;
  tags?: string[];
  media?: ExerciseMedia | null;
  poster: string;
  categories: Slug[];
  muscles: Slug[];
  equipment_needed?: boolean | null;
}

/** Heavy rich text kept out of the index; loaded lazily on the exercise page. */
export interface ExerciseDetails {
  description?: Bilingual<string> | null;
  correct_steps?: Bilingual<string[]> | null;
  extra?: ExerciseExtra | null;
}

export interface CategoryContent {
  description_short: Bilingual<string>;
  description_detailed: Bilingual<string>;
  benefits: Bilingual<string[]>;
  limitations: Bilingual<string[]>;
  safety_tips: Bilingual<string[]>;
  tags: Bilingual<string[]>;
}

export interface CategoryDetail {
  type: "category";
  slug: Slug;
  name: Bilingual<string>;
  image: string;
  rank: number;
  exercise_count: number;
  degree_of_difficulty: number;
  equipment_needed: boolean;
  content: CategoryContent;
  seo: Bilingual<SportsSeoBlock>;
  json_ld: Bilingual<JsonLdItem[]>;
  related_exercises: RelatedExercise[];
}

export interface MuscleContent {
  description: Bilingual<string>;
  function: Bilingual<string>;
  location: Bilingual<string>;
  origin: Bilingual<string>;
  insertion: Bilingual<string>;
  blood_supply: Bilingual<string>;
  daily_life_usage: Bilingual<string>;
  antagonist_muscles: Bilingual<string[]>;
  synergist_muscles?: Bilingual<string[]>;
}

export interface MuscleDetail {
  type: "muscle";
  slug: Slug;
  name: Bilingual<string>;
  image: string;
  index: number;
  content: MuscleContent;
  seo: Bilingual<SportsSeoBlock>;
  json_ld: Bilingual<JsonLdItem[]>;
  related_exercises: RelatedExercise[];
}

export interface HeaderGroup {
  id: string;
  title: Bilingual<string>;
  categories: CategoryListItem[];
}

export interface SportsData {
  fetched_at: string;
  source: string;
  headers: HeaderGroup[];
  categories: CategoryListItem[];
  category_details: Record<string, CategoryDetail>;
  muscles: MuscleListItem[];
  muscle_details: Record<string, MuscleDetail>;
  exercises_total?: number;
}

/** Slim navigation/menu payload (no exercise data, no detail pages). */
export interface MenuData {
  fetched_at: string;
  source: string;
  headers: {
    id: string;
    title: Bilingual<string>;
    categories: CategoryListItem[];
  }[];
  categories: CategoryListItem[];
  muscles: MuscleListItem[];
}

export type SportsKind = "category" | "muscle";

export type DetailUnion = CategoryDetail | MuscleDetail;

export interface ResolvedSportsPage {
  kind: SportsKind;
  lang: Lang;
  detail: DetailUnion;
  item: CategoryListItem | MuscleListItem | null;
}