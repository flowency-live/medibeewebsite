'use client';

/**
 * Candidate Introductions Page
 *
 * Per design language: "Request cards feel like invitations, not job alerts"
 * Accept/decline flow with clear visual feedback.
 */

import { useState } from 'react';
import { useAuth, isCandidate } from '@/lib/auth';
import {
  PortalCard,
  IntroductionCard,
  NoIntroductionsCard,
  StatusBadge,
  type Introduction,
  type IntroductionStatus,
} from '@/components/portal';

// Mock data - would come from API
const mockIntroductions: Introduction[] = [
  {
    id: 'intro-1',
    clientName: 'Sunrise Care Home',
    clientType: 'Care Home',
    location: 'Bournemouth',
    roleTitle: 'Healthcare Assistant - Night Shifts',
    status: 'pending',
    requestedAt: new Date().toISOString(),
    message:
      'We are looking for an experienced HCA to join our night team. The role involves supporting elderly residents with personal care and ensuring their comfort and safety throughout the night. We offer competitive rates and a supportive team environment.',
  },
  {
    id: 'intro-2',
    clientName: 'Pines Mental Health Unit',
    clientType: 'Mental Health',
    location: 'Poole',
    roleTitle: 'Mental Health Support Worker',
    status: 'pending',
    requestedAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    message:
      'We have an exciting opportunity for a mental health support worker to join our acute care team. Experience in de-escalation techniques and medication administration would be advantageous.',
  },
  {
    id: 'intro-3',
    clientName: 'St Mary\'s Private Hospital',
    clientType: 'Private Hospital',
    location: 'Southampton',
    status: 'accepted',
    requestedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    respondedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'intro-4',
    clientName: 'Oakwood Supported Living',
    clientType: 'Supported Living',
    location: 'Christchurch',
    roleTitle: 'Day Support Worker',
    status: 'facilitating',
    requestedAt: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
    respondedAt: new Date(Date.now() - 345600000).toISOString(),
  },
  {
    id: 'intro-5',
    clientName: 'Harmony Care Services',
    clientType: 'Domiciliary Care',
    location: 'Wimborne',
    status: 'completed',
    requestedAt: new Date(Date.now() - 864000000).toISOString(), // 10 days ago
    respondedAt: new Date(Date.now() - 777600000).toISOString(),
    completedAt: new Date(Date.now() - 604800000).toISOString(),
  },
  {
    id: 'intro-6',
    clientName: 'Valley View Nursing Home',
    clientType: 'Nursing Home',
    location: 'Ringwood',
    status: 'declined',
    requestedAt: new Date(Date.now() - 1036800000).toISOString(), // 12 days ago
    respondedAt: new Date(Date.now() - 950400000).toISOString(),
  },
];

type FilterStatus = 'all' | 'pending' | 'active' | 'completed';

const filterConfig: Record<FilterStatus, {
  label: string;
  statuses: IntroductionStatus[];
}> = {
  all: {
    label: 'All',
    statuses: ['pending', 'accepted', 'declined', 'facilitating', 'completed', 'expired'],
  },
  pending: {
    label: 'Pending',
    statuses: ['pending'],
  },
  active: {
    label: 'In Progress',
    statuses: ['accepted', 'facilitating'],
  },
  completed: {
    label: 'Completed',
    statuses: ['completed', 'declined', 'expired'],
  },
};

