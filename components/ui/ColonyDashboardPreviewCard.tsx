'use client';

import { GlassCard } from './GlassCard';

interface CandidateMatch {
  name: string;
  role: string;
  matchPercentage: number;
  initials: string;
}

interface ColonyDashboardPreviewCardProps {
  /** Title displayed at top. Default: "Colony Dashboard" */
  title?: string;
  /** Candidates to display */
  candidates?: CandidateMatch[];
  /** GlassCard animation delay in ms. Default: 600 */
  delay?: number;
  /** Additional CSS classes for positioning */
  className?: string;
  'data-testid'?: string;
}

const defaultCandidates: CandidateMatch[] = [
  { name: 'Hannah P.', role: 'Senior HCA', matchPercentage: 98, initials: 'HP' },
  { name: 'Jenny C.', role: 'Care Assistant', matchPercentage: 94, initials: 'JC' },
  { name: 'Claire S.', role: 'Mental Health HCA', matchPercentage: 91, initials: 'CS' },
];

// Internal: Candidate card for Colony dashboard preview
function CandidatePreviewCard({
  name,
  role,
  matchPercentage,
  initials,
}: CandidateMatch) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] transition-colors">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center text-gold font-semibold text-sm">
        {initials}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-pearl-soft truncate">{name}</div>
        <div className="text-xs text-pearl-soft/50">{role}</div>
      </div>
      <div className="text-xs font-medium text-gold">{matchPercentage}%</div>
    </div>
  );
}

export function ColonyDashboardPreviewCard({
  title = 'Colony Dashboard',
  candidates = defaultCandidates,
  delay = 600,
  className = '',
  'data-testid': testId,
}: ColonyDashboardPreviewCardProps) {
  return (
    <GlassCard
      data-testid={testId}
      className={`hover:scale-[1.02] hover:shadow-gold-glow-sm ${className}`}
      delay={delay}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-indigo-500/20 flex items-center justify-center">
              <svg
                className="w-3 h-3 text-indigo-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
            </div>
            <span className="text-xs font-medium text-indigo-400">{title}</span>
          </div>
          <span className="text-[10px] text-pearl-soft/40">Active Candidates</span>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-4 text-[10px]">
          <span className="px-2 py-1 rounded bg-indigo-500/20 text-indigo-300">
            Shortlisted
          </span>
          <span className="px-2 py-1 rounded text-pearl-soft/40">All Matches</span>
        </div>

        {/* Candidate list */}
        <div className="space-y-2">
          {candidates.map((candidate) => (
            <CandidatePreviewCard
              key={candidate.name}
              name={candidate.name}
              role={candidate.role}
              matchPercentage={candidate.matchPercentage}
              initials={candidate.initials}
            />
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
