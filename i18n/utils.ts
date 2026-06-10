import { Locale } from './config'
import enTranslations from './translations/en.json'
import faTranslations from './translations/fa.json'
import esTranslations from './translations/es.json'
import frTranslations from './translations/fr.json'
import deTranslations from './translations/de.json'
import arTranslations from './translations/ar.json'

export type { Locale }
export type Translations = typeof enTranslations

const translations: Record<Locale, Translations> = {
  en: enTranslations,
  fa: faTranslations,
  es: esTranslations,
  fr: frTranslations,
  de: deTranslations,
  ar: arTranslations,
}

export function getTranslations(locale: Locale): Translations {
  return translations[locale] || translations.en
}

// Type-safe translation getter
export type TranslationKey = {
  [K in keyof Translations]: Translations[K] extends object
    ? `${K & string}.${NestedKeyOf<Translations[K]>}`
    : K & string
}[keyof Translations]

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`
}[keyof ObjectType & (string | number)]

export function getNestedTranslation(
  obj: any,
  path: string
): string | undefined {
  return path.split('.').reduce((current, key) => current?.[key], obj)
}
