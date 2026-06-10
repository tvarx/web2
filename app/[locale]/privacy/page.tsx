'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useI18n } from '@/i18n/context'

export default function Privacy() {
  const { t, locale } = useI18n()

  return (
    <main className="relative min-h-screen">
      <Navbar />
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-purple rounded-full opacity-10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-accent rounded-full opacity-10 blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-headline font-bold mb-6">
                {t.privacy.title.replace('Policy', '').trim()} <span className="text-gradient">Policy</span>
              </h1>
              <p className="text-xl sm:text-2xl text-light-gray/80 font-body mb-4">
                {t.privacy.lastUpdated}
              </p>
              <p className="text-lg text-light-gray/70 font-body max-w-3xl mx-auto">
                {t.privacy.intro}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-dark-bg border border-primary-purple/30 rounded-2xl p-8 sm:p-12">
                <p className="text-lg text-light-gray/90 font-body leading-relaxed">
                  Your privacy and trust are extremely important to us. This Privacy Policy explains how we collect, use, store, and protect your personal data.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Back to Home */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Link
              href={`/${locale}`}
              className="text-primary-purple hover:text-violet-accent font-body transition-colors"
            >
              {t.common.backToHome}
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}

