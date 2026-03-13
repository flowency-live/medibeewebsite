'use client';

/**
 * Admin Contacts Page
 *
 * Manage contact requests and resolution.
 */

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAuth, isAdmin } from '@/lib/auth';
import { adminApi } from '@/lib/api';
import { Button } from '@/components/ui';

interface ContactRequest {
  contactId: string;
  candidateId: string;
  candidateName: string;
  clientId: string;
  clientName: string;
  status: 'pending' | 'contacted' | 'hired' | 'declined';
  createdAt: string;
  updatedAt: string;
}

const STATUS_CONFIG: Record<string, { label: string; bgClass: string; textClass: string }> = {
  pending: { label: 'Pending', bgClass: 'bg-amber-100', textClass: 'text-amber-700' },
  contacted: { label: 'Contacted', bgClass: 'bg-blue-100', textClass: 'text-blue-700' },
  hired: { label: 'Hired', bgClass: 'bg-green-100', textClass: 'text-green-700' },
  declined: { label: 'Declined', bgClass: 'bg-neutral-grey/20', textClass: 'text-slate-blue' },
};

export default function AdminContactsPage() {
  const searchParams = useSearchParams();
  const { state } = useAuth();

  const statusFilter = searchParams.get('status') || 'all';

  const [contacts, setContacts] = React.useState<ContactRequest[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [actionLoading, setActionLoading] = React.useState<string | null>(null);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  const loadContacts = React.useCallback(async () => {
    setIsLoading(true);

    const params: Record<string, string> = {};
    if (statusFilter !== 'all') {
      params.status = statusFilter;
    }

    const response = await adminApi.getContacts(params);

    if (response.success && response.data) {
      const data = response.data as { contacts: ContactRequest[] };
      setContacts(data.contacts);
    }

    setIsLoading(false);
  }, [statusFilter]);

  React.useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  const handleResolve = async (contactId: string, newStatus: string) => {
    setActionLoading(contactId);
    setError('');
    setSuccess('');

    const response = await adminApi.resolveContact(contactId, newStatus);

    if (response.success) {
      setSuccess(`Contact marked as ${newStatus}.`);
      await loadContacts();
    } else {
      setError((response as { message?: string }).message || 'Failed to update contact.');
    }

    setActionLoading(null);
  };

  if (!isAdmin(state)) {
    return null;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-display-sm text-ink mb-2">Contact Requests</h1>
        <p className="font-body text-body-md text-slate-blue">
          Manage and resolve contact requests between clients and candidates.
        </p>
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
          <Link
            key={option.value}
            href={`/admin/contacts${option.value !== 'all' ? `?status=${option.value}` : ''}`}
            className={`px-4 py-2 rounded-sm font-body text-body-sm transition-colors ${
              statusFilter === option.value
                ? 'bg-slate-blue text-mist'
                : 'bg-slate-blue/10 text-slate-blue hover:bg-slate-blue/20'
            }`}
          >
            {option.label}
          </Link>
        ))}
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-[3px] border-red-500" role="alert">
          <p className="font-body text-body-sm text-red-800">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border-l-[3px] border-green-500" role="status">
          <p className="font-body text-body-sm text-green-800">{success}</p>
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-pulse mb-4">
            <div className="w-16 h-16 bg-slate-blue/20 rounded-full mx-auto" />
          </div>
          <p className="font-body text-body-md text-slate-blue">Loading contacts...</p>
        </div>
      ) : contacts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-sm border border-neutral-grey/20">
          <p className="font-body text-body-md text-slate-blue">
            No {statusFilter !== 'all' ? statusFilter : ''} contacts found.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact) => {
            const statusConfig = STATUS_CONFIG[contact.status] || STATUS_CONFIG.pending;
            const isActionLoading = actionLoading === contact.contactId;

            return (
              <div
                key={contact.contactId}
                className="bg-white p-6 rounded-sm border border-neutral-grey/20"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`px-2 py-0.5 text-xs font-semibold rounded ${statusConfig.bgClass} ${statusConfig.textClass}`}
                      >
                        {statusConfig.label}
                      </span>
                      <span className="font-body text-body-sm text-slate-blue/60">
                        {new Date(contact.createdAt).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="font-body text-body-sm text-slate-blue mb-1">Client</div>
                        <Link
                          href={`/admin/clients/${contact.clientId}`}
                          className="font-body text-body-md text-ink hover:underline"
                        >
                          {contact.clientName}
                        </Link>
                      </div>
                      <div>
                        <div className="font-body text-body-sm text-slate-blue mb-1">Candidate</div>
                        <Link
                          href={`/admin/candidates/${contact.candidateId}`}
                          className="font-body text-body-md text-ink hover:underline"
                        >
                          {contact.candidateName}
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="ml-4 shrink-0">
                    {contact.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleResolve(contact.contactId, 'contacted')}
                          disabled={isActionLoading}
                        >
                          {isActionLoading ? '...' : 'Mark Contacted'}
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleResolve(contact.contactId, 'declined')}
                          disabled={isActionLoading}
                        >
                          {isActionLoading ? '...' : 'Decline'}
                        </Button>
                      </div>
                    )}

                    {contact.status === 'contacted' && (
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleResolve(contact.contactId, 'hired')}
                          disabled={isActionLoading}
                        >
                          {isActionLoading ? '...' : 'Mark Hired'}
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => handleResolve(contact.contactId, 'declined')}
                          disabled={isActionLoading}
                        >
                          {isActionLoading ? '...' : 'Decline'}
                        </Button>
                      </div>
                    )}

                    {(contact.status === 'hired' || contact.status === 'declined') && (
                      <span className="font-body text-body-sm text-slate-blue">
                        Resolved{' '}
                        {new Date(contact.updatedAt).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </span>
                    )}
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
