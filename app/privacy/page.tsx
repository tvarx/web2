'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function Privacy() {

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
                Privacy <span className="text-gradient">Policy</span>
              </h1>
              <p className="text-xl sm:text-2xl text-light-gray/80 font-body mb-4">
                Last updated: November 2025
              </p>
              <p className="text-lg text-light-gray/70 font-body max-w-3xl mx-auto">
                Thank you for using TVARX — the AI-powered fitness companion that creates personalized workout programs tailored to your goals, fitness level, and preferences.
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

        {/* Section 1: Information We Collect */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-4xl sm:text-5xl font-headline font-bold mb-8">
                1. Information <span className="text-gradient">We Collect</span>
              </h2>
              <div className="bg-dark-bg border border-primary-purple/30 rounded-2xl p-8 sm:p-12 space-y-6">
                <p className="text-lg text-light-gray/90 font-body leading-relaxed">
                  We collect only the information necessary to provide and improve your personalized training experience.
                </p>
                
                <div className="space-y-4">
                  <h3 className="text-2xl font-headline font-bold text-primary-purple">
                    a. Information You Provide
                  </h3>
                  <ul className="space-y-3 text-light-gray/80 font-body list-disc list-inside ml-4">
                    <li><strong>Account Data:</strong> Name, email address, and password (if applicable).</li>
                    <li><strong>Profile Data:</strong> Age, gender, height, weight, fitness level, and training goals.</li>
                    <li><strong>Health & Activity Data (optional):</strong> Workout history, injuries, or health conditions you voluntarily share to help the AI generate safe and effective training plans.</li>
                    <li><strong>Feedback & Support:</strong> Any messages or files you send to our support team.</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-headline font-bold text-primary-purple">
                    b. Automatically Collected Data
                  </h3>
                  <p className="text-light-gray/80 font-body">
                    When you use the app, we may automatically collect:
                  </p>
                  <ul className="space-y-3 text-light-gray/80 font-body list-disc list-inside ml-4">
                    <li>Device information (type, OS version, language, app version)</li>
                    <li>Usage data (app interactions, time spent, performance metrics)</li>
                    <li>Analytics data via Google Analytics or similar tools</li>
                  </ul>
                  <p className="text-light-gray/80 font-body mt-4">
                    We do not collect precise location data unless explicitly required for a feature (for example, local gym recommendations).
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 2: How We Use Your Information */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-4xl sm:text-5xl font-headline font-bold mb-8">
                2. How We Use <span className="text-gradient">Your Information</span>
              </h2>
              <div className="bg-dark-bg border border-primary-purple/30 rounded-2xl p-8 sm:p-12">
                <p className="text-lg text-light-gray/90 font-body leading-relaxed mb-4">
                  Your data helps us:
                </p>
                <ul className="space-y-3 text-light-gray/80 font-body list-disc list-inside ml-4">
                  <li>Create and update your AI-generated training plan</li>
                  <li>Track your progress and adjust recommendations dynamically</li>
                  <li>Improve app functionality and user experience</li>
                  <li>Communicate updates, tips, and offers (only with your consent)</li>
                  <li>Maintain security and prevent fraud</li>
                </ul>
                <p className="text-lg text-light-gray/90 font-body leading-relaxed mt-6 font-bold text-primary-purple">
                  We never sell your data to third parties.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 3: Data Storage and Security */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-4xl sm:text-5xl font-headline font-bold mb-8">
                3. Data Storage and <span className="text-gradient">Security</span>
              </h2>
              <div className="bg-dark-bg border border-primary-purple/30 rounded-2xl p-8 sm:p-12 space-y-6">
                <p className="text-lg text-light-gray/90 font-body leading-relaxed">
                  All personal data is securely stored on protected servers managed by TVARX.
                </p>
                <p className="text-lg text-light-gray/90 font-body leading-relaxed">
                  We use:
                </p>
                <ul className="space-y-3 text-light-gray/80 font-body list-disc list-inside ml-4">
                  <li>Encryption in transit (HTTPS / TLS)</li>
                  <li>Encrypted databases (AES-256 or equivalent)</li>
                  <li>Limited staff access to user data</li>
                </ul>
                <p className="text-lg text-light-gray/90 font-body leading-relaxed mt-4">
                  If you delete your account, all personal data will be permanently erased from our servers within 30 days.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 4: For More Security */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-4xl sm:text-5xl font-headline font-bold mb-8">
                4. <span className="text-gradient">⚙️ For More Security</span>
              </h2>
              <div className="bg-dark-bg border border-primary-purple/30 rounded-2xl p-8 sm:p-12 space-y-6">
                <p className="text-lg text-light-gray/90 font-body leading-relaxed">
                  A few preventive tips to keep in mind:
                </p>
                
                <div className="space-y-4">
                  <h3 className="text-2xl font-headline font-bold text-primary-purple">
                    🔸 Enable HTTPS Redirect
                  </h3>
                  <p className="text-light-gray/80 font-body">
                    In your Nginx or host file, add:
                  </p>
                  <div className="bg-black/50 border border-primary-purple/20 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-light-gray/90 font-mono whitespace-pre">
{`server {
  listen 80;
  server_name tvarx.com www.tvarx.com;
  return 301 https://tvarx.com$request_uri;
}`}
                    </pre>
                  </div>
                  <p className="text-light-gray/80 font-body">
                    This will always open the secure version of the site.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-headline font-bold text-primary-purple">
                    🔸 Adding Security Headers in Next.js
                  </h3>
                  <p className="text-light-gray/80 font-body">
                    Write in the next.config.js file:
                  </p>
                  <div className="bg-black/50 border border-primary-purple/20 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-light-gray/90 font-mono whitespace-pre">
{`async headers() {
  return [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-XSS-Protection", value: "1; mode=block" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self' https://fonts.googleapis.com https://cdn.jsdelivr.net;" },
      ],
    },
  ];
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 5: Data Sharing */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-4xl sm:text-5xl font-headline font-bold mb-8">
                5. Data <span className="text-gradient">Sharing</span>
              </h2>
              <div className="bg-dark-bg border border-primary-purple/30 rounded-2xl p-8 sm:p-12 space-y-4">
                <p className="text-lg text-light-gray/90 font-body leading-relaxed">
                  We may share limited information only when necessary:
                </p>
                <ul className="space-y-3 text-light-gray/80 font-body list-disc list-inside ml-4">
                  <li><strong>With Service Providers:</strong> For analytics, crash reporting, or hosting (under strict confidentiality).</li>
                  <li><strong>For Legal Reasons:</strong> If required by law, court order, or to protect user safety.</li>
                </ul>
                <p className="text-lg text-light-gray/90 font-body leading-relaxed mt-4 font-bold text-primary-purple">
                  We never share or sell your personal data for advertising purposes.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 6: Your Rights */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-4xl sm:text-5xl font-headline font-bold mb-8">
                6. Your <span className="text-gradient">Rights</span>
              </h2>
              <div className="bg-dark-bg border border-primary-purple/30 rounded-2xl p-8 sm:p-12 space-y-4">
                <p className="text-lg text-light-gray/90 font-body leading-relaxed">
                  You have the right to:
                </p>
                <ul className="space-y-3 text-light-gray/80 font-body list-disc list-inside ml-4">
                  <li>Access, correct, or delete your personal data</li>
                  <li>Withdraw consent for data processing at any time</li>
                  <li>Request a copy of your data (data portability)</li>
                  <li>Contact us regarding privacy concerns</li>
                </ul>
                <p className="text-lg text-light-gray/90 font-body leading-relaxed mt-4">
                  To exercise these rights, please email us at{' '}
                  <a href="mailto:privacy@tvarx.com" className="text-primary-purple hover:text-violet-accent transition-colors">
                    privacy@tvarx.com
                  </a>
                  .
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 7: Cookies and Tracking */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-4xl sm:text-5xl font-headline font-bold mb-8">
                7. Cookies and <span className="text-gradient">Tracking</span>
              </h2>
              <div className="bg-dark-bg border border-primary-purple/30 rounded-2xl p-8 sm:p-12">
                <p className="text-lg text-light-gray/90 font-body leading-relaxed">
                  Our website may use cookies for analytics and functionality.
                </p>
                <p className="text-lg text-light-gray/90 font-body leading-relaxed mt-4">
                  You can disable cookies in your browser settings, though some features may not work properly.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 8: Children's Privacy */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-4xl sm:text-5xl font-headline font-bold mb-8">
                8. Children's <span className="text-gradient">Privacy</span>
              </h2>
              <div className="bg-dark-bg border border-primary-purple/30 rounded-2xl p-8 sm:p-12">
                <p className="text-lg text-light-gray/90 font-body leading-relaxed">
                  TVARX is not intended for users under 16 years old.
                </p>
                <p className="text-lg text-light-gray/90 font-body leading-relaxed mt-4">
                  We do not knowingly collect personal data from children. If we become aware that a child has provided information, we will delete it immediately.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 9: International Data Transfers */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-4xl sm:text-5xl font-headline font-bold mb-8">
                9. International Data <span className="text-gradient">Transfers</span>
              </h2>
              <div className="bg-dark-bg border border-primary-purple/30 rounded-2xl p-8 sm:p-12">
                <p className="text-lg text-light-gray/90 font-body leading-relaxed">
                  If you are located outside our primary hosting country, please note that your data may be processed in a different jurisdiction. We ensure all data transfers comply with applicable privacy laws (e.g., GDPR).
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 10: Updates to This Policy */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-4xl sm:text-5xl font-headline font-bold mb-8">
                10. Updates to This <span className="text-gradient">Policy</span>
              </h2>
              <div className="bg-dark-bg border border-primary-purple/30 rounded-2xl p-8 sm:p-12">
                <p className="text-lg text-light-gray/90 font-body leading-relaxed">
                  We may update this Privacy Policy periodically.
                </p>
                <p className="text-lg text-light-gray/90 font-body leading-relaxed mt-4">
                  Any changes will be announced within the app or on our website. The "Last updated" date above will always reflect the latest version.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 11: Contact Us */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-4xl sm:text-5xl font-headline font-bold mb-8">
                11. Contact <span className="text-gradient">Us</span>
              </h2>
              <div className="bg-dark-bg border border-primary-purple/30 rounded-2xl p-8 sm:p-12">
                <p className="text-lg text-light-gray/90 font-body leading-relaxed mb-4">
                  If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us at:
                </p>
                <div className="space-y-3 text-light-gray/80 font-body">
                  <p>
                    <span className="text-primary-purple">📧</span>{' '}
                    <a href="mailto:privacy@tvarx.com" className="text-primary-purple hover:text-violet-accent transition-colors">
                      privacy@tvarx.com
                    </a>
                  </p>
                  <p>
                    <span className="text-primary-purple">🌐</span>{' '}
                    <a href="https://tvarx.com" target="_blank" rel="noopener noreferrer" className="text-primary-purple hover:text-violet-accent transition-colors">
                      https://tvarx.com
                    </a>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Summary Section */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-gradient-to-br from-primary-purple/20 to-violet-accent/20 border border-primary-purple/50 rounded-2xl p-8 sm:p-12 text-center">
                <h2 className="text-3xl sm:text-4xl font-headline font-bold mb-6 text-gradient">
                  Summary
                </h2>
                <div className="space-y-4 text-lg text-light-gray/90 font-body">
                  <p className="font-bold text-xl">
                    Your data belongs to you.
                  </p>
                  <p>
                    TVARX only uses it to build smarter, safer, and more effective workout programs — nothing more.
                  </p>
                  <p>
                    We are committed to protecting your privacy and earning your trust every day.
                  </p>
                </div>
              </div>
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
