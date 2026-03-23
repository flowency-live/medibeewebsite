import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { VerificationBadge } from './VerificationBadge';

describe('VerificationBadge', () => {
  describe('badge types and labels', () => {
    it('renders Verified Profile badge', () => {
      render(<VerificationBadge type="verified-profile" />);
      expect(screen.getByText('Verified Profile')).toBeInTheDocument();
    });

    it('renders Passport Ready badge', () => {
      render(<VerificationBadge type="passport-ready" />);
      expect(screen.getByText('Passport Ready')).toBeInTheDocument();
    });

    it('renders ID Verified badge', () => {
      render(<VerificationBadge type="id-verified" />);
      expect(screen.getByText('ID Verified')).toBeInTheDocument();
    });

    it('renders DBS Verified badge', () => {
      render(<VerificationBadge type="dbs-verified" />);
      expect(screen.getByText('DBS Verified')).toBeInTheDocument();
    });

    it('renders Right to Work badge', () => {
      render(<VerificationBadge type="rtw-verified" />);
      expect(screen.getByText('Right to Work')).toBeInTheDocument();
    });

    it('renders Qualifications badge', () => {
      render(<VerificationBadge type="qualifications-verified" />);
      expect(screen.getByText('Qualifications')).toBeInTheDocument();
    });
  });

  describe('showLabel prop', () => {
    it('shows label by default', () => {
      render(<VerificationBadge type="dbs-verified" />);
      expect(screen.getByText('DBS Verified')).toBeInTheDocument();
    });

    it('hides label when showLabel is false', () => {
      render(<VerificationBadge type="dbs-verified" showLabel={false} />);
      expect(screen.queryByText('DBS Verified')).not.toBeInTheDocument();
    });
  });

  describe('sizes', () => {
    it('applies sm size classes', () => {
      const { container } = render(<VerificationBadge type="dbs-verified" size="sm" />);
      const badge = container.firstChild as HTMLElement;
      expect(badge.className).toContain('px-2');
      expect(badge.className).toContain('py-1');
    });

    it('applies md size classes by default', () => {
      const { container } = render(<VerificationBadge type="dbs-verified" />);
      const badge = container.firstChild as HTMLElement;
      expect(badge.className).toContain('px-3');
      expect(badge.className).toContain('py-1.5');
    });

    it('applies lg size classes', () => {
      const { container } = render(<VerificationBadge type="dbs-verified" size="lg" />);
      const badge = container.firstChild as HTMLElement;
      expect(badge.className).toContain('px-4');
      expect(badge.className).toContain('py-2');
    });
  });

  describe('icon rendering', () => {
    it('renders icon for each badge type', () => {
      const { container } = render(<VerificationBadge type="dbs-verified" />);
      const svgs = container.querySelectorAll('svg');
      // Should have at least 2 SVGs: the main icon and the check circle
      expect(svgs.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('styling', () => {
    it('applies dark background with gold border', () => {
      const { container } = render(<VerificationBadge type="dbs-verified" />);
      const badge = container.firstChild as HTMLElement;
      expect(badge.className).toContain('bg-brand-dark/60');
      expect(badge.className).toContain('border-brand-gold/20');
    });

    it('merges custom className', () => {
      const { container } = render(<VerificationBadge type="dbs-verified" className="custom-class" />);
      const badge = container.firstChild as HTMLElement;
      expect(badge.className).toContain('custom-class');
    });
  });
});
