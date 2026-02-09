import Link from 'next/link';
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config/site';

export const metadata: Metadata = {
  title: 'Equality, Diversity & Inclusion Policy',
  description: 'Our commitment to fair treatment and equal opportunities for all candidates, clients, and staff.',
};

export default function EqualityDiversityPage() {
  return (
    <section className="section-spacing bg-deep-slate">
      <div className="container-editorial">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/policies"
            className="inline-flex items-center gap-2 text-sm text-mist/60 hover:text-soft-gold mb-8 no-underline transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Policies
          </Link>

          <h1 className="font-display text-display-lg text-soft-gold mb-6">
            Equality, Diversity & Inclusion Policy
          </h1>
          <p className="font-body text-body-md text-mist/60 mb-12">
            Last updated: February 2026
          </p>

          <div className="prose-container space-y-8 font-body text-body-md text-mist">
            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                Our commitment
              </h2>
              <p>
                {siteConfig.name} is committed to promoting equality, diversity, and inclusion in
                all aspects of our work. We believe that everyone deserves to be treated with
                dignity and respect, regardless of their background or personal characteristics.
              </p>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                Policy statement
              </h2>
              <p className="mb-4">
                We will not discriminate against any individual on the grounds of:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Age</li>
                <li>Disability</li>
                <li>Gender reassignment</li>
                <li>Marriage and civil partnership</li>
                <li>Pregnancy and maternity</li>
                <li>Race (including colour, nationality, ethnic or national origin)</li>
                <li>Religion or belief</li>
                <li>Sex</li>
                <li>Sexual orientation</li>
              </ul>
              <p className="mt-4">
                These are the protected characteristics under the Equality Act 2010.
              </p>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                For our candidates
              </h2>
              <p className="mb-4">
                We are committed to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Treating all candidates fairly throughout the recruitment process
                </li>
                <li>
                  Making reasonable adjustments to support candidates with disabilities
                </li>
                <li>
                  Providing equal access to work opportunities based on skills, qualifications,
                  and suitability
                </li>
                <li>
                  Challenging discrimination, harassment, or victimisation in any form
                </li>
                <li>
                  Ensuring our job advertisements are accessible and free from discriminatory
                  language
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                For our clients
              </h2>
              <p className="mb-4">
                We work with our clients to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Supply candidates based solely on their ability to meet the requirements of
                  the role
                </li>
                <li>
                  Refuse requests that discriminate against candidates based on protected
                  characteristics
                </li>
                <li>
                  Support inclusive recruitment practices
                </li>
                <li>
                  Report any concerns about discriminatory practices in client workplaces
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                Training and awareness
              </h2>
              <p>
                All staff involved in recruitment decisions receive training on equality,
                diversity, and unconscious bias. We regularly review our practices to ensure
                they remain fair and inclusive.
              </p>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                Monitoring and review
              </h2>
              <p>
                We monitor diversity data (where provided voluntarily by candidates) to identify
                any patterns that may indicate barriers to equal opportunities. This information
                is used solely to improve our processes and is kept confidential.
              </p>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                Raising concerns
              </h2>
              <p>
                If you believe you have been treated unfairly or have witnessed discrimination,
                we encourage you to raise your concern. You can contact us at{' '}
                <a href={`mailto:${siteConfig.email}`} className="text-rich-gold hover:text-soft-gold underline">
                  {siteConfig.email}
                </a>{' '}
                or submit a{' '}
                <Link href="/complaints" className="text-rich-gold hover:text-soft-gold underline">
                  formal complaint
                </Link>
                . All concerns will be taken seriously and investigated appropriately.
              </p>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                Legal framework
              </h2>
              <p>
                This policy is aligned with the Equality Act 2010 and related UK employment
                legislation. We review this policy annually to ensure it remains current and
                effective.
              </p>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
