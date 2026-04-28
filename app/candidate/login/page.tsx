'use client';

/**
 * Candidate Login/Registration Page
 *
 * Auth-first flow with multiple authentication methods:
 * - Social OAuth (Google, Apple)
 * - Phone OTP
 * - Email magic link
 */

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Input, AlertBanner } from '@/components/ui';
import { useAuth } from '@/lib/auth';
import { TEST_CANDIDATE } from '@/lib/test-login';

type AuthMethod = 'social' | 'phone' | 'email';
type PhoneStep = 'input' | 'verify';
type EmailStep = 'input' | 'sent';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://4zq0km0w5a.execute-api.eu-west-2.amazonaws.com';

function CandidateLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { devLoginAsCandidate } = useAuth();

  const [method, setMethod] = React.useState<AuthMethod>('social');

  // TODO(PROD-WIRE): Remove test login handler before production launch
  const handleTestLogin = () => {
    if (devLoginAsCandidate) {
      devLoginAsCandidate(TEST_CANDIDATE);
      router.push('/candidate/dashboard');
    }
  };
  const [phoneStep, setPhoneStep] = React.useState<PhoneStep>('input');
  const [emailStep, setEmailStep] = React.useState<EmailStep>('input');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [otp, setOtp] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  // Check for error in URL params (from OAuth redirect)
  React.useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      setError(errorParam);
    }
  }, [searchParams]);

  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  const handleAppleLogin = () => {
    window.location.href = `${API_URL}/auth/apple`;
  };

  const handlePhoneRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/auth/phone/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });

      const data = await response.json();

      if (data.success) {
        setPhoneStep('verify');
      } else {
        setError(data.error || 'Failed to send verification code');
      }
    } catch {
      setError('Network error. Please try again.');
    }

    setIsLoading(false);
  };

  const handlePhoneVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/auth/phone/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ phone, otp }),
      });

      const data = await response.json();

      if (data.success && data.redirect) {
        router.push(data.redirect);
      } else {
        setError(data.error || 'Verification failed');
      }
    } catch {
      setError('Network error. Please try again.');
    }

    setIsLoading(false);
  };

  const handleEmailRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/auth/email/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setEmailStep('sent');
      } else {
        setError(data.error || 'Failed to send verification email');
      }
    } catch {
      setError('Network error. Please try again.');
    }

    setIsLoading(false);
  };

  return (
    <section className="min-h-[calc(100vh-200px)] bg-void flex items-center">
      <div className="container-editorial py-12 md:py-16">
        <div className="max-w-md mx-auto">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <Image
                src="/medibee-tile-logo.png"
                alt="Medibee"
                width={60}
                height={60}
                className="mx-auto mb-4"
              />
            </Link>
            <h1 className="font-display text-display-md text-gold-soft mb-2">
              Join Medibee
            </h1>
            <p className="font-body text-body-md text-pearl-soft/80">
              Sign in or create your account
            </p>
          </div>

          {/* Auth Card */}
          <div className="bg-void-elevated border border-white/[0.08] rounded-lg p-8">
            {error && (
              <AlertBanner type="error" className="mb-6">
                {error}
              </AlertBanner>
            )}

            {/* Social Auth Options */}
            {method === 'social' && (
              <div className="space-y-4">
                <Button
                  onClick={handleGoogleLogin}
                  fullWidth
                  variant="secondary"
                  className="flex items-center justify-center gap-3"
                >
                  <GoogleIcon />
                  Continue with Google
                </Button>

                <Button
                  onClick={handleAppleLogin}
                  fullWidth
                  variant="secondary"
                  className="flex items-center justify-center gap-3 bg-ink text-mist hover:bg-ink/90"
                >
                  <AppleIcon />
                  Continue with Apple
                </Button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-void-elevated text-pearl-soft/60">or</span>
                  </div>
                </div>

                <Button
                  onClick={() => setMethod('phone')}
                  fullWidth
                  variant="secondary"
                >
                  Continue with Phone
                </Button>

                <Button
                  onClick={() => setMethod('email')}
                  fullWidth
                  variant="secondary"
                >
                  Continue with Email
                </Button>
              </div>
            )}

            {/* Phone - Enter Number */}
            {method === 'phone' && phoneStep === 'input' && (
              <form onSubmit={handlePhoneRequest} className="space-y-6">
                <p className="font-body text-body-sm text-pearl-soft/70 text-center mb-4">
                  We&apos;ll send you a verification code
                </p>

                <Input
                  label="Mobile Number"
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="07123 456789"
                  required
                  disabled={isLoading}
                  autoComplete="tel"
                />

                <Button type="submit" fullWidth disabled={isLoading}>
                  {isLoading ? 'Sending...' : 'Send Code'}
                </Button>

                <button
                  type="button"
                  onClick={() => {
                    setMethod('social');
                    setError('');
                  }}
                  className="w-full text-center font-body text-body-sm text-pearl-soft/70 hover:underline"
                >
                  Back to options
                </button>
              </form>
            )}

            {/* Phone - Enter OTP */}
            {method === 'phone' && phoneStep === 'verify' && (
              <form onSubmit={handlePhoneVerify} className="space-y-6">
                <p className="font-body text-body-sm text-ink text-center mb-4">
                  Enter the 6-digit code sent to<br />
                  <span className="font-semibold">{phone}</span>
                </p>

                <Input
                  label="Verification Code"
                  name="otp"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="123456"
                  required
                  disabled={isLoading}
                  autoComplete="one-time-code"
                />

                <Button type="submit" fullWidth disabled={isLoading || otp.length !== 6}>
                  {isLoading ? 'Verifying...' : 'Verify'}
                </Button>

                <button
                  type="button"
                  onClick={() => {
                    setPhoneStep('input');
                    setOtp('');
                    setError('');
                  }}
                  className="w-full text-center font-body text-body-sm text-pearl-soft/70 hover:underline"
                >
                  Enter different number
                </button>
              </form>
            )}

            {/* Email - Enter Address */}
            {method === 'email' && emailStep === 'input' && (
              <form onSubmit={handleEmailRequest} className="space-y-6">
                <p className="font-body text-body-sm text-pearl-soft/70 text-center mb-4">
                  We&apos;ll send you a secure sign-in link
                </p>

                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  disabled={isLoading}
                  autoComplete="email"
                />

                <Button type="submit" fullWidth disabled={isLoading}>
                  {isLoading ? 'Sending...' : 'Send Sign-in Link'}
                </Button>

                <button
                  type="button"
                  onClick={() => {
                    setMethod('social');
                    setError('');
                  }}
                  className="w-full text-center font-body text-body-sm text-pearl-soft/70 hover:underline"
                >
                  Back to options
                </button>
              </form>
            )}

            {/* Email - Check Inbox */}
            {method === 'email' && emailStep === 'sent' && (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-gold/20 rounded-full mx-auto flex items-center justify-center mb-4">
                  <MailIcon />
                </div>
                <h2 className="font-display text-lg text-pearl mb-2">Check your email</h2>
                <p className="font-body text-body-sm text-pearl-soft/70 mb-2">
                  We sent a sign-in link to
                </p>
                <p className="font-body text-body-md text-pearl font-semibold mb-6">
                  {email}
                </p>
                <p className="font-body text-body-sm text-pearl-soft/60 mb-6">
                  The link will expire in 15 minutes.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setEmailStep('input');
                    setEmail('');
                    setError('');
                  }}
                  className="font-body text-body-sm text-gold hover:underline"
                >
                  Use a different email
                </button>
              </div>
            )}
          </div>

          {/* TODO(PROD-WIRE): Remove test login section before production launch */}
          {devLoginAsCandidate && (
            <div className="mt-6 pt-6 border-t border-status-pending/30">
              <div className="bg-status-pending/10 border border-status-pending/30 rounded-card p-4">
                <p className="font-body text-body-sm text-status-pending mb-3 text-center">
                  Demo / Testing Mode
                </p>
                <Button
                  type="button"
                  onClick={handleTestLogin}
                  fullWidth
                  className="bg-status-pending text-void hover:bg-status-pending/90"
                >
                  Test Login as Sarah Williams
                </Button>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="font-body text-body-sm text-pearl-soft/60 hover:text-pearl-soft transition-colors"
            >
              Back to homepage
            </Link>
          </div>

          {/* Legal */}
          <p className="mt-4 text-center font-body text-body-sm text-pearl-soft/50">
            By continuing, you agree to our{' '}
            <Link href="/privacy-policy" className="underline hover:text-pearl-soft/70">
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link href="/terms" className="underline hover:text-pearl-soft/70">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

// Icon Components
function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

export default function CandidateLoginPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-void" />}>
      <CandidateLoginContent />
    </React.Suspense>
  );
}
