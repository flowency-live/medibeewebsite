'use client';

import { cn } from '@/lib/utils';
import type { BacklogItem } from '@/lib/schemas/backlog';
import { BacklogTypeBadge } from './BacklogTypeBadge';
import { BacklogEffortBadge } from './BacklogEffortBadge';

interface BacklogCardProps {
  item: BacklogItem;
  onClick?: () => void;
  isDragging?: boolean;
  className?: string;
  'data-testid'?: string;
}

export function BacklogCard({
  item,
  onClick,
  isDragging = false,
  className,
  'data-testid': testId,
}: BacklogCardProps) {
  return (
    <div
      data-testid={testId}
      onClick={onClick}
      className={cn(
        'p-3 rounded-lg cursor-pointer transition-all duration-200',
        'bg-void-medium border border-ash-border',
        'hover:bg-void-elevated hover:border-ash-border-light',
        isDragging && 'shadow-lg ring-2 ring-gold/30 rotate-2',
        className
      )}
    >
      <div className="flex items-start gap-2 mb-2">
        <span className="text-xs text-ash font-mono w-5 shrink-0">
          #{item.stackPosition}
        </span>
        <h4 className="text-sm font-medium text-pearl leading-tight line-clamp-2">
          {item.title}
        </h4>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <BacklogTypeBadge type={item.type} />
        <BacklogEffortBadge effort={item.effort} />
      </div>

      {item.description && (
        <p className="mt-2 text-xs text-ash line-clamp-2">{item.description}</p>
      )}
    </div>
  );
}
