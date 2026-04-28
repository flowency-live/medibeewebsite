'use client';

/**
 * Client Portal Layout
 *
 * Professional layout for care provider clients.
 * Follows Medibee Design Language - "Calmly premium" aesthetic.
 */

import { type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth, isClient } from '@/lib/auth';
import { StatusBadge } from '@/components/portal';

interface ClientLayoutProps {
  children: ReactNode;
}

// Navigation items for the client portal
const navItems = [
  { href: '/client/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/client/candidates', label: 'Browse Candidates', icon: '👥' },
  { href: '/client/shortlists', label: 'Shortlists', icon: '⭐' },
  { href: '/client/contacts', label: 'Contact Requests', icon: '📨' },
  { href: '/client/organisation', label: 'Organisation', icon: '🏢' },
  { href: '/client/subscription', label: 'Subscription', icon: '💳' },
  { href: '/client/settings', label: 'Settings', icon: '⚙️' },
];

const tierColors = {
  bronze: 'bg-tier-cell/20 text-pearl',
  silver: 'bg-ash/20 text-pearl',
  gold: 'bg-gold/20 text-gold',
};

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
      <div className="min-h-screen bg-void flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-portal-blue/20 animate-pulse mx-auto mb-4" />
          <p className="font-portal text-portal-body text-portal-graphite-muted">
            Loading your portal...
          </p>
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
    <div className="min-h-screen bg-void">
      {/* Portal Header */}
      <header className="sticky top-0 z-40 bg-void-light border-b border-ash-border text-pearl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Portal Label */}
            <div className="flex items-center gap-4">
              <Link
                href="/client/dashboard"
                className="flex items-center gap-2"
              >
                <span className="font-portal text-portal-name font-semibold text-gold">
                  Medibee
                </span>
              </Link>
              <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-white/20">
                <span className="text-sm">🏢</span>
                <span className="font-portal text-portal-meta text-white/70">
                  Client Portal
                </span>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              {/* Subscription Badge */}
              {subscription && (
                <div className="hidden md:flex items-center gap-3">
                  <span className={`
                    px-2 py-1 rounded-card text-xs font-semibold uppercase
                    ${tierColors[subscription.tier]}
                  `}>
                    {subscription.tier}
                  </span>
                  <span className="font-portal text-portal-meta text-white/70">
                    {subscription.creditsRemaining === -1
                      ? 'Unlimited'
                      : `${subscription.creditsRemaining} credits`}
                  </span>
                </div>
              )}

              {/* Organisation name */}
              <div className="hidden lg:block font-portal text-portal-meta text-white/90">
                {profile.organisationName}
              </div>

              {/* Logout */}
              <button
                onClick={() => logout()}
                className="
                  px-3 py-1.5 rounded-card
                  font-portal text-portal-meta text-white/70
                  hover:text-white hover:bg-white/10
                  transition-colors duration-portal
                "
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation - Desktop */}
          <nav className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Navigation Links */}
              <div className="bg-void-medium rounded-card border border-ash-border overflow-hidden">
                <ul className="py-2">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`
                            flex items-center gap-3 px-4 py-3
                            font-portal text-portal-body
                            transition-colors duration-portal
                            ${isActive
                              ? 'bg-gold/10 text-gold border-l-2 border-gold'
                              : 'text-pearl-soft hover:bg-void-elevated'
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
              </div>

              {/* Subscription Card */}
              {subscription ? (
                <div className="bg-void-medium rounded-card border border-ash-border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-portal text-portal-meta text-ash">
                      Subscription
                    </span>
                    <span className={`
                      px-2 py-0.5 rounded-card text-xs font-semibold uppercase
                      ${tierColors[subscription.tier]}
                    `}>
                      {subscription.tier}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-portal text-portal-meta text-ash">
                        Status
                      </span>
                      <StatusBadge
                        status={subscription.status === 'active' ? 'verified' : 'pending'}
                        label={subscription.status}
                        size="sm"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-portal text-portal-meta text-ash">
                        Credits
                      </span>
                      <span className="font-portal text-portal-body text-pearl font-medium">
                        {subscription.creditsRemaining === -1
                          ? 'Unlimited'
                          : subscription.creditsRemaining}
                      </span>
                    </div>
                  </div>

                  <Link
                    href="/client/subscription"
                    className="
                      block mt-4 text-center py-2 rounded-card
                      font-portal text-portal-meta font-medium
                      text-gold hover:bg-gold/5
                      transition-colors duration-portal
                    "
                  >
                    Manage Subscription
                  </Link>
                </div>
              ) : (
                <div className="bg-status-pending/5 border border-status-pending/20 rounded-card p-4">
                  <p className="font-portal text-portal-body font-medium text-pearl mb-2">
                    No Active Subscription
                  </p>
                  <p className="font-portal text-portal-meta text-ash mb-4">
                    Subscribe to start connecting with candidates.
                  </p>
                  <Link
                    href="/client/subscription"
                    className="
                      block text-center py-2.5 rounded-card
                      font-portal text-portal-meta font-medium
                      bg-gold text-void
                      hover:bg-gold-light
                      transition-colors duration-portal
                    "
                  >
                    View Plans
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Navigation */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-void-medium border-t border-ash-border shadow-card-elevated pb-[env(safe-area-inset-bottom)]">
            <div className="flex overflow-x-auto py-2 px-4 gap-1">
              {navItems.slice(0, 5).map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      flex flex-col items-center justify-center px-3 py-2 rounded-card
                      min-w-[64px]
                      ${isActive
                        ? 'bg-gold/10 text-gold'
                        : 'text-ash'
                      }
                    `}
                  >
                    <span className="text-lg mb-0.5">{item.icon}</span>
                    <span className="font-portal text-ui-xs truncate">{item.label.split(' ')[0]}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1 min-w-0 pb-20 lg:pb-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
