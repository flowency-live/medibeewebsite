'use client';

import { GlassCard } from './GlassCard';

interface ProfilePreviewCardProps {
  /** Candidate initials for avatar. Default: "SM" */
  initials?: string;
  /** Candidate name. Default: "Sarah Mitchell" */
  name?: string;
  /** Role and location. Default: "Healthcare Assistant, London, UK" */
  subtitle?: string;
  /** Summary text */
  summary?: string;
  /** Skills tags. Default: ['Elderly Care', 'Mental Health', 'First Aid'] */
  skills?: string[];
  /** GlassCard animation delay in ms. Default: 200 */
  delay?: number;
  /** Additional CSS classes for positioning */
  className?: string;
  'data-testid'?: string;
}

const defaultSummary =
  'HCA ideally required for ad-hoc support roles within NHS acute care, with preference for ambulatory and clinic settings in Greater London.';

const defaultSkills = ['Elderly Care', 'Mental Health', 'First Aid'];

export function ProfilePreviewCard({
  initials = 'SM',
  name = 'Sarah Mitchell',
  subtitle = 'Healthcare Assistant, London, UK',
  summary = defaultSummary,
  skills = defaultSkills,
  delay = 200,
  className = '',
  'data-testid': testId,
}: ProfilePreviewCardProps) {
  return (
    <GlassCard
      data-testid={testId}
      className={`hover:scale-[1.02] hover:shadow-gold-glow-sm ${className}`}
      delay={delay}
    >
      {/* Header bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.08]">
        <div className="w-6 h-6 rounded bg-gold/20 flex items-center justify-center">
          <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2L3 7v11h14V7l-7-5z" />
          </svg>
        </div>
        <span className="text-sm font-medium text-gold">Medibee</span>
      </div>

      {/* Profile content */}
      <div className="p-5">
        {/* Avatar and name */}
        <div className="flex items-center gap-4 mb-5">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold/40 to-gold/10 flex items-center justify-center overflow-hidden border-2 border-gold/30">
            <span className="text-2xl font-bold text-gold">{initials}</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-pearl">{name}</h3>
            <p className="text-sm text-pearl-soft/60">{subtitle}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-4 p-1 rounded-lg bg-white/[0.04]">
          <button className="flex-1 px-3 py-2 text-xs font-medium rounded-md bg-gold/20 text-gold">
            Summary
          </button>
          <button className="flex-1 px-3 py-2 text-xs font-medium rounded-md text-pearl-soft/50 hover:text-pearl-soft/80 transition-colors">
            Skills
          </button>
          <button className="flex-1 px-3 py-2 text-xs font-medium rounded-md text-pearl-soft/50 hover:text-pearl-soft/80 transition-colors">
            Experience
          </button>
        </div>

        {/* Summary content */}
        <div className="space-y-3">
          <div>
            <div className="text-xs text-pearl-soft/40 uppercase tracking-wider mb-1">
              Summary
            </div>
            <p className="text-sm text-pearl-soft/70 leading-relaxed">{summary}</p>
          </div>

          <div>
            <div className="text-xs text-pearl-soft/40 uppercase tracking-wider mb-2">
              Skills
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 text-xs rounded bg-white/[0.06] text-pearl-soft/70"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
