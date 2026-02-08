import Link from 'next/link';
import type { Metadata } from 'next';
import { Button } from '@/components/ui';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Medibee Recruitment Ltd was created to do healthcare recruitment properly. Personal, honest, and reliable.',
};

const VALUES = [
  {
    title: 'Clear and consistent communication',
    description: 'You&apos;ll always know where you stand. No chasing for updates or unclear responses.',
  },
  {
    title: 'Accountability at every stage',
    description: 'We take responsibility for the service we provide and remain directly accessible.',
  },
  {
    title: 'Focus on suitability',
    description: 'We match the right people to the right settings, not just filling roles.',
  },
  {
    title: 'Long-term relationships',
    description: 'We build lasting partnerships with both clients and healthcare assistants.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-spacing bg-white">
        <div className="container-editorial">
          <div className="max-w-3xl">
            <span className="rule-gold mb-8" />
            <h1 className="font-display text-display-lg text-ink mb-6">
              About Medibee
            </h1>
            <p className="font-body text-body-lg text-deep-slate">
              Medibee Recruitment Ltd was created to do healthcare recruitment properly.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-spacing">
        <div className="container-editorial">
          <div className="max-w-3xl">
            <h2 className="font-display text-display-md text-ink mb-6">
              Our story
            </h2>
            <div className="space-y-6 font-body text-body-lg text-deep-slate">
              <p>
                Medibee was founded out of frustration with how many recruitment agencies treat
                both healthcare staff and care providers.
              </p>
              <p>
                Too often, people are treated like numbers, communication is poor, and decisions
                are made without understanding the realities of care environments.
              </p>
              <p>
                We believe healthcare recruitment should be personal, honest, and reliable. As a
                business, we take responsibility for the service we provide and remain directly
                accessible to the people we work with.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What This Means */}
      <section className="section-spacing bg-white">
        <div className="container-editorial">
          <div className="max-w-4xl">
            <span className="rule-gold mb-8" />
            <h2 className="font-display text-display-md text-ink mb-10">
              What this means in practice
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {VALUES.map((value) => (
                <div key={value.title} className="border-l-[3px] border-rich-gold pl-6">
                  <h3 className="font-display text-display-sm text-ink mb-2">
                    {value.title}
                  </h3>
                  <p className="font-body text-body-md text-deep-slate">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="section-spacing">
        <div className="container-editorial">
          <div className="max-w-3xl">
            <h2 className="font-display text-display-md text-ink mb-6">
              Nationwide coverage
            </h2>
            <p className="font-body text-body-lg text-deep-slate">
              Medibee Recruitment Ltd operates nationwide across the UK, supporting both NHS and
              private sector healthcare providers.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-deep-slate">
        <div className="container-editorial text-center">
          <h2 className="font-display text-display-md text-mist mb-6">
            Get in touch
          </h2>
          <p className="font-body text-body-lg text-mist/80 mb-8 max-w-2xl mx-auto">
            Whether you&apos;re a care provider looking for reliable staff or a healthcare
            assistant looking for work, we&apos;d love to hear from you.
          </p>
          <Button asChild className="bg-soft-gold text-ink hover:bg-rich-gold">
            <Link href="/contact">Contact us</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
