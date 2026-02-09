import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/lib/config/site';
import { HoneycombCluster } from '@/components/decorative';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-deep-slate text-mist relative overflow-hidden">
      {/* Subtle noise texture for depth */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Decorative hexagon cluster - brand signature */}
      <HoneycombCluster
        position="top-right"
        variant="outline"
        scale={0.9}
        opacityMultiplier={0.8}
        data-testid="footer-hex-cluster"
      />

      <div className="relative container-editorial py-16 md:py-20">
        {/* Main Footer Content - Two column layout with clear hierarchy */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 lg:gap-16">
          {/* Brand Column - Dominant left side */}
          <div className="lg:max-w-sm">
            <Link href="/" className="inline-flex items-center gap-3 no-underline group">
              <Image
                src="/medibee-tile-logo.png"
                alt=""
                width={44}
                height={44}
                className="w-11 h-11 transition-transform duration-300 group-hover:scale-105"
              />
              <Image
                src="/medibee-logo.png"
                alt="Medibee"
                width={140}
                height={40}
                className="h-9 w-auto"
              />
            </Link>
            <p className="font-body text-body-sm text-mist/60 mt-5 leading-relaxed max-w-xs">
              Specialist healthcare assistant recruitment you can trust. Personal service, nationwide reach.
            </p>
            {/* Email as a clear, accessible link */}
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-block mt-5 font-body text-body-sm text-soft-gold hover:text-rich-gold transition-colors no-underline"
            >
              {siteConfig.email}
            </a>
          </div>

          {/* Navigation Column - Compact, right-aligned on desktop */}
          <div className="flex flex-wrap gap-x-16 gap-y-8">
            {/* Quick Links */}
            <nav className="min-w-[120px]">
              <h3 className="font-body text-ui-xs tracking-wider uppercase text-mist/40 mb-4">
                Navigate
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    href="/services"
                    className="font-body text-body-sm text-mist/70 hover:text-soft-gold transition-colors no-underline"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/work-with-us"
                    className="font-body text-body-sm text-mist/70 hover:text-soft-gold transition-colors no-underline"
                  >
                    Work With Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="font-body text-body-sm text-mist/70 hover:text-soft-gold transition-colors no-underline"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="font-body text-body-sm text-mist/70 hover:text-soft-gold transition-colors no-underline"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Policies */}
            <nav className="min-w-[120px]">
              <h3 className="font-body text-ui-xs tracking-wider uppercase text-mist/40 mb-4">
                Policies
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="font-body text-body-sm text-mist/70 hover:text-soft-gold transition-colors no-underline"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/safeguarding"
                    className="font-body text-body-sm text-mist/70 hover:text-soft-gold transition-colors no-underline"
                  >
                    Safeguarding
                  </Link>
                </li>
                <li>
                  <Link
                    href="/complaints"
                    className="font-body text-body-sm text-mist/70 hover:text-soft-gold transition-colors no-underline"
                  >
                    Complaints
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Legal Footer - Minimal, separated by subtle border */}
        <div className="mt-16 pt-8 border-t border-mist/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="font-body text-ui-xs text-mist/40">
              &copy; {currentYear} {siteConfig.company.name}. {siteConfig.company.registration}
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-body text-ui-xs text-mist/40">
              {siteConfig.company.companyNumber !== '[TBC]' && (
                <span>Company No. {siteConfig.company.companyNumber}</span>
              )}
              <span>ICO: {siteConfig.company.icoRegistration}</span>
            </div>
          </div>
          {siteConfig.company.registeredOffice !== '[TBC]' && (
            <p className="font-body text-ui-xs text-mist/30 mt-3">
              Registered Office: {siteConfig.company.registeredOffice}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
