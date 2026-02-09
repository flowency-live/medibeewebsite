import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HoneycombPattern } from './HoneycombPattern';

describe('HoneycombPattern', () => {
  it('renders a div element', () => {
    render(<HoneycombPattern data-testid="honeycomb" />);
    expect(screen.getByTestId('honeycomb')).toBeInTheDocument();
  });

  it('applies absolute positioning by default', () => {
    render(<HoneycombPattern data-testid="honeycomb" />);
    expect(screen.getByTestId('honeycomb')).toHaveClass('absolute', 'inset-0');
  });

  it('has aria-hidden for decorative element', () => {
    render(<HoneycombPattern data-testid="honeycomb" />);
    expect(screen.getByTestId('honeycomb')).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies style attribute for gold variant', () => {
    render(<HoneycombPattern data-testid="honeycomb" />);
    const el = screen.getByTestId('honeycomb');
    expect(el).toHaveAttribute('style');
  });

  it('applies style attribute for dark variant', () => {
    render(<HoneycombPattern variant="dark" data-testid="honeycomb" />);
    const el = screen.getByTestId('honeycomb');
    expect(el).toHaveAttribute('style');
  });

  it('applies custom opacity', () => {
    render(<HoneycombPattern opacity={0.15} data-testid="honeycomb" />);
    const el = screen.getByTestId('honeycomb');
    expect(el.style.opacity).toBe('0.15');
  });

  it('accepts custom className', () => {
    render(<HoneycombPattern className="custom-class" data-testid="honeycomb" />);
    expect(screen.getByTestId('honeycomb')).toHaveClass('custom-class');
  });

  it('applies default opacity of 0.08 for gold variant', () => {
    render(<HoneycombPattern data-testid="honeycomb" />);
    const el = screen.getByTestId('honeycomb');
    expect(el.style.opacity).toBe('0.08');
  });
});
