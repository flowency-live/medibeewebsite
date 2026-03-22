'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { CareProviderForm } from '@/components/forms';
import { HoneycombCluster } from '@/components/decorative';
import type { CareProviderEnquiry } from '@/lib/schemas/enquiry';

// Grain texture
const grainTexture = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactPage() {
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  // Focus success heading when form submits successfully
  useEffect(() => {
    if (submitState === 'success') {
      successHeadingRef.current?.focus();
    }
  }, [submitState]);

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
      <section className="py-24 min-h-[60vh] flex items-center relative bg-void">
        {/* Subtle grain texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: grainTexture }}
        />

        <div className="container-editorial relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 mx-auto mb-8 flex items-center justify-center bg-gold rounded-card">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0D0D0D" strokeWidth="2" aria-hidden="true">
                <path d="M9 12l2 2 4-4" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
            <h1
              ref={successHeadingRef}
              tabIndex={-1}
              className="font-display text-[2.5rem] mb-6 focus:outline-none text-gold-soft"
            >
              Thank you for your enquiry
            </h1>
            <p className="text-lg mb-4 opacity-85 text-pearl-soft">
              We have received your message and will be in touch shortly.
            </p>
            <p className="text-[1.0625rem] opacity-60 text-pearl-soft">
              We aim to respond within 24 hours.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Accessible status announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {submitState === 'submitting' && 'Submitting your enquiry, please wait.'}
        {submitState === 'error' && 'There was an error submitting your enquiry. Please try again.'}
      </div>

      {/* Hero */}
      <section className="py-24 relative overflow-hidden bg-void">
        {/* Subtle grain texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: grainTexture }}
        />

        {/* Decorative hexagon clusters - brand signature */}
        <HoneycombCluster position="top-left" variant="outline" scale={1.2} opacityMultiplier={1.5} />

        <div className="container-editorial relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="w-12 h-[3px] bg-gold" />
              <span className="text-[0.8125rem] tracking-[0.2em] uppercase font-medium text-gold">
                Get In Touch
              </span>
              <span className="w-12 h-[3px] bg-gold" />
            </div>
            <h1 className="font-display text-[clamp(2.5rem,5vw,3.5rem)] leading-tight mb-6 text-gold-soft">
              Contact us
            </h1>
            <p className="text-lg leading-relaxed opacity-85 text-pearl-soft">
              Looking for reliable healthcare staffing? Tell us about your requirements
              and we&apos;ll discuss how Medibee can help.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-24 bg-void-light">
        <div className="container-editorial">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-xl mb-2 text-pearl">
              Care Provider Enquiry
            </h2>
            <p className="text-[1.0625rem] mb-8 text-pearl-soft">
              Tell us about your staffing requirements and we&apos;ll discuss how we can help.
            </p>

            {/* Error Message */}
            {submitState === 'error' && (
              <div className="p-4 mb-8 bg-status-expired/10 border-l-[3px] border-status-expired rounded-card">
                <p className="text-[1.0625rem] text-status-expired">
                  There was a problem submitting your enquiry. Please try again or contact us
                  directly.
                </p>
              </div>
            )}

            <CareProviderForm onSubmit={handleCareProviderSubmit} />

            {/* HCA redirect notice */}
            <div className="mt-8 pt-8 border-t border-ash-border">
              <p className="text-[1.0625rem] text-center text-pearl-soft">
                Looking for work as a healthcare assistant?{' '}
                <Link
                  href="/candidate/register"
                  className="font-medium underline text-gold hover:text-gold-light"
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
