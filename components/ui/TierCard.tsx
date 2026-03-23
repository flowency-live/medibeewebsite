import { cn } from '@/lib/utils';
import { TierBadge, TierType } from './TierBadge';

interface TierCardProps {
  tier: TierType;
  title?: string;
  price: string;
  priceSubtext?: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
  ctaVariant?: 'filled' | 'outline';
  footer?: string;
  className?: string;
}

export function TierCard({
  tier,
  title,
  price,
  priceSubtext,
  features,
  ctaText,
  ctaHref,
  ctaVariant = 'filled',
  footer,
  className,
}: TierCardProps) {
  return (
    <div
      className={cn(
        'relative flex flex-col rounded-2xl p-6 lg:p-8',
        'bg-brand-slate/80 backdrop-blur-sm',
        'border border-brand-gold/20',
        'transition-all duration-300 hover:border-brand-gold/40 hover:shadow-lg hover:shadow-brand-gold/5',
        className
      )}
    >
      {/* Card Header with Bee Icon */}
      {title && (
        <div className="flex items-center gap-2 mb-4">
          <BeeIcon className="w-6 h-6 text-brand-gold" />
          <h3 className="text-xl font-semibold text-brand-pearl">{title}</h3>
        </div>
      )}

      {/* Tier Badge */}
      <div className="mb-6">
        <TierBadge tier={tier} size="md" />
      </div>

      {/* Price */}
      <div className="mb-6">
        <div className="text-3xl lg:text-4xl font-bold text-brand-pearl">
          {price}
        </div>
        {priceSubtext && (
          <div className="text-sm text-brand-pearl-muted mt-1">
            {priceSubtext}
          </div>
        )}
      </div>

      {/* Features */}
      <ul className="flex-1 space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <CheckIcon className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
            <span className="text-brand-pearl-soft">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <a
        href={ctaHref}
        className={cn(
          'block w-full py-3 px-6 rounded-lg text-center font-semibold transition-all duration-200',
          ctaVariant === 'filled'
            ? 'bg-brand-gold text-brand-dark hover:bg-brand-gold-light'
            : 'bg-transparent border-2 border-brand-gold text-brand-gold hover:bg-brand-gold/10'
        )}
      >
        {ctaText}
      </a>

      {/* Footer */}
      {footer && (
        <p className="mt-4 text-center text-sm text-brand-pearl-muted">
          {footer}
        </p>
      )}
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function BeeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2C13.1 2 14 2.9 14 4C14 4.74 13.6 5.39 13 5.73V7H14C15.1 7 16 7.9 16 9V10C17.1 10 18 10.9 18 12V13C19.1 13 20 13.9 20 15C20 16.1 19.1 17 18 17H17V18C17 19.66 15.66 21 14 21H10C8.34 21 7 19.66 7 18V17H6C4.9 17 4 16.1 4 15C4 13.9 4.9 13 6 13V12C6 10.9 6.9 10 8 10V9C8 7.9 8.9 7 10 7H11V5.73C10.4 5.39 10 4.74 10 4C10 2.9 10.9 2 12 2ZM9 12V15H15V12H9ZM10 16V18C10 18.55 10.45 19 11 19H13C13.55 19 14 18.55 14 18V16H10Z" />
    </svg>
  );
}
