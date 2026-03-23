import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TierCard } from './TierCard';

describe('TierCard', () => {
  const defaultProps = {
    tier: 'hive' as const,
    price: '£4.99/mo',
    features: ['Feature 1', 'Feature 2'],
    ctaText: 'Get Started',
    ctaHref: '/signup',
  };

  describe('content rendering', () => {
    it('renders the tier badge', () => {
      render(<TierCard {...defaultProps} />);
      expect(screen.getByText('HIVE MEMBER')).toBeInTheDocument();
    });

    it('renders the price', () => {
      render(<TierCard {...defaultProps} />);
      expect(screen.getByText('£4.99/mo')).toBeInTheDocument();
    });

    it('renders price subtext when provided', () => {
      render(<TierCard {...defaultProps} priceSubtext="billed monthly" />);
      expect(screen.getByText('billed monthly')).toBeInTheDocument();
    });

    it('renders all features with checkmarks', () => {
      render(<TierCard {...defaultProps} />);
      expect(screen.getByText('Feature 1')).toBeInTheDocument();
      expect(screen.getByText('Feature 2')).toBeInTheDocument();
    });

    it('renders the CTA button with correct text and href', () => {
      render(<TierCard {...defaultProps} />);
      const link = screen.getByRole('link', { name: 'Get Started' });
      expect(link).toHaveAttribute('href', '/signup');
    });

    it('renders footer when provided', () => {
      render(<TierCard {...defaultProps} footer="Need verification? Upgrade to Hive" />);
      expect(screen.getByText('Need verification? Upgrade to Hive')).toBeInTheDocument();
    });
  });

  describe('CTA variants', () => {
    it('applies filled variant by default', () => {
      render(<TierCard {...defaultProps} />);
      const link = screen.getByRole('link', { name: 'Get Started' });
      expect(link.className).toContain('bg-brand-gold');
    });

    it('applies outline variant when specified', () => {
      render(<TierCard {...defaultProps} ctaVariant="outline" />);
      const link = screen.getByRole('link', { name: 'Get Started' });
      expect(link.className).toContain('border-2');
      expect(link.className).toContain('border-brand-gold');
    });
  });

  describe('tier variations', () => {
    it('renders Cell tier correctly', () => {
      render(
        <TierCard
          tier="cell"
          price="FREE"
          features={['Free Profile', 'Basic Visibility']}
          ctaText="Get Started"
          ctaHref="/candidate/register"
        />
      );
      expect(screen.getByText('CELL MEMBER')).toBeInTheDocument();
      expect(screen.getByText('FREE')).toBeInTheDocument();
    });

    it('renders Colony tier with outline CTA', () => {
      render(
        <TierCard
          tier="colony"
          price="From £100/mo"
          features={['Find & Recruit Talent']}
          ctaText="Contact Us"
          ctaHref="/contact"
          ctaVariant="outline"
        />
      );
      expect(screen.getByText('COLONY MEMBER')).toBeInTheDocument();
      expect(screen.getByText('From £100/mo')).toBeInTheDocument();
      const link = screen.getByRole('link', { name: 'Contact Us' });
      expect(link.className).toContain('border-2');
    });
  });

  describe('styling', () => {
    it('applies custom className', () => {
      const { container } = render(<TierCard {...defaultProps} className="custom-class" />);
      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain('custom-class');
    });

    it('has hover effects', () => {
      const { container } = render(<TierCard {...defaultProps} />);
      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain('hover:border-brand-gold/40');
    });
  });
});
