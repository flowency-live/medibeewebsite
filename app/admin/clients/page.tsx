'use client';

/**
 * Admin Clients Page
 *
 * List all client organisations.
 */

import * as React from 'react';
import Link from 'next/link';
import { useAuth, isAdmin } from '@/lib/auth';
import { adminApi } from '@/lib/api';
import { Button } from '@/components/ui';

interface Client {
  clientId: string;
  organisationName: string;
  organisationType: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  status: 'pending_verification' | 'active' | 'suspended';
  subscription?: {
    tier: string;
    status: string;
    creditsRemaining: number;
  };
  createdAt: string;
}

const STATUS_CONFIG: Record<string, { label: string; bgClass: string; textClass: string }> = {
  pending_verification: { label: 'Pending', bgClass: 'bg-amber-100', textClass: 'text-amber-700' },
  active: { label: 'Active', bgClass: 'bg-green-100', textClass: 'text-green-700' },
  suspended: { label: 'Suspended', bgClass: 'bg-red-100', textClass: 'text-red-700' },
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

export default function AdminClientsPage() {
  const { state } = useAuth();

  const [clients, setClients] = React.useState<Client[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [filter, setFilter] = React.useState('all');

  React.useEffect(() => {
    const loadClients = async () => {
      setIsLoading(true);

      const response = await adminApi.getClients();

      if (response.success && response.data) {
        const data = response.data as { clients: Client[] };
        setClients(data.clients);
      }

      setIsLoading(false);
    };

    loadClients();
  }, []);

  if (!isAdmin(state)) {
    return null;
  }

  const filteredClients =
    filter === 'all'
      ? clients
      : filter === 'subscribed'
      ? clients.filter((c) => c.subscription && c.subscription.status === 'active')
      : clients.filter((c) => c.status === filter);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-display-sm text-ink mb-2">Clients</h1>
        <p className="font-body text-body-md text-slate-blue">
          View all client organisations and their subscriptions.
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {[
          { value: 'all', label: 'All' },
          { value: 'subscribed', label: 'Subscribed' },
          { value: 'active', label: 'Active' },
          { value: 'pending_verification', label: 'Pending' },
        ].map((option) => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)}
            className={`px-4 py-2 rounded-sm font-body text-body-sm transition-colors ${
              filter === option.value
                ? 'bg-slate-blue text-mist'
                : 'bg-slate-blue/10 text-slate-blue hover:bg-slate-blue/20'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-pulse mb-4">
            <div className="w-16 h-16 bg-slate-blue/20 rounded-full mx-auto" />
          </div>
          <p className="font-body text-body-md text-slate-blue">Loading clients...</p>
        </div>
      ) : filteredClients.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-sm border border-neutral-grey/20">
          <p className="font-body text-body-md text-slate-blue">No clients found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredClients.map((client) => {
            const statusConfig = STATUS_CONFIG[client.status] || STATUS_CONFIG.active;

            return (
              <div
                key={client.clientId}
                className="bg-white p-6 rounded-sm border border-neutral-grey/20"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-display text-lg text-ink">{client.organisationName}</h3>
                      <span
                        className={`px-2 py-0.5 text-xs font-semibold rounded ${statusConfig.bgClass} ${statusConfig.textClass}`}
                      >
                        {statusConfig.label}
                      </span>
                      {client.subscription && (
                        <span className="px-2 py-0.5 bg-rich-gold/20 text-rich-gold text-xs font-semibold rounded">
                          {client.subscription.tier}
                        </span>
                      )}
                    </div>

                    <p className="font-body text-body-sm text-slate-blue mb-2">
                      {ORG_TYPE_LABELS[client.organisationType] || client.organisationType}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 font-body text-body-sm">
                      <div>
                        <span className="text-slate-blue">Contact:</span>{' '}
                        <span className="text-ink">{client.contactName}</span>
                      </div>
                      <div>
                        <span className="text-slate-blue">Email:</span>{' '}
                        <a
                          href={`mailto:${client.contactEmail}`}
                          className="text-ink hover:underline"
                        >
                          {client.contactEmail}
                        </a>
                      </div>
                      <div>
                        <span className="text-slate-blue">Phone:</span>{' '}
                        <a href={`tel:${client.contactPhone}`} className="text-ink hover:underline">
                          {client.contactPhone}
                        </a>
                      </div>
                    </div>

                    {client.subscription && (
                      <div className="mt-3 pt-3 border-t border-neutral-grey/10">
                        <span className="font-body text-body-sm text-slate-blue">
                          Subscription: {client.subscription.tier} •{' '}
                          {client.subscription.creditsRemaining === -1
                            ? 'Unlimited credits'
                            : `${client.subscription.creditsRemaining} credits remaining`}
                        </span>
                      </div>
                    )}

                    <div className="mt-2 font-body text-body-sm text-slate-blue/60">
                      Registered{' '}
                      {new Date(client.createdAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </div>
                  </div>

                  <div className="ml-4 shrink-0">
                    <Link href={`/admin/clients/${client.clientId}`}>
                      <Button variant="secondary">View</Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