export default function CandidateIntroductionsPage() {
  const { state } = useAuth();
  const [introductions, setIntroductions] = useState(mockIntroductions);
  const [activeFilter, setActiveFilter] = useState<FilterStatus>('all');

  if (!isCandidate(state)) {
    return null;
  }

  const pendingCount = introductions.filter((i) => i.status === 'pending').length;
  const activeCount = introductions.filter((i) =>
    ['accepted', 'facilitating'].includes(i.status)
  ).length;

  const filteredIntroductions = introductions.filter((intro) =>
    filterConfig[activeFilter].statuses.includes(intro.status)
  );

  const handleAccept = async (id: string) => {
    // Mock API call
    setIntroductions((prev) =>
      prev.map((intro) =>
        intro.id === id
          ? { ...intro, status: 'accepted' as IntroductionStatus, respondedAt: new Date().toISOString() }
          : intro
      )
    );
  };

  const handleDecline = async (id: string) => {
    // Mock API call
    setIntroductions((prev) =>
      prev.map((intro) =>
        intro.id === id
          ? { ...intro, status: 'declined' as IntroductionStatus, respondedAt: new Date().toISOString() }
          : intro
      )
    );
  };

  const handleView = (id: string) => {
    console.log('View introduction:', id);
    // Would open detail modal or navigate to detail page
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-portal text-portal-name text-portal-graphite mb-2">
            Introduction Requests
          </h1>
          <p className="font-portal text-portal-body text-portal-graphite-muted">
            Care providers who want to connect with you
          </p>
        </div>

        {/* Quick Stats */}
        <div className="flex gap-3">
          {pendingCount > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 bg-portal-highlight/10 rounded-full">
              <span className="font-portal text-portal-meta text-portal-highlight font-medium">
                {pendingCount} new request{pendingCount !== 1 ? 's' : ''}
              </span>
            </div>
          )}
          {activeCount > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 bg-portal-teal/10 rounded-full">
              <span className="font-portal text-portal-meta text-portal-teal font-medium">
                {activeCount} in progress
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mb-2">
        {(Object.keys(filterConfig) as FilterStatus[]).map((filter) => {
          const isActive = activeFilter === filter;
          const count = introductions.filter((i) =>
            filterConfig[filter].statuses.includes(i.status)
          ).length;

          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap
                font-portal text-portal-meta font-medium
                transition-colors duration-portal
                ${isActive
                  ? 'bg-portal-blue text-white'
                  : 'bg-surface-0 text-portal-graphite hover:bg-portal-stone shadow-card'
                }
              `}
            >
              {filterConfig[filter].label}
              <span
                className={`
                  w-5 h-5 rounded-full text-xs flex items-center justify-center
                  ${isActive ? 'bg-white/20' : 'bg-portal-stone'}
                `}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Introduction List */}
      {filteredIntroductions.length > 0 ? (
        <div className="space-y-4">
          {/* Pending introductions first */}
          {activeFilter === 'all' || activeFilter === 'pending' ? (
            filteredIntroductions
              .filter((i) => i.status === 'pending')
              .map((intro) => (
                <IntroductionCard
                  key={intro.id}
                  introduction={intro}
                  onAccept={handleAccept}
                  onDecline={handleDecline}
                />
              ))
          ) : null}

          {/* Other introductions */}
          {filteredIntroductions
            .filter((i) => i.status !== 'pending')
            .map((intro) => (
              <IntroductionCard
                key={intro.id}
                introduction={intro}
                onView={handleView}
              />
            ))}
        </div>
      ) : (
        <NoIntroductionsCard />
      )}

      {/* How It Works */}
      <PortalCard
        title="How Introductions Work"
        className="bg-surface-1"
        elevation="flat"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-portal-highlight/10 flex items-center justify-center">
              <span className="text-xl">📨</span>
            </div>
            <h3 className="font-portal text-portal-body font-medium text-portal-graphite mb-1">
              1. Request Received
            </h3>
            <p className="font-portal text-portal-meta text-portal-graphite-muted">
              A care provider has seen your profile and wants to connect
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-portal-teal/10 flex items-center justify-center">
              <span className="text-xl">✅</span>
            </div>
            <h3 className="font-portal text-portal-body font-medium text-portal-graphite mb-1">
              2. You Accept
            </h3>
            <p className="font-portal text-portal-meta text-portal-graphite-muted">
              Accept requests from providers you&apos;re interested in working with
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-portal-verified/10 flex items-center justify-center">
              <span className="text-xl">🤝</span>
            </div>
            <h3 className="font-portal text-portal-body font-medium text-portal-graphite mb-1">
              3. Medibee Facilitates
            </h3>
            <p className="font-portal text-portal-meta text-portal-graphite-muted">
              We introduce you via phone and email within 24 hours
            </p>
          </div>
        </div>
      </PortalCard>

      {/* Privacy Note */}
      <div className="p-4 bg-portal-blue/5 border border-portal-blue/10 rounded-card">
        <div className="flex items-start gap-3">
          <span className="text-lg">🔒</span>
          <div>
            <h3 className="font-portal text-portal-body font-medium text-portal-graphite mb-1">
              Your Privacy is Protected
            </h3>
            <p className="font-portal text-portal-meta text-portal-graphite-muted">
              Your contact details are never shared directly. Medibee facilitates all
              introductions to ensure a professional experience for both parties.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
