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

  describe('scale prop', () => {
    it('applies default scale of 1 when not specified', () => {
      render(<HoneycombCluster position="top-right" variant="filled" data-testid="cluster" />);
      const el = screen.getByTestId('cluster');
      expect(el.style.transform).toBe('scale(1)');
    });

    it('applies custom scale when specified', () => {
      render(<HoneycombCluster position="top-right" variant="filled" scale={1.5} data-testid="cluster" />);
      const el = screen.getByTestId('cluster');
      expect(el.style.transform).toBe('scale(1.5)');
    });

    it('applies larger scale for more visible clusters', () => {
      render(<HoneycombCluster position="top-right" variant="filled" scale={2} data-testid="cluster" />);
      const el = screen.getByTestId('cluster');
      expect(el.style.transform).toBe('scale(2)');
    });
  });

  describe('opacityMultiplier prop', () => {
    it('uses default opacity multiplier of 1 when not specified', () => {
      render(<HoneycombCluster position="top-right" variant="filled" data-testid="cluster" />);
      const hexagons = screen.getByTestId('cluster').querySelectorAll('[class*="absolute"]');
      const firstHex = hexagons[0] as HTMLElement;
      expect(parseFloat(firstHex.style.opacity)).toBeLessThanOrEqual(0.2);
    });

    it('increases opacity when multiplier is greater than 1', () => {
      render(<HoneycombCluster position="top-right" variant="filled" opacityMultiplier={2} data-testid="cluster" />);
      const hexagons = screen.getByTestId('cluster').querySelectorAll('[class*="absolute"]');
      const firstHex = hexagons[0] as HTMLElement;
      expect(parseFloat(firstHex.style.opacity)).toBeGreaterThan(0.2);
    });

    it('caps opacity at 1 when multiplied value exceeds 1', () => {
      render(<HoneycombCluster position="top-right" variant="filled" opacityMultiplier={10} data-testid="cluster" />);
      const hexagons = screen.getByTestId('cluster').querySelectorAll('[class*="absolute"]');
      hexagons.forEach((hex) => {
        const opacity = parseFloat((hex as HTMLElement).style.opacity);
        expect(opacity).toBeLessThanOrEqual(1);
      });
    });
  });

  describe('animate prop', () => {
    it('does not apply animation class by default', () => {
      render(<HoneycombCluster position="top-right" variant="filled" data-testid="cluster" />);
      expect(screen.getByTestId('cluster')).not.toHaveClass('animate-hex-float');
    });

    it('applies animation class when animate is true', () => {
      render(<HoneycombCluster position="top-right" variant="filled" animate data-testid="cluster" />);
      expect(screen.getByTestId('cluster')).toHaveClass('animate-hex-float');
    });
  });
});
