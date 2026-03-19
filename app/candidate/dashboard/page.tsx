'use client';

/**
 * Candidate Dashboard
 *
 * The hub - everything a candidate needs at a glance.
 * Per design language: "Progressive Disclosure Architecture" -
 * high-confidence summary first, deeper information revealed by scroll.
 */

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth, isCandidate } from '@/lib/auth';
import {
  IdentityHero,
  PortalCard,
  CardListItem,
  StatCard,
  StatusBadge,
  ProfileCompletionRing,
  IntroductionCard,
  NoIntroductionsCard,
  type Introduction,
  type Credential,
  CredentialCard,
} from '@/components/portal';

// Mock data for demo - would come from API
const mockIntroductions: Introduction[] = [
  {
    id: 'intro-1',
    clientName: 'Sunrise Care Home',
    clientType: 'Care Home',
    location: 'Bournemouth',
    roleTitle: 'Healthcare Assistant - Night Shifts',
    status: 'pending',
    requestedAt: new Date().toISOString(),
    message: 'We are looking for an experienced HCA to join our night team. The role involves supporting elderly residents with personal care and ensuring their comfort and safety throughout the night.',
  },
];

const mockCredentials: Credential[] = [
  {
    id: 'cred-1',
    type: 'dbs',
    name: 'Enhanced DBS Certificate',
    status: 'verified',
    verifiedDate: '2024-01-15',
    expiryDate: '2027-01-15',
    documentKey: 'credentials/dbs-123.pdf',
  },
  {
    id: 'cred-2',
    type: 'rtw',
    name: 'Right to Work',
    status: 'pending',
  },
];

