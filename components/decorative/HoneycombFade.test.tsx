import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HoneycombFade } from './HoneycombFade';

describe('HoneycombFade', () => {
  it('renders a container element', () => {
    render(<HoneycombFade direction="top-to-bottom" data-testid="fade" />);
    expect(screen.getByTestId('fade')).toBeInTheDocument();
  });

  it('has aria-hidden for decorative element', () => {
    render(<HoneycombFade direction="top-to-bottom" data-testid="fade" />);
    expect(screen.getByTestId('fade')).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies absolute positioning', () => {
    render(<HoneycombFade direction="top-to-bottom" data-testid="fade" />);
    expect(screen.getByTestId('fade')).toHaveClass('absolute', 'inset-0');
  });

  it('accepts custom className', () => {
    render(<HoneycombFade direction="left-to-right" className="custom-class" data-testid="fade" />);
    expect(screen.getByTestId('fade')).toHaveClass('custom-class');
  });

  it('applies style attribute with mask', () => {
    render(<HoneycombFade direction="top-to-bottom" data-testid="fade" />);
    const el = screen.getByTestId('fade');
    expect(el).toHaveAttribute('style');
  });
});
