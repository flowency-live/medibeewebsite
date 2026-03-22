import Link from 'next/link';
import type { Metadata } from 'next';
import { HoneycombPattern, HoneycombFade, HoneycombCluster } from '@/components/decorative';
import { HexagonBullet } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'We supply reliable healthcare assistants into mental health units, acute wards, NHS services, private hospitals, care homes and more.',
};

const SETTINGS = [
  'Mental health units',
  'Acute hospital wards',
  'NHS services',
  'Private hospitals and clinics',
  'Care homes',
  'Supported living services',
  'End of life and hospice care',
];

// Grain texture
const grainTexture = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 relative bg-void overflow-hidden">
        {/* Subtle grain texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: grainTexture }}
        />

        {/* Decorative hexagon clusters - brand signature */}
        <HoneycombCluster position="top-right" variant="filled" scale={1.4} opacityMultiplier={1.8} />

        <div className="container-editorial relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="w-12 h-[3px] bg-provider" />
              <span className="text-[0.8125rem] tracking-[0.2em] uppercase font-medium text-provider-light">
                For Care Providers
              </span>
              <span className="w-12 h-[3px] bg-provider" />
            </div>
            <h1 className="font-display text-[clamp(2.5rem,5vw,3.5rem)] leading-tight mb-6 text-gold-soft">
              Services for care providers
            </h1>
            <p className="text-lg leading-relaxed opacity-85 text-pearl-soft">
              We supply reliable healthcare assistants into a wide range of care and clinical
              settings across the UK.
            </p>
          </div>
        </div>
      </section>

      {/* Staffing Solutions - Light breathing section */}
      <section className="py-24 bg-void-light">
        <div className="container-editorial">
          <div className="text-center mb-16">
            <span className="text-xs tracking-[0.15em] uppercase mb-4 block text-tier-colony">
              Our Services
            </span>
            <h2 className="font-display text-[2.25rem] mb-4 text-pearl">
              Staffing Solutions Tailored to You
            </h2>
            <p className="text-[1.0625rem] max-w-2xl mx-auto text-pearl-soft">
              Whether you need emergency cover or long-term placements, we have the workforce to support you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Temporary Staffing */}
            <div
              className="p-8 bg-void-medium rounded-card border-t-[3px] border-tier-colony"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}
            >
              <div className="w-12 h-12 mb-6 text-tier-colony">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3 className="font-display text-xl mb-3 text-pearl">
                Temporary Staffing
              </h3>
              <p className="mb-6 leading-relaxed text-pearl-soft">
                Flexible, reliable carers available for short-notice cover, holidays, and sickness absence.
              </p>
              <Link
                href="/contact"
                className="text-sm inline-flex items-center gap-2 no-underline font-medium text-tier-colony"
                aria-label="Learn more about Temporary Staffing"
              >
                Learn more
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            {/* Emergency Cover */}
            <div
              className="p-8 bg-void-medium rounded-card border-t-[3px] border-tier-colony"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}
            >
              <div className="w-12 h-12 mb-6 text-tier-colony">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full" aria-hidden="true">
                  <path d="M9 12l2 2 4-4" />
                  <path d="M12 3a9 9 0 1 0 9 9" />
                  <path d="M21 3v6h-6" />
                </svg>
              </div>
              <h3 className="font-display text-xl mb-3 text-pearl">
                Emergency Cover
              </h3>
              <p className="mb-6 leading-relaxed text-pearl-soft">
                Urgent staffing solutions when you need them most. We are ready to help 24/7.
              </p>
              <Link
                href="/contact"
                className="text-sm inline-flex items-center gap-2 no-underline font-medium text-tier-colony"
                aria-label="Learn more about Emergency Cover"
              >
                Learn more
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            {/* Contract Placements */}
            <div
              className="p-8 bg-void-medium rounded-card border-t-[3px] border-tier-colony"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}
            >
              <div className="w-12 h-12 mb-6 text-tier-colony">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full" aria-hidden="true">
                  <circle cx="9" cy="7" r="4" />
                  <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                  <circle cx="19" cy="11" r="3" />
                  <path d="M22 21v-1.5a3 3 0 0 0-3-3h-1" />
                </svg>
              </div>
              <h3 className="font-display text-xl mb-3 text-pearl">
                Contract Placements
              </h3>
              <p className="mb-6 leading-relaxed text-pearl-soft">
                Longer-term staffing support to ensure continuity of care for your residents.
              </p>
              <Link
                href="/contact"
                className="text-sm inline-flex items-center gap-2 no-underline font-medium text-tier-colony"
                aria-label="Learn more about Contract Placements"
              >
                Learn more
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Settings We Support */}
      <section className="py-24 bg-void-elevated">
        <div className="container-editorial">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <div className="w-[60px] h-[3px] mb-8 bg-tier-colony" />
              <h2 className="font-display text-[2rem] mb-8 text-gold-soft">
                Settings we support
              </h2>
              <ul className="space-y-4">
                {SETTINGS.map((setting) => (
                  <li key={setting} className="flex items-start gap-3">
                    <span className="block w-2 h-2 mt-2 flex-shrink-0 bg-tier-colony" />
                    <span className="text-[1.0625rem] text-pearl-soft opacity-85">
                      {setting}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 bg-void rounded-card border-l-[3px] border-tier-colony">
              <h3 className="font-display text-xl mb-6 text-gold-soft">
                Why choose Medibee?
              </h3>
              <ul className="space-y-4">
                {[
                  'Personal service from a decision maker',
                  'Clear communication at every stage',
                  'Focus on suitability, not just filling roles',
                  '24-hour availability for urgent cover',
                  'Nationwide support'
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="block w-2 h-2 mt-2 flex-shrink-0 bg-tier-colony" />
                    <span className="text-[1.0625rem] text-pearl-soft opacity-85">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem We Solve - Plain background for visual rest */}
      <section className="py-24 relative bg-void">
        <div className="container-editorial relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="w-[60px] h-[3px] mb-8 bg-tier-colony" />
            <h2 className="font-display text-[2rem] mb-6 text-gold-soft">
              The problems we solve
            </h2>
            <p className="text-lg mb-8 opacity-85 text-pearl-soft">
              Care providers often struggle with:
            </p>
            <ul className="space-y-4 mb-8">
              {[
                'Finding reliable healthcare assistants',
                'Agencies sending staff who are not a good fit for the setting',
                'Short-notice cover creating operational stress'
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="block w-2 h-2 mt-2 flex-shrink-0 bg-tier-colony" />
                  <span className="text-[1.0625rem] text-pearl-soft opacity-85">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-lg opacity-85 text-pearl-soft">
              Medibee Recruitment Ltd exists to reduce this risk by supplying dependable, suitable
              healthcare assistants and maintaining clear communication throughout.
            </p>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-24 bg-void-light">
        <div className="container-editorial">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-[60px] h-[3px] mx-auto mb-8 bg-gold" />
            <h2 className="font-display text-[2rem] mb-6 text-gold-soft">
              Our commitment to compliance
            </h2>
            <p className="text-[1.0625rem] leading-relaxed mb-12 opacity-85 text-pearl-soft">
              All healthcare assistants supplied by Medibee are vetted and supported in line with
              our compliance and safeguarding processes.
            </p>
            <div className="flex justify-center gap-12 flex-wrap">
              {['DBS Checked', 'Right to Work Verified', 'ICO Registered', 'Safeguarding Policies'].map((badge) => (
                <div key={badge} className="flex items-center gap-3">
                  <HexagonBullet />
                  <span className="text-[0.8125rem] tracking-[0.1em] uppercase opacity-80 text-gold-soft">
                    {badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA with honeycomb */}
      <section className="py-24 relative overflow-hidden bg-void">
        <HoneycombPattern variant="gold" opacity={0.08} />

        <div className="container-editorial relative z-10 text-center">
          <h2 className="font-display text-[2rem] mb-6 text-gold-soft">
            Discuss your staffing requirements
          </h2>
          <p className="text-[1.0625rem] leading-relaxed mb-10 max-w-2xl mx-auto opacity-75 text-pearl-soft">
            Contact us to talk through your needs. We&apos;ll discuss suitability and availability
            to find the right healthcare assistants for your setting.
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 text-[0.9375rem] font-semibold no-underline transition-all bg-gold text-void rounded-card hover:bg-gold-light"
            style={{ boxShadow: '0 4px 24px rgba(212, 175, 55, 0.25)' }}
          >
            Contact us
          </Link>
        </div>
      </section>
    </>
  );
}
