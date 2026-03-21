/**
 * CandidateProfilePreview
 *
 * Composed view of a candidate profile as seen by employers.
 * Uses ProfileHero, WorkHistoryTimeline, TrustMeter components.
 * Under 150 LOC per CLAUDE.md requirements.
 */

'use client';

import type { CandidateProfile } from '@/lib/auth/types';
import type { Credential } from '@/components/portal/CredentialCard';
import { ProfileHero } from './ProfileHero';
import { WorkHistoryTimeline } from './WorkHistoryTimeline';
import { TrustMeter } from './TrustMeter';

interface CandidateProfilePreviewProps {
  profile: CandidateProfile;
  credentials?: Credential[];
  isOwnProfile?: boolean;
  onRequestIntroduction?: () => void;
  onAddToShortlist?: () => void;
  onExitPreview?: () => void;
}

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
}: CandidateProfilePreviewProps) {
  const truncatedSummary = profile.professionalSummary
    ? profile.professionalSummary.length > 150
      ? profile.professionalSummary.slice(0, 150) + '...'
      : profile.professionalSummary
    : null;

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Preview Mode Banner */}
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
              className="px-4 py-2 rounded-card font-portal text-portal-meta font-medium bg-portal-highlight text-white hover:bg-portal-highlight/90 transition-colors duration-portal"
            >
              Exit Preview
            </button>
          </div>
        </div>
      )}

      {/* Profile Hero */}
      <ProfileHero
        profile={profile}
        isOwnProfile={isOwnProfile}
        onRequestIntroduction={onRequestIntroduction}
        onAddToShortlist={onAddToShortlist}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main info */}
        <div className="lg:col-span-2 space-y-6">
          {/* About / Professional Summary */}
          {truncatedSummary && (
            <div className="bg-surface-0 rounded-card shadow-card p-6">
              <h2 className="font-portal text-portal-heading text-portal-graphite mb-3">About</h2>
              <p className="font-portal text-portal-body text-portal-graphite-light leading-relaxed">
                {isOwnProfile ? profile.professionalSummary : truncatedSummary}
              </p>
            </div>
          )}

          {/* Work History */}
          {profile.workHistory && profile.workHistory.length > 0 && (
            <div className="bg-surface-0 rounded-card shadow-card p-6">
              <h2 className="font-portal text-portal-heading text-portal-graphite mb-4">Experience</h2>
              <WorkHistoryTimeline entries={profile.workHistory} />
            </div>
          )}

          {/* Skills */}
          {profile.skills && profile.skills.length > 0 && (
            <div className="bg-surface-0 rounded-card shadow-card p-6">
              <h2 className="font-portal text-portal-heading text-portal-graphite mb-3">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1.5 rounded-full bg-portal-blue/10 text-portal-blue font-portal text-portal-meta">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Care Settings */}
          {profile.preferredSettings && profile.preferredSettings.length > 0 && (
            <div className="bg-surface-0 rounded-card shadow-card p-6">
              <h2 className="font-portal text-portal-heading text-portal-graphite mb-3">Care Settings</h2>
              <div className="flex flex-wrap gap-2">
                {profile.preferredSettings.map((setting) => (
                  <span key={setting} className="px-3 py-1.5 rounded-full bg-portal-teal/10 text-portal-teal font-portal text-portal-meta">
                    {careSettingLabels[setting] ?? setting}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Contact Details (hidden) */}
          {!isOwnProfile && (
            <div className="bg-surface-1 rounded-card p-6 border border-dashed border-portal-stone">
              <div className="flex items-center gap-3 text-portal-graphite-muted">
                <span className="text-xl">🔒</span>
                <div>
                  <p className="font-portal text-portal-body font-medium">Contact details protected</p>
                  <p className="font-portal text-portal-meta">Request an introduction to connect</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Trust & Credentials */}
        <div className="space-y-6">
          <div className="bg-surface-0 rounded-card shadow-card p-6">
            <h2 className="font-portal text-portal-heading text-portal-graphite mb-4">Trust Score</h2>
            <TrustMeter profile={profile} credentials={credentials} />
          </div>
        </div>
      </div>
    </div>
  );
}
