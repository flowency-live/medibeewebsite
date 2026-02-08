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
            className="flex items-center gap-3 no-underline"
          >
            <Image
              src="/medibee-tile-logo.png"
              alt=""
              width={50}
              height={50}
              className="w-[50px] h-[50px]"
            />
            <Image
              src="/medibee-logo.png"
              alt="Medibee"
              width={140}
              height={40}
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main">
            {siteConfig.nav
              .filter((item) => item.href !== '/' && item.href !== '/contact')
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

            {/* Primary CTA - gold button */}
            <Link
              href="/contact"
              className={cn(
                'font-body text-ui-sm tracking-ui uppercase',
                'bg-rich-gold text-ink',
                'px-6 py-3',
                'hover:bg-soft-gold transition-colors',
                'no-underline'
              )}
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 -mr-2 text-mist hover:text-soft-gold transition-colors"
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
          'md:hidden bg-slate-blue text-mist overflow-hidden transition-all duration-200',
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

          <Link
            href="/contact"
            onClick={closeMobileMenu}
            className="font-body text-body-lg text-rich-gold hover:text-soft-gold transition-colors no-underline"
          >
            Contact Us
          </Link>
        </div>
      </nav>
    </header>
  );
}
