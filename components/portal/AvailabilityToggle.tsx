/**
 * AvailabilityToggle
 *
 * 3-state toggle for candidate availability.
 * Per design language: "Ambient professional signalling... soft glow halo,
 * status pill with gentle tonal background"
 */

'use client';

import { type ReactNode } from 'react';

export type AvailabilityState = 'actively-looking' | 'open-to-offers' | 'not-looking';

interface AvailabilityToggleProps {
  value: AvailabilityState;
  onChange: (value: AvailabilityState) => void;
  disabled?: boolean;
}

const availabilityConfig: Record<AvailabilityState, {
  label: string;
  description: string;
  dotColor: string;
  bgColor: string;
  borderColor: string;
}> = {
  'actively-looking': {
    label: 'Actively Looking',
    description: 'Show me to all providers',
    dotColor: 'bg-portal-verified',
    bgColor: 'bg-portal-verified/5',
    borderColor: 'border-portal-verified/30',
  },
  'open-to-offers': {
    label: 'Open to Offers',
    description: 'Only show to matched providers',
    dotColor: 'bg-portal-available',
    bgColor: 'bg-portal-available/5',
    borderColor: 'border-portal-available/30',
  },
  'not-looking': {
    label: 'Not Looking',
    description: 'Hide my profile',
    dotColor: 'bg-portal-graphite-muted',
    bgColor: 'bg-portal-stone',
    borderColor: 'border-portal-stone',
  },
};

export function AvailabilityToggle({
  value,
  onChange,
  disabled = false,
}: AvailabilityToggleProps): ReactNode {
  const states: AvailabilityState[] = ['actively-looking', 'open-to-offers', 'not-looking'];

  return (
    <div className="space-y-2">
      <label className="font-portal text-portal-meta font-medium text-portal-graphite">
        Your Availability
      </label>
      <div className="flex flex-col gap-2">
        {states.map((state) => {
          const config = availabilityConfig[state];
          const isSelected = value === state;

          return (
            <button
              key={state}
              type="button"
              onClick={() => !disabled && onChange(state)}
              disabled={disabled}
              className={`
                relative flex items-start gap-3 p-3 rounded-card text-left
                border transition-all duration-portal ease-portal
                ${isSelected
                  ? `${config.bgColor} ${config.borderColor}`
                  : 'bg-surface-0 border-portal-stone hover:border-portal-graphite-muted'
                }
                ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {/* Radio indicator */}
              <div
                className={`
                  relative w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5
                  transition-colors duration-portal
                  ${isSelected ? `border-current ${config.dotColor}` : 'border-portal-graphite-muted'}
                `}
              >
                {isSelected && (
                  <div className="absolute inset-1 rounded-full bg-white" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`
                      w-2 h-2 rounded-full ${config.dotColor}
                      ${isSelected ? 'animate-pulse-soft' : ''}
                    `}
                  />
                  <span
                    className={`
                      font-portal text-portal-body font-medium
                      ${isSelected ? 'text-portal-graphite' : 'text-portal-graphite-light'}
                    `}
                  >
                    {config.label}
                  </span>
                </div>
                <p className="font-portal text-portal-meta text-portal-graphite-muted mt-0.5 pl-4">
                  {config.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Compact inline availability indicator
 */
interface AvailabilityIndicatorProps {
  state: AvailabilityState;
  className?: string;
}

export function AvailabilityIndicator({
  state,
  className = '',
}: AvailabilityIndicatorProps): ReactNode {
  const config = availabilityConfig[state];

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
        ${config.bgColor} border ${config.borderColor}
        font-portal text-portal-meta
        ${className}
      `}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`} />
      <span className="text-portal-graphite">{config.label}</span>
    </span>
  );
}
