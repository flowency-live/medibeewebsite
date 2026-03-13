'use client';

/**
 * Admin Analytics Page
 *
 * Detailed analytics and data export.
 */

import * as React from 'react';
import { useAuth, isAdmin } from '@/lib/auth';
import { adminApi } from '@/lib/api';
import { Button } from '@/components/ui';

interface Analytics {
  candidates: {
    total: number;
    pending: number;
    active: number;
    suspended: number;
    rejected: number;
    byExperience: Record<string, number>;
    byLocation: Array<{ location: string; count: number }>;
  };
  clients: {
    total: number;
    active: number;
    pendingVerification: number;
    byType: Record<string, number>;
  };
  contacts: {
    total: number;
    pending: number;
    contacted: number;
    hired: number;
    declined: number;
    thisMonth: number;
    lastMonth: number;
  };
  subscriptions: {
    active: number;
    mrr: number;
    byTier: {
      Bronze: number;
      Silver: number;
      Gold: number;
    };
  };
}

const EXPERIENCE_LABELS: Record<string, string> = {
  'newly-qualified': 'Newly Qualified',
  '1-2-years': '1-2 Years',
  '3-5-years': '3-5 Years',
  '5-plus-years': '5+ Years',
};

const ORG_TYPE_LABELS: Record<string, string> = {
  'nhs-trust': 'NHS Trust',
  'private-hospital': 'Private Hospital',
  'care-home': 'Care Home',
  'supported-living': 'Supported Living',
  'mental-health': 'Mental Health',
  'community-care': 'Community Care',
  other: 'Other',
};

