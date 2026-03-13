'use client';

/**
 * Client Forgot Password Page
 *
 * Request password reset for client accounts.
 */

import * as React from 'react';
import Link from 'next/link';
import { clientsApi } from '@/lib/api';
import { Button } from '@/components/ui';

export default function ClientForgotPasswordPage() {
  const [email, setEmail] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    setIsSubmitting(true);

    const response = await clientsApi.forgotPassword(email);

    // Always show success to prevent email enumeration
    setSubmitted(true);
    setIsSubmitting(false);
  };

  if (submitted) {
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
              If an account exists for <strong>{email}</strong>, we&apos;ve sent password reset
              instructions.
            </p>

            <p className="font-body text-body-sm text-slate-blue">
              The link will expire in 24 hours. If you don&apos;t see the email, check your spam
              folder.
            </p>
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

  return (
    <div className="min-h-screen bg-mist flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="font-display text-2xl text-soft-gold">
            Medibee
          </Link>
          <h1 className="font-display text-display-sm text-ink mt-6 mb-2">Reset Your Password</h1>
          <p className="font-body text-body-md text-slate-blue">
            Enter your email address and we&apos;ll send you a link to reset your password.
          </p>
        </div>

        <div className="bg-white p-8 rounded-sm border border-neutral-grey/20">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-[3px] border-red-500" role="alert">
              <p className="font-body text-body-sm text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block font-body text-body-sm text-slate-blue mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-grey/30 rounded-sm font-body text-body-md focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-slate-blue"
                placeholder="e.g. jane.smith@example.com"
              />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center font-body text-body-sm text-slate-blue">
          Remember your password?{' '}
          <Link href="/client/login" className="text-rich-gold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
