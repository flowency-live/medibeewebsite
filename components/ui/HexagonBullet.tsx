import { cn } from '@/lib/utils';

const colorValues = {
  gold: '#E5C55C',
  provider: '#4A6FA5',
  hca: '#7B6B8D',
  'soft-gold': '#F5E6A3',
} as const;

interface HexagonBulletProps {
  color?: keyof typeof colorValues;
  className?: string;
  'data-testid'?: string;
}

export function HexagonBullet({
  color = 'gold',
  className,
  'data-testid': testId,
}: HexagonBulletProps) {
  const colorValue = colorValues[color];

  return (
    <svg
      viewBox="0 0 100 115"
      className={cn('w-3 h-3.5 flex-shrink-0', className)}
      aria-hidden="true"
      data-testid={testId}
    >
      <polygon
        points="50,0 100,28.75 100,86.25 50,115 0,86.25 0,28.75"
        fill={colorValue}
      />
    </svg>
  );
}
