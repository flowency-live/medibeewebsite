'use client';

import * as React from 'react';
import Link from 'next/link';
import { CandidateRegistrationForm } from '@/components/forms';
import type { CandidateRegistration } from '@/lib/schemas/candidate';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

export default function CandidateRegisterPage() {
  const [submitState, setSubmitState] = React.useState<SubmitState>('idle');
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  const handleSubmit = async (data: CandidateRegistration, cvFile: File | null) => {
    setSubmitState('submitting');
    setErrorMessage('');

    try {
      // TODO: Implement actual submission
      // 1. Upload CV to S3 (when infrastructure is ready)
      // 2. Submit candidate data to API
      // For now, we simulate a successful submission
      console.log('Candidate registration data:', data);
      console.log('CV file:', cvFile);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock success
      setSubmitState('success');
    } catch (error) {
      console.error('Registration error:', error);
      setErrorMessage(
        error instanceof Error ? error.message : 'An unexpected error occurred'
      );
      setSubmitState('error');
    }
  };

  if (submitState === 'success') {
    return (
      <section className="section-spacing bg-deep-slate">
        <div className="container-editorial">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-rich-gold mx-auto mb-6 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-ink"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="square" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="font-display text-display-lg text-soft-gold mb-6">
              Application Submitted
            </h1>
            <p className="font-body text-body-lg text-mist mb-8">
              Thank you for registering with Medibee. We have received your application
              and will be in touch within 2 working days to discuss next steps.
            </p>
            <p className="font-body text-body-md text-mist/80 mb-8">
              In the meantime, if you have any questions, please contact us at{' '}
              <a
                href="mailto:hello@medibee-recruitment.co.uk"
                className="text-rich-gold hover:text-soft-gold underline"
              >
                hello@medibee-recruitment.co.uk
              </a>
            </p>
            <Link
              href="/"
              className="inline-block font-body text-ui-sm tracking-ui uppercase bg-rich-gold text-ink px-8 py-4 hover:bg-soft-gold transition-colors"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="py-12 md:py-16 bg-deep-slate">
        <div className="container-editorial">
          <div className="max-w-3xl">
            <span className="rule-gold mb-8" />
            <h1 className="font-display text-display-lg text-soft-gold mb-4">
              Apply Today
            </h1>
            <p className="font-body text-body-lg text-mist">
              Join Medibee and work with a recruitment agency that values you.
              Complete the form below to register your interest.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="section-spacing bg-slate-blue">
        <div className="container-editorial">
          <div className="max-w-3xl bg-white p-8 md:p-12">
            {submitState === 'error' && (
              <div className="mb-8 p-4 bg-red-50 border-l-[3px] border-red-600">
                <p className="font-body text-body-md text-red-800">
                  {errorMessage || 'Something went wrong. Please try again.'}
                </p>
              </div>
            )}

            <CandidateRegistrationForm onSubmit={handleSubmit} />

            <div className="mt-8 pt-8 border-t border-neutral-grey/30 text-center">
              <p className="font-body text-body-md text-ink">
                Already registered?{' '}
                <Link
                  href="/candidate/login"
                  className="text-slate-blue hover:text-deep-slate underline"
                >
                  Login to your account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
