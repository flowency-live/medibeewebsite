/**
 * IdentityHero
 *
 * The candidate profile hero surface - the first thing users see.
 * Per design language: "Large circular portrait, strong name typography,
 * experience badge, availability signal, exposure strength indicator"
 */

'use client';

import { type ReactNode } from 'react';
import { ProfileCompletionRing } from './ProfileCompletionRing';
import { StatusBadge, type StatusType } from './StatusBadge';

interface IdentityHeroProps {
  firstName: string;
  lastName: string;
  headline?: string;
  profileImageUrl?: string;
  experienceLevel?: string;
  profileCompletion: number;
  status: 'pending_verification' | 'pending_review' | 'active' | 'suspended' | 'rejected';
  available: boolean;
  city?: string;
  onEditProfile?: () => void;
}

const experienceLevelLabels: Record<string, string> = {
  'newly-qualified': 'Newly Qualified',
  '1-2-years': '1-2 Years Experience',
  '3-5-years': '3-5 Years Experience',
  '5-plus-years': '5+ Years Experience',
};

export function IdentityHero({
  firstName,
  lastName,
  headline,
  profileImageUrl,
  experienceLevel,
  profileCompletion,
  status,
  available,
  city,
  onEditProfile,
}: IdentityHeroProps): ReactNode {
  const initials = `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase();
  const fullName = `${firstName} ${lastName}`.trim();

  const statusType: StatusType = status === 'active'
    ? (available ? 'available' : 'not-available')
    : status === 'pending_verification'
      ? 'pending'
      : status === 'pending_review'
        ? 'under-review'
        : 'pending';

  return (
    <div className="relative">
      {/* Background tonal panel */}
      <div className="absolute inset-0 bg-gradient-to-b from-portal-stone-warm to-transparent h-48 -mx-6 -mt-6 rounded-t-card-lg" />

      <div className="relative pt-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Profile Image with Completion Ring */}
          <div className="relative">
            {/* Outer completion ring */}
            <div className="absolute -inset-2">
              <ProfileCompletionRing
                percentage={profileCompletion}
                size="lg"
                showPercentage={false}
                strokeWidth={4}
              />
            </div>

            {/* Avatar */}
            <div
              className="
                relative w-28 h-28 rounded-full overflow-hidden
                bg-portal-blue flex items-center justify-center
                shadow-card-elevated
              "
            >
              {profileImageUrl ? (
                <img
                  src={profileImageUrl}
                  alt={fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="font-portal text-3xl font-semibold text-white">
                  {initials}
                </span>
              )}
            </div>

            {/* Availability indicator */}
            <div
              className={`
                absolute bottom-1 right-1 w-6 h-6 rounded-full border-4 border-white
                ${available && status === 'active' ? 'bg-portal-verified' : 'bg-portal-graphite-muted'}
              `}
              title={available ? 'Available for work' : 'Not currently available'}
            />
          </div>

          {/* Identity Info */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
              <h1 className="font-portal text-portal-name text-portal-graphite">
                {fullName}
              </h1>
              <StatusBadge status={statusType} size="sm" />
            </div>

            {headline && (
              <p className="font-portal text-portal-body text-portal-graphite-light mb-2">
                {headline}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-portal-meta font-portal text-portal-graphite-muted">
              {experienceLevel && (
                <span className="flex items-center gap-1.5">
                  <span className="text-portal-teal">●</span>
                  {experienceLevelLabels[experienceLevel] ?? experienceLevel}
                </span>
              )}
              {city && (
                <span className="flex items-center gap-1.5">
                  <span className="text-portal-blue">◉</span>
                  {city}
                </span>
              )}
            </div>

            {/* Profile completion prompt */}
            {profileCompletion < 100 && (
              <div className="mt-4 p-3 bg-portal-available/10 rounded-lg inline-flex items-center gap-3">
                <ProfileCompletionRing percentage={profileCompletion} size="sm" />
                <div>
                  <p className="font-portal text-portal-meta font-medium text-portal-graphite">
                    Profile {profileCompletion}% complete
                  </p>
                  <button
                    onClick={onEditProfile}
                    className="font-portal text-portal-meta text-portal-teal hover:underline"
                  >
                    Complete your profile →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Edit button */}
          {onEditProfile && (
            <button
              onClick={onEditProfile}
              className="
                hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg
                font-portal text-portal-meta font-medium
                bg-surface-0 border border-portal-stone text-portal-graphite
                hover:border-portal-blue hover:text-portal-blue
                transition-colors duration-portal shadow-card
              "
            >
              <span>Edit Profile</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
