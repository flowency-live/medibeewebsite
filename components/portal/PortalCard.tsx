/**
 * PortalCard
 *
 * Base card component for the portal design system.
 * Dark theme with gold accents and layered card hierarchy.
 */

import { type ReactNode } from 'react';

interface PortalCardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  elevation?: 'flat' | 'low' | 'medium' | 'high';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  accent?: boolean;
  className?: string;
}

const elevationClasses = {
  flat: 'bg-void-light border border-ash-border',
  low: 'bg-void-medium border border-ash-border shadow-card',
  medium: 'bg-void-medium shadow-card-hover',
  high: 'bg-void-medium shadow-card-elevated border border-gold/10',
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
  accent = false,
  className = '',
}: PortalCardProps): ReactNode {
  return (
    <div
      className={`
        rounded-card ${elevationClasses[elevation]} ${paddingClasses[padding]}
        ${accent ? 'border-l-2 border-l-gold' : ''}
        ${className}
      `}
    >
      {(title || action) && (
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            {title && (
              <h3 className="font-body text-body-md font-semibold text-pearl">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="font-body text-body-sm text-ash-light mt-0.5">
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
  return <hr className="border-ash-border my-4" />;
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
        ${onClick ? 'hover:bg-void-elevated -mx-2 px-2 rounded-lg transition-colors' : ''}
      `}
    >
      {icon && (
        <span className="text-ash flex-shrink-0">{icon}</span>
      )}
      {completed !== undefined && (
        <span
          className={`
            w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0
            ${completed
              ? 'bg-status-verified/10 text-status-verified'
              : 'bg-void-elevated text-ash'
            }
          `}
        >
          {completed ? '✓' : '○'}
        </span>
      )}
      <span
        className={`
          font-body text-body-md flex-1
          ${completed === false ? 'text-ash' : 'text-pearl-soft'}
        `}
      >
        {label}
      </span>
      {value && (
        <span className="font-body text-body-sm text-ash-light flex-shrink-0">
          {value}
        </span>
      )}
      {onClick && (
        <span className="text-gold flex-shrink-0">→</span>
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
    <div className="bg-void-medium rounded-card border border-ash-border p-4 shadow-card">
      <div className="flex items-start justify-between mb-2">
        <span className="font-body text-body-sm text-ash">
          {label}
        </span>
        {icon && (
          <span className="text-gold">{icon}</span>
        )}
      </div>
      <div className="font-body text-2xl font-semibold text-pearl">
        {value}
      </div>
      {change && (
        <div
          className={`
            mt-1 font-body text-body-sm
            ${change.value >= 0 ? 'text-status-verified' : 'text-status-expired'}
          `}
        >
          {change.value >= 0 ? '↑' : '↓'} {Math.abs(change.value)}% {change.label}
        </div>
      )}
    </div>
  );
}
