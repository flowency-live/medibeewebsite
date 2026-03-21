/**
 * ProfileHero Component
 *
 * Premium hero section with avatar, name, tagline, and availability.
 * Per plan: "Full-bleed cover, large avatar with verification ring,
 * headline quote, availability beacon"
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
    <div className="bg-surface-0 rounded-card-lg shadow-card overflow-hidden">
      {/* Gradient cover band */}
      <div className="h-24 bg-gradient-to-br from-portal-blue via-portal-blue-dark to-portal-teal" />

      <div className="px-6 pb-6">
        {/* Avatar and info row */}
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-14">
          {/* Avatar with ring */}
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-portal-blue to-portal-teal p-1">
              <div className="w-full h-full rounded-full bg-surface-0 flex items-center justify-center">
                <span className="font-portal text-3xl font-semibold text-portal-blue">
                  {initials}
                </span>
              </div>
            </div>
            {showAvailable && (
              <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-portal-verified border-2 border-white animate-pulse-soft" />
            )}
          </div>

          {/* Name, tagline, meta */}
          <div className="flex-1 text-center sm:text-left pb-2 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
              <h1 className="font-portal text-portal-name text-portal-graphite truncate">
                {fullName}
              </h1>
              {showAvailable && <StatusBadge status="available" size="sm" />}
            </div>

            {profile.tagline && (
              <p
                data-testid="profile-tagline"
                className="font-portal text-portal-body text-portal-graphite-light mb-2 line-clamp-2"
              >
                {profile.tagline}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 font-portal text-portal-meta text-portal-graphite-muted">
              {profile.experienceLevel && (
                <span className="inline-flex items-center gap-1">
                  <span className="text-portal-teal">●</span>
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
                  className="px-4 py-2.5 rounded-card font-portal text-portal-meta font-medium border border-portal-stone text-portal-graphite hover:bg-portal-stone transition-colors duration-portal w-full sm:w-auto"
                >
                  + Shortlist
                </button>
              )}
              {onRequestIntroduction && (
                <button
                  onClick={onRequestIntroduction}
                  className="px-4 py-2.5 rounded-card font-portal text-portal-meta font-medium bg-portal-blue text-white hover:bg-portal-blue-dark transition-colors duration-portal w-full sm:w-auto"
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
