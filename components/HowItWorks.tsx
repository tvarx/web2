'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useI18n } from '@/i18n/context'

export default function HowItWorks() {
  const { t } = useI18n()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const steps = [
    {
      number: t.howItWorks.steps.assess.number,
      title: t.howItWorks.steps.assess.title,
      description: t.howItWorks.steps.assess.description,
      icon: '📊',
    },
    {
      number: t.howItWorks.steps.aiPlan.number,
      title: t.howItWorks.steps.aiPlan.title,
      description: t.howItWorks.steps.aiPlan.description,
      icon: '🤖',
    },
    {
      number: t.howItWorks.steps.train.number,
      title: t.howItWorks.steps.train.title,
      description: t.howItWorks.steps.train.description,
      icon: '💪',
    },
  ]

  return (
    <section id="how-it-works" className="py-24 relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-headline font-bold mb-4">
            {t.howItWorks.title.split('Works')[0]} <span className="text-gradient">Works</span>
          </h2>
          <p className="text-light-gray/70 text-lg max-w-2xl mx-auto">
            {t.howItWorks.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative group"
            >
              <div className="bg-dark-bg border border-primary-purple/30 rounded-2xl p-8 hover:border-primary-purple transition-all duration-300 hover:glow-purple h-full">
                <div className="text-6xl mb-4">{step.icon}</div>
                <div className="text-primary-purple font-headline font-bold text-sm mb-2">
                  {step.number}
                </div>
                <h3 className="text-2xl font-headline font-bold mb-4">{step.title}</h3>
                <p className="text-light-gray/70 font-body">{step.description}</p>
                
                {/* Connecting line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary-purple to-transparent" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

