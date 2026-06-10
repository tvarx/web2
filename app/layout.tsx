import './globals.css'
import { I18nProvider } from '@/i18n/context'
import { defaultLocale } from '@/i18n/config'

// Root layout - locale-specific layout is in [locale]/layout.tsx
// This provides I18nProvider for non-locale pages during static export
// Note: In runtime, middleware redirects non-locale pages to locale versions
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // For non-locale pages, we need HTML structure and I18nProvider
  // For locale pages, the [locale]/layout.tsx will provide HTML structure
  // Next.js will handle the nesting correctly
  return (
    <html lang={defaultLocale} dir="ltr" className="scroll-smooth">
      <body className="font-sans antialiased">
        <I18nProvider locale={defaultLocale}>{children}</I18nProvider>
      </body>
    </html>
  )
}

