/**
 * IntroductionCard
 *
 * Card for introduction requests - designed to feel like an invitation.
 * Dark theme with gold accents for pending/new requests.
 */

'use client';

import { type ReactNode, useState } from 'react';
import { StatusBadge, type StatusType } from './StatusBadge';

export type IntroductionStatus =
  | 'pending'
  | 'accepted'
  | 'declined'
  | 'facilitating'
  | 'completed'
  | 'expired';

export interface Introduction {
  id: string;
  clientName: string;
  clientType: string;
  location: string;
  roleTitle?: string;
  message?: string;
  status: IntroductionStatus;
  requestedAt: string;
  respondedAt?: string;
  completedAt?: string;
}

interface IntroductionCardProps {
  introduction: Introduction;
  onAccept?: (id: string) => void;
  onDecline?: (id: string) => void;
  onView?: (id: string) => void;
}

const statusConfig: Record<IntroductionStatus, {
  badgeStatus: StatusType;
  label: string;
  description: string;
}> = {
  pending: {
    badgeStatus: 'new',
    label: 'New Request',
    description: 'Waiting for your response',
  },
  accepted: {
    badgeStatus: 'verified',
    label: 'Accepted',
    description: 'Medibee will be in touch within 24 hours',
  },
  declined: {
    badgeStatus: 'not-available',
    label: 'Declined',
    description: 'You declined this introduction',
  },
  facilitating: {
    badgeStatus: 'under-review',
    label: 'In Progress',
    description: 'Medibee is facilitating your introduction',
  },
  completed: {
    badgeStatus: 'verified',
    label: 'Completed',
    description: 'Introduction successfully facilitated',
  },
  expired: {
    badgeStatus: 'expired',
    label: 'Expired',
    description: 'Request expired without response',
  },
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return 'Today';
  }
  if (diffDays === 1) {
    return 'Yesterday';
  }
  if (diffDays < 7) {
    return `${diffDays} days ago`;
  }

  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });
}

export function IntroductionCard({
  introduction,
  onAccept,
  onDecline,
  onView,
}: IntroductionCardProps): ReactNode {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const config = statusConfig[introduction.status];

  const isPending = introduction.status === 'pending';

  const handleAccept = async () => {
    if (!onAccept) return;
    setIsProcessing(true);
    await onAccept(introduction.id);
    setIsProcessing(false);
  };

  const handleDecline = async () => {
    if (!onDecline) return;
    setIsProcessing(true);
    await onDecline(introduction.id);
    setIsProcessing(false);
  };

  return (
    <div
      className={`
        bg-void-medium rounded-lg border overflow-hidden
        transition-all duration-normal
        ${isPending
          ? 'border-gold/30 shadow-card-elevated'
          : 'border-ash-border shadow-card'
        }
      `}
    >
      {/* Header band for pending requests */}
      {isPending && (
        <div className="bg-gold/10 px-5 py-2 border-b border-gold/20">
          <span className="font-body text-body-sm font-medium text-gold">
            New introduction request
          </span>
        </div>
      )}

      <div className="p-5">
        {/* Provider info */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-start gap-3">
            {/* Provider avatar placeholder */}
            <div
              className="
                w-12 h-12 rounded-card bg-gold/10 flex items-center justify-center
                text-gold font-body font-semibold text-lg
              "
            >
              {introduction.clientName.charAt(0)}
            </div>
            <div>
              <h3 className="font-body text-body-md font-semibold text-pearl">
                {introduction.clientName}
              </h3>
              <p className="font-body text-body-sm text-ash">
                {introduction.clientType} • {introduction.location}
              </p>
            </div>
          </div>
          <StatusBadge status={config.badgeStatus} label={config.label} size="sm" />
        </div>

        {/* Role/message if present */}
        {introduction.roleTitle && (
          <div className="mb-3 p-3 bg-void-elevated rounded-lg">
            <p className="font-body text-body-sm text-ash mb-1">
              Looking for:
            </p>
            <p className="font-body text-body-md text-pearl font-medium">
              {introduction.roleTitle}
            </p>
          </div>
        )}

        {/* Expandable message */}
        {introduction.message && (
          <div className="mb-4">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="font-body text-body-sm text-gold hover:underline"
            >
              {isExpanded ? 'Hide message' : 'View message from provider'}
            </button>
            {isExpanded && (
              <div
                className="
                  mt-2 p-3 bg-void-elevated rounded-lg
                  font-body text-body-md text-pearl
                  animate-fade-in-up
                "
              >
                {introduction.message}
              </div>
            )}
          </div>
        )}

        {/* Status description */}
        <p className="font-body text-body-sm text-ash mb-4">
          {config.description}
        </p>

        {/* Actions for pending requests */}
        {isPending && onAccept && onDecline && (
          <div className="flex gap-3 pt-4 border-t border-ash-border">
            <button
              onClick={handleDecline}
              disabled={isProcessing}
              className="
                flex-1 py-3 px-4 rounded-card
                font-body text-body-md font-medium
                bg-void-light text-pearl border border-ash-border
                hover:bg-void-elevated hover:border-ash
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors duration-normal
              "
            >
              {isProcessing ? 'Processing...' : 'Decline'}
            </button>
            <button
              onClick={handleAccept}
              disabled={isProcessing}
              className="
                flex-1 py-3 px-4 rounded-card
                font-body text-body-md font-medium
                bg-gold text-void
                hover:bg-gold-light
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors duration-normal
              "
            >
              {isProcessing ? 'Processing...' : 'Accept Introduction'}
            </button>
          </div>
        )}

        {/* View action for non-pending */}
        {!isPending && onView && (
          <button
            onClick={() => onView(introduction.id)}
            className="
              w-full py-2.5 px-4 rounded-card
              font-body text-body-sm font-medium
              bg-void-light text-pearl border border-ash-border
              hover:bg-void-elevated
              transition-colors duration-normal
            "
          >
            View Details
          </button>
        )}

        {/* Timestamp */}
        <p className="mt-4 font-body text-ui-xs text-ash text-right">
          Requested {formatDate(introduction.requestedAt)}
        </p>
      </div>
    </div>
  );
}

/**
 * Empty state for no introductions
 */
export function NoIntroductionsCard(): ReactNode {
  return (
    <div className="bg-void-light rounded-lg border border-dashed border-ash-border p-8 text-center">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-void-elevated flex items-center justify-center">
        <span className="text-2xl">💼</span>
      </div>
      <h3 className="font-body text-body-md font-semibold text-pearl mb-2">
        No introduction requests yet
      </h3>
      <p className="font-body text-body-md text-ash max-w-sm mx-auto">
        When care providers want to connect with you, their requests will appear here.
        Keep your profile complete and set yourself as available.
      </p>
    </div>
  );
}
