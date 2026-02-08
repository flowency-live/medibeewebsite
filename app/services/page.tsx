import Link from 'next/link';
import type { Metadata } from 'next';

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

// Honeycomb SVG pattern (bee-themed)
const honeycombPattern = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100' viewBox='0 0 56 100'%3E%3Cpath fill='%23E5C55C' fill-opacity='0.06' d='M28 66L0 50L0 16L28 0L56 16L56 50L28 66ZM28 100L0 84L0 50L28 34L56 50L56 84L28 100Z'/%3E%3C/svg%3E")`;

// Grain texture
const grainTexture = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="py-24 relative"
        style={{ backgroundColor: '#1a1d2e' }}
      >
        {/* Subtle grain texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: grainTexture }}
        />

        <div className="container-editorial relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span
                className="w-12 h-[3px]"
                style={{ backgroundColor: '#E5C55C' }}
              />
              <span
                className="text-[0.8125rem] tracking-[0.2em] uppercase font-medium"
                style={{ color: '#E5C55C' }}
              >
                For Care Providers
              </span>
              <span
                className="w-12 h-[3px]"
                style={{ backgroundColor: '#E5C55C' }}
              />
            </div>
            <h1
              className="font-display text-[clamp(2.5rem,5vw,3.5rem)] leading-tight mb-6"
              style={{ color: '#F5E6A3' }}
            >
              Services for care providers
            </h1>
            <p
              className="text-lg leading-relaxed opacity-85"
              style={{ color: '#F5F4F0' }}
            >
              We supply reliable healthcare assistants into a wide range of care and clinical
              settings across the UK.
            </p>
          </div>
        </div>
      </section>

      {/* Staffing Solutions - Light breathing section */}
      <section
        className="py-24"
        style={{ backgroundColor: '#F8F7F4' }}
      >
        <div className="container-editorial">
          <div className="text-center mb-16">
            <span
              className="text-xs tracking-[0.15em] uppercase mb-4 block"
              style={{ color: '#E5C55C' }}
            >
              Our Services
            </span>
            <h2
              className="font-display text-[2.25rem] mb-4"
              style={{ color: '#1a1d2e' }}
            >
              Staffing Solutions Tailored to You
            </h2>
            <p
              className="text-[1.0625rem] max-w-2xl mx-auto"
              style={{ color: '#4a4e5a' }}
            >
              Whether you need emergency cover or long-term placements, we have the workforce to support you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Temporary Staffing */}
            <div
              className="p-8"
              style={{
                backgroundColor: '#ffffff',
                borderTop: '3px solid #E5C55C',
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)'
              }}
            >
              <div className="w-12 h-12 mb-6" style={{ color: '#3d4259' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3
                className="font-display text-xl mb-3"
                style={{ color: '#1a1d2e' }}
              >
                Temporary Staffing
              </h3>
              <p
                className="mb-6 leading-relaxed"
                style={{ color: '#4a4e5a' }}
              >
                Flexible, reliable carers available for short-notice cover, holidays, and sickness absence.
              </p>
              <Link
                href="/contact"
                className="text-sm inline-flex items-center gap-2 no-underline font-medium"
                style={{ color: '#E5C55C' }}
              >
                Learn more
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            {/* Emergency Cover */}
            <div
              className="p-8"
              style={{
                backgroundColor: '#ffffff',
                borderTop: '3px solid #E5C55C',
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)'
              }}
            >
              <div className="w-12 h-12 mb-6" style={{ color: '#3d4259' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
                  <path d="M9 12l2 2 4-4" />
                  <path d="M12 3a9 9 0 1 0 9 9" />
                  <path d="M21 3v6h-6" />
                </svg>
              </div>
              <h3
                className="font-display text-xl mb-3"
                style={{ color: '#1a1d2e' }}
              >
                Emergency Cover
              </h3>
              <p
                className="mb-6 leading-relaxed"
                style={{ color: '#4a4e5a' }}
              >
                Urgent staffing solutions when you need them most. We are ready to help 24/7.
              </p>
              <Link
                href="/contact"
                className="text-sm inline-flex items-center gap-2 no-underline font-medium"
                style={{ color: '#E5C55C' }}
              >
                Learn more
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            {/* Contract Placements */}
            <div
              className="p-8"
              style={{
                backgroundColor: '#ffffff',
                borderTop: '3px solid #E5C55C',
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)'
              }}
            >
              <div className="w-12 h-12 mb-6" style={{ color: '#3d4259' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
                  <circle cx="9" cy="7" r="4" />
                  <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                  <circle cx="19" cy="11" r="3" />
                  <path d="M22 21v-1.5a3 3 0 0 0-3-3h-1" />
                </svg>
              </div>
              <h3
                className="font-display text-xl mb-3"
                style={{ color: '#1a1d2e' }}
              >
                Contract Placements
              </h3>
              <p
                className="mb-6 leading-relaxed"
                style={{ color: '#4a4e5a' }}
              >
                Longer-term staffing support to ensure continuity of care for your residents.
              </p>
              <Link
                href="/contact"
                className="text-sm inline-flex items-center gap-2 no-underline font-medium"
                style={{ color: '#E5C55C' }}
              >
                Learn more
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Settings We Support */}
      <section
        className="py-24"
        style={{ backgroundColor: '#3d4259' }}
      >
        <div className="container-editorial">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <div
                className="w-[60px] h-[3px] mb-8"
                style={{ backgroundColor: '#E5C55C' }}
              />
              <h2
                className="font-display text-[2rem] mb-8"
                style={{ color: '#F5E6A3' }}
              >
                Settings we support
              </h2>
              <ul className="space-y-4">
                {SETTINGS.map((setting) => (
                  <li key={setting} className="flex items-start gap-3">
                    <span
                      className="block w-2 h-2 mt-2 flex-shrink-0"
                      style={{ backgroundColor: '#E5C55C' }}
                    />
                    <span
                      className="text-[1.0625rem]"
                      style={{ color: '#F5F4F0', opacity: 0.85 }}
                    >
                      {setting}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="p-8"
              style={{
                backgroundColor: '#1a1d2e',
                borderLeft: '3px solid #E5C55C'
              }}
            >
              <h3
                className="font-display text-xl mb-6"
                style={{ color: '#F5E6A3' }}
              >
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
                  <li
                    key={item}
                    className="flex items-start gap-3"
                  >
                    <span
                      className="block w-2 h-2 mt-2 flex-shrink-0"
                      style={{ backgroundColor: '#E5C55C' }}
                    />
                    <span
                      className="text-[1.0625rem]"
                      style={{ color: '#F5F4F0', opacity: 0.85 }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem We Solve */}
      <section
        className="py-24"
        style={{ backgroundColor: '#1a1d2e' }}
      >
        <div className="container-editorial">
          <div className="max-w-3xl mx-auto">
            <div
              className="w-[60px] h-[3px] mb-8"
              style={{ backgroundColor: '#E5C55C' }}
            />
            <h2
              className="font-display text-[2rem] mb-6"
              style={{ color: '#F5E6A3' }}
            >
              The problems we solve
            </h2>
            <p
              className="text-lg mb-8 opacity-85"
              style={{ color: '#F5F4F0' }}
            >
              Care providers often struggle with:
            </p>
            <ul className="space-y-4 mb-8">
              {[
                'Finding reliable healthcare assistants',
                'Agencies sending staff who are not a good fit for the setting',
                'Short-notice cover creating operational stress'
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    className="block w-2 h-2 mt-2 flex-shrink-0"
                    style={{ backgroundColor: '#E5C55C' }}
                  />
                  <span
                    className="text-[1.0625rem]"
                    style={{ color: '#F5F4F0', opacity: 0.85 }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <p
              className="text-lg opacity-85"
              style={{ color: '#F5F4F0' }}
            >
              Medibee Recruitment Ltd exists to reduce this risk by supplying dependable, suitable
              healthcare assistants and maintaining clear communication throughout.
            </p>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section
        className="py-24"
        style={{ backgroundColor: '#2a2e42' }}
      >
        <div className="container-editorial">
          <div className="max-w-3xl mx-auto text-center">
            <div
              className="w-[60px] h-[3px] mx-auto mb-8"
              style={{ backgroundColor: '#E5C55C' }}
            />
            <h2
              className="font-display text-[2rem] mb-6"
              style={{ color: '#F5E6A3' }}
            >
              Our commitment to compliance
            </h2>
            <p
              className="text-[1.0625rem] leading-relaxed mb-12 opacity-85"
              style={{ color: '#F5F4F0' }}
            >
              All healthcare assistants supplied by Medibee are vetted and supported in line with
              our compliance and safeguarding processes.
            </p>
            <div className="flex justify-center gap-12 flex-wrap">
              {['DBS Checked', 'Right to Work Verified', 'ICO Registered', 'Safeguarding Policies'].map((badge) => (
                <div key={badge} className="flex items-center gap-3">
                  <div
                    className="w-2 h-2"
                    style={{ backgroundColor: '#E5C55C' }}
                  />
                  <span
                    className="text-[0.8125rem] tracking-[0.1em] uppercase opacity-80"
                    style={{ color: '#F5E6A3' }}
                  >
                    {badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA with honeycomb */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ backgroundColor: '#1a1d2e' }}
      >
        {/* Honeycomb pattern */}
        <div
          className="absolute inset-0"
          style={{ backgroundImage: honeycombPattern }}
        />

        <div className="container-editorial relative z-10 text-center">
          <h2
            className="font-display text-[2rem] mb-6"
            style={{ color: '#F5E6A3' }}
          >
            Discuss your staffing requirements
          </h2>
          <p
            className="text-[1.0625rem] leading-relaxed mb-10 max-w-2xl mx-auto opacity-75"
            style={{ color: '#F5F4F0' }}
          >
            Contact us to talk through your needs. We&apos;ll discuss suitability and availability
            to find the right healthcare assistants for your setting.
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 text-[0.9375rem] font-semibold no-underline transition-all"
            style={{
              backgroundColor: '#E5C55C',
              color: '#1a1d2e',
              boxShadow: '0 4px 24px rgba(229, 197, 92, 0.25)'
            }}
          >
            Contact us
          </Link>
        </div>
      </section>
    </>
  );
}
