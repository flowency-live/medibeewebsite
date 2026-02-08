import Link from 'next/link';
import { Button } from '@/components/ui';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="section-spacing bg-white">
        <div className="container-editorial">
          <div className="max-w-3xl">
            <span className="rule-gold mb-8" />
            <h1 className="font-display text-display-lg text-ink mb-6 text-balance">
              Specialist healthcare assistant recruitment you can trust
            </h1>
            <p className="font-body text-body-lg text-deep-slate mb-8">
              Care recruitment built on trust. Personal service from start to finish.
              When you contact Medibee, you speak directly to the decision maker, 24 hours a day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild>
                <Link href="/contact">Get in touch</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/services">Our services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Audience Split */}
      <section className="section-spacing">
        <div className="container-editorial">
          <div className="text-center mb-12">
            <h2 className="font-display text-display-md text-ink mb-4">
              How can we help you?
            </h2>
            <p className="font-body text-body-md text-deep-slate">
              Select your situation to find out more
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Care Provider Card */}
            <Link
              href="/services"
              className="group block bg-white p-8 border-2 border-neutral-grey hover:border-deep-slate transition-colors"
            >
              <span className="rule-gold mb-6" />
              <h3 className="font-display text-display-sm text-ink mb-4">
                I&apos;m a care provider
              </h3>
              <p className="font-body text-body-md text-deep-slate mb-6">
                Find reliable healthcare assistants for your NHS trust, care home,
                or private healthcare organisation.
              </p>
              <span className="font-body text-body-sm text-slate-blue uppercase tracking-ui group-hover:text-deep-slate transition-colors">
                Learn more →
              </span>
            </Link>

            {/* HCA Card */}
            <Link
              href="/work-with-us"
              className="group block bg-white p-8 border-2 border-neutral-grey hover:border-deep-slate transition-colors"
            >
              <span className="rule-gold mb-6" />
              <h3 className="font-display text-display-sm text-ink mb-4">
                I&apos;m a healthcare assistant
              </h3>
              <p className="font-body text-body-md text-deep-slate mb-6">
                Join an agency that values you, with flexible work and honest communication.
              </p>
              <span className="font-body text-body-sm text-slate-blue uppercase tracking-ui group-hover:text-deep-slate transition-colors">
                Work with us →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-spacing bg-white">
        <div className="container-editorial">
          <div className="text-center mb-12">
            <span className="rule-gold mx-auto mb-8" />
            <h2 className="font-display text-display-md text-ink">
              How it works
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* For Care Providers */}
            <div>
              <h3 className="font-display text-display-sm text-ink mb-6">
                For care providers
              </h3>
              <ol className="space-y-6">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-soft-gold text-ink font-display text-body-lg flex items-center justify-center">
                    1
                  </span>
                  <div>
                    <p className="font-body text-body-md text-ink">
                      Contact us with your requirements
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-soft-gold text-ink font-display text-body-lg flex items-center justify-center">
                    2
                  </span>
                  <div>
                    <p className="font-body text-body-md text-ink">
                      We discuss suitability and availability
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-soft-gold text-ink font-display text-body-lg flex items-center justify-center">
                    3
                  </span>
                  <div>
                    <p className="font-body text-body-md text-ink">
                      We introduce vetted healthcare assistants
                    </p>
                  </div>
                </li>
              </ol>
            </div>

            {/* For Healthcare Assistants */}
            <div>
              <h3 className="font-display text-display-sm text-ink mb-6">
                For healthcare assistants
              </h3>
              <ol className="space-y-6">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-soft-gold text-ink font-display text-body-lg flex items-center justify-center">
                    1
                  </span>
                  <div>
                    <p className="font-body text-body-md text-ink">
                      Register your interest
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-soft-gold text-ink font-display text-body-lg flex items-center justify-center">
                    2
                  </span>
                  <div>
                    <p className="font-body text-body-md text-ink">
                      We complete checks and understand your preferences
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-soft-gold text-ink font-display text-body-lg flex items-center justify-center">
                    3
                  </span>
                  <div>
                    <p className="font-body text-body-md text-ink">
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
      <section className="section-spacing">
        <div className="container-editorial">
          <div className="max-w-3xl mx-auto text-center">
            <span className="rule-gold mx-auto mb-8" />
            <h2 className="font-display text-display-md text-ink mb-6">
              Nationwide support you can rely on
            </h2>
            <p className="font-body text-body-lg text-deep-slate mb-8">
              Nationwide support for NHS and private healthcare providers, with a clear focus on
              suitability, safeguarding, and reliability.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-body-sm text-neutral-grey uppercase tracking-ui">
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
          <h2 className="font-display text-display-md text-mist mb-6">
            Ready to get started?
          </h2>
          <p className="font-body text-body-lg text-mist/80 mb-8 max-w-2xl mx-auto">
            Complete the relevant contact form to discuss your requirements or register your interest.
          </p>
          <Button asChild className="bg-soft-gold text-ink hover:bg-rich-gold">
            <Link href="/contact">Contact us</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
