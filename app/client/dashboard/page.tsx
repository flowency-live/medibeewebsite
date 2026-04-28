'use client';

/**
 * Client Dashboard Page
 *
 * Overview of subscription status, recent activity, and quick actions.
 * Uses dark theme with void/gold color system.
 */

import * as React from 'react';
import Link from 'next/link';
import { useAuth, isClient } from '@/lib/auth';
import { shortlistsApi, contactsApi } from '@/lib/api';
import { Button, AlertBanner } from '@/components/ui';
import { HoneycombPattern } from '@/components/decorative';

interface DashboardStats {
  shortlistCount: number;
  totalCandidatesShortlisted: number;
  contactsThisMonth: number;
  pendingContacts: number;
}

export default function ClientDashboardPage() {
  const { state } = useAuth();

  const [stats, setStats] = React.useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);

      try {
        const [shortlistsResponse, contactsResponse] = await Promise.all([
          shortlistsApi.list(),
          contactsApi.list(),
        ]);

        let shortlistCount = 0;
        let totalCandidatesShortlisted = 0;
        let contactsThisMonth = 0;
        let pendingContacts = 0;

        if (shortlistsResponse.success && shortlistsResponse.data) {
          const data = shortlistsResponse.data as { shortlists: Array<{ candidateCount: number }> };
          shortlistCount = data.shortlists.length;
          totalCandidatesShortlisted = data.shortlists.reduce(
            (sum, s) => sum + (s.candidateCount || 0),
            0
          );
        }

        if (contactsResponse.success && contactsResponse.data) {
          const data = contactsResponse.data as {
            contacts: Array<{ status: string; createdAt: string }>;
          };
          const now = new Date();
          const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

          contactsThisMonth = data.contacts.filter(
            (c) => new Date(c.createdAt) >= startOfMonth
          ).length;
          pendingContacts = data.contacts.filter((c) => c.status === 'pending').length;
        }

        setStats({
          shortlistCount,
          totalCandidatesShortlisted,
          contactsThisMonth,
          pendingContacts,
        });
      } catch {
        // Stats will remain null, that's fine
      }

      setIsLoading(false);
    };

    loadDashboardData();
  }, []);

  if (!isClient(state)) {
    return null;
  }

  const { profile, subscription } = state;

  return (
    <div className="animate-fade-in-up">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-display-sm text-pearl mb-2">
          Welcome back, {profile.contactName.split(' ')[0]}
        </h1>
        <p className="font-body text-body-md text-ash">
          Manage your recruitment pipeline and find the perfect candidates.
        </p>
      </div>

      {/* Subscription Alert */}
      {!subscription && (
        <AlertBanner type="warning" title="No Active Subscription" className="mb-8">
          <p className="mb-4">
            Subscribe to a plan to start browsing candidates and making contact requests.
          </p>
          <Link href="/client/subscription">
            <Button>View Plans</Button>
          </Link>
        </AlertBanner>
      )}

      {subscription && subscription.status === 'past_due' && (
        <AlertBanner type="error" title="Payment Issue" className="mb-8">
          <p className="mb-4">
            Your last payment failed. Please update your payment method to continue using our
            services.
          </p>
          <Link href="/client/subscription">
            <Button variant="secondary">Update Payment</Button>
          </Link>
        </AlertBanner>
      )}

      {/* Stats Cards */}
      <div className="relative mb-8">
        <HoneycombPattern variant="gold" opacity={0.04} />
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-void-medium p-6 rounded-card border border-ash-border hover:border-gold/30 transition-colors">
            <div className="text-ash font-body text-body-sm mb-1">Credits Remaining</div>
            <div className="font-display text-display-sm text-pearl">
              {subscription
                ? subscription.creditsRemaining === -1
                  ? '∞'
                  : subscription.creditsRemaining
                : '—'}
            </div>
            <div className="font-body text-body-sm text-gold mt-1">
              {subscription?.tier || 'No plan'}
            </div>
          </div>

          <div className="bg-void-medium p-6 rounded-card border border-ash-border hover:border-gold/30 transition-colors">
            <div className="text-ash font-body text-body-sm mb-1">Shortlists</div>
            <div className="font-display text-display-sm text-pearl">
              {isLoading ? '—' : stats?.shortlistCount ?? 0}
            </div>
            <div className="font-body text-body-sm text-ash mt-1">
              {isLoading ? '—' : `${stats?.totalCandidatesShortlisted ?? 0} candidates`}
            </div>
          </div>

          <div className="bg-void-medium p-6 rounded-card border border-ash-border hover:border-gold/30 transition-colors">
            <div className="text-ash font-body text-body-sm mb-1">Contacts This Month</div>
            <div className="font-display text-display-sm text-pearl">
              {isLoading ? '—' : stats?.contactsThisMonth ?? 0}
            </div>
            <div className="font-body text-body-sm text-ash mt-1">contact requests</div>
          </div>

          <div className="bg-void-medium p-6 rounded-card border border-ash-border hover:border-gold/30 transition-colors">
            <div className="text-ash font-body text-body-sm mb-1">Pending Responses</div>
            <div className="font-display text-display-sm text-pearl">
              {isLoading ? '—' : stats?.pendingContacts ?? 0}
            </div>
            <div className="font-body text-body-sm text-ash mt-1">awaiting reply</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-void-medium p-6 rounded-card border border-ash-border hover:border-gold/30 transition-colors">
          <h2 className="font-display text-lg text-pearl mb-4">Find Candidates</h2>
          <p className="font-body text-body-md text-ash mb-4">
            Search our database of verified healthcare professionals by location, experience, and
            care setting.
          </p>
          <Link href="/client/candidates">
            <Button disabled={!subscription}>Browse Candidates</Button>
          </Link>
        </div>

        <div className="bg-void-medium p-6 rounded-card border border-ash-border hover:border-gold/30 transition-colors">
          <h2 className="font-display text-lg text-pearl mb-4">Manage Shortlists</h2>
          <p className="font-body text-body-md text-ash mb-4">
            Organise your favourite candidates into shortlists for easy comparison and team sharing.
          </p>
          <Link href="/client/shortlists">
            <Button variant="secondary" disabled={!subscription}>
              View Shortlists
            </Button>
          </Link>
        </div>
      </div>

      {/* Getting Started */}
      <div className="bg-void-medium p-6 rounded-card border border-ash-border">
        <h2 className="font-display text-lg text-pearl mb-4">Getting Started</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                subscription
                  ? 'bg-status-verified/10 text-status-verified'
                  : 'bg-ash/10 text-ash'
              }`}
            >
              {subscription ? '✓' : '1'}
            </div>
            <div>
              <h3 className="font-body text-body-md text-pearl font-semibold">
                Subscribe to a plan
              </h3>
              <p className="font-body text-body-sm text-ash">
                Choose a plan that fits your recruitment needs.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                (stats?.shortlistCount ?? 0) > 0
                  ? 'bg-status-verified/10 text-status-verified'
                  : 'bg-ash/10 text-ash'
              }`}
            >
              {(stats?.shortlistCount ?? 0) > 0 ? '✓' : '2'}
            </div>
            <div>
              <h3 className="font-body text-body-md text-pearl font-semibold">
                Create your first shortlist
              </h3>
              <p className="font-body text-body-sm text-ash">
                Organise candidates you&apos;re interested in for easy reference.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                (stats?.contactsThisMonth ?? 0) > 0
                  ? 'bg-status-verified/10 text-status-verified'
                  : 'bg-ash/10 text-ash'
              }`}
            >
              {(stats?.contactsThisMonth ?? 0) > 0 ? '✓' : '3'}
            </div>
            <div>
              <h3 className="font-body text-body-md text-pearl font-semibold">
                Request your first contact
              </h3>
              <p className="font-body text-body-sm text-ash">
                Found a great candidate? Request their contact details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