export default function AdminAnalyticsPage() {
  const { state } = useAuth();

  const [analytics, setAnalytics] = React.useState<Analytics | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isExporting, setIsExporting] = React.useState(false);

  React.useEffect(() => {
    const loadAnalytics = async () => {
      setIsLoading(true);

      const response = await adminApi.getAnalytics();

      if (response.success && response.data) {
        const data = response.data as { metrics: Analytics };
        setAnalytics(data.metrics);
      }

      setIsLoading(false);
    };

    loadAnalytics();
  }, []);

  const handleExport = async (type: 'candidates' | 'clients' | 'contacts') => {
    setIsExporting(true);

    const response = await adminApi.exportAnalytics({ format: 'csv', entity: type });

    if (response.success && response.data) {
      const data = response.data as { csv: string };
      const blob = new Blob([data.csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `medibee-${type}-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }

    setIsExporting(false);
  };

  if (!isAdmin(state)) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-pulse mb-4">
          <div className="w-16 h-16 bg-slate-blue/20 rounded-full mx-auto" />
        </div>
        <p className="font-body text-body-md text-slate-blue">Loading analytics...</p>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="text-center py-12">
        <p className="font-body text-body-md text-slate-blue">Unable to load analytics.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-display-sm text-ink mb-2">Analytics</h1>
          <p className="font-body text-body-md text-slate-blue">
            Detailed platform metrics and data export.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => handleExport('candidates')}
            disabled={isExporting}
          >
            Export Candidates
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleExport('clients')}
            disabled={isExporting}
          >
            Export Clients
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleExport('contacts')}
            disabled={isExporting}
          >
            Export Contacts
          </Button>
        </div>
      </div>

      {/* Revenue */}
      <div className="bg-white p-6 rounded-sm border border-neutral-grey/20 mb-8">
        <h2 className="font-display text-lg text-ink mb-4">Revenue</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <div className="font-body text-body-sm text-slate-blue mb-1">MRR</div>
            <div className="font-display text-xl text-ink">
              £{(analytics.subscriptions.mrr / 100).toLocaleString()}
            </div>
          </div>
          <div>
            <div className="font-body text-body-sm text-slate-blue mb-1">Bronze</div>
            <div className="font-display text-xl text-ink">
              {analytics.subscriptions.byTier.Bronze}
            </div>
          </div>
          <div>
            <div className="font-body text-body-sm text-slate-blue mb-1">Silver</div>
            <div className="font-display text-xl text-ink">
              {analytics.subscriptions.byTier.Silver}
            </div>
          </div>
          <div>
            <div className="font-body text-body-sm text-slate-blue mb-1">Gold</div>
            <div className="font-display text-xl text-ink">
              {analytics.subscriptions.byTier.Gold}
            </div>
          </div>
        </div>
      </div>

      {/* Candidates */}
      <div className="bg-white p-6 rounded-sm border border-neutral-grey/20 mb-8">
        <h2 className="font-display text-lg text-ink mb-4">Candidates</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-6">
          <div>
            <div className="font-body text-body-sm text-slate-blue mb-1">Total</div>
            <div className="font-display text-xl text-ink">{analytics.candidates.total}</div>
          </div>
          <div>
            <div className="font-body text-body-sm text-slate-blue mb-1">Pending</div>
            <div className="font-display text-xl text-amber-600">
              {analytics.candidates.pending}
            </div>
          </div>
          <div>
            <div className="font-body text-body-sm text-slate-blue mb-1">Active</div>
            <div className="font-display text-xl text-green-600">
              {analytics.candidates.active}
            </div>
          </div>
          <div>
            <div className="font-body text-body-sm text-slate-blue mb-1">Suspended</div>
            <div className="font-display text-xl text-red-600">
              {analytics.candidates.suspended}
            </div>
          </div>
          <div>
            <div className="font-body text-body-sm text-slate-blue mb-1">Rejected</div>
            <div className="font-display text-xl text-slate-blue">
              {analytics.candidates.rejected}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* By Experience */}
          <div>
            <h3 className="font-body text-body-sm text-slate-blue mb-3">By Experience</h3>
            <div className="space-y-2">
              {Object.entries(analytics.candidates.byExperience || {}).map(([level, count]) => (
                <div key={level} className="flex justify-between">
                  <span className="font-body text-body-sm text-ink">
                    {EXPERIENCE_LABELS[level] || level}
                  </span>
                  <span className="font-body text-body-sm text-slate-blue">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Locations */}
          <div>
            <h3 className="font-body text-body-sm text-slate-blue mb-3">Top Locations</h3>
            <div className="space-y-2">
              {(analytics.candidates.byLocation || []).slice(0, 5).map((item) => (
                <div key={item.location} className="flex justify-between">
                  <span className="font-body text-body-sm text-ink">{item.location}</span>
                  <span className="font-body text-body-sm text-slate-blue">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Clients */}
      <div className="bg-white p-6 rounded-sm border border-neutral-grey/20 mb-8">
        <h2 className="font-display text-lg text-ink mb-4">Clients</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
          <div>
            <div className="font-body text-body-sm text-slate-blue mb-1">Total</div>
            <div className="font-display text-xl text-ink">{analytics.clients.total}</div>
          </div>
          <div>
            <div className="font-body text-body-sm text-slate-blue mb-1">Active</div>
            <div className="font-display text-xl text-green-600">{analytics.clients.active}</div>
          </div>
          <div>
            <div className="font-body text-body-sm text-slate-blue mb-1">Pending Verification</div>
            <div className="font-display text-xl text-amber-600">
              {analytics.clients.pendingVerification}
            </div>
          </div>
        </div>

        <h3 className="font-body text-body-sm text-slate-blue mb-3">By Type</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(analytics.clients.byType || {}).map(([type, count]) => (
            <div key={type} className="flex justify-between">
              <span className="font-body text-body-sm text-ink">
                {ORG_TYPE_LABELS[type] || type}
              </span>
              <span className="font-body text-body-sm text-slate-blue">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Contacts */}
      <div className="bg-white p-6 rounded-sm border border-neutral-grey/20">
        <h2 className="font-display text-lg text-ink mb-4">Contact Requests</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
          <div>
            <div className="font-body text-body-sm text-slate-blue mb-1">Total</div>
            <div className="font-display text-xl text-ink">{analytics.contacts.total}</div>
          </div>
          <div>
            <div className="font-body text-body-sm text-slate-blue mb-1">This Month</div>
            <div className="font-display text-xl text-ink">{analytics.contacts.thisMonth}</div>
          </div>
          <div>
            <div className="font-body text-body-sm text-slate-blue mb-1">Last Month</div>
            <div className="font-display text-xl text-slate-blue">
              {analytics.contacts.lastMonth}
            </div>
          </div>
          <div>
            <div className="font-body text-body-sm text-slate-blue mb-1">Pending</div>
            <div className="font-display text-xl text-amber-600">{analytics.contacts.pending}</div>
          </div>
          <div>
            <div className="font-body text-body-sm text-slate-blue mb-1">Contacted</div>
            <div className="font-display text-xl text-blue-600">{analytics.contacts.contacted}</div>
          </div>
          <div>
            <div className="font-body text-body-sm text-slate-blue mb-1">Hired</div>
            <div className="font-display text-xl text-green-600">{analytics.contacts.hired}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
