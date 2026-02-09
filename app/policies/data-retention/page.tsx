import Link from 'next/link';
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config/site';

export const metadata: Metadata = {
  title: 'Data Retention Policy',
  description: 'How long we keep candidate and client data, and how deletion requests are handled.',
};

export default function DataRetentionPolicyPage() {
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
            Data Retention Policy
          </h1>
          <p className="font-body text-body-md text-mist/60 mb-12">
            Last updated: February 2026
          </p>

          <div className="prose-container space-y-8 font-body text-body-md text-mist">
            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                Overview
              </h2>
              <p>
                {siteConfig.name} is committed to retaining personal data only for as long as
                necessary to fulfil the purposes for which it was collected, or as required by law.
                This policy explains how long we keep different types of data and how you can
                request deletion.
              </p>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                Candidate data
              </h2>
              <p className="mb-4">
                We retain candidate data for the following periods:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Active candidates:</strong> Data is retained for the duration of your
                  registration with us, plus 2 years from your last engagement or contact
                </li>
                <li>
                  <strong>Unsuccessful applications:</strong> Data is retained for 6 months from
                  the date of the application decision
                </li>
                <li>
                  <strong>DBS certificates:</strong> We do not retain copies of DBS certificates.
                  We record the certificate number, date of issue, and outcome only
                </li>
                <li>
                  <strong>Right to Work documents:</strong> Copies are retained for 2 years after
                  your engagement with us ends, as required by UK immigration law
                </li>
                <li>
                  <strong>Training records:</strong> Retained for 3 years from the date of completion
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                Client data
              </h2>
              <p className="mb-4">
                We retain client data for the following periods:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Active clients:</strong> Data is retained for the duration of the
                  business relationship, plus 6 years from the last transaction (for tax purposes)
                </li>
                <li>
                  <strong>Contact information:</strong> Retained for 2 years after the end of the
                  business relationship, unless you opt out of marketing communications sooner
                </li>
                <li>
                  <strong>Contracts and invoices:</strong> Retained for 6 years from the date of
                  the transaction, as required by UK tax law
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                Enquiry data
              </h2>
              <p>
                If you contact us through our website or by email without becoming a candidate or
                client, we retain your enquiry data for 12 months from the date of contact. This
                allows us to follow up and provide you with information about our services.
              </p>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                Legal and regulatory requirements
              </h2>
              <p>
                In some cases, we may be required to retain data for longer periods to comply with
                legal, regulatory, or contractual obligations. This includes data related to
                safeguarding incidents, complaints, or legal disputes.
              </p>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                Requesting deletion
              </h2>
              <p className="mb-4">
                You have the right to request deletion of your personal data. To make a request:
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  Contact us at{' '}
                  <a href={`mailto:${siteConfig.email}`} className="text-rich-gold hover:text-soft-gold underline">
                    {siteConfig.email}
                  </a>{' '}
                  with &quot;Data Deletion Request&quot; in the subject line
                </li>
                <li>
                  Provide your full name and any other information that will help us locate your
                  records
                </li>
                <li>
                  We will verify your identity and respond within 30 days
                </li>
              </ol>
              <p className="mt-4">
                Please note that we may not be able to delete data where we have a legal obligation
                to retain it. In such cases, we will explain the reason and the retention period.
              </p>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                Secure disposal
              </h2>
              <p>
                When data reaches the end of its retention period, we securely dispose of it.
                Electronic records are permanently deleted, and physical documents are
                confidentially destroyed.
              </p>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                Contact us
              </h2>
              <p>
                If you have questions about our data retention practices, please contact us at{' '}
                <a href={`mailto:${siteConfig.email}`} className="text-rich-gold hover:text-soft-gold underline">
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
