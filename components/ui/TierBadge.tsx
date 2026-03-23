import { cn } from '@/lib/utils';

export type TierType = 'cell' | 'hive' | 'colony';
export type TierBadgeVariant = 'outline' | 'filled';

interface TierBadgeProps {
  tier: TierType;
  variant?: TierBadgeVariant;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const tierLabels: Record<TierType, string> = {
  cell: 'CELL',
  hive: 'HIVE',
  colony: 'COLONY',
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-xs gap-1.5',
  md: 'px-4 py-2 text-sm gap-2',
  lg: 'px-5 py-2.5 text-base gap-2.5',
};

const beeIconSizes = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

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

export function TierBadge({
  tier,
  variant,
  size = 'md',
  className,
}: TierBadgeProps) {
  // Hive defaults to filled, Cell/Colony default to outline
  const effectiveVariant = variant ?? (tier === 'hive' ? 'filled' : 'outline');
  const isFilled = effectiveVariant === 'filled';

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-lg font-semibold tracking-wide',
        sizeClasses[size],
        isFilled
          ? 'bg-brand-gold text-brand-dark'
          : 'bg-brand-slate border border-brand-gold/50 text-brand-gold',
        className
      )}
    >
      <BeeIcon className={cn(beeIconSizes[size], isFilled ? 'text-brand-dark' : 'text-brand-gold')} />
      <div className="flex flex-col leading-tight">
        <span className="text-[0.65em] opacity-80">MEDIBEE</span>
        <span>{tierLabels[tier]} MEMBER</span>
      </div>
    </div>
  );
}
