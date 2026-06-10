import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const locales = ['en', 'fa', 'es', 'fr', 'de', 'ar'] as const
export const defaultLocale = 'en' as const

export type Locale = typeof locales[number]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (!hasLocale) {
    const locale = getLocale(request) || defaultLocale
    const newUrl = new URL(`/${locale}${pathname}`, request.url)
    return NextResponse.redirect(newUrl)
  }
}

function getLocale(request: NextRequest): Locale | null {
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    const languages = acceptLanguage
      .split(',')
      .map((lang) => {
        const [locale, q = 'q=1'] = lang.trim().split(';')
        const quality = parseFloat(q.replace('q=', ''))
        return { locale: locale.toLowerCase().split('-')[0], quality }
      })
      .sort((a, b) => b.quality - a.quality)

    for (const { locale } of languages) {
      if (locales.includes(locale as Locale)) {
        return locale as Locale
      }
    }
  }

  return null
}

export const config = {
  matcher: [
    '/((?!_next|api|favicon.ico|logo.png|robots.txt).*)',
  ],
}
