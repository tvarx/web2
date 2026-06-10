'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useI18n } from '@/i18n/context'

export default function CTA() {
  const { t } = useI18n()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-24 relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-headline font-bold mb-6">
            {t.cta.title.split('Transform')[0]} <span className="text-gradient">Transform</span> {t.cta.title.split('Transform')[1] || ''}
          </h2>
          <p className="text-light-gray/70 text-lg mb-12 max-w-2xl mx-auto">
            {t.cta.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <motion.a
              href="https://apps.apple.com/app/tvarx"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-dark-bg border-2 border-primary-purple rounded-lg hover:bg-primary-purple/10 transition-all glow-purple flex items-center gap-3"
            >
              <span className="text-2xl">📱</span>
              <div className="text-left">
                <div className="text-xs text-light-gray/60">{t.cta.downloadOn}</div>
                <div className="font-headline font-bold">{t.cta.appStore}</div>
              </div>
            </motion.a>
            <motion.a
              href="https://play.google.com/store/apps/details?id=com.tvarx"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-dark-bg border-2 border-primary-purple rounded-lg hover:bg-primary-purple/10 transition-all glow-purple flex items-center gap-3"
            >
              <span className="text-2xl">🤖</span>
              <div className="text-left">
                <div className="text-xs text-light-gray/60">{t.cta.getItOn}</div>
                <div className="font-headline font-bold">{t.cta.googlePlay}</div>
              </div>
            </motion.a>
          </div>

          <div className="p-4 bg-primary-purple/10 border border-primary-purple/30 rounded-lg max-w-2xl mx-auto">
            <p className="text-sm text-light-gray/70 font-body">
              ⚠️ <strong>{t.cta.disclaimer}</strong>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

