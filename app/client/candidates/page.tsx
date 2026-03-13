'use client';

/**
 * Browse Candidates Page
 *
 * Search and filter candidates with tier-based visibility.
 */

import * as React from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth, isClient } from '@/lib/auth';
import { matchingApi } from '@/lib/api';
import { Button } from '@/components/ui';

interface Candidate {
  candidateId: string;
  firstName: string;
  lastName: string;
  location: string;
  experienceLevel: string;
  settings: string[];
  available: boolean;
  summary?: string;
}

interface BrowseResponse {
  candidates: Candidate[];
  nextCursor?: string;
  total: number;
}

const EXPERIENCE_LEVELS = [
  { value: '', label: 'All Experience' },
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
];

export default function BrowseCandidatesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { state } = useAuth();

  const [candidates, setCandidates] = React.useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [nextCursor, setNextCursor] = React.useState<string | undefined>();
  const [total, setTotal] = React.useState(0);

  // Filter state
  const [location, setLocation] = React.useState(searchParams.get('location') || '');
  const [experienceLevel, setExperienceLevel] = React.useState(
    searchParams.get('experience') || ''
  );
  const [selectedSettings, setSelectedSettings] = React.useState<string[]>(
    searchParams.get('settings')?.split(',').filter(Boolean) || []
  );
  const [availableOnly, setAvailableOnly] = React.useState(
    searchParams.get('available') === 'true'
  );

  const loadCandidates = React.useCallback(
    async (cursor?: string) => {
      setIsLoading(true);

      const params: Record<string, string> = {};
      if (location) params.location = location;
      if (experienceLevel) params.experienceLevel = experienceLevel;
      if (selectedSettings.length > 0) params.settings = selectedSettings.join(',');
      if (availableOnly) params.available = 'true';
      if (cursor) params.cursor = cursor;
      params.limit = '20';

      const response = await matchingApi.browseCandidates(params);

      if (response.success && response.data) {
        const data = response.data as BrowseResponse;
        if (cursor) {
          setCandidates((prev) => [...prev, ...data.candidates]);
        } else {
          setCandidates(data.candidates);
        }
        setNextCursor(data.nextCursor);
        setTotal(data.total);
      }

      setIsLoading(false);
    },
    [location, experienceLevel, selectedSettings, availableOnly]
  );

  React.useEffect(() => {
    loadCandidates();
  }, [loadCandidates]);

  const handleSearch = () => {
    // Update URL params
    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (experienceLevel) params.set('experience', experienceLevel);
    if (selectedSettings.length > 0) params.set('settings', selectedSettings.join(','));
    if (availableOnly) params.set('available', 'true');

    router.push(`/client/candidates?${params.toString()}`);
    loadCandidates();
  };

  const handleLoadMore = () => {
    if (nextCursor) {
      loadCandidates(nextCursor);
    }
  };

  const toggleSetting = (setting: string) => {
    setSelectedSettings((prev) =>
      prev.includes(setting) ? prev.filter((s) => s !== setting) : [...prev, setting]
    );
  };

  if (!isClient(state)) {
    return null;
  }

  const { subscription } = state;

  if (!subscription) {
    return (
      <div className="text-center py-12">
        <h1 className="font-display text-display-sm text-ink mb-4">Subscription Required</h1>
        <p className="font-body text-body-md text-slate-blue mb-6">
          You need an active subscription to browse candidates.
        </p>
        <Link href="/client/subscription">
          <Button>View Plans</Button>
        </Link>
      </div>
    );
  }

  const isBronze = subscription.tier === 'bronze';

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-display-sm text-ink mb-2">Browse Candidates</h1>
        <p className="font-body text-body-md text-slate-blue">
          {total > 0 ? `${total} candidates match your criteria` : 'Search for healthcare professionals'}
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-sm border border-neutral-grey/20 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block font-body text-body-sm text-slate-blue mb-1">
              Location (Outward Postcode)
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value.toUpperCase())}
              placeholder="e.g. BH8"
              className="w-full px-4 py-2 border border-neutral-grey/30 rounded-sm font-body text-body-md focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-slate-blue"
            />
          </div>

          <div>
            <label className="block font-body text-body-sm text-slate-blue mb-1">
              Experience Level
            </label>
            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="w-full px-4 py-2 border border-neutral-grey/30 rounded-sm font-body text-body-md focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-slate-blue"
            >
              {EXPERIENCE_LEVELS.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={availableOnly}
                onChange={(e) => setAvailableOnly(e.target.checked)}
                className="w-4 h-4 text-slate-blue focus:ring-soft-gold border-neutral-grey/30 rounded"
              />
              <span className="font-body text-body-md text-ink">Available only</span>
            </label>
          </div>

          <div className="flex items-end">
            <Button onClick={handleSearch} className="w-full">
              Search
            </Button>
          </div>
        </div>

        <div>
          <label className="block font-body text-body-sm text-slate-blue mb-2">Care Settings</label>
          <div className="flex flex-wrap gap-2">
            {CARE_SETTINGS.map((setting) => (
              <button
                key={setting.value}
                onClick={() => toggleSetting(setting.value)}
                className={`px-3 py-1 rounded-sm text-sm font-body transition-colors ${
                  selectedSettings.includes(setting.value)
                    ? 'bg-slate-blue text-mist'
                    : 'bg-slate-blue/10 text-slate-blue hover:bg-slate-blue/20'
                }`}
              >
                {setting.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      {isLoading && candidates.length === 0 ? (
        <div className="text-center py-12">
          <div className="animate-pulse mb-4">
            <div className="w-16 h-16 bg-slate-blue/20 rounded-full mx-auto" />
          </div>
          <p className="font-body text-body-md text-slate-blue">Loading candidates...</p>
        </div>
      ) : candidates.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-sm border border-neutral-grey/20">
          <p className="font-body text-body-md text-slate-blue mb-2">No candidates found</p>
          <p className="font-body text-body-sm text-slate-blue/70">
            Try adjusting your search filters
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-8">
            {candidates.map((candidate) => (
              <div
                key={candidate.candidateId}
                className="bg-white p-6 rounded-sm border border-neutral-grey/20 hover:border-slate-blue/30 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-display text-lg text-ink">
                        {candidate.firstName}{' '}
                        {isBronze ? `${candidate.lastName.charAt(0)}.` : candidate.lastName}
                      </h3>
                      <span
                        className={`px-2 py-0.5 text-xs font-semibold rounded ${
                          candidate.available
                            ? 'bg-green-100 text-green-700'
                            : 'bg-neutral-grey/20 text-slate-blue'
                        }`}
                      >
                        {candidate.available ? 'Available' : 'Not Available'}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-3 font-body text-body-sm text-slate-blue">
                      <span>📍 {candidate.location}</span>
                      <span>
                        💼{' '}
                        {EXPERIENCE_LEVELS.find((l) => l.value === candidate.experienceLevel)
                          ?.label || candidate.experienceLevel}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {candidate.settings.map((setting) => (
                        <span
                          key={setting}
                          className="px-2 py-0.5 bg-slate-blue/10 text-slate-blue text-xs rounded"
                        >
                          {CARE_SETTINGS.find((s) => s.value === setting)?.label || setting}
                        </span>
                      ))}
                    </div>

                    {candidate.summary && (
                      <p className="font-body text-body-sm text-ink line-clamp-2">
                        {isBronze
                          ? candidate.summary.substring(0, 100) + '...'
                          : candidate.summary}
                      </p>
                    )}
                  </div>

                  <div className="ml-4 shrink-0">
                    <Link href={`/client/candidates/${candidate.candidateId}`}>
                      <Button variant="secondary">View Profile</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {nextCursor && (
            <div className="text-center">
              <Button onClick={handleLoadMore} variant="secondary" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Load More'}
              </Button>
            </div>
          )}
        </>
      )}

      {/* Tier Upgrade Prompt */}
      {isBronze && candidates.length > 0 && (
        <div className="mt-8 p-6 bg-rich-gold/10 rounded-sm border border-rich-gold/30">
          <h3 className="font-display text-lg text-ink mb-2">Upgrade for Full Profiles</h3>
          <p className="font-body text-body-md text-slate-blue mb-4">
            Silver and Gold subscribers see full candidate names, complete summaries, and get more
            contact credits.
          </p>
          <Link href="/client/subscription">
            <Button>Upgrade Plan</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
