import { cn } from '@/lib/utils';

const variantColors = {
  provider: '#4A6FA5',
  hca: '#7B6B8D',
} as const;

interface HexagonBadgeProps {
  number: number;
  variant: keyof typeof variantColors;
  className?: string;
  'data-testid'?: string;
}

export function HexagonBadge({
  number,
  variant,
  className,
  'data-testid': testId,
}: HexagonBadgeProps) {
  const colorValue = variantColors[variant];

  return (
    <div
      className={cn('relative w-14 h-16 flex-shrink-0', className)}
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
      <span className="absolute inset-0 flex items-center justify-center font-display text-xl font-semibold text-midnight">
        {number}
      </span>
    </div>
  );
}
