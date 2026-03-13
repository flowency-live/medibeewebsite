'use client';

/**
 * Admin Candidates Page
 *
 * List and moderate all candidates.
 */

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAuth, isAdmin } from '@/lib/auth';
import { adminApi } from '@/lib/api';
import { Button } from '@/components/ui';

interface Candidate {
  candidateId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  experienceLevel: string;
  status: 'pending' | 'active' | 'suspended' | 'rejected';
  createdAt: string;
}

const STATUS_CONFIG: Record<string, { label: string; bgClass: string; textClass: string }> = {
  pending: { label: 'Pending', bgClass: 'bg-amber-100', textClass: 'text-amber-700' },
  active: { label: 'Active', bgClass: 'bg-green-100', textClass: 'text-green-700' },
  suspended: { label: 'Suspended', bgClass: 'bg-red-100', textClass: 'text-red-700' },
  rejected: { label: 'Rejected', bgClass: 'bg-neutral-grey/20', textClass: 'text-slate-blue' },
};

const EXPERIENCE_LABELS: Record<string, string> = {
  'newly-qualified': 'Newly Qualified',
  '1-2-years': '1-2 Years',
  '3-5-years': '3-5 Years',
  '5-plus-years': '5+ Years',
};

export default function AdminCandidatesPage() {
  const searchParams = useSearchParams();
  const { state } = useAuth();

  const statusFilter = searchParams.get('status') || 'all';

  const [candidates, setCandidates] = React.useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [actionLoading, setActionLoading] = React.useState<string | null>(null);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  const loadCandidates = React.useCallback(async () => {
    setIsLoading(true);

    const params: Record<string, string> = {};
    if (statusFilter !== 'all') {
      params.status = statusFilter;
    }

    const response = await adminApi.listCandidates(params);

    if (response.success && response.data) {
      const data = response.data as { candidates: Candidate[] };
      setCandidates(data.candidates);
    }

    setIsLoading(false);
  }, [statusFilter]);

  React.useEffect(() => {
    loadCandidates();
  }, [loadCandidates]);

  const handleAction = async (
    candidateId: string,
    action: 'approve' | 'reject' | 'suspend' | 'reinstate'
  ) => {
    setActionLoading(candidateId);
    setError('');
    setSuccess('');

    let response;
    switch (action) {
      case 'approve':
        response = await adminApi.approveCandidate(candidateId);
        break;
      case 'reject':
        response = await adminApi.rejectCandidate(candidateId, 'Profile does not meet requirements');
        break;
      case 'suspend':
        response = await adminApi.suspendCandidate(candidateId, 'Account suspended by admin');
        break;
      case 'reinstate':
        response = await adminApi.reinstateCandidate(candidateId);
        break;
    }

    if (response.success) {
      setSuccess(`Candidate ${action}d successfully.`);
      await loadCandidates();
    } else {
      setError((response as { message?: string }).message || `Failed to ${action} candidate.`);
    }

    setActionLoading(null);
  };

  if (!isAdmin(state)) {
    return null;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-display-sm text-ink mb-2">Candidates</h1>
        <p className="font-body text-body-md text-slate-blue">
          Review and moderate candidate profiles.
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {[
          { value: 'all', label: 'All' },
          { value: 'pending', label: 'Pending' },
          { value: 'active', label: 'Active' },
          { value: 'suspended', label: 'Suspended' },
          { value: 'rejected', label: 'Rejected' },
        ].map((option) => (
          <Link
            key={option.value}
            href={`/admin/candidates${option.value !== 'all' ? `?status=${option.value}` : ''}`}
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
          <p className="font-body text-body-md text-slate-blue">Loading candidates...</p>
        </div>
      ) : candidates.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-sm border border-neutral-grey/20">
          <p className="font-body text-body-md text-slate-blue">
            No {statusFilter !== 'all' ? statusFilter : ''} candidates found.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {candidates.map((candidate) => {
            const statusConfig = STATUS_CONFIG[candidate.status] || STATUS_CONFIG.pending;
            const isActionLoading = actionLoading === candidate.candidateId;

            return (
              <div
                key={candidate.candidateId}
                className="bg-white p-6 rounded-sm border border-neutral-grey/20"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-display text-lg text-ink">
                        {candidate.firstName} {candidate.lastName}
                      </h3>
                      <span
                        className={`px-2 py-0.5 text-xs font-semibold rounded ${statusConfig.bgClass} ${statusConfig.textClass}`}
                      >
                        {statusConfig.label}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-body text-body-sm">
                      <div>
                        <span className="text-slate-blue">Email:</span>{' '}
                        <a
                          href={`mailto:${candidate.email}`}
                          className="text-ink hover:underline"
                        >
                          {candidate.email}
                        </a>
                      </div>
                      <div>
                        <span className="text-slate-blue">Phone:</span>{' '}
                        <a href={`tel:${candidate.phone}`} className="text-ink hover:underline">
                          {candidate.phone}
                        </a>
                      </div>
                      <div>
                        <span className="text-slate-blue">Location:</span>{' '}
                        <span className="text-ink">{candidate.location}</span>
                      </div>
                      <div>
                        <span className="text-slate-blue">Experience:</span>{' '}
                        <span className="text-ink">
                          {EXPERIENCE_LABELS[candidate.experienceLevel] ||
                            candidate.experienceLevel}
                        </span>
                      </div>
                    </div>

                    <div className="mt-2 font-body text-body-sm text-slate-blue/60">
                      Registered{' '}
                      {new Date(candidate.createdAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </div>
                  </div>

                  <div className="ml-4 shrink-0 flex gap-2">
                    {candidate.status === 'pending' && (
                      <>
                        <Button
                          onClick={() => handleAction(candidate.candidateId, 'approve')}
                          disabled={isActionLoading}
                        >
                          {isActionLoading ? '...' : 'Approve'}
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => handleAction(candidate.candidateId, 'reject')}
                          disabled={isActionLoading}
                        >
                          {isActionLoading ? '...' : 'Reject'}
                        </Button>
                      </>
                    )}

                    {candidate.status === 'active' && (
                      <Button
                        variant="secondary"
                        onClick={() => handleAction(candidate.candidateId, 'suspend')}
                        disabled={isActionLoading}
                      >
                        {isActionLoading ? '...' : 'Suspend'}
                      </Button>
                    )}

                    {candidate.status === 'suspended' && (
                      <Button
                        onClick={() => handleAction(candidate.candidateId, 'reinstate')}
                        disabled={isActionLoading}
                      >
                        {isActionLoading ? '...' : 'Reinstate'}
                      </Button>
                    )}

                    <Link href={`/admin/candidates/${candidate.candidateId}`}>
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
