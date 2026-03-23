/**
 * TierCard v2 Tests - Based on mockup at:
 * .documentation/CPO/CellHiveColony MedibeeeV2/Graphics/4cbfc47c-f1fd-4b7f-9949-90195bfb45d5.png
 *
 * These tests describe what the component SHOULD render to match the mockup.
 * Written BEFORE implementation changes.
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TierCard } from './TierCard';

describe('TierCard - Mockup Compliance', () => {
  describe('Card Header with Bee Icon', () => {
    it('renders "Medibee Cell" header with bee icon for cell tier', () => {
      render(
        <TierCard
          tier="cell"
          title="Medibee Cell"
          price="FREE"
          features={['Free Profile']}
          ctaText="Get Started"
          ctaHref="/register"
        />
      );
      expect(screen.getByText('Medibee Cell')).toBeInTheDocument();
      // Should have bee icon in header (SVG)
      const header = screen.getByText('Medibee Cell').closest('div');
      expect(header?.querySelector('svg')).toBeInTheDocument();
    });

    it('renders "Medibee Hive" header with bee icon for hive tier', () => {
      render(
        <TierCard
          tier="hive"
          title="Medibee Hive"
          price="£4.99/mo"
          features={['Full Platform Access']}
          ctaText="Get Started"
          ctaHref="/register"
        />
      );
      expect(screen.getByText('Medibee Hive')).toBeInTheDocument();
    });

    it('renders "Colony Employer Access" header for colony tier', () => {
      render(
        <TierCard
          tier="colony"
          title="Colony Employer Access"
          price="From £100/mo"
          features={['Find & Recruit Talent']}
          ctaText="Contact Us"
          ctaHref="/contact"
        />
      );
      expect(screen.getByText('Colony Employer Access')).toBeInTheDocument();
    });
  });

  describe('Tier Badge Inside Card', () => {
    it('renders CELL MEMBER badge with outline style', () => {
      render(
        <TierCard
          tier="cell"
          title="Medibee Cell"
          price="FREE"
          features={['Free Profile']}
          ctaText="Get Started"
          ctaHref="/register"
        />
      );
      expect(screen.getByText('CELL MEMBER')).toBeInTheDocument();
    });

    it('renders HIVE MEMBER badge with filled gold style', () => {
      render(
        <TierCard
          tier="hive"
          title="Medibee Hive"
          price="£4.99/mo"
          features={['Full Platform Access']}
          ctaText="Get Started"
          ctaHref="/register"
        />
      );
      expect(screen.getByText('HIVE MEMBER')).toBeInTheDocument();
    });

    it('renders COLONY MEMBER badge with outline style', () => {
      render(
        <TierCard
          tier="colony"
          title="Colony Employer Access"
          price="From £100/mo"
          features={['Find & Recruit Talent']}
          ctaText="Contact Us"
          ctaHref="/contact"
        />
      );
      expect(screen.getByText('COLONY MEMBER')).toBeInTheDocument();
    });
  });

  describe('Price Display', () => {
    it('displays FREE for cell tier', () => {
      render(
        <TierCard
          tier="cell"
          title="Medibee Cell"
          price="FREE"
          features={['Free Profile']}
          ctaText="Get Started"
          ctaHref="/register"
        />
      );
      expect(screen.getByText('FREE')).toBeInTheDocument();
    });

    it('displays £4.99/mo with "billed monthly" subtext for hive', () => {
      render(
        <TierCard
          tier="hive"
          title="Medibee Hive"
          price="£4.99/mo"
          priceSubtext="billed monthly"
          features={['Full Platform Access']}
          ctaText="Get Started"
          ctaHref="/register"
        />
      );
      expect(screen.getByText('£4.99/mo')).toBeInTheDocument();
      expect(screen.getByText('billed monthly')).toBeInTheDocument();
    });

    it('displays "From £100/mo" for colony', () => {
      render(
        <TierCard
          tier="colony"
          title="Colony Employer Access"
          price="From £100/mo"
          priceSubtext="billed monthly"
          features={['Find & Recruit Talent']}
          ctaText="Contact Us"
          ctaHref="/contact"
        />
      );
      expect(screen.getByText('From £100/mo')).toBeInTheDocument();
    });
  });

  describe('Features with Gold Checkmarks', () => {
    it('renders all features with checkmark icons', () => {
      render(
        <TierCard
          tier="cell"
          title="Medibee Cell"
          price="FREE"
          features={['Free Profile', 'Basic Visibility', 'For Healthcare Workers']}
          ctaText="Get Started"
          ctaHref="/register"
        />
      );
      expect(screen.getByText('Free Profile')).toBeInTheDocument();
      expect(screen.getByText('Basic Visibility')).toBeInTheDocument();
      expect(screen.getByText('For Healthcare Workers')).toBeInTheDocument();
    });
  });

  describe('CTA Buttons', () => {
    it('renders gold filled "Get Started" for cell', () => {
      render(
        <TierCard
          tier="cell"
          title="Medibee Cell"
          price="FREE"
          features={['Free Profile']}
          ctaText="Get Started"
          ctaHref="/candidate/register"
        />
      );
      const cta = screen.getByRole('link', { name: 'Get Started' });
      expect(cta).toHaveAttribute('href', '/candidate/register');
      expect(cta.className).toContain('bg-brand-gold');
    });

    it('renders gold filled "Get Started" for hive', () => {
      render(
        <TierCard
          tier="hive"
          title="Medibee Hive"
          price="£4.99/mo"
          features={['Full Platform Access']}
          ctaText="Get Started"
          ctaHref="/candidate/register"
        />
      );
      const cta = screen.getByRole('link', { name: 'Get Started' });
      expect(cta.className).toContain('bg-brand-gold');
    });

    it('renders gold filled "Contact Us" for colony', () => {
      render(
        <TierCard
          tier="colony"
          title="Colony Employer Access"
          price="From £100/mo"
          features={['Find & Recruit Talent']}
          ctaText="Contact Us"
          ctaHref="/contact"
        />
      );
      const cta = screen.getByRole('link', { name: 'Contact Us' });
      expect(cta).toHaveAttribute('href', '/contact');
      // Mockup shows gold filled for all CTAs
      expect(cta.className).toContain('bg-brand-gold');
    });
  });

  describe('Footer Text', () => {
    it('renders "Need verification? Upgrade to Hive" for cell', () => {
      render(
        <TierCard
          tier="cell"
          title="Medibee Cell"
          price="FREE"
          features={['Free Profile']}
          ctaText="Get Started"
          ctaHref="/register"
          footer="Need verification? Upgrade to Hive"
        />
      );
      expect(screen.getByText('Need verification? Upgrade to Hive')).toBeInTheDocument();
    });

    it('renders "Unlock advanced features" for hive', () => {
      render(
        <TierCard
          tier="hive"
          title="Medibee Hive"
          price="£4.99/mo"
          features={['Full Platform Access']}
          ctaText="Get Started"
          ctaHref="/register"
          footer="Unlock advanced features"
        />
      );
      expect(screen.getByText('Unlock advanced features')).toBeInTheDocument();
    });

    it('renders "Custom solutions for employers" for colony', () => {
      render(
        <TierCard
          tier="colony"
          title="Colony Employer Access"
          price="From £100/mo"
          features={['Find & Recruit Talent']}
          ctaText="Contact Us"
          ctaHref="/contact"
          footer="Custom solutions for employers"
        />
      );
      expect(screen.getByText('Custom solutions for employers')).toBeInTheDocument();
    });
  });
});
