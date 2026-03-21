/**
 * WorkHistoryTimeline Component
 *
 * Visual career journey timeline showing work history entries.
 * Per plan: "Visual journey, timeline graphic, career progression"
 */

'use client';

import type { WorkHistoryEntry } from '@/lib/auth/types';

export interface WorkHistoryTimelineProps {
  entries: WorkHistoryEntry[];
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
}

function calculateDuration(startDate: string, endDate?: string | null): string {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
  if (remainingMonths === 0) return `${years} year${years !== 1 ? 's' : ''}`;
  return `${years} year${years !== 1 ? 's' : ''} ${remainingMonths} mo`;
}

export function WorkHistoryTimeline({ entries }: WorkHistoryTimelineProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-8 text-portal-graphite-muted font-portal text-portal-meta">
        No work history added yet
      </div>
    );
  }

  // Sort by start date, most recent first
  const sorted = [...entries].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  return (
    <div className="relative">
      {/* Timeline connector line */}
      {sorted.length > 1 && (
        <div
          data-testid="timeline-connector"
          className="absolute left-4 top-6 bottom-6 w-0.5 bg-gradient-to-b from-portal-teal via-portal-blue to-portal-teal/30"
        />
      )}

      <div className="space-y-4">
        {sorted.map((entry, index) => (
          <div
            key={`${entry.employer}-${entry.role}-${entry.startDate}-${index}`}
            data-testid={entry.isCurrent ? 'timeline-entry-current' : `timeline-entry-${index}`}
            className={`
              relative pl-10 py-3
              ${entry.isCurrent ? 'bg-portal-teal/5 rounded-card border-l-2 border-portal-teal' : ''}
            `}
          >
            {/* Timeline dot */}
            <div
              className={`
                absolute left-2 top-5 w-4 h-4 rounded-full border-2 border-white shadow-sm
                ${entry.isCurrent ? 'bg-portal-teal' : 'bg-portal-blue'}
              `}
            />

            {/* Entry content */}
            <div>
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 mb-1">
                <h3 className="font-portal text-portal-body font-semibold text-portal-graphite">
                  {entry.role}
                </h3>
                {entry.isCurrent && (
                  <span className="px-2 py-0.5 bg-portal-teal/10 text-portal-teal rounded-full font-portal text-ui-xs font-medium">
                    Current
                  </span>
                )}
              </div>

              <p className="font-portal text-portal-meta text-portal-graphite-light mb-1">
                {entry.employer}
              </p>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-portal text-ui-xs text-portal-graphite-muted">
                <span>
                  {formatDate(entry.startDate)} — {entry.isCurrent || !entry.endDate ? 'Present' : formatDate(entry.endDate)}
                </span>
                <span className="text-portal-teal">
                  {calculateDuration(entry.startDate, entry.endDate)}
                </span>
              </div>

              {entry.description && (
                <p className="mt-2 font-portal text-portal-meta text-portal-graphite-light leading-relaxed">
                  {entry.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
