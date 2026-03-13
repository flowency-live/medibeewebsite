'use client';

/**
 * Candidate Dashboard
 *
 * Overview page showing profile completion, status, and recent activity.
 */

import Link from 'next/link';
import { useAuth, isCandidate } from '@/lib/auth';

export default function CandidateDashboardPage() {
  const { state } = useAuth();

  if (!isCandidate(state)) {
    return null;
  }

  const { profile } = state;

  // Calculate profile completion
  const completionItems = [
    { key: 'firstName', label: 'First name', completed: !!profile.firstName },
    { key: 'lastName', label: 'Last name', completed: !!profile.lastName },
    { key: 'phone', label: 'Phone number', completed: !!profile.phone },
    { key: 'city', label: 'Location', completed: !!profile.city },
    { key: 'experienceLevel', label: 'Experience level', completed: !!profile.experienceLevel },
    { key: 'preferredSettings', label: 'Care settings', completed: (profile.preferredSettings?.length ?? 0) > 0 },
    { key: 'professionalSummary', label: 'Professional summary', completed: !!profile.professionalSummary },
    { key: 'rightToWork', label: 'Right to work', completed: profile.rightToWork === true },
    { key: 'dbsStatus', label: 'DBS status', completed: !!profile.dbsStatus },
    { key: 'cvUploaded', label: 'CV uploaded', completed: profile.cvUploaded === true },
  ];

  const completedCount = completionItems.filter((item) => item.completed).length;
  const completionPercentage = Math.round((completedCount / completionItems.length) * 100);

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="font-display text-display-sm text-ink mb-2">
          Welcome back, {profile.firstName}
        </h1>
        <p className="font-body text-body-md text-slate-blue">
          Manage your profile and track your progress on Medibee.
        </p>
      </div>

      {/* Status Alerts */}
      {profile.status === 'pending_verification' && (
        <div className="p-4 bg-blue-50 border-l-[3px] border-blue-500" role="alert">
          <h2 className="font-body text-body-md font-semibold text-blue-800 mb-1">
            Email Verification Required
          </h2>
          <p className="font-body text-body-sm text-blue-700">
            Please check your email and click the verification link to activate your account.
          </p>
        </div>
      )}

      {profile.status === 'pending_review' && (
        <div className="p-4 bg-amber-50 border-l-[3px] border-amber-500" role="alert">
          <h2 className="font-body text-body-md font-semibold text-amber-800 mb-1">
            Profile Under Review
          </h2>
          <p className="font-body text-body-sm text-amber-700">
            Our team is reviewing your profile. You&apos;ll be notified once it&apos;s approved.
          </p>
        </div>
      )}

      {profile.status === 'suspended' && (
        <div className="p-4 bg-red-50 border-l-[3px] border-red-500" role="alert">
          <h2 className="font-body text-body-md font-semibold text-red-800 mb-1">
            Account Suspended
          </h2>
          <p className="font-body text-body-sm text-red-700">
            Your account has been temporarily suspended. Please contact support for assistance.
          </p>
        </div>
      )}

      {/* Profile Completion Card */}
      <div className="bg-white p-6 rounded-sm border border-neutral-grey/20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg text-ink">Profile Completion</h2>
          <span className="font-body text-body-lg font-semibold text-slate-blue">
            {completionPercentage}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-neutral-grey/20 rounded-full mb-6">
          <div
            className="h-full bg-rich-gold rounded-full transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>

        {/* Completion Items */}
        <div className="grid grid-cols-2 gap-3">
          {completionItems.map((item) => (
            <div key={item.key} className="flex items-center gap-2">
              <span
                className={`w-4 h-4 rounded-full flex items-center justify-center text-xs ${
                  item.completed
                    ? 'bg-green-100 text-green-600'
                    : 'bg-neutral-grey/20 text-neutral-grey'
                }`}
              >
                {item.completed ? '✓' : '○'}
              </span>
              <span
                className={`font-body text-body-sm ${
                  item.completed ? 'text-ink' : 'text-neutral-grey'
                }`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {completionPercentage < 100 && (
          <div className="mt-6 pt-4 border-t border-neutral-grey/20">
            <Link
              href="/candidate/profile"
              className="font-body text-body-sm text-slate-blue hover:text-deep-slate underline"
            >
              Complete your profile →
            </Link>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-4">
        <Link
          href="/candidate/profile"
          className="bg-white p-6 rounded-sm border border-neutral-grey/20 hover:border-slate-blue/40 transition-colors"
        >
          <div className="text-2xl mb-2">◎</div>
          <h3 className="font-display text-lg text-ink mb-1">Edit Profile</h3>
          <p className="font-body text-body-sm text-slate-blue">
            Update your details and preferences
          </p>
        </Link>

        <Link
          href="/candidate/cv"
          className="bg-white p-6 rounded-sm border border-neutral-grey/20 hover:border-slate-blue/40 transition-colors"
        >
          <div className="text-2xl mb-2">▤</div>
          <h3 className="font-display text-lg text-ink mb-1">Manage CV</h3>
          <p className="font-body text-body-sm text-slate-blue">
            Upload or update your CV
          </p>
        </Link>

        <Link
          href="/candidate/settings"
          className="bg-white p-6 rounded-sm border border-neutral-grey/20 hover:border-slate-blue/40 transition-colors"
        >
          <div className="text-2xl mb-2">⚙</div>
          <h3 className="font-display text-lg text-ink mb-1">Settings</h3>
          <p className="font-body text-body-sm text-slate-blue">
            Account and notification settings
          </p>
        </Link>
      </div>

      {/* Visibility Info */}
      {profile.status === 'active' && (
        <div className="bg-green-50 p-6 rounded-sm border border-green-200">
          <h2 className="font-display text-lg text-green-800 mb-2">
            Your Profile is Live
          </h2>
          <p className="font-body text-body-md text-green-700">
            Healthcare providers can now find and contact you through Medibee.
            Keep your profile updated to receive the best opportunities.
          </p>
        </div>
      )}
    </div>
  );
}
