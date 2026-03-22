/**
 * ProfileCompletionRing
 *
 * Circular progress indicator for profile completion.
 * Gold-accented ring with smooth progression.
 */

import { type ReactNode } from 'react';

interface ProfileCompletionRingProps {
  percentage: number;
  size?: 'sm' | 'md' | 'lg';
  showPercentage?: boolean;
  strokeWidth?: number;
  className?: string;
}

const sizeConfig = {
  sm: { dimension: 48, fontSize: 'text-xs', strokeDefault: 4 },
  md: { dimension: 72, fontSize: 'text-sm', strokeDefault: 5 },
  lg: { dimension: 120, fontSize: 'text-xl', strokeDefault: 8 },
};

export function ProfileCompletionRing({
  percentage,
  size = 'md',
  showPercentage = true,
  strokeWidth,
  className = '',
}: ProfileCompletionRingProps): ReactNode {
  const config = sizeConfig[size];
  const stroke = strokeWidth ?? config.strokeDefault;
  const dimension = config.dimension;
  const radius = (dimension - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(100, Math.max(0, percentage));
  const offset = circumference - (progress / 100) * circumference;

  // Color based on completion level
  const getProgressColor = () => {
    if (progress >= 100) return 'stroke-status-verified';
    if (progress >= 70) return 'stroke-gold';
    if (progress >= 40) return 'stroke-status-pending';
    return 'stroke-ash';
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={dimension}
        height={dimension}
        viewBox={`0 0 ${dimension} ${dimension}`}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={dimension / 2}
          cy={dimension / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          className="stroke-ash-border"
        />
        {/* Progress circle */}
        <circle
          cx={dimension / 2}
          cy={dimension / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={`${getProgressColor()} transition-all duration-normal`}
        />
      </svg>
      {showPercentage && (
        <span
          className={`
            absolute font-body font-semibold text-pearl
            ${config.fontSize}
          `}
        >
          {Math.round(progress)}%
        </span>
      )}
    </div>
  );
}
