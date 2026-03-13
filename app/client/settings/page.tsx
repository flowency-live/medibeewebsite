'use client';

/**
 * Client Settings Page
 *
 * Account settings and GDPR delete.
 */

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, isClient } from '@/lib/auth';
import { clientsApi } from '@/lib/api';
import { Button } from '@/components/ui';

export default function ClientSettingsPage() {
  const router = useRouter();
  const { state, logout } = useAuth();

  const [isDeleting, setIsDeleting] = React.useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = React.useState('');
  const [error, setError] = React.useState('');

  if (!isClient(state)) {
    return null;
  }

  const { profile, subscription } = state;

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE') {
      setError('Please type DELETE to confirm.');
      return;
    }

    setIsDeleting(true);
    setError('');

    const response = await clientsApi.deleteAccount();

    if (response.success) {
      await logout();
      router.push('/?deleted=true');
    } else {
      setError('Failed to delete account. Please contact support.');
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="font-display text-display-sm text-ink mb-2">Settings</h1>
        <p className="font-body text-body-md text-slate-blue">
          Manage your account settings and preferences.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-[3px] border-red-500" role="alert">
          <p className="font-body text-body-sm text-red-800">{error}</p>
        </div>
      )}

      <div className="space-y-8">
        {/* Account Info */}
        <section className="bg-white p-6 rounded-sm border border-neutral-grey/20">
          <h2 className="font-display text-lg text-ink mb-4">Account Information</h2>
          <dl className="space-y-3">
            <div className="flex justify-between">
              <dt className="font-body text-body-sm text-slate-blue">Email</dt>
              <dd className="font-body text-body-sm text-ink">{profile.contactEmail}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-body text-body-sm text-slate-blue">Organisation</dt>
              <dd className="font-body text-body-sm text-ink">{profile.organisationName}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-body text-body-sm text-slate-blue">Member since</dt>
              <dd className="font-body text-body-sm text-ink">
                {new Date(profile.createdAt).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-body text-body-sm text-slate-blue">Account Status</dt>
              <dd className="font-body text-body-sm text-ink capitalize">
                {profile.status.replace('_', ' ')}
              </dd>
            </div>
          </dl>
        </section>

        {/* Subscription Summary */}
        <section className="bg-white p-6 rounded-sm border border-neutral-grey/20">
          <h2 className="font-display text-lg text-ink mb-4">Subscription</h2>
          {subscription ? (
            <dl className="space-y-3">
              <div className="flex justify-between">
                <dt className="font-body text-body-sm text-slate-blue">Plan</dt>
                <dd className="font-body text-body-sm text-ink">{subscription.tier}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-body text-body-sm text-slate-blue">Status</dt>
                <dd
                  className={`font-body text-body-sm ${
                    subscription.status === 'active'
                      ? 'text-green-600'
                      : subscription.status === 'past_due'
                      ? 'text-amber-600'
                      : 'text-red-600'
                  }`}
                >
                  {subscription.status.replace('_', ' ')}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-body text-body-sm text-slate-blue">Credits Remaining</dt>
                <dd className="font-body text-body-sm text-ink">
                  {subscription.creditsRemaining === -1
                    ? 'Unlimited'
                    : subscription.creditsRemaining}
                </dd>
              </div>
            </dl>
          ) : (
            <p className="font-body text-body-md text-slate-blue">No active subscription</p>
          )}
        </section>

        {/* Password Change */}
        <section className="bg-white p-6 rounded-sm border border-neutral-grey/20">
          <h2 className="font-display text-lg text-ink mb-4">Password</h2>
          <p className="font-body text-body-md text-slate-blue mb-4">
            To change your password, use the forgot password feature.
          </p>
          <Button
            onClick={() => {
              logout();
              router.push('/client/forgot-password');
            }}
            variant="secondary"
          >
            Reset Password
          </Button>
        </section>

        {/* Delete Account */}
        <section className="bg-white p-6 rounded-sm border border-red-200">
          <h2 className="font-display text-lg text-red-700 mb-4">Delete Account</h2>

          {subscription && subscription.status === 'active' && (
            <div className="p-4 bg-amber-50 rounded-sm mb-4">
              <p className="font-body text-body-sm text-amber-800">
                You have an active subscription. Please cancel your subscription before deleting
                your account to avoid further charges.
              </p>
            </div>
          )}

          <p className="font-body text-body-md text-slate-blue mb-4">
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>

          {!showDeleteConfirm ? (
            <Button onClick={() => setShowDeleteConfirm(true)} variant="secondary">
              Delete My Account
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-red-50 rounded-sm">
                <p className="font-body text-body-sm text-red-800 mb-2">
                  This will permanently delete:
                </p>
                <ul className="list-disc list-inside font-body text-body-sm text-red-700 space-y-1">
                  <li>Your organisation profile</li>
                  <li>All shortlists and saved candidates</li>
                  <li>Contact request history</li>
                  <li>Team member access</li>
                </ul>
              </div>

              <div>
                <label className="block font-body text-body-sm text-ink mb-2">
                  Type <strong>DELETE</strong> to confirm
                </label>
                <input
                  type="text"
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  className="w-full px-4 py-3 border border-red-300 rounded-sm font-body text-body-md focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500"
                  placeholder="DELETE"
                />
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleDeleteAccount}
                  disabled={isDeleting || deleteConfirmText !== 'DELETE'}
                  variant="secondary"
                >
                  {isDeleting ? 'Deleting...' : 'Permanently Delete Account'}
                </Button>
                <Button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setDeleteConfirmText('');
                  }}
                  variant="secondary"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
