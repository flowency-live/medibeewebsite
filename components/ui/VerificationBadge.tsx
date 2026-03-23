import { cn } from '@/lib/utils';

export type VerificationBadgeType =
  | 'verified-profile'
  | 'passport-ready'
  | 'id-verified'
  | 'dbs-verified'
  | 'rtw-verified'
  | 'qualifications-verified';

export type VerificationBadgeSize = 'sm' | 'md' | 'lg';

interface VerificationBadgeProps {
  type: VerificationBadgeType;
  size?: VerificationBadgeSize;
  showLabel?: boolean;
  className?: string;
}

const badgeConfig: Record<
  VerificationBadgeType,
  { label: string; iconColor: string; checkColor: string }
> = {
  'verified-profile': {
    label: 'Verified Profile',
    iconColor: 'text-blue-400',
    checkColor: 'text-blue-400',
  },
  'passport-ready': {
    label: 'Passport Ready',
    iconColor: 'text-emerald-400',
    checkColor: 'text-emerald-400',
  },
  'id-verified': {
    label: 'ID Verified',
    iconColor: 'text-brand-gold',
    checkColor: 'text-emerald-400',
  },
  'dbs-verified': {
    label: 'DBS Verified',
    iconColor: 'text-brand-gold',
    checkColor: 'text-emerald-400',
  },
  'rtw-verified': {
    label: 'Right to Work',
    iconColor: 'text-brand-gold',
    checkColor: 'text-emerald-400',
  },
  'qualifications-verified': {
    label: 'Qualifications',
    iconColor: 'text-brand-gold',
    checkColor: 'text-emerald-400',
  },
};

const sizeClasses = {
  sm: {
    container: 'px-2 py-1 gap-1.5',
    icon: 'w-3.5 h-3.5',
    text: 'text-xs',
  },
  md: {
    container: 'px-3 py-1.5 gap-2',
    icon: 'w-4 h-4',
    text: 'text-sm',
  },
  lg: {
    container: 'px-4 py-2 gap-2.5',
    icon: 'w-5 h-5',
    text: 'text-base',
  },
};

export function VerificationBadge({
  type,
  size = 'md',
  showLabel = true,
  className,
}: VerificationBadgeProps) {
  const config = badgeConfig[type];
  const sizes = sizeClasses[size];

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-lg',
        'bg-brand-dark/60 border border-brand-gold/20',
        sizes.container,
        className
      )}
    >
      <div className="relative flex-shrink-0">
        <BadgeIcon type={type} className={cn(sizes.icon, config.iconColor)} />
        <CheckCircle
          className={cn(
            'absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5',
            config.checkColor
          )}
        />
      </div>
      {showLabel && (
        <span className={cn('font-medium text-brand-pearl-soft', sizes.text)}>
          {config.label}
        </span>
      )}
    </div>
  );
}

function BadgeIcon({
  type,
  className,
}: {
  type: VerificationBadgeType;
  className?: string;
}) {
  switch (type) {
    case 'verified-profile':
      return <UserCheckIcon className={className} />;
    case 'passport-ready':
      return <PassportIcon className={className} />;
    case 'id-verified':
      return <IdCardIcon className={className} />;
    case 'dbs-verified':
      return <ShieldCheckIcon className={className} />;
    case 'rtw-verified':
      return <BriefcaseIcon className={className} />;
    case 'qualifications-verified':
      return <AcademicCapIcon className={className} />;
    default:
      return <CheckCircle className={className} />;
  }
}

function CheckCircle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function UserCheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-6 8v-2c0-2.21 1.79-4 4-4h4c2.21 0 4 1.79 4 4v2H6zm16-8l-3 3-1.5-1.5-1 1L19 17l4-4-1-1z" />
    </svg>
  );
}

function PassportIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M6 2C4.9 2 4 2.9 4 4v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H6zm6 5c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm5 10H7v-.5C7 15.12 9.69 14 12 14s5 1.12 5 2.5v.5z" />
    </svg>
  );
}

function IdCardIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM8 11c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm4 5H4v-.5C4 14.12 5.79 13 8 13s4 1.12 4 2.5V16zm8-1h-5v-2h5v2zm0-4h-5V9h5v2z" />
    </svg>
  );
}

function ShieldCheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
    </svg>
  );
}

function BriefcaseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 0h-4V4h4v2z" />
    </svg>
  );
}

function AcademicCapIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
    </svg>
  );
}
