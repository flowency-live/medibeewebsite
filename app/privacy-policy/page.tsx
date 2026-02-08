import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Medibee Recruitment Ltd collects, stores, and uses personal data.',
};

export default function PrivacyPolicyPage() {
  return (
    <section className="section-spacing bg-deep-slate">
      <div className="container-editorial">
        <div className="max-w-3xl mx-auto">
          <span className="rule-gold mb-8" />
          <h1 className="font-display text-display-lg text-soft-gold mb-6">
            Privacy Policy
          </h1>
          <p className="font-body text-body-md text-mist/60 mb-12">
            Last updated: February 2026
          </p>

          <div className="prose-container space-y-8 font-body text-body-md text-mist">
            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                Who we are
              </h2>
              <p>
                {siteConfig.name} is a recruitment provider specialising in healthcare assistants.
                We are registered with the Information Commissioner&apos;s Office (ICO).
              </p>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                What data we collect
              </h2>
              <p className="mb-4">
                We collect information you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name and contact details (email, phone number)</li>
                <li>Employment history and qualifications</li>
                <li>DBS check information</li>
                <li>Right to Work documentation</li>
                <li>References from previous employers</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                How we use your data
              </h2>
              <p className="mb-4">
                We use your personal data to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Match healthcare assistants with suitable work opportunities</li>
                <li>Complete pre-employment checks and verification</li>
                <li>Communicate with you about opportunities and updates</li>
                <li>Comply with legal and regulatory requirements</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                How we store your data
              </h2>
              <p>
                Your data is stored securely in accordance with UK GDPR requirements. We retain
                personal data only for as long as necessary for the purposes for which it was
                collected, or as required by law.
              </p>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                Your rights
              </h2>
              <p className="mb-4">
                Under UK GDPR, you have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Request data portability</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                Contact us
              </h2>
              <p>
                If you have questions about this privacy policy or wish to exercise your rights,
                please contact us at{' '}
                <a href={`mailto:${siteConfig.email}`} className="text-rich-gold hover:text-soft-gold underline">
                  {siteConfig.email}
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                Complaints
              </h2>
              <p>
                If you are not satisfied with how we handle your data, you have the right to
                lodge a complaint with the Information Commissioner&apos;s Office (ICO) at{' '}
                <a href="https://ico.org.uk" className="text-rich-gold hover:text-soft-gold underline">
                  ico.org.uk
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
