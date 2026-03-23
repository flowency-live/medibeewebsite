'use client';

/**
 * Browse Candidates Page
 *
 * Rich filtering and search for care providers.
 * Tier-based visibility controls what clients can see.
 */

import * as React from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth, isClient } from '@/lib/auth';
import { matchingApi } from '@/lib/api';
import { PortalCard, StatusBadge } from '@/components/portal';
import { TierBadge } from '@/components/ui';
import { getAllPersonas, type PersonaData } from '@/lib/test-data';

interface Candidate {
  candidateId: string;
  firstName: string;
  lastName: string;
  city?: string;
  experienceLevel: string;
  preferredSettings: string[];
  available: boolean;
  professionalSummary?: string;
  status: string;
  verifiedCredentialsCount?: number;
  tier: 'cell' | 'hive';
}

interface BrowseResponse {
  candidates: Candidate[];
  nextCursor?: string;
  total: number;
}

const EXPERIENCE_LEVELS = [
  { value: '', label: 'All Experience Levels' },
  { value: 'newly-qualified', label: 'Newly Qualified' },
  { value: '1-2-years', label: '1-2 Years' },
  { value: '3-5-years', label: '3-5 Years' },
  { value: '5-plus-years', label: '5+ Years' },
];

const CARE_SETTINGS = [
  { value: 'mental-health', label: 'Mental Health' },
  { value: 'acute-care', label: 'Acute Care' },
  { value: 'private-hospital', label: 'Private Hospital' },
  { value: 'care-home', label: 'Care Home' },
  { value: 'supported-living', label: 'Supported Living' },
  { value: 'end-of-life', label: 'End of Life' },
  { value: 'community', label: 'Community' },
  { value: 'learning-disabilities', label: 'Learning Disabilities' },
  { value: 'dementia-care', label: 'Dementia Care' },
  { value: 'paediatric', label: 'Paediatric' },
];

const SORT_OPTIONS = [
  { value: 'recent', label: 'Most Recent' },
  { value: 'experience-high', label: 'Experience: High to Low' },
  { value: 'experience-low', label: 'Experience: Low to High' },
  { value: 'credentials', label: 'Most Credentials' },
];

const AVAILABILITY_OPTIONS = [
  { value: '', label: 'All Candidates' },
  { value: 'available', label: 'Available Now' },
  { value: 'open', label: 'Open to Offers' },
];

// Transform test personas to candidates for demo
function getTestCandidates(): Candidate[] {
  const personas = getAllPersonas();
  return personas.map((p) => {
    const verifiedCount = p.credentials.filter((c) => c.status === 'verified').length;
    // Candidates with verified credentials are Hive members
    const tier: 'cell' | 'hive' = verifiedCount > 0 ? 'hive' : 'cell';

    return {
      candidateId: p.profile.candidateId,
      firstName: p.profile.firstName,
      lastName: p.profile.lastName,
      city: p.profile.city,
      experienceLevel: p.profile.experienceLevel ?? '',
      preferredSettings: p.profile.preferredSettings ?? [],
      available: p.profile.available ?? true,
      professionalSummary: p.profile.professionalSummary,
      status: p.profile.status,
      verifiedCredentialsCount: verifiedCount,
      tier,
    };
  })
    // Hive members appear first, then sort by activity (recent first)
    .sort((a, b) => {
      if (a.tier !== b.tier) {
        return a.tier === 'hive' ? -1 : 1;
      }
      return 0;
    });
}

