'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { HoneycombCluster } from '@/components/decorative';

// Platform preview card component with glassmorphism
function GlassCard({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`
        relative rounded-2xl backdrop-blur-xl
        bg-gradient-to-br from-white/[0.08] to-white/[0.02]
        border border-white/[0.1]
        shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]
        transition-all duration-700 ease-out
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

// Hexagon check icon
function HexCheck({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2L21.5 7.5V16.5L12 22L2.5 16.5V7.5L12 2Z"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Passport verification item
function PassportItem({ label, verified = true }: { label: string; verified?: boolean }) {
  return (
    <div className="flex items-center gap-3 py-2">
      <HexCheck className={`w-5 h-5 ${verified ? 'text-emerald-400' : 'text-amber-400'}`} />
      <span className="text-sm text-pearl-soft/80">{label}</span>
    </div>
  );
}

// Candidate card for Colony dashboard preview
function CandidatePreviewCard({
  name,
  role,
  match,
  avatar,
}: {
  name: string;
  role: string;
  match: number;
  avatar: string;
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] transition-colors">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center text-gold font-semibold text-sm">
        {avatar}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-pearl-soft truncate">{name}</div>
        <div className="text-xs text-pearl-soft/50">{role}</div>
      </div>
      <div className="text-xs font-medium text-gold">{match}%</div>
    </div>
  );
}

// Trust signal badge
function TrustBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-3 text-pearl-soft/70">
      <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
        {icon}
      </div>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* Hero Section - Full viewport with platform preview */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-void">
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
              <GlassCard
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] z-20"
                delay={200}
              >
                {/* Header bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.08]">
                  <div className="w-6 h-6 rounded bg-gold/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2L3 7v11h14V7l-7-5z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gold">Medibee</span>
                </div>

                {/* Profile content */}
                <div className="p-5">
                  {/* Avatar and name */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold/40 to-gold/10 flex items-center justify-center overflow-hidden border-2 border-gold/30">
                      <span className="text-2xl font-bold text-gold">SM</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-pearl">Sarah Mitchell</h3>
                      <p className="text-sm text-pearl-soft/60">Healthcare Assistant, London, UK</p>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="flex gap-1 mb-4 p-1 rounded-lg bg-white/[0.04]">
                    <button className="flex-1 px-3 py-2 text-xs font-medium rounded-md bg-gold/20 text-gold">
                      Summary
                    </button>
                    <button className="flex-1 px-3 py-2 text-xs font-medium rounded-md text-pearl-soft/50 hover:text-pearl-soft/80 transition-colors">
                      Skills
                    </button>
                    <button className="flex-1 px-3 py-2 text-xs font-medium rounded-md text-pearl-soft/50 hover:text-pearl-soft/80 transition-colors">
                      Experience
                    </button>
                  </div>

                  {/* Summary content */}
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-pearl-soft/40 uppercase tracking-wider mb-1">Summary</div>
                      <p className="text-sm text-pearl-soft/70 leading-relaxed">
                        HCA ideally required for ad-hoc support roles within NHS acute care, with preference
                        for ambulatory and clinic settings in Greater London.
                      </p>
                    </div>

                    <div>
                      <div className="text-xs text-pearl-soft/40 uppercase tracking-wider mb-2">Skills</div>
                      <div className="flex flex-wrap gap-2">
                        {['Elderly Care', 'Mental Health', 'First Aid'].map((skill) => (
                          <span key={skill} className="px-2 py-1 text-xs rounded bg-white/[0.06] text-pearl-soft/70">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Left: Passport Card */}
              <GlassCard
                className="absolute left-0 top-8 w-[220px] z-10 transform -rotate-3 hover:rotate-0 transition-transform duration-500"
                delay={400}
              >
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-5 rounded bg-emerald-500/20 flex items-center justify-center">
                      <svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-emerald-400">Your Medibee Passport</span>
                  </div>

                  {/* QR Code placeholder */}
                  <div className="w-20 h-20 mx-auto mb-4 rounded-lg bg-white/[0.9] p-2 flex items-center justify-center">
                    <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCI+PHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjZmZmIi8+PHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9IiMwMDAiLz48cmVjdCB4PSI1MCIgeT0iMTAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iIzAwMCIvPjxyZWN0IHg9IjEwIiB5PSI1MCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjMDAwIi8+PHJlY3QgeD0iMzAiIHk9IjMwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9IiMwMDAiLz48L3N2Zz4=')] bg-contain bg-center bg-no-repeat" />
                  </div>

                  {/* Verification items */}
                  <div className="space-y-0">
                    <PassportItem label="Verified DBS Check" />
                    <PassportItem label="ID Verified" />
                    <PassportItem label="Right to Work Approved" />
                    <PassportItem label="Training Completed" />
                    <PassportItem label="Documents Up to Date" />
                  </div>
                </div>
              </GlassCard>

              {/* Right: Colony Dashboard Card */}
              <GlassCard
                className="absolute right-0 top-16 w-[240px] z-10 transform rotate-2 hover:rotate-0 transition-transform duration-500"
                delay={600}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded bg-indigo-500/20 flex items-center justify-center">
                        <svg className="w-3 h-3 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                        </svg>
                      </div>
                      <span className="text-xs font-medium text-indigo-400">Colony Dashboard</span>
                    </div>
                    <span className="text-[10px] text-pearl-soft/40">Active Candidates</span>
                  </div>

                  {/* Filter tabs */}
                  <div className="flex gap-2 mb-4 text-[10px]">
                    <span className="px-2 py-1 rounded bg-indigo-500/20 text-indigo-300">Shortlisted</span>
                    <span className="px-2 py-1 rounded text-pearl-soft/40">All Matches</span>
                  </div>

                  {/* Candidate list */}
                  <div className="space-y-2">
                    <CandidatePreviewCard name="Hannah P." role="Senior HCA" match={98} avatar="HP" />
                    <CandidatePreviewCard name="Jenny C." role="Care Assistant" match={94} avatar="JC" />
                    <CandidatePreviewCard name="Claire S." role="Mental Health HCA" match={91} avatar="CS" />
                  </div>
                </div>
              </GlassCard>
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

      {/* Platform Features Section */}
      <section className="py-24 bg-void-light relative overflow-hidden">
        <HoneycombCluster position="bottom-right" variant="filled" scale={1.2} opacityMultiplier={1} />

        <div className="container-editorial relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-semibold mb-4 text-pearl">
              One Platform, <span className="text-gold">Three Solutions</span>
            </h2>
            <p className="text-pearl-soft/60 max-w-2xl mx-auto">
              Whether you&apos;re starting your healthcare career or managing a care facility,
              Medibee has the right tier for you.
            </p>
          </div>

          {/* Tier cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Cell - Free */}
            <div className="group relative p-8 rounded-2xl bg-void border border-white/[0.08] hover:border-cell/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-cell/10 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-cell" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M12 2L21.5 7.5V16.5L12 22L2.5 16.5V7.5L12 2Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-pearl mb-2">Cell</h3>
              <p className="text-sm text-pearl-soft/50 mb-4">Free tier</p>
              <p className="text-pearl-soft/70 mb-6 text-sm leading-relaxed">
                Start your professional profile and showcase your credentials to potential employers.
              </p>
              <ul className="space-y-3 text-sm text-pearl-soft/60">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cell" />
                  Basic profile
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cell" />
                  Credential storage
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cell" />
                  Job alerts
                </li>
              </ul>
            </div>

            {/* Hive - Premium */}
            <div className="group relative p-8 rounded-2xl bg-gradient-to-b from-gold/[0.08] to-void border border-gold/30 hover:border-gold/50 transition-all transform hover:-translate-y-1">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gold text-void text-xs font-semibold">
                Most Popular
              </div>
              <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L21.5 7.5V16.5L12 22L2.5 16.5V7.5L12 2Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gold mb-2">Hive</h3>
              <p className="text-sm text-gold/60 mb-4">Premium candidate</p>
              <p className="text-pearl-soft/70 mb-6 text-sm leading-relaxed">
                Unlock your Medibee Passport and get priority matching with top employers.
              </p>
              <ul className="space-y-3 text-sm text-pearl-soft/60">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  Medibee Passport
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  Priority matching
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  Verified credentials
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  Skills tracking
                </li>
              </ul>
            </div>

            {/* Colony - Employer */}
            <div className="group relative p-8 rounded-2xl bg-void border border-white/[0.08] hover:border-colony/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-colony/10 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-colony" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M12 2L21.5 7.5V16.5L12 22L2.5 16.5V7.5L12 2Z" />
                  <path d="M12 8L16 10.5V15.5L12 18L8 15.5V10.5L12 8Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-pearl mb-2">Colony</h3>
              <p className="text-sm text-colony/70 mb-4">For employers</p>
              <p className="text-pearl-soft/70 mb-6 text-sm leading-relaxed">
                Access verified healthcare professionals with instant compliance checking.
              </p>
              <ul className="space-y-3 text-sm text-pearl-soft/60">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-colony" />
                  Candidate search
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-colony" />
                  Compliance dashboard
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-colony" />
                  Team management
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-colony" />
                  Analytics
                </li>
              </ul>
            </div>
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
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-6">
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
