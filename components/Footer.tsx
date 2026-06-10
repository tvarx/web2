'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useI18n } from '@/i18n/context'

export default function Footer() {
  const { t, locale } = useI18n()
  
  return (
    <footer className="border-t border-primary-purple/20 py-12 relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image 
                src="/logo.png" 
                alt="TvarX Logo" 
                width={40} 
                height={40}
                className="object-contain"
              />
              <h3 className="text-2xl font-headline font-bold text-gradient">TvarX</h3>
            </div>
            <p className="text-light-gray/70 font-body text-sm">
              {t.footer.tagline}
            </p>
          </div>
          
          <div>
            <h4 className="font-headline font-semibold mb-4">{t.footer.product}</h4>
            <ul className="space-y-2 font-body text-sm text-light-gray/70">
              <li><Link href={`/${locale}#how-it-works`} className="hover:text-primary-purple transition-colors">{t.navbar.howItWorks}</Link></li>
              <li><Link href={`/${locale}#demo`} className="hover:text-primary-purple transition-colors">{t.footer.tryDemo}</Link></li>
              <li><Link href={`/${locale}/about`} className="hover:text-primary-purple transition-colors">{t.common.about}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-semibold mb-4">{t.footer.legal}</h4>
            <ul className="space-y-2 font-body text-sm text-light-gray/70">
              <li><Link href={`/${locale}/privacy`} className="hover:text-primary-purple transition-colors">{t.common.privacy}</Link></li>
              <li><Link href={`/${locale}/terms`} className="hover:text-primary-purple transition-colors">{t.common.terms}</Link></li>
              <li><Link href={`/${locale}/contact`} className="hover:text-primary-purple transition-colors">{t.common.contact}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-semibold mb-4">{t.footer.connect}</h4>
            <div className="flex gap-4">
              <a href="https://twitter.com/tvarx" target="_blank" rel="noopener noreferrer" className="text-light-gray/70 hover:text-primary-purple transition-colors">Twitter</a>
              <a href="https://instagram.com/tvarx" target="_blank" rel="noopener noreferrer" className="text-light-gray/70 hover:text-primary-purple transition-colors">Instagram</a>
              <a href="https://linkedin.com/company/tvarx" target="_blank" rel="noopener noreferrer" className="text-light-gray/70 hover:text-primary-purple transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-purple/20 pt-8 text-center">
          <p className="text-light-gray/60 font-body text-sm">
            © {new Date().getFullYear()} TvarX. {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}

