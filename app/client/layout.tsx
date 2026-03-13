'use client';

/**
 * Client Portal Layout
 *
 * Wraps all client pages with portal-specific navigation and auth check.
 */

import { type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth, isClient } from '@/lib/auth';

interface ClientLayoutProps {
  children: ReactNode;
}

// Navigation items for the client portal
const navItems = [
  { href: '/client/dashboard', label: 'Dashboard', icon: '◉' },
  { href: '/client/candidates', label: 'Browse Candidates', icon: '◎' },
  { href: '/client/shortlists', label: 'Shortlists', icon: '★' },
  { href: '/client/contacts', label: 'Contact Requests', icon: '✉' },
  { href: '/client/organisation', label: 'Organisation', icon: '▤' },
  { href: '/client/subscription', label: 'Subscription', icon: '◈' },
  { href: '/client/settings', label: 'Settings', icon: '⚙' },
];

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();
  const { state, logout } = useAuth();

  // Auth pages don't need the portal layout
  const isAuthPage = ['/client/login', '/client/register', '/client/verify-email', '/client/forgot-password'].some(
    (path) => pathname.startsWith(path)
  );

  if (isAuthPage) {
    return <>{children}</>;
  }

  // Show loading state
  if (state.status === 'loading') {
    return (
      <div className="min-h-screen bg-mist flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse mb-4">
            <div className="w-16 h-16 bg-slate-blue/20 rounded-full mx-auto" />
          </div>
          <p className="font-body text-body-md text-slate-blue">Loading...</p>
        </div>
      </div>
    );
  }

  // Not authenticated - middleware should handle redirect
  if (!isClient(state)) {
    return null;
  }

  const { profile, subscription } = state;

  return (
    <div className="min-h-screen bg-mist">
      {/* Portal Header */}
      <header className="bg-deep-slate text-mist border-b border-slate-blue/20">
        <div className="container-editorial py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/client/dashboard" className="font-display text-lg text-soft-gold">
                Medibee
              </Link>
              <span className="text-mist/40">|</span>
              <span className="font-body text-body-sm text-mist/60">Client Portal</span>
            </div>

            <div className="flex items-center gap-6">
              {subscription && (
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-rich-gold/20 text-rich-gold text-xs font-semibold uppercase rounded">
                    {subscription.tier}
                  </span>
                  {subscription.creditsRemaining >= 0 && (
                    <span className="font-body text-body-sm text-mist/60">
                      {subscription.creditsRemaining} credits
                    </span>
                  )}
                  {subscription.creditsRemaining === -1 && (
                    <span className="font-body text-body-sm text-mist/60">Unlimited</span>
                  )}
                </div>
              )}
              <span className="font-body text-body-sm text-mist/80">
                {profile.organisationName}
              </span>
              <button
                onClick={() => logout()}
                className="font-body text-body-sm text-mist/60 hover:text-mist transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container-editorial py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <nav className="w-64 shrink-0">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-sm font-body text-body-md transition-colors
                        ${isActive
                          ? 'bg-slate-blue text-mist'
                          : 'text-ink hover:bg-slate-blue/10'
                        }
                      `}
                    >
                      <span className="text-lg">{item.icon}</span>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Subscription Info */}
            {subscription ? (
              <div className="mt-8 p-4 bg-white rounded-sm border border-neutral-grey/20">
                <p className="font-body text-body-sm text-slate-blue mb-2">Subscription</p>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-rich-gold/10 text-rich-gold text-xs font-semibold uppercase rounded">
                    {subscription.tier}
                  </span>
                  <span
                    className={`text-xs ${
                      subscription.status === 'active'
                        ? 'text-green-600'
                        : subscription.status === 'past_due'
                        ? 'text-amber-600'
                        : 'text-red-600'
                    }`}
                  >
                    {subscription.status}
                  </span>
                </div>
                <p className="font-body text-body-sm text-ink">
                  {subscription.creditsRemaining === -1
                    ? 'Unlimited contacts'
                    : `${subscription.creditsRemaining} contacts remaining`}
                </p>
                <Link
                  href="/client/subscription"
                  className="mt-2 inline-block font-body text-body-sm text-slate-blue hover:text-deep-slate underline"
                >
                  Manage subscription →
                </Link>
              </div>
            ) : (
              <div className="mt-8 p-4 bg-amber-50 rounded-sm border border-amber-200">
                <p className="font-body text-body-sm text-amber-800 mb-2">
                  No Active Subscription
                </p>
                <p className="font-body text-body-sm text-amber-700 mb-3">
                  Subscribe to start contacting candidates.
                </p>
                <Link
                  href="/client/subscription"
                  className="inline-block px-4 py-2 bg-rich-gold text-ink text-sm font-semibold rounded-sm hover:bg-soft-gold transition-colors"
                >
                  View Plans
                </Link>
              </div>
            )}
          </nav>

          {/* Main Content */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
