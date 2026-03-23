'use client';

/**
 * Colony Dashboard Component
 *
 * Displays the Colony (employer) dashboard matching mockup:
 * .documentation/CPO/CellHiveColony MedibeeeV2/Graphics/da164fb3-3f0e-4347-a933-1f9734e647ee.png
 *
 * Key features:
 * - "Medibee Colony" branding (NOT "Client Portal")
 * - Candidate search grid with filters
 * - Shortlist + Saved Candidates sidebar
 * - Dark theme with honeycomb background
 * - NO CREDITS
 */

import * as React from 'react';
import Link from 'next/link';
import { HoneycombPattern } from '@/components/decorative/HoneycombPattern';
import { TierBadge, TierType } from '@/components/ui/TierBadge';

interface Candidate {
  id: string;
  name: string;
  role: string;
  tier: TierType;
  photoUrl?: string;
}

// Mock data for display - will be replaced with API call
const mockCandidates: Candidate[] = [
  { id: '1', name: 'Claire Thompson', role: 'Health Care Assistant', tier: 'cell' },
  { id: '2', name: 'Emily Jackson', role: 'Staff Nurse', tier: 'hive' },
  { id: '3', name: 'Sarah Patel', role: 'Senior Nurse', tier: 'hive' },
  { id: '4', name: 'Laura Watson', role: 'Care Assistant', tier: 'cell' },
  { id: '5', name: 'Megan Harris', role: 'Registered Nurse', tier: 'hive' },
  { id: '6', name: 'Jessica Reed', role: 'Nursing Assistant', tier: 'hive' },
];

const mockShortlist: Candidate[] = [
  { id: '7', name: 'Ashley Carter', role: 'HCA', tier: 'hive' },
  { id: '8', name: 'James Wilson', role: 'RN', tier: 'hive' },
  { id: '9', name: 'Sophie Grant', role: 'HCA', tier: 'cell' },
  { id: '10', name: 'Mark Evans', role: 'RN', tier: 'hive' },
];

const mockSaved: Candidate[] = [
  { id: '11', name: 'Rachel Green', role: 'HCA', tier: 'cell' },
  { id: '12', name: 'David Hunt', role: 'RN', tier: 'hive' },
  { id: '13', name: 'Nina Brooks', role: 'HCA', tier: 'cell' },
];

