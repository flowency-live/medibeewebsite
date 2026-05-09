'use client';

import { cn } from '@/lib/utils';
import type { BacklogItemTypeValue } from '@/lib/schemas/backlog';

interface BacklogTypeBadgeProps {
  type: BacklogItemTypeValue;
  className?: string;
  'data-testid'?: string;
}

const typeConfig: Record<
  BacklogItemTypeValue,
  { label: string; className: string }
> = {
  feature: {
    label: 'Feature',
    className: 'bg-gold/10 text-gold',
  },
  bug: {
    label: 'Bug',
    className: 'bg-status-expired/10 text-status-expired',
  },
  'text-change': {
    label: 'Text',
    className: 'bg-status-active/10 text-status-active',
  },
  idea: {
    label: 'Idea',
    className: 'bg-status-pending/10 text-status-pending',
  },
};

export function BacklogTypeBadge({
  type,
  className,
  'data-testid': testId,
}: BacklogTypeBadgeProps) {
  const config = typeConfig[type];

  return (
    <span
      data-testid={testId}
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
