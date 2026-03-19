/**
 * CandidateProfilePreview
 *
 * Read-only view of a candidate profile as seen by employers.
 * Used for both:
 * - Candidate's "View as Employer" preview mode
 * - Client's candidate detail view
 */

'use client';

import { type ReactNode } from 'react';
import { StatusBadge, ProfileCompletionRing } from '@/components/portal';
import type { CandidateProfile } from '@/lib/auth/types';
import type { Credential } from '@/components/portal/CredentialCard';

interface CandidateProfilePreviewProps {
  profile: CandidateProfile;
  credentials?: Credential[];
  isOwnProfile?: boolean;
  onRequestIntroduction?: () => void;
  onAddToShortlist?: () => void;
  onExitPreview?: () => void;
}

const experienceLevelLabels: Record<string, string> = {
  'newly-qualified': 'Newly Qualified',
  '1-2-years': '1-2 Years Experience',
  '3-5-years': '3-5 Years Experience',
  '5-plus-years': '5+ Years Experience',
};

const careSettingLabels: Record<string, string> = {
  'mental-health': 'Mental Health',
  'acute-care': 'Acute Care',
  'private-hospital': 'Private Hospital',
  'care-home': 'Care Home',
  'supported-living': 'Supported Living',
  'end-of-life': 'End of Life Care',
  'community': 'Community Care',
  'learning-disabilities': 'Learning Disabilities',
  'dementia-care': 'Dementia Care',
  'paediatric': 'Paediatric',
};

