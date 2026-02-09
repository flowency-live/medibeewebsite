import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HexagonBadge } from './HexagonBadge';

describe('HexagonBadge', () => {
  it('renders a number inside a hexagon', () => {
    render(<HexagonBadge number={1} variant="provider" />);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('renders the hexagon SVG', () => {
    render(<HexagonBadge number={1} variant="provider" data-testid="badge" />);
    const badge = screen.getByTestId('badge');
    expect(badge.querySelector('svg')).toBeInTheDocument();
  });

  it('applies provider color for provider variant', () => {
    render(<HexagonBadge number={1} variant="provider" data-testid="badge" />);
    const polygon = screen.getByTestId('badge').querySelector('polygon');
    expect(polygon).toHaveAttribute('fill', '#4A6FA5');
  });

  it('applies hca color for hca variant', () => {
    render(<HexagonBadge number={2} variant="hca" data-testid="badge" />);
    const polygon = screen.getByTestId('badge').querySelector('polygon');
    expect(polygon).toHaveAttribute('fill', '#7B6B8D');
  });

  it('displays numbers 1-9 correctly', () => {
    const { rerender } = render(<HexagonBadge number={1} variant="provider" />);
    expect(screen.getByText('1')).toBeInTheDocument();

    rerender(<HexagonBadge number={5} variant="provider" />);
    expect(screen.getByText('5')).toBeInTheDocument();

    rerender(<HexagonBadge number={9} variant="hca" />);
    expect(screen.getByText('9')).toBeInTheDocument();
  });

  it('has aria-hidden on the container for decorative use', () => {
    render(<HexagonBadge number={1} variant="provider" data-testid="badge" />);
    expect(screen.getByTestId('badge')).toHaveAttribute('aria-hidden', 'true');
  });

  it('accepts custom className', () => {
    render(<HexagonBadge number={1} variant="provider" className="custom-class" data-testid="badge" />);
    expect(screen.getByTestId('badge')).toHaveClass('custom-class');
  });

  it('positions number in center of hexagon', () => {
    render(<HexagonBadge number={1} variant="provider" data-testid="badge" />);
    const number = screen.getByText('1');
    expect(number).toHaveClass('absolute');
  });
});
