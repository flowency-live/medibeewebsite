'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Input } from '@/components/ui';
import { useAuth } from '@/lib/auth';

// TODO(PROD-WIRE): Remove test client data before production launch
const testClientProfile = {
  clientId: 'CLIENT-TEST-001',
  organisationName: 'Sunrise Care Group',
  organisationType: 'care-home' as const,
  contactName: 'Eleanor Hartley',
  contactEmail: 'eleanor@sunrisecare.example.com',
  contactPhone: '01onal 234567',
  address: {
    city: 'Bournemouth',
    postcode: 'BH1 1AA',
  },
  status: 'active' as const,
  createdAt: '2024-01-01T10:00:00Z',
  updatedAt: '2024-03-15T14:30:00Z',
};

const testClientSubscription = {
  tier: 'gold' as const,
  status: 'active' as const,
  creditsRemaining: 25,
  currentPeriodEnd: '2024-04-01',
};

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
      devLoginAsClient(testClientProfile, testClientSubscription);
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
              Client Login
            </h1>
            <p className="font-body text-body-md text-mist/80">
              Access your care provider portal
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
                  href="/client/forgot-password"
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
                  href="/client/register"
                  className="text-slate-blue hover:text-deep-slate underline"
                >
                  Register your organisation
                </Link>
              </p>
            </div>

            {/* TODO(PROD-WIRE): Remove test login section before production launch */}
            {devLoginAsClient && (
              <div className="mt-6 pt-6 border-t border-amber-300/50">
                <div className="bg-amber-50 border border-amber-200 rounded p-4">
                  <p className="font-body text-body-sm text-amber-800 mb-3 text-center">
                    Demo / Testing Mode
                  </p>
                  <Button
                    type="button"
                    onClick={handleTestLogin}
                    fullWidth
                    className="bg-amber-500 text-white hover:bg-amber-600"
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

export default function ClientLoginPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-deep-slate" />}>
      <ClientLoginContent />
    </React.Suspense>
  );
}
