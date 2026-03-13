'use client';

/**
 * Admin Dashboard Page
 *
 * Overview of platform metrics and pending actions.
 */

import * as React from 'react';
import Link from 'next/link';
import { useAuth, isAdmin } from '@/lib/auth';
import { adminApi } from '@/lib/api';
import { Button } from '@/components/ui';

interface Analytics {
  candidates: {
    total: number;
    pending: number;
    active: number;
    suspended: number;
  };
  clients: {
    total: number;
    active: number;
  };
  contacts: {
    total: number;
    pending: number;
    thisMonth: number;
  };
  subscriptions: {
    active: number;
    mrr: number;
  };
}

export default function AdminDashboardPage() {
  const { state } = useAuth();

  const [analytics, setAnalytics] = React.useState<Analytics | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const loadAnalytics = async () => {
      setIsLoading(true);

      const response = await adminApi.getAnalytics();

      if (response.success && response.data) {
        setAnalytics(response.data as Analytics);
      }

      setIsLoading(false);
    };

    loadAnalytics();
  }, []);

  if (!isAdmin(state)) {
    return null;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-display-sm text-ink mb-2">Dashboard</h1>
        <p className="font-body text-body-md text-slate-blue">
          Platform overview and key metrics.
        </p>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-pulse mb-4">
            <div className="w-16 h-16 bg-slate-blue/20 rounded-full mx-auto" />
          </div>
          <p className="font-body text-body-md text-slate-blue">Loading analytics...</p>
        </div>
      ) : analytics ? (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-sm border border-neutral-grey/20">
              <div className="text-slate-blue font-body text-body-sm mb-1">Monthly Revenue</div>
              <div className="font-display text-display-sm text-ink">
                £{(analytics.subscriptions.mrr / 100).toLocaleString()}
              </div>
              <div className="font-body text-body-sm text-slate-blue mt-1">
                {analytics.subscriptions.active} active subscriptions
              </div>
            </div>

            <div className="bg-white p-6 rounded-sm border border-neutral-grey/20">
              <div className="text-slate-blue font-body text-body-sm mb-1">Candidates</div>
              <div className="font-display text-display-sm text-ink">
                {analytics.candidates.total}
              </div>
              <div className="font-body text-body-sm text-slate-blue mt-1">
                {analytics.candidates.active} active
              </div>
            </div>

            <div className="bg-white p-6 rounded-sm border border-neutral-grey/20">
              <div className="text-slate-blue font-body text-body-sm mb-1">Clients</div>
              <div className="font-display text-display-sm text-ink">
                {analytics.clients.total}
              </div>
              <div className="font-body text-body-sm text-slate-blue mt-1">
                {analytics.clients.active} active
              </div>
            </div>

            <div className="bg-white p-6 rounded-sm border border-neutral-grey/20">
              <div className="text-slate-blue font-body text-body-sm mb-1">Contacts This Month</div>
              <div className="font-display text-display-sm text-ink">
                {analytics.contacts.thisMonth}
              </div>
              <div className="font-body text-body-sm text-slate-blue mt-1">
                {analytics.contacts.total} total
              </div>
            </div>
          </div>

          {/* Pending Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Pending Candidates */}
            <div className="bg-white p-6 rounded-sm border border-neutral-grey/20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-lg text-ink">Pending Candidates</h2>
                {analytics.candidates.pending > 0 && (
                  <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded">
                    {analytics.candidates.pending} pending
                  </span>
                )}
              </div>

              {analytics.candidates.pending > 0 ? (
                <>
                  <p className="font-body text-body-md text-slate-blue mb-4">
                    New candidates awaiting review and approval.
                  </p>
                  <Link href="/admin/candidates?status=pending">
                    <Button>Review Candidates</Button>
                  </Link>
                </>
              ) : (
                <p className="font-body text-body-md text-slate-blue">
                  No candidates pending review.
                </p>
              )}
            </div>

            {/* Pending Contacts */}
            <div className="bg-white p-6 rounded-sm border border-neutral-grey/20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-lg text-ink">Pending Contacts</h2>
                {analytics.contacts.pending > 0 && (
                  <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded">
                    {analytics.contacts.pending} pending
                  </span>
                )}
              </div>

              {analytics.contacts.pending > 0 ? (
                <>
                  <p className="font-body text-body-md text-slate-blue mb-4">
                    Contact requests awaiting resolution.
                  </p>
                  <Link href="/admin/contacts?status=pending">
                    <Button>Review Contacts</Button>
                  </Link>
                </>
              ) : (
                <p className="font-body text-body-md text-slate-blue">
                  No contacts pending resolution.
                </p>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white p-6 rounded-sm border border-neutral-grey/20">
            <h2 className="font-display text-lg text-ink mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                href="/admin/candidates"
                className="p-4 bg-slate-blue/5 rounded-sm text-center hover:bg-slate-blue/10 transition-colors"
              >
                <div className="text-2xl mb-2">◎</div>
                <div className="font-body text-body-sm text-ink">All Candidates</div>
              </Link>
              <Link
                href="/admin/clients"
                className="p-4 bg-slate-blue/5 rounded-sm text-center hover:bg-slate-blue/10 transition-colors"
              >
                <div className="text-2xl mb-2">▤</div>
                <div className="font-body text-body-sm text-ink">All Clients</div>
              </Link>
              <Link
                href="/admin/contacts"
                className="p-4 bg-slate-blue/5 rounded-sm text-center hover:bg-slate-blue/10 transition-colors"
              >
                <div className="text-2xl mb-2">✉</div>
                <div className="font-body text-body-sm text-ink">All Contacts</div>
              </Link>
              <Link
                href="/admin/analytics"
                className="p-4 bg-slate-blue/5 rounded-sm text-center hover:bg-slate-blue/10 transition-colors"
              >
                <div className="text-2xl mb-2">◈</div>
                <div className="font-body text-body-sm text-ink">Full Analytics</div>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-12 bg-white rounded-sm border border-neutral-grey/20">
          <p className="font-body text-body-md text-slate-blue">
            Unable to load analytics. Please try again.
          </p>
        </div>
      )}
    </div>
  );
}
