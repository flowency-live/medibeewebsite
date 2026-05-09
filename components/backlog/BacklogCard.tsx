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

      {item.pageContext && (
        <div className="mt-2 pt-2 border-t border-ash-border/50 flex items-center gap-1.5">
          <svg
            className="w-3 h-3 text-ash"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
          <span className="text-[10px] text-ash truncate" title={item.pageContext}>
            {item.pageContext}
          </span>
        </div>
      )}
    </div>
  );
}
