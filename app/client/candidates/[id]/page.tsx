'use client';

/**
 * View Candidate Profile Page
 *
 * Full candidate profile with contact request button.
 */

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth, isClient } from '@/lib/auth';
import { matchingApi, shortlistsApi, contactsApi } from '@/lib/api';
import { Button } from '@/components/ui';

interface CandidateProfile {
  candidateId: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  location: string;
  experienceLevel: string;
  settings: string[];
  available: boolean;
  summary?: string;
  qualifications?: string[];
  cv?: {
    filename: string;
    uploadedAt: string;
  };
}

interface Shortlist {
  shortlistId: string;
  name: string;
  candidateCount: number;
}

const EXPERIENCE_LABELS: Record<string, string> = {
  'newly-qualified': 'Newly Qualified',
  '1-2-years': '1-2 Years Experience',
  '3-5-years': '3-5 Years Experience',
  '5-plus-years': '5+ Years Experience',
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

export default function ViewCandidatePage() {
  const params = useParams();
  const router = useRouter();
  const { state, refreshProfile } = useAuth();

  const candidateId = params.id as string;

  const [candidate, setCandidate] = React.useState<CandidateProfile | null>(null);
  const [shortlists, setShortlists] = React.useState<Shortlist[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isContactLoading, setIsContactLoading] = React.useState(false);
  const [showShortlistModal, setShowShortlistModal] = React.useState(false);
  const [contactRequested, setContactRequested] = React.useState(false);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  React.useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      const [candidateResponse, shortlistsResponse] = await Promise.all([
        matchingApi.getCandidate(candidateId),
        shortlistsApi.getShortlists(),
      ]);

      if (candidateResponse.success && candidateResponse.data) {
        const data = candidateResponse.data as { candidate: CandidateProfile };
        setCandidate(data.candidate);
      }

      if (shortlistsResponse.success && shortlistsResponse.data) {
        const data = shortlistsResponse.data as { shortlists: Shortlist[] };
        setShortlists(data.shortlists);
      }

      setIsLoading(false);
    };

    loadData();
  }, [candidateId]);

  const handleRequestContact = async () => {
    if (!isClient(state)) return;

    const { subscription } = state;

    if (!subscription) {
      setError('You need an active subscription to request contact.');
      return;
    }

    if (subscription.creditsRemaining === 0) {
      setError('You have no contact credits remaining. Please upgrade your plan.');
      return;
    }

    setIsContactLoading(true);
    setError('');

    const response = await contactsApi.requestContact({ candidateId });

    if (response.success) {
      setContactRequested(true);
      setSuccess('Contact request sent successfully! We will be in touch shortly.');
      await refreshProfile(); // Refresh to update credits
    } else {
      setError((response as { message?: string }).message || 'Failed to request contact.');
    }

    setIsContactLoading(false);
  };

  const handleAddToShortlist = async (shortlistId: string) => {
    const response = await shortlistsApi.addToShortlist(shortlistId, candidateId);

    if (response.success) {
      setShowShortlistModal(false);
      setSuccess('Candidate added to shortlist!');
    } else {
      setError((response as { message?: string }).message || 'Failed to add to shortlist.');
    }
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
        <p className="font-body text-body-md text-slate-blue">Loading candidate profile...</p>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="text-center py-12">
        <h1 className="font-display text-display-sm text-ink mb-4">Candidate Not Found</h1>
        <p className="font-body text-body-md text-slate-blue mb-6">
          This candidate may no longer be available.
        </p>
        <Link href="/client/candidates">
          <Button>Back to Search</Button>
        </Link>
      </div>
    );
  }

  const isBronze = subscription?.tier === 'Bronze';

  return (
    <div className="max-w-4xl">
      {/* Back Link */}
      <Link
        href="/client/candidates"
        className="inline-flex items-center gap-2 font-body text-body-sm text-slate-blue hover:text-ink mb-6"
      >
        ← Back to search
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

      {/* Profile Header */}
      <div className="bg-white p-8 rounded-sm border border-neutral-grey/20 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h1 className="font-display text-display-sm text-ink">
                {candidate.firstName} {isBronze ? `${candidate.lastName.charAt(0)}.` : candidate.lastName}
              </h1>
              <span
                className={`px-3 py-1 text-sm font-semibold rounded ${
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

          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setShowShortlistModal(true)}>
              Add to Shortlist
            </Button>
            <Button
              onClick={handleRequestContact}
              disabled={isContactLoading || contactRequested || !subscription}
            >
              {isContactLoading
                ? 'Requesting...'
                : contactRequested
                ? 'Contact Requested'
                : 'Request Contact'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="font-body text-body-sm text-slate-blue mb-1">Location</h2>
            <p className="font-body text-body-md text-ink">{candidate.location}</p>
          </div>

          <div>
            <h2 className="font-body text-body-sm text-slate-blue mb-1">Care Settings</h2>
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
        </div>
      </div>

      {/* Profile Summary */}
      {candidate.summary && (
        <div className="bg-white p-8 rounded-sm border border-neutral-grey/20 mb-6">
          <h2 className="font-display text-lg text-ink mb-4">About</h2>
          <p className="font-body text-body-md text-ink whitespace-pre-wrap">
            {isBronze ? candidate.summary.substring(0, 200) + '...' : candidate.summary}
          </p>
          {isBronze && (
            <p className="mt-4 font-body text-body-sm text-slate-blue">
              <Link href="/client/subscription" className="text-rich-gold hover:underline">
                Upgrade to Silver or Gold
              </Link>{' '}
              to see the full profile.
            </p>
          )}
        </div>
      )}

      {/* Qualifications */}
      {candidate.qualifications && candidate.qualifications.length > 0 && (
        <div className="bg-white p-8 rounded-sm border border-neutral-grey/20 mb-6">
          <h2 className="font-display text-lg text-ink mb-4">Qualifications</h2>
          <ul className="space-y-2">
            {candidate.qualifications.map((qual, index) => (
              <li key={index} className="flex items-center gap-2 font-body text-body-md text-ink">
                <span className="text-green-600">✓</span>
                {qual}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CV */}
      {candidate.cv && !isBronze && (
        <div className="bg-white p-8 rounded-sm border border-neutral-grey/20 mb-6">
          <h2 className="font-display text-lg text-ink mb-4">CV</h2>
          <p className="font-body text-body-md text-slate-blue">
            CV uploaded: {candidate.cv.filename}
          </p>
          <p className="font-body text-body-sm text-slate-blue mt-1">
            CV will be shared after contact is confirmed.
          </p>
        </div>
      )}

      {/* Credit Info */}
      {subscription && (
        <div className="bg-slate-blue/5 p-6 rounded-sm border border-slate-blue/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-body text-body-md text-ink">
                {subscription.creditsRemaining === -1
                  ? 'Unlimited contact credits'
                  : `${subscription.creditsRemaining} contact credits remaining`}
              </p>
              <p className="font-body text-body-sm text-slate-blue">
                Requesting contact uses 1 credit
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

      {/* Shortlist Modal */}
      {showShortlistModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-sm max-w-md w-full mx-4">
            <h2 className="font-display text-lg text-ink mb-4">Add to Shortlist</h2>

            {shortlists.length === 0 ? (
              <div>
                <p className="font-body text-body-md text-slate-blue mb-4">
                  You don&apos;t have any shortlists yet.
                </p>
                <div className="flex gap-4">
                  <Link href="/client/shortlists">
                    <Button>Create Shortlist</Button>
                  </Link>
                  <Button variant="secondary" onClick={() => setShowShortlistModal(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <ul className="space-y-2 mb-4">
                  {shortlists.map((shortlist) => (
                    <li key={shortlist.shortlistId}>
                      <button
                        onClick={() => handleAddToShortlist(shortlist.shortlistId)}
                        className="w-full text-left px-4 py-3 rounded-sm border border-neutral-grey/20 hover:border-slate-blue/30 hover:bg-slate-blue/5 transition-colors"
                      >
                        <span className="font-body text-body-md text-ink">{shortlist.name}</span>
                        <span className="font-body text-body-sm text-slate-blue ml-2">
                          ({shortlist.candidateCount} candidates)
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
                <Button variant="secondary" onClick={() => setShowShortlistModal(false)}>
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
