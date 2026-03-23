'use client';

/**
 * VerificationPackModal
 *
 * Modal for purchasing the Verification Pack (£29 one-off).
 * Allows candidates to get their credentials verified and earn verification badges.
 * Only available to Hive members.
 */

import { useState } from 'react';
import { TierBadge } from '@/components/ui';
import { HoneycombPattern } from '@/components/decorative';

interface VerificationPackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (fastTrack: boolean) => Promise<void>;
}

type TabType = 'cell' | 'hive' | 'colony';

const verificationFeatures = [
  { icon: '🪪', label: 'ID Review', description: 'Verify your identity' },
  { icon: '🎓', label: 'Qualifications Review', description: 'Validate your certifications' },
  { icon: '📋', label: 'Right to Work Evidence Review', description: 'Confirm work authorization' },
  { icon: '🛡️', label: 'DBS Evidence Review', description: 'Verify your DBS status' },
  { icon: '📜', label: 'Passport Update', description: 'Update your Medibee Passport' },
  { icon: '✓', label: 'Badge Outcomes', description: 'Earn verification badges' },
];

export function VerificationPackModal({
  isOpen,
  onClose,
  onPurchase,
}: VerificationPackModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('hive');
  const [includeFastTrack, setIncludeFastTrack] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handlePurchase = async () => {
    setIsLoading(true);
    try {
      await onPurchase(includeFastTrack);
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  const totalPrice = includeFastTrack ? 44 : 29;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg animate-scale-in">
        {/* Honeycomb background */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-brand-slate" />
          <HoneycombPattern variant="gold" opacity={0.04} />
        </div>

        {/* Content */}
        <div className="relative border border-brand-gold/30 rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-brand-gold/20">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-brand-pearl">
                Medibee Membership
              </h2>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-brand-dark/50 flex items-center justify-center text-brand-pearl-muted hover:text-brand-pearl transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-2 mt-4">
              <TabButton
                active={activeTab === 'cell'}
                onClick={() => setActiveTab('cell')}
              >
                CELL
              </TabButton>
              <TabButton
                active={activeTab === 'hive'}
                onClick={() => setActiveTab('hive')}
                badge="MOST POPULAR"
              >
                HIVE
              </TabButton>
              <TabButton
                active={activeTab === 'colony'}
                onClick={() => setActiveTab('colony')}
              >
                COLONY
              </TabButton>
            </div>
          </div>

          {/* Body */}
          <div className="p-6">
            {activeTab === 'hive' ? (
              <>
                {/* Tier Badge */}
                <div className="flex justify-center mb-6">
                  <TierBadge tier="hive" size="lg" />
                </div>

                {/* Verification Pack Section */}
                <div className="bg-brand-dark/40 border border-brand-gold/20 rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-brand-gold">
                      Verification Pack
                    </h3>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-brand-pearl">£29</span>
                      <span className="text-brand-pearl-muted ml-1">one-off</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3">
                    {verificationFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-lg">{feature.icon}</span>
                        <div>
                          <span className="text-brand-gold font-medium">{feature.label}</span>
                          <p className="text-sm text-brand-pearl-muted">{feature.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Fast Track Add-on */}
                <div
                  onClick={() => setIncludeFastTrack(!includeFastTrack)}
                  className={`
                    cursor-pointer p-4 rounded-xl border transition-all
                    ${includeFastTrack
                      ? 'bg-brand-gold/10 border-brand-gold/40'
                      : 'bg-brand-dark/40 border-brand-gold/10 hover:border-brand-gold/20'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`
                          w-5 h-5 rounded border-2 flex items-center justify-center transition-colors
                          ${includeFastTrack
                            ? 'bg-brand-gold border-brand-gold'
                            : 'border-brand-gold/40'
                          }
                        `}
                      >
                        {includeFastTrack && (
                          <svg className="w-3 h-3 text-brand-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="text-brand-pearl font-medium">Fast Track Processing</p>
                        <p className="text-sm text-brand-pearl-muted">Priority verification within 24 hours</p>
                      </div>
                    </div>
                    <span className="text-brand-gold font-semibold">+£15</span>
                  </div>
                </div>

                {/* Total and CTA */}
                <div className="mt-6 pt-6 border-t border-brand-gold/10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-brand-pearl-muted">Total</span>
                    <span className="text-2xl font-bold text-brand-gold">£{totalPrice}</span>
                  </div>
                  <button
                    onClick={handlePurchase}
                    disabled={isLoading}
                    className="w-full py-4 bg-brand-gold text-brand-dark font-semibold rounded-xl hover:bg-brand-gold-light transition-colors disabled:opacity-50"
                  >
                    {isLoading ? 'Processing...' : 'Add Verification Pack'}
                  </button>
                </div>
              </>
            ) : activeTab === 'cell' ? (
              <div className="text-center py-8">
                <TierBadge tier="cell" size="lg" className="mx-auto mb-6" />
                <p className="text-brand-pearl mb-4">
                  Cell members have free access to basic profile features.
                </p>
                <p className="text-brand-pearl-muted text-sm mb-6">
                  Upgrade to Hive for £4.99/month to unlock the Vault, Passport, and verification badges.
                </p>
                <button
                  onClick={() => setActiveTab('hive')}
                  className="px-6 py-3 bg-brand-gold text-brand-dark font-semibold rounded-xl hover:bg-brand-gold-light transition-colors"
                >
                  Explore Hive Benefits
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <TierBadge tier="colony" size="lg" className="mx-auto mb-6" />
                <p className="text-brand-pearl mb-4">
                  Colony is for employers looking to hire healthcare professionals.
                </p>
                <p className="text-brand-pearl-muted text-sm mb-6">
                  From £100/month for unlimited candidate access and contact.
                </p>
                <a
                  href="/contact?type=colony"
                  className="inline-block px-6 py-3 border border-brand-gold text-brand-gold font-semibold rounded-xl hover:bg-brand-gold/10 transition-colors"
                >
                  Contact Sales
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function TabButton({
  children,
  active,
  onClick,
  badge,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  badge?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        relative flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all
        ${active
          ? 'bg-brand-gold/20 text-brand-gold'
          : 'text-brand-pearl-muted hover:text-brand-pearl hover:bg-brand-dark/40'
        }
      `}
    >
      {children}
      {badge && (
        <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[10px] font-bold bg-brand-gold text-brand-dark rounded-full whitespace-nowrap">
          {badge}
        </span>
      )}
      {active && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-brand-gold rounded-full" />
      )}
    </button>
  );
}
