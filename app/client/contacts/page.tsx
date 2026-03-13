'use client';

/**
 * Contact Requests Page
 *
 * View contact request history and status.
 */

import * as React from 'react';
import Link from 'next/link';
import { useAuth, isClient } from '@/lib/auth';
import { contactsApi } from '@/lib/api';
import { Button } from '@/components/ui';

interface ContactRequest {
  contactId: string;
  candidateId: string;
  candidateName: string;
  candidateEmail?: string;
  candidatePhone?: string;
  status: 'pending' | 'contacted' | 'hired' | 'declined';
  createdAt: string;
  updatedAt: string;
}

const STATUS_CONFIG: Record<
  string,
  { label: string; bgClass: string; textClass: string }
> = {
  pending: {
    label: 'Pending',
    bgClass: 'bg-amber-100',
    textClass: 'text-amber-700',
  },
  contacted: {
    label: 'Contacted',
    bgClass: 'bg-blue-100',
    textClass: 'text-blue-700',
  },
  hired: {
    label: 'Hired',
    bgClass: 'bg-green-100',
    textClass: 'text-green-700',
  },
  declined: {
    label: 'Declined',
    bgClass: 'bg-neutral-grey/20',
    textClass: 'text-slate-blue',
  },
};

export default function ContactsPage() {
  const { state } = useAuth();

  const [contacts, setContacts] = React.useState<ContactRequest[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [filter, setFilter] = React.useState<string>('all');

  React.useEffect(() => {
    const loadContacts = async () => {
      setIsLoading(true);

      const response = await contactsApi.getContacts();

      if (response.success && response.data) {
        const data = response.data as { contacts: ContactRequest[] };
        setContacts(data.contacts);
      }

      setIsLoading(false);
    };

    loadContacts();
  }, []);

  if (!isClient(state)) {
    return null;
  }

  const { subscription } = state;

  const filteredContacts =
    filter === 'all' ? contacts : contacts.filter((c) => c.status === filter);

  const pendingCount = contacts.filter((c) => c.status === 'pending').length;
  const contactedCount = contacts.filter((c) => c.status === 'contacted').length;
  const hiredCount = contacts.filter((c) => c.status === 'hired').length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-display-sm text-ink mb-2">Contact Requests</h1>
        <p className="font-body text-body-md text-slate-blue">
          Track your contact requests and hiring progress.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-sm border border-neutral-grey/20">
          <div className="font-body text-body-sm text-slate-blue mb-1">Total Requests</div>
          <div className="font-display text-xl text-ink">{contacts.length}</div>
        </div>
        <div className="bg-white p-4 rounded-sm border border-neutral-grey/20">
          <div className="font-body text-body-sm text-slate-blue mb-1">Pending</div>
          <div className="font-display text-xl text-amber-600">{pendingCount}</div>
        </div>
        <div className="bg-white p-4 rounded-sm border border-neutral-grey/20">
          <div className="font-body text-body-sm text-slate-blue mb-1">In Progress</div>
          <div className="font-display text-xl text-blue-600">{contactedCount}</div>
        </div>
        <div className="bg-white p-4 rounded-sm border border-neutral-grey/20">
          <div className="font-body text-body-sm text-slate-blue mb-1">Hired</div>
          <div className="font-display text-xl text-green-600">{hiredCount}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {[
          { value: 'all', label: 'All' },
          { value: 'pending', label: 'Pending' },
          { value: 'contacted', label: 'Contacted' },
          { value: 'hired', label: 'Hired' },
          { value: 'declined', label: 'Declined' },
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
          <p className="font-body text-body-md text-slate-blue">Loading contact requests...</p>
        </div>
      ) : contacts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-sm border border-neutral-grey/20">
          <p className="font-body text-body-md text-slate-blue mb-2">No contact requests yet</p>
          <p className="font-body text-body-sm text-slate-blue/70 mb-6">
            Browse candidates and request their contact details
          </p>
          <Link href="/client/candidates">
            <Button>Browse Candidates</Button>
          </Link>
        </div>
      ) : filteredContacts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-sm border border-neutral-grey/20">
          <p className="font-body text-body-md text-slate-blue">
            No {filter} contact requests found
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredContacts.map((contact) => {
            const statusConfig = STATUS_CONFIG[contact.status] || STATUS_CONFIG.pending;

            return (
              <div
                key={contact.contactId}
                className="bg-white p-6 rounded-sm border border-neutral-grey/20"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Link
                        href={`/client/candidates/${contact.candidateId}`}
                        className="font-display text-lg text-ink hover:text-slate-blue transition-colors"
                      >
                        {contact.candidateName}
                      </Link>
                      <span
                        className={`px-2 py-0.5 text-xs font-semibold rounded ${statusConfig.bgClass} ${statusConfig.textClass}`}
                      >
                        {statusConfig.label}
                      </span>
                    </div>

                    <div className="font-body text-body-sm text-slate-blue">
                      Requested{' '}
                      {new Date(contact.createdAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </div>

                    {/* Contact details (shown when contacted or hired) */}
                    {(contact.status === 'contacted' || contact.status === 'hired') && (
                      <div className="mt-4 p-4 bg-slate-blue/5 rounded-sm">
                        <h3 className="font-body text-body-sm text-slate-blue mb-2">
                          Contact Details
                        </h3>
                        {contact.candidateEmail && (
                          <p className="font-body text-body-md text-ink">
                            ✉️{' '}
                            <a
                              href={`mailto:${contact.candidateEmail}`}
                              className="hover:underline"
                            >
                              {contact.candidateEmail}
                            </a>
                          </p>
                        )}
                        {contact.candidatePhone && (
                          <p className="font-body text-body-md text-ink mt-1">
                            📞{' '}
                            <a href={`tel:${contact.candidatePhone}`} className="hover:underline">
                              {contact.candidatePhone}
                            </a>
                          </p>
                        )}
                      </div>
                    )}

                    {contact.status === 'pending' && (
                      <div className="mt-4 p-4 bg-amber-50 rounded-sm">
                        <p className="font-body text-body-sm text-amber-800">
                          We&apos;re processing your request. You&apos;ll receive the candidate&apos;s
                          contact details once they confirm.
                        </p>
                      </div>
                    )}

                    {contact.status === 'declined' && (
                      <div className="mt-4 p-4 bg-neutral-grey/10 rounded-sm">
                        <p className="font-body text-body-sm text-slate-blue">
                          This candidate is no longer available. Your contact credit has been
                          refunded.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="ml-4 shrink-0">
                    <Link href={`/client/candidates/${contact.candidateId}`}>
                      <Button variant="secondary">View Profile</Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Credit Info */}
      {subscription && (
        <div className="mt-8 bg-slate-blue/5 p-6 rounded-sm border border-slate-blue/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-body text-body-md text-ink">
                {subscription.creditsRemaining === -1
                  ? 'Unlimited contact credits'
                  : `${subscription.creditsRemaining} contact credits remaining this month`}
              </p>
              <p className="font-body text-body-sm text-slate-blue">
                Credits refresh at the start of each billing cycle
              </p>
            </div>
            {subscription.creditsRemaining === 0 && (
              <Link href="/client/subscription">
                <Button>Get More Credits</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
