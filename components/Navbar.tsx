'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import LanguageSwitcher from './LanguageSwitcher'
import { useI18n } from '@/i18n/context'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const { t, locale } = useI18n()
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/80 backdrop-blur-md border-b border-primary-purple/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <Image 
              src="/logo.png" 
              alt="TvarX Logo" 
              width={40} 
              height={40}
              className="object-contain"
            />
            <span className="text-2xl font-headline font-bold text-gradient">
              TvarX
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href={`/${locale}#how-it-works`} className="text-light-gray/80 hover:text-primary-purple transition-colors font-body">
              {t.navbar.howItWorks}
            </Link>
            <Link href={`/${locale}#demo`} className="text-light-gray/80 hover:text-primary-purple transition-colors font-body">
              {t.navbar.demo}
            </Link>
            <Link href={`/${locale}/about`} className="text-light-gray/80 hover:text-primary-purple transition-colors font-body">
              {t.common.about}
            </Link>
            <LanguageSwitcher />
            <Link
              href={`/${locale}#demo`}
              className="px-4 py-2 bg-primary-purple text-white rounded-lg font-headline font-semibold hover:bg-primary-purple/90 transition-all"
            >
              {t.navbar.getStarted}
            </Link>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <LanguageSwitcher />
            {/* Mobile menu button */}
            <button 
              className="text-light-gray"
              aria-label="Toggle mobile menu"
              type="button"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