export default function BrowseCandidatesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { state } = useAuth();

  // For demo, use test personas
  const [candidates, setCandidates] = React.useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = React.useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // Filter state
  const [searchQuery, setSearchQuery] = React.useState(searchParams.get('q') || '');
  const [location, setLocation] = React.useState(searchParams.get('location') || '');
  const [experienceLevel, setExperienceLevel] = React.useState(searchParams.get('experience') || '');
  const [selectedSettings, setSelectedSettings] = React.useState<string[]>(
    searchParams.get('settings')?.split(',').filter(Boolean) || []
  );
  const [availability, setAvailability] = React.useState(searchParams.get('availability') || '');
  const [sortBy, setSortBy] = React.useState(searchParams.get('sort') || 'recent');
  const [showFilters, setShowFilters] = React.useState(false);

  // TODO(PROD-WIRE): Replace test data with actual API call
  // See: .claude/BACKEND_WIRING_TODO.md for full instructions
  // Production code:
  //   const response = await matchingApi.browseCandidates(params);
  //   if (response.success && response.data) {
  //     setCandidates(response.data.candidates);
  //   }
  React.useEffect(() => {
    setIsLoading(true);

    // For demo, use test personas
    setTimeout(() => {
      const testCandidates = getTestCandidates();
      setCandidates(testCandidates);
      setFilteredCandidates(testCandidates);
      setIsLoading(false);
    }, 500);
  }, []);

  // Apply filters
  React.useEffect(() => {
    let result = [...candidates];

    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((c) =>
        `${c.firstName} ${c.lastName}`.toLowerCase().includes(query) ||
        c.professionalSummary?.toLowerCase().includes(query) ||
        c.city?.toLowerCase().includes(query)
      );
    }

    // Location
    if (location) {
      result = result.filter((c) =>
        c.city?.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Experience level
    if (experienceLevel) {
      result = result.filter((c) => c.experienceLevel === experienceLevel);
    }

    // Care settings
    if (selectedSettings.length > 0) {
      result = result.filter((c) =>
        selectedSettings.some((s) => c.preferredSettings.includes(s))
      );
    }

    // Availability
    if (availability === 'available') {
      result = result.filter((c) => c.available);
    }

    // Sorting
    switch (sortBy) {
      case 'experience-high':
        result.sort((a, b) => {
          const order = ['5-plus-years', '3-5-years', '1-2-years', 'newly-qualified'];
          return order.indexOf(a.experienceLevel) - order.indexOf(b.experienceLevel);
        });
        break;
      case 'experience-low':
        result.sort((a, b) => {
          const order = ['newly-qualified', '1-2-years', '3-5-years', '5-plus-years'];
          return order.indexOf(a.experienceLevel) - order.indexOf(b.experienceLevel);
        });
        break;
      case 'credentials':
        result.sort((a, b) => (b.verifiedCredentialsCount ?? 0) - (a.verifiedCredentialsCount ?? 0));
        break;
    }

    setFilteredCandidates(result);
  }, [candidates, searchQuery, location, experienceLevel, selectedSettings, availability, sortBy]);

  const toggleSetting = (setting: string) => {
    setSelectedSettings((prev) =>
      prev.includes(setting) ? prev.filter((s) => s !== setting) : [...prev, setting]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setLocation('');
    setExperienceLevel('');
    setSelectedSettings([]);
    setAvailability('');
    setSortBy('recent');
  };

  const activeFilterCount =
    (searchQuery ? 1 : 0) +
    (location ? 1 : 0) +
    (experienceLevel ? 1 : 0) +
    selectedSettings.length +
    (availability ? 1 : 0);

  if (!isClient(state)) {
    return null;
  }

  const { subscription } = state;
  const isBronze = subscription?.tier === 'bronze';

  if (!subscription) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-portal-available/10 flex items-center justify-center">
          <span className="text-3xl">🔒</span>
        </div>
        <h1 className="font-portal text-portal-name text-portal-graphite mb-3">
          Subscription Required
        </h1>
        <p className="font-portal text-portal-body text-portal-graphite-muted mb-6 max-w-md mx-auto">
          You need an active subscription to browse candidates and request introductions.
        </p>
        <Link
          href="/client/subscription"
          className="
            inline-block px-6 py-3 rounded-card
            font-portal text-portal-body font-medium
            bg-portal-blue text-white
            hover:bg-portal-blue-dark
            transition-colors duration-portal
          "
        >
          View Subscription Plans
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-portal text-portal-name text-portal-graphite mb-1">
            Browse Candidates
          </h1>
          <p className="font-portal text-portal-body text-portal-graphite-muted">
            {filteredCandidates.length} healthcare professionals match your criteria
          </p>
        </div>

        {/* View toggle & Sort */}
        <div className="flex items-center gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="
              px-4 py-2 rounded-card border border-portal-stone
              font-portal text-portal-meta text-portal-graphite
              bg-surface-0
              focus:outline-none focus:ring-2 focus:ring-portal-teal/30 focus:border-portal-teal
              transition-colors duration-portal
            "
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-surface-0 rounded-card-lg shadow-card p-6">
        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="flex-1 relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-portal-graphite-muted">
              🔍
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, skills, or location..."
              className="
                w-full pl-12 pr-4 py-3 rounded-card border border-portal-stone
                font-portal text-portal-body text-portal-graphite
                placeholder:text-portal-graphite-muted
                focus:outline-none focus:ring-2 focus:ring-portal-teal/30 focus:border-portal-teal
                transition-colors duration-portal
              "
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`
              flex items-center justify-center gap-2 px-4 py-3 rounded-card
              font-portal text-portal-meta font-medium
              border transition-colors duration-portal
              w-full sm:w-auto
              ${showFilters
                ? 'bg-portal-teal/10 border-portal-teal text-portal-teal'
                : 'bg-surface-0 border-portal-stone text-portal-graphite hover:bg-portal-stone/50'
              }
            `}
          >
            <span>⚙️</span>
            Filters
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-portal-blue text-white text-xs flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="pt-4 border-t border-portal-stone space-y-4 animate-fade-in-up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Location */}
              <div>
                <label className="block font-portal text-portal-meta text-portal-graphite mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Bournemouth, London"
                  className="
                    w-full px-4 py-2.5 rounded-card border border-portal-stone
                    font-portal text-portal-body text-portal-graphite
                    placeholder:text-portal-graphite-muted
                    focus:outline-none focus:ring-2 focus:ring-portal-teal/30 focus:border-portal-teal
                    transition-colors duration-portal
                  "
                />
              </div>

              {/* Experience Level */}
              <div>
                <label className="block font-portal text-portal-meta text-portal-graphite mb-2">
                  Experience Level
                </label>
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="
                    w-full px-4 py-2.5 rounded-card border border-portal-stone
                    font-portal text-portal-body text-portal-graphite
                    focus:outline-none focus:ring-2 focus:ring-portal-teal/30 focus:border-portal-teal
                    transition-colors duration-portal
                  "
                >
                  {EXPERIENCE_LEVELS.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Availability */}
              <div>
                <label className="block font-portal text-portal-meta text-portal-graphite mb-2">
                  Availability
                </label>
                <select
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="
                    w-full px-4 py-2.5 rounded-card border border-portal-stone
                    font-portal text-portal-body text-portal-graphite
                    focus:outline-none focus:ring-2 focus:ring-portal-teal/30 focus:border-portal-teal
                    transition-colors duration-portal
                  "
                >
                  {AVAILABILITY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Care Settings */}
            <div>
              <label className="block font-portal text-portal-meta text-portal-graphite mb-2">
                Care Settings
              </label>
              <div className="flex flex-wrap gap-2">
                {CARE_SETTINGS.map((setting) => {
                  const isSelected = selectedSettings.includes(setting.value);
                  return (
                    <button
                      key={setting.value}
                      onClick={() => toggleSetting(setting.value)}
                      className={`
                        px-3 py-1.5 rounded-full
                        font-portal text-portal-meta
                        transition-all duration-portal
                        ${isSelected
                          ? 'bg-portal-teal text-white'
                          : 'bg-portal-stone/50 text-portal-graphite hover:bg-portal-stone'
                        }
                      `}
                    >
                      {setting.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Clear Filters */}
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="font-portal text-portal-meta text-portal-alert hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Results */}
      {isLoading ? (
        <div className="text-center py-16">
          <div className="w-12 h-12 rounded-full bg-portal-blue/20 animate-pulse mx-auto mb-4" />
          <p className="font-portal text-portal-body text-portal-graphite-muted">
            Finding candidates...
          </p>
        </div>
      ) : filteredCandidates.length === 0 ? (
        <div className="text-center py-16 bg-surface-0 rounded-card-lg shadow-card">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-portal-stone flex items-center justify-center">
            <span className="text-2xl">🔍</span>
          </div>
          <p className="font-portal text-portal-body text-portal-graphite mb-2">
            No candidates match your criteria
          </p>
          <p className="font-portal text-portal-meta text-portal-graphite-muted mb-4">
            Try adjusting your filters or search terms
          </p>
          <button
            onClick={clearFilters}
            className="
              px-4 py-2 rounded-card
              font-portal text-portal-meta font-medium
              text-portal-blue hover:bg-portal-blue/5
              transition-colors duration-portal
            "
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCandidates.map((candidate) => (
            <CandidateCard
              key={candidate.candidateId}
              candidate={candidate}
              isBronze={isBronze}
            />
          ))}
        </div>
      )}

      {/* Tier Upgrade Prompt */}
      {isBronze && filteredCandidates.length > 0 && (
        <div className="p-6 bg-portal-available/5 border border-portal-available/20 rounded-card-lg">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-portal-available/10 flex items-center justify-center shrink-0">
              <span className="text-xl">⭐</span>
            </div>
            <div className="flex-1">
              <h3 className="font-portal text-portal-heading text-portal-graphite mb-1">
                Upgrade for Full Access
              </h3>
              <p className="font-portal text-portal-body text-portal-graphite-muted mb-4">
                Silver and Gold subscribers see complete candidate profiles, full summaries,
                and get more introduction credits.
              </p>
              <Link
                href="/client/subscription"
                className="
                  inline-block px-4 py-2 rounded-card
                  font-portal text-portal-meta font-medium
                  bg-portal-available text-white
                  hover:bg-portal-available/90
                  transition-colors duration-portal
                "
              >
                Upgrade Plan
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Candidate Card Component
function CandidateCard({ candidate, isBronze }: { candidate: Candidate; isBronze?: boolean }) {
  const initials = `${candidate.firstName[0]}${candidate.lastName[0]}`.toUpperCase();
  const experienceLabel = EXPERIENCE_LEVELS.find((l) => l.value === candidate.experienceLevel)?.label;

  return (
    <Link href={`/client/candidates/${candidate.candidateId}`}>
      <div className="
        bg-surface-0 rounded-card-lg shadow-card p-6
        hover:shadow-card-elevated
        transition-all duration-portal
        cursor-pointer
        border border-transparent hover:border-portal-blue/20
      ">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="
            w-14 h-14 rounded-full bg-portal-blue
            flex items-center justify-center shrink-0
          ">
            <span className="font-portal text-lg font-semibold text-white">
              {initials}
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Name & Status */}
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-portal text-portal-heading text-portal-graphite">
                {candidate.firstName}{' '}
                {isBronze ? `${candidate.lastName.charAt(0)}.` : candidate.lastName}
              </h3>
              <TierBadge tier={candidate.tier} size="sm" />
              {candidate.available && candidate.status === 'active' && (
                <StatusBadge status="available" size="sm" />
              )}
            </div>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-3 mb-3 font-portal text-portal-meta text-portal-graphite-muted">
              {experienceLabel && <span>{experienceLabel}</span>}
              {candidate.city && (
                <>
                  <span className="w-1 h-1 rounded-full bg-portal-graphite-muted" />
                  <span>📍 {candidate.city}</span>
                </>
              )}
              {candidate.verifiedCredentialsCount !== undefined && candidate.verifiedCredentialsCount > 0 && (
                <>
                  <span className="w-1 h-1 rounded-full bg-portal-graphite-muted" />
                  <span className="text-portal-verified">
                    ✓ {candidate.verifiedCredentialsCount} verified
                  </span>
                </>
              )}
            </div>

            {/* Care Settings */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {candidate.preferredSettings.slice(0, 4).map((setting) => (
                <span
                  key={setting}
                  className="
                    px-2 py-0.5 rounded-full
                    bg-portal-teal/10 text-portal-teal
                    font-portal text-ui-xs
                  "
                >
                  {CARE_SETTINGS.find((s) => s.value === setting)?.label || setting}
                </span>
              ))}
              {candidate.preferredSettings.length > 4 && (
                <span className="px-2 py-0.5 font-portal text-ui-xs text-portal-graphite-muted">
                  +{candidate.preferredSettings.length - 4} more
                </span>
              )}
            </div>

            {/* Summary */}
            {candidate.professionalSummary && (
              <p className="font-portal text-portal-body text-portal-graphite-light line-clamp-2">
                {isBronze
                  ? candidate.professionalSummary.substring(0, 100) + '...'
                  : candidate.professionalSummary.substring(0, 150) + (candidate.professionalSummary.length > 150 ? '...' : '')}
              </p>
            )}
          </div>

          {/* Action */}
          <div className="hidden sm:block shrink-0">
            <span className="
              inline-flex items-center gap-1
              font-portal text-portal-meta font-medium text-portal-blue
            ">
              View Profile
              <span>→</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
