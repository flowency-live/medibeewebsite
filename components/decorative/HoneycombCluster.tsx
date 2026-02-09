'use client';

import { cn } from '@/lib/utils';
import { HexagonIcon } from '@/components/ui/HexagonIcon';

const positionClasses = {
  'top-right': 'top-0 right-0',
  'top-left': 'top-0 left-0',
  'bottom-right': 'bottom-0 right-0',
  'bottom-left': 'bottom-0 left-0',
} as const;

interface HexagonPlacement {
  x: number;
  y: number;
  size: 'sm' | 'md' | 'lg';
  opacity: number;
}

const filledPlacements: HexagonPlacement[] = [
  { x: 0, y: 0, size: 'lg', opacity: 0.15 },
  { x: 70, y: 40, size: 'md', opacity: 0.2 },
  { x: 20, y: 80, size: 'sm', opacity: 0.12 },
  { x: 90, y: 10, size: 'sm', opacity: 0.1 },
  { x: 50, y: 100, size: 'md', opacity: 0.08 },
];

const outlinePlacements: HexagonPlacement[] = [
  { x: 10, y: 20, size: 'lg', opacity: 0.12 },
  { x: 60, y: 60, size: 'md', opacity: 0.15 },
  { x: 0, y: 90, size: 'sm', opacity: 0.1 },
  { x: 80, y: 30, size: 'sm', opacity: 0.08 },
];

interface HoneycombClusterProps {
  position: keyof typeof positionClasses;
  variant: 'filled' | 'outline';
  /** Scale multiplier for cluster size. Default 1. Use 1.5-2 for more visible clusters. */
  scale?: number;
  /** Opacity multiplier. Default 1. Use 2-3 for more visible clusters. */
  opacityMultiplier?: number;
  /** Apply subtle floating animation. Default false. */
  animate?: boolean;
  className?: string;
  'data-testid'?: string;
}

export function HoneycombCluster({
  position,
  variant,
  scale = 1,
  opacityMultiplier = 1,
  animate = false,
  className,
  'data-testid': testId,
}: HoneycombClusterProps) {
  const placements = variant === 'filled' ? filledPlacements : outlinePlacements;

  return (
    <div
      className={cn(
        'absolute pointer-events-none w-[200px] h-[200px]',
        positionClasses[position],
        animate && 'animate-hex-float',
        className
      )}
      style={{ transform: `scale(${scale})` }}
      aria-hidden="true"
      data-testid={testId}
    >
      {placements.map((placement, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            left: `${placement.x}px`,
            top: `${placement.y}px`,
            opacity: Math.min(placement.opacity * opacityMultiplier, 1),
          }}
        >
          <HexagonIcon
            size={placement.size}
            variant={variant}
            color="gold"
          />
        </div>
      ))}
    </div>
  );
}
