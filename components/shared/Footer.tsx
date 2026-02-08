import Link from 'next/link';
import { siteConfig } from '@/lib/config/site';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-deep-slate text-mist">
      <div className="container-editorial py-12 md:py-16">
        {/* Gold rule at top */}
        <span className="rule-gold-wide mb-10 block" aria-hidden="true" />

        <div className="grid md:grid-cols-3 gap-10 md:gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h2 className="font-display text-display-sm text-mist">
              Medibee
            </h2>
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
          <div className="font-body text-body-sm text-neutral-grey space-y-2 md:space-y-0 md:flex md:flex-wrap md:gap-x-6 md:gap-y-2">
            <p>&copy; {currentYear} {siteConfig.company.name}</p>
            <p>{siteConfig.company.registration}</p>
            {siteConfig.company.companyNumber !== '[TBC]' && (
              <p>Company No. {siteConfig.company.companyNumber}</p>
            )}
            <p>ICO: {siteConfig.company.icoRegistration}</p>
          </div>
          {siteConfig.company.registeredOffice !== '[TBC]' && (
            <p className="font-body text-body-sm text-neutral-grey mt-2">
              Registered Office: {siteConfig.company.registeredOffice}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
