'use client';

/**
 * Candidate Portal Layout
 *
 * Wraps all candidate pages with portal-specific navigation and auth check.
 */

import { type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth, isCandidate } from '@/lib/auth';

interface CandidateLayoutProps {
  children: ReactNode;
}

// Navigation items for the candidate portal
const navItems = [
  { href: '/candidate/dashboard', label: 'Dashboard', icon: '◉' },
  { href: '/candidate/profile', label: 'Profile', icon: '◎' },
  { href: '/candidate/cv', label: 'CV', icon: '▤' },
  { href: '/candidate/settings', label: 'Settings', icon: '⚙' },
];

export default function CandidateLayout({ children }: CandidateLayoutProps) {
  const pathname = usePathname();
  const { state, logout } = useAuth();

  // Auth pages don't need the portal layout
  const isAuthPage = ['/candidate/login', '/candidate/register', '/candidate/verify-email', '/candidate/forgot-password'].some(
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
  if (!isCandidate(state)) {
    return null;
  }

  const { profile } = state;

  return (
    <div className="min-h-screen bg-mist">
      {/* Portal Header */}
      <header className="bg-deep-slate text-mist border-b border-slate-blue/20">
        <div className="container-editorial py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/candidate/dashboard" className="font-display text-lg text-soft-gold">
                Medibee
              </Link>
              <span className="text-mist/40">|</span>
              <span className="font-body text-body-sm text-mist/60">Candidate Portal</span>
            </div>

            <div className="flex items-center gap-6">
              <span className="font-body text-body-sm text-mist/80">
                {profile.firstName} {profile.lastName}
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

            {/* Status Badge */}
            <div className="mt-8 p-4 bg-white rounded-sm border border-neutral-grey/20">
              <p className="font-body text-body-sm text-slate-blue mb-2">Profile Status</p>
              <div className="flex items-center gap-2">
                <span
                  className={`
                    w-2 h-2 rounded-full
                    ${profile.status === 'active' ? 'bg-green-500' : ''}
                    ${profile.status === 'pending_review' ? 'bg-amber-500' : ''}
                    ${profile.status === 'pending_verification' ? 'bg-blue-500' : ''}
                    ${profile.status === 'suspended' ? 'bg-red-500' : ''}
                    ${profile.status === 'rejected' ? 'bg-red-500' : ''}
                  `}
                />
                <span className="font-body text-body-sm text-ink capitalize">
                  {profile.status.replace('_', ' ')}
                </span>
              </div>
            </div>

            {/* Availability Toggle */}
            <div className="mt-4 p-4 bg-white rounded-sm border border-neutral-grey/20">
              <p className="font-body text-body-sm text-slate-blue mb-2">Availability</p>
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${profile.available ? 'bg-green-500' : 'bg-neutral-grey'}`}
                />
                <span className="font-body text-body-sm text-ink">
                  {profile.available ? 'Available for work' : 'Not available'}
                </span>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
