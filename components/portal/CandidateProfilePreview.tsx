/**
 * CandidateProfilePreview
 *
 * Composed view of a candidate profile as seen by employers.
 * Uses ProfileHero, WorkHistoryTimeline, TrustMeter components.
 * Dark theme with gold accents.
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
        <div className="bg-gold/10 border border-gold/20 rounded-card p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">👁</span>
              <div>
                <p className="font-body text-body-md font-medium text-pearl">
                  Employer Preview Mode
                </p>
                <p className="font-body text-body-sm text-ash">
                  This is how care providers see your profile
                </p>
              </div>
            </div>
            <button
              onClick={onExitPreview}
              className="px-4 py-2 rounded-card font-body text-body-sm font-medium bg-gold text-void hover:bg-gold-light transition-colors duration-normal"
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
            <div className="bg-void-medium rounded-card shadow-card p-6">
              <h2 className="font-body text-body-md font-semibold text-pearl mb-3">About</h2>
              <p className="font-body text-body-md text-pearl-soft leading-relaxed">
                {isOwnProfile ? profile.professionalSummary : truncatedSummary}
              </p>
            </div>
          )}

          {/* Work History */}
          {profile.workHistory && profile.workHistory.length > 0 && (
            <div className="bg-void-medium rounded-card shadow-card p-6">
              <h2 className="font-body text-body-md font-semibold text-pearl mb-4">Experience</h2>
              <WorkHistoryTimeline entries={profile.workHistory} />
            </div>
          )}

          {/* Skills */}
          {profile.skills && profile.skills.length > 0 && (
            <div className="bg-void-medium rounded-card shadow-card p-6">
              <h2 className="font-body text-body-md font-semibold text-pearl mb-3">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1.5 rounded-full bg-tier-colony/10 text-tier-colony font-body text-body-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Care Settings */}
          {profile.preferredSettings && profile.preferredSettings.length > 0 && (
            <div className="bg-void-medium rounded-card shadow-card p-6">
              <h2 className="font-body text-body-md font-semibold text-pearl mb-3">Care Settings</h2>
              <div className="flex flex-wrap gap-2">
                {profile.preferredSettings.map((setting) => (
                  <span key={setting} className="px-3 py-1.5 rounded-full bg-gold/10 text-gold font-body text-body-sm">
                    {careSettingLabels[setting] ?? setting}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Contact Details (hidden) */}
          {!isOwnProfile && (
            <div className="bg-void-light rounded-card p-6 border border-dashed border-ash-border">
              <div className="flex items-center gap-3 text-ash">
                <span className="text-xl">🔒</span>
                <div>
                  <p className="font-body text-body-md font-medium">Contact details protected</p>
                  <p className="font-body text-body-sm">Request an introduction to connect</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Trust & Credentials */}
        <div className="space-y-6">
          <div className="bg-void-medium rounded-card shadow-card p-6">
            <h2 className="font-body text-body-md font-semibold text-pearl mb-4">Trust Score</h2>
            <TrustMeter profile={profile} credentials={credentials} />
          </div>
        </div>
      </div>
    </div>
  );
}
