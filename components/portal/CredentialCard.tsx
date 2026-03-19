/**
 * CredentialCard
 *
 * Card for displaying credential status in the credential wallet.
 * Per design language: "Trust is the core product. This needs to feel secure and professional."
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
        relative bg-surface-0 rounded-card border border-portal-stone
        p-5 transition-all duration-portal ease-portal
        ${isHovered ? 'shadow-card-hover border-portal-teal/30' : 'shadow-card'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className={`
            w-12 h-12 rounded-card flex items-center justify-center text-xl
            ${credential.status === 'verified' ? 'bg-portal-verified/10' : 'bg-portal-stone'}
          `}
        >
          {typeConfig.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-1">
            <h3 className="font-portal text-portal-heading text-portal-graphite truncate">
              {credential.name || typeConfig.label}
            </h3>
            <StatusBadge status={statusType} size="sm" />
          </div>

          <p className="font-portal text-portal-meta text-portal-graphite-muted mb-3">
            {typeConfig.description}
          </p>

          {/* Date info */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-portal-meta font-portal">
            {credential.verifiedDate && (
              <span className="text-portal-verified">
                Verified {formatDate(credential.verifiedDate)}
              </span>
            )}
            {credential.expiryDate && (
              <span
                className={
                  daysUntilExpiry !== null && daysUntilExpiry <= 30
                    ? 'text-portal-alert'
                    : daysUntilExpiry !== null && daysUntilExpiry <= 90
                      ? 'text-portal-available'
                      : 'text-portal-graphite-muted'
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
          flex gap-2 mt-4 pt-4 border-t border-portal-stone
          transition-opacity duration-portal
          ${isHovered ? 'opacity-100' : 'opacity-60'}
        `}
      >
        {credential.documentKey && onView && (
          <button
            onClick={() => onView(credential)}
            className="
              flex-1 py-2 px-3 rounded-lg
              font-portal text-portal-meta font-medium
              bg-portal-stone text-portal-graphite
              hover:bg-portal-blue/10 hover:text-portal-blue
              transition-colors duration-portal
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
              font-portal text-portal-meta font-medium
              bg-portal-stone text-portal-graphite
              hover:bg-portal-teal/10 hover:text-portal-teal
              transition-colors duration-portal
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
              font-portal text-portal-meta font-medium
              bg-portal-blue text-white
              hover:bg-portal-blue-dark
              transition-colors duration-portal
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
        w-full bg-surface-1 rounded-card border-2 border-dashed border-portal-stone
        p-5 transition-all duration-portal ease-portal
        hover:border-portal-teal hover:bg-portal-teal/5
        group
      "
    >
      <div className="flex items-center gap-4">
        <div
          className="
            w-12 h-12 rounded-card flex items-center justify-center text-xl
            bg-portal-stone group-hover:bg-portal-teal/10
            transition-colors duration-portal
          "
        >
          {typeConfig.icon}
        </div>
        <div className="text-left">
          <h3 className="font-portal text-portal-heading text-portal-graphite">
            Add {typeConfig.label}
          </h3>
          <p className="font-portal text-portal-meta text-portal-graphite-muted">
            Upload your {typeConfig.description.toLowerCase()}
          </p>
        </div>
        <div
          className="
            ml-auto w-8 h-8 rounded-full flex items-center justify-center
            bg-portal-stone text-portal-graphite-muted text-xl
            group-hover:bg-portal-teal group-hover:text-white
            transition-colors duration-portal
          "
        >
          +
        </div>
      </div>
    </button>
  );
}
