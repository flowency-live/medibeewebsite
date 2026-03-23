'use client';

/**
 * Candidate Passport Page
 *
 * The Medibee Passport - a verified compliance summary that can be shared with employers.
 * Shows verification status, QR code for instant verification, and document status.
 */

import { useAuth, isCandidate } from '@/lib/auth';
import { TierBadge, VerificationBadge } from '@/components/ui';
import { HoneycombPattern } from '@/components/decorative';

type VerificationStatus = 'verified' | 'pending' | 'expired';

interface Verification {
  id: string;
  type: 'dbs-verified' | 'rtw-verified' | 'id-verified' | 'qualifications-verified';
  label: string;
  details: string;
  expiryDate?: string;
  documentRef?: string;
  status: VerificationStatus;
}

// Mock verification data - would come from API
const mockVerifications: Verification[] = [
  {
    id: 'dbs',
    type: 'dbs-verified',
    label: 'DBS Certificate',
    details: 'Enhanced DBS',
    expiryDate: '2027-01-15',
    status: 'verified',
  },
  {
    id: 'rtw',
    type: 'rtw-verified',
    label: 'Right to Work Verification',
    details: 'UK Passport',
    expiryDate: '2030-06-20',
    status: 'verified',
  },
  {
    id: 'id',
    type: 'id-verified',
    label: 'Identification',
    details: 'UK Passport',
    documentRef: '********XXX',
    status: 'verified',
  },
  {
    id: 'quals',
    type: 'qualifications-verified',
    label: 'Qualifications',
    details: 'NVQ Level 3 Health & Social Care',
    status: 'verified',
  },
];

export default function CandidatePassportPage() {
  const { state } = useAuth();

  if (!isCandidate(state)) {
    return null;
  }

  const { profile } = state;

  // Calculate verification stats
  const verifiedCount = mockVerifications.filter((v) => v.status === 'verified').length;
  const pendingCount = mockVerifications.filter((v) => v.status === 'pending').length;
  const expiredCount = mockVerifications.filter((v) => v.status === 'expired').length;

  // Generate a mock passport ID
  const passportId = `MB-${profile.firstName?.[0] || 'X'}${profile.lastName?.[0] || 'X'}-${Date.now().toString(36).toUpperCase().slice(-6)}`;

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-brand-gold/20 flex items-center justify-center">
          <LockIcon className="w-6 h-6 text-brand-gold" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-brand-pearl">Medibee Passport</h1>
          <p className="text-brand-pearl-muted">Your verified healthcare compliance at a glance.</p>
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex flex-wrap items-center gap-6 p-4 bg-brand-slate/50 rounded-xl border border-brand-gold/10">
        <StatusPill count={verifiedCount} label="VERIFIED" color="emerald" />
        <StatusPill count={pendingCount} label="PENDING" color="amber" />
        <StatusPill count={expiredCount} label="EXPIRED" color="red" />

        {/* Expiring Soon Warning */}
        <div className="flex items-center gap-2 ml-auto text-amber-400">
          <CalendarIcon className="w-4 h-4" />
          <span className="text-sm">Next expiry: 15 Jan 2027</span>
        </div>
      </div>

      {/* Main Passport Card */}
      <div className="relative rounded-2xl overflow-hidden">
        {/* Gold border glow effect */}
        <div className="absolute inset-0 rounded-2xl border-2 border-brand-gold/40 pointer-events-none z-10" />
        <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_30px_rgba(212,175,55,0.1)] pointer-events-none z-10" />

        {/* Card background with honeycomb texture */}
        <div className="relative bg-gradient-to-br from-brand-slate to-brand-dark p-8">
          <HoneycombPattern variant="gold" opacity={0.04} />

          <div className="relative z-10 grid lg:grid-cols-3 gap-8 items-center">
            {/* Profile Section */}
            <div className="flex flex-col items-center lg:items-start gap-4">
              {/* Avatar with verification badge */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-gold/40 to-brand-gold/10 flex items-center justify-center border-2 border-brand-gold/30">
                  <span className="text-3xl font-bold text-brand-gold">
                    {profile.firstName?.[0]}{profile.lastName?.[0]}
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center border-2 border-brand-slate">
                  <CheckIcon className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Name and details */}
              <div className="text-center lg:text-left">
                <h2 className="text-xl font-semibold text-brand-pearl">
                  {profile.firstName} {profile.lastName}
                </h2>
                <p className="text-brand-gold">Healthcare Assistant</p>
                <p className="text-sm text-brand-pearl-muted mt-2">ID: {passportId}</p>
                <p className="text-xs text-brand-gold/60 mt-1">MEDIBEE.CO.UK/V/{passportId}</p>
              </div>
            </div>

            {/* QR Code Section */}
            <div className="flex flex-col items-center">
              <p className="text-sm font-medium text-brand-gold mb-3 tracking-wider">SCAN TO VERIFY</p>
              <div className="relative p-4 bg-white rounded-xl">
                {/* QR Code placeholder - would be generated dynamically */}
                <div className="w-32 h-32 relative">
                  <QRCodePlaceholder />
                  {/* Bee logo in center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <BeeIcon className="w-5 h-5 text-brand-gold" />
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-brand-pearl-muted mt-3">Valid verification QR code</p>
            </div>

            {/* Passport Shield Badge */}
            <div className="flex flex-col items-center lg:items-end gap-4">
              <div className="relative">
                <PassportShield />
              </div>
              <TierBadge tier="hive" size="md" />
            </div>
          </div>
        </div>
      </div>

      {/* Verification Documents */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-brand-pearl">Verification Status</h3>

        <div className="space-y-3">
          {mockVerifications.map((verification) => (
            <VerificationRow
              key={verification.id}
              type={verification.type}
              label={verification.label}
              details={verification.details}
              expiryDate={verification.expiryDate}
              documentRef={verification.documentRef}
              status={verification.status}
            />
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4">
        <button className="px-6 py-3 bg-brand-gold text-brand-dark font-semibold rounded-lg hover:bg-brand-gold-light transition-colors">
          Download PDF
        </button>
        <button className="px-6 py-3 bg-brand-slate border border-brand-gold/30 text-brand-gold font-semibold rounded-lg hover:bg-brand-gold/10 transition-colors">
          Share Passport
        </button>
      </div>
    </div>
  );
}

// Helper Components

function StatusPill({ count, label, color }: { count: number; label: string; color: 'emerald' | 'amber' | 'red' }) {
  const colorClasses = {
    emerald: 'text-emerald-400',
    amber: 'text-amber-400',
    red: 'text-red-400',
  };

  return (
    <div className="flex items-center gap-2">
      <span className={`text-2xl font-bold ${colorClasses[color]}`}>{count}</span>
      <span className="text-sm text-brand-pearl-muted">{label}</span>
    </div>
  );
}

function VerificationRow({
  type,
  label,
  details,
  expiryDate,
  documentRef,
  status,
}: {
  type: 'dbs-verified' | 'rtw-verified' | 'id-verified' | 'qualifications-verified';
  label: string;
  details?: string;
  expiryDate?: string;
  documentRef?: string;
  status: 'verified' | 'pending' | 'expired';
}) {
  return (
    <div className="flex items-center gap-4 p-4 bg-brand-slate/50 rounded-xl border border-brand-gold/10 hover:border-brand-gold/20 transition-colors">
      <VerificationBadge type={type} size="md" showLabel={false} />

      <div className="flex-1 min-w-0">
        <p className="font-medium text-brand-pearl">{label}</p>
        <p className="text-sm text-brand-pearl-muted">
          {details}
          {documentRef && <span className="ml-2 text-brand-gold/60">{documentRef}</span>}
        </p>
      </div>

      {expiryDate && (
        <div className="text-right">
          <p className="text-xs text-brand-pearl-muted">Expires</p>
          <p className="text-sm text-brand-pearl">{formatDate(expiryDate)}</p>
        </div>
      )}

      <div className="flex items-center gap-2">
        <span className="px-3 py-1 text-xs font-medium rounded-full bg-brand-gold/20 text-brand-gold">
          Verified
        </span>
        <CheckCircleIcon className="w-5 h-5 text-emerald-400" />
      </div>
    </div>
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

// Icons

function LockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  );
}

function BeeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C13.1 2 14 2.9 14 4C14 4.74 13.6 5.39 13 5.73V7H14C15.1 7 16 7.9 16 9V10C17.1 10 18 10.9 18 12V13C19.1 13 20 13.9 20 15C20 16.1 19.1 17 18 17H17V18C17 19.66 15.66 21 14 21H10C8.34 21 7 19.66 7 18V17H6C4.9 17 4 16.1 4 15C4 13.9 4.9 13 6 13V12C6 10.9 6.9 10 8 10V9C8 7.9 8.9 7 10 7H11V5.73C10.4 5.39 10 4.74 10 4C10 2.9 10.9 2 12 2ZM9 12V15H15V12H9ZM10 16V18C10 18.55 10.45 19 11 19H13C13.55 19 14 18.55 14 18V16H10Z" />
    </svg>
  );
}

