import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config/site';

export const metadata: Metadata = {
  title: 'Safeguarding Policy',
  description:
    'Medibee Recruitment Ltd is committed to safeguarding the welfare of vulnerable adults and children.',
};

export default function SafeguardingPage() {
  return (
    <section className="section-spacing">
      <div className="container-editorial">
        <div className="max-w-3xl">
          <span className="rule-gold mb-8" />
          <h1 className="font-display text-display-lg text-ink mb-6">
            Safeguarding Policy
          </h1>
          <p className="font-body text-body-md text-neutral-grey mb-12">
            Last updated: February 2026
          </p>

          <div className="prose-container space-y-8 font-body text-body-md text-ink">
            <section>
              <h2 className="font-display text-display-sm text-ink mb-4">
                Our commitment
              </h2>
              <p>
                {siteConfig.name} is committed to safeguarding the welfare of vulnerable adults
                and children. We recognise that safeguarding is everyone&apos;s responsibility
                and we take our obligations seriously.
              </p>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-ink mb-4">
                Pre-employment checks
              </h2>
              <p className="mb-4">
                All healthcare assistants registered with Medibee undergo comprehensive
                pre-employment checks, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Enhanced DBS checks</li>
                <li>Right to Work verification</li>
                <li>Reference checks from previous employers</li>
                <li>Identity verification</li>
                <li>Qualification verification where applicable</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-ink mb-4">
                Ongoing responsibilities
              </h2>
              <p>
                We maintain clear policies and procedures for safeguarding. Our staff understand
                their responsibilities and know how to recognise and report concerns.
                Responsibility for role-specific training and supervision remains with the care
                provider.
              </p>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-ink mb-4">
                Raising concerns
              </h2>
              <p className="mb-4">
                If you have a safeguarding concern about any member of staff supplied by
                Medibee, you should:
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  Report immediately to the care provider&apos;s designated safeguarding lead
                </li>
                <li>
                  Contact Medibee at{' '}
                  <a href={`mailto:${siteConfig.email}`} className="text-slate-blue underline">
                    {siteConfig.email}
                  </a>
                </li>
                <li>
                  If there is immediate risk, contact the appropriate emergency services
                </li>
              </ol>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-ink mb-4">
                Our role
              </h2>
              <p>
                Medibee Recruitment Ltd is a recruitment provider, not a regulated care service.
                We ensure our candidates are vetted and suitable, but day-to-day safeguarding
                responsibilities, supervision, and care governance remain with the care provider.
              </p>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-ink mb-4">
                Contact
              </h2>
              <p>
                For safeguarding queries or to report a concern, contact us at{' '}
                <a href={`mailto:${siteConfig.email}`} className="text-slate-blue underline">
                  {siteConfig.email}
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
