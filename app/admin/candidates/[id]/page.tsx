'use client';

/**
 * Admin Candidate Detail Page
 *
 * Full candidate profile with moderation actions.
 */

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth, isAdmin } from '@/lib/auth';
import { adminApi } from '@/lib/api';
import { Button } from '@/components/ui';

interface CandidateDetail {
  candidateId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  experienceLevel: string;
  settings: string[];
  qualifications: string[];
  summary: string;
  status: 'pending' | 'active' | 'suspended' | 'rejected';
  available: boolean;
  cv?: {
    filename: string;
    uploadedAt: string;
  };
  createdAt: string;
  updatedAt: string;
  contacts: Array<{
    contactId: string;
    clientName: string;
    status: string;
    createdAt: string;
  }>;
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

const SETTING_LABELS: Record<string, string> = {
  'mental-health': 'Mental Health',
  'acute-care': 'Acute Care',
  'private-hospital': 'Private Hospital',
  'care-home': 'Care Home',
  'supported-living': 'Supported Living',
  'end-of-life': 'End of Life',
  community: 'Community',
};

export default function AdminCandidateDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { state } = useAuth();

  const candidateId = params.id as string;

  const [candidate, setCandidate] = React.useState<CandidateDetail | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [actionLoading, setActionLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  React.useEffect(() => {
    const loadCandidate = async () => {
      setIsLoading(true);

      const response = await adminApi.getCandidate(candidateId);

      if (response.success && response.data) {
        const data = response.data as { candidate: CandidateDetail };
        setCandidate(data.candidate);
      }

      setIsLoading(false);
    };

    loadCandidate();
  }, [candidateId]);

  const handleAction = async (action: 'approve' | 'reject' | 'suspend' | 'reinstate') => {
    setActionLoading(true);
    setError('');
    setSuccess('');

    let response;
    switch (action) {
      case 'approve':
        response = await adminApi.approveCandidate(candidateId);
        break;
      case 'reject':
        response = await adminApi.rejectCandidate(candidateId);
        break;
      case 'suspend':
        response = await adminApi.suspendCandidate(candidateId);
        break;
      case 'reinstate':
        response = await adminApi.reinstateCandidate(candidateId);
        break;
    }

    if (response.success) {
      setSuccess(`Candidate ${action}d successfully.`);
      // Reload candidate data
      const reloadResponse = await adminApi.getCandidate(candidateId);
      if (reloadResponse.success && reloadResponse.data) {
        const data = reloadResponse.data as { candidate: CandidateDetail };
        setCandidate(data.candidate);
      }
    } else {
      setError((response as { message?: string }).message || `Failed to ${action} candidate.`);
    }

    setActionLoading(false);
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
        <p className="font-body text-body-md text-slate-blue">Loading candidate...</p>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="text-center py-12">
        <h1 className="font-display text-display-sm text-ink mb-4">Candidate Not Found</h1>
        <Link href="/admin/candidates">
          <Button>Back to Candidates</Button>
        </Link>
      </div>
    );
  }

  const statusConfig = STATUS_CONFIG[candidate.status] || STATUS_CONFIG.pending;

