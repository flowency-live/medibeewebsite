'use client';

/**
 * Client Registration Page
 *
 * Registration form for healthcare organisations.
 */

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui';

const ORGANISATION_TYPES = [
  { value: 'nhs-trust', label: 'NHS Trust' },
  { value: 'private-hospital', label: 'Private Hospital' },
  { value: 'care-home', label: 'Care Home' },
  { value: 'supported-living', label: 'Supported Living' },
  { value: 'mental-health', label: 'Mental Health Provider' },
  { value: 'community-care', label: 'Community Care' },
  { value: 'other', label: 'Other' },
];

export default function ClientRegisterPage() {
  const router = useRouter();
  const { registerClient } = useAuth();

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState('');

  // Form state
  const [organisationName, setOrganisationName] = React.useState('');
  const [organisationType, setOrganisationType] = React.useState('');
  const [contactName, setContactName] = React.useState('');
  const [contactEmail, setContactEmail] = React.useState('');
  const [contactPhone, setContactPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [agreedToTerms, setAgreedToTerms] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!organisationName || !organisationType || !contactName || !contactEmail || !contactPhone || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    if (!agreedToTerms) {
      setError('You must agree to the terms and conditions.');
      return;
    }

    setIsSubmitting(true);

    const result = await registerClient({
      organisationName,
      organisationType,
      contactName,
      contactEmail,
      contactPhone,
      password,
    });

    if (result.success) {
      router.push(`/client/verify-email?email=${encodeURIComponent(contactEmail)}`);
    } else {
      setError(result.error || 'Registration failed. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-mist flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="font-display text-2xl text-soft-gold">
            Medibee
          </Link>
          <h1 className="font-display text-display-sm text-ink mt-6 mb-2">
            Register Your Organisation
          </h1>
          <p className="font-body text-body-md text-slate-blue">
            Create an account to start finding healthcare professionals.
          </p>
        </div>

        <div className="bg-white p-8 rounded-sm border border-neutral-grey/20">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-[3px] border-red-500" role="alert">
              <p className="font-body text-body-sm text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Organisation Details */}
            <div>
              <label
                htmlFor="organisationName"
                className="block font-body text-body-sm text-slate-blue mb-1"
              >
                Organisation Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="organisationName"
                value={organisationName}
                onChange={(e) => setOrganisationName(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-grey/30 rounded-sm font-body text-body-md focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-slate-blue"
                placeholder="e.g. Acme Healthcare Trust"
              />
            </div>

            <div>
              <label
                htmlFor="organisationType"
                className="block font-body text-body-sm text-slate-blue mb-1"
              >
                Organisation Type <span className="text-red-500">*</span>
              </label>
              <select
                id="organisationType"
                value={organisationType}
                onChange={(e) => setOrganisationType(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-grey/30 rounded-sm font-body text-body-md focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-slate-blue"
              >
                <option value="">Select type...</option>
                {ORGANISATION_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Contact Details */}
            <div>
              <label
                htmlFor="contactName"
                className="block font-body text-body-sm text-slate-blue mb-1"
              >
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="contactName"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-grey/30 rounded-sm font-body text-body-md focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-slate-blue"
                placeholder="e.g. Jane Smith"
              />
            </div>

            <div>
              <label
                htmlFor="contactEmail"
                className="block font-body text-body-sm text-slate-blue mb-1"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="contactEmail"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-grey/30 rounded-sm font-body text-body-md focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-slate-blue"
                placeholder="e.g. jane.smith@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="contactPhone"
                className="block font-body text-body-sm text-slate-blue mb-1"
              >
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="contactPhone"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-grey/30 rounded-sm font-body text-body-md focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-slate-blue"
                placeholder="e.g. 07700 900123"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block font-body text-body-sm text-slate-blue mb-1"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-grey/30 rounded-sm font-body text-body-md focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-slate-blue"
                placeholder="Minimum 8 characters"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block font-body text-body-sm text-slate-blue mb-1"
              >
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-grey/30 rounded-sm font-body text-body-md focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-slate-blue"
                placeholder="Re-enter your password"
              />
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="w-4 h-4 mt-1 text-slate-blue focus:ring-soft-gold border-neutral-grey/30 rounded"
                />
                <span className="font-body text-body-sm text-slate-blue">
                  I agree to the{' '}
                  <Link href="/terms" className="text-rich-gold hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy-policy" className="text-rich-gold hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <p className="mt-6 text-center font-body text-body-sm text-slate-blue">
            Already have an account?{' '}
            <Link href="/client/login" className="text-rich-gold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
