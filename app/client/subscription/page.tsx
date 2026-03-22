'use client';

/**
 * Subscription Page
 *
 * Manage subscription, view plans, and access billing portal.
 */

import * as React from 'react';
import { useAuth, isClient } from '@/lib/auth';
import { subscriptionsApi } from '@/lib/api';
import { Button } from '@/components/ui';

interface SubscriptionPlan {
  tier: 'bronze' | 'silver' | 'gold';
  displayName: string;
  price: number;
  credits: number | 'unlimited';
  shortlists: number | 'unlimited';
  team: number;
  features: string[];
}

const PLANS: SubscriptionPlan[] = [
  {
    tier: 'bronze',
    displayName: 'Bronze',
    price: 99,
    credits: 5,
    shortlists: 1,
    team: 1,
    features: [
      '5 contact credits per month',
      '1 shortlist (10 candidates max)',
      'Basic candidate profiles',
      'Email support',
    ],
  },
  {
    tier: 'silver',
    displayName: 'Silver',
    price: 249,
    credits: 20,
    shortlists: 3,
    team: 3,
    features: [
      '20 contact credits per month',
      '3 shortlists (25 candidates each)',
      'Full candidate profiles',
      '3 team members',
      'Priority email support',
    ],
  },
  {
    tier: 'gold',
    displayName: 'Gold',
    price: 499,
    credits: 'unlimited',
    shortlists: 'unlimited',
    team: 10,
    features: [
      'Unlimited contact credits',
      'Unlimited shortlists',
      'Full candidate profiles with CV access',
      '10 team members',
      'Dedicated account manager',
      'Priority phone support',
    ],
  },
];

