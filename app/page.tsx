import Link from 'next/link';
import Image from 'next/image';

/**
 * MAIN HOMEPAGE - Variant B styling applied
 *
 * Key styling from Variant B:
 * - Deeper, richer color palette (#1a1d2e, #2a2e42, #3d4259)
 * - Grain texture overlay on hero
 * - Better section contrast and rhythm
 * - Gold accent dividers and badges
 * - Honeycomb pattern backgrounds
 * - Elevated cards with shadows
 * - One light "breathing" section
 */

// Honeycomb SVG pattern (proper hexagons)
const honeycombPattern = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23E5C55C' fill-opacity='0.08'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

// Grain texture
const grainTexture = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

export default function HomePage() {
  return (
    <>
      {/* Hero Section - Full width with grain texture */}
      <section
        className="relative min-h-[85vh] flex items-center"
        style={{ backgroundColor: '#1a1d2e' }}
      >
        {/* Background Image */}
        <Image
          src="/manchester-skyline.jpg"
          alt="Manchester skyline"
          fill
          className="object-cover object-center"
          priority
        />

        {/* Gradient overlay - deeper, with vignette effect */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(29,32,50,0.92) 0%, rgba(61,66,89,0.85) 50%, rgba(29,32,50,0.95) 100%)'
          }}
        />

        {/* Subtle grain texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: grainTexture }}
        />

        {/* Content */}
        <div className="relative z-10 container-editorial py-20 md:py-32">
          <div className="max-w-[800px]">
            {/* Eyebrow with gold accent */}
            <div className="flex items-center gap-4 mb-8">
              <span
                className="w-12 h-[3px]"
                style={{ backgroundColor: '#E5C55C' }}
              />
              <span
                className="text-[0.8125rem] tracking-[0.2em] uppercase font-medium"
                style={{ color: '#E5C55C' }}
              >
                Healthcare Recruitment
              </span>
            </div>

            <h1
              className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] mb-6 tracking-[-0.02em]"
              style={{ color: '#F5E6A3' }}
            >
              Specialist healthcare assistant recruitment you can trust
            </h1>

            <p
              className="text-xl mb-12 max-w-[580px] leading-relaxed opacity-85"
              style={{ color: '#F5F4F0' }}
            >
              Care recruitment built on trust. Personal service from start to finish.
              When you contact Medibee, you speak directly to the decision maker, 24 hours a day.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="px-10 py-[1.125rem] text-[0.9375rem] font-semibold tracking-[0.02em] no-underline transition-all"
                style={{
                  backgroundColor: '#E5C55C',
                  color: '#1a1d2e',
                  boxShadow: '0 4px 24px rgba(229, 197, 92, 0.25)'
                }}
              >
                Get in touch
              </Link>
              <Link
                href="/services"
                className="px-10 py-[1.125rem] text-[0.9375rem] font-medium tracking-[0.02em] no-underline border-2"
                style={{
                  backgroundColor: 'transparent',
                  color: '#F5E6A3',
                  borderColor: 'rgba(245, 230, 163, 0.4)'
                }}
              >
                Our services
              </Link>
            </div>
          </div>
        </div>

        {/* Gold line at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{ backgroundColor: '#E5C55C' }}
        />
      </section>

      {/* Audience Split - Decision Fork */}
      <section
        className="py-24 relative"
        style={{ backgroundColor: '#2a2e42' }}
      >
        <div className="container-editorial">
          <div className="text-center mb-16">
            <h2
              className="font-display text-[2.5rem] mb-4"
              style={{ color: '#F5E6A3' }}
            >
              How can we help you?
            </h2>
            <p style={{ color: '#F5F4F0', opacity: 0.6 }}>
              Select your situation to find out more
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Care Provider Card */}
            <Link
              href="/services"
              className="block no-underline overflow-hidden transition-all"
              style={{
                backgroundColor: '#1a1d2e',
                boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
                border: '1px solid rgba(229, 197, 92, 0.1)'
              }}
            >
              <div className="relative h-[280px] overflow-hidden">
                <Image
                  src="/consultation.png"
                  alt="Care provider consultation"
                  fill
                  className="object-cover object-center transition-transform duration-400 hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to top, rgba(26,29,46,1) 0%, transparent 60%)'
                  }}
                />
              </div>
              <div className="p-8">
                <div
                  className="w-10 h-[3px] mb-6"
                  style={{ backgroundColor: '#E5C55C' }}
                />
                <h3
                  className="font-display text-2xl mb-4"
                  style={{ color: '#F5E6A3' }}
                >
                  I&apos;m a care provider
                </h3>
                <p
                  className="mb-6 leading-relaxed"
                  style={{ color: '#F5F4F0', opacity: 0.7 }}
                >
                  Find reliable healthcare assistants for your NHS trust, care home,
                  or private healthcare organisation.
                </p>
                <span
                  className="text-sm font-medium inline-flex items-center gap-2"
                  style={{ color: '#E5C55C' }}
                >
                  Learn more
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* HCA Card */}
            <Link
              href="/work-with-us"
              className="block no-underline overflow-hidden transition-all"
              style={{
                backgroundColor: '#1a1d2e',
                boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
                border: '1px solid rgba(229, 197, 92, 0.1)'
              }}
            >
              <div className="relative h-[280px] overflow-hidden">
                <Image
                  src="/hca-female.png"
                  alt="Healthcare assistant in Medibee uniform"
                  fill
                  className="object-cover object-top transition-transform duration-400 hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to top, rgba(26,29,46,1) 0%, transparent 60%)'
                  }}
                />
              </div>
              <div className="p-8">
                <div
                  className="w-10 h-[3px] mb-6"
                  style={{ backgroundColor: '#E5C55C' }}
                />
                <h3
                  className="font-display text-2xl mb-4"
                  style={{ color: '#F5E6A3' }}
                >
                  I&apos;m a healthcare assistant
                </h3>
                <p
                  className="mb-6 leading-relaxed"
                  style={{ color: '#F5F4F0', opacity: 0.7 }}
                >
                  Join an agency that values you, with flexible work and honest communication.
                </p>
                <span
                  className="text-sm font-medium inline-flex items-center gap-2"
                  style={{ color: '#E5C55C' }}
                >
                  Work with us
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works - With better hierarchy */}
      <section
        className="py-24"
        style={{ backgroundColor: '#3d4259' }}
      >
        <div className="container-editorial">
          <div className="text-center mb-16">
            <div
              className="w-[60px] h-[3px] mx-auto mb-8"
              style={{ backgroundColor: '#E5C55C' }}
            />
            <h2
              className="font-display text-[2.5rem]"
              style={{ color: '#F5E6A3' }}
            >
              How it works
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-16 max-w-4xl mx-auto">
            {/* For Care Providers */}
            <div>
              <h3
                className="text-lg mb-8 uppercase tracking-[0.1em]"
                style={{ color: '#F5F4F0' }}
              >
                For care providers
              </h3>
              <ol className="space-y-8">
                {[
                  'Contact us with your requirements',
                  'We discuss suitability and availability',
                  'We introduce vetted healthcare assistants'
                ].map((step, index) => (
                  <li key={step} className="flex gap-6 items-start">
                    <span
                      className="flex-shrink-0 w-12 h-12 font-display text-xl font-semibold flex items-center justify-center"
                      style={{ backgroundColor: '#E5C55C', color: '#1a1d2e' }}
                    >
                      {index + 1}
                    </span>
                    <p
                      className="text-[1.0625rem] leading-normal pt-3 opacity-85"
                      style={{ color: '#F5F4F0' }}
                    >
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            {/* For Healthcare Assistants */}
            <div>
              <h3
                className="text-lg mb-8 uppercase tracking-[0.1em]"
                style={{ color: '#F5F4F0' }}
              >
                For healthcare assistants
              </h3>
              <ol className="space-y-8">
                {[
                  'Register your interest',
                  'We complete checks and understand your preferences',
                  'We match you to suitable work'
                ].map((step, index) => (
                  <li key={step} className="flex gap-6 items-start">
                    <span
                      className="flex-shrink-0 w-12 h-12 font-display text-xl font-semibold flex items-center justify-center"
                      style={{ backgroundColor: '#E5C55C', color: '#1a1d2e' }}
                    >
                      {index + 1}
                    </span>
                    <p
                      className="text-[1.0625rem] leading-normal pt-3 opacity-85"
                      style={{ color: '#F5F4F0' }}
                    >
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Compliance - Prominent */}
      <section
        className="py-20"
        style={{ backgroundColor: '#1a1d2e' }}
      >
        <div className="container-editorial">
          <div className="max-w-[700px] mx-auto text-center">
            <div
              className="w-[60px] h-[3px] mx-auto mb-8"
              style={{ backgroundColor: '#E5C55C' }}
            />
            <h2
              className="font-display text-[2rem] mb-6"
              style={{ color: '#F5E6A3' }}
            >
              Nationwide support you can rely on
            </h2>
            <p
              className="text-[1.0625rem] leading-relaxed mb-12 opacity-75"
              style={{ color: '#F5F4F0' }}
            >
              Nationwide support for NHS and private healthcare providers, with a clear focus on
              suitability, safeguarding, and reliability.
            </p>

            {/* Compliance badges */}
            <div className="flex justify-center gap-12 flex-wrap">
              {['DBS Checked', 'Right to Work Verified', 'ICO Registered'].map((badge) => (
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

      {/* Final CTA - Split with honeycomb pattern */}
      <section className="grid md:grid-cols-2">
        {/* For Clients - with honeycomb */}
        <div
          className="px-8 py-20 md:px-12 lg:px-16 relative overflow-hidden"
          style={{ backgroundColor: '#2a2e42' }}
        >
          {/* Honeycomb pattern */}
          <div
            className="absolute inset-0"
            style={{ backgroundImage: honeycombPattern }}
          />

          <div className="relative z-10 max-w-[400px]">
            <span
              className="text-xs tracking-[0.15em] uppercase mb-4 block"
              style={{ color: '#E5C55C' }}
            >
              For Clients
            </span>
            <h2
              className="font-display text-[2rem] leading-tight mb-4"
              style={{ color: '#F5E6A3' }}
            >
              Reliable Staffing Support
            </h2>
            <p
              className="leading-relaxed mb-8 opacity-70"
              style={{ color: '#F5F4F0' }}
            >
              MediBee acts as an extension of your care team, helping maintain continuity and quality of care.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 text-[0.9375rem] font-semibold no-underline"
              style={{
                backgroundColor: '#F8F7F4',
                color: '#1a1d2e',
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
              }}
            >
              Find Staff Now
            </Link>
          </div>
        </div>

        {/* For Carers - Gold with honeycomb */}
        <div
          className="px-8 py-20 md:px-12 lg:px-16 relative overflow-hidden"
          style={{ backgroundColor: '#E5C55C' }}
        >
          {/* Background image */}
          <Image
            src="/hca-male.png"
            alt=""
            fill
            className="object-cover object-top opacity-[0.12]"
            aria-hidden="true"
          />

          {/* Honeycomb pattern (darker for gold bg) */}
          <div
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%231a1d2e' fill-opacity='0.6'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />

          <div className="relative z-10 max-w-[400px]">
            <span
              className="text-xs tracking-[0.15em] uppercase mb-4 block opacity-70"
              style={{ color: '#1a1d2e' }}
            >
              For Carers
            </span>
            <h2
              className="font-display text-[2rem] leading-tight mb-4"
              style={{ color: '#1a1d2e' }}
            >
              Flexible Work, Local Opportunities
            </h2>
            <p
              className="leading-relaxed mb-8 opacity-75"
              style={{ color: '#1a1d2e' }}
            >
              We offer consistent work that fits around your availability, with full support through onboarding.
            </p>
            <Link
              href="/candidate/register"
              className="inline-block px-8 py-4 text-[0.9375rem] font-semibold no-underline"
              style={{
                backgroundColor: '#1a1d2e',
                color: '#F5E6A3',
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
              }}
            >
              Join Our Team
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Portal Access - Minimal strip */}
      <section
        className="py-5"
        style={{
          backgroundColor: '#1a1d2e',
          borderTop: '1px solid rgba(245, 230, 163, 0.1)'
        }}
      >
        <div className="container-editorial flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-12">
          <span
            className="text-xs uppercase tracking-[0.1em] opacity-40"
            style={{ color: '#F5F4F0' }}
          >
            Already registered?
          </span>
          <div className="flex items-center gap-8">
            <Link
              href="/candidate/login"
              className="text-sm opacity-60 hover:opacity-100 no-underline transition-opacity"
              style={{ color: '#F5F4F0' }}
            >
              Candidate Portal
            </Link>
            <span
              className="w-px h-4"
              style={{ backgroundColor: 'rgba(245,244,240,0.2)' }}
              aria-hidden="true"
            />
            <Link
              href="/client/login"
              className="text-sm opacity-60 hover:opacity-100 no-underline transition-opacity"
              style={{ color: '#F5F4F0' }}
            >
              Client Portal
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
