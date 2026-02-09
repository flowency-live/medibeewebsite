import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HowItWorksColumn } from './HowItWorksColumn';

describe('HowItWorksColumn', () => {
  beforeEach(() => {
    vi.stubGlobal('IntersectionObserver', vi.fn(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    })));

    vi.stubGlobal('matchMedia', vi.fn(() => ({
      matches: false,
      addListener: vi.fn(),
      removeListener: vi.fn(),
    })));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  const defaultProps = {
    type: 'provider' as const,
    title: 'For care providers',
    steps: [
      { text: 'Contact us with your requirements' },
      { text: 'We discuss suitability and availability' },
      { text: 'We introduce vetted healthcare assistants' },
    ],
  };

  it('renders the title', () => {
    render(<HowItWorksColumn {...defaultProps} />);
    expect(screen.getByText('For care providers')).toBeInTheDocument();
  });

  it('renders all step texts', () => {
    render(<HowItWorksColumn {...defaultProps} />);
    expect(screen.getByText('Contact us with your requirements')).toBeInTheDocument();
    expect(screen.getByText('We discuss suitability and availability')).toBeInTheDocument();
    expect(screen.getByText('We introduce vetted healthcare assistants')).toBeInTheDocument();
  });

  it('renders step numbers 1, 2, 3', () => {
    render(<HowItWorksColumn {...defaultProps} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('applies provider styling for provider type', () => {
    render(<HowItWorksColumn {...defaultProps} data-testid="column" />);
    // Check that hexagon badges use provider color
    const badges = screen.getByTestId('column').querySelectorAll('svg polygon');
    expect(badges.length).toBeGreaterThan(0);
    badges.forEach((badge) => {
      expect(badge).toHaveAttribute('fill', '#4A6FA5');
    });
  });

  it('applies hca styling for hca type', () => {
    render(<HowItWorksColumn {...defaultProps} type="hca" data-testid="column" />);
    const badges = screen.getByTestId('column').querySelectorAll('svg polygon');
    expect(badges.length).toBeGreaterThan(0);
    badges.forEach((badge) => {
      expect(badge).toHaveAttribute('fill', '#7B6B8D');
    });
  });

  it('accepts custom className', () => {
    render(<HowItWorksColumn {...defaultProps} className="custom-class" data-testid="column" />);
    expect(screen.getByTestId('column')).toHaveClass('custom-class');
  });
});
