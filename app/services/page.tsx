import Link from 'next/link';
import type { Metadata } from 'next';
import { Button } from '@/components/ui';

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

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-spacing bg-deep-slate">
        <div className="container-editorial">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-display-lg text-soft-gold mb-6">
              Services for care providers
            </h1>
            <p className="font-body text-body-lg text-mist">
              We supply reliable healthcare assistants into a wide range of care and clinical
              settings across the UK.
            </p>
          </div>
        </div>
      </section>

      {/* Settings We Support */}
      <section className="section-spacing bg-slate-blue">
        <div className="container-editorial">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h2 className="font-display text-display-md text-soft-gold mb-6">
                Settings we support
              </h2>
              <ul className="space-y-4">
                {SETTINGS.map((setting) => (
                  <li key={setting} className="flex items-start gap-3">
                    <span className="block w-2 h-2 mt-2 bg-rich-gold flex-shrink-0" />
                    <span className="font-body text-body-md text-mist">{setting}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-deep-slate p-8 border-l-[3px] border-rich-gold">
              <h3 className="font-display text-display-sm text-soft-gold mb-4">
                Why choose Medibee?
              </h3>
              <ul className="space-y-4 font-body text-body-md text-mist">
                <li>Personal service from a decision maker</li>
                <li>Clear communication at every stage</li>
                <li>Focus on suitability, not just filling roles</li>
                <li>24-hour availability for urgent cover</li>
                <li>Nationwide support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem We Solve */}
      <section className="section-spacing bg-deep-slate">
        <div className="container-editorial">
          <div className="max-w-3xl mx-auto">
            <span className="rule-gold mb-8" />
            <h2 className="font-display text-display-md text-soft-gold mb-6">
              The problems we solve
            </h2>
            <p className="font-body text-body-lg text-mist mb-8">
              Care providers often struggle with:
            </p>
            <ul className="space-y-4 font-body text-body-md text-mist">
              <li className="flex items-start gap-3">
                <span className="block w-2 h-2 mt-2 bg-rich-gold flex-shrink-0" />
                Finding reliable healthcare assistants
              </li>
              <li className="flex items-start gap-3">
                <span className="block w-2 h-2 mt-2 bg-rich-gold flex-shrink-0" />
                Agencies sending staff who are not a good fit for the setting
              </li>
              <li className="flex items-start gap-3">
                <span className="block w-2 h-2 mt-2 bg-rich-gold flex-shrink-0" />
                Short-notice cover creating operational stress
              </li>
            </ul>
            <p className="font-body text-body-lg text-mist mt-8">
              Medibee Recruitment Ltd exists to reduce this risk by supplying dependable, suitable
              healthcare assistants and maintaining clear communication throughout.
            </p>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="section-spacing bg-slate-blue">
        <div className="container-editorial">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-display-md text-soft-gold mb-6">
              Our commitment to compliance
            </h2>
            <p className="font-body text-body-lg text-mist mb-8">
              All healthcare assistants supplied by Medibee are vetted and supported in line with
              our compliance and safeguarding processes.
            </p>
            <div className="flex flex-wrap gap-6 text-body-sm text-soft-gold/80 uppercase tracking-ui">
              <span>DBS Checked</span>
              <span>Right to Work Verified</span>
              <span>ICO Registered</span>
              <span>Safeguarding Policies</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-deep-slate">
        <div className="container-editorial text-center">
          <h2 className="font-display text-display-md text-soft-gold mb-6">
            Discuss your staffing requirements
          </h2>
          <p className="font-body text-body-lg text-mist/80 mb-8 max-w-2xl mx-auto">
            Contact us to talk through your needs. We&apos;ll discuss suitability and availability
            to find the right healthcare assistants for your setting.
          </p>
          <Button asChild className="bg-rich-gold text-ink hover:bg-soft-gold">
            <Link href="/contact">Contact us</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
