'use client';

import { cn } from '@/lib/utils';
import type { BacklogItemEffortValue } from '@/lib/schemas/backlog';

interface BacklogEffortBadgeProps {
  effort: BacklogItemEffortValue | null;
  className?: string;
  'data-testid'?: string;
}

const effortConfig: Record<BacklogItemEffortValue, string> = {
  XS: 'bg-status-verified/10 text-status-verified',
  S: 'bg-status-verified/10 text-status-verified',
  M: 'bg-status-pending/10 text-status-pending',
  L: 'bg-status-expired/10 text-status-expired',
  XL: 'bg-status-expired/10 text-status-expired',
};

export function BacklogEffortBadge({
  effort,
  className,
  'data-testid': testId,
}: BacklogEffortBadgeProps) {
  if (!effort) return null;

  return (
    <span
      data-testid={testId}
      className={cn(
        'inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium',
        effortConfig[effort],
        className
      )}
    >
      {effort}
    </span>
  );
}
