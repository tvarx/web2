import type { Metadata } from 'next'
import '../globals.css'
import { I18nProvider } from '@/i18n/context'
import { Locale, locales, defaultLocale } from '@/i18n/config'
import { getTranslations } from '@/i18n/utils'

// Enable static generation for all locales
export const dynamicParams = true

// Generate static params for all locales for static export
export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = getTranslations(locale)

  const localeMap: Record<Locale, string> = {
    en: 'en_US',
    fa: 'fa_IR',
    es: 'es_ES',
    fr: 'fr_FR',
    de: 'de_DE',
    ar: 'ar_SA',
  }

  return {
    title: 'TvarX — The Intelligence of Movement',
    description: t.hero.description,
    keywords: ['fitness', 'AI training', 'personalized workout', 'exercise plan', 'fitness app'],
    authors: [{ name: 'TvarX' }],
    creator: 'TvarX',
    publisher: 'TvarX',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://tvarx.com'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'fa': '/fa',
        'es': '/es',
        'fr': '/fr',
        'de': '/de',
        'ar': '/ar',
      },
    },
    openGraph: {
      type: 'website',
      locale: localeMap[locale] || 'en_US',
      url: `/${locale}`,
      siteName: 'TvarX',
      title: 'TvarX — The Intelligence of Movement',
      description: t.hero.description,
      images: [
        {
          url: '/logo.png',
          width: 1200,
          height: 630,
          alt: 'TvarX Logo',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'TvarX — The Intelligence of Movement',
      description: t.hero.description,
      images: ['/logo.png'],
      creator: '@tvarx',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {},
    icons: {
      icon: '/logo.png',
      shortcut: '/logo.png',
      apple: '/logo.png',
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dir = locale === 'ar' || locale === 'fa' ? 'rtl' : 'ltr'

  return (
    <html lang={locale} dir={dir} className="scroll-smooth">
      <body className="font-sans antialiased">
        <I18nProvider locale={locale}>{children}</I18nProvider>
      </body>
    </html>
  )
}
