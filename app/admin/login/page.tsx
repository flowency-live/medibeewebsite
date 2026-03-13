'use client';

/**
 * Admin Login Page
 *
 * Separate login flow for admin users.
 */

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui';

export default function AdminLoginPage() {
  const router = useRouter();
  const { loginAdmin, state } = useAuth();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState('');

  // Redirect if already logged in as admin
  React.useEffect(() => {
    if (state.status === 'authenticated' && state.userType === 'admin') {
      router.push('/admin/dashboard');
    }
  }, [state, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setIsSubmitting(true);

    const result = await loginAdmin({ email, password });

    if (result.success) {
      router.push('/admin/dashboard');
    } else {
      setError(result.error || 'Invalid credentials.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-deep-slate flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="font-display text-2xl text-soft-gold">
            Medibee
          </Link>
          <div className="mt-2">
            <span className="px-3 py-1 bg-slate-blue/20 text-slate-blue text-xs font-semibold rounded">
              ADMIN
            </span>
          </div>
          <h1 className="font-display text-display-sm text-mist mt-6 mb-2">Admin Sign In</h1>
          <p className="font-body text-body-md text-mist/60">
            Access the administration portal.
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
                placeholder="admin@medibee-recruitment.co.uk"
                autoComplete="email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block font-body text-body-sm text-slate-blue mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-grey/30 rounded-sm font-body text-body-md focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-slate-blue"
                autoComplete="current-password"
              />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center font-body text-body-sm text-mist/60">
          <Link href="/" className="text-soft-gold hover:underline">
            ← Back to website
          </Link>
        </p>
      </div>
    </div>
  );
}
