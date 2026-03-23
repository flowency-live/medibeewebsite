import { cn } from '@/lib/utils';
import { TierBadge, TierType } from './TierBadge';

interface TierCardProps {
  tier: TierType;
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
