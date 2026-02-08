'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import { CareProviderForm, HCAForm } from '@/components/forms';
import type { CareProviderEnquiry, HCAEnquiry } from '@/lib/schemas/enquiry';

type FormType = 'care-provider' | 'hca';
type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactPage() {
  const [activeForm, setActiveForm] = useState<FormType>('care-provider');
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

  const handleHCASubmit = async (data: HCAEnquiry) => {
    setSubmitState('submitting');
    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'hca', data }),
      });

      if (!response.ok) throw new Error('Failed to submit');
      setSubmitState('success');
    } catch {
      setSubmitState('error');
    }
  };

  if (submitState === 'success') {
    return (
      <section className="section-spacing">
        <div className="container-editorial">
          <div className="max-w-2xl mx-auto text-center">
            <span className="rule-gold mx-auto mb-8" />
            <h1 className="font-display text-display-lg text-ink mb-6">
              Thank you for your enquiry
            </h1>
            <p className="font-body text-body-lg text-deep-slate mb-4">
              We have received your message and will be in touch shortly.
            </p>
            <p className="font-body text-body-md text-neutral-grey">
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
      <section className="section-spacing bg-white">
        <div className="container-editorial">
          <div className="max-w-3xl">
            <span className="rule-gold mb-8" />
            <h1 className="font-display text-display-lg text-ink mb-6">
              Contact us
            </h1>
            <p className="font-body text-body-lg text-deep-slate">
              Whether you&apos;re a care provider looking for reliable staff or a healthcare
              assistant looking for flexible work, we&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-spacing">
        <div className="container-editorial">
          <div className="max-w-2xl mx-auto">
            {/* Form Selector */}
            <div className="flex border-b-2 border-neutral-grey mb-8">
              <button
                type="button"
                onClick={() => setActiveForm('care-provider')}
                className={`flex-1 py-4 font-body text-body-md uppercase tracking-ui transition-colors ${
                  activeForm === 'care-provider'
                    ? 'text-ink border-b-[3px] border-rich-gold -mb-[2px]'
                    : 'text-neutral-grey hover:text-deep-slate'
                }`}
              >
                Care Provider
              </button>
              <button
                type="button"
                onClick={() => setActiveForm('hca')}
                className={`flex-1 py-4 font-body text-body-md uppercase tracking-ui transition-colors ${
                  activeForm === 'hca'
                    ? 'text-ink border-b-[3px] border-rich-gold -mb-[2px]'
                    : 'text-neutral-grey hover:text-deep-slate'
                }`}
              >
                Healthcare Assistant
              </button>
            </div>

            {/* Error Message */}
            {submitState === 'error' && (
              <div className="bg-red-50 border-l-[3px] border-red-600 p-4 mb-8">
                <p className="font-body text-body-md text-red-600">
                  There was a problem submitting your enquiry. Please try again or contact us
                  directly.
                </p>
              </div>
            )}

            {/* Care Provider Form */}
            {activeForm === 'care-provider' && (
              <div>
                <h2 className="font-display text-display-sm text-ink mb-2">
                  Care Provider Enquiry
                </h2>
                <p className="font-body text-body-md text-deep-slate mb-8">
                  Tell us about your staffing requirements and we&apos;ll discuss how we can help.
                </p>
                <CareProviderForm onSubmit={handleCareProviderSubmit} />
              </div>
            )}

            {/* HCA Form */}
            {activeForm === 'hca' && (
              <div>
                <h2 className="font-display text-display-sm text-ink mb-2">
                  Register Your Interest
                </h2>
                <p className="font-body text-body-md text-deep-slate mb-8">
                  Tell us about yourself and the kind of work you&apos;re looking for.
                </p>
                <HCAForm onSubmit={handleHCASubmit} />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
