/**
 * CredentialCard
 *
 * Card for displaying credential status in the credential wallet.
 * Dark theme with gold accents for verified states.
 */

'use client';

import { type ReactNode, useState } from 'react';
import { StatusBadge, type StatusType } from './StatusBadge';

export interface Credential {
  id: string;
  type: 'dbs' | 'rtw' | 'nvq' | 'training' | 'reference' | 'other';
  name: string;
  status: 'pending' | 'under-review' | 'verified' | 'expiring' | 'expired';
  expiryDate?: string;
  verifiedDate?: string;
  documentKey?: string;
}

interface CredentialCardProps {
  credential: Credential;
  onView?: (credential: Credential) => void;
  onReplace?: (credential: Credential) => void;
  onUpload?: () => void;
}

const credentialTypeConfig: Record<Credential['type'], {
  icon: string;
  label: string;
  description: string;
}> = {
  dbs: {
    icon: '🛡',
    label: 'DBS Certificate',
    description: 'Disclosure and Barring Service check',
  },
  rtw: {
    icon: '📋',
    label: 'Right to Work',
    description: 'UK work authorization',
  },
  nvq: {
    icon: '🎓',
    label: 'NVQ Certificate',
    description: 'Vocational qualification',
  },
  training: {
    icon: '📚',
    label: 'Training Certificate',
    description: 'Professional training completion',
  },
  reference: {
    icon: '✉️',
    label: 'Reference',
    description: 'Professional reference letter',
  },
  other: {
    icon: '📄',
    label: 'Document',
    description: 'Supporting document',
  },
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function getDaysUntilExpiry(dateString: string): number {
  const expiry = new Date(dateString);
  const now = new Date();
  const diffTime = expiry.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function CredentialCard({
  credential,
  onView,
  onReplace,
  onUpload,
}: CredentialCardProps): ReactNode {
  const [isHovered, setIsHovered] = useState(false);
  const typeConfig = credentialTypeConfig[credential.type];

  const daysUntilExpiry = credential.expiryDate
    ? getDaysUntilExpiry(credential.expiryDate)
    : null;

  const statusType: StatusType = credential.status === 'under-review'
    ? 'under-review'
    : credential.status;

  return (
    <div
      className={`
        relative bg-void-medium rounded-card border border-ash-border
        p-5 transition-all duration-normal
        ${isHovered ? 'shadow-card-hover border-gold/30' : 'shadow-card'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className={`
            w-12 h-12 rounded-card flex items-center justify-center text-xl
            ${credential.status === 'verified' ? 'bg-status-verified/10' : 'bg-void-elevated'}
          `}
        >
          {typeConfig.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-1">
            <h3 className="font-body text-body-md font-semibold text-pearl truncate">
              {credential.name || typeConfig.label}
            </h3>
            <StatusBadge status={statusType} size="sm" />
          </div>

          <p className="font-body text-body-sm text-ash mb-3">
            {typeConfig.description}
          </p>

          {/* Date info */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-body-sm font-body">
            {credential.verifiedDate && (
              <span className="text-status-verified">
                Verified {formatDate(credential.verifiedDate)}
              </span>
            )}
            {credential.expiryDate && (
              <span
                className={
                  daysUntilExpiry !== null && daysUntilExpiry <= 30
                    ? 'text-status-expired'
                    : daysUntilExpiry !== null && daysUntilExpiry <= 90
                      ? 'text-status-pending'
                      : 'text-ash'
                }
              >
                {daysUntilExpiry !== null && daysUntilExpiry <= 0
                  ? 'Expired'
                  : daysUntilExpiry !== null && daysUntilExpiry <= 30
                    ? `Expires in ${daysUntilExpiry} days`
                    : `Expires ${formatDate(credential.expiryDate)}`}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div
        className={`
          flex gap-2 mt-4 pt-4 border-t border-ash-border
          transition-opacity duration-normal
          ${isHovered ? 'opacity-100' : 'opacity-60'}
        `}
      >
        {credential.documentKey && onView && (
          <button
            onClick={() => onView(credential)}
            className="
              flex-1 py-2 px-3 rounded-lg
              font-body text-body-sm font-medium
              bg-void-elevated text-pearl-soft
              hover:bg-gold/10 hover:text-gold
              transition-colors duration-normal
            "
          >
            View
          </button>
        )}
        {credential.status !== 'pending' && onReplace && (
          <button
            onClick={() => onReplace(credential)}
            className="
              flex-1 py-2 px-3 rounded-lg
              font-body text-body-sm font-medium
              bg-void-elevated text-pearl-soft
              hover:bg-gold/10 hover:text-gold
              transition-colors duration-normal
            "
          >
            Replace
          </button>
        )}
        {credential.status === 'pending' && !credential.documentKey && onUpload && (
          <button
            onClick={onUpload}
            className="
              flex-1 py-2.5 px-4 rounded-lg
              font-body text-body-sm font-medium
              bg-gold text-void
              hover:bg-gold-light
              transition-colors duration-normal
            "
          >
            Upload Document
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * Empty state card for adding a new credential
 */
interface AddCredentialCardProps {
  type: Credential['type'];
  onClick: () => void;
}

export function AddCredentialCard({ type, onClick }: AddCredentialCardProps): ReactNode {
  const typeConfig = credentialTypeConfig[type];

  return (
    <button
      onClick={onClick}
      className="
        w-full bg-void-light rounded-card border-2 border-dashed border-ash-border
        p-5 transition-all duration-normal
        hover:border-gold hover:bg-gold/5
        group
      "
    >
      <div className="flex items-center gap-4">
        <div
          className="
            w-12 h-12 rounded-card flex items-center justify-center text-xl
            bg-void-elevated group-hover:bg-gold/10
            transition-colors duration-normal
          "
        >
          {typeConfig.icon}
        </div>
        <div className="text-left">
          <h3 className="font-body text-body-md font-semibold text-pearl">
            Add {typeConfig.label}
          </h3>
          <p className="font-body text-body-sm text-ash">
            Upload your {typeConfig.description.toLowerCase()}
          </p>
        </div>
        <div
          className="
            ml-auto w-8 h-8 rounded-full flex items-center justify-center
            bg-void-elevated text-ash text-xl
            group-hover:bg-gold group-hover:text-void
            transition-colors duration-normal
          "
        >
          +
        </div>
      </div>
    </button>
  );
}
