import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui';

export default function HomePage() {
  return (
    <>
      {/* Hero Section - split background columns */}
      <section className="relative">
        {/* Split background - dark left, light right */}
        <div className="absolute inset-0 flex">
          <div className="w-full md:w-1/2 bg-deep-slate" />
          <div className="hidden md:block w-1/2 bg-mist" />
        </div>

        <div className="container-editorial relative z-10 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content - on dark side */}
            <div>
              <span className="rule-gold mb-8" />
              <h1 className="font-display text-display-lg text-soft-gold mb-6 text-balance">
                Specialist healthcare assistant recruitment you can trust
              </h1>
              <p className="font-body text-body-lg text-mist mb-8">
                Care recruitment built on trust. Personal service from start to finish.
                When you contact Medibee, you speak directly to the decision maker, 24 hours a day.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="bg-rich-gold text-ink hover:bg-soft-gold">
                  <Link href="/contact">Get in touch</Link>
                </Button>
                <Button variant="secondary" asChild className="border-soft-gold text-soft-gold hover:bg-soft-gold/10">
                  <Link href="/services">Our services</Link>
                </Button>
              </div>
            </div>

            {/* Hero Image - on light side, 25% larger than container */}
            <div className="flex items-center justify-center bg-mist md:bg-transparent p-8 md:p-0 md:-mr-[15%]">
              <Image
                src="/hero-background.png"
                alt="Medibee Recruitment - London skyline"
                width={1000}
                height={750}
                className="w-[125%] h-auto max-w-none"
                priority
              />
            </div>
          </div>
        </div>

        {/* Gold line below hero */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-rich-gold" />
      </section>

      {/* Audience Split */}
      <section className="section-spacing bg-slate-blue">
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
      <section className="section-spacing bg-deep-slate">
        <div className="container-editorial">
          <div className="text-center mb-12">
            <span className="rule-gold mx-auto mb-8" />
            <h2 className="font-display text-display-md text-soft-gold">
              How it works
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
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
      <section className="section-spacing bg-slate-blue">
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

      {/* CTA */}
      <section className="section-spacing bg-deep-slate">
        <div className="container-editorial text-center">
          <h2 className="font-display text-display-md text-soft-gold mb-6">
            Ready to get started?
          </h2>
          <p className="font-body text-body-lg text-mist/80 mb-8 max-w-2xl mx-auto">
            Complete the relevant contact form to discuss your requirements or register your interest.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-rich-gold text-ink hover:bg-soft-gold">
              <Link href="/contact">Contact us</Link>
            </Button>
            <Button variant="secondary" asChild className="border-soft-gold text-soft-gold hover:bg-soft-gold/10">
              <Link href="/candidate/register">Apply as HCA</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Portal Access */}
      <section className="py-8 bg-slate-blue border-t border-slate-blue-dark/30">
        <div className="container-editorial">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-center">
            <span className="font-body text-body-sm text-mist/60">
              Already registered?
            </span>
            <div className="flex gap-6">
              <Link
                href="/candidate/login"
                className="font-body text-ui-sm tracking-ui uppercase text-soft-gold hover:text-rich-gold transition-colors"
              >
                Candidate Login
              </Link>
              <span className="text-mist/30">|</span>
              <Link
                href="/client/login"
                className="font-body text-ui-sm tracking-ui uppercase text-soft-gold hover:text-rich-gold transition-colors"
              >
                Client Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
