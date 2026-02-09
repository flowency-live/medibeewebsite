import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HexagonIcon } from './HexagonIcon';

describe('HexagonIcon', () => {
  it('renders an SVG element', () => {
    render(<HexagonIcon data-testid="hexagon" />);
    const svg = screen.getByTestId('hexagon');
    expect(svg.tagName.toLowerCase()).toBe('svg');
  });

  it('applies default medium size', () => {
    render(<HexagonIcon data-testid="hexagon" />);
    const svg = screen.getByTestId('hexagon');
    expect(svg).toHaveClass('w-12', 'h-14');
  });

  it('applies small size when specified', () => {
    render(<HexagonIcon size="sm" data-testid="hexagon" />);
    const svg = screen.getByTestId('hexagon');
    expect(svg).toHaveClass('w-6', 'h-7');
  });

  it('applies large size when specified', () => {
    render(<HexagonIcon size="lg" data-testid="hexagon" />);
    const svg = screen.getByTestId('hexagon');
    expect(svg).toHaveClass('w-16', 'h-[74px]');
  });

  it('renders filled variant by default', () => {
    render(<HexagonIcon data-testid="hexagon" />);
    const polygon = screen.getByTestId('hexagon').querySelector('polygon');
    expect(polygon).toHaveAttribute('fill');
    expect(polygon).not.toHaveAttribute('stroke-width', '2');
  });

  it('renders outline variant when specified', () => {
    render(<HexagonIcon variant="outline" data-testid="hexagon" />);
    const polygon = screen.getByTestId('hexagon').querySelector('polygon');
    expect(polygon).toHaveAttribute('stroke-width', '2');
    expect(polygon).toHaveAttribute('fill', 'none');
  });

  it('applies gold color by default', () => {
    render(<HexagonIcon data-testid="hexagon" />);
    const polygon = screen.getByTestId('hexagon').querySelector('polygon');
    expect(polygon).toHaveAttribute('fill', '#E5C55C');
  });

  it('applies provider color when specified', () => {
    render(<HexagonIcon color="provider" data-testid="hexagon" />);
    const polygon = screen.getByTestId('hexagon').querySelector('polygon');
    expect(polygon).toHaveAttribute('fill', '#4A6FA5');
  });

  it('applies hca color when specified', () => {
    render(<HexagonIcon color="hca" data-testid="hexagon" />);
    const polygon = screen.getByTestId('hexagon').querySelector('polygon');
    expect(polygon).toHaveAttribute('fill', '#E5C55C');
  });

  it('is aria-hidden by default for decorative use', () => {
    render(<HexagonIcon data-testid="hexagon" />);
    expect(screen.getByTestId('hexagon')).toHaveAttribute('aria-hidden', 'true');
  });

  it('accepts custom className', () => {
    render(<HexagonIcon className="custom-class" data-testid="hexagon" />);
    expect(screen.getByTestId('hexagon')).toHaveClass('custom-class');
  });
});
