import { cn } from '@/lib/utils';

const honeycombPattern = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23E5C55C' fill-opacity='1'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

const gradientDirections = {
  'top-to-bottom': 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
  'bottom-to-top': 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
  'left-to-right': 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
  'right-to-left': 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
} as const;

interface HoneycombFadeProps {
  direction: keyof typeof gradientDirections;
  opacity?: number;
  className?: string;
  'data-testid'?: string;
}

export function HoneycombFade({
  direction,
  opacity = 0.1,
  className,
  'data-testid': testId,
}: HoneycombFadeProps) {
  return (
    <div
      className={cn('absolute inset-0 pointer-events-none', className)}
      style={{
        backgroundImage: honeycombPattern,
        opacity,
        maskImage: gradientDirections[direction],
        WebkitMaskImage: gradientDirections[direction],
      }}
      aria-hidden="true"
      data-testid={testId}
    />
  );
}
