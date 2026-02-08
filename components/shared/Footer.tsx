import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/lib/config/site';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-blue text-mist">
      <div className="container-editorial py-12 md:py-16">
        {/* Gold rule at top */}
        <span className="rule-gold-wide mb-10 block" aria-hidden="true" />

        <div className="grid md:grid-cols-3 gap-10 md:gap-8">
          {/* Company Info with Logo */}
          <div className="space-y-4">
            <Link href="/" className="inline-block no-underline">
              <Image
                src="/medibee-logo.png"
                alt="Medibee"
                width={160}
                height={45}
                className="h-10 w-auto"
              />
            </Link>
            <p className="font-body text-body-sm text-soft-gold leading-relaxed">
              Specialist healthcare assistant recruitment you can trust.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-body text-ui-sm tracking-ui uppercase text-soft-gold">
              Contact
            </h3>
            <div className="space-y-2 font-body text-body-sm">
              <a
                href={`mailto:${siteConfig.email}`}
                className="block text-mist hover:text-rich-gold transition-colors no-underline"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>

          {/* Policies */}
          <div className="space-y-4">
            <h3 className="font-body text-ui-sm tracking-ui uppercase text-soft-gold">
              Policies
            </h3>
            <nav className="space-y-2 font-body text-body-sm">
              <Link
                href="/privacy-policy"
                className="block text-mist hover:text-rich-gold transition-colors no-underline"
              >
                Privacy Policy
              </Link>
              <Link
                href="/safeguarding"
                className="block text-mist hover:text-rich-gold transition-colors no-underline"
              >
                Safeguarding
              </Link>
              <Link
                href="/complaints"
                className="block text-mist hover:text-rich-gold transition-colors no-underline"
              >
                Complaints
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-blue/30">
          <div className="font-body text-body-sm text-mist/60 space-y-2 md:space-y-0 md:flex md:flex-wrap md:gap-x-6 md:gap-y-2">
            <p>&copy; {currentYear} {siteConfig.company.name}</p>
            <p>{siteConfig.company.registration}</p>
            {siteConfig.company.companyNumber !== '[TBC]' && (
              <p>Company No. {siteConfig.company.companyNumber}</p>
            )}
            <p>ICO: {siteConfig.company.icoRegistration}</p>
          </div>
          {siteConfig.company.registeredOffice !== '[TBC]' && (
            <p className="font-body text-body-sm text-mist/60 mt-2">
              Registered Office: {siteConfig.company.registeredOffice}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
