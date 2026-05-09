'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/lib/config/site';
import { cn } from '@/lib/utils';
import { BacklogDrawer } from '@/components/backlog';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [backlogOpen, setBacklogOpen] = React.useState(false);
  const pathname = usePathname();
  const menuButtonRef = React.useRef<HTMLButtonElement>(null);
  const mobileNavRef = React.useRef<HTMLElement>(null);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  // Close menu on route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Focus trap and escape key handling for mobile menu
  React.useEffect(() => {
    if (!mobileMenuOpen) return;

    const nav = mobileNavRef.current;
    if (!nav) return;

    // Focus first link when menu opens
    const firstLink = nav.querySelector('a') as HTMLElement | null;
    firstLink?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      // Close on Escape
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      // Focus trap on Tab
      if (e.key !== 'Tab') return;

      const focusableElements = nav.querySelectorAll<HTMLElement>(
        'a, button, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className="bg-void border-b border-gold/30">
      <div className="container-editorial">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 no-underline flex-shrink-0"
          >
            <Image
              src="/medibee-tile-logo.png"
              alt=""
              width={50}
              height={50}
              className="w-[50px] h-[50px] drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]"
            />
            <Image
              src="/medibee-logo.png"
              alt="Medibee"
              width={140}
              height={40}
              className="h-6 md:h-8 w-auto brightness-0 invert"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-5" aria-label="Main">
            {siteConfig.nav
              .filter((item) => item.href !== '/contact')
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'font-body text-ui-sm tracking-ui uppercase',
                    'text-pearl-soft/80 hover:text-gold transition-colors',
                    'no-underline',
                    pathname === item.href && 'text-gold'
                  )}
                >
                  {item.label}
                </Link>
              ))}

            {/* Divider */}
            <span className="w-px h-6 bg-ash-border" aria-hidden="true" />

            {/* Portal Links */}
            <Link
              href="/candidate/login"
              className={cn(
                'font-body text-ui-sm tracking-ui uppercase',
                'text-pearl-soft/80 hover:text-gold transition-colors',
                'no-underline flex items-center gap-1.5',
                pathname.startsWith('/candidate') && 'text-gold'
              )}
              title="Candidate Portal"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Candidates
            </Link>

            <Link
              href="/client/login"
              className={cn(
                'font-body text-ui-sm tracking-ui uppercase',
                'text-pearl-soft/80 hover:text-gold transition-colors',
                'no-underline flex items-center gap-1.5',
                pathname.startsWith('/client') && 'text-gold'
              )}
              title="Client Portal"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Clients
            </Link>

            {/* Admin link - subtle */}
            <Link
              href="/admin/login"
              className={cn(
                'text-ash hover:text-pearl-soft/80 transition-colors',
                'no-underline',
                pathname.startsWith('/admin') && 'text-pearl-soft/80'
              )}
              title="Admin Portal"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="sr-only">Admin</span>
            </Link>

            {/* Backlog Dev Tool */}
            <button
              onClick={() => setBacklogOpen(true)}
              className="text-ash hover:text-gold transition-colors p-1"
              title="Development Backlog"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <span className="sr-only">Backlog</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 -mr-2 text-pearl-soft hover:text-gold transition-colors"
            aria-label="Menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
          >
            <span className="sr-only">Menu</span>
            {mobileMenuOpen ? (
              // Close icon - simple X
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6l12 12M6 18L18 6"
                />
              </svg>
            ) : (
              // Menu icon - three horizontal lines
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation - slides down */}
      <nav
        ref={mobileNavRef}
        id="mobile-nav"
        data-testid="mobile-nav"
        className={cn(
          'lg:hidden bg-void-light text-pearl-soft overflow-hidden transition-all duration-normal',
          mobileMenuOpen ? 'max-h-screen py-8' : 'max-h-0 py-0'
        )}
        aria-label="Mobile navigation"
        aria-hidden={!mobileMenuOpen}
      >
        <div className="container-editorial flex flex-col gap-6">
          {siteConfig.nav
            .filter((item) => item.href !== '/contact')
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className={cn(
                  'font-body text-body-lg',
                  'text-pearl-soft hover:text-gold transition-colors',
                  'no-underline',
                  pathname === item.href && 'text-gold'
                )}
              >
                {item.label}
              </Link>
            ))}

          {/* Gold rule separator */}
          <span className="rule-gold-wide" aria-hidden="true" />

          {/* Portal Links */}
          <Link
            href="/candidate/login"
            onClick={closeMobileMenu}
            className={cn(
              'font-body text-body-lg flex items-center gap-2',
              'text-pearl-soft hover:text-gold transition-colors',
              'no-underline',
              pathname.startsWith('/candidate') && 'text-gold'
            )}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Candidate Portal
          </Link>

          <Link
            href="/client/login"
            onClick={closeMobileMenu}
            className={cn(
              'font-body text-body-lg flex items-center gap-2',
              'text-pearl-soft hover:text-gold transition-colors',
              'no-underline',
              pathname.startsWith('/client') && 'text-gold'
            )}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Client Portal
          </Link>

          <Link
            href="/admin/login"
            onClick={closeMobileMenu}
            className={cn(
              'font-body text-body-lg flex items-center gap-2',
              'text-ash hover:text-pearl-soft transition-colors',
              'no-underline',
              pathname.startsWith('/admin') && 'text-pearl-soft'
            )}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Admin
          </Link>

          <button
            onClick={() => {
              closeMobileMenu();
              setBacklogOpen(true);
            }}
            className="font-body text-body-lg flex items-center gap-2 text-gold hover:text-gold-light transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            Dev Backlog
          </button>

          <span className="rule-gold-wide" aria-hidden="true" />

          <Link
            href="/contact"
            onClick={closeMobileMenu}
            className="font-body text-body-lg text-gold hover:text-gold-light transition-colors no-underline"
          >
            Contact Us
          </Link>
        </div>
      </nav>

      {/* Backlog Drawer */}
      <BacklogDrawer isOpen={backlogOpen} onClose={() => setBacklogOpen(false)} />
    </header>
  );
}
