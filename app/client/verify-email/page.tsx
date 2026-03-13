'use client';

/**
 * Client Email Verification Page
 *
 * Handles email verification for client accounts.
 */

import * as React from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { clientsApi } from '@/lib/api';
import { Button } from '@/components/ui';

export default function ClientVerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get('email');
  const token = searchParams.get('token');

  const [status, setStatus] = React.useState<'pending' | 'verifying' | 'success' | 'error'>(
    token ? 'verifying' : 'pending'
  );
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const verifyEmail = async () => {
      if (!token) return;

      const response = await clientsApi.verifyEmail(token);

      if (response.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setError(
          (response as { message?: string }).message || 'Verification failed. Please try again.'
        );
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token]);

  if (status === 'verifying') {
    return (
      <div className="min-h-screen bg-mist flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <div className="animate-pulse mb-6">
            <div className="w-16 h-16 bg-slate-blue/20 rounded-full mx-auto" />
          </div>
          <h1 className="font-display text-display-sm text-ink mb-2">Verifying Email</h1>
          <p className="font-body text-body-md text-slate-blue">Please wait...</p>
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-mist flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center">
              <span className="text-3xl text-green-600">✓</span>
            </div>
          </div>
          <h1 className="font-display text-display-sm text-ink mb-2">Email Verified!</h1>
          <p className="font-body text-body-md text-slate-blue mb-6">
            Your email has been verified successfully. You can now sign in to your account.
          </p>
          <Link href="/client/login">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-mist flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full mx-auto flex items-center justify-center">
              <span className="text-3xl text-red-600">✕</span>
            </div>
          </div>
          <h1 className="font-display text-display-sm text-ink mb-2">Verification Failed</h1>
          <p className="font-body text-body-md text-slate-blue mb-6">{error}</p>
          <div className="space-y-3">
            <Link href="/client/login">
              <Button variant="secondary">Try Signing In</Button>
            </Link>
            <p className="font-body text-body-sm text-slate-blue">
              Need help?{' '}
              <Link href="/contact" className="text-rich-gold hover:underline">
                Contact Support
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Pending state - waiting for email
  return (
    <div className="min-h-screen bg-mist flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="font-display text-2xl text-soft-gold">
            Medibee
          </Link>
        </div>

        <div className="bg-white p-8 rounded-sm border border-neutral-grey/20 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-rich-gold/20 rounded-full mx-auto flex items-center justify-center">
              <span className="text-3xl">✉️</span>
            </div>
          </div>

          <h1 className="font-display text-display-sm text-ink mb-2">Check Your Email</h1>

          <p className="font-body text-body-md text-slate-blue mb-6">
            We&apos;ve sent a verification link to:
          </p>

          {email && (
            <p className="font-body text-body-md text-ink font-semibold mb-6">{email}</p>
          )}

          <p className="font-body text-body-sm text-slate-blue mb-6">
            Click the link in the email to verify your account. The link will expire in 24 hours.
          </p>

          <div className="p-4 bg-slate-blue/5 rounded-sm">
            <p className="font-body text-body-sm text-slate-blue">
              Didn&apos;t receive the email? Check your spam folder or{' '}
              <button
                onClick={() => {
                  // Could implement resend functionality here
                  window.location.reload();
                }}
                className="text-rich-gold hover:underline"
              >
                try registering again
              </button>
              .
            </p>
          </div>
        </div>

        <p className="mt-6 text-center font-body text-body-sm text-slate-blue">
          <Link href="/client/login" className="text-rich-gold hover:underline">
            ← Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
