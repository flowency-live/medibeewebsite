'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Input, AlertBanner } from '@/components/ui';
import { useAuth } from '@/lib/auth';
import { TEST_CLIENT, TEST_CLIENT_SUBSCRIPTION } from '@/lib/test-login';

function ClientLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loginClient, devLoginAsClient, state } = useAuth();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  // TODO(PROD-WIRE): Remove test login handler before production launch
  const handleTestLogin = () => {
    if (devLoginAsClient) {
      devLoginAsClient(TEST_CLIENT, TEST_CLIENT_SUBSCRIPTION);
      router.push('/client/dashboard');
    }
  };

  // Redirect if already authenticated
  React.useEffect(() => {
    if (state.status === 'authenticated' && state.userType === 'client') {
      const redirect = searchParams.get('redirect') ?? '/client/dashboard';
      router.push(redirect);
    }
  }, [state, router, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const result = await loginClient({ email, password });

    if (result.success) {
      const redirect = searchParams.get('redirect') ?? '/client/dashboard';
      router.push(redirect);
    } else {
      setError(result.error ?? 'Login failed. Please check your credentials.');
      setIsLoading(false);
    }
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
              Client Login
            </h1>
            <p className="font-body text-body-md text-pearl-soft/80">
              Access your care provider portal
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-void-elevated border border-white/[0.08] rounded-lg p-8">
            {error && (
              <AlertBanner type="error" className="mb-6">
                {error}
              </AlertBanner>
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
                    className="w-4 h-4 border-2 border-white/20 accent-gold"
                  />
                  <span className="font-body text-body-sm text-pearl-soft">Remember me</span>
                </label>
                <Link
                  href="/client/forgot-password"
                  className="font-body text-body-sm text-gold-soft hover:text-gold underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                fullWidth
                className="bg-gold text-void hover:bg-gold-light"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <p className="font-body text-body-md text-pearl-soft">
                Don&apos;t have an account?{' '}
                <Link
                  href="/client/register"
                  className="text-gold-soft hover:text-gold underline"
                >
                  Register your organisation
                </Link>
              </p>
            </div>

            {/* TODO(PROD-WIRE): Remove test login section before production launch */}
            {devLoginAsClient && (
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
                    Test Login as Sunrise Care Group
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Back link */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="font-body text-body-sm text-pearl-soft/60 hover:text-pearl-soft transition-colors"
            >
              ← Back to homepage
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ClientLoginPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-void" />}>
      <ClientLoginContent />
    </React.Suspense>
  );
}
