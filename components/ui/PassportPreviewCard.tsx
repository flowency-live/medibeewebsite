'use client';

import { GlassCard } from './GlassCard';

interface PassportVerificationItem {
  label: string;
  verified?: boolean;
}

interface PassportPreviewCardProps {
  /** Title displayed at top of passport. Default: "Your Medibee Passport" */
  title?: string;
  /** List of verification items to display */
  items?: PassportVerificationItem[];
  /** GlassCard animation delay in ms. Default: 400 */
  delay?: number;
  /** Additional CSS classes for positioning */
  className?: string;
  'data-testid'?: string;
}

const defaultItems: PassportVerificationItem[] = [
  { label: 'Verified DBS Check', verified: true },
  { label: 'ID Verified', verified: true },
  { label: 'Right to Work Approved', verified: true },
  { label: 'Training Completed', verified: true },
  { label: 'Documents Up to Date', verified: true },
];

// Internal: Hexagon check icon
function HexCheck({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2L21.5 7.5V16.5L12 22L2.5 16.5V7.5L12 2Z"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8 12L11 15L16 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Internal: Passport verification item
function PassportItem({
  label,
  verified = true,
}: {
  label: string;
  verified?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 py-2">
      <HexCheck
        className={`w-5 h-5 ${verified ? 'text-emerald-400' : 'text-amber-400'}`}
      />
      <span className="text-sm text-pearl-soft/80">{label}</span>
    </div>
  );
}

export function PassportPreviewCard({
  title = 'Your Medibee Passport',
  items = defaultItems,
  delay = 400,
  className = '',
  'data-testid': testId,
}: PassportPreviewCardProps) {
  return (
    <GlassCard
      data-testid={testId}
      className={`hover:scale-[1.02] hover:shadow-gold-glow-sm ${className}`}
      delay={delay}
    >
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-5 h-5 rounded bg-emerald-500/20 flex items-center justify-center">
            <svg
              className="w-3 h-3 text-emerald-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="text-xs font-medium text-emerald-400">{title}</span>
        </div>

        {/* QR Code placeholder */}
        <div
          data-testid="qr-placeholder"
          className="w-20 h-20 mx-auto mb-4 rounded-lg bg-white/[0.9] p-2 flex items-center justify-center"
        >
          <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCI+PHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjZmZmIi8+PHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9IiMwMDAiLz48cmVjdCB4PSI1MCIgeT0iMTAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iIzAwMCIvPjxyZWN0IHg9IjEwIiB5PSI1MCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjMDAwIi8+PHJlY3QgeD0iMzAiIHk9IjMwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9IiMwMDAiLz48L3N2Zz4=')] bg-contain bg-center bg-no-repeat" />
        </div>

        {/* Verification items */}
        <div className="space-y-0">
          {items.map((item) => (
            <PassportItem
              key={item.label}
              label={item.label}
              verified={item.verified}
            />
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
