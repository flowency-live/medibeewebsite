import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TierBadge } from './TierBadge';

describe('TierBadge', () => {
  describe('tier labels', () => {
    it('renders CELL MEMBER for cell tier', () => {
      render(<TierBadge tier="cell" />);
      expect(screen.getByText('CELL MEMBER')).toBeInTheDocument();
      expect(screen.getByText('MEDIBEE')).toBeInTheDocument();
    });

    it('renders HIVE MEMBER for hive tier', () => {
      render(<TierBadge tier="hive" />);
      expect(screen.getByText('HIVE MEMBER')).toBeInTheDocument();
    });

    it('renders COLONY MEMBER for colony tier', () => {
      render(<TierBadge tier="colony" />);
      expect(screen.getByText('COLONY MEMBER')).toBeInTheDocument();
    });
  });

  describe('variant defaults', () => {
    it('defaults to outline for cell tier', () => {
      const { container } = render(<TierBadge tier="cell" />);
      const badge = container.firstChild as HTMLElement;
      expect(badge.className).toContain('border');
      expect(badge.className).toContain('text-brand-gold');
    });

    it('defaults to filled for hive tier', () => {
      const { container } = render(<TierBadge tier="hive" />);
      const badge = container.firstChild as HTMLElement;
      expect(badge.className).toContain('bg-brand-gold');
      expect(badge.className).toContain('text-brand-dark');
    });

    it('defaults to outline for colony tier', () => {
      const { container } = render(<TierBadge tier="colony" />);
      const badge = container.firstChild as HTMLElement;
      expect(badge.className).toContain('border');
    });
  });

  describe('explicit variants', () => {
    it('applies filled variant when specified for cell', () => {
      const { container } = render(<TierBadge tier="cell" variant="filled" />);
      const badge = container.firstChild as HTMLElement;
      expect(badge.className).toContain('bg-brand-gold');
    });

    it('applies outline variant when specified for hive', () => {
      const { container } = render(<TierBadge tier="hive" variant="outline" />);
      const badge = container.firstChild as HTMLElement;
      expect(badge.className).toContain('border');
      expect(badge.className).toContain('text-brand-gold');
    });
  });

  describe('sizes', () => {
    it('applies sm size classes', () => {
      const { container } = render(<TierBadge tier="cell" size="sm" />);
      const badge = container.firstChild as HTMLElement;
      expect(badge.className).toContain('px-3');
      expect(badge.className).toContain('text-xs');
    });

    it('applies md size classes by default', () => {
      const { container } = render(<TierBadge tier="cell" />);
      const badge = container.firstChild as HTMLElement;
      expect(badge.className).toContain('px-4');
      expect(badge.className).toContain('text-sm');
    });

    it('applies lg size classes', () => {
      const { container } = render(<TierBadge tier="cell" size="lg" />);
      const badge = container.firstChild as HTMLElement;
      expect(badge.className).toContain('px-5');
      expect(badge.className).toContain('text-base');
    });
  });

  describe('bee icon', () => {
    it('renders SVG bee icon', () => {
      const { container } = render(<TierBadge tier="hive" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('custom className', () => {
    it('merges custom className', () => {
      const { container } = render(<TierBadge tier="cell" className="custom-class" />);
      const badge = container.firstChild as HTMLElement;
      expect(badge.className).toContain('custom-class');
    });
  });
});
