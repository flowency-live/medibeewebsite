import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config/site';

export const metadata: Metadata = {
  title: 'Complaints Procedure',
  description:
    'How to raise a complaint with Medibee Recruitment Ltd and how we will handle it.',
};

export default function ComplaintsPage() {
  return (
    <section className="section-spacing bg-deep-slate">
      <div className="container-editorial">
        <div className="max-w-3xl">
          <span className="rule-gold mb-8" />
          <h1 className="font-display text-display-lg text-soft-gold mb-6">
            Complaints Procedure
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
                {siteConfig.name} is committed to providing a high standard of service. If you
                are not satisfied with any aspect of our service, we want to know so we can put
                things right.
              </p>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                How to make a complaint
              </h2>
              <p className="mb-4">
                You can submit a complaint by:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Email:{' '}
                  <a href={`mailto:${siteConfig.email}`} className="text-rich-gold hover:text-soft-gold underline">
                    {siteConfig.email}
                  </a>
                </li>
                <li>Writing to our registered office address</li>
              </ul>
              <p className="mt-4">
                Please include as much detail as possible, including dates, names, and a
                description of what happened.
              </p>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                What happens next
              </h2>
              <div className="space-y-6">
                <div className="border-l-[3px] border-rich-gold pl-6">
                  <h3 className="font-display text-body-md text-mist mb-2">
                    Step 1: Acknowledgement
                  </h3>
                  <p className="text-mist/80">
                    We will acknowledge your complaint within 2 working days.
                  </p>
                </div>

                <div className="border-l-[3px] border-rich-gold pl-6">
                  <h3 className="font-display text-body-md text-mist mb-2">
                    Step 2: Investigation
                  </h3>
                  <p className="text-mist/80">
                    We will investigate your complaint thoroughly and fairly. This may involve
                    speaking to relevant parties and reviewing any relevant documentation.
                  </p>
                </div>

                <div className="border-l-[3px] border-rich-gold pl-6">
                  <h3 className="font-display text-body-md text-mist mb-2">
                    Step 3: Response
                  </h3>
                  <p className="text-mist/80">
                    We aim to provide a full response within 10 working days. If the matter is
                    complex and requires more time, we will keep you informed of progress.
                  </p>
                </div>

                <div className="border-l-[3px] border-rich-gold pl-6">
                  <h3 className="font-display text-body-md text-mist mb-2">
                    Step 4: Resolution
                  </h3>
                  <p className="text-mist/80">
                    We will explain our findings and any actions we have taken or will take. If
                    appropriate, we will apologise and explain how we will prevent similar issues
                    in future.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                If you are not satisfied
              </h2>
              <p>
                If you are not satisfied with our response, you may escalate your complaint to
                the relevant regulatory body or seek independent advice.
              </p>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                Contact
              </h2>
              <p>
                To submit a complaint, contact us at{' '}
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
