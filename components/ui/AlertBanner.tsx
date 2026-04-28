/**
 * AlertBanner Component
 *
 * Dark theme-compatible alert banners using status colors with /10 opacity backgrounds.
 * Replaces light theme alerts (bg-amber-50, bg-red-50, etc.) that fail on dark backgrounds.
 *
 * @example
 * <AlertBanner type="warning" title="No Active Subscription">
 *   Subscribe to a plan to start browsing candidates.
 * </AlertBanner>
 */

import * as React from 'react';
import { cn } from '@/lib/utils';

type AlertType = 'warning' | 'error' | 'success' | 'info';

interface AlertBannerProps {
  type: AlertType;
  title?: string;
  children: React.ReactNode;
  className?: string;
  'data-testid'?: string;
}

const alertStyles: Record<AlertType, string> = {
  warning: 'bg-status-pending/10 border-status-pending text-status-pending',
  error: 'bg-status-expired/10 border-status-expired text-status-expired',
  success: 'bg-status-verified/10 border-status-verified text-status-verified',
  info: 'bg-status-active/10 border-status-active text-status-active',
};

const titleStyles: Record<AlertType, string> = {
  warning: 'text-status-pending',
  error: 'text-status-expired',
  success: 'text-status-verified',
  info: 'text-status-active',
};

export function AlertBanner({
  type,
  title,
  children,
  className,
  'data-testid': testId,
}: AlertBannerProps) {
  return (
    <div
      role="alert"
      data-testid={testId}
      className={cn(
        'p-6 rounded-card border-l-[3px]',
        alertStyles[type],
        className
      )}
    >
      {title && (
        <h2
          className={cn(
            'font-display text-lg mb-2',
            titleStyles[type]
          )}
        >
          {title}
        </h2>
      )}
      <div className="font-body text-body-md text-pearl-soft">{children}</div>
    </div>
  );
}