export function ColonyDashboard() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [roleFilter, setRoleFilter] = React.useState('');
  const [locationFilter, setLocationFilter] = React.useState('');
  const [verificationFilter, setVerificationFilter] = React.useState('');

  const handleSearch = () => {
    // Search functionality - to be implemented
  };

  const handleShortlist = (candidateId: string) => {
    // Shortlist functionality - to be implemented
  };

  const handleViewProfile = (candidateId: string) => {
    // Navigation to profile - to be implemented
  };

  return (
    <div className="min-h-screen bg-brand-dark relative">
      {/* Honeycomb Background */}
      <HoneycombPattern
        variant="gold"
        opacity={0.08}
        data-testid="honeycomb-background"
      />

      {/* Header */}
      <header className="relative z-10 bg-brand-slate/90 backdrop-blur-sm border-b border-brand-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <BeeIcon className="w-8 h-8 text-brand-gold" />
              <span className="text-xl font-semibold text-brand-pearl">
                Medibee Colony
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Main Column */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="bg-brand-slate/60 backdrop-blur-sm rounded-xl p-4 mb-6 border border-brand-gold/10">
              <div className="flex flex-wrap items-end gap-4">
                <div className="flex-1 min-w-[200px]">
                  <input
                    type="text"
                    placeholder="Search for candidates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2.5 bg-brand-dark/50 border border-brand-gold/20 rounded-lg text-brand-pearl placeholder-brand-pearl-muted focus:outline-none focus:border-brand-gold/50"
                  />
                </div>

                <div>
                  <label htmlFor="role-filter" className="block text-xs text-brand-pearl-muted mb-1">
                    Role
                  </label>
                  <select
                    id="role-filter"
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="px-3 py-2.5 bg-brand-dark/50 border border-brand-gold/20 rounded-lg text-brand-pearl focus:outline-none focus:border-brand-gold/50"
                  >
                    <option value="">All Roles</option>
                    <option value="hca">Healthcare Assistant</option>
                    <option value="nurse">Nurse</option>
                    <option value="senior-nurse">Senior Nurse</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="location-filter" className="block text-xs text-brand-pearl-muted mb-1">
                    Location
                  </label>
                  <select
                    id="location-filter"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="px-3 py-2.5 bg-brand-dark/50 border border-brand-gold/20 rounded-lg text-brand-pearl focus:outline-none focus:border-brand-gold/50"
                  >
                    <option value="">All Locations</option>
                    <option value="london">London</option>
                    <option value="manchester">Manchester</option>
                    <option value="birmingham">Birmingham</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="verification-filter" className="block text-xs text-brand-pearl-muted mb-1">
                    Verification Status
                  </label>
                  <select
                    id="verification-filter"
                    value={verificationFilter}
                    onChange={(e) => setVerificationFilter(e.target.value)}
                    className="px-3 py-2.5 bg-brand-dark/50 border border-brand-gold/20 rounded-lg text-brand-pearl focus:outline-none focus:border-brand-gold/50"
                  >
                    <option value="">All</option>
                    <option value="verified">Verified</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>

                <button
                  onClick={handleSearch}
                  className="px-6 py-2.5 bg-brand-gold text-brand-dark font-semibold rounded-lg hover:bg-brand-gold-light transition-colors"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Candidate Grid */}
            <div
              data-testid="candidate-grid"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {mockCandidates.map((candidate) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  onViewProfile={() => handleViewProfile(candidate.id)}
                  onShortlist={() => handleShortlist(candidate.id)}
                />
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="w-72 hidden lg:block space-y-6">
            {/* Shortlist Panel */}
            <section
              aria-label="Shortlist"
              className="bg-brand-slate/60 backdrop-blur-sm rounded-xl p-4 border border-brand-gold/10"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-brand-pearl">Shortlist</h2>
                <span className="w-6 h-6 bg-brand-gold text-brand-dark rounded-full flex items-center justify-center text-sm font-bold">
                  {mockShortlist.length}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                {mockShortlist.slice(0, 4).map((candidate) => (
                  <div key={candidate.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-dark/50 border-2 border-brand-gold/30 overflow-hidden flex items-center justify-center">
                      <span className="text-brand-pearl-muted text-sm">
                        {candidate.name.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm text-brand-pearl">{candidate.name}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/client/shortlists"
                className="block w-full py-2 text-center text-sm font-medium text-brand-gold hover:text-brand-gold-light transition-colors"
              >
                View Shortlist
              </Link>
            </section>

            {/* Saved Candidates Panel */}
            <section
              aria-label="Saved Candidates"
              className="bg-brand-slate/60 backdrop-blur-sm rounded-xl p-4 border border-brand-gold/10"
            >
              <h2 className="text-lg font-semibold text-brand-pearl mb-4">Saved Candidates</h2>

              <div className="space-y-3 mb-4">
                {mockSaved.slice(0, 3).map((candidate) => (
                  <div key={candidate.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-dark/50 border-2 border-brand-gold/30 overflow-hidden flex items-center justify-center">
                      <span className="text-brand-pearl-muted text-sm">
                        {candidate.name.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm text-brand-pearl">{candidate.name}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/client/candidates/saved"
                className="block w-full py-2 text-center text-sm font-medium text-brand-gold hover:text-brand-gold-light transition-colors"
              >
                View All
              </Link>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}

interface CandidateCardProps {
  candidate: Candidate;
  onViewProfile: () => void;
  onShortlist: () => void;
}

function CandidateCard({ candidate, onViewProfile, onShortlist }: CandidateCardProps) {
  return (
    <div
      data-testid="candidate-card"
      className="bg-brand-slate/60 backdrop-blur-sm rounded-xl p-4 border border-brand-gold/10 hover:border-brand-gold/30 transition-colors"
    >
      {/* Photo */}
      <div className="flex justify-center mb-4">
        <div
          data-testid="candidate-photo"
          className="w-24 h-24 rounded-full bg-brand-dark/50 border-4 border-brand-gold overflow-hidden flex items-center justify-center"
        >
          {candidate.photoUrl ? (
            <img
              src={candidate.photoUrl}
              alt={candidate.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-2xl text-brand-pearl-muted">
              {candidate.name.charAt(0)}
            </span>
          )}
        </div>
      </div>

      {/* Name */}
      <h3
        data-testid="candidate-name"
        className="text-lg font-semibold text-brand-pearl text-center mb-1"
      >
        {candidate.name}
      </h3>

      {/* Role */}
      <p
        data-testid="candidate-role"
        className="text-sm text-brand-pearl-muted text-center mb-3"
      >
        {candidate.role}
      </p>

      {/* Tier Badge */}
      <div className="flex justify-center mb-4">
        <TierBadge tier={candidate.tier} size="sm" />
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={onViewProfile}
          className="flex-1 py-2 px-3 bg-brand-dark/50 text-brand-pearl text-sm font-medium rounded-lg border border-brand-gold/20 hover:border-brand-gold/40 transition-colors"
        >
          View Profile
        </button>
        <button
          onClick={onShortlist}
          className="flex-1 py-2 px-3 bg-brand-gold/10 text-brand-gold text-sm font-medium rounded-lg border border-brand-gold/30 hover:bg-brand-gold/20 transition-colors"
        >
          Shortlist
        </button>
      </div>
    </div>
  );
}

function BeeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2C13.1 2 14 2.9 14 4C14 4.74 13.6 5.39 13 5.73V7H14C15.1 7 16 7.9 16 9V10C17.1 10 18 10.9 18 12V13C19.1 13 20 13.9 20 15C20 16.1 19.1 17 18 17H17V18C17 19.66 15.66 21 14 21H10C8.34 21 7 19.66 7 18V17H6C4.9 17 4 16.1 4 15C4 13.9 4.9 13 6 13V12C6 10.9 6.9 10 8 10V9C8 7.9 8.9 7 10 7H11V5.73C10.4 5.39 10 4.74 10 4C10 2.9 10.9 2 12 2ZM9 12V15H15V12H9ZM10 16V18C10 18.55 10.45 19 11 19H13C13.55 19 14 18.55 14 18V16H10Z" />
    </svg>
  );
}
