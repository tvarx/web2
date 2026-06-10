'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

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
                About <span className="text-gradient">TvarX</span>
              </h1>
              <p className="text-xl sm:text-2xl text-light-gray/80 font-body">
                Every body tells a story. We use intelligence to listen, learn, and empower.
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
                Our <span className="text-gradient">Mission</span>
              </h2>
              <div className="bg-dark-bg border border-primary-purple/30 rounded-2xl p-8 sm:p-12 space-y-6">
                <p className="text-lg text-light-gray/90 font-body leading-relaxed">
                  At TvarX, we believe that fitness should be as unique as you are. No two bodies are the same, 
                  and neither should be their training programs. We've harnessed the power of artificial intelligence 
                  to create something revolutionary: a fitness companion that understands your body, adapts to your 
                  progress, and evolves with your goals.
                </p>
                <p className="text-lg text-light-gray/90 font-body leading-relaxed">
                  Our mission is to democratize personalized fitness. Whether you're a beginner taking your first 
                  steps or an elite athlete pushing boundaries, TvarX meets you where you are and guides you to 
                  where you want to be. We combine cutting-edge AI with proven exercise science to deliver training 
                  plans that are not just effective, but safe, sustainable, and inspiring.
                </p>
                <p className="text-lg text-light-gray/90 font-body leading-relaxed">
                  Every body tells a story. We use intelligence to listen, learn, and empower. That's not just our 
                  tagline—it's our promise.
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
                Our <span className="text-gradient">Technology</span>
              </h2>
              <div className="space-y-6">
                <div className="bg-dark-bg border border-primary-purple/30 rounded-xl p-6">
                  <h3 className="text-2xl font-headline font-bold mb-4 text-primary-purple">
                    AI Training Model
                  </h3>
                  <p className="text-light-gray/80 font-body">
                    Our proprietary AI algorithm analyzes thousands of data points—from your fitness level and goals 
                    to your recovery patterns and preferences. It continuously learns from your progress, adjusting 
                    workouts in real-time to optimize results while preventing injury and burnout.
                  </p>
                </div>
                <div className="bg-dark-bg border border-primary-purple/30 rounded-xl p-6">
                  <h3 className="text-2xl font-headline font-bold mb-4 text-primary-purple">
                    Data Privacy & Security
                  </h3>
                  <p className="text-light-gray/80 font-body">
                    Your health data belongs to you. We use end-to-end encryption and never sell your information. 
                    All data is collected with explicit consent and can be removed at any time. We're compliant with 
                    GDPR, HIPAA, and other privacy regulations to ensure your information stays safe.
                  </p>
                </div>
                <div className="bg-dark-bg border border-primary-purple/30 rounded-xl p-6">
                  <h3 className="text-2xl font-headline font-bold mb-4 text-primary-purple">
                    Scientific Foundation
                  </h3>
                  <p className="text-light-gray/80 font-body">
                    Every recommendation is backed by exercise science and reviewed by our team of sports medicine 
                    professionals. We combine the latest research with practical experience to ensure your training 
                    is both effective and safe.
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
                Our <span className="text-gradient">Team</span>
              </h2>
              <p className="text-light-gray/70 text-lg max-w-2xl mx-auto">
                Passionate experts in fitness, AI, and human wellness
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
                Development <span className="text-gradient">Roadmap</span>
              </h2>
              <p className="text-light-gray/70 text-lg max-w-2xl mx-auto">
                Where we've been and where we're going
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
                Join <span className="text-gradient">Us</span>
              </h2>
              <p className="text-lg text-light-gray/80 font-body mb-8 max-w-2xl mx-auto">
                We're always looking for passionate individuals who share our vision of making personalized fitness 
                accessible to everyone. If you're excited about AI, fitness, or building products that change lives, 
                we'd love to hear from you.
              </p>
              <motion.a
                href="mailto:careers@tvarx.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-4 bg-gradient-to-r from-primary-purple to-violet-accent text-white rounded-lg font-headline font-bold text-lg glow-purple"
              >
                View Open Positions
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* Back to Home */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Link
              href="/"
              className="text-primary-purple hover:text-violet-accent font-body transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}

