'use client';

/**
 * Shortlist Detail Page
 *
 * View candidates in a shortlist with remove functionality.
 */

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth, isClient } from '@/lib/auth';
import { shortlistsApi, contactsApi } from '@/lib/api';
import { Button } from '@/components/ui';

interface Candidate {
  candidateId: string;
  firstName: string;
  lastName: string;
  location: string;
  experienceLevel: string;
  settings: string[];
  available: boolean;
  addedAt: string;
}

interface Shortlist {
  shortlistId: string;
  name: string;
  description?: string;
  candidates: Candidate[];
  createdAt: string;
  updatedAt: string;
}

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

export default function ShortlistDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { state, refreshProfile } = useAuth();

  const shortlistId = params.id as string;

  const [shortlist, setShortlist] = React.useState<Shortlist | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [removingId, setRemovingId] = React.useState<string | null>(null);
  const [contactingId, setContactingId] = React.useState<string | null>(null);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  const loadShortlist = React.useCallback(async () => {
    setIsLoading(true);

    const response = await shortlistsApi.get(shortlistId);

    if (response.success && response.data) {
      const data = response.data as { shortlist: Shortlist };
      setShortlist(data.shortlist);
    }

    setIsLoading(false);
  }, [shortlistId]);

  React.useEffect(() => {
    loadShortlist();
  }, [loadShortlist]);

  const handleRemove = async (candidateId: string) => {
    setRemovingId(candidateId);
    setError('');

    const response = await shortlistsApi.removeCandidate(shortlistId, candidateId);

    if (response.success) {
      setSuccess('Candidate removed from shortlist.');
      await loadShortlist();
    } else {
      setError((response as { message?: string }).message || 'Failed to remove candidate.');
    }

    setRemovingId(null);
  };

  const handleRequestContact = async (candidateId: string) => {
    if (!isClient(state)) return;

    const { subscription } = state;

    if (!subscription || subscription.creditsRemaining === 0) {
      setError('You have no contact credits remaining.');
      return;
    }

    setContactingId(candidateId);
    setError('');

    const response = await contactsApi.request({ candidateId, message: 'Contact request' });

    if (response.success) {
      setSuccess('Contact request sent successfully!');
      await refreshProfile();
    } else {
      setError((response as { message?: string }).message || 'Failed to request contact.');
    }

    setContactingId(null);
  };

  if (!isClient(state)) {
    return null;
  }

  const { subscription } = state;

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-pulse mb-4">
          <div className="w-16 h-16 bg-slate-blue/20 rounded-full mx-auto" />
        </div>
        <p className="font-body text-body-md text-slate-blue">Loading shortlist...</p>
      </div>
    );
  }

  if (!shortlist) {
    return (
      <div className="text-center py-12">
        <h1 className="font-display text-display-sm text-ink mb-4">Shortlist Not Found</h1>
        <p className="font-body text-body-md text-slate-blue mb-6">
          This shortlist may have been deleted.
        </p>
        <Link href="/client/shortlists">
          <Button>Back to Shortlists</Button>
        </Link>
      </div>
    );
  }

  const isBronze = subscription?.tier === 'bronze';

  return (
    <div>
      {/* Back Link */}
      <Link
        href="/client/shortlists"
        className="inline-flex items-center gap-2 font-body text-body-sm text-slate-blue hover:text-ink mb-6"
      >
        ← Back to shortlists
      </Link>

      <div className="mb-8">
        <h1 className="font-display text-display-sm text-ink mb-2">{shortlist.name}</h1>
        {shortlist.description && (
          <p className="font-body text-body-md text-slate-blue">{shortlist.description}</p>
        )}
        <p className="font-body text-body-sm text-slate-blue/70 mt-2">
          {shortlist.candidates.length} candidate
          {shortlist.candidates.length !== 1 ? 's' : ''} • Last updated{' '}
          {new Date(shortlist.updatedAt).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </p>
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

      {shortlist.candidates.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-sm border border-neutral-grey/20">
          <p className="font-body text-body-md text-slate-blue mb-2">No candidates in this shortlist</p>
          <p className="font-body text-body-sm text-slate-blue/70 mb-6">
            Browse candidates and add them to this shortlist
          </p>
          <Link href="/client/candidates">
            <Button>Browse Candidates</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {shortlist.candidates.map((candidate) => (
            <div
              key={candidate.candidateId}
              className="bg-white p-6 rounded-sm border border-neutral-grey/20"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Link
                      href={`/client/candidates/${candidate.candidateId}`}
                      className="font-display text-lg text-ink hover:text-slate-blue transition-colors"
                    >
                      {candidate.firstName}{' '}
                      {isBronze ? `${candidate.lastName.charAt(0)}.` : candidate.lastName}
                    </Link>
                    <span
                      className={`px-2 py-0.5 text-xs font-semibold rounded ${
                        candidate.available
                          ? 'bg-green-100 text-green-700'
                          : 'bg-neutral-grey/20 text-slate-blue'
                      }`}
                    >
                      {candidate.available ? 'Available' : 'Not Available'}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 mb-3 font-body text-body-sm text-slate-blue">
                    <span>📍 {candidate.location}</span>
                    <span>
                      💼{' '}
                      {EXPERIENCE_LABELS[candidate.experienceLevel] || candidate.experienceLevel}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {candidate.settings.slice(0, 3).map((setting) => (
                      <span
                        key={setting}
                        className="px-2 py-0.5 bg-slate-blue/10 text-slate-blue text-xs rounded"
                      >
                        {SETTING_LABELS[setting] || setting}
                      </span>
                    ))}
                    {candidate.settings.length > 3 && (
                      <span className="px-2 py-0.5 bg-slate-blue/10 text-slate-blue text-xs rounded">
                        +{candidate.settings.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="ml-4 shrink-0 flex gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => handleRequestContact(candidate.candidateId)}
                    disabled={
                      contactingId === candidate.candidateId ||
                      !subscription ||
                      subscription.creditsRemaining === 0
                    }
                  >
                    {contactingId === candidate.candidateId ? 'Requesting...' : 'Request Contact'}
                  </Button>
                  <button
                    onClick={() => handleRemove(candidate.candidateId)}
                    disabled={removingId === candidate.candidateId}
                    className="px-3 py-2 text-slate-blue/50 hover:text-red-600 transition-colors disabled:opacity-50"
                    aria-label="Remove from shortlist"
                  >
                    {removingId === candidate.candidateId ? '...' : '✕'}
                  </button>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-neutral-grey/10">
                <p className="font-body text-body-sm text-slate-blue/60">
                  Added{' '}
                  {new Date(candidate.addedAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Credit Info */}
      {subscription && shortlist.candidates.length > 0 && (
        <div className="mt-8 bg-slate-blue/5 p-6 rounded-sm border border-slate-blue/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-body text-body-md text-ink">
                {subscription.creditsRemaining === -1
                  ? 'Unlimited contact credits'
                  : `${subscription.creditsRemaining} contact credits remaining`}
              </p>
              <p className="font-body text-body-sm text-slate-blue">
                Requesting contact uses 1 credit per candidate
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
