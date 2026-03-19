'use client';

/**
 * Candidate Detail Page (Client View)
 *
 * Full candidate profile with introduction request functionality.
 * Uses CandidateProfilePreview component for consistent employer view.
 */

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth, isClient } from '@/lib/auth';
import { matchingApi, shortlistsApi, contactsApi } from '@/lib/api';
import { CandidateProfilePreview, PortalCard, StatusBadge } from '@/components/portal';
import { personas } from '@/lib/test-data';
import type { CandidateProfile } from '@/lib/auth/types';
import type { Credential } from '@/components/portal/CredentialCard';

interface Shortlist {
  shortlistId: string;
  name: string;
  candidateCount: number;
}

// Get test candidate data by ID
function getTestCandidate(candidateId: string): { profile: CandidateProfile; credentials: Credential[] } | null {
  const personaEntries = Object.entries(personas);
  for (const [, data] of personaEntries) {
    if (data.profile.candidateId === candidateId) {
      return { profile: data.profile, credentials: data.credentials };
    }
  }
  return null;
}

export default function ViewCandidatePage() {
  const params = useParams();
  const router = useRouter();
  const { state, refreshProfile } = useAuth();

  const candidateId = params.id as string;

  const [candidateData, setCandidateData] = React.useState<{ profile: CandidateProfile; credentials: Credential[] } | null>(null);
  const [shortlists, setShortlists] = React.useState<Shortlist[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isContactLoading, setIsContactLoading] = React.useState(false);
  const [showShortlistModal, setShowShortlistModal] = React.useState(false);
  const [showIntroductionModal, setShowIntroductionModal] = React.useState(false);
  const [contactRequested, setContactRequested] = React.useState(false);
  const [introductionMessage, setIntroductionMessage] = React.useState('');
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  // TODO(PROD-WIRE): Replace test data with actual API calls
  // See: .claude/BACKEND_WIRING_TODO.md for full instructions
  // Production code:
  //   const [candidateRes, shortlistsRes] = await Promise.all([
  //     matchingApi.getCandidate(candidateId),
  //     shortlistsApi.list(),
  //   ]);
  React.useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      // For demo, use test data
      const testData = getTestCandidate(candidateId);
      if (testData) {
        setCandidateData(testData);
      }

      // Mock shortlists for demo
      setShortlists([
        { shortlistId: 'sl-1', name: 'Mental Health Specialists', candidateCount: 5 },
        { shortlistId: 'sl-2', name: 'Urgent Positions', candidateCount: 3 },
      ]);

      setIsLoading(false);
    };

    loadData();
  }, [candidateId]);

  const handleRequestIntroduction = async () => {
    if (!isClient(state)) return;

    const { subscription } = state;

    if (!subscription) {
      setError('You need an active subscription to request introductions.');
      return;
    }

    if (subscription.creditsRemaining === 0) {
      setError('You have no introduction credits remaining. Please upgrade your plan.');
      return;
    }

    setIsContactLoading(true);
    setError('');

    // TODO(PROD-WIRE): Replace mock with actual API call
    // Production code:
    //   const response = await contactsApi.request({ candidateId, message: introductionMessage });
    //   if (response.success) { setContactRequested(true); await refreshProfile(); }

    // Mock success for demo
    setTimeout(() => {
      setContactRequested(true);
      setSuccess('Introduction request sent! Medibee will facilitate contact within 24 hours.');
      setShowIntroductionModal(false);
      setIsContactLoading(false);
    }, 1000);
  };

  const handleAddToShortlist = async (shortlistId: string) => {
    // In production, would call API:
    // const response = await shortlistsApi.addCandidate(shortlistId, candidateId);

    setShowShortlistModal(false);
    setSuccess('Candidate added to shortlist!');
  };

  if (!isClient(state)) {
    return null;
  }

  const { subscription } = state;

  if (isLoading) {
    return (
      <div className="text-center py-16">
        <div className="w-12 h-12 rounded-full bg-portal-blue/20 animate-pulse mx-auto mb-4" />
        <p className="font-portal text-portal-body text-portal-graphite-muted">
          Loading candidate profile...
        </p>
      </div>
    );
  }

  if (!candidateData) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-portal-stone flex items-center justify-center">
          <span className="text-2xl">❓</span>
        </div>
        <h1 className="font-portal text-portal-name text-portal-graphite mb-3">
          Candidate Not Found
        </h1>
        <p className="font-portal text-portal-body text-portal-graphite-muted mb-6">
          This candidate may no longer be available or the profile may have been removed.
        </p>
        <Link
          href="/client/candidates"
          className="
            inline-block px-6 py-3 rounded-card
            font-portal text-portal-body font-medium
            bg-portal-blue text-white
            hover:bg-portal-blue-dark
            transition-colors duration-portal
          "
        >
          Back to Search
        </Link>
      </div>
    );
  }

  const { profile, credentials } = candidateData;

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Back Link */}
      <Link
        href="/client/candidates"
        className="
          inline-flex items-center gap-2
          font-portal text-portal-meta text-portal-blue
          hover:text-portal-blue-dark
          transition-colors duration-portal
        "
      >
        <span>←</span> Back to search
      </Link>

      {/* Alerts */}
      {error && (
        <div className="p-4 bg-portal-alert/10 border border-portal-alert/20 rounded-card" role="alert">
          <p className="font-portal text-portal-body text-portal-alert">{error}</p>
        </div>
      )}

      {success && (
        <div className="p-4 bg-portal-verified/10 border border-portal-verified/20 rounded-card" role="status">
          <p className="font-portal text-portal-body text-portal-verified">{success}</p>
        </div>
      )}

      {/* Candidate Profile (using preview component) */}
      <CandidateProfilePreview
        profile={profile}
        credentials={credentials}
        isOwnProfile={false}
        onRequestIntroduction={() => setShowIntroductionModal(true)}
        onAddToShortlist={() => setShowShortlistModal(true)}
      />

      {/* Credit Info */}
      {subscription && (
        <div className="p-6 bg-portal-blue/5 border border-portal-blue/10 rounded-card">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-portal text-portal-body text-portal-graphite">
                {subscription.creditsRemaining === -1
                  ? 'Unlimited introduction credits'
                  : `${subscription.creditsRemaining} introduction credits remaining`}
              </p>
              <p className="font-portal text-portal-meta text-portal-graphite-muted">
                Requesting an introduction uses 1 credit
              </p>
            </div>
            {subscription.creditsRemaining === 0 && (
              <Link
                href="/client/subscription"
                className="
                  px-4 py-2 rounded-card
                  font-portal text-portal-meta font-medium
                  bg-portal-blue text-white
                  hover:bg-portal-blue-dark
                  transition-colors duration-portal
                "
              >
                Get More Credits
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Introduction Request Modal */}
      {showIntroductionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-portal-graphite/50 backdrop-blur-sm"
            onClick={() => setShowIntroductionModal(false)}
          />
          <div className="relative bg-surface-0 rounded-card-lg shadow-card-elevated w-full max-w-lg animate-scale-in">
            <div className="p-6">
              <h2 className="font-portal text-portal-name text-portal-graphite mb-2">
                Request Introduction
              </h2>
              <p className="font-portal text-portal-body text-portal-graphite-muted mb-6">
                Medibee will introduce you to {profile.firstName} via phone and email within 24 hours.
              </p>

              <div className="mb-6">
                <label className="block font-portal text-portal-meta text-portal-graphite mb-2">
                  Message (optional)
                </label>
                <textarea
                  value={introductionMessage}
                  onChange={(e) => setIntroductionMessage(e.target.value)}
                  rows={4}
                  placeholder="Tell us about the role and why this candidate would be a good fit..."
                  className="
                    w-full px-4 py-3 rounded-card border border-portal-stone
                    font-portal text-portal-body text-portal-graphite
                    placeholder:text-portal-graphite-muted
                    focus:outline-none focus:ring-2 focus:ring-portal-teal/30 focus:border-portal-teal
                    transition-colors duration-portal resize-none
                  "
                />
              </div>

              {subscription && subscription.creditsRemaining !== -1 && (
                <p className="font-portal text-portal-meta text-portal-graphite-muted mb-6">
                  This will use 1 of your {subscription.creditsRemaining} remaining credits.
                </p>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setShowIntroductionModal(false)}
                  className="
                    flex-1 py-3 px-4 rounded-card
                    font-portal text-portal-body font-medium
                    bg-surface-1 text-portal-graphite border border-portal-stone
                    hover:bg-portal-stone
                    transition-colors duration-portal
                  "
                >
                  Cancel
                </button>
                <button
                  onClick={handleRequestIntroduction}
                  disabled={isContactLoading || contactRequested}
                  className="
                    flex-1 py-3 px-4 rounded-card
                    font-portal text-portal-body font-medium
                    bg-portal-blue text-white
                    hover:bg-portal-blue-dark
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-colors duration-portal
                  "
                >
                  {isContactLoading ? 'Requesting...' : 'Request Introduction'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shortlist Modal */}
      {showShortlistModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-portal-graphite/50 backdrop-blur-sm"
            onClick={() => setShowShortlistModal(false)}
          />
          <div className="relative bg-surface-0 rounded-card-lg shadow-card-elevated w-full max-w-md animate-scale-in">
            <div className="p-6">
              <h2 className="font-portal text-portal-name text-portal-graphite mb-4">
                Add to Shortlist
              </h2>

              {shortlists.length === 0 ? (
                <div>
                  <p className="font-portal text-portal-body text-portal-graphite-muted mb-6">
                    You don&apos;t have any shortlists yet.
                  </p>
                  <div className="flex gap-3">
                    <Link
                      href="/client/shortlists"
                      className="
                        flex-1 text-center py-3 px-4 rounded-card
                        font-portal text-portal-body font-medium
                        bg-portal-blue text-white
                        hover:bg-portal-blue-dark
                        transition-colors duration-portal
                      "
                    >
                      Create Shortlist
                    </Link>
                    <button
                      onClick={() => setShowShortlistModal(false)}
                      className="
                        flex-1 py-3 px-4 rounded-card
                        font-portal text-portal-body font-medium
                        bg-surface-1 text-portal-graphite border border-portal-stone
                        hover:bg-portal-stone
                        transition-colors duration-portal
                      "
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="space-y-2 mb-4">
                    {shortlists.map((shortlist) => (
                      <button
                        key={shortlist.shortlistId}
                        onClick={() => handleAddToShortlist(shortlist.shortlistId)}
                        className="
                          w-full text-left p-4 rounded-card
                          border border-portal-stone
                          hover:border-portal-blue hover:bg-portal-blue/5
                          transition-colors duration-portal
                        "
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-portal text-portal-body text-portal-graphite">
                            {shortlist.name}
                          </span>
                          <span className="font-portal text-portal-meta text-portal-graphite-muted">
                            {shortlist.candidateCount} candidates
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setShowShortlistModal(false)}
                    className="
                      w-full py-3 px-4 rounded-card
                      font-portal text-portal-body font-medium
                      bg-surface-1 text-portal-graphite border border-portal-stone
                      hover:bg-portal-stone
                      transition-colors duration-portal
                    "
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
