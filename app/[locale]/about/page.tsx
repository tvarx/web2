'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useI18n } from '@/i18n/context'

const teamMembers = [
  {
    name: 'Alex Morgan',
    role: 'CEO & Co-Founder',
    bio: 'Former fitness coach turned AI enthusiast. 10+ years in fitness tech.',
    linkedin: '#',
  },
  {
    name: 'Dr. Sarah Kim',
    role: 'CTO & Co-Founder',
    bio: 'PhD in Machine Learning. Specializes in adaptive algorithms and health AI.',
    linkedin: '#',
  },
  {
    name: 'James Rivera',
    role: 'Head of Product',
    bio: 'Product designer with a passion for human-centered fitness solutions.',
    linkedin: '#',
  },
  {
    name: 'Dr. Maria Santos',
    role: 'Medical Advisor',
    bio: 'Sports medicine physician ensuring safety and scientific accuracy.',
    linkedin: '#',
  },
]

const roadmapItems = [
  {
    quarter: 'Q1 2024',
    title: 'AI Model Launch',
    description: 'Core AI training algorithm and initial app release.',
    status: 'completed',
  },
  {
    quarter: 'Q2 2024',
    title: 'Advanced Analytics',
    description: 'Real-time progress tracking and predictive insights.',
    status: 'completed',
  },
  {
    quarter: 'Q3 2024',
    title: 'Community Features',
    description: 'Social sharing, challenges, and trainer marketplace.',
    status: 'in-progress',
  },
  {
    quarter: 'Q4 2024',
    title: 'Wearable Integration',
    description: 'Connect with Apple Watch, Fitbit, and other devices.',
    status: 'upcoming',
  },
]

export default function About() {
  const { t, locale } = useI18n()
  const [missionRef, missionInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [teamRef, teamInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [techRef, techInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [roadmapRef, roadmapInView] = useInView({ triggerOnce: true, threshold: 0.1 })

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
                {t.about.title.replace('TvarX', '').trim()} <span className="text-gradient">TvarX</span>
              </h1>
              <p className="text-xl sm:text-2xl text-light-gray/80 font-body">
                {t.about.subtitle}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section ref={missionRef} className="py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={missionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-4xl sm:text-5xl font-headline font-bold mb-8 text-center">
                {t.about.mission.title.replace('Mission', '').trim()} <span className="text-gradient">Mission</span>
              </h2>
              <div className="bg-dark-bg border border-primary-purple/30 rounded-2xl p-8 sm:p-12 space-y-6">
                <p className="text-lg text-light-gray/90 font-body leading-relaxed">
                  {t.about.mission.paragraph1}
                </p>
                <p className="text-lg text-light-gray/90 font-body leading-relaxed">
                  {t.about.mission.paragraph2}
                </p>
                <p className="text-lg text-light-gray/90 font-body leading-relaxed">
                  {t.about.mission.paragraph3}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Technology Section */}
        <section ref={techRef} className="py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={techInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-4xl sm:text-5xl font-headline font-bold mb-8 text-center">
                {t.about.technology.title.replace('Technology', '').trim()} <span className="text-gradient">Technology</span>
              </h2>
              <div className="space-y-6">
                <div className="bg-dark-bg border border-primary-purple/30 rounded-xl p-6">
                  <h3 className="text-2xl font-headline font-bold mb-4 text-primary-purple">
                    {t.about.technology.aiModel.title}
                  </h3>
                  <p className="text-light-gray/80 font-body">
                    {t.about.technology.aiModel.description}
                  </p>
                </div>
                <div className="bg-dark-bg border border-primary-purple/30 rounded-xl p-6">
                  <h3 className="text-2xl font-headline font-bold mb-4 text-primary-purple">
                    {t.about.technology.privacy.title}
                  </h3>
                  <p className="text-light-gray/80 font-body">
                    {t.about.technology.privacy.description}
                  </p>
                </div>
                <div className="bg-dark-bg border border-primary-purple/30 rounded-xl p-6">
                  <h3 className="text-2xl font-headline font-bold mb-4 text-primary-purple">
                    {t.about.technology.science.title}
                  </h3>
                  <p className="text-light-gray/80 font-body">
                    {t.about.technology.science.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section ref={teamRef} className="py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={teamInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl font-headline font-bold mb-4">
                {t.about.team.title.replace('Team', '').trim()} <span className="text-gradient">Team</span>
              </h2>
              <p className="text-light-gray/70 text-lg max-w-2xl mx-auto">
                {t.about.team.subtitle}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={teamInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-dark-bg border border-primary-purple/30 rounded-xl p-6 hover:border-violet-accent transition-all duration-300"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-purple to-violet-accent mb-4 flex items-center justify-center text-3xl">
                    {member.name.charAt(0)}
                  </div>
                  <h3 className="text-xl font-headline font-bold mb-1">{member.name}</h3>
                  <p className="text-primary-purple text-sm font-body mb-3">{member.role}</p>
                  <p className="text-light-gray/70 text-sm font-body mb-4">{member.bio}</p>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-violet-accent hover:text-primary-purple transition-colors text-sm font-body"
                  >
                    LinkedIn →
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Roadmap Section */}
        <section ref={roadmapRef} className="py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={roadmapInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl font-headline font-bold mb-4">
                {t.about.roadmap.title.replace('Roadmap', '').trim()} <span className="text-gradient">Roadmap</span>
              </h2>
              <p className="text-light-gray/70 text-lg max-w-2xl mx-auto">
                {t.about.roadmap.subtitle}
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto space-y-6">
              {roadmapItems.map((item, index) => (
                <motion.div
                  key={item.quarter}
                  initial={{ opacity: 0, x: -50 }}
                  animate={roadmapInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative pl-8 border-l-2 border-primary-purple/30"
                >
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary-purple" />
                  <div className="bg-dark-bg border border-primary-purple/30 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-primary-purple font-headline font-bold text-sm">
                        {item.quarter}
                      </span>
                      <span className={`text-xs px-3 py-1 rounded-full font-body ${
                        item.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                        item.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-primary-purple/20 text-primary-purple'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <h3 className="text-xl font-headline font-bold mb-2">{item.title}</h3>
                    <p className="text-light-gray/70 font-body">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Careers Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-4xl sm:text-5xl font-headline font-bold mb-6">
                {t.about.careers.title.replace('Us', '').trim()} <span className="text-gradient">Us</span>
              </h2>
              <p className="text-lg text-light-gray/80 font-body mb-8 max-w-2xl mx-auto">
                {t.about.careers.description}
              </p>
              <motion.a
                href="mailto:careers@tvarx.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-4 bg-gradient-to-r from-primary-purple to-violet-accent text-white rounded-lg font-headline font-bold text-lg glow-purple"
              >
                {t.about.careers.viewPositions}
              </motion.a>
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

