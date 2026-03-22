import { cn } from '@/lib/utils';

const colors = {
  gold: '#D4AF37',
  'gold-light': '#F5C542',
  'gold-soft': '#E5D7A2',
  provider: '#4A6FA5',
  hca: '#D4AF37',
  pearl: '#FFFFFF',
  void: '#0D0D0D',
  ash: '#8A8A8A',
} as const;

const sizes = {
  xs: 'w-4 h-5',
  sm: 'w-6 h-7',
  md: 'w-12 h-14',
  lg: 'w-16 h-[74px]',
  xl: 'w-24 h-28',
} as const;

interface HexagonIconProps {
  size?: keyof typeof sizes;
  variant?: 'filled' | 'outline';
  color?: keyof typeof colors;
  className?: string;
  'data-testid'?: string;
}

export function HexagonIcon({
  size = 'md',
  variant = 'filled',
  color = 'gold',
  className,
  'data-testid': testId,
}: HexagonIconProps) {
  const colorValue = colors[color];
  const isFilled = variant === 'filled';

  return (
    <svg
      viewBox="0 0 100 115"
      className={cn(sizes[size], className)}
      aria-hidden="true"
      data-testid={testId}
    >
      <polygon
        points="50,0 100,28.75 100,86.25 50,115 0,86.25 0,28.75"
        fill={isFilled ? colorValue : 'none'}
        stroke={colorValue}
        strokeWidth={isFilled ? undefined : '2'}
      />
    </svg>
  );
}
