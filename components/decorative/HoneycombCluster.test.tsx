import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HoneycombCluster } from './HoneycombCluster';

describe('HoneycombCluster', () => {
  it('renders a container element', () => {
    render(<HoneycombCluster position="top-right" variant="filled" data-testid="cluster" />);
    expect(screen.getByTestId('cluster')).toBeInTheDocument();
  });

  it('positions in top-right corner when specified', () => {
    render(<HoneycombCluster position="top-right" variant="filled" data-testid="cluster" />);
    const el = screen.getByTestId('cluster');
    expect(el).toHaveClass('top-0', 'right-0');
  });

  it('positions in top-left corner when specified', () => {
    render(<HoneycombCluster position="top-left" variant="outline" data-testid="cluster" />);
    const el = screen.getByTestId('cluster');
    expect(el).toHaveClass('top-0', 'left-0');
  });

  it('renders multiple hexagons', () => {
    render(<HoneycombCluster position="top-right" variant="filled" data-testid="cluster" />);
    const svgs = screen.getByTestId('cluster').querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThanOrEqual(3);
  });

  it('has aria-hidden for decorative element', () => {
    render(<HoneycombCluster position="top-right" variant="filled" data-testid="cluster" />);
    expect(screen.getByTestId('cluster')).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies absolute positioning', () => {
    render(<HoneycombCluster position="top-right" variant="filled" data-testid="cluster" />);
    expect(screen.getByTestId('cluster')).toHaveClass('absolute');
  });

  it('accepts custom className', () => {
    render(<HoneycombCluster position="top-left" variant="outline" className="custom-class" data-testid="cluster" />);
    expect(screen.getByTestId('cluster')).toHaveClass('custom-class');
  });
});
