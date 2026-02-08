import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui';

export default function HomePage() {
  return (
    <>
      {/* Hero Section - Full width background image */}
      <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center">
        {/* Background Image */}
        <Image
          src="/manchester-skyline.jpg"
          alt="Manchester skyline"
          fill
          className="object-cover object-center"
          priority
        />

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-deep-slate/75" />

        {/* Content */}
        <div className="relative z-10 container-editorial py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-display-lg md:text-[3.5rem] lg:text-[4rem] text-soft-gold mb-6 text-balance leading-tight">
              Specialist healthcare assistant recruitment you can trust
            </h1>
            <p className="font-body text-body-lg md:text-xl text-mist mb-10 max-w-2xl mx-auto">
              Care recruitment built on trust. Personal service from start to finish.
              When you contact Medibee, you speak directly to the decision maker, 24 hours a day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-rich-gold text-ink hover:bg-soft-gold px-8 py-4 text-base">
                <Link href="/contact">Get in touch</Link>
              </Button>
              <Button variant="secondary" asChild className="border-soft-gold text-soft-gold hover:bg-soft-gold/10 px-8 py-4 text-base">
                <Link href="/services">Our services</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Gold line below hero */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-rich-gold" />
      </section>

      {/* Audience Split */}
      <section className="section-spacing bg-deep-slate">
        <div className="container-editorial">
          <div className="text-center mb-12">
            <h2 className="font-display text-display-md text-soft-gold mb-4">
              How can we help you?
            </h2>
            <p className="font-body text-body-md text-mist">
              Select your situation to find out more
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Care Provider Card */}
            <Link
              href="/services"
              className="group block bg-deep-slate border-2 border-deep-slate hover:border-rich-gold transition-colors no-underline overflow-hidden"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/consultation.png"
                  alt="Care provider consultation"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-8">
                <span className="rule-gold mb-6" />
                <h3 className="font-display text-display-sm text-soft-gold mb-4">
                  I&apos;m a care provider
                </h3>
                <p className="font-body text-body-md text-mist mb-6">
                  Find reliable healthcare assistants for your NHS trust, care home,
                  or private healthcare organisation.
                </p>
                <span className="font-body text-body-sm text-rich-gold uppercase tracking-ui group-hover:text-soft-gold transition-colors">
                  Learn more →
                </span>
              </div>
            </Link>

            {/* HCA Card */}
            <Link
              href="/work-with-us"
              className="group block bg-deep-slate border-2 border-deep-slate hover:border-rich-gold transition-colors no-underline overflow-hidden"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/hca-female.png"
                  alt="Healthcare assistant in Medibee uniform"
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-8">
                <span className="rule-gold mb-6" />
                <h3 className="font-display text-display-sm text-soft-gold mb-4">
                  I&apos;m a healthcare assistant
                </h3>
                <p className="font-body text-body-md text-mist mb-6">
                  Join an agency that values you, with flexible work and honest communication.
                </p>
                <span className="font-body text-body-sm text-rich-gold uppercase tracking-ui group-hover:text-soft-gold transition-colors">
                  Work with us →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-spacing bg-slate-blue">
        <div className="container-editorial">
          <div className="text-center mb-12">
            <span className="rule-gold mx-auto mb-8" />
            <h2 className="font-display text-display-md text-soft-gold">
              How it works
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-24 max-w-4xl mx-auto">
            {/* For Care Providers */}
            <div>
              <h3 className="font-display text-display-sm text-mist mb-6">
                For care providers
              </h3>
              <ol className="space-y-6">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-rich-gold text-ink font-display text-body-lg flex items-center justify-center">
                    1
                  </span>
                  <div>
                    <p className="font-body text-body-md text-mist">
                      Contact us with your requirements
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-rich-gold text-ink font-display text-body-lg flex items-center justify-center">
                    2
                  </span>
                  <div>
                    <p className="font-body text-body-md text-mist">
                      We discuss suitability and availability
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-rich-gold text-ink font-display text-body-lg flex items-center justify-center">
                    3
                  </span>
                  <div>
                    <p className="font-body text-body-md text-mist">
                      We introduce vetted healthcare assistants
                    </p>
                  </div>
                </li>
              </ol>
            </div>

            {/* For Healthcare Assistants */}
            <div>
              <h3 className="font-display text-display-sm text-mist mb-6">
                For healthcare assistants
              </h3>
              <ol className="space-y-6">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-rich-gold text-ink font-display text-body-lg flex items-center justify-center">
                    1
                  </span>
                  <div>
                    <p className="font-body text-body-md text-mist">
                      Register your interest
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-rich-gold text-ink font-display text-body-lg flex items-center justify-center">
                    2
                  </span>
                  <div>
                    <p className="font-body text-body-md text-mist">
                      We complete checks and understand your preferences
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-rich-gold text-ink font-display text-body-lg flex items-center justify-center">
                    3
                  </span>
                  <div>
                    <p className="font-body text-body-md text-mist">
                      We match you to suitable work
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Compliance */}
      <section className="section-spacing bg-deep-slate">
        <div className="container-editorial">
          <div className="max-w-3xl mx-auto text-center">
            <span className="rule-gold mx-auto mb-8" />
            <h2 className="font-display text-display-md text-soft-gold mb-6">
              Nationwide support you can rely on
            </h2>
            <p className="font-body text-body-lg text-mist mb-8">
              Nationwide support for NHS and private healthcare providers, with a clear focus on
              suitability, safeguarding, and reliability.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-body-sm text-soft-gold/80 uppercase tracking-ui">
              <span>DBS Checked</span>
              <span>Right to Work Verified</span>
              <span>ICO Registered</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Split layout for each audience */}
      <section className="grid md:grid-cols-2">
        {/* For Clients - Solid slate background */}
        <div className="bg-slate-blue px-8 py-16 md:px-12 lg:px-16 md:py-20">
          <span className="font-body text-ui-xs tracking-wider uppercase text-rich-gold mb-4 block">
            For Clients
          </span>
          <h2 className="font-display text-display-sm md:text-display-md text-soft-gold mb-4 text-balance">
            Reliable Staffing Support
          </h2>
          <p className="font-body text-body-md text-mist/70 mb-8 max-w-md">
            MediBee acts as an extension of your care team, helping maintain continuity and quality of care.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-cream hover:bg-mist text-ink font-body text-body-sm font-medium py-3 px-6 no-underline transition-colors"
          >
            Find Staff Now
          </Link>
        </div>

        {/* For Carers - Image background with overlay */}
        <div className="relative bg-slate-blue-light px-8 py-16 md:px-12 lg:px-16 md:py-20 overflow-hidden">
          {/* Background image */}
          <Image
            src="/hca-female.png"
            alt=""
            fill
            className="object-cover object-top opacity-20"
            aria-hidden="true"
          />
          <div className="relative z-10">
            <span className="font-body text-ui-xs tracking-wider uppercase text-rich-gold mb-4 block">
              For Carers
            </span>
            <h2 className="font-display text-display-sm md:text-display-md text-soft-gold mb-4 text-balance">
              Flexible Work, Local Opportunities
            </h2>
            <p className="font-body text-body-md text-mist/80 mb-8 max-w-md">
              We offer consistent work that fits around your availability, with full support through onboarding.
            </p>
            <Link
              href="/candidate/register"
              className="inline-block bg-rich-gold hover:bg-soft-gold text-ink font-body text-body-sm font-medium py-3 px-6 no-underline transition-colors"
            >
              Join Our Team
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Portal Access - Minimal strip */}
      <section className="bg-deep-slate py-6">
        <div className="container-editorial flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8">
          <span className="font-body text-ui-xs text-mist/40 uppercase tracking-wider">
            Already registered?
          </span>
          <div className="flex items-center gap-6">
            <Link
              href="/candidate/login"
              className="font-body text-body-sm text-mist/60 hover:text-soft-gold transition-colors no-underline"
            >
              Candidate Portal
            </Link>
            <span className="w-px h-4 bg-mist/20" aria-hidden="true" />
            <Link
              href="/client/login"
              className="font-body text-body-sm text-mist/60 hover:text-soft-gold transition-colors no-underline"
            >
              Client Portal
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
