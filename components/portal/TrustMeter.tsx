/**
 * TrustMeter Component
 *
 * Visual indicator of profile verification and trust level.
 * Gold gradient progress bar with dark theme.
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
        <div className="flex-1 h-2 bg-ash-border rounded-full overflow-hidden">
          <div
            role="progressbar"
            aria-valuenow={score}
            aria-valuemin={0}
            aria-valuemax={100}
            className="h-full bg-gradient-to-r from-gold to-status-verified transition-all duration-500"
            style={{ width: `${score}%` }}
          />
        </div>
        <span className="font-body text-body-sm text-ash">{score}%</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Progress bar and percentage */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-3 bg-ash-border rounded-full overflow-hidden">
          <div
            role="progressbar"
            aria-valuenow={score}
            aria-valuemin={0}
            aria-valuemax={100}
            className="h-full bg-gradient-to-r from-gold to-status-verified transition-all duration-500"
            style={{ width: `${score}%` }}
          />
        </div>
        <span className="font-body text-body-md font-semibold text-pearl min-w-[3rem] text-right">
          {score}%
        </span>
      </div>

      {/* Trust level label */}
      <div className="text-center">
        <span className={`
          font-body text-body-sm font-medium px-3 py-1 rounded-full
          ${score >= 80 ? 'bg-status-verified/10 text-status-verified' :
            score >= 50 ? 'bg-gold/10 text-gold' :
            'bg-void-elevated text-ash'}
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
            ${rtwCompleted ? 'bg-status-verified text-void' : 'bg-void-elevated'}
          `}>
            {rtwCompleted && <span className="text-xs">✓</span>}
          </div>
          <span className={`font-body text-body-sm ${rtwCompleted ? 'text-pearl' : 'text-ash'}`}>
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
            ${dbsCompleted ? 'bg-status-verified text-void' : 'bg-void-elevated'}
          `}>
            {dbsCompleted && <span className="text-xs">✓</span>}
          </div>
          <span className={`font-body text-body-sm ${dbsCompleted ? 'text-pearl' : 'text-ash'}`}>
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
            ${cvCompleted ? 'bg-status-verified text-void' : 'bg-void-elevated'}
          `}>
            {cvCompleted && <span className="text-xs">✓</span>}
          </div>
          <span className={`font-body text-body-sm ${cvCompleted ? 'text-pearl' : 'text-ash'}`}>
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
            ${verifiedCreds > 0 ? 'bg-status-verified text-void' : 'bg-void-elevated'}
          `}>
            {verifiedCreds > 0 && <span className="text-xs">✓</span>}
          </div>
          <span className={`font-body text-body-sm ${verifiedCreds > 0 ? 'text-pearl' : 'text-ash'}`}>
            Verified Credentials ({verifiedCreds})
          </span>
        </div>
      </div>
    </div>
  );
}