export default function CandidateDashboardPage() {
  const { state } = useAuth();
  const router = useRouter();

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

  const incompleteItems = completionItems.filter((item) => !item.completed);
  const verifiedCredentials = mockCredentials.filter((c) => c.status === 'verified').length;
  const pendingIntroductions = mockIntroductions.filter((i) => i.status === 'pending').length;

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Identity Hero */}
      <IdentityHero
        firstName={profile.firstName}
        lastName={profile.lastName}
        headline={profile.professionalSummary?.slice(0, 80)}
        experienceLevel={profile.experienceLevel}
        profileCompletion={completionPercentage}
        status={profile.status}
        available={profile.available ?? false}
        city={profile.city}
        onEditProfile={() => router.push('/candidate/profile')}
      />

      {/* Status Alerts */}
      {profile.status === 'pending_verification' && (
        <div
          className="p-4 bg-portal-blue/10 border border-portal-blue/20 rounded-card"
          role="alert"
        >
          <div className="flex items-start gap-3">
            <span className="text-xl">✉️</span>
            <div>
              <h2 className="font-portal text-portal-body font-medium text-portal-blue-dark mb-1">
                Email Verification Required
              </h2>
              <p className="font-portal text-portal-meta text-portal-graphite-light">
                Please check your email and click the verification link to activate your account.
              </p>
            </div>
          </div>
        </div>
      )}

      {profile.status === 'pending_review' && (
        <div
          className="p-4 bg-portal-available/10 border border-portal-available/20 rounded-card"
          role="alert"
        >
          <div className="flex items-start gap-3">
            <span className="text-xl">👀</span>
            <div>
              <h2 className="font-portal text-portal-body font-medium text-portal-graphite mb-1">
                Profile Under Review
              </h2>
              <p className="font-portal text-portal-meta text-portal-graphite-light">
                Our team is reviewing your profile. You&apos;ll be notified once it&apos;s approved.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="Profile Completion"
          value={`${completionPercentage}%`}
          icon={<ProfileCompletionRing percentage={completionPercentage} size="sm" />}
        />
        <StatCard
          label="Verified Credentials"
          value={verifiedCredentials}
          icon="🛡"
        />
        <StatCard
          label="Introduction Requests"
          value={pendingIntroductions}
          icon="💼"
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Main Column - Introductions */}
        <div className="lg:col-span-3 space-y-6">
          <PortalCard
            title="Introduction Requests"
            subtitle="Care providers who want to connect with you"
            action={
              pendingIntroductions > 0 ? (
                <StatusBadge status="new" label={`${pendingIntroductions} new`} />
              ) : null
            }
            padding="none"
            className="overflow-hidden"
          >
            <div className="p-5 space-y-4">
              {mockIntroductions.length > 0 ? (
                <>
                  {mockIntroductions.slice(0, 3).map((intro) => (
                    <IntroductionCard
                      key={intro.id}
                      introduction={intro}
                      onAccept={async (id) => {
                        console.log('Accept:', id);
                        // API call would go here
                      }}
                      onDecline={async (id) => {
                        console.log('Decline:', id);
                        // API call would go here
                      }}
                    />
                  ))}
                  {mockIntroductions.length > 3 && (
                    <Link
                      href="/candidate/introductions"
                      className="
                        block text-center py-3 font-portal text-portal-meta
                        text-portal-teal hover:text-portal-teal-dark
                      "
                    >
                      View all {mockIntroductions.length} requests →
                    </Link>
                  )}
                </>
              ) : (
                <NoIntroductionsCard />
              )}
            </div>
          </PortalCard>
        </div>

        {/* Side Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Completion */}
          {completionPercentage < 100 && (
            <PortalCard
              title="Complete Your Profile"
              subtitle={`${incompleteItems.length} items remaining`}
            >
              <div className="space-y-1">
                {incompleteItems.slice(0, 4).map((item) => (
                  <CardListItem
                    key={item.key}
                    label={item.label}
                    completed={item.completed}
                    onClick={() => router.push('/candidate/profile')}
                  />
                ))}
                {incompleteItems.length > 4 && (
                  <p className="pt-2 font-portal text-portal-meta text-portal-graphite-muted">
                    +{incompleteItems.length - 4} more
                  </p>
                )}
              </div>
              <Link
                href="/candidate/profile"
                className="
                  block mt-4 py-2.5 text-center rounded-card
                  font-portal text-portal-meta font-medium
                  bg-portal-blue text-white hover:bg-portal-blue-dark
                  transition-colors duration-portal
                "
              >
                Complete Profile
              </Link>
            </PortalCard>
          )}

          {/* Credentials Summary */}
          <PortalCard
            title="Credentials"
            subtitle="Your verified documents"
            action={
              <Link
                href="/candidate/credentials"
                className="font-portal text-portal-meta text-portal-teal hover:underline"
              >
                Manage
              </Link>
            }
          >
            <div className="space-y-3">
              {mockCredentials.slice(0, 3).map((credential) => (
                <div
                  key={credential.id}
                  className="flex items-center gap-3 py-2"
                >
                  <span
                    className={`
                      w-8 h-8 rounded-lg flex items-center justify-center text-sm
                      ${credential.status === 'verified'
                        ? 'bg-portal-verified/10'
                        : 'bg-portal-stone'
                      }
                    `}
                  >
                    {credential.type === 'dbs' ? '🛡' : credential.type === 'rtw' ? '📋' : '📄'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-portal text-portal-meta text-portal-graphite truncate">
                      {credential.name}
                    </p>
                  </div>
                  <StatusBadge status={credential.status} size="sm" showDot={false} />
                </div>
              ))}
            </div>
            <Link
              href="/candidate/credentials"
              className="
                block mt-4 py-2 text-center rounded-card
                font-portal text-portal-meta font-medium
                border border-portal-stone text-portal-graphite
                hover:bg-portal-stone transition-colors duration-portal
              "
            >
              View All Credentials
            </Link>
          </PortalCard>

          {/* Quick Actions */}
          <PortalCard title="Quick Actions">
            <div className="space-y-1">
              <CardListItem
                label="Edit Profile"
                icon="✏️"
                onClick={() => router.push('/candidate/profile')}
              />
              <CardListItem
                label="Upload Credentials"
                icon="📤"
                onClick={() => router.push('/candidate/credentials')}
              />
              <CardListItem
                label="Account Settings"
                icon="⚙️"
                onClick={() => router.push('/candidate/settings')}
              />
            </div>
          </PortalCard>
        </div>
      </div>

      {/* Visibility Info */}
      {profile.status === 'active' && (
        <div className="p-5 bg-portal-verified/5 border border-portal-verified/20 rounded-card-lg">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-portal-verified/10 flex items-center justify-center">
              <span className="text-2xl">✨</span>
            </div>
            <div>
              <h2 className="font-portal text-portal-heading text-portal-graphite mb-1">
                Your Profile is Live
              </h2>
              <p className="font-portal text-portal-body text-portal-graphite-light">
                Healthcare providers can now find and contact you through Medibee.
                Keep your profile updated to receive the best opportunities.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
