import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type AudienceType = 'provider' | 'hca';

const typeConfig = {
  provider: {
    borderClass: 'border-l-provider',
    eyebrow: 'For Care Providers',
    hexColor: '#4A6FA5',
  },
  hca: {
    borderClass: 'border-l-hca',
    eyebrow: 'For Healthcare Assistants',
    hexColor: '#E5C55C',
  },
} as const;

interface AudienceCardProps {
  type: AudienceType;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
  ctaText: string;
  className?: string;
  'data-testid'?: string;
}

export function AudienceCard({
  type,
  title,
  description,
  imageSrc,
  imageAlt,
  href,
  ctaText,
  className,
  'data-testid': testId,
}: AudienceCardProps) {
  const config = typeConfig[type];

  return (
    <Link
      href={href}
      className={cn(
        'group relative block no-underline overflow-hidden transition-all border-l-4 bg-midnight',
        config.borderClass,
        className
      )}
      style={{
        boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
      }}
      data-testid={testId}
    >
      {/* Decorative hexagon corner */}
      <svg
        viewBox="0 0 100 115"
        className="absolute top-4 right-4 w-6 h-7 opacity-40 transition-opacity duration-300 group-hover:opacity-70 z-20"
        aria-hidden="true"
        data-testid="hex-corner"
      >
        <polygon
          points="50,0 100,28.75 100,86.25 50,115 0,86.25 0,28.75"
          fill={config.hexColor}
        />
      </svg>

      {/* Image section */}
      <div className="relative h-[280px] overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover object-center transition-transform duration-400 hover:scale-105"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(26,29,46,1) 0%, transparent 60%)',
          }}
        />
      </div>

      {/* Content section */}
      <div className="p-8">
        {/* Eyebrow */}
        <span className="text-xs tracking-[0.15em] uppercase mb-3 block text-soft-gold opacity-70">
          {config.eyebrow}
        </span>

        {/* Gold accent line */}
        <div className="w-10 h-[3px] bg-rich-gold mb-6" />

        <h3 className="font-display text-2xl mb-4 text-soft-gold">
          {title}
        </h3>

        <p className="mb-6 leading-relaxed text-mist opacity-70">
          {description}
        </p>

        <span className="text-sm font-medium inline-flex items-center gap-2 text-rich-gold">
          {ctaText}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