function QRCodePlaceholder() {
  // Generate a simple QR-like pattern
  const pattern = [
    [1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,0,1,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,0,1,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0],
    [1,0,1,0,1,1,1,1,0,0,1,1,0,1,0,1,1],
    [0,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0,0],
    [1,1,1,1,1,1,1,0,1,1,0,1,0,1,1,0,1],
    [1,0,0,0,0,0,1,0,0,1,1,0,1,0,0,1,0],
    [1,0,1,1,1,0,1,0,1,0,1,1,1,1,0,1,1],
    [1,0,1,1,1,0,1,0,0,1,0,0,1,0,1,0,0],
    [1,0,1,1,1,0,1,0,1,1,1,1,0,1,1,0,1],
    [1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,0],
    [1,1,1,1,1,1,1,0,1,1,0,1,1,1,0,1,1],
  ];

  return (
    <svg viewBox="0 0 170 170" className="w-full h-full">
      {pattern.map((row, y) =>
        row.map((cell, x) =>
          cell === 1 ? (
            <rect
              key={`${x}-${y}`}
              x={x * 10}
              y={y * 10}
              width={10}
              height={10}
              fill="#D4AF37"
            />
          ) : null
        )
      )}
    </svg>
  );
}

function PassportShield() {
  return (
    <div className="relative w-28 h-36">
      {/* Shield shape */}
      <svg viewBox="0 0 100 120" className="w-full h-full" fill="none">
        <defs>
          <linearGradient id="shield-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <path
          d="M50 5 L95 20 L95 60 C95 85 75 105 50 115 C25 105 5 85 5 60 L5 20 L50 5Z"
          fill="url(#shield-gradient)"
          stroke="#D4AF37"
          strokeWidth="2"
        />
        {/* Inner shield */}
        <path
          d="M50 15 L85 27 L85 58 C85 78 68 95 50 103 C32 95 15 78 15 58 L15 27 L50 15Z"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="1"
          strokeOpacity="0.5"
        />
      </svg>

      {/* Bee icon in center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <BeeIcon className="w-10 h-10 text-brand-gold" />
      </div>

      {/* MEDIBEE PASSPORT text */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <p className="text-[10px] font-bold tracking-widest text-brand-gold">MEDIBEE</p>
        <p className="text-[8px] tracking-wider text-brand-gold/70 text-center">PASSPORT</p>
      </div>
    </div>
  );
}
