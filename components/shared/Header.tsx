'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/lib/config/site';
import { cn } from '@/lib/utils';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="bg-slate-blue border-b-[3px] border-rich-gold">
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
              className="w-[50px] h-[50px] drop-shadow-[0_0_1px_rgba(0,0,0,0.8)]"
            />
            <Image
              src="/medibee-logo.png"
              alt="Medibee"
              width={140}
              height={40}
              className="h-8 w-auto hidden lg:block"
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
                    'text-mist/80 hover:text-soft-gold transition-colors',
                    'no-underline',
                    pathname === item.href && 'text-soft-gold'
                  )}
                >
                  {item.label}
                </Link>
              ))}

            {/* Divider */}
            <span className="w-px h-6 bg-mist/30" aria-hidden="true" />

            {/* Portal Links */}
            <Link
              href="/client/login"
              className={cn(
                'font-body text-ui-sm tracking-ui uppercase',
                'text-mist/80 hover:text-soft-gold transition-colors',
                'no-underline',
                pathname === '/client/login' && 'text-soft-gold'
              )}
            >
              Client Login
            </Link>

            {/* Candidate Registration link */}
            <Link
              href="/candidate/register"
              className={cn(
                'font-body text-ui-sm tracking-ui uppercase',
                'text-rich-gold hover:text-soft-gold transition-colors',
                'no-underline',
                pathname === '/candidate/register' && 'text-soft-gold'
              )}
            >
              Register
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 -mr-2 text-mist hover:text-soft-gold transition-colors"
            aria-label="Menu"
            aria-expanded={mobileMenuOpen}
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
              >
                <path
                  strokeLinecap="square"
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
              >
                <path
                  strokeLinecap="square"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation - slides down */}
      <nav
        data-testid="mobile-nav"
        className={cn(
          'lg:hidden bg-slate-blue text-mist overflow-hidden transition-all duration-200',
          mobileMenuOpen ? 'max-h-screen py-8' : 'max-h-0 py-0'
        )}
        style={{ visibility: mobileMenuOpen ? 'visible' : 'hidden' }}
        aria-label="Mobile"
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
                  'text-mist hover:text-soft-gold transition-colors',
                  'no-underline',
                  pathname === item.href && 'text-rich-gold'
                )}
              >
                {item.label}
              </Link>
            ))}

          {/* Gold rule separator */}
          <span className="rule-gold-wide" aria-hidden="true" />

          {/* Portal Links */}
          <Link
            href="/client/login"
            onClick={closeMobileMenu}
            className={cn(
              'font-body text-body-lg',
              'text-mist hover:text-soft-gold transition-colors',
              'no-underline',
              pathname === '/client/login' && 'text-rich-gold'
            )}
          >
            Client Login
          </Link>

          <Link
            href="/candidate/register"
            onClick={closeMobileMenu}
            className="font-body text-body-lg text-rich-gold hover:text-soft-gold transition-colors no-underline"
          >
            Candidate Registration
          </Link>

          <Link
            href="/contact"
            onClick={closeMobileMenu}
            className="font-body text-body-lg text-mist hover:text-soft-gold transition-colors no-underline"
          >
            Contact Us
          </Link>
        </div>
      </nav>
    </header>
  );
}
