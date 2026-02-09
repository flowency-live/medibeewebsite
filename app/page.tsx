import Link from 'next/link';
import Image from 'next/image';
import {
  HoneycombPattern,
  HoneycombCluster,
  HoneycombFade,
} from '@/components/decorative';
import { AudienceCard, HowItWorksColumn } from '@/components/shared';
import { HexagonBullet } from '@/components/ui';

// Grain texture for hero
const grainTexture = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center bg-midnight">
        {/* Background Image - decorative */}
        <Image
          src="/manchester-skyline.jpg"
          alt=""
          fill
          className="object-cover object-center"
          priority
          aria-hidden="true"
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(29,32,50,0.92) 0%, rgba(61,66,89,0.85) 50%, rgba(29,32,50,0.95) 100%)',
          }}
        />

        {/* Subtle grain texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: grainTexture }}
        />

        {/* Decorative hexagon clusters - visible brand signature */}
        <HoneycombCluster position="top-right" variant="filled" scale={1.5} opacityMultiplier={2} animate />
        <HoneycombCluster position="top-left" variant="outline" scale={1.25} opacityMultiplier={1.8} animate />

        {/* Content */}
        <div className="relative z-10 container-editorial py-20 md:py-32">
          <div className="max-w-[800px]">
            {/* Eyebrow with gold accent */}
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-[3px] bg-rich-gold" />
              <span className="text-[0.8125rem] tracking-[0.2em] uppercase font-medium text-rich-gold">
                Healthcare Recruitment
              </span>
            </div>

            <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] mb-6 tracking-[-0.02em] text-soft-gold">
              Specialist healthcare assistant recruitment you can trust
            </h1>

            <p className="text-xl mb-12 max-w-[580px] leading-relaxed text-mist opacity-85">
              Care recruitment built on trust. Personal service from start to
              finish. When you contact Medibee, you speak directly to the
              decision maker, 24 hours a day.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="px-10 py-[1.125rem] text-[0.9375rem] font-semibold tracking-[0.02em] no-underline transition-all bg-rich-gold text-midnight"
                style={{ boxShadow: '0 4px 24px rgba(229, 197, 92, 0.25)' }}
              >
                Get in touch
              </Link>
              <Link
                href="/services"
                className="px-10 py-[1.125rem] text-[0.9375rem] font-medium tracking-[0.02em] no-underline border-2 bg-transparent text-soft-gold"
                style={{ borderColor: 'rgba(245, 230, 163, 0.4)' }}
              >
                Our services
              </Link>
            </div>
          </div>
        </div>

        {/* Gold line at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-rich-gold" />
      </section>

      {/* Audience Split - Decision Fork - Plain background for visual rest */}
      <section className="py-24 relative bg-midnight-light overflow-hidden">
        {/* Subtle hexagon cluster for brand consistency */}
        <HoneycombCluster position="bottom-right" variant="filled" scale={1} opacityMultiplier={1.2} />

        <div className="container-editorial relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-display text-[2.5rem] mb-4 text-soft-gold">
              How can we help you?
            </h2>
            <p className="text-mist/80">
              Select your situation to find out more
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <AudienceCard
              type="provider"
              title="I'm a care provider"
              description="Find reliable healthcare assistants for your NHS trust, care home, or private healthcare organisation."
              imageSrc="/consultation.png"
              imageAlt="Care provider consultation"
              href="/services"
              ctaText="Learn more"
            />

            <AudienceCard
              type="hca"
              title="I'm a healthcare assistant"
              description="Join an agency that values you, with flexible work and honest communication."
              imageSrc="/hca-female.png"
              imageAlt="Healthcare assistant in Medibee uniform"
              href="/work-with-us"
              ctaText="Work with us"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 relative bg-deep-slate">
        <HoneycombFade direction="left-to-right" opacity={0.08} />

        <div className="container-editorial relative z-10">
          <div className="text-center mb-16">
            <div className="w-[60px] h-[3px] mx-auto mb-8 bg-rich-gold" />
            <h2 className="font-display text-[2.5rem] text-soft-gold">
              How it works
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-16 max-w-4xl mx-auto">
            <HowItWorksColumn
              type="provider"
              title="For care providers"
              steps={[
                { text: 'Contact us with your requirements' },
                { text: 'We discuss suitability and availability' },
                { text: 'We introduce vetted healthcare assistants' },
              ]}
            />

            <HowItWorksColumn
              type="hca"
              title="For healthcare assistants"
              steps={[
                { text: 'Register your interest' },
                { text: 'We complete checks and understand your preferences' },
                { text: 'We match you to suitable work' },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Trust & Compliance - Plain background for visual rest */}
      <section className="py-20 relative bg-midnight">
        <div className="container-editorial relative z-10">
          <div className="max-w-[700px] mx-auto text-center">
            <div className="w-[60px] h-[3px] mx-auto mb-8 bg-rich-gold" />
            <h2 className="font-display text-[2rem] mb-6 text-soft-gold">
              Nationwide support you can rely on
            </h2>
            <p className="text-[1.0625rem] leading-relaxed mb-12 opacity-75 text-mist">
              Nationwide support for NHS and private healthcare providers, with
              a clear focus on suitability, safeguarding, and reliability.
            </p>

            {/* Compliance badges */}
            <div className="flex justify-center gap-12 flex-wrap">
              {['DBS Checked', 'Right to Work Verified', 'ICO Registered'].map(
                (badge) => (
                  <div key={badge} className="flex items-center gap-3">
                    <HexagonBullet />
                    <span className="text-[0.8125rem] tracking-[0.1em] uppercase opacity-80 text-soft-gold">
                      {badge}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Split with honeycomb pattern */}
      <section className="grid md:grid-cols-2">
        {/* For Clients */}
        <div className="px-8 py-20 md:px-12 lg:px-16 relative overflow-hidden bg-midnight-light">
          <HoneycombPattern variant="gold" opacity={0.08} />

          <div className="relative z-10 max-w-[400px]">
            <span className="text-xs tracking-[0.15em] uppercase mb-4 block text-rich-gold">
              For Clients
            </span>
            <h2 className="font-display text-[2rem] leading-tight mb-4 text-soft-gold">
              Reliable Staffing Support
            </h2>
            <p className="leading-relaxed mb-8 opacity-70 text-mist">
              MediBee acts as an extension of your care team, helping maintain
              continuity and quality of care.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 text-[0.9375rem] font-semibold no-underline bg-mist text-midnight"
              style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}
            >
              Find Staff Now
            </Link>
          </div>
        </div>

        {/* For Carers - Gold with honeycomb */}
        <div className="px-8 py-20 md:px-12 lg:px-16 relative overflow-hidden bg-rich-gold">
          {/* Background image */}
          <Image
            src="/hca-male.png"
            alt=""
            fill
            className="object-cover object-top opacity-[0.12]"
            aria-hidden="true"
          />

          <HoneycombPattern variant="dark" opacity={0.12} />

          <div className="relative z-10 max-w-[400px]">
            <span className="text-xs tracking-[0.15em] uppercase mb-4 block opacity-70 text-midnight">
              For Carers
            </span>
            <h2 className="font-display text-[2rem] leading-tight mb-4 text-midnight">
              Flexible Work, Local Opportunities
            </h2>
            <p className="leading-relaxed mb-8 opacity-75 text-midnight">
              We offer consistent work that fits around your availability, with
              full support through onboarding.
            </p>
            <Link
              href="/candidate/register"
              className="inline-block px-8 py-4 text-[0.9375rem] font-semibold no-underline bg-midnight text-soft-gold"
              style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}
            >
              Join Our Team
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Portal Access */}
      <section className="py-5 bg-midnight border-t border-soft-gold/10" aria-labelledby="portal-heading">
        <h2 id="portal-heading" className="sr-only">Portal Access</h2>
        <div className="container-editorial flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-12">
          <span className="text-xs uppercase tracking-[0.1em] text-mist/70">
            Already registered?
          </span>
          <div className="flex items-center gap-8">
            <Link
              href="/candidate/login"
              className="text-sm text-mist/80 hover:text-soft-gold no-underline transition-colors"
            >
              Candidate Portal
            </Link>
            <span
              className="w-px h-4 bg-mist/20"
              aria-hidden="true"
            />
            <Link
              href="/client/login"
              className="text-sm text-mist/80 hover:text-soft-gold no-underline transition-colors"
            >
              Client Portal
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
