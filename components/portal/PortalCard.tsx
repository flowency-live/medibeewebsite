/**
 * PortalCard
 *
 * Base card component for the portal design system.
 * Per design language: "Layered Card Hierarchy" with rounded corners,
 * soft shadow depth levels, generous internal padding.
 */

import { type ReactNode } from 'react';

interface PortalCardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  elevation?: 'flat' | 'low' | 'medium' | 'high';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
}

const elevationClasses = {
  flat: 'bg-surface-1 border border-portal-stone',
  low: 'bg-surface-0 border border-portal-stone shadow-card',
  medium: 'bg-surface-0 shadow-card-hover',
  high: 'bg-surface-0 shadow-card-elevated',
};

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-5',
  lg: 'p-6',
};

export function PortalCard({
  children,
  title,
  subtitle,
  action,
  elevation = 'low',
  padding = 'md',
  className = '',
}: PortalCardProps): ReactNode {
  return (
    <div
      className={`
        rounded-card ${elevationClasses[elevation]} ${paddingClasses[padding]}
        ${className}
      `}
    >
      {(title || action) && (
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            {title && (
              <h3 className="font-portal text-portal-heading text-portal-graphite">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="font-portal text-portal-meta text-portal-graphite-muted mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

/**
 * Section divider for cards
 */
export function CardDivider(): ReactNode {
  return <hr className="border-portal-stone my-4" />;
}

/**
 * Card list item
 */
interface CardListItemProps {
  icon?: ReactNode;
  label: string;
  value?: ReactNode;
  completed?: boolean;
  onClick?: () => void;
}

export function CardListItem({
  icon,
  label,
  value,
  completed,
  onClick,
}: CardListItemProps): ReactNode {
  const Wrapper = onClick ? 'button' : 'div';

  return (
    <Wrapper
      onClick={onClick}
      className={`
        flex items-center gap-3 py-2 w-full text-left
        ${onClick ? 'hover:bg-portal-stone/50 -mx-2 px-2 rounded-lg transition-colors' : ''}
      `}
    >
      {icon && (
        <span className="text-portal-graphite-muted flex-shrink-0">{icon}</span>
      )}
      {completed !== undefined && (
        <span
          className={`
            w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0
            ${completed
              ? 'bg-portal-verified/10 text-portal-verified'
              : 'bg-portal-stone text-portal-graphite-muted'
            }
          `}
        >
          {completed ? '✓' : '○'}
        </span>
      )}
      <span
        className={`
          font-portal text-portal-body flex-1
          ${completed === false ? 'text-portal-graphite-muted' : 'text-portal-graphite'}
        `}
      >
        {label}
      </span>
      {value && (
        <span className="font-portal text-portal-meta text-portal-graphite-muted flex-shrink-0">
          {value}
        </span>
      )}
      {onClick && (
        <span className="text-portal-graphite-muted flex-shrink-0">→</span>
      )}
    </Wrapper>
  );
}

/**
 * Stat display for dashboard metrics
 */
interface StatCardProps {
  label: string;
  value: string | number;
  change?: {
    value: number;
    label: string;
  };
  icon?: ReactNode;
}

export function StatCard({ label, value, change, icon }: StatCardProps): ReactNode {
  return (
    <div className="bg-surface-0 rounded-card border border-portal-stone p-4 shadow-card">
      <div className="flex items-start justify-between mb-2">
        <span className="font-portal text-portal-meta text-portal-graphite-muted">
          {label}
        </span>
        {icon && (
          <span className="text-portal-teal">{icon}</span>
        )}
      </div>
      <div className="font-portal text-2xl font-semibold text-portal-graphite">
        {value}
      </div>
      {change && (
        <div
          className={`
            mt-1 font-portal text-portal-meta
            ${change.value >= 0 ? 'text-portal-verified' : 'text-portal-alert'}
          `}
        >
          {change.value >= 0 ? '↑' : '↓'} {Math.abs(change.value)}% {change.label}
        </div>
      )}
    </div>
  );
}
