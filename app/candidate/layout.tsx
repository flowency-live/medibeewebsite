'use client';

/**
 * Candidate Portal Layout
 *
 * Per design language: "Mobile-first structural system" with
 * single dominant vertical column, floating primary action surfaces.
 */

import { type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth, isCandidate } from '@/lib/auth';
import { StatusBadge, AvailabilityIndicator } from '@/components/portal';

interface CandidateLayoutProps {
  children: ReactNode;
}

// Navigation items for the candidate portal
const navItems = [
  { href: '/candidate/dashboard', label: 'Dashboard', icon: '◉' },
  { href: '/candidate/profile', label: 'Profile', icon: '◎' },
  { href: '/candidate/credentials', label: 'Credentials', icon: '🛡' },
  { href: '/candidate/introductions', label: 'Introductions', icon: '💼' },
  { href: '/candidate/settings', label: 'Settings', icon: '⚙' },
];

export default function CandidateLayout({ children }: CandidateLayoutProps) {
  const pathname = usePathname();
  const { state, logout } = useAuth();

  // Auth pages don't need the portal layout
  const isAuthPage = [
    '/candidate/login',
    '/candidate/register',
    '/candidate/verify-email',
    '/candidate/forgot-password',
    '/candidate/onboarding',
  ].some((path) => pathname.startsWith(path));

  if (isAuthPage) {
    return <>{children}</>;
  }

  // Show loading state
  if (state.status === 'loading') {
    return (
      <div className="min-h-screen bg-portal-stone flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse mb-4">
            <div className="w-16 h-16 bg-portal-blue/20 rounded-full mx-auto" />
          </div>
          <p className="font-portal text-portal-body text-portal-graphite-muted">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  // Not authenticated - middleware should handle redirect
  if (!isCandidate(state)) {
    return null;
  }

  const { profile } = state;

  const availabilityState = profile.available ? 'actively-looking' : 'not-looking';

  return (
    <div className="min-h-screen bg-portal-stone">
      {/* Portal Header */}
      <header className="bg-portal-blue-dark sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/candidate/dashboard"
                className="font-portal text-lg font-semibold text-white"
              >
                Medibee
              </Link>
              <span className="hidden sm:inline text-white/30">|</span>
              <span className="hidden sm:inline font-portal text-portal-meta text-white/60">
                Candidate Portal
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* Mobile menu button would go here */}
              <div className="hidden sm:flex items-center gap-4">
                <span className="font-portal text-portal-meta text-white/80">
                  {profile.firstName} {profile.lastName}
                </span>
                <button
                  onClick={() => logout()}
                  className="
                    font-portal text-portal-meta text-white/60
                    hover:text-white transition-colors
                  "
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation - Desktop */}
          <nav className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-20 space-y-6">
              {/* Nav Items */}
              <ul className="space-y-1">
                {navItems.map((item) => {
                  const isActive =
                    pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`
                          flex items-center gap-3 px-4 py-2.5 rounded-card
                          font-portal text-portal-body transition-all duration-portal
                          ${isActive
                            ? 'bg-portal-blue text-white shadow-card'
                            : 'text-portal-graphite hover:bg-surface-0 hover:shadow-card'
                          }
                        `}
                      >
                        <span className="text-lg">{item.icon}</span>
                        {item.label}
                        {item.label === 'Introductions' && (
                          <span className="ml-auto w-5 h-5 rounded-full bg-portal-highlight text-white text-xs flex items-center justify-center">
                            1
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Status Card */}
              <div className="bg-surface-0 rounded-card p-4 shadow-card space-y-4">
                <div>
                  <p className="font-portal text-portal-meta text-portal-graphite-muted mb-2">
                    Profile Status
                  </p>
                  <StatusBadge
                    status={
                      profile.status === 'active'
                        ? 'active'
                        : profile.status === 'pending_review'
                          ? 'under-review'
                          : 'pending'
                    }
                  />
                </div>

                <div>
                  <p className="font-portal text-portal-meta text-portal-graphite-muted mb-2">
                    Availability
                  </p>
                  <AvailabilityIndicator state={availabilityState} />
                </div>
              </div>
            </div>
          </nav>

          {/* Mobile Navigation */}
          <div className="lg:hidden overflow-x-auto -mx-4 px-4">
            <div className="flex gap-2 pb-2">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap
                      font-portal text-portal-meta transition-colors duration-portal
                      ${isActive
                        ? 'bg-portal-blue text-white'
                        : 'bg-surface-0 text-portal-graphite shadow-card'
                      }
                    `}
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>

      {/* Mobile Bottom Actions */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-surface-0 border-t border-portal-stone p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-portal-blue flex items-center justify-center text-white text-sm font-semibold">
              {profile.firstName?.[0]}
              {profile.lastName?.[0]}
            </div>
            <div>
              <p className="font-portal text-portal-meta font-medium text-portal-graphite">
                {profile.firstName}
              </p>
              <p className="font-portal text-ui-xs text-portal-graphite-muted">
                {profile.status === 'active' ? 'Active' : 'Pending'}
              </p>
            </div>
          </div>
          <button
            onClick={() => logout()}
            className="
              px-4 py-2 rounded-card
              font-portal text-portal-meta
              border border-portal-stone text-portal-graphite
              hover:bg-portal-stone
            "
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
