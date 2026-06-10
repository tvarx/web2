'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useI18n } from '@/i18n/context'

export default function Hero() {
  const { t, locale } = useI18n()
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-headline font-bold mb-6"
          >
            <span className="text-gradient">{t.hero.title}</span>
            <br />
            <span className="text-light-gray">{t.hero.subtitle}</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl sm:text-2xl text-light-gray/80 mb-12 font-body max-w-3xl mx-auto"
          >
            {t.hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href={`/${locale}#demo`}
              className="px-8 py-4 bg-primary-purple text-white rounded-lg font-headline font-semibold text-lg hover:bg-primary-purple/90 transition-all duration-300 glow-purple hover:scale-105"
            >
              {t.hero.getMyPlan}
            </Link>
            <Link
              href={`/${locale}#how-it-works`}
              className="px-8 py-4 border-2 border-primary-purple text-primary-purple rounded-lg font-headline font-semibold text-lg hover:bg-primary-purple/10 transition-all duration-300 hover:scale-105"
            >
              {t.hero.watchDemo}
            </Link>
          </motion.div>
        </div>

        {/* Animated athlete silhouette */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-20 flex justify-center"
        >
          <div className="relative w-64 h-64 sm:w-80 sm:h-80">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-purple/30 to-violet-accent/30 rounded-full blur-3xl animate-pulse-slow" />
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <svg
                viewBox="0 0 200 200"
                className="w-full h-full"
                xmlns="https://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M100 50 L120 100 L100 150 L80 100 Z"
                  fill="none"
                  stroke="#7C3AED"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                />
                <motion.circle
                  cx="100"
                  cy="50"
                  r="15"
                  fill="#A78BFA"
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

