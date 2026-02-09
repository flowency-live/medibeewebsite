import Link from 'next/link';
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config/site';

export const metadata: Metadata = {
  title: 'Modern Slavery Statement',
  description: 'Our commitment to preventing modern slavery in our operations and supply chain.',
};

export default function ModernSlaveryPage() {
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
            Modern Slavery Statement
          </h1>
          <p className="font-body text-body-md text-mist/60 mb-12">
            Financial year ending: February 2026
          </p>

          <div className="prose-container space-y-8 font-body text-body-md text-mist">
            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                Introduction
              </h2>
              <p>
                This statement is made pursuant to Section 54 of the Modern Slavery Act 2015 and
                sets out the steps {siteConfig.name} has taken to ensure that modern slavery and
                human trafficking are not taking place in our business or supply chains.
              </p>
              <p className="mt-4">
                Modern slavery is a crime and a violation of fundamental human rights. It takes
                various forms, including slavery, servitude, forced and compulsory labour, and
                human trafficking.
              </p>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                About our business
              </h2>
              <p>
                {siteConfig.name} is a healthcare recruitment agency specialising in the supply of
                healthcare assistants to NHS trusts, private hospitals, care homes, and other
                healthcare providers across the United Kingdom. We are committed to acting
                ethically and with integrity in all our business relationships.
              </p>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                Our policies
              </h2>
              <p className="mb-4">
                We have implemented the following policies to identify and prevent modern slavery
                in our operations:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Recruitment policy:</strong> We verify the identity and right to work
                  of all candidates, ensuring they are not being exploited or coerced
                </li>
                <li>
                  <strong>Whistleblowing policy:</strong> We encourage staff and candidates to
                  report any concerns about unethical practices
                </li>
                <li>
                  <strong>Safeguarding policy:</strong> We have processes to identify and respond
                  to signs of exploitation or abuse
                </li>
                <li>
                  <strong>Supplier due diligence:</strong> We assess the risk of modern slavery
                  in our supply chain before entering into contracts
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                Due diligence in recruitment
              </h2>
              <p className="mb-4">
                As a recruitment agency, we recognise the heightened risk of labour exploitation
                in our sector. We take the following steps to prevent modern slavery:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Verifying the identity of all candidates using original documentation
                </li>
                <li>
                  Conducting face-to-face or video interviews to check candidates are acting of
                  their own free will
                </li>
                <li>
                  Paying candidates directly into their own bank accounts, never to third parties
                </li>
                <li>
                  Providing clear information about pay rates, working conditions, and employment
                  rights
                </li>
                <li>
                  Being alert to signs of exploitation, such as candidates appearing fearful,
                  controlled, or lacking identity documents
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                Supply chain
              </h2>
              <p>
                Our supply chain is relatively limited, primarily consisting of office supplies,
                IT services, and professional services. We conduct due diligence on suppliers
                and expect them to comply with all applicable laws, including the Modern Slavery
                Act. We include modern slavery clauses in our contracts with suppliers.
              </p>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                Training
              </h2>
              <p>
                All staff involved in recruitment receive training on:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>
                  What modern slavery is and how to recognise the signs
                </li>
                <li>
                  The legal requirements of the Modern Slavery Act 2015
                </li>
                <li>
                  Our internal processes for reporting and responding to concerns
                </li>
                <li>
                  The importance of verifying identity and right to work documents
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                Reporting concerns
              </h2>
              <p>
                If you have concerns about modern slavery or human trafficking in relation to
                our business or supply chain, please report them immediately to{' '}
                <a href={`mailto:${siteConfig.email}`} className="text-rich-gold hover:text-soft-gold underline">
                  {siteConfig.email}
                </a>
                . All reports will be taken seriously and investigated appropriately.
              </p>
              <p className="mt-4">
                You can also report concerns anonymously to the Modern Slavery Helpline on{' '}
                <strong>08000 121 700</strong>.
              </p>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                Effectiveness
              </h2>
              <p>
                We monitor the effectiveness of our measures through:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>
                  Regular review of our recruitment and verification processes
                </li>
                <li>
                  Monitoring reports and concerns raised through our whistleblowing procedure
                </li>
                <li>
                  Annual review and update of this statement
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                Approval
              </h2>
              <p>
                This statement has been approved by the director of {siteConfig.name} and will be
                reviewed and updated annually.
              </p>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
