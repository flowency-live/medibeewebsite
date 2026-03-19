'use client';

/**
 * Candidate Detail Page (Client View)
 *
 * Full candidate profile with introduction request functionality.
 * Uses CandidateProfilePreview component for consistent employer view.
 * Features premium modal design for introduction requests.
 */

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth, isClient } from '@/lib/auth';
import { matchingApi, shortlistsApi, contactsApi } from '@/lib/api';
import {
  CandidateProfilePreview,
  PortalCard,
  StatusBadge,
  PortalModal,
  ModalActions,
  ModalTextarea,
} from '@/components/portal';
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
        <p className="font-body text-[0.9375rem] text-portal-graphite-muted">
          Loading candidate profile...
        </p>
      </div>
    );
  }

  if (!candidateData) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-portal-stone flex items-center justify-center">
          <span className="text-2xl">?</span>
        </div>
        <h1 className="font-display text-[1.75rem] text-portal-graphite mb-3">
          Candidate Not Found
        </h1>
        <p className="font-body text-[0.9375rem] text-portal-graphite-muted mb-6">
          This candidate may no longer be available or the profile may have been removed.
        </p>
        <Link
          href="/client/candidates"
          className="
            inline-block px-6 py-3 rounded-xl
            font-body text-[0.9375rem] font-medium
            bg-gradient-to-b from-portal-blue to-portal-blue-dark text-white
            shadow-[0_2px_8px_rgba(59,74,107,0.3)]
            hover:shadow-[0_4px_12px_rgba(59,74,107,0.4)]
            transition-all duration-200
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
          font-body text-[0.875rem] text-portal-blue
          hover:text-portal-blue-dark
          transition-colors duration-200
        "
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to search
      </Link>

      {/* Alerts */}
      {error && (
        <div
          className="
            p-4 rounded-xl
            bg-gradient-to-r from-portal-alert/10 to-portal-alert/5
            border border-portal-alert/20
          "
          role="alert"
        >
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-portal-alert/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-portal-alert text-xs">!</span>
            </div>
            <p className="font-body text-[0.9375rem] text-portal-alert">{error}</p>
          </div>
        </div>
      )}

      {success && (
        <div
          className="
            p-4 rounded-xl
            bg-gradient-to-r from-portal-verified/10 to-portal-verified/5
            border border-portal-verified/20
          "
          role="status"
        >
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-portal-verified/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-portal-verified" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="font-body text-[0.9375rem] text-portal-verified">{success}</p>
          </div>
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

      {/* Credit Info Card - Premium styled */}
      {subscription && (
        <div
          className="
            p-6 rounded-xl
            bg-gradient-to-br from-portal-blue/5 via-surface-0 to-soft-gold/5
            border border-portal-blue/10
            shadow-[0_1px_3px_rgba(0,0,0,0.04)]
          "
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-start gap-4">
              {/* Credit icon */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rich-gold/20 to-soft-gold/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-rich-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-body text-[0.9375rem] font-medium text-portal-graphite">
                  {subscription.creditsRemaining === -1
                    ? 'Unlimited introduction credits'
                    : `${subscription.creditsRemaining} introduction credits remaining`}
                </p>
                <p className="font-body text-[0.8125rem] text-portal-graphite-muted mt-0.5">
                  Requesting an introduction uses 1 credit
                </p>
              </div>
            </div>
            {subscription.creditsRemaining === 0 && (
              <Link
                href="/client/subscription"
                className="
                  px-5 py-2.5 rounded-xl
                  font-body text-[0.875rem] font-medium
                  bg-gradient-to-b from-rich-gold to-[#c9a94a]
                  text-portal-graphite
                  shadow-[0_2px_8px_rgba(229,197,92,0.3)]
                  hover:shadow-[0_4px_12px_rgba(229,197,92,0.4)]
                  transition-all duration-200
                "
              >
                Get More Credits
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Premium Introduction Request Modal */}
      <PortalModal
        isOpen={showIntroductionModal}
        onClose={() => setShowIntroductionModal(false)}
        title="Request Introduction"
        subtitle={`Medibee will personally introduce you to ${profile.firstName} via phone and email within 24 hours.`}
        variant="premium"
        footer={
          <>
            {subscription && subscription.creditsRemaining !== -1 && (
              <p className="font-body text-[0.8125rem] text-portal-graphite-muted mb-4 text-center">
                This will use <span className="font-medium text-portal-graphite">1</span> of your{' '}
                <span className="font-medium text-portal-graphite">{subscription.creditsRemaining}</span> remaining credits
              </p>
            )}
            <ModalActions
              onCancel={() => setShowIntroductionModal(false)}
              onConfirm={handleRequestIntroduction}
              cancelLabel="Cancel"
              confirmLabel="Request Introduction"
              isLoading={isContactLoading}
              disabled={contactRequested}
              variant="premium"
            />
          </>
        }
      >
        <ModalTextarea
          label="Your Message (optional)"
          value={introductionMessage}
          onChange={setIntroductionMessage}
          placeholder="Tell us about the role you're recruiting for and why this candidate would be a great fit..."
          rows={4}
          helperText="This helps us make better introductions"
        />
      </PortalModal>

      {/* Premium Shortlist Modal */}
      <PortalModal
        isOpen={showShortlistModal}
        onClose={() => setShowShortlistModal(false)}
        title="Add to Shortlist"
        subtitle="Save this candidate to one of your shortlists for later"
        size="sm"
      >
        {shortlists.length === 0 ? (
          <div className="text-center py-4">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-portal-stone/50 flex items-center justify-center">
              <svg className="w-6 h-6 text-portal-graphite-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <p className="font-body text-[0.9375rem] text-portal-graphite-muted mb-6">
              You don&apos;t have any shortlists yet.
            </p>
            <div className="flex gap-3">
              <Link
                href="/client/shortlists"
                className="
                  flex-1 text-center py-3 px-4 rounded-xl
                  font-body text-[0.9375rem] font-medium
                  bg-gradient-to-b from-portal-blue to-portal-blue-dark text-white
                  shadow-[0_2px_8px_rgba(59,74,107,0.3)]
                  hover:shadow-[0_4px_12px_rgba(59,74,107,0.4)]
                  transition-all duration-200
                "
              >
                Create Shortlist
              </Link>
              <button
                onClick={() => setShowShortlistModal(false)}
                className="
                  flex-1 py-3 px-4 rounded-xl
                  font-body text-[0.9375rem] font-medium
                  text-portal-graphite
                  bg-surface-0 border border-portal-stone
                  hover:bg-portal-stone/50
                  transition-all duration-200
                "
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {shortlists.map((shortlist) => (
              <button
                key={shortlist.shortlistId}
                onClick={() => handleAddToShortlist(shortlist.shortlistId)}
                className="
                  w-full text-left p-4 rounded-xl
                  border border-portal-stone
                  bg-surface-0
                  hover:border-portal-blue hover:bg-portal-blue/5
                  hover:shadow-[0_2px_8px_rgba(59,74,107,0.1)]
                  transition-all duration-200
                  group
                "
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-portal-stone/50 flex items-center justify-center group-hover:bg-portal-blue/10">
                      <svg className="w-4 h-4 text-portal-graphite-muted group-hover:text-portal-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </div>
                    <span className="font-body text-[0.9375rem] text-portal-graphite group-hover:text-portal-blue-dark">
                      {shortlist.name}
                    </span>
                  </div>
                  <span className="font-body text-[0.8125rem] text-portal-graphite-muted">
                    {shortlist.candidateCount} candidates
                  </span>
                </div>
              </button>
            ))}
            <button
              onClick={() => setShowShortlistModal(false)}
              className="
                w-full mt-4 py-3 px-4 rounded-xl
                font-body text-[0.9375rem] font-medium
                text-portal-graphite-muted
                hover:text-portal-graphite hover:bg-portal-stone/30
                transition-all duration-200
              "
            >
              Cancel
            </button>
          </div>
        )}
      </PortalModal>
    </div>
  );
}
