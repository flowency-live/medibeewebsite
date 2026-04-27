import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { PassportPreviewCard } from './PassportPreviewCard';

describe('PassportPreviewCard', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('content rendering', () => {
    it('renders the default passport title', () => {
      render(<PassportPreviewCard />);
      expect(screen.getByText('Your Medibee Passport')).toBeInTheDocument();
    });

    it('renders custom title when provided', () => {
      render(<PassportPreviewCard title="Custom Passport" />);
      expect(screen.getByText('Custom Passport')).toBeInTheDocument();
    });

    it('renders QR code placeholder', () => {
      render(<PassportPreviewCard data-testid="passport" />);
      const passport = screen.getByTestId('passport');
      expect(passport.querySelector('[data-testid="qr-placeholder"]')).toBeInTheDocument();
    });

    it('renders all default verification items', () => {
      render(<PassportPreviewCard />);
      expect(screen.getByText('Verified DBS Check')).toBeInTheDocument();
      expect(screen.getByText('ID Verified')).toBeInTheDocument();
      expect(screen.getByText('Right to Work Approved')).toBeInTheDocument();
      expect(screen.getByText('Training Completed')).toBeInTheDocument();
      expect(screen.getByText('Documents Up to Date')).toBeInTheDocument();
    });

    it('renders custom verification items when provided', () => {
      const customItems = [
        { label: 'Custom Item 1', verified: true },
        { label: 'Custom Item 2', verified: false },
      ];
      render(<PassportPreviewCard items={customItems} />);
      expect(screen.getByText('Custom Item 1')).toBeInTheDocument();
      expect(screen.getByText('Custom Item 2')).toBeInTheDocument();
      expect(screen.queryByText('Verified DBS Check')).not.toBeInTheDocument();
    });
  });

  describe('verification item icons', () => {
    it('renders emerald check icon for verified items', () => {
      const items = [{ label: 'Verified Item', verified: true }];
      render(<PassportPreviewCard items={items} data-testid="passport" />);
      const passport = screen.getByTestId('passport');
      const icon = passport.querySelector('.text-emerald-400');
      expect(icon).toBeInTheDocument();
    });

    it('renders amber check icon for unverified items', () => {
      const items = [{ label: 'Pending Item', verified: false }];
      render(<PassportPreviewCard items={items} data-testid="passport" />);
      const passport = screen.getByTestId('passport');
      const icon = passport.querySelector('.text-amber-400');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('GlassCard integration', () => {
    it('wraps content in GlassCard', () => {
      render(<PassportPreviewCard data-testid="passport" />);
      const passport = screen.getByTestId('passport');
      expect(passport).toHaveClass('backdrop-blur-xl');
      expect(passport).toHaveClass('rounded-2xl');
    });

    it('defaults to 400ms delay', () => {
      render(<PassportPreviewCard data-testid="passport" />);
      const passport = screen.getByTestId('passport');

      // Should be hidden initially
      expect(passport).toHaveClass('opacity-0');

      // Advance past default delay
      act(() => {
        vi.advanceTimersByTime(400);
      });
      expect(passport).toHaveClass('opacity-100');
    });

    it('passes custom delay to GlassCard', () => {
      render(<PassportPreviewCard data-testid="passport" delay={200} />);
      const passport = screen.getByTestId('passport');

      act(() => {
        vi.advanceTimersByTime(199);
      });
      expect(passport).toHaveClass('opacity-0');

      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(passport).toHaveClass('opacity-100');
    });
  });

  describe('styling', () => {
    it('applies positioning className', () => {
      render(<PassportPreviewCard data-testid="passport" className="absolute left-0" />);
      const passport = screen.getByTestId('passport');
      expect(passport).toHaveClass('absolute');
      expect(passport).toHaveClass('left-0');
    });
  });

  describe('accessibility', () => {
    it('passes data-testid to container', () => {
      render(<PassportPreviewCard data-testid="my-passport" />);
      expect(screen.getByTestId('my-passport')).toBeInTheDocument();
    });
  });

  describe('hover enhancements', () => {
    it('has hover transition classes', () => {
      render(<PassportPreviewCard data-testid="passport" />);
      const passport = screen.getByTestId('passport');
      expect(passport).toHaveClass('hover:scale-[1.02]');
      expect(passport).toHaveClass('hover:shadow-gold-glow-sm');
    });
  });
});
