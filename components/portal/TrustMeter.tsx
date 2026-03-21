/**
 * TrustMeter Component
 *
 * Visual indicator of profile verification and trust level.
 * Per plan: "Trust meter, verification progress bar"
 */

'use client';

import type { CandidateProfile } from '@/lib/auth/types';
import type { Credential } from '@/components/portal/CredentialCard';

export interface TrustMeterProps {
  profile: CandidateProfile;
  credentials: Credential[];
  compact?: boolean;
}

interface TrustItem {
  id: string;
  label: string;
  completed: boolean;
  weight: number;
}

function calculateTrustScore(profile: CandidateProfile, credentials: Credential[]): number {
  const verifiedCreds = credentials.filter((c) => c.status === 'verified').length;
  const items: TrustItem[] = [
    { id: 'rtw', label: 'Right to Work', completed: profile.rightToWork === true, weight: 20 },
    { id: 'dbs', label: 'DBS', completed: profile.dbsStatus === 'cleared', weight: 25 },
    { id: 'cv', label: 'CV', completed: profile.cvUploaded === true, weight: 15 },
    { id: 'summary', label: 'Summary', completed: (profile.professionalSummary?.length ?? 0) >= 50, weight: 10 },
    { id: 'cred1', label: 'Credential', completed: verifiedCreds >= 1, weight: 10 },
    { id: 'cred2', label: 'Credentials', completed: verifiedCreds >= 2, weight: 10 },
    { id: 'cred3', label: 'Credentials', completed: verifiedCreds >= 3, weight: 10 },
  ];

  return items.reduce((score, item) => score + (item.completed ? item.weight : 0), 0);
}

function getTrustLevel(score: number): string {
  if (score >= 80) return 'Verified Professional';
  if (score >= 50) return 'Building Trust';
  return 'Getting Started';
}

export function TrustMeter({ profile, credentials, compact = false }: TrustMeterProps) {
  const score = calculateTrustScore(profile, credentials);
  const level = getTrustLevel(score);
  const verifiedCreds = credentials.filter((c) => c.status === 'verified').length;

  const rtwCompleted = profile.rightToWork === true;
  const dbsCompleted = profile.dbsStatus === 'cleared';
  const cvCompleted = profile.cvUploaded === true;

  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 bg-portal-stone rounded-full overflow-hidden">
          <div
            role="progressbar"
            aria-valuenow={score}
            aria-valuemin={0}
            aria-valuemax={100}
            className="h-full bg-gradient-to-r from-portal-teal to-portal-verified transition-all duration-500"
            style={{ width: `${score}%` }}
          />
        </div>
        <span className="font-portal text-portal-meta text-portal-graphite-muted">{score}%</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Progress bar and percentage */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-3 bg-portal-stone rounded-full overflow-hidden">
          <div
            role="progressbar"
            aria-valuenow={score}
            aria-valuemin={0}
            aria-valuemax={100}
            className="h-full bg-gradient-to-r from-portal-teal to-portal-verified transition-all duration-500"
            style={{ width: `${score}%` }}
          />
        </div>
        <span className="font-portal text-portal-body font-semibold text-portal-graphite min-w-[3rem] text-right">
          {score}%
        </span>
      </div>

      {/* Trust level label */}
      <div className="text-center">
        <span className={`
          font-portal text-portal-meta font-medium px-3 py-1 rounded-full
          ${score >= 80 ? 'bg-portal-verified/10 text-portal-verified' :
            score >= 50 ? 'bg-portal-teal/10 text-portal-teal' :
            'bg-portal-stone text-portal-graphite-muted'}
        `}>
          {level}
        </span>
      </div>

      {/* Checklist items */}
      <div className="space-y-2">
        <div
          data-testid="trust-item-rtw"
          data-completed={rtwCompleted ? 'true' : 'false'}
          className="flex items-center gap-3"
        >
          <div className={`
            w-5 h-5 rounded-full flex items-center justify-center
            ${rtwCompleted ? 'bg-portal-verified text-white' : 'bg-portal-stone'}
          `}>
            {rtwCompleted && <span className="text-xs">✓</span>}
          </div>
          <span className={`font-portal text-portal-meta ${rtwCompleted ? 'text-portal-graphite' : 'text-portal-graphite-muted'}`}>
            Right to Work
          </span>
        </div>

        <div
          data-testid="trust-item-dbs"
          data-completed={dbsCompleted ? 'true' : 'false'}
          className="flex items-center gap-3"
        >
          <div className={`
            w-5 h-5 rounded-full flex items-center justify-center
            ${dbsCompleted ? 'bg-portal-verified text-white' : 'bg-portal-stone'}
          `}>
            {dbsCompleted && <span className="text-xs">✓</span>}
          </div>
          <span className={`font-portal text-portal-meta ${dbsCompleted ? 'text-portal-graphite' : 'text-portal-graphite-muted'}`}>
            DBS Cleared
          </span>
        </div>

        <div
          data-testid="trust-item-cv"
          data-completed={cvCompleted ? 'true' : 'false'}
          className="flex items-center gap-3"
        >
          <div className={`
            w-5 h-5 rounded-full flex items-center justify-center
            ${cvCompleted ? 'bg-portal-verified text-white' : 'bg-portal-stone'}
          `}>
            {cvCompleted && <span className="text-xs">✓</span>}
          </div>
          <span className={`font-portal text-portal-meta ${cvCompleted ? 'text-portal-graphite' : 'text-portal-graphite-muted'}`}>
            CV Uploaded
          </span>
        </div>

        <div
          data-testid="trust-item-credentials"
          data-completed={verifiedCreds > 0 ? 'true' : 'false'}
          className="flex items-center gap-3"
        >
          <div className={`
            w-5 h-5 rounded-full flex items-center justify-center
            ${verifiedCreds > 0 ? 'bg-portal-verified text-white' : 'bg-portal-stone'}
          `}>
            {verifiedCreds > 0 && <span className="text-xs">✓</span>}
          </div>
          <span className={`font-portal text-portal-meta ${verifiedCreds > 0 ? 'text-portal-graphite' : 'text-portal-graphite-muted'}`}>
            Verified Credentials ({verifiedCreds})
          </span>
        </div>
      </div>
    </div>
  );
}
