import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Button } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Work With Us',
  description:
    'Join Medibee Recruitment Ltd. Healthcare assistants are valued, supported, and treated with respect. Flexible work across a range of care settings.',
};

const EXPECTATIONS = [
  'A recruitment agency focused only on healthcare assistants',
  'Clear communication and honest expectations',
  'Flexible work across a range of care settings',
  'Fair, transparent pay discussed privately',
  'Support from people who understand healthcare work',
];

const SETTINGS = [
  'Mental health units',
  'Acute hospital wards',
  'NHS services',
  'Private hospitals and clinics',
  'Care homes',
  'Supported living services',
  'End of life and hospice care',
];

export default function WorkWithUsPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-spacing bg-deep-slate">
        <div className="container-editorial">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <h1 className="font-display text-display-lg text-soft-gold mb-6">
                Work with Medibee
              </h1>
              <p className="font-body text-body-lg text-mist">
                At Medibee, healthcare assistants are valued, supported, and treated with respect.
              </p>
            </div>
            <div className="relative aspect-[3/4] max-w-sm mx-auto md:mx-0">
              <Image
                src="/hca-male.png"
                alt="Healthcare assistant in Medibee uniform"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 border-[3px] border-rich-gold translate-x-4 translate-y-4 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* What You Can Expect */}
      <section className="section-spacing bg-slate-blue">
        <div className="container-editorial">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h2 className="font-display text-display-md text-soft-gold mb-6">
                What you can expect
              </h2>
              <ul className="space-y-4">
                {EXPECTATIONS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="block w-2 h-2 mt-2 bg-rich-gold flex-shrink-0" />
                    <span className="font-body text-body-md text-mist">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-deep-slate p-8 border-l-[3px] border-rich-gold">
              <h3 className="font-display text-display-sm text-soft-gold mb-4">
                Care settings we work with
              </h3>
              <ul className="space-y-3 font-body text-body-md text-mist">
                {SETTINGS.map((setting) => (
                  <li key={setting}>{setting}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Healthcare Assistants Choose Us */}
      <section className="section-spacing bg-deep-slate">
        <div className="container-editorial">
          <div className="max-w-3xl mx-auto">
            <span className="rule-gold mb-8" />
            <h2 className="font-display text-display-md text-soft-gold mb-6">
              Why healthcare assistants choose Medibee
            </h2>
            <div className="space-y-6 font-body text-body-lg text-mist">
              <p>
                We specialise only in healthcare assistants and the care sector. We understand
                care environments and expectations.
              </p>
              <p>
                We offer flexible shifts and consistent opportunities. Pay is discussed clearly
                and fairly on an individual basis.
              </p>
              <p>
                We treat people with respect and provide proper support. Medibee is not a general
                recruitment agency. Healthcare is our sole focus.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="section-spacing bg-slate-blue">
        <div className="container-editorial">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-display-md text-soft-gold mb-6">
              Your safety matters
            </h2>
            <p className="font-body text-body-lg text-mist mb-8">
              We carry out DBS and Right to Work checks and operate with clear safeguarding
              policies to protect both our staff and the people they care for.
            </p>
            <div className="flex flex-wrap gap-6 text-body-sm text-soft-gold/80 uppercase tracking-ui">
              <span>DBS Checked</span>
              <span>Right to Work Verified</span>
              <span>Safeguarding Policies</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-deep-slate">
        <div className="container-editorial text-center">
          <h2 className="font-display text-display-md text-soft-gold mb-6">
            Register your interest
          </h2>
          <p className="font-body text-body-lg text-mist/80 mb-8 max-w-2xl mx-auto">
            Ready to work with a recruitment agency that values you? Register your interest
            and we&apos;ll be in touch to discuss opportunities.
          </p>
          <Button asChild className="bg-rich-gold text-ink hover:bg-soft-gold">
            <Link href="/candidate/register">Apply now</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
