/**
 * ProfileHero Component
 *
 * Premium hero section with avatar, name, tagline, and availability.
 * Dark theme with gold accents for verified/premium status.
 */

'use client';

import type { CandidateProfile } from '@/lib/auth/types';
import { StatusBadge } from '@/components/portal';

const experienceLevelLabels: Record<string, string> = {
  'newly-qualified': 'Newly Qualified',
  '1-2-years': '1-2 Years',
  '3-5-years': '3-5 Years',
  '5-plus-years': '5+ Years',
};

export interface ProfileHeroProps {
  profile: CandidateProfile;
  isOwnProfile?: boolean;
  onRequestIntroduction?: () => void;
  onAddToShortlist?: () => void;
}

export function ProfileHero({
  profile,
  isOwnProfile = false,
  onRequestIntroduction,
  onAddToShortlist,
}: ProfileHeroProps) {
  const initials = `${profile.firstName?.[0] ?? ''}${profile.lastName?.[0] ?? ''}`.toUpperCase();
  const fullName = `${profile.firstName} ${profile.lastName}`.trim();
  const showAvailable = profile.available && profile.status === 'active';

  return (
    <div className="bg-void-medium rounded-card-lg shadow-card overflow-hidden border border-ash-border">
      {/* Gradient cover band - dark with gold accent */}
      <div className="h-24 bg-gradient-to-br from-void via-void-elevated to-void-medium relative overflow-hidden">
        {/* Subtle hex pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='52' viewBox='0 0 60 52' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23D4AF37' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 52px',
          }}
        />
        {/* Gold accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      </div>

      <div className="px-6 pb-6">
        {/* Avatar and info row */}
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-14">
          {/* Avatar with gold ring */}
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-gold to-gold-dim p-1">
              <div className="w-full h-full rounded-full bg-void-medium flex items-center justify-center">
                <span className="font-body text-3xl font-semibold text-gold">
                  {initials}
                </span>
              </div>
            </div>
            {showAvailable && (
              <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-status-verified border-2 border-void-medium animate-pulse-soft" />
            )}
          </div>

          {/* Name, tagline, meta */}
          <div className="flex-1 text-center sm:text-left pb-2 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
              <h1 className="font-body text-2xl font-semibold text-pearl truncate">
                {fullName}
              </h1>
              {showAvailable && <StatusBadge status="available" size="sm" />}
            </div>

            {profile.tagline && (
              <p
                data-testid="profile-tagline"
                className="font-body text-body-md text-pearl-soft/80 mb-2 line-clamp-2"
              >
                {profile.tagline}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 font-body text-body-sm text-ash-light">
              {profile.experienceLevel && (
                <span className="inline-flex items-center gap-1">
                  <span className="text-gold">●</span>
                  {experienceLevelLabels[profile.experienceLevel] ?? profile.experienceLevel}
                </span>
              )}
              {profile.city && (
                <span className="inline-flex items-center gap-1">
                  <span>📍</span>
                  {profile.city}
                </span>
              )}
            </div>
          </div>

          {/* Action buttons */}
          {!isOwnProfile && (onRequestIntroduction || onAddToShortlist) && (
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto mt-2 sm:mt-0">
              {onAddToShortlist && (
                <button
                  onClick={onAddToShortlist}
                  className="px-4 py-2.5 rounded-card font-body text-ui-sm font-medium border border-ash-border text-pearl-soft hover:bg-void-elevated hover:border-ash-border-light transition-colors duration-normal w-full sm:w-auto"
                >
                  + Shortlist
                </button>
              )}
              {onRequestIntroduction && (
                <button
                  onClick={onRequestIntroduction}
                  className="px-4 py-2.5 rounded-card font-body text-ui-sm font-medium bg-gold text-void hover:bg-gold-light transition-colors duration-normal w-full sm:w-auto"
                >
                  Request Introduction
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