export default function SubscriptionPage() {
  const { state, refreshProfile } = useAuth();

  const [isLoading, setIsLoading] = React.useState<string | null>(null);
  const [error, setError] = React.useState('');

  const handleSubscribe = async (tier: string) => {
    setIsLoading(tier);
    setError('');

    const response = await subscriptionsApi.createCheckout({ tier: tier.toLowerCase() as 'bronze' | 'silver' | 'gold' });

    if (response.success && response.data) {
      const data = response.data as { checkoutUrl: string };
      window.location.href = data.checkoutUrl;
    } else {
      setError((response as { message?: string }).message || 'Failed to start checkout.');
      setIsLoading(null);
    }
  };

  const handleManageBilling = async () => {
    setIsLoading('billing');
    setError('');

    const response = await subscriptionsApi.getBillingPortal();

    if (response.success && response.data) {
      const data = response.data as { portalUrl: string };
      window.location.href = data.portalUrl;
    } else {
      setError((response as { message?: string }).message || 'Failed to open billing portal.');
      setIsLoading(null);
    }
  };

  if (!isClient(state)) {
    return null;
  }

  const { subscription } = state;

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-display-sm text-ink mb-2">Subscription</h1>
        <p className="font-body text-body-md text-slate-blue">
          Choose a plan that fits your recruitment needs.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-[3px] border-red-500" role="alert">
          <p className="font-body text-body-sm text-red-800">{error}</p>
        </div>
      )}

      {/* Current Subscription */}
      {subscription && (
        <div className="bg-white p-6 rounded-sm border border-neutral-grey/20 mb-8">
          <h2 className="font-display text-lg text-ink mb-4">Current Subscription</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <div className="font-body text-body-sm text-slate-blue mb-1">Plan</div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-rich-gold/20 text-rich-gold text-sm font-semibold rounded">
                  {subscription.tier}
                </span>
                <span
                  className={`text-sm ${
                    subscription.status === 'active'
                      ? 'text-green-600'
                      : subscription.status === 'past_due'
                      ? 'text-amber-600'
                      : 'text-red-600'
                  }`}
                >
                  {subscription.status.replace('_', ' ')}
                </span>
              </div>
            </div>

            <div>
              <div className="font-body text-body-sm text-slate-blue mb-1">Credits Remaining</div>
              <div className="font-display text-xl text-ink">
                {subscription.creditsRemaining === -1 ? '∞' : subscription.creditsRemaining}
              </div>
            </div>

            <div>
              <div className="font-body text-body-sm text-slate-blue mb-1">Next Billing Date</div>
              <div className="font-body text-body-md text-ink">
                {subscription.currentPeriodEnd
                  ? new Date(subscription.currentPeriodEnd).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })
                  : '—'}
              </div>
            </div>
          </div>

          {subscription.status === 'past_due' && (
            <div className="p-4 bg-amber-50 rounded-sm mb-4">
              <p className="font-body text-body-sm text-amber-800">
                Your last payment failed. Please update your payment method to continue using our
                services.
              </p>
            </div>
          )}

          <Button
            variant="secondary"
            onClick={handleManageBilling}
            disabled={isLoading === 'billing'}
          >
            {isLoading === 'billing' ? 'Loading...' : 'Manage Billing'}
          </Button>
        </div>
      )}

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PLANS.map((plan) => {
          const isCurrent = subscription?.tier === plan.tier;
          const isUpgrade = subscription
            ? PLANS.findIndex((p) => p.tier === plan.tier) >
              PLANS.findIndex((p) => p.tier === subscription.tier)
            : false;

          return (
            <div
              key={plan.tier}
              className={`bg-white p-6 rounded-sm border-2 ${
                plan.tier === 'silver'
                  ? 'border-rich-gold'
                  : isCurrent
                  ? 'border-slate-blue'
                  : 'border-neutral-grey/20'
              }`}
            >
              {plan.tier === 'silver' && (
                <div className="text-center mb-4">
                  <span className="px-3 py-1 bg-rich-gold text-ink text-xs font-semibold rounded">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="font-display text-xl text-ink mb-2">{plan.displayName}</h3>
                <div className="mb-1">
                  <span className="font-display text-display-sm text-ink">£{plan.price}</span>
                  <span className="font-body text-body-sm text-slate-blue">/month</span>
                </div>
                <p className="font-body text-body-sm text-slate-blue">
                  {plan.credits === 'unlimited'
                    ? 'Unlimited contacts'
                    : `${plan.credits} contacts/month`}
                </p>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span className="font-body text-body-sm text-ink">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                {isCurrent ? (
                  <Button variant="secondary" disabled className="w-full">
                    Current Plan
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleSubscribe(plan.tier)}
                    disabled={isLoading !== null}
                    variant={plan.tier === 'silver' ? 'gold' : 'secondary'}
                    className="w-full"
                  >
                    {isLoading === plan.tier
                      ? 'Loading...'
                      : subscription
                      ? isUpgrade
                        ? 'Upgrade'
                        : 'Downgrade'
                      : 'Subscribe'}
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* FAQ */}
      <div className="mt-12">
        <h2 className="font-display text-lg text-ink mb-6">Frequently Asked Questions</h2>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-sm border border-neutral-grey/20">
            <h3 className="font-display text-md text-ink mb-2">What are contact credits?</h3>
            <p className="font-body text-body-md text-slate-blue">
              Each time you request a candidate&apos;s contact details, it uses one credit. Credits
              refresh at the start of each billing cycle. Unused credits don&apos;t roll over.
            </p>
          </div>

          <div className="bg-white p-6 rounded-sm border border-neutral-grey/20">
            <h3 className="font-display text-md text-ink mb-2">Can I upgrade or downgrade?</h3>
            <p className="font-body text-body-md text-slate-blue">
              Yes, you can change your plan at any time. Upgrades take effect immediately with
              prorated billing. Downgrades take effect at the end of your current billing cycle.
            </p>
          </div>

          <div className="bg-white p-6 rounded-sm border border-neutral-grey/20">
            <h3 className="font-display text-md text-ink mb-2">What happens if a candidate declines?</h3>
            <p className="font-body text-body-md text-slate-blue">
              If a candidate is no longer available or declines your contact request, your credit
              will be refunded automatically.
            </p>
          </div>

          <div className="bg-white p-6 rounded-sm border border-neutral-grey/20">
            <h3 className="font-display text-md text-ink mb-2">How do I cancel?</h3>
            <p className="font-body text-body-md text-slate-blue">
              You can cancel your subscription at any time through the billing portal. You&apos;ll
              continue to have access until the end of your current billing period.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
