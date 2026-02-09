import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HexagonBullet } from './HexagonBullet';

describe('HexagonBullet', () => {
  it('renders a hexagon SVG', () => {
    render(<HexagonBullet data-testid="bullet" />);
    const bullet = screen.getByTestId('bullet');
    expect(bullet.tagName.toLowerCase()).toBe('svg');
  });

  it('renders a polygon with hexagon points', () => {
    render(<HexagonBullet data-testid="bullet" />);
    const polygon = screen.getByTestId('bullet').querySelector('polygon');
    expect(polygon).toBeInTheDocument();
  });

  it('applies gold fill by default', () => {
    render(<HexagonBullet data-testid="bullet" />);
    const polygon = screen.getByTestId('bullet').querySelector('polygon');
    expect(polygon).toHaveAttribute('fill', '#E5C55C');
  });

  it('applies custom color when specified', () => {
    render(<HexagonBullet color="provider" data-testid="bullet" />);
    const polygon = screen.getByTestId('bullet').querySelector('polygon');
    expect(polygon).toHaveAttribute('fill', '#4A6FA5');
  });

  it('renders at small size by default', () => {
    render(<HexagonBullet data-testid="bullet" />);
    const bullet = screen.getByTestId('bullet');
    expect(bullet).toHaveClass('w-3', 'h-3.5');
  });

  it('is accessible as decorative element', () => {
    render(<HexagonBullet data-testid="bullet" />);
    expect(screen.getByTestId('bullet')).toHaveAttribute('aria-hidden', 'true');
  });

  it('accepts custom className', () => {
    render(<HexagonBullet className="custom-class" data-testid="bullet" />);
    expect(screen.getByTestId('bullet')).toHaveClass('custom-class');
  });
});