export function CandidateProfilePreview({
  profile,
  credentials = [],
  isOwnProfile = false,
  onRequestIntroduction,
  onAddToShortlist,
  onExitPreview,
}: CandidateProfilePreviewProps): ReactNode {
  const initials = `${profile.firstName?.[0] ?? ''}${profile.lastName?.[0] ?? ''}`.toUpperCase();
  const fullName = `${profile.firstName} ${profile.lastName}`.trim();
  const verifiedCredentials = credentials.filter((c) => c.status === 'verified');

  // Truncate summary for preview (clients see 150 chars initially)
  const truncatedSummary = profile.professionalSummary
    ? profile.professionalSummary.length > 150
      ? profile.professionalSummary.slice(0, 150) + '...'
      : profile.professionalSummary
    : null;

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Preview Mode Banner (for candidates viewing their own profile) */}
      {isOwnProfile && onExitPreview && (
        <div className="bg-portal-highlight/10 border border-portal-highlight/20 rounded-card p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">👁</span>
              <div>
                <p className="font-portal text-portal-body font-medium text-portal-graphite">
                  Employer Preview Mode
                </p>
                <p className="font-portal text-portal-meta text-portal-graphite-muted">
                  This is how care providers see your profile
                </p>
              </div>
            </div>
            <button
              onClick={onExitPreview}
              className="
                px-4 py-2 rounded-card
                font-portal text-portal-meta font-medium
                bg-portal-highlight text-white
                hover:bg-portal-highlight/90
                transition-colors duration-portal
              "
            >
              Exit Preview
            </button>
          </div>
        </div>
      )}

      {/* Profile Header */}
      <div className="bg-surface-0 rounded-card-lg shadow-card overflow-hidden">
        {/* Top band */}
        <div className="h-20 bg-gradient-to-r from-portal-blue to-portal-teal" />

        <div className="px-6 pb-6">
          {/* Avatar and basic info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-12">
            {/* Avatar */}
            <div
              className="
                w-24 h-24 rounded-full bg-portal-blue border-4 border-white
                flex items-center justify-center shadow-card-elevated
              "
            >
              <span className="font-portal text-2xl font-semibold text-white">
                {initials}
              </span>
            </div>

            {/* Name and status */}
            <div className="flex-1 text-center sm:text-left pb-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                <h1 className="font-portal text-portal-name text-portal-graphite">
                  {fullName}
                </h1>
                {profile.available && profile.status === 'active' && (
                  <StatusBadge status="available" size="sm" />
                )}
              </div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-portal-meta font-portal text-portal-graphite-muted">
                {profile.experienceLevel && (
                  <span>{experienceLevelLabels[profile.experienceLevel]}</span>
                )}
                {profile.city && <span>📍 {profile.city}</span>}
              </div>
            </div>

            {/* Actions (for clients viewing candidates) */}
            {!isOwnProfile && (
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto mt-4 sm:mt-0">
                {onAddToShortlist && (
                  <button
                    onClick={onAddToShortlist}
                    className="
                      px-4 py-2.5 rounded-card
                      font-portal text-portal-meta font-medium
                      border border-portal-stone text-portal-graphite
                      hover:bg-portal-stone
                      transition-colors duration-portal
                      w-full sm:w-auto
                    "
                  >
                    + Shortlist
                  </button>
                )}
                {onRequestIntroduction && (
                  <button
                    onClick={onRequestIntroduction}
                    className="
                      px-4 py-2.5 rounded-card
                      font-portal text-portal-meta font-medium
                      bg-portal-blue text-white
                      hover:bg-portal-blue-dark
                      transition-colors duration-portal
                      w-full sm:w-auto
                    "
                  >
                    Request Introduction
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main info */}
        <div className="lg:col-span-2 space-y-6">
          {/* About / Professional Summary */}
          {truncatedSummary && (
            <div className="bg-surface-0 rounded-card shadow-card p-6">
              <h2 className="font-portal text-portal-heading text-portal-graphite mb-3">
                About
              </h2>
              <p className="font-portal text-portal-body text-portal-graphite-light leading-relaxed">
                {isOwnProfile ? profile.professionalSummary : truncatedSummary}
              </p>
            </div>
          )}

          {/* Care Settings */}
          {profile.preferredSettings && profile.preferredSettings.length > 0 && (
            <div className="bg-surface-0 rounded-card shadow-card p-6">
              <h2 className="font-portal text-portal-heading text-portal-graphite mb-3">
                Care Settings
              </h2>
              <div className="flex flex-wrap gap-2">
                {profile.preferredSettings.map((setting) => (
                  <span
                    key={setting}
                    className="
                      px-3 py-1.5 rounded-full
                      bg-portal-teal/10 text-portal-teal
                      font-portal text-portal-meta
                    "
                  >
                    {careSettingLabels[setting] ?? setting}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Contact Details (hidden for non-connected clients) */}
          {!isOwnProfile && (
            <div className="bg-surface-1 rounded-card p-6 border border-dashed border-portal-stone">
              <div className="flex items-center gap-3 text-portal-graphite-muted">
                <span className="text-xl">🔒</span>
                <div>
                  <p className="font-portal text-portal-body font-medium">
                    Contact details protected
                  </p>
                  <p className="font-portal text-portal-meta">
                    Request an introduction to connect with this candidate
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Credentials & Stats */}
        <div className="space-y-6">
          {/* Verified Credentials */}
          <div className="bg-surface-0 rounded-card shadow-card p-6">
            <h2 className="font-portal text-portal-heading text-portal-graphite mb-4">
              Verified Credentials
            </h2>
            {verifiedCredentials.length > 0 ? (
              <div className="space-y-3">
                {verifiedCredentials.map((credential) => (
                  <div
                    key={credential.id}
                    className="flex items-center gap-3 p-3 bg-portal-verified/5 rounded-lg"
                  >
                    <div className="w-8 h-8 rounded-lg bg-portal-verified/10 flex items-center justify-center">
                      <span className="text-portal-verified">✓</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-portal text-portal-meta text-portal-graphite truncate">
                        {credential.name}
                      </p>
                      {credential.verifiedDate && (
                        <p className="font-portal text-ui-xs text-portal-graphite-muted">
                          Verified{' '}
                          {new Date(credential.verifiedDate).toLocaleDateString('en-GB', {
                            month: 'short',
                            year: 'numeric',
                          })}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="font-portal text-portal-meta text-portal-graphite-muted">
                No verified credentials yet
              </p>
            )}
          </div>

          {/* Compliance Summary */}
          <div className="bg-surface-0 rounded-card shadow-card p-6">
            <h2 className="font-portal text-portal-heading text-portal-graphite mb-4">
              Compliance
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-portal text-portal-meta text-portal-graphite-muted">
                  Right to Work
                </span>
                {profile.rightToWork ? (
                  <span className="text-portal-verified font-portal text-portal-meta font-medium">
                    ✓ Confirmed
                  </span>
                ) : (
                  <span className="text-portal-graphite-muted font-portal text-portal-meta">
                    Not confirmed
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="font-portal text-portal-meta text-portal-graphite-muted">
                  DBS Status
                </span>
                <span
                  className={`
                    font-portal text-portal-meta font-medium
                    ${profile.dbsStatus === 'cleared' ? 'text-portal-verified' : 'text-portal-pending'}
                  `}
                >
                  {profile.dbsStatus === 'cleared'
                    ? '✓ Cleared'
                    : profile.dbsStatus === 'pending'
                      ? 'Pending'
                      : 'Not Started'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-portal text-portal-meta text-portal-graphite-muted">
                  CV Uploaded
                </span>
                {profile.cvUploaded ? (
                  <span className="text-portal-verified font-portal text-portal-meta font-medium">
                    ✓ Yes
                  </span>
                ) : (
                  <span className="text-portal-graphite-muted font-portal text-portal-meta">
                    No
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Stats (for clients) */}
          {!isOwnProfile && (
            <div className="bg-portal-blue/5 rounded-card p-4">
              <p className="font-portal text-portal-meta text-portal-blue-dark">
                💡 This candidate has {verifiedCredentials.length} verified credentials
                and is {profile.available ? 'actively looking for work' : 'not currently available'}.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
