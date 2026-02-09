import { cn } from '@/lib/utils';

const variantColors = {
  provider: '#4A6FA5',
  hca: '#E5C55C',
  gold: '#E5C55C',
} as const;

const sizeClasses = {
  sm: 'w-10 h-12',
  md: 'w-14 h-16',
  lg: 'w-20 h-24',
} as const;

const sizeFontClasses = {
  sm: 'text-base',
  md: 'text-xl',
  lg: 'text-2xl',
} as const;

interface HexagonBadgeProps {
  number: number;
  variant: keyof typeof variantColors;
  size?: keyof typeof sizeClasses;
  className?: string;
  'data-testid'?: string;
}

export function HexagonBadge({
  number,
  variant,
  size = 'md',
  className,
  'data-testid': testId,
}: HexagonBadgeProps) {
  const colorValue = variantColors[variant];

  return (
    <div
      className={cn('relative flex-shrink-0', sizeClasses[size], className)}
      aria-hidden="true"
      data-testid={testId}
    >
      <svg
        viewBox="0 0 100 115"
        className="w-full h-full"
      >
        <polygon
          points="50,0 100,28.75 100,86.25 50,115 0,86.25 0,28.75"
          fill={colorValue}
        />
      </svg>
      <span className={cn(
        'absolute inset-0 flex items-center justify-center font-display font-semibold text-midnight',
        sizeFontClasses[size]
      )}>
        {number}
      </span>
    </div>
  );
}
