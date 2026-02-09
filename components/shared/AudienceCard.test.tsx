import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AudienceCard } from './AudienceCard';

describe('AudienceCard', () => {
  const defaultProps = {
    type: 'provider' as const,
    title: "I'm a care provider",
    description: 'Find reliable healthcare assistants',
    imageSrc: '/test-image.png',
    imageAlt: 'Test image',
    href: '/services',
    ctaText: 'Learn more',
  };

  it('renders the title', () => {
    render(<AudienceCard {...defaultProps} />);
    expect(screen.getByText("I'm a care provider")).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<AudienceCard {...defaultProps} />);
    expect(screen.getByText('Find reliable healthcare assistants')).toBeInTheDocument();
  });

  it('renders the CTA text', () => {
    render(<AudienceCard {...defaultProps} />);
    expect(screen.getByText('Learn more')).toBeInTheDocument();
  });

  it('links to the correct href', () => {
    render(<AudienceCard {...defaultProps} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/services');
  });

  it('applies provider border accent for provider type', () => {
    render(<AudienceCard {...defaultProps} data-testid="card" />);
    expect(screen.getByTestId('card')).toHaveClass('border-l-provider');
  });

  it('applies hca border accent for hca type', () => {
    render(<AudienceCard {...defaultProps} type="hca" data-testid="card" />);
    expect(screen.getByTestId('card')).toHaveClass('border-l-hca');
  });

  it('renders image with correct alt text', () => {
    render(<AudienceCard {...defaultProps} />);
    const img = screen.getByAltText('Test image');
    expect(img).toBeInTheDocument();
  });

  it('renders eyebrow text for provider', () => {
    render(<AudienceCard {...defaultProps} />);
    expect(screen.getByText('For Care Providers')).toBeInTheDocument();
  });

  it('renders eyebrow text for hca', () => {
    render(<AudienceCard {...defaultProps} type="hca" />);
    expect(screen.getByText('For Healthcare Assistants')).toBeInTheDocument();
  });

  it('accepts custom className', () => {
    render(<AudienceCard {...defaultProps} className="custom-class" data-testid="card" />);
    expect(screen.getByTestId('card')).toHaveClass('custom-class');
  });

  it('renders a decorative hexagon corner element', () => {
    render(<AudienceCard {...defaultProps} />);
    const hexCorner = screen.getByTestId('hex-corner');
    expect(hexCorner).toBeInTheDocument();
  });

  it('renders hexagon corner with provider color for provider type', () => {
    render(<AudienceCard {...defaultProps} type="provider" />);
    const hexCorner = screen.getByTestId('hex-corner');
    const polygon = hexCorner.querySelector('polygon');
    expect(polygon).toHaveAttribute('fill', '#4A6FA5');
  });

  it('renders hexagon corner with hca color for hca type', () => {
    render(<AudienceCard {...defaultProps} type="hca" />);
    const hexCorner = screen.getByTestId('hex-corner');
    const polygon = hexCorner.querySelector('polygon');
    expect(polygon).toHaveAttribute('fill', '#7B6B8D');
  });
});
