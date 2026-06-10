'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { locales, localeNames, localeFlags, type Locale } from '@/i18n/config'

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()

  // Get current locale from pathname
  const pathSegments = pathname.split('/').filter(Boolean)
  const currentLocale = (pathSegments.length > 0 && locales.includes(pathSegments[0] as Locale))
    ? (pathSegments[0] as Locale)
    : 'en'

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const switchLanguage = (newLocale: Locale) => {
    setIsOpen(false)
    // Replace the locale in the pathname
    const segments = pathname.split('/').filter(Boolean)
    
    // Remove current locale if it exists
    if (segments.length > 0 && locales.includes(segments[0] as Locale)) {
      segments.shift()
    }
    
    // Add new locale at the beginning
    const newPath = segments.length > 0 
      ? `/${newLocale}/${segments.join('/')}`
      : `/${newLocale}`
    
    router.push(newPath)
    router.refresh()
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-dark-bg border border-primary-purple/30 hover:border-primary-purple transition-colors text-light-gray/80 hover:text-primary-purple"
        aria-label="Change language"
        type="button"
      >
        <span className="text-lg">{localeFlags[currentLocale]}</span>
        <span className="hidden sm:inline font-body text-sm">{localeNames[currentLocale]}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-dark-bg border border-primary-purple/30 rounded-lg shadow-lg z-50 overflow-hidden">
          {locales.map((locale) => (
            <button
              key={locale}
              onClick={() => switchLanguage(locale)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-primary-purple/10 transition-colors ${
                currentLocale === locale
                  ? 'bg-primary-purple/20 text-primary-purple'
                  : 'text-light-gray/80 hover:text-primary-purple'
              }`}
              type="button"
            >
              <span className="text-xl">{localeFlags[locale]}</span>
              <span className="font-body">{localeNames[locale]}</span>
              {currentLocale === locale && (
                <span className="ml-auto text-primary-purple">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