  return (
    <div>
      {/* Back Link */}
      <Link
        href="/admin/candidates"
        className="inline-flex items-center gap-2 font-body text-body-sm text-slate-blue hover:text-ink mb-6"
      >
        ← Back to candidates
      </Link>

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

      {/* Header */}
      <div className="bg-white p-6 rounded-sm border border-neutral-grey/20 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="font-display text-display-sm text-ink">
                {candidate.firstName} {candidate.lastName}
              </h1>
              <span
                className={`px-3 py-1 text-sm font-semibold rounded ${statusConfig.bgClass} ${statusConfig.textClass}`}
              >
                {statusConfig.label}
              </span>
              <span
                className={`px-2 py-0.5 text-xs rounded ${
                  candidate.available
                    ? 'bg-green-100 text-green-700'
                    : 'bg-neutral-grey/20 text-slate-blue'
                }`}
              >
                {candidate.available ? 'Available' : 'Not Available'}
              </span>
            </div>
            <p className="font-body text-body-md text-slate-blue">
              {EXPERIENCE_LABELS[candidate.experienceLevel] || candidate.experienceLevel}
            </p>
          </div>

          <div className="flex gap-2">
            {candidate.status === 'pending' && (
              <>
                <Button
                  onClick={() => handleAction('approve')}
                  disabled={actionLoading}
                >
                  {actionLoading ? '...' : 'Approve'}
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleAction('reject')}
                  disabled={actionLoading}
                >
                  {actionLoading ? '...' : 'Reject'}
                </Button>
              </>
            )}
            {candidate.status === 'active' && (
              <Button
                variant="danger"
                onClick={() => handleAction('suspend')}
                disabled={actionLoading}
              >
                {actionLoading ? '...' : 'Suspend'}
              </Button>
            )}
            {candidate.status === 'suspended' && (
              <Button
                onClick={() => handleAction('reinstate')}
                disabled={actionLoading}
              >
                {actionLoading ? '...' : 'Reinstate'}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-white p-6 rounded-sm border border-neutral-grey/20 mb-6">
        <h2 className="font-display text-lg text-ink mb-4">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="font-body text-body-sm text-slate-blue mb-1">Email</div>
            <a href={`mailto:${candidate.email}`} className="font-body text-body-md text-ink hover:underline">
              {candidate.email}
            </a>
          </div>
          <div>
            <div className="font-body text-body-sm text-slate-blue mb-1">Phone</div>
            <a href={`tel:${candidate.phone}`} className="font-body text-body-md text-ink hover:underline">
              {candidate.phone}
            </a>
          </div>
          <div>
            <div className="font-body text-body-sm text-slate-blue mb-1">Location</div>
            <p className="font-body text-body-md text-ink">{candidate.location}</p>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="bg-white p-6 rounded-sm border border-neutral-grey/20 mb-6">
        <h2 className="font-display text-lg text-ink mb-4">Profile</h2>

        <div className="mb-4">
          <div className="font-body text-body-sm text-slate-blue mb-2">Care Settings</div>
          <div className="flex flex-wrap gap-2">
            {candidate.settings.map((setting) => (
              <span
                key={setting}
                className="px-2 py-1 bg-slate-blue/10 text-slate-blue text-sm rounded"
              >
                {SETTING_LABELS[setting] || setting}
              </span>
            ))}
          </div>
        </div>

        {candidate.qualifications && candidate.qualifications.length > 0 && (
          <div className="mb-4">
            <div className="font-body text-body-sm text-slate-blue mb-2">Qualifications</div>
            <ul className="space-y-1">
              {candidate.qualifications.map((qual, index) => (
                <li key={index} className="font-body text-body-md text-ink flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  {qual}
                </li>
              ))}
            </ul>
          </div>
        )}

        {candidate.summary && (
          <div>
            <div className="font-body text-body-sm text-slate-blue mb-2">Summary</div>
            <p className="font-body text-body-md text-ink whitespace-pre-wrap">
              {candidate.summary}
            </p>
          </div>
        )}
      </div>

      {/* CV */}
      {candidate.cv && (
        <div className="bg-white p-6 rounded-sm border border-neutral-grey/20 mb-6">
          <h2 className="font-display text-lg text-ink mb-4">CV</h2>
          <p className="font-body text-body-md text-ink">
            📄 {candidate.cv.filename}
          </p>
          <p className="font-body text-body-sm text-slate-blue mt-1">
            Uploaded {new Date(candidate.cv.uploadedAt).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>
      )}

      {/* Contact History */}
      <div className="bg-white p-6 rounded-sm border border-neutral-grey/20 mb-6">
        <h2 className="font-display text-lg text-ink mb-4">Contact Requests</h2>
        {candidate.contacts && candidate.contacts.length > 0 ? (
          <div className="space-y-3">
            {candidate.contacts.map((contact) => (
              <div key={contact.contactId} className="flex items-center justify-between py-2 border-b border-neutral-grey/10 last:border-0">
                <div>
                  <p className="font-body text-body-md text-ink">{contact.clientName}</p>
                  <p className="font-body text-body-sm text-slate-blue">
                    {new Date(contact.createdAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <span className={`px-2 py-0.5 text-xs font-semibold rounded ${
                  contact.status === 'contacted' ? 'bg-blue-100 text-blue-700' :
                  contact.status === 'hired' ? 'bg-green-100 text-green-700' :
                  contact.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                  'bg-neutral-grey/20 text-slate-blue'
                }`}>
                  {contact.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="font-body text-body-md text-slate-blue">No contact requests yet.</p>
        )}
      </div>

      {/* Metadata */}
      <div className="bg-slate-blue/5 p-4 rounded-sm">
        <div className="flex gap-8 font-body text-body-sm text-slate-blue">
          <span>
            Registered:{' '}
            {new Date(candidate.createdAt).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
          <span>
            Last updated:{' '}
            {new Date(candidate.updatedAt).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
          <span>ID: {candidate.candidateId}</span>
        </div>
      </div>
    </div>
  );
}
