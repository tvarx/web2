'use client'

import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useI18n } from '@/i18n/context'

export default function Terms() {
  const { t, locale } = useI18n()
  
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-dark-bg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-headline font-bold mb-4 text-gradient">
            {t.terms.title}
          </h1>
          <p className="text-light-gray/70 text-lg mb-8 max-w-2xl mx-auto">
            {t.terms.underConstruction}
          </p>
          <Link
            href={`/${locale}`}
            className="text-primary-purple hover:text-violet-accent font-body transition-colors"
          >
            {t.common.backToHome}
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  )
}

