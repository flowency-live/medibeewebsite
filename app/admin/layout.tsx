'use client';

/**
 * Admin Portal Layout
 *
 * Wraps all admin pages with admin-specific navigation and auth check.
 */

import { type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth, isAdmin } from '@/lib/auth';

interface AdminLayoutProps {
  children: ReactNode;
}

// Navigation items for the admin portal
const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: '◉' },
  { href: '/admin/candidates', label: 'Candidates', icon: '◎' },
  { href: '/admin/clients', label: 'Clients', icon: '▤' },
  { href: '/admin/contacts', label: 'Contacts', icon: '✉' },
  { href: '/admin/analytics', label: 'Analytics', icon: '◈' },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const { state, logout } = useAuth();

  // Auth pages don't need the portal layout
  const isAuthPage = pathname === '/admin/login';

  if (isAuthPage) {
    return <>{children}</>;
  }

  // Show loading state
  if (state.status === 'loading') {
    return (
      <div className="min-h-screen bg-void flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse mb-4">
            <div className="w-16 h-16 bg-gold/20 rounded-full mx-auto" />
          </div>
          <p className="font-body text-body-md text-pearl-soft/60">Loading...</p>
        </div>
      </div>
    );
  }

  // Not authenticated as admin - middleware should handle redirect
  if (!isAdmin(state)) {
    return null;
  }

  const { profile } = state;

  return (
    <div className="min-h-screen bg-void">
      {/* Admin Header */}
      <header className="bg-void-elevated text-pearl-soft border-b border-gold/20">
        <div className="container-editorial py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard" className="font-display text-lg text-gold-soft">
                Medibee
              </Link>
              <span className="text-pearl-soft/40">|</span>
              <span className="px-2 py-0.5 bg-red-600/20 text-red-400 text-xs font-semibold rounded">
                ADMIN
              </span>
            </div>

            <div className="flex items-center gap-6">
              <span className="font-body text-body-sm text-pearl-soft/80">{profile.email}</span>
              <button
                onClick={() => logout()}
                className="font-body text-body-sm text-pearl-soft/60 hover:text-pearl-soft transition-colors"
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
                          ? 'bg-gold/20 text-gold'
                          : 'text-pearl-soft/70 hover:bg-gold/10 hover:text-gold-soft'
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

            {/* Quick Stats */}
            <div className="mt-8 p-4 bg-gold/5 rounded-sm border border-gold/20">
              <p className="font-body text-body-sm text-pearl-soft/60 mb-2">Admin Portal</p>
              <p className="font-body text-body-sm text-pearl-soft/80">
                Manage candidates, clients, and platform operations.
              </p>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="bg-void-elevated p-8 rounded-sm border border-white/[0.06]">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
