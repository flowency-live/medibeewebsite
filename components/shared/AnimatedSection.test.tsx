import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AnimatedSection } from './AnimatedSection';

describe('AnimatedSection', () => {
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

  it('renders children', () => {
    render(
      <AnimatedSection>
        <p>Test content</p>
      </AnimatedSection>
    );
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies animate-on-scroll class by default', () => {
    render(
      <AnimatedSection data-testid="section">
        <p>Test content</p>
      </AnimatedSection>
    );
    expect(screen.getByTestId('section')).toHaveClass('animate-on-scroll');
  });

  it('applies slide-left animation class when specified', () => {
    render(
      <AnimatedSection animation="slide-left" data-testid="section">
        <p>Test content</p>
      </AnimatedSection>
    );
    expect(screen.getByTestId('section')).toHaveClass('animate-slide-left');
  });

  it('applies slide-right animation class when specified', () => {
    render(
      <AnimatedSection animation="slide-right" data-testid="section">
        <p>Test content</p>
      </AnimatedSection>
    );
    expect(screen.getByTestId('section')).toHaveClass('animate-slide-right');
  });

  it('accepts custom className', () => {
    render(
      <AnimatedSection className="custom-class" data-testid="section">
        <p>Test content</p>
      </AnimatedSection>
    );
    expect(screen.getByTestId('section')).toHaveClass('custom-class');
  });

  it('applies delay class when specified', () => {
    render(
      <AnimatedSection delay={200} data-testid="section">
        <p>Test content</p>
      </AnimatedSection>
    );
    expect(screen.getByTestId('section')).toHaveClass('animate-delay-200');
  });

  it('renders as div by default', () => {
    render(
      <AnimatedSection data-testid="section">
        <p>Test content</p>
      </AnimatedSection>
    );
    expect(screen.getByTestId('section').tagName).toBe('DIV');
  });
});
