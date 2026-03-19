/**
 * StatusBadge
 *
 * Visual status indicator with muted, trust-building colors.
 * Per design language: "calm, readable, data-driven, non-judgemental"
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
  | 'new';

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
    bg: 'bg-portal-verified/10',
    text: 'text-portal-verified',
    dot: 'bg-portal-verified',
    defaultLabel: 'Verified',
  },
  pending: {
    bg: 'bg-portal-pending/10',
    text: 'text-portal-pending',
    dot: 'bg-portal-pending',
    defaultLabel: 'Pending',
  },
  'under-review': {
    bg: 'bg-portal-blue/10',
    text: 'text-portal-blue',
    dot: 'bg-portal-blue',
    defaultLabel: 'Under Review',
  },
  expiring: {
    bg: 'bg-portal-available/10',
    text: 'text-portal-available',
    dot: 'bg-portal-available',
    defaultLabel: 'Expiring Soon',
  },
  expired: {
    bg: 'bg-portal-alert/10',
    text: 'text-portal-alert',
    dot: 'bg-portal-alert',
    defaultLabel: 'Expired',
  },
  active: {
    bg: 'bg-portal-verified/10',
    text: 'text-portal-verified',
    dot: 'bg-portal-verified',
    defaultLabel: 'Active',
  },
  available: {
    bg: 'bg-portal-verified/10',
    text: 'text-portal-verified',
    dot: 'bg-portal-verified',
    defaultLabel: 'Available',
  },
  'not-available': {
    bg: 'bg-portal-graphite-muted/10',
    text: 'text-portal-graphite-muted',
    dot: 'bg-portal-graphite-muted',
    defaultLabel: 'Not Available',
  },
  new: {
    bg: 'bg-portal-highlight/10',
    text: 'text-portal-highlight',
    dot: 'bg-portal-highlight',
    defaultLabel: 'New',
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
    md: 'px-2.5 py-1 text-portal-meta',
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-full font-portal font-medium
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
