'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CareProviderForm } from '@/components/forms';
import type { CareProviderEnquiry } from '@/lib/schemas/enquiry';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactPage() {
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  const handleCareProviderSubmit = async (data: CareProviderEnquiry) => {
    setSubmitState('submitting');
    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'care-provider', data }),
      });

      if (!response.ok) throw new Error('Failed to submit');
      setSubmitState('success');
    } catch {
      setSubmitState('error');
    }
  };

  if (submitState === 'success') {
    return (
      <section className="section-spacing bg-deep-slate">
        <div className="container-editorial">
          <div className="max-w-2xl mx-auto text-center">
            <span className="rule-gold mx-auto mb-8" />
            <h1 className="font-display text-display-lg text-soft-gold mb-6">
              Thank you for your enquiry
            </h1>
            <p className="font-body text-body-lg text-mist mb-4">
              We have received your message and will be in touch shortly.
            </p>
            <p className="font-body text-body-md text-mist/60">
              We aim to respond within 24 hours.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="section-spacing bg-deep-slate">
        <div className="container-editorial">
          <div className="max-w-3xl">
            <span className="rule-gold mb-8" />
            <h1 className="font-display text-display-lg text-soft-gold mb-6">
              Contact us
            </h1>
            <p className="font-body text-body-lg text-mist">
              Looking for reliable healthcare staffing? Tell us about your requirements
              and we&apos;ll discuss how Medibee can help.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-spacing bg-mist">
        <div className="container-editorial">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-display-sm text-ink mb-2">
              Care Provider Enquiry
            </h2>
            <p className="font-body text-body-md text-deep-slate mb-8">
              Tell us about your staffing requirements and we&apos;ll discuss how we can help.
            </p>

            {/* Error Message */}
            {submitState === 'error' && (
              <div className="bg-red-50 border-l-[3px] border-red-600 p-4 mb-8">
                <p className="font-body text-body-md text-red-600">
                  There was a problem submitting your enquiry. Please try again or contact us
                  directly.
                </p>
              </div>
            )}

            <CareProviderForm onSubmit={handleCareProviderSubmit} />

            {/* HCA redirect notice */}
            <div className="mt-8 pt-8 border-t border-neutral-grey/30">
              <p className="font-body text-body-md text-deep-slate text-center">
                Looking for work as a healthcare assistant?{' '}
                <Link
                  href="/candidate/register"
                  className="text-slate-blue hover:text-deep-slate underline font-medium"
                >
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
