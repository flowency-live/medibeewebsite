'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Input } from '@/components/ui';
import { useAuth } from '@/lib/auth';

function CandidateLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loginCandidate, state } = useAuth();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  // Redirect if already authenticated
  React.useEffect(() => {
    if (state.status === 'authenticated' && state.userType === 'candidate') {
      const redirect = searchParams.get('redirect') ?? '/candidate/dashboard';
      router.push(redirect);
    }
  }, [state, router, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const result = await loginCandidate({ email, password });

    if (result.success) {
      const redirect = searchParams.get('redirect') ?? '/candidate/dashboard';
      router.push(redirect);
    } else {
      setError(result.error ?? 'Login failed. Please check your credentials.');
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-200px)] bg-deep-slate flex items-center">
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
            <h1 className="font-display text-display-md text-soft-gold mb-2">
              Candidate Login
            </h1>
            <p className="font-body text-body-md text-mist/80">
              Access your Medibee account
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-mist p-8">
            {error && (
              <div className="mb-6 p-4 bg-amber-50 border-l-[3px] border-amber-500" role="alert">
                <p className="font-body text-body-sm text-amber-800">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Email Address"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                disabled={isLoading}
              />

              <Input
                label="Password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                disabled={isLoading}
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 border-2 border-neutral-grey accent-rich-gold"
                  />
                  <span className="font-body text-body-sm text-ink">Remember me</span>
                </label>
                <Link
                  href="/candidate/forgot-password"
                  className="font-body text-body-sm text-slate-blue hover:text-deep-slate underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                fullWidth
                className="bg-rich-gold text-ink hover:bg-soft-gold"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-neutral-grey/30 text-center">
              <p className="font-body text-body-md text-ink">
                Don&apos;t have an account?{' '}
                <Link
                  href="/candidate/register"
                  className="text-slate-blue hover:text-deep-slate underline"
                >
                  Register now
                </Link>
              </p>
            </div>
          </div>

          {/* Back link */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="font-body text-body-sm text-mist/60 hover:text-mist transition-colors"
            >
              ← Back to homepage
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CandidateLoginPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-deep-slate" />}>
      <CandidateLoginContent />
    </React.Suspense>
  );
}
