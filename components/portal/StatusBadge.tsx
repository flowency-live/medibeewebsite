/**
 * StatusBadge
 *
 * Visual status indicator for dark theme.
 * Uses status colors: verified (green), pending (amber), expired (red), active (blue)
 */

import { type ReactNode } from 'react';

export type StatusType =
  | 'verified'
  | 'pending'
  | 'under-review'
  | 'expiring'
  | 'expired'
  | 'active'
  | 'available'
  | 'not-available'
  | 'new'
  | 'premium';

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
  size?: 'sm' | 'md';
  showDot?: boolean;
}

const statusConfig: Record<StatusType, {
  bg: string;
  text: string;
  dot: string;
  defaultLabel: string;
}> = {
  verified: {
    bg: 'bg-status-verified/10',
    text: 'text-status-verified',
    dot: 'bg-status-verified',
    defaultLabel: 'Verified',
  },
  pending: {
    bg: 'bg-status-pending/10',
    text: 'text-status-pending',
    dot: 'bg-status-pending',
    defaultLabel: 'Pending',
  },
  'under-review': {
    bg: 'bg-status-active/10',
    text: 'text-status-active',
    dot: 'bg-status-active',
    defaultLabel: 'Under Review',
  },
  expiring: {
    bg: 'bg-status-pending/10',
    text: 'text-status-pending',
    dot: 'bg-status-pending',
    defaultLabel: 'Expiring Soon',
  },
  expired: {
    bg: 'bg-status-expired/10',
    text: 'text-status-expired',
    dot: 'bg-status-expired',
    defaultLabel: 'Expired',
  },
  active: {
    bg: 'bg-status-active/10',
    text: 'text-status-active',
    dot: 'bg-status-active',
    defaultLabel: 'Active',
  },
  available: {
    bg: 'bg-status-verified/10',
    text: 'text-status-verified',
    dot: 'bg-status-verified',
    defaultLabel: 'Available',
  },
  'not-available': {
    bg: 'bg-ash/10',
    text: 'text-ash',
    dot: 'bg-ash',
    defaultLabel: 'Not Available',
  },
  new: {
    bg: 'bg-gold/10',
    text: 'text-gold',
    dot: 'bg-gold',
    defaultLabel: 'New',
  },
  premium: {
    bg: 'bg-gold/15',
    text: 'text-gold',
    dot: 'bg-gold',
    defaultLabel: 'Premium',
  },
};

export function StatusBadge({
  status,
  label,
  size = 'md',
  showDot = true,
}: StatusBadgeProps): ReactNode {
  const config = statusConfig[status];
  const displayLabel = label ?? config.defaultLabel;

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[11px]',
    md: 'px-2.5 py-1 text-ui-xs',
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-full font-body font-medium
        ${config.bg} ${config.text} ${sizeClasses[size]}
      `}
    >
      {showDot && (
        <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      )}
      {displayLabel}
    </span>
  );
}
