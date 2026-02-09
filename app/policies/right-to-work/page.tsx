import Link from 'next/link';
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config/site';

export const metadata: Metadata = {
  title: 'Right to Work Policy',
  description: 'How we verify that candidates have the legal right to work in the United Kingdom.',
};

export default function RightToWorkPolicyPage() {
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
            Right to Work Policy
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
                {siteConfig.name} is committed to preventing illegal working in the United Kingdom.
                We verify the right to work status of all candidates before any work placement
                begins, in compliance with the Immigration, Asylum and Nationality Act 2006 and
                subsequent legislation.
              </p>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                Our verification process
              </h2>
              <p className="mb-4">
                Before any candidate is placed in work, we conduct a Right to Work check. This
                involves:
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  <strong>Document review:</strong> Obtaining original documents from the Home
                  Office approved list that demonstrate the candidate&apos;s right to work
                </li>
                <li>
                  <strong>Verification:</strong> Checking that documents are genuine, belong to
                  the candidate, and allow them to do the type of work being offered
                </li>
                <li>
                  <strong>Recording:</strong> Taking clear copies of documents and recording the
                  date the check was made
                </li>
                <li>
                  <strong>Online checks:</strong> Where applicable, using the Home Office online
                  Right to Work checking service with the candidate&apos;s share code
                </li>
              </ol>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                Acceptable documents
              </h2>
              <p className="mb-4">
                We accept documents from List A or List B as specified by the Home Office:
              </p>
              <h3 className="font-display text-lg text-soft-gold/80 mb-3 mt-6">
                List A documents (unlimited right to work)
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>UK or Irish passport (current or expired)</li>
                <li>Certificate of registration or naturalisation as a British citizen</li>
                <li>Permanent Residence Card or EU Settlement Scheme status</li>
              </ul>

              <h3 className="font-display text-lg text-soft-gold/80 mb-3 mt-6">
                List B documents (time-limited right to work)
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Current Biometric Residence Permit</li>
                <li>Current passport with valid visa</li>
                <li>Immigration Status Document with photograph</li>
                <li>Application Registration Card (with right to work)</li>
              </ul>
              <p className="mt-4">
                For candidates with time-limited right to work, we conduct follow-up checks
                before the expiry date of their permission.
              </p>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                Online Right to Work checks
              </h2>
              <p>
                Where candidates hold digital immigration status (such as EU Settlement Scheme
                status or an eVisa), we use the Home Office online checking service. Candidates
                are asked to provide a share code, which allows us to verify their status
                directly with the Home Office. This is the only way to check certain types of
                immigration status.
              </p>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                Record keeping
              </h2>
              <p className="mb-4">
                We retain copies of Right to Work documents for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The duration of the candidate&apos;s engagement with us</li>
                <li>A further 2 years after the engagement ends</li>
              </ul>
              <p className="mt-4">
                This is in accordance with Home Office requirements and provides a statutory
                excuse against liability for a civil penalty in the event of illegal working.
              </p>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                Our responsibilities
              </h2>
              <p className="mb-4">
                We are responsible for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Conducting Right to Work checks before any candidate begins work
                </li>
                <li>
                  Ensuring all staff involved in recruitment understand their legal obligations
                </li>
                <li>
                  Treating all candidates fairly and not discriminating based on nationality or
                  immigration status
                </li>
                <li>
                  Conducting follow-up checks for time-limited workers
                </li>
                <li>
                  Reporting any concerns about fraudulent documents to the relevant authorities
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                Non-discrimination
              </h2>
              <p>
                We apply our Right to Work checks consistently to all candidates, regardless of
                their nationality, ethnicity, or perceived immigration status. We do not make
                assumptions about a person&apos;s right to work based on their appearance, name,
                or accent. Doing so would be discriminatory and unlawful.
              </p>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                Contact us
              </h2>
              <p>
                If you have questions about our Right to Work verification process, please
                contact us at{' '}
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
