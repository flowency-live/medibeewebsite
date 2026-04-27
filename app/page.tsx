'use client';

import Link from 'next/link';
import Image from 'next/image';
import { HoneycombCluster, HoneycombPattern } from '@/components/decorative';
import {
  TierCard,
  PassportPreviewCard,
  ProfilePreviewCard,
  ColonyDashboardPreviewCard,
} from '@/components/ui';

// Trust signal badge with hover glow effect
function TrustBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-3 text-pearl-soft/70 group">
      <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold transition-all duration-300 group-hover:bg-gold/20 group-hover:border-gold/40 group-hover:shadow-gold-glow-sm">
        {icon}
      </div>
      <span className="text-sm font-medium transition-colors group-hover:text-pearl-soft">{label}</span>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* Hero Section - Full viewport with platform preview */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-void noise-overlay">
        {/* Background: Professional healthcare image with heavy overlay */}
        <Image
          src="/manchester-skyline.jpg"
          alt=""
          fill
          className="object-cover object-center"
          priority
          aria-hidden="true"
        />

        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 30% 20%, rgba(13,13,13,0.75) 0%, rgba(13,13,13,0.92) 50%, rgba(13,13,13,0.98) 100%)',
          }}
        />

        {/* Honeycomb pattern overlay for brand texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='52' viewBox='0 0 60 52' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 15v22L30 52 0 37V15L30 0z' fill='none' stroke='%23D4AF37' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 52px',
          }}
        />

        {/* Decorative hexagon clusters */}
        <HoneycombCluster position="top-left" variant="outline" scale={1.2} opacityMultiplier={1.5} />
        <HoneycombCluster position="top-right" variant="filled" scale={1.4} opacityMultiplier={2} />

        {/* Hero Content */}
        <div className="relative z-10 container-editorial py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left: Hero text */}
            <div className="text-center lg:text-left">
              <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.1] mb-6 tracking-tight">
                <span className="text-pearl">Connecting </span>
                <span className="text-gold">Healthcare Professionals</span>
                <span className="text-pearl"> & </span>
                <span className="text-gold">Employers</span>
              </h1>

              <p className="text-lg lg:text-xl text-pearl-soft/70 mb-10 max-w-xl mx-auto lg:mx-0">
                Join the most trusted platform for compliant healthcare hiring.
              </p>

              {/* Dual CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/candidate/register"
                  className="px-8 py-4 text-base font-semibold no-underline transition-all bg-gold text-void hover:bg-gold-light rounded-lg"
                  style={{ boxShadow: '0 4px 24px rgba(212, 175, 55, 0.3)' }}
                >
                  Join as a Candidate
                </Link>
                <Link
                  href="/client/register"
                  className="px-8 py-4 text-base font-medium no-underline border-2 border-pearl-soft/30 text-pearl-soft hover:text-gold hover:border-gold transition-colors rounded-lg bg-transparent"
                >
                  Join as an Employer
                </Link>
              </div>
            </div>

            {/* Right: Platform Preview Mockups - 3 floating cards */}
            <div className="relative h-[500px] lg:h-[550px] hidden md:block">
              {/* Center: Profile Card */}
              <ProfilePreviewCard
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] z-20"
                delay={200}
              />

              {/* Left: Passport Card */}
              <PassportPreviewCard
                className="absolute left-0 top-8 w-[220px] z-10 transform -rotate-3 hover:rotate-0 transition-transform duration-500"
                delay={400}
              />

              {/* Right: Colony Dashboard Card */}
              <ColonyDashboardPreviewCard
                className="absolute right-0 top-16 w-[240px] z-10 transform rotate-2 hover:rotate-0 transition-transform duration-500"
                delay={600}
              />
            </div>
          </div>
        </div>

        {/* Trust signals bar at bottom */}
        <div className="relative z-10 border-t border-white/[0.06] bg-gradient-to-r from-void/80 via-void-elevated/50 to-void/80 backdrop-blur-sm">
          <div className="container-editorial py-6">
            <div className="flex flex-wrap justify-center gap-8 lg:gap-16">
              <TrustBadge
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                    />
                  </svg>
                }
                label="Secure & Compliant"
              />
              <TrustBadge
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                    />
                  </svg>
                }
                label="Streamlined Hiring"
              />
              <TrustBadge
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                }
                label="Trusted by the Industry"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Medibee Membership Section */}
      <section className="py-24 bg-brand-dark relative overflow-hidden">
        {/* Honeycomb background - signature denim texture */}
        <HoneycombPattern variant="gold" opacity={0.06} />

        <div className="container-editorial relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-semibold mb-4 text-brand-pearl">
              Medibee <span className="text-brand-gold">Membership</span>
            </h2>
            <p className="text-brand-pearl-muted max-w-2xl mx-auto">
              Tailored plans for healthcare professionals and employers.
            </p>
          </div>

          {/* Tier cards with staggered animation */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Cell - Free */}
            <TierCard
              tier="cell"
              price="FREE"
              features={[
                'Free Profile',
                'Basic Visibility',
                'For Healthcare Workers',
              ]}
              ctaText="Get Started"
              ctaHref="/candidate/register"
              ctaVariant="filled"
              footer="Need verification? Upgrade to Hive"
              className="animate-fade-in-up stagger-1"
            />

            {/* Hive - £4.99/mo */}
            <div className="relative animate-fade-in-up stagger-2">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-brand-gold text-brand-dark text-xs font-bold tracking-wide z-10 animate-glow-pulse">
                MOST POPULAR
              </div>
              <TierCard
                tier="hive"
                price="£4.99/mo"
                priceSubtext="billed monthly"
                features={[
                  'Full Platform Access',
                  'Vault & Passport Tools',
                  'Stay Verified & Compliant',
                  'For Healthcare Workers',
                ]}
                ctaText="Get Started"
                ctaHref="/candidate/register?tier=hive"
                ctaVariant="filled"
                footer="Unlock advanced features"
                className="border-brand-gold/40"
              />
            </div>

            {/* Colony - From £100/mo */}
            <TierCard
              tier="colony"
              price="From £100/mo"
              priceSubtext="billed monthly"
              features={[
                'Find & Recruit Talent',
                'Unlock Full Profiles',
                'Streamline Hiring Process',
              ]}
              ctaText="Contact Us"
              ctaHref="/contact?type=colony"
              ctaVariant="outline"
              footer="Custom solutions for employers"
              className="animate-fade-in-up stagger-3"
            />
          </div>
        </div>
      </section>

      {/* How It Works - Simplified */}
      <section className="py-24 bg-void relative">
        <div className="container-editorial">
          <div className="text-center mb-16">
            <div className="w-16 h-[2px] bg-gold mx-auto mb-6" />
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-semibold text-pearl mb-4">
              Get Started in Minutes
            </h2>
            <p className="text-pearl-soft/60 max-w-xl mx-auto">
              Join thousands of healthcare professionals and employers already on the platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: '01',
                title: 'Create Your Profile',
                desc: 'Sign up and build your professional profile with credentials and experience.',
              },
              {
                step: '02',
                title: 'Get Verified',
                desc: 'Complete verification checks to unlock your Medibee Passport.',
              },
              {
                step: '03',
                title: 'Start Connecting',
                desc: 'Match with opportunities or find the perfect candidate for your team.',
              },
            ].map((item, index) => (
              <div
                key={item.step}
                className={`text-center animate-fade-in-up stagger-${index + 2}`}
              >
                <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-6 transition-all duration-300 hover:bg-gold/20 hover:border-gold/40 hover:shadow-gold-glow-sm">
                  <span className="text-2xl font-bold text-gold">{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-pearl mb-2">{item.title}</h3>
                <p className="text-sm text-pearl-soft/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-b from-void to-void-elevated relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='70' viewBox='0 0 80 70' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 0L80 20v30L40 70 0 50V20L40 0z' fill='none' stroke='%23D4AF37' stroke-width='0.5'/%3E%3C/svg%3E")`,
              backgroundSize: '80px 70px',
            }}
          />
        </div>

        <div className="container-editorial relative z-10 text-center">
          <h2 className="font-display text-[clamp(2rem,5vw,3rem)] font-semibold mb-6">
            <span className="text-pearl">Ready to Transform </span>
            <span className="text-gold">Healthcare Hiring?</span>
          </h2>
          <p className="text-pearl-soft/60 text-lg mb-10 max-w-2xl mx-auto">
            Join the platform that&apos;s making compliant healthcare recruitment simple, transparent, and effective.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/candidate/register"
              className="px-10 py-4 text-base font-semibold no-underline transition-all bg-gold text-void hover:bg-gold-light rounded-lg"
              style={{ boxShadow: '0 4px 24px rgba(212, 175, 55, 0.3)' }}
            >
              Get Started Free
            </Link>
            <Link
              href="/contact"
              className="px-10 py-4 text-base font-medium no-underline border border-pearl-soft/20 text-pearl-soft hover:text-gold hover:border-gold transition-colors rounded-lg"
            >
              Talk to Sales
            </Link>
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap justify-center gap-12 mt-16">
            <div>
              <div className="text-3xl font-bold text-gold">500+</div>
              <div className="text-sm text-pearl-soft/50">Healthcare Professionals</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gold">50+</div>
              <div className="text-sm text-pearl-soft/50">Care Providers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gold">24/7</div>
              <div className="text-sm text-pearl-soft/50">Platform Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* Portal Access Footer */}
      <section className="py-4 bg-void border-t border-white/[0.06]">
        <div className="container-editorial flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8">
          <span className="text-xs uppercase tracking-wider text-pearl-soft/40">Already have an account?</span>
          <div className="flex items-center gap-6">
            <Link href="/candidate/login" className="text-sm text-pearl-soft/60 hover:text-gold no-underline transition-colors">
              Candidate Login
            </Link>
            <span className="w-px h-4 bg-pearl-soft/20" />
            <Link href="/client/login" className="text-sm text-pearl-soft/60 hover:text-gold no-underline transition-colors">
              Employer Login
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
