'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useI18n } from '@/i18n/context'

export default function Features() {
  const { t } = useI18n()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const features = [
    {
      title: t.features.aiPersonalization.title,
      description: t.features.aiPersonalization.description,
      icon: '🧠',
    },
    {
      title: t.features.adaptiveProgress.title,
      description: t.features.adaptiveProgress.description,
      icon: '📈',
    },
    {
      title: t.features.safety.title,
      description: t.features.safety.description,
      icon: '🛡️',
    },
    {
      title: t.features.homeOrGym.title,
      description: t.features.homeOrGym.description,
      icon: '🏋️',
    },
  ]

  return (
    <section className="py-24 relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-headline font-bold mb-4">
            {t.features.title.split('Features')[0]} <span className="text-gradient">Features</span>
          </h2>
          <p className="text-light-gray/70 text-lg max-w-2xl mx-auto">
            {t.features.subtitle}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-dark-bg border border-primary-purple/20 rounded-xl p-6 hover:border-violet-accent transition-all duration-300 cursor-pointer group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-headline font-bold mb-3">{feature.title}</h3>
              <p className="text-light-gray/70 font-body text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

